import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import necessary modules from React Navigation

const ClubEvent = () => {
  const navigation = useNavigation(); // Hook to access navigation object

  // Sample event data
  const event = {
    image: 'https://via.placeholder.com/150',
    dateTime: 'Saturday, December 31, 2023 8:00 PM',
    location: '123 Club Street, City',
    title: 'New Year Party',
    description: 'Join us to celebrate the arrival of the new year!',
  };

  const { image, dateTime, location, title, description } = event;

  const handleRegisterPress = () => {
    // Navigate to the event registration page when the button is pressed
    //navigation.navigate('EventRegistration');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={handleRegisterPress} style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5E1FF', // Faint purple background color
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 205,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  dateTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#9166ED'
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#9166ED', // Button background color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClubEvent;
