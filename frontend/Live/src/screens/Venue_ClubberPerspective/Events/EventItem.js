import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventItem = ({ event, _clubberId_}) => {
  const { eventBackground, name, eventdate, maxPeople, registeredPeople, eventId } = event;
  const [registrationStatus, setRegistrationStatus] = useState(registeredPeople.includes(_clubberId_) ? 'registered' : 'unregistered');

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
        return
    } else {
        return (spotsRemaing = maxPeople - registeredPeople.length)
    }
  }

  const eventRegistration = () => {
    // Simulate an asynchronous registration process
    setTimeout(() => {
      // Update registration status
      setRegistrationStatus('registered');
    }, 1000);

    // Simulate API call
    fetch(`${apiUrl}/event/register/${eventId}?clubberId=${_clubberId_}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(`Updated event successfully`);
        } else {
          console.log(`Something went wrong ${JSON.stringify(res)}`);
        }
      })
      .catch((error) => {
        console.error(`Error occurred: ${error}`);
      });
  };

  return (
    <View key={event.id} style={styles.container}>
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.eventBackground}>{eventBackground}</Text>
        <Text style={[styles.date, { color: '#4709CD' }]}>{formatDate(eventdate)}</Text>
      </View>
      <View>
        {registrationStatus === 'unregistered' ? (
          <>
            <Text style={[styles.date, { color: '#4709CD' }]}>{`${calculateSpotsRemaining(registeredPeople)} spot(s) remaining`}</Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={eventRegistration}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {}}
            disabled={true} // Button is disabled after registration
          >
            <Text style={styles.registerButtonText}>Registered ✓</Text>
          </TouchableOpacity>
        )}
      </View>
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
  registerButton: {
    backgroundColor: '#4709CD',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default EventItem;
