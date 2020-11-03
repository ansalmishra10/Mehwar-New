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
import stringsoflanguages from './Language';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');

import Geolocation from '@react-native-community/geolocation';




class EditScreen2 extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
        grad:'',
        uni:'',
        role:'',
        employ:'',
        per:'',
        res:'',
        per2:'',
        location:'',
        loading:'',
        social:'',
        lat:'',
        long:'',
      
        
    }
  }

  showLoading() {
        this.setState({loading: true})
    }


   hideLoading() {
        this.setState({loading: false})
    } 





    componentDidMount() {
       // alert(JSON.stringify(GLOBAL.token))

       // this.getProfile();
      
    }


    saveData=()=> {

    // this.props.navigation.navigate('ManageScreen')

       if (this.state.grad == '') {
       
       alert('Enter your Education Medium')
        
        }


       

       else if (this.state.uni == '') {

        alert('Enter your Institution name')
       
       } 
       else if (this.state.role == '') {

        alert('Enter your Profession')
       
       } 

       else if (this.state.employ == '') {

        alert('Enter your Employer')
       
       } 

       else if (this.state.per == '') {

        alert('Enter your Province Address')
       
       } 

       else if (this.state.res == '') {

        alert('Enter your District Address')
       
       } 

       else if (this.state.per2 == '') {

        alert('Enter your Village Address')
       
       } 

       else if (this.state.location == '') {

        alert('Enter your loction')
       
       } 


       else if (this.state.social == '') {

        alert('Enter Your Social Website')
       
       } 

    else {
       
       const url = GLOBAL.BASE_URL +  'update_step_two_user'

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
              
             "user_id":GLOBAL.userID,
             "education":this.state.grad,
             "institution_name":this.state.uni,
             "company_name": this.state.employ,
             "current_job":this.state.role,
             "province":this.state.per,
             "district":this.state.res,
             "village":this.state.per2,
             "location":this.state.location,
             "latitude":this.state.lat,
             "longitude":this.state.long,
             "social_websites": this.state.social
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

          alert(JSON.stringify(responseData.message))


          this.timeoutCheck = setTimeout(() => {


            this.props.navigation.navigate('ProfileScreen')
          
          },1000);
  
          
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      }

    

        

  
  }


  getLocation=()=> {
    Geolocation.getCurrentPosition(info => {
        
        this.setState({ lat : info.coords.latitude })
        this.setState({ long : info.coords.longitude })
        // alert(JSON.stringify(this.state.lat))
        const url = GLOBAL.BASE_URL +  'lat_long_address'

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
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "latitude": this.state.lat,
              "longitude": this.state.long,
              "user_id": GLOBAL.userID
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                   // alert(JSON.stringify(responseData.address))
                   this.setState({ location: responseData.address})
                  // GLOBAL.house = responseData.address
               

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

        });

  }



  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'#1357A2'}}>
        
        <StatusBar
             backgroundColor = "#1357A2"
         
 
           />   

           <View style = {{height:60,backgroundColor:'#1357A2',flexDirection:'row',width:'100%',alignItems:'center',elevation:3}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./left2.png')}
                                style={{width: 22, height: 18,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize: 20,marginTop:1,marginLeft:102}}>
                         Edit Profile
              
          


                       </Text>


                       <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize: 14,marginTop:1,marginLeft:63}}>
                         Step 2/2
              
          


                       </Text>


                    </View>


              
                    <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'>


                       <View style={{height:'auto',marginLeft:'5%',width:'90%',backgroundColor:'white',elevation:2,marginTop:6,borderRadius:10,marginBottom:20}}>
                       
                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:30,marginLeft:22}}>Education</Text>

                       <View style={{flexDirection:'row',height:40,width:'90%',alignSelf:'center',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'85%',height:40}}
             placeholder="Graduation"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({grad: text})}
             value={this.state.grad}
             />
      
               
                       

                       </View>

                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Institution name</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="harvard university"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({uni: text})}
             value={this.state.uni}
             />


                       

                       </View>


                    

                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Current Job</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="Web Designer"

             placeholderTextColor="#1E1F20"
    
             
             onChangeText={(text) => this.setState({role: text})}
             value={this.state.role}
             />


                       

                       </View>


                       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Employer Company/Organization</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="Appslure Websolution"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({employ: text})}
             value={this.state.employ}
             />


                       

                       </View>


                       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Permanent Address Province</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="C-21/9 Rohini"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({per: text})}
             value={this.state.per}
             />


                       

                       </View>



                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:30,marginLeft:22}}>Permanent Address District</Text>

                       <View style={{flexDirection:'row',height:40,width:'90%',alignSelf:'center',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'85%',height:40}}
             placeholder="New Delhi"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({res: text})}
             value={this.state.res}
             />
      
               
                       

                       </View>  



                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Permanent Address Village</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'96%',height:40}}
             placeholder="New Delhi"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({per2: text})}
             value={this.state.per2}
             />


                       

                       </View> 



                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:30,marginLeft:22}}>Location</Text>

                       <View style={{flexDirection:'row',height:40,width:'90%',alignSelf:'center',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'85%',height:40}}
             placeholder="Sector 7, Rohini, New Delhi, Delhi"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({location: text})}
             value={this.state.location}
             />

               <TouchableOpacity style={{marginRight:5}} onPress={()=>this.getLocation()}>
      
               
               <Image style={{height:26,width:26,resizeMode:'contain'}} source={require('./pin.png')} />
               
               </TouchableOpacity>
                       

                       </View> 


                     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#8F92A1',marginTop:27,marginLeft:22}}>Social website ID</Text>

                       <View style={{height:40,width:'90%',alignSelf:'center',marginTop:10,justifyContent:'center',borderBottomWidth:1,borderColor:'#1E1F2033'}}>
                       <TextInput
             style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',width:'98%',height:40}}
             placeholder="https://www.facebook.com/pradeep987"

             placeholderTextColor="#1E1F20"
             
             
             onChangeText={(text) => this.setState({social: text})}
             value={this.state.social}
             />


                       

                       </View>


                       


                       

                       
                       





                     <TouchableOpacity style={{height:52,width:'90%',alignSelf:'center',backgroundColor:'#1357A2',borderRadius:4,marginTop:30,marginBottom:20,justifyContent:'center'}} onPress={()=>this.saveData()}>
                  
                          <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>Save</Text>
                        

                        
                          
                     </TouchableOpacity>  
                       


                       </View>

                       
                    
                    </KeyboardAwareScrollView>

        </SafeAreaProvider>            

      );
  }
}

export default EditScreen2;