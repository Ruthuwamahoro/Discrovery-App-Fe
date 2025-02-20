export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    coverImage: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
  }
  
  export interface FilterOptions {
    search?: string;
    genre?: string;
    sortBy?: 'title' | 'date' | 'rating';
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface User {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
  }