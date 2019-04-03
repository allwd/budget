export type Account = {
  _id?: string
  user: string
  title?: string
  type?: string
  money?: Money
}

export type Money = {
  amount: number
  currency?: string
}

export type Element = {
  _id: string
  user: string
  account?: string
  tags?: Array<string>
  category?: string
  createdDate?: string
  image?: string
  type?: string
  money?: Money
}

export type User = {
  email: string
  password?: string
  name?: string
  createdDate?: string
  language?: string
}

export type UserLogin = {
  email: string
  password?: string
}

export type UserRegistration = {
  email: string
  password?: string
  name?: string
  language?: string
}
