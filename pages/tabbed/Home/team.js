import { View, FlatList, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

import IconCard from '../../../components/card/iconCard'


export default function Team() {
  const data = [
    {id:1, name:'Team Performance Score', value:'20 %'},
    {id:2, name:'Team Turnaround Time', value:'41 %'},
    {id:3, name:'Team Job Quality Score', value:'52 %'},
    {id:4, name:'Team Job Quantity Score', value:'13 %'}
]
return (

<FlatList
    data={data}
    keyExtractor={(item)=>item.id}
    numColumns={2}
    // contentInset={2}
    style={tw`p-5`}
    ListFooterComponent={<View style={tw`h-10`}></View>}
    renderItem={
        ({item})=>
        <View style={tw`justify-around w-1/2`}>
            <IconCard
                amount={item.value}
                description={item.name}
                bg='bg-blue-100'
            />
        </View>
    }
/>
)
}