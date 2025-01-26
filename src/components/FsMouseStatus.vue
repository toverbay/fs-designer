<script setup lang="ts">
import { useCanvasMouse } from '@/composables/canvasMouse';

const { mousePosition } = useCanvasMouse()
</script>

<template>
    <div>mouse: x: {{  mousePosition.x }}, y: {{ mousePosition.y }}</div>
</template>
