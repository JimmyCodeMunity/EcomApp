import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, Linking } from 'react-native';
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const PdfScreenCat = ({route,navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const {catname} = route.params;
  const link = `https://react-pdf-download-reseller.vercel.app/catlist/${catname}`;
  const [products,setProducts] = useState([]);


  const handleLinkClick = () =>{
    Linking.openURL(`https://react-pdf-download-reseller.vercel.app/catlist/${catname}`);
  }
  useEffect(() => {
    checkInternetConnection();

    // Show loader for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const checkInternetConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(()=>{
    getDownloadProducts();
  },[catname])


  const getDownloadProducts = async () =>{
    try {
      const response = await axios.get(`https://opasso-app-backend.vercel.app/api/product/productlistcategory/${catname}`);
      const collected = response.data;
      setProducts(collected);
      // console.log("products",collected);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <View className="justify-center items-center bg-white">
      <Text className="text-xl font-semibold tracking-wide">Download {catname} list</Text>
    </View>

    
      {!isConnected ? (
        <View style={styles.connectionErrorContainer}>
          <Text style={styles.connectionErrorText}>No internet connection</Text>
        </View>
      ) : isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView
            style={styles.loader}
            source={require('../assets/anim.json')} // Replace with your own loader animation file
            autoPlay
            loop
          />
          <Text>Please wait....</Text>
        </View>
      ) : (
        <WebView source={{ uri: link }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 200,
    height: 200,
  },
  connectionErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionErrorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PdfScreenCat;
