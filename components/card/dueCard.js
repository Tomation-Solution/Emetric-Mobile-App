import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function DueCard(props) {
  return (
    <View style={tw`${props.bg} px-4 py-3 mx-1 justify-around  w-full rounded-lg`}>
            {/* {props.icon} */}
            <View>
                <Text style={tw`${props.color} font-bold pb-1 text-base`}>{(props.text ?'':'N ')+ props.amount}</Text>
                <Text style={tw`${props.color} text-xs`}>{props.description}</Text>
            </View>
            
        </View>
  )
}