import { type EllipseShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

export const EllipseSystem: ShapeSystem = {
    draw(ctx: CanvasRenderingContext2D, shape: EllipseShape) {
      ctx.beginPath()
      ctx.ellipse(shape.cx, shape.cy, shape.rx, shape.ry, 0, 0, 2 * Math.PI)
    },
    containsPoint(shape: EllipseShape, px: number, py: number): boolean {
      const dx = px - shape.cx
      const dy = py - shape.cy
      return (dx * dx) / (shape.rx * shape.rx) + (dy * dy) / (shape.ry * shape.ry) <= 1
    },
    getAABB(shape: EllipseShape): RectLike {
        return {
            t: shape.cy - shape.ry,
            r: shape.cx + shape.rx,
            b: shape.cy + shape.ry,
            l: shape.cx - shape.rx,
        }
    }
  }
  