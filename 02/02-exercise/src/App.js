import './index.css'
import React, { Component } from 'react'
import FaPlay from 'react-icons/lib/fa/play'
import FaPause from 'react-icons/lib/fa/pause'
import FaForward from 'react-icons/lib/fa/forward'
import FaBackward from 'react-icons/lib/fa/backward'

class RadioGroup extends Component {
  state = {
      value: this.props.defaultValue
  }
  render() {
    const children = React.Children.map(this.props.children, (child) =>{
      return React.cloneElement(child, {
        isActive: this.state.value === child.props.value,
        onSelect: () => {
          this.setState({ value: child.props.value })
        }
      }) //returns clone of child
    }) //newProps aka implicit props
    //can I use this on victory charts???
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    )
  }
}

class RadioButton extends Component {
  render() {
    const { isActive, onSelect } = this.props// <-- comes from children's state
    const className = 'radio-button ' + (isActive ? 'active' : '')
    console.log(this.props)
    return (
      <button className={className} onClick={onSelect}>
        {this.props.children}
      </button>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue= "pause"
          legend="Radio Group">
          <RadioButton value="back"><FaBackward/></RadioButton>
          <RadioButton value="play"><FaPlay/></RadioButton>
          <RadioButton value="pause"><FaPause/></RadioButton>
          <RadioButton value="forward"><FaForward/></RadioButton>
        </RadioGroup>
      </div>
    )
  }
}

export default App
