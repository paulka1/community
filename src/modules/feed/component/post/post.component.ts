import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {Post} from '../../post.model';
import {PostService} from '../../services/post.service';
import {DateTime} from "luxon";
import {Observable} from "rxjs";
import {User} from "../../../user/user.model";
import {UserStore} from "../../../user/user.store";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  post: Post;
  @Input()
  chosenUser: string;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  user$: Observable<User | undefined>;
  profilPicture: string | undefined;

  urlImage:boolean;
  urlVideo:boolean;
  urlYoutube:boolean;
  liked:boolean;
  url:any;
  postDate:string;
  message:any;
  sanitizerMessage:any;

  constructor(
    private postService: PostService,
    private store: UserStore,
    private sanitizer: DomSanitizer
  ) {
    this.user$ = store.user$
  }

  ngOnInit(): void {
    //  console.log("postSansFind :", this.post);
    // console.log("post :", this.post.message.attachements.find( c => c.type === "image"));
    if(this.post.message.attachements.find( item => item.type === "image")){
      this.urlImage = true;
    }
    if(this.post.message.attachements.find( item => item.type === "video")){
      this.urlVideo = true;
    }
    if(this.post.message.attachements.find( item => item.type === "youtube")){
      this.urlYoutube = true;
    }
    const t = DateTime.fromISO( this.post.createdAt as string ).toLocal();
    this.postDate = t.setLocale('fr').toRelative() as string;

    this.user$.subscribe(user=> {
        this.profilPicture = user?.photoUrl
      }
    );
    this.message = this.post.message.text.content;

    if(this.chosenUser){

    // this.message = this.post.message.text.content;
      console.log("this.post.message.text.content :", this.post.message.text.content)
     //console.log("chosenUser FEEEEEED : ", this.chosenUser[0].substring(1));
     console.log("chosenUser FEEEEEED : ", this.chosenUser);
    // this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.element.videoId);
    //   this.sanitizerMessage = this.message.replace(this.chosenUser.username,'<span style="color:green">this.chosenUser.username</span>') + " ";
            // this.sanitizerMessage =  this.sanitizer.bypassSecurityTrustHtml(this.message.replace(this.chosenUser[0].substring(1),'<span style="color:green">{{this.message}}</span>') + " ");
    //this.message = this.message.replace(this.chosenUser[0].substring(1),'<span style="color:green">{{this.message}}</span>') + " "
    //           this.message = this.sanitizerMessage;
    // console.log("sanitizerMessage :",sanitizerMessage)
    //   this.message = this.sanitizerMessage()
    }
  }

  // sanitizerMessage() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.message.replace(this.chosenUser[0].substring(1),'<span style="color:green">{{this.message}}</span>') + " ");
  // }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.liked = !this.liked;
     this.postService.like(this.post);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes && this.sanitizerMessage){
      this.sanitizerMessage = this.message.replace(this.chosenUser,'<span style="color:green">this.chosenUser.username</span>') + " ";

      this.message = this.sanitizerMessage;
      // this.ngOnInit();
     //this.message = this.message.replace(this.chosenUser,'<span style="color:green">{{this.chosenUser}}</span>') + " "
    // this.message = ;
    }
  }
}
