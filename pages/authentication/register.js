import { View, Text, SafeAreaView,TouchableOpacity,Picker,TextInput } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import RoundedButton from '../../components/button/RoundedButton'

export default function Register({navigation}) {
  return (
    <SafeAreaView style={tw`h-full`}>
        <View style={tw`my-auto`}>
    {/* <Image style={tw`mx-auto my-8`} source={require('../images/Logo/ANNILogo.png')}/> */}
        <View style={tw`mx-10`}>
        <Text style={tw`text-base text-gray-500 font-bold`}>Reset Password</Text>
            <Text style={tw`text-xs text-gray-500`}>Input your email to resset you Password</Text>
        </View>
     
      <View style={tw`mt-3 mx-3 py-4 bg-white shadow-sm rounded-3xl px-5`}>
        
        <View>
          
           
          
            <View style={tw`my-2 border-b border-gray-500`}>
              <Text>Email Address</Text>
              <TextInput
              placeholder='email Address'
              />
            </View>
            
        </View>

        
        <View style={tw`mt-4`}>
        <RoundedButton 
          text='Submit'
          pressed={()=>navigation.navigate('confirmCode')}/>
          </View>
        {/* <Text>Forgot Password?</Text> */}
        <View style={tw`flex-row mx-auto py-2`}>
            <Text>Already have an Account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
              <Text style={tw`text-green-800 font-bold`}> Login</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  </SafeAreaView>
  )
}