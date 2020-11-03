

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





  } from 'react-native';

import React, {Component} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
const GLOBAL = require('./Global');






class SplashScreen extends React.Component {


 getData = async () => {
    try {
      const tokenvalue = await AsyncStorage.getItem('token')
      const value = await AsyncStorage.getItem('userID')
      const lang = await AsyncStorage.getItem('lang')
       // alert(JSON.stringify(value))
       if(value != null && tokenvalue != null && lang!= null) {
           
           GLOBAL.userID = value
           GLOBAL.token = tokenvalue
           GLOBAL.lang = lang
           
         this.props.navigation.navigate('ManageScreen')
      }else{
           this.props.navigation.navigate('StyleScreen')

      }
    } catch(e) {
      // error reading value
    }
  }



componentDidMount () {
          
          // alert(JSON.stringify(GLOBAL.userID))
     this.timeoutCheck = setTimeout(() => {
          // this.getData()
          this.getData();

  },1000);
  


   }



   render() {


    
    


    return (
         
         
      <View style={{flex:1,backgroundColor:'white'}}>
         <StatusBar
             backgroundColor = "black"
         

           />


              
              <ImageBackground
                   style={{height:'100%',width:'100%',resizeMode:'contain',justifyContent:'center'}}
                   source={require('./splash.png')}>


                   <Image style={{height:150,width:150,resizeMode:'contain',alignSelf:'center'}} source={require('./newlogo.png')} />
                   <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2',marginTop:20,alignSelf:'center'}}>Afghanistan's Patriot Majority Orbit</Text>

                 
                 
              </ImageBackground>
               
             
      
      </View>


        
        


    );
  }
}

export default SplashScreen;