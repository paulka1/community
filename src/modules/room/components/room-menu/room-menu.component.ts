import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import {Room, RoomType} from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  @Output() displayNotification = new EventEmitter;

  roomId$: Observable<string | undefined>;

  rooms: Room[];

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomService: RoomService, private router: Router) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    let response = await this.feedStore.roomId$
  }

  goToRoom(room: Room) {
    let id = room.id;
    this.router.navigate([`app/${id}`]);
  }

  createRoomDone(){
    this.ngOnInit();
  }

  createNotification(notify: any){
    console.log("notify createNotification", notify)
    this.displayNotification.emit(notify);
  }
}
