import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import RoundedButton from '../../components/button/RoundedButton';

export default function Onboard({navigation}) {
  return (
    <View style={tw`w-full h-full`}>
        <StatusBar backgroundColor='#094FA0' style={tw`bg-blue-500`}/>
      {/* <Text>Yeah</Text> */}
      <Image style={tw`w-full pb-10 relative top-0 -mb-3 -mt-10`} resizeMethod='scale' resizeMode='contain' source={require('../../images/onboarding/onboard.png')}/>
     <View style={tw`w-11/12 mx-auto`}>
        <Text style={tw`font-bold text-base`}>Performance Management & Appraisal</Text>
        <Text style={tw`font-bold text-base text-blue-800`}>Made Easy with e-metrics</Text>
        <Text style={tw`text-gray-500 mt-2 leading-5 text-justify`}>
        Responsibilities For The Day To Day Relationship Managment of Chanel Patners-Demo 1@gmail.com Responsibilities For The Day To Day Relationship Managment of Chanel Patners-Demo 1@gmail.comResponsibilities For The Day To Day Relationship Managment of Chanel Patners-Demo 1@gmail.comResponsibilities For The Day To Day 
        </Text>
     </View>
     <View style={tw`w-5/12 mx-2 absolute left-4 bottom-3 mx-auto`}>
         <RoundedButton text='Login' pressed={()=>navigation.navigate('login')} />
     </View>
     </View>
  );
}
