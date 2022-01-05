import {csvToJson, fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processColors = async () => {
  const colors = await fetchRebrickableCSVData('colors'),
        // Note: The normal colors.csv download lacks tons of details that
        // are in the table at https://rebrickable.com/colors/. To update,
        // copy and paste the table into a google spreadsheet, then delete
        // all fields except for ID,FirstYear,LastYear,LEGO,LDraw,BrickLink,BrickOwl
        // save as a CSV file in 'data/rebrickable/color-details.csv`
        // TODO: Automate call to https://rebrickable.com/api/v3/swagger/?key=#!/lego/lego_colors_list
        colorDetails = await csvToJson('color-details')

  saveData('colors', colors.map((color: any) => {
    const split = (input: string) => {
      const match = input && input.match(/^([^[]+?)\s*\['(.+?)'/)
      return {
        id: match && match[1],
        name: match && match[2]
      }
    }
    const {
      firstYear,
      lastYear,
      lego,
      lDraw,
      brickLink,
      brickOwl
    } = colorDetails.find(({id}: {id: string}) => id == color.id) || {}
    return Object.assign(color, {
      firstYear: firstYear && parseInt(firstYear),
      lastYear: lastYear && parseInt(lastYear),
      lego: split(lego),
      lDraw: split(lDraw),
      brickLink: split(brickLink),
      brickOwl: split(brickOwl)
    })
  }))
}
