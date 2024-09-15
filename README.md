# json-fingerprint

Fingerprint JSON by calculating the **hash** (default: sha256) based on the **shape** of the JSON and its **value types**.

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Result](#result)
- [Custom hash function](#custom-hash-function)
- [CLI](#cli)
  - [hash a JSON file](#hash-a-json-file)
  - [pipe to json-fingerprint](#pipe-to-json-fingerprint)
- [CLI options](#cli-options)
  - [`--file`](#--file)
  - [`--hash` (default: `sha256`)](#--hash-default-sha256)
  - [`--help`](#--help)
  - [`--version`](#--version)

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

## CLI

### hash a JSON file

```shell
npx json-fingerprint --file=package.json
$ 8d04433255d9cd89eb54dcb09b43d0be92ca5b5f5ba9dffee274869f6b9a9158
```

### pipe to json-fingerprint

```shell
cat package.json | npx json-fingerprint
$ 8d04433255d9cd89eb54dcb09b43d0be92ca5b5f5ba9dffee274869f6b9a9158
```

```shell
curl -sL https://github.com/chimurai/json-fingerprint/raw/main/package.json | npx json-fingerprint
$ 8d04433255d9cd89eb54dcb09b43d0be92ca5b5f5ba9dffee274869f6b9a9158
```

```shell
wget -qO - https://github.com/chimurai/json-fingerprint/raw/main/package.json | npx json-fingerprint
$ 8d04433255d9cd89eb54dcb09b43d0be92ca5b5f5ba9dffee274869f6b9a9158
```

## CLI options

### `--file`

### `--hash` (default: `sha256`)

```shell
cat package.json | npx json-fingerprint --hash=md5
$ 4c86eaaa836218a1d5e6673e7f89303e
```

```shell
curl -sL https://github.com/chimurai/json-fingerprint/raw/main/package.json | npx json-fingerprint --hash=md5
$ 4c86eaaa836218a1d5e6673e7f89303e
```

### `--help`

### `--version`
