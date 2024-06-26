import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Platform,
  BackHandler
} from "react-native";
import { Card } from "react-native-paper";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Icon from 'react-native-feather'
//import Svg, { Path } from 'react-native-svg';
import FeatherIcon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import GeneralSettings from "./SettingScreen";
import CarouselCard from "../components/Card";
import Test from "../components/Test";
import Categories from "../components/Categories";
import { useCurrency } from "../components/CurrencyProvider";
import Loader from "../components/loader";
import { getEvents, getUserdata } from "../api";
import { urlFor } from '../sanity'
import Deals from "../components/Deals";
import Events from "../components/Events";
import MenuModal from "../components/MenuModal";
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeOut, FadeOutLeft } from "react-native-reanimated";




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LandingScreen = ({ navigation, route }) => {
  // const { email } = route.params;
  const [products, setProducts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brand, setBrands] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [ip, setIp] = useState("192.168.8.153");
  const [trending, setTrending] = useState([1, 2, 3]);
  const [userdata, setUserdata] = useState([]);
  const [savedStatus, setSavedStatus] = useState("");
  const [email, setEmail] = useState('');



  //prevent back


  //get email

  useEffect(() => {
    getEmail();
  }, [])
  const getEmail = async () => {
    const savedEmail = await AsyncStorage.getItem("email");
    setEmail(savedEmail);

  }



  //SET EVENSTS
  const [events, setEvents] = useState([]);

  const [animationLoaded, setAnimationLoaded] = useState(false);
  const { isDollar, setIsDollar } = useCurrency();
  const [session, setSession] = useState("");
  const [loginState, setLoginState] = useState(true);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showLoginReqModal, setShowLoginReqModal] = useState(false);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://opasso-app-backend.vercel.app/api/product/productlist");
      setProducts(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    try {
      const response = await axios.get(`https://api-test-self-six.vercel.app/fetchbrands`);
      setBrands(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchManufacturer();
  }, []);

  const fetchManufacturer = async () => {
    try {
      const response = await axios.get(`https://res-server-sigma.vercel.app/api/shop/sellers`);
      setManufacturer(response.data);
      setLoading(false);
      // console.log(response.data)

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  // ... existing code ...

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchData(); // Fetch the updated data
      await getUserdata();
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  };


  useEffect(() => {
    getUserdata({ email, userdata, setUserdata, setLoading, session })

  }, [email])


  //modal functions
  // useEffect(() => {
  //   // Show the like modal after 5 seconds
  //   const timer = setTimeout(() => {
  //     setShowLikeModal(true);
  //   }, 5000);

  //   return () => clearTimeout(timer); // Clear the timer on component unmount

  //   // ... (existing code)
  // }, []);


  const handleShowLoginReq = () => {
    setShowLoginReqModal(true);
  }

  //go to login page
  const handleLogin = () => {
    handleLoginReqClose();
    navigation.navigate('Login');
  }


  const handleLikeModalClose = () => {
    setShowLikeModal(false);
    // You can add logic here for handling the user's response
  };
  const handleLoginReqClose = () => {
    setShowLoginReqModal(false);
    // You can add logic here for handling the user's response
  };
  const handleLikeModalAllow = () => {
    handleLikeModalClose();
    navigation.navigate('ourwork');
    // You can add logic here for handling the user's response
  };


  const handleLogout = () => {
    navigation.navigate('logoutconfirm');

  }




  const goToCart = () => {
    navigation.navigate("Cart", { email, role });
  };

  const handleSearch = () => {
    navigation.navigate("searchResults", { searchQuery });
    setSearchQuery('');
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLogoutConfirm, setLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    // Simulate a delay for the splash screen (optional)
    setTimeout(() => {
      setAnimationLoaded(true);
      // Navigate to the main screen or any other screen after the splash screen
      // Replace 'MainScreen' with your desired screen component
      // navigation.navigate('MainScreen');
    }, 2000); // Delay in milliseconds (adjust as needed)
  }, []);


  const Restrict = () => {
    alert("Please Login to access");
  }


  return (
    <SafeAreaView
      className="bg-white align-center flex-1"

      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" />
      {loading ? (
        <View className="flex-1 justify-center items-center h-full w-full">
          <LottieView
            className="justify-center items-center" style={{ width: '40%', height: '40%' }}
            source={require("../assets/spinner.json")}
            autoPlay
            loop={true}
          // onAnimationFinish={() => {
          //   handleLikeModalClose();
          // }}
          />
          <Text className="font-semibold text-xl tracking-wide">Loading products...</Text>
        </View>
      ) : (
        <View className="flex-1" style={{ marginTop: Platform.OS === 'ios' ? '5%' : '10%' }}>


          <SafeAreaView style={styles.top}>
            <View style={styles.menu}>
              <View>
                <TouchableOpacity onPress={() => setBottomSheetVisible(true)} className="space-x-10">
                  <FeatherIcon name="menu" size={35} color="orange" />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>


                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={handleLogout}

                >
                  <FeatherIcon name="log-in" size={35} color="orange" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="py-5 px-4">
              <View className="flex-row">
                <View>
                  <Text className="text-slate-800 text-2xl font-semibold">Welcome back,{email === null ? "user" : userdata.firstName}</Text>
                </View>
                <View>

                </View>
              </View>
            </View>


          </SafeAreaView>

          {/**categories */}
          <ScrollView
            vertical={true}
            style={styles.container1}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>


              <Deals />



              <View>
                <Text
                  style={{
                    position: "absolute",
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: "bold",
                    right: "70%",
                    bottom: "60%",
                  }}
                >
                  Searching
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: "bold",
                    right: "60%",
                    bottom: "40%",
                  }}
                >
                  for a product?
                </Text>
              </View>
            </View>


            <View className="flex-row w-full items-center justify-between px-4">
              <View>
                <Text className="justify-center items-center space-x-2" style={{ fontWeight: "bold", fontSize: 16, marginTop: 10, color: 'orange' }}>
                  <Icon.User size={25} color="orange" />Suppliers
                </Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => navigation.navigate('allmanufacturers')}>
                  <Text className="text-orange-500 font-semibold">View all</Text>
                </TouchableOpacity>

              </View>
            </View>






            <View>

              {loading ? (
                <View className="justify-center items-center flex-1 bg-transparent w-full">
                  <Text>Loading.....</Text>
                </View>
              ) : (
                <View className="px-5 justify-center items-center w-full">
                  <Animated.View className="w-full flex-row py-3 justif-center items-center" entering={FadeInLeft.delay(200).springify()} horizontal={true}>
                    {manufacturer.slice(0, 4).map((manufacturer) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("manufacturers", {
                            manName: manufacturer.firstName,
                            mancat1: manufacturer.category,
                            manEmail: manufacturer.email,
                            manAddress: manufacturer.address,
                            manPhone: manufacturer.phoneNumber,
                            manId: manufacturer._id,
                            manRate: manufacturer.exchangeRate,
                            currency: isDollar,


                            email,
                          })


                        }
                        key={manufacturer._id}
                      >
                        <View className="space-y-1 mr-4" key={manufacturer.id}>


                          <View className="p-2 rounded-full h-18 w-18 border border-orange-400 border-md">
                            <Image className="rounded-full"
                              source={require('../assets/opaso.png')}
                              style={{
                                height: 60, width: 60,
                              }}
                              resizeMode="cover"
                            />
                          </View>
                          <Text className="text-neutral-600 mt-3">

                            {manufacturer.firstName.length > 8 ? manufacturer.firstName.slice(0, 8) + '...' : manufacturer.firstName}
                          </Text>

                        </View>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                </View>

              )}


            </View>


            {/* what we do as opasso */}
            <View className="px-5 justify-center items-center my-3">
              <TouchableOpacity onPress={handleLikeModalAllow} className="justify-center rounded-xl items-center border border-orange-400 border-sm w-80 h-10">
                <Text className="text-lg font-bold text-orange-400">What we do.</Text>
              </TouchableOpacity>
            </View>





            <View className="px-5"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
                  Product Categories
                </Text>
              </View>


            </View>
            {loading ? (
              <Loader email={email} />
            ) : (

              <Categories email={email} handleModal={handleShowLoginReq} logstate={loginState} />

            )}



            {/* <CarouselCard data={trending} /> */}
            <Events />












            {/**End of brands */}
            <MenuModal isBottomSheetVisible={isBottomSheetVisible} setBottomSheetVisible={setBottomSheetVisible} Email={email} />




            {/* handle logout */}
            {/* <Modal
          className="justify-center items-center flex-1"
          isVisible={isLogoutConfirm}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          onBackdropPress={() => setLogoutConfirm(false)}
          onBackButtonPress={() => setLogoutConfirm(false)}
          style={styles.modalContainer}
        >
          <View className="bg-white w-80 h-60 px-5 rounded-3xl justify-center items-center">
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
              Please confirm Logout.
            </Text>
            <View style={styles.logmenu}>
              <TouchableOpacity onPress={logout} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                <Text style={styles.btntext}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLogoutConfirm(false)} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                <Text style={styles.btntext}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}

            <Modal
              isVisible={isLogoutConfirm}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={() => setLogoutConfirm(false)}
              onBackButtonPress={() => setLogoutConfirm(false)}
              style={styles.modalContainer}
            >
              <View
                className=""
                style={[
                  styles.bottomSheetContainer1,
                  { height: windowHeight * 0.4 },
                ]}
              >
                <View className="justify-center items-center flex-1 w-full h-full">

                  <LottieView
                    className="justify-center items-center" style={{ width: '40%', height: '40%' }}
                    source={require("../assets/logoutconfirm.json")}
                    autoPlay
                    loop={true}
                  // onAnimationFinish={() => {
                  //   handleLikeModalClose();
                  // }}
                  />
                  <Text className="text-slate-600 text-center font-semibold text-2xl">Confirm Logout.</Text>
                  <View className="flex-row justify-between items-center w-full px-5">

                    <TouchableOpacity onPress={() => setLogoutConfirm(false)} className="bg-orange-400 w-32 h-12 my-3 rounded-2xl justify-center items-center">
                      <Text style={styles.btntext}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} className="bg-red-400 w-32 h-12 my-3 rounded-2xl justify-center items-center">
                      <Text style={styles.btntext}>Logout</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </Modal>


            {/* ask user if they know how to use the app */}
            <Modal
              className="justify-center items-center flex-1"
              isVisible={showLikeModal}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={handleLikeModalClose}
              onBackButtonPress={handleLikeModalClose}
              style={styles.modalContainer}
            >
              <View className="bg-white w-80 h-60 px-5 rounded-3xl justify-center items-center">
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  Wanna know what we do?
                </Text>
                <View style={styles.logmenu}>
                  <TouchableOpacity onPress={handleLikeModalAllow} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                    <Text style={styles.btntext}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLikeModalClose} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                    <Text style={styles.btntext}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>




            {/* modal for user account creation create */}
            <Modal
              className="justify-center items-center flex-1"
              isVisible={showLoginReqModal}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={handleLikeModalClose}
              onBackButtonPress={handleLikeModalClose}
              style={styles.modalContainer}
            >
              <View className="bg-white w-80 h-60 px-5 rounded-3xl justify-center items-center">
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  You dont have an account or not logged in yet.
                </Text>
                <View style={styles.logmenu}>
                  <TouchableOpacity onPress={handleLogin} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                    <Text style={styles.btntext}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLoginReqClose} className="bg-orange-400 w-40 h-12 my-3 rounded-2xl justify-center items-center">
                    <Text style={styles.btntext}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


          </ScrollView>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  top: {
    backgroundColor: "#ffffff",
    height: 120,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,

  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 18,
  },
  search: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  searchcont: {
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
    borderColor: "orange",
    borderWidth: 1,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingVertical: 12,
    height: 120,
  },
  card: {
    backgroundColor: "#ffffff",

    padding: 5,
    margin: 5,
    minWidth: 80,
    borderRadius: 12,
    alignItems: "center",
    minHeight: 80,
  },
  carditem: {
    backgroundColor: "orange",
    borderRadius: 15,
    height: 170,
    padding: 15,
    width: "100%",
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  fav: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1, // Adjust the zIndex to position the close icon above the image
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  image1: {
    height: "70%",
    backgroundColor: "#fff",
    width: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  card1: {
    flex: 1,
    height: 250,
    backgroundColor: "#fff",
    width: 150,

    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 12,
    marginTop: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
  },
  deals: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
    height: "50%",
  },
  bottomSheetContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 1.2,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetContainer1: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSheetContainer2: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 5,
    elevation: 5,
  },
  logbtn: {
    backgroundColor: "orange",
    height: 50,
    width: "50%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#ffffff",
  },
  logmenu: {
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#fff",
  },
});

export default LandingScreen;
