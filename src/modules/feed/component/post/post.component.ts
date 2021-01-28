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
    /** Check le type de attachement pour affichage**/
    if(this.post.message.attachements.find( item => item.type === "image")){
      this.urlImage = true;
    }
    if(this.post.message.attachements.find( item => item.type === "video")){
      this.urlVideo = true;
    }
    if(this.post.message.attachements.find( item => item.type === "youtube")){
      this.urlYoutube = true;
    }
    /** Formatage date**/
    const t = DateTime.fromISO( this.post.createdAt as string ).toLocal();
    this.postDate = t.setLocale('fr').toRelative() as string;

    this.user$.subscribe(user=> {
        this.profilPicture = user?.photoUrl
      }
    );
    this.message = this.post.message.text.content;
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  /**Like des posts**/
  async like() {
    this.liked = !this.liked;
     this.postService.like(this.post);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes && this.sanitizerMessage){
      /** Color the mentionUsername **/
      this.sanitizerMessage = this.message.replace(this.chosenUser,'<span style="color:green">this.chosenUser.username</span>') + " ";
      this.message = this.sanitizerMessage;

    }
  }
}
