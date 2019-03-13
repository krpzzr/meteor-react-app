// @flow strict

import type {RequirementSet} from "./types.js";

/**
 * @description: Kreates a path from requirementSetName, requirementName, testCaseName
 * @exampleInput: "SAP", "Scenario1", "Case1"
 * @exampleOutput: "SAP - Scenario1 - Case1"
 * @pure: true
 * @hasPassingTests: false
 */
function construkt_path_from(requirementSetName, requirementName, testCaseName) {
  const res = `${requirementSetName} - ${requirementName} - ${testCaseName}`;
  return res;
}

/**
 * @description: Generates from req sets collection strings that represent "paths"..
 * to individual test cases
 * @exampleInput: req sets collection
 * @exampleOutput: ["SAP - Scenario1 - Case1", "SAPFI - Scenario1 - Case2"]
 * @pure: false; side-effects: reads\writes to db
 * @hasPassingTests: false
 */
export function generate_test_paths_IO(requirementSetsColl: Object, testPathsColl: Object) {
  const requirementSets: Array<RequirementSet> = requirementSetsColl.find().fetch();
  let pathsToInsert = [];
  requirementSets.forEach((reqSet) => {
    const reqSetName = reqSet.Name;
    reqSet.Requirements.forEach((requirement) => {
      const requirementName = requirement.Name;
      requirement.TestCases.forEach((testCase) => {
        if (testCase.IsTemplate) {
          testCase.TestCaseDesign.forEach((item) => {
            construkt_path_and_add_to_array(reqSetName, requirementName, item.Name, pathsToInsert);
          });
        } else {
          construkt_path_and_add_to_array(
            reqSetName,
            requirementName,
            testCase.Name,
            pathsToInsert,
          );
        }
      });
    });
  });
  // Insert generated paths into coll
  testPathsColl.rawCollection().insertMany(pathsToInsert);

  // Intermediate fns
  function construkt_path_and_add_to_array(
    requirementSetName,
    requirementName,
    testCaseName,
    arrayByRef,
  ) {
    const testCasePath = construkt_path_from(requirementSetName, requirementName, testCaseName);
    arrayByRef.push({path: testCasePath});
    return null;
  }

  return true;
}

/*
export function generate_test_paths_IO(scenariosColl, testPathsColl) {
  const scenarios = scenariosColl.find().fetch();
  scenarios.map(scenario => {
    const scenarioName = scenario.Name;
    const domainName = scenario.Domain;
    const testCases = scenario.TestCases;

    const pathsToInsert = testCases.map(testCase => {
      const testCaseName = testCase.Name;
      return {
        domain: domainName,
        scenario: scenarioName,
        testCase: testCaseName,
        path: construkt_path_from(domainName, scenarioName, testCaseName)
      };
    });

    // Insert generated paths into coll
    testPathsColl.rawCollection().insertMany(pathsToInsert);

    return void 0;
  });
  return true;
}*/
