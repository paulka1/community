import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  @Output() createEvent = new EventEmitter;
  @Output() createNotification = new EventEmitter;

  isVisible: boolean = false;
  model = new CreateRoomFormModel();
  noValid: boolean;

  constructor(private roomService: RoomService) {

  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.model.type && this.model.name) {
      /** Création d'une nouvelle room avec nom et type **/
      let response = await this.roomService.create(this.model.name, this.model.type);
      this.noValid = false;
      this.close();
      /** Création d'une notification pour la création d'une nouvelle room **/
      this.createNotification.emit(this.model);
    } else {
      this.noValid = true;
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.form.resetForm(new CreateRoomFormModel());
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.createEvent.emit();
  }
}
