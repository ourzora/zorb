# Zorb Renderer for Web

This is the web-based Zorb renderer component

----

#### Use Zora Zorb without any web frameworks:

```html
<!-- insert in head or footer of page -->
<script src="https://unpkg.com/@zoralabs/zorb@^0.0/dist/zorb-web-component.umd.js"></script>

<!-- add a zora-zorb tag anywhere you want to render a zorb -->
<zora-zorb address="0xf7b2c2eb58a5f801119df7e9bf9f9b66c62bb011"></zora-zorb>
```

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
<zora-zorb address="0x18C8dF1fb7FB44549F90d1C2BB1DC8b690CD0559"></zora-zorb>
```

```js
<zora-zorb address="0x7a6f726121030cadf9923333d5b6f29277024027" size="200px"></zora-zorb>
```

---- 

#### Notes:

Web components are not self-closing and need a closing tag. Any text between the two tags will be used as alt text.
Leaving the alt text blank (tags empty) is fine since this is a presentational element that is not crucial to understanding the page.

