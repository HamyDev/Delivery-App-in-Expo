import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground, Animated, SafeAreaView, AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { LinearGradient } from 'expo-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';

export default function MenuPage({ route }) {
    const navigation = useNavigation();
    const { restaurantData } = route.params;
    const [heart, setHeart] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const { width, height } = Dimensions.get("window");
    const [ showSmallFoodInfo, setShowSmallFoodInfo ] = useState(
        { shown: false, info: {} } );

    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 10, 120)
    const translateY = diffClamp.interpolate({
        inputRange:[0, 10],
        outputRange:[-25, 0]
    })
    const scrollRef = useRef();
    const [currentLocalStorageData, setCurrentLocalStorageData] = useState([]);


    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function showButton() {
        return getBasketItemCount() > 0 ? true : false
    }

    useEffect(async () => {
        let val = await AsyncStorage.getItem('likedRestaurants');
        setCurrentLocalStorageData(JSON.parse(val))
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price,
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <ImageBackground 
                style={styles.restaurantImage} 
                source={{ uri: restaurantData.image }}>

            <View style={styles.options}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={tw`top-10 left-4 z-40 p-2 rounded-full shadow-lg bg-gray-100 mt-5`}>
                    <Icon name="chevron-back" type='ionicon' color='#242424' size={22}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={async() => {
                        setHeart(!heart)

                        let currentRestaurant = currentLocalStorageData.filter((val) => val.id == restaurantData.id )

                        console.log(currentRestaurant, 'currentRestaurant')
                        

                        



                        //let stringifyRestaurantData
                        //if(currentLocalStorageData) {
                        //    stringifyRestaurantData = JSON.stringify(
                        //        [   
                        //            ...currentLocalStorageData,
                        //            { 
                        //                id: restaurantData.id,
                        //                title: restaurantData.title,
                        //                rating: restaurantData.rating,
                        //                deliveryTime: restaurantData.deliveryTime,
                        //                description: restaurantData.description,
                        //                image: restaurantData.image,
                        //                menu: restaurantData.menu,
                        //            }
                        //        ]
                        //    )
                        //} else {
                        //    stringifyRestaurantData = JSON.stringify(
                        //        [   
                        //            { 
                        //                id: restaurantData.id,
                        //                title: restaurantData.title,
                        //                rating: restaurantData.rating,
                        //                deliveryTime: restaurantData.deliveryTime,
                        //                description: restaurantData.description,
                        //                image: restaurantData.image,
                        //                menu: restaurantData.menu,
                        //            }
                        //        ]
                        //    )
                        //}
                        //await AsyncStorage.setItem(
                        //    'likedRestaurants',
                        //    stringifyRestaurantData
                        //)
                    }}
                    style={tw`top-10 right-4 z-40 p-2 rounded-full shadow-lg bg-gray-100 mt-5`}>
                    <Icon name={heart ? "heart" : 'heart-outline'} type='ionicon' color={heart ? 'red' : '#242424'} size={22} />
                </TouchableOpacity>
            </View>

                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{restaurantData.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', }}>
                        <Text style={styles.restaurantDesc}>{restaurantData.description}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={styles.restaurantRating}>{restaurantData.rating}</Text>
                            <Icon name='star' 
                                    type='ionicon'  
                                    iconStyle={styles.starIcon}
                                    size={14} />
                        </View>
                    </View>
                    <Text style={{fontSize: 12, color: 'white', marginTop: 2}}>{restaurantData.deliveryTime}</Text>
                </View>

            </ImageBackground>
        )
    }

    const LeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.leftAction}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Added to Cart</Animated.Text>
            </View>
        )
    }

    function renderSmallFoodInfo() {
        return (
            <Animated.View style={[styles.SmallFoodInfo, { transform: [ { translateY: translateY } ] } ]}>

                <View style={{ flexDirection: 'row'}}>
                    <View>
                        {/* Food Image */}
                        <Image 
                            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 24, marginVertical: 10}} 
                            source={{ uri: showSmallFoodInfo.info.image }}
                        />
                    </View>

                    {/* Name & Description */}
                    <View
                        style={{
                            width: width,
                            alignItems: 'flex-start',
                            marginTop: 15,
                            paddingHorizontal: 20,
                            flex: 1,
                            marginVertical: 12
                        }}
                    >
                        <Text style={{ marginVertical: 5, textAlign: 'left', fontWeight: 'bold', fontSize: 16, color: 'white'}}>{showSmallFoodInfo.info.name}</Text>
                        <Text style={{ fontSize: 12, lineHeight: 13, color: 'rgba(243, 244, 246, 0.9)', paddingRight: 40 }}>{showSmallFoodInfo.info.desc}</Text>
                        <Text style={{ fontSize: 13, lineHeight: 18, color: 'rgba(243, 244, 246, 1)', paddingRight: 40,fontWeight: 'bold' }}>£ {showSmallFoodInfo.info.price}</Text>
                    </View>
                </View>

                <Swipeable renderLeftActions={LeftActions} onSwipeableLeftOpen={() => {
                    console.log('item added to cart')
                    editOrder("+", showSmallFoodInfo.info.menuId, showSmallFoodInfo.info.price)
                }}>
                    <View style={{ 
                        backgroundColor: '#3BCF96', 
                        paddingVertical: 10,
                        paddingHorizontal: 10, 
                        borderRadius: 12, 
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: width - 40, }}>
                        <Icon type="ionicons" name='arrow-forward' color='white' size={24} style={{maxHeight: 24, marginTop: -3, marginRight: 12}}/>
                        <Text style={{ color: 'white',  fontSize: 18, lineHeight: 22, fontWeight: 'bold'}}>Swipe to Add to Cart</Text>
                    </View>
                </Swipeable>
            </Animated.View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                ref={scrollRef}
                onScroll={(e) => { 
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                scrollEventThrottle={0}
                showsHorizontalScrollIndicator={false}>
                    {renderHeader()}
                    <Text style={styles.FeaturedText}>Featured</Text>
                    {   
                        restaurantData.menu.map((item, index) => (
                            <TouchableOpacity
                            key={`menu-${index}`}
                            onPress={() => {
                                if(!showSmallFoodInfo.shown) {
                                    setShowSmallFoodInfo(
                                        {
                                            shown: true,
                                            info: {
                                                name: item.name,
                                                desc: item.description,
                                                image: item.image,
                                                menuId: item.menuId,
                                                price: item.price
                                            }
                                        }
                                    )
                                } else setShowSmallFoodInfo({ shown: false, info: {} })
                            }}>
                                <View
                                    style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#343434', borderRadius: 12, marginVertical: 5, marginHorizontal: 10  }}
                                >
                                    <View>
                                        {/* Food Image */}
                                        <Image 
                                            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 24, marginVertical: 10}} 
                                            source={{ uri: item.image }}
                                        />

                                    </View>

                                    {/* Name & Description */}
                                    <View
                                        style={{
                                            width: width,
                                            alignItems: 'flex-start',
                                            marginTop: 15,
                                            paddingHorizontal: 20,
                                            flex: 1,
                                            marginVertical: 12
                                        }}
                                    >
                                        <Text style={{ marginVertical: 5, textAlign: 'left', fontWeight: 'bold', fontSize: 16, color: 'white'}}>{item.name}</Text>
                                        <Text style={{ fontSize: 11, lineHeight: 12, color: 'rgba(243, 244, 246, 0.9)', paddingRight: 40 }}>{item.description}</Text>
                                        <Text style={{ fontSize: 13, lineHeight: 18, color: 'rgba(243, 244, 246, 1)', paddingRight: 40,fontWeight: 'bold' }}>£ {item.price}</Text>
                                    </View>

                                    <View
                                        style={{
                                            width: 28,
                                            height: 28,
                                            backgroundColor: '#3BCF96',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 8
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#F3F4F6' }}>{getOrderQty(item.menuId)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
            </Animated.ScrollView>
        )
    }

    function renderOrder() {
        return (
            <View>
                {showButton() > 0 && 
                <Animated.View
                    style={{transform: [ { translateY: translateY } ], alignItems: 'center', alignContent: 'center', backgroundColor: 'transparent', position: 'absolute', bottom: showSmallFoodInfo.shown ? height - height * 0.75 : height - height * 0.95, left: width - width * 0.95, zIndex: 50}}>
                    <LinearGradient start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} colors={['#0DC4B4', '#3BCF96']} style={{ borderRadius: 12}}>
                        {/* Order Button */}
                        <TouchableOpacity
                            style={{
                                width: width * 0.9,
                                paddingVertical: 10,
                                paddingHorizontal: 22,
                                //backgroundColor: '#3BCF96',

                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            onPress={() => navigation.navigate("YourCart", {
                                restaurantData: restaurantData,
                                orderItems: orderItems,
                                setOrderItems,
                            })}>
                                <Text style={{ color: 'white',  fontSize: 18, lineHeight: 22, fontWeight: 'bold' }}>{getBasketItemCount()} items in Cart</Text>
                                <Text style={{ color: 'white',  fontSize: 18, lineHeight: 22, fontWeight: 'bold' }}>£ {sumOrder()}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderFoodInfo()}
            {renderOrder()}
            {showSmallFoodInfo.shown ? renderSmallFoodInfo() : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: 10,
        backgroundColor: '#242424',
    },
    backArrow: {
        marginTop: 6,
        marginLeft: 2,
        color: 'black',
        paddingTop: 25,
        paddingHorizontal: 10,
    }, 
    restaurantImage: {
        width: Dimensions.get('window').width,
        height: 175,
        resizeMode: 'cover',
        right: 9.5,
        marginBottom: 75
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
    },
    restaurantInfo: {
        marginLeft: 20,
        marginTop: 70,
        borderRadius: 16,
        backgroundColor: '#343434',
        width: Dimensions.get('window').width - 40,
        height: 100,
        paddingHorizontal: 18,

    },
    restaurantName: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20,
        paddingTop: 16
    },
    restaurantDesc: {
        fontSize: 12, 
        color: 'white', 
        marginTop: 10
    },
    restaurantRating: {
        fontSize: 12, 
        color: 'white', 
        marginTop: 10
    },
    starIcon: {
        marginTop: 8.5,
        marginLeft: 2,
        color: '#EF6C00',
    },
    FeaturedText: {
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#F3F4F6'
    },
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 12,
        marginRight: 18
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        fontSize: 16
    },
    SmallFoodInfo: { 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height * 0.3, 
        paddingLeft: 20,
        paddingTop: 10, 
        paddingBottom: 25, 
        backgroundColor: 'rgba(52, 52, 52, 1)', 
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        position: 'absolute', 
        top: Dimensions.get('window').height * 0.78 }
})


/*
return (
        <View style={styles.container}>
            <ImageBackground 
                style={styles.restaurantImage} 
                source={{ uri: image }}>
                <View style={styles.options}>
                    <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            style={tw`top-8 left-4 z-40 p-3 rounded-full shadow-lg bg-gray-100`}>
                        <Icon name="chevron-back" type='ionicon'/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                            onPress={() => setHeart(!heart)}
                            style={tw`top-8 p-3 rounded-full shadow-lg bg-gray-100 right-4`}>
                        <Icon name={heart ? 'heart' : 'heart-outline'} type='ionicon'/>
                    </TouchableOpacity>
                </View>

                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', }}>
                        <Text style={styles.restaurantDesc}>{description}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={styles.restaurantRating}>{rating}</Text>
                            <Icon name='star' 
                                    type='ionicon'  
                                    iconStyle={styles.starIcon}
                                    size={14} />
                        </View>
                    </View>
                    <Text style={{fontSize: 12, color: 'white', marginTop: 2}}>{deliveryTime}</Text>
                </View>

            </ImageBackground>


            <View>
            </View>
        </View>
    )

*/

/*
<TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon 
                    type='ionicon' 
                    name='chevron-back'
                    iconStyle={styles.backArrow}  
                    size={28} 
                    color='transparent'/>
            </TouchableOpacity> */
