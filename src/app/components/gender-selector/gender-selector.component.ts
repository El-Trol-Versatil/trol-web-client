import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss'],
})
export class GenderSelectorComponent {

  @Input() set genderInput(input: any) {
    this.genderValues = input;
    this.updateForm();
  };

  public form = [
    { value: '1', text: 'Male', isChecked: false },
    { value: '2', text: 'Female', isChecked: false }
  ];

  private genderValues: any;

  constructor() {
  }

  updateForm() {
    this.form.forEach(element => {
      element.isChecked = this.genderValues.values.includes(element.value);
    });
  }

  onFormChange() {
    const genderArray = [];
    this.form.forEach(element => {
      if (element.isChecked) genderArray.push(element.value);
    });
    this.genderValues.values = genderArray;
  }
}
