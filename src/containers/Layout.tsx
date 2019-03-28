import * as React from 'react'
import Index from './Index'
import { AppContext } from '../Context/App'

interface LayoutProps {
  page?: string
  context?: any
}
export class Layout extends React.Component<LayoutProps> {
  render() {
    return <AppContext.Consumer>{context => <Index context={context} />}</AppContext.Consumer>
  }
}
