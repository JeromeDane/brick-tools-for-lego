import * as React from 'react';
import {View} from 'react-native'
import {Text} from './Themed'
import DefaultCheckBox, { CheckBoxProps as DefaultCheckBoxProps } from '@react-native-community/checkbox';
import { relative } from 'path/posix';

interface CheckBoxProps extends DefaultCheckBoxProps {
  label: string
}

const CheckBox = (props: CheckBoxProps) => {
  return <View style={{flex: 1, flexDirection: 'row'}}>
    <DefaultCheckBox {...props} style={[props.style, { }]}
      tintColors={{false: '#aaa'}}
      lineWidth={2} />
    <Text style={{position: 'relative', top: 5}}>
      {props.label}
    </Text>
  </View>
}

export default CheckBox
