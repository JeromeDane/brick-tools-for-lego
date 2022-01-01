import type {Theme} from './themes'

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
