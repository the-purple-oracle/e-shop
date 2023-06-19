import React, { useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledButton from '../../Shared/StyledComponents/StyledButton';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import AuthGlobal from '../../Context/store/AuthGlobal';
var { width, height } = Dimensions.get('window');

const Cart = (props) => {
  const context = useContext(AuthGlobal);
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <View>
      {props.cartItems.length ? (
        <View style={styles.cartContainer}>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name='trash' color='white' size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.price}>${total}</Text>
            </View>
            <View style={styles.right}>
              <StyledButton medium danger onPress={() => props.clearCart()}>
                <Text style={styles.btnText}>Clear</Text>
              </StyledButton>
            </View>
            <View>
              {/* keep if want to make users login to make purchase */}
              {context.stateUser.isAuthenticated ? (
                <StyledButton
                  large
                  primary
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                  <Text style={styles.btnText}>Checkout</Text>
                </StyledButton>
              ) : (
                <StyledButton
                  medium
                  secondary
                  onPress={() => props.navigation.navigate('Login')}
                >
                  <Text style={styles.btnText}>Login</Text>
                </StyledButton>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Text>Cart is empty</Text>
          <Text>Add items to your cart to get started</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

styles = StyleSheet.create({
  cartContainer: {
    width: width,
    height: '100%',
    position: 'relative',
    flexGrow: 1,
  },
  emptyCart: {
    height: height,
    marginTop: height / 4,
    alignItems: 'center',
  },
  bottomContainer: {
    width: width,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
