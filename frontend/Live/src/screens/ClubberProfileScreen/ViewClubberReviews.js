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


  const UserProfile = () => {
    const [clubberReviewList, setClubberReviewList] = useState([])
    const [UID, setUID] = useState(null); // State to store the retrieved UID

    useEffect(() => {
      const fetchUID = async () => {
        const uid = await retrieveUID();
        setUID(uid);
        getClubberReviews(uid);
      };

      fetchUID();
    }, []); // Empty dependency array ensures it runs once when the component mounts

    const getClubberReviews = async (uid) => {
      try {
        const response = await fetch(`${apiUrl}/review/clubber/${uid}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (response.ok) {
          const clubberReviews = await response.json();
          setClubberReviewList(clubberReviews)
        } else {
          console.log(`Something went wrong: ${JSON.stringify(response)}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const deleteReview = async (id) => {
      try {
            // Show confirmation dialog before deleting
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this review?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: async () => {
        // Make DELETE request to delete the review with the given ID
        const response = await fetch(`${apiUrl}/review/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (response.ok) {
          // Remove the deleted review from the list
          setClubberReviewList((prevList) =>
          prevList.filter((item) => item.reviewId !== id)
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
          data={clubberReviewList}
          keyExtractor={(item) => item.reviewId.toString()}
          renderItem={({ item }) => (
              <View style={styles.resultItem}>
              <Text style={styles.reviewedVenue}> {item.reviewedVenue}</Text>
              <Text style={styles.reviewText}>{item.text}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteReview(item.reviewId)} // Pass the ID to the delete function
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
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

  export default UserProfile;
