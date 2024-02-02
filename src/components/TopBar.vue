<template>
  <v-container v-if="path != '/' && path != '/login' && path != '/signup'" height="100">
    <v-row justify="end" class="py-5">
      <v-dialog v-model="createModal" width="700">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="green" text="Create Book">Create Book</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Create Book">
            <v-container>
              <v-row align="center" class="px-5 pt-6">
                <v-col cols="12" md="2">
                  <v-typography>Name: </v-typography>
                </v-col>
                <v-text-field v-model="bookName" type="text" required hide-details>
                </v-text-field>
              </v-row>
              <v-row align="center" class="px-5 pt-6">
                <v-col cols="12" md="2">
                  <v-typography>Description: </v-typography>
                </v-col>
                <v-text-field v-model="bookDescription" type="text" required hide-details>
                </v-text-field>
              </v-row>
              <v-row align="center" class="px-5 pt-6">
                <v-col cols="12" md="2">
                  <v-typography>Image: </v-typography>
                </v-col>
                <v-file-input
                  clearable
                  accept="image/png, image/jpeg, image/bmp"
                  variant="solo"
                  label="image"
                  prepend-icon=""
                ></v-file-input>
              </v-row>
            </v-container>

            <v-card-actions class="pt-5">
              <v-container>
                <v-row justify="end" class="px-5">
                  <v-btn
                    color="green"
                    text="Create Book"
                    @click="onClickCreateBook"
                    :disabled="!bookName.length || !bookDescription.length"
                    variant="outlined"
                    :loading="isCreating"
                    >Create</v-btn
                  >
                  <v-btn
                    color="red"
                    text="Close Dialog"
                    @click="(isActive.value = false), (createModal = false)"
                    variant="outlined"
                    >Cancel</v-btn
                  >
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-btn color="red" @click="logOut" class="ml-5"> Log out </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getErrorMessage } from "../utils/helper";
import { createBook } from "../services/bookApi.js";

export default {
  name: "TopBar",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const path = computed(() => route.fullPath);
    const createModal = ref(false);
    const isCreating = ref(false);
    const bookName = ref("");
    const bookDescription = ref("");

    const logOut = () => {
      localStorage.removeItem("token");
      window.toast.success("Log out successfully");
      router.push("/login");
    };

    const onClickCreateBook = async () => {
      try {
        isCreating.value = true;
        const bookData = {
          name: bookName.value,
          description: bookDescription.value,
          image:
            "https://prodimage.images-bn.com/pimages/9780593717196_p0_v2_s1200x630.jpg", // use static url for image for now, backend doesn't support image file upload
        };
        await createBook(bookData);
        window.toast.success(`Book ${bookName.value} created successfully`);
        store.dispatch("fetchBooks");
        createModal.value = false;
      } catch (err) {
        window.toast.error(getErrorMessage(err));
      }

      isCreating.value = false;
    };

    return {
      path,
      createModal,
      bookName,
      bookDescription,
      isCreating,
      logOut,
      onClickCreateBook,
    };
  },
};
</script>
