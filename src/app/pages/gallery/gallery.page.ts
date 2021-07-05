import { Component } from '@angular/core';

// Services
import { TrollnetStore } from '../../stores/trollnet.store';
import { LoadingService } from '../../services/loading.service';

// Models
import { TrollnetModel } from '../../core/model/trollnet.model';

import { filter, first,  } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {

  /**
   * Set of existing trollnets.
   */
  public retrievedTrollnets: TrollnetModel[];

    /**
 * Trollnet gallery page constructor.
   * @param trollnetStore Store for handling trollnets
   * @param loadingService Service used to generate a loading dialog
   */
  constructor(private trollnetStore: TrollnetStore, private loadingService: LoadingService) {
    this.retrievedTrollnets = [];
    this.loadingService.show({
      message: 'Loading trollnets...'
    });
    this.trollnetStore.trollnetsChange().subscribe(
      (storeTrollnets: TrollnetModel[]) => {
        this.retrievedTrollnets = storeTrollnets;
      });
    this.trollnetStore.trollnetsChange().pipe(
      filter((array: TrollnetModel[]) => !!array.length),
      first())
    .subscribe(() => this.loadingService.dismiss());
  }
}
