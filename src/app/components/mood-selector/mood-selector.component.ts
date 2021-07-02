import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mood-selector',
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.scss'],
})
export class MoodSelectorComponent {

  @Input() set moodLevelInput(moodLevel: any) {
    this.aggressivityLevel = moodLevel;
    this.updateForm(moodLevel.value);
  };

  public aggressivityLevel: any;
  public rangeValue: number;

  constructor() {
  }

  onRangeChange() {
    this.aggressivityLevel.value = this.rangeValue;
  }

  updateForm(value: number) {
    this.rangeValue = value;
  }
}