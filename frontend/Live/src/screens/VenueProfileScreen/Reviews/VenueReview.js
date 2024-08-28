import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const VenueReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchVenueReviews = async () => {
      getVenueReviews();
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.reviewsContainer}>
          {/* Display reviews */}
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </View>
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
  reviewsContainer: {
    marginTop: 10,
  },
});

export default VenueReview;
