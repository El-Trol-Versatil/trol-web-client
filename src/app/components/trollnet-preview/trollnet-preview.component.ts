// Basic
import { Component, Input } from '@angular/core';

// Stores
import { TrollnetStore } from '../../stores/trollnet.store';

// Services
import { ToastService } from '../../services/toast.service';

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
   * Constructor to declare all the necesary to initialize the class.
   * @param trollnetStore Store for handling trollnets
   * @param toastService Service used to show toasts.
   */
  constructor(private trollnetStore: TrollnetStore, private toastService: ToastService) {
  }

  /**
   * Detects active status and updates its status depending on the value from input trollnet.
   */
  private updateActiveStatus(): void {
    this.actuallyActivated = !!this.trollnet.isActive;
    this.activeStatusOn = this.actuallyActivated;
  }

  /**
   * Requests light power changes depending on the manual toggle of the main light button.
   * @param event 
   */
  public toggleTrollnetActiveStatus(event: any) {
    this.interactionDisabled = true;
    if (this.activeStatusOn) {
      this.trollnetStore.activateTrollnet(this.trollnet).then(
        () => {
          this.actuallyActivated = true;
          this.interactionDisabled = false;
        }, (error) => {
          this.toastService.showToast({message: `Failed to activate trollnet ${this.trollnet.properties.customName}`});
          this.activeStatusOn = false;
          this.interactionDisabled = false;
        });
    } else {
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

  public editTrollnet(): void {
    // if (!this.interactionDisabled) {
    //   this.navigationService.goTo('page-edit', { trollnetId: this.trollnet.id });
    // }
  }
}
