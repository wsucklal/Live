import React, { useState } from 'react';
import { Modal,Text, TouchableOpacity, View, StyleSheet, Button, FlatList, Platform } from 'react-native';
import { CustomModal} from '../Modals/CustomModal';
import { ButtonDark } from '../../components/Buttons/Button';

export const ConfirmationComponent = ({props})=> {

    const renderItem = ({ item }) => (
        <View>
            <Text>{`${item.label}: ${item.value}`}</Text>
        </View>
        );

    return(
        <View style={styles.modalView}>
            <Text>Confirm this Information?</Text>
            {/* <FlatList
                data={props?.ConfirmationList}
                keyExtractor={(item, index) => (item && item.label ? item.label : index.toString())}
                //onEndReached={fetchData}
                //onEndReachedThreshold={0.5}
                renderItem={renderItem}
               // ListFooterComponent={renderFooter}
            /> */}
            <ButtonDark  onPress={() => {props?.onSubmitAction(true);}} title={"Submit"} style={{marginBottom: 5, width: 200}}/>

        </View>
    )
}

export const ConfirmationModal = ({buttonStyle,buttonTitle, ConfirmationList, onSubmitAction, style}) =>{

    return(
    <View style={styles.container}>
            <CustomModal buttonStyle={buttonStyle} buttonTitle={buttonTitle} RenderItem={ConfirmationComponent} RenderItemProps={{ConfirmationList, onSubmitAction, style}}/>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    justifyContent:'space-between',
    // margin: 20,
    // backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});

export default ConfirmationModal;
