//Basic
import { Drivers } from '@ionic/storage';
import { StorageConfig } from '@ionic/storage-angular';

//Constants
import { DB_NAME } from '../constants/storage.constants';

/**
 * Configuration for the storage service
 */
export const trollnetConfig = {
  databaseConfig: <StorageConfig>{
    name: `${DB_NAME.NAME}_v${DB_NAME.VERSION}.${DB_NAME.SUFFIX}`,
    storeName: '_trollnet',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  },
  encryption: false
};