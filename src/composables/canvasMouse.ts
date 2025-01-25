import { ref, type Ref } from 'vue'

type MouseCallback = (e: MouseEvent) => void

interface CanvasMouse {
  setCanvasRef: (canvas: HTMLCanvasElement | null) => void
  onMouseDown: (cb: MouseCallback) => () => void
  onMouseMove: (cb: MouseCallback) => () => void
  onMouseUp:   (cb: MouseCallback) => () => void
  onDblClick:  (cb: MouseCallback) => () => void
  mousePosition: Ref<Vec2Like>
}

let _instance: CanvasMouse | null = null

export function useCanvasMouse(): CanvasMouse {
  if (!_instance) {
      _instance = createCanvasMouse()
  }

  return _instance
}

function createCanvasMouse(): CanvasMouse {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const mousePosition = ref<Vec2Like>({ x: 0, y: 0 })

  // Sets to hold unique subscriber callbacks
  const mouseDownSubscribers = new Set<MouseCallback>()
  const mouseMoveSubscribers = new Set<MouseCallback>()
  const mouseUpSubscribers   = new Set<MouseCallback>()
  const dblClickSubscribers  = new Set<MouseCallback>()

  // The actual event handlers that will be attached to the canvas
  function handleMouseDown(e: MouseEvent) {
    updateMousePosition(e)
    for (const cb of mouseDownSubscribers) {
      cb(e)
    }
  }

  function handleMouseMove(e: MouseEvent) {
    updateMousePosition(e)
    for (const cb of mouseMoveSubscribers) {
      cb(e)
    }
  }

  function handleMouseUp(e: MouseEvent) {
    updateMousePosition(e)
    for (const cb of mouseUpSubscribers) {
      cb(e)
    }
  }

  function handleDblClick(e: MouseEvent) {
    updateMousePosition(e)
    for (const cb of dblClickSubscribers) {
      cb(e)
    }
  }

  function updateMousePosition(e: MouseEvent) {
    mousePosition.value.x = e.offsetX
    mousePosition.value.y = e.offsetY
  }

  // For attaching event listeners once we have a canvas
  function setCanvasRef(canvas: HTMLCanvasElement | null) {
    if (canvasRef.value) {
        if (canvas != null) {
            throw Error("Canvas ref is already set and can only be set to null")
        } else {
            // Remove all the old listeners
            canvasRef.value.removeEventListener('mousedown', handleMouseDown)
            canvasRef.value.removeEventListener('mousemove', handleMouseMove)
            canvasRef.value.removeEventListener('mouseup',   handleMouseUp)
            canvasRef.value.removeEventListener('dblclick',  handleDblClick)
        }
    }

    canvasRef.value = canvas
    if (!canvas) return

    // Attach listeners to the new canvas
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup',   handleMouseUp)
    canvas.addEventListener('dblclick',  handleDblClick)
  }

  function onMouseDown(cb: MouseCallback) {
    mouseDownSubscribers.add(cb)
    return () => mouseDownSubscribers.delete(cb)
  }
  function onMouseMove(cb: MouseCallback) {
    mouseMoveSubscribers.add(cb)
    return () => mouseMoveSubscribers.delete(cb)
  }
  function onMouseUp(cb: MouseCallback) {
    mouseUpSubscribers.add(cb)
    return () => mouseUpSubscribers.delete(cb)
  }
  function onDblClick(cb: MouseCallback) {
    dblClickSubscribers.add(cb)
    return () => dblClickSubscribers.delete(cb)
  }

  return {
    setCanvasRef,
    mousePosition,

    onMouseDown,
    onMouseMove,
    onMouseUp,
    onDblClick,
  }
}
