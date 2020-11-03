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
  ActivityIndicator,



  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');



class ProfileScreen extends React.Component {

  constructor(props){
    super(props);

     this.state = {
         loading:'',
         name:'',
         email:'',
         phone:'',
         image:'',
         
         
      
     }

   }

   showLoading() {
        this.setState({loading: true})
    }


   hideLoading() {
        this.setState({loading: false})
    } 


   componentDidMount() {


        // window.location.reload(false);



       this.getData();
        
      
    
   }


   navigateToScreen1 = (route) => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }

    _YesLogout=()=>{

      AsyncStorage.removeItem('userID');

      GLOBAL.userID = ''
      this.props.navigation.reset({
               index:0,
               routes:[{ name: 'LoginScreen'}],
      });
         
       // this.props.navigation.navigate('LoginScreen') 

      

    }

   getData=()=> {
     const url = GLOBAL.BASE_URL +  'fetch_user_profile'

          this.showLoading()
            
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token,
                'language': GLOBAL.lang,
            },
            
            body: JSON.stringify({
              
              "user_id":GLOBAL.userID,
             
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

   
    



        

             

            

            // alert(JSON.stringify(responseData))
            this.setState({name: responseData.data.name})
            this.setState({email: responseData.data.email})
            this.setState({phone: responseData.data.phone})
            this.setState({image: responseData.data.image})
        
          this.hideLoading()
         // this.props.navigation.replace('AddScreen')
      
        // AsyncStorage.setItem('userID', responseData.user_id);
      

           
      })
      .catch((error) =>{
        console.error(error);
      })

   }

   shareLink=()=> {
     
     Linking.openURL('http://139.59.76.223/mehwar_app/build/index.php')
   }


  render() {
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {{position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'}}

       size="large" color="#e41582" />
        </View>
      )
    }
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "white"
         

           />

           
                <View style={{flex:1,backgroundColor:'white'}}>

                    

                  <View style={{height:120,width:'90%',alignSelf:'center',backgroundColor:'#1357A2',borderRadius:6,marginTop:20}}>
                       
                    <TouchableOpacity style={{marginTop:14,marginRight:13}} onPress={()=>this.props.navigation.navigate('EditScreen1')}>
                      <Image style={{height:16,width:20,resizeMode:'contain',alignSelf:'flex-end'}} source={require('./User4.png')} />
                    </TouchableOpacity>
                      
                      <View style={{flexDirection:'row',alignItems:'center',marginLeft:20,marginTop:-8}}>


                       <Image style={{height:75,width:75,resizeMode:'cover',borderRadius:37.5}} source={{ uri: this.state.image }} />

                       <View style={{flexDirection:'column',marginLeft:18}}>
                         <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'white'}}>{this.state.name}</Text>
                         <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'white',marginTop:5}}>{this.state.email}</Text>
                         <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'white',marginTop:4}}>{this.state.phone}</Text>
                       </View>
                      </View>
                    </View>

                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:30,width:'90%'}}>
                    <Image style={{height:33,width:33,resizeMode:'contain',marginLeft:10}} source={require('./rate.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>Rate us on Play Store</Text>
                    <Image style={{height:10,width:6,resizeMode:'contain',marginLeft:115}} source={require('./arrow.png')} />
                    </TouchableOpacity>

                    <View style={{height:1,width:'69.5%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>

                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:15,width:'90%'}}>
                    <Image style={{height:33,width:33,resizeMode:'contain',marginLeft:10}} source={require('./share2.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>Contact Us</Text>
                    <Image style={{height:10,width:6,resizeMode:'contain',marginLeft:187}} source={require('./arrow.png')} />
                    </TouchableOpacity>

                    <View style={{height:1,width:'69.5%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>

                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:15,width:'90%'}} onPress={()=>this.shareLink()}>
                    <Image style={{height:33,width:33,resizeMode:'contain',marginLeft:10}} source={require('./share2.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>Share</Text>
                    <Image style={{height:10,width:6,resizeMode:'contain',marginLeft:227}} source={require('./arrow.png')} />
                    </TouchableOpacity>

                    <View style={{height:1,width:'69.5%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>


                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:15,width:'90%'}}>
                    <Image style={{height:33,width:33,resizeMode:'contain',marginLeft:10}} source={require('./share2.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>App Version</Text>
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:163}}>1.0</Text>
                   
                    </TouchableOpacity>

                    <View style={{height:1,width:'69%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>
                    
                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:15,width:'90%'}} onPress={()=>this.props.navigation.navigate('TCScreen')}>
                    <Image style={{height:33,width:33,resizeMode:'contain',marginLeft:10}} source={require('./t&c.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>Terms & Conditions</Text>
                    <Image style={{height:10,width:6,resizeMode:'contain',marginLeft:124}} source={require('./arrow.png')} />
                    </TouchableOpacity>


                    <View style={{height:1,width:'69%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>

                    

                    <TouchableOpacity style={{flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:15,width:'90%'}} onPress={()=>this.navigateToScreen1()}>
                    <Image style={{height:34,width:34,resizeMode:'contain',marginLeft:10}} source={require('./logout.png')} />
                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#000000B3',marginLeft:22}}>Sign Out</Text>
                    <Image style={{height:10,width:6,resizeMode:'contain',marginLeft:200}} source={require('./arrow.png')} />
                    </TouchableOpacity>


                    <View style={{height:1,width:'69%',marginLeft:85,backgroundColor:'#0000000D',marginTop:15}}>
                    </View>


                    </View>

                    




      </SafeAreaProvider>


      );
  }
}

export default ProfileScreen;