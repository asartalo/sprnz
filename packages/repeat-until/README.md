# `@sprnz/repeat-until`

Repeatedly call a function until a promise resolves. It also returns the promise
that was passed.

## Usage

```javascript
import repeatUntil from '@sprnz/repeat-until';

(async () => {
  let i = 0;
  const repeatFn = () => {
    i += 1;
    console.log(i);
  };
  const promise = new Promise(resolve => setTimeout(() => resolve('Hello'), 42));
  const result = await repeatUntil(repeatFn, 10, promise);
  /******
      The above will log to the console:
      0
      1
      2
      3
    ******/
  console.log(result); // 'Hello'
})();
```
