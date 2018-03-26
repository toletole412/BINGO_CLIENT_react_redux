import React, {PureComponent} from 'react'
import './Style.css'

class Cell extends PureComponent {
  render() {
    const selected = this.props.selected ? "selected" : "";

    return (
      <div
        className={`cell ${selected}`}
        onClick={() => this.props.onClick(this)}
      >
        <div className="circle" />
        {this.props.value}
      </div>
    )
  }
}


export default Cell;
