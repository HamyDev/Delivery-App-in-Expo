import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, PixelRatio } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/core';
import Promos from '../components/PromoWidgets';
import Usuals from '../components/UsualsWidgets';
import FreeDelivery from '../components/FreeDelivery';
import YourLiked from '../components/YourLiked';
import { ScrollView } from 'react-native-gesture-handler';
import RestaurantSearch from '../components/RestaurantSearch';

export default function MainPage() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles().container}>
        <Text style={styles(PixelRatio.get()).locationText}>West Midlands, Coventry</Text>
        <RestaurantSearch/>
        <Text style={styles().PromoText}>Promotions</Text>
        <Promos/>
        <Text style={styles().Text}>Your Liked</Text>
        <YourLiked/>
        <Text style={styles().Text}>Your Usuals</Text>
        <Usuals/>
        <Text style={styles().Text}>Free Delivery</Text>
        <FreeDelivery/>
    </ScrollView>
  )
}

const styles = (props) =>StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424'
  },
  locationText: {
      marginLeft: 25,
      paddingTop: 75,
      fontWeight: 'bold',
      fontSize: props <= 4 ? 26 : 30 ,
      color: '#F3F4F6'
  },
  searchIcon: {
      color: '#8B8B90',
  },
  PromoText: {
    marginLeft: 25,
    marginBottom: 15,
    marginTop: 22,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#F3F4F6'
  },
  Text: {
    marginTop: 22,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#F3F4F6',
    marginBottom: 15
  }
})

//divide everything by 5
