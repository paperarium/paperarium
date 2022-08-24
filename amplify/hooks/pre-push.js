/**
 * This is a sample hook script created by Amplify CLI.
 * To start using this pre-push hook please change the filename:
 * pre-push.js.sample  ->  pre-push.js
 *
 * learn more: https://docs.amplify.aws/cli/usage/command-hooks
 */
const fs = require("fs");
const execSync = require("child_process").execSync;

/**
 * @param data { { amplify: { environment: string, command: string, subCommand: string, argv: string[] } } }
 * @param error { { message: string, stack: string } }
 */
const hookHandler = async (data, error) => {
  const FUNCTIONS_DIR = `${data.amplify.environment.projectPath}/amplify/backend/function`;
  const dir = await fs.promises.opendir(FUNCTIONS_DIR);
  for await (const functiondir of dir) {
    const subdir = await fs.promises.opendir(
      `${FUNCTIONS_DIR}/${functiondir.name}`
    );
    for await (const subfunctiondir of subdir) {
      // if lib folder exists in a function, go in and tsc compile
      if (subfunctiondir.name == "lib") {
        console.log(`Compiling typescript... [${functiondir.name}]`);
        execSync(`cd ${FUNCTIONS_DIR}/${functiondir.name}/lib && tsc`);
      }
    }
  }
};

const getParameters = async () => {
  return JSON.parse(fs.readFileSync(0, { encoding: "utf8" }));
};

getParameters()
  .then((event) => hookHandler(event.data, event.error))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
