//At some point he brings up hoisting and you don't know hoisting
//and static classes... what are those?

/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import './index.css'
import React, { Component } from 'react'
import MenuIcon from 'react-icons/lib/md/menu'
import { set, get, subscribe } from './local-storage'

const withStorage = (storageKey, deflt) => (Comp) => { //be careful not to use the reserved word
  return class withStorage extends Component {
    state = {
      [storageKey]: get(storageKey, true)
    }
//storageKey in [] is a dynamic variable because JS
    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          [storageKey]: get(storageKey)
        })
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }
    set = (value) => {
      set(storageKey, value)
    }
    render(){
      return <Comp {...this.state} setStorage={this.set} />
    }
  }
}
class App extends React.Component {

  render() {
    const { sidebarIsOpen, setStorage } = this.state
    //often you get state as a prop and some sort of function to
    //manage that state
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              set(!sidebarIsOpen)
            }}
          >
            <MenuIcon/>
          </button>
        </header>

        <div className="container">
          <aside className={sidebarIsOpen ? 'open' : 'closed'}/>
          <main/>
        </div>
      </div>
    )
  }
}

export default withStorage('sidebarIsOpen', true)(App)
//getting sidebarisOpen from localstorage
//default is true
// withStorage('sidebarIsOpen', true) is a HOF that returns Comp
//and then takes App and wraps it in behaviour stuff
