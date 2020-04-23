import chai from 'chai';
import wait from '../lib/wait.js';

const { expect } = chai;

// const { expect } = require('chai');
// const wait = require('../wait.js');

describe('@sprnz/wait', () => {
  describe('when called with the number of miliseconds', () => {
    let resolved;
    beforeEach(() => {
      wait(10).then(value => {
        resolved = value;
      });
    });

    it('remains unresolved before specified miliseconds', done => {
      setTimeout(() => {
        expect(resolved).to.equal(undefined);
        done();
      }, 5);
    });

    it('resolves to the number of miliseconds after the specified number of miliseconds', done => {
      setTimeout(() => {
        expect(resolved).to.equal(10);
        done();
      }, 15);
    });
  });
});
