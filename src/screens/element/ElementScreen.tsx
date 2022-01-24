import {MaterialTopTabScreenProps, createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import React, {useEffect} from 'react'
import ElementDetails from './ElementDetails'
import ElementSets from './ElementSets'
import {RootStackParamList} from '../../navigation/types'
import {usePart} from '../../data/parts'
import {useGetElementByPartAndColor} from '../../data/elements'
import {useIsFocused} from '@react-navigation/native'

export type SetTabsParamList = {
  SetDetails: {id: string};
  SetInstructions: {id: string};
  SetParts: {id: string};
}

const Tab = createMaterialTopTabNavigator()

const ElementScreen = ({navigation: {setOptions}, route: {params}}: MaterialTopTabScreenProps<RootStackParamList, 'Element'>) => {
  const part = usePart(params.partNum),
        getElementByPartAndColor = useGetElementByPartAndColor(),
        element = getElementByPartAndColor(params.partNum, params.colorId),
        isFocused = useIsFocused()
  useEffect(() => {
    setOptions({title: part?.name})
  }, [part, params.colorId])
  return isFocused
    ? <Tab.Navigator initialRouteName="ElementDetails">
      <Tab.Screen
        name="ElementDetails"
        initialParams={params}
        options={{title: 'Details'}}
        component={ElementDetails} />
      <Tab.Screen
        name="ElementSets"
        initialParams={params}
        options={{title: `Sets (${element.setNumbers.length.toLocaleString()})`}}
        component={ElementSets} />
    </Tab.Navigator>
    : null
}

export default ElementScreen
