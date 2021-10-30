import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image,StyleSheet, AsyncStorage } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';

const YourLiked = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])

    useEffect(async() => {
        let val = await AsyncStorage.getItem('likedRestaurants');
        setData(JSON.parse(val))
    })


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

export default YourLiked;


