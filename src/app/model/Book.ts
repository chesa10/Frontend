export interface IBook {
  id?: number;
  isbn: string;
  bookTitle: string;
  totalPages: number;
  description: string;
  authorId?: number;
  authorName?: string;
  authorSurName?: string;
}
