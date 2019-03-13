import { Mongo } from "meteor/mongo";

// Contains test scenarios with test cases
export const Scenarios = new Mongo.Collection("scenarios");

// Contains requirement sets from Tosca
export const ReqSets = new Mongo.Collection("requirement-sets");

// Contains unique paths for all test cases
export const TestPaths = new Mongo.Collection("test-paths");
