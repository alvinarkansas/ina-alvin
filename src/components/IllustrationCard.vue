<template>
  <div class="grid md:gap-2 place-items-center">
    <img
      :src="getIllustration(name)"
      :alt="alt"
      class="h-24 md:h-32 w-24 md:w-32"
      width="96"
      height="96"
    />
    <p class="text-center">{{ t(label) }}</p>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "IllustrationCard",
  mixins: [mixin],
  props: {
    name: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    getIllustration(name) {
      return require(`../assets/illustrations/illustration-${name}.png`);
    },
  },
};
</script>
