import { computePathPoints, getExtents, isPointInPolygon } from "@/helpers/math"
import type { PathShape } from "@/shapes"
import type { ShapeSystem } from "./ShapeSystem"

export const PathSystem: ShapeSystem = {
  draw(ctx: CanvasRenderingContext2D, shape: PathShape) {
    if (shape.commands.length < 2) return
    ctx.beginPath()
    shape.commands.forEach((cmd, _index) => {
      switch (cmd.command) {
        case 'M': // Move
          ctx.moveTo(cmd.x, cmd.y)
          break
        case 'L': // Line
          ctx.lineTo(cmd.x, cmd.y)
          break
        case 'C': // Cubic Bezier
          ctx.bezierCurveTo(
            cmd.x1, cmd.y1,
            cmd.x2, cmd.y2,
            cmd.x, cmd.y
          )
          break
        // case 'Q': // Quadratic Bezier
        //   ctx.quadraticCurveTo(
        //     cmd.x1, cmd.y1,
        //     cmd.x, cmd.y
        //   )
        //   break
        case 'Z': // Close Path
          ctx.closePath()
          break
      }
    })
  },
  containsPoint(shape: PathShape, px: number, py: number): boolean {
    const starPoints = computePathPoints(shape.commands)
    return isPointInPolygon(px, py, starPoints)
  },
  getAABB(shape: PathShape): RectLike {
    const pathPoints = computePathPoints(shape.commands)
    return getExtents(pathPoints)
  }
}
