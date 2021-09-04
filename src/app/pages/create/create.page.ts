import { Component, OnInit } from '@angular/core';

import { TrollnetStore } from '../../stores/trollnet.store';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';
import { StorageService } from '../../services/storage.service';
import { TrollnetService } from '../../api/trollnet.service';

import { TrollnetDraftModel } from '../../core/model/trollnet.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public draftNet: TrollnetDraftModel;

  /**
   * Trollnet creation page constructor.
   * @param trollnetStore Store for handling trollnets
   * @param loadingService Service used to generate a loading dialog
   * @param alertService Service used to show toasts
   * @param storageService Service used to show toasts
   * @param trollnetApiService Service used to show toasts
   */
    constructor(private trollnetStore: TrollnetStore, private loadingService: LoadingService, private toastService: ToastService,
      private alertService: AlertService, private storageService: StorageService, private trollnetApiService: TrollnetService) {
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
        values: {lower: 0, upper: 2}
      },
      moodLevel: {
        values: {lower: -2, upper: 2}
      },
      keywords: {
        values: []
      },
      likes: {
        values: []
      },
      dislikes: {
        values: []
      },
      netsize: {
        value: 5
      },
      interactionLevel: {
        values: {lower: 1, upper: 5}
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
        values: ['2']
      },
      ageInterval: {
        values: {lower: 25, upper: 35}
      },
      ethnicity: {
        values: ['3', '4']
      },
      culturalLevel: {
        values: {lower: 0, upper: 1}
      },
      moodLevel: {
        values: {lower: -3, upper: 3}
      },
      keywords: {
        values: ['Football', 'Sé de esto1', 'Sé de esto2', 'Sé de esto3', 'Sé de esto4', 'Sé de esto5', 'Sé de esto6']
      },
      likes: {
        values: ['Real Madrid', 'Megusta1', 'Megusta2', 'Megusta3', 'Megusta4', 'Megusta5', 'Megusta6']
      },
      dislikes: {
        values: ['Barcelona', 'Odio1', 'Odio2', 'Odio3', 'Odio4', 'Odio5', 'Odio6', 'Odio7']
      },
      netsize: {
        value: 15
      },
      interactionLevel: {
        values: {lower: 2, upper: 4}
      },
      targetSelection: {
        profileValues: ['realmadrid', 'FondoSur_1980', 'RMadridistaReal'],
        hashtagValues: ['RealMadrid', 'HalaMadrid', 'SiempreFieles', 'UltrasSur']
      }
    };
  }

  nameItAndCreateNet(): void {
    this.alertService.showAlert({
      header: 'Give it a name!',
      message: `You will identify your trollnet by this name.`,
      inputs: [
        {
          id: 'name',
          name: 'name',
          placeholder: 'New trollnet name',
          value: this.draftNet.customName,
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Create',
          handler: data => {
            this.draftNet.customName = data['name'];
            this.createNet();
          }
        }
      ]
    });
  }

  createNet(): void {
    this.loadingService.show({
      message: 'Creating...',
    });
    this.trollnetStore.createNewTrollnet(this.draftNet).then(
      () => {
        this.loadingService.dismiss();
        this.toastService.showToast({ message: `Trollnet '${this.draftNet.customName}' successfully created.` });
      },
      error => {
        this.loadingService.dismiss();
        this.toastService.showToast({ message: `Failed to create '${this.draftNet.customName}' trollnet.` });
      },
    );
  }

}