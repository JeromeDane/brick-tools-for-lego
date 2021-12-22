import sortBy from 'sort-by'
import categoriesData from './raw/part_categories.json'

type PartCategoryData = {
  id: string,
  name: string
}

export type PartCategory = {
  id: string,
  name: string
}

const partCategoriesListUnsorted : PartCategory[] = []

const partCategories : {[key:string]: PartCategory} = (categoriesData as PartCategoryData[])
  .reduce((acc: {[key: string]: PartCategory}, categoryData: PartCategoryData) => {
    acc[categoryData.id] = categoryData as PartCategory
    partCategoriesListUnsorted.push(acc[categoryData.id])
    return acc
  }, {})

export default partCategories

export const partCategoriesList = partCategoriesListUnsorted.sort(sortBy('name'))

export const getPartCategory = (id: string) =>
  partCategories[id] || {
    id: '-1',
    name: 'unknown'
  }