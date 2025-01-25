import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToolType = 'select' | 'rectangle'

/** Minimal rectangle shape interface */
export interface RectShape {
  type: 'rect'
  x: number
  y: number
  w: number
  h: number
}

export const useWorkspaceStore = defineStore('workspace', () => {
  // State
  const currentTool = ref<ToolType>('select')
  const shapes = ref<RectShape[]>([])

  // Actions
  function setCurrentTool(tool: ToolType) {
    currentTool.value = tool
  }

  function addRectangle(x: number, y: number, w: number, h: number) {
    shapes.value.push({
      type: 'rect',
      x,
      y,
      w,
      h
    })
  }

  // Optionally define "getters" as computed properties
  // e.g., const shapeCount = computed(() => shapes.value.length)

  return {
    currentTool,
    shapes,
    setCurrentTool,
    addRectangle
    // shapeCount
  }
})
