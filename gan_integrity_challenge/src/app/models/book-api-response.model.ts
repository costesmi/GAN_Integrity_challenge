export interface BookApiResponse {
  items: {
    id: string;
    volumeInfo: {
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
    };
  }[];
}
