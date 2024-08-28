import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import VenueReview from './Reviews/VenueReview';
import VenueClubberDetails from './VenueClubberDetails';
import VenueClubberContact from './VenueClubberContact'
import VenueClubberEvents from './Events/VenueClubberEvents';

const VenueClubberPerspective = ({ route, navigation }) => {
  const [showEvents, setShowEvents] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('details');
  const [venueInfo, setVenueInfo] = useState([]);
  const [pic, setPic] = useState([]);

  useEffect(() => {
    const fetchVenueInfo = async () => {
      getVenueData();
    };

    fetchVenueInfo();
    navigation.setOptions({ title: venueInfo.venueName });
  }, []);

  const getVenueData = async () => {
    try {
      const response = await fetch(`${apiUrl}/venue/${route.params.venueId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData = await response.json();
        setVenueInfo(venueData);
        if (venueData != ''){
          setPic(venueData.url)

        }
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const toggleEvents = () => {
    setShowEvents(!showEvents);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'details':
        return <VenueClubberDetails info={venueInfo}/>
      case 'contact':
        return <VenueClubberContact info={venueInfo}/>
      case 'events':
        return <VenueClubberEvents id={route.params.venueId}/>
      case 'reviews':
        return <VenueReview id={route.params.venueId} />;
      default:
        return null;
    }
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: venueInfo.url }} style={styles.image} />
      <View style={styles.headerContent}>      
        <Text style={styles.venueName}>{venueInfo.venueName}</Text>
      </View>
      <View style={styles.componentButtons}>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'details' && styles.selectedComponent]}
          onPress={() => {handleComponentClick('details'); getVenueData();}}
        >
          <Text style={styles.componentButtonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'contact' && styles.selectedComponent]}
          onPress={() => handleComponentClick('contact')}
        >
          <Text style={styles.componentButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'events' && styles.selectedComponent]}
          onPress={() => {handleComponentClick('events');getVenueData();}}
        >
          <Text style={styles.componentButtonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'reviews' && styles.selectedComponent]}
          onPress={() => {handleComponentClick('reviews');getVenueData();}}
        >
          <Text style={styles.componentButtonText}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {renderComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // Background color
  },
  headerContent:{
    padding:20
  },
  venueName: {
    fontSize: 30,
    color: '#000000',
  },
  image: {
    width: '100%', // Updated to cover the whole page
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  showEventsButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  showEventsButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5E1FF', // Faint purple background color
    borderRadius: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  componentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  componentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  componentButtonText: {
    color: '#9166ED',
    fontSize: 18,
    fontWeight: 'bold'
  },
  selectedComponent: {
    borderBottomColor: '#9166ED',
    borderBottomWidth: 2,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  eventSpotsLeft: {
    fontSize: 14,
    color: '#4709CD',
    marginBottom: 5,
  },
});

export default VenueClubberPerspective;
