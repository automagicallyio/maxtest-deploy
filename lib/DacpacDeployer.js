"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
class DacpacDeployer {
    constructor() {
        // get all the inputs
        this.connectionString = core.getInput('connectionString');
        this.dacpac = core.getInput('dacpac');
        this.additionalArguments = core.getInput('additionalArguments');
        // get workspace path from environment variable
        this.workspacePath = process.env.GITHUB_WORKSPACE;
    }
    deploy() {
        // add sql package.exe to path
        core.addPath('C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\Extensions\\Microsoft\\SQLDB\\DAC\\150');
        // getting input variables and workspace path to create the command line command string
        console.log("updating database...");
        console.log("connectionString: " + this.connectionString);
        console.log("dacpac: " + this.dacpac);
        console.log("additionalArguments: " + this.additionalArguments);
        console.log("workspace: " + this.workspacePath);
        console.log("");
        // create command string from all the inputs and workspace path
        let commandString = "sqlpackage.exe /Action:Publish /SourceFile:\"" + this.workspacePath + "\\" + this.dacpac + "\" /TargetConnectionString:\"" + this.connectionString + "\" " + this.additionalArguments;
        console.log("command string: " + commandString);
        console.log("");
        // call sql package.exe
        exec.exec(commandString)
            .then(r => {
            console.log(r);
            console.log("done updating database");
        })
            .catch(e => {
            console.log("done updating database");
            core.setFailed(`Action failed with ${e}`);
        });
    }
}
exports.DacpacDeployer = DacpacDeployer;
