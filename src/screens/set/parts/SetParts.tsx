import React, {useCallback, useEffect, useState} from 'react'
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import {SetTabsParamList} from '../SetScreen'
import {useSet} from '../../../data/sets'
import LoadingWrapper from '../../../components/LoadingWrapper'
import SetPartsList from './SetPartsList'
import {useFocusEffect} from '@react-navigation/native'

export default function SetPartsScreen({navigation, route: {params: {id}}} : MaterialTopTabScreenProps<SetTabsParamList, 'SetParts'>) {
  const set = useSet(id),
        [hasFocused, setHasFocused] = useState(false)
  useEffect(() => {
    navigation.setOptions({title: `Parts (${set?.numParts.toLocaleString()})`})
  }, [set?.numParts])
  useFocusEffect(useCallback(() => {
    if(!hasFocused) setHasFocused(true)
  }, []))
  return (
    <LoadingWrapper loading={!hasFocused} style={{padding: 20}}>
      <SetPartsList set={set} navigation={navigation} />
    </LoadingWrapper>
  )
}
