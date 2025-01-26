import type { PathCommandType } from "@/shapes/types";

function sign(p1x: number, p1y: number,
              p2x: number, p2y: number,
              p3x: number, p3y: number
): number {
  return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
}

export function isPointInTriangle(ptx: number, pty: number,
                                  v1x: number, v1y: number,
                                  v2x: number, v2y: number,
                                  v3x: number, v3y: number
): boolean {
  let d1: number, d2: number, d3: number;

  d1 = sign(ptx, pty, v1x, v1y, v2x, v2y);
  d2 = sign(ptx, pty, v2x, v2y, v3x, v3y);
  d3 = sign(ptx, pty, v3x, v3y, v1x, v1y);

  const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(has_neg && has_pos);
}

export function isPointInRectangle(x: number, y: number, t: number, r: number, b: number, l: number): boolean {
  return y >= t
      && x <= r
      && y <= b
      && x >= l
}

export function getExtents(pathPoints: Vec2Like[]): RectLike {
  let t = Number.MAX_VALUE
  let r = Number.MIN_VALUE
  let b = Number.MIN_VALUE
  let l = Number.MAX_VALUE

  for (let i = 0; i < pathPoints.length; i++) {
    const { x, y } = pathPoints[i]

    if (y < t) { t = y }
    if (x > r) { r = x }
    if (y > b) { b = y }
    if (x < l) { l = x }
  }
  return { t, r, b, l, }
}

export function isPointInPolygon(x: number, y: number, pathPoints: Vec2Like[]): boolean {
  // TODO: Figure out how to do a proper point check for a polygon

  // For now, just return if the point is within the AABB of the path points
  const { t, r, b, l } = getExtents(pathPoints)

  return isPointInRectangle(x, y, t, r, b, l) 
}

/**
 * Computes the polygon points of a star shape, returning an array of
 * {x, y} vertices in drawing order.
 * @param cx The x-coordinate of the star's center
 * @param cy The y-coordinate of the star's center
 * @param spikes The number of spikes for the star
 * @param outerRadius The outer radius of the star — i.e.
 * the distance from the center to the tip of each spike.
 * @param innerRadius The inner radius of the star — i.e.
 * the distance from the center to the “valley” or “inner corner” between the spikes.
 * @returns Array of Vec2Like points (i.e. { x, y })
 */
export function computeStarPoints(cx: number, cy: number,
                                  spikes: number,
                                  outerRadius: number,
                                  innerRadius: number,
): Vec2Like[] {
  const points: { x: number; y: number }[] = []
  const step = Math.PI / spikes
  let rot = (Math.PI / 2) * 3

  for (let i = 0; i < spikes; i++) {
    // Outer tip
    let x = cx + Math.cos(rot) * outerRadius
    let y = cy + Math.sin(rot) * outerRadius
    points.push({ x, y })
    rot += step

    // Inner "valley"
    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    points.push({ x, y })
    rot += step
  }

  return points
}

/**
 * Computes the vertices (in drawing order) of a regular polygon
 * centered at (cx, cy), with 'sides' number of edges and the specified 'radius'.
 *
 * @param cx The center x-coordinate of the polygon
 * @param cy The center y-coordinate of the polygon
 * @param sides Number of sides (e.g. 3=triangle, 4=square, etc.)
 * @param radius Distance from center to each vertex
 * @returns An array of points (Vec2Like), in drawing order
 */
export function computePolygonPoints(cx: number, cy: number, sides: number, radius: number): Vec2Like[] {
  const points: { x: number; y: number }[] = []
  const angleStep = (2 * Math.PI) / sides

  // If you want a "flat bottom," adjust rotationRadians. For now, we keep 0 or use:
  // const rotationRadians = -Math.PI / 2 // e.g., makes a flat top for some polygons
  const rotationRadians = 0

  for (let i = 0; i < sides; i++) {
    const angle = rotationRadians + angleStep * i
    const px = cx + Math.cos(angle) * radius
    const py = cy + Math.sin(angle) * radius
    points.push({ x: px, y: py })
  }

  return points
}

/**
 * Converts path commands (M,L,C,Q,Z) into an array of points.
 * This simplistic approach only takes the final endpoint of
 * curves (C/Q), ignoring control points. If we want more
 * accurate hit-tests on curves, we should approximate each
 * curve by "flattening" the curve to multiple line segments.
 */
export function computePathPoints(commands: PathCommandType[]): Vec2Like[] {
  const points: Vec2Like[] = []
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i]
    switch (cmd.command) {
      case "M": // MoveTo
        currentX = cmd.x
        currentY = cmd.y
        startX = cmd.x
        startY = cmd.y
        // Often we add a "moveTo" point to the array, or wait until L/C/Q.
        // For polygon hit-test, let's push it as well:
        points.push({ x: currentX, y: currentY })
        break

      case "L": // LineTo
        currentX = cmd.x
        currentY = cmd.y
        points.push({ x: currentX, y: currentY })
        break

      case "C": // Cubic Bezier
        // TODO: We should 'flatten' curves to multiple small line segments
        // to approximate the curve. For now, we treat curves as straight
        // lines, ignoring control points.
        currentX = cmd.x
        currentY = cmd.y
        points.push({ x: currentX, y: currentY })
        break

      // case "Q": // Quadratic Bezier
      //   currentX = cmd.x
      //   currentY = cmd.y
      //   points.push({ x: currentX, y: currentY })
      //   break

      case "Z": // Close path
        // Typically we connect back to the last MoveTo (startX, startY).
        // If we want to treat that as a final line, we can push it:
        points.push({ x: startX, y: startY })
        // Reset current position to the start
        currentX = startX
        currentY = startY
        break
    }
  }

  return points
}

export function sqr(x: number) { return x * x }

export function dist(vx: number, vy: number,
                     wx: number, wy: number) {
  return sqr(vx - wx) + sqr(vy - wy)
}

export function distToSegmentSquared(x: number, y: number,
                                     startX: number, startY: number,
                                     endX: number, endY: number) {
  var l2 = dist(startX, startY, endX, endY)
  if (l2 == 0) return dist(x, y, startX, startY)
  var t = ((x - startX) * (endX - startX) + (y - startY) * (endY - startY)) / l2
  t = Math.max(0, Math.min(1, t))
  return dist(x, y, startX + t * (endX - startX),
                    startY + t * (endY - startY))
}

export function distToSegment(x: number, y: number,
                              startX: number, startY: number,
                              endX: number, endY: number) {
  return Math.sqrt(distToSegmentSquared(x, y, startX, startY, endX, endY))
}