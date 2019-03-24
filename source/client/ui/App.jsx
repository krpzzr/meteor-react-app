import React from "react";
import {withTracker} from "meteor/react-meteor-data";

import Table from "./components/Table";

import "../css/App.css";

// Init collections on server
import {Tables} from "../../data/collections-init";

this.Tables = Tables;

class App extends React.Component {

  render() {
    const tables = this.props.tables.find({}).fetch();

    return (
      <div className="container">

        <div className="tables_container">
          <div className="row">
            <div className="topButtons_wrapper">
              <div className="left_wr">
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                  </svg>
                  NEW TEST AUTOMATIONS TABLE
                </button>
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                  </svg>
                  TEST SHEET
                </button>
              </div>
              <div className="right_wr">
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                  </svg>
                  EDIT GIVEN-WHEN-THEN
                </button>
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                  </svg>
                  EDIT COLUMN TITLES
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div style={{
              textAlign: "center",
              backgroundColor: "#3B3B39",
            }}>
              <h2 style={{
                fontWeight: 300,
                fontSize: 50,
                color: "#fff",
              }}>Title Name</h2>
            </div>
          </div>

          <div className="row">
            {
              tables.length > 0 ?
                tables.map(table => {
                  return (
                    <Table
                      key={table.id}
                      table={table}
                    />
                  );
                }) :
                "Loading data..."
            }
          </div>

        </div>

      </div>
    );
  }
}

export default withTracker(() => {
  Tables.find({}).fetch();
  return {
    // Return tables as React prop
    tables: Tables,
  };

})(App);

