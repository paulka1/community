import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked, OnChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { FeedStore } from '../../feed.store';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit, OnChanges {
  @ViewChild('feed') private bottomRef: ElementRef;

  roomId$: Observable<string | undefined>;

  posts$: Observable<Post[]>;

  constructor(private postService: PostService, private store: FeedStore) {
    this.posts$ = this.store.get(s => s.posts);
    this.roomId$ = this.store.roomId$;
  }

  async ngOnInit() {
    console.log("this.posts$", this.posts$)
    this.roomId$.subscribe({
      next: async (roomId) => {
        if (roomId) {
          console.log("roomID",roomId)
          await this.postService.fetch(roomId, {
            page: 0,
            perPage: 50
          });
        }
      }
    })
  }

  ngOnChanges(){
    console.log("this.posts$", this.posts$)

  }
}
