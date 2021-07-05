//Basic
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

/**
 * Service to create generic loadings.
 */
@Injectable()
export class LoadingService {

  /**
   * current loading
   */
  private currentLoading: HTMLIonLoadingElement;

  /**
   * Default options for the loading.
   */
  private defaultOptions: LoadingOptions;

  /**
   * flag to prevent dismissing a locked loading.
   */
  private isViewLocked: boolean;

  /**
   * Loading service constructor.
   * @param loadingController Controller to generate a loading dialog.
   */
  constructor(private loadingController: LoadingController) {
    this.currentLoading = null;
    this.defaultOptions = {
      backdropDismiss: true
    };
    this.isViewLocked = false;
  }

  /**
   * Shows a loading with options.
   * @param options Loading options 
   * @param lockView flag to prevent any other loading to show up until this one is dismissed, or force show loading.
   */
  async show(options: LoadingOptions, lockView?: boolean): Promise<any> {
    if (!this.isViewLocked || lockView) {
      let usedOptions = { ...this.defaultOptions, ...options };
      this.currentLoading = await this.loadingController.create(usedOptions);
      this.currentLoading.present();
      this.isViewLocked = lockView;
    }
  }

  /**
   * Dismiss the current loading.
   * @param forceUnlock flag to unlock the view for future loadings.
   */
  public dismiss(forceUnlock?: boolean): void {
    if (!this.isViewLocked || forceUnlock) {
      if (this.currentLoading) {
        this.currentLoading.dismiss();
        this.currentLoading = null;
        this.isViewLocked = false;
      }
    }
  }

  /**
   * Set content to the current loading.
   */
  public setContent(text): void {
    if (this.currentLoading) {
      this.currentLoading.textContent = text;
    }
  }
}