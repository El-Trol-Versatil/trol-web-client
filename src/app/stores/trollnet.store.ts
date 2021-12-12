// Basic
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

// Api Services
import { TrollnetDatabaseService } from '../db/trollnet.service.db';
import { TrollnetService } from '../api/trollnet.service';

// Models
import { TrollnetModel, TrollnetDraftModel } from '../core/model/trollnet.model';

// Models
import { TROLLNET_CONSTANTS } from '../core/constants/trollnet.constants';


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
   * 
   */
   private _pollingStatusInterval: any;

  /**
   * Constructor to declare all the necesary to initialize the class.
   * @param trollnetDB Trollnet database service
   * @param trollnetService Api trollnet service
   */
  constructor(private trollnetDB: TrollnetDatabaseService, private trollnetService: TrollnetService) {
    this._currentTrollnetsObservable = new BehaviorSubject<TrollnetModel[]>([]);
    this._currentTrollnets = [];
    this._synchronizeData().then(() => {
      this._startPollingStatus();
    });
  }

  /**
   * Synchronize data with the remote changes in trollnets
   */
  private _synchronizeData(): Promise<any> {
    // Get all trollnets from remote service
    return this.trollnetService.getAllTrollnets().then((trollnets: TrollnetModel[]) => {
      return this._saveTrollnetsIntoDB(trollnets);
    }, (error) => console.error(this, `FAILED Get All Trollnets from API. ` + error));

  }

  /**
   *Save trollnets into the DB and refresh list
   */
  private _saveTrollnetsIntoDB(trollnets): Promise<any> {
    const promiseArray: Promise<any>[] = [];
    trollnets.forEach(trollnet => promiseArray.push(this.trollnetDB.set(trollnet.id, trollnet)));
    return Promise.all(promiseArray).then(() => {
      return this._refreshList();
    }, (error) => console.error(this, `FAILED Set Trollnet into DB. ` + error));
  }

  /**
   * Retrieve the last DB values and set it as the current trollnets
   */
  private _refreshList(): Promise<any> {
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

  private _startPollingStatus(): void {
    !!this._pollingStatusInterval && this._stopPollingStatus();
    this._pollingStatusInterval = setInterval(() => {
      this._pollStatus();
    }, TROLLNET_CONSTANTS.STATUS_POLLING_INTERVAL_TIME)
  }

  private _stopPollingStatus(): void {
    clearInterval(this._pollingStatusInterval);
  }

  private _pollStatus(): void {
    const untrainedTrollnets: TrollnetModel[] = this._currentTrollnets.filter((element) => {
      return element.trainingStatus !== TrollnetModel.TRAINED;
    });
    const untrainedIdList: string[] = untrainedTrollnets.map(function(trollnet) {return trollnet.id});
    if (untrainedIdList.length !== 0) {
      // Get untrained trollnets status info from remote service
      this.trollnetService.getUntrainedStatus(untrainedIdList).then((trollnetsStatus: any[]) => {
        // Update _currentTrollnets with it
        trollnetsStatus.forEach(trollnetStatus => {
          const trollnetToUpdate = this._currentTrollnets.find((trollnet: TrollnetModel) => {
            return trollnet.id === trollnetStatus.id;
          });
          trollnetToUpdate.creationStatus = trollnetStatus.creationStatus;
          trollnetToUpdate.trainingStatus = trollnetStatus.trainingStatus;
        });
        this._saveTrollnetsIntoDB(this._currentTrollnets);
      }, (error) => console.error(this, `FAILED Get Untrained Trollnets from API. ` + error));
    }
  }

  public createNewTrollnet(trollnetDraft: TrollnetDraftModel): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.trollnetService.createTrollnet(trollnetDraft)
        .then((trollnet: TrollnetModel) => this.trollnetDB.set(trollnet.id, trollnet))
        .then(() => this._refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Set Trollnet into DB. ` + error);
          reject(error);
        });
    })
    return promise;
  }

  public deleteTrollnet(trollnetId: string): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.trollnetService.deleteTrollnet(trollnetId)
        .then(() => this.trollnetDB.remove(trollnetId))
        .then(() => this._refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process deleteTrollnet. ` + error);
          reject(error);
        });
    })
    return promise;
  }

  public renameTrollnet(trollnet: TrollnetModel, newName: string): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.trollnetService.renameTrollnet(trollnet.id, newName).then(
        () => {
          trollnet.properties.customName = newName;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this._refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process renameTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }

  public activateTrollnet(trollnet: TrollnetModel, targetAccount: string): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.trollnetService.activateTrollnet(trollnet.id, targetAccount).then(
        () => {
          trollnet.isActive = true;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this._refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process activateTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }


  public deactivateTrollnet(trollnet: TrollnetModel): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.trollnetService.deactivateTrollnet(trollnet.id).then(
        () => {
          trollnet.isActive = false;
          return this.trollnetDB.set(trollnet.id, trollnet)
        })
        .then(() => this._refreshList())
        .then(() => resolve())
        .catch((error) => {
          console.error(this, `FAILED Process deactivateTrollnet. ` + error);
          reject(error);
        });
    });
    return promise;
  }

  public cleanUserTrollnets(): Promise<void> {
    this._currentTrollnets = [];
    this._currentTrollnetsObservable.next([]);
    return this.trollnetDB.removeAll();
  }
}