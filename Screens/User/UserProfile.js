import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
import StyledButton from '../../Shared/StyledComponents/StyledButton';
import OrderCard from '../../Shared/OrderCard';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }

      if (context.stateUser.isAuthenticated) {
        AsyncStorage.getItem('jwt')
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => setUserProfile(user.data));
          })
          .catch((error) => console.log(error));
      }

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.userId
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated])
  );

  const handleSignOut = () => {
    AsyncStorage.removeItem('jwt');
    logoutUser(context.dispatch);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Phone: {userProfile ? userProfile.phone : ''}</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <StyledButton secondary large onPress={handleSignOut}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Sign Out
            </Text>
          </StyledButton>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              marginTop: 30,
              alignSelf: 'center',
            }}
          >
            My Orders
          </Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <Text>You have no orders</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  subContainer: {
    alignItems: 'center',
  },
});
export default UserProfile;
