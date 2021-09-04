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
  isActive: Boolean;
  /**
   * Status of its training
   */
  status: string;
  /**
   * When was it last trained
   */
  lastTrained: Date;
  /**
   * List of bots in the trollnet
   */
  botList: Array<string>;
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