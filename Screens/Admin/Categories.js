import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import StyledButton from '../../Shared/StyledComponents/StyledButton';
import Item from './CategoryItem';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var { width } = Dimensions.get('window');

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert('Error loading categories'));

    return () => {
      setCategories([]);
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => {
        setCategories([...categories, res.data]);
      })
      .catch((error) => alert('Error adding category'));

    setCategoryName('');
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item._id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert('Error deleting category'));
  };

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} delete={deleteCategory} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ paddingHorizontal: 5, fontSize: 13 }}>
            Add Category
          </Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <StyledButton medium primary onPress={() => addCategory()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 60,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Categories;
