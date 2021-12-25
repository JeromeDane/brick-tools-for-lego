/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import 'react-native-gesture-handler'
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { Text } from '../components/Themed'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AboutScreen from '../screens/AboutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ElementScreen from '../screens/Element'
import ThemesScreen from '../screens/Themes';
import PartsScreen from '../screens/Parts'
import SetsScreen from '../screens/Sets';
import SettingsScreen from '../screens/Settings'
import { RootStackParamList, RootDrawerParamList } from './types';
import linking from './linking';
import SetTabs from './SetTabs'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>(),
      Drawer = createDrawerNavigator<RootDrawerParamList>(),
      Tab = createMaterialTopTabNavigator()

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name} - Brick Tools for LEGO®`,
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={DrawerNav} options={{ headerShown: false }} />
        <Stack.Screen name="Element" component={ElementScreen} />
        <Stack.Screen name="Set" component={SetTabs} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MenuButton = ({navigation}: any) => {
  const colorScheme = useColorScheme();
  return  <Pressable
    onPress={() => navigation.toggleDrawer()}
    style={({ pressed }) => ({opacity: pressed ? 0.5 : 1})}>
    <MaterialIcons
      name="menu"
      size={25}
      style={{marginLeft: 20}}
      color={Colors[colorScheme].text}
    />
  </Pressable>
}

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{padding: 20, fontWeight: 'bold'}}>Brick Tools for LEGO®</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNav = () => {
  return <Drawer.Navigator initialRouteName="Sets" drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen
      name="Sets"
      component={SetsScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <FontAwesome name="cubes" size={20} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })} />
    <Drawer.Screen
      name="Themes"
      component={ThemesScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <AntDesign name="picture" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })} />
    <Drawer.Screen
      name="Parts"
      component={PartsScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <MaterialCommunityIcons name="puzzle" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })} />
    <Drawer.Screen
      name="Settings"
      component={SettingsScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <FontAwesome name="gear" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })} />
    <Drawer.Screen
      name="About"
      component={AboutScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <AntDesign name="infocirlce" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })} />
  </Drawer.Navigator>
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
