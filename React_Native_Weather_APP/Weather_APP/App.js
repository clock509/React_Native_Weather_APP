import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from "expo-location"; //navigator.getCurrentPosition을 사용해도 좋다.
import axios from "axios";
import Weather from './Weather';
//날씨 데이터 가져오기(회원가입 필요): https://openweathermap.org/api/one-call-api?gclid=Cj0KCQjwn7j2BRDrARIsAHJkxmx_pUTHVyMQKuNZ9yHU64pwRZ2BS37EEg5RUfb8LMcHjVDiAnAd3KkaApQPEALw_wcB
//'API Keys' 클릭 -> 발급되어있는 Key Copy -> const로 만들기.

const API_KEY = "360cf07cea990393e55238c374375de8";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    ); //units=metric: Celcius degree
    this.setState({
      isLoading: false,
      condition: "Haze", //weather[0].main,
      temp
    })
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync(); //Location permission 필요 //사용자가 permission을 주지 안으면 에러를 발생시킨다.
      // const { coords } = await Location.getCurrentPositionAsync(); //현재 위치 정보 가져옴. //위치 정보에 있는 coords 객체를 받아온다.
      // console.log(coords.latitude, coords.longitude);
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync(); // coords 객체에서 latitude, longitude를 가져온다.
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude); //getWeather함수 호출
      //Send To API and get Weather
    } catch (error) { //try 안에 있는 구문들에서 에러가 발생한 경우, catch문이 잡아내어 Alert창을 띄운다.
      Alert.alert("Can't find you.", "So Sad");
    }

  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state; //여기서 render해 주어야 state 안에 들어가고, 리턴할 수 있다.
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }// isLoading이 true이면 < Loading />, false이면 null 리턴
}