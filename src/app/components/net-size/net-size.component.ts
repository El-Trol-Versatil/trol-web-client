import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-net-size',
  templateUrl: './net-size.component.html',
  styleUrls: ['./net-size.component.scss'],
})
export class NetSizeComponent {

  @Input() set netsizeInput(netsize: any) {
    this.netSizeValues = netsize;
    this.updateForm(netsize.value);

  };

  public netSize: number;
  private netSizeValues: any;

  constructor() {
  }

  updateForm(value: number) {
    this.netSize = value;
  }

  onRangeChange() {
    this.netSizeValues.value = this.netSize;
  }
}