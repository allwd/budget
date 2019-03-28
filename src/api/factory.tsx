import { BudgetApi, RequestFactoryType } from './client'
import { FetchRequestFactory } from './requestFactory/fetch'
import { Api } from '../Context/App'

const fetchRequestFactory = FetchRequestFactory({
  requestInit: {
    // credentials: 'include' // @TODO
  }
})
const requestFactory: RequestFactoryType = (
  path,
  query,
  body,
  formData,
  headers,
  method,
  configuration
) => {
  return fetchRequestFactory(
    path,
    query,
    body,
    formData,
    Object.assign(
      {
        // 'Content-Type': 'application/json;set=UTF-8',
        // 'X-Requested-With': 'XMLHttpRequest'
      },
      configuration.headers || {},
      headers
    ),
    method,
    configuration
  )
}

export const ApiFactory = (configuration: Api): BudgetApi<any> => {
  return new BudgetApi(
    {
      domain: configuration.host,
      headers: configuration.headers
    },
    requestFactory
  )
}
