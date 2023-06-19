import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from './StyledComponents/StyledButton';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const codes = [
  { name: 'pending', code: '3' },
  { name: 'shipped', code: '2' },
  { name: 'delivered', code: '1' },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText('Pending');
      setCardColor('#E74C3C');
    } else if (props.status == '2') {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText('Shipped');
      setCardColor('#F1C40F');
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText('Delivered');
      setCardColor('#2ECC71');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
      setToken();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Status Updated',
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
          text2: 'Try again later',
        });
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>Date Ordered: {props.dateOrdered.split('T')[0]}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text>Price: </Text>
        <Text style={styles.price}>$ {props.totalPrice}</Text>
      </View>
      {props.editMode && (
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <View style={styles.picker}>
            <RNPickerSelect
              placeholder={{ label: 'Change Status', value: null }}
              onValueChange={(value) => setStatusChange(value)}
              items={[
                { label: 'Pending', value: '3' },
                { label: 'Shipped', value: '2' },
                { label: 'Delivered', value: '1' },
              ]}
            />
          </View>
          <View style={{ right: 0, justifyContent: 'center' }}>
            <StyledButton secondary medium onPress={() => updateOrder()}>
              <Text style={{ alignSelf: 'center', color: 'white' }}>
                Update
              </Text>
            </StyledButton>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    width: '60%',
    margin: 10,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#62b1f6',
  },
});

export default OrderCard;
