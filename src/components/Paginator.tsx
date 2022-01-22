/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Icon, Picker} from './Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import {ItemValue} from '@react-native-picker/picker/typings/Picker'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if(colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type PaginatorProps = {
  selectedValue: number;
  onPageChange: (itemValue: ItemValue) => void | undefined;
  onPageSizeChange: (itemValue: ItemValue) => void | undefined;
  numItems: number;
  pageSize: number;
}

export default function Paginator(props: PaginatorProps) {
  const numPages = Math.ceil(props.numItems/props.pageSize),
        pickerItems = []
  if(numPages < 2) return null
  for (let i = 0; i < numPages; i++)
    pickerItems.push(
      <Picker.Item key={i} label={(i + 1).toString()} value={i} />
    )
  return <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }}>
    <Picker
      prompt="Show"
      label="Show"
      selectedValue={props.pageSize}
      onValueChange={num => {
        props.onPageChange(0)
        props.onPageSizeChange(num)
      }}
      style={{marginRight: props.selectedValue == 0 ? 0 : 20}}>
      <Picker.Item label="10 per page" value={10} />
      <Picker.Item label="25 per page" value={25} />
      <Picker.Item label="50 per page" value={50} />
      <Picker.Item label="100 per page" value={100} />
    </Picker>
    {numPages > 1
      ? <>
        <TouchableOpacity
          style={{height: props.selectedValue == 0 ? 0 : 'auto'}}
          onPress={() =>
            props.onPageChange(props.selectedValue == 0 ? 0 : props.selectedValue - 1)
          }>
          <Icon name="chevron-left" style={{marginRight: 20}} />
        </TouchableOpacity>
        <Picker
          selectedValue={props.selectedValue}
          onValueChange={props.onPageChange}
          label="Current Page">
          {pickerItems}
        </Picker>
        <TouchableOpacity
          style={{height: props.selectedValue == numPages - 1 ? 0 : 'auto'}}
          onPress={() =>
            props.onPageChange(props.selectedValue + 1)
          }>
          <Icon name="chevron-right" style={{marginLeft: 20}} />
        </TouchableOpacity>
      </>
      : null
    }
  </View>
}
