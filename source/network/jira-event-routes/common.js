// @flow strict

/**
 * @description: Extracts domain, scenario and test case names from string
 * @exampleInput: "SAP - TestSheet2 - STRAIGHT THROUGH"
 * @exampleOutput: ["SAP", "TestSheet2", "STRAIGHT THROUGH"]
 * @pure: true
 * @hasPassingTests: false
 */
export function extract_domain_scenario_testCase_names_from(path: string) {
  // "SAP_-_TestSheet2_-_STRAIGHT_THROUGH"
  // const res = path.replace(/_-_/g, " - ").replace(/_/g, " ").split(" - ")
  const res = path.split(" - ");
  return res;
}
