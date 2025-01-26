import { computeStarPoints, getExtents, isPointInPolygon } from "@/helpers/math"
import type { StarShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

export const StarSystem: ShapeSystem = {
  draw(ctx: CanvasRenderingContext2D, shape: StarShape) {
    ctx.beginPath()
    const step = Math.PI / shape.spikes
    let rot = Math.PI / 2 * 3
    let x = shape.cx
    let y = shape.cy

    for (let i = 0; i < shape.spikes; i++) {
      x = shape.cx + Math.cos(rot) * shape.outerRadius
      y = shape.cy + Math.sin(rot) * shape.outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = shape.cx + Math.cos(rot) * shape.innerRadius
      y = shape.cy + Math.sin(rot) * shape.innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.closePath()
  },
  containsPoint(shape: StarShape, px: number, py: number) {
    const { cx, cy, spikes, outerRadius, innerRadius } = shape
    const starPoints = computeStarPoints(cx, cy, spikes, outerRadius, innerRadius)
    return isPointInPolygon(px, py, starPoints)
  },
  getAABB(shape: StarShape): RectLike {
    const { cx, cy, spikes, outerRadius, innerRadius } = shape
    const starPoints = computeStarPoints(cx, cy, spikes, outerRadius, innerRadius)
    return getExtents(starPoints)
  }
}
