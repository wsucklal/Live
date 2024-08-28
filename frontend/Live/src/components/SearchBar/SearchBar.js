import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = require('./SearchBarStyles')

const SearchBar = ({ onSearch }) => {

    let search;

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={()=>onSearch(search)}>
                <Ionicons name="search" size={30} color="lightgray"/>
            </TouchableOpacity>
            <TextInput
            style={styles.textInput}
            placeholder="Search..."
            onChangeText={(s)=>{search = s;}}
            onSubmitEditing={()=>onSearch(search)}
            />
        </View>
    );
}

export default SearchBar;