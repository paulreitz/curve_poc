import * as PHASER from 'phaser';
import { CurveType } from '../types/curve-type';
import { selectedCurve } from '../state/current-curve';
import type { getCurvePoint } from '../types/curve-type';

function linear(start: PHASER.Geom.Point, end: PHASER.Geom.Point, time: number): PHASER.Geom.Point {
  const t = Math.max(0, Math.min(1, time));
  
  const x = start.x + (end.x - start.x) * t;
  const y = start.y + (end.y - start.y) * t;
  
  return new PHASER.Geom.Point(x, y);
}

function easeOut(start: PHASER.Geom.Point, end: PHASER.Geom.Point, time: number): PHASER.Geom.Point {
  const t = Math.max(0, Math.min(1, time));
  
  const factor = 1 - Math.pow(1 - t, 2);
  
  const x = start.x + (end.x - start.x) * factor;
  const y = start.y + (end.y - start.y) * factor;
  
  return new PHASER.Geom.Point(x, y);
}

function easeIn(start: PHASER.Geom.Point, end: PHASER.Geom.Point, time: number): PHASER.Geom.Point {
  const t = Math.max(0, Math.min(1, time));
  
  const factor = t * t;
  
  const x = start.x + (end.x - start.x) * factor;
  const y = start.y + (end.y - start.y) * factor;
  
  return new PHASER.Geom.Point(x, y);
}

function easeInOut(start: PHASER.Geom.Point, end: PHASER.Geom.Point, time: number): PHASER.Geom.Point {
  const t = Math.max(0, Math.min(1, time));
  
  let factor;
  if (t < 0.5) {
    factor = 2 * t * t;
  } else {
    const u = 2 - 2 * t;
    factor = 1 - u * u / 2;
  }
  
  const x = start.x + (end.x - start.x) * factor;
  const y = start.y + (end.y - start.y) * factor;
  
  return new PHASER.Geom.Point(x, y);
}

function curveFactory(): getCurvePoint {
  
  switch (selectedCurve()) {
    case CurveType.EASE_OUT:
      return easeOut;
    case CurveType.EASE_IN:
      return easeIn;
    case CurveType.EASE_IN_OUT:
      return easeInOut;
    case CurveType.LINEAR:
    default:
      return linear;
  }
}

export default curveFactory;