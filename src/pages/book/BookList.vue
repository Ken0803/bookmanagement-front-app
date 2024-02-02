<template>
  <v-container>
    <h1>Books</h1>
    <div v-if="loading">Loading...</div>

    <v-row v-else class="py-5">
      <v-col v-for="book in books" :key="book.id" cols="12" sm="6" md="4" lg="3" xl="2" >
        <BookCard :bookData="book" class="fill-height" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getBookList } from "../../services/bookApi";
import BookCard from '../../components/Book/BookCard.vue';

export default {
  name: "BookList",
  components: {
    BookCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const books = computed(() => store.state.books);

    onMounted(async () => {
      if (!books.value.length) {
        try {
          loading.value = true;

          const response = await getBookList();
          store.commit("setBooks", response);
        } catch (err) {
          console.log(err);
        }
        loading.value = false;
      }
    });

    const onClickBook = (id) => {
      router.push(`/book/${id}`);
    };

    return {
      books,
      loading,
      onClickBook,
    };
  },
};
</script>

<style scoped>
</style>
