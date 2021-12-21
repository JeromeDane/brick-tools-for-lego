/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('https://jeromedane.github.io/')],
  config: {
    initialRouteName: 'Root',
    screens: {
      Root: {
        initialRouteName: 'Sets',
        path: 'brick-tools-for-lego',
        screens: {
          Parts: 'parts',
          Themes: 'themes',
          Sets: 'sets',
          About: 'about',
        },
      },
      Element: 'brick-tools-for-lego/element/:id',
      Set: {
        path: 'brick-tools-for-lego/set/:id',
        screens: {
          SetDetails: 'details',
          SetParts: 'parts'
        }
      },
      Modal: 'brick-tools-for-lego/modal',
      NotFound: '*',
    },
  }
};

export default linking;
