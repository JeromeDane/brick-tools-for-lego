/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {DrawerScreenProps} from '@react-navigation/Drawer'
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

{/* eslint-disable @typescript-eslint/no-namespace */}
declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList
  }
}
{/* eslint-enable @typescript-eslint/no-namespace */}

export type RootDrawerParamList = {
  Sets: undefined;
  Themes: undefined;
  Parts: undefined;
  About: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  About: undefined;
  Element: {partNum: string, colorId: string};
  Modal: undefined;
  NotFound: undefined;
  Part: {id: string};
  Parts: undefined;
  Set: {id: string};
  Settings: undefined;
  Sets: undefined;
  Root: NavigatorScreenParams<RootDrawerParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
