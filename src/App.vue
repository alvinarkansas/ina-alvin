<template>
  <router-view />
</template>

<style>
#app {
  font-family: "Cormorant Upright", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @apply text-sm;
}

#app button {
  @apply focus:outline-none;
}

input,
textarea {
  border-radius: 0;
  -webkit-appearance: none;
}
</style>
