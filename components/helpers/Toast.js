import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

export default function Toast(props) {
  return (
    <Snackbar 
            visible={props.showToast}
            onDismiss={()=>props.setshowToast(false)}
            style={tw`${props.success ?'bg-green-700':'bg-red-800'}`}
            action={{label:'Ok', onPress:()=>props.setshowToast(false)}}
        >
            {props.message}
        </Snackbar>
  );
}
