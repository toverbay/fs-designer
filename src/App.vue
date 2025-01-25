<script setup lang="ts">
import FsCanvas from './components/FsCanvas.vue'
import FsToolbar from './components/FsToolbar.vue'
</script>

<template>
  <div class="root-container">
    <FsCanvas />

    <header>
      <FsToolbar />
    </header>
  
    <main>
      <aside class="left">
        <p>Left Panel</p>
      </aside>
      <aside class="right">
        <p>Right Panel</p>
      </aside>
    </main>
  
    <footer>
      <p>Footer</p>
    </footer>
  </div>
</template>

<style scoped>
.root-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header,
footer {
  flex-shrink: 0;
  background-color: #222;
  margin: 0;
  padding: 0;
  text-align: center;
  z-index: 1;
}
main {
  flex: 1;
  display: flex;
  pointer-events: none;
  z-index: 1;
}
aside {
  pointer-events: auto;
  background-color: #222;
  width: 200px;
  padding: 1rem;
  box-sizing: border-box;
}
.left {
  /* Left aside is on the left by default. */
}
.right {
  margin-left: auto;
}
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
