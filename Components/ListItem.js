import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';
var { width } = Dimensions.get('window');
const ListItem = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={styles.container}>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: item.image
              ? item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: width,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default ListItem;
