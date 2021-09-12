#!/usr/bin/node

'use strict';

var require$$0$1 = require('path');
var require$$1$1 = require('net');
var require$$0$3 = require('zlib');
var require$$1 = require('http');
var require$$2 = require('https');
var require$$0$2 = require('events');
var require$$5 = require('url');
var require$$0$4 = require('crypto');
var require$$2$1 = require('querystring');
var require$$0$5 = require('fs');
var require$$7 = require('dns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
var require$$7__default = /*#__PURE__*/_interopDefaultLegacy(require$$7);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check$a = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$i = // eslint-disable-next-line es/no-global-this -- safe
check$a(typeof globalThis == 'object' && globalThis) || check$a(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check$a(typeof self == 'object' && self) || check$a(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$8 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$7 = fails$8; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$7(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$2 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$2.call(it).slice(8, -1);
};

var fails$6 = fails$8;
var classof$3 = classofRaw$1;
var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$6(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$3(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

var isObject$8 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var global$h = global$i;

var aFunction$j = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$e = function (namespace, method) {
  return arguments.length < 2 ? aFunction$j(global$h[namespace]) : global$h[namespace] && global$h[namespace][method];
};

var getBuiltIn$d = getBuiltIn$e;
var engineUserAgent = getBuiltIn$d('navigator', 'userAgent') || '';

var global$g = global$i;
var userAgent$5 = engineUserAgent;
var process$4 = global$g.process;
var Deno = global$g.Deno;
var versions = process$4 && process$4.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match$2, version$2;

if (v8) {
  match$2 = v8.split('.');
  version$2 = match$2[0] < 4 ? 1 : match$2[0] + match$2[1];
} else if (userAgent$5) {
  match$2 = userAgent$5.match(/Edge\/(\d+)/);

  if (!match$2 || match$2[1] >= 74) {
    match$2 = userAgent$5.match(/Chrome\/(\d+)/);
    if (match$2) version$2 = match$2[1];
  }
}

var engineV8Version = version$2 && +version$2;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version;
var fails$5 = fails$8; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var getBuiltIn$c = getBuiltIn$e;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$c('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

var isObject$7 = isObject$8; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$7(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var isPure = false;

var global$f = global$i;

var setGlobal$3 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$f, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$f[key] = value;
  }

  return value;
};

var global$e = global$i;
var setGlobal$2 = setGlobal$3;
var SHARED = '__core-js_shared__';
var store$3 = global$e[SHARED] || setGlobal$2(SHARED, {});
var sharedStore = store$3;

var store$2 = sharedStore;
(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.17.3',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var requireObjectCoercible = requireObjectCoercible$2; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$2 = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var toObject$1 = toObject$2;
var hasOwnProperty = {}.hasOwnProperty;

var has$7 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$1(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$2 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$d = global$i;
var shared$2 = shared$3.exports;
var has$6 = has$7;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$d.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$a = function (name) {
  if (!has$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore[name];
};

var isObject$6 = isObject$8;
var isSymbol$2 = isSymbol$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$9 = wellKnownSymbol$a;
var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$6(input) || isSymbol$2(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$6(result) || isSymbol$2(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$3; // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : String(key);
};

var global$c = global$i;
var isObject$5 = isObject$8;
var document$2 = global$c.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$5(document$2) && isObject$5(document$2.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$2.createElement(it) : {};
};

var DESCRIPTORS$4 = descriptors;
var fails$4 = fails$8;
var createElement$1 = documentCreateElement; // Thank's IE8 for his funny defineProperty

var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var DESCRIPTORS$3 = descriptors;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var has$5 = has$7;
var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$4 = isObject$8;

var anObject$o = function (it) {
  if (!isObject$4(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$n = anObject$o;
var toPropertyKey = toPropertyKey$2; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$n(O);
  P = toPropertyKey(P);
  anObject$n(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$1 ? function (object, key, value) {
  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$3 = {exports: {}};

var store$1 = sharedStore;
var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$b = global$i;
var inspectSource$2 = inspectSource$3;
var WeakMap$1 = global$b.WeakMap;
var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$a = global$i;
var isObject$3 = isObject$8;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var objectHas = has$7;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$a.WeakMap;
var set$1, get, has$4;

var enforce = function (it) {
  return has$4(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set$1 = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has$4 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;

  set$1 = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has$4 = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has$4,
  enforce: enforce,
  getterFor: getterFor
};

var global$9 = global$i;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var has$3 = has$7;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$1 = internalState;
var getInternalState$1 = InternalStateModule$1.get;
var enforceInternalState = InternalStateModule$1.enforce;
var TEMPLATE = String(String).split('String');
(redefine$3.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$3(value, 'name')) {
      createNonEnumerableProperty$1(value, 'name', key);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }

  if (O === global$9) {
    if (simple) O[key] = value;else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty$1(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$1(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$2 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
};

var toInteger$1 = toInteger$2;
var min$1 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$3 = function (argument) {
  return argument > 0 ? min$1(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger = toInteger$2;
var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toLength$2 = toLength$3;
var toAbsoluteIndex = toAbsoluteIndex$1; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = toLength$2(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var has$2 = has$7;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has$2(hiddenKeys$1, key) && has$2(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has$2(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

var enumBugKeys$1 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;
var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$b = getBuiltIn$e;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$m = anObject$o; // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$b('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$m(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$1 = has$7;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$3 = fails$8;
var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$3(detection) : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';
var isForced_1 = isForced$2;

var global$8 = global$i;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var redefine$2 = redefine$3.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global$8;
  } else if (STATIC) {
    target = global$8[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$8[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine$2(target, key, sourceProperty, options);
  }
};

var global$7 = global$i;
var nativePromiseConstructor = global$7.Promise;

var redefine$1 = redefine$3.exports;

var redefineAll$1 = function (target, src, options) {
  for (var key in src) redefine$1(target, key, src[key], options);

  return target;
};

var isObject$2 = isObject$8;

var aPossiblePrototype$1 = function (it) {
  if (!isObject$2(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/* eslint-disable no-proto -- safe */
var anObject$l = anObject$o;
var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject$l(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty = objectDefineProperty.f;
var has = has$7;
var wellKnownSymbol$8 = wellKnownSymbol$a;
var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty(it, TO_STRING_TAG$2, {
      configurable: true,
      value: TAG
    });
  }
};

var getBuiltIn$a = getBuiltIn$e;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$7 = wellKnownSymbol$a;
var DESCRIPTORS = descriptors;
var SPECIES$2 = wellKnownSymbol$7('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$a(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$2]) {
    defineProperty(Constructor, SPECIES$2, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var aFunction$i = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var anInstance$1 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var iterators = {};

var wellKnownSymbol$6 = wellKnownSymbol$a;
var Iterators$1 = iterators;
var ITERATOR$2 = wellKnownSymbol$6('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var aFunction$h = aFunction$i; // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aFunction$h(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function () {
    return fn.apply(that, arguments);
  };
};

var wellKnownSymbol$5 = wellKnownSymbol$a;
var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag');
var test$1 = {};
test$1[TO_STRING_TAG$1] = 'z';
var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$4 = wellKnownSymbol$a;
var TO_STRING_TAG = wellKnownSymbol$4('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var classof$1 = classof$2;
var Iterators = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$a;
var ITERATOR$1 = wellKnownSymbol$3('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || Iterators[classof$1(it)];
};

var anObject$k = anObject$o;
var getIteratorMethod$1 = getIteratorMethod$2;

var getIterator$2 = function (it, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(it) : usingIterator;

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject$k(iteratorMethod.call(it));
};

var anObject$j = anObject$o;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$j(iterator);

  try {
    innerResult = iterator['return'];

    if (innerResult === undefined) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$j(innerResult);
  return value;
};

var anObject$i = anObject$o;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var toLength$1 = toLength$3;
var bind$7 = functionBindContext;
var getIterator$1 = getIterator$2;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$g = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$7(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$i(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength$1(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = getIterator$1(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};

var wellKnownSymbol$2 = wellKnownSymbol$a;
var ITERATOR = wellKnownSymbol$2('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

var anObject$h = anObject$o;
var aFunction$g = aFunction$i;
var wellKnownSymbol$1 = wellKnownSymbol$a;
var SPECIES$1 = wellKnownSymbol$1('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$7 = function (O, defaultConstructor) {
  var C = anObject$h(O).constructor;
  var S;
  return C === undefined || (S = anObject$h(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$g(S);
};

var getBuiltIn$9 = getBuiltIn$e;
var html$1 = getBuiltIn$9('document', 'documentElement');

var userAgent$4 = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

var classof = classofRaw$1;
var global$6 = global$i;
var engineIsNode = classof(global$6.process) == 'process';

var global$5 = global$i;
var fails$2 = fails$8;
var bind$6 = functionBindContext;
var html = html$1;
var createElement = documentCreateElement;
var IS_IOS$1 = engineIsIos;
var IS_NODE$2 = engineIsNode;
var set = global$5.setImmediate;
var clear = global$5.clearImmediate;
var process$3 = global$5.process;
var MessageChannel = global$5.MessageChannel;
var Dispatch = global$5.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port$1;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$5.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$5.postMessage(String(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;

    while (argumentsLength > i) args.push(arguments[i++]);

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE$2) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port$1 = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$6(port$1.postMessage, port$1, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$5.addEventListener && typeof postMessage == 'function' && !global$5.importScripts && location && location.protocol !== 'file:' && !fails$2(post)) {
    defer = post;
    global$5.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var userAgent$3 = engineUserAgent;
var global$4 = global$i;
var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && global$4.Pebble !== undefined;

var userAgent$2 = engineUserAgent;
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

var global$3 = global$i;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$1 = engineIsNode;
var MutationObserver = global$3.MutationObserver || global$3.WebKitMutationObserver;
var document$1 = global$3.document;
var process$2 = global$3.process;
var Promise$1 = global$3.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$3, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$2.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify$1();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$1) {
    toggle = true;
    node = document$1.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify$1 = function () {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise$1;
    then = promise.then;

    notify$1 = function () {
      then.call(promise, flush);
    }; // Node.js without promises

  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$3, flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify$1();
  }

  last = task;
};

var newPromiseCapability$2 = {};

var aFunction$f = aFunction$i;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$f(resolve);
  this.reject = aFunction$f(reject);
}; // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability


newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$g = anObject$o;
var isObject$1 = isObject$8;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$g(C);
  if (isObject$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$2 = global$i;

var hostReportErrors$1 = function (a, b) {
  var console = global$2.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$2 = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

var engineIsBrowser = typeof window == 'object';

var $$i = _export;
var global$1 = global$i;
var getBuiltIn$8 = getBuiltIn$e;
var NativePromise = nativePromiseConstructor;
var redefine = redefine$3.exports;
var redefineAll = redefineAll$1;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$1;
var setSpecies = setSpecies$1;
var isObject = isObject$8;
var aFunction$e = aFunction$i;
var anInstance = anInstance$1;
var inspectSource = inspectSource$3;
var iterate$f = iterate$g;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var speciesConstructor$6 = speciesConstructor$7;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform$1 = perform$2;
var InternalStateModule = internalState;
var isForced = isForced_1;
var wellKnownSymbol = wellKnownSymbol$a;
var IS_BROWSER = engineIsBrowser;
var IS_NODE = engineIsNode;
var V8_VERSION = engineV8Version;
var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError$1 = global$1.TypeError;
var document = global$1.document;
var process$1 = global$1.process;
var newPromiseCapability = newPromiseCapabilityModule$1.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global$1.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED$1 = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false; // Detect correctness of subclassing with @@species support

  var promise = new PromiseConstructor(function (resolve) {
    resolve(1);
  });

  var FakePromise = function (exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () {
    /* empty */
  }) instanceof FakePromise;
  if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$1.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform$1(function () {
        if (IS_NODE) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;

    if (IS_NODE) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$5 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind$5(internalResolve, wrapper, state), bind$5(internalReject, wrapper, state));
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED$1) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$e(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind$5(internalResolve, state), bind$5(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor$6(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process$1.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind$5(internalResolve, state);
    this.reject = bind$5(internalReject, state);
  };

  newPromiseCapabilityModule$1.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }, {
        unsafe: true
      }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
        unsafe: true
      });
    } // make `.constructor === Promise` work for native promise-based APIs


    try {
      delete NativePromisePrototype.constructor;
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs


    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$$i({
  global: true,
  wrap: true,
  forced: FORCED$1
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn$8(PROMISE); // statics

$$i({
  target: PROMISE,
  stat: true,
  forced: FORCED$1
}, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$$i({
  target: PROMISE,
  stat: true,
  forced: FORCED$1
}, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});
$$i({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aFunction$e(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$f(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aFunction$e(C.resolve);
      iterate$f(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var app = {};

var name = "@1715173329/unblockneteasemusic";
var version$1 = "v0.27.0-beta.1";
var description = "Revive unavailable songs for Netease Cloud Music";
var main = "src/provider/match.js";
var bin = {
	unblockneteasemusic: "./precompiled/app.js"
};
var scripts = {
	build: "rollup -c",
	pkg: "pkg . --out-path=dist/",
	test: "jest"
};
var pkg = {
	assets: [
		"server.key",
		"server.crt"
	],
	targets: [
		"node14-linux-arm64",
		"node14-win-arm64",
		"node14-linux-x64",
		"node14-win-x64"
	],
	outputPath: "dist"
};
var repository = {
	type: "git",
	url: "https://github.com/1715173329/UnblockNeteaseMusic.git"
};
var author = "nondanee, 1715173329, pan93412";
var license = "MIT";
var dependencies = {
	long: "^4.0.0",
	"node-windows": "^1.0.0-beta.5"
};
var devDependencies = {
	"@babel/core": "^7.15.5",
	"@babel/preset-env": "^7.15.6",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-commonjs": "^20.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.4",
	"core-js": "3",
	jest: "^27.1.0",
	pkg: "^5.3.2",
	prettier: "^2.3.2",
	rollup: "^2.56.3"
};
var require$$0 = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	bin: bin,
	scripts: scripts,
	pkg: pkg,
	repository: repository,
	author: author,
	license: license,
	dependencies: dependencies,
	"private": true,
	devDependencies: devDependencies
};

var isSymbol = isSymbol$3;

var toString$1 = function (argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(mergeSort(array.slice(0, middle), comparefn), mergeSort(array.slice(middle), comparefn), comparefn);
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];

    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }

    if (j !== i++) array[j] = element;
  }

  return array;
};

var merge = function (left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  var result = [];

  while (lindex < llength || rindex < rlength) {
    if (lindex < llength && rindex < rlength) {
      result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
    } else {
      result.push(lindex < llength ? left[lindex++] : right[rindex++]);
    }
  }

  return result;
};

var arraySort = mergeSort;

var fails$1 = fails$8;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$1(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var userAgent$1 = engineUserAgent;
var firefox = userAgent$1.match(/firefox\/(\d+)/i);
var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;
var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent = engineUserAgent;
var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
var engineWebkitVersion = !!webkit && +webkit[1];

var $$h = _export;
var aFunction$d = aFunction$i;
var toObject = toObject$2;
var toLength = toLength$3;
var toString = toString$1;
var fails = fails$8;
var internalSort = arraySort;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;
var test = [];
var nativeSort = test.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test.sort(null);
}); // Old WebKit

var STRICT_METHOD = arrayMethodIsStrict('sort');
var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;
  var result = '';
  var code, chr, value, index; // generate an array with more 512 elements (Chakra and old V8 fails only in this case)

  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;

      case 68:
      case 71:
        value = 4;
        break;

      default:
        value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({
        k: chr + index,
        v: value
      });
    }
  }

  test.sort(function (a, b) {
    return b.v - a.v;
  });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
}; // `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort


$$h({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aFunction$d(comparefn);
    var array = toObject(this);
    if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);
    var items = [];
    var arrayLength = toLength(array.length);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) items.push(array[index]);
    }

    items = internalSort(items, getSortCompare(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];

    while (index < arrayLength) delete array[index++];

    return array;
  }
});

const cli = {
  width: 80,
  _program: {},
  _options: [],
  program: (information = {}) => {
    cli._program = information;
    return cli;
  },
  option: (flags, addition = {}) => {
    // name or flags - Either a name or a list of option strings, e.g. foo or -f, --foo.
    // dest - The name of the attribute to be added to the object returned by parse_options().
    // nargs - The number of command-line arguments that should be consumed. // N, ?, *, +, REMAINDER
    // action - The basic type of action to be taken when this argument is encountered at the command line. // store, store_true, store_false, append, append_const, count, help, version
    // const - A constant value required by some action and nargs selections. (supporting store_const and append_const action)
    // metavar - A name for the argument in usage messages.
    // help - A brief description of what the argument does.
    // required - Whether the command-line option may be omitted (optionals only).
    // default - The value produced if the argument is absent from the command line.
    // type - The type to which the command-line argument should be converted.
    // choices - A container of the allowable values for the argument.
    flags = Array.isArray(flags) ? flags : [flags];
    addition.dest = addition.dest || flags.slice(-1)[0].toLowerCase().replace(/^-+/, '').replace(/-[a-z]/g, character => character.slice(1).toUpperCase());
    addition.help = addition.help || {
      help: 'output usage information',
      version: 'output the version number'
    }[addition.action];

    cli._options.push(Object.assign(addition, {
      flags: flags,
      positional: !flags[0].startsWith('-')
    }));

    return cli;
  },
  parse: argv => {
    const positionals = cli._options.map((option, index) => option.positional ? index : null).filter(index => index !== null),
          optionals = {};

    cli._options.forEach((option, index) => option.positional ? null : option.flags.forEach(flag => optionals[flag] = index));

    cli._program.name = cli._program.name || require$$0__default['default'].parse(argv[1]).base;
    const args = argv.slice(2).reduce((result, part) => /^-[^-]/.test(part) ? result.concat(part.slice(1).split('').map(string => '-' + string)) : result.concat(part), []);
    let pointer = 0;

    while (pointer < args.length) {
      let value = null;
      const part = args[pointer];
      const index = part.startsWith('-') ? optionals[part] : positionals.shift();
      if (index === undefined) part.startsWith('-') ? error(`no such option: ${part}`) : error(`extra arguments found: ${part}`);
      if (part.startsWith('-')) pointer += 1;
      const {
        action
      } = cli._options[index];

      if (['help', 'version'].includes(action)) {
        if (action === 'help') help();else if (action === 'version') version();
      } else if (['store_true', 'store_false'].includes(action)) {
        value = action === 'store_true';
      } else {
        const gap = args.slice(pointer).findIndex(part => part in optionals);
        const next = gap === -1 ? args.length : pointer + gap;
        value = args.slice(pointer, next);

        if (value.length === 0) {
          if (cli._options[index].positional) error(`the following arguments are required: ${part}`);else if (cli._options[index].nargs === '+') error(`argument ${part}: expected at least one argument`);else error(`argument ${part}: expected one argument`);
        }

        if (cli._options[index].nargs !== '+') {
          value = value[0];
          pointer += 1;
        } else {
          pointer = next;
        }
      }

      cli[cli._options[index].dest] = value;
    }

    if (positionals.length) error(`the following arguments are required: ${positionals.map(index => cli._options[index].flags[0]).join(', ')}`); // cli._options.forEach(option => console.log(option.dest, cli[option.dest]))

    return cli;
  }
};

const pad = length => new Array(length + 1).join(' ');

const usage = () => {
  const options = cli._options.map(option => {
    const flag = option.flags.sort((a, b) => a.length - b.length)[0];
    const name = option.metavar || option.dest;

    if (option.positional) {
      if (option.nargs === '+') return `${name} [${name} ...]`;else return `${name}`;
    } else {
      if (['store_true', 'store_false', 'help', 'version'].includes(option.action)) return `[${flag}]`;else if (option.nargs === '+') return `[${flag} ${name} [${name} ...]]`;else return `[${flag} ${name}]`;
    }
  });

  const maximum = cli.width;
  const title = `usage: ${cli._program.name}`;
  const lines = [title];
  options.map(name => ' ' + name).forEach(option => {
    lines[lines.length - 1].length + option.length < maximum ? lines[lines.length - 1] += option : lines.push(pad(title.length) + option);
  });
  console.log(lines.join('\n'));
};

const help = () => {
  usage();

  const positionals = cli._options.filter(option => option.positional).map(option => [option.metavar || option.dest, option.help]);

  const optionals = cli._options.filter(option => !option.positional).map(option => {
    const {
      flags
    } = option;
    const name = option.metavar || option.dest;
    /** @type {string} */

    let use;
    if (['store_true', 'store_false', 'help', 'version'].includes(option.action)) use = flags.map(flag => `${flag}`).join(', ');else if (option.nargs === '+') use = flags.map(flag => `${flag} ${name} [${name} ...]`).join(', ');else use = flags.map(flag => `${flag} ${name}`).join(', ');
    return [use, option.help];
  });

  let align = Math.max.apply(null, positionals.concat(optionals).map(option => option[0].length));
  align = align > 30 ? 30 : align;
  const rest = cli.width - align - 4;

  const publish = option => {
    const slice = string => Array.from(Array(Math.ceil(string.length / rest)).keys()).map(index => string.slice(index * rest, (index + 1) * rest)).join('\n' + pad(align + 4));

    option[0].length < align ? console.log(`  ${option[0]}${pad(align - option[0].length)}  ${slice(option[1])}`) : console.log(`  ${option[0]}\n${pad(align + 4)}${slice(option[1])}`);
  };

  if (positionals.length) console.log('\npositional arguments:');
  positionals.forEach(publish);
  if (optionals.length) console.log('\noptional arguments:');
  optionals.forEach(publish);
  process.exit();
};

const version = () => {
  console.log(cli._program.version);
  process.exit();
};

const error = message => {
  usage();
  console.log(cli._program.name + ':', 'error:', message);
  process.exit(1);
};

var cli_1 = cli;

const collector = (job, cycle) => setTimeout(() => {
  let keep = false;
  Object.keys(job.cache || {}).forEach(key => {
    if (!job.cache[key]) return;
    job.cache[key].expiration < Date.now() ? job.cache[key] = null : keep = keep || true;
  });
  keep ? collector(job, cycle) : job.collector = null;
}, cycle);

var cache$b = (job, parameter, live = 30 * 60 * 1000) => {
  // Disable the cache when the NO_CACHE = true.
  if (process.env.NO_CACHE === 'true') {
    return job(parameter);
  }

  const cache = job.cache ? job.cache : job.cache = {};
  if (!job.collector) job.collector = collector(job, live / 2);
  const key = parameter == null ? 'default' : typeof parameter === 'object' ? parameter.id || parameter.key || JSON.stringify(parameter) : parameter;

  const done = (status, result) => cache[key].execution = Promise[status](result);

  if (!cache[key] || cache[key].expiration < Date.now()) cache[key] = {
    expiration: Date.now() + live,
    execution: job(parameter).then(result => done('resolve', result)).catch(result => done('reject', result))
  };
  return cache[key].execution;
};

var insure$6 = {exports: {}};

var anObject$f = anObject$o;
var aFunction$c = aFunction$i; // https://github.com/tc39/collection-methods

var collectionAddAll$1 = function () {
  var set = anObject$f(this);
  var adder = aFunction$c(set.add);

  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k]);
  }

  return set;
};

var $$g = _export;
var IS_PURE$f = isPure;
var collectionAddAll = collectionAddAll$1; // `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods

$$g({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$f
}, {
  addAll: function addAll() {
    return collectionAddAll.apply(this, arguments);
  }
});

var anObject$e = anObject$o;
var aFunction$b = aFunction$i; // https://github.com/tc39/collection-methods

var collectionDeleteAll$1 = function () {
  var collection = anObject$e(this);
  var remover = aFunction$b(collection['delete']);
  var allDeleted = true;
  var wasDeleted;

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }

  return !!allDeleted;
};

var $$f = _export;
var IS_PURE$e = isPure;
var collectionDeleteAll = collectionDeleteAll$1; // `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$f({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$e
}, {
  deleteAll: function deleteAll() {
    return collectionDeleteAll.apply(this, arguments);
  }
});

var $$e = _export;
var IS_PURE$d = isPure;
var getBuiltIn$7 = getBuiltIn$e;
var anObject$d = anObject$o;
var aFunction$a = aFunction$i;
var speciesConstructor$5 = speciesConstructor$7;
var iterate$e = iterate$g; // `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods

$$e({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$d
}, {
  difference: function difference(iterable) {
    var set = anObject$d(this);
    var newSet = new (speciesConstructor$5(set, getBuiltIn$7('Set')))(set);
    var remover = aFunction$a(newSet['delete']);
    iterate$e(iterable, function (value) {
      remover.call(newSet, value);
    });
    return newSet;
  }
});

var getSetIterator$7 = function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return Set.prototype.values.call(it);
};

var $$d = _export;
var IS_PURE$c = isPure;
var anObject$c = anObject$o;
var bind$4 = functionBindContext;
var getSetIterator$6 = getSetIterator$7;
var iterate$d = iterate$g; // `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$d({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$c
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    var set = anObject$c(this);
    var iterator = getSetIterator$6(set);
    var boundFunction = bind$4(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate$d(iterator, function (value, stop) {
      if (!boundFunction(value, value, set)) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$c = _export;
var IS_PURE$b = isPure;
var getBuiltIn$6 = getBuiltIn$e;
var anObject$b = anObject$o;
var aFunction$9 = aFunction$i;
var bind$3 = functionBindContext;
var speciesConstructor$4 = speciesConstructor$7;
var getSetIterator$5 = getSetIterator$7;
var iterate$c = iterate$g; // `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$c({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$b
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    var set = anObject$b(this);
    var iterator = getSetIterator$5(set);
    var boundFunction = bind$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor$4(set, getBuiltIn$6('Set')))();
    var adder = aFunction$9(newSet.add);
    iterate$c(iterator, function (value) {
      if (boundFunction(value, value, set)) adder.call(newSet, value);
    }, {
      IS_ITERATOR: true
    });
    return newSet;
  }
});

var $$b = _export;
var IS_PURE$a = isPure;
var anObject$a = anObject$o;
var bind$2 = functionBindContext;
var getSetIterator$4 = getSetIterator$7;
var iterate$b = iterate$g; // `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$b({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$a
}, {
  find: function find(callbackfn
  /* , thisArg */
  ) {
    var set = anObject$a(this);
    var iterator = getSetIterator$4(set);
    var boundFunction = bind$2(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate$b(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop(value);
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$a = _export;
var IS_PURE$9 = isPure;
var getBuiltIn$5 = getBuiltIn$e;
var anObject$9 = anObject$o;
var aFunction$8 = aFunction$i;
var speciesConstructor$3 = speciesConstructor$7;
var iterate$a = iterate$g; // `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods

$$a({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$9
}, {
  intersection: function intersection(iterable) {
    var set = anObject$9(this);
    var newSet = new (speciesConstructor$3(set, getBuiltIn$5('Set')))();
    var hasCheck = aFunction$8(set.has);
    var adder = aFunction$8(newSet.add);
    iterate$a(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});

var $$9 = _export;
var IS_PURE$8 = isPure;
var anObject$8 = anObject$o;
var aFunction$7 = aFunction$i;
var iterate$9 = iterate$g; // `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

$$9({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$8
}, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject$8(this);
    var hasCheck = aFunction$7(set.has);
    return !iterate$9(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === true) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$8 = _export;
var IS_PURE$7 = isPure;
var getBuiltIn$4 = getBuiltIn$e;
var anObject$7 = anObject$o;
var aFunction$6 = aFunction$i;
var getIterator = getIterator$2;
var iterate$8 = iterate$g; // `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

$$8({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$7
}, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject$7(iterable);
    var hasCheck = otherSet.has;

    if (typeof hasCheck != 'function') {
      otherSet = new (getBuiltIn$4('Set'))(iterable);
      hasCheck = aFunction$6(otherSet.has);
    }

    return !iterate$8(iterator, function (value, stop) {
      if (hasCheck.call(otherSet, value) === false) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$7 = _export;
var IS_PURE$6 = isPure;
var anObject$6 = anObject$o;
var aFunction$5 = aFunction$i;
var iterate$7 = iterate$g; // `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

$$7({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$6
}, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject$6(this);
    var hasCheck = aFunction$5(set.has);
    return !iterate$7(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === false) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$6 = _export;
var IS_PURE$5 = isPure;
var anObject$5 = anObject$o;
var getSetIterator$3 = getSetIterator$7;
var iterate$6 = iterate$g; // `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods

$$6({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$5
}, {
  join: function join(separator) {
    var set = anObject$5(this);
    var iterator = getSetIterator$3(set);
    var sep = separator === undefined ? ',' : String(separator);
    var result = [];
    iterate$6(iterator, result.push, {
      that: result,
      IS_ITERATOR: true
    });
    return result.join(sep);
  }
});

var $$5 = _export;
var IS_PURE$4 = isPure;
var getBuiltIn$3 = getBuiltIn$e;
var anObject$4 = anObject$o;
var aFunction$4 = aFunction$i;
var bind$1 = functionBindContext;
var speciesConstructor$2 = speciesConstructor$7;
var getSetIterator$2 = getSetIterator$7;
var iterate$5 = iterate$g; // `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods

$$5({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$4
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    var set = anObject$4(this);
    var iterator = getSetIterator$2(set);
    var boundFunction = bind$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor$2(set, getBuiltIn$3('Set')))();
    var adder = aFunction$4(newSet.add);
    iterate$5(iterator, function (value) {
      adder.call(newSet, boundFunction(value, value, set));
    }, {
      IS_ITERATOR: true
    });
    return newSet;
  }
});

var $$4 = _export;
var IS_PURE$3 = isPure;
var anObject$3 = anObject$o;
var aFunction$3 = aFunction$i;
var getSetIterator$1 = getSetIterator$7;
var iterate$4 = iterate$g; // `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$4({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$3
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    var set = anObject$3(this);
    var iterator = getSetIterator$1(set);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction$3(callbackfn);
    iterate$4(iterator, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    }, {
      IS_ITERATOR: true
    });
    if (noInitial) throw TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

var $$3 = _export;
var IS_PURE$2 = isPure;
var anObject$2 = anObject$o;
var bind = functionBindContext;
var getSetIterator = getSetIterator$7;
var iterate$3 = iterate$g; // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$3({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$2
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    var set = anObject$2(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate$3(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$2 = _export;
var IS_PURE$1 = isPure;
var getBuiltIn$2 = getBuiltIn$e;
var anObject$1 = anObject$o;
var aFunction$2 = aFunction$i;
var speciesConstructor$1 = speciesConstructor$7;
var iterate$2 = iterate$g; // `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods

$$2({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$1
}, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject$1(this);
    var newSet = new (speciesConstructor$1(set, getBuiltIn$2('Set')))(set);
    var remover = aFunction$2(newSet['delete']);
    var adder = aFunction$2(newSet.add);
    iterate$2(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});

var $$1 = _export;
var IS_PURE = isPure;
var getBuiltIn$1 = getBuiltIn$e;
var anObject = anObject$o;
var aFunction$1 = aFunction$i;
var speciesConstructor = speciesConstructor$7;
var iterate$1 = iterate$g; // `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods

$$1({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE
}, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn$1('Set')))(set);
    iterate$1(iterable, aFunction$1(newSet.add), {
      that: newSet
    });
    return newSet;
  }
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const EventEmitter = require$$0__default$1['default'];
const ON_CANCEL$1 = 'cancel';

class CancelRequest$1 extends EventEmitter {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "cancelled", false);
  }

  cancel() {
    this.cancelled = true;
    this.emit(ON_CANCEL$1);
  }

}

var cancel = {
  CancelRequest: CancelRequest$1,
  ON_CANCEL: ON_CANCEL$1
};

class RequestCancelled$2 extends Error {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(`This request URL has been cancelled: ${url}`);
    this.name = 'RequestCancelled';
  }

}

var RequestCancelled_1 = RequestCancelled$2;

const zlib = require$$0__default$2['default'];
const http = require$$1__default['default'];
const https = require$$2__default['default'];
const ON_CANCEL = cancel;
const RequestCancelled$1 = RequestCancelled_1;
const parse$4 = require$$5__default['default'].parse;
const format$6 = require$$5__default['default'].format;
const timeoutThreshold = 10 * 1000;

const translate = host => (commonjsGlobal.hosts || {})[host] || host;

const create = (url, proxy) => (((typeof proxy === 'undefined' ? commonjsGlobal.proxy : proxy) || url).protocol === 'https:' ? https : http).request;

const configure = (method, url, headers, proxy) => {
  headers = headers || {};
  proxy = typeof proxy === 'undefined' ? commonjsGlobal.proxy : proxy;
  if ('content-length' in headers) delete headers['content-length'];
  const options = {};
  options._headers = headers;

  if (proxy && url.protocol === 'https:') {
    options.method = 'CONNECT';
    options.headers = Object.keys(headers).reduce((result, key) => Object.assign(result, ['host', 'user-agent'].includes(key) && {
      [key]: headers[key]
    }), {});
  } else {
    options.method = method;
    options.headers = headers;
  }

  if (proxy) {
    options.hostname = translate(proxy.hostname);
    options.port = proxy.port || (proxy.protocol === 'https:' ? 443 : 80);
    options.path = url.protocol === 'https:' ? translate(url.hostname) + ':' + (url.port || 443) : 'http://' + translate(url.hostname) + url.path;
  } else {
    options.hostname = translate(url.hostname);
    options.port = url.port || (url.protocol === 'https:' ? 443 : 80);
    options.path = url.path;
  }

  return options;
};
/**
 * @param {string} method
 * @param {string} url
 * @param {Object?} headers
 * @param {unknown?} body
 * @param {unknown?} proxy
 * @param {CancelRequest?} cancelRequest
 */


const request$d = (method, url, headers, body, proxy, cancelRequest) => {
  url = parse$4(url);
  headers = headers ||
  /* @type {Partial<Record<string,string>>} */
  {};
  const options = configure(method, url, Object.assign({
    host: url.hostname,
    accept: 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
  }, headers), proxy);
  return new Promise((resolve, reject) => {
    var _cancelRequest$cancel;

    const clientRequest = create(url, proxy)(options);

    const destroyClientRequest = function () {
      // We destroy the request and throw RequestCancelled
      // when the request has been cancelled.
      clientRequest.destroy(new RequestCancelled$1(format$6(url)));
    };

    cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.on(ON_CANCEL, destroyClientRequest);
    if ((_cancelRequest$cancel = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel !== void 0 ? _cancelRequest$cancel : false) destroyClientRequest();
    clientRequest.setTimeout(timeoutThreshold, () => {
      console.warn(`TIMEOUT > ${format$6(url)}`);
      destroyClientRequest();
    }).on('response', response => resolve(response)).on('connect', (_, socket) => https.request({
      method: method,
      path: url.path,
      headers: options._headers,
      socket: socket,
      agent: false
    }).on('response', response => resolve(response)).on('error', error => reject(error)).end(body)).on('error', error => reject(error)).end(options.method.toUpperCase() === 'CONNECT' ? undefined : body);
  }).then(response => {
    var _cancelRequest$cancel2;

    if ((_cancelRequest$cancel2 = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel2 !== void 0 ? _cancelRequest$cancel2 : false) return Promise.reject(new RequestCancelled$1(format$6(url)));

    if (new Set([201, 301, 302, 303, 307, 308]).has(response.statusCode)) {
      delete headers.host;
      return request$d(method, url.resolve(response.headers.location || url.href), headers, body, proxy);
    }

    return Object.assign(response, {
      url: url,
      body: raw => read(response, raw),
      json: () => json(response),
      jsonp: () => jsonp(response)
    });
  });
};

const read = (connect, raw) => new Promise((resolve, reject) => {
  const chunks = [];
  connect.on('data', chunk => chunks.push(chunk)).on('end', () => resolve(Buffer.concat(chunks))).on('error', error => reject(error));
}).then(buffer => {
  buffer = buffer.length && ['gzip', 'deflate'].includes(connect.headers['content-encoding']) ? zlib.unzipSync(buffer) : buffer;
  return raw ? buffer : buffer.toString();
});

const json = connect => read(connect, false).then(body => JSON.parse(body));

const jsonp = connect => read(connect, false).then(body => JSON.parse(body.slice(body.indexOf('(') + 1, -')'.length)));

request$d.read = read;
request$d.create = create;
request$d.translate = translate;
request$d.configure = configure;
var request_1 = request$d;

(function (module) {
  const request = request_1;
  const host = null; // 'http://localhost:9000'

  module.exports = () => {
    const proxy = new Proxy(() => {}, {
      get: (target, property) => {
        target.route = (target.route || []).concat(property);
        return proxy;
      },
      apply: (target, _, payload) => {
        if (module.exports.disable || !host) return Promise.reject();
        const path = target.route.join('/');
        const query = typeof payload[0] === 'object' ? JSON.stringify(payload[0]) : payload[0]; // if (path != 'qq/ticket') return Promise.reject()

        return request('GET', `${host}/${path}?${encodeURIComponent(query)}`).then(response => response.body());
      }
    });
    return proxy;
  };
})(insure$6);

var select$7 = {exports: {}};

select$7.exports = (list, info) => {
  const {
    duration
  } = info;
  const song = list.slice(0, 5) // 挑前5个结果
  .find(song => song.duration && Math.abs(song.duration - duration) < 5 * 1e3); // 第一个时长相差5s (5000ms) 之内的结果

  if (song) return song;else return list[0]; // 没有就播放第一条
};

select$7.exports.ENABLE_FLAC = (process.env.ENABLE_FLAC || '').toLowerCase() === 'true';

const cache$a = cache$b;
const insure$5 = insure$6.exports;
const select$6 = select$7.exports;
const request$c = request_1;
const headers$2 = {
  origin: 'http://y.qq.com/',
  referer: 'http://y.qq.com/',
  cookie: process.env.QQ_COOKIE || null // 'uin=; qm_keyst=',

};

const format$5 = song => ({
  id: {
    song: song.mid,
    file: song.file.media_mid
  },
  name: song.name,
  duration: song.interval * 1000,
  album: {
    id: song.album.mid,
    name: song.album.name
  },
  artists: song.singer.map(({
    mid,
    name
  }) => ({
    id: mid,
    name
  }))
});

const search$7 = info => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?' + 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&' + 't=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=' + encodeURIComponent(info.keyword) + '&' + 'g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&' + 'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0';
  return request$c('GET', url).then(response => response.jsonp()).then(jsonBody => {
    const list = jsonBody.data.song.list.map(format$5);
    const matched = select$6(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const single$2 = (id, format) => {
  const uin = ((headers$2.cookie || '').match(/uin=(\d+)/) || [])[1] || '0';
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' + encodeURIComponent(JSON.stringify({
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '7332953645',
        loginflag: 1,
        filename: [format.join(id.file)],
        songmid: [id.song],
        songtype: [0],
        uin,
        platform: '20'
      }
    }
  }));
  return request$c('GET', url, headers$2).then(response => response.json()).then(jsonBody => {
    const {
      sip,
      midurlinfo
    } = jsonBody.req_0.data;
    return midurlinfo[0].purl ? sip[0] + midurlinfo[0].purl : Promise.reject();
  });
};

const track$8 = id => {
  id.key = id.file;
  return Promise.all([['F000', '.flac'], ['M800', '.mp3'], ['M500', '.mp3']].slice(headers$2.cookie || typeof window !== 'undefined' ? select$6.ENABLE_FLAC ? 0 : 1 : 2).map(format => single$2(id, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$5().qq.track(id));
};

const check$9 = info => cache$a(search$7, info).then(track$8);

var qq = {
  check: check$9,
  track: track$8
};

var crypto$4 = {exports: {}};

var long = Long$1;
/**
 * wasm optimizations, to do native i64 multiplication and divide
 */

var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch (e) {// no wasm support :(
}
/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */


function Long$1(low, high, unsigned) {
  /**
   * The low 32 bits as a signed value.
   * @type {number}
   */
  this.low = low | 0;
  /**
   * The high 32 bits as a signed value.
   * @type {number}
   */

  this.high = high | 0;
  /**
   * Whether unsigned or not.
   * @type {boolean}
   */

  this.unsigned = !!unsigned;
} // The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */


Long$1.prototype.__isLong__;
Object.defineProperty(Long$1.prototype, "__isLong__", {
  value: true
});
/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */

function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */


Long$1.isLong = isLong;
/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */

var INT_CACHE = {};
/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */

var UINT_CACHE = {};
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */

function fromInt(value, unsigned) {
  var obj, cachedObj, cache;

  if (unsigned) {
    value >>>= 0;

    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj) return cachedObj;
    }

    obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
    if (cache) UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;

    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj) return cachedObj;
    }

    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache) INT_CACHE[value] = obj;
    return obj;
  }
}
/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */


Long$1.fromInt = fromInt;
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */

function fromNumber(value, unsigned) {
  if (isNaN(value)) return unsigned ? UZERO : ZERO;

  if (unsigned) {
    if (value < 0) return UZERO;
    if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
  }

  if (value < 0) return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */


Long$1.fromNumber = fromNumber;
/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */

function fromBits(lowBits, highBits, unsigned) {
  return new Long$1(lowBits, highBits, unsigned);
}
/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */


Long$1.fromBits = fromBits;
/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */

var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */

function fromString(str, unsigned, radix) {
  if (str.length === 0) throw Error('empty string');
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;

  if (typeof unsigned === 'number') {
    // For goog.math.long compatibility
    radix = unsigned, unsigned = false;
  } else {
    unsigned = !!unsigned;
  }

  radix = radix || 10;
  if (radix < 2 || 36 < radix) throw RangeError('radix');
  var p;
  if ((p = str.indexOf('-')) > 0) throw Error('interior hyphen');else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  } // Do several (8) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.

  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;

  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i),
        value = parseInt(str.substring(i, i + size), radix);

    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }

  result.unsigned = unsigned;
  return result;
}
/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */


Long$1.fromString = fromString;
/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */

function fromValue(val, unsigned) {
  if (typeof val === 'number') return fromNumber(val, unsigned);
  if (typeof val === 'string') return fromString(val, unsigned); // Throws for non-objects, converts non-instanceof Long:

  return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}
/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */


Long$1.fromValue = fromValue; // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */

var TWO_PWR_16_DBL = 1 << 16;
/**
 * @type {number}
 * @const
 * @inner
 */

var TWO_PWR_24_DBL = 1 << 24;
/**
 * @type {number}
 * @const
 * @inner
 */

var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
/**
 * @type {number}
 * @const
 * @inner
 */

var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
/**
 * @type {number}
 * @const
 * @inner
 */

var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
/**
 * @type {!Long}
 * @const
 * @inner
 */

var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
/**
 * @type {!Long}
 * @inner
 */

var ZERO = fromInt(0);
/**
 * Signed zero.
 * @type {!Long}
 */

Long$1.ZERO = ZERO;
/**
 * @type {!Long}
 * @inner
 */

var UZERO = fromInt(0, true);
/**
 * Unsigned zero.
 * @type {!Long}
 */

Long$1.UZERO = UZERO;
/**
 * @type {!Long}
 * @inner
 */

var ONE = fromInt(1);
/**
 * Signed one.
 * @type {!Long}
 */

Long$1.ONE = ONE;
/**
 * @type {!Long}
 * @inner
 */

var UONE = fromInt(1, true);
/**
 * Unsigned one.
 * @type {!Long}
 */

Long$1.UONE = UONE;
/**
 * @type {!Long}
 * @inner
 */

var NEG_ONE = fromInt(-1);
/**
 * Signed negative one.
 * @type {!Long}
 */

Long$1.NEG_ONE = NEG_ONE;
/**
 * @type {!Long}
 * @inner
 */

var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
/**
 * Maximum signed value.
 * @type {!Long}
 */

Long$1.MAX_VALUE = MAX_VALUE;
/**
 * @type {!Long}
 * @inner
 */

var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
/**
 * Maximum unsigned value.
 * @type {!Long}
 */

Long$1.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
/**
 * @type {!Long}
 * @inner
 */

var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
/**
 * Minimum signed value.
 * @type {!Long}
 */

Long$1.MIN_VALUE = MIN_VALUE;
/**
 * @alias Long.prototype
 * @inner
 */

var LongPrototype = Long$1.prototype;
/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */

LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */


LongPrototype.toNumber = function toNumber() {
  if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */


LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix) throw RangeError('radix');
  if (this.isZero()) return '0';

  if (this.isNegative()) {
    // Unsigned Longs are never negative
    if (this.eq(MIN_VALUE)) {
      // We need to change the Long value before it can be negated, so we remove
      // the bottom-most digit in this base and then recurse to do the rest.
      var radixLong = fromNumber(radix),
          div = this.div(radixLong),
          rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else return '-' + this.neg().toString(radix);
  } // Do several (6) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.


  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
      rem = this;
  var result = '';

  while (true) {
    var remDiv = rem.div(radixToPower),
        intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
        digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero()) return digits + result;else {
      while (digits.length < 6) digits = '0' + digits;

      result = '' + digits + result;
    }
  }
};
/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */


LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */


LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */


LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */


LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */


LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative()) // Unsigned Longs are never negative
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;

  for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;

  return this.high != 0 ? bit + 33 : bit + 1;
};
/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */


LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */


LongPrototype.eqz = LongPrototype.isZero;
/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */

LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */


LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */


LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */


LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.equals = function equals(other) {
  if (!isLong(other)) other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
  return this.high === other.high && this.low === other.low;
};
/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.eq = LongPrototype.equals;
/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(
  /* validates */
  other);
};
/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.neq = LongPrototype.notEquals;
/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.ne = LongPrototype.notEquals;
/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.lessThan = function lessThan(other) {
  return this.comp(
  /* validates */
  other) < 0;
};
/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.lt = LongPrototype.lessThan;
/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(
  /* validates */
  other) <= 0;
};
/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.lte = LongPrototype.lessThanOrEqual;
/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.le = LongPrototype.lessThanOrEqual;
/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(
  /* validates */
  other) > 0;
};
/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.gt = LongPrototype.greaterThan;
/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(
  /* validates */
  other) >= 0;
};
/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */


LongPrototype.gte = LongPrototype.greaterThanOrEqual;
/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */

LongPrototype.ge = LongPrototype.greaterThanOrEqual;
/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */

LongPrototype.compare = function compare(other) {
  if (!isLong(other)) other = fromValue(other);
  if (this.eq(other)) return 0;
  var thisNeg = this.isNegative(),
      otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) return -1;
  if (!thisNeg && otherNeg) return 1; // At this point the sign bits are the same

  if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1; // Both are positive if at least one is unsigned

  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */


LongPrototype.comp = LongPrototype.compare;
/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */

LongPrototype.negate = function negate() {
  if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
  return this.not().add(ONE);
};
/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */


LongPrototype.neg = LongPrototype.negate;
/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */

LongPrototype.add = function add(addend) {
  if (!isLong(addend)) addend = fromValue(addend); // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

  var a48 = this.high >>> 16;
  var a32 = this.high & 0xFFFF;
  var a16 = this.low >>> 16;
  var a00 = this.low & 0xFFFF;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 0xFFFF;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 0xFFFF;
  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 + b48;
  c48 &= 0xFFFF;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */


LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */


LongPrototype.sub = LongPrototype.subtract;
/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */

LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero()) return ZERO;
  if (!isLong(multiplier)) multiplier = fromValue(multiplier); // use wasm support if present

  if (wasm) {
    var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  if (multiplier.isZero()) return ZERO;
  if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;

  if (this.isNegative()) {
    if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg(); // If both longs are small, use float multiplication


  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned); // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.high >>> 16;
  var a32 = this.high & 0xFFFF;
  var a16 = this.low >>> 16;
  var a00 = this.low & 0xFFFF;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 0xFFFF;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 0xFFFF;
  var c48 = 0,
      c32 = 0,
      c16 = 0,
      c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xFFFF;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */


LongPrototype.mul = LongPrototype.multiply;
/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */

LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor)) divisor = fromValue(divisor);
  if (divisor.isZero()) throw Error('division by zero'); // use wasm support if present

  if (wasm) {
    // guard against signed division overflow: the largest
    // negative number / -1 would be 1 larger than the largest
    // positive number, due to two's complement.
    if (!this.unsigned && this.high === -0x80000000 && divisor.low === -1 && divisor.high === -1) {
      // be consistent with non-wasm code path
      return this;
    }

    var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  if (this.isZero()) return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;

  if (!this.unsigned) {
    // This section is only relevant for signed longs and is derived from the
    // closure library as a whole.
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
      else if (divisor.eq(MIN_VALUE)) return ONE;else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);

        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;

    if (this.isNegative()) {
      if (divisor.isNegative()) return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();

    res = ZERO;
  } else {
    // The algorithm below has not been made for unsigned longs. It's therefore
    // required to take special care of the MSB prior to running it.
    if (!divisor.unsigned) divisor = divisor.toUnsigned();
    if (divisor.gt(this)) return UZERO;
    if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
      return UONE;
    res = UZERO;
  } // Repeat the following until the remainder is less than other:  find a
  // floating-point that approximates remainder / other *from below*, add this
  // into the result, and subtract it from the remainder.  It is critical that
  // the approximate value is less than or equal to the real value so that the
  // remainder never becomes negative.


  rem = this;

  while (rem.gte(divisor)) {
    // Approximate the result of division. This may be a little greater or
    // smaller than the actual value.
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber())); // We will tweak the approximate result by changing it in the 48-th digit or
    // the smallest non-fractional digit, whichever is larger.

    var log2 = Math.ceil(Math.log(approx) / Math.LN2),
        delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),
        // Decrease the approximation until it is smaller than the remainder.  Note
    // that if it is too large, the product overflows and is negative.
    approxRes = fromNumber(approx),
        approxRem = approxRes.mul(divisor);

    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    } // We know the answer can't be zero... and actually, zero would cause
    // infinite recursion since we would make no progress.


    if (approxRes.isZero()) approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }

  return res;
};
/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */


LongPrototype.div = LongPrototype.divide;
/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */

LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor)) divisor = fromValue(divisor); // use wasm support if present

  if (wasm) {
    var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  return this.sub(this.div(divisor).mul(divisor));
};
/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */


LongPrototype.mod = LongPrototype.modulo;
/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */

LongPrototype.rem = LongPrototype.modulo;
/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */

LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */


LongPrototype.and = function and(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */


LongPrototype.or = function or(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */


LongPrototype.xor = function xor(other) {
  if (!isLong(other)) other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */


LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else return fromBits(0, this.low << numBits - 32, this.unsigned);
};
/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */


LongPrototype.shl = LongPrototype.shiftLeft;
/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */

LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */


LongPrototype.shr = LongPrototype.shiftRight;
/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */

LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits)) numBits = numBits.toInt();
  numBits &= 63;
  if (numBits === 0) return this;else {
    var high = this.high;

    if (numBits < 32) {
      var low = this.low;
      return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
    } else if (numBits === 32) return fromBits(high, 0, this.unsigned);else return fromBits(high >>> numBits - 32, 0, this.unsigned);
  }
};
/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */


LongPrototype.shru = LongPrototype.shiftRightUnsigned;
/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */

LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */

LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned) return this;
  return fromBits(this.low, this.high, false);
};
/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */


LongPrototype.toUnsigned = function toUnsigned() {
  if (this.unsigned) return this;
  return fromBits(this.low, this.high, true);
};
/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */


LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */


LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high,
      lo = this.low;
  return [lo & 0xff, lo >>> 8 & 0xff, lo >>> 16 & 0xff, lo >>> 24, hi & 0xff, hi >>> 8 & 0xff, hi >>> 16 & 0xff, hi >>> 24];
};
/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */


LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high,
      lo = this.low;
  return [hi >>> 24, hi >>> 16 & 0xff, hi >>> 8 & 0xff, hi & 0xff, lo >>> 24, lo >>> 16 & 0xff, lo >>> 8 & 0xff, lo & 0xff];
};
/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */


Long$1.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long$1.fromBytesLE(bytes, unsigned) : Long$1.fromBytesBE(bytes, unsigned);
};
/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */


Long$1.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long$1(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
};
/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */


Long$1.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long$1(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
};

/*
	Thanks to
	https://github.com/XuShaohua/kwplayer/blob/master/kuwo/DES.py
	https://github.com/Levi233/MusicPlayer/blob/master/app/src/main/java/com/chenhao/musicplayer/utils/crypt/KuwoDES.java
*/
const Long = typeof BigInt === 'function' // BigInt support in Node 10+
? n => {
  const bN = BigInt(n);
  return {
    low: Number(bN),
    valueOf: () => bN.valueOf(),
    toString: () => bN.toString(),
    not: () => Long(~bN),
    isNegative: () => bN < 0,
    or: x => Long(bN | BigInt(x)),
    and: x => Long(bN & BigInt(x)),
    xor: x => Long(bN ^ BigInt(x)),
    equals: x => bN === BigInt(x),
    multiply: x => Long(bN * BigInt(x)),
    shiftLeft: x => Long(bN << BigInt(x)),
    shiftRight: x => Long(bN >> BigInt(x))
  };
} : (...args) => new long(...args);

const range = n => Array.from(new Array(n).keys());

const power = (base, index) => Array(index).fill(null).reduce(result => result.multiply(base), Long(1));

const LongArray = (...array) => array.map(n => n === -1 ? Long(-1, -1) : Long(n)); // EXPANSION


const arrayE = LongArray(31, 0, 1, 2, 3, 4, -1, -1, 3, 4, 5, 6, 7, 8, -1, -1, 7, 8, 9, 10, 11, 12, -1, -1, 11, 12, 13, 14, 15, 16, -1, -1, 15, 16, 17, 18, 19, 20, -1, -1, 19, 20, 21, 22, 23, 24, -1, -1, 23, 24, 25, 26, 27, 28, -1, -1, 27, 28, 29, 30, 31, 30, -1, -1); // INITIAL_PERMUTATION

const arrayIP = LongArray(57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6); // INVERSE_PERMUTATION

const arrayIP_1 = LongArray(39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48, 16, 56, 24); // ROTATES

const arrayLs = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
const arrayLsMask = LongArray(0, 0x100001, 0x300003);
const arrayMask = range(64).map(n => power(2, n));
arrayMask[arrayMask.length - 1] = arrayMask[arrayMask.length - 1].multiply(-1); // PERMUTATION

const arrayP = LongArray(15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24); // PERMUTED_CHOICE1

const arrayPC_1 = LongArray(56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3); // PERMUTED_CHOICE2

const arrayPC_2 = LongArray(13, 16, 10, 23, 0, 4, -1, -1, 2, 27, 14, 5, 20, 9, -1, -1, 22, 18, 11, 3, 25, 7, -1, -1, 15, 6, 26, 19, 12, 1, -1, -1, 40, 51, 30, 36, 46, 54, -1, -1, 29, 39, 50, 44, 32, 47, -1, -1, 43, 48, 38, 55, 33, 52, -1, -1, 45, 41, 49, 35, 28, 31, -1, -1);
const matrixNSBox = [[14, 4, 3, 15, 2, 13, 5, 3, 13, 14, 6, 9, 11, 2, 0, 5, 4, 1, 10, 12, 15, 6, 9, 10, 1, 8, 12, 7, 8, 11, 7, 0, 0, 15, 10, 5, 14, 4, 9, 10, 7, 8, 12, 3, 13, 1, 3, 6, 15, 12, 6, 11, 2, 9, 5, 0, 4, 2, 11, 14, 1, 7, 8, 13], [15, 0, 9, 5, 6, 10, 12, 9, 8, 7, 2, 12, 3, 13, 5, 2, 1, 14, 7, 8, 11, 4, 0, 3, 14, 11, 13, 6, 4, 1, 10, 15, 3, 13, 12, 11, 15, 3, 6, 0, 4, 10, 1, 7, 8, 4, 11, 14, 13, 8, 0, 6, 2, 15, 9, 5, 7, 1, 10, 12, 14, 2, 5, 9], [10, 13, 1, 11, 6, 8, 11, 5, 9, 4, 12, 2, 15, 3, 2, 14, 0, 6, 13, 1, 3, 15, 4, 10, 14, 9, 7, 12, 5, 0, 8, 7, 13, 1, 2, 4, 3, 6, 12, 11, 0, 13, 5, 14, 6, 8, 15, 2, 7, 10, 8, 15, 4, 9, 11, 5, 9, 0, 14, 3, 10, 7, 1, 12], [7, 10, 1, 15, 0, 12, 11, 5, 14, 9, 8, 3, 9, 7, 4, 8, 13, 6, 2, 1, 6, 11, 12, 2, 3, 0, 5, 14, 10, 13, 15, 4, 13, 3, 4, 9, 6, 10, 1, 12, 11, 0, 2, 5, 0, 13, 14, 2, 8, 15, 7, 4, 15, 1, 10, 7, 5, 6, 12, 11, 3, 8, 9, 14], [2, 4, 8, 15, 7, 10, 13, 6, 4, 1, 3, 12, 11, 7, 14, 0, 12, 2, 5, 9, 10, 13, 0, 3, 1, 11, 15, 5, 6, 8, 9, 14, 14, 11, 5, 6, 4, 1, 3, 10, 2, 12, 15, 0, 13, 2, 8, 5, 11, 8, 0, 15, 7, 14, 9, 4, 12, 7, 10, 9, 1, 13, 6, 3], [12, 9, 0, 7, 9, 2, 14, 1, 10, 15, 3, 4, 6, 12, 5, 11, 1, 14, 13, 0, 2, 8, 7, 13, 15, 5, 4, 10, 8, 3, 11, 6, 10, 4, 6, 11, 7, 9, 0, 6, 4, 2, 13, 1, 9, 15, 3, 8, 15, 3, 1, 14, 12, 5, 11, 0, 2, 12, 14, 7, 5, 10, 8, 13], [4, 1, 3, 10, 15, 12, 5, 0, 2, 11, 9, 6, 8, 7, 6, 9, 11, 4, 12, 15, 0, 3, 10, 5, 14, 13, 7, 8, 13, 14, 1, 2, 13, 6, 14, 9, 4, 1, 2, 14, 11, 13, 5, 0, 1, 10, 8, 3, 0, 11, 3, 5, 9, 4, 15, 2, 7, 8, 12, 15, 10, 7, 6, 12], [13, 7, 10, 0, 6, 9, 5, 15, 8, 4, 3, 10, 11, 14, 12, 5, 2, 11, 9, 6, 15, 12, 0, 3, 4, 1, 14, 13, 1, 2, 7, 8, 1, 2, 12, 15, 10, 4, 0, 3, 13, 14, 6, 9, 7, 8, 9, 6, 15, 1, 5, 12, 3, 10, 14, 5, 8, 7, 11, 0, 4, 13, 2, 11]];

const bitTransform = (arrInt, n, l) => {
  // int[], int, long : long
  let l2 = Long(0);
  range(n).forEach(i => {
    if (arrInt[i].isNegative() || l.and(arrayMask[arrInt[i].low]).equals(0)) return;
    l2 = l2.or(arrayMask[i]);
  });
  return l2;
};

const DES64 = (longs, l) => {
  const pR = range(8).map(() => Long(0));
  const pSource = [Long(0), Long(0)];
  let L = Long(0);
  let R = Long(0);
  let out = bitTransform(arrayIP, 64, l);
  pSource[0] = out.and(0xffffffff);
  pSource[1] = out.and(-4294967296).shiftRight(32);
  range(16).forEach(i => {
    let SOut = Long(0);
    R = Long(pSource[1]);
    R = bitTransform(arrayE, 64, R);
    R = R.xor(longs[i]);
    range(8).forEach(j => {
      pR[j] = R.shiftRight(j * 8).and(255);
    });
    range(8).reverse().forEach(sbi => {
      SOut = SOut.shiftLeft(4).or(matrixNSBox[sbi][pR[sbi]]);
    });
    R = bitTransform(arrayP, 32, SOut);
    L = Long(pSource[0]);
    pSource[0] = Long(pSource[1]);
    pSource[1] = L.xor(R);
  });
  pSource.reverse();
  out = pSource[1].shiftLeft(32).and(-4294967296).or(pSource[0].and(0xffffffff));
  out = bitTransform(arrayIP_1, 64, out);
  return out;
};

const subKeys = (l, longs, n) => {
  // long, long[], int
  let l2 = bitTransform(arrayPC_1, 56, l);
  range(16).forEach(i => {
    l2 = l2.and(arrayLsMask[arrayLs[i]]).shiftLeft(28 - arrayLs[i]).or(l2.and(arrayLsMask[arrayLs[i]].not()).shiftRight(arrayLs[i]));
    longs[i] = bitTransform(arrayPC_2, 64, l2);
  });

  if (n === 1) {
    range(8).forEach(j => {
      [longs[j], longs[15 - j]] = [longs[15 - j], longs[j]];
    });
  }
};

const crypt = (msg, key, mode) => {
  // 处理密钥块
  let l = Long(0);
  range(8).forEach(i => {
    l = Long(key[i]).shiftLeft(i * 8).or(l);
  });
  const j = Math.floor(msg.length / 8); // arrLong1 存放的是转换后的密钥块, 在解密时只需要把这个密钥块反转就行了

  const arrLong1 = range(16).map(() => Long(0));
  subKeys(l, arrLong1, mode); // arrLong2 存放的是前部分的明文

  const arrLong2 = range(j).map(() => Long(0));
  range(j).forEach(m => {
    range(8).forEach(n => {
      arrLong2[m] = Long(msg[n + m * 8]).shiftLeft(n * 8).or(arrLong2[m]);
    });
  }); // 用于存放密文

  const arrLong3 = range(Math.floor((1 + 8 * (j + 1)) / 8)).map(() => Long(0)); // 计算前部的数据块(除了最后一部分)

  range(j).forEach(i1 => {
    arrLong3[i1] = DES64(arrLong1, arrLong2[i1]);
  }); // 保存多出来的字节

  const arrByte1 = msg.slice(j * 8);
  let l2 = Long(0);
  range(msg.length % 8).forEach(i1 => {
    l2 = Long(arrByte1[i1]).shiftLeft(i1 * 8).or(l2);
  }); // 计算多出的那一位(最后一位)

  if (arrByte1.length || mode === 0) arrLong3[j] = DES64(arrLong1, l2); // 解密不需要
  // 将密文转为字节型

  const arrByte2 = range(8 * arrLong3.length).map(() => 0);
  let i4 = 0;
  arrLong3.forEach(l3 => {
    range(8).forEach(i6 => {
      arrByte2[i4] = l3.shiftRight(i6 * 8).and(255).low;
      i4 += 1;
    });
  });
  return Buffer.from(arrByte2);
};

const SECRET_KEY = Buffer.from('ylzsxkwm');

const encrypt = msg => crypt(msg, SECRET_KEY, 0);

const decrypt = msg => crypt(msg, SECRET_KEY, 1);

const encryptQuery = query => encrypt(Buffer.from(query)).toString('base64');

var kwDES = {
  encrypt,
  decrypt,
  encryptQuery
};

(function (module) {

  const crypto = require$$0__default$3['default'];
  const parse = require$$5__default['default'].parse;
  const bodyify = require$$2__default$1['default'].stringify;
  const eapiKey = 'e82ckenh8dichen8';
  const linuxapiKey = 'rFgB&h#%2?^eDg:Q';

  const decrypt = (buffer, key) => {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  };

  const encrypt = (buffer, key) => {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
  };

  module.exports = {
    eapi: {
      encrypt: buffer => encrypt(buffer, eapiKey),
      decrypt: buffer => decrypt(buffer, eapiKey),
      encryptRequest: (url, object) => {
        url = parse(url);
        const text = JSON.stringify(object);
        const message = `nobody${url.path}use${text}md5forencrypt`;
        const digest = crypto.createHash('md5').update(message).digest('hex');
        const data = `${url.path}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
        return {
          url: url.href.replace(/\w*api/, 'eapi'),
          body: bodyify({
            params: module.exports.eapi.encrypt(Buffer.from(data)).toString('hex').toUpperCase()
          })
        };
      }
    },
    linuxapi: {
      encrypt: buffer => encrypt(buffer, linuxapiKey),
      decrypt: buffer => decrypt(buffer, linuxapiKey),
      encryptRequest: (url, object) => {
        url = parse(url);
        const text = JSON.stringify({
          method: 'POST',
          url: url.href,
          params: object
        });
        return {
          url: url.resolve('/api/linux/forward'),
          body: bodyify({
            eparams: module.exports.linuxapi.encrypt(Buffer.from(text)).toString('hex').toUpperCase()
          })
        };
      }
    },
    miguapi: {
      encryptBody: object => {
        const text = JSON.stringify(object);

        const derive = (password, salt, keyLength, ivSize) => {
          // EVP_BytesToKey
          salt = salt || Buffer.alloc(0);
          const keySize = keyLength / 8;
          const repeat = Math.ceil((keySize + ivSize * 8) / 32);
          const buffer = Buffer.concat(Array(repeat).fill(null).reduce(result => result.concat(crypto.createHash('md5').update(Buffer.concat([result.slice(-1)[0], password, salt])).digest()), [Buffer.alloc(0)]));
          return {
            key: buffer.slice(0, keySize),
            iv: buffer.slice(keySize, keySize + ivSize)
          };
        };

        const password = Buffer.from(crypto.randomBytes(32).toString('hex')),
              salt = crypto.randomBytes(8);
        const key = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----';
        const secret = derive(password, salt, 256, 16);
        const cipher = crypto.createCipheriv('aes-256-cbc', secret.key, secret.iv);
        return bodyify({
          data: Buffer.concat([Buffer.from('Salted__'), salt, cipher.update(Buffer.from(text)), cipher.final()]).toString('base64'),
          secKey: crypto.publicEncrypt({
            key,
            padding: crypto.constants.RSA_PKCS1_PADDING
          }, password).toString('base64')
        });
      }
    },
    base64: {
      encode: (text, charset) => Buffer.from(text, charset).toString('base64').replace(/\+/g, '-').replace(/\//g, '_'),
      decode: (text, charset) => Buffer.from(text.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(charset)
    },
    uri: {
      retrieve: id => {
        id = id.toString().trim();
        const key = '3go8&$8*3*3h0k(2)2';
        const string = Array.from(Array(id.length).keys()).map(index => String.fromCharCode(id.charCodeAt(index) ^ key.charCodeAt(index % key.length))).join('');
        const result = crypto.createHash('md5').update(string).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');
        return `http://p1.music.126.net/${result}/${id}`;
      }
    },
    md5: {
      digest: value => crypto.createHash('md5').update(value).digest('hex'),
      pipe: source => new Promise((resolve, reject) => {
        const digest = crypto.createHash('md5').setEncoding('hex');
        source.pipe(digest).on('error', error => reject(error)).once('finish', () => resolve(digest.read()));
      })
    }
  };

  try {
    module.exports.kuwoapi = kwDES;
  } catch (e) {}
})(crypto$4);

const cache$9 = cache$b;
const insure$4 = insure$6.exports;
const select$5 = select$7.exports;
const crypto$3 = crypto$4.exports;
const request$b = request_1;

const format$4 = song => {
  return {
    // id: song.FileHash,
    // name: song.SongName,
    // duration: song.Duration * 1000,
    // album: {id: song.AlbumID, name: song.AlbumName},
    // artists: song.SingerId.map((id, index) => ({id, name: SingerName[index]}))
    id: song['hash'],
    id_hq: song['320hash'],
    id_sq: song['sqhash'],
    name: song['songname'],
    duration: song['duration'] * 1000,
    album: {
      id: song['album_id'],
      name: song['album_name']
    }
  };
};

const search$6 = info => {
  const url = // 'http://songsearch.kugou.com/song_search_v2?' +
  'http://mobilecdn.kugou.com/api/v3/search/song?' + 'keyword=' + encodeURIComponent(info.keyword) + '&page=1&pagesize=10';
  return request$b('GET', url).then(response => response.json()).then(jsonBody => {
    // const list = jsonBody.data.lists.map(format)
    const list = jsonBody.data.info.map(format$4);
    const matched = select$5(list, info);
    return matched ? matched : Promise.reject();
  }).catch(() => insure$4().kugou.search(info));
};

const single$1 = (song, format) => {
  const getHashId = () => {
    switch (format) {
      case 'hash':
        return song.id;

      case 'hqhash':
        return song.id_hq;

      case 'sqhash':
        return song.id_sq;
    }

    return '';
  };

  const url = 'http://trackercdn.kugou.com/i/v2/?' + 'key=' + crypto$3.md5.digest(`${getHashId()}kgcloudv2`) + '&hash=' + getHashId() + '&' + 'appid=1005&pid=2&cmd=25&behavior=play&album_id=' + song.album.id;
  return request$b('GET', url).then(response => response.json()).then(jsonBody => jsonBody.url[0] || Promise.reject());
};

const track$7 = song => Promise.all(['sqhash', 'hqhash', 'hash'].slice(select$5.ENABLE_FLAC ? 0 : 1).map(format => single$1(song, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$4().kugou.track(song));

const check$8 = info => cache$9(search$6, info).then(track$7);

var kugou = {
  check: check$8,
  search: search$6
};

const cache$8 = cache$b;
const insure$3 = insure$6.exports;
const select$4 = select$7.exports;
const crypto$2 = crypto$4.exports;
const request$a = request_1;

const format$3 = song => ({
  id: song.musicrid.split('_').pop(),
  name: song.name,
  // duration: song.songTimeMinutes.split(':').reduce((minute, second) => minute * 60 + parseFloat(second), 0) * 1000,
  duration: song.duration * 1000,
  album: {
    id: song.albumid,
    name: song.album
  },
  artists: song.artist.split('&').map((name, index) => ({
    id: index ? null : song.artistid,
    name
  }))
});

const search$5 = info => {
  // const url =
  // 	// 'http://search.kuwo.cn/r.s?' +
  // 	// 'ft=music&itemset=web_2013&client=kt&' +
  // 	// 'rformat=json&encoding=utf8&' +
  // 	// 'all=' + encodeURIComponent(info.keyword) + '&pn=0&rn=20'
  // 	'http://search.kuwo.cn/r.s?' +
  // 	'ft=music&rformat=json&encoding=utf8&' +
  // 	'rn=8&callback=song&vipver=MUSIC_8.0.3.1&' +
  // 	'SONGNAME=' + encodeURIComponent(info.name) + '&' +
  // 	'ARTIST=' + encodeURIComponent(info.artists[0].name)
  // return request('GET', url)
  // .then(response => response.body())
  // .then(body => {
  // 	const jsonBody = eval(
  // 		'(' + body
  // 		.replace(/\n/g, '')
  // 		.match(/try\s*\{[^=]+=\s*(.+?)\s*\}\s*catch/)[1]
  // 		.replace(/;\s*song\s*\(.+\)\s*;\s*/, '') + ')'
  // 	)
  // 	const matched = jsonBody.abslist[0]
  // 	if (matched)
  // 		return matched.MUSICRID.split('_').pop()
  // 	else
  // 		return Promise.reject()
  // })
  const keyword = encodeURIComponent(info.keyword.replace(' - ', ''));
  const url = `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keyword}&pn=1&rn=30`;
  return request$a('GET', `http://kuwo.cn/search/list?key=${keyword}`).then(response => response.headers['set-cookie'].find(line => line.includes('kw_token')).replace(/;.*/, '').split('=').pop()).then(token => request$a('GET', url, {
    referer: `http://www.kuwo.cn/search/list?key=${keyword}`,
    csrf: token,
    cookie: `kw_token=${token}`
  })).then(response => response.json()).then(jsonBody => {
    if (jsonBody && typeof jsonBody === 'object' && 'code' in jsonBody && jsonBody.code !== 200) return Promise.reject();
    const list = jsonBody.data.list.map(format$3);
    const matched = select$4(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$6 = id => {
  const url = crypto$2.kuwoapi ? 'http://mobi.kuwo.cn/mobi.s?f=kuwo&q=' + crypto$2.kuwoapi.encryptQuery('corp=kuwo&p2p=1&type=convert_url2&sig=0&format=' + ['flac', 'mp3'].slice(select$4.ENABLE_FLAC ? 0 : 1).join('|') + '&rid=' + id) : 'http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_' + id; // flac refuse
  // : 'http://www.kuwo.cn/url?format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id // flac refuse

  return request$a('GET', url, {
    'user-agent': 'okhttp/3.10.0'
  }).then(response => response.body()).then(body => {
    const url = (body.match(/http[^\s$"]+/) || [])[0];
    return url || Promise.reject();
  }).catch(() => insure$3().kuwo.track(id));
};

const check$7 = info => cache$8(search$5, info).then(track$6);

var kuwo = {
  check: check$7,
  track: track$6
};

const cache$7 = cache$b;
const insure$2 = insure$6.exports;
const select$3 = select$7.exports;
const request$9 = request_1;
const headers$1 = {
  origin: 'http://music.migu.cn/',
  referer: 'http://m.music.migu.cn/v3/',
  // 'cookie': 'migu_music_sid=' + (process.env.MIGU_COOKIE || null)
  aversionid: process.env.MIGU_COOKIE || null,
  channel: '0'
};

const format$2 = song => {
  const singerId = song.singerId.split(/\s*,\s*/);
  const singerName = song.singerName.split(/\s*,\s*/);
  return {
    // id: song.copyrightId,
    id: song.id,
    name: song.title,
    album: {
      id: song.albumId,
      name: song.albumName
    },
    artists: singerId.map((id, index) => ({
      id,
      name: singerName[index]
    }))
  };
};

const search$4 = info => {
  const url = 'https://m.music.migu.cn/migu/remoting/scr_search_tag?' + 'keyword=' + encodeURIComponent(info.keyword) + '&type=2&rows=20&pgc=1';
  return request$9('GET', url, headers$1).then(response => response.json()).then(jsonBody => {
    const list = ((jsonBody || {}).musics || []).map(format$2);
    const matched = select$3(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const single = (id, format) => {
  // const url =
  //	'https://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?' +
  //	'dataType=2&' + crypto.miguapi.encryptBody({copyrightId: id.toString(), type: format})
  const randomInt = Math.random().toString().substr(2);
  const url = 'https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.2?lowerQualityContentId=' + randomInt + '&netType=01&resourceType=E&songId=' + id.toString() + '&toneFlag=' + format;
  return request$9('GET', url, headers$1).then(response => response.json()).then(jsonBody => {
    // const {playUrl} = jsonBody.data
    // return playUrl ? encodeURI('http:' + playUrl) : Promise.reject()
    const {
      formatType
    } = jsonBody.data;
    if (formatType !== format) return Promise.reject();else return url ? jsonBody.data.url : Promise.reject();
  });
};

const track$5 = id => Promise.all( // [3, 2, 1].slice(select.ENABLE_FLAC ? 0 : 1)
['ZQ', 'SQ', 'HQ', 'PQ'].slice(select$3.ENABLE_FLAC ? 0 : 2).map(format => single(id, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$2().migu.track(id));

const check$6 = info => cache$7(search$4, info).then(track$5);

var migu = {
  check: check$6,
  track: track$5
};

const cache$6 = cache$b;
const insure$1 = insure$6.exports;
const select$2 = select$7.exports;
const crypto$1 = crypto$4.exports;
const request$8 = request_1;
const headers = {
  origin: 'http://www.joox.com',
  referer: 'http://www.joox.com',
  // Refer to #95, you should register an account
  // on Joox to use their service. We allow users
  // to specify it manually.
  cookie: process.env.JOOX_COOKIE || null // 'wmid=<your_wmid>; session_key=<your_session_key>;'

};

const fit = info => {
  if (/[\u0800-\u4e00]/.test(info.name)) //is japanese
    return info.name;else return info.keyword;
};

const format$1 = song => {
  const {
    decode
  } = crypto$1.base64;
  return {
    id: song.songid,
    name: decode(song.info1 || ''),
    duration: song.playtime * 1000,
    album: {
      id: song.albummid,
      name: decode(song.info3 || '')
    },
    artists: song.singer_list.map(({
      id,
      name
    }) => ({
      id,
      name: decode(name || '')
    }))
  };
};

const search$3 = info => {
  const keyword = fit(info);
  const url = 'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 'country=hk&lang=zh_TW&' + 'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30';
  return request$8('GET', url, headers).then(response => response.body()).then(body => {
    const jsonBody = JSON.parse(body.replace(/'/g, '"'));
    const list = jsonBody.itemlist.map(format$1);
    const matched = select$2(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$4 = id => {
  const url = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 'channel_id=-1&_=' + new Date().getTime();
  return request$8('GET', url, headers).then(response => response.jsonp()).then(jsonBody => {
    const songUrl = (jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl).replace(/M\d00([\w]+).mp3/, 'M800$1.mp3');
    if (songUrl) return songUrl;else return Promise.reject();
  }).catch(() => insure$1().joox.track(id));
};

const check$5 = info => cache$6(search$3, info).then(track$4);

var joox = {
  check: check$5,
  track: track$4
};

const cache$5 = cache$b;
const request$7 = request_1;

const parse$3 = query => (query || '').split('&').reduce((result, item) => {
  const splitItem = item.split('=').map(decodeURIComponent);
  return Object.assign({}, result, {
    [splitItem[0]]: splitItem[1]
  });
}, {}); // const proxy = require('url').parse('http://127.0.0.1:1080')


const proxy$2 = undefined;
const key$2 = process.env.YOUTUBE_KEY || null; // YouTube Data API v3

const signature = (id = '-tKVN2mAKRI') => {
  const url = `https://www.youtube.com/watch?v=${id}`;
  return request$7('GET', url, {}, null, proxy$2).then(response => response.body()).then(body => {
    let assets = /"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO":{[^}]+}/.exec(body)[0];
    assets = JSON.parse(`{${assets}}}`).WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO;
    return request$7('GET', 'https://youtube.com' + assets.jsUrl, {}, null, proxy$2).then(response => response.body());
  }).then(body => {
    const [, funcArg, funcBody] = /function\((\w+)\)\s*{([^}]+split\(""\)[^}]+join\(""\))};/.exec(body);
    const helperName = /;(.+?)\..+?\(/.exec(funcBody)[1];
    const helperContent = new RegExp(`var ${helperName}={[\\s\\S]+?};`).exec(body)[0];
    return new Function([funcArg], helperContent + '\n' + funcBody);
  });
};

const apiSearch$1 = info => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key$2}`;
  return request$7('GET', url, {
    accept: 'application/json'
  }, null, proxy$2).then(response => response.json()).then(jsonBody => {
    const matched = jsonBody.items[0];
    if (matched) return matched.id.videoId;else return Promise.reject();
  });
};

const search$2 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$7('GET', url, {}, null, proxy$2).then(response => response.body()).then(body => {
    const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
    const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
    if (matched) return matched.videoRenderer.videoId;else return Promise.reject();
  });
};

const track$3 = id => {
  const url = 'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
  const json_header = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  const json_body = `{
		"context": {
			"client": {
				"hl": "en",
				"clientName": "WEB",
				"clientVersion": "2.20210721.00.00"
			}
		},
		"videoId": "${id}"
	}`;
  return request$7('POST', url, json_header, json_body, proxy$2).then(response => response.body()).then(body => JSON.parse(body).streamingData).then(streamingData => {
    const stream = streamingData.formats.concat(streamingData.adaptiveFormats).find(format => format.itag === 140); // .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
    // .sort((a, b) => b.bitrate - a.bitrate)[0]

    const target = parse$3(stream.signatureCipher);
    return stream.url || (target.sp.includes('sig') ? cache$5(signature, undefined, 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url);
  });
};

const check$4 = info => cache$5(key$2 ? apiSearch$1 : search$2, info).then(track$3);

var youtube = {
  check: check$4,
  track: track$3
};

const cache$4 = cache$b;
const request$6 = request_1; // const proxy = require('url').parse('http://127.0.0.1:1080')

const proxy$1 = undefined;
const key$1 = process.env.YOUTUBE_KEY || null; // YouTube Data API v3

const apiSearch = info => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key$1}`;
  return request$6('GET', url, {
    accept: 'application/json'
  }, null, proxy$1).then(response => response.json()).then(jsonBody => {
    const matched = jsonBody.items[0];
    if (matched) return matched.id.videoId;else return Promise.reject();
  });
};

const search$1 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$6('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
    const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
    if (matched) return matched.videoRenderer.videoId;else return Promise.reject();
  });
};

const track$2 = id => {
  const url = `https://www.yt-download.org/api/button/mp3/${id}`;
  const regex = /<a[^>]*href=["']([^"']*)["']/;
  return request$6('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    var matched = body.match(regex);
    return matched ? matched[1] : Promise.reject();
  });
};

const check$3 = info => cache$4(key$1 ? apiSearch : search$1, info).then(track$2);

var ytDownload = {
  check: check$3,
  track: track$2
};

const cache$3 = cache$b;
const insure = insure$6.exports;
const select$1 = select$7.exports;
const request$5 = request_1;

const format = song => {
  return {
    id: song.id,
    name: song.title,
    // album: {id: song.album_id, name: song.album_title},
    artists: {
      id: song.mid,
      name: song.author
    }
  };
};

const search = info => {
  const url = 'https://api.bilibili.com/audio/music-service-c/s?' + 'search_type=music&page=1&pagesize=30&' + `keyword=${encodeURIComponent(info.keyword)}`;
  return request$5('GET', url).then(response => response.json()).then(jsonBody => {
    const list = jsonBody.data.result.map(format);
    const matched = select$1(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$1 = id => {
  const url = 'https://www.bilibili.com/audio/music-service-c/web/url?rivilege=2&quality=2&' + 'sid=' + id;
  return request$5('GET', url).then(response => response.json()).then(jsonBody => {
    if (jsonBody.code === 0) {
      // bilibili music requires referer, connect do not support referer, so change to http
      return jsonBody.data.cdns[0].replace('https', 'http');
    } else {
      return Promise.reject();
    }
  }).catch(() => insure().bilibili.track(id));
};

const check$2 = info => cache$3(search, info).then(track$1);

var bilibili = {
  check: check$2,
  track: track$1
};

const cache$2 = cache$b;
const select = select$7.exports;
const request$4 = request_1;

const track = info => {
  const url = 'http://mos9527.tooo.top/ncm/pyncm/track/GetTrackAudio?song_ids=' + info.id + '&bitrate=' + ['999000', '320000'].slice(select.ENABLE_FLAC ? 0 : 1, select.ENABLE_FLAC ? 1 : 2);
  return request$4('GET', url).then(response => response.body()).then(body => {
    // response.body() without raw should
    // transform the response to string.
    if (typeof body !== 'string') return Promise.reject('response.body() returns a value whose type is not string.');
    const jsonBody = JSON.parse(body);
    const matched = jsonBody.data.find(song => song.id === info.id);
    if (matched) return matched.url;
    return Promise.reject();
  });
};

const check$1 = info => cache$2(track, info);

var pyncmd = {
  check: check$1
};

const DEFAULT_SOURCE = ['kugou', 'kuwo', 'migu', 'youtube'];
const PROVIDERS = {
  qq: qq,
  kugou: kugou,
  kuwo: kuwo,
  migu: migu,
  joox: joox,
  youtube: youtube,
  ytdownload: ytDownload,
  bilibili: bilibili,
  pyncmd: pyncmd
};
var consts$1 = {
  DEFAULT_SOURCE,
  PROVIDERS
};

var $ = _export;
var aFunction = aFunction$i;
var getBuiltIn = getBuiltIn$e;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$2;
var iterate = iterate$g;
var PROMISE_ANY_ERROR = 'No one promise resolved'; // `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any

$({
  target: 'Promise',
  stat: true
}, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

const cache$1 = cache$b;
const request$3 = request_1;

const filter = (object, keys) => Object.keys(object).reduce((result, key) => Object.assign(result, keys.includes(key) && {
  [key]: object[key]
}), {}); // Object.keys(object).filter(key => !keys.includes(key)).forEach(key => delete object[key])


const limit = text => {
  const output = [text[0]];

  const length = () => output.reduce((sum, token) => sum + token.length, 0);

  text.slice(1).some(token => {
    if (length() > 15) return true;
    output.push(token);
    return false;
  });
  return output;
};

const getFormatData = data => {
  try {
    const info = filter(data, ['id', 'name', 'alias', 'duration']);
    info.name = (info.name || '').replace(/（\s*cover[:：\s][^）]+）/i, '').replace(/\(\s*cover[:：\s][^)]+\)/i, '').replace(/（\s*翻自[:：\s][^）]+）/, '').replace(/\(\s*翻自[:：\s][^)]+\)/, '');
    info.album = filter(data.album, ['id', 'name']);
    info.artists = data.artists.map(artist => filter(artist, ['id', 'name']));
    info.keyword = info.name + ' - ' + limit(info.artists.map(artist => artist.name)).join(' / ');
    return info;
  } catch (err) {
    console.log('getFormatData err: ', err);
    return {};
  }
};

const find$1 = (id, data) => {
  if (data) {
    const info = getFormatData(data);
    return info.name ? Promise.resolve(info) : Promise.reject();
  } else {
    const url = 'https://music.163.com/api/song/detail?ids=[' + id + ']';
    return request$3('GET', url).then(response => response.json()).then(jsonBody => {
      if (jsonBody && jsonBody.songs && jsonBody.songs.length) {
        const info = getFormatData(jsonBody.songs[0]);
        return info.name ? info : Promise.reject();
      }

      return Promise.reject();
    });
  }
};

var find_1 = (id, data) => {
  if (data) {
    return find$1(id, data);
  } else {
    return cache$1(find$1, id);
  }
};

/**
 * Does the hostname of `URL` equal `host`?
 *
 * @param url {string}
 * @param host {string}
 * @return {boolean}
 */

const isHost$2 = (url, host) => {
  // FIXME: Due to #118, we can only check the url
  // 		  by .includes(). You are welcome to fix
  //        it (CWE-20).
  return url.includes(host);
};
/**
 * The wrapper of `isHost()` to simplify the code.
 *
 * @param url {string}
 * @return {(host: string) => boolean}
 * @see isHost
 */


const isHostWrapper$1 = url => host => isHost$2(url, host);

var utilities = {
  isHost: isHost$2,
  isHostWrapper: isHostWrapper$1
};

const find = find_1;
const request$2 = request_1;
const consts = consts$1;
const {
  isHostWrapper
} = utilities;
const {
  CancelRequest
} = cancel;
const RequestCancelled = RequestCancelled_1;
const providers = consts.PROVIDERS;
const defaultSrc = consts.DEFAULT_SOURCE;

const match$1 = (id, source, data) => {
  let meta = {};
  const cancelRequest = new CancelRequest();
  const candidate = (source || commonjsGlobal.source || defaultSrc).filter(name => name in providers);
  return find(id, data).then(info => {
    meta = info;
    return Promise.any(candidate.map(async name => {
      try {
        // Get the song data.
        const audioData = await providers[name].check(info);
        if (!audioData) return Promise.reject(); // Get the url of the song data.

        const song = await check(audioData);
        if (!song || typeof song.url !== 'string') return Promise.reject(); // We check if the song.url is reachable.
        // It will throw on failed.

        await request$2('GET', song.url, undefined, undefined, undefined, cancelRequest);
        return song;
      } catch (e) {
        if (e && !(e instanceof RequestCancelled)) console.warn(e);
        return Promise.reject(); // .any will return the fulfilled one.
      }
    }));
  }).then(song => {
    // We cancel the remaining request which is still running.
    cancelRequest.cancel();
    console.log(`[${meta.id}] ${meta.name}\n${song.url}`);
    return song;
  });
};

const check = url => {
  const song = {
    size: 0,
    br: null,
    url: null,
    md5: null
  };
  let header = {
    range: 'bytes=0-8191',
    'accept-encoding': 'identity'
  };
  const isHost = isHostWrapper(url);

  if (isHost('bilivideo.com')) {
    header.referer = 'https://www.bilibili.com/';
  }

  if (isHost('yt-download.org')) {
    header.referer = 'https://www.yt-download.org/';
  }

  return Promise.race([request$2('GET', url, header), new Promise((_, reject) => setTimeout(() => reject(504), 5 * 1000))]).then(response => {
    if (!response.statusCode.toString().startsWith('2')) return Promise.reject();
    if (isHost('126.net')) // song.md5 = response.headers['x-nos-meta-origin-md5'] || response.headers['etag'].replace(/"/g, '')
      song.md5 = url.split('/').slice(-1)[0].replace(/\..*/g, '');else if (isHost('qq.com')) song.md5 = response.headers['server-md5'];else if (isHost('qianqian.com')) song.md5 = response.headers['etag'].replace(/"/g, '').toLowerCase();
    song.size = parseInt((response.headers['content-range'] || '').split('/').pop() || response.headers['content-length']) || 0;
    song.url = response.url.href;
    return response.headers['content-length'] === '8192' ? response.body(true) : Promise.reject();
  }).then(data => {
    const bitrate = decode(data);
    song.br = bitrate && !isNaN(bitrate) ? bitrate * 1000 : null;
  }).catch(() => {}).then(() => song);
};

const decode = buffer => {
  const map = {
    3: {
      3: ['free', 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 'bad'],
      2: ['free', 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 'bad'],
      1: ['free', 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 'bad']
    },
    2: {
      3: ['free', 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 'bad'],
      2: ['free', 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 'bad']
    }
  };
  map[2][1] = map[2][2];
  map[0] = map[2];
  let pointer = 0;
  if (buffer.slice(0, 4).toString() === 'fLaC') return 999;

  if (buffer.slice(0, 3).toString() === 'ID3') {
    pointer = 6;
    const size = buffer.slice(pointer, pointer + 4).reduce((summation, value, index) => summation + (value & 0x7f) << 7 * (3 - index), 0);
    pointer = 10 + size;
  }

  const header = buffer.slice(pointer, pointer + 4); // https://www.allegro.cc/forums/thread/591512/674023

  if (header.length === 4 && header[0] === 0xff && (header[1] >> 5 & 0x7) === 0x7 && (header[1] >> 1 & 0x3) !== 0 && (header[2] >> 4 & 0xf) !== 0xf && (header[2] >> 2 & 0x3) !== 0x3) {
    const version = header[1] >> 3 & 0x3;
    const layer = header[1] >> 1 & 0x3;
    const bitrate = header[2] >> 4;
    return map[version][layer][bitrate];
  }
};

var match_1 = match$1;

const cache = cache$b;
const parse$2 = require$$5__default['default'].parse;
const crypto = crypto$4.exports;
const request$1 = request_1;
const match = match_1;
const querystring = require$$2__default$1['default'];
const {
  isHost: isHost$1
} = utilities;
const hook$2 = {
  request: {
    before: () => {},
    after: () => {}
  },
  connect: {
    before: () => {}
  },
  negotiate: {
    before: () => {}
  },
  target: {
    host: new Set(),
    path: new Set()
  }
};
hook$2.target.host = new Set(['music.163.com', 'interface.music.163.com', 'interface3.music.163.com', 'apm.music.163.com', 'apm3.music.163.com' // 'mam.netease.com',
// 'api.iplay.163.com', // look living
// 'ac.dun.163yun.com',
// 'crash.163.com',
// 'clientlog.music.163.com',
// 'clientlog3.music.163.com'
]);
hook$2.target.path = new Set(['/api/v3/playlist/detail', '/api/v3/song/detail', '/api/v6/playlist/detail', '/api/album/play', '/api/artist/privilege', '/api/album/privilege', '/api/v1/artist', '/api/v1/artist/songs', '/api/artist/top/song', '/api/v1/album', '/api/album/v3/detail', '/api/playlist/privilege', '/api/song/enhance/player/url', '/api/song/enhance/player/url/v1', '/api/song/enhance/download/url', '/api/song/enhance/privilege', '/batch', '/api/batch', '/api/v1/search/get', '/api/v1/search/song/get', '/api/search/complex/get', '/api/cloudsearch/pc', '/api/v1/playlist/manipulate/tracks', '/api/song/like', '/api/v1/play/record', '/api/playlist/v4/detail', '/api/v1/radio/get', '/api/v1/discovery/recommend/songs', '/api/v1/discovery/recommend/songs', '/api/usertool/sound/mobile/promote', '/api/usertool/sound/mobile/theme', '/api/usertool/sound/mobile/animationList', '/api/usertool/sound/mobile/all', '/api/usertool/sound/mobile/detail']);
const domainList = ['music.163.com', 'music.126.net', 'iplay.163.com', 'look.163.com', 'y.163.com'];

hook$2.request.before = ctx => {
  const {
    req
  } = ctx;
  req.url = (req.url.startsWith('http://') ? '' : (req.socket.encrypted ? 'https:' : 'http:') + '//' + (domainList.some(domain => (req.headers.host || '').endsWith(domain)) ? req.headers.host : null)) + req.url;
  const url = parse$2(req.url);
  if ([url.hostname, req.headers.host].some(host => isHost$1(host, 'music.163.com'))) ctx.decision = 'proxy';

  if ([url.hostname, req.headers.host].some(host => hook$2.target.host.has(host)) && req.method === 'POST' && (url.path === '/api/linux/forward' || url.path.startsWith('/eapi/'))) {
    return request$1.read(req).then(body => req.body = body).then(body => {
      if ('x-napm-retry' in req.headers) delete req.headers['x-napm-retry'];
      req.headers['X-Real-IP'] = '118.88.88.88';
      if (req.url.includes('stream')) return; // look living eapi can not be decrypted

      if (body) {
        let data;
        const netease = {};
        netease.pad = (body.match(/%0+$/) || [''])[0];
        netease.forward = url.path === '/api/linux/forward';

        if (netease.forward) {
          data = JSON.parse(crypto.linuxapi.decrypt(Buffer.from(body.slice(8, body.length - netease.pad.length), 'hex')).toString());
          netease.path = parse$2(data.url).path;
          netease.param = data.params;
        } else {
          data = crypto.eapi.decrypt(Buffer.from(body.slice(7, body.length - netease.pad.length), 'hex')).toString().split('-36cd479b6b5-');
          netease.path = data[0];
          netease.param = JSON.parse(data[1]);
        }

        netease.path = netease.path.replace(/\/\d*$/, '');
        ctx.netease = netease; // console.log(netease.path, netease.param)

        if (netease.path === '/api/song/enhance/download/url') return pretendPlay(ctx);
      }
    }).catch(error => console.log(error, req.url));
  } else if (hook$2.target.host.has(url.hostname) && (url.path.startsWith('/weapi/') || url.path.startsWith('/api/'))) {
    req.headers['X-Real-IP'] = '118.88.88.88';
    ctx.netease = {
      web: true,
      path: url.path.replace(/^\/weapi\//, '/api/').split('?').shift() // remove the query parameters
      .replace(/\/\d*$/, '')
    };
  } else if (req.url.includes('package')) {
    try {
      const data = req.url.split('package/').pop().split('/');
      const url = parse$2(crypto.base64.decode(data[0]));
      const id = data[1].replace(/\.\w+/, '');
      req.url = url.href;
      req.headers['host'] = url.hostname;
      req.headers['cookie'] = null;
      ctx.package = {
        id
      };
      ctx.decision = 'proxy'; // if (url.href.includes('google'))
      // 	return request('GET', req.url, req.headers, null, parse('http://127.0.0.1:1080'))
      // 	.then(response => (ctx.res.writeHead(response.statusCode, response.headers), response.pipe(ctx.res)))
    } catch (error) {
      ctx.error = error;
      ctx.decision = 'close';
    }
  }
};

hook$2.request.after = ctx => {
  const {
    req,
    proxyRes,
    netease,
    package: pkg
  } = ctx;
  if (req.headers.host === 'tyst.migu.cn' && proxyRes.headers['content-range'] && proxyRes.statusCode === 200) proxyRes.statusCode = 206;

  if (netease && hook$2.target.path.has(netease.path) && proxyRes.statusCode === 200) {
    return request$1.read(proxyRes, true).then(buffer => buffer.length ? proxyRes.body = buffer : Promise.reject()).then(buffer => {
      const patch = string => string.replace(/([^\\]"\s*:\s*)(\d{16,})(\s*[}|,])/g, '$1"$2L"$3'); // for js precision


      try {
        netease.encrypted = false;
        netease.jsonBody = JSON.parse(patch(buffer.toString()));
      } catch (error) {
        netease.encrypted = true;
        netease.jsonBody = JSON.parse(patch(crypto.eapi.decrypt(buffer).toString()));
      }

      if (new Set([401, 512]).has(netease.jsonBody.code) && !netease.web) {
        if (netease.path.includes('manipulate')) return tryCollect(ctx);else if (netease.path === '/api/song/like') return tryLike(ctx);
      } else if (netease.path.includes('url')) return tryMatch(ctx);else if (netease.path.includes('/usertool/sound/')) return unblockSoundEffects(netease.jsonBody);else if (netease.path.includes('batch')) {
        for (const key in netease.jsonBody) {
          if (key.includes('/usertool/sound/')) unblockSoundEffects(netease.jsonBody[key]);
        }
      }
    }).then(() => {
      ['transfer-encoding', 'content-encoding', 'content-length'].filter(key => key in proxyRes.headers).forEach(key => delete proxyRes.headers[key]);

      const inject = (key, value) => {
        if (typeof value === 'object' && value != null) {
          if ('fee' in value) value['fee'] = 0;

          if ('st' in value && 'pl' in value && 'dl' in value && 'subp' in value) {
            // batch modify
            value['st'] = 0;
            value['subp'] = 1;
            value['pl'] = value['pl'] === 0 ? 320000 : value['pl'];
            value['dl'] = value['dl'] === 0 ? 320000 : value['dl'];
          }
        }

        return value;
      };

      let body = JSON.stringify(netease.jsonBody, inject);
      body = body.replace(/([^\\]"\s*:\s*)"(\d{16,})L"(\s*[}|,])/g, '$1$2$3'); // for js precision

      proxyRes.body = netease.encrypted ? crypto.eapi.encrypt(Buffer.from(body)) : body;
    }).catch(error => error ? console.log(error, req.url) : null);
  } else if (pkg) {
    if (new Set([201, 301, 302, 303, 307, 308]).has(proxyRes.statusCode)) {
      return request$1(req.method, parse$2(req.url).resolve(proxyRes.headers.location), req.headers).then(response => ctx.proxyRes = response);
    } else if (/p\d+c*\.music\.126\.net/.test(req.url)) {
      proxyRes.headers['content-type'] = 'audio/*';
    }
  }
};

hook$2.connect.before = ctx => {
  const {
    req
  } = ctx;
  const url = parse$2('https://' + req.url);

  if ([url.hostname, req.headers.host].some(host => hook$2.target.host.has(host))) {
    if (url.port === 80) {
      req.url = `${commonjsGlobal.address || 'localhost'}:${commonjsGlobal.port[0]}`;
      req.local = true;
    } else if (commonjsGlobal.port[1]) {
      req.url = `${commonjsGlobal.address || 'localhost'}:${commonjsGlobal.port[1]}`;
      req.local = true;
    } else {
      ctx.decision = 'blank';
    }
  } else if (url.href.includes(commonjsGlobal.endpoint)) ctx.decision = 'proxy';
};

hook$2.negotiate.before = ctx => {
  const {
    req,
    socket,
    decision
  } = ctx;
  const url = parse$2('https://' + req.url);
  const target = hook$2.target.host;
  if (req.local || decision) return;

  if (target.has(socket.sni) && !target.has(url.hostname)) {
    target.add(url.hostname);
    ctx.decision = 'blank';
  }
};

const pretendPlay = ctx => {
  const {
    req,
    netease
  } = ctx;
  const turn = 'http://music.163.com/api/song/enhance/player/url';
  let query;

  if (netease.forward) {
    const {
      id,
      br
    } = netease.param;
    netease.param = {
      ids: `["${id}"]`,
      br
    };
    query = crypto.linuxapi.encryptRequest(turn, netease.param);
  } else {
    const {
      id,
      br,
      e_r,
      header
    } = netease.param;
    netease.param = {
      ids: `["${id}"]`,
      br,
      e_r,
      header
    };
    query = crypto.eapi.encryptRequest(turn, netease.param);
  }

  req.url = query.url;
  req.body = query.body + netease.pad;
};

const tryCollect = ctx => {
  const {
    req,
    netease
  } = ctx;
  const {
    trackIds,
    pid,
    op
  } = netease.param;
  const trackId = (Array.isArray(trackIds) ? trackIds : JSON.parse(trackIds))[0];
  return request$1('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=${op}`).then(response => response.json()).then(jsonBody => {
    netease.jsonBody = jsonBody;
  }).catch(() => {});
};

const tryLike = ctx => {
  const {
    req,
    netease
  } = ctx;
  const {
    trackId
  } = netease.param;
  let pid = 0,
      userId = 0;
  return request$1('GET', 'http://music.163.com/api/v1/user/info', req.headers).then(response => response.json()).then(jsonBody => {
    userId = jsonBody.userPoint.userId;
    return request$1('GET', `http://music.163.com/api/user/playlist?uid=${userId}&limit=1`, req.headers).then(response => response.json());
  }).then(jsonBody => {
    pid = jsonBody.playlist[0].id;
    return request$1('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`).then(response => response.json());
  }).then(jsonBody => {
    if (new Set([200, 502]).has(jsonBody.code)) {
      netease.jsonBody = {
        code: 200,
        playlistId: pid
      };
    }
  }).catch(() => {});
};

const computeHash = task => request$1('GET', task.url).then(response => crypto.md5.pipe(response));

const tryMatch = ctx => {
  const {
    req,
    netease
  } = ctx;
  const {
    jsonBody
  } = netease;
  /** @type {number} */

  const min_br = Number(process.env.MIN_BR) || 0;
  /** @type {Promise<any>[]} */

  let tasks;
  let target = 0;

  const inject = item => {
    item.flag = 0;

    if ((item.code !== 200 || item.freeTrialInfo || item.br < min_br) && (target === 0 || item.id === target)) {
      return match(item.id).then(song => {
        let os = '';

        try {
          let {
            header
          } = netease.param;
          header = typeof header === 'string' ? JSON.parse(header) : header;
          const cookie = querystring.parse(req.headers.cookie.replace(/\s/g, ''), ';');
          os = header.os || cookie.os;
        } catch (e) {}

        item.type = song.br === 999000 ? 'flac' : 'mp3';

        if (os === 'pc' || os === 'uwp') {
          item.url = commonjsGlobal.endpoint ? `${commonjsGlobal.endpoint.replace('https://', 'http://')}/package/${crypto.base64.encode(song.url)}/${item.id}.${item.type}` : song.url;
        } else {
          item.url = commonjsGlobal.endpoint ? `${commonjsGlobal.endpoint}/package/${crypto.base64.encode(song.url)}/${item.id}.${item.type}` : song.url;
        }

        item.md5 = song.md5 || crypto.md5.digest(song.url);
        item.br = song.br || 128000;
        item.size = song.size;
        item.code = 200;
        item.freeTrialInfo = null;
        return song;
      }).then(song => {
        if (!netease.path.includes('download') || song.md5) return;

        const newer = (base, target) => {
          const difference = Array.from([base, target]).map(version => version.split('.').slice(0, 3).map(number => parseInt(number) || 0)).reduce((aggregation, current) => !aggregation.length ? current.map(element => [element]) : aggregation.map((element, index) => element.concat(current[index])), []).filter(pair => pair[0] !== pair[1])[0];
          return !difference || difference[0] <= difference[1];
        };

        const limit = {
          android: '0.0.0',
          osx: '0.0.0'
        };
        const task = {
          key: song.url.replace(/\?.*$/, '').replace(/(?<=kugou\.com\/)\w+\/\w+\//, '').replace(/(?<=kuwo\.cn\/)\w+\/\w+\/resource\//, ''),
          url: song.url
        };

        try {
          let {
            header
          } = netease.param;
          header = typeof header === 'string' ? JSON.parse(header) : header;
          const cookie = querystring.parse(req.headers.cookie.replace(/\s/g, ''), ';');
          const os = header.os || cookie.os,
                version = header.appver || cookie.appver;
          if (os in limit && newer(limit[os], version)) return cache(computeHash, task, 7 * 24 * 60 * 60 * 1000).then(value => item.md5 = value);
        } catch (e) {}
      }).catch(() => {});
    } else if (item.code === 200 && netease.web) {
      item.url = item.url.replace(/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net');
    }
  };

  if (!Array.isArray(jsonBody.data)) {
    tasks = [inject(jsonBody.data)];
  } else if (netease.path.includes('download')) {
    jsonBody.data = jsonBody.data[0];
    tasks = [inject(jsonBody.data)];
  } else {
    target = netease.web ? 0 : parseInt(((Array.isArray(netease.param.ids) ? netease.param.ids : JSON.parse(netease.param.ids))[0] || 0).toString().replace('_0', '')); // reduce time cost

    tasks = jsonBody.data.map(item => inject(item));
  }

  return Promise.all(tasks).catch(() => {});
};

const unblockSoundEffects = obj => {
  console.log('UNSE > triggered');
  const {
    data,
    code
  } = obj;

  if (code === 200) {
    if (Array.isArray(data)) data.map(item => {
      if (item.type) item.type = 1;
    });else if (data.type) data.type = 1;
  }
};

var hook_1 = hook$2;

var sni$1 = data => {
  let end = data.length;
  let pointer = 5 + 1 + 3 + 2 + 32;

  const nan = (number = pointer) => isNaN(number);

  if (pointer + 1 > end || nan()) return null;
  pointer += 1 + data[pointer];
  if (pointer + 2 > end || nan()) return null;
  pointer += 2 + data.readInt16BE(pointer);
  if (pointer + 1 > end || nan()) return null;
  pointer += 1 + data[pointer];
  if (pointer + 2 > end || nan()) return null;
  const extensionsLength = data.readInt16BE(pointer);
  pointer += 2;
  const extensionsEnd = pointer + extensionsLength;
  if (extensionsEnd > end || nan(extensionsEnd)) return null;
  end = extensionsEnd;

  while (pointer + 4 <= end || nan()) {
    const extensionType = data.readInt16BE(pointer);
    const extensionSize = data.readInt16BE(pointer + 2);
    pointer += 4;

    if (extensionType !== 0) {
      pointer += extensionSize;
      continue;
    }

    if (pointer + 2 > end || nan()) return null;
    const nameListLength = data.readInt16BE(pointer);
    pointer += 2;
    if (pointer + nameListLength > end) return null;

    while (pointer + 3 <= end || nan()) {
      const nameType = data[pointer];
      const nameLength = data.readInt16BE(pointer + 1);
      pointer += 3;

      if (nameType !== 0) {
        pointer += nameLength;
        continue;
      }

      if (pointer + nameLength > end || nan()) return null;
      return data.toString('ascii', pointer, pointer + nameLength);
    }
  }

  return null;
};

const fs = require$$0__default$4['default'];
const net = require$$1__default$1['default'];
const path = require$$0__default['default'];
const parse$1 = require$$5__default['default'].parse;
const sni = sni$1;
const hook$1 = hook_1;
const request = request_1;
const {
  isHost
} = utilities;
const proxy = {
  core: {
    mitm: (req, res) => {
      if (req.url === '/proxy.pac') {
        const url = parse$1('http://' + req.headers.host);
        res.writeHead(200, {
          'Content-Type': 'application/x-ns-proxy-autoconfig'
        });
        res.end(`
					function FindProxyForURL(url, host) {
						if (${Array.from(hook$1.target.host).map(host => `host == '${host}'`).join(' || ')}) {
							return 'PROXY ${url.hostname}:${url.port || 80}'
						}
						return 'DIRECT'
					}
				`);
      } else {
        const ctx = {
          res,
          req
        };
        Promise.resolve().then(() => proxy.protect(ctx)).then(() => proxy.authenticate(ctx)).then(() => hook$1.request.before(ctx)).then(() => proxy.filter(ctx)).then(() => proxy.log(ctx)).then(() => proxy.mitm.request(ctx)).then(() => hook$1.request.after(ctx)).then(() => proxy.mitm.response(ctx)).catch(() => proxy.mitm.close(ctx));
      }
    },
    tunnel: (req, socket, head) => {
      const ctx = {
        req,
        socket,
        head
      };
      Promise.resolve().then(() => proxy.protect(ctx)).then(() => proxy.authenticate(ctx)).then(() => hook$1.connect.before(ctx)).then(() => proxy.filter(ctx)).then(() => proxy.log(ctx)).then(() => proxy.tunnel.connect(ctx)).then(() => proxy.tunnel.dock(ctx)).then(() => hook$1.negotiate.before(ctx)).then(() => proxy.tunnel.pipe(ctx)).catch(() => proxy.tunnel.close(ctx));
    }
  },
  abort: socket => {
    if (socket) socket.end();
    if (socket && !socket.destroyed) socket.destroy();
  },
  protect: ctx => {
    const {
      req,
      res,
      socket
    } = ctx;
    if (req) req.on('error', () => proxy.abort(req.socket, 'req'));
    if (res) res.on('error', () => proxy.abort(res.socket, 'res'));
    if (socket) socket.on('error', () => proxy.abort(socket, 'socket'));
  },
  log: ctx => {
    const {
      req,
      socket,
      decision
    } = ctx;
    const mark = {
      close: '|',
      blank: '-',
      proxy: '>'
    }[decision] || '>';
    if (socket) console.log('TUNNEL', mark, req.url);else console.log('MITM', mark, parse$1(req.url).host, req.socket.encrypted ? '(ssl)' : '');
  },
  authenticate: ctx => {
    const {
      req,
      res,
      socket
    } = ctx;
    const credential = Buffer.from((req.headers['proxy-authorization'] || '').split(/\s+/).pop() || '', 'base64').toString();
    if ('proxy-authorization' in req.headers) delete req.headers['proxy-authorization'];

    if (server$1.authentication && credential !== server$1.authentication && (socket || req.url.startsWith('http://'))) {
      if (socket) socket.write('HTTP/1.1 407 Proxy Auth Required\r\nProxy-Authenticate: Basic realm="realm"\r\n\r\n');else res.writeHead(407, {
        'proxy-authenticate': 'Basic realm="realm"'
      });
      return Promise.reject(ctx.error = 'authenticate');
    }
  },
  filter: ctx => {
    if (ctx.decision || ctx.req.local) return;
    const url = parse$1((ctx.socket ? 'https://' : '') + ctx.req.url);

    const match = pattern => url.href.search(new RegExp(pattern, 'g')) !== -1;

    try {
      const allow = server$1.whitelist.some(match);
      const deny = server$1.blacklist.some(match); // console.log('allow', allow, 'deny', deny)

      if (!allow && deny) {
        return Promise.reject(ctx.error = 'filter');
      }
    } catch (error) {
      ctx.error = error;
    }
  },
  mitm: {
    request: ctx => new Promise((resolve, reject) => {
      if (ctx.decision === 'close') return reject(ctx.error = ctx.decision);
      const {
        req
      } = ctx;

      if (isHost(req.url, 'bilivideo.com')) {
        req.headers['referer'] = 'https://www.bilibili.com/';
        req.headers['user-agent'] = 'okhttp/3.4.1';
      }

      if (isHost(req.url, 'yt-download.org')) {
        req.headers['referer'] = 'https://www.yt-download.org/';
      }

      const url = parse$1(req.url);
      const options = request.configure(req.method, url, req.headers);
      ctx.proxyReq = request.create(url)(options).on('response', proxyRes => resolve(ctx.proxyRes = proxyRes)).on('error', error => reject(ctx.error = error));
      req.readable ? req.pipe(ctx.proxyReq) : ctx.proxyReq.end(req.body);
    }),
    response: ctx => {
      const {
        res,
        proxyRes
      } = ctx;
      proxyRes.on('error', () => proxy.abort(proxyRes.socket, 'proxyRes'));
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.readable ? proxyRes.pipe(res) : res.end(proxyRes.body);
    },
    close: ctx => {
      proxy.abort(ctx.res.socket, 'mitm');
    }
  },
  tunnel: {
    connect: ctx => new Promise((resolve, reject) => {
      if (ctx.decision === 'close') return reject(ctx.error = ctx.decision);
      const {
        req
      } = ctx;
      const url = parse$1('https://' + req.url);

      if (commonjsGlobal.proxy && !req.local) {
        const options = request.configure(req.method, url, req.headers);
        request.create(proxy)(options).on('connect', (_, proxySocket) => resolve(ctx.proxySocket = proxySocket)).on('error', error => reject(ctx.error = error)).end();
      } else {
        const proxySocket = net.connect(url.port || 443, request.translate(url.hostname)).on('connect', () => resolve(ctx.proxySocket = proxySocket)).on('error', error => reject(ctx.error = error));
      }
    }),
    dock: ctx => new Promise(resolve => {
      const {
        req,
        head,
        socket
      } = ctx;
      socket.once('data', data => resolve(ctx.head = Buffer.concat([head, data]))).write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`);
    }).then(data => ctx.socket.sni = sni(data)).catch(() => {}),
    pipe: ctx => {
      if (ctx.decision === 'blank') return Promise.reject(ctx.error = ctx.decision);
      const {
        head,
        socket,
        proxySocket
      } = ctx;
      proxySocket.on('error', () => proxy.abort(ctx.proxySocket, 'proxySocket'));
      proxySocket.write(head);
      socket.pipe(proxySocket);
      proxySocket.pipe(socket);
    },
    close: ctx => {
      proxy.abort(ctx.socket, 'tunnel');
    }
  }
};
const cert = process.env.SIGN_CERT || path.join(__dirname, '..', 'server.crt');
const key = process.env.SIGN_KEY || path.join(__dirname, '..', 'server.key');
const options = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert)
};
const server$1 = {
  http: require$$1__default['default'].createServer().on('request', proxy.core.mitm).on('connect', proxy.core.tunnel),
  https: require$$2__default['default'].createServer(options).on('request', proxy.core.mitm).on('connect', proxy.core.tunnel)
};
server$1.whitelist = [];
server$1.blacklist = ['://127\\.\\d+\\.\\d+\\.\\d+', '://localhost'];
server$1.authentication = null;
var server_1 = server$1;

const packageJson = require$$0;
const config = cli_1.program({
  name: packageJson.name.replace(/@.+\//, ''),
  version: packageJson.version
}).option(['-v', '--version'], {
  action: 'version'
}).option(['-p', '--port'], {
  metavar: 'port',
  help: 'specify server port'
}).option(['-a', '--address'], {
  metavar: 'address',
  help: 'specify server host'
}).option(['-u', '--proxy-url'], {
  metavar: 'url',
  help: 'request through upstream proxy'
}).option(['-f', '--force-host'], {
  metavar: 'host',
  help: 'force the netease server ip'
}).option(['-o', '--match-order'], {
  metavar: 'source',
  nargs: '+',
  help: 'set priority of sources'
}).option(['-t', '--token'], {
  metavar: 'token',
  help: 'set up proxy authentication'
}).option(['-e', '--endpoint'], {
  metavar: 'url',
  help: 'replace virtual endpoint with public host'
}).option(['-s', '--strict'], {
  action: 'store_true',
  help: 'enable proxy limitation'
}).option(['-h', '--help'], {
  action: 'help'
}).parse(process.argv);
commonjsGlobal.address = config.address;
config.port = (config.port || '8080:8081').split(':').map(string => parseInt(string));

const invalid = value => isNaN(value) || value < 1 || value > 65535;

if (config.port.some(invalid)) {
  console.log('Port must be a number higher than 0 and lower than 65535.');
  process.exit(1);
}

if (config.proxyUrl && !/http(s?):\/\/.+:\d+/.test(config.proxyUrl)) {
  console.log('Please check the proxy url.');
  process.exit(1);
}

if (config.endpoint && !/http(s?):\/\/.+/.test(config.endpoint)) {
  console.log('Please check the endpoint host.');
  process.exit(1);
}

if (config.forceHost && require$$1__default$1['default'].isIP(config.forceHost) === 0) {
  console.log('Please check the server host.');
  process.exit(1);
}

if (config.matchOrder) {
  const provider = Object.keys(consts$1.PROVIDERS);
  const candidate = config.matchOrder;

  if (candidate.some((key, index) => index != candidate.indexOf(key))) {
    console.log('Please check the duplication in match order.');
    process.exit(1);
  } else if (candidate.some(key => !provider.includes(key))) {
    console.log('Please check the availability of match sources.');
    process.exit(1);
  }

  commonjsGlobal.source = candidate;
}

if (config.token && !/\S+:\S+/.test(config.token)) {
  console.log('Please check the authentication token.');
  process.exit(1);
}

const parse = require$$5__default['default'].parse;
const hook = hook_1;
const server = server_1;

const target = Array.from(hook.target.host);
commonjsGlobal.port = config.port;
commonjsGlobal.proxy = config.proxyUrl ? parse(config.proxyUrl) : null;
commonjsGlobal.hosts = target.reduce((result, host) => Object.assign(result, {
  [host]: config.forceHost
}), {});
server.whitelist = ['://[\\w.]*music\\.126\\.net', '://[\\w.]*vod\\.126\\.net'];
if (config.strict) server.blacklist.push('.*');
server.authentication = config.token || null;
commonjsGlobal.endpoint = config.endpoint;
if (config.endpoint) server.whitelist.push(escape(config.endpoint)); // hosts['music.httpdns.c.163.com'] = random(['59.111.181.35', '59.111.181.38'])
// hosts['httpdns.n.netease.com'] = random(['59.111.179.213', '59.111.179.214'])

const dns = host => new Promise((resolve, reject) => require$$7__default['default'].lookup(host, {
  all: true
}, (error, records) => error ? reject(error) : resolve(records.map(record => record.address))));

const httpdns = host => request_1('POST', 'http://music.httpdns.c.163.com/d', {}, host).then(response => response.json()).then(jsonBody => jsonBody.dns.reduce((result, domain) => result.concat(domain.ips), []));

const httpdns2 = host => request_1('GET', 'http://httpdns.n.netease.com/httpdns/v2/d?domain=' + host).then(response => response.json()).then(jsonBody => Object.keys(jsonBody.data).map(key => jsonBody.data[key]).reduce((result, value) => result.concat(value.ip || []), [])); // Allow enabling HTTPDNS queries with `ENABLE_HTTPDNS=true`
// It seems broken - BETTER TO NOT ENABLE IT!


const dnsSource = process.env.ENABLE_HTTPDNS === 'true' ? [httpdns, httpdns2] : [];
Promise.all(dnsSource.map(query => query(target.join(','))).concat(target.map(dns))).then(result => {
  const {
    host
  } = hook.target;
  result.forEach(array => array.forEach(host.add, host));
  server.whitelist = server.whitelist.concat(Array.from(host).map(escape));

  const log = type => console.log(`${['HTTP', 'HTTPS'][type]} Server running @ http://${address || '0.0.0.0'}:${port[type]}`);

  if (port[0]) server.http.listen(port[0], address).once('listening', () => log(0));
  if (port[1]) server.https.listen(port[1], address).once('listening', () => log(1));
}).catch(error => {
  console.log(error);
  process.exit(1);
});

module.exports = app;
