import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import './global.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {retrieveUserType } from './src/handlers/authService.js';

//import VenueProfileScreen from "./src/screens/VenueProfileScreen/VenueProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import ReservationScreen from './src/screens/ReservationScreen/ReservationScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen.js';
import LoginScreen from "./src/screens/LoginScreens/LoginScreen";
import ClubberLoginScreen from "./src/screens/LoginScreens/ClubberLoginScreen";
import ClubLoginScreen from "./src/screens/LoginScreens/ClubLoginScreen";
import CreateClubberProfileScreen from "./src/screens/CreateProfileScreen/CreateClubberProfileScreen";
import CreateClubProfileScreen from "./src/screens/CreateProfileScreen/CreateClubProfileScreen";
import ViewClubberProfileScreen from "./src/screens/ClubberProfileScreen/ViewClubberProfile";
import clubberLogin from "./src/screens/LoginScreens/clubberLogin";
import venueLogin from "./src/screens/LoginScreens/venueLogin";
import ViewClubberReviews from "./src/screens/ClubberProfileScreen/ViewClubberReviews"
import VenueClubberPerspective from './src/screens/Venue_ClubberPerspective/VenueClubberPerspective';
import createClubberProfileLogin from "./src/screens/LoginScreens/clubberSuccessfulProfileLogin";
import createClubProfileLogin from "./src/screens/LoginScreens/CreateClubSuccessProfileLogin.js";
import ViewClubberEvents from "./src/screens/ClubberProfileScreen/ViewClubberEvents.js"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigator = require('./AppStyles')

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkLoggedInStatus = async () => {
//       // Implement your logic to check user login status (e.g., retrieveUserType)
//       const userType = await retrieveUserType(); // Assuming retrieveUserType returns user type
//       setIsLoggedIn(!!userType); // Set isLoggedIn to true if userType is not empty
//     };



//   return (
//     <NavigationContainer>
//       {isLoggedIn ? (
//         <Tab.Navigator
//           initialRouteName="Welcome"
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;

//               if (route.name === 'Search') {
//                 iconName = focused ? 'search' : 'search-outline';
//               } else if (route.name === 'Login') {
//                 iconName = focused ? 'log-in' : 'log-in-outline';
//               } else if (route.name === 'Reservation') {
//                 iconName = focused ? 'calendar' : 'calendar-outline';
//               } else if (route.name === 'Profile') {
//                 iconName = focused ? 'person' : 'person-outline';
//               }

//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//           })}
//         >
//           <Tab.Screen name="Search" component={SearchStackNavigator} />
//           <Tab.Screen name="Reservation" component={ReservationStackNavigator} />
//           <Tab.Screen name="Profile" component={ProfileStackNavigator} />
//         </Tab.Navigator>
//       ) : (
//         <LoginStackNavigator />
//       )}
//     </NavigationContainer>
//   );
// };

// const LoginStackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login"
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#4709CD',
//       },
//       headerTintColor: '#FFFFFF',
//       headerTitleStyle: {
//         color: '#FFFFFF',
//       },
//     }}>
//       <Stack.Screen name="Welcome" component={LoginScreen} />
//       <Stack.Screen name="ViewClubber" component={ViewClubberProfileScreen} />
//       <Stack.Screen name="ClubberReviews" component={ViewClubberReviews}/>
//       <Stack.Screen name="ClubberEvents" component={ViewClubberEvents}/>
//       <Stack.Screen name="ClubberLogin" component={ClubberLoginScreen} />
//       <Stack.Screen name="ClubLogin" component={ClubLoginScreen} />
//       <Stack.Screen name="CreateClubberProfile" component={CreateClubberProfileScreen} />
//       <Stack.Screen name="CreateClubProfile" component={CreateClubProfileScreen} />
//       <Stack.Screen name="clubberLogin" component={clubberLogin} />
//       <Stack.Screen name="venueLogin" component={venueLogin} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Relogin" component={createClubberProfileLogin} />
//       <Stack.Screen name="ReloginClub" component={createClubProfileLogin} />
//       <Stack.Screen name="Search" component={SearchScreen} />
//     </Stack.Navigator>
//   );
// };

const SearchStackNavigator = () => {
  return(
  <Stack.Navigator initialRouteName='Search Stack' 
  screenOptions={{
    headerStyle: {
      backgroundColor: '#4709CD',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackVisible: false,
    headerShown: false,
    headerLeft:null
  }}>
    <Stack.Screen name="Search Venues" component={SearchScreen}  options={{headerShown:true, headerBackVisible: false, headerLeft:null}}/>
    <Stack.Screen name="VenueClubberPerspective" component={VenueClubberPerspective}  options={{headerShown:true, headerBackVisible: true}}/>
  </Stack.Navigator>
  );
}

const ReservationStackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName='Reservation Stack' screenOptions={{
      headerStyle: {
        backgroundColor: '#4709CD',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
      headerBackVisible: false,
      headerShown: false
    }}>
      <Stack.Screen name="Reservations" component={ReservationScreen}  options={{headerShown:true, headerBackVisible: false, headerLeft:null}}/>
    </Stack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  
  return(
    <Stack.Navigator initialRouteName='Profile Stack' screenOptions={{
      headerStyle: {
        backgroundColor: '#4709CD',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
      headerBackVisible: false,
      headerShown: false
    }}>
      
      <Stack.Screen name="Your Profile"  component={ProfileScreen}  options={{headerShown:true, headerBackVisible: false, headerLeft:null}}/>
      <Stack.Screen name="Welcome" component={LoginScreen}  options={{headerShown:false, headerBackVisible: false}} /> 
      <Stack.Screen name="ClubberReviews" component={ViewClubberReviews} options={{headerBackVisible: false,headerShown: true}}/>
      <Stack.Screen name="ClubberEvents" component={ViewClubberEvents} options={{headerBackVisible: false,headerShown: true}}/>
      {/* <Stack.Screen name="ViewClubber" component={ViewClubberProfileScreen} />
      <Stack.Screen name="ClubberReviews" component={ViewClubberReviews}/>
      <Stack.Screen name="ClubberEvents" component={ViewClubberEvents}/>      */}
    </Stack.Navigator>
  )
}


//App stack
//Stack Navigator
  //Login stack
  //Stack Navigator

  //default app stack
  //TAB navigator
    //Search
    //Reservation
    //profile

    export default App =() =>{
      const [isLoggedIn,setIsLoggedIn] =  useState(false)
      const [initialrootName, setInitialrootName] = useState("Login")

      const checkLoggedInStatus = async () => {
        const userType = await retrieveUserType(); // Assuming retrieveUserType returns user type
        setIsLoggedIn(!!userType); // Set isLoggedIn to true if userType is not empty
        
        if(!!userType){
          setInitialrootName('HomeScreen')
        }
      };

      // Check if user is already logged in
      useEffect(() => {
        console.log(initialrootName, isLoggedIn)
         checkLoggedInStatus();
      }, [isLoggedIn,initialrootName]);

      return(
        <NavigationContainer>
          {/* {isLoggedIn?setInitialrootName('HomeScreen'):setInitialrootName('LoginScreen')} */}
          <Stack.Navigator
            initialRouteName={initialrootName}
            screenOptions={{
              headerBackVisible: false,
              headerShown: false
            }}
          >
            {/* Login Stack */}
            <Stack.Screen name="Login" component={DefaultLoginStackNavigator} options={{headerShown:true, headerBackVisible: false}}  /> 
           
            {/* default app Tab Stack */}
            <Stack.Screen name="HomeScreen" component={DefaultAppTabNavigator} options={{headerShown:false, headerBackVisible: false, headerLeft:null}} /> 
          </Stack.Navigator>
        </NavigationContainer>

      )
    }

    const DefaultLoginStackNavigator = () =>{

      return(
        <Stack.Navigator initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4709CD',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              color: '#FFFFFF',
            },
            headerBackVisible: false,
            headerShown: false
          }}
        >
          <Stack.Screen name="Welcome" component={LoginScreen}  options={{headerBackVisible: false,headerShown: false}} />
          <Stack.Screen name="ViewClubber" component={ViewClubberProfileScreen} options={{headerBackVisible: false,headerShown: true}}/>
          <Stack.Screen name="ClubberReviews" component={ViewClubberReviews} options={{headerBackVisible: false,headerShown: true}}/>
          <Stack.Screen name="ClubberEvents" component={ViewClubberEvents} options={{headerBackVisible: false,headerShown: true}}/>
          <Stack.Screen name="ClubberLogin" component={ClubberLoginScreen} options={{headerBackVisible: false,headerShown: true}} />
          <Stack.Screen name="ClubLogin" component={ClubLoginScreen} options={{headerBackVisible: false,headerShown: true}} />
          <Stack.Screen name="CreateClubberProfile" component={CreateClubberProfileScreen} options={{headerBackVisible: false,headerShown: true}} />
          <Stack.Screen name="CreateClubProfile" component={CreateClubProfileScreen} options={{headerBackVisible: false,headerShown: true}}/>
          <Stack.Screen name="clubberLogin" component={clubberLogin} options={{headerBackVisible: false,headerShown: true}} />
          <Stack.Screen name="venueLogin" component={venueLogin} options={{headerBackVisible: false,headerShown: true}} />
        </Stack.Navigator>
      )
    }

    const DefaultAppTabNavigator = () =>{

      return(
        <Tab.Navigator
        initialRouteName="Search"
        // tabBarOptions={{
        //   activeTintColor: '#FFFFFF', // Color of the active tab
        //   headerTintColor: '#4709CD',
        //   headerStyle: {
        //     backgroundColor: "#4709CD",
        //     },
        //   inactiveTintColor: '#9166ED', // Color of inactive tabs
        //   //labelStyle: { fontSize: 16 }, // Style for tab labels
        //   style: { backgroundColor: '#4709CD' } // Style for the tab bar
        // }}
          screenOptions={
            // {
            //   headerLeft:null,
            //   headerBackVisible:false
            // }
            ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              } else if (route.name === 'Reservation') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            backgroundColor: "#4709CD",
            activeTintColor: '#FFFFFF', // Color of the active tab

            })
          }>
          <Tab.Screen name="Search" component={SearchStackNavigator} options={{headerBackVisible: false,headerShown: false, headerLeft:null}}/>
          <Tab.Screen name="Reservation" component={ReservationStackNavigator} options={{headerBackVisible: false,headerShown: false, headerLeft:null}} />
          <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{headerBackVisible: false,headerShown: false, headerLeft:null}} />
        </Tab.Navigator>
      );
    }