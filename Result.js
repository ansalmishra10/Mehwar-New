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




 const initialLayout = { width: Dimensions.get('window').width };

 const FirstRoute = () => (
  <ScrollView style={{width :Dimensions.get('window').width,backgroundColor:'#e3e3e3'}}>

   <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:20,borderRadius:8}}>

     <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>By Admin</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>2 hours ago</Text>
      </View>

     </View>

     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12}}>How was your experience today?</Text>

     <View style={{flexDirection:'row',alignItems:'center',width:'90%',height:50,borderRadius:25,borderWidth:1,borderColor:'#979797',alignSelf:'center',marginTop:16}}>
      <TouchableOpacity style={{marginLeft:20}}>
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3DCC',marginLeft:13}}>Excelent</Text>
     </View>

     <View style={{flexDirection:'row',alignItems:'center',width:'90%',height:50,borderRadius:25,borderWidth:1,borderColor:'#979797',alignSelf:'center',marginTop:16}}>
      <TouchableOpacity style={{marginLeft:20}}>
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3DCC',marginLeft:13}}>Good</Text>
     </View>

     <View style={{flexDirection:'row',alignItems:'center',width:'90%',height:50,borderRadius:25,borderWidth:1,borderColor:'#979797',alignSelf:'center',marginTop:16}}>
      <TouchableOpacity style={{marginLeft:20}}>
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
      </TouchableOpacity>

      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3DCC',marginLeft:13}}>Average</Text>
     </View>

     <TouchableOpacity style={{height:35,width:120,borderRadius:17.5,backgroundColor:'#1357A2',marginBottom:23,marginTop:23,alignSelf:'center',justifyContent:'center'}}>
       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Submit</Text>
     </TouchableOpacity>
   </View>

   <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:12,borderRadius:8}}>
      <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./use.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>By Admin</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>2 hours ago</Text>
      </View>

     </View>
      
      <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12}}>Protective Measures Against Coronavirus</Text>
      <View style={{flexDirection:'row',alignItems:'center',marginLeft:16,marginTop:2}}>
      <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#161F3D'}}>(COVID-19)</Text>
      <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#1357A2',marginLeft:2}}>....Read More</Text>
      </View>

      <Image style={{height:152,width:'91%',alignSelf:'center',resizeMode:'cover',marginTop:16,borderRadius:8}} source={require('./post.png')} />
      
      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:20}}>
        <Image style={{width:20,height:17,resizeMode:'contain'}} source={require('./like.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>1125</Text>
        
        <TouchableOpacity style={{marginLeft:28}} onPress={()=>this.props.navigation.navigate('Comment')}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>348</Text>
        </TouchableOpacity>

        <Image style={{height:20,width:22,resizeMode:'contain',marginLeft:157}} source={require('./share.png')} />
      </View>
   </View>

   <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:12,borderRadius:8}}>
    <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>By Admin</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>2 hours ago</Text>
      </View>

     </View>

     <ImageBackground style={{height:230,width:'96%',resizeMode:'stretch',marginLeft:15,marginTop:20,justifyContent:'flex-end'}} source={require('./post2.png')} imageStyle={{borderRadius:8}}>

      <Image style={{width:65,height:62,resizeMode:'contain',marginLeft:18,marginBottom:-5}} source={require('./rec.png')} />
     </ImageBackground>

     <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:20}}>
        <Image style={{width:20,height:17,resizeMode:'contain'}} source={require('./like.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>1125</Text>

       <TouchableOpacity style={{marginLeft:28}} onPress={()=>this.props.navigation.navigate('Comment')}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>348</Text>
        </TouchableOpacity>

        <Image style={{height:20,width:22,resizeMode:'contain',marginLeft:157}} source={require('./share.png')} />
      </View>

   </View>
       
  </ScrollView>
);
 
const SecondRoute = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecRoute!</Text>
    </View>
);

const ThirdRoute = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecRoute!</Text>
    </View>
);


const FourthRoute = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecRoute!</Text>
    </View>
);


const FifthRoute = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecRoute!</Text>
    </View>
);

const SixthRoute = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SecRoute!</Text>
    </View>
);

const icon1 = require('./google.png');
 
  

 class Result extends React.Component {
   constructor() {
    super();
     this.state={
        name:'',
        email:'',
        mobile:'',
        password:'',
        icon:'',
        index:0,
        routes: [
      { key: "first",title:"first"},
      { key: "second",title:"second"},
      { key: "third",title:"third"},
      { key: "forth",title:"forth"},
      { key: "fifth",title:"fifth"},
      { key: "sixth",title:"sixth"},
      
    ],
       
     }
  }
    


 // _renderIcon = ({ routes, color, focused}) => {
  

 //  if (routes.key === 'first') {
 //              icon = focused
 //              ? require('./home1.png')
 //              : require('./home.png')
 //            } else if(routes.key === 'second'){
 //              icon= focused
 //              ? require('./news1.png')
 //              : require('./news.png')
 //            } 



 //            // You can return any component that you like here!
 //            return<Image
 //                            source={icon}
 //                            style={{height:25, width:25, resizeMode:'contain'}}
 //                        />;
 //  }


 // _renderTabBar = () => {
 //    return (
 //      <TabBar
        
        
        
        
 //      />
 //    );
 //  };

  
 

  render() {
    
  const { index, routes } = this.state;
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
      forth: FourthRoute,
      fifth : FifthRoute,
      sixth: SixthRoute,
    });

    return(

      <ScrollView style={{width :Dimensions.get('window').width,height:'100%',flexDirection:'column',backgroundColor:'white'}}>
           

           <StatusBar
             backgroundColor = "#D7F0F7"
         

           />


           <View style={{width:'100%',justifyContent:'center'}}>


           <View style={{flexDirection:'row',alignItems:'center',width:'100%',marginTop:15}}>
           <Image style={{height:35,width:35,marginLeft:15,resizeMode:'contain'}} source={require('./logo2.png')} />
           <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:8,fontWeight:'bold'}}>Mehwar</Text>
           <Image style={{width:28,height:22,resizeMode:'contain',marginLeft:95}} source={require('./broadcast.png')} />
           <TouchableOpacity style={{marginLeft:21}} onPress={()=>this.props.navigation.navigate('Message')}>
           <Image style={{width:26,height:26,resizeMode:'contain'}} source={require('./message.png')} />
           </TouchableOpacity> 

           <TouchableOpacity style={{marginLeft:21}} onPress={()=>this.props.navigation.navigate('LiveScreen')}>
           <Image style={{width:30,height:38,resizeMode:'contain'}} source={require('./live.png')} />
           </TouchableOpacity> 


           </View>

           <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(i) => this.setState({ index: i })}
      
      initialLayout={initialLayout}
      tabBarPosition="top"
    />

           

           </View>


           

             

             
           </ScrollView>

      );
    }
  }

  export default Result;