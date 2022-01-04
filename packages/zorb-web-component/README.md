# Zorb Renderer for Web

This is the web-based Zorb renderer component

----

### Use Zora Zorb with react with a web component:

Full example: https://codesandbox.io/s/zorb-demo-v1js7

```js
import '@zoralabs/zorb';

export const Zorb = ({address}: {address: string}) => (
  return <zora-zorb address={address}></zora-zorb>
);
```


### Use Zora Zorb with react in an image tag:

```js
import {useMemo} from 'react';
import {zorbImageDataURI} from '@zoralabs/zorb';

export const Zorb = ({address}: {address: string}) => (
  const zorbImage = useMemo(() => zorbImageDataURI(address), [address]);
  return <img src={zorbImage} />
);
```

----

### Use with a vanilla.js, vue, or other project in ES6

1. Import Zora-Zorbs

```js
import '@zoralabs/zorb';
```

2. Render Zora Zorb

```js
<zora-zorb address="0x0"></zora-zorb>
```

```js
<zora-zorb address="0x0" size="200px"></zora-zorb>
```
