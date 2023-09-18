import { defineStore } from "pinia";
import { ref } from "vue";
import type { Password } from "@/home/domain/Password";
import {useHistoryStore} from "@/history/domain/historyStore";
import facebook from "@/assets/images/socialMedia/Facebook.jpg";
import type {PassListItem} from "@/common/domain/PassListItem";
import {useHomeStore} from "@/home/domain/homeStore";

export const usePasswordStore = defineStore("passwordStore", () => {
  const historyStore = useHistoryStore();

  const homeStore = useHomeStore();

  const password = ref<Password | PassListItem | null>({
    template: "",
    email: "",
    password: "",
    link: "",
    tag: {
      label: "Select Tag",
      value: null,
    },
    notes: "",
  });

  function setPassword(payload: Password) {
    password.value = payload;
  }
  function resetStore() {
    password.value = {
      template: "",
      email: "",
      password: "",
      link: "",
      tag: {
        label: "Select Tag",
        value: null,
      },
      notes: "",
    };
  }
  function createPassword() {
    historyStore.historyList.push(JSON.parse(JSON.stringify(password.value)) as PassListItem);
    console.log(password.value);
    resetStore();
    homeStore.activeCard = "";
  }
  return {
    password,
    setPassword,
    createPassword,
    resetStore,
  };
});
