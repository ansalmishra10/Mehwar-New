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
import stringsoflanguages from './Language';
import { SafeAreaProvider } from 'react-native-safe-area-context';


class LiveScreen extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        say:'',
        
        
    }
  }


  render() {
    return(

      <SafeAreaProvider>
        
        <StatusBar
             backgroundColor = "rgba(0,0,0,0.1)"
         

           />

              
              
              

                       <ImageBackground style={{resizeMode:'contain',height:'100%',width:Dimensions.get('window').width}} source={require('./bg.png')}>

                       <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>

                       <View style={{width:'92%',flexDirection:'row',justifyContent:'space-between',marginTop:35,alignSelf:'center'}}>
                         <View style={{height:47,width:164,backgroundColor:'#00000040',borderRadius:23.5,flexDirection:'row',alignItems:'center'}}>
                            
                            <Image style={{height:34,width:34,resizeMode:'contain',marginLeft:8}} source={require('./user.png')} />

                            <View style={{flexDirection:'column',marginLeft:8}}>
                            <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'white'}}>Admin</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                            <Image style={{height:13,width:13,resizeMode:'contain'}} source={require('./time1.png')} />
                            <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'white',marginLeft:4,marginTop:2}}>00:55</Text>
                            <Image style={{height:13,width:11,resizeMode:'contain',marginLeft:12}} source={require('./user1.png')} />
                            <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'white',marginLeft:4,marginTop:2}}>50</Text>
                            </View>
                            </View>
                         </View>

                         <Image style={{height:30,width:30,resizeMode:'contain',marginTop:4}} source={require('./cross.png')} />
                       </View>

                       <View style={{height:40,flexDirection:'row',alignItems:'center',borderRadius:20,marginLeft:16,backgroundColor:'#00000040',width:250,marginTop:505}}>
                        <Image style={{height:30,width:30,resizeMode:'contain',marginLeft:6}} source={require('./pic2.png')} />
                        <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',marginLeft:7,color:'white',marginRight:15}}>Jean Walton : Awesome. Love it</Text>

                       </View>

                       <View style={{height:40,flexDirection:'row',alignItems:'center',borderRadius:20,marginLeft:16,backgroundColor:'#00000040',width:200,marginTop:22}}>
                        <Image style={{height:30,width:30,resizeMode:'contain',marginLeft:6}} source={require('./pic1.png')} />
                        <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',marginLeft:7,color:'white',marginRight:15}}>Willie Singleton : Wow...</Text>

                       </View>

                       <View style={{flexDirection:'row',alignItems:'center',width:'92%',alignSelf:'center',marginTop:30}}>

                       <View style={{height:40,flexDirection:'row',alignItems:'center',borderRadius:20,backgroundColor:'#00000040',width:196}}>
                        <Image style={{height:22,width:22,resizeMode:'contain',marginLeft:10}} source={require('./time.png')} />
                        <TextInput
                         style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'white',width:'60%',height:40,marginLeft:15}}
                         placeholder="Say something"

                         placeholderTextColor="white"
             
             
                         onChangeText={(text) => this.setState({say: text})}
                         value={this.state.say}
                         />

                       </View>

                       <TouchableOpacity style={{marginLeft:60}}>
                        <Image style={{height:43,width:43,resizeMode:'contain'}} source={require('./share1.png')} />
                       </TouchableOpacity>

                       <TouchableOpacity style={{marginLeft:15}}>
                        <Image style={{height:48,width:48,resizeMode:'contain'}} source={require('./love.png')} />
                       </TouchableOpacity>

                       </View>

                       </KeyboardAwareScrollView>

                      </ImageBackground>
      </SafeAreaProvider> 

       );

      }

    } 

    export default LiveScreen;
