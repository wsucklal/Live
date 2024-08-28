import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { retrieveUID } from '../../../handlers/authService';


const CreateNewRating = ({venueId, dismissModal}) => {
  const [ratingData, setRatingData] = useState({
    rating: '1', // Initial rating value
    text: '', // State to hold the review text
    name: '',
  });

  const [clubberId, setClubberId] = useState('');
  const [ratingCreated, setRatingCreated] = useState(false)

  useEffect(() => {
    const getClubberId = async () => {
      try {
        const id = await retrieveUID();
        setClubberId(id);
      } catch (error) {
        console.error('Error fetching clubber ID:', error);
      }
    };

    getClubberId();
  }, []);

  const handleRatingChange = (rating) => {
    setRatingData({ ...ratingData, rating });
    setRatingCreated(false)
  };

  const handleReviewChange = (text) => {
    setRatingCreated(false)
    setRatingData({ ...ratingData, text });
  };

  const createRating = () => {
    const { rating, text } = ratingData;

    // Check if the rating is within the range of 1 to 5
    const isValidRating = ['1', '2', '3', '4', '5'].includes(rating);

    if (!isValidRating) {
      Alert.alert('Error', 'Rating should be between 1 and 5');
      return;
    }

    // Logic to create a new rating with the selected value (rating) and review text
    console.log(`New Rating: ${rating}`);
    console.log(`Review Text: ${text}`);

    // Sending data to the backend API using fetch
    fetch(`${apiUrl}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...ratingData, clubberId, venueId }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(`Added to the storage successfully`);
        } else {
          console.log(`Something went wrong ${JSON.stringify(res)}`);
        }
      })
      .catch((error) => {
        console.error(`Error occurred: ${error}`);
      });
      setRatingCreated(true)
      dismissModal();
  };


  return (
    <View style={styles.contactSctn}>
      {/* Select Rating Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.text}>Select Rating:</Text>
        <View style={styles.ratingBox}>
          <RNPickerSelect
            onValueChange={handleRatingChange}
            items={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ]}
            value={ratingData.rating}
            style={pickerSelectStyles}
          />
        </View>
      </View>

      {/* Text Input for Review */}
      <View style={styles.reviewContainer}>
        <Text style={styles.text}>Enter Review:</Text>
        <TextInput
          style={styles.reviewInput}
          onChangeText={handleReviewChange}
          value={ratingData.text}
          placeholder="Type your review here..."
          placeholderTextColor="black"
          multiline={true}
        />
      </View>

      {/* Create Rating Button */}
      <View style={styles.logout}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#9166ED' : '#4709CD' },
            styles.logoutBtn,
            styles.btn,
          ]}
          onPress={createRating}
        >
          <Text style={styles.text}>Create Rating</Text>
        </Pressable>
      </View>
      {ratingCreated==true &&  <View>
      <Text>Rating Added!</Text>
    </View>
      }
    </View>
  );
};

// Styles for the picker select
const pickerSelectStyles = {
  // Styles for iOS and Android inputs (same as before)
};

// Component styles
const styles = {
  contactSctn: {
   
  },
  ratingContainer: {
    marginVertical: 10,
  },
  ratingBox: {
    borderWidth: 2,
    borderColor: '#9166ED',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F5F0F8'
  },
  reviewContainer: {
    marginVertical: 10,
  },
  reviewInput: {
    height: 100,
    width: 250,
    borderColor: '#9166ED',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F5F0F8',
    color: 'black',
  },

  btn: {
    minWidth: 150,
    height: 40,
    alignItems: 'center',
    marginVertical: 10,
    textAlign: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18
  },
};

export default CreateNewRating;