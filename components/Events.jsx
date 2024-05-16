import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, Text, Linking, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { urlFor } from '../sanity';
import { getEvents } from '../api';
import { useNavigation } from '@react-navigation/native';
import CarouselCard from './Card.jsx';
import ExplainCard from './ExplainCard.jsx';
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Events = () => {
    const [events, setEvents] = useState([]);
    const navigation = useNavigation();



    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const event = await axios.get('https://res-server-sigma.vercel.app/api/ads/allads');
                setEvents(event.data);
                //console.log('Events:', eventsData.length);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const eventsData = events.map((event) => ({
        title: event.title,
        description: event.description,
        supplier:event.supplier,
        
    }));

    const renderCarouselItem = ({ item }) => {
        
        return (
            <View>


                <TouchableWithoutFeedback className="">

                    <Image
                        className="rounded-3xl shadow-lg shadow-gray-900"
                        style={{
                            width: windowWidth * 0.9,
                            height: windowHeight * 0.3,
                        }}
                        source={{ uri: item.imageUri }}
                    />
                </TouchableWithoutFeedback>

            </View>
        );
    };

    // Conditionally render the Carousel only when there are more than 2 items
    if (eventsData.length > 0) {
        return (

            <View className="w-full mb-3">
                <Text className="text-slate-900 px-4 font-bold text-xl py-5">Ads&Discounts</Text>


                <Carousel
                    data={eventsData}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    inactiveSlideOpacity={0.8}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth * 0.85}
                    itemHeight={windowHeight * 0.3}
                    slideStyle={{ display: 'flex', alignItems: 'center' }}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                    // layout={'stack'}
                    layoutCardOffset={`18`}
                />

            </View>
        );
    } else {
        // Render something else or nothing if there are 2 or fewer items
        return (<ExplainCard />)
    }
};

const ProductCard = ({ item }) => {
    const navigation  = useNavigation()
    const handleEventPress = () => {
        Linking.openURL(item.link)
    }
    return (
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('eventdata',{
            itemName:item.title,
            supplier:item.supplier,
            itemDescription:item.description,
            
        })}>
            <View className="h-40 w-full rounded-3xl shadow-sm bg-black justify-center">
                <View className="flex-row justify-between items-center">
                    <View className="px-3 p-3" style={{ width: '50%' }}>
                        <Text className="text-2xl font-semibold text-white ">{item.title}</Text>
                        <Text className="text-normal text-slate-500 font-semibold">{item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description}</Text>
                        <View className="py-3">
                            
                        </View>
                    </View>
                    <View className="justify-center items-center" style={{ width: '30%', zIndex: -2 }}>
                        <Image source={require('../assets/user.jpeg')} className="h-16 w-16 my-1 rounded-full"/>
                        
                        
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default Events;
