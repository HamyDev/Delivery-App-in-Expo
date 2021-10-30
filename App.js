import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './screens/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import MenuPage from './screens/MenuPage';
import YourCart from './screens/YourCart';
import OrderConfirmation from './screens/OrderConfirmation';
import TrackingPage from './screens/TrackingPage';

export default function App() {

  const Stack = createNativeStackNavigator();

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='MainPage' component = { MainPage } options={{
                headerShown: false
      }}/>
      <Stack.Screen name='MenuPage' component = { MenuPage } options={{
                headerShown: false
      }}/>
      <Stack.Screen name='YourCart' component = { YourCart } options={{
                headerShown: false
      }}/>
      <Stack.Screen name='OrderConfirmation' component = { OrderConfirmation } options={{
                headerShown: false
      }}/>
      <Stack.Screen name='TrackingPage' component = { TrackingPage } options={{
                headerShown: false
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
}