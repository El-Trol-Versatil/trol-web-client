import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-age-selector',
  templateUrl: './age-selector.component.html',
  styleUrls: ['./age-selector.component.scss'],
})
export class AgeSelectorComponent {

  @Input() set ageIntervalInput(ageInterval: any) {
    this.ageRange = ageInterval;
    this.updateForm(ageInterval.values);
  };

  public dualRange: any;
  private ageRange: any;
  public lowerValue: number;
  public upperValue: number;

  constructor() {
    this.dualRange = {};
  }

  onRangeChange() {
    this.ageRange.values = {...this.dualRange};
  }

  updateForm(values: number[]) {
    this.dualRange = {...values};
  }
}