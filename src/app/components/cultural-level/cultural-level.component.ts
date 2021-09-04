import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cultural-level',
  templateUrl: './cultural-level.component.html',
  styleUrls: ['./cultural-level.component.scss'],
})
export class CulturalLevelComponent {

  @Input() set culturalLevelInput(formalityInterval: any) {
    this.culturalLevel = formalityInterval;
    this.updateForm(formalityInterval.values);
  };

  public dualRange: any;
  private culturalLevel: any;

  constructor() {
    this.dualRange = {};
  }

  onRangeChange() {
    this.culturalLevel.values = {...this.dualRange};
  }

  updateForm(values: number[]) {
    this.dualRange = {...values};
  }
}
