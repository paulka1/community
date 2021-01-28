import {Component, OnInit} from '@angular/core';
import {AnyNotification} from "../../notification.model";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-notif-side-bar',
  templateUrl: './notif-side-bar.component.html',
  styleUrls: ['./notif-side-bar.component.less']
})
export class NotifSideBarComponent implements OnInit {

  notifications$: AnyNotification[];

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    /** Get the notifications **/
    this.notificationService.getNotifications().then(notify =>
      this.notifications$ = notify
    );
  };

}
