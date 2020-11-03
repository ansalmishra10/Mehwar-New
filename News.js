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
import ReadMore from 'react-native-read-more-text';


class News extends React.Component {
  constructor(props){
    super(props);

     this.state = {

      loading:'',
      title:'',
      sub:'',
      image:'',
      date:'',
      FlatListItem: [],

     }
  }


  showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


  componentDidMount() {

   
     this.getNews();

    

  }


  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#1357A2'}} onPress={handlePress}>
        Read more
      </Text>
    );
  }
 
  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#1357A2'}} onPress={handlePress}>
        Show less
      </Text>
    );
  }


  _handleTextReady = () => {
    // ...
  }


  getNews=()=>{


     const url = GLOBAL.BASE_URL +  'fetch_news'

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
               "limit":10,
               "limit_from":0
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       

        
                 // alert(JSON.stringify(responseData.data))
                 this.setState({ FlatListItem: responseData.data})
                  
                  this.setState({title: responseData.data[0].title})
                  this.setState({sub: responseData.data[0].news_subheading})
                  this.setState({image: responseData.data[0].image})
                  this.setState({date: responseData.data[0].published_date})

                  
                  

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

    // alert(JSON.stringify(item))

       
    return(

<View>




<TouchableOpacity  style={{height:105,width:'91%',backgroundColor:'white',borderRadius:10,alignSelf:'center',flexDirection:'row',alignItems:'center',elevation:2,marginTop:15,marginBottom:5}} onPress={()=>this.newsPage(item)}>


<Image style={{height:105, width:125, resizeMode:'cover',borderTopLeftRadius:10,borderBottomLeftRadius:10}} source={{ uri: item.image}} />


<View style={{flexDirection:'column',marginLeft:12,width:'61%',height:105}}>
 
 <Text style={{fontSize:10,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:9}}>{item.published_date}</Text>
 

 <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:8,width:'90%'}} numberOfLines={1}>{item.title}</Text>
 
 <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:5,width:'92%',lineHeight:20}} numberOfLines={2}>{item.news_subheading}</Text>
</View>

 
  




   


  
</TouchableOpacity>

 

 

 </View>

)
}


 _keyExtractor=(item, index)=>item.key;


 newsPage=(item)=> {

  // alert(JSON.stringify(item))

  GLOBAL.newsData = item

    this.props.navigation.navigate('NewsDetail')
 
 }

  render() {

    let { text } = this.props;
    
    return(
      <SafeAreaProvider style={{backgroundColor:'white',height:Dimensions.get('window').height}}>
        <StatusBar
             backgroundColor = "black"
         

           />
           <ScrollView style={{width :Dimensions.get('window').width,backgroundColor:'#e3e3e3'}}>

            <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:26,marginLeft:23}}>{stringsoflanguages.latest}</Text>

            <View style={{height:'auto',width:'91%',alignSelf:'center',marginTop:22,borderRadius:10,elevation:3,marginBottom:6,backgroundColor:'white'}}>

            <Image style={{height:126,width:'100%',resizeMode:'cover',borderTopLeftRadius:10,borderTopRightRadius:10}} source={{ uri: this.state.image}} />

            <Text style={{fontSize:10,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginTop:8,marginLeft:10}}>{this.state.date}</Text>
            <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:5,marginLeft:10,width:'90%',lineHeight:20}}>{this.state.title}</Text>
           

            <View style={{width:'90%',marginTop:10,marginLeft:10,marginBottom:15}}>
             
      <ReadMore
              numberOfLines={1}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',lineHeight: 20}}>
                {this.state.sub}
              </Text>
      </ReadMore>

      </View>
             
            </View>

            <View style={{height:'auto',marginTop:10}}>
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

export default News;