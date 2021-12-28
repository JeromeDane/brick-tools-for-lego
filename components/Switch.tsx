import * as React from 'react';
import {View, Switch as DefaultSwitch, SwitchProps as DefaultSwitchProps} from 'react-native'
import {Text} from './Themed';

interface SwitchProps extends DefaultSwitchProps {
  label: string
}

export default function(props: SwitchProps) {
  return <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
    <Text style={{textAlign: 'right', position: 'relative', top: 2}}>{props.label}</Text>
    <DefaultSwitch
      onValueChange={props.onValueChange}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={props.value ? "#30D5C8" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      value={props.value}
    />
  </View>
}
