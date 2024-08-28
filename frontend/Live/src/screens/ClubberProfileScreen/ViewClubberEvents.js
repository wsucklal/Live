import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { retrieveUID, clearToken } from '../../handlers/authService';


const ClubberEvents = () => {
  const [clubberEventList, setClubberEventList] = useState([])
  const [UID, setUID] = useState(null); // State to store the retrieved UID

  useEffect(() => {
    const fetchUID = async () => {
      const uid = await retrieveUID();
      setUID(uid);
      getClubberEvents(uid);
    };

    fetchUID();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const getClubberEvents = async (uid) => {
    try {
      const response = await fetch(`${apiUrl}/event/clubber/${uid}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const clubberEvents = await response.json();
        setClubberEventList(clubberEvents)
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const deregisterEvent = async (id) => {
    try {
          // Show confirmation dialog before deleting
          Alert.alert(
            'Confirm Deregister',
            'Are you sure you want to deregister from this event?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Deregister', onPress: async () => {
      // Make DELETE request to delete the review with the given ID
      const response = await fetch(`${apiUrl}/event/deregister/${id}?clubberId=${UID}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted review from the list
        setClubberEventList((prevList) =>
        prevList.filter((item) => item.eventId !== id)
        );
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    }},
  ],
  { cancelable: true }
);

    } catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        
        <FlatList
        data={clubberEventList}
        keyExtractor={(item) => item.eventId.toString()}
        renderItem={({ item }) => (
            <View style={styles.resultItem}>
            <Text style={styles.reviewedVenue}> {item.name}</Text>
            <Text style={styles.reviewText}>{item.eventdate}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deregisterEvent(item.eventId)} // Pass the ID to the delete function
            >
              <Text style={styles.deleteButtonText}>Deregister</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    resultItem: {
        marginBottom: 10, // Adjust the margin as needed
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7a21c0',
        padding: 10,
        borderRadius: 8, // Optional: add rounded corners
      },
      reviewedVenue: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      reviewText: {
        marginBottom: 5,
      },
      rating: {
        fontStyle: 'italic',
      },
      deleteButton: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#fff', // Text color
      },
      deleteButtonText: {
        color: '#990f02'
      }
});

export default ClubberEvents;
