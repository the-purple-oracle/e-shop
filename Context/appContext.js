// import React, { useReducer, useContext } from 'react';
// import reducer from './reducer';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import baseURL from '../assets/common/baseUrl';
// import {
//   SETUP_USER_BEGIN,
//   SETUP_USER_SUCCESS,
//   SETUP_USER_ERROR,
//   LOGOUT_USER,
// } from './actions';

// const token = AsyncStorage.getItem('token');
// const user = AsyncStorage.getItem('user');

// const initialState = {
//   isLoading: false,

//   //   user: user ? JSON.parse(user) : null,
//   //   token: token,
//   user: null,
//   token: null,
// };

// const AppContext = React.createContext();

// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const authFetch = axios.create({ baseURL: baseURL });

//   //request
//   authFetch.interceptors.request.use(
//     (config) => {
//       config.headers['Authorization'] = `Bearer ${state.token}`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   //response
//   authFetch.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response.status === 401) {
//         logoutUser();
//       }
//       return Promise.reject(error);
//     }
//   );

//   const addUserToLocalStorage = ({ user, token }) => {
//     console.log('adding user to storage: ' + user);
//     AsyncStorage.setItem('user', JSON.stringify(user));
//     AsyncStorage.setItem('token', token);
//   };

//   const removeUserFromLocalStorage = () => {
//     console.log('removing user to storage: ');
//     AsyncStorage.removeItem('token');
//     AsyncStorage.removeItem('user');
//   };

//   const setupUser = async ({ currentUser, endPoint }) => {
//     dispatch({ type: SETUP_USER_BEGIN });
//     try {
//       console.log('currentUser is: ' + currentUser);
//       const { data } = await axios.post(`${baseURL}${endPoint}`, currentUser);
//       console.log('data is: ' + data);
//       const { user, token } = data;
//       dispatch({
//         type: SETUP_USER_SUCCESS,
//         payload: {
//           user,
//           token,
//         },
//       });
//       addUserToLocalStorage({ user, token });
//     } catch (error) {
//       dispatch({
//         type: SETUP_USER_ERROR,
//         payload: { msg: error.response.data.msg },
//       });
//     }
//   };
//   const logoutUser = () => {
//     dispatch({ type: LOGOUT_USER });
//     removeUserFromLocalStorage();
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         ...state,
//         // registerUser,
//         // loginUser,
//         setupUser,
//         logoutUser,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
// const useAppContext = () => {
//   return useContext(AppContext);
// };

// export { AppProvider, initialState, useAppContext };
