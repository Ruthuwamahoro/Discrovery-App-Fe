// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { AuthState, LoginCredentials, SignupData, ApiResponse } from '../../types/auth';
// import { api } from '../../services/auth';

// const initialState: AuthState = {
//     user: null,
//     token: localStorage.getItem('token'),
//     loading: false,
//     error: null,
//     isAuthenticated: !!localStorage.getItem('token'),
// };

// export const login = createAsyncThunk<ApiResponse, LoginCredentials>(
//     'auth/login',
//     async (credentials, { rejectWithValue }) => {
//         try {
//             const response = await api.post<ApiResponse>('/login', credentials);
//             const { data } = response;
            
//             if (data.status === 200 && data.data) {
//                 localStorage.setItem('token', data.data);
//                 return data;
//             }
            
//             return rejectWithValue(data.message);
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || 'Login failed'
//             );
//         }
//     }
// );

// export const signup = createAsyncThunk<ApiResponse, SignupData>(
//     'auth/signup',
//     async (signupData, { rejectWithValue }) => {
//         try {
//             const response = await api.post<ApiResponse>('/register', signupData);
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || 'Signup failed'
//             );
//         }
//     }
// );

// // export const fetchCurrentUser = createAsyncThunk(
// //     'auth/fetchCurrentUser',
// //     async (_, { rejectWithValue }) => {
// //         try {
// //             const response = await api.get<ApiResponse>('/users/');
// //             return response.data;
// //         } catch (error: any) {
// //             return rejectWithValue(
// //                 error.response?.data?.message || 'Failed to fetch user'
// //             );
// //         }
// //     }
// // );

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             localStorage.removeItem('token');
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;
//             state.error = null;
//         },
//         clearError: (state) => {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         // Login
//         builder
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.token = action.payload.data;
//                 state.isAuthenticated = true;
//                 state.error = null;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.isAuthenticated = false;
//             });

//         // Signup
//         builder
//             .addCase(signup.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(signup.fulfilled, (state) => {
//                 state.loading = false;
//                 state.error = null;
//             })
//             .addCase(signup.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });

//         // Fetch Current User
//         // builder
//         //     .addCase(fetchCurrentUser.pending, (state) => {
//         //         state.loading = true;
//         //         state.error = null;
//         //     })
//         //     .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         //         state.loading = false;
//         //         state.user = action.payload.data;
//         //         state.error = null;
//         //     })
//         //     .addCase(fetchCurrentUser.rejected, (state, action) => {
//         //         state.loading = false;
//         //         state.error = action.payload as string;
//         //         state.isAuthenticated = false;
//         //         state.user = null;
//         //         state.token = null;
//         //     });
//     },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;