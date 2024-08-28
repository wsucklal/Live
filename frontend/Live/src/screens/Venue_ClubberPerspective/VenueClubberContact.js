import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';

const VenueClubberContact = ({ info }) => {
  let phoneNumber = (info.phoneNumber == undefined) ? "Not available" : info.phoneNumber
  let website = (info.website == undefined) ? "Not available" : info.website
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.largeTitle}>Email</Text>
        <Text style={styles.contactText}>{info.email}</Text>
        <Text style={styles.largeTitle}>Phone</Text>
        <Text style={styles.contactText}>{phoneNumber}</Text>
        <Text style={styles.largeTitle}>Website</Text>
        <Text style={styles.contactText}>{website}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Background color
    padding: 20,
    paddingBottom: 500,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9166ED',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0B0111',
  },
});

export default VenueClubberContact;
