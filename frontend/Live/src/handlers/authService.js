// authService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const storeUID = async (UID) => {
  try {
    await AsyncStorage.setItem('uid', UID);
    console.log('UID stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const storeUserType = async (userType) => {
  try {
    await AsyncStorage.setItem('userType', userType);
    console.log('User type stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      console.log('Token retrieved successfully:', token);
      return token;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
export const retrieveUID = async () => {
  try {
    const token = await AsyncStorage.getItem('uid');
    if (token !== null) {
      console.log('UID retrieved successfully:', token);
      return token;
    } else {
      console.log('No uid found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const retrieveUserType = async () => {
  try {
    const token = await AsyncStorage.getItem('userType');
    if (token !== null) {
      console.log('User type retrieved successfully:', token);
      return token;
    } else {
      console.log('No uid found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('userType');
    console.log()
    console.log('Token cleared successfully');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
