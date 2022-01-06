import themesData from './raw/themes.json'
import type {Theme, Themes} from './types'

type ThemeData = {
  id: string
  name: string
  parentId: string
  numSets: number
  yearFrom: number
  yearTo: number
}

export const themesList: Themes = (themesData as ThemeData[])

export default themesList.reduce((acc: any, theme: Theme) => { // TODO: type this any
  return Object.assign(acc, {[theme.id]: theme})
}, {} as {[key: string]: Theme})
