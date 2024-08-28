import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, Button} from 'react-native';
import { ButtonDark,ButtonLight } from '../../components/Buttons/Button';


export const CustomModal = ({style, buttonTitle, buttonStyle, RenderItem, RenderItemProps}) => {
    const [visible, setVisible] = useState(false);

    // const setVisibilityExternally = (setVisibility) => {
    //   console.log('setVisibility',setVisibility);
    //   setVisible(setVisibility)
    // }

    return(
        <View style={styles.container}>
          {buttonStyle == null && 
            <Button title={buttonTitle} onPress={() => {setVisible(true)}} />
          }
          {buttonStyle == 'ButtonLight' && 
            <ButtonLight  onPress={() => setVisible(true)} title={buttonTitle} style={{marginBottom: 5, width: 200}}/>
          }
          {buttonStyle == 'ButtonDark' && 
            <ButtonDark  onPress={() => setVisible(true)} title={buttonTitle} style={{marginBottom: 5, width: 200}}/>
          }
            <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
            setVisible(!visible);
            }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                {RenderItem && <RenderItem props={RenderItemProps}/>}  
                {/* <Button title="Close" onPress={() => setVisible(false)} /> */}
                <ButtonLight  onPress={() => setVisible(false)} title={"Close"} style={{marginBottom: 5, width: 200}}/>
              </View>
            </View>
          </Modal>

        </View>
    );
};

export default CustomModal

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
    },
    modalView: {
      margin: 100,
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
    },
  });
  