import { Account, Money, Element, User, UserLogin, UserRegistration } from './models'

export type GetAccountsHeaderParameters = {
  Authorization?: any
}

export type PostAccountsBodyParameters = Account

export type PostAccountsHeaderParameters = {
  Authorization?: any
}

export type GetAccountsByIdHeaderParameters = {
  Authorization?: any
}

export type PutAccountsByIdBodyParameters = Account

export type PutAccountsByIdHeaderParameters = {
  Authorization?: any
}

export type DeleteAccountsByIdHeaderParameters = {
  Authorization?: any
}

export type GetElementsHeaderParameters = {
  Authorization?: any
}

export type PostElementsBodyParameters = Element

export type PostElementsHeaderParameters = {
  Authorization?: any
}

export type GetElementsByIdHeaderParameters = {
  Authorization?: any
}

export type PutElementsByIdBodyParameters = Element

export type PutElementsByIdHeaderParameters = {
  Authorization?: any
}

export type DeleteElementsByIdHeaderParameters = {
  Authorization?: any
}

export type PostUsersAuthenticateBodyParameters = UserLogin

export type PostUsersRegisterBodyParameters = UserRegistration

export type GetUsersHeaderParameters = {
  Authorization?: any
}

export type PutUsersQueryParameters = {
  email: string
}

export type PutUsersBodyParameters = UserRegistration

export type PutUsersHeaderParameters = {
  Authorization?: any
}

export interface ApiResponse<T> extends Response {
  json(): Promise<T>
}

export type RequestFactoryType = (
  path: string,
  query: any,
  body: any,
  formData: any,
  headers: any,
  method: string,
  configuration: any
) => Promise<ApiResponse<any>>

export class BudgetApi<T extends { domain: string }> {
  constructor(protected configuration: T, protected requestFactory: RequestFactoryType) {}

  GetAccounts(header: GetAccountsHeaderParameters): Promise<ApiResponse<Array<Account> | any>> {
    let path = '/accounts/'
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'GET',
      this.configuration
    )
  }

  PostAccounts(
    body: PostAccountsBodyParameters,
    header: PostAccountsHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/accounts/'
    return this.requestFactory(path, undefined, body, undefined, header, 'POST', this.configuration)
  }

  GetAccountsById(
    idPathParameter: string,
    header: GetAccountsByIdHeaderParameters
  ): Promise<ApiResponse<Account | any>> {
    let path = '/accounts/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'GET',
      this.configuration
    )
  }

  PutAccountsById(
    idPathParameter: string,
    body: PutAccountsByIdBodyParameters,
    header: PutAccountsByIdHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/accounts/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(path, undefined, body, undefined, header, 'PUT', this.configuration)
  }

  DeleteAccountsById(
    idPathParameter: string,
    header: DeleteAccountsByIdHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/accounts/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'DELETE',
      this.configuration
    )
  }

  GetElements(header: GetElementsHeaderParameters): Promise<ApiResponse<Array<Element> | any>> {
    let path = '/elements/'
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'GET',
      this.configuration
    )
  }

  PostElements(
    body: PostElementsBodyParameters,
    header: PostElementsHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/elements/'
    return this.requestFactory(path, undefined, body, undefined, header, 'POST', this.configuration)
  }

  GetElementsById(
    idPathParameter: string,
    header: GetElementsByIdHeaderParameters
  ): Promise<ApiResponse<Element | any>> {
    let path = '/elements/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'GET',
      this.configuration
    )
  }

  PutElementsById(
    idPathParameter: string,
    body: PutElementsByIdBodyParameters,
    header: PutElementsByIdHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/elements/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(path, undefined, body, undefined, header, 'PUT', this.configuration)
  }

  DeleteElementsById(
    idPathParameter: string,
    header: DeleteElementsByIdHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/elements/{id}'
    path = path.replace('{id}', String(idPathParameter))
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'DELETE',
      this.configuration
    )
  }

  PostUsersAuthenticate(
    body: PostUsersAuthenticateBodyParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/users/authenticate'
    return this.requestFactory(
      path,
      undefined,
      body,
      undefined,
      undefined,
      'POST',
      this.configuration
    )
  }

  PostUsersRegister(body: PostUsersRegisterBodyParameters): Promise<ApiResponse<any | any>> {
    let path = '/users/register'
    return this.requestFactory(
      path,
      undefined,
      body,
      undefined,
      undefined,
      'POST',
      this.configuration
    )
  }

  GetUsers(header: GetUsersHeaderParameters): Promise<ApiResponse<User | any>> {
    let path = '/users/'
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      header,
      'GET',
      this.configuration
    )
  }

  PutUsers(
    query: PutUsersQueryParameters,
    body: PutUsersBodyParameters,
    header: PutUsersHeaderParameters
  ): Promise<ApiResponse<any | any>> {
    let path = '/users/'
    return this.requestFactory(path, query, body, undefined, header, 'PUT', this.configuration)
  }
}
