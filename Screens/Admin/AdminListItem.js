import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import StyledButton from '../../Shared/StyledComponents/StyledButton';

var { width } = Dimensions.get('window');

const AdminListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <Icon name='close' size={20} />
            </TouchableOpacity>

            <StyledButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate('ProductForm', { item: props }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.btnText}>Edit</Text>
            </StyledButton>
            <StyledButton
              medium
              danger
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            >
              <Text style={styles.btnText}>Delete</Text>
            </StyledButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Product Detail', { item: props });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          { backgroundColor: props.index % 2 === 0 ? 'white' : 'gainsboro' },
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: props.image
              ? props.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
        <Text style={styles.item}>{props.brand}</Text>

        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {props.name}
        </Text>

        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {props.category.name}
        </Text>

        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    width: width,
    flexDirection: 'row',
  },
  image: {
    width: width / 6,
    height: width / 6,
    borderRadius: 50,
  },
  item: {
    flexWrap: 'wrap',
    margin: 8,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminListItem;
