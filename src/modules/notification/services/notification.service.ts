import { Injectable } from "@angular/core";
import { NotificationStore } from "../notification.store";
import { NotificationQueries } from "./notification.queries";
import {AnyNotification} from "../notification.model";
import {Subject} from "rxjs";

@Injectable()
export class NotificationService {

  notifications:AnyNotification[];

  constructor(
    private store: NotificationStore,
    private queries: NotificationQueries
  ) {

  }


  markAsViewed() {
    this.store.mutate(s => {
      return {
        ...s,
        unread: 0
      };
    });
  }

  async getNotifications(): Promise<AnyNotification[]> {
    this.notifications = await this.queries.getNotifications();
    console.log("OOOOOOO", this.notifications);
    return this.notifications;
  }
}
