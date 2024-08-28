import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import EventItem from './EventItem'
import CreateNewEvent from '../NewEvent/NewEvent';

const VenueEvent = ({ _venueId_ }) => {
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  useEffect(() => {
    const fetchVenueEvents = async () => {
      getVenueEvents();
    };

    fetchVenueEvents();
  }, []);

  const getVenueEvents = async () => {
    try {
      const response = await fetch(`${apiUrl}/event/venue/${_venueId_}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const eventData = await response.json();
        setEvents(eventData);
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleAddEvent = () => {
    setShowAddEventModal(true);
  };

  const modalClosed = () => {
    setShowAddEventModal(false);
    getVenueEvents();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={handleAddEvent} style={styles.addReviewButton}>
          <Text style={styles.addReviewButtonText}>Add an Event</Text>
        </TouchableOpacity>

        <View style={styles.reviewsContainer}>
          {/* Display reviews */}
          {events.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </View>

        {/* Modal for adding a review */}
        <Modal
          visible={showAddEventModal}
          animationType="slide"
          onRequestClose={() => setShowAddEventModal(false)}
        >
          <View style={styles.modalContainer}>
            <CreateNewEvent venueId={_venueId_} dismissModal={()=>modalClosed()}/>
            <Button title="Close Modal" onPress={() => modalClosed()} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Background color
    padding: 20,
    paddingBottom: 500,
  },
  scrollView: {
    padding: 20,
    paddingBottom: 315,
  },
  addReviewButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addReviewButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  reviewsContainer: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
});

export default VenueEvent;
