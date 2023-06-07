import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var { width } = Dimensions.get('window');

const SearchHeader = (props) => {
  const { onFocus, onChangeText, focus, onBlur } = props;
  return (
    <View style={styles.container}>
      <Icon style={styles.searchIcon} name='search' size={20} color='#000' />
      <TextInput
        style={styles.input}
        placeholder='Search'
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
      {focus ? (
        <Icon
          style={styles.closeIcon}
          onPress={onBlur}
          name={'close'}
          size={20}
          color='#000'
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    width: width,
    height: width / 8,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'black',
    textAlign: 'center',
    flex: 1,
  },
  searchIcon: {
    padding: 10,
    elevation: 10,
    position: 'absolute',
  },
  closeIcon: {
    padding: 10,
    elevation: 10,
    right: 0,
    position: 'absolute',
  },
});

export default SearchHeader;
