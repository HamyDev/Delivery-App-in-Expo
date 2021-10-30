import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Text, View, FlatList, TouchableOpacity, Image,StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';

const data = [
    {
        id: 1,
        title: "McDonald's",
        rating: 4.3,
        deliveryTime: '20 - 35 min',
        description: 'Burgers • Chips • Chicken',
        image: "https://i.imgur.com/59uIHmW.jpg",
        menu: [
            {
                menuId: 1,
                name: "Big Mac",
                image: 'https://i.imgur.com/RfJSoMx.png',
                description: "Two 100% beef patties, a slice of cheese, lettuce, onion and pickles.",
                price: 3.19
            },
            {
                menuId: 2,
                name: "Tomato & Basil Pizza",
                image: 'https://i.imgur.com/ih2BpOE.jpg',
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                price: 20
            },
            {
                menuId: 3,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 4,
                name: "Mediterranean Chopped Salad ",
                image: 'https://i.imgur.com/Z8X8Y9q.jpg',
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                price: 10
            },
            {
                menuId: 5,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 6,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
        ]
    },
    {
        id: 2,
        title: "KFC",
        rating: 3.6,
        deliveryTime: '45 - 60 min',
        description: 'Chicken • American • Burgers',
        image: "https://i.imgur.com/sflJWqe.jpg",
        menu: [
            {
                menuId: 1,
                name: "Big Mac",
                image: 'https://i.imgur.com/RfJSoMx.png',
                description: "Two 100% beef patties, a slice of cheese, lettuce, onion and pickles.",
                price: 3.19
            },
            {
                menuId: 2,
                name: "Tomato & Basil Pizza",
                image: 'https://i.imgur.com/ih2BpOE.jpg',
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                price: 20
            },
            {
                menuId: 3,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 4,
                name: "Mediterranean Chopped Salad ",
                image: 'https://i.imgur.com/Z8X8Y9q.jpg',
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                price: 10
            },
            {
                menuId: 5,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 6,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
        ]
    },
    {
        id: 3,
        title: "Oodle Chinese",
        rating: 4.9,
        deliveryTime: '15 - 30 min',
        description: 'Shrimp • Spicy • Chips',
        image: "https://i.imgur.com/Zv2ihAb.jpg",
        menu: [
            {
                menuId: 1,
                name: "Big Mac",
                image: 'https://i.imgur.com/RfJSoMx.png',
                description: "Two 100% beef patties, a slice of cheese, lettuce, onion and pickles.",
                price: 3.19
            },
            {
                menuId: 2,
                name: "Tomato & Basil Pizza",
                image: 'https://i.imgur.com/ih2BpOE.jpg',
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                price: 20
            },
            {
                menuId: 3,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 4,
                name: "Mediterranean Chopped Salad ",
                image: 'https://i.imgur.com/Z8X8Y9q.jpg',
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                price: 10
            },
            {
                menuId: 5,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
            {
                menuId: 6,
                name: "Tomato Pasta",
                image: "https://i.imgur.com/dE0Vnwp.jpg",
                description: "Pasta with fresh tomatoes",
                price: 10
            },
        ]
    }
]

const Usuals = () => {
    const navigation = useNavigation();

    return (
        <FlatList
            style={{flexGrow: 0, paddingLeft: 25}}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigation.navigate('MenuPage', { restaurantData: item })}
                style={{ margin: 2, 
                    borderRadius: 12, 
                    width: 275, 
                    height: 168, 
                    backgroundColor: '#343434', 
                    marginRight: item.id == 3 ? 45 : 10,}}>
                    <View>
                        <View style={tw`mx-1`}>
                            <Image 
                                style={{ width: 275, height: 115, resizeMode: 'cover', right: 4, borderTopLeftRadius: 12, borderTopRightRadius: 12}} 
                                source={{ uri: item.image }}
                            />
                        </View>
                        <View style={styles.restaurantDescription}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, paddingTop: 5, paddingLeft: 12}}>{item.title}</Text>
                            <Text style={{fontSize: 10, color: 'white', marginTop: 8}}>{item.deliveryTime}</Text>
                        </View>
                        <View style={styles.restaurantDescription}>
                            <Text style={{marginLeft: 5, color: 'white', fontSize: 10, paddingLeft: 12}}>{item.description}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize: 10, color: 'white', marginTop: 5, fontWeight: 'bold'}}>{item.rating} </Text>
                                <Icon name='star' 
                                    type='ionicon'  
                                    iconStyle={styles.starIcon} 
                                    size={10} 
                                    color='transparent'/>
                            </View>
                        </View>  
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    restaurantDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginRight: 21
    },
    starIcon: {
        marginTop: 6,
        marginLeft: 2,
        color: '#EF6C00',
    }
})

//tw`p-2 px-5 m-2 rounded-xl mb-5`

export default Usuals;


