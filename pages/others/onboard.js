import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import RoundedButton from '../../components/button/RoundedButton';

export default function Onboard({navigation}) {
  return (
    <View style={tw`w-full h-full bg-white`}>
        <StatusBar backgroundColor='#094FA0' style={tw`bg-blue-500`}/>
     
       <View style={tw`my-auto w-full h-4/6`}>
          <View style={tw`w-full h-4/6  my-auto`}>
          <Image source={require('../../images/keyguy.png')} style={tw`w-full h-full`} resizeMode='contain' />
          </View>
          {/* <Text>Yeah</Text> */}
          {/* <Imr */}
          {/* source={require('../../images/keyguy.png')}/> */}
        <View style={tw`w-full mx-auto`}>
            <Text style={tw`font-bold text-base text-center`}>Performance Management & Appraisal</Text>
            <Text style={tw`font-bold text-base text-center text-blue-800`}>Made Easy with e-metrics</Text>
          
        </View>
      </View>
      <View style={tw`w-5/12 mx-2 relative bottom-3 mx-auto`}>
          <RoundedButton text='Login' pressed={()=>navigation.navigate('login')} />
      </View>
     
     </View>
  );
}
