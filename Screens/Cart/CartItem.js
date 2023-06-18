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
        <View style={styles.left}>
          <Text>{data.name}</Text>
        </View>
        <View style={styles.right}>
          <Text>${data.price}</Text>
        </View>
      </View>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  listItem: {
    width: width,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    position: 'relative',
  },
  body: {
    flex: 1,
    marginLeft: 40,
    justifyContent: 'space-between',
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
    left: 20,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
});
export default CartItem;
