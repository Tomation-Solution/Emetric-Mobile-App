import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { ProgressBar } from 'react-native-paper'

export default function IconCard(props) {
  return (
    <View style={tw`${props.bg} px-4 py-5 mx-1 my-2 h-24 rounded-xl ${props.width? 'w-5/12':''} flex-row`}>
            {props.icon}
            <View>
              <Text style={tw`${props.color} text-xs`}>{props.description}</Text>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`${props.color} font-bold pb-1 text-blue-900  text-base`}>{props.amount}</Text>
                {/* <ProgressBar  style={tw`rounded-full w-4/12 my-auto ml-3`} progress={0.1} color='#0B3178' /> */}
                <View style={tw`w-8/12  my-auto ml-3 bg-blue-200 h-1.5 rounded-full`}>
                  <View style={tw`w-3/12 my-auto bg-blue-800 h-1.5 rounded-full`}>

                  </View>
                </View>
              </View>
            </View>
            
        </View>
  )
}