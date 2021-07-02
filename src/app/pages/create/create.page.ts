import { Component, OnInit } from '@angular/core';

// import { TrollnetStore } from '../../stores/trollnet.store';
// import { LoadingService } from '../../services/loading.service';
// import { ToastService } from '../../services/toast.service';

// import { TrollnetDraftModel } from '../../core/model/trollnet.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public draftNet: any;

  /**
   * Trollnet creation page constructor.
  //  * @param trollnetStore Store for handling trollnets
  //  * @param loadingService Service used to generate a loading dialog
  //  * @param toastService Service used to show toasts.
   */
  // constructor(private trollnetStore: TrollnetStore, private loadingService: LoadingService, private toastService: ToastService) {
    constructor() {
    }

  ngOnInit() {
    this.setNewDraft();
  }

  setNewDraft(): void {
    this.draftNet = {
      customName: 'New Trollnet',
      genders: {
        values: []
      },
      ageInterval: {
        values: {lower: 18, upper: 100}
      },
      ethnicity: {
        values: []
      },
      culturalLevel: {
        value: 0
      },
      moodLevel: {
        value: 0
      },
      keywords: {
        values: []
      },
      netsize: {
        value: 5
      },
      interactionLevel: {
        value: 1
      },
      targetSelection: {
        profileValues: [],
        hashtagValues: []
      }
    };
  }

  setDefaultDraft() {
    this.draftNet = {
      customName: 'Ultras Madrid',
      genders: {
        values: [2]
      },
      ageInterval: {
        values: {lower: 25, upper: 35}
      },
      ethnicity: {
        values: [3, 4]
      },
      culturalLevel: {
        value: 2
      },
      moodLevel: {
        value: 1
      },
      keywords: {
        values: ['Football', 'Real Madrid', 'Ultra']
      },
      netsize: {
        value: 10
      },
      interactionLevel: {
        value: 2
      },
      targetSelection: {
        profileValues: ['realmadrid', 'FondoSur_1980', 'RMadridistaReal'],
        hashtagValues: ['RealMadrid', 'HalaMadrid', 'SiempreFieles', 'UltrasSur']
      }
    };
  }

  createNet(): void {
    // this.trollnetStore.createNewTrollnet(this.draftNet).then(
    //   () => this.toastService.showToast({ message: `Trollnet '${this.draftNet.customName}' successfully created.` }),
    //   error => this.toastService.showToast({ message: error })
    // );
  }

}
