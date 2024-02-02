import { API } from "./api";

// Get book list API endpoint
export const getBookList = async () => {
  try {
    const response = await API.get('/books/');

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Remove Book API endpoint
export const removeBook = async (bookId) => {
  try {
    const response = await API.delete(`/book/delete/${bookId}/`);

    return response.data;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

// Get Book Detail API endpoint
export const getBookDetail = async (bookId) => {
  try {
    const response = await API.get(`/books/${bookId}/`)

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Create a new book (use static image url instead of image file, because the backend(I developed using django) doesn't support cloud file uploading)
export const createBook = async (bookData) => {
  try {
    const response = await API.post('/book/create/', bookData);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Update an existing book
export const updateBook = async (id, bookData) => {
  try {
    const response = await API.put(`/book/update/${id}/`, bookData);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}