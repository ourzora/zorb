# Zorb Renderer for Web

### Use with a react/next/vue project in ES6

1. Import Zora-Zorbs

```js
import '@zoralabs/zorb';
```

2. Render Zora Zorb

```js
<zora-zorb address="0x0">
```

----

### Use Zora Zorb as a CSS background image etc:

```js
import {getZorbGradients} from '@zoralabs/zorb';

export const Zorb = ({address}: {address: string}) => (
  <div style={{borderRadius: '50%', background: getZorbGradients(address)}}>
);
```

