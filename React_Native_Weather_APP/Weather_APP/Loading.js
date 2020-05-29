import React from 'react';
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Loading() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#5433FF", "#20BDFF", "#A5FECB"]}
    //colors={["#00416A", "#E4E5E6"]}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.text}>현재 날씨를 확인하고 있어요.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 100, //상단으로부터 100만큼 내려옴
    //backgroundColor: "#FDF6AA"
  },

  text: {
    color: "white", //"#2c2c2c",
    fontSize: 30 //픽셀을 명시하려면 "20px"로, 그냥 숫자만 적으면 자동으로 px단위로 인식함.
  }
})