import * as React from 'react'
import { Element as ElementModel, Account as AccountModel } from '../api/models'

// @TODO change interfaces to the ones generated by models
export interface AppState {
  api?: Api
  user?: UserState
  accounts?: AccountModel[]
  messages?: Message[]
  data?: ElementModel[]
  setState?: (state: Partial<AppState>) => void
}

export type TYPES = 'income' | 'expense' | 'transfer'

export interface UserState {
  jwt?: any
  isAuthenticated?: boolean
  data?: any
}

export interface Api {
  host?: string
  headers?: {
    [key: string]: string
  }
}

export interface Message {
  id: number
  date: string
  message: string
}

export interface MoneyElement {
  amount?: number
  currency?: string
}

export interface BudgetElement extends ElementModel {}

// export interface BudgetElement {
//   id: string
//   tags?: string[]
//   category?: string
//   date?: string
//   image?: string
//   type?: string // expense/income maybe?
//   money?: MoneyElement
// }

export let AppContext = React.createContext({} as AppState)