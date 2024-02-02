<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card :loading="isLoading" class="py-4">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title class="headline">Login</v-card-title>
          <v-container>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                class="mb-5"
                label="Email"
                type="email"
                :rules="validateEmail(email) === true ? [true] : validateEmail(email)"
                required
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                :disabled="isLoading || validateEmail(email) != true || !password.length"
              >
                Log In
              </v-btn>
            </v-form>
          </v-container>
          <div>
            Don't have an account?
            <router-link to="/signup">Create account here</router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setAuthToken } from "../services/api";
import { userLogin } from "../services/userApi";
import { validateEmail, getErrorMessage } from "../utils/helper";

export default {
  name: "LogIn",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const isLoading = ref(false);

    const onSubmit = async () => {
      try {
        isLoading.value = true;
        const response = await userLogin({
          email: email.value,
          password: password.value,
        });

        localStorage.setItem("token", response.token.access);
        setAuthToken(response.token.access);
        window.toast.success("Login Successfully!");
        router.push("/books");
      } catch (e) {
        console.log(e);
        window.toast.error(getErrorMessage(e.response.data.message));
      }
      isLoading.value = false;
    };

    return {
      email,
      password,
      isLoading,
      validateEmail,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>
