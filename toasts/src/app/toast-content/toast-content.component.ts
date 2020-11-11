import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {IToaster} from '../../modules';

@Component({
  selector: 'app-toast-content',
  templateUrl: './toast-content.component.html',
  styleUrls: ['./toast-content.component.scss']
})
export class ToastContentComponent implements OnInit {

  @Input() toast: IToaster;
  @Output() removeToast: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    if (this.toast.duration) {
      setTimeout(() => {
        this.removeToast.emit(this.toast.id);
      }, this.toast.duration * 1000);
    }
  }

}
