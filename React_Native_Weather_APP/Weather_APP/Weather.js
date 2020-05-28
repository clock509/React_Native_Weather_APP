import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native"; //StatusBar: 컴포넌트 안에 들어가는 컴포넌트. css에 영향을 주지 않음. 상단바 색깔을 바꿔준다.
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient"; //배경색 gradient로 만들어 주기
import { MaterialCommunityIcons } from "@expo/vector-icons"; //https://icons.expo.fyi/ 에서 아이콘 확인할 수 있음. //vector icon은 이미지가 아니므로, 원하는만큼 확대할 수 있다.

//MaterialCommunityIcons의 name 항목에 들어갈 것.
const weatherOptions = {
  Haze: {
    iconName: "weather-hail",
    gradient: ['#4DA0B0', '#D39D38']
  },
  Thunderstorm: {
    iconName: "",
    gradient: []
  },
  Drizzle: {
    iconName: "",
    gradient: []
  },
  Rain: {
    iconName: "",
    gradient: []
  },
  Snow: {
    iconName: "",
    gradient: []
  },
  Atmosphere: {
    iconName: "",
    gradient: []
  },
  Clear: {
    iconName: "",
    gradient: []
  },
  Clouds: {
    iconName: "",
    gradient: []
  },
  Mist: {
    iconName: "",
    gradient: []
  },
  Smoke: {
    iconName: "",
    gradient: []
  },
  Dust: {
    iconName: "",
    gradient: []
  },
  Fog: {
    iconName: "",
    gradient: []
  }
};

export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient} //먼저 쓰는 것이 상단, 나중에 쓰는 것이 하단
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={96}
          name={weatherOptions[condition].iconName || "weather-sunset"} //condition에 해당하는 날씨가 없을 경우 에러가 날 것이다. //weather-sunset: 디폴트 아이콘(weatherOptions에 없는 condition이 발생할 수도 있으므로)
          color="white"
        />
        <Text style={styles.temp}>{temp}℃</Text>
      </View>
      <View style={styles.halfContainer}></View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Smoke",
    "Dust",
    "Fog"
  ])//.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  temp: {
    fontSize: 42,
    color: "white"
  },

  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})