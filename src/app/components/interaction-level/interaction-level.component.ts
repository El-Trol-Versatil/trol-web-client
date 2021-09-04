import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interaction-level',
  templateUrl: './interaction-level.component.html',
  styleUrls: ['./interaction-level.component.scss'],
})
export class InteractionLevelComponent {

  @Input() set interactionLevelInput(interactionLevel: any) {
    this.interactionValues = interactionLevel;
    this.updateForm(interactionLevel.values);
  };

  public dualRange: any;
  private interactionValues: any;
  public lowerValue: number;
  public upperValue: number;

  constructor() {
    this.dualRange = {};
  }

  onRangeChange() {
    this.interactionValues.values = {...this.dualRange};
  }

  updateForm(values: number[]) {
    this.dualRange = {...values};
  }
}