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
  @Input() className?: string;
  @Output() removeToast: EventEmitter<number> = new EventEmitter<number>();

  removeAnimationClass = '';
  animationRemove = false;

  constructor() { }

  ngOnInit(): void {
    this.removeAnimationClass = `${this.className}_remove`;
    if (this.toast.duration) {
      setTimeout(() => {
        this.animationRemove = true;
        setTimeout(() => {
          this.removeToast.emit(this.toast.id);
          this.animationRemove = false;
        }, 3000);
      }, this.toast.duration * 1000);
    }
  }

  onRemoveToast(id: number) {
    this.animationRemove = true;
    setTimeout(() => {
      this.animationRemove = false;
      setTimeout(() => {
        this.removeToast.emit(id);
      }, this.toast.duration * 1000);
    }, 3000);
  }

}
