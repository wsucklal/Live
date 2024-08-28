import React, { useState } from 'react';
import { Modal, View, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const HalfModal = ({visible, setModalVisible, closeButton}) => {

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.dimmedBackground}>
            <View style={styles.modalView}>
              {/* Modal content */}
              <Button title="Close Modal" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimmedBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    height: '50%',
  },
});

export default HalfModal;