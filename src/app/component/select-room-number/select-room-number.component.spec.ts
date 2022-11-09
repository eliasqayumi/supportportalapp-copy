import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoomNumberComponent } from './select-room-number.component';

describe('SelectRoomNumberComponent', () => {
  let component: SelectRoomNumberComponent;
  let fixture: ComponentFixture<SelectRoomNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRoomNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoomNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
