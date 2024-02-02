<template>
  <v-card class="p-0 cursor-pointer fill-height" elevation="5" @click="onClickBook(book.id)">
    <v-img cover :src="book.image" alt="book image" height="200"></v-img>
    <v-card-item>
      <v-card-title>{{ book.name }}</v-card-title>
    </v-card-item>
    <v-card-text>{{ book.description }}</v-card-text>
    <v-container>
      <v-row class="pb-2" justify="end" align="end">
        <v-col>
          <v-btn type="button" color="blue" @click="onClickUpdate">Update</v-btn>
        </v-col>
        <v-col>
          <v-btn type="button" color="red" @click="onClickRemove" :loading="isRemoving">Remove</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getErrorMessage } from '../../utils/helper';
import { removeBook } from '@/services/bookApi';

export default {
  name: "BookCard",
  props: [
    'bookData'
  ],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const book = ref(props.bookData);
    const isRemoving = ref(false);

    const onClickRemove = async (e) => {
      e.stopPropagation();
      try {
        isRemoving.value = true;
        await removeBook(props.bookData.id);
        window.toast.info(`Book ${props.bookData.name} removed successfully`);
        store.dispatch('fetchBooks');
      } catch (err) {
        window.toast.error(getErrorMessage(err));
      }
      isRemoving.value = false;
    }

    const onClickBook = () => {
      router.push(`/book/${props.bookData.id}`);
    }

    const onClickUpdate = (e) => {
      e.stopPropagation();
      router.push(`/book/${props.bookData.id}?edit=true`);
    }

    return {
      book,
      isRemoving,
      onClickRemove,
      onClickUpdate,
      onClickBook
    }
  }
}
</script>