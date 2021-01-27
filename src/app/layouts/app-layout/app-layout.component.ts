import { Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit {


  showDrawer: boolean = false;
  constructor(private notification: NzNotificationService) {
  }

  ngOnInit(): void {
  }

  onToggleNotifications() {
    this.showDrawer = !this.showDrawer;
  }

  createBasicNotification(notify:any): void {
    this.notification
      .blank(
        'Une room a été crée',
        `La room ${notify.name} vient d'être crée.`
      )
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

  displayNotification(notify:any){
    console.log("notify displayNotification", notify);
    this.createBasicNotification(notify);
  }
}
