import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native"; //StatusBar: 컴포넌트 안에 들어가는 컴포넌트. css에 영향을 주지 않음. 상단바 색깔을 바꿔준다.
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient"; //배경색 gradient로 만들어 주기
import { MaterialCommunityIcons } from "@expo/vector-icons"; //https://icons.expo.fyi/ 에서 아이콘 확인할 수 있음. //vector icon은 이미지가 아니므로, 원하는만큼 확대할 수 있다.

//MaterialCommunityIcons의 name 항목에 들어갈 것.
const weatherOptions = {
  Haze: {
    iconName: "weather-hazy",
    gradient: ['#4DA0B0', '#D39D38'],
    title: "연무",
    subtitle: "옅은 안개가 있어요. 시야가 조금 제한되요."
  },
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "뇌우",
    subtitle: "천둥, 번개를 동반한 강한 바람"
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "이슬비",
    subtitle: "가랑비에 옷 젖는다는 말이 있지요. 귀찮아도 우산을 챙겨나가세요."
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "비",
    subtitle: "외출 시 우산 꼭 챙기시고, 새 신발 자랑은 다음 기회에!"
  },
  Snow: {
    iconName: "weatehr-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "눈",
    subtitle: "빙판 조심!"
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "66A6FF"],
    title: "대기",
    subtitle: "???????"
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "맑음",
    subtitle: "맑은 하늘을 볼 수 있어요!"
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "흐림",
    subtitle: "하늘이 흐려요."
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "안개",
    subtitle: "얕은 안개가 있고 조금 습해요."
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "먼지 많음",
    subtitle: "마스크를 꼭 착용하세요."
  },
  Fog: {
    iconName: "weather-fog",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "안개",
    subtitle: "짙은 안개! 운전길 조심! 감속 운행!"
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
      </View >
      {/* ES6에서 오브젝트 두 개를 함께 쓰는 방식 */}
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
      </View>
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
  },

  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 20
  },

  subtitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600"
  },

  textContainer: {
    paddingHorizontal: 20,
    alignItems: "center"
  }
})