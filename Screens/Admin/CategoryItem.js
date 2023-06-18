import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../../Shared/StyledComponents/StyledButton';

const Item = (props) => {
  const { item, index } = props;

  return (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <StyledButton danger medium onPress={() => props.delete(item._id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </StyledButton>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});
export default Item;
