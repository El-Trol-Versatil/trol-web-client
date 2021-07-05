//Basic
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

/**
 * Service to create generic toasts.
 */
@Injectable()
export class ToastService {

  /**
   * Default options for the toast.
   */
  private defaultOptions: ToastOptions;

  /**
   * Toast service constructor.
   * @param toastController Instance of toast controller.
   */
  constructor(private toastController: ToastController) {
    this.defaultOptions = {
      duration: 2500,
      position: 'bottom'
    };
  }

  /**
   * Shows a toast with options.
   * @param options Toast options from @link https://ionicframework.com/docs/api/components/toast/ToastController/#advanced
   */
  async showToast(options: ToastOptions): Promise<any> {
    let usedOptions = { ...this.defaultOptions, ...options };
    let toast = await this.toastController.create(usedOptions);
    toast.present();
  }
}