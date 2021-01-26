import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifSideBarComponent } from './notif-side-bar.component';

describe('NotifSideBarComponent', () => {
  let component: NotifSideBarComponent;
  let fixture: ComponentFixture<NotifSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
