import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Badge from '../../Components/Badge';

const CategoryFilter = (props) => {
  const { active } = props;
  return (
    <ScrollView
      bounce={true}
      horizontal={true}
      style={{ backgroundColor: '#f2f2f2', flexDirection: 'row' }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1);
          }}
        >
          <Badge name={'all'} active={props.active == -1 ? true : false} />
        </TouchableOpacity>

        {props.categories.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              name={item.name}
              active={
                props.active == props.categories.indexOf(item) ? true : false
              }
            />
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryFilter;
