import { computePolygonPoints, getExtents, isPointInPolygon } from "@/helpers/math"
import { type PolygonShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

export const PolygonSystem: ShapeSystem = {
  draw(ctx: CanvasRenderingContext2D, shape: PolygonShape) {
    const angleStep = (2 * Math.PI) / shape.sides
    // TODO: Calculate a good-looking rotation based on the angleStep or number of sides
    // so that the bottom of the polygon is flat
    const rotationRadians = 0
    ctx.beginPath()
    for (let i = 0; i < shape.sides; i++) {
      const angle = rotationRadians + angleStep * i
      const px = shape.cx + Math.cos(angle) * shape.radius
      const py = shape.cy + Math.sin(angle) * shape.radius
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  },
  containsPoint(shape: PolygonShape, px: number, py: number) {
    const { cx, cy, sides, radius } = shape
    const starPoints = computePolygonPoints(cx, cy, sides, radius)
    return isPointInPolygon(px, py, starPoints)
  },
  getAABB(shape: PolygonShape): RectLike {
    const { cx, cy, sides, radius } = shape
    const pathPoints = computePolygonPoints(cx, cy, sides, radius)
    return getExtents(pathPoints)
  }
}
