// Basic
import { Component, Input } from '@angular/core';

// Stores
import { TrollnetStore } from '../../stores/trollnet.store';

// Services
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';

// Models
import { TrollnetModel } from '../../core/model/trollnet.model';

/**
 * Preview for each trollnet in the gallery that shows the core options of the trollnet.
 */
@Component({ selector: 'trollnet-preview', templateUrl: 'trollnet-preview.component.html' })
export class TrollnetPreviewComponent {

  /**
   * The info for the represented trollnet.
   */
  @Input() set trollnetInfo(trollnet: TrollnetModel) {
    this.interactionDisabled = true;
    this.trollnet = trollnet;
    this.updateActiveStatus();
    this.updateProgressBars();
    this.interactionDisabled = false;
  };
  /**
   * The info for the represented trollnet.
   */
  public trollnet: TrollnetModel;
  /**
   * Flag for when the activation is actually on (value from input trollnet is ON).
   */
  public actuallyActivated: boolean;
  /**
   * Flag for disabling user interaction during back operations.
   */
  public interactionDisabled: boolean;
  /**
   * Flag for the active status toggle.
   */
  public activeStatusOn: boolean;
  /**
   * Number that indicates the completed percentage of the creation progress. 
   */
  public creationProgress: number;
  /**
   * Number that indicates the completed percentage of the training progress. 
   */
   public trainingProgress: number;
  /**
   * Text for the target account to talk with.
   */
  public targetAccount: string;

  /**
   * Constructor to declare all the necesary to initialize the class.
   * @param trollnetStore Store for handling trollnets
   * @param toastService Service used to show toasts
   * @param alertService Service used to show alerts
   */
  constructor(private trollnetStore: TrollnetStore, private toastService: ToastService, private alertService: AlertService) {
    this.targetAccount = 'kike_remo';
  }

  /**
   * Detects active status and updates its status depending on the value from input trollnet.
   */
  private updateActiveStatus(): void {
    this.actuallyActivated = !!this.trollnet.isActive;
    this.activeStatusOn = this.actuallyActivated;
  }

  /**
   * Update creation and training progress bars.
   */
  public updateProgressBars() {
    this.creationProgress = this.trollnet.creationStatus/100;
    this.trainingProgress = this.trollnet.trainingStatus/100;
  }

  /**
   * @param event 
   */
  public handleActivationToggle(event: any) {
    this.interactionDisabled = true;
    if (this.activeStatusOn) {
      this.alertService.showAlert({
        header: 'Introduce the Twitter account with which your trollnet will interact!',
        message: `This could be for example your Twitter account.`,
        inputs: [
          {
            id: 'twitterAccount',
            name: 'twitterAccount',
            placeholder: 'kike_remo',
            value: this.targetAccount,
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              this.activeStatusOn = false;
              this.interactionDisabled = false;
            }
          },
          {
            text: 'Troll that profile',
            handler: data => {
              this.targetAccount = data['twitterAccount'];
              this.activateTrollnet();
            }
          }
        ]
      });
    } else {
      this.deactivateTrollnet();
    }
  }

  editName(): void {
    this.alertService.showAlert({
      header: 'Rename this trollnet:',
      inputs: [
        {
          id: 'name',
          name: 'name',
          placeholder: 'New trollnet name',
          value: this.trollnet.properties.customName,
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Rename',
          handler: data => {
            this.renameTrollnet(data['name']);
          }
        }
      ]
    });
  }

  delete(): void {
    this.alertService.showAlert({
      header: `You will delete the trollnet ${this.trollnet.properties.customName}`,
      message: 'This action cannot be reverted.',

      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            this.deleteTrollnet();
          }
        }
      ]
    });
  }

  public renameTrollnet(newName: string) {
    this.trollnetStore.renameTrollnet(this.trollnet, newName).then(
      () => {
      }, (error) => {
        this.toastService.showToast({message: `Failed to rename trollnet ${this.trollnet.properties.customName}`});
    });
  }

  public activateTrollnet() {
    this.trollnetStore.activateTrollnet(this.trollnet, this.targetAccount).then(
      () => {
        this.actuallyActivated = true;
        this.interactionDisabled = false;
      }, (error) => {
        this.toastService.showToast({message: `Failed to activate trollnet ${this.trollnet.properties.customName}`});
        this.activeStatusOn = false;
        this.interactionDisabled = false;
    });
  }

  public deactivateTrollnet() {
    this.trollnetStore.deactivateTrollnet(this.trollnet).then(
      () => {
        this.actuallyActivated = false;
        this.interactionDisabled = false;
      }, (error) => {
        this.toastService.showToast({message: `Failed to deactivate trollnet ${this.trollnet.properties.customName}`});
        this.activeStatusOn = true;
        this.interactionDisabled = false;
    });
  }
  
  public deleteTrollnet() {
    this.trollnetStore.deleteTrollnet(this.trollnet.id).then(
      () => {
        this.toastService.showToast({message: `Trollnet ${this.trollnet.properties.customName} deleted`});
      }, (error) => {
        this.toastService.showToast({message: `Failed to delete trollnet ${this.trollnet.properties.customName}`});
    });
  }
}
