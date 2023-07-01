import dayjs from "@/infrastructure/utils/dayjs";

export default {
  install: (app: any) => {
    app.provide("dayjs", dayjs);
  },
};
