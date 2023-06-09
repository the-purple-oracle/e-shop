import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

const countries = require('../../../assets/countries.json');

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    setSelectedCountry(countries[229]);
    return () => {
      setOrderItems();
      setSelectedCountry();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'City'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'State'}
          name={'State'}
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />

        <Picker
          mode={'dialog'}
          selectedValue={selectedCountry}
          onValueChange={(itemValue, itemIndex) => {
            setCountry(itemValue);
            setSelectedCountry(itemValue);
          }}
        >
          {countries.map((c, i) => (
            <Picker.Item key={i} label={c.name} value={c.code} />
          ))}
        </Picker>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  picker: {},
});

export default Checkout;
