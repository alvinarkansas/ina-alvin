<template>
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
        :width="screenWidth < 772 ? '16' : '48'"
        :height="screenWidth < 772 ? '16' : '48'"
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
</template>

<script>
import mixin from "@/mixin";
export default {
  name: "Navbar",
  mixins: [mixin],
};
</script>