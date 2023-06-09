import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';

var { width } = Dimensions.get('window');

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        {/* Todo: description, RichDescription, availability */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <View style={styles.right}>
          <Button title='Add To Cart' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
    left: 0,
  },
  right: {
    alignSelf: 'center',
    right: 0,
  },
});

export default SingleProduct;
