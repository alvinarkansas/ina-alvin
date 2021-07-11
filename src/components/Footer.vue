<template>
  <footer
    class="
      p-8
      md:p-12
      md:pb-8
      grid
      gap-2
      bg-linen
      font-cormorant-sc
      place-items-center
    "
  >
    <div
      class="
        grid grid-flow-col
        gap-1
        auto-cols-max
        items-center
        justify-center
        mb-16
      "
    >
      <span>{{ t("footer") }} </span>
      <a
        class="transform hover:scale-105 hover:text-red-800 transition-all"
        href="https://www.instagram.com/ameltrias.moments/"
        target="_blank"
      >
        Ameltrias
      </a>
      <span> &#38; </span>
      <a
        class="transform hover:scale-105 hover:text-red-800 transition-all"
        href="https://www.instagram.com/_stagedoc/"
        target="_blank"
      >
        Stagedoc
      </a>
    </div>

    <div class="grid grid-flow-col auto-cols-max gap-2">
      <a
        class="transform transition-all"
        :class="
          $i18n.locale === 'en'
            ? 'text-red-800 cursor-default'
            : 'hover:scale-105 hover:text-red-800 cursor-pointer'
        "
        @click="changeLang('en')"
      >
        English
      </a>
      <p>|</p>
      <a
        class="transform transition-all"
        :class="
          $i18n.locale === 'id'
            ? 'text-red-800 cursor-default'
            : 'hover:scale-105 hover:text-red-800 cursor-pointer'
        "
        @click="changeLang('id')"
      >
        Bahasa
      </a>
    </div>

    <p class="text-gray-400">alvinarkansas &#169; 2021</p>
  </footer>
</template>

<script>
import mixin from "@/mixin";
export default {
  name: "Footer",
  mixins: [mixin],
  emits: ["onLangChange"],
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$emit("onLangChange");
    },
  },
};
</script>
