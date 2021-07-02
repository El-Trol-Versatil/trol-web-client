import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cultural-level',
  templateUrl: './cultural-level.component.html',
  styleUrls: ['./cultural-level.component.scss'],
})
export class CulturalLevelComponent {

  @Input() set culturalLevelInput(input: any) {
    this.culturalLevel = input;
    this.culturalLevel.value === 0 ?
    this.clearForm():
    this.updateForm(this.getFormIndex(this.culturalLevel.value));
  };

  public form = [
    { value: 1, text: '0-1 Childhood or Primary', isChecked: false },
    { value: 2, text: '2 Lower Secondary', isChecked: false },
    { value: 3, text: '3-4-5 Upper 2ndary, Post-2ndary or tertiary', isChecked: false },
    { value: 4, text: '6-7-8 Bachelor, Master or Doctoral', isChecked: false },
  ];

  private culturalLevel: any;

  constructor() {
  }

  clearForm() {
    this.form.forEach(element => {
      element.isChecked = false;
    });
  }

  updateForm(elementIndex: number) {
    const elementGotChecked: boolean = this.form[elementIndex].isChecked;
    this.form.forEach((element, index) => {
      if (!elementGotChecked && index < elementIndex) {
        element.isChecked = true;
      }
      if (elementGotChecked && index > elementIndex) {
        element.isChecked = false;
      }
    });
  }

  onFormChange(elementIndex: number) {
    this.updateForm(elementIndex);
    const elementGotChecked: boolean = this.form[elementIndex].isChecked;
    if (!elementGotChecked) {
      this.culturalLevel.value = this.form[elementIndex].value;
    } else {
      this.culturalLevel.value = elementIndex === 0 ? 0 : this.form[elementIndex-1].value;
    }
  }

  getFormIndex(culturalLevel: number): number {
    let position: number = 0;
    this.form.forEach((element, index) => {
      if (element.value === culturalLevel) position = index;
    });
    return position;
  }
}
