/**
 * Model of the trollnet.
 */
export interface TrollnetModel {
  /**
   * id.
   */
  id: string;
  /**
   * active or not
   */
  isActive: boolean;
  /**
   * Progress of its creation
   */
  creationStatus: number;
  /**
   * Progress of its training
   */
  trainingStatus: number;
  /**
   * When was it last trained
   */
  lastTrained: Date;
  /**
   * List of bots in the trollnet
   */
  botList: Array<string>;
  /**
   * Specification of the trollnet characteristics
   */
  properties: TrollnetDraftModel;
  /**
   * flag to register the last error that happened in any related progress
   */
   error: any;
}

/**
 * Model of a draft for a trollnet.
 */
export interface TrollnetDraftModel {

  /**
   * custom name
   */
  customName: string;
  /**
   * genders
   */
  genders: MultipleStringsModel;
  /**
   * age interval
   */
  ageInterval: NumberIntervalModel;
  /**
   * ethnicity
   */
  ethnicity: MultipleStringsModel;
  /**
   * cultural level
   */
  culturalLevel: NumberIntervalModel;
  /**
   * mood level
   */
  moodLevel: NumberIntervalModel;
  /**
   * keywords
   */
  keywords: MultipleStringsModel;
  /**
   * likes
   */
  likes: MultipleStringsModel;
  /**
   * dislikes
   */
  dislikes: MultipleStringsModel;
  /**
   * net size
   */
  netsize: SingleValueModel;
  /**
   * interaction level
   */
  interactionLevel: NumberIntervalModel;
  // /**
  //  * target selection. TODO: Still need to see what do we do here
  //  */
  // targetSelection: TargetSelectionModel;
}

/**
 * Model of field that contains a single value.
 */
export interface SingleValueModel {

  /**
   * single value.
   */
  value: any;

}

/**
 * Model of field that contains multiple values.
 */
export interface MultipleStringsModel {

  /**
   * array of values.
   */
  values: Array<string>;

}

/**
 * Model of number interval.
 */
export interface NumberIntervalModel {

  /**
   * interval with number values.
   */
  values: IntegerInterval;
}

/**
 * Model of integer interval.
 */
export interface IntegerInterval {
  /**
   * lower integer.
   */
  lower: number;
  /**
   * upper integer.
   */
  upper: number;

}

/**
 * Model of target selection.
 */
export interface TargetSelectionModel {

  /**
   * profile values.
   */
  profileValues: Array<string>;
  /**
   * hashtag values.
   */
  hashtagValues: Array<string>;

}

/**
 * TrollnetModel namespace.
 */
 export namespace TrollnetModel {

  export const CREATION_FAILED: number = -1;
  export const CREATED: number = 100;

  export const TRAINING_FAILED: number = -1;
  export const UNTRAINED: number = 0;
  export const TRAINED: number = 100;

}