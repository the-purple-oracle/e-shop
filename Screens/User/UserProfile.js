import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate('Login');
    }
    AsyncStorage.getItem('jwt')
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  const handleSignOut = () => {
    logoutUser(context.dispatch);
    props.navigation.navigate('Login');
  };

  return (
    <View>
      <ScrollView>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button title={'Sign Out'} onPress={handleSignOut} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
