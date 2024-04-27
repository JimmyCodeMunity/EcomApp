import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Animated ,{FadeInDown} from 'react-native-reanimated';
import axios from 'axios'


export default function Categories({email,handleModal,logstate}) {
    const navigation = useNavigation();
    const [categories,setCategories] = useState([])


    const getCategories = async()=>{
        const response = await axios.get('https://res-server-sigma.vercel.app/api/category/allcategories')
        const categorydata = response.data;
        setCategories(categorydata);
        // console.log("categories",categorydata)
    }
    useEffect(()=>{
        getCategories()
    },[])


    // const categories = [

    //     {
    //         id: 1,
    //         title: "Computers and Laptops",
    //         color: "#FF6347",
    //         image: require("../assets/categories.png"),
    //         icon: "log-in",
    //     },
    //     {
    //         id: 2,
    //         title: "UPS",
    //         color: "#4169E1",
    //         image: require("../assets/categories.png"),
    //         icon: "search",
    //     },
    //     {
    //         id: 3,
    //         title: "Accessories",
    //         color: "#4169E1",
    //         image: require("../assets/categories.png"),
    //         icon: "search",
    //     },
    //     {
    //         id: 4,
    //         title: "Cloths",
    //         color: "#32CD32",
    //         image: require("../assets/categories.png"),
    //     },
    //     {
    //         id: 5,
    //         title: "Shoes",
    //         color: "#FF8C00",
    //         image: require("../assets/shoes.jpeg"),
    //     },
    //     {
    //         id: 6,
    //         title: "Gifts",
    //         color: "#FF8C00",
    //         image: require("../assets/watch.png"),
    //     },
    //     {
    //         id: 7,
    //         title: "Pet Care",
    //         color: "#FF8C00",
    //         image: require("../assets/pet.jpg"),
    //     },
    //     {
    //         id: 8,
    //         title: "Mobile and Tablets",
    //         color: "#FF8C00",
    //         image: require("../assets/mobtab.jpg"),
    //     },
    //     {
    //         id: 9,
    //         title: "Music and Gaming",
    //         color: "#FF8C00",
    //         image: require("../assets/music.png"),
    //     },
    //     {
    //         id: 10,
    //         title: "Others",
    //         color: "#FF8C00",
    //         image: require("../assets/others.png"),
    //     },
    // ];
    return (
        
            <View
                style={styles.cats}

            >
                <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.cardContainer} className="flex-row flex-wrap justify-between m-1 space-y-5 space-x-1 items-center">
                    {categories.map((item) => (
                        <TouchableOpacity
                            onPress={() => {logstate ?navigation.navigate("Category", {
                                categoryName: item.name,
                                email,
                            }) : handleModal() }
                                
                            }
                            key={item.id}
                        >
                            <View style={styles.card} className="p-3 rounded-full" key={item.id}>

                                <Image
                                    source={require('../assets/categories.png')}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <Text>{item.name.length > 8 ? item.name.slice(0, 8) + '...' : item.name}</Text>
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