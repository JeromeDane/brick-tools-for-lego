import {MaterialTopTabScreenProps, createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import React, {useEffect, useState} from 'react'
import SetDetailsScreen from './SetDetails'
import SetPartsScreen from './parts/SetParts'
import SetInstructionsScreen from './SetInstructions'
import {useSet} from '../../data/sets'
import {RootStackParamList} from '../../navigation/types'

export type SetTabsParamList = {
  SetDetails: {id: string};
  SetInstructions: {id: string};
  SetParts: {id: string};
}

const Tab = createMaterialTopTabNavigator()

const SetTabs = ({navigation, route: {params: {id}}}: MaterialTopTabScreenProps<RootStackParamList, 'Set'>) => {
  const set = useSet(id),
        [previousId, setPreviousId] = useState(id)
  useEffect(() => {
    navigation.setOptions({title: set?.setNum.replace(/-.*$/, '') + ' ' + set?.name})
  }, [set])
  useEffect(() => {
    setTimeout(() => setPreviousId(id), 0) // allow a render cycle for transitioning to a new set
  }, [id])
  return id == previousId // if we're transitioning to a new set, clear out what was previously rendered
    ? <Tab.Navigator initialRouteName="SetDetails" >
      <Tab.Screen
        name="SetDetails"
        initialParams={{id}}
        options={{title: 'Details', swipeEnabled: false}}
        component={SetDetailsScreen} />
      <Tab.Screen
        name="SetParts"
        initialParams={{id}}
        options={{title: 'Parts', swipeEnabled: false}}
        component={SetPartsScreen} />
      <Tab.Screen
        name="SetInstructions"
        initialParams={{id}}
        options={{title: 'Instructions', swipeEnabled: false}}
        component={SetInstructionsScreen} />
    </Tab.Navigator>
    : null
}

export default SetTabs
