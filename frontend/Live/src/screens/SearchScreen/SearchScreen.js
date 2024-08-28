import EventPost from '../../components/EventPost';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text,FlatList, TouchableOpacity, RefreshControl, StatusBar, ActivityIndicator } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPill from '../../components/FilterPills/FilterPill';
import { useFocusEffect } from '@react-navigation/native';
import { P, SubtleText } from '../../components/Text/Text';

import * as Location from 'expo-location';

const styles = require('./SearchScreenStyles');

/**
 * Controls all operations on the search screen.
 */
export default SearchScreen = ({ navigation }) => {

  const [search, setSearch] = useState('');//The search value
  const [data, setData] = useState([]);//Manages the data displayed during the search
  const [unfilteredData, setUnfilteredData] = useState([]);//Holds raw unfiltered/searched data
  const [refreshing, setRefreshing] = useState(false);//Whether the search list is refreshing or not
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let MY_COORDS = null;
  const feedLimit = 20; //Max number of venues to load on the feed at one time.

  //Get data for raw data
  const getVenues = async (limit, lat, lon) => {
    setRefreshing(true);
    fetch(`${apiUrl}/venue/feed/doc`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
        limit,
        lat,
        lon
      }
      ),
    })
    .then(async (res) => {
      if (res.ok) {
        let venueData = await res.json();
        setUnfilteredData(venueData);
        setData(venueData);
        
      }
      else{
        console.log(`something went wrong ${JSON.stringify(res)}`)
      }
      setRefreshing(false);
    });
 }

 useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (location) {
      MY_COORDS = JSON.stringify(location);
      getVenues(feedLimit, location.coords.latitude, location.coords.longitude);
    }
  })();
}, []);

 let text = 'Waiting..';
 if (errorMsg) {
   console.log(text);
   text = errorMsg;
 } else if (location) {
   text = JSON.stringify(location);
   console.log(text);
   MY_COORDS = text;
 }
 
//Refresh when focus is put on search screen.
 useFocusEffect(
  React.useCallback(() => {
    if (MY_COORDS && location) {
      getVenues(feedLimit, location.coords.latitude, location.coords.longitude);
    return () => {
      // Do something when the screen is unfocused
      // Useful for cleanup functions
    };
  }
  }, [])
);

//When someone presses the search button
 function onSearchClick(s) {
  setSearch(search);

  if (s !== undefined) {
    //Search and filter data
    const filteredData = unfilteredData.filter((venue) =>
      venue.venueName.toLowerCase().includes(s.toLowerCase()) || (venue.description && venue.description.toLowerCase().includes(s.toLowerCase()) ||
      (venue.tags && venue.tags.includes(s))
    ));

    console.log("Filtered Data " + JSON.stringify(filteredData));
    setData(filteredData);
  }
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1); 
  var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  if (d < 1) {// Convert to meters if less than 1 km
    d = Math.round(d * 1000); 
    return d + "m"; // Round to nearest integer
  } else {
    d = Math.round(d);
    return d + "km";
  }
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//Render filter search list item.
const renderItem = ({ item }) => (
  <View style={{alignSelf: 'flex-start', padding: 15}}>
    <TouchableOpacity
      onPress={()=>{navigation.navigate('VenueClubberPerspective', {venueId: item.venueId})}}>
      <Text style={{fontSize: 20, fontWeight: 'light', color: "#000"}}>{item.venueName}</Text>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5}}>{item.description}</Text>
      {item.lat !== undefined && item.lon !== undefined && location !== null ? (
        <SubtleText>{getDistance(location.coords.latitude, location.coords.longitude, item.lat, item.lon)} away</SubtleText>
      ) : (
        <View/>
      )}
      <Text></Text>
      <View style={{flexDirection: 'row'}}>
      {item.tags !== undefined ? (
        item.tags.map((tag, index)=> (
          <FilterPill key={index} tag={tag}/>
        ))
      ) : (
          <View/>
      )}
      
      </View>
    </TouchableOpacity>
  </View>
);
//Render search list.
return (
    <View style={styles.container1}>
      <StatusBar barStyle="light-content" />
      <View style={{width: "100%", marginTop: 15}}> 
        <SearchBar onSearch={(search) => onSearchClick(search)}/>
      </View>
      <View style={{height: 0.5, backgroundColor: "gray", marginTop: 15}}/>
      <View style={{width: "100%", flex: 1}}>
      {MY_COORDS ? (
      <FlatList
        style={{backgroundColor: "#ffffff"}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.venueId} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getVenues}
          />
        }
      />
      ) : (
        <View style={{display: 'flex', flexDirection: 'row', margin: 15}}>
            <ActivityIndicator size="small" color="#000000" style={{marginRight: 5}}/>
            <SubtleText>Loading Location Data...</SubtleText>
        </View>
      )}
      </View>
    </View>
  );
};