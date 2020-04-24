# `@sprnz/wait`

Wait a specified number of seconds before resolving.

## Usage

```javascript
import wait from '@sprnz/wait';

(async function() {
  const ms = await wait(500); // will resolve after 500ms
  console.log(ms); // 500

  const value = await wait(200, 'Hello'); // will resolve after 200ms
  console.log(value); // 'Hello'
})();
```
