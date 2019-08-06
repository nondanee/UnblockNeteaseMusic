# Web Extension Port

For test

## Implementation

- Convert node module to ES6 module which can be directly executed in Chrome 61+ without Babel
- Rewrite crypto module (using CryptoJS) and request (using XMLHttpRequest) module for browser environment
- Do matching in background and transfer result with chrome runtime communication
- Inject content script for hijacking Netease Music Web Ajax response

## Build

```
$ node convert.js
```

## Install

Load unpacked extension in Developer mode

## Known Issue

Audio resources from `kuwo`, `kugou` and `migu` are limited in http protocol only and hence can't load
Most audio resources from `qq` don't support preflight request (OPTIONS) and make playbar buggy

## Reference

- [brix/crypto-js](https://github.com/brix/crypto-js)
- [travist/jsencrypt](https://github.com/travist/jsencrypt)
- [JixunMoe/cuwcl4c](https://github.com/JixunMoe/cuwcl4c)