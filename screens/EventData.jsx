import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";

const EventData = ({ navigation, route }) => {
  const {
    itemName,
    itemDescription,
    itemOriginal,
    itemDiscount,
    itemSeller,
    itemPhone,
  } = route.params;



  const handleCall = () => {
    const phoneNumber = itemPhone;
    const countryCode = "+254";

    // Check if the phone number is valid
    if (phoneNumber) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
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
    const phoneNumber = itemPhone;
    const countryCode = "+254";
    if (phoneNumber) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
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
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-80"
            source={require("../assets/rsp.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-orange-50 p-2 rounded-full shadow border border-slate-200 border-b-xl"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="orange" />
          </TouchableOpacity>
        </View>

        <View className="px-5 py-4">
          <View className="my-2">
            <Text className="text-3xl font-bold text-gray-900">{itemName}</Text>
          </View>
          <View className="my-1">
            <Text className="text-2xl font-bold text-gray-900">
              {itemDescription}
            </Text>
          </View>
          <View className="my-1">
            <Text className="font-bold tracking-wide ">
              Supplier:
              <Text className="text-lg font-bold text-gray-900">
                {itemSeller}
              </Text>
            </Text>
          </View>
          <View className="my-1">
            <Text className="font-bold tracking-wide ">
              Initial Price:
              <Text
                className="text-lg font-bold text-gray-900"
                style={{ textDecorationLine: "line-through" }}
              >
                {itemOriginal}
              </Text>
            </Text>
          </View>
          <View className="my-1">
            <Text className="font-bold tracking-wide ">
              Current Price:
              <Text className="text-lg font-bold text-gray-900">
                {itemDiscount}
              </Text>
            </Text>
          </View>
        </View>

        <View className="px-4 w-full flex-1">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventData;

const styles = StyleSheet.create({});
