/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Icon} from './Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import Select from './Select'

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
  onPageChange: (itemValue: number) => void | undefined;
  onPageSizeChange: (itemValue: number) => void | undefined;
  numItems: number;
  pageSize: number;
}

export default function Paginator(props: PaginatorProps) {
  const numPages = Math.ceil(props.numItems/props.pageSize),
        pickerItems = []
  if(numPages < 2) return null
  for (let i = 0; i < numPages; i++)
    pickerItems.push(
      {label: (i + 1).toString(), value: i}
    )
  return <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }}>
    <Select
      label="Show"
      value={props.pageSize}
      onValueChange={value => props.onPageSizeChange(parseInt(value.toString()))}
      items={[
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50},
        {label: '100', value: 100}
      ]} />
    {numPages > 1
      ? <>
        <TouchableOpacity
          style={{height: props.selectedValue == 0 ? 0 : 'auto'}}
          onPress={() =>
            props.onPageChange(props.selectedValue == 0 ? 0 : props.selectedValue - 1)
          }>
          <Icon name="chevron-left" style={{marginRight: 20}} />
        </TouchableOpacity>
        <Select
          label="Current Page"
          onValueChange={value => props.onPageChange(parseInt(value.toString()))}
          value={props.selectedValue}
          items={pickerItems} />
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
