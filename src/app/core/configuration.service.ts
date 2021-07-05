//Basic
import { Injectable } from '@angular/core';

import { devConfig } from './constants/environment.constants';

/**
 * Service to publish the configuration of the environment.
 */
@Injectable()
export class ConfigurationService {

  /**
   * variable to bind the environment from the window to the service.
   */
  public static environment = devConfig;
}
