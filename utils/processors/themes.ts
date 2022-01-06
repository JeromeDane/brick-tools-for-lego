import bricksetApi from '../brickset-api'
import {fetchRebrickableCSVData, saveData} from '../rebrickable'
import {getSets} from './sets'
import type {Themes} from '../../src/data/types'

let processedThemes: Themes

export const processThemes = async (): Promise<Themes> => {
  const themes = await fetchRebrickableCSVData('themes'),
        sets = await getSets()
  // TODO: do all of this with less mutation
  themes.map((theme: any) => { // TODO: type this any
    theme.numSets = sets.reduce((num : number, set: any) =>
      num + (set.themeId == theme.id ? 1 : 0)
    , 0)
    return theme
  });
  (await bricksetApi('getThemes')).themes
    .forEach((bricksetTheme : any) => {// TODO: type this any
      const theme = themes.find(({name} : any) => name === bricksetTheme.theme) // TODO: type this any
      if(theme) {
        theme.yearFrom = bricksetTheme.yearFrom
        theme.yearTo = bricksetTheme.yearTo
      }
    })
  saveData('themes', themes)
  processedThemes = themes
  return themes
}

export const getThemes = async (): Promise<Themes> => processedThemes || processThemes()
