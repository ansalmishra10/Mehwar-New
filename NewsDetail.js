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
  Share,




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');
import ReadMore from 'react-native-read-more-text';
import HTML from 'react-native-render-html';
  const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;


class NewsDetail extends React.Component {


  componentDidMount() {
     // alert(JSON.stringify(GLOBAL.newsData.share_link))
  }

  onShare = async () => {

    // alert(JSON.stringify(GLOBAL.newsData.share_link))
    var commonHtml = `${GLOBAL.newsData.share_link}`;



   var a = commonHtml

   try {
      const result = await Share.share({
        message:a ,
        url:''
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }


  };


  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>

      <StatusBar
             backgroundColor = "black"
         

           />

         <ScrollView style={{flex:1,height:'100%'}}>

        <ImageBackground style={{height:300,width:'100%',resizeMode:'contain'}} source={{ uri: GLOBAL.newsData.image}}>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center',marginTop:18}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Image style={{height:18,width:22,resizeMode:'contain'}} source={require('./leftagain.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onShare()}>
            <Image style={{height:24,width:22,resizeMode:'contain'}} source={require('./share3.png')} />
            </TouchableOpacity>
           
           </View>
          </ImageBackground>

          <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:22,marginLeft:16}}>{GLOBAL.newsData.published_date}</Text>
          <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:5,marginLeft:16,width:'90%',lineHeight:23}}>{GLOBAL.newsData.title}</Text>
          
          <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#757575',marginTop:10,marginLeft:16,width:'90%',lineHeight:20}}>{GLOBAL.newsData.news_subheading}</Text>
        
         


          <View style={{marginLeft:16,width:'90%'}}>
          <HTML html={GLOBAL.newsData.news_desc} imagesMaxWidth={Dimensions.get('window').width} />
          </View>

         </ScrollView>

       </SafeAreaProvider>
       
       
       );
      
      }
      
    }  


export default NewsDetail; 