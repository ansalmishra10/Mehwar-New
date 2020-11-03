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


class Forget extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        name:'',
        email:'',
        mobile:'',
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

       if (this.state.mobile == '') {
       
       alert('Enter your Phone No.')
        
        }


      

    else {
       
       const url = GLOBAL.BASE_URL +  'forgot_otp'

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
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

        // alert(JSON.stringify(responseData))

        GLOBAL.forgetOtp = responseData.otp
        GLOBAL.mobforgo = this.state.mobile


          
         
        
          
        this.props.navigation.navigate('ResetScreen')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      }

    

        

  
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

                        

                       
                       

                          <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginTop:32,alignSelf:'center'}}>{stringsoflanguages.forg}</Text>
                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:12,alignSelf:'center'}}>{stringsoflanguages.ent}</Text>

                          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3DB3',marginTop:3,alignSelf:'center'}}>{stringsoflanguages.res}</Text>
                       

                         <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:50,marginLeft:'6.5%'}}>{stringsoflanguages.mob}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.mob}

             placeholderTextColor="#161F3D"
             
             
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />
                       </View>



                       

                       

                       <TouchableOpacity style={{marginTop:50,alignSelf:'center',width:'88%',height:52,borderRadius:4,backgroundColor:'#1357A2',justifyContent:'center'}} onPress={()=>this.forgot()}>
                         <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
                       </TouchableOpacity>


                       



                       

                       </KeyboardAwareScrollView>  

                       </ImageBackground>

                       

              



      </SafeAreaView>

      );
  }
}

export default Forget;