import * as PHASER from 'phaser';

export enum CurveType {
    LINEAR = 'linear',
    EASE_OUT = 'ease-out',
    EASE_IN = 'ease-in',
    EASE_IN_OUT = 'ease-in-out'
  }

export type getCurvePoint = (start: PHASER.Geom.Point, end: PHASER.Geom.Point, time: number) => PHASER.Geom.Point;