/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(dirtyChai);
chai.use(chaiAsPromised);

/* global before */
/*
 eslint mocha/no-top-level-hooks: "off", mocha/no-hooks-for-single-case: "off"
*/
before(() => {
  process.stdout.write('\x1b[2J');
});
