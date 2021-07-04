//Basic
import { Injectable } from '@angular/core';
import { Storage, StorageConfig } from '@ionic/storage-angular';

//Constants
import { SECRET } from '../core/constants/storage.constants';

//Encripter library
import { AES, enc } from 'crypto-js';

/**
 * Service to handler the storage with the application.
 */
@Injectable()
export class StorageService {

  /**
   * Construtor where we import all needed in the service.
   */
  constructor() { }

  /**
   * Method to create a new database with a custom configuration.
   * @param config Database configuration.
   */
  public async create(config: StorageConfig): Promise<Storage> {
    const storageEntity = new Storage(config);
    const storage = await storageEntity.create();
    return storage;
  }

  /**
   * Method to get an object stored inside database and decript.
   * @param storage storage instance
   * @param encryption if the database has encryption.
   * @param key Primary key to get the value inside the database.
   */
  public async get(storage: Storage, encryption: boolean, key: string): Promise<any> {
    console.log('this._get(storage, encryption, key);');
    await this._get(storage, encryption, key);
  }

  /**
   * Method to set an object stored inside database and encript.
   * @param storage storage instance
   * @param encryption if the database has encryption.
   * @param key Primary key to be stored inside the database.
   * @param value Value to be stored inside the database
   */
  public async set(storage: Storage, encryption: boolean, key: string, value: any): Promise<any> {
    console.log('storage.set...');
    if (encryption) { //If database is encrypted...
      await storage.set(key, AES.encrypt(JSON.stringify(value), SECRET).toString());
    } else {
      await storage.set(key, value);
    }
  }

  /**
   * Method to get everything stored inside database and decript.
   * @param storage storage instance
   * @param encryption if the database has encryption.
   */
  public async getAll(storage: Storage, encryption: boolean): Promise<any> {
    const keys = await storage.keys().then(keys => Promise.all(keys.map(k => this._get(storage, encryption, k))));
    return keys;
  }

  /**
   * Delete the value of the key provided by parameter.
   * @param storage storage instance
   * @param key Primary key to delete the value
   */
  public async remove(storage: Storage, key: string): Promise<any> {
    await storage.remove(key);
  }

  /**
   * remoove all the storage.
   * @param storage storage instance.
   */
  public async removeAll(storage: Storage): Promise<any> {
    await storage.clear();
  }

  /**
   * Private method to get an object stored inside database and decript.
   * @param storage storage instance
   * @param encryption if the database has encryption.
   * @param key Primary key to get the value inside the database.
   */
  private _get(storage: Storage, encryption: boolean, key: string): Promise<any> {
    const promise: Promise<any> = new Promise<any>((resolve, reject) => {
      storage.get(key).then((value) => {
        if (value) {
          if (encryption) { //If database is encrypted...
            try {
              resolve(JSON.parse(AES.decrypt(value, SECRET).toString(enc.Utf8)));
            } catch (exception) {
              resolve(AES.decrypt(value, SECRET).toString(enc.Utf8));
            }
          } else {
            try {
              resolve(JSON.parse(value));
            } catch (exception) {
              resolve(value);
            }
          }
        } else {
          reject();
        }
      }, (error) => {
        console.error('StorageService ' + error);
      });
    });
    return promise;
  }

}
