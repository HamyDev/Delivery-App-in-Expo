import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Text, View, FlatList, TouchableOpacity, Image, Dimensions, PixelRatio } from 'react-native'
import tw from 'tailwind-react-native-classnames';


const data = [
    {
        id: 1,
        title: "Get free delivery on next order",
        image: "https://i.imgur.com/DVnDy0C.png",
        screen: "MapScreen",
        backgroundColor: '#F45959',
        pos: {
            right: 6.5,
            bottom: PixelRatio.get() >= 2.8 ? -3 : 10,
            borderRadius: PixelRatio.get() >= 2.8 ? 20 : 23,
        }
    },
    {
        id: 2,
        title: "Buy one get one free",
        image: "https://i.imgur.com/oRIOaUK.png",
        screen: "EatsScreen",
        backgroundColor: '#F8CE45',
        pos: {
            right: 6.5,
            bottom: -8,
            borderRadius: 0,
        }
    },
    {
        id: 3,
        title: "Get free utencils with every order",
        image: "https://i.imgur.com/n71yKuW.png",
        screen: "PackageScreen",
        backgroundColor: '#0184F7',
        pos: {
            right: 5,
            bottom: PixelRatio.get() >= 2.8 ? -18 : -5,
            borderRadius: 20,
        }
    }
]

const Promos = () => {
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation();

    return (
        <FlatList
            style={{flexGrow: 0, paddingLeft: 25,}}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={{padding: 2, 
                    backgroundColor: item.backgroundColor, 
                    marginRight: item.id == 3 ? 45 : 10, 
                    borderRadius: 12, maxWidth: 130, 
                    maxHeight: 168 }}>
                    <View>
                        <Text 
                            style={{
                                color: 'white', 
                                fontWeight: 'bold', 
                                fontSize: 14, 
                                paddingVertical: 14, 
                                paddingLeft: 8, 
                                marginRight: 20}}>{item.title}</Text>
                        <View style={tw`mx-1`}>
                            <Image 
                                style={{ 
                                    width: 130, 
                                    height: 96, 
                                    resizeMode: 'contain', 
                                    right: item.pos.right, 
                                    bottom: item.pos.bottom, 
                                    borderRadius: item.pos.borderRadius}} 
                                source={{ uri: item.image }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

//tw`p-2 px-5 m-2 rounded-xl mb-5`

export default Promos;


