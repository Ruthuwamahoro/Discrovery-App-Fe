// import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../redux/hooks/useAuth';

// interface AuthWrapperProps {
//   children: React.ReactNode;
// }

// export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
// //   const { user, loading } = useAuth();
// //   const router = useNavigate();

//   if (loading) {
//       return (
//           <div className="min-h-screen flex items-center justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//           </div>
//       );
//   }

//   if (!user) {
//     //   router('/login');
//       return null;
//   }

//   return <>{children}</>;
// };