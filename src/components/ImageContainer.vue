<template>
  <div :class="`image-container-${id}`" :data-large="imageLg">
    <img
      class="placeholder img-small"
      :src="imageSm"
      width="300"
      height="400"
      loading="lazy"
    />
  </div>
</template>

<script>
export default {
  name: "ImageContainer",
  props: ["imageLg", "imageSm", "id"],
  mounted() {
    // window.onload = function () {
    let largePicture = document.querySelector(`.image-container-${this.id}`);

    // Load large image
    let imgLarge = new Image();
    imgLarge.src = largePicture.dataset.large;
    imgLarge.onload = function () {
      // imgLarge.classList.add("loaded");
      imgLarge.style.opacity = 1;
    };
    // imgLarge.classList.add("aaaaaaa");
    imgLarge.style.position = "absolute";
    imgLarge.style.top = 0;
    imgLarge.style.left = 0;
    imgLarge.style.opacity = 0;
    imgLarge.style.width = "100%";
    imgLarge.style.height = "100%";
    imgLarge.style.transition = "opacity 1s linear";
    largePicture.appendChild(imgLarge);
    // };
  },
};
</script>

<style>
div[class^="image-container-"],
div[class*=" image-container-"] {
  position: relative;
  overflow: hidden;
}

.placeholder {
  position: relative;
  width: 100%;
  filter: blur(10px);
  transform: scale(1);
}

.picture {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s linear;
}

.aaaaaaa {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s linear;
}

.picture.loaded {
  opacity: 1;
}

.aaaaaaa.loaded {
  opacity: 1;
}
</style>
