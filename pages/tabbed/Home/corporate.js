import { View, FlatList, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

import IconCard from '../../../components/card/iconCard'

export default function Corporate() {
  const data = [
    {id:1, name:'Corporate Pending Objectives', value:2},
    {id:2, name:'Corporate Closed Objectives', value:4},
    {id:3, name:'Corporate Overall Performance', value:5},
    {id:4, name:'Corporate Job Quality Performance', value:'3 %'},
    {id:5, name:'Corporate Job Quantity Performance', value:'5 %'},
    {id:6, name:'Corporate Turnaround Time Performance', value:'6 %'},
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