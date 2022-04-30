import { ScrollView,View, FlatList, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import IconCard from '../../../components/card/iconCard'

export default function Individual() {

    const data = [
        {id:1, name:'My Pending Task', value:2},
        {id:2, name:'My Active Task', value:4},
        {id:3, name:'My Overdue Task', value:5},
        {id:4, name:'My Completed Task', value:3},
        {id:5, name:'My Rework Task', value:5},
        {id:6, name:'My Rework OverDue Task', value:6},
        {id:7, name:'Task Awaiting Rating', value:8},
        {id:8, name:'My Overall Performance', value:'12 %'},
        {id:9, name:'My Job Quality Performance', value:'22 %'},
        {id:10, name:'My Job Quantity Performance', value:'42 %'},
        {id:11, name:'My Turnaround Time Performance', value:'12 %'},
        {id:12, name:'My Contribution To Team', value:'5 %'}
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