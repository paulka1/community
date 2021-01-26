import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Post} from '../../post.model';
import {PostService} from '../../services/post.service';
import {DateTime} from "luxon";
import {Observable} from "rxjs";
import {User} from "../../../user/user.model";
import {UserStore} from "../../../user/user.store";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

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
  constructor(
    private postService: PostService,
    private store: UserStore
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
        console.log('this.user', user)
      }
    )
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.liked = !this.liked;
     this.postService.like(this.post)
  }
}
