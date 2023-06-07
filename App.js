import { AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';

//screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';

import { NavigationContainer } from '@react-navigation/native';

//Navigators
import Main from './Navigators/Main';

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Main />
    </NavigationContainer>
  );
}
