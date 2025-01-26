import type { RectangleShape } from "@/shapes";
import type { ShapeSystem } from "./ShapeSystem";

export const RectangleSystem: ShapeSystem = {
    draw(ctx: CanvasRenderingContext2D, shape: RectangleShape) {
        ctx.beginPath()
        ctx.rect(shape.x, shape.y, shape.w, shape.h)
        ctx.closePath()
    },
    containsPoint(shape: RectangleShape, px: number, py: number): boolean {
        return px >= shape.x
            && py >= shape.y
            && px <= (shape.x + shape.w)
            && py <= (shape.x + shape.h)
    },
    getAABB(shape: RectangleShape): RectLike {
        return {
            t: shape.y,
            r: shape.x + shape.w,
            b: shape.y + shape.h,
            l: shape.x
        }
    }
}