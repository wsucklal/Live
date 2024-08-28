import { Text, View }  from 'react-native';
import { StyleSheet } from 'react-native';

export default function ProfileHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile Header</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      //padding: "20px",
      flex: 0.15,
      width: '100%',
      backgroundColor: '#4709CD',
      alignItems: 'center',
      justifyContent: 'center',
      //borderTopColor: '#red'
    },
   
    text:{
      color: '#FFFFFF',
      fontSize: '20rem'
    }
});