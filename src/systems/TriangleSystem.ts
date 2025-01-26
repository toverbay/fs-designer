import { isPointInTriangle } from "@/helpers/math"
import { type TriangleShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

export const TriangleSystem: ShapeSystem = {
  draw(ctx: CanvasRenderingContext2D, shape: TriangleShape) {
    ctx.beginPath()
    ctx.moveTo(shape.x1, shape.y1)
    ctx.lineTo(shape.x2, shape.y2)
    ctx.lineTo(shape.x3, shape.y3)
    ctx.closePath()
  },
  containsPoint(shape: TriangleShape, px: number, py: number) {
    //  Use a “point in triangle” test, e.g. barycentric or cross-product area
    //  or you can do a quick technique: areaOfABC = area(ABC),
    //  areaOfPAB + PBC + PAC == areaOfABC => inside
    return isPointInTriangle(px, py,
                             shape.x1, shape.y1,
                             shape.x2, shape.y2,
                             shape.x3, shape.y3)
  },
  getAABB(shape: TriangleShape): RectLike {
    const xs = [shape.x1, shape.x2, shape.x3]
    const ys = [shape.y1, shape.y2, shape.y3]

    return {
      t: Math.min(...ys),
      r: Math.max(...xs),
      b: Math.max(...ys),
      l: Math.min(...xs)
    }
  }
}
