<template>
  <v-container v-if="book">
    <v-row>
      <v-col cols="12" md="2" align="start">
        <v-btn @click="goBack"> Go Back </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <!-- Book Cover -->
      <v-col cols="12" md="3">
        <v-img
          :src="book.image.replace('/https%3A', 'https://')"
          alt="Book Cover"
          class="mb-4"
          width="auto"
        />
      </v-col>

      <!-- Book Details -->
      <v-col cols="12" md="8">
        <!-- Book Title -->
        <v-row>
          <v-col cols="12" align="start">
            <v-typography v-if="book.name && !isEditing" class="text-h3 font-weight-bold">{{
              book.name
            }}</v-typography>
            <v-text-field
              v-if="isEditing"
              v-model="bookName"
              label="Name"
              outlined
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- Book Description -->
        <v-row class="mt-10">
          <v-col cols="12" align="start">
            <v-typography v-if="book.description && !isEditing" class="text-h5">{{
              book.description
            }}</v-typography>
            <v-text-field
              v-if="isEditing"
              v-model="bookDescription"
              label="Description"
              textarea
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-10 px-4">
          <v-btn
            color="blue"
            @click="onClickEdit"
            :disabled="isRemoving"
            :loading="isUpdating"
          >
            {{ isEditing ? "Update" : "Edit" }}
          </v-btn>
          <v-btn
            class="ml-5"
            color="red"
            @click="onClickRemove"
            :disabled="isRemoving"
            :loading="isRemoving"
          >
            Remove
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>Loading...</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getBookDetail, removeBook, updateBook } from "../../services/bookApi";
import { getErrorMessage } from "../../utils/helper";

export default {
  name: "BookDetail",
  setup() {
    const store = useStore();
    const book = ref(null);
    const route = useRoute();
    const router = useRouter();
    const isRemoving = ref(false);
    const isEditing = ref(route.query?.edit == "true" ? true : false);
    const bookId = route.params.id;
    const bookName = ref(book.value?.name);
    const bookDescription = ref(book.value?.description);
    const isUpdating = ref(false);

    onMounted(async () => {
      try {
        const response = await getBookDetail(bookId);
        book.value = response;
      } catch (err) {
        console.log(err);
      }
    });

    const goBack = () => {
      router.push("/books");
    };

    const onClickRemove = async () => {
      try {
        isRemoving.value = true;
        await removeBook(bookId);
        window.toast.info(`Book ${bookId} is removed successfully!`);
        store.dispatch("fetchBooks");
        router.push("/books");
      } catch (err) {
        console.log(err);
        window.toast.error(getErrorMessage(err.response.data.message));
      }

      isRemoving.value = false;
    };

    const onClickEdit = async () => {
      if (isEditing.value) {
        try {
          const bookData = {
            name: bookName.value,
            description: bookDescription.value,
            image: "https://prodimage.images-bn.com/pimages/9780593717196_p0_v2_s1200x630.jpg"
          }
          await updateBook(bookId, bookData);
          const response = await getBookDetail(bookId);
          book.value = response;
          window.toast.success(`Book ${bookId} updated successfully`);
        } catch (err) {
          window.toast.error('Update Failed');
        }
        isEditing.value = false;
      } else {
        isEditing.value = true;
      }
    }

    watch(book, (newVal) => {
      bookName.value = newVal.name;
      bookDescription.value = newVal.description;
    })

    return {
      book,
      isRemoving,
      isEditing,
      bookName,
      bookDescription,
      isUpdating,
      goBack,
      onClickRemove,
      onClickEdit,
    };
  },
};
</script>

<style>
</style>
