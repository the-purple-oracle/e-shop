import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../../Redux/Actions/cartActions';
import { ListItem } from 'react-native-elements';
var { width, height } = Dimensions.get('window');

const Confirm = (props) => {
  const confirm = props.route.params;

  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate('Cart');
    }, 500);
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {confirm ? (
          <View>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8, marginLeft: 20 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>State: {confirm.order.order.state}</Text>
              <Text>Zip Code: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <View style={styles.lineBreak}></View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((item, i) => {
              return (
                <ListItem key={i} style={styles.listItem}>
                  <View
                    style={{
                      width: width / 1.2,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.product.image
                          ? item.product.image
                          : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                      }}
                    />

                    <View style={styles.body}>
                      <Text>{item.product.name}</Text>
                    </View>

                    <Text>${item.product.price}</Text>
                  </View>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={styles.lineBreak}></View>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button title={'Place Order'} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: width,
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    paddingRight: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 20,
  },
  lineBreak: {
    height: 2,
    borderTopWidth: 2,
    borderTopColor: 'black',
    width: width,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);
