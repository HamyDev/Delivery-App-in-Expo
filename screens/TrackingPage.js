import React, {useState} from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';


export default function TrackingPage({ route, navigation }) {
    const { width, height } = Dimensions.get("window");
    const { orderNumber } = route.params;
    const [loaded, setLoaded] = useState(false);

    const data = [
        { title: 'Confirmed', letter: 'A', isCurrent: true },
        { title: 'Preparing', letter: 'B', isCurrent: true },
        { title: 'On The Way', letter: 'C', isCurrent: true, showMap: true },
        { title: 'Delivered', letter: 'D', isCurrent: false },
        { title: 'Rate us', letter: 'E', isCurrent: false },
      ];

    function renderHeader() {
        return (
            <View>
                <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>Tracking</Text>

                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', marginHorizontal: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Order Number</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'rgba(243, 243, 243, 1)'}}> { orderNumber }</Text>
                </View>
            </View>
        )
    }

    function renderProgress() {
        if (!data || data.lenght === 0) return null;
  
        return (
          <View style={{ flex: 1, marginTop: 20, alignItems: 'center', marginLeft: Dimensions.get('window').width * 0.3 }}>
            {data.map((item) => (
                <View style={styles.itemWrap} key={item.letter}>
                  {item?.showMap && item.isCurrent ? 
                  <Image
                  source={{ uri: 'https://i.imgur.com/Vkrk5uP.png' }}
                  style={{ width: 147, height: 147, resizeMode: 'cover', marginRight: 10, marginLeft: -157, borderRadius: 12}}/>
                  : null}
                  <View
                    style={{ backgroundColor: item.isCurrent ? '#3BCF96' : '#343434', height: item.isCurrent ? 50 : 40, width: item.isCurrent ? 50 : 40, borderRadius: 69, alignItems: 'center'}}>
                        { item.letter == 'A' && item.isCurrent ? 
                            <Icon type='ionicon' name='checkmark-done' size={30} style={{marginTop: 9, marginLeft: 1}}/>
                        : null}

                        { item.letter == 'B' && item.isCurrent ? 
                            <Icon type='ionicon' name='clipboard-outline' size={30} style={{marginTop: 8.5, marginLeft: 1}}/>
                        : null}
                        
                        { item.letter == 'C' && item.isCurrent ? 
                         <Image source={{ uri: 'https://i.imgur.com/h3mh7gb.png'}} style={{ width: 35, height: 35, marginTop: 7.5}}/>
                        : null}

                        { item.letter == 'D' && item.isCurrent ? 
                            <Icon type='ionicon' name='checkmark-circle-outline' size={35} style={{marginTop: 6, marginLeft: 2}}/>
                        : null}

                        { item.letter == 'E' && item.isCurrent ? 
                            <Icon type='ionicon' name='star-outline' size={30} style={{marginTop: 7.5, marginLeft: 1}}/>
                        : null}
                  </View>
                  <View style={{ marginLeft: 5, flex: 1 }}>
                    <Text style={item.isCurrent ? styles.currentMarker : {color:'white', fontWeight: 'bold'}}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        );
    }

    function navigationButtons() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', left: 20, top: height * 0.85}}>

                {/* Home Button */}
                <LinearGradient 
                start={{x: 0, y: 0.5}} 
                end={{x: 1, y: 0.5}} 
                colors={['#0DC4B4', '#3BCF96']} 
                style={{ borderRadius: 12}}>
                
                <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                    <View style={{borderRadius: 12, 
                        padding: 16, 
                        width: width - 40,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center', 
                        maxHeight: 60,
                        marginRight: 0}}>
                            <Text style={{color: 'white', 
                                fontSize: 16, 
                                fontWeight: 'bold'}}>Home</Text>
                    </View>
                </TouchableOpacity>

                </LinearGradient>
            </View>
        )
    }

    return (
        <ImageBackground source={{ uri: 'https://i.imgur.com/zpXG2L6.png'}} style={styles.containerImage} onLoad={() => setLoaded(true)}>
            { loaded &&
                <View style={{ paddingHorizontal: 25}}>
                    {renderHeader()}
                    {renderProgress()}
                    {navigationButtons()}
                </View>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    containerImage: {
        paddingTop: 50,
        flex: 1, 
    },
    verticalLine: {
        backgroundColor: 'black',
        width: 2,
        height: '95%',
        position: 'absolute',
        marginLeft: 35,
        marginTop: 20,
      },
      verticalWrap: {
        justifyContent: 'space-between',
        height: '100%',
      },
      itemWrap: {
        width: 200,
        height: Dimensions.get('window').height * 0.12 ,
        marginLeft: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      pointWrap: {
        backgroundColor: 'black',
        height: 20,
        width: 20,
        marginLeft: 5,
        alignItems: 'center',
      },
      firstPoint: {
        backgroundColor: 'black',
        borderRadius: 20,
        height: 10,
        width: 10,
        marginLeft: 10,
      },
      markerText: { color: 'white' },
      currentMarker: { color: 'white', fontWeight: 'bold' },
})
