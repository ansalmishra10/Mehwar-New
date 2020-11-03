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
import Pie from 'react-native-pie';
import {Surface, Shape} from '@react-native-community/art';




class Report extends React.Component {
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


      
    <View style={{marginTop:40,alignSelf:'center'}}>

      <Pie
              radius={150}
              
              sections={[
                
                {
                  percentage: 30,
                  color: '#A51FEA',
                  value:'40%'
                },
                {
                  percentage: 30,
                  color: '#0073F9',
                },
                {
                  percentage: 40,
                  color: '#003F99',
                },
              ]}
              dividerSize={1}
              strokeCap={'butt'}
            />



       </View> 


       <Text style={{fontSize:24,fontFamily:'AvenirLTStd-Medium',color:'white',position:'absolute',bottom:310,left:100}}>40%</Text>
       <Text style={{fontSize:24,fontFamily:'AvenirLTStd-Medium',color:'white',position:'absolute',bottom:335,right:102}}>30%</Text>
       <Text style={{fontSize:24,fontFamily:'AvenirLTStd-Medium',color:'white',position:'absolute',bottom:210,left:200}}>30%</Text>
                   
         <View style={{flexDirection:'row',marginTop:47,width:'86%',alignSelf:'center',alignItems:'center'}}>
             <View style={{height:15,width:15,backgroundColor:'#003F99',borderRadius:7.5}}>
             </View>

             <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:8,width:'82%'}}>Noodles</Text>
            <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#003F99'}}>40%</Text>
         </View>


         <View style={{flexDirection:'row',marginTop:24,width:'86%',alignSelf:'center',alignItems:'center'}}>
             <View style={{height:15,width:15,backgroundColor:'#0073F9',borderRadius:7.5}}>
             </View>

             <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:8,width:'82%'}}>Fast Food</Text>
            <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#0073F9'}}>30%</Text>
         </View>


         <View style={{flexDirection:'row',marginTop:24,width:'86%',alignSelf:'center',alignItems:'center'}}>
             <View style={{height:15,width:15,backgroundColor:'#A51FEA',borderRadius:7.5}}>
             </View>

             <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:8,width:'82%'}}>Snacks</Text>
            <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#A51FEA'}}>30%</Text>
         </View>
            
       
                     </ScrollView>
         


                   </SafeAreaProvider>  

      );
  }
}

export default Report;