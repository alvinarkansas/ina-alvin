<template>
  <div class="bg-linen bg-opacity-70 p-2 sm:p-3 sm:py-5 md:py-10 text-gray-700 w-12 sm:w-20 md:w-28 transition-all">
    <p class="font-gilda text-lg sm:text-3xl md:text-5xl">{{ value }}</p>
    <p class="text-2xs sm:text-xs md:text-base">{{ unit }}</p>
  </div>
</template>

<script>
export default {
  name: "CountdownCard",
  props: ["value", "unit"],
};
</script>

<style></style>
