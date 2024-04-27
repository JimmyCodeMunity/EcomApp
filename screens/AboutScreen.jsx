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
  Linking
} from "react-native";
import React from 'react'
import * as Icon from 'react-native-feather'

const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView vertical={true}>
        <View style={styles.logmenu} className="bg-white p-4 flex-1 w-full">
          <View className="justify-start items-start">
            <Text className="text-slate-600 text-2xl font-bold">More</Text>
          </View>

          <View className="justify-center mt-7">
            <View className="border border-b-2 justify-center border-slate-300 h-30 rounded-2xl mb-5">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "allmanufacturers",
                    setBottomSheetVisible(true)
                  )
                }
                className="p-5 rounded-2xl w-full border border-b-1 border-t-0 border-l-0 border-r-0 border-slate-300 flex-row items-center justify-between"
              >
                <Text className="text-slate-600 ">App Name</Text>
                <Text className="text-slate-500">ResellerSprint</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "allproducts",
                    setBottomSheetVisible(false)
                  )
                }
                className="p-5 rounded-2xl w-full flex-row items-center justify-between"
              >
                <Text className="text-slate-600 ">Version</Text>
                <Text className="text-slate-500">2.0</Text>
              </TouchableOpacity>
            </View>
            <Text className="my-3 font-bold text-slate-600 text-xl">
              Support
            </Text>

            <View className="border border-b-2 border-slate-300 h-30 rounded-2xl mb-8">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "Faq",

                  )
                }
                className="p-5 rounded-2xl w-full border border-b-1 border-t-0 border-l-0 border-r-0 border-slate-300 flex-row justify-between items-center"
              >
                <Text className="text-slate-600 ">FAQ</Text>
                <Icon.ArrowRight size={25} color="grey"/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "Use",

                  )
                }
                className="p-5 rounded-2xl w-full border border-b-1 border-t-0 border-l-0 border-r-0 border-slate-300 flex-row justify-between items-center"
              >
                <Text className="text-slate-600 ">How to Use App</Text>
                <Icon.ArrowRight size={25} color="grey"/>
              </TouchableOpacity>
              
            </View>
            
            

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({})