import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { TextInput, View, FlatList, TouchableOpacity, Image,StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';

const data = [
    {
        id: "1",
        title: "McDonald's",
        rating: 4.3,
        deliveryTime: '20 - 35 min',
        description: 'Burgers • Chips • Chicken',
        image: "https://i.imgur.com/59uIHmW.jpg",
        screen: "MapScreen",
    },
    {
        id: "2",
        title: "KFC",
        rating: 3.6,
        deliveryTime: '45 - 60 min',
        description: 'Chicken • American • Burgers',
        image: "https://i.imgur.com/sflJWqe.jpg",
        screen: "EatsScreen",
    },
    {
        id: "3",
        title: "Oodle Chinese",
        rating: 4.9,
        deliveryTime: '15 - 30 min',
        description: 'Shrimp • Spicy • Chips',
        image: "https://i.imgur.com/Zv2ihAb.jpg",
        screen: "PackageScreen",
    },
    {
        id: "4",
        title: "Subway",
        rating: 4.6,
        deliveryTime: '20 - 35 min',
        description: 'Sandwich • Snacks • Drinks',
        image: "https://i.imgur.com/vktBuYd.png",
        screen: "MapScreen",
    },
    {
        id: "5",
        title: "Rio’s Piri Piri",
        rating: 3.6,
        deliveryTime: '35 - 50 min',
        description: 'Chicken • Peri Peri • Halal',
        image: "https://i.imgur.com/0H0fIwi.jpg",
        screen: "EatsScreen",
    },
    {
        id: "6",
        title: "AFC Fried Chicken",
        rating: 4.9,
        deliveryTime: '25 - 40 min',
        description: 'Chicken • Burgers • Halal',
        image: "https://i.imgur.com/MdtaP1l.jpg",
        screen: "PackageScreen",
    }
]

const RestaurantSearch = () => {
    const [restaurant, setRestaurant] = useState('')

    console.log(restaurant)

    return (
        <View style={styles.restaurantSearch}>
            <Icon name="ios-search" type='ionicon' style={{maxHeight: 12, marginTop: 7.5, marginLeft: 8}}size={11} color="#8A8A8E"/>
            <TextInput 
                placeholder='Search for restaurants' 
                style={styles.input}
                onChangeText={(text) => setRestaurant(text)}
                placeholderTextColor='#8A8A8E'
                selectionColor={'white'}
            />
        </View>
    );
};

//tw`p-2 px-5 m-2 rounded-xl mb-5`

export default RestaurantSearch;

const styles = StyleSheet.create({
    restaurantSearch: {
        marginHorizontal: 25,
        flexDirection: 'row',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        borderRadius: 69,
        marginTop: 22,
        paddingLeft: 5,
    },
    input: {
      paddingLeft: 8,
      fontSize: 11,
      color: '#8B8B90'
    },
})


