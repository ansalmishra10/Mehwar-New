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




class EventDet extends React.Component {
  constructor(props){
    super(props);

     this.state = {

      loading:'',
      status:0,
      changeStats1:GLOBAL.eventData.interested_status,
      changeStats2:GLOBAL.eventData.going_status,
      go: GLOBAL.eventData.people_going_count,
      inst: GLOBAL.eventData.people_interested_count,
      

     }
  }

  showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

  componentDidMount() {
     // alert(JSON.stringify(GLOBAL.eventData.going_status))
  }


  onShare = async () => {

    // alert(JSON.stringify(GLOBAL.newsData.share_link))
    var commonHtml = `${GLOBAL.eventData.share_link}`;



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




  sendData=()=> {

    var I = parseInt(this.state.inst)

     
   
     this.setState({ status: 1})


   
    this.timeoutCheck = setTimeout(() => {
    
    // alert(JSON.stringify(this.state.status))

    const url = GLOBAL.BASE_URL +  'submit_event_status'

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

              "event_id":GLOBAL.eventData.id,
              "status":this.state.status
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       
                  // this.setState({ inst : I + 1})
                   // this.setState({ imageget: 1})

                   // this.getEvent();
        
                   // alert(JSON.stringify(responseData.interested_status))
                   // alert(JSON.stringify(responseData.people_interested_count))
                   this.setState({ changeStats1: responseData.interested_status})
                   this.setState({ inst: responseData.people_interested_count })
                   // this.setState({changeStats2: 0})
                   // alert(JSON.stringify(GLOBAL.eventData))

                  
                  

          this.hideLoading()
        
      
}else {
  alert("Invalid Credentials")
}
               
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })



    },500);
     

  }

  sendData1=()=> {

    var G = parseInt(this.state.go)

     
     
       this.setState({ status: 2})

    



     this.timeoutCheck = setTimeout(() => {
       // alert(JSON.stringify(this.state.status

        const url = GLOBAL.BASE_URL +  'submit_event_status'

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

              "event_id":GLOBAL.eventData.id,
              "status":this.state.status
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       
                   // this.setState({ go : G + 1})
                   // this.setState({ imageget1: 1})
                  // alert(JSON.stringify(responseData))
                   this.setState({ changeStats2: responseData.going_status})
                   this.setState({ go : responseData.people_going_count })
                   // this.setState({ changeStats1: 0 })
                   
                  

                  
                  

          this.hideLoading()
        
      
}else {
  alert("Invalid Credentials")
}
               
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })


    },500);

      
  }


  // sendDataAgain=()=> {
  //   var i = parseInt(this.state.inst)

  //   this.setState({ inst : i - 1})

  //    this.setState({ changeStats1 : 0})

  // }


  // sendData1Again=()=> {

  //   var g = parseInt(this.state.go)

  //   this.setState({ go : g - 1})

  //    this.setState({ changeStats2 : 0})

  // }


  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "black"
         

           />
           <ScrollView style={{height:'100%'}}>
           <ImageBackground style={{height:250,width:'100%',resizeMode:'cover'}} source={{ uri: GLOBAL.eventData.image}}>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center',marginTop:15}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Image style={{height:18,width:22,resizeMode:'contain'}} source={require('./leftagain.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onShare()}>
            <Image style={{height:24,width:22,resizeMode:'contain'}} source={require('./share3.png')} />
            </TouchableOpacity>

           </View>
           </ImageBackground>

           <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2',marginLeft:18,marginTop:20}}>{GLOBAL.eventData.event_date_time}</Text>
           <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:18,marginTop:6,width:'88%',lineHeight:25}}>{GLOBAL.eventData.title}</Text>
           <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginLeft:18,marginTop:8,width:'85%',lineHeight:20}}>{GLOBAL.eventData.subtitle}</Text>
                   
           
           <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginTop:20,alignSelf:'center',justifyContent:'space-between'}}>

            <View style={{flexDirection:'column',width:'40%'}}>
            <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2'}}>{this.state.go}</Text>
            <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:2}}>people going</Text>
            </View>


            <View style={{flexDirection:'column',width:'40%'}}>
            <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2'}}>{this.state.inst}</Text>
            <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:2}}>people Interested</Text>
            </View>

          </View>

          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:18,marginTop:20}}>Location</Text>
          <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginLeft:18,marginTop:8,lineHeight:20,width:'90%'}}>{GLOBAL.eventData.location}</Text>
          

          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:27,marginLeft:18}}>Organizer</Text>

          <View style={{flexDirection:'row',alignItems:'center',marginTop:14,width:'90%',alignSelf:'center'}}>
           <Image style={{height:40,width:40,resizeMode:'cover',borderRadius:20}} source={{ uri: GLOBAL.eventData.organizer_image}} />
           <View style={{flexDirection:'column',marginLeft:10}}>
             <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{GLOBAL.eventData.organizer_name}</Text>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginTop:2}}>{GLOBAL.eventData.organizer_mobile}</Text>
           </View>
          </View>


          <View style={{flexDirection:'row',alignItems:'center',width:'90%',alignSelf:'center',justifyContent:'space-between',marginTop:120}}>

            

             { this.state.changeStats1 == false && (
             <TouchableOpacity style={{height:52,borderRadius:5,width:'48%',backgroundColor:'#1357A2',elevation:2,justifyContent:'center'}} onPress={()=>this.sendData()}>
              <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Interested</Text>
             </TouchableOpacity>
             )}

             { this.state.changeStats1 == true && (
             <TouchableOpacity style={{height:52,borderRadius:5,width:'48%',backgroundColor:'#3BB44A',elevation:2,justifyContent:'center'}} onPress={()=>this.sendData()}>
              <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Interested</Text>
             </TouchableOpacity>
             )}

          
            
            

            { this.state.changeStats2 == false &&  (
             <TouchableOpacity style={{height:52,borderRadius:5,width:'48%',backgroundColor:'#1357A2',elevation:2,justifyContent:'center'}} onPress={()=>this.sendData1()}>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Going</Text>
             </TouchableOpacity>
            )}

            { this.state.changeStats2 == true && (
             <TouchableOpacity style={{height:52,borderRadius:5,width:'48%',backgroundColor:'#3BB44A',elevation:2,justifyContent:'center'}} onPress={()=>this.sendData1()}>
               <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Going</Text>
             </TouchableOpacity>
            )}

           

          </View>
        </ScrollView>

      </SafeAreaProvider>

      );
  }
}

export default EventDet;