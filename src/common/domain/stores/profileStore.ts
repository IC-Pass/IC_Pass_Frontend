import { ref } from "vue";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  const isLoading = ref<boolean>(false);
  const profile = ref<any>({
    name: "Jimmy Page",
    wallet: "587a6b8ed07707248cce...9b0db46",
    avatar: "",
    createdDate: "21.01.2023",
    plan: {
      id: "1",
      name: "Basic",
      period: "free forever",
    },
  });
  return { profile, isLoading };
});
