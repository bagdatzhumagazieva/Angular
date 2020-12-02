import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { IToaster } from 'src/modules';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toaster: IToaster[] = [];

  topStartToasts: IToaster[] = [];
  topCenterToasts: IToaster[] = [];
  topEndToasts: IToaster[] = [];

  centerStartToasts: IToaster[] = [];
  centerCenterToasts: IToaster[] = [];
  centerEndToasts: IToaster[] = [];

  bottomStartToasts: IToaster[] = [];
  bottomCenterToasts: IToaster[] = [];
  bottomEndToasts: IToaster[] = [];

  duration = 0;

  title = new FormControl('', [
    Validators.required,
  ]);
  content = new FormControl('', [
    Validators.required,
  ]);

  formGroup: FormGroup;

  color = 'IsFailed';
  colors: string[] = ['IsFailed', 'IsSuccess', 'IsStart', 'isClear'];

  vertical = 'Top';
  verticals: string[] = ['Top', 'Center', 'Bottom'];

  horizontal = 'Start';
  horizontals: string[] = ['Start', 'Center', 'End'];

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      showTitle: false,
      hasCloseButton: true,
      showDuration: false,
    });
  }

  ngOnInit(): void {
  }
  onFormSubmit = () => {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  formatLabel = (value: number) => {
    return value;
  }

  setDuration = (duration: number) => {
    this.duration = duration;
  }

  createToaster = () => {
    const newToast: IToaster = {
      id: this.toaster.length + 1,
      title: this.title.value,
      content: this.content.value,
      horizontal: this.horizontal,
      vertical: this.vertical,
      showTitle: this.formGroup.value.showTitle,
      hasCloseButton: this.formGroup.value.hasCloseButton,
      showDuration: this.formGroup.value.showDuration,
      color: this.color,
      duration: this.duration,
    };
    this.toaster = [newToast, ...this.toaster];
    this.addToast(this.toaster);
  }

  removeToast = (id: number) => {
    this.toaster = this.toaster.filter(e => e.id !== id);
    this.addToast(this.toaster);
  }

  addToast = (toasts: IToaster[]) => {
    this.topStartToasts = toasts.filter(e => e.vertical === 'Top' && e.horizontal === 'Start');
    this.topCenterToasts = toasts.filter(e => e.vertical === 'Top' && e.horizontal === 'Center');
    this.topEndToasts = toasts.filter(e => e.vertical === 'Top' && e.horizontal === 'End');

    this.centerStartToasts = toasts.filter(e => e.vertical === 'Center' && e.horizontal === 'Start');
    this.centerCenterToasts = toasts.filter(e => e.vertical === 'Center' && e.horizontal === 'Center');
    this.centerEndToasts = toasts.filter(e => e.vertical === 'Center' && e.horizontal === 'End');

    this.bottomStartToasts = toasts.filter(e => e.vertical === 'Bottom' && e.horizontal === 'Start');
    this.bottomCenterToasts = toasts.filter(e => e.vertical === 'Bottom' && e.horizontal === 'Center');
    this.bottomEndToasts = toasts.filter(e => e.vertical === 'Bottom' && e.horizontal === 'End');
  }

}
