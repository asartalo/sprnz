# `@sprnz/wait`

Wait a specified number of seconds before resolving.

## Usage

```javascript
import wait from '@sprnz/wait';

(async function() {
  const ms = await wait(500); // will resolve after 500 milliseconds
  console.log(ms); // 500
})();
```
