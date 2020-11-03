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
import stringsoflanguages from './Language';
import ImagePicker from 'react-native-image-picker';
const GLOBAL = require('./Global');
import AsyncStorage from '@react-native-community/async-storage';

const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class SignupScreen extends React.Component{
  constructor(props) {
    super(props); 

    this.state = {
        name:'',
        email:'',
        mobile:'',
        password:'',
        avatarSource:'',
        loading:'',
        image :'',
        flag:0,
    }
  }

  showLoading() {
        this.setState({loading: true})
    }


   hideLoading() {
        this.setState({loading: false})
    } 


  changeImage=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                GLOBAL.profileImage = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({flag:1});
                this.setState({
                    avatarSource: source,
                });
            }
        });

    }

    signUp=()=> {
      
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      // alert(JSON.stringify(this.state.flag))
       // if (GLOBAL.profileImage == '') {
       //   this.setState({flag:0});
       // }

       // else if (GLOBAL.profileImage != '') {
       //   this.setState({flag:1});
       // }

        // alert(JSON.stringify(this.state.flag))
      
     if (this.state.name == ''){
       alert('Please Enter Full Name')
     } 
     if (this.state.email == ''){
       alert('Please Enter Email id')
     }
      else if (this.state.email != '' && reg.test(this.state.email) === false){
       alert('Please Enter Valid Email')
     }
     else if (this.state.mobile == ''){
       alert('Please Enter Mobile Number')
     }

     else if (this.state.password == ''){
       alert('Please Enter password')
     }
     else if (this.state.password.length < 6){
       alert('Password must be 6 chracter long')
     }

     else if (this.state.flag == 0) {
       
       alert('Please select profile picture')

      } 
        

        else {

              const url = GLOBAL.BASE_URL +  'signup_otp'
            
            const data = new FormData();
            
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('phone', this.state.mobile);
            data.append('password', this.state.password);
            data.append('language', GLOBAL.lang);
            data.append('device_id', '');
            data.append('device_type', Platform.OS);
            data.append('device_token', '');
            data.append('model_name', '');
            data.append('flag', this.state.flag);
            
            
            
            data.append('image', {
                uri: GLOBAL.profileImage,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });

           // alert(JSON.stringify(data))
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                    'Content-Type': 'multipart/form-data',
                    'language': GLOBAL.lang
                }

            }).then((response) => response.json())
                .then((responseJson) => {
                     this.hideLoading()
                     
                     

                     GLOBAL.name = this.state.name;
                     GLOBAL.email = this.state.email;
                     GLOBAL.phone = this.state.mobile;
                     GLOBAL.password = this.state.password;
                     GLOBAL.flag = this.state.flag;
                     GLOBAL.otp = responseJson.otp
                  
                    // const { navigation } = this.props;
                    // navigation.goBack();
                     // alert(JSON.stringify(responseJson))
                      alert(JSON.stringify(responseJson.message))
                      this.props.navigation.navigate('OtpScreen');


                })
                .catch((error) => {
                    console.error(error);
              });




        }   


     


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
             backgroundColor = "rgba(0,0,0,0.1)"
         

           />

              
              
              

                       <ImageBackground style={{resizeMode:'contain',height:'100%',width:Dimensions.get('window').width}} source={require('./signup.png')}>

                       <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>

                        <Image style={{height:32,width:32,marginTop:23,marginLeft:18}} source={require('./back.png')} />

                        <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center',marginTop:-5}}>{stringsoflanguages.hello}!</Text>
                        <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>{stringsoflanguages.start}</Text>

                       
                       <View style={{marginTop:38,height:100,width:'100%',justifyContent:'center'}}>


                       <ImageBackground style={{height:72,width:202,alignSelf:'center',resizeMode:'contain',justifyContent:'center'}} source={require('./dots.png')} >

                          {this.state.avatarSource == '' && (

                           <ImageBackground style={{height:100,width:100,resizeMode:'contain',alignSelf:'center'}} source={require('./use.png')}>

                           <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> this.changeImage()}>
                           <Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./add.png')} />
                           </TouchableOpacity>
                           </ImageBackground>

                           )

                          }

                          {this.state.avatarSource != '' && (

                           <ImageBackground style={{height:100,width:100,resizeMode:'contain',alignSelf:'center'}} imageStyle={{borderRadius:50}} source={this.state.avatarSource}>

                           <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> this.changeImage()}>
                           <Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./add.png')} />
                           </TouchableOpacity>
                           </ImageBackground>
                          )

                        }
                         
                       </ImageBackground>

                       </View>

                          <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:50,marginLeft:'6.5%'}}>{stringsoflanguages.name}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.exp1}

             placeholderTextColor="#161F3D"
             
             
             onChangeText={(text) => this.setState({name: text})}
             value={this.state.name}
             />


                       

                       </View>


                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:30,marginLeft:'6.5%'}}>{stringsoflanguages.email}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.exp2}

             placeholderTextColor="#161F3D"
             
             
             onChangeText={(text) => this.setState({email: text})}
             value={this.state.email}
             />

             
                       

                       </View>



                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:30,marginLeft:'6.5%'}}>{stringsoflanguages.mobile}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.exp3}

             placeholderTextColor="#161F3D"
             
             keyboardType="numeric"
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />

             
                       

                       </View>




                       <Text style={{fontSize:12,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D50',marginTop:30,marginLeft:'6.5%'}}>{stringsoflanguages.pass}</Text>

                       <View style={{height:42,width:'88%',alignSelf:'center',marginTop:5,justifyContent:'center',borderBottomWidth:1,borderColor:'#1D1D261A'}}>
                       <TextInput
             style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',width:'96%',height:42}}
             placeholder={stringsoflanguages.pass}
             secureTextEntry={true}
             placeholderTextColor="#161F3D"
             
             
             onChangeText={(text) => this.setState({password: text})}
             value={this.state.password}
             />

             
                       

                       </View>


                       <TouchableOpacity style={{height:52,width:'88%',borderRadius:4,backgroundColor:'#1357A2',marginTop:47,marginLeft:'6%',justifyContent:'center'}} onPress={()=>this.signUp()}>
                         <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>{stringsoflanguages.up}</Text>
                       </TouchableOpacity>


                       <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:30,marginBottom:50}}>
                         <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#1D1D2680'}}>{stringsoflanguages.already}</Text>
                         <TouchableOpacity style={{marginLeft:5}} onPress={()=>this.props.navigation.navigate('LoginScreen')}>
                         <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#2672CB',marginLeft:3}}>{stringsoflanguages.sign}</Text>
                         </TouchableOpacity>
                       </View>




                       

                       </KeyboardAwareScrollView>  

                       </ImageBackground>

                       

              



      </SafeAreaView>

      );
  }
}

export default SignupScreen;