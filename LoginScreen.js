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
  BackHandler,



  } from 'react-native';


import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from "react-native-fbsdk";

class LoginScreen extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        mobile:'',
        password:'',
        ḷoading:'',
    }
  }

  showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount() {
      
      // alert(JSON.stringify(GLOBAL.lang))
      GoogleSignin.configure({
     webClientId:
       '43306572309-07ve2gu9fr6v0e7v6uhjruio1r0i4suj.apps.googleusercontent.com',
     offlineAccess: true,
     hostedDomain: '',
     forceConsentPrompt: true,
   });


      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount(){
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   


    handleBackButton=()=>{

      BackHandler.exitApp()

   }



  login=()=> {

    // this.props.navigation.navigate('ManageScreen')

       if (this.state.mobile == '') {
       
       alert('Enter your Phone No.')
        
        }


       else if (this.state.password == '') {

        alert('Enter your Password')
       
       } 

    else {
       
       const url = GLOBAL.BASE_URL +  'login'

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
              
              "phone": this.state.mobile,
              "password": this.state.password,
              "device_id":"",
              "device_type": Platform.OS,
              "device_token":GLOBAL.firetoken,
              "model_name":"",

              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

     this.hideLoading()
    if (responseData.status == true ) { 


       

        // alert(JSON.stringify(responseData.user.language))
          
          AsyncStorage.setItem('token', responseData.token);
          AsyncStorage.setItem('lang', responseData.language);
          AsyncStorage.setItem('userID', responseData.user.id);
         // AsyncStorage.setItem('token', responseData.token);
          // GLOBAL.ref = responseData.refferral_code

          GLOBAL.userID = responseData.user.id
          GLOBAL.token = responseData.token
          GLOBAL.lang = responseData.language
        
           // alert(JSON.stringify(GLOBAL.token))
         this.props.navigation.navigate('ManageScreen')
          
     
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      }

    

        

  
  }


   loginWithGoogle = async () => {
   try {
     await GoogleSignin.hasPlayServices();
     const userInfo = await GoogleSignin.signIn();
     // alert(JSON.stringify(userInfo));

     const url = GLOBAL.BASE_URL +  'social_login'

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
              "email":userInfo.user.email,
              "name": userInfo.user.name,
              "auth":"google",
              "image": userInfo.user.photo,
              "device_id":"",
              "device_type":Platform.OS,
              "device_token":GLOBAL.firetoken,
              "model_name":"",
              "social_id": userInfo.user.id, 
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       
                  
                   // alert(JSON.stringify(responseData.language))

          AsyncStorage.setItem('token', responseData.token);
          AsyncStorage.setItem('lang', responseData.language);
          
          AsyncStorage.setItem('userID', responseData.user.id);
         // AsyncStorage.setItem('token', responseData.token);
          // GLOBAL.ref = responseData.refferral_code

          GLOBAL.userID = responseData.user.id
          GLOBAL.token = responseData.token
          GLOBAL.lang = responseData.language
        
           // alert(JSON.stringify(GLOBAL.token))
          this.props.navigation.navigate('ManageScreen')
                  

                  
                  

          this.hideLoading()
        
      
}else {
  alert("Not authourized")
}
               
             

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })


     // console.log(JSON.stringify(userInfo, null, 2));
   } catch (error) {
     console.log(JSON.stringify(error, null, 2));
     // alert(error.code);
     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       // user cancelled the login flow
     } else if (error.code === statusCodes.IN_PROGRESS) {
       // operation (f.e. sign in) is in progress already
     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
       // play services not available or outdated
     } else {
       // some other error happened
     }
   }
 };


  facebook=()=> {

    LoginManager.logInWithPermissions(["public_profile"]).then(
  function(result) {
    console.log(result)
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {


      AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    // console.log(data.accessToken.toString())
                    // alert(JSON.stringify(data))

                    fetch('https://graph.facebook.com/v2.5/me?fields=birthday,email,hometown,name,picture.type(large),friends&access_token=' + data.accessToken)
            .then((response) => response.json())
            .then((responseData) => {

               alert(JSON.stringify(responseData))

              if ("email" in responseData) {

                    const url = GLOBAL.BASE_URL +  'social_login'

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
              "email":responseData.email,
              "name":responseData.name,
              "auth":"facebook",
              "image":responseData.picture.data.url,
              "device_id":"",
              "device_type":Platform.OS,
              "device_token":GLOBAL.firetoken,
              "model_name":"",
              "social_id": responseData.id,
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       
                  
          AsyncStorage.setItem('token', responseData.token);
          AsyncStorage.setItem('lang', responseData.language);
          AsyncStorage.setItem('userID', responseData.user.id);
         // AsyncStorage.setItem('token', responseData.token);
          // GLOBAL.ref = responseData.refferral_code

          GLOBAL.userID = responseData.user.id
          GLOBAL.token = responseData.token
          GLOBAL.lang = responseData.language
        
           // alert(JSON.stringify(GLOBAL.token))
          this.props.navigation.navigate('ManageScreen')



                  

                  
                  

          this.hideLoading()
        
      
}else {
  alert("Not authourized")
}
               
             

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

            }


            else {

               alert('Your account not associate with email address')

            }


              // alert(JSON.stringify(responseData))

            })
            .catch(() => {

            })
                  }
                )

      
      // console.log(
      //   "Login success with permissions: " +
      //     result.grantedPermissions.toString()
      // );
    }
  },
  function(error) {
    console.log("Login fail with error: " + error);
  }
);


  }

  touch=()=> {
    LoginManager.logOut();
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

      <SafeAreaView>
        
        <StatusBar
             backgroundColor = "black"
         

           />

              
              
              

                       <ImageBackground style={{resizeMode:'contain',height:'100%',width:Dimensions.get('window').width}} source={require('./signup.png')}>

                       <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>

                       <ImageBackground style={{height:86,width:241,alignSelf:'center',resizeMode:'contain',marginTop:142,justifyContent:'center'}} source={require('./dots.png')} >

                         <View style={{height:84,width:84,alignSelf:'center',backgroundColor:'white',borderRadius:15,elevation:3,justifyContent:'center'}}>
                           <Image style={{height:50,width:50,resizeMode:'contain',alignSelf:'center'}} source={require('./newlogo2.png')} />
                         </View>
                       </ImageBackground>


                       <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',alignSelf:'center',marginTop:30}}>{stringsoflanguages.hello}</Text>
                       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',alignSelf:'center',marginTop:7}}>{stringsoflanguages.hey}</Text>


                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:45,marginLeft:'6.5%'}}>{stringsoflanguages.mob}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.mob}

             placeholderTextColor="#161F3D"
             
             
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />
                       </View>



                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:45,marginLeft:'6.5%'}}>{stringsoflanguages.pass}</Text>

                       <View style={{flexDirection:'row',alignItems:'center',height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'space-between',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'65%',height:42}}
             placeholder={stringsoflanguages.pass}

             placeholderTextColor="#161F3D"
             
             secureTextEntry={true}
             onChangeText={(text) => this.setState({password: text})}
             value={this.state.password}
             />

              <TouchableOpacity style={{marginTop:15}} onPress={()=>this.props.navigation.navigate('Forget')}>
              <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'#161F3DB3'}}>{stringsoflanguages.forg}</Text>
              </TouchableOpacity>
                       </View>

                       <TouchableOpacity style={{height:52,width:'88%',backgroundColor:'#1357A2',borderRadius:4,justifyContent:'center',alignSelf:'center',marginTop:30}} onPress={()=>this.login()}>
                         <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>{stringsoflanguages.sign}</Text>
                       </TouchableOpacity>

                       <View style={{flexDirection:'row',alignItems:'center',width:'80%',alignSelf:'center',justifyContent:'space-between',marginTop:24}}>
                        <View style={{height:1,width:'42%',backgroundColor:'#ACB1C0'}}>
                        </View>
                          <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'#ACB1C0'}}>{stringsoflanguages.or}</Text>
                        <View style={{height:1,width:'42%',backgroundColor:'#ACB1C0'}}>
                        </View>
                       </View>

                       <TouchableOpacity style={{width:'88%',alignSelf:'center',height:48,marginTop:23,borderRadius:6,backgroundColor:'#2672CB',flexDirection:'row',alignItems:'center'}} onPress={()=>this.facebook()}>
                        <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:25}} source={require('./Facebook.png')} />
                        <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'white',marginLeft:35}}>{stringsoflanguages.connect}</Text>
                       </TouchableOpacity>

                       <TouchableOpacity style={{width:'88%',alignSelf:'center',height:48,marginTop:12,borderRadius:6,backgroundColor:'white',borderWidth:1,borderColor:'#97979780',flexDirection:'row',alignItems:'center'}} onPress={()=>this.loginWithGoogle()}>
                        <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:25}} source={require('./google.png')} />
                        <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:35}}>{stringsoflanguages.connect2}</Text>
                       </TouchableOpacity>


                       <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:25,marginBottom:50}}>

                         <TouchableOpacity onPress={()=>this.touch()}>
                         <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#1D1D2680'}}>{stringsoflanguages.new}</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={{marginLeft:5}} onPress={()=>this.props.navigation.navigate('SignupScreen')}>
                         <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#2672CB'}}>{stringsoflanguages.up}</Text>
                         </TouchableOpacity>
                       </View>




                       

                       </KeyboardAwareScrollView>  

                       </ImageBackground>

                       

              



      </SafeAreaView>

      );
  }
}

export default LoginScreen;