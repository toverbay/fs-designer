<template>
    <nav class="fs-toolbar">
      <button
        :class="{ active: workspace.currentTool === 'rectangle' }"
        @click="workspace.setCurrentTool('rectangle')"
      >
        Rectangle
      </button>
      <button
        :class="{ active: workspace.currentTool === 'select' }"
        @click="workspace.setCurrentTool('select')"
      >
        Select
      </button>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useWorkspaceStore } from '@/stores/workspace'
  
  const workspace = useWorkspaceStore()
  </script>
  
  <style scoped>
  .fs-toolbar {
    display: flex;
    gap: 0.5rem;
  }
  button.active {
    background-color: #444;
    color: #fff;
  }
  </style>
  