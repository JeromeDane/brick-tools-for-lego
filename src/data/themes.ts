import themesData from './raw/themes.json'

type ThemeData = {
  id: string
  name: string
  parentId: string
  numSets: number
  yearFrom: number
  yearTo: number
}

export type Theme = {
  id: string
  name: string
  parentId: string
  numSets: number
  yearFrom: number
  yearTo: number
}

export const themesList: Theme[] = (themesData as ThemeData[])

export default themesList.reduce((acc, theme: Theme) => {
  return Object.assign(acc, {[theme.id]: theme})
}, {} as {[key: string]: Theme})
