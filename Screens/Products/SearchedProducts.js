import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import ListItem from '../../Components/ListItem';

var { width } = Dimensions.get('window');

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <View style={[styles.container]}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item, i) => <ListItem key={i} item={item} />)
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProducts;
