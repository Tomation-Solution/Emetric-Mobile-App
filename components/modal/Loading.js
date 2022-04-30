import React, {useState} from 'react'
import {Text, View, ActivityIndicator} from 'react-native'
import tw from 'tailwind-react-native-classnames';

export default function Loading(props) {
    const [loading, setLoading] = useState(null)
    const cancel=()=>{
        // navigation.goBack()
        // navigation.navigate('HomeScreen')
        props.to()
        props.setVisible(false)
    }
    
    setTimeout(
      function() {
        props.to()
       props.setLoadVisible(false)
      }, 1500);
   
  return (
    <View style={tw`bg-white w-7/12 m-auto rounded-lg py-6 px-6`}>
        <ActivityIndicator color='blue' size='large' />
        <Text style={tw`text-center py-3 text-sm`}  >Taking you to {props.name}</Text>
    </View>
  )
}
