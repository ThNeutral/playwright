import { Reporter } from "@playwright/test/reporter";
import * as fs from "fs";

export default class CustomReporter implements Reporter {
  onBegin(_, suite) {
    console.log(`Executing of ${suite.allTests().length} tests`);
  }

  onEnd(result) {
    console.log(`Execution finished with status of ${result.status}`);
  }

  onTestBegin(test) {
    console.log(`Test ${test.title} started.`);
  }

  onTestEnd(test, result) {
    const data = {
      test: test.title,
      status: result.status,
      executionTime: result.duration,
      errors: result.errors,
    };

    const stringifiedData = JSON.stringify(data, null, 2);
    console.log(stringifiedData);
    fs.writeFileSync("./reporter/test-result.json", stringifiedData);
  }
}
