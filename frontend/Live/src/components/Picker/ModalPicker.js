import React, { useState } from 'react';
import { Modal,Text, TouchableOpacity, View, StyleSheet, Button, Platform } from 'react-native';
import { PickerComponent } from '../Picker/Picker';
import { CustomModal} from '../Modals/CustomModal';

export const ModalPicker = ({buttonStyle,buttonTitle,selectableValues, defaultValue, onValueChange, style}) =>{

  return(
    <View style={styles.container}>
            <CustomModal buttonStyle={buttonStyle} buttonTitle={buttonTitle} RenderItem={PickerComponent} RenderItemProps={{selectableValues, defaultValue, onValueChange, style}}/>
    </View>


    //<Picker
    //   selectedValue={selectedValue}
    //   style={style? style:{ height: 200, width: 200 }}
    //   onValueChange ={(itemValue, itemIndex) => {setSelectedValue(selectableValues[itemIndex]); console.log("clubSelected",selectableValues[itemIndex]); onValueChange(itemIndex);}}
    // >
    //   {selectableValues.map((item) => (
    //     <Picker.Item key={item.value} label={item.label} value={item.value} />
    //   ))}
    // </Picker>
  );
};

// export const ModalPicker = ({selectableValues, defaultValue, onValueChange, style, renderItem}) => {
//   console.log(defaultValue,selectableValues)
//   const [pickerVisible, setPickerVisible] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(defaultValue? defaultValue:selectableValues[0]);

// //   const numbers = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

//   return (
//     <View style={styles.container}>
//       <CustomModal renderItem={PickerComponent}/>
//       {/* <Button title={"yes"} onPress={() => setPickerVisible(true)} /> */}
//       {/*<Modal
//         animationType="slide"
//         transparent={true}
//         visible={pickerVisible}
//         onRequestClose={() => {
//           setPickerVisible(!pickerVisible);
//         }}
//       >
//         {renderItem}
//         {/* <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Picker
//               selectedValue={selectedValue}
//               style={style? style:{ height: 200, width: 200 }}
//               onValueChange ={(itemValue, itemIndex) => {setSelectedValue(selectableValues[itemIndex]); console.log("clubSelected",selectableValues[itemIndex]); onValueChange(itemIndex);}}
//             >
//               {selectableValues.map((item) => (
//                 <Picker.Item key={item.value} label={item.label} value={item.value} />
//               ))}
//             </Picker>
//             <Button title="Done" onPress={() => setPickerVisible(false)} />
//           </View>
//         </View>
//       </Modal> */}
//     </View>
//   );
// };

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
    margin: 20,
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

export default ModalPicker;
