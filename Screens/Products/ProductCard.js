import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import StyledButton from '../../Shared/StyledComponents/StyledButton';

var { width } = Dimensions.get('window');

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={{
            uri: image
              ? image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
      </View>
      <Text style={styles.title}>
        {name.length > 13 ? name.substring(0, 13 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <StyledButton
            medium
            primary
            onPress={() => {
              props.addItemToCart(props),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${name} added to cart`,
                  text2: 'Go to your cart to complete order',
                });
            }}
          >
            <Text style={styles.btnText}>Add</Text>
          </StyledButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Out Of Stock</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.2,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -10,
  },
  card: {
    position: 'relative',
    marginBottom: 85,
    marginTop: 5,
    height: width / 2 - 20 - 90,
    width: width / 2 - 20 - 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
