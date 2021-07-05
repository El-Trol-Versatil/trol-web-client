/**
 * Model of the trollnet.
 */
export interface TrollnetModel {
  /**
   * id.
   */
  id: string;
  /**
   * Status (active or not).
   */
  isActive: Boolean;
  /**
   * list of things in the room.
   */
  properties: TrollnetDraftModel;
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
  genders: MultipleValuesModel;
  /**
   * age interval
   */
  ageInterval: AgeIntervalModel;
  /**
   * ethnicity
   */
  ethnicity: MultipleValuesModel;
  /**
   * cultural level
   */
  culturalLevel: SingleValueModel;
  /**
   * mood level
   */
  moodLevel: SingleValueModel;
  /**
   * keywords
   */
  keywords: MultipleValuesModel;
  /**
   * net size
   */
  netsize: SingleValueModel;
  /**
   * interaction level
   */
  interactionLevel: SingleValueModel;
  /**
   * target selection
   */
  targetSelection: TargetSelectionModel;

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
export interface MultipleValuesModel {

  /**
   * array of values.
   */
  values: Array<any>;

}

/**
 * Model of age interval.
 */
export interface AgeIntervalModel {

  /**
   * interval with age values.
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
  lower: Number;
  /**
   * upper integer.
   */
  upper: Number;

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