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


class NewsDetail2 extends React.Component {
  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>

      <StatusBar
             backgroundColor = "black"
         

           />

         <ScrollView style={{flex:1,height:'100%'}}>

        <ImageBackground style={{height:300,width:'100%',resizeMode:'contain'}} source={require('./covid.jpg')}>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center',marginTop:18}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Image style={{height:18,width:22,resizeMode:'contain'}} source={require('./leftagain.png')} />
            </TouchableOpacity>
            <Image style={{height:24,width:22,resizeMode:'contain'}} source={require('./share3.png')} />
           </View>
          </ImageBackground>

          <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:22,marginLeft:16}}>16 Sep, 2020</Text>
          <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:7,marginLeft:16,width:'90%',lineHeight:25}}>Coronavirus India Live Updates: Over 50 lakh cases; RBI Governor says economic recovery will be gradual.</Text>
          
          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:10,marginLeft:16,width:'90%',lineHeight:20}}>Coronavirus (Covid-19) India News Live Updates: The tally of 50,20,360 cases includes 9,95,933 patients who are undergoing treatment and 39,42,361 who have recovered. With 1,290 additional deaths, the toll rose to 82,066.</Text>
          
          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:15,marginLeft:16,width:'90%',lineHeight:20}}>Reserve Bank of India Governor Shaktikanta Das Wednesday said the country’s economic recovery was likely to be gradual as it was still reeling from the impact of the pandemic. Addressing the FICCI National Executive Committee Meeting, the central bank chief said the GDP data for the first quarter was a telling reflection of how Covid-19 had affected the economy.</Text>

          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:15,marginLeft:16,width:'90%',lineHeight:20}}>In other news, the discussion in Rajya Sabha Wednesday was on Union Health Minister Dr Harsh Vardhan’s statement on the Covid-19 situation in India. Vardhan Tuesday had told the House the pandemic was “far from over”. He also said the government had prevented 14-29 lakh cases and 37,000-78,000 deaths by imposing the nationwide lockdown on March 24, a claim the Opposition sought to know more on.</Text>
          

          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:15,marginLeft:16,width:'90%',lineHeight:20}}>The government also informed the Upper House that it was supporting the development of over 30 vaccine candidates, three of which were in advance stages of Phase I, II, III trials, and at least four were in advanced pre-clinical development stage.</Text>
          

          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:15,marginLeft:16,width:'90%',lineHeight:20}}>Meanwhile, Indian Council of Medical Research (ICMR) Director General Balram Bhargava Tuesday clarified that reinfection was possible even though it was a “very rare” occurrence. He also stressed that it was not a matter of serious concern. The remarks were made amid suspected cases of Covid-19 reinfection being reported from abroad and Indian states like Telangana, Karnataka, Gujarat, Punjab and Maharashtra.</Text>
          



         </ScrollView>

       </SafeAreaProvider>
       
       
       );
      
      }
      
    }  


export default NewsDetail2; 