import { type PathCommandType } from "./types"

/**
 * Returns a path command to set the current point to the specified coordinates
 * @param x The x-coordinate of the point
 * @param y The y-coordinate of the point
 */
function moveTo(x: number, y: number): PathCommandType {
  return { command: 'M', x, y }
}

/**
 * Returns a path command to draw a line from the current point to the the specified end point
 * @param x The x-coordinate of the end point
 * @param y The y-coordinate of the end point
 */
function lineTo(x: number, y: number): PathCommandType {
  return { command: 'L', x, y }
}

/**
 * Returns a path command to draw cubic bezier curve from the current point to the specified end point
 * @param x1 The x-coordinate of the first control point
 * @param y1 The y-coordinate of the first control point
 * @param x2 The x-coordinate of the second control point
 * @param y2 The y-coordinate of the second control point
 * @param x The x-coordinate of the end point
 * @param y The y-coordinate of the end point
 */
function cubicTo(
  x1: number, y1: number,
  x2: number, y2: number,
   x: number,  y: number
): PathCommandType {
  return {
    command: 'C',
    x1,
    y1,
    x2,
    y2,
    x,
    y,
  }
}

/** Returns a path command to close the current path */
function close(): PathCommandType {
  return { command: 'Z' }
}

/** Functions to create path commands */
export const PathCommand = {
  moveTo,
  lineTo,
  cubicTo,
  close,
}
