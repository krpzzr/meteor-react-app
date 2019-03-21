import {Meteor} from "meteor/meteor";

// Init collections on server
import {Tables} from "../data/collections-init";
import {add_fixtures_if_needed}        from "../data/fixtures";
// import {clear_collection}              from "../data/generic-functions";
// import {generate_test_paths_IO}        from "../data/test-paths-init";

import "../features";

import "./methods";

add_fixtures_if_needed(Tables);
// clear_collection(TestPaths);
// generate_test_paths_IO(Scenarios, TestPaths);
// generate_test_paths_IO(ReqSets, TestPaths);
