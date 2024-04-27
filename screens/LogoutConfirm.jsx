import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutConfirm = ({ navigation }) => {
    //logout function start
    const Logout = async () => {
        // Perform any necessary logout actions (e.g., clear user session, reset state)

        // Remove user token or session data from AsyncStorage
        try {
            await AsyncStorage.removeItem("userToken"); // Replace 'userToken' with your specific token or session key

            // Set the login status to "LoggedOut" or any other value
            await AsyncStorage.setItem("loginStatus", "LoggedOut");
            await AsyncStorage.setItem("email", "");



            //check status
            const userStatus = await AsyncStorage.getItem("loginStatus");
            console.log(userStatus);


            // Navigate to the login or authentication screen
            // Example using react-navigation:
            navigation.reset({
                index: 0,
                routes: [{ name: 'First' }], // Navigate to the LoginScreen
            });
            setLogoutConfirm(false)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">

            <View className="flex-1 justify-center items-center">
                <View className="my-4 justify-center items-center">
                    <Text className="text-xl font-bold">Its sad to see you leave.</Text>
                    <Text className="text-2xl font-bold">Are you sure you want to logout?</Text></View>
                <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="bg-black justify-center items-center my-5 rounded-xl h-12 w-40">
                    <Text className="text-white font-bold text-xl">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={Logout}
                className="bg-orange-400 justify-center items-center rounded-xl h-12 w-40">
                    <Text className="text-white font-bold text-xl">Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LogoutConfirm

const styles = StyleSheet.create({})