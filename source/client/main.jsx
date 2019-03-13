import React    from "react";
import {render} from "react-dom";
import {Meteor} from "meteor/meteor";
import App      from "/source/client/ui/App";
// import produce from "immer";
// this.produce = produce

Meteor.startup(() => {
  render(<App/>, document.getElementById("App"));
});
