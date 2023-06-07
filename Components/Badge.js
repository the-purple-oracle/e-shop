import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = (props) => {
  const { name, active } = props;
  return (
    <View
      style={[
        styles.center,
        styles.container,
        active ? styles.active : styles.inactive,
      ]}
    >
      <Text style={{ color: 'white' }}>{name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inactive: {
    backgroundColor: '#a0e1eb',
  },
});

export default Badge;
