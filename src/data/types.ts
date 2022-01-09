import type {PartCategory} from './part-categories'
import type {Color} from './colors'

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
}

export type BricksetCollection = Immutable<{[key: string]: {
  owned: boolean;
  wanted: boolean;
  qtyOwned: number;
  rating: number;
  notes: string;
}}>

type LEGOComPrice = Immutable<{
  retailPrice?: number;
  dateFirstAvailable?: string,
  dateLastAvailable?: string
}>

export type Set = Immutable<{
  setNum: string;
  name: string;
  year: number;
  theme: Theme;
  numParts: number;
  setNumSort: number;
  inventories: {
    id: string;
    version: string;
  }[]
  LEGOCom: {
    US: LEGOComPrice;
    UK: LEGOComPrice;
    CA: LEGOComPrice;
    DE: LEGOComPrice;
  }
  ownedBy: number
  wantedBy: number
  image: {
    imageURL: string
    thumbnailURL: string
  }
  collection: {
    owned: boolean
    wanted: boolean
    qtyOwned: number
    rating: number
    notes: string
  }
  bricksetID: number
}>

export type Sets = Immutable<Set[]>

export type PartData = {
  partNum: string,
  name: string,
  partCatId: string,
  partMaterial: string
}

export interface Part extends PartData {
  nameSort: string,
  width: number,
  length: number,
  height: number,
  category: PartCategory,
  subCategory: string,
  colors: Color[]
}

export type Parts = Immutable<{
  [key: string]: Part
}>

export type Element = Immutable<{
  id: string,
  part: Part,
  color: Color
}>

export type Elements = Immutable<{[key: string]: Element}>

export type InventoryPart = Immutable<{
  part: Part,
  color: Color,
  quantity: number,
  isSpare: boolean,
  element: Element
}>

export type InventoryParts = Immutable<InventoryPart[]>

export type Theme = Immutable<{
  id: string
  name: string
  parentId: string
  numSets: number
  yearFrom: number
  yearTo: number
}>

export type Themes = Immutable<Theme[]>
