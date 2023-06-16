import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/core';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../../Components/SearchHeader';
import AdminListItem from './AdminListItem';
import StyledButton from '../../Shared/StyledComponents/StyledButton';

var { width, height } = Dimensions.get('window');

const ListHeader = () => {
  return (
    <View style={[styles.listHeader, { elevation: 1 }]}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Name</Text>
      </View>
      <View style={[styles.headerItem, { width: width / 4 }]}>
        <Text style={{ fontWeight: '600' }}>Category</Text>
      </View>
      <View style={[styles.headerItem, { marginLeft: 0 }]}>
        <Text style={{ fontWeight: '600' }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [search, setSearch] = useState();

  useFocusEffect(
    useCallback(() => {
      //Get token
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProductList(res.data);
          setProductFilter(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));

      return () => {
        setProductList();
        setProductFilter();
        setIsLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == -'') {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log('in error ' + error));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <StyledButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Orders')}
          style={styles.styledBtn}
        >
          <Icon name='shopping-bag' size={18} color='white' />
          <Text style={styles.btnText}>Orders</Text>
        </StyledButton>
        <StyledButton
          secondary
          large
          onPress={() => props.navigation.navigate('ProductForm')}
          style={styles.styledBtn}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.btnText}>Products</Text>
        </StyledButton>
        <StyledButton
          secondary
          large
          onPress={() => props.navigation.navigate('Categories')}
          style={styles.styledBtn}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.btnText}>Category</Text>
        </StyledButton>
      </View>
      <View>
        <SearchHeader onChangeText={searchProduct} />
      </View>
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <AdminListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 4,
    width: width / 6,
  },
  spinner: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  btnText: {
    marginLeft: 4,
    color: 'white',
  },
  styledBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width / 3 - 10,
  },
});
export default Products;
