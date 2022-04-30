import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import CodeBox from '../../components/helpers/codeBox'
import RoundedButton from '../../components/button/RoundedButton'

const ConfirmCode = ({navigation}) => {
  const [boxValues, setBoxValue]= useState([0,1,2,3])
  return (
    <View>
      <Image style={tw`mx-auto my-8`} source={require('../../images/Logo/logo.png')}/>
      <View style={tw`mx-10`}>
         <Text style={tw`text-base font-bold`}>Code</Text>
          <Text>Input 4 digit code received to proceed</Text>
      </View>
       
        <View style={tw`mt-3 mx-7 py-4 bg-white shadow-sm rounded-3xl px-5`}>
          <View style={tw`flex-row justify-around py-4` }>
            <CodeBox value={boxValues[0]}/>
            <CodeBox value={boxValues[1]}/>
            <CodeBox value={boxValues[2]}/>
            <CodeBox value={boxValues[3]}/>
          </View>
          <RoundedButton 
            text='Continue'
            pressed={()=>navigation.navigate('setNewPassword')}
          />
          
      </View>
    </View>
  )
}

export default ConfirmCode