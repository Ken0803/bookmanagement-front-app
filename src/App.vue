<template>
  <TopBar />
  <v-container>
    <router-view />
  </v-container>
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { setAuthToken } from "./services/api";
import TopBar from "./components/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },
  setup() {
    const router = useRouter();

    // check if the user signed in before
    onBeforeMount(() => {
      let token = localStorage.getItem("token");
      if (!token) router.push("/login");
      else {
        setAuthToken(token);
        router.push("/books");
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
