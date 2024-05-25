# json-fingerprint

Fingerprint a JSON by calculating the **hash** (default: sha256) based on the **shape** of the JSON and its **value types**.

## Install

```shell
npm install json-fingerprint
```

## Usage

```mjs
import {fingerprintJSON} from 'json-fingerprint';
```

```mjs
const {hash, jsonPaths} = fingerprintJSON(`{"foo":"bar"}`)
// hash = 3e61d854042bcd6273a8e18589eb53a37e4cdc111bd2dc717413951637c11e2d
// jsonPaths = ['$:object', '$.foo:string']

const {hash, jsonPaths} = fingerprintJSON(`{"foo":"some string"}`)
// hash = 3e61d854042bcd6273a8e18589eb53a37e4cdc111bd2dc717413951637c11e2d
// jsonPaths = ['$:object', '$.foo:string']
```

## Options

```mjs
// JSON input
fingerprintJSON(`{"foo":"bar"}`)

// object input
fingerprintJSON({"foo":"bar"})

// custom hash function
fingerprintJSON(`{"foo":"bar"}`, myCustomHashFn)
```

## Result

```mjs
const {hash, jsonPaths, source} = fingerprintJSON(`{"foo":"bar"}`)
```

- `hash`: fingerprint hash of the JSON
- `jsonPaths`: internal JSON meta data (hash is calculated based on stringified jsonPaths)
- `source`: original JSON provided as input

## Custom hash function

```mjs
import { createHash } from 'node:crypto';

function sha512(data) {
  /**
   * https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options
   * `openssl list -digest-algorithms` to display the available digest algorithms
   */
  return createHash('sha512').update(data).digest('hex');
}

fingerprintJSON(`{"foo":"bar"}`, sha512);
```
