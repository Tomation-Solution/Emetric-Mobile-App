import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import RoundedButton from '../../components/button/RoundedButton'

const SetNewPassword = ({navigation}) => {
  return (
    <View>
      <Image style={tw`mx-auto my-8`} source={require('../../images/Logo/logo.png')}/>
      <View style={tw`mx-10`}>
         <Text style={tw`text-base font-bold`}>Set New Password</Text>
          <Text>Input new password to recover account</Text>
      </View>
       
        <View style={tw`mt-3 mx-7 pt-4 pb-8 bg-white shadow-sm rounded-3xl px-5`}>
          
          <View>
              <View style={tw`my-3 border-b`}>
                <Text>Password</Text>
                <TextInput
                placeholder='Pasword'
                secureTextEntry={true}
                />
              </View>

              <View style={tw`my-3 border-b`}>
                <Text>Confirm Password</Text>
                <TextInput
                placeholder='Confirm Pasword'
                secureTextEntry={true}
                />
              </View>
          </View>
          <RoundedButton text='Submit' pressed={()=>navigation.navigate('changedPassword')}/>
      </View>
    </View>
  )
}

export default SetNewPassword