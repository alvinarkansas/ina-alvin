<template>
  <button
    class="py-2 px-4 bg-red-900 text-white font-bold uppercase"
    :class="
      disabled ? 'bg-opacity-10' : 'transform hover:scale-105 transition-all'
    "
    @click="$emit('click')"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
