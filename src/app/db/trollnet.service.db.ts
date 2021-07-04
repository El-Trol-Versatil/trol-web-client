//Basic
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//Services
import { StorageService } from '../services/storage.service';

//Config
import { trollnetConfig } from '../core/config/config.module';

/**
 * trollnet database service to access to the persistance data.
 */
@Injectable()
export class TrollnetDatabaseService {

  /**
   * Trollnet database instance
   */
  private trollnetDatabase: Storage;

  /**
   * Construtor where we import all needed in the service.
   * @param storageService instance of the storage general service.
   */
  constructor(private storageService: StorageService) {
    this.storageService.create(trollnetConfig.databaseConfig).then((storage) => {
      this.trollnetDatabase = storage;
    }).catch((error) => {
      console.error('TrollnetDB ' + error);
    });
  }

  /**
   * Method to get a trollnet stored inside database.
   * @param key Primary key to get the value inside the database.
   */
  public get(key: string): Promise<any> {
    return this.storageService.get(this.trollnetDatabase, trollnetConfig.encryption, key);
  }

  /**
   * Method to set a trollnet inside database.
   * @param key Primary key to be stored inside the database.
   * @param value Value to be stored inside the database
   */
  public set(key: string, value: any): Promise<any> {
    return this.storageService.set(this.trollnetDatabase, trollnetConfig.encryption, key, value);
  }

  /**
   * Method to get all the trollnets from the database.
   */
  public getAll(): Promise<any> {
    return this.storageService.getAll(this.trollnetDatabase, trollnetConfig.encryption);
  }

  /**
   * Delete the trollnet of the key provided by parameter.
   * @param key Primary key to delete the value.
   */
  public remove(key: string): Promise<any> {
    return this.storageService.remove(this.trollnetDatabase, key);
  }

  /**
   * Delete all entries on the trollnet database.
   */
  public removeAll(): Promise<any> {
    return this.storageService.removeAll(this.trollnetDatabase);
  }
}