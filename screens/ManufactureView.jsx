import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TextInput,
} from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import axios from "axios";
import * as Icon from "react-native-feather";
import Modal from "react-native-modal";
import { useCurrency } from "../components/CurrencyProvider";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Manufacturer = ({ route, navigation }) => {
  const [tableHead, setTableHead] = useState([
    "",
    "Name",
    "PartNo.",
    "Price",
    "Action",
  ]);
  const [tableData, setTableData] = useState([]);
  const [productsNotFound, setProductsNotFound] = useState(false);
  const { manId, manImage, manName, manPhone, manEmail, manRate } =
    route.params;

  const [selected, setSelected] = useState([]);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProductDescription, setSelectedProductDescription] = useState(
    []
  );
  const [filterModal, setFilterModal] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isDollar, setIsDollar } = useCurrency();

  const [priceFilter, setPriceFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const [value, setValue] = useState(null);
  const [isFocusCat, setIsFocusCat] = useState(false);
  const [isFocusPrice, setIsFocusPrice] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // Inside your component...
  const [partNumberFilter, setPartNumberFilter] = useState(""); // Add this state variable

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLinkClick = () => {
    Linking.openURL(
      `https://react-pdf-download-reseller.vercel.app/manufaclist/${manId}`
    );
  };

  const [exchangeRate, setExchangeRate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const fetchSupplierDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://res-server-sigma.vercel.app/api/shop/usersdata/${manId}`);
      const supdata = response.data;
      const erate = response.data.user.dollarExchangeRate;
      const fname = response.data.user.firstName;
      const lname = response.data.user.lastName;
      const phone = response.data.user.phoneNumber;
      const cat = response.data.user.categories;
      const categoryText = cat.join(", ");
      setExchangeRate(erate);
      setFirstName(fname);
      setLastName(lname);
      setPhoneNumber(phone);
      setCategory(categoryText);
      // console.log("cat",categoryText)
      setSupplierData(supdata);
      

    } catch (error) {

    }
  }
  // console.log("gotten data", supplierData)


  useEffect(() => {
    fetchSupplierDetails()

  }, [manId])
  // console.log(phoneNumber)

  const handleCall = () => {
    const cphoneNumber = phoneNumber;
    // console.log(cphoneNumber);
    // const countryCode = "+254";

    // Check if the phone number is valid
    if (cphoneNumber) {
      const fullPhoneNumber = `${phoneNumber}`;
      // Construct the phone call URL
      const phoneURL = `tel:${fullPhoneNumber}`;

      // Open the phone app with the specified phone number
      Linking.canOpenURL(phoneURL)
        .then((supported) => {
          if (!supported) {
            console.error("Phone calls are not supported on this device");
          } else {
            return Linking.openURL(phoneURL);
          }
        })
        .catch((error) => console.error(`Error opening phone app: ${error}`));
    } else {
      console.error("Phone number is not available");
    }
  };

  //handle whatsapp
  const handleWhatsapp = () => {
    const wphoneNumber = phoneNumber;
    // const countryCode = "+254";
    console.log(wphoneNumber)
    if (wphoneNumber) {
      const fullPhoneNumber = `${phoneNumber}`;
      const phoneURL = `tel:${fullPhoneNumber}`;
      // Construct the WhatsApp chat URL
      const whatsappURL = `https://wa.me/${fullPhoneNumber}`;

      // Open the WhatsApp chat with the specified phone number
      Linking.canOpenURL(whatsappURL)
        .then((supported) => {
          if (!supported) {
            console.error("WhatsApp is not installed on this device");
          } else {
            return Linking.openURL(whatsappURL);
          }
        })
        .catch((error) =>
          console.error(`Error opening WhatsApp chat: ${error}`)
        );
    } else {
      console.error("Phone number is not available");
    }
  };

  useEffect(() => {
    fetchData();
  }, [manId]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://res-server-sigma.vercel.app/api/product/productlist/${manId}`,
        {
          timeout: 10000,
        }
      );
      const apiData = response.data;
      setFilteredProducts(apiData);
      setProducts(apiData); // Update the products state
      setLoading(false);
      // console.log(apiData)

      if (apiData.length > 0) {
        setTableHead(["Name", "PartNo.", "Price", "Available", "Action"]);

        const rows = apiData.map((item, index) => [
          item.name,
          item.partNumber,
          item.price,
          item.isAvailable,
        ]);
      } else {
        setProducts([]);
        setFilteredProducts([]); // Initialize filteredProducts with an empty array
        setProductsNotFound(true);
      }
    } catch (error) {
      // Handle errors
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message); // Handle canceled request
      } else if (error.code === "ECONNABORTED") {
        console.log("Request timeout:", error.message); // Handle timeout
        setLoading(false);
        //navigation.goBack();
        setTimeModalVisible(true);
      } else {
        console.error("Error fetching data:", error.message);
      }
    }
  };

  // ... existing code ...

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchData(); // Fetch the updated data
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  };

  const handleActionPress = ({ tableData }) => {
    console.log("rowData:", selected); // Log the entire rowData to inspect its structure

    Alert.alert("Selected Item", selected[1]);
  };
  const [showSearch, setShowSearch] = useState(false);

  //filter
  // Apply filters function
  const applyFilter = () => {
    setSearchQuery(filterName || filterPrice || filterBrand);
  };

  const searchedProducts = products.filter(
    (products) =>
      products.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      products.price.toString().includes(searchQuery.toLowerCase()) ||
      products.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to clear filters
  const clearFilters = () => {
    setFilterBrand("");
    setFilterPrice("");
    setFilterName("");
    setSearchQuery("");

    setFilteredProducts(products); // Reset filteredProducts to all products
  };

  const renderProductTable = () => {
    const tableData = searchedProducts.map((item) => [
      item.name,
      item.sku,
      isDollar
        ? `$ ${Number(
          (item.price / exchangeRate).toFixed(2)
        ).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
        : `KES ${Number(item.price.toFixed(2)).toLocaleString(
          "en-US"
        )}`,
      item.isAvailable ? (
        <Text className="text-center items-center">Available</Text>
      ) : (
        <Text className="text-center items-center">Unavailable</Text>
      ),
      <View className="justify-center items-center">
        <TouchableOpacity
          className="bg-orange-500 w-16 rounded-2xl h-8 justify-center items-center"
          onPress={() => {
            setSelected([
              item.name,
              item.brand,
              category,
              phoneNumber,
              exchangeRate,
              item.price,
              firstName,
              lastName
            ]);
            setModalVisible(true);
          }}
          style={styles.viewDetailsButton}
        >
          <Text style={styles.viewDetailsButtonText}>View</Text>
        </TouchableOpacity>
      </View>,
    ]);

    return (
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={tableHead}
          flexArr={[5, 4, 2, 2]}
          widthArr={[160, 180, 200, 220, 180]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableData}
            flexArr={[5, 4, 2, 2]}
            widthArr={[160, 180, 200, 220, 180]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    );
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <View className="justify-center items-center absolute w-full h-32" style={{ bottom: 10, zIndex: 20 }}>
        <View className="w-60 justify-center items-center my-5" >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="py-5 bg-orange-400 rounded-2xl w-full justify-center items-center"
          >
            {/* <Icon.X size={20} color="white" /> */}
            <Text className="text-white font-bold text-xl tracking-wide">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5 mt-5">
        <Text className="text-2xl font-semibold text-slate-600">{manName}</Text>
        <Text className="text-xl font-semibold text-orange-300">
          {manPhone}
        </Text>
      </View>
      <View className="flex-row justify-between items-center px-5 space-y-1">
        <View>
          <Text className="text-xl text-slate-500 font-semibold flex-row justify-between item-center">
            Currency:
            <Text
              className="font-bold px-2"
              style={{
                textDecorationLine: isDollar ? "none" : "line-through",
                color: isDollar ? "black" : "gray",
              }}
            >
              USD
            </Text>{" "}
            ||
            <Text
              style={{
                textDecorationLine: isDollar ? "line-through" : "none",
                color: isDollar ? "gray" : "black",
              }}
            >
              {" "}
              KES
            </Text>
          </Text>
        </View>

        <View className="flex-row justify-between items-center space-x-3">
          <View>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("pdfdownloadmanufacturer", {
              //     manid: manId,
              //   })
              // }

              onPress={handleLinkClick}
            >
              <Icon.Download size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            {showSearch ? (
              <TouchableOpacity
                className="bg-orange-400 h-10 w-10 rounded-full justify-center items-center flex-1"
                //  onPress={()=>navigation.navigate('pdfdownloadcategory',{catname:categoryName})}
                onPress={toggleSearch}
              >
                <Icon.Search size={30} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className=""
                //  onPress={()=>navigation.navigate('pdfdownloadcategory',{catname:categoryName})}
                onPress={toggleSearch}
              >
                <Icon.Search size={30} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDollar ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsDollar((prevState) => !prevState)}
              value={isDollar}
            />
          </View>
        </View>
      </View>
      <View className="">
        {showSearch ? (
          <Animated.View
            entering={FadeInUp.delay(400).springify()}
            className="w-90 px-4 py-4 flex-row justify-between items-center space-x-5"
          >
            <View className="flex-1">
              <TextInput
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                className="w-90 h-10 border border-slate-300 rounded-2xl bg-white px-4"
                placeholder="search by name, price, product , availability"
              />
            </View>
            <TouchableOpacity
              onPress={clearFilters}
              className="bg-orange-500 h-10 w-10 rounded-full justify-center items-center"
            >
              <Icon.X size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View className="py-3"></View>
        )}
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <ScrollView
          vertical={true}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <Loading />
          ) : (
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              {renderProductTable()}
            </Animated.View>
          )}
        </ScrollView>
      </ScrollView>

      {/* <Modal animationType="slide" transparent={true} visible={modalVisible} className="justify-center items-center mt-12">

      </Modal> */}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalContainer}
      >
      
        <View
          className=""
          style={[styles.bottomSheetContainer1, { height: windowHeight * 0.8 }]}
        >
          <View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-slate-400 justify-center items-center rounded-2xl h-12 w-12"
            >
              <Icon.XCircle size={30} color={"orange"} />
            </TouchableOpacity>
          </View>
          <View className="justify-center items-center">
            <Text className="text-slate-800 text-2xl font-semibold">
              Product Details
            </Text>
          </View>
          <ScrollView vertical={true}>
            <View className="justify-center">
              <Text className="text-3xl font-bold text-slate-500 space-x-4 py-3">
                {selected[0]}
              </Text>

              <Text
                style={{ fontSize: 24, fontWeight: "bold" }}
                className="text-xl text-bold"
              >
                {isDollar
                  ? "$ " + Number(selected[5] / selected[4]).toFixed(2)
                  : "KES " + selected[5]}
              </Text>
              <Text className="text-xl text-slate-600 font-semibold">
                Manufacturer:{selected[6]+" "+selected[7]}
              </Text>
              <Text className="text-xl text-slate-600 font-semibold">
                Brand:{selected[1]}
              </Text>
              <Text className="text-xl text-slate-600 font-semibold">
                Category:{selected[2]}
              </Text>
              <Text className="text-xl text-slate-600 font-semibold">
                ExchangeRate:{selected[4]}
              </Text>
              
            </View>
            <View className="py-2">
              <TouchableOpacity
                onPress={handleWhatsapp}
                className="rounded-2xl flex-row bg-green-500 p-2 w-90 h-12 justify-center items-center"
              >
                <Icon.MessageCircle size={23} color={"white"} />
                <Text className="text-2xl font-semibold text-slate-700">
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
            <View className="py-2">
              <TouchableOpacity
                onPress={handleCall}
                className="rounded-2xl flex-row p-2 bg-black w-90 h-12 justify-center items-center"
              >
                <Icon.Phone size={23} color={"white"} />
                <Text className="text-2xl font-semibold text-slate-200">
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* display modal when data is not fetched on time */}
      <Modal
        isVisible={timeModalVisible}
        onBackdropPress={() => setTimeModalVisible(false)}
        style={styles.modalContainer}
      >
        <View
          className=""
          style={[styles.bottomSheetContainer1, { height: windowHeight * 0.5 }]}
        >
          <View className="justify-center items-center flex-1">
            <ActivityIndicator size="large" color="red" />
            <Text className="text-slate-500 py-4">Connection Timeout!!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 20, backgroundColor: "#f1f8ff", minWidth: 300 },
  wrapper: { flexDirection: "row" },
  row: { height: 70 },
  text: { textAlign: "center" },
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
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
    height: "50%",
  },
});

export default Manufacturer;
