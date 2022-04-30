import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import tw from 'tailwind-react-native-classnames'

const ChangedPassword = ({navigation}) => {
  return (
    <View  style={tw`h-full`}>
        <View style={tw`m-auto w-10/12`}> 
            <Image resizeMode='contain' source={require('../../images/onboarding/success.png')}/>
            <Text style={tw`mx-auto text-gray-400 py-4 px-5 text-center`}>Account Password has been changed, you can now Login with new Password </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text style={tw`mx-auto py-3 font-bold text-blue-800`} >Go to Login Page </Text>
            </TouchableOpacity>
            {/* <Text style={tw`font-bold text-center`}>OR</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text style={tw`mx-auto py-3 font-bold text-blue-800`} >Continue to 72 hours Free Trial</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}

export default ChangedPassword