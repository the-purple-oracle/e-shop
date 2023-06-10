import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const methods = [{ name: 'Card Payment', value: 1 }];

const paymentCards = [
  { label: 'Apple Wallet', value: 'Apple Wallet' },
  { label: 'Visa', value: 'Visa' },
  { label: 'MasterCard', value: 'MasterCard' },
  { label: 'Other', value: 'Other' },
];
const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={styles.paymentContainer}>
      <Text>Choose your payment type</Text>
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={{ label: 'Select a card type', value: null }}
          onValueChange={(value) => setCard(value)}
          items={paymentCards}
        />
      </View>
      <View style={{ marginTop: 60, alignSelf: 'center' }}>
        <Button
          title={'Confirm'}
          onPress={() => {
            props.navigation.navigate('Confirm', { order });
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default Payment;
