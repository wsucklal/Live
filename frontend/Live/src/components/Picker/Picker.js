import React, { useState } from 'react';
import { Modal,Text, TouchableOpacity, View, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomModal} from '../Modals/CustomModal';

//{selectableValues, defaultValue, onValueChange, style}

export const PickerComponent = ({props}) =>{
  //console.log("ModalPicker:",props?.selectableValues,props?.defaultValue, props?.onValueChange)

  const [selectedValue, setSelectedValue] = useState(props?.defaultValue? props?.defaultValue :props?.selectableValues[0]?.label);

  return(
    <View style={styles.container}>
      <Picker
      selectedValue={selectedValue}
      style={props?.style? props?.style:{ height: 200, width: 200 }}
      onValueChange ={(itemValue, itemIndex) => {setSelectedValue(itemValue); console.log("Selected",props?.selectableValues[itemIndex].label);props?.onValueChange(itemIndex);}}
    >
      {props?.selectableValues.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
    </View>



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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default PickerComponent;
