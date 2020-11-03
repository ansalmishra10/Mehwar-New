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
import OTPInputView from '@twotalltotems/react-native-otp-input'
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');


class ResetScreen extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        code:'',
        new:'',
        confirm:'',
        loading:'',
       
    }
  }

  showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


  forgot=()=> {

    // this.props.navigation.navigate('ManageScreen')

       if (this.state.code == '') {
       
       alert('Enter your code')
        
        }


        else if (this.state.new == '') {

        alert('Enter your New Password')
       
       } 


       else if (this.state.confirm == '') {

        alert('Enter your New Password')
       
       } 


       else if (this.state.new.length < 6){
       alert('New Password must be 6 chracter long')
     }


     else if (this.state.confirm.length < 6){
       alert('Password must be 6 chracter long')
     }


      

    else {
       
       const url = GLOBAL.BASE_URL +  'verify_forgot_otp'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang,
            },
           
            body: JSON.stringify({
              
             "phone":GLOBAL.mobforgo,
             "otp":this.state.code,
             "new_password":this.state.new,
             "confirm_password":this.state.confirm,
             "device_id":"hhh",
             "device_type":"android",
             "device_token":"ndkfk",
             "model_name":"nffkmm"
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

        alert(JSON.stringify(responseData.message))

        // GLOBAL.forgetOtp = responseData.otp


          
         
        
          
        this.props.navigation.navigate('LoginScreen')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      }

    

        

  
  }


   componentDidMount() {

     // alert(JSON.stringify(GLOBAL.forgetOtp))
   }



  render() {
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

                        

                       
                       

                          <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:32,alignSelf:'center'}}>{stringsoflanguages.reset}</Text>
                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:12,alignSelf:'center'}}>{stringsoflanguages.code}</Text>

                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:3,alignSelf:'center',width:'80%',textAlign:"center",lineHeight:20}}>{stringsoflanguages.cret}</Text>
                       

                         <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:36,marginLeft:'6.5%'}}>{stringsoflanguages.res2}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.res2}

             placeholderTextColor="#161F3D"
             maxLength={4}
             
             onChangeText={(text) => this.setState({code: text})}
             value={this.state.code}
             />
                       </View>



                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:30,marginLeft:'6.5%'}}>{stringsoflanguages.newpass}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.newpass}
             maxLength={12}
             placeholderTextColor="#161F3D"
             secureTextEntry={true}
             
             onChangeText={(text) => this.setState({new: text})}
             value={this.state.new}
             />
                       </View>




                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:30,marginLeft:'6.5%'}}>{stringsoflanguages.confirm}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.confirm}
             maxLength={12}
             placeholderTextColor="#161F3D"
             secureTextEntry={true}
             
             onChangeText={(text) => this.setState({confirm: text})}
             value={this.state.confirm}
             />
                       </View>



                       

                       

                       <TouchableOpacity style={{marginTop:50,alignSelf:'center',width:'88%',height:52,borderRadius:4,backgroundColor:'#1357A2',justifyContent:'center',marginBottom:15}} onPress={()=>this.forgot()}>
                         <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
                       </TouchableOpacity>


                       



                       

                       </KeyboardAwareScrollView>  

                       </ImageBackground>

                       

              



      </SafeAreaView>

      );
  }
}

export default ResetScreen;