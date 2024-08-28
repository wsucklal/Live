import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//const styles = require('./SearchBarStyles')

const FilterPill = ({ tag }) => {

    return(
        <View style={{alignSelf: "flex-start", height: 25, borderRadius: 15, backgroundColor: "#4709CD", paddingHorizontal: 10, paddingVertical: 5, marginTop: 5, marginHorizontal: 2.5}}>
            <Text style={{color: "#ffffff"}}>{tag}</Text>
        </View>
    );
}

export default FilterPill;