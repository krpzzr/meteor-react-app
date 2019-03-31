import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class NewTable extends React.Component {

  state = {
    openTable: true,
    tableName: "",
    columnTitles: [],
    columnTitleValue: "",
    givenAttributeValue: "",
    whenAttributeValue: "",
    thenAttributeValue: "",
    givenAttributeArray: [],
    whenAttributeArray: [],
    thenAttributeArray: []
  };

  onTableDropdown = () => {
    this.setState(prevState => ({
      openTable: !prevState.openTable,
    }));
  };

  onChangeTableName = (e) => {
    this.setState({tableName: e.target.value});
  };

  onChangeColumnTitleName = (e) => {
    this.setState({columnTitleValue: e.target.value})
  };

  addColumnTitle = () => {
    this.setState(prevState => ({
      columnTitles: [
        ...prevState.columnTitles,
        {
          name: prevState.columnTitleValue
        }
      ],
      columnTitleValue: ""
    }));
  };

  onChangeGivenAttributeValue = (e) => {
    this.setState({givenAttributeValue: e.target.value});
  };

  onChangeWhenAttributeValue = (e) => {
    this.setState({whenAttributeValue: e.target.value});
  };

  onChangeThenAttributeValue = (e) => {
    this.setState({thenAttributeValue: e.target.value});
  };

  addGivenAttr = () => {
    this.setState(prevState => ({
      givenAttributeArray: [
        ...prevState.givenAttributeArray,
        {
          name: prevState.givenAttributeValue
        }
      ],
      givenAttributeValue: ""
    }));
  };

  addWhenAttr = () => {
    this.setState(prevState => ({
      whenAttributeArray: [
        ...prevState.whenAttributeArray,
        {
          name: prevState.whenAttributeValue
        }
      ],
      whenAttributeValue: ""
    }));
  };

  addThenAttr = () => {
    this.setState(prevState => ({
      thenAttributeArray: [
        ...prevState.thenAttributeArray,
        {
          name: prevState.thenAttributeValue
        }
      ],
      thenAttributeValue: ""
    }));
  };



  render() {

    return (
      <React.Fragment>
        <div
          className={this.state.openTable ? "active table_name" : "table_name"}
          onClick={this.onTableDropdown}
        >
          <span>NEW TABLE</span>
        </div>
        <div style={{overflowX: "auto"}}>
          {
            this.state.openTable &&
            <div className="new_table_wrapper">
              <div className="init_setup_wrapper">
                <span className="title_wrapper">STEP 1 – INITIAL SET UP</span>

                <div className="input_wrapper">
                  <label htmlFor="table_name_input">TABLE NAME</label>
                  <input
                    id="table_name_input"
                    type="text"
                    onChange={this.onChangeTableName}
                    value={this.state.tableName}
                  />
                </div>
                <div>
                  <div className="input_wrapper">
                    <label htmlFor="columnTitle_name_input">COLUMN TITLES</label>
                    <div>
                      <input
                        id="columnTitle_name_input"
                        type="text"
                        onChange={this.onChangeColumnTitleName}
                        value={this.state.columnTitleValue}
                      />
                      <button onClick={this.addColumnTitle}>+</button>
                    </div>
                  </div>
                  <div className="columnTitles_list">
                    {
                      this.state.columnTitles.map(item => {
                        return <div key={item.name}>{item.name}</div>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="init_attr_wrapper">
                <div>
                  <span className="title_wrapper">STEP 2 – DEFINE YOUR GIVEN | WHEN | THEN</span>

                  <div className="gwt_wrapper">
                    <div className="g_create_wrapper">
                      <div>
                        <label htmlFor="g_create_input">GIVEN</label>
                        <input
                          id="g_create_input"
                          type="text"
                          onChange={this.onChangeGivenAttributeValue}
                          value={this.state.givenAttributeValue}
                        />
                        <button onClick={this.addGivenAttr}>+</button>
                      </div>

                      <div className="g_create_list">
                        {
                          this.state.givenAttributeArray.map((item, index) => {
                            return <div key={index}>{item.name}</div>
                          })
                        }
                      </div>
                    </div>
                    <div className="w_create_wrapper">
                      <div>
                        <label htmlFor="w_create_input">WHEN</label>
                        <input
                          id="w_create_input"
                          type="text"
                          onChange={this.onChangeWhenAttributeValue}
                          value={this.state.whenAttributeValue}
                        />
                        <button onClick={this.addWhenAttr}>+</button>
                      </div>

                      <div className="w_create_list">
                        {
                          this.state.whenAttributeArray.map((item, index) => {
                            return <div key={index}>{item.name}</div>
                          })
                        }
                      </div>
                    </div>
                    <div className="t_create_wrapper">
                      <div>
                        <label htmlFor="t_create_input">THEN</label>
                        <input
                          id="t_create_input"
                          type="text"
                          onChange={this.onChangeThenAttributeValue}
                          value={this.state.thenAttributeValue}
                        />
                        <button onClick={this.addThenAttr}>+</button>
                      </div>

                      <div className="t_create_list">
                        {
                          this.state.thenAttributeArray.map((item, index) => {
                            return <div key={index}>{item.name}</div>
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className="button_create_wrapper">
                    <button>CREATE TABLE</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default NewTable;
