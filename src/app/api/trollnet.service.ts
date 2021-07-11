// Basic
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiGenericProvider } from '../core/core.module';

// Models
import { TrollnetModel, TrollnetDraftModel } from '../core/model/trollnet.model';

/**
 * Service that returns trollnets information from server.
 */
@Injectable({
  providedIn: 'root'
})
export class TrollnetService extends ApiGenericProvider {

  /**
   * TrollnetService constructor
   * @param http Angular's http service to make calls against a server.
   */
  constructor(http: HttpClient) {
    super('trollnet', http);
  }

  /**
   * Function that gets all trollnets information.
   * @return List of all trollnets.
   */
  public getAllTrollnets(): Promise<TrollnetModel[]> {
    let promise = new Promise<any[]>((resolve, reject) => {
      this.get('').then(
        (response: TrollnetModel[]) => {
          resolve(response);
        }, (error) => {
          reject(error);
          // resolve(this.getMockTrollnets());
        }
      );
    });
    return promise;
  }

  /**
   * Function that creates a trollnet.
   * @param trollnetInfo Trollnet information.
   * @return newly created trollnet.
   */
  public createTrollnet(trollnetInfo: TrollnetDraftModel): Promise<TrollnetModel> {
    let promise = new Promise<TrollnetModel>((resolve, reject) => {
      this.create('', trollnetInfo).then(
        (response: TrollnetModel) => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  /**
   * Function that removes a trollnet.
   * @param trollnetId Trollnet id.
   */
  public deleteTrollnet(trollnetId: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      this.delete('', trollnetId).then(
        response => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  /**
   * Function that renames a trollnet.
   * @param trollnetId Trollnet id.
   * @param newName New name for the trollnet.
   */
  public renameTrollnet(trollnetId: string, newName: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      this.update('/rename', { newName }, trollnetId).then(
        response => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  /**
   * Function that activates a trollnet.
   * @param trollnetId Trollnet id.
   */
  public activateTrollnet(trollnetId: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      this.update('/activate', {isActive: true}, trollnetId).then(
        response => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  /**
   * Function that deactivates a trollnet.
   * @param trollnetId Trollnet id.
   */
  public deactivateTrollnet(trollnetId: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      this.update('/deactivate', {isActive: false}, trollnetId).then(
        response => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  private getMockTrollnets(): TrollnetModel[] {
    const trollnetList: TrollnetModel[] = [
      {
        id: '11111',
        isActive: false,
        properties: {
          customName: 'Fans de Tokio',
          genders: {
            values: [1, 2]
          },
          ageInterval: {
            values: {lower: 18, upper: 55}
          },
          ethnicity: {
            values: [3, 4]
          },
          culturalLevel: {
            value: 3
          },
          moodLevel: {
            value: -2
          },
          keywords: {
            values: ['Tokio', 'La Casa de Papel', 'El Árbol De La Sangre']
          },
          netsize: {
            value: 25
          },
          interactionLevel: {
            value: 3
          },
          targetSelection: {
            profileValues: ['ursulolita', 'lacasadepapel'],
            hashtagValues: ['LaCasaDePapel', 'LCDP4', 'LCDP4', 'MoneyHeist']
          }
        }
      },
      {
        id: '55555',
        isActive: true,
        properties: {
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
        }
      },
    ];
    return trollnetList;
  }
}
