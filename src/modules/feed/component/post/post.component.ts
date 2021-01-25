import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Post} from '../../post.model';
import {PostService} from '../../services/post.service';

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

  urlImage:boolean;
  constructor(
    private postService: PostService,
  ) {
  }

  ngOnInit(): void {
     console.log("postSansFind :", this.post);
    console.log("post :", this.post.message.attachements.find( c => c.type === "image"));
    if(this.post.message.attachements.find( item => {item.type === "image"})){
      this.urlImage = true;
    }
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
  }
}
