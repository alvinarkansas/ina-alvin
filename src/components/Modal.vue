<template>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      @click="$emit('update:modelValue', false)"
      class="w-screen h-screen bg-black bg-opacity-50 fixed inset-0 z-50"
    />
  </transition>
  <transition :name="screenWidth < 640 ? 'mobile-slide-up' : 'slide-up'" appear>
    <div
      v-if="modelValue"
      class="
        fixed
        bg-white
        modal-style
        p-4
        sm:p-6
        shadow-custom
        z-50
        transition-colors
        duration-500
        transform
      "
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "Modal",
  emits: ["update:modelValue"],
  mixins: [mixin],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active,
.mobile-slide-up-enter-active,
.mobile-slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  top: 100vh !important;
  transform: translateY(100vh) !important;
  transform: translateX(-50%) !important;
}

.mobile-slide-up-enter-from,
.mobile-slide-up-leave-to {
  transform: translateY(100vh) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-style {
  @apply bottom-0;
  @apply inset-x-0;
}
.inner-modal-fixed {
  height: 70vh;
}
.inner-modal-auto {
  height: auto;
}

@media screen and (min-width: 640px) {
  .modal-style {
    @apply bottom-auto;
    @apply right-auto;
    @apply top-1/2;
    @apply left-1/2;
    transform: translate(-50%, -50%);
  }
  .modal-xl {
    width: 85vw;
    height: 87.5vh;
  }
  .modal-lg {
    min-width: 57.5vw;
    max-height: 75vh;
  }
  .modal-md {
    min-width: 440px;
    max-width: 27.5vw;
    height: auto;
    max-height: 75.5vh;
  }
  .modal-sm {
    min-width: 320px;
    max-width: 27.5vw;
    height: auto;
    max-height: 75.5vh;
  }
  .fixed-to-auto {
    height: auto;
  }
}
</style>
