import React, {useState, useRef} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SafeAreaView, Dimensions, StyleSheet, View, TextInput,Text, Button, Alert, Touchable, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { ButtonDark} from '../Buttons/Button.js'
import { SearchBar} from '../SearchBar/SearchBar.js'
import { H2, H3, P } from '../Text/Text.js';


const {width, height } = Dimensions.get("window")

//for setting up API
const INITIAL_LAT = 43.009953;
const INITIAL_LNG = -81.273613;

export default function MapComponent({updateAddress}) {

  const [searchText, setSearchText] = useState("");
  const [data,setData] = useState()
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ mapRegion, setMapRegion ] = useState( {
    latitude: 43.0096,
    longitude: -81.2737,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

  })
  const [showDropdown, setShowDropdown] = useState(false);
  const mapKey = useRef(1);

  const searchAddress = async () => {

    if(!searchText.trim().length) return;

    const googleApiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    const input = searchText.trim()
    const location = `${INITIAL_LAT},${INITIAL_LNG}`
    const url = `${googleApiUrl}?query=${input}&location=${location}&key=AIzaSyB1yq3WvTcJB0vZOc33AR6N0XO7P3kPD3c`

    try{
      const resp = await fetch (url)
      const json = await resp.json()

      if (json && json.results){
        const placesData = json.results.map(item => ({
          addressLine1: item.formatted_address,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng
        }));
        setData(placesData);
        setShowDropdown(true);
    }}catch(e){
      console.error(e)
    }
  };
  
  const handleSelectAddress = (addressLine1, lat, lon) => {
    console.log("og map region", mapRegion)
    //show text in search bar
    setSearchText(addressLine1);
    //updateMapview 
    setMapRegion({
      "latitude": lat,
      "longitude": lon,
      "latitudeDelta": 0.0500,
      "longitudeDelta": 0.00421,}
      )
    setShowDropdown(false);
 
  };
  return (
   
    <View style={styles.container}>
    <View style={styles.searchBox}>
      <P>Address</P>
      <TextInput
        style={styles.searchBoxField}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        value={searchText}
        placeholder="Search Venue"
        autoCapitalize="sentences"
        onSubmitEditing={searchAddress} // Trigger search when return key is pressed
      />

    </View>   
    <MapView 
      region={mapRegion}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      
    >
      <Marker
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          title="Your Marker Title"
          description="Your Marker Description"
        />
        </MapView>
    {showDropdown && (
        <View style={styles.dropdownContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={
              () => {
                updateAddress(item.addressLine1, item.longitude, item.latitude),
                handleSelectAddress(item.addressLine1, item.latitude, item.longitude)
              }
            }
          >
            <P>{item.addressLine1}</P>
          </TouchableOpacity>
        ))}
      </View>
      )}
  </View>
);
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200, // Adjust the height as per your requirement
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 250, // Adjust the height as per your requirement
  },
  buttonTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4709CD',
  },
  buttonTwoText: {
    color: '#4709CD',
    fontSize: 16,
  },

  searchBoxField: {
    height: 40,
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,

  },
  buttonContainer: {
    backgroundColor: '#4709CD',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff', // Text color

  },
  buttonLabel: {
    backgroundColor: "Red",

  },
  resultsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  resultsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownContainer: {
    backgroundColor: '(189, 195, 199, 0.5)'
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4709CD',
  },

});
