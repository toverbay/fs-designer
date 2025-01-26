import type { PathCommandType, Shape } from "@/shapes"
import { defineStore } from "pinia"
import { ref } from "vue"

export type ToolType = "select" | "rectangle"

export const useWorkspaceStore = defineStore("workspace", () => {
  // State
  const currentTool = ref<ToolType>("select")
  const shapes = ref<Shape[]>([])

  // Actions
  function setCurrentTool(tool: ToolType) {
    currentTool.value = tool
  }

  function addEllipse(cx: number, cy: number, rx: number, ry: number) {
    shapes.value.push({
      kind: "ellipse",
      cx, cy,
      rx, ry,
      strokeColor: "#ec111a",
    })
  }

  function addLine(x1: number, y1: number, x2: number, y2: number) {
    shapes.value.push({
      kind: "line",
      x1, y1,
      x2, y2,
      strokeColor: "#fb6330",
    })
  }

  function addPath(commands: PathCommandType[]) {
    shapes.value.push({
      kind: "path",
      commands,
      strokeColor: "#ffd42f",
      fillColor: "#2db1ba",
    })
  }

  function addPolygon(cx: number, cy: number, sides: number, radius: number) {
    shapes.value.push({
      kind: "polygon",
      cx, cy,
      sides,
      radius,
      strokeColor: "#138468",
    })
  }

  function addRectangle(x: number, y: number, w: number, h: number) {
    shapes.value.push({
      kind: "rect",
      x, y,
      w, h,
      strokeColor: "#fff",
    })
  }

  function addStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    shapes.value.push({
      kind: "star",
      cx, cy,
      spikes,
      outerRadius,
      innerRadius,
      strokeColor: "#7849b8",
      strokeWidth: 4,
      fillColor: "#c1d3fe"
    })
  }

  function addTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    shapes.value.push({
      kind: "triangle",
      x1, y1,
      x2, y2,
      x3, y3,
      strokeColor: "#f2609e",
    })
  }

  // Optionally define "getters" as computed properties
  // e.g., const shapeCount = computed(() => shapes.value.length)

  return {
    currentTool,
    shapes,
    setCurrentTool,
    addEllipse,
    addLine,
    addPath,
    addPolygon,
    addRectangle,
    addStar,
    addTriangle,
    // shapeCount
  }
})
