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


class Sdetails extends React.Component {
  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "white"
         

           />

           <View style = {{height:60,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:3}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./left.png')}
                                style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'#161F3DCC',fontFamily:'AvenirLTStd-Heavy',fontSize: 22,marginLeft:115}}>
                         Survey
              
          


                       </Text>


                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'white'}}>

                     <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:25,width:'88%'}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>By Admin</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>2 hours ago</Text>
      </View>

     </View>

      <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:28,marginTop:22}}>What comes first in your</Text>
      <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:28,marginTop:3}}>mind when you hear the</Text>
      <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:28,marginTop:3}}>word Maggi?</Text>

      <View style={{flexDirection:'row',alignItems:'center',width:'88%',backgroundColor:'white',height:50,borderRadius:25,elevation:2,alignSelf:'center',marginTop:28}}>
      <TouchableOpacity style={{marginLeft:20}}>
       
        
        
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />

        
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginLeft:15}}>Noodles</Text>
     </View>

     <View style={{flexDirection:'row',alignItems:'center',width:'88%',height:50,borderRadius:25,elevation:2,alignSelf:'center',marginTop:23,backgroundColor:'white'}}>
      <TouchableOpacity style={{marginLeft:20}}>
       
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />

       
        
        
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginLeft:15}}>Fast food</Text>
     </View>

     <View style={{flexDirection:'row',alignItems:'center',width:'88%',height:50,borderRadius:25,elevation:2,backgroundColor:'white',alignSelf:'center',marginTop:23}}>
      <TouchableOpacity style={{marginLeft:20}}>
       
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />

       
        
       
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginLeft:13}}>Snacks</Text>
     </View>


      <TouchableOpacity style={{height:50,width:'88%',alignSelf:'center',marginTop:40,borderRadius:25,elevation:2,marginBottom:10,backgroundColor:'#1357A2',justifyContent:'center'}}>
         <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Submit</Text>
      </TouchableOpacity>

                     </ScrollView>


                   </SafeAreaProvider>  

      );
  }
}

export default Sdetails;