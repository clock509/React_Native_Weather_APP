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
      data: { //axios로부터 받아올 데이터를 data라고 정의
        main: { temp }, //data.main.temp 정보가 필요하다.
        weather //data.weather 정보가 필요하다.
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    ); //units=metric: Celcius degree
    //console.log('data: ', data);
    this.setState({
      isLoading: false,
      condition: weather[0].main, //weather: array, main: ex) "Clouds"
      temp //render함수에서 temp를 정의했으므로, getWeather 함수에서도 사용 가능하다.
    });
    //console.log('main: ', main);
    console.log('weather: ', weather);
    //console.log('state: ', state);
    //console.log('isLoading: ', isLoading);
    //console.log('condition: ', condition);
    console.log('temp: ', temp);
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync(); //이 구문은 Promise 반환. //Location permission 필요. 사용자가 permission을 주지 안으면 에러를 발생시킨다.

      const location = await Location.getCurrentPositionAsync(); //location 안에 coords 객체가 들어있다. getWeather함수에 전달하기 위해 이 coords만 따로 가져올 것이다.
      console.log('location: ', location);
      // const { coords } = await Location.getCurrentPositionAsync(); // {coords}는 ES6 문법! //현재 위치 정보 가져옴. //위치 정보에 있는 coords 객체를 받아온다.
      // console.log(coords.latitude, coords.longitude); //이 두 줄을 아래와 같이 간결하게 바꿔보자.
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync(); // coords 객체에서 latitude, longitude를 가져온다.
      console.log(latitude, longitude);

      this.getWeather(latitude, longitude); //getWeather함수 호출
      //Send To API and get Weather
    } catch (error) { //try 안에 있는 구문들에서 에러가 발생한 경우, catch문이 잡아내어 Alert창을 띄운다.
      Alert.alert("Can't find you.", "So Sad");
    }
  }
  componentDidMount() { //컴포넌트가 만들어진 후 첫 렌더링을 다 마친 후에 실행되는 메서드.
    this.getLocation();
  }
  render() { //App 컴포넌트에서 여기가 가장 먼저 시작됨. //초기값: isLoading: true, temp & condition: undefined
    const { isLoading, temp, condition } = this.state; //여기서 render해 주어야 state 안에 들어가고, 리턴할 수 있다.
    console.log('isLoading: ', isLoading);
    console.log('temp: ', temp);
    console.log('condition: ', condition);
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }// isLoading이 true이면 < Loading />, false이면 <Weather ... /> 리턴
}