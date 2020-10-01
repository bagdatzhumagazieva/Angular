import { Component, OnInit } from '@angular/core';
import {Operation, Story} from '../models';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  showModal = false;
  inputValue = 0;
  curOperation: Operation;
  resValue = 0;
  historyInput = '';
  isLastEqual = false;
  lastValForEqual: number;
  isPercent = false;
  memoryModal: string;
  memories: number[] = [];
  story: Story[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  setShowModal = () => {
    this.showModal = !this.showModal;
  }

  setModalMemory = () => {
    this.memoryModal = this.memoryModal === 'memory' ? '' : 'memory';
  }

  setModalStory = () => {
    this.memoryModal = this.memoryModal === 'story' ? '' : 'story';
  }

  handleChange = (num: number) => {
    if (this.isLastEqual) {
      this.clear();
      this.inputValue = num;
    }
    else {
      this.inputValue = !this.inputValue ? num : this.inputValue * 10 + num;
    }
  }

  clear = () => {
    if (this.isLastEqual) {
      this.story = [{body: this.historyInput, value: this.inputValue}, ...this.story];
    }
    this.inputValue = 0;
    this.historyInput = '';
    this.resValue = 0;
    this.isLastEqual = false;
    this.isPercent = false;
  }

  clearEntry = () => {
    if (this.isLastEqual) {
      this.clear();
    } else {
      this.inputValue = 0;
    }
  }

  clearElement = () => {
    if (this.isLastEqual) {
      this.historyInput = '';
    } else {
      this.inputValue = this.inputValue ? Math.floor(this.inputValue / 10) : 0;
    }
  }

  plusMinus = () => {
    this.inputValue = -1 * this.inputValue;
  }

  addPoint = () => {
    this.inputValue = Number(`${this.inputValue}.0`)
  }

  divideByOne = () => {
    this.historyInput = `1 / (${this.inputValue})`;
    this.inputValue = 1 / this.inputValue;
    this.resValue = this.inputValue;
    this.isLastEqual = true;
  }

  getSqr = () => {
    this.historyInput = `sqr (${this.inputValue})`;
    this.inputValue = Math.pow(this.inputValue, 2);
    this.resValue = this.inputValue;
    this.isLastEqual = true;
  }

  getSqrt = () => {
    this.historyInput = `sqrt (${this.inputValue})`;
    this.inputValue = Math.pow(this.inputValue, 0.5);
    this.resValue = this.inputValue;
    this.isLastEqual = true;
  }

  onCLickOperation = (type: Operation) => {
    if (this.isLastEqual) {
      this.historyInput = `${this.inputValue} ${type}`;
      this.inputValue = 0;
    }
    else {
      if (this.inputValue) {
        if (this.resValue) {
          this.resValue = this.calcOperation(this.curOperation, this.resValue, this.inputValue);
        } else {
          this.resValue = this.inputValue;
        }
        this.historyInput = this.historyInput + ` ${this.inputValue} ${type}`;
        this.inputValue = 0;
      } else {
        this.historyInput = this.historyInput.slice(0, this.historyInput.length - 2) + ` ${type}`;
      }
    }
    this.curOperation = type;
    this.isLastEqual = false;
  }

  equalClick = () => {
    if (this.isLastEqual) {
      this.historyInput = `${this.resValue}` +
        this.historyInput.slice(this.historyInput.length - 6, this.historyInput.length);
      this.inputValue = this.calcOperation(this.curOperation, this.resValue, this.lastValForEqual);
      this.resValue = this.inputValue;
    } else {
      this.isLastEqual = true;
      this.lastValForEqual = this.inputValue;
      this.historyInput += ` ${!this.isPercent ? this.inputValue : ''} =`;
      this.inputValue = this.calcOperation(this.curOperation, this.resValue, this.inputValue);
      this.resValue = this.inputValue;
      this.isPercent = false;
    }
  }

  calcOperation = (type: Operation, a: number, b: number) => {
    return type === '+' ? a + b : type === '-' ?
      a - b : type === '*' ? a * b : a / b;
  }

  close = () => {
    this.clear();
    this.showModal = false;
  }

  getPercent = () => {
    this.isPercent = true;
    this.inputValue =
      this.curOperation === '+' || this.curOperation === '-' ? (this.inputValue * this.resValue) / 100
        : this.inputValue / 100;
    this.historyInput = this.historyInput + ` ${this.inputValue}`;
  }

  memorySave = () => {
    this.memories = [this.inputValue, ...this.memories];
  }

  memoryClear = () => {
    this.memories = [this.inputValue];
    this.clear();
    this.inputValue = this.memories[0];
    this.memories = [];
  }

  memoryRead = () => {
    this.inputValue = this.memories[0];
  }

  memoryPlus = () => {
    this.memories = [this.memories[0] + this.inputValue, ...this.memories.slice(1, 100)];
  }

  memoryMinus = () => {
    this.memories = [this.memories[0] - this.inputValue, ...this.memories.slice(1, 100)];
  }

  storyItemClick = (item: Story) => {
    this.historyInput = item.body;
    this.inputValue = item.value;
    this.resValue = item.value;
    this.isLastEqual = true;
    this.memoryModal = '';
  }
}
