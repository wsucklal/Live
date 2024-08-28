import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons for stars

const VenueClubberDetails = ({ info }) => {
    const renderStars = (rating) => {
        console.log(rating)
        const stars = [];
        const fullStars = Math.floor(rating);
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <FontAwesome name="star" size={20} color="#FFD700" key={i} />
          );
        }
    
        if (rating - fullStars > 0) {
          stars.push(
            <FontAwesome name="star-half-full" size={20} color="#FFD700" key={fullStars} />
          );
        }
    
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
          stars.push(
            <FontAwesome name="star-o" size={20} color="#FFD700" key={`empty-${i}`} />
          );
        }
    
        return stars;
      };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.largeTitle}>Average Rating           {renderStars(info.avgRating)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.largeTitle}>Description</Text>
        <Text style={styles.description}>{info.description}</Text>
        <Text style={styles.largeTitle}>Location</Text>
        <Text style={styles.address}>{info.addressLine1}</Text>
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
  header: {
    marginBottom: 20,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9166ED',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 25,
    color: '#0B0111', // Primary color
  },
  address: {
    fontSize: 20,
    marginBottom: 10,
    color: '#0B0111'
  },
});

export default VenueClubberDetails;
