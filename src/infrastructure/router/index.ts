import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/notFound/views/NotFoundView.vue";
import Onboarding from "@/home/views/Onboarding.vue";
import Home from "@/home/views/Home.vue";
import HistoryView from "@/history/views/HistoryView.vue";
import TeamView from "@/team/views/Team.vue";
import MembersView from "@/members/views/members.vue";
import SettingsView from "@/settings/views/Settings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/onboarding",
      name: "Onboarding",
      component: Onboarding,
    },
    {
      path: "/history",
      name: "History",
      component: HistoryView,
    },
    {
      path: "/members",
      name: "Members",
      component: MembersView,
    },
    {
      path: "/team",
      name: "Team",
      component: TeamView,
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    return next({ name: "Home" });
  }
  next();
});

export default router;
