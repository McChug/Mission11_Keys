import { Book } from "../types/Book";

interface FetchBookResponse {
  bookList: Book[];
  totalNumberBooks: number;
}

const api_url = "https:/localhost:5000/api/Book";

export const fetchBooks = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  selectedCategories: string[]
): Promise<FetchBookResponse> => {
  try {
    const categoryParameters = selectedCategories
      .map((c) => `categories=${encodeURIComponent(c)}`)
      .join("&");

    const url = `${api_url}/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}${
      selectedCategories.length ? `&${categoryParameters}` : ""
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books", error);
    throw error;
  }
};
