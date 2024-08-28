import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import NewRating from '../../VenueProfileScreen/NewRating/NewRating';
import { retrieveUserType } from '../../../handlers/authService';

const VenueReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [userType, setUserType] = useState('')
  useEffect(() => {
    const fetchVenueReviews = async () => {
      getVenueReviews();
      const retrievedUserType = await retrieveUserType();
      setUserType(retrievedUserType)
    };

    fetchVenueReviews();
  }, []);

  const getVenueReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/review/venue/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const reviewData = await response.json();
        setReviews(reviewData);
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleAddReview = () => {
    setShowAddReviewModal(true);
  };

  const modalClosed = () => {
    setShowAddReviewModal(false);
    getVenueReviews();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {
          userType == 'clubber' && 
          <TouchableOpacity onPress={handleAddReview} style={styles.addReviewButton}>
          <Text style={styles.addReviewButtonText}>Add a Review</Text>
          </TouchableOpacity>
        }

        <View style={styles.reviewsContainer}>
          {/* Display reviews */}
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </View>

        {/* Modal for adding a review */}
        <Modal
          visible={showAddReviewModal}
          animationType="slide"
          onRequestClose={() => setShowAddReviewModal(false)}
        >
          <View style={styles.modalContainer}>
            <NewRating venueId={id} dismissModal={()=>modalClosed()}/>
            <Button title="Close Modal" onPress={() => modalClosed()} />
          </View>
        </Modal>
        <TouchableOpacity onPress={getVenueReviews} style={styles.addReviewButton}>
          <Text style={styles.addReviewButtonText}>Refresh</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EBF3', // Background color
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
  },
});

export default VenueReview;
