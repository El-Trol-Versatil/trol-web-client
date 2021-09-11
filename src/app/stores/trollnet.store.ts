// Basic
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

// Api Services
import { TrollnetDatabaseService } from '../db/trollnet.service.db';
import { TrollnetService } from '../api/trollnet.service';

// Models
import { TrollnetModel, TrollnetDraftModel } from '../core/model/trollnet.model';

/**
 * Store to handle trollnets.
 */
@Injectable()
export class TrollnetStore {

  /**
   * Observer to know if the trollnet list changes.
   */
  private _currentTrollnetsObservable: BehaviorSubject<TrollnetModel[]>;

  /**
   * current trollnets list.
   */
  private _currentTrollnets: TrollnetModel[];

  /**
   * Constructor to declare all the necesary to initialize the class.
   * @param trollnetDB Trollnet database service
   * @param trollnetService Api trollnet service
   */
  constructor(private trollnetDB: TrollnetDatabaseService, private trollnetService: TrollnetService) {
    this._currentTrollnetsObservable = new BehaviorSubject<TrollnetModel[]>([]);
    this._currentTrollnets = [];
    this._synchronizeData();
  }

  /**
   * Synchronize data with the remote changes in trollnets
   */
  private _synchronizeData(): void {
    const promiseArray: Promise<any>[] = [];
    // Get all trollnets from remote service
    this.trollnetService.getAllTrollnets().then((trollnets: TrollnetModel[]) => {
      // Save each trollnet into the DB
      trollnets.forEach(trollnet => promiseArray.push(this.trollnetDB.set(trollnet.id, trollnet)));
      Promise.all(promiseArray).then(
        () => this.refreshList(),
        (error) => console.error(this, `FAILED Set Trollnet into DB. ` + error)
      );
    }, (error) => console.error(this, `FAILED Get All Trollnets from API. ` + error));
  }

  /**
   * Retrieve the last DB values and set it as the current trollnets
   */
  private refreshList(): Promise<any> {
    return this.trollnetDB.getAll().then((trollnets: TrollnetModel[]) => {
      this._currentTrollnets = trollnets;
      this._currentTrollnetsObservable.next(this._currentTrollnets);
    }, (error) => {
      console.error(this, `FAILED Get All Trollnets from DB. ` + error);
    });
  }

  public getCurrentTrollnetById(trollnetId: string): TrollnetModel {
    return this._getCurrentTrollnetById(trollnetId);
  }

  private _getCurrentTrollnetById(trollnetId: string): TrollnetModel {
    return this._currentTrollnets.find((trollnet: TrollnetModel) => {
      return trollnet.id === trollnetId;
    });
  }

  /**
   * Method to know if the trollnet list changes.
   */
  public trollnetsChange(): Observable<TrollnetModel[]> {
    return this._currentTrollnetsObservable.asObservable().pipe(share());
  }

  public createNewTrollnet(trollnetDraft: TrollnetDraftModel): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.trollnetService.createTrollnet(trollnetDraft)
        .then((trollnet: TrollnetModel) => this.trollnetDB.set(trollnet.id, trollnet))
        .then(() => this.refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Set Trollnet into DB. ` + error);
          reject(error);
        });
    })
    return promise;
  }

  public deleteTrollnet(trollnetId: string): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.trollnetService.deleteTrollnet(trollnetId)
        .then(() => this.trollnetDB.remove(trollnetId))
        .then(() => this.refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process deleteTrollnet. ` + error);
          reject(error);
        });
    })
    return promise;
  }

  public renameTrollnet(trollnet: TrollnetModel, newName: string): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.trollnetService.renameTrollnet(trollnet.id, newName).then(
        () => {
          trollnet.properties.customName = newName;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this.refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process renameTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }

  public activateTrollnet(trollnet: TrollnetModel, targetThread: string): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.trollnetService.activateTrollnet(trollnet.id, targetThread).then(
        () => {
          trollnet.isActive = true;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this.refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process activateTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }


  public deactivateTrollnet(trollnet: TrollnetModel): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.trollnetService.deactivateTrollnet(trollnet.id).then(
        () => {
          trollnet.isActive = false;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this.refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process deactivateTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }

  public cleanUserTrollnets(): Promise<any> {
    this._currentTrollnets = [];
    this._currentTrollnetsObservable.next([]);
    return this.trollnetDB.removeAll();
  }
}