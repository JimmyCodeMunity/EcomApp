import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Animated ,{FadeInDown} from 'react-native-reanimated';


export default function Categories({email,handleModal,logstate}) {
    const navigation = useNavigation();


    const categories = [

        {
            id: 1,
            title: "Computers and Laptops",
            color: "#FF6347",
            image: require("../assets/mac.jpg"),
            icon: "log-in",
        },
        {
            id: 2,
            title: "UPS",
            color: "#4169E1",
            image: require("../assets/UPS.png"),
            icon: "search",
        },
        {
            id: 3,
            title: "Accessories",
            color: "#4169E1",
            image: require("../assets/access.jpg"),
            icon: "search",
        },
        {
            id: 4,
            title: "Cloths",
            color: "#32CD32",
            image: require("../assets/cloths.png"),
        },
        {
            id: 5,
            title: "Shoes",
            color: "#FF8C00",
            image: require("../assets/shoes.jpeg"),
        },
        {
            id: 6,
            title: "Gifts",
            color: "#FF8C00",
            image: require("../assets/watch.png"),
        },
        {
            id: 7,
            title: "Pet Care",
            color: "#FF8C00",
            image: require("../assets/pet.jpg"),
        },
        {
            id: 8,
            title: "Mobile and Tablets",
            color: "#FF8C00",
            image: require("../assets/mobtab.jpg"),
        },
        {
            id: 9,
            title: "Music and Gaming",
            color: "#FF8C00",
            image: require("../assets/music.png"),
        },
        {
            id: 10,
            title: "Others",
            color: "#FF8C00",
            image: require("../assets/others.png"),
        },
    ];
    return (
        
            <View
                style={styles.cats}

            >
                <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.cardContainer} className="flex-row flex-wrap justify-between m-1 space-y-5 space-x-1 items-center">
                    {categories.map((item) => (
                        <TouchableOpacity
                            onPress={() => {logstate ?navigation.navigate("Category", {
                                categoryName: item.title,
                                categoryImage: item.image,
                                email,
                            }) : handleModal() }
                                
                            }
                            key={item.id}
                        >
                            <View style={styles.card} className="p-3 rounded-full" key={item.id}>

                                <Image
                                    source={item.image}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <Text>{item.title.length > 8 ? item.title.slice(0, 8) + '...' : item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            </View>
        
    )
}


const styles = StyleSheet.create({
    
    image:{
        height:60,
        width:60,
        
    },
    

})