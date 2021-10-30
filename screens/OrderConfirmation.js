import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { color } from 'react-native-elements/dist/helpers';

export default function OrderConfirmation({ route }) {
    const navigation = useNavigation();
    const { restaurantData, paymentMethod, price, hour, day } = route.params;
    const { width, height } = Dimensions.get("window");
    const [loaded, setLoaded] = useState(false)


    function renderHeader() {
        return <View>
            <Text style={{ fontWeight: 'bold',
                fontSize: 30,
                paddingTop: 50,
                color: '#F3F4F6' }}>Order Confirmation</Text>
        </View>
    }

    const orderData = [
        {
            id: 1,
            name: 'Order Number',
            value: 12345678
        },
        {
            id: 2,
            name: 'Delivery Time',
            value: restaurantData.deliveryTime
        },
        {
            id: 3,
            name: 'Payment Method',
            value: paymentMethod.paymentMethod.type,
            image: paymentMethod.paymentMethod.image
        }
    ]



    function navigationButtons() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: height - 80, left: width - 365}}>

                {/* Track Your Order Button */}
                <TouchableOpacity onPress={() => navigation.navigate('TrackingPage', {
                    orderNumber: orderData.map((item, index) => {
                        if(item.id == 1) return item.value
                    })
                })}>
                    <View style={styles("trackYourOrder").NavButtons}>
                        <Text style={{color: '#3BCF96', fontSize: 16, fontWeight: 'bold', maxWidth: 123}}>Track Your Order</Text>
                    </View>
                </TouchableOpacity>

                {/* Home Button */}
                <LinearGradient 
                start={{x: 0, y: 0.5}} 
                end={{x: 1, y: 0.5}} 
                colors={['#0DC4B4', '#3BCF96']} 
                style={{ borderRadius: 12}}>
                
                <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                    <View style={styles('home').NavButtons}>
                            <Text style={styles("home").NavButtonsText}>Home</Text>
                    </View>
                </TouchableOpacity>

                </LinearGradient>
            </View>
        )
    }

    function RenderReceipt() {
        return (
            <ImageBackground 
            source={{ uri: 'https://i.imgur.com/7mEZ9Y1.png'}} 
            style={{
                width: width - 40, 
                height: height * 0.5, 
                resizeMode: 'cover',
                marginTop: 40 }}
            onLoad={() => setLoaded(true)}>
                {loaded && 
                    <View style={{paddingHorizontal: 25, paddingVertical: 15}}>
                        {/* Order Date */}
                        <View style={{ alignItems: 'flex-end', }}>
                            <Text style={styles().receiptDateText}>{day}</Text>
                            <Text style={styles().receiptDateText}>{hour}</Text>
                        </View>

                        {/* Restaurant Name */}
                        <Text 
                            style={{
                                fontSize: 22, 
                                fontWeight: 'bold', 
                                color: 'white',
                                marginTop: height * 0.1 - 70 }}>
                                    {restaurantData.title}
                        </Text>
                        
                        {/* Order Information */}
                        <View style={{marginTop: 40}}>
                            { orderData.map((item) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}} key={item.id}>
                                    <Text style={styles().orderInformationText}>{item.name}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {item?.image ? <Image source={{ uri: paymentMethod.paymentMethod.image}} style={{ height: 40, width: 40, bottom: 8, right: 5 }}/> : null}
                                        <Text style={styles().orderInformationText}>{item.value}</Text>
                                    </View>
                                </View>
                            )) }
                        </View>

                        <View
                              style={{
                                borderBottomColor: 'rgba(243, 244, 246, 0.5)',
                                borderBottomWidth: 1,
                                marginTop: 35
                              }}
                            />

                        {/* Total Price */}

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 }}>
                            <Text style={styles("total").totalText}>Total</Text>
                            <Text style={styles("price").totalText}>£ { price }</Text>
                        </View>
                    </View>
                }
            </ImageBackground>
        )
    }

    return (
        <View style={styles().container}>
            {renderHeader()}
            {RenderReceipt()}
            {navigationButtons()}
        </View>
    )
}

const styles = (props) => StyleSheet.create({
    container: {
        backgroundColor: '#242424', 
        flex: 1, 
        paddingTop: 25, 
        paddingHorizontal: 20
    },
    NavButtons: {
        borderRadius: 12, 
        borderColor: '#3BCF96', 
        borderWidth: props == 'home' ? 0 : 2, 
        padding: 16, 
        width: 160,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
        maxHeight: 60,
        marginRight: props == 'trackYourOrder' ? 20 : 0
    },
    NavButtonsText: {
        color: props == 'home' ? 'white' : '#3BCF96', 
        fontSize: 16, 
        fontWeight: 'bold'
    },
    receiptDateText: {
        color: 'white', 
        lineHeight: 18,
        fontWeight: 'bold'
    },
    orderInformationText: {
        fontWeight: 'bold', color: 'white', fontSize: 14
    },
    totalText: {
        color: props == 'price' ? '#3BCF96' : 'white', 
        fontSize: 28, 
        fontWeight: 'bold'
    }
})


/*
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>Order Number</Text>
                                <Text>12345678</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>Delivery Time</Text>
                                <Text>{restaurantData.deliveryTime}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>Payment Method</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={{ uri: paymentMethod.paymentMethod.image}} style={{ height: 28, width: 28 }}/>
                                    <Text>{paymentMethod.paymentMethod.type}</Text>
                                </View>
                            </View> */

