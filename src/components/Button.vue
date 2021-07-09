<template>
  <button
    class="
      py-2
      px-4
      bg-red-900
      text-white
      font-bold
      transform
      hover:scale-105
      transition-all
      uppercase
    "
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "Button",
  mixins: [mixin],
  emits: ["click"],
  props: {
    label: {
      type: String,
      default: "button",
    },
  },
};
</script>
