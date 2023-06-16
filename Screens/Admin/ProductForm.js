import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import StyledButton from '../../Shared/StyledComponents/StyledButton';
import Error from '../../Shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  const [b64, setB64] = useState('');

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

    //image picker
    async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry we must have access to choose image');
        }
      }
    };
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  const getCategories = () => {
    const newList = categories.map((c) => {
      return { label: c.name, value: c._id, key: c._id };
    });
    return newList;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      setB64(result.assets[0].base64);
    }
  };

  //used for the image source for base65 image
  var baseImage = `data:image/png;base64,${b64}`;

  const addProduct = () => {
    if (
      name === '' ||
      brand === '' ||
      price === '' ||
      description === '' ||
      category == '' ||
      category == null ||
      countInStock === ''
    ) {
      setError('Please complete filling out the form');
      setTimeout(() => {
        setError(null);
      }, 1000);
    }

    let formData = new FormData();

    formData.append('category', category);
    formData.append('image', baseImage);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', Number(price));
    formData.append('description', description);
    formData.append('countInStock', Number(countInStock));
    formData.append('richDescription', richDescription);
    formData.append('rating', Number(rating));
    formData.append('numReviews', Number(numReviews));
    formData.append('isFeatured', isFeatured);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}products/base`, formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'New Product Added',
            text2: '',
          });

          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <FormContainer title='Add Product'>
      <View style={styles.imageContainer}>
        {b64 && <Image style={styles.image} source={{ uri: baseImage }} />}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Icon style={{ color: 'white' }} name='camera' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text>Brand</Text>
      </View>
      <Input
        placeholder='Brand'
        name='brand'
        id='brand'
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <Text>Name</Text>
      </View>
      <Input
        placeholder='Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text>Price</Text>
      </View>
      <Input
        placeholder='Price'
        name='price'
        id='price'
        value={price}
        keyboardType={'numeric'}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text>Count In Stock</Text>
      </View>
      <Input
        placeholder='Stock'
        name='stock'
        id='stock'
        value={countInStock}
        keyboardType={'numeric'}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text>Description</Text>
      </View>
      <Input
        placeholder='Description'
        name='description'
        id='description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text>Category</Text>
      </View>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{ label: 'Select Category', value: null }}
          onValueChange={(value) => setCategory(value)}
          items={getCategories()}
          style={{ placeholder: { paddingLeft: 10 } }}
        />
      </View>
      {error ? <Error message={error} /> : null}
      <View style={styles.btnContainer}>
        <StyledButton
          large
          primary
          style={styles.styledBtn}
          onPress={() => addProduct()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </StyledButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  picker: {
    width: '80%',
    margin: 10,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'orange',
  },
  styledBtn: {
    alignItems: 'center',
  },
  btnContainer: {
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
