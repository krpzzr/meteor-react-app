import React from "react";

import "../../css/App.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.setDropdownRef = this.setDropdownRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setDropdownRef(node) {
    this.dropdownRef = node;
  };

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.props.hideDropdown();
    }
  }

  render() {
    const {updateCell, cell, tableID, conditionID, dropdown} = this.props;
    return (

      <div
        className="cells_dropdown"
        ref={this.setDropdownRef}
      >
        {
          dropdown.data.map(instance => {
            return <p
              key={instance.id}
              onClick={(e) => updateCell(e, tableID, conditionID, instance, cell.id)}
              title={instance.name}
            >
              {instance.name}
            </p>;
          })
        }
      </div>

    );
  }
}

export default Dropdown;
