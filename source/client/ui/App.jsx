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

  }
}

export default withTracker(() => {
  // Make Tracker observe changes Scenarios collection ...
  // .find() will observe changes on collection level: add\remove docs
  // .fetch() will observe changes on document level: any change to documents
  // Scenarios.find().fetch();
  // const dbLoaded = Scenarios.find().count() > 0;
  // console.log('tracker')
  return {
    // Return scenarios as React prop
    scenarios: [],
    dbLoaded: [],
  };
})(App);

