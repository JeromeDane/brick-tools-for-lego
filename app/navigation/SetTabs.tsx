import { MaterialTopTabScreenProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, {useEffect} from 'react';
import SetDetailsScreen from '../screens/SetDetails';
import SetPartsScreen from '../screens/SetParts';
import SetInstructionsScreen from '../screens/SetInstructions';
import sets from '../data/sets'
import {RootStackParamList} from './types'

export type SetTabsParamList = {
  SetDetails: {id: string};
  SetInstructions: {id: string};
  SetParts: {id: string};
}

const Tab = createMaterialTopTabNavigator()

const SetTabs = ({navigation: {setOptions}, route: {params: {id}}}: MaterialTopTabScreenProps<RootStackParamList, 'Set'>) => {
  const set = sets[id]
  useEffect(() => {
    setOptions({title: set?.setNum.replace(/-.*$/, '') + ' ' + set?.name})
  }, [set])
  return <Tab.Navigator initialRouteName="SetDetails">
    <Tab.Screen
      name="SetDetails"
      initialParams={{id}}
      options={{title: 'Details'}}
      component={SetDetailsScreen} />
    <Tab.Screen
      name="SetParts"
      initialParams={{id}}
      options={{title: 'Parts'}}
      component={SetPartsScreen} />
    <Tab.Screen
      name="SetInstructions"
      initialParams={{id}}
      options={{title: 'Instructions'}}
      component={SetInstructionsScreen} />
  </Tab.Navigator>
}

export default SetTabs
