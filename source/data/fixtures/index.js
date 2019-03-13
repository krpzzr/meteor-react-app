import {Meteor} from "meteor/meteor";

// Import fixture data
import scenario2 from "./scenario-2";
import scenario3 from "./scenario-3";
import {reqSets} from "./requirement-sets";

/**
 * @description:
 * @exampleInput:
 * @exampleOutput:
 * @pure: false; db writes; outside vars
 * @hasPassingTests: false
 */
export function add_fixtures_if_needed(scenariosColl, reqSetsColl) {
  // Meteor.startup(() => {
  // If the Scenarios collection is empty - add fixtures
  if (scenariosColl.find().count() === 0) {
    scenariosColl.insert(scenario2);
    scenariosColl.insert(scenario3);
  }

  // If the RequirementSets collection is empty - add fixtures
  if (reqSetsColl.find().count() === 0) {
    reqSetsColl.insert(reqSets);
  }

  // });
  return void 0;
}
