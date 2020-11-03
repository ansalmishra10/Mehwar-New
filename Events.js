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





class Events extends React.Component {
constructor(props){
    super(props);

     this.state = {

      loading:'',
      image:'',
      date:'',
      location:'',
      title:'',
      FlatListItem: [],

     }
  }


  componentDidMount() {

   
     this.getEvent();

    

  }

  showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



  getEvent=()=> {

     

     const url = GLOBAL.BASE_URL +  'fetch_events'

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
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       

        
                  // alert(JSON.stringify(responseData.data))
                  this.setState({ FlatListItem: responseData.data})
                  this.setState({title: responseData.data[0].title})
                  this.setState({location: responseData.data[0].location})
                  this.setState({image: responseData.data[0].image})
                  this.setState({date: responseData.data[0].event_date_time})

                  
                  

          this.hideLoading()
        
      
}else {
  alert("Invalid Credentials")
}
               
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

     

      
  }



  renderItem=({item, index}) => {
       
    return(

<View>




<TouchableOpacity  style={{height:80,width:'90%',alignSelf:'center',flexDirection:'row',alignItems:'center',marginTop:10,justifyContent:'space-between'}} onPress={()=>this.toEvent(item)}>




 
  <View style={{flexDirection:'column',width:'60%'}}>

   <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2'}}>{item.event_date_time}</Text>
   <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:4,lineHeight:20}}>{item.title}</Text>
   <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',marginTop:4}}>{item.location}</Text>
  </View>




   <Image style={{height:66, width:120, resizeMode:'cover',borderRadius:5}} source={{ uri: item.image}} />


  
</TouchableOpacity>

 <View style={{height:1,width:'90%',backgroundColor:'#00000033',marginTop:12,alignSelf:'center'}}>
 </View>

 

 

 </View>

)
}


 _keyExtractor=(item, index)=>item.key;


 toEvent=(item)=> {

   GLOBAL.eventData = item
    // alert(JSON.stringify(item))
    this.props.navigation.navigate('EventDet')

 }

  

  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "white"
         

           />

           
                    <ScrollView style={{flex:1,backgroundColor:'white'}}>


                     <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:27,marginLeft:20}}>{stringsoflanguages.event}</Text>

                     <ImageBackground style={{height:170,width:Dimensions.get('window').width-34,resizeMode:'cover',marginTop:22,alignSelf:'center'}} imageStyle={{borderRadius:8}} source={{ uri: this.state.image }}> 
                     <View style={{width:Dimensions.get('window').width-34,height:170,alignSelf:'center',backgroundColor:'rgba(0,0,0,0.6)',borderRadius:8}}>
                        <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'white',marginTop:72,marginLeft:17}}>{this.state.date}</Text>
                        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'white',marginTop:5,marginLeft:17,lineHeight:20}}>{this.state.title}</Text>
                        <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'white',marginTop:5,marginLeft:17}}>{this.state.location}</Text>
                      </View>
                     </ImageBackground>


                       <View style={{height:'auto',marginTop:18}}>
                    <FlatList  
                       data={this.state.FlatListItem}
                      
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                    />

                    </View>
                    </ScrollView>
      </SafeAreaProvider>

      );
  }
}

export default Events;