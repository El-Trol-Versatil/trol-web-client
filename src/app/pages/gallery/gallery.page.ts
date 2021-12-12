import { Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { TrollnetStore } from '../../stores/trollnet.store';
import { LoadingService } from '../../services/loading.service';

// Models
import { TrollnetModel } from '../../core/model/trollnet.model';

import { filter, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit, OnDestroy {

  /**
   * Set of existing trollnets.
   */
  public retrievedTrollnets: TrollnetModel[];

  /**
   * Subscription that listens to change in trollnets list from its store.
   */
   trollnetsChange: Subscription;
  /**
   * Subscription that checks when the first list of items has arrived, to dismiss the loading spinner.
   */
   loadingDismiss: Subscription;

  /**
* Trollnet gallery page constructor.
 * @param trollnetStore Store for handling trollnets
 * @param loadingService Service used to generate a loading dialog
 */
  constructor(private trollnetStore: TrollnetStore, private loadingService: LoadingService) {
    this.retrievedTrollnets = [];
  }

  ngOnInit() {
    this.loadingService.show({
      message: 'Loading trollnets...'
    });
    this.trollnetsChange = this.trollnetStore.trollnetsChange().subscribe((storeTrollnets: TrollnetModel[]) => {
      this.retrievedTrollnets = storeTrollnets;
    });
    this.loadingDismiss = this.trollnetStore.trollnetsChange().pipe(
      filter((array: TrollnetModel[]) => !!array.length),
      first())
      .subscribe(() => {
        setTimeout(() => {
          this.loadingService.dismiss();
        }, 200);
      });
  }

  ngOnDestroy() {
    this.trollnetsChange.unsubscribe();
    this.loadingDismiss.unsubscribe();
  }
}
