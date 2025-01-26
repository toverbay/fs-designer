import { distToSegment } from "@/helpers/math"
import type { LineShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

// A little 'wiggle room' when determining if a point is on a line,
// since, mathematically, lines have 0 thickness
const LINE_THICKNESS_THRESHOLD = 5

export const LineSystem: ShapeSystem = {
  draw(ctx: CanvasRenderingContext2D, shape: LineShape) {
    ctx.beginPath()
    ctx.moveTo(shape.x1, shape.y1)
    ctx.lineTo(shape.x2, shape.y2)
  },
  containsPoint(shape: LineShape, px: number, py: number) {
    const dist = distToSegment(px, py, shape.x1, shape.y1, shape.x2, shape.y2)
    
    return dist <= LINE_THICKNESS_THRESHOLD
  },
  getAABB(shape: LineShape): RectLike {
      return {
          t: Math.min(shape.y1, shape.y2),
          r: Math.max(shape.x1, shape.x2),
          b: Math.max(shape.y1, shape.y2),
          l: Math.min(shape.x1, shape.x2),
      }
  }
}
