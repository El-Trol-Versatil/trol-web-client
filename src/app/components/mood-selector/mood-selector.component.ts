import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mood-selector',
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.scss'],
})
export class MoodSelectorComponent {

  @Input() set moodLevelInput(moodLevel: any) {
    this.aggressivityLevel = moodLevel;
    this.updateForm(moodLevel.values);
  };

  public dualRange: any;
  private aggressivityLevel: any;

  constructor() {
    this.dualRange = {};
  }

  onRangeChange() {
    this.aggressivityLevel.values = {...this.dualRange};
  }

  updateForm(values: number[]) {
    this.dualRange = {...values};
  }
}