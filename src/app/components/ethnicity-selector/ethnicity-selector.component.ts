import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ethnicity-selector',
  templateUrl: './ethnicity-selector.component.html',
  styleUrls: ['./ethnicity-selector.component.scss'],
})
export class EthnicitySelectorComponent {

  @Input() set ethnicityInput(input: any) {
    this.ethnicityValues = input;
    this.updateForm();
  };

  public form = [
    { value: '1', text: 'Asian', isChecked: false },
    { value: '2', text: 'Black', isChecked: false },
    { value: '3', text: 'Latino', isChecked: false },
    { value: '4', text: 'White', isChecked: false },
  ];

  private ethnicityValues: any;

  constructor() {
  }

  updateForm() {
    this.form.forEach(element => {
      element.isChecked = this.ethnicityValues.values.includes(element.value);
    });
  }

  onFormChange() {
    const ethnicityArray = [];
    this.form.forEach(element => {
      if (element.isChecked) ethnicityArray.push(element.value);
    });
    this.ethnicityValues.values = ethnicityArray;
  }
}
