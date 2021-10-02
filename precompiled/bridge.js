#!/usr/bin/node

'use strict';

var require$$0$3 = require('events');
var require$$0$4 = require('os');
var require$$0$1 = require('vm');
var require$$0$2 = require('fs');
var require$$3 = require('util');
var require$$6 = require('url');
var require$$0$5 = require('zlib');
var require$$1 = require('http');
var require$$2 = require('https');
var require$$0$6 = require('crypto');
var require$$2$1 = require('querystring');
var require$$0$7 = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$6 = /*#__PURE__*/_interopDefaultLegacy(require$$0$7);

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

var fails$7 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$6 = fails$7; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$6(function () {
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

var toString$1 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var fails$5 = fails$7;
var classof$4 = classofRaw$1;
var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$4(it) == 'String' ? split.call(it, '') : Object(it);
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

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$f = function (argument) {
  return typeof argument === 'function';
};

var isCallable$e = isCallable$f;

var isObject$7 = function (it) {
  return typeof it === 'object' ? it !== null : isCallable$e(it);
};

var global$h = global$i;
var isCallable$d = isCallable$f;

var aFunction = function (argument) {
  return isCallable$d(argument) ? argument : undefined;
};

var getBuiltIn$h = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$h[namespace]) : global$h[namespace] && global$h[namespace][method];
};

var getBuiltIn$g = getBuiltIn$h;
var engineUserAgent = getBuiltIn$g('navigator', 'userAgent') || '';

var global$g = global$i;
var userAgent$3 = engineUserAgent;
var process$4 = global$g.process;
var Deno = global$g.Deno;
var versions = process$4 && process$4.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version$4;

if (v8) {
  match = v8.split('.');
  version$4 = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version$4 = match[1];
  }
}

var engineV8Version = version$4 && +version$4;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version;
var fails$4 = fails$7; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$4(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var isCallable$c = isCallable$f;
var getBuiltIn$f = getBuiltIn$h;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$f('Symbol');
  return isCallable$c($Symbol) && Object(it) instanceof $Symbol;
};

var tryToString$2 = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$b = isCallable$f;
var tryToString$1 = tryToString$2; // `Assert: IsCallable(argument) is true`

var aCallable$n = function (argument) {
  if (isCallable$b(argument)) return argument;
  throw TypeError(tryToString$1(argument) + ' is not a function');
};

var aCallable$m = aCallable$n; // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$m(func);
};

var isCallable$a = isCallable$f;
var isObject$6 = isObject$7; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$6(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
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
  version: '3.18.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var requireObjectCoercible = requireObjectCoercible$2; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$1 = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var toObject = toObject$1;
var hasOwnProperty = {}.hasOwnProperty;

var has$9 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$2 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$d = global$i;
var shared$2 = shared$3.exports;
var has$8 = has$9;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$d.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$a = function (name) {
  if (!has$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has$8(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore[name];
};

var isObject$5 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$9 = wellKnownSymbol$a;
var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$5(result) || isSymbol$1(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2; // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};

var global$c = global$i;
var isObject$4 = isObject$7;
var document$2 = global$c.document; // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$4(document$2) && isObject$4(document$2.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$2.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$3 = fails$7;
var createElement$1 = documentCreateElement; // Thank's IE8 for his funny defineProperty

var ie8DomDefine = !DESCRIPTORS$5 && !fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var DESCRIPTORS$4 = descriptors;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var has$7 = has$9;
var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has$7(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$3 = isObject$7; // `Assert: Type(argument) is Object`

var anObject$A = function (argument) {
  if (isObject$3(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$z = anObject$A;
var toPropertyKey = toPropertyKey$2; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$3 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$z(O);
  P = toPropertyKey(P);
  anObject$z(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$3 = {exports: {}};

var isCallable$9 = isCallable$f;
var store$1 = sharedStore;
var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$9(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$4 = store$1.inspectSource;

var global$b = global$i;
var isCallable$8 = isCallable$f;
var inspectSource$3 = inspectSource$4;
var WeakMap$1 = global$b.WeakMap;
var nativeWeakMap = isCallable$8(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$a = global$i;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var objectHas = has$9;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$a.WeakMap;
var set$1, get$1, has$6;

var enforce = function (it) {
  return has$6(it) ? get$1(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$2(it) || (state = get$1(it)).type !== TYPE) {
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

  get$1 = function (it) {
    return wmget.call(store, it) || {};
  };

  has$6 = function (it) {
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

  get$1 = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has$6 = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get$1,
  has: has$6,
  enforce: enforce,
  getterFor: getterFor
};

var DESCRIPTORS$1 = descriptors;
var has$5 = has$9;
var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;
var EXISTS = has$5(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || DESCRIPTORS$1 && getDescriptor(FunctionPrototype, 'name').configurable);
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$9 = global$i;
var isCallable$7 = isCallable$f;
var has$4 = has$9;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var setGlobal$1 = setGlobal$3;
var inspectSource$2 = inspectSource$4;
var InternalStateModule$1 = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var getInternalState$1 = InternalStateModule$1.get;
var enforceInternalState = InternalStateModule$1.enforce;
var TEMPLATE = String(String).split('String');
(redefine$3.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable$7(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!has$4(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty$1(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
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
  return isCallable$7(this) && getInternalState$1(this).source || inspectSource$2(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$2 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var toInteger$1 = toInteger$2;
var min$1 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$2 = function (argument) {
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
var toLength$1 = toLength$2;
var toAbsoluteIndex = toAbsoluteIndex$1; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = toLength$1(O.length);
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

var has$3 = has$9;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has$3(hiddenKeys$1, key) && has$3(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has$3(O, key = names[i++])) {
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

var getBuiltIn$e = getBuiltIn$h;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$y = anObject$A; // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$e('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$y(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$2 = has$9;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$2 = fails$7;
var isCallable$6 = isCallable$f;
var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize$1(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$6(detection) ? fails$2(detection) : !!detection;
};

var normalize$1 = isForced$2.normalize = function (string) {
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
  options.name        - the .name of the function if it does not match the key
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

var isCallable$5 = isCallable$f;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument === 'object' || isCallable$5(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var anObject$x = anObject$A;
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
    anObject$x(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty = objectDefineProperty.f;
var has$1 = has$9;
var wellKnownSymbol$8 = wellKnownSymbol$a;
var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');

var setToStringTag$1 = function (it, TAG, STATIC) {
  if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty(it, TO_STRING_TAG$2, {
      configurable: true,
      value: TAG
    });
  }
};

var getBuiltIn$d = getBuiltIn$h;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$7 = wellKnownSymbol$a;
var DESCRIPTORS = descriptors;
var SPECIES$2 = wellKnownSymbol$7('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$d(CONSTRUCTOR_NAME);
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

var anInstance$1 = function (it, Constructor, name) {
  if (it instanceof Constructor) return it;
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
};

var iterators = {};

var wellKnownSymbol$6 = wellKnownSymbol$a;
var Iterators$1 = iterators;
var ITERATOR$2 = wellKnownSymbol$6('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var aCallable$l = aCallable$n; // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aCallable$l(fn);
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
var test = {};
test[TO_STRING_TAG$1] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$4 = isCallable$f;
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


var classof$3 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
};

var classof$2 = classof$3;
var getMethod$1 = getMethod$3;
var Iterators = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$a;
var ITERATOR$1 = wellKnownSymbol$3('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod$1(it, ITERATOR$1) || getMethod$1(it, '@@iterator') || Iterators[classof$2(it)];
};

var aCallable$k = aCallable$n;
var anObject$w = anObject$A;
var getIteratorMethod$1 = getIteratorMethod$2;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$k(iteratorMethod)) return anObject$w(iteratorMethod.call(argument));
  throw TypeError(String(argument) + ' is not iterable');
};

var anObject$v = anObject$A;
var getMethod = getMethod$3;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$v(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
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
  anObject$v(innerResult);
  return value;
};

var anObject$u = anObject$A;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var toLength = toLength$2;
var bind$e = functionBindContext;
var getIterator$1 = getIterator$2;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$q = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$e(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$u(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(String(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
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

var fails$1 = fails$7;
var isCallable$3 = isCallable$f;
var classof$1 = classof$3;
var getBuiltIn$c = getBuiltIn$h;
var inspectSource$1 = inspectSource$4;
var empty = [];
var construct = getBuiltIn$c('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = constructorRegExp.exec;
var INCORRECT_TO_STRING = !constructorRegExp.exec(function () {
  /* empty */
});

var isConstructorModern = function (argument) {
  if (!isCallable$3(argument)) return false;

  try {
    construct(Object, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable$3(argument)) return false;

  switch (classof$1(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource$1(argument));
}; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor


var isConstructor$1 = !construct || fails$1(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor = isConstructor$1;
var tryToString = tryToString$2; // `Assert: IsConstructor(argument) is true`

var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};

var anObject$t = anObject$A;
var aConstructor = aConstructor$1;
var wellKnownSymbol$1 = wellKnownSymbol$a;
var SPECIES$1 = wellKnownSymbol$1('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$a = function (O, defaultConstructor) {
  var C = anObject$t(O).constructor;
  var S;
  return C === undefined || (S = anObject$t(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
};

var getBuiltIn$b = getBuiltIn$h;
var html$1 = getBuiltIn$b('document', 'documentElement');

var userAgent$2 = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var classof = classofRaw$1;
var global$6 = global$i;
var engineIsNode = classof(global$6.process) == 'process';

var global$5 = global$i;
var isCallable$2 = isCallable$f;
var fails = fails$7;
var bind$d = functionBindContext;
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
var location, defer, channel, port;

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
      (isCallable$2(fn) ? fn : Function(fn)).apply(undefined, args);
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
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$d(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$5.addEventListener && isCallable$2(global$5.postMessage) && !global$5.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
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

var userAgent$1 = engineUserAgent;
var global$4 = global$i;
var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$4.Pebble !== undefined;

var userAgent = engineUserAgent;
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

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
var flush$1, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush$1 = function () {
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
    new MutationObserver(flush$1).observe(node, {
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
      then.call(promise, flush$1);
    }; // Node.js without promises

  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush$1);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$3, flush$1);
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

var aCallable$j = aCallable$n;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$j(resolve);
  this.reject = aCallable$j(reject);
}; // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability


newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$s = anObject$A;
var isObject$1 = isObject$7;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$s(C);
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

var perform$1 = function (exec) {
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

var $$t = _export;
var global$1 = global$i;
var getBuiltIn$a = getBuiltIn$h;
var NativePromise = nativePromiseConstructor;
var redefine = redefine$3.exports;
var redefineAll = redefineAll$1;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$1;
var setSpecies = setSpecies$1;
var aCallable$i = aCallable$n;
var isCallable$1 = isCallable$f;
var isObject = isObject$7;
var anInstance = anInstance$1;
var inspectSource = inspectSource$4;
var iterate$p = iterate$q;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var speciesConstructor$9 = speciesConstructor$a;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$1;
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
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global$1.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable$1(global$1.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
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
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable$1(then = it.then) ? then : false;
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
      result = perform(function () {
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

var bind$c = function (fn, state, unwrap) {
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
          then.call(value, bind$c(internalResolve, wrapper, state), bind$c(internalReject, wrapper, state));
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


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aCallable$i(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind$c(internalResolve, state), bind$c(internalReject, state));
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
      var reaction = newPromiseCapability(speciesConstructor$9(this, PromiseConstructor));
      reaction.ok = isCallable$1(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$1(onRejected) && onRejected;
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
    this.resolve = bind$c(internalResolve, state);
    this.reject = bind$c(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (isCallable$1(NativePromise) && NativePromisePrototype !== Object.prototype) {
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

$$t({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn$a(PROMISE); // statics

$$t({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$$t({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});
$$t({
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
    var result = perform(function () {
      var $promiseResolve = aCallable$i(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$p(iterable, function (promise) {
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
    var result = perform(function () {
      var $promiseResolve = aCallable$i(C.resolve);
      iterate$p(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var bridge = {};

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

var aCallable$h = aCallable$n;
var anObject$r = anObject$A; // https://github.com/tc39/collection-methods

var collectionDeleteAll$2 = function () {
  var collection = anObject$r(this);
  var remover = aCallable$h(collection['delete']);
  var allDeleted = true;
  var wasDeleted;

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }

  return !!allDeleted;
};

var $$s = _export;
var IS_PURE$s = isPure;
var collectionDeleteAll$1 = collectionDeleteAll$2; // `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$s({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$s
}, {
  deleteAll: function deleteAll() {
    return collectionDeleteAll$1.apply(this, arguments);
  }
});

var getMapIterator$a = function (it) {
  // eslint-disable-next-line es/no-map -- safe
  return Map.prototype.entries.call(it);
};

var $$r = _export;
var IS_PURE$r = isPure;
var anObject$q = anObject$A;
var bind$b = functionBindContext;
var getMapIterator$9 = getMapIterator$a;
var iterate$o = iterate$q; // `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$r({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$r
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$q(this);
    var iterator = getMapIterator$9(map);
    var boundFunction = bind$b(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate$o(iterator, function (key, value, stop) {
      if (!boundFunction(value, key, map)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$q = _export;
var IS_PURE$q = isPure;
var getBuiltIn$9 = getBuiltIn$h;
var aCallable$g = aCallable$n;
var anObject$p = anObject$A;
var bind$a = functionBindContext;
var speciesConstructor$8 = speciesConstructor$a;
var getMapIterator$8 = getMapIterator$a;
var iterate$n = iterate$q; // `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$q({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$q
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$p(this);
    var iterator = getMapIterator$8(map);
    var boundFunction = bind$a(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor$8(map, getBuiltIn$9('Map')))();
    var setter = aCallable$g(newMap.set);
    iterate$n(iterator, function (key, value) {
      if (boundFunction(value, key, map)) setter.call(newMap, key, value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$p = _export;
var IS_PURE$p = isPure;
var anObject$o = anObject$A;
var bind$9 = functionBindContext;
var getMapIterator$7 = getMapIterator$a;
var iterate$m = iterate$q; // `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$p({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$p
}, {
  find: function find(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$o(this);
    var iterator = getMapIterator$7(map);
    var boundFunction = bind$9(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate$m(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop(value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$o = _export;
var IS_PURE$o = isPure;
var anObject$n = anObject$A;
var bind$8 = functionBindContext;
var getMapIterator$6 = getMapIterator$a;
var iterate$l = iterate$q; // `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods

$$o({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$o
}, {
  findKey: function findKey(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$n(this);
    var iterator = getMapIterator$6(map);
    var boundFunction = bind$8(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate$l(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop(key);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

// https://tc39.es/ecma262/#sec-samevaluezero

var sameValueZero$1 = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x != x && y != y;
};

var $$n = _export;
var IS_PURE$n = isPure;
var anObject$m = anObject$A;
var getMapIterator$5 = getMapIterator$a;
var sameValueZero = sameValueZero$1;
var iterate$k = iterate$q; // `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods

$$n({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$n
}, {
  includes: function includes(searchElement) {
    return iterate$k(getMapIterator$5(anObject$m(this)), function (key, value, stop) {
      if (sameValueZero(value, searchElement)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$m = _export;
var IS_PURE$m = isPure;
var anObject$l = anObject$A;
var getMapIterator$4 = getMapIterator$a;
var iterate$j = iterate$q; // `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods

$$m({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$m
}, {
  keyOf: function keyOf(searchElement) {
    return iterate$j(getMapIterator$4(anObject$l(this)), function (key, value, stop) {
      if (value === searchElement) return stop(key);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$l = _export;
var IS_PURE$l = isPure;
var getBuiltIn$8 = getBuiltIn$h;
var aCallable$f = aCallable$n;
var anObject$k = anObject$A;
var bind$7 = functionBindContext;
var speciesConstructor$7 = speciesConstructor$a;
var getMapIterator$3 = getMapIterator$a;
var iterate$i = iterate$q; // `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods

$$l({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$l
}, {
  mapKeys: function mapKeys(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$k(this);
    var iterator = getMapIterator$3(map);
    var boundFunction = bind$7(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor$7(map, getBuiltIn$8('Map')))();
    var setter = aCallable$f(newMap.set);
    iterate$i(iterator, function (key, value) {
      setter.call(newMap, boundFunction(value, key, map), value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$k = _export;
var IS_PURE$k = isPure;
var getBuiltIn$7 = getBuiltIn$h;
var aCallable$e = aCallable$n;
var anObject$j = anObject$A;
var bind$6 = functionBindContext;
var speciesConstructor$6 = speciesConstructor$a;
var getMapIterator$2 = getMapIterator$a;
var iterate$h = iterate$q; // `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods

$$k({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$k
}, {
  mapValues: function mapValues(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$j(this);
    var iterator = getMapIterator$2(map);
    var boundFunction = bind$6(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor$6(map, getBuiltIn$7('Map')))();
    var setter = aCallable$e(newMap.set);
    iterate$h(iterator, function (key, value) {
      setter.call(newMap, key, boundFunction(value, key, map));
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$j = _export;
var IS_PURE$j = isPure;
var aCallable$d = aCallable$n;
var anObject$i = anObject$A;
var iterate$g = iterate$q; // `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods

$$j({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$j
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable
  /* ...iterbles */
  ) {
    var map = anObject$i(this);
    var setter = aCallable$d(map.set);
    var argumentsLength = arguments.length;
    var i = 0;

    while (i < argumentsLength) {
      iterate$g(arguments[i++], setter, {
        that: map,
        AS_ENTRIES: true
      });
    }

    return map;
  }
});

var $$i = _export;
var IS_PURE$i = isPure;
var anObject$h = anObject$A;
var aCallable$c = aCallable$n;
var getMapIterator$1 = getMapIterator$a;
var iterate$f = iterate$q; // `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$i({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$i
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    var map = anObject$h(this);
    var iterator = getMapIterator$1(map);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable$c(callbackfn);
    iterate$f(iterator, function (key, value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    if (noInitial) throw TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});

var $$h = _export;
var IS_PURE$h = isPure;
var anObject$g = anObject$A;
var bind$5 = functionBindContext;
var getMapIterator = getMapIterator$a;
var iterate$e = iterate$q; // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$h({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$h
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    var map = anObject$g(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind$5(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate$e(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$g = _export;
var IS_PURE$g = isPure;
var anObject$f = anObject$A;
var aCallable$b = aCallable$n; // `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods

$$g({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$g
}, {
  update: function update(key, callback
  /* , thunk */
  ) {
    var map = anObject$f(this);
    var length = arguments.length;
    aCallable$b(callback);
    var isPresentInMap = map.has(key);

    if (!isPresentInMap && length < 3) {
      throw TypeError('Updating absent value');
    }

    var value = isPresentInMap ? map.get(key) : aCallable$b(length > 2 ? arguments[2] : undefined)(key, map);
    map.set(key, callback(value, key, map));
    return map;
  }
});

var aCallable$a = aCallable$n;
var anObject$e = anObject$A; // https://github.com/tc39/collection-methods

var collectionAddAll$1 = function () {
  var set = anObject$e(this);
  var adder = aCallable$a(set.add);

  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k]);
  }

  return set;
};

var $$f = _export;
var IS_PURE$f = isPure;
var collectionAddAll = collectionAddAll$1; // `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods

$$f({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$f
}, {
  addAll: function addAll() {
    return collectionAddAll.apply(this, arguments);
  }
});

var $$e = _export;
var IS_PURE$e = isPure;
var collectionDeleteAll = collectionDeleteAll$2; // `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$e({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$e
}, {
  deleteAll: function deleteAll() {
    return collectionDeleteAll.apply(this, arguments);
  }
});

var $$d = _export;
var IS_PURE$d = isPure;
var getBuiltIn$6 = getBuiltIn$h;
var aCallable$9 = aCallable$n;
var anObject$d = anObject$A;
var speciesConstructor$5 = speciesConstructor$a;
var iterate$d = iterate$q; // `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods

$$d({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$d
}, {
  difference: function difference(iterable) {
    var set = anObject$d(this);
    var newSet = new (speciesConstructor$5(set, getBuiltIn$6('Set')))(set);
    var remover = aCallable$9(newSet['delete']);
    iterate$d(iterable, function (value) {
      remover.call(newSet, value);
    });
    return newSet;
  }
});

var getSetIterator$7 = function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return Set.prototype.values.call(it);
};

var $$c = _export;
var IS_PURE$c = isPure;
var anObject$c = anObject$A;
var bind$4 = functionBindContext;
var getSetIterator$6 = getSetIterator$7;
var iterate$c = iterate$q; // `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$c({
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
    return !iterate$c(iterator, function (value, stop) {
      if (!boundFunction(value, value, set)) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$b = _export;
var IS_PURE$b = isPure;
var getBuiltIn$5 = getBuiltIn$h;
var aCallable$8 = aCallable$n;
var anObject$b = anObject$A;
var bind$3 = functionBindContext;
var speciesConstructor$4 = speciesConstructor$a;
var getSetIterator$5 = getSetIterator$7;
var iterate$b = iterate$q; // `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$b({
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
    var newSet = new (speciesConstructor$4(set, getBuiltIn$5('Set')))();
    var adder = aCallable$8(newSet.add);
    iterate$b(iterator, function (value) {
      if (boundFunction(value, value, set)) adder.call(newSet, value);
    }, {
      IS_ITERATOR: true
    });
    return newSet;
  }
});

var $$a = _export;
var IS_PURE$a = isPure;
var anObject$a = anObject$A;
var bind$2 = functionBindContext;
var getSetIterator$4 = getSetIterator$7;
var iterate$a = iterate$q; // `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$a({
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
    return iterate$a(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop(value);
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$9 = _export;
var IS_PURE$9 = isPure;
var getBuiltIn$4 = getBuiltIn$h;
var aCallable$7 = aCallable$n;
var anObject$9 = anObject$A;
var speciesConstructor$3 = speciesConstructor$a;
var iterate$9 = iterate$q; // `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods

$$9({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$9
}, {
  intersection: function intersection(iterable) {
    var set = anObject$9(this);
    var newSet = new (speciesConstructor$3(set, getBuiltIn$4('Set')))();
    var hasCheck = aCallable$7(set.has);
    var adder = aCallable$7(newSet.add);
    iterate$9(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});

var $$8 = _export;
var IS_PURE$8 = isPure;
var aCallable$6 = aCallable$n;
var anObject$8 = anObject$A;
var iterate$8 = iterate$q; // `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

$$8({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$8
}, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject$8(this);
    var hasCheck = aCallable$6(set.has);
    return !iterate$8(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === true) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$7 = _export;
var IS_PURE$7 = isPure;
var getBuiltIn$3 = getBuiltIn$h;
var aCallable$5 = aCallable$n;
var isCallable = isCallable$f;
var anObject$7 = anObject$A;
var getIterator = getIterator$2;
var iterate$7 = iterate$q; // `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf

$$7({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$7
}, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject$7(iterable);
    var hasCheck = otherSet.has;

    if (!isCallable(hasCheck)) {
      otherSet = new (getBuiltIn$3('Set'))(iterable);
      hasCheck = aCallable$5(otherSet.has);
    }

    return !iterate$7(iterator, function (value, stop) {
      if (hasCheck.call(otherSet, value) === false) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$6 = _export;
var IS_PURE$6 = isPure;
var aCallable$4 = aCallable$n;
var anObject$6 = anObject$A;
var iterate$6 = iterate$q; // `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

$$6({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$6
}, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject$6(this);
    var hasCheck = aCallable$4(set.has);
    return !iterate$6(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === false) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$5 = _export;
var IS_PURE$5 = isPure;
var anObject$5 = anObject$A;
var getSetIterator$3 = getSetIterator$7;
var iterate$5 = iterate$q; // `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods

$$5({
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
    iterate$5(iterator, result.push, {
      that: result,
      IS_ITERATOR: true
    });
    return result.join(sep);
  }
});

var $$4 = _export;
var IS_PURE$4 = isPure;
var getBuiltIn$2 = getBuiltIn$h;
var aCallable$3 = aCallable$n;
var anObject$4 = anObject$A;
var bind$1 = functionBindContext;
var speciesConstructor$2 = speciesConstructor$a;
var getSetIterator$2 = getSetIterator$7;
var iterate$4 = iterate$q; // `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods

$$4({
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
    var newSet = new (speciesConstructor$2(set, getBuiltIn$2('Set')))();
    var adder = aCallable$3(newSet.add);
    iterate$4(iterator, function (value) {
      adder.call(newSet, boundFunction(value, value, set));
    }, {
      IS_ITERATOR: true
    });
    return newSet;
  }
});

var $$3 = _export;
var IS_PURE$3 = isPure;
var aCallable$2 = aCallable$n;
var anObject$3 = anObject$A;
var getSetIterator$1 = getSetIterator$7;
var iterate$3 = iterate$q; // `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$3({
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
    aCallable$2(callbackfn);
    iterate$3(iterator, function (value) {
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

var $$2 = _export;
var IS_PURE$2 = isPure;
var anObject$2 = anObject$A;
var bind = functionBindContext;
var getSetIterator = getSetIterator$7;
var iterate$2 = iterate$q; // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$2({
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
    return iterate$2(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop();
    }, {
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$1 = _export;
var IS_PURE$1 = isPure;
var getBuiltIn$1 = getBuiltIn$h;
var aCallable$1 = aCallable$n;
var anObject$1 = anObject$A;
var speciesConstructor$1 = speciesConstructor$a;
var iterate$1 = iterate$q; // `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods

$$1({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$1
}, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject$1(this);
    var newSet = new (speciesConstructor$1(set, getBuiltIn$1('Set')))(set);
    var remover = aCallable$1(newSet['delete']);
    var adder = aCallable$1(newSet.add);
    iterate$1(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});

var $ = _export;
var IS_PURE = isPure;
var getBuiltIn = getBuiltIn$h;
var aCallable = aCallable$n;
var anObject = anObject$A;
var speciesConstructor = speciesConstructor$a;
var iterate = iterate$q; // `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods

$({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE
}, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    iterate(iterable, aCallable(newSet.add), {
      that: newSet
    });
    return newSet;
  }
});

var pino$2 = {exports: {}};

var err = errSerializer$1;
const {
  toString
} = Object.prototype;
const seen = Symbol('circular-ref-tag');
const rawSymbol$2 = Symbol('pino-raw-err-ref');
const pinoErrProto = Object.create({}, {
  type: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  message: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  stack: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$2];
    },
    set: function (val) {
      this[rawSymbol$2] = val;
    }
  }
});
Object.defineProperty(pinoErrProto, rawSymbol$2, {
  writable: true,
  value: {}
});

function errSerializer$1(err) {
  if (!(err instanceof Error)) {
    return err;
  }

  err[seen] = undefined; // tag to prevent re-looking at this

  const _err = Object.create(pinoErrProto);

  _err.type = toString.call(err.constructor) === '[object Function]' ? err.constructor.name : err.name;
  _err.message = err.message;
  _err.stack = err.stack;

  for (const key in err) {
    if (_err[key] === undefined) {
      const val = err[key];

      if (val instanceof Error) {
        /* eslint-disable no-prototype-builtins */
        if (!val.hasOwnProperty(seen)) {
          _err[key] = errSerializer$1(val);
        }
      } else {
        _err[key] = val;
      }
    }
  }

  delete err[seen]; // clean up tag in case err is serialized again later

  _err.raw = err;
  return _err;
}

var req = {
  mapHttpRequest: mapHttpRequest$1,
  reqSerializer
};
const rawSymbol$1 = Symbol('pino-raw-req-ref');
const pinoReqProto = Object.create({}, {
  id: {
    enumerable: true,
    writable: true,
    value: ''
  },
  method: {
    enumerable: true,
    writable: true,
    value: ''
  },
  url: {
    enumerable: true,
    writable: true,
    value: ''
  },
  query: {
    enumerable: true,
    writable: true,
    value: ''
  },
  params: {
    enumerable: true,
    writable: true,
    value: ''
  },
  headers: {
    enumerable: true,
    writable: true,
    value: {}
  },
  remoteAddress: {
    enumerable: true,
    writable: true,
    value: ''
  },
  remotePort: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol$1];
    },
    set: function (val) {
      this[rawSymbol$1] = val;
    }
  }
});
Object.defineProperty(pinoReqProto, rawSymbol$1, {
  writable: true,
  value: {}
});

function reqSerializer(req) {
  // req.info is for hapi compat.
  const connection = req.info || req.socket;

  const _req = Object.create(pinoReqProto);

  _req.id = typeof req.id === 'function' ? req.id() : req.id || (req.info ? req.info.id : undefined);
  _req.method = req.method; // req.originalUrl is for expressjs compat.

  if (req.originalUrl) {
    _req.url = req.originalUrl;
    _req.query = req.query;
    _req.params = req.params;
  } else {
    // req.url.path is  for hapi compat.
    _req.url = req.path || (req.url ? req.url.path || req.url : undefined);
  }

  _req.headers = req.headers;
  _req.remoteAddress = connection && connection.remoteAddress;
  _req.remotePort = connection && connection.remotePort; // req.raw is  for hapi compat/equivalence

  _req.raw = req.raw || req;
  return _req;
}

function mapHttpRequest$1(req) {
  return {
    req: reqSerializer(req)
  };
}

var res = {
  mapHttpResponse: mapHttpResponse$1,
  resSerializer
};
const rawSymbol = Symbol('pino-raw-res-ref');
const pinoResProto = Object.create({}, {
  statusCode: {
    enumerable: true,
    writable: true,
    value: 0
  },
  headers: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol];
    },
    set: function (val) {
      this[rawSymbol] = val;
    }
  }
});
Object.defineProperty(pinoResProto, rawSymbol, {
  writable: true,
  value: {}
});

function resSerializer(res) {
  const _res = Object.create(pinoResProto);

  _res.statusCode = res.statusCode;
  _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
  _res.raw = res;
  return _res;
}

function mapHttpResponse$1(res) {
  return {
    res: resSerializer(res)
  };
}

const errSerializer = err;
const reqSerializers = req;
const resSerializers = res;
var pinoStdSerializers = {
  err: errSerializer,
  mapHttpRequest: reqSerializers.mapHttpRequest,
  mapHttpResponse: resSerializers.mapHttpResponse,
  req: reqSerializers.reqSerializer,
  res: resSerializers.resSerializer,
  wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
    if (customSerializer === errSerializer) return customSerializer;
    return function wrapErrSerializer(err) {
      return customSerializer(errSerializer(err));
    };
  },
  wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
    if (customSerializer === reqSerializers.reqSerializer) return customSerializer;
    return function wrappedReqSerializer(req) {
      return customSerializer(reqSerializers.reqSerializer(req));
    };
  },
  wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
    if (customSerializer === resSerializers.resSerializer) return customSerializer;
    return function wrappedResSerializer(res) {
      return customSerializer(resSerializers.resSerializer(res));
    };
  }
};

const {
  createContext,
  runInContext
} = require$$0__default["default"];
var validator_1 = validator$2;

function validator$2(opts = {}) {
  const {
    ERR_PATHS_MUST_BE_STRINGS = () => 'fast-redact - Paths must be (non-empty) strings',
    ERR_INVALID_PATH = s => `fast-redact – Invalid path (${s})`
  } = opts;
  return function validate({
    paths
  }) {
    paths.forEach(s => {
      if (typeof s !== 'string') {
        throw Error(ERR_PATHS_MUST_BE_STRINGS());
      }

      try {
        if (/〇/.test(s)) throw Error();
        const proxy = new Proxy({}, {
          get: () => proxy,
          set: () => {
            throw Error();
          }
        });
        const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]');
        if (/\n|\r|;/.test(expr)) throw Error();
        if (/\/\*/.test(expr)) throw Error();
        runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, createContext({
          o: proxy,
          〇: null
        }), {
          codeGeneration: {
            strings: false,
            wasm: false
          }
        });
      } catch (e) {
        throw Error(ERR_INVALID_PATH(s));
      }
    });
  };
}

var rx$4 = /[^.[\]]+|\[((?:.)*?)\]/g;

const rx$3 = rx$4;
var parse_1 = parse$4;

function parse$4({
  paths
}) {
  const wildcards = [];
  var wcLen = 0;
  const secret = paths.reduce(function (o, strPath, ix) {
    var path = strPath.match(rx$3).map(p => p.replace(/'|"|`/g, ''));
    const leadingBracket = strPath[0] === '[';
    path = path.map(p => {
      if (p[0] === '[') return p.substr(1, p.length - 2);else return p;
    });
    const star = path.indexOf('*');

    if (star > -1) {
      const before = path.slice(0, star);
      const beforeStr = before.join('.');
      const after = path.slice(star + 1, path.length);
      if (after.indexOf('*') > -1) throw Error('fast-redact – Only one wildcard per path is supported');
      const nested = after.length > 0;
      wcLen++;
      wildcards.push({
        before,
        beforeStr,
        after,
        nested
      });
    } else {
      o[strPath] = {
        path: path,
        val: undefined,
        precensored: false,
        circle: '',
        escPath: JSON.stringify(strPath),
        leadingBracket: leadingBracket
      };
    }

    return o;
  }, {});
  return {
    wildcards,
    wcLen,
    secret
  };
}

const rx$2 = rx$4;
var redactor_1 = redactor$1;

function redactor$1({
  secret,
  serialize,
  wcLen,
  strict,
  isCensorFct,
  censorFctTakesPath
}, state) {
  /* eslint-disable-next-line */
  const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${resultTmpl(serialize)}
  `).bind(state);

  if (serialize === false) {
    redact.restore = o => state.restore(o);
  }

  return redact;
}

function redactTmpl(secret, isCensorFct, censorFctTakesPath) {
  return Object.keys(secret).map(path => {
    const {
      escPath,
      leadingBracket,
      path: arrPath
    } = secret[path];
    const skip = leadingBracket ? 1 : 0;
    const delim = leadingBracket ? '' : '.';
    const hops = [];
    var match;

    while ((match = rx$2.exec(path)) !== null) {
      const [, ix] = match;
      const {
        index,
        input
      } = match;
      if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
    }

    var existence = hops.map(p => `o${delim}${p}`).join(' && ');
    if (existence.length === 0) existence += `o${delim}${path} != null`;else existence += ` && o${delim}${path} != null`;
    const circularDetection = `
      switch (true) {
        ${hops.reverse().map(p => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join('\n')}
      }
    `;
    const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
    return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `;
  }).join('\n');
}

function dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
  return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : '';
}

function resultTmpl(serialize) {
  return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
}

function strictImpl(strict, serialize) {
  return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
}

var modifiers = {
  groupRedact: groupRedact$1,
  groupRestore: groupRestore$1,
  nestedRedact: nestedRedact$1,
  nestedRestore: nestedRestore$1
};

function groupRestore$1({
  keys,
  values,
  target
}) {
  if (target == null) return;
  const length = keys.length;

  for (var i = 0; i < length; i++) {
    const k = keys[i];
    target[k] = values[i];
  }
}

function groupRedact$1(o, path, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path);
  if (target == null) return {
    keys: null,
    values: null,
    target: null,
    flat: true
  };
  const keys = Object.keys(target);
  const keysLength = keys.length;
  const pathLength = path.length;
  const pathWithKey = censorFctTakesPath ? [...path] : undefined;
  const values = new Array(keysLength);

  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    values[i] = target[key];

    if (censorFctTakesPath) {
      pathWithKey[pathLength] = key;
      target[key] = censor(target[key], pathWithKey);
    } else if (isCensorFct) {
      target[key] = censor(target[key]);
    } else {
      target[key] = censor;
    }
  }

  return {
    keys,
    values,
    target,
    flat: true
  };
}

function nestedRestore$1(arr) {
  const length = arr.length;

  for (var i = 0; i < length; i++) {
    const {
      key,
      target,
      value
    } = arr[i];
    target[key] = value;
  }
}

function nestedRedact$1(store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path);
  if (target == null) return;
  const keys = Object.keys(target);
  const keysLength = keys.length;

  for (var i = 0; i < keysLength; i++) {
    const key = keys[i];
    const {
      value,
      parent,
      exists
    } = specialSet(target, key, path, ns, censor, isCensorFct, censorFctTakesPath);

    if (exists === true && parent !== null) {
      store.push({
        key: ns[ns.length - 1],
        target: parent,
        value
      });
    }
  }

  return store;
}

function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function specialSet(o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
  const afterPathLen = afterPath.length;
  const lastPathIndex = afterPathLen - 1;
  const originalKey = k;
  var i = -1;
  var n;
  var nv;
  var ov;
  var oov = null;
  var exists = true;
  ov = n = o[k];
  if (typeof n !== 'object') return {
    value: null,
    parent: null,
    exists
  };

  while (n != null && ++i < afterPathLen) {
    k = afterPath[i];
    oov = ov;

    if (!(k in n)) {
      exists = false;
      break;
    }

    ov = n[k];
    nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
    n[k] = has(n, k) && nv === ov || nv === undefined && censor !== undefined ? n[k] : nv;
    n = n[k];
    if (typeof n !== 'object') break;
  }

  return {
    value: ov,
    parent: oov,
    exists
  };
}

function get(o, p) {
  var i = -1;
  var l = p.length;
  var n = o;

  while (n != null && ++i < l) {
    n = n[p[i]];
  }

  return n;
}

const {
  groupRestore,
  nestedRestore
} = modifiers;
var restorer_1 = restorer$1;

function restorer$1({
  secret,
  wcLen
}) {
  return function compileRestore() {
    if (this.restore) return;
    const paths = Object.keys(secret);
    const resetters = resetTmpl(secret, paths);
    const hasWildcards = wcLen > 0;
    const state = hasWildcards ? {
      secret,
      groupRestore,
      nestedRestore
    } : {
      secret
    };
    /* eslint-disable-next-line */

    this.restore = Function('o', restoreTmpl(resetters, paths, hasWildcards)).bind(state);
  };
}
/**
 * Mutates the original object to be censored by restoring its original values
 * prior to censoring.
 *
 * @param {object} secret Compiled object describing which target fields should
 * be censored and the field states.
 * @param {string[]} paths The list of paths to censor as provided at
 * initialization time.
 *
 * @returns {string} String of JavaScript to be used by `Function()`. The
 * string compiles to the function that does the work in the description.
 */


function resetTmpl(secret, paths) {
  return paths.map(path => {
    const {
      circle,
      escPath,
      leadingBracket
    } = secret[path];
    const delim = leadingBracket ? '' : '.';
    const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path} = secret[${escPath}].val`;
    const clear = `secret[${escPath}].val = undefined`;
    return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
  }).join('');
}
/**
 * Creates the body of the restore function
 *
 * Restoration of the redacted object happens
 * backwards, in reverse order of redactions,
 * so that repeated redactions on the same object
 * property can be eventually rolled back to the
 * original value.
 *
 * This way dynamic redactions are restored first,
 * starting from the last one working backwards and
 * followed by the static ones.
 *
 * @returns {string} the body of the restore function
 */


function restoreTmpl(resetters, paths, hasWildcards) {
  const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : '';
  return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
}

var state_1 = state$1;

function state$1(o) {
  const {
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  } = o;
  const builder = [{
    secret,
    censor,
    compileRestore
  }];
  if (serialize !== false) builder.push({
    serialize
  });
  if (wcLen > 0) builder.push({
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  });
  return Object.assign(...builder);
}

const validator$1 = validator_1;
const parse$3 = parse_1;
const redactor = redactor_1;
const restorer = restorer_1;
const {
  groupRedact,
  nestedRedact
} = modifiers;
const state = state_1;
const rx$1 = rx$4;
const validate$1 = validator$1();

const noop$3 = o => o;

noop$3.restore = noop$3;
const DEFAULT_CENSOR = '[REDACTED]';
fastRedact$1.rx = rx$1;
fastRedact$1.validator = validator$1;
var fastRedact_1 = fastRedact$1;

function fastRedact$1(opts = {}) {
  const paths = Array.from(new Set(opts.paths || []));
  const serialize = 'serialize' in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify : JSON.stringify;
  const remove = opts.remove;

  if (remove === true && serialize !== JSON.stringify) {
    throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify');
  }

  const censor = remove === true ? undefined : 'censor' in opts ? opts.censor : DEFAULT_CENSOR;
  const isCensorFct = typeof censor === 'function';
  const censorFctTakesPath = isCensorFct && censor.length > 1;
  if (paths.length === 0) return serialize || noop$3;
  validate$1({
    paths,
    serialize,
    censor
  });
  const {
    wildcards,
    wcLen,
    secret
  } = parse$3({
    paths,
    censor
  });
  const compileRestore = restorer({
    secret,
    wcLen
  });
  const strict = 'strict' in opts ? opts.strict : true;
  return redactor({
    secret,
    wcLen,
    serialize,
    strict,
    isCensorFct,
    censorFctTakesPath
  }, state({
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  }));
}

const setLevelSym$2 = Symbol('pino.setLevel');
const getLevelSym$1 = Symbol('pino.getLevel');
const levelValSym$2 = Symbol('pino.levelVal');
const useLevelLabelsSym = Symbol('pino.useLevelLabels');
const useOnlyCustomLevelsSym$3 = Symbol('pino.useOnlyCustomLevels');
const mixinSym$2 = Symbol('pino.mixin');
const lsCacheSym$3 = Symbol('pino.lsCache');
const chindingsSym$3 = Symbol('pino.chindings');
const parsedChindingsSym$2 = Symbol('pino.parsedChindings');
const asJsonSym$1 = Symbol('pino.asJson');
const writeSym$2 = Symbol('pino.write');
const redactFmtSym$4 = Symbol('pino.redactFmt');
const timeSym$2 = Symbol('pino.time');
const timeSliceIndexSym$2 = Symbol('pino.timeSliceIndex');
const streamSym$4 = Symbol('pino.stream');
const stringifySym$3 = Symbol('pino.stringify');
const stringifiersSym$3 = Symbol('pino.stringifiers');
const endSym$2 = Symbol('pino.end');
const formatOptsSym$3 = Symbol('pino.formatOpts');
const messageKeySym$2 = Symbol('pino.messageKey');
const nestedKeySym$2 = Symbol('pino.nestedKey');
const wildcardFirstSym$2 = Symbol('pino.wildcardFirst'); // public symbols, no need to use the same pino
// version for these

const serializersSym$3 = Symbol.for('pino.serializers');
const formattersSym$4 = Symbol.for('pino.formatters');
const hooksSym$2 = Symbol.for('pino.hooks');
const needsMetadataGsym$2 = Symbol.for('pino.metadata');
var symbols$1 = {
  setLevelSym: setLevelSym$2,
  getLevelSym: getLevelSym$1,
  levelValSym: levelValSym$2,
  useLevelLabelsSym,
  mixinSym: mixinSym$2,
  lsCacheSym: lsCacheSym$3,
  chindingsSym: chindingsSym$3,
  parsedChindingsSym: parsedChindingsSym$2,
  asJsonSym: asJsonSym$1,
  writeSym: writeSym$2,
  serializersSym: serializersSym$3,
  redactFmtSym: redactFmtSym$4,
  timeSym: timeSym$2,
  timeSliceIndexSym: timeSliceIndexSym$2,
  streamSym: streamSym$4,
  stringifySym: stringifySym$3,
  stringifiersSym: stringifiersSym$3,
  endSym: endSym$2,
  formatOptsSym: formatOptsSym$3,
  messageKeySym: messageKeySym$2,
  nestedKeySym: nestedKeySym$2,
  wildcardFirstSym: wildcardFirstSym$2,
  needsMetadataGsym: needsMetadataGsym$2,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$3,
  formattersSym: formattersSym$4,
  hooksSym: hooksSym$2
};

const fastRedact = fastRedact_1;
const {
  redactFmtSym: redactFmtSym$3,
  wildcardFirstSym: wildcardFirstSym$1
} = symbols$1;
const {
  rx,
  validator
} = fastRedact;
const validate = validator({
  ERR_PATHS_MUST_BE_STRINGS: () => 'pino – redacted paths must be strings',
  ERR_INVALID_PATH: s => `pino – redact paths array contains an invalid path (${s})`
});
const CENSOR = '[Redacted]';
const strict = false; // TODO should this be configurable?

function redaction$2(opts, serialize) {
  const {
    paths,
    censor
  } = handle(opts);
  const shape = paths.reduce((o, str) => {
    rx.lastIndex = 0;
    const first = rx.exec(str);
    const next = rx.exec(str); // ns is the top-level path segment, brackets + quoting removed.

    let ns = first[1] !== undefined ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1') : first[0];

    if (ns === '*') {
      ns = wildcardFirstSym$1;
    } // top level key:


    if (next === null) {
      o[ns] = null;
      return o;
    } // path with at least two segments:
    // if ns is already redacted at the top level, ignore lower level redactions


    if (o[ns] === null) {
      return o;
    }

    const {
      index
    } = next;
    const nextPath = `${str.substr(index, str.length - 1)}`;
    o[ns] = o[ns] || []; // shape is a mix of paths beginning with literal values and wildcard
    // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
    // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
    // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
    // (* entry has wildcardFirstSym as key)

    if (ns !== wildcardFirstSym$1 && o[ns].length === 0) {
      // first time ns's get all '*' redactions so far
      o[ns].push(...(o[wildcardFirstSym$1] || []));
    }

    if (ns === wildcardFirstSym$1) {
      // new * path gets added to all previously registered literal ns's.
      Object.keys(o).forEach(function (k) {
        if (o[k]) {
          o[k].push(nextPath);
        }
      });
    }

    o[ns].push(nextPath);
    return o;
  }, {}); // the redactor assigned to the format symbol key
  // provides top level redaction for instances where
  // an object is interpolated into the msg string

  const result = {
    [redactFmtSym$3]: fastRedact({
      paths,
      censor,
      serialize,
      strict
    })
  };

  const topCensor = (...args) => {
    return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor);
  };

  return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
    // top level key:
    if (shape[k] === null) {
      o[k] = value => topCensor(value, [k]);
    } else {
      const wrappedCensor = typeof censor === 'function' ? (value, path) => {
        return censor(value, [k, ...path]);
      } : censor;
      o[k] = fastRedact({
        paths: shape[k],
        censor: wrappedCensor,
        serialize,
        strict
      });
    }

    return o;
  }, result);
}

function handle(opts) {
  if (Array.isArray(opts)) {
    opts = {
      paths: opts,
      censor: CENSOR
    };
    validate(opts);
    return opts;
  }

  let {
    paths,
    censor = CENSOR,
    remove
  } = opts;

  if (Array.isArray(paths) === false) {
    throw Error('pino – redact must contain an array of strings');
  }

  if (remove === true) censor = undefined;
  validate({
    paths,
    censor
  });
  return {
    paths,
    censor
  };
}

var redaction_1 = redaction$2;

const nullTime$1 = () => '';

const epochTime$1 = () => `,"time":${Date.now()}`;

const unixTime = () => `,"time":${Math.round(Date.now() / 1000.0)}`;

const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`; // using Date.now() for testability


var time$1 = {
  nullTime: nullTime$1,
  epochTime: epochTime$1,
  unixTime,
  isoTime
};

// but take a look at the commit history first,
// this is a moving target so relying on the module
// is the best way to make sure the optimization
// method is kept up to date and compatible with
// every Node version.


function flatstr$2(s) {
  return s;
}

var flatstr_1 = flatstr$2;

var atomicSleep = {exports: {}};

/* global SharedArrayBuffer, Atomics */


if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
  const nil = new Int32Array(new SharedArrayBuffer(4));

  function sleep(ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity;

    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number');
      }

      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity');
    }

    Atomics.wait(nil, 0, 0, Number(ms));
  }

  atomicSleep.exports = sleep;
} else {
  function sleep(ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity;

    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number');
      }

      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity');
    }
  }

  atomicSleep.exports = sleep;
}

const fs = require$$0__default$1["default"];
const EventEmitter$3 = require$$0__default$2["default"];
const inherits = require$$3__default["default"].inherits;
const BUSY_WRITE_TIMEOUT = 100;
const sleep = atomicSleep.exports; // 16 MB - magic number
// This constant ensures that SonicBoom only needs
// 32 MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.

const MAX_WRITE = 16 * 1024 * 1024;

function openFile(file, sonic) {
  sonic._opening = true;
  sonic._writing = true;
  sonic._asyncDrainScheduled = false; // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
  // for sync mode, there is no way to add a listener that will receive these

  function fileOpened(err, fd) {
    if (err) {
      sonic._reopening = false;
      sonic._writing = false;
      sonic._opening = false;

      if (sonic.sync) {
        process.nextTick(() => {
          if (sonic.listenerCount('error') > 0) {
            sonic.emit('error', err);
          }
        });
      } else {
        sonic.emit('error', err);
      }

      return;
    }

    sonic.fd = fd;
    sonic.file = file;
    sonic._reopening = false;
    sonic._opening = false;
    sonic._writing = false;

    if (sonic.sync) {
      process.nextTick(() => sonic.emit('ready'));
    } else {
      sonic.emit('ready');
    }

    if (sonic._reopening) {
      return;
    } // start


    const len = sonic._buf.length;

    if (len > 0 && len > sonic.minLength && !sonic.destroyed) {
      actualWrite(sonic);
    }
  }

  if (sonic.sync) {
    try {
      const fd = fs.openSync(file, 'a');
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err;
    }
  } else {
    fs.open(file, 'a', fileOpened);
  }
}

function SonicBoom$2(opts) {
  if (!(this instanceof SonicBoom$2)) {
    return new SonicBoom$2(opts);
  }

  let {
    fd,
    dest,
    minLength,
    sync
  } = opts || {};
  fd = fd || dest;
  this._buf = '';
  this.fd = -1;
  this._writing = false;
  this._writingBuf = '';
  this._ending = false;
  this._reopening = false;
  this._asyncDrainScheduled = false;
  this.file = null;
  this.destroyed = false;
  this.sync = sync || false;
  this.minLength = minLength || 0;

  if (typeof fd === 'number') {
    this.fd = fd;
    process.nextTick(() => this.emit('ready'));
  } else if (typeof fd === 'string') {
    openFile(fd, this);
  } else {
    throw new Error('SonicBoom supports only file descriptors and files');
  }

  this.release = (err, n) => {
    if (err) {
      if (err.code === 'EAGAIN') {
        if (this.sync) {
          // This error code should not happen in sync mode, because it is
          // not using the underlining operating system asynchronous functions.
          // However it happens, and so we handle it.
          // Ref: https://github.com/pinojs/pino/issues/783
          try {
            sleep(BUSY_WRITE_TIMEOUT);
            this.release(undefined, 0);
          } catch (err) {
            this.release(err);
          }
        } else {
          // Let's give the destination some time to process the chunk.
          setTimeout(() => {
            fs.write(this.fd, this._writingBuf, 'utf8', this.release);
          }, BUSY_WRITE_TIMEOUT);
        }
      } else {
        // The error maybe recoverable later, so just put data back to this._buf
        this._buf = this._writingBuf + this._buf;
        this._writingBuf = '';
        this._writing = false;
        this.emit('error', err);
      }

      return;
    }

    if (this._writingBuf.length !== n) {
      this._writingBuf = this._writingBuf.slice(n);

      if (this.sync) {
        try {
          do {
            n = fs.writeSync(this.fd, this._writingBuf, 'utf8');
            this._writingBuf = this._writingBuf.slice(n);
          } while (this._writingBuf.length !== 0);
        } catch (err) {
          this.release(err);
          return;
        }
      } else {
        fs.write(this.fd, this._writingBuf, 'utf8', this.release);
        return;
      }
    }

    this._writingBuf = '';

    if (this.destroyed) {
      return;
    }

    const len = this._buf.length;

    if (this._reopening) {
      this._writing = false;
      this._reopening = false;
      this.reopen();
    } else if (len > 0 && len > this.minLength) {
      actualWrite(this);
    } else if (this._ending) {
      if (len > 0) {
        actualWrite(this);
      } else {
        this._writing = false;
        actualClose(this);
      }
    } else {
      this._writing = false;

      if (this.sync) {
        if (!this._asyncDrainScheduled) {
          this._asyncDrainScheduled = true;
          process.nextTick(emitDrain, this);
        }
      } else {
        this.emit('drain');
      }
    }
  };

  this.on('newListener', function (name) {
    if (name === 'drain') {
      this._asyncDrainScheduled = false;
    }
  });
}

function emitDrain(sonic) {
  const hasListeners = sonic.listenerCount('drain') > 0;
  if (!hasListeners) return;
  sonic._asyncDrainScheduled = false;
  sonic.emit('drain');
}

inherits(SonicBoom$2, EventEmitter$3);

SonicBoom$2.prototype.write = function (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  this._buf += data;
  const len = this._buf.length;

  if (!this._writing && len > this.minLength) {
    actualWrite(this);
  }

  return len < 16384;
};

SonicBoom$2.prototype.flush = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this._writing || this.minLength <= 0) {
    return;
  }

  actualWrite(this);
};

SonicBoom$2.prototype.reopen = function (file) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this._opening) {
    this.once('ready', () => {
      this.reopen(file);
    });
    return;
  }

  if (this._ending) {
    return;
  }

  if (!this.file) {
    throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom');
  }

  this._reopening = true;

  if (this._writing) {
    return;
  }

  const fd = this.fd;
  this.once('ready', () => {
    if (fd !== this.fd) {
      fs.close(fd, err => {
        if (err) {
          return this.emit('error', err);
        }
      });
    }
  });
  openFile(file || this.file, this);
};

SonicBoom$2.prototype.end = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this._opening) {
    this.once('ready', () => {
      this.end();
    });
    return;
  }

  if (this._ending) {
    return;
  }

  this._ending = true;

  if (!this._writing && this._buf.length > 0 && this.fd >= 0) {
    actualWrite(this);
    return;
  }

  if (this._writing) {
    return;
  }

  actualClose(this);
};

SonicBoom$2.prototype.flushSync = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet');
  }

  while (this._buf.length > 0) {
    try {
      fs.writeSync(this.fd, this._buf, 'utf8');
      this._buf = '';
    } catch (err) {
      if (err.code !== 'EAGAIN') {
        throw err;
      }

      sleep(BUSY_WRITE_TIMEOUT);
    }
  }
};

SonicBoom$2.prototype.destroy = function () {
  if (this.destroyed) {
    return;
  }

  actualClose(this);
};

function actualWrite(sonic) {
  sonic._writing = true;
  let buf = sonic._buf;
  const release = sonic.release;

  if (buf.length > MAX_WRITE) {
    buf = buf.slice(0, MAX_WRITE);
    sonic._buf = sonic._buf.slice(MAX_WRITE);
  } else {
    sonic._buf = '';
  }
  sonic._writingBuf = buf;

  if (sonic.sync) {
    try {
      const written = fs.writeSync(sonic.fd, buf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs.write(sonic.fd, buf, 'utf8', release);
  }
}

function actualClose(sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose.bind(null, sonic));
    return;
  } // TODO write a test to check if we are not leaking fds


  fs.close(sonic.fd, err => {
    if (err) {
      sonic.emit('error', err);
      return;
    }

    if (sonic._ending && !sonic._writing) {
      sonic.emit('finish');
    }

    sonic.emit('close');
  });
  sonic.destroyed = true;
  sonic._buf = '';
}

var sonicBoom = SonicBoom$2;

const {
  format: format$9
} = require$$3__default["default"];

function build() {
  const codes = {};
  const emitted = new Map();

  function create(name, code, message) {
    if (!name) throw new Error('Fastify warning name must not be empty');
    if (!code) throw new Error('Fastify warning code must not be empty');
    if (!message) throw new Error('Fastify warning message must not be empty');
    code = code.toUpperCase();

    if (codes[code] !== undefined) {
      throw new Error(`The code '${code}' already exist`);
    }

    function buildWarnOpts(a, b, c) {
      // more performant than spread (...) operator
      let formatted;

      if (a && b && c) {
        formatted = format$9(message, a, b, c);
      } else if (a && b) {
        formatted = format$9(message, a, b);
      } else if (a) {
        formatted = format$9(message, a);
      } else {
        formatted = message;
      }

      return {
        code,
        name,
        message: formatted
      };
    }

    emitted.set(code, false);
    codes[code] = buildWarnOpts;
    return codes[code];
  }

  function emit(code, a, b, c) {
    if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`);
    if (emitted.get(code) === true) return;
    emitted.set(code, true);
    const warning = codes[code](a, b, c);
    process.emitWarning(warning.message, warning.name, warning.code);
  }

  return {
    create,
    emit,
    emitted
  };
}

var fastifyWarning = build;

const warning$1 = fastifyWarning();
var deprecations = warning$1;
const warnName = 'PinoWarning';
warning$1.create(warnName, 'PINODEP004', 'bindings.serializers is deprecated, use options.serializers option instead');
warning$1.create(warnName, 'PINODEP005', 'bindings.formatters is deprecated, use options.formatters option instead');
warning$1.create(warnName, 'PINODEP006', 'bindings.customLevels is deprecated, use options.customLevels option instead');
warning$1.create(warnName, 'PINODEP007', 'bindings.level is deprecated, use options.level option instead');

function tryStringify(o) {
  try {
    return JSON.stringify(o);
  } catch (e) {
    return '"[Circular]"';
  }
}

var quickFormatUnescaped = format$8;

function format$8(f, args, opts) {
  var ss = opts && opts.stringify || tryStringify;
  var offset = 1;

  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset;
    if (len === 1) return f;
    var objects = new Array(len);
    objects[0] = ss(f);

    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }

    return objects.join(' ');
  }

  if (typeof f !== 'string') {
    return f;
  }

  var argLen = args.length;
  if (argLen === 0) return f;
  var str = '';
  var a = 1 - offset;
  var lastPos = -1;
  var flen = f && f.length || 0;

  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;

      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'

        case 102:
          // 'f'
          if (a >= argLen) break;
          if (args[a] == null) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          str += Number(args[a]);
          lastPos = i + 2;
          i++;
          break;

        case 105:
          // 'i'
          if (a >= argLen) break;
          if (args[a] == null) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          str += Math.floor(Number(args[a]));
          lastPos = i + 2;
          i++;
          break;

        case 79: // 'O'

        case 111: // 'o'

        case 106:
          // 'j'
          if (a >= argLen) break;
          if (args[a] === undefined) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          var type = typeof args[a];

          if (type === 'string') {
            str += '\'' + args[a] + '\'';
            lastPos = i + 2;
            i++;
            break;
          }

          if (type === 'function') {
            str += args[a].name || '<anonymous>';
            lastPos = i + 2;
            i++;
            break;
          }

          str += ss(args[a]);
          lastPos = i + 2;
          i++;
          break;

        case 115:
          // 's'
          if (a >= argLen) break;
          if (lastPos < i) str += f.slice(lastPos, i);
          str += String(args[a]);
          lastPos = i + 2;
          i++;
          break;

        case 37:
          // '%'
          if (lastPos < i) str += f.slice(lastPos, i);
          str += '%';
          lastPos = i + 2;
          i++;
          a--;
          break;
      }

      ++a;
    }

    ++i;
  }

  if (lastPos === -1) return f;else if (lastPos < flen) {
    str += f.slice(lastPos);
  }
  return str;
}

var fastSafeStringify = stringify$3;
stringify$3.default = stringify$3;
stringify$3.stable = deterministicStringify;
stringify$3.stableStringify = deterministicStringify;
var LIMIT_REPLACE_NODE = '[...]';
var CIRCULAR_REPLACE_NODE = '[Circular]';
var arr = [];
var replacerStack = [];

function defaultOptions$1() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
} // Regular stringify


function stringify$3(obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions$1();
  }

  decirc(obj, '', 0, [], undefined, 0, options);
  var res;

  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer);
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop();

      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }

  return res;
}

function setReplace(replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);

  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, {
        value: replace
      });
      arr.push([parent, k, val, propertyDescriptor]);
    } else {
      replacerStack.push([val, k, replace]);
    }
  } else {
    parent[k] = replace;
    arr.push([parent, k, val]);
  }
}

function decirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }

    if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      var keys = Object.keys(val);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, i, stack, val, depth, options);
      }
    }

    stack.pop();
  }
} // Stable-stringify


function compareFunction(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function deterministicStringify(obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions$1();
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj;
  var res;

  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer);
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop();

      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else {
        part[0][part[1]] = part[2];
      }
    }
  }

  return res;
}

function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;

  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }

    try {
      if (typeof val.toJSON === 'function') {
        return;
      }
    } catch (_) {
      return;
    }

    if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }

    stack.push(val); // Optimize for Arrays. Big arrays could kill the performance otherwise!

    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options);
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {};
      var keys = Object.keys(val).sort(compareFunction);

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        deterministicDecirc(val[key], key, i, stack, val, depth, options);
        tmp[key] = val[key];
      }

      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val]);
        parent[k] = tmp;
      } else {
        return tmp;
      }
    }

    stack.pop();
  }
} // wraps replacer function to handle values we couldn't replace
// and mark them as replaced value


function replaceGetterValues(replacer) {
  replacer = typeof replacer !== 'undefined' ? replacer : function (k, v) {
    return v;
  };
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];

        if (part[1] === key && part[0] === val) {
          val = part[2];
          replacerStack.splice(i, 1);
          break;
        }
      }
    }

    return replacer.call(this, key, val);
  };
}

/* eslint no-prototype-builtins: 0 */


const format$7 = quickFormatUnescaped;
const {
  mapHttpRequest,
  mapHttpResponse
} = pinoStdSerializers;
const SonicBoom$1 = sonicBoom;
const stringifySafe = fastSafeStringify;
const {
  lsCacheSym: lsCacheSym$2,
  chindingsSym: chindingsSym$2,
  parsedChindingsSym: parsedChindingsSym$1,
  writeSym: writeSym$1,
  serializersSym: serializersSym$2,
  formatOptsSym: formatOptsSym$2,
  endSym: endSym$1,
  stringifiersSym: stringifiersSym$2,
  stringifySym: stringifySym$2,
  wildcardFirstSym,
  needsMetadataGsym: needsMetadataGsym$1,
  redactFmtSym: redactFmtSym$2,
  streamSym: streamSym$3,
  nestedKeySym: nestedKeySym$1,
  formattersSym: formattersSym$3,
  messageKeySym: messageKeySym$1
} = symbols$1;

function noop$2() {}

function genLog$1(level, hook) {
  if (!hook) return LOG;
  return function hookWrappedLog(...args) {
    hook.call(this, args, LOG, level);
  };

  function LOG(o, ...n) {
    if (typeof o === 'object') {
      let msg = o;

      if (o !== null) {
        if (o.method && o.headers && o.socket) {
          o = mapHttpRequest(o);
        } else if (typeof o.setHeader === 'function') {
          o = mapHttpResponse(o);
        }
      }

      if (this[nestedKeySym$1]) o = {
        [this[nestedKeySym$1]]: o
      };
      let formatParams;

      if (msg === null && n.length === 0) {
        formatParams = [null];
      } else {
        msg = n.shift();
        formatParams = n;
      }

      this[writeSym$1](o, format$7(msg, formatParams, this[formatOptsSym$2]), level);
    } else {
      this[writeSym$1](null, format$7(o, n, this[formatOptsSym$2]), level);
    }
  }
} // magically escape strings for json
// relying on their charCodeAt
// everything below 32 needs JSON.stringify()
// 34 and 92 happens all the time, so we
// have a fast case for them


function asString(str) {
  let result = '';
  let last = 0;
  let found = false;
  let point = 255;
  const l = str.length;

  if (l > 100) {
    return JSON.stringify(str);
  }

  for (var i = 0; i < l && point >= 32; i++) {
    point = str.charCodeAt(i);

    if (point === 34 || point === 92) {
      result += str.slice(last, i) + '\\';
      last = i;
      found = true;
    }
  }

  if (!found) {
    result = str;
  } else {
    result += str.slice(last);
  }

  return point < 32 ? JSON.stringify(str) : '"' + result + '"';
}

function asJson$1(obj, msg, num, time) {
  const stringify = this[stringifySym$2];
  const stringifiers = this[stringifiersSym$2];
  const end = this[endSym$1];
  const chindings = this[chindingsSym$2];
  const serializers = this[serializersSym$2];
  const formatters = this[formattersSym$3];
  const messageKey = this[messageKeySym$1];
  let data = this[lsCacheSym$2][num] + time; // we need the child bindings added to the output first so instance logged
  // objects can take precedence when JSON.parse-ing the resulting log line

  data = data + chindings;
  let value;
  const notHasOwnProperty = obj.hasOwnProperty === undefined;

  if (formatters.log) {
    obj = formatters.log(obj);
  }

  if (msg !== undefined) {
    obj[messageKey] = msg;
  }

  const wildcardStringifier = stringifiers[wildcardFirstSym];

  for (const key in obj) {
    value = obj[key];

    if ((notHasOwnProperty || obj.hasOwnProperty(key)) && value !== undefined) {
      value = serializers[key] ? serializers[key](value) : value;
      const stringifier = stringifiers[key] || wildcardStringifier;

      switch (typeof value) {
        case 'undefined':
        case 'function':
          continue;

        case 'number':
          /* eslint no-fallthrough: "off" */
          if (Number.isFinite(value) === false) {
            value = null;
          }

        // this case explicitly falls through to the next one

        case 'boolean':
          if (stringifier) value = stringifier(value);
          break;

        case 'string':
          value = (stringifier || asString)(value);
          break;

        default:
          value = (stringifier || stringify)(value);
      }

      if (value === undefined) continue;
      data += ',"' + key + '":' + value;
    }
  }

  return data + end;
}

function asChindings$2(instance, bindings) {
  let value;
  let data = instance[chindingsSym$2];
  const stringify = instance[stringifySym$2];
  const stringifiers = instance[stringifiersSym$2];
  const wildcardStringifier = stringifiers[wildcardFirstSym];
  const serializers = instance[serializersSym$2];
  const formatter = instance[formattersSym$3].bindings;
  bindings = formatter(bindings);

  for (const key in bindings) {
    value = bindings[key];
    const valid = key !== 'level' && key !== 'serializers' && key !== 'formatters' && key !== 'customLevels' && bindings.hasOwnProperty(key) && value !== undefined;

    if (valid === true) {
      value = serializers[key] ? serializers[key](value) : value;
      value = (stringifiers[key] || wildcardStringifier || stringify)(value);
      if (value === undefined) continue;
      data += ',"' + key + '":' + value;
    }
  }

  return data;
}

function getPrettyStream(opts, prettifier, dest, instance) {
  if (prettifier && typeof prettifier === 'function') {
    prettifier = prettifier.bind(instance);
    return prettifierMetaWrapper(prettifier(opts), dest, opts);
  }

  try {
    const prettyFactory = require('pino-pretty').prettyFactory || require('pino-pretty');

    prettyFactory.asMetaWrapper = prettifierMetaWrapper;
    return prettifierMetaWrapper(prettyFactory(opts), dest, opts);
  } catch (e) {
    if (e.message.startsWith("Cannot find module 'pino-pretty'")) {
      throw Error('Missing `pino-pretty` module: `pino-pretty` must be installed separately');
    }
    throw e;
  }
}

function prettifierMetaWrapper(pretty, dest, opts) {
  opts = Object.assign({
    suppressFlushSyncWarning: false
  }, opts);
  let warned = false;
  return {
    [needsMetadataGsym$1]: true,
    lastLevel: 0,
    lastMsg: null,
    lastObj: null,
    lastLogger: null,

    flushSync() {
      if (opts.suppressFlushSyncWarning || warned) {
        return;
      }

      warned = true;
      setMetadataProps(dest, this);
      dest.write(pretty(Object.assign({
        level: 40,
        // warn
        msg: 'pino.final with prettyPrint does not support flushing',
        time: Date.now()
      }, this.chindings())));
    },

    chindings() {
      const lastLogger = this.lastLogger;
      let chindings = null; // protection against flushSync being called before logging
      // anything

      if (!lastLogger) {
        return null;
      }

      if (lastLogger.hasOwnProperty(parsedChindingsSym$1)) {
        chindings = lastLogger[parsedChindingsSym$1];
      } else {
        chindings = JSON.parse('{' + lastLogger[chindingsSym$2].substr(1) + '}');
        lastLogger[parsedChindingsSym$1] = chindings;
      }

      return chindings;
    },

    write(chunk) {
      const lastLogger = this.lastLogger;
      const chindings = this.chindings();
      let time = this.lastTime;

      if (time.match(/^\d+/)) {
        time = parseInt(time);
      } else {
        time = time.slice(1, -1);
      }

      const lastObj = this.lastObj;
      const lastMsg = this.lastMsg;
      const errorProps = null;
      const formatters = lastLogger[formattersSym$3];
      const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj;
      const messageKey = lastLogger[messageKeySym$1];

      if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) {
        formattedObj[messageKey] = lastMsg;
      }

      const obj = Object.assign({
        level: this.lastLevel,
        time
      }, formattedObj, errorProps);
      const serializers = lastLogger[serializersSym$2];
      const keys = Object.keys(serializers);

      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (obj[key] !== undefined) {
          obj[key] = serializers[key](obj[key]);
        }
      }

      for (const key in chindings) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = chindings[key];
        }
      }

      const stringifiers = lastLogger[stringifiersSym$2];
      const redact = stringifiers[redactFmtSym$2];
      const formatted = pretty(typeof redact === 'function' ? redact(obj) : obj);
      if (formatted === undefined) return;
      setMetadataProps(dest, this);
      dest.write(formatted);
    }

  };
}

function hasBeenTampered(stream) {
  return stream.write !== stream.constructor.prototype.write;
}

function buildSafeSonicBoom$1(opts) {
  const stream = new SonicBoom$1(opts);
  stream.on('error', filterBrokenPipe);
  return stream;

  function filterBrokenPipe(err) {
    // TODO verify on Windows
    if (err.code === 'EPIPE') {
      // If we get EPIPE, we should stop logging here
      // however we have no control to the consumer of
      // SonicBoom, so we just overwrite the write method
      stream.write = noop$2;
      stream.end = noop$2;
      stream.flushSync = noop$2;
      stream.destroy = noop$2;
      return;
    }

    stream.removeListener('error', filterBrokenPipe);
    stream.emit('error', err);
  }
}

function createArgsNormalizer$1(defaultOptions) {
  return function normalizeArgs(instance, opts = {}, stream) {
    // support stream as a string
    if (typeof opts === 'string') {
      stream = buildSafeSonicBoom$1({
        dest: opts,
        sync: true
      });
      opts = {};
    } else if (typeof stream === 'string') {
      stream = buildSafeSonicBoom$1({
        dest: stream,
        sync: true
      });
    } else if (opts instanceof SonicBoom$1 || opts.writable || opts._writableState) {
      stream = opts;
      opts = null;
    }

    opts = Object.assign({}, defaultOptions, opts);

    if ('extreme' in opts) {
      throw Error('The extreme option has been removed, use pino.destination({ sync: false }) instead');
    }

    if ('onTerminated' in opts) {
      throw Error('The onTerminated option has been removed, use pino.final instead');
    }

    if ('changeLevelName' in opts) {
      process.emitWarning('The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.', {
        code: 'changeLevelName_deprecation'
      });
      opts.levelKey = opts.changeLevelName;
      delete opts.changeLevelName;
    }

    const {
      enabled,
      prettyPrint,
      prettifier,
      messageKey
    } = opts;
    if (enabled === false) opts.level = 'silent';
    stream = stream || process.stdout;

    if (stream === process.stdout && stream.fd >= 0 && !hasBeenTampered(stream)) {
      stream = buildSafeSonicBoom$1({
        fd: stream.fd,
        sync: true
      });
    }

    if (prettyPrint) {
      const prettyOpts = Object.assign({
        messageKey
      }, prettyPrint);
      stream = getPrettyStream(prettyOpts, prettifier, stream, instance);
    }

    return {
      opts,
      stream
    };
  };
}

function final$1(logger, handler) {
  if (typeof logger === 'undefined' || typeof logger.child !== 'function') {
    throw Error('expected a pino logger instance');
  }

  const hasHandler = typeof handler !== 'undefined';

  if (hasHandler && typeof handler !== 'function') {
    throw Error('if supplied, the handler parameter should be a function');
  }

  const stream = logger[streamSym$3];

  if (typeof stream.flushSync !== 'function') {
    throw Error('final requires a stream that has a flushSync method, such as pino.destination');
  }

  const finalLogger = new Proxy(logger, {
    get: (logger, key) => {
      if (key in logger.levels.values) {
        return (...args) => {
          logger[key](...args);
          stream.flushSync();
        };
      }

      return logger[key];
    }
  });

  if (!hasHandler) {
    return finalLogger;
  }

  return (err = null, ...args) => {
    try {
      stream.flushSync();
    } catch (e) {// it's too late to wait for the stream to be ready
      // because this is a final tick scenario.
      // in practice there shouldn't be a situation where it isn't
      // however, swallow the error just in case (and for easier testing)
    }

    return handler(err, finalLogger, ...args);
  };
}

function stringify$2(obj) {
  try {
    return JSON.stringify(obj);
  } catch (_) {
    return stringifySafe(obj);
  }
}

function buildFormatters$2(level, bindings, log) {
  return {
    level,
    bindings,
    log
  };
}

function setMetadataProps(dest, that) {
  if (dest[needsMetadataGsym$1] === true) {
    dest.lastLevel = that.lastLevel;
    dest.lastMsg = that.lastMsg;
    dest.lastObj = that.lastObj;
    dest.lastTime = that.lastTime;
    dest.lastLogger = that.lastLogger;
  }
}

var tools = {
  noop: noop$2,
  buildSafeSonicBoom: buildSafeSonicBoom$1,
  getPrettyStream,
  asChindings: asChindings$2,
  asJson: asJson$1,
  genLog: genLog$1,
  createArgsNormalizer: createArgsNormalizer$1,
  final: final$1,
  stringify: stringify$2,
  buildFormatters: buildFormatters$2
};

/* eslint no-prototype-builtins: 0 */


const flatstr$1 = flatstr_1;
const {
  lsCacheSym: lsCacheSym$1,
  levelValSym: levelValSym$1,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$2,
  streamSym: streamSym$2,
  formattersSym: formattersSym$2,
  hooksSym: hooksSym$1
} = symbols$1;
const {
  noop: noop$1,
  genLog
} = tools;
const levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};
const levelMethods = {
  fatal: hook => {
    const logFatal = genLog(levels.fatal, hook);
    return function (...args) {
      const stream = this[streamSym$2];
      logFatal.call(this, ...args);

      if (typeof stream.flushSync === 'function') {
        try {
          stream.flushSync();
        } catch (e) {// https://github.com/pinojs/pino/pull/740#discussion_r346788313
        }
      }
    };
  },
  error: hook => genLog(levels.error, hook),
  warn: hook => genLog(levels.warn, hook),
  info: hook => genLog(levels.info, hook),
  debug: hook => genLog(levels.debug, hook),
  trace: hook => genLog(levels.trace, hook)
};
const nums = Object.keys(levels).reduce((o, k) => {
  o[levels[k]] = k;
  return o;
}, {});
const initialLsCache$1 = Object.keys(nums).reduce((o, k) => {
  o[k] = flatstr$1('{"level":' + Number(k));
  return o;
}, {});

function genLsCache$2(instance) {
  const formatter = instance[formattersSym$2].level;
  const {
    labels
  } = instance.levels;
  const cache = {};

  for (const label in labels) {
    const level = formatter(labels[label], Number(label));
    cache[label] = JSON.stringify(level).slice(0, -1);
  }

  instance[lsCacheSym$1] = cache;
  return instance;
}

function isStandardLevel(level, useOnlyCustomLevels) {
  if (useOnlyCustomLevels) {
    return false;
  }

  switch (level) {
    case 'fatal':
    case 'error':
    case 'warn':
    case 'info':
    case 'debug':
    case 'trace':
      return true;

    default:
      return false;
  }
}

function setLevel$1(level) {
  const {
    labels,
    values
  } = this.levels;

  if (typeof level === 'number') {
    if (labels[level] === undefined) throw Error('unknown level value' + level);
    level = labels[level];
  }

  if (values[level] === undefined) throw Error('unknown level ' + level);
  const preLevelVal = this[levelValSym$1];
  const levelVal = this[levelValSym$1] = values[level];
  const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym$2];
  const hook = this[hooksSym$1].logMethod;

  for (const key in values) {
    if (levelVal > values[key]) {
      this[key] = noop$1;
      continue;
    }

    this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
  }

  this.emit('level-change', level, levelVal, labels[preLevelVal], preLevelVal);
}

function getLevel$1(level) {
  const {
    levels,
    levelVal
  } = this; // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)

  return levels && levels.labels ? levels.labels[levelVal] : '';
}

function isLevelEnabled$1(logLevel) {
  const {
    values
  } = this.levels;
  const logLevelVal = values[logLevel];
  return logLevelVal !== undefined && logLevelVal >= this[levelValSym$1];
}

function mappings$2(customLevels = null, useOnlyCustomLevels = false) {
  const customNums = customLevels
  /* eslint-disable */
  ? Object.keys(customLevels).reduce((o, k) => {
    o[customLevels[k]] = k;
    return o;
  }, {}) : null;
  /* eslint-enable */

  const labels = Object.assign(Object.create(Object.prototype, {
    Infinity: {
      value: 'silent'
    }
  }), useOnlyCustomLevels ? null : nums, customNums);
  const values = Object.assign(Object.create(Object.prototype, {
    silent: {
      value: Infinity
    }
  }), useOnlyCustomLevels ? null : levels, customLevels);
  return {
    labels,
    values
  };
}

function assertDefaultLevelFound$1(defaultLevel, customLevels, useOnlyCustomLevels) {
  if (typeof defaultLevel === 'number') {
    const values = [].concat(Object.keys(customLevels || {}).map(key => customLevels[key]), useOnlyCustomLevels ? [] : Object.keys(nums).map(level => +level), Infinity);

    if (!values.includes(defaultLevel)) {
      throw Error(`default level:${defaultLevel} must be included in custom levels`);
    }

    return;
  }

  const labels = Object.assign(Object.create(Object.prototype, {
    silent: {
      value: Infinity
    }
  }), useOnlyCustomLevels ? null : levels, customLevels);

  if (!(defaultLevel in labels)) {
    throw Error(`default level:${defaultLevel} must be included in custom levels`);
  }
}

function assertNoLevelCollisions$1(levels, customLevels) {
  const {
    labels,
    values
  } = levels;

  for (const k in customLevels) {
    if (k in values) {
      throw Error('levels cannot be overridden');
    }

    if (customLevels[k] in labels) {
      throw Error('pre-existing level values cannot be used for new levels');
    }
  }
}

var levels_1 = {
  initialLsCache: initialLsCache$1,
  genLsCache: genLsCache$2,
  levelMethods,
  getLevel: getLevel$1,
  setLevel: setLevel$1,
  isLevelEnabled: isLevelEnabled$1,
  mappings: mappings$2,
  assertNoLevelCollisions: assertNoLevelCollisions$1,
  assertDefaultLevelFound: assertDefaultLevelFound$1
};

var name = "pino";
var version$3 = "6.13.3";
var description = "super fast, all natural json logger";
var main = "pino.js";
var browser = "./browser.js";
var files = [
	"pino.js",
	"bin.js",
	"browser.js",
	"pretty.js",
	"usage.txt",
	"test",
	"docs",
	"example.js",
	"lib"
];
var scripts = {
	docs: "docsify serve",
	"browser-test": "airtap --local 8080 test/browser*test.js",
	lint: "eslint .",
	test: "npm run lint && tap --100 test/*test.js test/*/*test.js",
	"test-ci": "npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly",
	"cov-ui": "tap --coverage-report=html test/*test.js test/*/*test.js",
	bench: "node benchmarks/utils/runbench all",
	"bench-basic": "node benchmarks/utils/runbench basic",
	"bench-object": "node benchmarks/utils/runbench object",
	"bench-deep-object": "node benchmarks/utils/runbench deep-object",
	"bench-multi-arg": "node benchmarks/utils/runbench multi-arg",
	"bench-longs-tring": "node benchmarks/utils/runbench long-string",
	"bench-child": "node benchmarks/utils/runbench child",
	"bench-child-child": "node benchmarks/utils/runbench child-child",
	"bench-child-creation": "node benchmarks/utils/runbench child-creation",
	"bench-formatters": "node benchmarks/utils/runbench formatters",
	"update-bench-doc": "node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md"
};
var bin = {
	pino: "./bin.js"
};
var precommit = "test";
var repository = {
	type: "git",
	url: "git+https://github.com/pinojs/pino.git"
};
var keywords = [
	"fast",
	"logger",
	"stream",
	"json"
];
var author = "Matteo Collina <hello@matteocollina.com>";
var contributors = [
	"David Mark Clements <huperekchuno@googlemail.com>",
	"James Sumners <james.sumners@gmail.com>",
	"Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)"
];
var license = "MIT";
var bugs = {
	url: "https://github.com/pinojs/pino/issues"
};
var homepage = "http://getpino.io";
var devDependencies = {
	airtap: "4.0.3",
	benchmark: "^2.1.4",
	bole: "^4.0.0",
	bunyan: "^1.8.14",
	"docsify-cli": "^4.4.1",
	eslint: "^7.17.0",
	"eslint-config-standard": "^16.0.2",
	"eslint-plugin-import": "^2.22.1",
	"eslint-plugin-node": "^11.1.0",
	"eslint-plugin-promise": "^5.1.0",
	execa: "^5.0.0",
	fastbench: "^1.0.1",
	"flush-write-stream": "^2.0.0",
	"import-fresh": "^3.2.1",
	log: "^6.0.0",
	loglevel: "^1.6.7",
	"pino-pretty": "^5.0.0",
	"pre-commit": "^1.2.2",
	proxyquire: "^2.1.3",
	pump: "^3.0.0",
	semver: "^7.0.0",
	split2: "^3.1.1",
	steed: "^1.1.3",
	"strip-ansi": "^6.0.0",
	tap: "^15.0.1",
	tape: "^5.0.0",
	through2: "^4.0.0",
	winston: "^3.3.3"
};
var dependencies = {
	"fast-redact": "^3.0.0",
	"fast-safe-stringify": "^2.0.8",
	"fastify-warning": "^0.2.0",
	flatstr: "^1.0.12",
	"pino-std-serializers": "^3.1.0",
	"quick-format-unescaped": "^4.0.3",
	"sonic-boom": "^1.0.2"
};
var require$$0 = {
	name: name,
	version: version$3,
	description: description,
	main: main,
	browser: browser,
	files: files,
	scripts: scripts,
	bin: bin,
	precommit: precommit,
	repository: repository,
	keywords: keywords,
	author: author,
	contributors: contributors,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const {
  version: version$2
} = require$$0;
var meta = {
  version: version$2
};

/* eslint no-prototype-builtins: 0 */


const {
  EventEmitter: EventEmitter$2
} = require$$0__default$2["default"];
const SonicBoom = sonicBoom;
const flatstr = flatstr_1;
const warning = deprecations;
const {
  lsCacheSym,
  levelValSym,
  setLevelSym: setLevelSym$1,
  getLevelSym,
  chindingsSym: chindingsSym$1,
  parsedChindingsSym,
  mixinSym: mixinSym$1,
  asJsonSym,
  writeSym,
  timeSym: timeSym$1,
  timeSliceIndexSym: timeSliceIndexSym$1,
  streamSym: streamSym$1,
  serializersSym: serializersSym$1,
  formattersSym: formattersSym$1,
  useOnlyCustomLevelsSym: useOnlyCustomLevelsSym$1,
  needsMetadataGsym,
  redactFmtSym: redactFmtSym$1,
  stringifySym: stringifySym$1,
  formatOptsSym: formatOptsSym$1,
  stringifiersSym: stringifiersSym$1
} = symbols$1;
const {
  getLevel,
  setLevel,
  isLevelEnabled,
  mappings: mappings$1,
  initialLsCache,
  genLsCache: genLsCache$1,
  assertNoLevelCollisions
} = levels_1;
const {
  asChindings: asChindings$1,
  asJson,
  buildFormatters: buildFormatters$1,
  stringify: stringify$1
} = tools;
const {
  version: version$1
} = meta;
const redaction$1 = redaction_1; // note: use of class is satirical
// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127

const constructor = class Pino {};
const prototype = {
  constructor,
  child,
  bindings,
  setBindings,
  flush,
  isLevelEnabled,
  version: version$1,

  get level() {
    return this[getLevelSym]();
  },

  set level(lvl) {
    this[setLevelSym$1](lvl);
  },

  get levelVal() {
    return this[levelValSym];
  },

  set levelVal(n) {
    throw Error('levelVal is read-only');
  },

  [lsCacheSym]: initialLsCache,
  [writeSym]: write,
  [asJsonSym]: asJson,
  [getLevelSym]: getLevel,
  [setLevelSym$1]: setLevel
};
Object.setPrototypeOf(prototype, EventEmitter$2.prototype); // exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing

var proto$1 = function () {
  return Object.create(prototype);
};

const resetChildingsFormatter = bindings => bindings;

function child(bindings, options) {
  if (!bindings) {
    throw Error('missing bindings for child Pino');
  }

  options = options || {}; // default options to empty object

  const serializers = this[serializersSym$1];
  const formatters = this[formattersSym$1];
  const instance = Object.create(this);

  if (bindings.hasOwnProperty('serializers') === true) {
    warning.emit('PINODEP004');
    options.serializers = bindings.serializers;
  }

  if (bindings.hasOwnProperty('formatters') === true) {
    warning.emit('PINODEP005');
    options.formatters = bindings.formatters;
  }

  if (bindings.hasOwnProperty('customLevels') === true) {
    warning.emit('PINODEP006');
    options.customLevels = bindings.customLevels;
  }

  if (bindings.hasOwnProperty('level') === true) {
    warning.emit('PINODEP007');
    options.level = bindings.level;
  }

  if (options.hasOwnProperty('serializers') === true) {
    instance[serializersSym$1] = Object.create(null);

    for (const k in serializers) {
      instance[serializersSym$1][k] = serializers[k];
    }

    const parentSymbols = Object.getOwnPropertySymbols(serializers);
    /* eslint no-var: off */

    for (var i = 0; i < parentSymbols.length; i++) {
      const ks = parentSymbols[i];
      instance[serializersSym$1][ks] = serializers[ks];
    }

    for (const bk in options.serializers) {
      instance[serializersSym$1][bk] = options.serializers[bk];
    }

    const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);

    for (var bi = 0; bi < bindingsSymbols.length; bi++) {
      const bks = bindingsSymbols[bi];
      instance[serializersSym$1][bks] = options.serializers[bks];
    }
  } else instance[serializersSym$1] = serializers;

  if (options.hasOwnProperty('formatters')) {
    const {
      level,
      bindings: chindings,
      log
    } = options.formatters;
    instance[formattersSym$1] = buildFormatters$1(level || formatters.level, chindings || resetChildingsFormatter, log || formatters.log);
  } else {
    instance[formattersSym$1] = buildFormatters$1(formatters.level, resetChildingsFormatter, formatters.log);
  }

  if (options.hasOwnProperty('customLevels') === true) {
    assertNoLevelCollisions(this.levels, options.customLevels);
    instance.levels = mappings$1(options.customLevels, instance[useOnlyCustomLevelsSym$1]);
    genLsCache$1(instance);
  } // redact must place before asChindings and only replace if exist


  if (typeof options.redact === 'object' && options.redact !== null || Array.isArray(options.redact)) {
    instance.redact = options.redact; // replace redact directly

    const stringifiers = redaction$1(instance.redact, stringify$1);
    const formatOpts = {
      stringify: stringifiers[redactFmtSym$1]
    };
    instance[stringifySym$1] = stringify$1;
    instance[stringifiersSym$1] = stringifiers;
    instance[formatOptsSym$1] = formatOpts;
  }

  instance[chindingsSym$1] = asChindings$1(instance, bindings);
  const childLevel = options.level || this.level;
  instance[setLevelSym$1](childLevel);
  return instance;
}

function bindings() {
  const chindings = this[chindingsSym$1];
  const chindingsJson = `{${chindings.substr(1)}}`; // at least contains ,"pid":7068,"hostname":"myMac"

  const bindingsFromJson = JSON.parse(chindingsJson);
  delete bindingsFromJson.pid;
  delete bindingsFromJson.hostname;
  return bindingsFromJson;
}

function setBindings(newBindings) {
  const chindings = asChindings$1(this, newBindings);
  this[chindingsSym$1] = chindings;
  delete this[parsedChindingsSym];
}

function write(_obj, msg, num) {
  const t = this[timeSym$1]();
  const mixin = this[mixinSym$1];
  const objError = _obj instanceof Error;
  let obj;

  if (_obj === undefined || _obj === null) {
    obj = mixin ? mixin({}) : {};
  } else {
    obj = Object.assign(mixin ? mixin(_obj) : {}, _obj);

    if (!msg && objError) {
      msg = _obj.message;
    }

    if (objError) {
      obj.stack = _obj.stack;

      if (!obj.type) {
        obj.type = 'Error';
      }
    }
  }

  const s = this[asJsonSym](obj, msg, num, t);
  const stream = this[streamSym$1];

  if (stream[needsMetadataGsym] === true) {
    stream.lastLevel = num;
    stream.lastObj = obj;
    stream.lastMsg = msg;
    stream.lastTime = t.slice(this[timeSliceIndexSym$1]);
    stream.lastLogger = this; // for child loggers
  }

  if (stream instanceof SonicBoom) stream.write(s);else stream.write(flatstr(s));
}

function flush() {
  const stream = this[streamSym$1];
  if ('flush' in stream) stream.flush();
}

/* eslint no-prototype-builtins: 0 */


const os = require$$0__default$3["default"];
const stdSerializers = pinoStdSerializers;
const redaction = redaction_1;
const time = time$1;
const proto = proto$1;
const symbols = symbols$1;
const {
  assertDefaultLevelFound,
  mappings,
  genLsCache
} = levels_1;
const {
  createArgsNormalizer,
  asChindings,
  final,
  stringify,
  buildSafeSonicBoom,
  buildFormatters,
  noop
} = tools;
const {
  version
} = meta;
const {
  chindingsSym,
  redactFmtSym,
  serializersSym,
  timeSym,
  timeSliceIndexSym,
  streamSym,
  stringifySym,
  stringifiersSym,
  setLevelSym,
  endSym,
  formatOptsSym,
  messageKeySym,
  nestedKeySym,
  mixinSym,
  useOnlyCustomLevelsSym,
  formattersSym,
  hooksSym
} = symbols;
const {
  epochTime,
  nullTime
} = time;
const {
  pid
} = process;
const hostname = os.hostname();
const defaultErrorSerializer = stdSerializers.err;
const defaultOptions = {
  level: 'info',
  messageKey: 'msg',
  nestedKey: null,
  enabled: true,
  prettyPrint: false,
  base: {
    pid,
    hostname
  },
  serializers: Object.assign(Object.create(null), {
    err: defaultErrorSerializer
  }),
  formatters: Object.assign(Object.create(null), {
    bindings(bindings) {
      return bindings;
    },

    level(label, number) {
      return {
        level: number
      };
    }

  }),
  hooks: {
    logMethod: undefined
  },
  timestamp: epochTime,
  name: undefined,
  redact: null,
  customLevels: null,
  levelKey: undefined,
  useOnlyCustomLevels: false
};
const normalize = createArgsNormalizer(defaultOptions);
const serializers = Object.assign(Object.create(null), stdSerializers);

function pino$1(...args) {
  const instance = {};
  const {
    opts,
    stream
  } = normalize(instance, ...args);
  const {
    redact,
    crlf,
    serializers,
    timestamp,
    messageKey,
    nestedKey,
    base,
    name,
    level,
    customLevels,
    useLevelLabels,
    changeLevelName,
    levelKey,
    mixin,
    useOnlyCustomLevels,
    formatters,
    hooks
  } = opts;
  const allFormatters = buildFormatters(formatters.level, formatters.bindings, formatters.log);

  if (useLevelLabels && !(changeLevelName || levelKey)) {
    process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
    allFormatters.level = labelsFormatter;
  } else if ((changeLevelName || levelKey) && !useLevelLabels) {
    process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
    allFormatters.level = levelNameFormatter(changeLevelName || levelKey);
  } else if ((changeLevelName || levelKey) && useLevelLabels) {
    process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
    process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
    allFormatters.level = levelNameLabelFormatter(changeLevelName || levelKey);
  }

  if (serializers[Symbol.for('pino.*')]) {
    process.emitWarning('The pino.* serializer is deprecated, use the formatters.log options instead', 'Warning', 'PINODEP003');
    allFormatters.log = serializers[Symbol.for('pino.*')];
  }

  if (!allFormatters.bindings) {
    allFormatters.bindings = defaultOptions.formatters.bindings;
  }

  if (!allFormatters.level) {
    allFormatters.level = defaultOptions.formatters.level;
  }

  const stringifiers = redact ? redaction(redact, stringify) : {};
  const formatOpts = redact ? {
    stringify: stringifiers[redactFmtSym]
  } : {
    stringify
  };
  const end = '}' + (crlf ? '\r\n' : '\n');
  const coreChindings = asChindings.bind(null, {
    [chindingsSym]: '',
    [serializersSym]: serializers,
    [stringifiersSym]: stringifiers,
    [stringifySym]: stringify,
    [formattersSym]: allFormatters
  });
  let chindings = '';

  if (base !== null) {
    if (name === undefined) {
      chindings = coreChindings(base);
    } else {
      chindings = coreChindings(Object.assign({}, base, {
        name
      }));
    }
  }

  const time = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
  const timeSliceIndex = time().indexOf(':') + 1;
  if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true');
  if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
  assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
  const levels = mappings(customLevels, useOnlyCustomLevels);
  Object.assign(instance, {
    levels,
    [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
    [streamSym]: stream,
    [timeSym]: time,
    [timeSliceIndexSym]: timeSliceIndex,
    [stringifySym]: stringify,
    [stringifiersSym]: stringifiers,
    [endSym]: end,
    [formatOptsSym]: formatOpts,
    [messageKeySym]: messageKey,
    [nestedKeySym]: nestedKey,
    [serializersSym]: serializers,
    [mixinSym]: mixin,
    [chindingsSym]: chindings,
    [formattersSym]: allFormatters,
    [hooksSym]: hooks,
    silent: noop
  });
  Object.setPrototypeOf(instance, proto());
  genLsCache(instance);
  instance[setLevelSym](level);
  return instance;
}

function labelsFormatter(label, number) {
  return {
    level: label
  };
}

function levelNameFormatter(name) {
  return function (label, number) {
    return {
      [name]: number
    };
  };
}

function levelNameLabelFormatter(name) {
  return function (label, number) {
    return {
      [name]: label
    };
  };
}

pino$2.exports = pino$1;

pino$2.exports.extreme = (dest = process.stdout.fd) => {
  process.emitWarning('The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.', {
    code: 'extreme_deprecation'
  });
  return buildSafeSonicBoom({
    dest,
    minLength: 4096,
    sync: false
  });
};

pino$2.exports.destination = (dest = process.stdout.fd) => {
  if (typeof dest === 'object') {
    dest.dest = dest.dest || process.stdout.fd;
    return buildSafeSonicBoom(dest);
  } else {
    return buildSafeSonicBoom({
      dest,
      minLength: 0,
      sync: true
    });
  }
};

pino$2.exports.final = final;
pino$2.exports.levels = mappings();
pino$2.exports.stdSerializers = serializers;
pino$2.exports.stdTimeFunctions = Object.assign({}, time);
pino$2.exports.symbols = symbols;
pino$2.exports.version = version; // Enables default and name export with TypeScript and Babel

pino$2.exports.default = pino$1;

pino$2.exports.pino = pino$1;

var _process$env$LOG_LEVE;
const pino = pino$2.exports; // The destination of the log file. Can be `undefined`.

const destFile = process.env.LOG_FILE;
const logger$4 = pino({
  level: (_process$env$LOG_LEVE = process.env.LOG_LEVEL) !== null && _process$env$LOG_LEVE !== void 0 ? _process$env$LOG_LEVE : 'info',
  prettyPrint: process.env.JSON_LOG === 'true' ? false : {
    colorize: true,
    messageFormat: '\x1b[1m\x1b[32m({scope})\x1b[0m\x1b[36m {msg}',
    ignore: 'time,pid,hostname,scope',
    errorProps: '*'
  }
}, // Redirect the logs to destFile if specified.
destFile && pino.destination(destFile));
/**
 * Add the scope of this log message.
 *
 * @param {string} scope The scope of this log message.
 * @return {pino.Logger}
 */

function logScope$4(scope) {
  return logger$4.child({
    scope
  });
}

var logger_1 = {
  logger: logger$4,
  logScope: logScope$4
};

const {
  EventEmitter: EventEmitter$1
} = require$$0__default$2["default"];
const {
  logScope: logScope$3
} = logger_1;
const logger$3 = logScope$3('cache');
const CacheStorageEvents = {
  CLEANUP: 'cs@cleanup'
};
/**
 * @typedef {{data: any, expireAt: Date}} CacheData
 */

/**
 * A cache storage for storing any type of data.
 */

class CacheStorage extends EventEmitter$1 {
  /**
   * @type {string}
   */

  /**
   * @type {Map<any, CacheData>}
   * @readonly
   */
  // will expire after 30 minutes.

  /**
   * Construct a cache storage.
   *
   * @param {string?} id The ID of this cache storage.
   */
  constructor(id) {
    super(); // Set the ID of this cache storage.

    _defineProperty(this, "id", 'Default Cache Storage');

    _defineProperty(this, "cacheMap", new Map());

    _defineProperty(this, "aliveDuration", 30 * 60 * 1000);

    if (id) this.id = id; // Register the CLEANUP event. It will clean up
    // the expired cache when emitting "CLEANUP" event.

    this.on(CacheStorageEvents.CLEANUP, async () => this.removeExpiredCache());
  }
  /**
   * Get the absolute UNIX timestamp the cache will be ended.
   * @return {number}
   * @constructor
   */


  get WillExpireAt() {
    return Date.now() + this.aliveDuration;
  }
  /**
   * Get the context for logger().
   *
   * @param {Record<string, string>?} customContext The additional context.
   * @return {Record<string, string>}
   */


  getLoggerContext(customContext = {}) {
    return { ...customContext,
      cacheStorageId: this.id
    };
  }
  /**
   * Remove the expired cache.
   */


  removeExpiredCache() {
    logger$3.debug(this.getLoggerContext(), 'Cleaning up the expired caches...');
    this.cacheMap.forEach((cachedData, key) => {
      if (cachedData.expireAt <= Date.now()) this.cacheMap.delete(key);
    });
  }
  /**
   * Cache the response.
   *
   * @template T
   * @param {any} key the unique key of action to be cached.
   * @param {() => Promise<T>} action the action to do and be cached.
   * @param {number?} expireAt customize the expireAt of this key.
   * @return {Promise<T>}
   */


  async cache(key, action, expireAt) {
    // Disable the cache when the NO_CACHE = true.
    if (process.env.NO_CACHE === 'true') {
      return action();
    } // Push the CLEANUP task to the event loop - "polling",
    // so that it won't block the cache() task.


    this.emit(CacheStorageEvents.CLEANUP); // Check if we have cached it before.
    // If true, we return the cached value.

    const cachedData = this.cacheMap.get(key); // Object.toString() can't bring any useful information,
    // we show "Something" instead.

    const logKey = typeof key === 'object' ? 'Something' : key;

    if (cachedData) {
      logger$3.debug(this.getLoggerContext({
        logKey
      }), `${logKey} hit!`);
      return cachedData.data;
    } // Cache the response of action() and
    // register into our cache map.


    logger$3.debug(this.getLoggerContext({
      logKey: key
    }), `${logKey} did not hit. Storing the execution result...`);
    const sourceResponse = await action();
    this.cacheMap.set(key, {
      data: sourceResponse,
      expireAt: new Date(expireAt || this.WillExpireAt)
    });
    return sourceResponse;
  }

}
/**
 * The group which aimed to manage all CacheStorage and
 * call the common method such as `removeExpiredCache()`.
 */


class CacheStorageGroup$2 {
  /**
   * @type {CacheStorageGroup | undefined}
   */

  /** @type {Set<CacheStorage>} */

  /** @private */
  constructor() {
    _defineProperty(this, "cacheStorages", new Set());
  }
  /**
   * @return {CacheStorageGroup}
   */


  static getInstance() {
    if (!CacheStorageGroup$2.instance) CacheStorageGroup$2.instance = new CacheStorageGroup$2();
    return CacheStorageGroup$2.instance;
  }

  cleanup() {
    this.cacheStorages.forEach(storage => storage.removeExpiredCache());
  }

}
/**
 * The CacheStorageGroup instance that is used internally.
 *
 * Don't export it!
 *
 * @type {CacheStorageGroup}
 */


_defineProperty(CacheStorageGroup$2, "instance", undefined);

const csgInstance$1 = CacheStorageGroup$2.getInstance();
/**
 * Get the managed CacheStorage.
 *
 * “Managed” means that this CacheStorage has been
 * added to CacheStorageGroup.
 *
 * @param {string} id
 * @return {CacheStorage}
 */

function getManagedCacheStorage$b(id) {
  const cs = new CacheStorage(id);
  csgInstance$1.cacheStorages.add(cs);
  return cs;
}

var cache = {
  CacheStorage,
  CacheStorageEvents,
  CacheStorageGroup: CacheStorageGroup$2,
  getManagedCacheStorage: getManagedCacheStorage$b
};

var insure$6 = {exports: {}};

const EventEmitter = require$$0__default$2["default"];
const ON_CANCEL$1 = 'cancel';

class CancelRequest extends EventEmitter {
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
  CancelRequest,
  ON_CANCEL: ON_CANCEL$1
};

class RequestCancelled$1 extends Error {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(`This request URL has been cancelled: ${url}`);
    this.name = 'RequestCancelled';
  }

}

var RequestCancelled_1 = RequestCancelled$1;

const zlib = require$$0__default$4["default"];
const http = require$$1__default["default"];
const https = require$$2__default["default"];
const ON_CANCEL = cancel;
const RequestCancelled = RequestCancelled_1;
const {
  logScope: logScope$2
} = logger_1;
const parse$2 = require$$6__default["default"].parse;
const format$6 = require$$6__default["default"].format;
const logger$2 = logScope$2('request');
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
 * @typedef {((raw: true) => Promise<Buffer>) | ((raw: false) => Promise<string>)} RequestExtensionBody
 */

/**
 * @template T
 * @typedef {{url: string, body: RequestExtensionBody, json: () => Promise<T>, jsonp: () => Promise<T>}} RequestExtension
 */

/**
 * @template T
 * @param {string} method
 * @param {string} receivedUrl
 * @param {Object?} receivedHeaders
 * @param {unknown?} body
 * @param {unknown?} proxy
 * @param {CancelRequest?} cancelRequest
 * @return {Promise<http.IncomingMessage & RequestExtension<T>>}
 */


const request$9 = (method, receivedUrl, receivedHeaders, body, proxy, cancelRequest) => {
  const url = parse$2(receivedUrl);
  /* @type {Partial<Record<string,string>>} */

  const headers = receivedHeaders || {};
  const options = configure(method, url, {
    host: url.hostname,
    accept: 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    ...headers
  }, proxy);
  return new Promise((resolve, reject) => {
    var _cancelRequest$cancel;

    logger$2.debug(`Start requesting ${receivedUrl}`);
    const clientRequest = create(url, proxy)(options);

    const destroyClientRequest = function () {
      // We destroy the request and throw RequestCancelled
      // when the request has been cancelled.
      clientRequest.destroy(new RequestCancelled(format$6(url)));
    };

    cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.on(ON_CANCEL, destroyClientRequest);
    if ((_cancelRequest$cancel = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel !== void 0 ? _cancelRequest$cancel : false) destroyClientRequest();
    clientRequest.setTimeout(timeoutThreshold, () => {
      logger$2.warn({
        url: format$6(url)
      }, `The request timed out, or the requester didn't handle the response.`);
      destroyClientRequest();
    }).on('response', response => resolve(response)).on('connect', (_, socket) => {
      logger$2.debug('received CONNECT, continuing with https.request()...');
      https.request({
        method: method,
        path: url.path,
        headers: options._headers,
        socket: socket,
        agent: false
      }).on('response', response => resolve(response)).on('error', error => reject(error)).end(body);
    }).on('error', error => reject(error)).end(options.method.toUpperCase() === 'CONNECT' ? undefined : body);
  }).then(
  /** @param {http.IncomingMessage} response */
  response => {
    var _cancelRequest$cancel2;

    if ((_cancelRequest$cancel2 = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel2 !== void 0 ? _cancelRequest$cancel2 : false) return Promise.reject(new RequestCancelled(format$6(url)));

    if ([201, 301, 302, 303, 307, 308].includes(response.statusCode)) {
      const redirectTo = url.resolve(response.headers.location || url.href);
      logger$2.debug(`Redirect to ${redirectTo}`);
      delete headers.host;
      return request$9(method, redirectTo, headers, body, proxy);
    }

    return Object.assign(response, {
      url,
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

request$9.read = read;
request$9.create = create;
request$9.translate = translate;
request$9.configure = configure;
var request_1 = request$9;

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

const insure$5 = insure$6.exports;
const select$6 = select$7.exports;
const request$8 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$a
} = cache;
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

const search$8 = info => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?' + 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&' + 't=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=' + encodeURIComponent(info.keyword) + '&' + 'g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&' + 'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0';
  return request$8('GET', url).then(response => response.jsonp()).then(jsonBody => {
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
        guid: (Math.random() * 10000000).toFixed(0),
        loginflag: 1,
        filename: [format.join(id.file)],
        songmid: [id.song],
        songtype: [0],
        uin,
        platform: '20'
      }
    }
  }));
  return request$8('GET', url, headers$2).then(response => response.json()).then(jsonBody => {
    const {
      sip,
      midurlinfo
    } = jsonBody.req_0.data;
    return midurlinfo[0].purl ? sip[0] + midurlinfo[0].purl : Promise.reject();
  });
};

const track$9 = id => {
  id.key = id.file;
  return Promise.all([['F000', '.flac'], ['M800', '.mp3'], ['M500', '.mp3']].slice(headers$2.cookie || typeof window !== 'undefined' ? select$6.ENABLE_FLAC ? 0 : 1 : 2).map(format => single$2(id, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$5().qq.track(id));
};

const cs$a = getManagedCacheStorage$a('provider/qq');

const check$9 = info => cs$a.cache(info, () => search$8(info)).then(track$9);

var qq = {
  check: check$9,
  track: track$9
};

var crypto$3 = {exports: {}};

(function (module) {

  const crypto = require$$0__default$5["default"];
  const parse = require$$6__default["default"].parse;
  const bodyify = require$$2__default$1["default"].stringify;
  const eapiKey = 'e82ckenh8dichen8';
  const linuxapiKey = 'rFgB&h#%2?^eDg:Q';

  const decrypt = (buffer, key) => {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  };

  const encrypt = (buffer, key) => {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
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
    module.exports.kuwoapi = require('./kwDES');
  } catch (e) {}
})(crypto$3);

const insure$4 = insure$6.exports;
const select$5 = select$7.exports;
const crypto$2 = crypto$3.exports;
const request$7 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$9
} = cache;

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

const search$7 = info => {
  const url = // 'http://songsearch.kugou.com/song_search_v2?' +
  'http://mobilecdn.kugou.com/api/v3/search/song?' + 'keyword=' + encodeURIComponent(info.keyword) + '&page=1&pagesize=10';
  return request$7('GET', url).then(response => response.json()).then(jsonBody => {
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

  const url = 'http://trackercdn.kugou.com/i/v2/?' + 'key=' + crypto$2.md5.digest(`${getHashId()}kgcloudv2`) + '&hash=' + getHashId() + '&' + 'appid=1005&pid=2&cmd=25&behavior=play&album_id=' + song.album.id;
  return request$7('GET', url).then(response => response.json()).then(jsonBody => jsonBody.url[0] || Promise.reject());
};

const track$8 = song => Promise.all(['sqhash', 'hqhash', 'hash'].slice(select$5.ENABLE_FLAC ? 0 : 1).map(format => single$1(song, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$4().kugou.track(song));

const cs$9 = getManagedCacheStorage$9('provider/kugou');

const check$8 = info => cs$9.cache(info, () => search$7(info)).then(track$8);

var kugou = {
  check: check$8,
  search: search$7
};

const insure$3 = insure$6.exports;
const select$4 = select$7.exports;
const crypto$1 = crypto$3.exports;
const request$6 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$8
} = cache;

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

const search$6 = info => {
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
  return request$6('GET', `http://kuwo.cn/search/list?key=${keyword}`).then(response => response.headers['set-cookie'].find(line => line.includes('kw_token')).replace(/;.*/, '').split('=').pop()).then(token => request$6('GET', url, {
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

const track$7 = id => {
  const url = crypto$1.kuwoapi ? 'http://mobi.kuwo.cn/mobi.s?f=kuwo&q=' + crypto$1.kuwoapi.encryptQuery('corp=kuwo&p2p=1&type=convert_url2&sig=0&format=' + ['flac', 'mp3'].slice(select$4.ENABLE_FLAC ? 0 : 1).join('|') + '&rid=' + id) : 'http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_' + id; // flac refuse
  // : 'http://www.kuwo.cn/url?format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id // flac refuse

  return request$6('GET', url, {
    'user-agent': 'okhttp/3.10.0'
  }).then(response => response.body()).then(body => {
    const url = (body.match(/http[^\s$"]+/) || [])[0];
    return url || Promise.reject();
  }).catch(() => insure$3().kuwo.track(id));
};

const cs$8 = getManagedCacheStorage$8('provider/kuwo');

const check$7 = info => cs$8.cache(info, () => search$6(info)).then(track$7);

var kuwo = {
  check: check$7,
  track: track$7
};

const insure$2 = insure$6.exports;
const select$3 = select$7.exports;
const request$5 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$7
} = cache;
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

const search$5 = info => {
  const url = 'https://m.music.migu.cn/migu/remoting/scr_search_tag?' + 'keyword=' + encodeURIComponent(info.keyword) + '&type=2&rows=20&pgc=1';
  return request$5('GET', url, headers$1).then(response => response.json()).then(jsonBody => {
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
  return request$5('GET', url, headers$1).then(response => response.json()).then(jsonBody => {
    // const {playUrl} = jsonBody.data
    // return playUrl ? encodeURI('http:' + playUrl) : Promise.reject()
    const {
      formatType
    } = jsonBody.data;
    if (formatType !== format) return Promise.reject();else return url ? jsonBody.data.url : Promise.reject();
  });
};

const track$6 = id => Promise.all( // [3, 2, 1].slice(select.ENABLE_FLAC ? 0 : 1)
['ZQ', 'SQ', 'HQ', 'PQ'].slice(select$3.ENABLE_FLAC ? 0 : 2).map(format => single(id, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$2().migu.track(id));

const cs$7 = getManagedCacheStorage$7('provider/migu');

const check$6 = info => cs$7.cache(info, () => search$5(info)).then(track$6);

var migu = {
  check: check$6,
  track: track$6
};

const insure$1 = insure$6.exports;
const select$2 = select$7.exports;
const crypto = crypto$3.exports;
const request$4 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$6
} = cache;
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
  } = crypto.base64;
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

const search$4 = info => {
  const keyword = fit(info);
  const url = 'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 'country=hk&lang=zh_TW&' + 'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30';
  return request$4('GET', url, headers).then(response => response.body()).then(body => {
    const jsonBody = JSON.parse(body.replace(/'/g, '"'));
    const list = jsonBody.itemlist.map(format$1);
    const matched = select$2(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$5 = id => {
  const url = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 'channel_id=-1&_=' + new Date().getTime();
  return request$4('GET', url, headers).then(response => response.jsonp()).then(jsonBody => {
    const songUrl = (jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl).replace(/M\d00([\w]+).mp3/, 'M800$1.mp3');
    if (songUrl) return songUrl;else return Promise.reject();
  }).catch(() => insure$1().joox.track(id));
};

const cs$6 = getManagedCacheStorage$6('provider/joox');

const check$5 = info => cs$6.cache(info, () => search$4(info)).then(track$5);

var joox = {
  check: check$5,
  track: track$5
};

const request$3 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$5
} = cache;

const parse$1 = query => (query || '').split('&').reduce((result, item) => {
  const splitItem = item.split('=').map(decodeURIComponent);
  return Object.assign({}, result, {
    [splitItem[0]]: splitItem[1]
  });
}, {});

const cs$5 = getManagedCacheStorage$5('provider/youtube'); // const proxy = require('url').parse('http://127.0.0.1:1080')

const proxy$1 = undefined;
const key$1 = process.env.YOUTUBE_KEY || null; // YouTube Data API v3

const signature = (id = '-tKVN2mAKRI') => {
  const url = `https://www.youtube.com/watch?v=${id}`;
  return request$3('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    let assets = /"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO":{[^}]+}/.exec(body)[0];
    assets = JSON.parse(`{${assets}}}`).WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO;
    return request$3('GET', 'https://youtube.com' + assets.jsUrl, {}, null, proxy$1).then(response => response.body());
  }).then(body => {
    const [, funcArg, funcBody] = /function\((\w+)\)\s*{([^}]+split\(""\)[^}]+join\(""\))};/.exec(body);
    const helperName = /;(.+?)\..+?\(/.exec(funcBody)[1];
    const helperContent = new RegExp(`var ${helperName}={[\\s\\S]+?};`).exec(body)[0];
    return new Function([funcArg], helperContent + '\n' + funcBody);
  });
};

const apiSearch$1 = info => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key$1}`;
  return request$3('GET', url, {
    accept: 'application/json'
  }, null, proxy$1).then(response => response.json()).then(jsonBody => {
    const matched = jsonBody.items[0];
    if (matched) return matched.id.videoId;else return Promise.reject();
  });
};

const search$3 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$3('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
    const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
    if (matched) return matched.videoRenderer.videoId;else return Promise.reject();
  });
};

const track$4 = id => {
  /*
   * const url =
   * 	'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
   * const json_header = { 'Content-Type': 'application/json; charset=utf-8' };
   * const json_body = `{
   * 	"context": {
   * 		"client": {
   * 			"hl": "en",
   * 			"clientName": "WEB",
   * 			"clientVersion": "2.20210721.00.00"
   * 		}
   * 	},
   * 	"videoId": "${id}"
   * }`;
   */
  const url = `https://www.youtube.com/watch?v=${id}`;
  return (// request('POST', url, json_header, json_body, proxy)
    request$3('GET', url, {}, null, proxy$1).then(response => response.body()) // .then((body) => JSON.parse(body).streamingData)
    .then(body => JSON.parse(body.match(/ytInitialPlayerResponse\s*=\s*{[^]+};\s*var\s*meta/)[0].replace(/;var meta/, '').replace(/ytInitialPlayerResponse = /, '')).streamingData).then(streamingData => {
      const stream = streamingData.formats.concat(streamingData.adaptiveFormats).find(format => format.itag === 140); // .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
      // .sort((a, b) => b.bitrate - a.bitrate)[0]

      const target = parse$1(stream.signatureCipher);
      return stream.url || (target.sp.includes('sig') ? cs$5.cache('YOUTUBE_SIGNATURE', () => signature(), Date.now() + 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url);
    })
  );
};

const check$4 = info => cs$5.cache(info, () => {
  if (key$1) return apiSearch$1(info);
  return search$3(info);
}).then(track$4);

var youtube = {
  check: check$4,
  track: track$4
};

const request$2 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$4
} = cache; // const proxy = require('url').parse('http://127.0.0.1:1080')

const proxy = undefined;
const key = process.env.YOUTUBE_KEY || null; // YouTube Data API v3

const apiSearch = info => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`;
  return request$2('GET', url, {
    accept: 'application/json'
  }, null, proxy).then(response => response.json()).then(jsonBody => {
    const matched = jsonBody.items[0];
    if (matched) return matched.id.videoId;else return Promise.reject();
  });
};

const search$2 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$2('GET', url, {}, null, proxy).then(response => response.body()).then(body => {
    const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
    const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
    if (matched) return matched.videoRenderer.videoId;else return Promise.reject();
  });
};

const track$3 = id => {
  const url = `https://www.yt-download.org/api/button/mp3/${id}`;
  const regex = /<a[^>]*href=["']([^"']*)["']/;
  return request$2('GET', url, {}, null, proxy).then(response => response.body()).then(body => {
    var matched = body.match(regex);
    return matched ? matched[1] : Promise.reject();
  });
};

const cs$4 = getManagedCacheStorage$4('provider/yt-download');

const check$3 = info => cs$4.cache(info, () => {
  if (key) return apiSearch(info);
  return search$2(info);
}).then(track$3);

var ytDownload = {
  check: check$3,
  track: track$3
};

class YoutubeDlInvalidResponse$1 extends Error {
  constructor(response) {
    super(`The response of youtube-dl is malformed.`);
    this.name = 'YoutubeDlInvalidResponse';
    this.response = response;
  }

}

var YoutubeDlInvalidResponse_1 = YoutubeDlInvalidResponse$1;

class YoutubeDlNotInstalled$1 extends Error {
  constructor() {
    super(`You must install "youtube-dl" before using the "youtubedl" source.`);
    this.name = 'YoutubeDlNotInstalled';
  }

}

var YoutubeDlNotInstalled_1 = YoutubeDlNotInstalled$1;

class ProcessExitNotSuccessfully$1 extends Error {
  constructor(process, exitCode) {
    super(`${process} exited with ${exitCode}, which is not zero.`);
    this.process = process;
    this.exitCode = exitCode;
    this.name = 'ProcessExitNotSuccessfully';
  }

}

var ProcessExitNotSuccessfully_1 = ProcessExitNotSuccessfully$1;

const child_process = require$$0__default$6["default"];
const {
  logScope: logScope$1
} = logger_1;
const ProcessExitNotSuccessfully = ProcessExitNotSuccessfully_1;
const logger$1 = logScope$1('spawn');
/**
 * @typedef {{stdout: Buffer, stderr: Buffer}} ExecutionResult
 */

/**
 * Spawn a command and get the execution result of that.
 *
 * @param {string} cmd The command. Example: `ls`
 * @param {string[]?} args The arguments list
 * @return {Promise<ExecutionResult>} The execution result (stdout and stderr) of this execution.
 * @example ```js
 * const { stdout, stderr } = await spawnStdout("ls");
 * console.log(stdout.toString());
 * ```
 */

async function spawnStdout$1(cmd, args = []) {
  return new Promise((resolve, reject) => {
    let stdoutOffset = 0;
    let stderrOffset = 0;
    const stdout = Buffer.alloc(5 * 1e3 * 1e3);
    const stderr = Buffer.alloc(5 * 1e3 * 1e3);
    const spawn = child_process.spawn(cmd, args);
    spawn.on('spawn', () => {
      // Users should acknowledge what command is executing.
      logger$1.info(`running ${cmd} ${args.join(' ')}`);
    });
    spawn.on('error', error => reject(error));
    spawn.on('close', code => {
      if (code !== 0) reject(new ProcessExitNotSuccessfully(cmd, code));else {
        logger$1.debug(`process ${cmd} exited successfully`);
        resolve({
          stdout: stdout.slice(0, stdoutOffset),
          stderr: stderr.slice(0, stderrOffset)
        });
      }
    });
    spawn.stdout.on('data', stdoutPart => {
      stdoutOffset += stdoutPart.copy(stdout, stdoutOffset);
    });
    spawn.stderr.on('data', stderrPart => {
      logger$1.warn(`[${cmd}][stderr] ${stderrPart}`);
      stderrOffset += stderrPart.copy(stderr, stderrOffset);
    });
  });
}

var spawn = {
  spawnStdout: spawnStdout$1
};

const {
  getManagedCacheStorage: getManagedCacheStorage$3
} = cache;
const {
  logScope
} = logger_1;
const YoutubeDlInvalidResponse = YoutubeDlInvalidResponse_1;
const YoutubeDlNotInstalled = YoutubeDlNotInstalled_1;
const {
  spawnStdout
} = spawn;
/**
 * The arguments to pass to youtube-dl
 *
 * ```plain
 * youtube-dl -f bestaudio --dump-json <query>
 *		-f bestaudio 	choose the best quality of the audio
 *		--dump-json		dump the information as JSON without downloading it
 * ```
 *
 * @param {string} query
 */

const dlArguments = query => ['-f', '140', '--dump-json', query];
/** @param {string} id */


const byId = id => `https://www.youtube.com/watch?v=${id}`;
/** @param {string} keyword */


const byKeyword = keyword => `ytsearch1:${keyword}`;

const logger = logScope('provider/youtube-dl');
/**
 * Checking if youtube-dl is available,
 * then execute the command and extract the ID and URL.
 *
 * @param {string[]} args
 * @returns {Promise<{id: string, url: string}>}
 */

async function getUrl(args) {
  try {
    const {
      stdout
    } = await spawnStdout('youtube-dl', args);
    const response = JSON.parse(stdout.toString());
    if (typeof response === 'object' && typeof response.id === 'string' && typeof response.url === 'string') return response;
    throw new YoutubeDlInvalidResponse(response);
  } catch (e) {
    if (e && e.code === 'ENOENT') throw new YoutubeDlNotInstalled();
    throw e;
  }
}

const search$1 = async info => {
  const {
    id
  } = await getUrl(dlArguments(byKeyword(info.keyword)));
  return id;
};

const track$2 = async id => {
  const {
    url
  } = await getUrl(dlArguments(byId(id)));
  return url;
};

const cs$3 = getManagedCacheStorage$3('youtube-dl');

const check$2 = info => cs$3.cache(info, () => search$1(info)).then(track$2).catch(e => {
  if (e) logger.error(e);
  throw e;
});

var youtubeDl = {
  check: check$2,
  track: track$2
};

const {
  cacheStorage,
  CacheStorageGroup: CacheStorageGroup$1,
  getManagedCacheStorage: getManagedCacheStorage$2
} = cache;
const insure = insure$6.exports;
const select$1 = select$7.exports;
const request$1 = request_1;

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
  return request$1('GET', url).then(response => response.json()).then(jsonBody => {
    const list = jsonBody.data.result.map(format);
    const matched = select$1(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$1 = id => {
  const url = 'https://www.bilibili.com/audio/music-service-c/web/url?rivilege=2&quality=2&' + 'sid=' + id;
  return request$1('GET', url).then(response => response.json()).then(jsonBody => {
    if (jsonBody.code === 0) {
      // bilibili music requires referer, connect do not support referer, so change to http
      return jsonBody.data.cdns[0].replace('https', 'http');
    } else {
      return Promise.reject();
    }
  }).catch(() => insure().bilibili.track(id));
};

const cs$2 = getManagedCacheStorage$2('provider/bilibili');

const check$1 = info => cs$2.cache(info, () => search(info)).then(track$1);

var bilibili = {
  check: check$1,
  track: track$1
};

const select = select$7.exports;
const request = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$1
} = cache;

const track = info => {
  const url = 'http://mos9527.tooo.top/ncm/pyncm/track/GetTrackAudio?song_ids=' + info.id + '&bitrate=' + ['999000', '320000'].slice(select.ENABLE_FLAC ? 0 : 1, select.ENABLE_FLAC ? 1 : 2);
  return request('GET', url).then(response => response.body()).then(body => {
    // response.body() without raw should
    // transform the response to string.
    if (typeof body !== 'string') return Promise.reject('response.body() returns a value whose type is not string.');
    const jsonBody = JSON.parse(body);
    const matched = jsonBody.data.find(song => song.id === info.id);
    if (matched) return matched.url;
    return Promise.reject();
  });
};

const cs$1 = getManagedCacheStorage$1('provider/pyncmd');

const check = info => cs$1.cache(info, () => track(info));

var pyncmd = {
  check
};

const DEFAULT_SOURCE = ['kugou', 'kuwo', 'migu', 'bilibili'];
const PROVIDERS = {
  qq: qq,
  kugou: kugou,
  kuwo: kuwo,
  migu: migu,
  joox: joox,
  youtube: youtube,
  ytdownload: ytDownload,
  youtubedl: youtubeDl,
  bilibili: bilibili,
  pyncmd: pyncmd
};
var consts = {
  DEFAULT_SOURCE,
  PROVIDERS
};

const {
  getManagedCacheStorage,
  CacheStorageGroup
} = cache;
const parse = require$$6__default["default"].parse;
insure$6.exports.disable = true;
const router = consts.PROVIDERS;
const cs = getManagedCacheStorage('bridge');
cs.aliveDuration = 15 * 60 * 1000;

const distribute = (url, router) => Promise.resolve().then(() => {
  const route = url.pathname.slice(1).split('/').map(path => decodeURIComponent(path));
  let pointer = router,
      argument = decodeURIComponent(url.query);

  try {
    argument = JSON.parse(argument);
  } catch (e) {}

  const miss = route.some(path => {
    if (path in pointer) pointer = pointer[path];else return true;
  });
  if (miss || typeof pointer != 'function') return Promise.reject();
  return cs.cache(argument, () => pointer(argument));
}); // Start the "Clean Cache" background task.


const csgInstance = CacheStorageGroup.getInstance();
setInterval(() => {
  csgInstance.cleanup();
}, 15 * 60 * 1000);
require$$1__default["default"].createServer().listen(parseInt(process.argv[2]) || 9000).on('request', (req, res) => distribute(parse(req.url), router).then(data => res.write(data)).catch(() => res.writeHead(404)).then(() => res.end()));

module.exports = bridge;
