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
   * Text for the target thread to talk about.
   */
  public targetThread: string;

  /**
   * Constructor to declare all the necesary to initialize the class.
   * @param trollnetStore Store for handling trollnets
   * @param toastService Service used to show toasts
   * @param alertService Service used to show alerts
   */
  constructor(private trollnetStore: TrollnetStore, private toastService: ToastService, private alertService: AlertService) {
    this.targetThread = 'Hello world';
  }

  /**
   * Detects active status and updates its status depending on the value from input trollnet.
   */
  private updateActiveStatus(): void {
    this.actuallyActivated = !!this.trollnet.isActive;
    this.activeStatusOn = this.actuallyActivated;
  }

  /**
   * @param event 
   */
  public handleActivationToggle(event: any) {
    this.interactionDisabled = true;
    if (this.activeStatusOn) {
      this.alertService.showAlert({
        header: 'Introduce the thread about which your trollnet will talk!',
        message: `This could be for example somebody's tweet.`,
        inputs: [
          {
            id: 'thread',
            name: 'thread',
            placeholder: 'I like Christmas.',
            value: this.targetThread,
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
            text: 'Generate conversation',
            handler: data => {
              this.targetThread = data['thread'];
              this.activateTrollnet();
            }
          }
        ]
      });
    } else {
      this.deactivateTrollnet();
    }
  }

  public activateTrollnet() {
    this.trollnetStore.activateTrollnet(this.trollnet, this.targetThread).then(
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
  
}
