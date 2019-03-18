import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

import * as _ from "lodash";

import Table from "./components/Table";

import "../css/App.css";

// Init collections on server
import {Tables} from "../../data/collections-init";

this.Tables = Tables;

class App extends React.Component {

  render() {

    return (
      <div className="container">

        <div className="tables_container">
          <div className="row">
            <div className="topButtons_wrapper">
              <div className="left">
                <button>NEW TEST AUTOMATIONS TABLE</button>
                <button>TEST SHEET</button>
              </div>
              <div className="right">
                <button>EDIT GIVEN-WHEN-THEN</button>
                <button>EDIT COLUMN TITLES</button>
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
              this.props.tables.map(item => {
                return (
                  <Table
                    key={item.id}
                    item={item}
                  />
                );
              })
            }
          </div>

        </div>

      </div>
    );
  }
}

export default withTracker(() => {

  return {
    // Return tables as React prop
    tables: Tables,
  };

})(App);

