import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen.js';
import StyleScreen from './StyleScreen.js';
import LoginScreen from './LoginScreen.js';
import SignupScreen from './SignupScreen.js';
import ManageScreen from './ManageScreen.js';
import Comment from './Comment.js';
import LiveScreen from './LiveScreen.js';
import Message from './Message.js';
import Result from './Result.js';
import SecondRoute from './SecondRoute.js';
import ProfileScreen from './ProfileScreen.js';
import Survey from './Survey.js';
import Sdetails from './Sdetails.js';
import Report from './Report.js';
import Reportagain from './Reportagain.js';
import EditScreen2 from './EditScreen2.js';
import EditScreen1 from './EditScreen1.js';
import Broadcast from './Broadcast.js';
import Events from './Events.js';
import EventDet from './EventDet.js';
import News from './News.js';
import FirstRoute from './FirstRoute.js';
import NewsDetail from './NewsDetail.js';
import OtpScreen from './OtpScreen.js';
import Forget from './Forget.js';
import NewsDetail2 from './NewsDetail2.js';
import Complete from './Complete.js';
import Complete2 from './Complete2.js';
import Liveagain from './Liveagain.js';
import ResetScreen from './ResetScreen.js';
import TCScreen from './TCScreen.js';
import Broad from './Broad.js';




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StyleScreen" component={StyleScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ManageScreen" component={ManageScreen} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="LiveScreen" component={LiveScreen} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="SecondRoute" component={SecondRoute} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Survey" component={Survey} />
        <Stack.Screen name="Sdetails" component={Sdetails} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Reportagain" component={Reportagain} />
        <Stack.Screen name="EditScreen1" component={EditScreen1} />
        <Stack.Screen name="EditScreen2" component={EditScreen2} />
        <Stack.Screen name="Broadcast" component={Broadcast} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EventDet" component={EventDet} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="FirstRoute" component={FirstRoute} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="NewsDetail2" component={NewsDetail2} />
        <Stack.Screen name="Complete" component={Complete} />
        <Stack.Screen name="Complete2" component={Complete2} />
        <Stack.Screen name="Liveagain" component={Liveagain} />
        <Stack.Screen name="ResetScreen" component={ResetScreen} />
        <Stack.Screen name="TCScreen" component={TCScreen} />
        <Stack.Screen name="Broad" component={Broad} />












      </Stack.Navigator>



    </NavigationContainer>
  );
}


export default App;