import { getBookList } from "@/services/bookApi";
import { createStore } from "vuex";

const store = createStore({
  namespaced: true,
  state: {
    books: []
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    }
  },
  actions: { 
    async fetchBooks({ commit }) {
      const response = await getBookList();
      commit('setBooks', response);
    }
  },
  getters: {
    getBooks(state) {
      return state.books;
    }
  }
});

export default store;