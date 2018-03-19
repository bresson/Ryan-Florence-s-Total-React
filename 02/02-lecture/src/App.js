import "./index.css"
import React, { Component } from "react"
import FaAutomobile from "react-icons/lib/fa/automobile"
import FaBed from "react-icons/lib/fa/bed"
import FaPlane from "react-icons/lib/fa/plane"
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle"
import * as text from "./text"

class Tabs extends Component { //Establishes state, a way to change state,
  //pass it down to it's children and return a className
  state = {
    activeIndex: 0
  }

  selectTabIndex = activeIndex => { //is now a property of our instance which means
    this.setState({ activeIndex })//from the docs : "Only components declared as classes have instances,
    //and you never create them directly: React does that for you.
    //While mechanisms for a parent component instance to access a child component instance exist,
    //they are only used for imperative actions (such as setting focus on a field), and should generally be avoided."
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,//implicit props passing state
        onSelectTab: this.selectTabIndex//implicitly passing click handler
      })
    })
    return (
      <div className="Tabs">
        {children}
      </div>
    )
  }
}

class TabList extends Component { //Takes state, passes it down to the active component after the calculation of whether the
  //component is active or not
  render() {
    const { activeIndex } = this.props
    const children = React.Children.map(this.props.children, (child, index) => { //React.Children.map is a helper func
      //so that we don't have to check if it's an array or an obj
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.props.onSelectTab(index)
      }) //wow what is happening here? --probably have not seen this before.
    })
    return (
      <div className="tabs">
        {children}
      </div>
    )
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props
    return (
      <div
        className={
          isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    )
  }
}

class TabPanels extends Component {
  render() {
    const { activeIndex, children } = this.props
    return (
      <div className="panels">
        {children[activeIndex]}
      </div>
    )
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children
  }
}

class DataTabs extends Component { //decomposable component that you can
  //pull apart and move a piece while keeping functionality
  render() {
    const { data } = this.props
    return (
      <Tabs>
        <TabList>
          {data.map(tab =>
            <Tab>
              {tab.label}
            </Tab>
          )}
        </TabList>
        <TabPanels>
          {data.map(tab =>
            <TabPanel>
              {tab.content}
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    )
  }
}

class App extends Component {
  render() {
    const tabData = [
      {
        label: <FaAutomobile />,
        content: text.cars
      },
      {
        label: <FaBed />, //haven't seen this before, component as part of a dataset
        content: text.hotels
      },
      {
        label: <FaPlane />,
        content: text.flights
      },
      {
        label: <FaSpaceShuttle />,
        content: text.space
      }
    ]
    return (
      <div className="App">
        <DataTabs data={tabData} />
      </div>
    )
  }
}

export default App
