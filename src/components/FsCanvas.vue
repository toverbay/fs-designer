<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { useCanvasMouse } from '@/composables/canvasMouse'
import { ShapeSystems } from '@/systems'
import type { ShapeSystem } from '@/systems/ShapeSystem'
import { PathCommand, type StyledShape } from '@/shapes'

const workspace = useWorkspaceStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

// "In-progress" rectangle draw state
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const currentY = ref(0)

/** 
 * 1) Get the singleton instance from useCanvasMouse.
 *    This *does not* attach DOM listeners yet (we do that with setCanvasRef).
 */
 const {
  setCanvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onDblClick
} = useCanvasMouse()

/** 2) Subscribe to the mouse events we care about. */
const unsubMouseDown = onMouseDown(handleMouseDown)
const unsubMouseMove = onMouseMove(handleMouseMove)
const unsubMouseUp   = onMouseUp(handleMouseUp)
const unsubDblClick   = onDblClick(handleDblClick)

onMounted(() => {
  // One-time setup for useCanvasMouse
  if (canvasRef.value) {
    setCanvasRef(canvasRef.value)
  }

  // Test shape drawing
  workspace.addEllipse(382, 214, 50, 35)
  workspace.addLine(700, 700, 1196, 582)
  workspace.addPath([
    PathCommand.moveTo(939, 203),
    PathCommand.lineTo(1166, 267),
    PathCommand.lineTo(955, 438),
    PathCommand.lineTo(868, 367),
    PathCommand.lineTo(843, 226),
    PathCommand.close()
  ])
  workspace.addPolygon(550, 470, 5, 50)
  workspace.addStar(420, 750, 5, 60, 30)
  workspace.addTriangle(670, 260, 780, 370, 630, 350)
  ctx = canvasRef.value?.getContext('2d') || null
  resizeCanvas()
  drawAll()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)

  // Unsubscribe from the mouse events we subscribed to earlier
  unsubMouseDown()
  unsubMouseMove()
  unsubMouseUp()
  unsubDblClick()

  // This canvas is going bye bye and it's referenced
  // from useCanvasMouse, so remove the reference.
  setCanvasRef(null)
})

function handleResize() {
  resizeCanvas()
  drawAll()
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

/** Main draw function: clears canvas, fills background, draws shapes, draws in-progress rectangle */
function drawAll() {
  if (!ctx) return

  // Clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Fill background
  ctx.save()
  ctx.fillStyle = '#333536'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()

  // Weird... typescript control flow analysis thinks ctx
  // could possibly be null in the loop below, but its
  // ok if we assign it to a const local variable and use
  // it inside the loop.
  const localCtx = ctx

  // Draw existing shapes from the store
  for (const shape of workspace.shapes) {
    const system: ShapeSystem = ShapeSystems[shape.kind]

    ctx.save()

    const { strokeColor, strokeWidth, fillColor } = shape as StyledShape
    let doStroke = false
    if (strokeColor) {
      ctx.strokeStyle = strokeColor
      doStroke = true
    }
    if (strokeWidth && strokeWidth > 0) {
      ctx.lineWidth = strokeWidth
      doStroke = true
    }

    system.draw(localCtx, shape as any)

    if (fillColor) {
      ctx.fillStyle = fillColor
      ctx.fill()
    }
    if (doStroke) {
      ctx.stroke()
    }

    ctx.restore()
  }

  // In-progress rectangle outline if drawing
  if (isDrawing.value && workspace.currentTool === 'rectangle') {
    // TODO: Use a more interesting stroke style while dragging
    ctx.strokeStyle = 'yellow'
    ctx.lineWidth = 2
    ctx.strokeRect(
      startX.value,
      startY.value,
      currentX.value - startX.value,
      currentY.value - startY.value
    )
  }
}

function handleMouseDown(e: MouseEvent) {
  if (workspace.currentTool !== 'rectangle') return

  isDrawing.value = true
  startX.value = e.offsetX
  startY.value = e.offsetY
  currentX.value = e.offsetX
  currentY.value = e.offsetY
}

function handleMouseMove(e: MouseEvent) {

  if (!isDrawing.value) return

  currentX.value = e.offsetX
  currentY.value = e.offsetY
  drawAll()
}

function handleMouseUp(_e: MouseEvent) {
  if (!isDrawing.value) return
  isDrawing.value = false

  // Finalize rectangle
  if (workspace.currentTool === 'rectangle') {
    const w = currentX.value - startX.value
    const h = currentY.value - startY.value
    if (Math.abs(w) > 2 && Math.abs(h) > 2) {
      workspace.addRectangle(startX.value, startY.value, w, h)
    }
    drawAll()

    // Switch tool back to 'select'
    workspace.setCurrentTool('select')
  }
}

function handleDblClick(e: MouseEvent) {
  e.preventDefault()
  // TODO: Do something on double-click
}
</script>

<template>
  <canvas ref="canvasRef" class="fs-canvas"></canvas>
</template>

<style scoped>
.fs-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; 
}
</style>
