import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
var { width } = Dimensions.get('window');
const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  return (
    <ListItem style={styles.listItem}>
      <Image
        style={styles.image}
        source={{
          uri: data.image
            ? data.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />

      <View style={styles.body}>
        <Text>{data.name}</Text>
      </View>

      <Text>${data.price}</Text>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  listItem: {
    width: width,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroll: {
    height: '90%',
    position: 'absolute',
  },
  image: {
    paddingRight: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 20,
  },
});
export default CartItem;
