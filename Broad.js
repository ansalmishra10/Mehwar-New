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
  
  
  class Broad extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
    
    
         
          loading: '',
          Flatlistitems: [],
    
        }
    
    
      }  


    componentDidMount() {
        this.getData()
    }


    showLoading() {
        this.setState({ loading: true })
      }
    
    
    hideLoading() {
        this.setState({ loading: false })
      }


    getData=()=> {
        const url = GLOBAL.BASE_URL + 'get_all_broadcasts'

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
        "limit": 10,
        "limit_from": this.state.Flatlistitems.length
        

      })
    })

      .then((response) => response.json())
      .then((responseData) => {


        

        console(JSON.stringify(responseData))

        //   const interest = [...this.state.Flatlistitems, ...responseData.data];
        //   // GLOBAL.house = responseData.address
        //   this.setState({ Flatlistitems: interest })
        //   // alert(JSON.stringify(this.state.Flatlistitems))


          this.hideLoading()


       






      })
      .catch((error) => {
        console.error(error);
      })




    }


    render() {
      return(
        <SafeAreaProvider style={{backgroundColor:'white'}}>
          <StatusBar
               backgroundColor = "white"
           
  
             />
  
             <View style = {{height:60,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:3}}>
                          <View>
                          <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                              <Image
                                  source={require('./left.png')}
                                  style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}
  
  
                              />
                          </TouchableOpacity>
                          </View>
  
  
                          <Text style = {{color:'black',fontFamily:'AvenirLTStd-Heavy',fontSize: 22,marginLeft:102}}>
                           Broadcast
                
            
  
  
                         </Text>
  
  
                      </View>
  
                      <ScrollView style={{flex:1,backgroundColor:'white'}}>
  
                      <View style={{marginTop:25,flexDirection:'row',alignItems:'center',width:'92%',alignSelf:'center',justifyContent:'space-between'}}>
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}> 
                        <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} />
                       </ImageBackground>
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}>
                       <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} /> 
                       </ImageBackground>
  
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}> 
                       <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} />
                       </ImageBackground>
                      </View>
  
                      <View style={{marginTop:22,flexDirection:'row',alignItems:'center',width:'92%',alignSelf:'center',justifyContent:'space-between'}}>
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}> 
                        <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} />
                       </ImageBackground>
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}>
                       <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} /> 
                       </ImageBackground>
  
  
                       <ImageBackground style={{height:142,width:110,resizeMode:'contain'}} source={require('./happy.png')}> 
                       <Image style={{height:20,width:60,marginTop:114,marginLeft:6}} source={require('./rec.png')} />
                       </ImageBackground>
                      </View>
  
                      </ScrollView>
                  
  
                  </SafeAreaProvider>
        );
    }
  }
  
  export default Broad;
  