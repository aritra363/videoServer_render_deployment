/* 
  Title : Environments 
  Description : Handle all configuration using the command passed in commandLine
  Author : Aritra Pal
  Date : 13/12/2022 
*/
//dependencies

//module scaffolding
const environments = {};

//For Staging
environments.staging = {
  port: 4000,
  envname: "staging",
};

//For Production
environments.production = {
  port: 5000,
  envname: "production",
};

//getting the current environment
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//checking which environment to export
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

//exporting
module.exports = environmentToExport;
