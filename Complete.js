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




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import stringsoflanguages from './Language';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
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





class Complete extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
        name:GLOBAL.name2,
        father:'',
        date:'',
        mobile:GLOBAL.phone2,
        email:GLOBAL.email,
        tongue:'',
        flag:0,
        loading:'',
        imageNew:'',
        avatarSource:'',
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

                GLOBAL.proimage2 = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({flag:1});
                this.setState({
                    avatarSource: source,
                });
            }
        });

    }

    componentDidMount() {
       // alert(JSON.stringify(GLOBAL.email))



       this.getProfile();
       
      
    }

    


    saveData=()=> {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;


       // alert(JSON.stringify(GLOBAL.token))
       // if (GLOBAL.profileImage == '') {
       //   this.setState({flag:0});
       // }

       // else if (GLOBAL.profileImage != '') {
       //   this.setState({flag:1});
       // }

       //  alert(JSON.stringify(this.state.flag))
      
     if (this.state.name == ''){
       alert('Please Enter Full Name')
     } 

      else if (this.state.father == ''){
       alert('Please Enter Father Name')
     }

     else if (this.state.date == ''){
       alert('Enter your Birth Date')
     }

     else if (this.state.email == ''){
       alert('Please Enter Email id')
     }
      else if (this.state.email != '' && reg.test(this.state.email) === false){
       alert('Please Enter Valid Email')
     }
     else if (this.state.mobile == ''){
       alert('Please Enter Mobile Number')
     }

     else if (this.state.tongue == ''){
       alert('Enter Your Mother Tongue')
     }
     
     else {


       if( this.state.flag == 0) {
          
          const url = GLOBAL.BASE_URL +  'update_step_one_user_without_image'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token,
                'language': GLOBAL.lang
            },
           
            body: JSON.stringify({
              
             "name": this.state.name,
             "email": this.state.email,
             "phone": this.state.mobile,
             "father_name": this.state.father,
             "dob": this.state.date,
             "user_id": GLOBAL.userID,
             "mother_tongue": this.state.tongue,
             "father_name": this.state.father,
             "flag":this.state.flag,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseJson) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
                  
                  if (responseJson.status == true ) { 

                      alert(JSON.stringify(responseJson.message))
                     // this.props.navigation.navigate('OtpScreen');
                     this.setState({ father: '' })
                     this.setState({ date: ''})
                     this.setState({ tongue: ''})
                     
                    }

                    else {
                          alert("Invalid Credentials")
                      }


           
      })
      .catch((error) =>{
        console.error(error);
       })

     }
          
       else if (this.state.flag == 1) {

           const url = GLOBAL.BASE_URL +  'update_step_one_user'
            
            const data = new FormData();
            
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('phone', this.state.mobile);
            data.append('father_name', this.state.father);
            data.append('dob', this.state.date);
            data.append('user_id', GLOBAL.userID);
            data.append('mother_tongue', this.state.tongue);
            data.append('flag', this.state.flag);
            
            
            
            data.append('image', {
                uri: GLOBAL.proimage2,
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
                    'Authorization': GLOBAL.token,
                    'language': GLOBAL.lang
                }

            }).then((response) => response.json())
                .then((responseJson) => {
                     this.hideLoading()
                     
                     if (responseJson.status == true ) { 

                      alert(JSON.stringify(responseJson.message))
                     // this.props.navigation.navigate('OtpScreen');
                     this.setState({ father: '' })
                     this.setState({ date: ''})
                     this.setState({ tongue: ''})
                     
                    }

                    else {
                          alert("Invalid Credentials")
                      }

                })
                .catch((error) => {
                    console.error(error);
              });

       }   
        

        
       }


     

    }

    getProfile=()=> {
      const url = GLOBAL.BASE_URL +  'fetch_user_profile'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token,
                'language': GLOBAL.lang
            },
            
            body: JSON.stringify({
              
              "user_id": GLOBAL.userID

              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                 // alert(JSON.stringify(responseData.data.image))
           
                this.setState({ imageNew : responseData.data.image})
                 // alert(JSON.stringify(this.state.imageNew))
                // console.log(this.state.imageNew)
           
      })
      .catch((error) =>{
        console.error(error);
      })
    }


  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'#1357A2'}}>
        
        <StatusBar
             backgroundColor = "#1357A2"
         
 
           />  

             

           


              
                    <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>


                       <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',justifyContent:'space-between',marginTop:13}}>
               <View style={{height:5,width:'47.5%',backgroundColor:'white',borderRadius:2.5}}>
               </View>

               <View style={{height:5,width:'47.5%',backgroundColor:'#FFFFFF80',borderRadius:2.5}}>
               </View>
             </View> 


             <View style={{flexDirection:'row',width:'88%',marginLeft:'7%',marginTop:40,alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
               <Text style={{fontSize:25,fontFamily:'AvenirLTStd-Heavy',color:'white',lineHeight:30}}>Complete Profile</Text>
               <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',lineHeight:20}}>Step 1/2</Text>
             </View>


                       <View style={{height:'auto',marginLeft:'5%',width:'90%',backgroundColor:'white',elevation:2,marginTop:6,borderRadius:10,marginBottom:20}}>
                       
                      {this.state.avatarSource == '' && (

                        <ImageBackground style={{height:100,width:100,marginTop:22,resizeMode:'contain',alignSelf:'center'}} imageStyle={{borderRadius:50}} source={{uri: this.state.imageNew}}>
                          <Image style={{height:30,width:30,resizeMode:'contain',marginTop:70,alignSelf:'flex-end'}} source={require('./add.png')} />
                        </ImageBackground>

                       )}  

                       {this.state.avatarSource != '' && (

                        <ImageBackground style={{height:100,width:100,resizeMode:'contain',marginTop:22,alignSelf:'center'}} imageStyle={{borderRadius:50}}    source={this.state.avatarSource}>
                          <Image style={{height:30,width:30,resizeMode:'contain',marginTop:70,alignSelf:'flex-end'}} source={require('./add.png')} />
                        </ImageBackground>

                       )}

                       <TouchableOpacity style={{height:35,width:118,borderRadius:17.5,backgroundColor:'#1357A2',alignSelf:'center',justifyContent:'center',marginTop:12}} onPress={()=> this.changeImage()}>
                         <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>Upload Photo</Text>
                       </TouchableOpacity>

                        <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:20,marginLeft:22}}>Full Name</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({name: text})}
             value={this.state.name}
             />


                       

                       </View>

                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Father name</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="Father's name"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({father: text})}
             value={this.state.father}
             />


                       

                       </View>


                    <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Date of Birth</Text>
                  <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
            
             

                     <DatePicker
                          style={{width:110,marginLeft:-6}}
                          date={this.state.date}
                          mode="date"
                          showIcon={false}
                          placeholder={'Date-of-Birth'}
                          format="DD-MM-YYYY"
                          minDate="01-01-1950"
                          maxDate= {moment().format('DD-MM-YYYY')}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateInput: {
                               borderWidth:0
                            },
                            dateText: { fontSize: 16, color: '#1E1F20',fontFamily:'AvenirLTStd-Heavy'},
                            placeholderText: { fontSize: 16, color: '#1E1F20', fontFamily:'AvenirLTStd-Heavy'}
                            
                          }}
                          onDateChange={(date) => {
                            this.setState({date: date})
                          }}
                        />
                     </View> 

                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Phone number</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
          

             placeholderTextColor="#1E1F20"
            keyboardType={'numeric'}
             
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />


                       

                       </View>


                       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Email</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
            

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({email: text})}
             value={this.state.email}
             />


                       

                       </View>


                       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Mother Tongue</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="Mother tongue"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({tongue: text})}
             value={this.state.tongue}
             />


                       

                       </View>



                     <View style={{height:52,width:'90%',alignSelf:'center',marginTop:30,flexDirection:'row',alignItems:'center',marginBottom:20,justifyContent:'space-between'}}>
                        <TouchableOpacity style={{height:52,width:'48%',borderRadius:4,backgroundColor:'#1357A2',justifyContent:'center'}} onPress={()=>this.saveData()}>
                          <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:52,width:'48%',borderRadius:4,backgroundColor:'#1357A2',justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Complete2')}>
                          <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Next</Text>
                        </TouchableOpacity>
                     </View>  
                       


                       </View>


                       
                    
                    </KeyboardAwareScrollView>

        </SafeAreaProvider>            

      );
  }
}

export default Complete;