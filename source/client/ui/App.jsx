import React from "react";
import {withTracker} from "meteor/react-meteor-data";

// instead of npm jquery we use meteor jquery package; otherwise SUI doesnt see jQuery..
// global var on init
// import $ from "jquery";
import "semantic-ui-css";

// Init collections on server
import {Scenarios, TestPaths} from "../../data/collections-init";

this.Scenarios = Scenarios;
this.TestPaths = TestPaths;

a = {};
console.log();

// export default class App extends React.Component {
class App extends React.Component {
  render() {
    console.log(this.props.scenarios, this.props.dbLoaded)
    // const dbLoaded = (this.props.scenarios.find().count() > 0);
    if (this.props.dbLoaded) {
      const scenario2 = this.props.scenarios.findOne({Name: "TestSheet2"});
      const scenario3 = this.props.scenarios.findOne({Name: "TestSheet3"});

      const headerRow2 = scenario2.TestCases.map((testCase, i) => {
        return <div key={i} className="column">{testCase.Name}</div>;
      });
      /*
      function headerRow2(headers) {
        const res = headers.map((instance, i) => {
          return <div key={i} className="column">{instance}</div>;
        });
        return res;
      }
      */
      const headerRow3 = scenario3.TestCases.map((testCase, i) => {
        return <div key={i} className="column">{testCase.Name}</div>;
      });

      const jiraIssuesPath = "https://automato.atlassian.net/browse/";

      return (<>
        <div className="ui visible sidebar vertical menu bg-gray">
          <h1 className="ta-center fc-white bg-violet">SPRINT 1</h1>
          <div className="ui icon input"><i className="search icon"></i>
            <input type="text" placeholder="SEARCH"/>
          </div>
          <div className="TreeView">
            <div className="ui styled accordion bg-gray">
              <div className="title fc-violet"><i className="dropdown icon"></i>SAP (4)</div>
              <div className="content">
                <div className="accordion bg-gray">
                  <div className="title fc-violet"><i className="dropdown icon"></i>Engineering
                    (1)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet"><i className="dropdown icon"></i>FICO (1)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet"><i className="dropdown icon"></i> Shipping
                    (0)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet">
                    <i className="dropdown icon"></i> Business-Processes (2)
                  </div>
                  <div className="content"></div>
                </div>
              </div>
              <div className="title fc-violet"><i className="dropdown icon"></i>SAP Ariba (…)
              </div>
              <div className="content">
                <div className="accordion bg-gray">
                  <div className="title fc-violet"><i className="dropdown icon"></i> Contract
                    Management (…)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet"><i className="dropdown icon"></i> Approval
                    workflow (…)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet"><i
                    className="dropdown icon"
                  ></i> Procurement
                    (…)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet"><i className="dropdown icon"></i> Strategic
                    Sourcing (…)
                  </div>
                  <div className="content"></div>
                  <div className="title fc-violet">
                    <i className="dropdown icon"/>
                    Supplier Management (…)
                  </div>
                  <div className="content"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
			.ui.sidebar {
			width: 25rem !important;
			padding: 1rem;
		}
			.ui.input {
			width: 100%;
		}`}
        </style>
        <div className="pusher">
          <div className="SAPbox fc-violet bg-gray">
            <h1 className="ui header fc-violet">SAP</h1>
            <p>As a &lt;type of user&gt;</p>
            <p>I want &lt;same goal&gt;</p>
            <p>So that &lt;some reason&gt;</p>
          </div>
          <style>{`
				.SAPbox {
				width: 25rem;
				padding: 1rem;
				padding-top: 20px;
			}
				.SAPbox .ui.header {
				margin-bottom: 3rem;
			}`}
          </style>
          <h1 className="testDesign bg-violet fc-white ta-center">TEST DESIGN</h1>
          <div className="ScenariosAccordion ui accordion">
            <div className="title bg-bright-red fc-white ta-center">SCENARIO NAME 1
              <div className="dropdown icon"/>
            </div>
            <div className="content">
              <div className="Scenario-1">
                <div className="ui grid">
                  <div className="row">
                    <div className="firstColumn column bg-red">GIVEN</div>
                    <div className="secondColumn column bg-gray fc-red">THE COFFEE MACHINE
                      HAS
                      BEEN STARTED
                    </div>
                  </div>
                  <div className="row">
                    <div className="firstColumn column bg-red">WHEN</div>
                    <div className="secondColumn column bg-gray fc-red">I TAKE 40 COFFEES
                    </div>
                  </div>
                  <div className="row">
                    <div className="firstColumn column bg-green">THEN</div>
                    <div className="secondColumn column fc-green" id="then">
                      <div
                        className="row bg-gray" style={{height: "50%", marginBottom: 5}}
                      >COFFEE
                        SHOULD NOT BE SERVED
                      </div>
                      <div className="row bg-gray" style={{height: "50%"}}><span
                        className="fc-red fw-bold"
                      >AND&nbsp;</span>COFFEE SHOULD NOT BE SERVED
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="title bg-bright-red fc-white ta-center">
              {scenario2.Name}
              <div className="dropdown icon"/>
            </div>
            <div className="content">
              <div className="Scenario-2">
                <div className="ui grid">
                  <div className="prj-header row ta-center">
                    <div className="firstColumn column"/>
                    <div className="secondColumn column"/>
                    {headerRow2}
                    {/*{headerRow2(table2.Instances)}*/}
                  </div>
                  <div className="prj-given row">
                    <div className="firstColumn column bg-red">{scenario2.Attributes[0].Name}</div>
                    <div className="secondColumn column fc-red">
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[0].Conditions[0]}</div>
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[0].Conditions[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[0]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[0]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[0]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[0]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[0]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[1]}</div>
                    </div>
                  </div>
                  <div className="prj-when row">
                    <div
                      className="firstColumn column bg-red" style={{height: "15rem"}}
                    >{scenario2.Attributes[1].Name}</div>
                    <div className="secondColumn column fc-red">
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[1].Conditions[0]}</div>
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[1].Conditions[1]}</div>
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[1].Conditions[2]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[2]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[3]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[4]}
                        <i className="inverted red lock icon"/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[2]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[3]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[4]}
                        <i className="inverted red lock icon"/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[2]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[3]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[4]}
                        <i className="inverted red lock icon"/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[2]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[3]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[4]}
                        <i className="inverted red lock icon"/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[2]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[3]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[4]}
                        <i className="inverted red lock icon"/>
                      </div>
                    </div>
                  </div>
                  <div className="prj-given row">
                    <div
                      className="firstColumn column bg-green"
                    >{scenario2.Attributes[2].Name}</div>
                    <div className="secondColumn column fc-green">
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[2].Conditions[0]}</div>
                      <div
                        className="row bg-gray"
                      >{scenario2.Attributes[2].Conditions[1]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[5]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[0].Values[6]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[5]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[1].Values[6]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[5]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[2].Values[6]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[5]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[3].Values[6]}</div>
                    </div>
                    <div className="column">
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[5]}</div>
                      <div className="row bg-gray">{scenario2.TestCases[4].Values[6]}</div>
                    </div>
                  </div>
                  <div className="prj-defects row">
                    <div className="firstColumn column"></div>
                    <div className="secondColumn column"></div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario2.TestCases[0].issueId}
                        target="_blank"
                      >{scenario2.TestCases[0].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario2.TestCases[1].issueId}
                        target="_blank"
                      >{scenario2.TestCases[1].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario2.TestCases[2].issueId}
                        target="_blank"
                      >{scenario2.TestCases[2].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario2.TestCases[3].issueId}
                        target="_blank"
                      >{scenario2.TestCases[3].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario2.TestCases[4].issueId}
                        target="_blank"
                      >{scenario2.TestCases[4].hasDefects ? "defect" : ""}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="title bg-bright-red fc-white ta-center">{scenario3.Name}
              <div
                className="dropdown icon"
              />
            </div>
            <div className="content">
              <div className="Scenario-3">
                <div className="ui grid">
                  <div className="prj-header row ta-center">
                    <div className="firstColumn column"/>
                    <div className="secondColumn column"/>
                    {headerRow3}
                  </div>
                  <div className="prj-administation row">
                    <div
                      className="firstColumn column bg-orange"
                    >{scenario3.Attributes[0].Name}</div>
                    <div className="secondColumn column bg-gray"/>
                    <div className="column bg-gray">{scenario3.TestCases[0].Values[0]}</div>
                    <div className="column bg-gray">{scenario3.TestCases[1].Values[0]}</div>
                    <div className="column bg-gray">{scenario3.TestCases[2].Values[0]}</div>
                    <div className="column bg-gray">{scenario3.TestCases[3].Values[0]}</div>
                    <div className="column bg-gray">{scenario3.TestCases[4].Values[0]}</div>
                    <div className="column bg-gray">{scenario3.TestCases[5].Values[0]}</div>
                  </div>
                  <div className="prj-precondition row">
                    <div
                      className="firstColumn column bg-red" style={{height: "25rem"}}
                    >{scenario3.Attributes[1].Name}
                    </div>
                    <div
                      className="secondColumn column fc-red"
                      style={{flexDirection: "initial"}}
                    >
                      {/*<style>`#id1:{}*/}
                      <style>{`#id1 {height: 100%; width: 40%; margin: 0 !important}`}</style>
                      <div className="column" id={"id1"} style={{}}>
                        <div
                          className="main row bg-gray" style={{marginBottom: 0}}
                        >{scenario3.Attributes[1].Conditions[0]}</div>
                        <div className="main row bg-gray" style={{marginBottom: 0}}/>
                        <div className="main row bg-gray" style={{marginBottom: 0}}/>
                        <div className="main row bg-gray" style={{marginBottom: 0}}/>
                        <div className="main row bg-gray" style={{marginBottom: 0}}/>
                      </div>
                      <style>{`#id2 {height: 100%; width: 60%; margin-right: 0 !important}`}</style>
                      <div className="column" id={"id2"} style={{}}>
                        <style>{`#id3 {margin-left: -1rem; width: calc(100% - 11px) !important`}</style>
                        <div
                          className="prj-right-arrow main row bg-gray" id={"id3"}
                          style={{}}
                        />
                        <div
                          className="prj-right-arrow main row bg-gray"
                          style={{marginBottom: 5}}
                        >{scenario3.Attributes[1].Conditions[1]}</div>
                        <div
                          className="prj-right-arrow main row bg-gray"
                          style={{marginBottom: 5}}
                        >{scenario3.Attributes[1].Conditions[2]}</div>
                        <style>{`#id4 {height: 40%; padding: 0 !important}`}</style>
                        <div className="row" id={"id4"}>
                          <style>{`#id5 {width: 30%; margin: 0 !important; height: 100%; flex-direction: row; padding-left: 1rem !important; margin-right: 27px !important}`}</style>
                          <div
                            className="prj-interest column bg-gray" id={"id5"} style={{}}
                          >{scenario3.Attributes[1].Conditions[3].Name}
                          </div>
                          <div className="column" style={{width: "30%", height: "100%"}}>
                            <div
                              className="prj-right-arrow row bg-gray mb-5" style={{height: "50%"}}
                            >
                              {scenario3.Attributes[1].Conditions[3].Subconditions[0].Name}</div>
                            <div className="row bg-gray" style={{height: "50%"}}>
                              {scenario3.Attributes[1].Conditions[3].Subconditions[1]}</div>
                          </div>
                          <style>{`#id6 {width: 40%; height: 100%; margin: 0 !important}`}</style>
                          <div className="column" id={"id6"} style={{}}>
                            <style>{`#id7 {height: 50%; padding-left: 0 !important}`}</style>
                            <div className="row mb-5" id={"id7"} style={{}}>
                              <style>{`#id8 {width: 100%; height: 100%; margin: 0 !important}`}</style>
                              <div className="column" id={"id8"} style={{}}>
                                <style>{`#id9 {height: 33.3; padding-left: 1.5rem !important}`}</style>
                                <div className="row bdr-red mb-3" id={"id9"} style={{}}>
                                  {scenario3.Attributes[1].Conditions[3].Subconditions[0].Subconditions[0]}
                                  <div className="prj-small-red-begin-arrow"/>
                                </div>
                                <style>{`#id10 {height: 33.3%; padding-left: 1.5rem !important}`}</style>
                                <div
                                  className="prj-small-left-arrow row bg-gray mb-3"
                                  id={"id10"}
                                  style={{}}
                                >
                                  {scenario3.Attributes[1].Conditions[3].Subconditions[0].Subconditions[1]}
                                </div>
                                <style>{`#id11 {height: 33.3%; padding-left: 1.5rem !important}`}</style>
                                <div
                                  className="prj-small-left-arrow row bg-gray"
                                  id={"id11"} style={{}}
                                >
                                  {scenario3.Attributes[1].Conditions[3].Subconditions[0].Subconditions[2]}
                                </div>
                              </div>
                            </div>
                            <style>{`#id12 {height: 50%; margin-left: -1rem; width: calc(100% - 11px) !important}`}</style>
                            <div
                              className="prj-right-arrow row bg-gray" id={"id12"}
                              style={{}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[1]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[2]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bg-red fc-white mb-3"
                        >{scenario3.TestCases[0].Values[4]}<span>I</span>
                        </div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[0].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[0].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[0].Values[7]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[1].Values[1]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[1].Values[2]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[1].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bg-red fc-white mb-3"
                        >{scenario3.TestCases[1].Values[4]}<span>I</span>
                        </div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[1].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[1].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[1].Values[7]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[2].Values[1]}<span>I</span></div>
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[2].Values[2]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[2].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bdr-red fc-red mb-3"
                        >{scenario3.TestCases[2].Values[4]}<span>I</span></div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[2].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[2].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[2].Values[7]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[3].Values[1]}<span>I</span></div>
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[3].Values[2]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[3].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bg-red fc-white mb-3"
                        >{scenario3.TestCases[3].Values[4]}<span>I</span>
                        </div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[3].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[3].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[3].Values[7]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[4].Values[1]}<span>I</span></div>
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[4].Values[2]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[4].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bdr-red fc-red mb-3"
                        >{scenario3.TestCases[4].Values[4]}<span>I</span></div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[4].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[4].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[4].Values[7]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[5].Values[1]}<span>I</span></div>
                      <div
                        className="main row bg-red fc-white"
                      >{scenario3.TestCases[5].Values[2]}<span>I</span></div>
                      <div
                        className="main row bdr-red fc-red"
                      >{scenario3.TestCases[5].Values[3]}<span>I</span></div>
                      <div className="main row" style={{flexDirection: "column"}}>
                        <div
                          className="row bg-red fc-white mb-3"
                        >{scenario3.TestCases[5].Values[4]}<span>I</span>
                        </div>
                        <div className="row bg-gray mb-3">{scenario3.TestCases[5].Values[5]}</div>
                        <div className="row bg-gray">{scenario3.TestCases[5].Values[6]}</div>
                      </div>
                      <div className="main row bg-gray">{scenario3.TestCases[5].Values[7]}</div>
                    </div>
                  </div>
                  <div className="prj-process row">
                    <div
                      className="firstColumn column bg-red" style={{height: "15rem"}}
                    >{scenario3.Attributes[2].Name}
                    </div>
                    <div
                      className="secondColumn column fc-red"
                      style={{flexDirection: "initial"}}
                    >
                      <style>{`#id13 {height: 100%; width: 40%; margin: 0 !important}`}</style>
                      <div className="column" id={"id13"} style={{}}>
                        <div className="row bg-gray" style={{height: "100%", marginBottom: 0}}>
                          {scenario3.Attributes[2].Conditions[0].Name}
                        </div>
                      </div>
                      <style>{`#id14 {height: 100%; width: 60%; margin-right: 0 !important}`}</style>
                      <div className="column" id={"id14"} style={{}}>
                        <div className="row bg-gray" style={{height: "33.3%"}}>
                          {scenario3.Attributes[2].Conditions[0].Subconditions[0]}
                        </div>
                        <div className="row bg-gray" style={{height: "33.3%"}}>
                          {scenario3.Attributes[2].Conditions[0].Subconditions[1]}
                        </div>
                        <div className="row bg-gray" style={{height: "33.3%"}}>
                          {scenario3.Attributes[2].Conditions[0].Subconditions[2]}</div>
                      </div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[0].Values[10]}<span>I</span></div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[1].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[1].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[1].Values[10]}<span>I</span></div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[2].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[2].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[2].Values[10]}<span>I</span></div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[3].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[3].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[3].Values[10]}<span>I</span></div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[4].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[4].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[4].Values[10]}<span>I</span></div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[5].Values[8]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[5].Values[9]}<span>I</span></div>
                      <div
                        className="row bg-red fc-white"
                      >{scenario3.TestCases[5].Values[10]}<span>I</span></div>
                    </div>
                  </div>
                  <div className="prj-verification row">
                    <div
                      className="firstColumn column bg-green"
                    >{scenario3.Attributes[3].Name}</div>
                    <div className="secondColumn column bg-gray fc-green">
                      <div className="row">{scenario3.Attributes[3].Conditions[0]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[0].Values[11]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[1].Values[11]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[2].Values[11]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[3].Values[11]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[4].Values[11]}</div>
                    </div>
                    <div className="column">
                      <div
                        className="row bg-green fc-white"
                      >{scenario3.TestCases[5].Values[11]}</div>
                    </div>
                  </div>
                  <div className="prj-defects row">
                    <div className="firstColumn column"></div>
                    <div className="secondColumn column"></div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[0].issueId}
                        target="_blank"
                      >{scenario3.TestCases[0].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[1].issueId}
                        target="_blank"
                      >{scenario3.TestCases[1].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[2].issueId}
                        target="_blank"
                      >{scenario3.TestCases[2].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[3].issueId}
                        target="_blank"
                      >{scenario3.TestCases[3].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[4].issueId}
                        target="_blank"
                      >{scenario3.TestCases[4].hasDefects ? "defect" : ""}</a>
                    </div>
                    <div className="column">
                      <a
                        href={jiraIssuesPath + scenario3.TestCases[5].issueId}
                        target="_blank"
                      >{scenario3.TestCases[5].hasDefects ? "defect" : ""}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="title bg-bright-red fc-white ta-center">SCENARIO NAME 4
              <div className="dropdown icon"/>
            </div>
            <div className="content">
              <div className="Scenario-4">
                <div className="ui grid">
                  <div className="row">
                    <div className="firstColumn column bg-orange">ADMINISTATION</div>
                    <div className="secondColumn column bg-gray fc-red"/>
                    <div className="thirdColumn column bg-gray fc-red"/>
                  </div>
                  <div className="row">
                    <div
                      className="firstColumn column bg-red" style={{height: "25rem"}}
                    >PRECONDITION
                    </div>
                    <div className="secondColumn column bg-gray fc-red">CUSTOMER DATA</div>
                    <div className="thirdColumn column fc-red" id="precondition">
                      <div
                        className="row bg-gray" style={{height: "25%", marginBottom: 5}}
                      >AMOUNT
                      </div>
                      <div
                        className="row bg-gray" style={{height: "25%", marginBottom: 5}}
                      >DURATION
                      </div>
                      <div className="row bg-gray" style={{height: "50%"}}>INTEREST</div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="firstColumn column bg-red" style={{height: "12rem"}}
                    >PROCESS
                    </div>
                    <div className="secondColumn column bg-gray fc-red">CREDIT MASTER DATA
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="firstColumn column bg-green" style={{height: "12rem"}}
                    >VERIFICATION
                    </div>
                    <div className="secondColumn column bg-gray fc-green">CREDIT STATUS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
				.ScenariosAccordion {
				width: 25rem;
				max-width: initial !important
			}
				.ScenariosAccordion .title{
				margin-top: 0.5rem;
			}
				.ScenariosAccordion .grid {
				margin: 0;
			}
				.ScenariosAccordion .row {
				padding: 0 !important;
			}
				.ScenariosAccordion .grid .column{
				display: flex !important;
				align-items: center;
				margin: 0.3rem !important;
			}
				.ScenariosAccordion .ui.grid .row .firstColumn {
				transform: rotate(180deg);
				flex-direction: column;
				height: 10rem;
				width: 2.2rem !important;
				color: white;
				writing-mode: vertical-lr;
				text-align: center;
				line-height: 4px;
				margin-left: 0 !important;
			}
			  .ScenariosAccordion .ui.grid .prj-defects.row a {
			    color: red
      }

			  .ScenariosAccordion .ui.grid .prj-defects.row .firstColumn {
			    height: auto
      }
			`}

          </style>
        </div>
        <style>{`
			.pusher {
			margin-left: 26rem;
		}
			.testDesign {
			width: 25rem;
			margin: 0;
			margin-top: 0.5rem;
			padding: 1rem;
		}`}
        </style>
        ;
      </>)
        ;
    } else {
      return null;
    }
  }

  // componentDidMount() {
  // shouldComponentUpdate(nextProps) {
  componentDidUpdate() {
    // console.log('react update')
    // console.log(this.props.dbLoaded)
    // window.setTimeout(function() {
    if (this.props.dbLoaded) {

      // Init Tree accordion
      $(document).ready(
        $(".TreeView .ui.accordion").accordion(),
      );

      $(document).ready(
        function() {
          // Resize accordion fn
          const resize_accordion = function() {
            const $clickeAccordionEl = this;
            const pushedButtonIdx = $($clickeAccordionEl).index();
            // For tables 2 & 3 we need to expand width
            // Indexes of their ".title" selectors are 3 & 5
            const table2Idx = 3;
            const table3Idx = 5;
            // Now we need to get rem size because jquery animates badly to pure rem (eg "70rem")
            const fontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize);
            // Change width with animation depending on accordion btn clicked
            const animationDuration = 500;
            const $clickeAccordionParentEl = $($clickeAccordionEl).parent();
            const $testDesignEl = $(".testDesign");
            $([$testDesignEl, $clickeAccordionParentEl]).each(
              function(i, $el) {
                let remSize;
                if (pushedButtonIdx === table2Idx) {
                  remSize = 90;
                } else if (pushedButtonIdx === table3Idx) {
                  remSize = 140;
                } else {
                  remSize = 25;
                }
                $el.animate({width: fontSizePx * remSize}, animationDuration);
              },
            );
          };

          // Init Tables accordion
          $(".ScenariosAccordion.ui.accordion").accordion({onOpen: resize_accordion});

          // For dev
          // $(".ui.accordion").accordion("open", 2);
        },
      );
      return true;
    } else {
      return false;
    }
    // }, 3000);
  }
}

export default withTracker(() => {
  // Make Tracker observe changes Scenarios collection ...
  // .find() will observe changes on collection level: add\remove docs
  // .fetch() will observe changes on document level: any change to documents
  Scenarios.find().fetch();
  const dbLoaded = Scenarios.find().count() > 0;
  // console.log('tracker')
  return {
    // Return scenarios as React prop
    scenarios: Scenarios,
    dbLoaded: dbLoaded,
  };
})(App);

