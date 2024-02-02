<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card :loading="isSigning">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title class="headline">Register</v-card-title>
          <v-container>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                class="mb-5"
                label="Email"
                type="email"
                :rules="validateEmail(email)"
                required
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" :disabled="isSigning"> Sign Up </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { userSignup } from "../services/userApi";
import { validateEmail, getErrorMessage } from "../utils/helper";
import { setAuthToken } from "../services/api";

export default {
  name: "SignUp",
  setup() {
    const email = ref("");
    const password = ref("");
    const isSigning = ref(false);

    const router = useRouter();

    const onSubmit = async () => {
      try {
        isSigning.value = true;
        const response = await userSignup({
          email: email.value,
          password: password.value,
        });

        localStorage.setItem("token", response.token.access);
        setAuthToken(response.token.access);
        window.toast.success("Sign up successfully!");
        router.push("/books");
      } catch (e) {
        console.log(e);
        window.toast.error(getErrorMessage(e.response.data.message));
      }
      isSigning.value = false;
    };

    return {
      email,
      password,
      isSigning,
      validateEmail,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>
