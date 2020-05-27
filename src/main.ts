import * as core from '@actions/core';
import Deployer = require("./DacpacDeployer");
async function run() {
  try {
    let myDeployer = new Deployer.DacpacDeployer();
    myDeployer.deploy();
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();