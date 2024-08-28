import React, { useState } from 'react';
import { TextInput, Text, View, Pressable, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const CreateNewEvent = ({ venueId, dismissModal }) => {
  const startDate = getFormatedDate(new Date(), 'YYYY/MM/DD h:m');
  const [date, setDate] = useState(startDate.toString());
  const [eventName, setEventName] = useState('');
  const [background, setBackground] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(null);
  const [open, setOpen] = useState(false);
  const [showInputFields, setShowInputFields] = useState(true);
  const [eventCreated, setEventCreated] = useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  const createEvent = async () => {
    try {
      const response = await fetch(`${apiUrl}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers or authentication tokens as needed
        },
        body: JSON.stringify({
          name: eventName,
          eventdate: date,
          eventBackground: background,
          maxPeople: numOfPeople,
          venueId: venueId,
          registeredPeople: []
        }),
      });

      if (response.ok) {
        console.log('Event created successfully');
        setEventCreated(true);
        setShowInputFields(false); // Hide input fields after creating event
        // You may want to update local state or perform additional actions here

        dismissModal()
      } else {
        console.error('Failed to create event:', await response.text());
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Network error:', error.message);
      // Handle network errors, show a message to the user, etc.
    }
  };

  const showCreateNewEventButton = () => {
    setShowInputFields(true);
    setEventCreated(false);
  };

  return (
    <View style={styles.container}>
      {showInputFields ? (
        <>
          <View style={styles.inputField}>
            <Text style={styles.label}>Event Name:</Text>
            <TextInput
              onChangeText={(text) => setEventName(text)}
              style={styles.input}
              placeholder='Enter Event Name...'
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={styles.inputField}>
            <TouchableOpacity onPress={handleOnPress}>
              <View style={styles.datePickerButton}>
                <Text style={styles.buttonText}>Select Date</Text>
              </View>
            </TouchableOpacity>
            <Modal
              animationType='slide'
              transparent={true}
              visible={open}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    options={{
                      textHeaderColor: "#4709CD",
                      selectedTextColor: "white",
                      mainColor: "#4709CD"
                    }}
                    selected={date}
                    minimumDate={startDate}
                    onSelectedChange={date => handleDateChange(date)}
                  />
                  <TouchableOpacity onPress={handleOnPress}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={styles.selectedDate}>Date: {date}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Background:</Text>
            <View style={styles.input}>
              <TextInput onChangeText={(text) => setBackground(text)} placeholder="Enter Info..." placeholderTextColor="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.label}>Number of People:</Text>
          <View style={styles.input}>
            <TextInput
              keyboardType="numeric"
              placeholder='Enter Number...'
              placeholderTextColor="#FFFFFF"
              onChangeText={(text) => setNumOfPeople(text)}
            />
          </View>
          <View style={styles.createButtonContainer}>
            <Pressable onPress={createEvent} style={({ pressed }) => [
              { backgroundColor: pressed ? "#9166ED" : "#4709CD" },
              styles.createButton,
            ]}>
              <Text style={styles.buttonText}>Create Event</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.eventCreatedContainer}>
          {eventCreated && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
          <View style={styles.createAnotherEventButtonContainer}>
            <Text style={styles.text}>Event Created! Click below to create another event</Text>
            <Pressable onPress={showCreateNewEventButton} style={({ pressed }) => [
              { backgroundColor: pressed ? "#9166ED" : "#4709CD" },
              styles.createAnotherEventButton,
            ]}>
              <Text style={styles.buttonText}>Create New Event</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    width: '100%',

  },
  inputField: {
    flex: 1,
    marginBottom: 10,
    width: '100%',
    color: '#FFFFFF'
  },
  input: {
    borderWidth: 2,
    borderColor: '#6A2EEB',
    borderRadius: 8,
    padding: 15,  // Increased padding for wider input fields
    backgroundColor: '#404040',
    color: '#FFFFFF',
    marginBottom: 10,
    width: '100%',  // Set width to 100%
  },
  label: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  selectedDate: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center'
  },
  datePickerButton: {
    backgroundColor: '#4709CD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '96%',
    height: '70%'
  },
  createButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4709CD',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
  },
  eventCreatedContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  checkmarkContainer: {
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 30
  },
  createAnotherEventButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  createAnotherEventButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4709CD',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CreateNewEvent;
