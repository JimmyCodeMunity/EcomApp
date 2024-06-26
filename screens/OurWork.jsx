import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated, {
  FadeInDown,
  SlideInLeft,
  SlideInUp,
} from "react-native-reanimated";

const OurWork = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Sign Up",
      description:
        "This platform has current price and dollar rates for your go-to Suppliers",
      image: require("../assets/use/account.png"),
    },
    {
      id: 2,
      title: "Search for your desired manufacturer.",
      description:
        "Are you a reseller? Concentrate on business, we have the PRICE LISTS.",
      image: require("../assets/use/search.png"),
    },
    {
      id: 3,
      title: "Access the catalogue.",
      description: "Are you a Wholesaler? Reach your customers faster.",
      image: require("../assets/use/browse.png"),
    },
    {
      id: 4,
      title: "Get in touch with the supplier.",
      description: "Contact details will be provided.",
      image: require("../assets/use/nego.png"),
    },
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigation.goBack(); // Navigate to the Login screen when onboarding is completed
    }
  };

  const renderDots = () => {
    return slides.map((slide, index) => (
      <View
        key={slide.id}
        style={[styles.dot, index === activeSlide ? styles.activeDot : null]}
      />
    ));
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Animated.Image
        entering={SlideInUp.delay(500).springify()}
        source={slides[activeSlide].image}
        style={styles.slideImage}
      />
      {/* <Text className="text-3xl  font-bold my-5">{slides[activeSlide].title}</Text> */}
      <Animated.Text
       className="text-lg px-5 text-center font-semibold">
        {slides[activeSlide].description}
      </Animated.Text>
      <TouchableOpacity
        className="bg-black my-4 rounded-2xl w-40 h-10 justify-center items-center"
        onPress={handleNext}
      >
        <Text className="text-lg font-bold text-white">
          {activeSlide === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6E77EE",
    padding: 20,
  },
  slideImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    borderRadius: 15,
    marginTop: "10%",
    height: 45,
  },
  nextButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dot: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000000",
  },
});

export default OurWork;
