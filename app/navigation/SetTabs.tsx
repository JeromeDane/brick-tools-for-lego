import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, {useEffect} from 'react';
import SetDetailsScreen from '../screens/SetDetails';
import SetPartsScreen from '../screens/SetParts';
import sets from '../data/raw/sets.json'

const Tab = createMaterialTopTabNavigator()

const SetTabs = ({navigation}) => {
  const {routes, index} = navigation.getState(),
        id = routes[index].params.id,
        set = sets.find(set => set.setNum === id)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: set?.setNum + ' ' + set?.name
    })
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
  </Tab.Navigator>
}

export default SetTabs
