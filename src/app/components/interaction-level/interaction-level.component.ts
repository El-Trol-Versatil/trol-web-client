import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interaction-level',
  templateUrl: './interaction-level.component.html',
  styleUrls: ['./interaction-level.component.scss'],
})
export class InteractionLevelComponent {

  @Input() set interactionLevelInput(interactionLevel: any) {
    this.interactionValues = interactionLevel;
    this.updateForm(interactionLevel.value);
  };

  public interactionLevel: number;
  private interactionValues: any;

  constructor() {
  }

  updateForm(value: number) {
    this.interactionLevel = value;
  }

  onRangeChange() {
    this.interactionValues.value = this.interactionLevel;
  }
}