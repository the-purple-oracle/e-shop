import React, { useEffect, useState, useContext } from 'react';

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
import StyledButton from '../../../Shared/StyledComponents/StyledButton';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../../Context/store/AuthGlobal';
var { width, height } = Dimensions.get('window');

const Confirm = (props) => {
  const context = useContext(AuthGlobal);
  const finalOrder = props.route.params;
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res.data);
      })
      .catch((error) => console.log(error));
    setUser(context.stateUser.user.userId);
    return () => {
      setToken();
    };
  }, []);

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    order.user = user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}orders`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order successfully placed',
            text2: '',
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart');
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {finalOrder ? (
          <View>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8, marginLeft: 20 }}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address 2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>State: {finalOrder.order.order.state}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <View style={styles.lineBreak}></View>
            <Text style={styles.title}>Items</Text>
            <View style={styles.lineBreak}></View>
            {finalOrder.order.order.orderItems.map((item, i) => {
              return (
                <>
                  <ListItem key={i} style={styles.listItem}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.product.image
                          ? item.product.image
                          : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                      }}
                    />

                    <View View style={styles.body}>
                      <View style={styles.left}>
                        <Text>{item.product.name}</Text>
                      </View>
                      <View style={styles.right}>
                        <Text>${item.product.price}</Text>
                      </View>
                    </View>
                  </ListItem>
                  <View style={styles.lineBreak}></View>
                </>
              );
            })}
          </View>
        ) : null}

        <View style={{ alignItems: 'center', margin: 20 }}>
          <StyledButton large primary onPress={confirmOrder}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Confirm
            </Text>
          </StyledButton>
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
    width: width,
  },
  body: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
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
    borderTopColor: 'gainsboro',
    width: width,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);
