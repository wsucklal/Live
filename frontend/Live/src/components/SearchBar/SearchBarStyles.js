import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height:  50, 
        marginHorizontal: 20, 
        flexDirection: 'row', 
        borderWidth: 0.25, 
        borderColor: 'gray', 
        backgroundColor: "#ffffff"
    },
    touchableOpacity: {
      alignSelf: 'center', 
      marginHorizontal: 5
    },
    textInput: {
      height: 50,
      fontSize: 15,
      width: "100%",
      flexShrink: 1
    },
  });

module.exports = styles;