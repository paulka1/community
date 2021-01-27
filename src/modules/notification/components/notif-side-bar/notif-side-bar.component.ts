import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {AnyNotification} from "../../notification.model";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-notif-side-bar',
  templateUrl: './notif-side-bar.component.html',
  styleUrls: ['./notif-side-bar.component.less']
})
export class NotifSideBarComponent implements OnInit, OnChanges {

  notifications$: AnyNotification[];

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().then(notify =>
      this.notifications$ = notify
    )
    console.log("notifications$", this.notifications$);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes && this.notifications$){

    }
}
  // async getNotifications(){
  //   await this.notificationService.getNotifications()
  // }

  // async canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Promise<boolean> {
  //   if (this.authStore.isAuthenticated) {
  //     await this.userService.fetchInfo()
  //     return true;
  //   }
  //   this.router.navigate(["/splash/login"]);
  //   return false;
  // }
}
