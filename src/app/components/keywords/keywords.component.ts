import { Component, Input, OnInit } from '@angular/core';

const ENTER_KEYCODE: number = 13;

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss'],
})
export class KeywordsComponent implements OnInit {

  @Input() set keywordsInput(keywords: any) {
    this.keywordsValues = keywords;
    this.updateForm(keywords.values);
  };

  /**
   * The subtitle that describes what is this keywords component for.
   */
  @Input() public subtitle: string;
  /**
   * The color associated to what this keywords component is for.
   */
  @Input() public keywordsColor: string;

  public keywordInput: String;
  public keywordsValues: any;
  public keywordsList: String[];

  constructor() { }

  ngOnInit() {
    this.keywordsList = [];
  }

  updateForm(list: []) {
    this.keywordsList = list;
  }

  onInput(val){
    console.log(val);
  }

  onInputKeyPressed(keyCode) {
    if (keyCode === ENTER_KEYCODE) {
      this.enterInputValue();
    }
  }

  enterInputValue() {
    if (this.keywordInput) {
      this.keywordsList.push(this.keywordInput);
      this.keywordInput = undefined;
      this.keywordsValues.values = this.keywordsList;
    }
  }

  removeKeyword(keyword: String) {
    this.keywordsList.forEach((element, index) => {
      element === keyword && this.keywordsList.splice(index, 1);
    });
    this.keywordsValues.values = this.keywordsList;
  }
}
