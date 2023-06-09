import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <View style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    height: 25,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -4,
    right: -15,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default connect(mapStateToProps)(CartIcon);
