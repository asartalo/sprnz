import chai from 'chai';
import sinon from 'sinon';
import repeatUntil from '../lib/repeat-until.js';

const { expect } = chai;

describe('@sprnz/repeat-until', () => {
  let promise;
  let resolver;
  let result;
  let log;
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    log = [];
    promise = new Promise(resolve => {
      resolver = resolve;
    });

    let i = 0;
    result = repeatUntil(
      runIndex => {
        log.push({ i, runIndex });
        i += 1;
      },
      10,
      promise,
    );
  });

  afterEach(() => {
    resolver();
    clock.restore();
  });

  it('keeps repeating in specified interval', () => {
    clock.tick(21);
    expect(log.length).to.equal(2);
    clock.tick(21);
    expect(log.length).to.equal(4);
  });

  it('stops when promise resolves', async () => {
    clock.tick(21);
    expect(log.length).to.equal(2);
    resolver();
    await Promise.resolve(); // let event loop cycle
    clock.tick(21);
    expect(log.length).to.equal(2);
  });

  it('passes 0 the first time the function is called', () => {
    clock.tick(21);
    const { runIndex } = log[0];
    expect(runIndex).to.equal(0);
  });

  it('passes the nth time the function is called', () => {
    clock.tick(41);
    log.forEach(({ i, runIndex }) => expect(runIndex).to.equal(i));
  });

  it('returns a promise that resolves to the value resolved from the promise passed', async () => {
    resolver('Hello');
    const resolved = await result;
    expect(resolved).to.equal('Hello');
  });
});
