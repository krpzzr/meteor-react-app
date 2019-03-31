import {Meteor} from "meteor/meteor";

// Import fixture data
import table1 from "./table1";
import table2 from "./table2";

/**
 * @description:
 * @exampleInput:
 * @exampleOutput:
 * @pure: false; db writes; outside vars
 * @hasPassingTests: false
 */
export function add_fixtures_if_needed(tablesCollection) {

  if (tablesCollection.find().count() === 0) {
    tablesCollection.insert(table1);
    tablesCollection.insert(table2);
  }

  return void 0;
}

export function addTable(table) {
  tablesCollection.insert(table);
}
