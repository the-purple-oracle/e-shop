import { AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
//Redux
// import { AppProvider } from './Context/appContext';
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context api
import Auth from './Context/store/Auth';

//screens
import Header from './Shared/Header';

import { NavigationContainer } from '@react-navigation/native';

//Navigators
import Main from './Navigators/Main';

// export default function App() {
//   return (
//     <AppProvider>
//       <Provider store={store}>
//         <NavigationContainer>
//           <Header />
//           <Main />
//           <Toast />
//         </NavigationContainer>
//       </Provider>
//     </AppProvider>
//   );
// }

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
