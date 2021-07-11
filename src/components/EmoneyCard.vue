<template>
  <div
    class="grid gap-2 place-items-center p-4 pt-2"
    :style="`border: 2px solid ${theme}`"
  >
    <p class="font-bold" :style="`color: ${theme}`">{{ payment }}</p>
    <div class="grid place-items-center">
      <p>Alvin Arkansas</p>
      <img
        :src="getQR(payment)"
        :alt="payment"
        class="w-56"
        width="224"
        height="224"
      />
      <p
        v-if="!notification"
        class="font-bold text-base relative font-cormorant-infant"
        :ref="ref"
      >
        {{ accNumber }}
        <svg
          @click="copyToClipboard"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute text-gray-600 cursor-pointer"
          style="right: -1.5rem; bottom: 2px"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
          />
          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </p>
      <p v-else class="bg-red-900 text-white px-2 font-bold text-base">
        {{ t("clipboard_msg") }}
      </p>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "EmoneyCard",
  mixins: [mixin],
  props: {
    theme: {
      type: String,
      default: "#E5E5E5",
    },
    payment: {
      type: String,
      default: "",
    },
    accNumber: {
      type: String,
      default: "",
    },
    ref: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      notification: false,
    };
  },
  methods: {
    getQR(name) {
      return require(`../assets/QR/${name}.png`);
    },
    selectText(element) {
      let range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    copyToClipboard() {
      this.selectText(this.$refs[this.ref]);
      document.execCommand("copy");
      this.notification = true;
      setTimeout(() => {
        this.notification = false;
      }, 1500);
    },
  },
};
</script>