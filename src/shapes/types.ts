export interface StyledShape {
  // For styling or fill:
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
}

/** Describes a rectangle shape */
export interface RectangleShape extends StyledShape {
  /** The kind of shape: 'rect' */
  kind: 'rect'
  /** The x-coordinate of the rectangle's top-left corner */
  x: number
  /** The y-coordinate of the rectangle's top-left corner */
  y: number
  /** The width of the rectangle */
  w: number
  /** The height of the rectangle */
  h: number
}

/** Describes an ellipse shape */
export interface EllipseShape extends StyledShape {
  /** The kind of shape: 'ellipse' */
  kind: 'ellipse'
  /** The x-coordinate of the ellipse's center */
  cx: number
  /** The y-coordinate of the ellipse's center */
  cy: number
  /** The ellipse's radius along the x-axis */
  rx: number
  /** The ellipse's radius along the y-axis */
  ry: number
}

/** Describes a triangle shape */
export interface TriangleShape extends StyledShape {
  /** The kind of shape: 'triangle' */
  kind: 'triangle'
  /** The x-coordinate of the triangle's first vertex */
  x1: number
  /** The y-coordinate of the triangle's first vertex */
  y1: number
  /** The x-coordinate of the triangle's second vertex */
  x2: number
  /** The y-coordinate of the triangle's second vertex */
  y2: number
  /** The x-coordinate of the triangle's third vertex */
  x3: number
  /** The y-coordinate of the triangle's third vertex */
  y3: number
}

/** Describes a star shape */
export interface StarShape extends StyledShape {
  /** The kind of shape: 'star' */
  kind: 'star'
  /** The x-coordinate of the star's center */
  cx: number
  /** The y-coordinate of the star's center */
  cy: number
  /** The number of spikes for the star */
  spikes: number
  /**
   * The outer radius of the star — i.e. the distance from the center
   * to the tip of each spike.
   */
  outerRadius: number
  /**
   * The inner radius of the star — i.e. the distance from the center
   * to the “valley” or “inner corner” between the spikes.
   */
  innerRadius: number
}

/** Describes a regular polygon shape */
export interface PolygonShape extends StyledShape {
  /** The kind of shape: 'polygon' */
  kind: 'polygon'
  /** The x-coordinate of the polygon's center */
  cx: number
  /** The y-coordinate of the polygon's center */
  cy: number
  /** The number of sides for the shape */
  sides: number
  /** The shapes radius (inscribed) */
  radius: number
}

/**
 * Represents a single command in a path, inspired by SVG path commands.
 */
export type PathCommandType =
  | {
      command: 'M' // Move To
      x: number
      y: number
    }
  | {
      command: 'L' // Line To
      x: number
      y: number
    }
  | {
      command: 'C' // Cubic Bezier curve
      x1: number
      y1: number
      x2: number
      y2: number
      x: number
      y: number
    }
/* I don't think we'll need quadratic curves...
   I'll keep them commented out here just in case
  | {
      command: 'Q' // Quadratic Bezier curve
      x1: number
      y1: number
      x: number
      y: number
    }
*/
  | {
      command: 'Z' // Close the path
    }

/**
 * A path shape that stores a sequence of commands (move/line/curve).
 * 
 * This structure can represent lines, beziers, arcs (approximated), etc.
 */
export interface PathShape extends StyledShape {
  /** The kind of shape: 'path' */
  kind: 'path'
  /** Sequence of path commands that define this path */
  commands: PathCommandType[]
}

/** Describes a line shape */
export interface LineShape extends StyledShape {
  /** The kind of shape: 'path' */
  kind: 'line'
  /** The x-coordinate of the start point */
  x1: number
  /** The y-coordinate of the start point */
  y1: number
  /** The x-coordinate of the end point */
  x2: number
  /** The y-coordinate of the end point */
  y2: number
}

export type Shape =
  | RectangleShape
  | EllipseShape
  | TriangleShape
  | StarShape
  | PolygonShape
  | PathShape
  | LineShape
