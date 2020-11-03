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




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');


class SecondRoute extends React.Component {
  constructor() {
    super();
     this.state={

       about:'',
       vision:'',
       mission:'',
       loading:'',
       
     }
  }

  componentDidMount() {
    this.callData();

  }


   showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



  callData=()=> {


     const url = GLOBAL.BASE_URL +  'get_company_data'

          this.showLoading()
            fetch(url, {
            method: 'GET',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token,
                'language': GLOBAL.lang,
            },
           
            
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    


        

        // alert(JSON.stringify(responseData))

        this.setState({ about: responseData.data.about_us })
        this.setState({ vision: responseData.data.vision })
        this.setState({ mission: responseData.data.mission })

       
         // alert(JSON.stringify(this.state.about))
        
        })

      .catch((error) =>{
        console.error(error);
      })

  }


  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>
         <ScrollView style={{flex:1,height:'100%'}}>

         <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:26,marginLeft:15}}>{stringsoflanguages.about}</Text>

         <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginTop:10,alignSelf:'center',width:'92%',lineHeight:22}}>{this.state.about}</Text>
         

         <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:20,marginLeft:15}}>{stringsoflanguages.vision}</Text>

         <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginTop:10,alignSelf:'center',width:'92%',lineHeight:22}}>{this.state.vision}</Text>
         

         <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:20,marginLeft:15}}>{stringsoflanguages.mission}</Text>

         <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginTop:10,alignSelf:'center',width:'92%',lineHeight:22}}>{this.state.mission}</Text>
         

    

         </ScrollView>

      </SafeAreaProvider>

      );
  }
}

export default SecondRoute;