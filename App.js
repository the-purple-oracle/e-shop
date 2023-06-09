import { AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
//screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';

import { NavigationContainer } from '@react-navigation/native';

//Navigators
import Main from './Navigators/Main';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
