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
  import stringsoflanguages from './Language';
import LocalizedStrings from 'react-native-localization';
import React, {Component} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');






class StyleScreen extends React.Component {

 constructor() {
    super();
     this.state={

       imageget:0,
       imageget1:0,
       imageget2:0,
       lang:'',
     }
  }



  onClick=()=> {
    this.setState({imageget:1});
    this.setState({imageget1:0});
    this.setState({imageget2:0});
    this.setState({lang: 'english'})
    stringsoflanguages.setLanguage('en');
  }

  onClick1=()=> {
    this.setState({imageget:0});
    this.setState({imageget1:1});
    this.setState({imageget2:0});
    this.setState({lang: 'pashto'})
    stringsoflanguages.setLanguage('ps');
  }

  onClick2=()=> {
    this.setState({imageget:0});
    this.setState({imageget1:0});
    this.setState({imageget2:1})
    this.setState({lang: 'persian'})
    stringsoflanguages.setLanguage('fa');
  }


 componentDidMount() {
  this.onClick();

 }

  toLogin=()=> {

    GLOBAL.lang = this.state.lang
    // alert(JSON.stringify(GLOBAL.lang))
    this.props.navigation.navigate('LoginScreen')

  }




   render() {






    return (


      <SafeAreaProvider style={{backgroundColor:'white'}}>
         <StatusBar
             backgroundColor = "white"


           />



              <ScrollView style={{width:'100%'
            }}>

              

              <Text style={{fontSize:30,color:'#161F3D',fontFamily:'AvenirLTStd-Heavy',marginLeft:'5%',marginTop:27}}>Select</Text>
              <Text style={{fontSize:30,color:'#161F3D',fontFamily:'AvenirLTStd-Heavy',marginLeft:'5%',marginTop:3}}>Language</Text>

              <Text style={{fontSize:15,color:'#161F3D80',fontFamily:'AvenirLTStd-Medium',marginLeft:'5.5%',marginTop:12,width:'90%'}}>Please select a language that you can read and</Text>
              <Text style={{fontSize:15,color:'#161F3D80',fontFamily:'AvenirLTStd-Medium',marginLeft:'5.5%',marginTop:4,width:'90%'}}>understand comfortably</Text>

              {this.state.imageget == 0 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#979797',backgroundColor:'white',borderRadius:25,justifyContent:'space-between'}} onPress={()=>this.onClick()}>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:21}}>English</Text>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginRight:18}}>انګلیسي</Text>
              </TouchableOpacity>

              )}

              {this.state.imageget == 1 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#C7BC31',backgroundColor:'#C7BC31',borderRadius:25,justifyContent:'space-between'}}>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginLeft:21}}>English</Text>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginRight:18}}>انګلیسي</Text>

              </TouchableOpacity>

              )}

              {this.state.imageget1 == 0 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#979797',backgroundColor:'white',borderRadius:25,justifyContent:'space-between'}} onPress={()=>this.onClick1()}>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:21}}>Pashto</Text>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginRight:18}}>پشتو</Text>
              </TouchableOpacity>
              )}

              {this.state.imageget1 == 1 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#C7BC31',backgroundColor:'#C7BC31',borderRadius:25,justifyContent:'space-between'}}>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginLeft:21}}>Pashto</Text>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginRight:18}}>پشتو</Text>

              </TouchableOpacity>

              )}

              {this.state.imageget2 == 0 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#979797',backgroundColor:'white',borderRadius:25,justifyContent:'space-between'}} onPress={()=>this.onClick2()}>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:21}}>Persian</Text>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginRight:18}}>دری </Text>
              </TouchableOpacity>
              )}

              {this.state.imageget2 == 1 && (
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',height:100,width:'90%',alignSelf:'center',marginTop:31,borderWidth:2,borderColor:'#C7BC31',backgroundColor:'#C7BC31',borderRadius:25,justifyContent:'space-between'}}>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginLeft:21}}>Persian</Text>
              <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',marginRight:18}}>دری </Text>

              </TouchableOpacity>

              )}



              



              

              


              </ScrollView>

              <TouchableOpacity style={{height:52,width:'86%',alignSelf:'center',borderRadius:5,backgroundColor:'#1357A2',justifyContent:'center',position:'absolute',bottom:20}} onPress={()=>this.toLogin()}>

               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>Continue</Text>
              </TouchableOpacity>

      </SafeAreaProvider>







    );
  }
}

export default StyleScreen;