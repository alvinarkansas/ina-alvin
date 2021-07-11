export default {
  data() {
    return {
      screenWidth: 0,
    };
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    t(message) {
      return this.$t(message, {}, { locale: this.$i18n.locale });
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
