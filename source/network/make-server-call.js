import { Meteor } from "meteor/meteor";

export function make_server_call() {
  Meteor.call("jira", (err, result) => {
    err || !result ? console.log("error") : console.log("misterK is king!");
  });
  return void 0;
}