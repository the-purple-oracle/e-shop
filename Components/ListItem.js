import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
var { width } = Dimensions.get('window');
const ListItem = (props) => {
  const { item } = props;

  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: item.image
            ? item.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
    </View>
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
