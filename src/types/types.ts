export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
}

export interface Catalogue {
  genres: Array<Genre>;
  videos: Array<Video>;
}

export interface CardType {
  image: string;
  artist: string;
  title: string;
  year: number;
}

export interface PaginationType {
  total?: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}
