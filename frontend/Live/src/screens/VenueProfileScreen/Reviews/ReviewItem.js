import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons for stars

const ReviewItem = ({ review }) => {
  const { text, fullName, rating } = review;

  // Function to render stars based on the rating
  const renderStars = (rating) => {
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
    <View style={styles.container}>
      <Text style={styles.description}>{fullName}</Text>
      <Text style={styles.date}>{text}</Text>
      <View style={styles.ratingContainer}>{renderStars(rating)}</View>
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
    borderColor:'#4709CD',
    borderWidth:2
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default ReviewItem;
