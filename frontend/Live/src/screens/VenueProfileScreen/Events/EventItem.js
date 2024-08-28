import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Button } from 'react-native';

const EventItem = ({ event }) => {
  const { eventBackground, name, eventdate, maxPeople, registeredPeople, eventId } = event;

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    const hour = dateString.slice(11, 13);
    const minute = dateString.slice(14, 16);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    const formattedHour = parseInt(hour) === 0 ? 12 : (parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour));

    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year} at ${formattedHour}:${minute} ${period}`;
  };

  const calculateSpotsRemaining = (registeredPeople) => {
    if (registeredPeople == null) {
      return;
    } else {
      return maxPeople - registeredPeople.length;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = async () => {
    try {
      const response = await fetch(`${apiUrl}/clubber/eventList`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
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
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View key={event.id} style={styles.container}>
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.eventBackground}>{eventBackground}</Text>
        <Text style={[styles.date, { color: '#4709CD' }]}>{formatDate(eventdate)}</Text>
      <TouchableOpacity onPress={openModal} style={styles.viewRegisteredButton}>
        <Text style={styles.viewRegisteredButtonText}>View Clubbers Registered</Text>
      </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.date, { color: '#4709CD' }]}>{`${calculateSpotsRemaining(registeredPeople)} spot(s) remaining`}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Clubbers Registered</Text>
          <View style={styles.divider} />
          {/* You can map through registeredPeople and display them here */}
          {registeredPeople.map((person, index) => (
            <Text key={index} style={styles.registeredPerson}>${(index+1) + `): ` + person}</Text>
          ))}
          <Button title="Close" onPress={closeModal} />
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', // Set flexDirection to row
    justifyContent: 'space-between', // Align items to the right
    alignItems: 'center',
  },
  eventDetailsContainer: {
    flexDirection: 'column', // Keep event details in a column
    alignItems: 'flex-start', // Align items to the start
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4709CD',
  },
  eventBackground: {
    fontSize: 14,
    marginBottom: 5,
    color: '#777',
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
  },
  viewRegisteredButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  viewRegisteredButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    padding: 70,
    width: '120%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4709CD',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 5,
  },
  registeredPerson: {
    fontSize: 16,
    color: '#4709CD',
    marginBottom: 5,
  },
});

export default EventItem;
