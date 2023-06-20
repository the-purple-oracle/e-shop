import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import StyledButton from '../../../Shared/StyledComponents/StyledButton';
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
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      state,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      zip,
    };

    props.navigation.navigate('Payment', { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Shipping Details'}>
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
        <View style={styles.picker}>
          <RNPickerSelect
            placeholder={{ label: 'Select a country', value: null }}
            onValueChange={(value) => setCountry(value)}
            items={countries}
          />
        </View>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <StyledButton large secondary onPress={() => checkOut()}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Text>
          </StyledButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;

  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
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
});

export default connect(mapStateToProps)(Checkout);
