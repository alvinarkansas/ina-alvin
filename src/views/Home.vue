<template>
  <div class="w-full">
    <transition name="slide">
      <button
        v-if="scrollY > 600"
        @click="scrollToTop"
        class="
          p-2
          bg-red-900
          text-white
          transform
          hover:scale-105
          transition-all
          fixed
          right-4
          bottom-4
          z-50
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </transition>

    <div class="w-full jumbotron">
      <Modal v-model="modal.address">
        <section
          class="
            modal-md
            inner-modal-fixed
            fixed-to-auto
            relative
            overflow-y-auto overflow-x-hidden
          "
        >
          <button
            class="
              p-2
              text-gray-800
              transform
              hover:scale-105
              hover:bg-gray-800 hover:bg-opacity-10
              transition-all
              absolute
              right-0
              top-0
            "
            @click="modal.address = false"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <main class="grid gap-6 font-cormorant-sc">
            <p class="py-1 md:text-xl font-semibold font-cormorant-uprignt">
              {{ t("guest_form.title") }}
            </p>

            <p class="text-left">
              {{ t("guest_form.subtitle") }}
            </p>

            <form @submit.prevent="showGiftInfo" class="grid gap-4">
              <div class="grid gap-2">
                <Input
                  :label="t('guest_form.name_label')"
                  v-model="guestForm.data.name"
                  name="name"
                />
              </div>
              <div class="grid gap-2">
                <Input
                  :label="t('guest_form.phone_label')"
                  v-model="guestForm.data.phone"
                  name="phone"
                />
              </div>
              <div class="grid gap-2">
                <Input
                  :label="t('guest_form.address_label')"
                  v-model="guestForm.data.address"
                  type="textarea"
                  name="address"
                />
              </div>
              <transition name="slide">
                <p v-if="guestForm.sent" class="text-green-600 font-semibold">
                  {{ t("guest_form.success_message") }}
                </p>
              </transition>
              <transition name="slide">
                <p v-if="guestForm.error" class="text-red-600 font-semibold">
                  {{ t("guest_form.error_message") }}
                </p>
              </transition>
              <div class="w-full grid sm:block sm:text-right">
                <button
                  type="submit"
                  :disabled="
                    !guestForm.data.name ||
                    !guestForm.data.phone ||
                    !guestForm.data.address
                  "
                  class="py-2 px-4 text-white font-bold"
                  :class="
                    !guestForm.data.name ||
                    !guestForm.data.phone ||
                    !guestForm.data.address
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-900 transform hover:scale-105 transition-all'
                  "
                >
                  {{
                    !guestForm.loading
                      ? `${t("guest_form.submit_button")}`
                      : `${t("guest_form.loading_label")}`
                  }}
                </button>
              </div>
            </form>
          </main>
        </section>
      </Modal>

      <Modal v-model="modal.gift">
        <section
          class="
            modal-lg
            inner-modal-fixed
            fixed-to-auto
            relative
            overflow-y-auto overflow-x-hidden
          "
        >
          <button
            class="
              p-2
              text-gray-800
              transform
              hover:scale-105
              hover:bg-gray-800 hover:bg-opacity-10
              transition-all
              absolute
              right-0
              top-0
            "
            @click="modal.gift = false"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <main class="grid gap-6 justify-items-center font-cormorant-sc">
            <p
              class="
                py-2
                md:py-1
                md:text-xl
                font-semibold font-cormorant-uprignt
                uppercase
              "
            >
              {{ `${t("gift_form.title")}, ${userName}` }}!
            </p>

            <p>{{ t("gift_form.address_prologue") }}</p>

            <div class="w-1/3 divide-y divide-grey-4">
              <p></p>
              <p></p>
            </div>

            <p class="font-bold text-base italic px-8 md:px-32">
              Perum. Permata Monjali A2 Jl. Lempongsari, Sariharjo, Ngaglik,
              Sleman, Daerah Istimewa Yogyakarta 55581
            </p>

            <div class="w-1/3 divide-y divide-grey-4">
              <p></p>
              <p></p>
            </div>

            <p>{{ t("gift_form.emoney_prologue") }}</p>

            <div class="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-16">
              <EmoneyCard
                theme="#005FAF"
                payment="BCA"
                accNumber="8610326570"
                ref="bcaNumber"
              />

              <EmoneyCard
                theme="#66AD15"
                payment="GOPAY"
                accNumber="081226611952"
                ref="gopayNumber"
              />

              <EmoneyCard
                theme="#4B2489"
                payment="OVO"
                accNumber="081226611952"
                ref="ovoNumber"
              />
            </div>
          </main>
        </section>
      </Modal>

      <Navbar />

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
          <CountdownCard :value="days" :unit="t('countdown.days')" />
          <CountdownCard :value="hours" :unit="t('countdown.hours')" />
          <CountdownCard :value="minutes" :unit="t('countdown.minutes')" />
          <CountdownCard :value="seconds" :unit="t('countdown.seconds')" />
        </section>
      </section>

      <section class="py-8 md:py-24 text-gray-700 grid gap-4">
        <p class="text-xs sm:text-sm md:text-lg">{{ t("subtitle") }}</p>
        <p class="text-4xl sm:text-7xl md:text-9xl">INA &#38; ALVIN</p>
      </section>
    </div>

    <section id="invitation" class="w-full px-4">
      <div
        class="
          w-full
          auto-rows-max
          grid
          gap-8
          md:gap-16
          place-items-center
          py-8
          md:py-16
          font-cormorant-sc
          grad-trans-white-trans
        "
      >
        <div
          class="
            grid
            gap-4
            md:text-lg
            px-8
            sm:px-16
            md:px-24
            lg:px-60
            place-items-center
          "
        >
          <img
            src="../assets/deco/batik-deco-small-5.png"
            alt="ICON"
            class="w-6 md:w-8"
            :width="screenWidth < 772 ? '24' : '32'"
            :height="screenWidth < 772 ? '24' : '32'"
          />
          <p class="text-center">{{ t("surah") }}</p>
          <p>(QS Ar-Rum 21)</p>
        </div>

        <div class="w-1/5 divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>

        <p class="md:text-xl">{{ t("the_wedding_of") }}</p>

        <div
          class="
            grid
            gap-4
            sm:grid-flow-col sm:grid-cols-7
            md:grid-cols-5
            place-items-center
          "
        >
          <div
            class="
              grid
              gap-4
              place-items-center
              sm:col-span-3
              md:col-span-2
              md:text-xl
              sm:px-4
            "
          >
            <div
              class="
                rounded-full
                h-16
                md:h-32
                w-16
                md:w-32
                bg-gradient-to-t
                from-yellow-600
                via-red-500
                to-purple-400
                p-1
                md:p-2
                select-none
              "
            >
              <a
                class="
                  block
                  rounded-full
                  ring-2
                  md:ring-4
                  ring-white
                  cursor-pointer
                "
                href="https://www.instagram.com/sakinahhbb/"
                target="_blank"
              >
                <img
                  :width="screenWidth < 772 ? '64' : '128'"
                  :height="screenWidth < 772 ? '64' : '128'"
                  src="../assets/ina-round.png"
                  alt="Nurus Sakinah"
                />
              </a>
            </div>
            <p class="font-bold">NURUS SAKINAH <br />(INA)</p>
            <p>{{ t("daughter_of") }}</p>
            <p>Bp. Ucok Chabib &#38; Ibu Nurul Fachriyah</p>
          </div>

          <div class="text-3xl sm:text-6xl mb-2">&#38;</div>

          <div
            class="
              grid
              gap-4
              place-items-center
              sm:col-span-3
              md:col-span-2
              md:text-xl
            "
          >
            <div
              class="
                rounded-full
                h-16
                md:h-32
                w-16
                md:w-32
                bg-gradient-to-t
                from-yellow-600
                via-red-500
                to-purple-400
                p-1
                md:p-2
                select-none
              "
            >
              <a
                class="
                  block
                  rounded-full
                  ring-2
                  md:ring-4
                  ring-white
                  cursor-pointer
                "
                href="https://www.instagram.com/alvinarkansas/"
                target="_blank"
              >
                <img
                  :width="screenWidth < 772 ? '64' : '128'"
                  :height="screenWidth < 772 ? '64' : '128'"
                  src="../assets/alvin-round.png"
                  alt="Alvin Arkansas"
                />
              </a>
            </div>
            <p class="font-bold">
              ALVIN ARKANSAS <br class="hidden sm:block" />HANYOKROKUSUMO
              <br class="sm:hidden" />(ALVIN)
            </p>
            <p>{{ t("son_of") }}</p>
            <p>Bp. Agung Fitri Awan &#38; Ibu Tiwi Hariyantini</p>
          </div>
        </div>

        <p class="md:text-xl">{{ t("will_be_held_on") }}</p>

        <div
          class="
            w-full
            grid
            place-items-center
            gap-4
            md:gap-16
            md:px-32
            md:text-lg
          "
        >
          <div
            class="
              w-full
              md:w-2/3
              bg-linen bg-opacity-50
              grid
              gap-4
              place-items-center
              px-4
              md:px-12
              py-12
            "
          >
            <img
              src="../assets/deco/batik-deco-small-1.png"
              class="w-6 md:w-8"
              alt="ICON"
              :width="screenWidth < 772 ? '24' : '32'"
              :height="screenWidth < 772 ? '24' : '32'"
            />

            <div
              class="grid grid-flow-col gap-4 auto-cols-max place-items-center"
            >
              <img
                src="../assets/deco/batik-deco-small-3.png"
                alt="\"
                width="8"
                height="9"
              />
              <p class="font-medium md:text-2xl">AKAD</p>
              <img
                src="../assets/deco/batik-deco-small-4.png"
                alt="/"
                width="8"
                height="9"
              />
            </div>

            <p class="font-medium md:text-2xl">
              <template v-if="$i18n.locale === 'id'">
                <span class="font-gilda">17 </span>
                <span>JULI </span>
              </template>
              <template v-else>
                <span>JULY </span>
                <span class="font-gilda">17, </span>
              </template>
              <span class="font-gilda">2021 09.00 </span>
              <span>WIB</span>
            </p>

            <p class="text-gray-500">
              Jl. Raya Kembang, Krajan, Candirenggo, Kec. Singosari, Malang,
              Jawa Timur 65153
            </p>

            <!-- <Button
              :label="t('button.join')"
              @click="openInNewTab('https://www.instagram.com/sakinahhbb/')"
            /> -->
            <button
              class="
                py-2
                px-4
                bg-gradient-to-tr
                from-yellow-600
                via-red-500
                to-purple-400
                text-white
                font-bold
                uppercase
                transform
                hover:scale-105
                transition-all
                animate-bounce
              "
              @click="openInNewTab('https://www.instagram.com/sakinahhbb/')"
            >
              {{ t("button.join") }}
            </button>
          </div>
        </div>

        <div
          class="
            w-full
            grid
            gap-4
            md:gap-16
            md:px-32
            md:grid-flow-col md:grid-cols-2
            md:text-lg
          "
        >
          <div
            class="
              bg-linen bg-opacity-50
              grid
              gap-4
              place-items-center
              px-4
              md:px-12
              py-12
              postponed
              relative
            "
          >
            <img
              src="../assets/deco/batik-deco-small-2.png"
              class="w-6 md:w-8 opacity-20"
              alt="ICON"
              :width="screenWidth < 772 ? '24' : '32'"
              :height="screenWidth < 772 ? '24' : '32'"
            />

            <div
              class="grid grid-flow-col gap-4 auto-cols-max place-items-center"
            >
              <img
                src="../assets/deco/batik-deco-small-3.png"
                class="opacity-20"
                alt="\"
                width="8"
                height="9"
              />
              <p class="font-medium md:text-2xl">
                RESEPSI
                <span class="font-gilda font-medium md:text-2xl">1</span>
              </p>
              <img
                src="../assets/deco/batik-deco-small-4.png"
                class="opacity-20"
                alt="/"
                width="8"
                height="9"
              />
            </div>

            <p>{{ t("invitation.malang_date") }}</p>

            <div>
              <p>{{ t("invitation.session") }} 1: 16.00 WIB</p>
              <p>{{ t("invitation.session") }} 2: 18.30 WIB</p>
            </div>

            <p>Taman Indie Resto</p>

            <p>Jl. Araya Megah No. 9, Pandanwangi Kec. Blimbing, Kota Malang</p>

            <span
              class="
                w-full
                py-16
                px-2
                text-xl text-red-900
                md:text-2xl
                bg-linen-dark bg-opacity-40
                font-bold
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
              "
            >
              {{ t("postponed") }}
            </span>
          </div>

          <div
            class="
              bg-linen bg-opacity-50
              grid
              gap-4
              place-items-center
              px-4
              py-12
              postponed
              relative
            "
          >
            <img
              src="../assets/deco/batik-deco-small-2.png"
              class="w-6 md:w-8 opacity-20"
              alt="ICON"
              :width="screenWidth < 772 ? '24' : '32'"
              :height="screenWidth < 772 ? '24' : '32'"
            />

            <div
              class="grid grid-flow-col gap-4 auto-cols-max place-items-center"
            >
              <img
                src="../assets/deco/batik-deco-small-3.png"
                class="opacity-20"
                alt="\"
                width="8"
                height="9"
              />
              <p class="font-medium md:text-2xl">
                RESEPSI
                <span class="font-gilda font-medium md:text-2xl">2</span>
              </p>
              <img
                src="../assets/deco/batik-deco-small-4.png"
                class="opacity-20"
                alt="/"
                width="8"
                height="9"
              />
            </div>

            <p>24 Juli 2021</p>

            <div>
              <p>Sesi 1: 15.00 WIB</p>
              <p>Sesi 2: 17.30 WIB</p>
            </div>

            <p>Hotel Indoluxe Yogyakarta</p>

            <p>
              Jl. Palagan Tentara Pelajar No.106, Sariharjo, Kec. Ngaglik,
              Sleman, DIY
            </p>

            <span
              class="
                w-full
                py-16
                px-2
                text-xl text-red-900
                md:text-2xl
                bg-linen-dark bg-opacity-40
                font-bold
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
              "
            >
              {{ t("postponed") }}
            </span>
          </div>
        </div>

        <p class="md:text-lg md:w-1/2">
          {{ t("protocol_prologue") }}
        </p>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-24">
          <IllustrationCard
            name="thermo"
            alt="TEMPERATURE"
            label="protocol.temperature_check"
          />
          <IllustrationCard
            name="no-handshake"
            alt="HANDSHAKE"
            label="protocol.no_handshake"
          />
          <IllustrationCard
            name="distancing"
            alt="DISTANCING"
            label="protocol.physical_distancing"
          />
          <IllustrationCard
            name="max"
            alt="CAPACITY"
            label="protocol.maximum_capacity"
          />
          <IllustrationCard
            name="wear-mask"
            alt="WEAR-MASK"
            label="protocol.mask"
          />
          <IllustrationCard
            name="hygiene-wash"
            alt="WASH"
            label="protocol.handwash"
          />
        </div>

        <p class="md:text-lg w-3/4 md:w-1/2">
          {{ t("protocol_warning") }}
        </p>

        <p class="md:text-lg w-3/4 md:w-1/2">
          {{ t("sad_announcement") }}
        </p>

        <p class="font-semibold md:text-lg w-3/4 md:w-1/2">
          {{ t("attendance_limit") }}
        </p>

        <p class="md:text-lg w-3/4 md:w-1/2">
          {{ t("live_streaming_prologue") }}
        </p>

        <!-- <div
          class="
            bg-linen bg-opacity-50
            w-full
            sm:w-3/4
            lg:w-1/3
            grid
            gap-6
            place-items-center
            px-4
            md:px-12
            py-12
          "
        >
          <img
            src="../assets/deco/batik-deco-small-6.png"
            class="w-6 md:w-8"
            alt="ICON"
            :width="screenWidth < 772 ? '24' : '32'"
            :height="screenWidth < 772 ? '24' : '32'"
          />

          <div
            class="grid grid-flow-col gap-4 auto-cols-max place-items-center"
          >
            <img
              src="../assets/deco/batik-deco-small-3.png"
              alt="\"
              width="8"
              height="9"
            />
            <p class="font-medium md:text-2xl">LIVE STREAMING</p>
            <img
              src="../assets/deco/batik-deco-small-4.png"
              alt="/"
              width="8"
              height="9"
            />
          </div>

          <p class="md:text-xl">{{ t("on_youtube") }}</p>

          <div class="grid grid-cols-2 place-items-center gap-x-8 gap-y-6">
            <div
              class="
                rounded-full
                h-16
                md:h-32
                w-16
                md:w-32
                bg-gradient-to-t
                from-yellow-600
                via-red-500
                to-purple-400
                p-1
                md:p-2
                select-none
                relative
              "
            >
              <a
                class="
                  block
                  rounded-full
                  ring-2
                  md:ring-4
                  ring-white
                  cursor-pointer
                "
                href="https://www.instagram.com/sakinahhbb/"
                target="_blank"
              >
                <img
                  src="../assets/ina-round.png"
                  alt="Nurus Sakinah"
                  :width="screenWidth < 772 ? '64' : '128'"
                  :height="screenWidth < 772 ? '64' : '128'"
                />
              </a>
              <p
                class="
                  text-2xs
                  sm:text-xs
                  md:text-sm
                  py-0.5
                  sm:py-1
                  px-2
                  rounded
                  bg-purple-400
                  text-white
                  absolute
                  -bottom-1
                  sm:-bottom-3
                  left-1/2
                  transform
                  -translate-x-1/2
                  bg-gradient-to-t
                  from-yellow-600
                  to-red-500
                  font-bold
                "
              >
                LIVE
              </p>
            </div>
            <div
              class="
                rounded-full
                h-16
                md:h-32
                w-16
                md:w-32
                bg-gradient-to-t
                from-yellow-600
                via-red-500
                to-purple-400
                p-1
                md:p-2
                select-none
                relative
              "
            >
              <a
                class="
                  block
                  rounded-full
                  ring-2
                  md:ring-4
                  ring-white
                  cursor-pointer
                "
                href="https://www.instagram.com/alvinarkansas/"
                target="_blank"
              >
                <img
                  src="../assets/alvin-round.png"
                  alt="Alvin Arkansas"
                  :width="screenWidth < 772 ? '64' : '128'"
                  :height="screenWidth < 772 ? '64' : '128'"
                />
              </a>
              <p
                class="
                  text-2xs
                  sm:text-xs
                  md:text-sm
                  py-0.5
                  sm:py-1
                  px-2
                  rounded
                  bg-purple-400
                  text-white
                  absolute
                  -bottom-1
                  sm:-bottom-3
                  left-1/2
                  transform
                  -translate-x-1/2
                  bg-gradient-to-t
                  from-yellow-600
                  to-red-500
                  font-bold
                "
              >
                LIVE
              </p>
            </div>
            <p class="md:text-lg font-cormorant-infant row-auto">@sakinahhbb</p>
            <p class="md:text-lg font-cormorant-infant">@alvinarkansas</p>
          </div>

          <p class="md:text-xl">{{ t("live_streaming_time") }}</p>

          <Button
            :label="t('button.join')"
            @click="openInNewTab('https://www.instagram.com/sakinahhbb/')"
          />
        </div> -->
      </div>
    </section>

    <section id="gallery" class="py-8 px-4">
      <div class="w-full grid gap-6 mb-4">
        <p class="md:text-xl font-semibold">{{ t("navbar.gallery") }}</p>
        <div class="grid gap-4 md:grid-cols-3 place-items-start min-h-screen">
          <div class="grid gap-4 min-w-full">
            <ImageContainer
              id="1"
              image-lg="https://i.postimg.cc/HsvkxVtF/photo-1-640.jpg"
              image-sm="https://i.postimg.cc/qRc7MwmG/photo-1-27.jpg"
            />
            <ImageContainer
              id="2"
              image-lg="https://i.postimg.cc/zD0JtV43/photo-2-640.jpg"
              image-sm="https://i.postimg.cc/wxVBCWRq/photo-2-27.jpg"
            />
            <ImageContainer
              id="3"
              image-lg="https://i.postimg.cc/Kvjmdmyf/photo-3-640.jpg"
              image-sm="https://i.postimg.cc/zv0XTBYb/photo-3-27.jpg"
            />
            <ImageContainer
              id="4"
              image-lg="https://i.postimg.cc/mD4bqMb1/photo-4-640.jpg"
              image-sm="https://i.postimg.cc/RhMZ3tyx/photo-4-27.jpg"
            />
            <ImageContainer
              id="5"
              image-lg="https://i.postimg.cc/nhQphTrQ/photo-5-640.jpg"
              image-sm="https://i.postimg.cc/zXGf8nTn/photo-5-27.jpg"
            />
            <ImageContainer
              id="6"
              image-lg="https://i.postimg.cc/W372P33W/photo-6-640.jpg"
              image-sm="https://i.postimg.cc/vZ1H6bqT/photo-6-27.jpg"
            />
          </div>
          <div class="grid gap-4 min-w-full">
            <ImageContainer
              id="7"
              image-lg="https://i.postimg.cc/28tCYgkD/photo-7-640.jpg"
              image-sm="https://i.postimg.cc/Z51Y822c/photo-7-27.jpg"
            />
            <ImageContainer
              id="8"
              image-lg="https://i.postimg.cc/q7V0hn6D/photo-8-640.jpg"
              image-sm="https://i.postimg.cc/25hk2Tff/photo-8-27.jpg"
            />
            <ImageContainer
              id="9"
              image-lg="https://i.postimg.cc/FRh4G4Zj/photo-9-640.jpg"
              image-sm="https://i.postimg.cc/4yNX4gHJ/photo-9-27.jpg"
            />
            <ImageContainer
              id="10"
              image-lg="https://i.postimg.cc/cCbGs8Nm/photo-10-640.jpg"
              image-sm="https://i.postimg.cc/8cKNj0LL/photo-10-27.jpg"
            />
            <ImageContainer
              id="11"
              image-lg="https://i.postimg.cc/fTVh85xg/photo-11-640.jpg"
              image-sm="https://i.postimg.cc/xdvQKCKf/photo-11-27.jpg"
            />
            <ImageContainer
              id="12"
              image-lg="https://i.postimg.cc/GmYnC2gF/photo-12-640.jpg"
              image-sm="https://i.postimg.cc/W3SPHHWx/photo-12-27.jpg"
            />
          </div>
          <div class="grid gap-4 min-w-full">
            <ImageContainer
              id="13"
              image-lg="https://i.postimg.cc/fbf4VPNk/photo-13-640.jpg"
              image-sm="https://i.postimg.cc/cCHNyBPC/photo-13-27.jpg"
            />
            <ImageContainer
              id="14"
              image-lg="https://i.postimg.cc/MHXgrKjj/photo-14-640.jpg"
              image-sm="https://i.postimg.cc/05WsGhJw/photo-14-27.jpg"
            />
            <ImageContainer
              id="15"
              image-lg="https://i.postimg.cc/yx52q4Fp/photo-15-640.jpg"
              image-sm="https://i.postimg.cc/pX3M48CV/photo-15-27.jpg"
            />
            <ImageContainer
              id="16"
              image-lg="https://i.postimg.cc/Y2y5LgJN/photo-16-640.jpg"
              image-sm="https://i.postimg.cc/SKhFNhHw/photo-16-27.jpg"
            />
            <ImageContainer
              id="17"
              image-lg="https://i.postimg.cc/ZKB18nSG/photo-17-640.jpg"
              image-sm="https://i.postimg.cc/sXjk7Jjm/photo-17-27.jpg"
            />
            <ImageContainer
              id="18"
              image-lg="https://i.postimg.cc/Yq5Tb72h/photo-18-640.jpg"
              image-sm="https://i.postimg.cc/260PwB3D/photo-18-27.jpg"
            />
          </div>
        </div>
      </div>
      <div class="w-full grid place-items-center">
        <iframe
          class="w-full video-frame"
          src="https://www.youtube.com/embed/2GslXyNE0z8?modestbranding=1&rel=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </section>

    <section id="wishes" class="py-8 mb-32 font-cormorant-sc overflow-x-hidden">
      <div class="w-full px-4 md:w-1/3 grid gap-6 md:text-lg mb-16 mx-auto">
        <p class="md:text-xl font-semibold font-cormorant-uprignt">
          {{ t("navbar.wishes") }}
        </p>

        <p class="text-left">
          {{ t("wishes_prologue") }}
        </p>

        <form @submit.prevent="sendWishes" class="grid gap-4">
          <div class="grid gap-2">
            <Input
              :label="t('wishes_form.name_label')"
              v-model="wishesForm.data.name"
              name="wishes_name"
            />
          </div>
          <div class="grid gap-2">
            <Input
              :label="t('wishes_form.wishes_label')"
              v-model="wishesForm.data.wishes"
              type="textarea"
              name="wishes_wishes"
            />
          </div>
          <transition name="slide">
            <p v-if="wishesForm.sent" class="text-green-600 font-semibold">
              {{ t("wishes_form.success_message") }}
            </p>
          </transition>
          <transition name="slide">
            <p v-if="wishesForm.error" class="text-red-600 font-semibold">
              {{ t("wishes_form.error_message") }}
            </p>
          </transition>
          <div class="w-full grid sm:block sm:text-right">
            <button
              type="submit"
              :disabled="!wishesForm.data.name || !wishesForm.data.wishes"
              class="py-2 px-4 text-white font-bold"
              :class="
                !wishesForm.data.name || !wishesForm.data.wishes
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-900 transform hover:scale-105 transition-all'
              "
            >
              {{
                !wishesForm.loading
                  ? `${t("wishes_form.submit_button")}`
                  : `${t("wishes_form.loading_label")}`
              }}
            </button>
          </div>
        </form>
      </div>

      <template v-if="screenWidth < 640">
        <div class="slider-container mb-4">
          <div
            v-for="(wish, index) in wishes"
            :key="wish.id"
            class="slide w-screen md:w-1/3-screen bg-texture"
            style="background-position: center -10%"
            v-on:touchstart="touchStart(index, $event)"
            v-on:touchend="touchEnd"
            v-on:touchmove="touchMove"
            v-on:mousedown="touchStart(index, $event)"
            v-on:mouseup="touchEnd"
            v-on:mouseleave="touchEnd"
            v-on:mousemove="touchMove"
          >
            <p class="text-base italic">"{{ wish.wishes }}"</p>
            <div>
              <p class="text-base font-semibold">- {{ wish.name }} -</p>
              <p class="text-red-800">{{ wish.created_at }}</p>
            </div>
          </div>
        </div>
        <p v-if="!swipe.done" class="text-base animate-bounce mb-16">
          {{ t("swipe_label") }} >
        </p>
      </template>
      <template v-else>
        <div class="carousel-view">
          <button
            class="carousel-button left-0 bg-gradient-to-r z-50"
            @click="previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 transform transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <transition-group
            tag="div"
            class="carousel"
            :class="wishes.length % 2 === 0 ? 'center-carousel' : ''"
          >
            <div
              v-for="wish in wishes"
              class="wish bg-texture"
              style="background-position: center -30%"
              :key="wish.id"
            >
              <p class="text-lg italic">"{{ wish.wishes }}"</p>
              <div>
                <p class="text-lg font-semibold">- {{ wish.name }} -</p>
                <p class="text-red-800">{{ wish.created_at }}</p>
              </div>
            </div>
          </transition-group>
          <button
            class="carousel-button right-0 bg-gradient-to-l"
            @click="next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 transform transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </template>

      <div
        class="
          md:w-1/3
          px-4
          grid
          gap-6
          md:text-lg
          place-items-center
          mt-48
          mb-16
          mx-auto
        "
      >
        <img
          src="../assets/illustrations/illustration-gift.png"
          alt="GIFT"
          class="h-32 w-32"
        />

        <p>{{ t("gift_prologue") }}</p>

        <div class="w-full grid sm:block">
          <Button
            :label="t('button.show_me')"
            @click="modal.address = !modal.address"
          />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import CountdownCard from "@/components/CountdownCard.vue";
import EmoneyCard from "@/components/EmoneyCard.vue";
import Footer from "@/components/Footer.vue";
import IllustrationCard from "@/components/IllustrationCard.vue";
import ImageContainer from "@/components/ImageContainer.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Navbar from "@/components/Navbar.vue";
import mixin from "@/mixin";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);

export default {
  name: "Home",
  components: {
    Button,
    CountdownCard,
    EmoneyCard,
    Footer,
    IllustrationCard,
    ImageContainer,
    Input,
    Modal,
    Navbar,
  },
  mixins: [mixin],
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
      showCopiedNotification: false,
      scrollY: 0,
      scrollTimer: 0,
      TAMAN_INDIE_LOC_URL:
        "https://www.google.com/maps/place/Taman+Indie/@-7.939455,112.6646045,15z/data=!4m5!3m4!1s0x0:0x7234a042cc61972f!8m2!3d-7.939455!4d112.6646045",
      INDOLUXE_LOC_URL:
        "https://www.google.com/maps/place/INDOLUXE+HOTEL+JOGJAKARTA/@-7.7502299,110.3702439,17z/data=!3m1!4b1!4m8!3m7!1s0x2e7a59948461ea05:0x6215750c0500c63e!5m2!4m1!1i2!8m2!3d-7.7502299!4d110.3724326",
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
        const weddingDay = new Date("Jul 17, 2021 09:00:00").getTime();
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
            created_at: dayjs()
              .locale(this.$i18n.locale)
              .to(dayjs(data[key].created_at)),
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
  },
};
</script>

<style scoped>
.postponed::before {
  content: "";
  @apply absolute inset-0;
  @apply grid place-items-center;
  @apply text-red-600 text-2xl font-medium;
}

div.postponed {
  @apply text-gray-400 text-opacity-70;
  @apply bg-opacity-30;
  @apply select-none;
}

.jumbotron {
  height: 720px;
  background-image: url("../assets/jumbotron-xs.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

#invitation {
  background-image: url("../assets/deco/batik-decoration-narrow.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.batik-deco {
  background-image: none;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.carousel-view {
  @apply relative flex flex-col items-center;
}
.carousel {
  @apply flex justify-center items-center;
  @apply overflow-hidden;
}
.center-carousel {
  margin-left: calc(64vw + 8rem);
}
.carousel-button {
  @apply absolute inset-y-0;
  @apply grid place-items-center;
  @apply from-linen to-transparent hover:bg-linen-darker;
  @apply bg-opacity-50 hover:bg-opacity-20;
  @apply px-12;
  @apply text-gray-800;
  @apply transition-all;
}
.carousel-button:hover svg {
  @apply scale-150;
}
.wish {
  @apply p-32 bg-linen mx-16;
  @apply grid gap-6 place-items-center;
  min-height: 32rem;
  flex: 0 0 64vw;
  transition: transform 0.3s ease-in-out;
}
.wish:first-of-type {
  opacity: 0;
}
.wish:last-of-type {
  opacity: 0;
}

.video-frame {
  height: 256px;
  @apply sm:h-1/3-screen md:h-1/2-screen lg:h-7/8-screen;
}

.slider-container {
  @apply bg-linen;
  display: inline-flex;
  overflow: hidden;
  transform: translateX(0);
  transition: transform 0.3s ease-out;
  cursor: grab;
}

.slide {
  @apply grid gap-6 py-2 px-8 place-items-center select-none;
  min-height: 75vh;
}

.slide p {
  transition: transform 0.1s ease-in-out;
}

.grabbing {
  cursor: grabbing;
}

.grabbing .slide p {
  transform: scale(0.95);
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
