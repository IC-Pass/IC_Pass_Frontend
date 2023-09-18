import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/infrastructure/router";
import dayjs from "@/infrastructure/plugins/dayjs";
import { setupCalendar } from "v-calendar";

import App from "./App.vue";

import "./assets/styles/main.scss";
import clickOutSide from "@/helpers/directives";

const app = createApp(App);
app.directive("clickOutside", clickOutSide);
app.use(createPinia());
app.use(router);
app.use(dayjs);
app.use(setupCalendar, {});

app.mount("#app");

const defaultWidth = 1512,
  defaultFont = 16,
  minWidth = 768,
  minHeight = 500,
  defaultHeight = 902;
let vW = window.innerWidth,
  vH = window.innerHeight;
const page = document.querySelector("html");

const fontSize = () => {
  return (
    defaultFont *
    Math.min(
      Math.max(minWidth, vW) / defaultWidth,
      Math.max(minHeight, vH) / defaultHeight
    )
  );
};
const calculate = () => {
  vW = window.innerWidth;
  vH = window.innerHeight;
  if (page) {
    page.style.fontSize = fontSize() + "px";
  }
};

window.addEventListener("resize", calculate);
