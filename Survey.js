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
  Share




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import stringsoflanguages from './Language';
const GLOBAL = require('./Global');
import Pie from 'react-native-pie';
import {Surface, Shape} from '@react-native-community/art';
import {LineChart, XAxis,Grid} from 'react-native-svg-charts'


class Survey extends React.Component {
  constructor(props){
    super(props);

     this.state = {
         loading:'',
         FlatListItem: [],
         FlatListItem2: [],
         fetchID:'',
      
     }

   }

   showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


   componentDidMount() {
     this.getData();
   }


   onShare = async (item) => {

    // alert(JSON.stringify(item.share_link))
    var commonHtml = `${item.share_link}`;



   var a = commonHtml

   try {
      const result = await Share.share({
        message:a ,
        url:''
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }


  };

   getData=()=> {
        const url = GLOBAL.BASE_URL +  'fetch_surveys'

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


       

        
                 // alert(JSON.stringify(responseData.data[0].options))
                 this.setState({ FlatListItem: responseData.data})
                 
                  // alert(JSON.stringify(this.state.change))
                 

                  
                  

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


   onButtonClick1=(data, is_selected, indexs, index)=> {
     
    
    // this.setState({ fetchID: ''})
   

    // alert(JSON.stringify(this.state.fetchID))
    
    var k = this.state.FlatListItem[index]

    for (var i = 0 ; i <k.options.length; i++){
      k.options[i].is_selected = "0"

    }
    if (k.options[indexs].is_selected == "0"){
k.options[indexs].is_selected = "1"
      
      // alert(JSON.stringify(k.options[indexs].id))
      this.setState({fetchID: k.options[indexs].id})
      

    }else{
k.options[indexs].is_selected = "0"
    }
    this.state.FlatListItem[index] = k
    this.setState({FlatListItem:this.state.FlatListItem})


    
  }


  getLike=(id,item,index)=> {
    var k = this.state.FlatListItem[index]
    var total =  parseInt(item.total_likes)
     if (item.is_like == false){
       k.is_like = true
       var n = total + 1
       k.total_likes = n.toString()


     }else{
          k.is_like = false
          var n = total - 1
          k.total_likes = n.toString()
     }
  this.state.FlatListItem[index] = k
  this.setState({FlatListItem:  this.state.FlatListItem})
      //total_likes

       const url = GLOBAL.BASE_URL +  'toggle_post_like'

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
              "id": id

            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) {








          //  this.getData();



         // this.props.navigation.replace('AddScreen')

        // AsyncStorage.setItem('userID', responseData.user_id);

}  else {

  alert("Invalid Credentials")
}


      })
      .catch((error) =>{
        console.error(error);
      })
   }


   getComment=(id)=> {

     // alert(JSON.stringify(id))

     GLOBAL.postID = id

       this.props.navigation.navigate('Comment')
   }


   getSelected = (item,index,oindex) =>{


  // alert(JSON.stringify(item))
var flat = this.state.FlatListItem[index]
for (var i = 0 ; i <flat.options.length; i++){
  flat.options[i].is_selected = "0"

}
  if (item.is_selected == 0){
    flat.options[oindex].is_selected = 1
  }else{
      flat.options[oindex].is_selected = 0
  }

  this.state.FlatListItem[index] = flat

  this.setState({FlatListItem:this.state.FlatListItem})
}
  

  


   renderItem=({item, index}) => {
     // alert(JSON.stringify(item))

     if(item.survey_type==2) {
         // this.setState({FlatListItem2: item.options})
         GLOBAL.flatlist = item.options

     }

     var d = item.total_votes

     
     
    return(

      <View>

      { item.survey_type== 1 && (


       <View>

       {item.is_voted == false && (
       

        
       <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:25,borderRadius:8}}>

     <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>

     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,width:'91%',lineHeight:23}}>{item.title}</Text>



    {item.options.map((data, indexs) => {



     return (

     <View>

     <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'90%',height:50,borderRadius:25,borderWidth:1,borderColor:'#979797',alignSelf:'center',marginTop:16}} onPress={()=>this.onButtonClick1(data, data.is_selected, indexs, index)}>
     
      {data.is_selected == "0" && (
      <View style={{marginLeft:20}}>
       
        
        
       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />

        
      </View>
      )}

      {data.is_selected == "1"  && (

      <View style={{marginLeft:20}}>
       
        
        
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
        
      </View>

      )}  
      
      
      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3DCC',marginLeft:13}}>{data.option}</Text>
      
        
     </TouchableOpacity>


     
     </View>

      );

    })}

      
      <TouchableOpacity style={{height:35,width:120,borderRadius:17.5,backgroundColor:'#1357A2',marginBottom:23,marginTop:23,alignSelf:'center',justifyContent:'center'}} onPress={()=>this.getResult(item.id, index)}>
       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
     </TouchableOpacity>

     
   </View>

   )}

     {item.is_voted == true &&(
       
       <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:25,borderRadius:8}}>


       <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>


     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,marginBottom:30,width:'91%',lineHeight:23}}>{item.title}</Text>

         
         {item.options_result.map((data1, key) => {

           var h = parseInt(data1.votes_percentage)/100

           return (

              


              <View style={{flexDirection:'row',alignItems:'center',width:'90%',alignSelf:'center',marginTop:20,elevation:2}}>
     <View style={{flexDirection:'column',width:'28%'}}>
       <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9',lineHeight:20}}>{data1.option}</Text>
       
     </View>

     <View style={{flexDirection:'row',alignItems:'center',height:'auto',width:'72%',marginLeft:2}}>

        

        <Progress.Bar progress={h} width={208} unfilledColor ={'#e3e3e3'} showsText = {true} formatText = {'he'} height = {25} borderColor={'white'} borderTopRightRadius={12.5} borderBottomRightRadius={12.5}  color = {'#1357A2'}/>
        
        <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2',marginLeft:5}}>{data1.votes_percentage}%</Text>
     </View>
    </View>




              


             



            );
  
         })}

       <View style={{width:'90%',alignSelf:'center'}}>

       {item.options_result.length == 2 &&(
        <View style={{width:'70%',height:130,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-100}}>
        </View>

        )}


        {item.options_result.length == 3 &&(
        <View style={{width:'70%',height:180,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-150}}>
        </View>

        )}


        {item.options_result.length == 4 &&(
        <View style={{width:'70%',height:200,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-170}}>
        </View>

        )}
       </View>


       <View style={{width:'90%',alignSelf:'center',marginTop:12}}>

       <View style={{width:'65%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:'28%'}}>

          
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>0</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>20</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>40</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>60</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>80</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>100</Text>
    

       </View>
         
                

      </View>


      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:25,justifyContent:'space-between'}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>

        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>
        
        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}

        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>
        
        <TouchableOpacity onPress={()=>this.onShare(item)}>
        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
        </TouchableOpacity>

      </View>
      
       </View>

     )}  

   </View>
    
  )}


  { item.survey_type== 2 && (

    <View>



    {item.is_voted == false && (



    <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:25,borderRadius:8}}>

     <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>
     
     
     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,width:'91%',lineHeight:23}}>{item.title}</Text>
     
    <View style={{width:'90%',alignSelf:'center',marginTop:15}}>

    {item.options.length == 1 && (
       <View>



           <TouchableOpacity style={{margin:6}}  onPress={()=>this.getSelected(item.options[0], index,0)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

 <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
{item.options[0].is_selected == 0 && (
    <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
)}
{item.options[0].is_selected == 1 && (
    <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
)}

             </View>

           </ImageBackground>

           </TouchableOpacity>




       </View>
     )}

     {item.options.length == 2 && (
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

         <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
          </TouchableOpacity> 
           
           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[1], index,1)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

           <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
          </TouchableOpacity> 


       </View>
     )}


     {item.options.length == 3 && (
       <View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[1], index,1)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


       </View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[2], index,2)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[2].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[2].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[2].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>




       </View>
       </View>
     )}
     {item.options.length == 4 && (
       <View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}> 
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

                         <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[1], index,1)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


       </View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[2], index,2)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[2].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[2].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[2].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>

          <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[3], index,3)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[3].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[3].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[3].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>




       </View>
       </View>
     )}


     </View>
    

     <TouchableOpacity style={{height:35,width:120,borderRadius:17.5,backgroundColor:'#1357A2',marginBottom:23,marginTop:20,alignSelf:'center',justifyContent:'center'}} onPress={()=>this.getResult(item.id, index)}>
       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
     </TouchableOpacity>
   
        
        </View>


        )}


        {item.is_voted == true && (

          <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:10,marginLeft:'4%',marginTop:25,borderRadius:8}}>


      <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{stringsoflanguages.admin}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{stringsoflanguages.time}</Text>
      </View>

     </View>




     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,marginBottom:10,width:'91%',lineHeight:23}}>{item.title}</Text>


     <View style={{width:'90%',alignSelf:'center'}}>

     {item.options_result.length == 1 && (
       <View>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>




       </View>
     )}

     {item.options_result.length == 2 && (
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
     )}


     {item.options_result.length == 3 && (
       <View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

             <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

             <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
{item.options_result[0].votes_percentage} %

             </Text>


             </View>

           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[2].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[2].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>




       </View>
       </View>
     )}
     {item.options_result.length == 4 && (
       <View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>
           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[2].option}}>


           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[2].votes_percentage} %

           </Text>


           </View>
           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[3].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[3].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>




       </View>
       </View>
     )}

     </View>





      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:25,justifyContent:'space-between'}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>

        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>
        
        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}

        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>

        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
      </View>



     </View>


          )}

      </View>  


   )}  



   </View>

      );

  }

  _keyExtractor=(item, index)=>item.key;


  getResult=(id, index)=> {

    // alert(id)

   var j = this.state.FlatListItem[index].options
   
   var k = ''

   for (var i = 0; i < j.length; i++) {
      if( j[i].is_selected == '1') {
        k = j[i].id
      }
   }

   if( k == '') {
     alert('Please select value')
     return 

   }

     const url = GLOBAL.BASE_URL +  'submit_survey_vote'

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
               "survey_id": id,
               "survey_option_id": k,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       

        
                 
                 
                 
                  // alert(JSON.stringify(responseData))

                   this.getData();
                 

                  
                  

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


  

   handleChange=(item, index)=> {

//      var k = this.state.FlatListItem[index]

//     for (var i = 0 ; i <k.options.length; i++){
//       k.options[i].is_selected = "0"

//     }
//     if (k.options[indexs].is_selected == "0"){
// k.options[indexs].is_selected = "1"


//     }else{
// k.options[indexs].is_selected = "0"
//     }
//     this.state.FlatListItem[index] = k
//     this.setState({FlatListItem:this.state.FlatListItem})
     
     // alert(JSON.stringify(GLOBAL.flatlist))

     var g = GLOBAL.flatlist[index]

     alert(g)

  }

  
  render() {
    return(
      <SafeAreaProvider style={{backgroundColor:'white'}}>

       <View style={{flex:1}}>

        <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginTop:25,marginLeft:24}}>{stringsoflanguages.survey}</Text>

        <FlatList style={{marginTop:5}}
                       data={this.state.FlatListItem}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
          />

       </View>

      </SafeAreaProvider>

      );
  }
}

export default Survey;