import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {TextInput, useTheme} from 'react-native-paper'

type SelectProps = {
  items: {label: string; value: string | number; custom?: ReactNode; }[]
  label: string;
  value: string|number;
  onValueChange: (value: string|number) => void;
}

export default function Select({items, label, value, onValueChange}: SelectProps) {
  const theme = useTheme()
  return <View style={{
    flexGrow: 1
  }}>
    {/* right={<TextInput.Icon name="eye" />} */}
    <TextInput
      autoComplete={false}
      label={label}
      value={' '}
      mode='outlined' />
    <Picker
      style={{
        color: theme.colors.text,
        position: 'absolute',
        top: 10,
        left: -2,
        width: '100%',
        zIndex: 100
      }}
      prompt={label}
      dropdownIconColor={theme.colors.text}
      selectedValue={value}
      onValueChange={onValueChange}>
      {items.map(({label, value}, i) =>
        <Picker.Item key={i} value={value} label={label} />
      )}
    </Picker>
  </View>
}
