import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class NewTable extends React.Component {

  state = {
    openTable: true,
  };

  onTableDropdown = () => {
    this.setState(prevState => ({
      openTable: !prevState.openTable,
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
                <h3>STEP 1 – INITIAL SET UP</h3>

                <div>
                  <label htmlFor="table_name_input">TABLE NAME</label>
                  <input id="table_name_input" type="text"/>
                </div>
                <div>
                  <div>
                    <label htmlFor="columnTitle_name_input">COLUMN TITLES</label>
                    <input id="columnTitle_name_input" type="text"/>
                  </div>
                  <div>
                    <div>STRAIGHT THROUGH</div>
                  </div>
                </div>
              </div>
              <div className="init_attr_wrapper">
                <div>
                  <h3>STEP 2 – DEFINE YOUR GIVEN | WHEN | THEN</h3>

                  <div className="gwt_wrapper">
                    <div className="g_create_wrapper">
                      <div>
                        <label htmlFor="g_create_input">GIVEN</label>
                        <input id="g_create_input" type="text"/>
                        <button>+</button>
                      </div>
                      <div>
                        Level 1
                      </div>
                    </div>
                    <div className="w_create_wrapper">
                      <label htmlFor="w_create_input">WHEN</label>
                      <input id="w_create_input" type="text"/>
                      <button>+</button>
                    </div>
                    <div className="t_create_wrapper">
                      <label htmlFor="t_create_input">THEN</label>
                      <input id="t_create_input" type="text"/>
                      <button>+</button>
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
