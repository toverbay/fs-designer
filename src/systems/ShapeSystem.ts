import type { Shape } from "@/shapes"

export interface ShapeSystem {
  draw(ctx: CanvasRenderingContext2D, shape: Shape): void
  containsPoint(shape: Shape, px: number, py: number): boolean
  getAABB(shape: Shape): RectLike
}
