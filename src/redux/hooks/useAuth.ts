// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/hook';
// import { 
//     login, 
//     signup, 
//     logout, 
//     fetchCurrentUser,
//     clearError 
// } from '../slices/authSlice';
// import { LoginCredentials, SignupData } from '../../types/auth';
// // import { LoginCredentials, SignupData } from '../types/auth';

// export const useAuth = () => {
//     const dispatch = useAppDispatch();
//     const { user, loading, error, isAuthenticated } = useAppSelector(
//         (state) => state.auth
//     );

//     useEffect(() => {
//         if (isAuthenticated && !user) {
//             dispatch(fetchCurrentUser());
//         }
//     }, [isAuthenticated, user, dispatch]);

//     const handleLogin = async (credentials: LoginCredentials) => {
//         try {
//             await dispatch(login(credentials)).unwrap();
//             dispatch(fetchCurrentUser());
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const handleSignup = async (signupData: SignupData) => {
//         try {
//             await dispatch(signup(signupData)).unwrap();
//             return true;
//         } catch (error) {
//             console.error('Signup failed:', error);
//             return false;
//         }
//     };

//     const handleLogout = () => {
//         dispatch(logout());
//     };

//     const handleClearError = () => {
//         dispatch(clearError());
//     };

//     return {
//         user,
//         loading,
//         error,
//         isAuthenticated,
//         login: handleLogin,
//         signup: handleSignup,
//         logout: handleLogout,
//         clearError: handleClearError,
//     };
// };