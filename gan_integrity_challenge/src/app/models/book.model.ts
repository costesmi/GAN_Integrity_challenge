export interface Book {
  id: string;
  title: string;
  description: string;
  authors: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
}
