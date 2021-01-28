import { Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { NzPopoverComponent, NzPopoverDirective } from 'ng-zorro-antd/popover';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from 'src/modules/user/user.model';
import { MessageSentEventPayload } from '../../input.model';
import {MessageElement, PostMessage} from "../../../feed/post.model";

@Component({
  selector: 'app-feed-input',
  templateUrl: './feed-input.component.html',
  styleUrls: ['./feed-input.component.less']
})
export class FeedInputComponent {
  @Output()
  messageSent: EventEmitter<MessageSentEventPayload> = new EventEmitter();
  @Output()
  chosenUser: EventEmitter<any> = new EventEmitter();

  @ViewChild(NzPopoverDirective)
  inputPopover: NzPopoverDirective;

  objMessage = {
    date: new Date(),
  message: '',
  file: undefined
  };

  userMatch: any;
  /**
   * Hold the input message
   */
  message: string = "";

  users: User[] = [];

  /**
   * Staging file to upload
   */
  file: File | null = null;

  currentMention?: RegExpMatchArray;

  supportedTypes = "image/png,image/jpeg,image/gif,image/bmp,image/bmp,video/mpeg,audio/mpeg,audio/x-wav,image/webp";

  constructor(
    private userService: UserService
  ) { }

  /**
   * Triggered when the user is selecting a mention in the list.
   * @param user The mentioned user
   */
  chooseMention(user: User) {
    if (this.currentMention) {
       this.message =  this.message.replace(this.currentMention[0],user.username) + " ";
      this.chosenUser.emit(user);
    }
    this.hideMentionList();
  };

  /**
   * Display the mention list
   * @param mentionMatch The mention regexp match
   */
  showMentionList(mentionMatch: RegExpMatchArray) {
    this.currentMention = mentionMatch;
    this.inputPopover.show();
  }

  /**
   * Hide the mention list
   */
  hideMentionList() {
    this.inputPopover.hide();
    this.currentMention = undefined;
  }


  /**
   * Message change evetn handler
   * @param message
   */
  onMessageChanged(message: string) {
    this.message = message;

    const userMentionRegex = /\B@\w+/g;

    const userCatch = this.message.match(userMentionRegex);
    if(userCatch){

      this.userMatch = userCatch.toString().substring(1);
      this.searchMentionedUsers(this.userMatch)
      this.showMentionList(userCatch);
    }
  }

  /**
   * Close tag event handler. Trigger when the user wants to remove a file.
   */
  onCloseTag() {
    this.setFile(null);
  }

  /**
  * Event handler
  * @param file the file privded by the user
  */
  onFileUpload = (file: File) => {
    this.setFile(file);
    return false;
  };

  /**
   * InputKeyDown event handler. Used to watch "Enter" key press
   * @param e
   */
  onInputKeyDown(e: KeyboardEvent) {
    // True if "Enter" is pressed without th shift or CTRL key pressed
    if (e.key.toLowerCase() === "enter" && !e.shiftKey && !e.ctrlKey) {
      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();

      this.send();
    }
  }

  /**
   * InputKeyUp event handler. Use to watch arrows key press to know when to show mention list
   * @param e
   */
  onInputKeyUp(e: KeyboardEvent) {

  }

  async searchMentionedUsers(search: string) {
    if (!search) {
      this.users = [];
    } else {
      this.users = await this.userService.search(search);
    }
  }

  /**
   * Send the input message
   */
  send() {
    let newDate = new Date();
    if (this.message || this.file) {
      this.objMessage.date = new Date();
      this.objMessage.message = this.message;
      if(this.file){
      } else {
        this.objMessage.file = undefined;
      }
      this.fireMessageSent();
      this.clear();
    }

  }

  /**
   * Set an allowed file to send with the input message
   * @param file The file to send with the message
   */
  setFile(file: File | null) {
    this.file = file;
  };

  /**
   * Emit the "messageSent" event
   */
  fireMessageSent() {
    this.messageSent.emit(this.objMessage);
  }

  /**
   * Clear the message to reset the input
   */
  clear() {
    this.message = "";
    this.setFile(null);
    this.inputPopover.hide();
  }
}
