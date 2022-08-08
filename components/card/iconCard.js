import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { ProgressBar } from 'react-native-paper'

export default function IconCard(props) {
  return (
    // <View style={[tw`${props.bg} px-2 py-5 mx-1 my-2 h-24 rounded-xl  flex-row`,{width:props.width ? '45%':'93%'}]}>
    <View style={[tw`${props.bg} px-2 py-1 mx-1 my-2 h-20 rounded-xl ${props.width?'w-5/12':'w-11/12'} flex-row`,]}>
            {props.icon}
            <View style={tw`my-auto`}>
              <Text style={tw`${props.color} text-xs`}>{props.description}</Text>
              <View style={tw`flex-row justify-between pt-2`}>
                <Text style={tw`${props.color}  my-auto font-bold pb-1 text-blue-900 ${props.percent ? 'text-xs':'text-sm'}`}>{ props.percent?parseInt(props.amount) +'%':props.amount}</Text>
                {/* <ProgressBar  style={tw`rounded-full w-4/12 my-auto ml-3`} progress={0.1} color='#0B3178' /> */}
                <View style={tw`w-8/12  my-auto ${props.amount<100?'ml-3':'-ml-3'} bg-blue-200 h-1.5 rounded-full`}>
                {/* <View style={[tw` my-auto bg-blue-800 h-1.5 rounded-full`, {width:props.amount+'%'}]}> */}
                  { !props.percent ?
                  <View style={[tw` my-auto bg-blue-800 h-1.5 rounded-full`,{width: props.amount <= 100 ?parseInt(props.amount):'100%'}]}>

                  </View>:
                  <View style={[tw` my-auto bg-blue-800 h-1.5 rounded-full`,{width: props.amount <= 100 ?parseInt(props.amount):'100%'}]}>

                  </View>}
                </View>
              </View>
            </View>
            
        </View>
  )
}