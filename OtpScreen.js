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
  ActivityIndicator,




  } from 'react-native';


import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');
import AsyncStorage from '@react-native-community/async-storage';


class SignupScreen extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        code:'',
        loading:'',
    }
  }

  showLoading() {
        this.setState({loading: true})
    }


   hideLoading() {
        this.setState({loading: false})
    } 

    componentDidMount() {
      alert(JSON.stringify(GLOBAL.otp))
    }



  onClick=()=> {

    

        const url = GLOBAL.BASE_URL +  'resend_otp'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang

            },
           
            body: JSON.stringify({
              
              "phone": GLOBAL.phone,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

         alert(JSON.stringify(responseJson.otp))

         // AsyncStorage.setItem('token', responseData.token);
         // GLOBAL.ref = responseData.refferral_code
        
         
         // this.props.navigation.navigate('Drawer')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })

  }

  toVerify=()=> {

   this.showLoading()
    // alert(JSON.stringify(GLOBAL.otp2))

    if (this.state.code == '') {
      alert('Please enter OTP for verification')
    }

    else {
      const url = GLOBAL.BASE_URL +  'verify_signup_otp'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang
            },
           
            body: JSON.stringify({
              
               "name":GLOBAL.name,
               "email":GLOBAL.email,
               "phone":GLOBAL.phone,
               "language":GLOBAL.lang,
               "password":GLOBAL.password,
               "device_id":"",
               "device_type":Platform.OS,
               "device_token":GLOBAL.firetoken,
               "model_name":"",
               "flag": GLOBAL.flag,
               "otp": GLOBAL.otp,


              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData.user.id))

    this.hideLoading()
    


       

           

          AsyncStorage.setItem('token', responseData.token);
          AsyncStorage.setItem('userID', responseData.user.id);
          AsyncStorage.setItem('lang', responseData.language);
          
         // AsyncStorage.setItem('token', responseData.token);
         // GLOBAL.ref = responseData.refferral_code
          GLOBAL.name2 = responseData.user.name
          GLOBAL.proimage = responseData.user.image
          GLOBAL.phone2 = responseData.user.phone
          GLOBAL.email2 = responseData.user.email
          GLOBAL.userID = responseData.user.id
          GLOBAL.token = responseData.token
          GLOBAL.lang = responseData.language



             alert(JSON.stringify(responseData.message))
         
             this.props.navigation.navigate('Complete');
      
        
      


           
      })
      .catch((error) =>{
        console.error(error);
      });

    }

    

  }



 // getData = async () => {
 //    try {
 //      const tokenvalue = await AsyncStorage.getItem('tok')
 //      const value = await AsyncStorage.getItem('user_id')
        
 //        alert(JSON.stringify(value))
       
 //    } catch(e) {
 //      // error reading value
 //    }
 //  }


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

      <SafeAreaView>
        
        <StatusBar
             backgroundColor = "rgba(0,0,0,0.1)"
         

           />

              
              
              

                       <ImageBackground style={{resizeMode:'contain',height:'100%',width:Dimensions.get('window').width}} source={require('./signup.png')}>

                       <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>

                        <ImageBackground style={{height:72,width:202,alignSelf:'center',resizeMode:'contain',justifyContent:'center',marginTop:145}} source={require('./dots.png')} >
                         
          
                          <View style={{height:84,width:84,alignSelf:'center',backgroundColor:'white',borderRadius:15,elevation:3,justifyContent:'center'}}>
                           <Image style={{height:50,width:50,resizeMode:'contain',alignSelf:'center'}} source={require('./newlogo2.png')} />
                         </View>  



                         
                       </ImageBackground>

                        

                       
                       

                          <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:32,alignSelf:'center'}}>{stringsoflanguages.verify}</Text>
                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:12,alignSelf:'center'}}>{stringsoflanguages.text}</Text>

                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:3,alignSelf:'center'}}>{stringsoflanguages.your}</Text>
                       

                         <OTPInputView
                style={{width: '85%', height: 200,alignSelf:'center',marginTop:-25}}
                pinCount={4}
    
                autoFocusOnLoad
                codeInputFieldStyle={{width: 65,height: 65,borderWidth:1,borderColor:'#34435633',elevation:2,fontSize:20,color:'black',borderRadius:15,backgroundColor:'white'}}
                codeInputHighlightStyle={{borderColor: "#FF8C00"}}
                onCodeChanged = {(code) => { this.setState({code: code})}}
                onCodeFilled = {(code => {
                    
                    GLOBAL.otp2 = code
                    
                    this.timeoutCheck = setTimeout(() => {
                    
                    this.toVerify();
                    
                    },2000);

               })}
                />  



                       <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#1D1D2650',marginTop:-24,alignSelf:'center'}}>{stringsoflanguages.not}</Text>

                       

                       <TouchableOpacity style={{marginTop:10,alignSelf:'center'}} onPress={()=>this.onClick()}>
                         <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2'}}>{stringsoflanguages.resend}</Text>
                       </TouchableOpacity>


                       



                       

                       </KeyboardAwareScrollView>  

                       </ImageBackground>

                       

              



      </SafeAreaView>

      );
  }
}

export default SignupScreen;