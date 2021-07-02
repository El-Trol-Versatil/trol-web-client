//Basic
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

/**
 * Service to create generic alerts.
 */
@Injectable()
export class AlertService {

  /**
   * Alert service constructor.
   * @param alertController Instance of alert controller.
   */
  constructor(private alertController: AlertController) { }

  /**
   * Shows an alert with options.
   * @param options Alert options from @link https://ionicframework.com/docs/api/components/alert/AlertController/#advanced
   * @returns Alert item to be able to manipulate it.
   */
  async showAlert(options: AlertOptions): Promise<any> {
    let alert = await this.alertController.create(options);
    await alert.present();
  }
}