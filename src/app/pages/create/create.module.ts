import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';

import { AgeSelectorComponent } from '../../components/age-selector/age-selector.component';
import { GenderSelectorComponent } from '../../components/gender-selector/gender-selector.component';
import { EthnicitySelectorComponent } from '../../components/ethnicity-selector/ethnicity-selector.component';
import { AvatarSelectorComponent } from '../../components/avatar-selector/avatar-selector.component';
import { CulturalLevelComponent } from '../../components/cultural-level/cultural-level.component';
import { MoodSelectorComponent } from '../../components/mood-selector/mood-selector.component';
import { KeywordsComponent } from '../../components/keywords/keywords.component';
import { NetSizeComponent } from '../../components/net-size/net-size.component';
import { InteractionLevelComponent } from '../../components/interaction-level/interaction-level.component';
import { TargetSelectorComponent } from '../../components/target-selector/target-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule
  ],
  declarations: [
    CreatePage,
    AgeSelectorComponent,
    GenderSelectorComponent,
    EthnicitySelectorComponent,
    AvatarSelectorComponent,
    CulturalLevelComponent,
    MoodSelectorComponent,
    KeywordsComponent,
    NetSizeComponent,
    InteractionLevelComponent,
    TargetSelectorComponent,
  ]
})
export class CreatePageModule {}
