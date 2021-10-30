import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default function YourCart({ route }) {
    const navigation = useNavigation();
    const { restaurantData, orderItems } = route.params;
    const { width, height } = Dimensions.get("window");
    const [paymentMethod, setPaymentMethod] = useState({ selected: false, paymentMethod: null });
    const [orderPrice, setOrderPrice] = useState(0);
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 40, 118)
    const translateY = diffClamp.interpolate({
        inputRange:[0, 10],
        outputRange:[-10, 0]
    })
    const scrollRef = useRef();
    const date = new Date()


    console.log(orderItems.filter(a => a.menuId == 1 && a.qty >= 1))

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <TouchableOpacity style={{marginLeft: -8}}
                    onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" type='ionicon' size={30} color="white"/>
                </TouchableOpacity>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: 15, flexWrap: 'wrap', maxWidth: width - 40, maxHeight: 42}}>{restaurantData.title}</Text>
            </View>
        )
    }

    function userOrderItems() {
        return (
            <View style={{paddingVertical: 20}}>
                { //orderItems.filter(a => a.menuId == item.menuId).length >= 1)
                    restaurantData.menu.map((item, index) => (
                        <View>
                            { orderItems.filter(a => a.menuId == item.menuId && a.qty >= 1 ).length >= 1 && 
                                <View
                                    key={`menu-${index}`}
                                    style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10  }}
                                >
                                    <View>
                                        {/* Food Image */}
                                        <Image 
                                            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 24}} 
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
                                        }}
                                    >
                                        <Text style={{ marginVertical: 5, textAlign: 'left', fontWeight: 'bold', fontSize: 16, color: 'white', lineHeight: 17}}>{item.name}</Text>
                                        <Text style={{ fontSize: 11, lineHeight: 12, color: 'rgba(243, 244, 246, 0.9)', paddingRight: 40 }}>{item.description}</Text>
                                        <Text style={{ fontSize: 13, lineHeight: 18, color: 'rgba(243, 244, 246, 1)', paddingRight: 40,fontWeight: 'bold' }}>£ {item.price}</Text>
                                    </View>

                                    {/* Amount */}
                                    <View
                                        style={{
                                            width: 32,
                                            height: 32,
                                            backgroundColor: '#3BCF96',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 8
                                        }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#F3F4F6' }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                </View>
                            }
                        </View>
                    )) 
                }
            </View>
        );
    };

    function OrderInformation() {
        return (
            
            <View>
                {/* Order Price */}
                <Text style={{ color: 'white', 
                               fontWeight: 'bold', 
                               fontSize: 20, 
                               marginBottom: 12}}>Summery £ {sumOrder()}</Text>
                
                {/* Delivery Button */}
                <View style={
                    { width: 75, 
                      height: 25, 
                      backgroundColor: 'rgba(59, 207, 150, 0.4)', 
                      borderRadius: 12, borderWidth: 2, 
                      borderColor: '#0DC4B4',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center'}
                }>
                    <Text style={{ color: 'white', fontSize: 12, lineHeight: 13.5 }}>Delivery</Text>
                </View>

                {/* Restaurant location and google maps view */}
                <View style={{ flexDirection: 'row' }}>
                    <Image
                            source={{ uri: 'https://i.imgur.com/Vkrk5uP.png' }}
                            style={{ width: 177, height: 85, resizeMode: 'cover', marginTop: 15}}/>
                    
                    <View style={{flexDirection:'column'}}>
                        <Text style={{  marginTop: 15, 
                                        marginLeft: 10, 
                                        fontSize: 18, 
                                        color: 'white', 
                                        fontWeight: 'bold'}}>{restaurantData.title}</Text>
                        <Text style={{  marginLeft: 10, 
                                        fontSize: 12, 
                                        color: 'rgba(243, 244, 246, 0.8)', 
                                        }}>Wingstone Road</Text>
                    </View>
                </View>
                
                {/* Estimated Delivery Time */}
                <View style={{ marginTop: 25, }}>
                    <Text style={{
                        color: 'white', 
                        fontWeight: 'bold', 
                        fontSize: 20
                    }}>Estimated Delivery Time</Text>
                    <Text style={{
                        color: 'white', 
                        fontWeight: 'bold', 
                        fontSize: 18,
                        marginLeft: 5
                    }}>{restaurantData.deliveryTime}</Text>
                </View>
            </View>
        );
    };

    function PaymentMethod() {
        return (
            <View style={{ marginVertical: 65 }}>
                <Text style={{ color: 'white', 
                               fontWeight: 'bold', 
                               fontSize: 20, 
                               }}>Select Payment Method</Text>
                
                <TouchableOpacity onPress={() => {
                    setOrderPrice(sumOrder())

                    if(paymentMethod.selected) 
                        setPaymentMethod({ selected: false, paymentMethod: null })
                    else {
                        setPaymentMethod({ selected: true, paymentMethod: { type: 'Card', image: 'https://i.imgur.com/gMT07Ze.png'}})
                        scrollRef.current?.scrollTo({ y : 0, animated : true })
                    }
                    //paymentMethod.selected ? 
                    //    setPaymentMethod({ selected: false, paymentMethod: null }) : 
                    //        setPaymentMethod({ selected: true, paymentMethod: { type: 'card', name: 'visa'}})
                }}>
                    <View style={{ marginTop: 10, 
                        marginBottom: 120,
                        paddingRight: 25,
                        borderRadius: 12, 
                        paddingHorizontal: 15,
                        width: width - 40, 
                        height: 55, 
                        backgroundColor: !paymentMethod.selected ? '#343434' : 'rgba(90, 90, 90, 0.8)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center', }}>
                            <Image source={{ uri: 'https://i.imgur.com/gMT07Ze.png'}} style={{ height: 55, width: 55}}/>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, marginLeft: -10}}>**** **** **** 0128</Text>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>06/22</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#242424', flex: 1}}>
            <Animated.ScrollView style={styles.container} onScroll={(e) => { 
                scrollY.setValue(e.nativeEvent.contentOffset.y)
             }} ref={scrollRef}>
                {renderHeader()}
                {userOrderItems()}
                {OrderInformation()}
                {PaymentMethod()}
            </Animated.ScrollView>
            {/* Make an order button */}
            <Animated.View style={{
                    position: 'absolute',
                    marginHorizontal: 20,
                    bottom: 25,
                    width: width - 40, 
                    flexDirection: 'row', 
                    height: 55, 
                    backgroundColor: 'transparent', 
                    marginBottom: 25, 
                    borderRadius: 12,
                    zIndex: 50,
                    transform: [
                        {translateY: translateY}
                    ] }}>
                    
                    <LinearGradient start={{x: 0, y: 0.5}} 
                        end={{x: 1, y: 0.5}} 
                        colors={['#0DC4B4', '#3BCF96']} 
                        style={{ borderRadius: 12, opacity: !paymentMethod.selected ? 0.5 : 1}}>
                        {/* Order Button */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('OrderConfirmation', { 
                                    restaurantData: restaurantData, 
                                    paymentMethod:  paymentMethod,
                                    price: orderPrice,
                                    hour: `${date.getHours()}:${date.getMinutes().toLocaleString()}`,
                                    day: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                })
                            }}
                            style={{
                                width: width - 40,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 18
                            }}
                            disabled={!paymentMethod.selected}>
                                <Text style={{ color: 'white',  
                                    fontSize: 18, 
                                    lineHeight: 20,
                                    fontWeight: 'bold', }}>Make an Order</Text>
                        </TouchableOpacity>
                    </LinearGradient>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //paddingVertical: 50,
        paddingTop: 50,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#242424'
    }
})
