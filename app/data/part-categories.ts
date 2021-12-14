import categoriesData from './raw/part_categories.json'

type PartCategoryData = {
  id: string,
  name: string
}

export type PartCategory = {
  id: string,
  name: string
}

const partCategories : {[key:string]: PartCategory} = (categoriesData as PartCategoryData[])
  .reduce((acc: {[key: string]: PartCategory}, categoryData: PartCategoryData) => {
    acc[categoryData.id] = categoryData as PartCategory
    return acc
  }, {})

export default partCategories

export const getPartCategory = (id: string) =>
  partCategories[id] || {
    id: '-1',
    name: 'unknown'
  }