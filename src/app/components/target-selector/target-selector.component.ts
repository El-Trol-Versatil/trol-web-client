import { Component, Input, OnInit } from '@angular/core';

const ENTER_KEYCODE: number = 13;

@Component({
  selector: 'app-target-selector',
  templateUrl: './target-selector.component.html',
  styleUrls: ['./target-selector.component.scss'],
})
export class TargetSelectorComponent implements OnInit {

  @Input() set targetSelectionInput(targetSelection: any) {
    this.targetValues = targetSelection;
    this.updateForm(targetSelection.profileValues, targetSelection.hashtagValues);
  };

  public profileInput: String;
  public hashtagInput: String;
  public targetValues: any;
  public profileList: String[];
  public hashtagList: String[];

  constructor() { }

  ngOnInit() {
    this.profileList = [];
    this.hashtagList = [];
  }

  updateForm(profiles: [], hashtags: []) {
    this.profileList = profiles;
    this.hashtagList = hashtags;
  }

  onProfileInputKeyPressed(keyCode) {
    if (keyCode === ENTER_KEYCODE) {
      this.enterProfileInputValue();
    }
  }

  
  onHashtagInputKeyPressed(keyCode) {
    if (keyCode === ENTER_KEYCODE) {
      this.enterHashtagInputValue();
    }
  }

  enterProfileInputValue() {
    if (this.profileInput) {
      this.profileList.push(this.profileInput);
      this.profileInput = undefined;
    }
  }

  enterHashtagInputValue() {
    if (this.hashtagInput) {
      this.hashtagList.push(this.hashtagInput);
      this.hashtagInput = undefined;
    }
  }

  removeProfile(profile: String) {
    this.profileList.forEach((element, index) => {
      element === profile && this.profileList.splice(index, 1);
    });
  }

  removeHashtag(hashtag: String) {
    this.hashtagList.forEach((element, index) => {
      element === hashtag && this.hashtagList.splice(index, 1);
    });
  }
}