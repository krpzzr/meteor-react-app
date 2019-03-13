import { Meteor } from "meteor/meteor";
import { check }  from "meteor/check";

import {get_json} from "../utility-belt/REST";

Meteor.methods({
  "jira": () => {
    // check(data, String);
    // console.log(data);
    get_json("https://automato.atlassian.net/rest/api/3/application-properties")
    return true;
  }
});