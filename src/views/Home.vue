<template>
  <div class="w-full jumbotron">
    <nav
      class="
        grid grid-cols-3
        py-4
        sm:py-6
        px-8
        md:px-32
        opacity-60
        text-gray-700
        sm:font-medium
        text-sm
        md:text-lg
      "
    >
      <div id="logo" class="col-span-1 flex items-center">
        <img
          class="w-4 md:w-12"
          src="../assets/logo/logo-black.png"
          alt="logo"
        />
      </div>
      <div
        id="menu"
        class="
          col-span-2
          grid grid-flow-col
          auto-cols-max
          gap-2
          sm:gap-6
          place-self-end
        "
      >
        <a
          href="#invitation"
          class="hover:text-yellow-800 transform hover:scale-110 transition-all"
        >
          INVITATION
        </a>
        <a
          href="#gallery"
          class="hover:text-yellow-800 transform hover:scale-110 transition-all"
        >
          GALLERY
        </a>
        <a
          href="#wishes"
          class="hover:text-yellow-800 transform hover:scale-110 transition-all"
        >
          WISHES
        </a>
      </div>
    </nav>

    <section class="batik-deco">
      <section
        class="
          py-10
          sm:py-24
          md:py-48
          xl:py-56
          grid grid-flow-col
          auto-rows-max auto-cols-max
          gap-4
          md:gap-16
          justify-center
          px-16
          grad-trans-linen-trans
        "
      >
        <CountdownCard :value="days" unit="DAYS" />
        <CountdownCard :value="hours" unit="HOURS" />
        <CountdownCard :value="minutes" unit="MINUTES" />
        <CountdownCard :value="seconds" unit="SECONDS" />
      </section>
    </section>

    <section class="py-8 md:py-24 text-gray-700 grid gap-4">
      <p class="text-xs sm:text-sm md:text-lg">UNTIL THE WEDDING OF</p>
      <p class="text-4xl sm:text-7xl md:text-9xl">INA &#38; ALVIN</p>
    </section>
  </div>
</template>

<script>
import CountdownCard from "@/components/CountdownCard.vue";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default {
  name: "Home",
  components: { CountdownCard },
  data() {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      wishes: [],
      wishesLimit: 6,
      wishesForm: {
        data: {
          name: "",
          wishes: "",
        },
        loading: false,
        sent: false,
        error: false,
      },
      guestForm: {
        data: {
          name: "",
          phone: "",
          address: "",
        },
        loading: false,
        sent: false,
        error: false,
      },
      userName: "",
      modal: {
        address: false,
        gift: false,
      },
      swipe: {
        isDragging: false,
        startPos: 0,
        currentTranslate: 0,
        prevTranslate: 0,
        animationID: 0,
        currentIndex: 0,
        done: false,
      },
      copyNotification: {
        bcaNumber: false,
        gopayNumber: false,
        ovoNumber: false,
      },
      showCopiedNotification: false,
      scrollY: 0,
      scrollTimer: 0,
    };
  },
  computed: {
    visibleWishes() {
      return this.wishes.slice(0, this.wishesLimit);
    },
  },
  methods: {
    countdown() {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const weddingDay = new Date("Jul 17, 2021 13:00:00").getTime();
        const distance = weddingDay - now;

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.days = days < 10 ? `0${days}` : days;
        this.hours = hours < 10 ? `0${hours}` : hours;
        this.minutes = minutes < 10 ? `0${minutes}` : minutes;
        this.seconds = seconds < 10 ? `0${seconds}` : seconds;
      }, 1000);
    },
    next() {
      const first = this.wishes.shift();
      this.wishes = this.wishes.concat(first);
    },
    previous() {
      const last = this.wishes.pop();
      this.wishes = [last].concat(this.wishes);
    },
    getPositionX(event) {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    },
    setSliderPosition() {
      const slider = document.querySelector(".slider-container");
      slider.style.transform = `translateX(${this.swipe.currentTranslate}px)`;
    },
    animation() {
      this.setSliderPosition();
      if (this.swipe.isDragging) requestAnimationFrame(this.animation);
    },
    touchStart(index, event) {
      const slider = document.querySelector(".slider-container");
      this.swipe.currentIndex = index;
      this.swipe.startPos = this.getPositionX(event);
      this.swipe.isDragging = true;

      this.swipe.animationID = requestAnimationFrame(this.animation);
      slider.classList.add("grabbing");
    },
    setPositionByIndex() {
      this.swipe.currentTranslate =
        this.swipe.currentIndex * -window.innerWidth;
      this.swipe.prevTranslate = this.swipe.currentTranslate;
      this.setSliderPosition();
    },
    touchEnd() {
      const slider = document.querySelector(".slider-container");
      this.swipe.isDragging = false;
      cancelAnimationFrame(this.swipe.animationID);

      const movedBy = this.swipe.currentTranslate - this.swipe.prevTranslate;

      if (movedBy < -100 && this.swipe.currentIndex < this.wishes.length - 1) {
        this.swipe.currentIndex += 1;
      }

      if (movedBy > 100 && this.swipe.currentIndex > 0) {
        this.swipe.currentIndex -= 1;
      }

      this.setPositionByIndex();

      slider.classList.remove("grabbing");
      this.swipe.done = true;
    },
    touchMove(event) {
      if (this.swipe.isDragging) {
        const currentPosition = this.getPositionX(event);
        this.swipe.currentTranslate =
          this.swipe.prevTranslate + currentPosition - this.swipe.startPos;
      }
    },
    preventContextMenu() {
      window.oncontextmenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    },
    openInNewTab(url) {
      window.open(url, "_blank");
    },
    handleAction(formName, stateName) {
      this[formName][stateName] = true;

      setTimeout(() => {
        this[formName][stateName] = false;
      }, 2000);
    },
    async getWishes() {
      this.wishes = [];
      try {
        const { data } = await axios.get(
          "https://ina-alvin-default-rtdb.firebaseio.com/wishes.json"
        );
        Object.keys(data).forEach((key) => {
          this.wishes.push({
            id: key,
            ...data[key],
            created_at: dayjs().to(dayjs(data[key].created_at)),
          });
        });
        this.wishes.reverse();
        if (this.screenWidth >= 640) {
          for (let i = 0; i < this.wishes.length / 2 - 1; i++) {
            this.previous();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    loadMoreWishes() {
      this.wishesLimit += 6;
    },
    async submitForm(formName, tableName) {
      this[formName].data.created_at = new Date();
      try {
        this[formName].loading = true;
        await axios.post(
          `https://ina-alvin-default-rtdb.firebaseio.com/${tableName}.json`,
          this[formName].data
        );
        this.handleAction(formName, "sent");
      } catch (error) {
        this.handleAction(formName, "error");
      }
      this[formName].loading = false;
      Object.keys(this[formName].data).forEach(
        (key) => (this[formName].data[key] = "")
      );
    },
    async sendWishes() {
      await this.submitForm("wishesForm", "wishes");
      this.getWishes();
      this.wishesLimit = 6;
    },
    async showGiftInfo() {
      this.userName = this.guestForm.data.name.split(" ")[0];
      await this.submitForm("guestForm", "guests");
      this.modal.address = false;
      this.modal.gift = true;
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
    copyToClipboard(ref) {
      this.selectText(this.$refs[ref]);
      document.execCommand("copy");
      this.copyNotification[ref] = true;
      setTimeout(() => {
        this.copyNotification[ref] = false;
      }, 1500);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      if (this.scrollTimer) return;
      this.scrollTimer = setTimeout(() => {
        this.scrollY = window.scrollY;
        clearTimeout(this.scrollTimer);
        this.scrollTimer = 0;
      }, 100);
    },
  },
  async mounted() {
    this.countdown();
    window.addEventListener("scroll", this.handleScroll);
    await this.getWishes();
    this.preventContextMenu();
  },
};
</script>

<style scoped>
.jumbotron {
  height: 720px;
  background-image: url("../assets/jumbotron-xs.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.grad-trans-white-trans {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

#invitation {
  background-image: url("../assets/deco/batik-decoration-narrow.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

@media screen and (min-width: 640px) {
  .jumbotron {
    height: 960px;
    background-image: url("../assets/jumbotron-lg.png");
  }
  #invitation {
    background-image: url("../assets/deco/batik-decoration.png");
    background-attachment: fixed;
  }
  .batik-deco {
    background-image: url("../assets/deco/batik-decoration-narrow.png");
  }
  .grad-trans-white-trans {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
  .grad-trans-linen-trans {
    background: rgb(242, 241, 238);
    background: linear-gradient(
      rgba(242, 241, 238, 1) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(242, 241, 238, 1) 100%
    );
    background-image: linear-gradient(
      rgba(242, 241, 238, 1),
      rgba(255, 255, 255, 0),
      rgba(242, 241, 238, 1)
    );
  }
}

@media screen and (min-width: 768px) {
  .jumbotron {
    height: 1080px;
  }
}

@media screen and (min-width: 1024px) {
  .jumbotron {
    height: 1960px;
  }
}

@media screen and (min-width: 1280px) {
  .jumbotron {
    height: 2560px;
  }
}
</style>
