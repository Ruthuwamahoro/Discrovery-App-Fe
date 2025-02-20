import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export interface FilterParams {
    search?: string;
    genre?: string;
    sortBy?: 'title' | 'date' | 'rating';
    sortOrder?: 'asc' | 'desc';
}

export interface BookState {
    books: Book[] | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    filters: FilterParams;
    genres: string[];
}

const initialState: BookState = {
    books: null,
    loading: false,
    error: null,
    success: false,
    filters: {
        search: '',
        genre: '',
        sortBy: 'title',
        sortOrder: 'asc'
    },
    genres: []
};

export const getAllBooksAvailable = createAsyncThunk<Book[], FilterParams>(
    'book/getAllBooks',
    async (filters: FilterParams, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.genre) queryParams.append('genre', filters.genre);
            if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
            if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

            const response = await axios.get<{
                status: number;
                message: string;
                data: { books: Book[] };
            }>(`http://localhost:3000/api/books?${queryParams.toString()}`);
            
            return response.data.data.books;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response.data.message || 'Failed to fetch books');
            }
            return rejectWithValue('An error occurred while fetching books');
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterParams>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooksAvailable.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getAllBooksAvailable.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.books = action.payload;
                if (!state.genres.length && action.payload) {
                    state.genres = Array.from(new Set(action.payload.map(book => book.genre)));
                }
            })
            .addCase(getAllBooksAvailable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    }
});

export const { setFilters, setGenres, resetFilters } = bookSlice.actions;
export default bookSlice.reducer;