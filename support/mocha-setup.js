const chai = require("chai");
const dirtyChai = require("dirty-chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(dirtyChai);
chai.use(chaiAsPromised);

/* global before */
/*
 eslint mocha/no-top-level-hooks: "off", mocha/no-hooks-for-single-case: "off"
*/
before(() => {
  process.stdout.write("\x1b[2J");
});
