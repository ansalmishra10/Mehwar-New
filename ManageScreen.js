import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,
  PermissionsAndroid,
  NativeModules,
  BackHandler,




} from 'react-native';

import React, { Component, } from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EventDet from './EventDet.js';
import Survey from './Survey.js';
import Events from './Events.js';
import News from './News.js';
import FirstRoute from './FirstRoute.js';
import SecondRoute from './SecondRoute.js';
import Ionicons from 'react-native-vector-icons';
import ProfileScreen from './ProfileScreen.js';
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');
import requestCameraAndAudioPermission from './Permission.js';







const initialLayout = { width: Dimensions.get('window').width };









const icon1 = require('./google.png');


const { Agora } = NativeModules
// console.log(Agora)

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Host,
  Audience,
  Adaptative
} = Agora




class ManageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageget: 0,
      imageget1: 0,
      imageget2: 0,
      email: '',
      loading: '',
      mobile: '',
      password: '',
      icon: '',
      index: 0,
      routes: [
        { key: "first", title: 'Home' },
        { key: "second", title: 'News' },
        { key: "third", title: 'Survey' },
        { key: "forth", title: 'Events' },
        { key: "fifth", title: 'About us' },
        { key: "sixth", title: 'Profile' },


      ],

    }
  }

  showLoading() {
    this.setState({ loading: true })
  }


  hideLoading() {
    this.setState({ loading: false })
  }


  live = () => {

    this.props.navigation.navigate('Liveagain')

    const url = GLOBAL.BASE_URL + 'get_live_broadcast'

    this.showLoading()
    fetch(url, {
      method: 'POST',
      timeoutInterval: 1000,
      headers: {
        'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
        'Content-Type': 'application/json',
        'language': GLOBAL.lang,
        'Authorization': GLOBAL.token
      },

      body: JSON.stringify({

        "user_id": GLOBAL.userID,


      })
    })

      .then((response) => response.json())
      .then((responseData) => {

        // alert(JSON.stringify(responseData))

        if (responseData.status == true) {


          GLOBAL.myname = responseData.user_name



          GLOBAL.chat_g_id = responseData.data.channel

          // GLOBAL.bookingid = responseData.data.channel

          this.timeoutCheck = setTimeout(() => {



            this.props.navigation.navigate("Liveagain", {
              uid: Math.floor(Math.random() * 100),
              clientRole: Audience,
              channelName: GLOBAL.chat_g_id,
              onCancel: (message) => {
                this.setState({
                  visible: true,
                  message
                });
              }
            })


          }, 500);
          // this.props.navigation.navigate('Liveagain')

          this.hideLoading()


        } else {

          this.timeoutCheck = setTimeout(() => {

            this.props.navigation.navigate("Liveagain", {
              uid: Math.floor(Math.random() * 100),
              clientRole: Audience,
              channelName: GLOBAL.chat_g_id,
              onCancel: (message) => {
                this.setState({
                  visible: true,
                  message
                });
              }
            })

          }, 500);

        }








      })
      .catch((error) => {
        console.error(error);
      })
  }

  handleone = () => {
    this.setState({ imageget: 1 })
    this.setState({ imageget1: 0 })
    this.setState({ imageget2: 0 })
  }

  handletwo = () => {
    this.setState({ imageget: 0 })
    this.setState({ imageget1: 1 })
    this.setState({ imageget2: 0 })
  }

  handlethree = () => {
    this.setState({ imageget: 0 })
    this.setState({ imageget1: 0 })
    this.setState({ imageget2: 1 })
  }

  _renderScene = ({ route }) => {


    switch (route.key) {

      case 'first':
        return <FirstRoute navigation={this.props.navigation} />
      case 'second':
        return <News navigation={this.props.navigation} />

      case 'third':
        return <Survey navigation={this.props.navigation} />

      case 'forth':
        return <Events navigation={this.props.navigation} />

      case 'fifth':
        return <SecondRoute navigation={this.props.navigation} />

      case 'sixth':
        return <ProfileScreen navigation={this.props.navigation} />

      default:
        return null;
    }
  };




  // renderIcon = ({ routes }) => {
  //  console.log(routes)
  //  return(

  //      <View style={{backgroundColor:'red',height:20,width:20}}> 
  //     </View>
  //    );
  // }



  componentDidMount() {
    requestCameraAndAudioPermission().then(_ => {
      // console.log('requested!');
      // Linking.openURL('camera')
      // alert(JSON.stringify(GLOBAL.userID))
    });





    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }


  getLiveData = () => {


  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  handleBackButton = () => {

    Alert.alert(
      'Exit From App',
      'Do you want to exit from App?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => console.log('No Pressed') }
      ],

      { cancelable: false },

    );

    return true;
  }





  renderTabBar(props) {



    return (<TabBar

      style={{ backgroundColor: '#FFFFFF', width: '100%', height: 54, activeColor: '#F2C1D7' }}
      scrollEnabled={true}
      activeColor={'#1357A2'}
      inactiveColor={'#75757580'}
      inactiveOpacity={0.5}
      activeOpacity={1.0}
      labelStyle={{ fontSize: 14, fontFamily: 'AvenirLTStd-Heavy', }}
      {...props}
      indicatorStyle={{ backgroundColor: '#1357A2', height: 5 }}
      activeLabelStyle={{ color: '#1357A2', fontWeight: 'bold' }}
      inactiveLabelStyle={{ color: '#75757533' }}



    />

    );
  }
















  render() {






    return (

      <SafeAreaProvider style={{ backgroundColor: 'white' }}>

        <StatusBar
          backgroundColor="#D7F0F7"


        />



        <View style={{ flex: 1, width: Dimensions.get('window').width, flexDirection: 'column', backgroundColor: 'white', backgroundColor: 'white' }}>







          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 60, backgroundColor: 'white', elevation: 2 }}>
            <Image style={{ height: 35, width: 35, marginLeft: 15, resizeMode: 'contain' }} source={require('./newlogo2.png')} />
            <Text style={{ fontSize: 25, fontFamily: 'AvenirLTStd-Heavy', color: '#161F3D', marginLeft: 8, fontWeight: 'bold', width: '46%' }}>{stringsoflanguages.mehwar}</Text>

            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('Broad')}>
              <Image style={{ width: 28, height: 22, resizeMode: 'contain' }} source={require('./broadcast.png')} />
            </TouchableOpacity>


            <TouchableOpacity style={{ marginLeft: 21 }} onPress={() => this.props.navigation.navigate('Message')}>
              <Image style={{ width: 26, height: 26, resizeMode: 'contain' }} source={require('./message.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 21 }} onPress={() => this.live()}>
              <Image style={{ width: 30, height: 38, resizeMode: 'contain' }} source={require('./live.png')} />
            </TouchableOpacity>


          </View>

          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            indicatorStyle={{ backgroundColor: 'white' }}
            onIndexChange={index => this.setState({ index })}
            renderTabBar={this.renderTabBar}
            initialLayout={initialLayout}
            tabBarPosition="top"
          />













        </View>

      </SafeAreaProvider>

    );
  }
}

export default ManageScreen;