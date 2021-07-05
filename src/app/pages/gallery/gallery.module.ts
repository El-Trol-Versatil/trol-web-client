import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';

//Components
import { KeywordsComponent } from '../../components/keywords/keywords.component';
import { TrollnetPreviewComponent } from '../../components/trollnet-preview/trollnet-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule
  ],
  declarations: [
    GalleryPage,
    KeywordsComponent,
    TrollnetPreviewComponent,
  ]
})
export class GalleryPageModule {}
