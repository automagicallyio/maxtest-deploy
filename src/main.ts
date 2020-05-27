import * as core from '@actions/core';
async function run() {
  try {
    const connectionString = core.getInput('connectionString');
    const dacpac = core.getInput('dacpac');
    const additionalArguments = core.getInput('additionalArguments');
    console.log("connection string: " + connectionString);
    console.log("dacpac: " + dacpac);
    console.log("additionalArguments: " + additionalArguments);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
