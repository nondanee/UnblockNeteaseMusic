#!/usr/bin/node

'use strict';

var require$$0$3 = require('events');
var require$$0$6 = require('os');
var require$$0$1 = require('vm');
var require$$0$2 = require('fs');
var require$$3 = require('util');
var require$$0$4 = require('tty');
var require$$0$5 = require('stream');
var require$$1 = require('string_decoder');
var require$$3$1 = require('path');
var require$$6 = require('url');
var require$$0$7 = require('zlib');
var require$$1$1 = require('http');
var require$$2 = require('https');
var require$$0$8 = require('crypto');
var require$$2$1 = require('querystring');
var require$$0$9 = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$3__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$3$1);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$0__default$6 = /*#__PURE__*/_interopDefaultLegacy(require$$0$7);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$7 = /*#__PURE__*/_interopDefaultLegacy(require$$0$8);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$8 = /*#__PURE__*/_interopDefaultLegacy(require$$0$9);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

var check$a = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$b = // eslint-disable-next-line es/no-global-this -- safe
check$a(typeof globalThis == 'object' && globalThis) || check$a(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check$a(typeof self == 'object' && self) || check$a(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$6 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$5 = fails$6; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$5(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
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

var fails$4 = fails$6;
var classof$3 = classofRaw$1;
var split$2 = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$4(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$3(it) == 'String' ? split$2.call(it, '') : Object(it);
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

var isCallable$c = function (argument) {
  return typeof argument === 'function';
};

var isCallable$b = isCallable$c;

var isObject$7 = function (it) {
  return typeof it === 'object' ? it !== null : isCallable$b(it);
};

var global$a = global$b;
var isCallable$a = isCallable$c;

var aFunction = function (argument) {
  return isCallable$a(argument) ? argument : undefined;
};

var getBuiltIn$e = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$a[namespace]) : global$a[namespace] && global$a[namespace][method];
};

var getBuiltIn$d = getBuiltIn$e;
var engineUserAgent = getBuiltIn$d('navigator', 'userAgent') || '';

var global$9 = global$b;
var userAgent = engineUserAgent;
var process$1 = global$9.process;
var Deno = global$9.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version$4;

if (v8) {
  match = v8.split('.');
  version$4 = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version$4 = match[1];
  }
}

var engineV8Version = version$4 && +version$4;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version;
var fails$3 = fails$6; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$3(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var isCallable$9 = isCallable$c;
var getBuiltIn$c = getBuiltIn$e;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$c('Symbol');
  return isCallable$9($Symbol) && Object(it) instanceof $Symbol;
};

var tryToString$2 = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$8 = isCallable$c;
var tryToString$1 = tryToString$2; // `Assert: IsCallable(argument) is true`

var aCallable$l = function (argument) {
  if (isCallable$8(argument)) return argument;
  throw TypeError(tryToString$1(argument) + ' is not a function');
};

var aCallable$k = aCallable$l; // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$k(func);
};

var isCallable$7 = isCallable$c;
var isObject$6 = isObject$7; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
  if (isCallable$7(fn = input.valueOf) && !isObject$6(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var isPure = false;

var global$8 = global$b;

var setGlobal$3 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$8, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$8[key] = value;
  }

  return value;
};

var global$7 = global$b;
var setGlobal$2 = setGlobal$3;
var SHARED = '__core-js_shared__';
var store$3 = global$7[SHARED] || setGlobal$2(SHARED, {});
var sharedStore = store$3;

var store$2 = sharedStore;
(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.18.2',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var requireObjectCoercible = requireObjectCoercible$2; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$1 = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var toObject = toObject$1;
var hasOwnProperty = {}.hasOwnProperty; // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$2 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$6 = global$b;
var shared$2 = shared$3.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$6.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$6 = function (name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
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
var wellKnownSymbol$5 = wellKnownSymbol$6;
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive'); // `ToPrimitive` abstract operation
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

var global$5 = global$b;
var isObject$4 = isObject$7;
var document = global$5.document; // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$4(document) && isObject$4(document.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document.createElement(it) : {};
};

var DESCRIPTORS$4 = descriptors;
var fails$2 = fails$6;
var createElement = documentCreateElement; // Thank's IE8 for his funny defineProperty

var ie8DomDefine = !DESCRIPTORS$4 && !fails$2(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
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
var hasOwn$5 = hasOwnProperty_1;
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
  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$3 = isObject$7; // `Assert: Type(argument) is Object`

var anObject$y = function (argument) {
  if (isObject$3(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$x = anObject$y;
var toPropertyKey = toPropertyKey$2; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$x(O);
  P = toPropertyKey(P);
  anObject$x(Attributes);
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
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$1 ? function (object, key, value) {
  return definePropertyModule$1.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$1 = {exports: {}};

var isCallable$6 = isCallable$c;
var store$1 = sharedStore;
var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$4 = global$b;
var isCallable$5 = isCallable$c;
var inspectSource$2 = inspectSource$3;
var WeakMap$1 = global$4.WeakMap;
var nativeWeakMap = isCallable$5(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$3 = global$b;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$4 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$3.WeakMap;
var set, get$1, has$1;

var enforce = function (it) {
  return has$1(it) ? get$1(it) : set(it, {});
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

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get$1 = function (it) {
    return wmget.call(store, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;

  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };

  get$1 = function (it) {
    return hasOwn$4(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return hasOwn$4(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get$1,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var DESCRIPTORS = descriptors;
var hasOwn$3 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$3(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$2 = global$b;
var isCallable$4 = isCallable$c;
var hasOwn$2 = hasOwnProperty_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable$4(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn$2(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty$1(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global$2) {
    if (simple) O[key] = value;else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty$1(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;
var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1; // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$2 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$2; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike$1(O);
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

var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
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
var anObject$w = anObject$y; // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$b('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$w(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var hasOwn = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$1 = fails$6;
var isCallable$3 = isCallable$c;
var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize$1(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$3(detection) ? fails$1(detection) : !!detection;
};

var normalize$1 = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';
var isForced_1 = isForced$2;

var global$1 = global$b;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var redefine = redefine$1.exports;
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
    target = global$1;
  } else if (STATIC) {
    target = global$1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$1[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
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


    redefine(target, key, sourceProperty, options);
  }
};

var aCallable$j = aCallable$l;
var anObject$v = anObject$y; // https://github.com/tc39/collection-methods

var collectionDeleteAll$2 = function () {
  var collection = anObject$v(this);
  var remover = aCallable$j(collection['delete']);
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

var aCallable$i = aCallable$l; // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aCallable$i(fn);
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

var getMapIterator$a = function (it) {
  // eslint-disable-next-line es/no-map -- safe
  return Map.prototype.entries.call(it);
};

var iterators = {};

var wellKnownSymbol$4 = wellKnownSymbol$6;
var Iterators$1 = iterators;
var ITERATOR$1 = wellKnownSymbol$4('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$1] === it);
};

var wellKnownSymbol$3 = wellKnownSymbol$6;
var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
var test = {};
test[TO_STRING_TAG$1] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$2 = isCallable$c;
var classofRaw = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$6;
var TO_STRING_TAG = wellKnownSymbol$2('toStringTag'); // ES3 wrong here

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
  : (result = classofRaw(O)) == 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
};

var classof$1 = classof$2;
var getMethod$1 = getMethod$3;
var Iterators = iterators;
var wellKnownSymbol$1 = wellKnownSymbol$6;
var ITERATOR = wellKnownSymbol$1('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod$1(it, ITERATOR) || getMethod$1(it, '@@iterator') || Iterators[classof$1(it)];
};

var aCallable$h = aCallable$l;
var anObject$u = anObject$y;
var getIteratorMethod$1 = getIteratorMethod$2;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$h(iteratorMethod)) return anObject$u(iteratorMethod.call(argument));
  throw TypeError(String(argument) + ' is not iterable');
};

var anObject$t = anObject$y;
var getMethod = getMethod$3;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$t(iterator);

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
  anObject$t(innerResult);
  return value;
};

var anObject$s = anObject$y;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$2;
var bind$c = functionBindContext;
var getIterator$1 = getIterator$2;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$p = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$c(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$s(value);
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
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
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

var $$r = _export;
var IS_PURE$r = isPure;
var anObject$r = anObject$y;
var bind$b = functionBindContext;
var getMapIterator$9 = getMapIterator$a;
var iterate$o = iterate$p; // `Map.prototype.every` method
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
    var map = anObject$r(this);
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

var fails = fails$6;
var isCallable$1 = isCallable$c;
var classof = classof$2;
var getBuiltIn$a = getBuiltIn$e;
var inspectSource = inspectSource$3;
var empty = [];
var construct = getBuiltIn$a('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = constructorRegExp.exec;
var INCORRECT_TO_STRING = !constructorRegExp.exec(function () {
  /* empty */
});

var isConstructorModern = function (argument) {
  if (!isCallable$1(argument)) return false;

  try {
    construct(Object, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable$1(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
}; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor


var isConstructor$1 = !construct || fails(function () {
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

var anObject$q = anObject$y;
var aConstructor = aConstructor$1;
var wellKnownSymbol = wellKnownSymbol$6;
var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

var speciesConstructor$9 = function (O, defaultConstructor) {
  var C = anObject$q(O).constructor;
  var S;
  return C === undefined || (S = anObject$q(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};

var $$q = _export;
var IS_PURE$q = isPure;
var getBuiltIn$9 = getBuiltIn$e;
var aCallable$g = aCallable$l;
var anObject$p = anObject$y;
var bind$a = functionBindContext;
var speciesConstructor$8 = speciesConstructor$9;
var getMapIterator$8 = getMapIterator$a;
var iterate$n = iterate$p; // `Map.prototype.filter` method
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
var anObject$o = anObject$y;
var bind$9 = functionBindContext;
var getMapIterator$7 = getMapIterator$a;
var iterate$m = iterate$p; // `Map.prototype.find` method
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
var anObject$n = anObject$y;
var bind$8 = functionBindContext;
var getMapIterator$6 = getMapIterator$a;
var iterate$l = iterate$p; // `Map.prototype.findKey` method
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
var anObject$m = anObject$y;
var getMapIterator$5 = getMapIterator$a;
var sameValueZero = sameValueZero$1;
var iterate$k = iterate$p; // `Map.prototype.includes` method
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
var anObject$l = anObject$y;
var getMapIterator$4 = getMapIterator$a;
var iterate$j = iterate$p; // `Map.prototype.keyOf` method
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
var getBuiltIn$8 = getBuiltIn$e;
var aCallable$f = aCallable$l;
var anObject$k = anObject$y;
var bind$7 = functionBindContext;
var speciesConstructor$7 = speciesConstructor$9;
var getMapIterator$3 = getMapIterator$a;
var iterate$i = iterate$p; // `Map.prototype.mapKeys` method
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
var getBuiltIn$7 = getBuiltIn$e;
var aCallable$e = aCallable$l;
var anObject$j = anObject$y;
var bind$6 = functionBindContext;
var speciesConstructor$6 = speciesConstructor$9;
var getMapIterator$2 = getMapIterator$a;
var iterate$h = iterate$p; // `Map.prototype.mapValues` method
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
var aCallable$d = aCallable$l;
var anObject$i = anObject$y;
var iterate$g = iterate$p; // `Map.prototype.merge` method
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
var anObject$h = anObject$y;
var aCallable$c = aCallable$l;
var getMapIterator$1 = getMapIterator$a;
var iterate$f = iterate$p; // `Map.prototype.reduce` method
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
var anObject$g = anObject$y;
var bind$5 = functionBindContext;
var getMapIterator = getMapIterator$a;
var iterate$e = iterate$p; // `Set.prototype.some` method
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
var anObject$f = anObject$y;
var aCallable$b = aCallable$l; // `Set.prototype.update` method
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

var aCallable$a = aCallable$l;
var anObject$e = anObject$y; // https://github.com/tc39/collection-methods

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
var getBuiltIn$6 = getBuiltIn$e;
var aCallable$9 = aCallable$l;
var anObject$d = anObject$y;
var speciesConstructor$5 = speciesConstructor$9;
var iterate$d = iterate$p; // `Set.prototype.difference` method
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
var anObject$c = anObject$y;
var bind$4 = functionBindContext;
var getSetIterator$6 = getSetIterator$7;
var iterate$c = iterate$p; // `Set.prototype.every` method
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
var getBuiltIn$5 = getBuiltIn$e;
var aCallable$8 = aCallable$l;
var anObject$b = anObject$y;
var bind$3 = functionBindContext;
var speciesConstructor$4 = speciesConstructor$9;
var getSetIterator$5 = getSetIterator$7;
var iterate$b = iterate$p; // `Set.prototype.filter` method
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
var anObject$a = anObject$y;
var bind$2 = functionBindContext;
var getSetIterator$4 = getSetIterator$7;
var iterate$a = iterate$p; // `Set.prototype.find` method
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
var getBuiltIn$4 = getBuiltIn$e;
var aCallable$7 = aCallable$l;
var anObject$9 = anObject$y;
var speciesConstructor$3 = speciesConstructor$9;
var iterate$9 = iterate$p; // `Set.prototype.intersection` method
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
var aCallable$6 = aCallable$l;
var anObject$8 = anObject$y;
var iterate$8 = iterate$p; // `Set.prototype.isDisjointFrom` method
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
var getBuiltIn$3 = getBuiltIn$e;
var aCallable$5 = aCallable$l;
var isCallable = isCallable$c;
var anObject$7 = anObject$y;
var getIterator = getIterator$2;
var iterate$7 = iterate$p; // `Set.prototype.isSubsetOf` method
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
var aCallable$4 = aCallable$l;
var anObject$6 = anObject$y;
var iterate$6 = iterate$p; // `Set.prototype.isSupersetOf` method
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
var anObject$5 = anObject$y;
var getSetIterator$3 = getSetIterator$7;
var iterate$5 = iterate$p; // `Set.prototype.join` method
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
var getBuiltIn$2 = getBuiltIn$e;
var aCallable$3 = aCallable$l;
var anObject$4 = anObject$y;
var bind$1 = functionBindContext;
var speciesConstructor$2 = speciesConstructor$9;
var getSetIterator$2 = getSetIterator$7;
var iterate$4 = iterate$p; // `Set.prototype.map` method
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
var aCallable$2 = aCallable$l;
var anObject$3 = anObject$y;
var getSetIterator$1 = getSetIterator$7;
var iterate$3 = iterate$p; // `Set.prototype.reduce` method
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
var anObject$2 = anObject$y;
var bind = functionBindContext;
var getSetIterator = getSetIterator$7;
var iterate$2 = iterate$p; // `Set.prototype.some` method
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
var getBuiltIn$1 = getBuiltIn$e;
var aCallable$1 = aCallable$l;
var anObject$1 = anObject$y;
var speciesConstructor$1 = speciesConstructor$9;
var iterate$1 = iterate$p; // `Set.prototype.symmetricDifference` method
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
var getBuiltIn = getBuiltIn$e;
var aCallable = aCallable$l;
var anObject = anObject$y;
var speciesConstructor = speciesConstructor$9;
var iterate = iterate$p; // `Set.prototype.union` method
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
var parse_1 = parse$5;

function parse$5({
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
const parse$4 = parse_1;
const redactor = redactor_1;
const restorer = restorer_1;
const {
  groupRedact,
  nestedRedact
} = modifiers;
const state = state_1;
const rx$1 = rx$4;
const validate$1 = validator$1();

const noop$6 = o => o;

noop$6.restore = noop$6;
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
  if (paths.length === 0) return serialize || noop$6;
  validate$1({
    paths,
    serialize,
    censor
  });
  const {
    wildcards,
    wcLen,
    secret
  } = parse$4({
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

const fs$2 = require$$0__default$1["default"];
const EventEmitter$4 = require$$0__default$2["default"];
const inherits$1 = require$$3__default["default"].inherits;
const BUSY_WRITE_TIMEOUT$1 = 100;
const sleep$1 = atomicSleep.exports; // 16 MB - magic number
// This constant ensures that SonicBoom only needs
// 32 MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.

const MAX_WRITE$1 = 16 * 1024 * 1024;

function openFile$1(file, sonic) {
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
      actualWrite$1(sonic);
    }
  }

  if (sonic.sync) {
    try {
      const fd = fs$2.openSync(file, 'a');
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err;
    }
  } else {
    fs$2.open(file, 'a', fileOpened);
  }
}

function SonicBoom$3(opts) {
  if (!(this instanceof SonicBoom$3)) {
    return new SonicBoom$3(opts);
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
    openFile$1(fd, this);
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
            sleep$1(BUSY_WRITE_TIMEOUT$1);
            this.release(undefined, 0);
          } catch (err) {
            this.release(err);
          }
        } else {
          // Let's give the destination some time to process the chunk.
          setTimeout(() => {
            fs$2.write(this.fd, this._writingBuf, 'utf8', this.release);
          }, BUSY_WRITE_TIMEOUT$1);
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
            n = fs$2.writeSync(this.fd, this._writingBuf, 'utf8');
            this._writingBuf = this._writingBuf.slice(n);
          } while (this._writingBuf.length !== 0);
        } catch (err) {
          this.release(err);
          return;
        }
      } else {
        fs$2.write(this.fd, this._writingBuf, 'utf8', this.release);
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
      actualWrite$1(this);
    } else if (this._ending) {
      if (len > 0) {
        actualWrite$1(this);
      } else {
        this._writing = false;
        actualClose$1(this);
      }
    } else {
      this._writing = false;

      if (this.sync) {
        if (!this._asyncDrainScheduled) {
          this._asyncDrainScheduled = true;
          process.nextTick(emitDrain$1, this);
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

function emitDrain$1(sonic) {
  const hasListeners = sonic.listenerCount('drain') > 0;
  if (!hasListeners) return;
  sonic._asyncDrainScheduled = false;
  sonic.emit('drain');
}

inherits$1(SonicBoom$3, EventEmitter$4);

SonicBoom$3.prototype.write = function (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  this._buf += data;
  const len = this._buf.length;

  if (!this._writing && len > this.minLength) {
    actualWrite$1(this);
  }

  return len < 16384;
};

SonicBoom$3.prototype.flush = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this._writing || this.minLength <= 0) {
    return;
  }

  actualWrite$1(this);
};

SonicBoom$3.prototype.reopen = function (file) {
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
      fs$2.close(fd, err => {
        if (err) {
          return this.emit('error', err);
        }
      });
    }
  });
  openFile$1(file || this.file, this);
};

SonicBoom$3.prototype.end = function () {
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
    actualWrite$1(this);
    return;
  }

  if (this._writing) {
    return;
  }

  actualClose$1(this);
};

SonicBoom$3.prototype.flushSync = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet');
  }

  while (this._buf.length > 0) {
    try {
      fs$2.writeSync(this.fd, this._buf, 'utf8');
      this._buf = '';
    } catch (err) {
      if (err.code !== 'EAGAIN') {
        throw err;
      }

      sleep$1(BUSY_WRITE_TIMEOUT$1);
    }
  }
};

SonicBoom$3.prototype.destroy = function () {
  if (this.destroyed) {
    return;
  }

  actualClose$1(this);
};

function actualWrite$1(sonic) {
  sonic._writing = true;
  let buf = sonic._buf;
  const release = sonic.release;

  if (buf.length > MAX_WRITE$1) {
    buf = buf.slice(0, MAX_WRITE$1);
    sonic._buf = sonic._buf.slice(MAX_WRITE$1);
  } else {
    sonic._buf = '';
  }
  sonic._writingBuf = buf;

  if (sonic.sync) {
    try {
      const written = fs$2.writeSync(sonic.fd, buf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs$2.write(sonic.fd, buf, 'utf8', release);
  }
}

function actualClose$1(sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose$1.bind(null, sonic));
    return;
  } // TODO write a test to check if we are not leaking fds


  fs$2.close(sonic.fd, err => {
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

var sonicBoom$1 = SonicBoom$3;

const {
  format: format$9
} = require$$3__default["default"];

function build$1() {
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

var fastifyWarning = build$1;

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

function defaultOptions$2() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
} // Regular stringify


function stringify$3(obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions$2();
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
    options = defaultOptions$2();
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

var pinoPretty = {exports: {}};

var colorette = {};

Object.defineProperty(colorette, '__esModule', {
  value: true
});
var tty = require$$0__default$3["default"];

function _interopNamespace$1(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);

  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }

  n["default"] = e;
  return Object.freeze(n);
}

var tty__namespace = /*#__PURE__*/_interopNamespace$1(tty);

const env = process.env || {};
const argv = process.argv || [];
const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
const isForced = "FORCE_COLOR" in env || argv.includes("--color");
const isWindows = process.platform === "win32";
const isCompatibleTerminal = tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && env.TERM !== "dumb";
const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
const isColorSupported$1 = !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI);

const replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));

const clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;

const filterEmpty = (open, close, replace = open, at = open.length + 1) => string => string || !(string === "" || string === undefined) ? clearBleed(("" + string).indexOf(close, at), string, open, close, replace) : "";

const init = (open, close, replace) => filterEmpty(`\x1b[${open}m`, `\x1b[${close}m`, replace);

const colors$2 = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1b[22m\x1b[1m"),
  dim: init(2, 22, "\x1b[22m\x1b[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};

const none = any => any;

const createColors$1 = ({
  useColor = isColorSupported$1
} = {}) => useColor ? colors$2 : Object.keys(colors$2).reduce((colors, key) => ({ ...colors,
  [key]: none
}), {});

const {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red: red$1,
  green: green$1,
  yellow: yellow$1,
  blue: blue$1,
  magenta,
  cyan: cyan$1,
  white: white$1,
  gray: gray$1,
  bgBlack,
  bgRed: bgRed$1,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright
} = createColors$1();
colorette.bgBlack = bgBlack;
colorette.bgBlackBright = bgBlackBright;
colorette.bgBlue = bgBlue;
colorette.bgBlueBright = bgBlueBright;
colorette.bgCyan = bgCyan;
colorette.bgCyanBright = bgCyanBright;
colorette.bgGreen = bgGreen;
colorette.bgGreenBright = bgGreenBright;
colorette.bgMagenta = bgMagenta;
colorette.bgMagentaBright = bgMagentaBright;
colorette.bgRed = bgRed$1;
colorette.bgRedBright = bgRedBright;
colorette.bgWhite = bgWhite;
colorette.bgWhiteBright = bgWhiteBright;
colorette.bgYellow = bgYellow;
colorette.bgYellowBright = bgYellowBright;
colorette.black = black;
colorette.blackBright = blackBright;
colorette.blue = blue$1;
colorette.blueBright = blueBright;
colorette.bold = bold;
colorette.createColors = createColors$1;
colorette.cyan = cyan$1;
colorette.cyanBright = cyanBright;
colorette.dim = dim;
colorette.gray = gray$1;
colorette.green = green$1;
colorette.greenBright = greenBright;
colorette.hidden = hidden;
colorette.inverse = inverse;
colorette.isColorSupported = isColorSupported$1;
colorette.italic = italic;
colorette.magenta = magenta;
colorette.magentaBright = magentaBright;
colorette.red = red$1;
colorette.redBright = redBright;
colorette.reset = reset;
colorette.strikethrough = strikethrough;
colorette.underline = underline;
colorette.white = white$1;
colorette.whiteBright = whiteBright;
colorette.yellow = yellow$1;
colorette.yellowBright = yellowBright;

var once$3 = {exports: {}};

// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.

var wrappy_1 = wrappy$1;

function wrappy$1(fn, cb) {
  if (fn && cb) return wrappy$1(fn)(cb);
  if (typeof fn !== 'function') throw new TypeError('need wrapper function');
  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });
  return wrapper;

  function wrapper() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    var ret = fn.apply(this, args);
    var cb = args[args.length - 1];

    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }

    return ret;
  }
}

var wrappy = wrappy_1;
once$3.exports = wrappy(once$2);
once$3.exports.strict = wrappy(onceStrict);
once$2.proto = once$2(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once$2(this);
    },
    configurable: true
  });
  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this);
    },
    configurable: true
  });
});

function once$2(fn) {
  var f = function () {
    if (f.called) return f.value;
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };

  f.called = false;
  return f;
}

function onceStrict(fn) {
  var f = function () {
    if (f.called) throw new Error(f.onceError);
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };

  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f;
}

var once$1 = once$3.exports;

var noop$5 = function () {};

var isRequest$1 = function (stream) {
  return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function (stream) {
  return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
};

var eos$1 = function (stream, opts, callback) {
  if (typeof opts === 'function') return eos$1(stream, null, opts);
  if (!opts) opts = {};
  callback = once$1(callback || noop$5);
  var ws = stream._writableState;
  var rs = stream._readableState;
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var cancelled = false;

  var onlegacyfinish = function () {
    if (!stream.writable) onfinish();
  };

  var onfinish = function () {
    writable = false;
    if (!readable) callback.call(stream);
  };

  var onend = function () {
    readable = false;
    if (!writable) callback.call(stream);
  };

  var onexit = function (exitCode) {
    callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
  };

  var onerror = function (err) {
    callback.call(stream, err);
  };

  var onclose = function () {
    process.nextTick(onclosenexttick);
  };

  var onclosenexttick = function () {
    if (cancelled) return;
    if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, new Error('premature close'));
    if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, new Error('premature close'));
  };

  var onrequest = function () {
    stream.req.on('finish', onfinish);
  };

  if (isRequest$1(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !ws) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  if (isChildProcess(stream)) stream.on('exit', onexit);
  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    cancelled = true;
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('exit', onexit);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
};

var endOfStream = eos$1;

var once = once$3.exports;
var eos = endOfStream;
var fs$1 = require$$0__default$1["default"]; // we only need fs to get the ReadStream and WriteStream prototypes

var noop$4 = function () {};

var ancient = /^v?\.0/.test(process.version);

var isFn = function (fn) {
  return typeof fn === 'function';
};

var isFS = function (stream) {
  if (!ancient) return false; // newer node version do not need to care about fs is a special way

  if (!fs$1) return false; // browser

  return (stream instanceof (fs$1.ReadStream || noop$4) || stream instanceof (fs$1.WriteStream || noop$4)) && isFn(stream.close);
};

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort);
};

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true;
    if (isFS(stream)) return stream.close(noop$4); // use close for fs streams to avoid fd leaks

    if (isRequest(stream)) return stream.abort(); // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy();
    callback(err || new Error('stream was destroyed'));
  };
};

var call = function (fn) {
  fn();
};

var pipe = function (from, to) {
  return from.pipe(to);
};

var pump$1 = function () {
  var streams = Array.prototype.slice.call(arguments);
  var callback = isFn(streams[streams.length - 1] || noop$4) && streams.pop() || noop$4;
  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) throw new Error('pump requires two streams per minimum');
  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
};

var pump_1 = pump$1;

/*
Copyright (c) 2014-2018, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

const {
  Transform: Transform$1
} = require$$0__default$4["default"];
const {
  StringDecoder
} = require$$1__default["default"];
const kLast = Symbol('last');
const kDecoder = Symbol('decoder');

function transform(chunk, enc, cb) {
  var list;

  if (this.overflow) {
    // Line buffer is full. Skip to start of next line.
    var buf = this[kDecoder].write(chunk);
    list = buf.split(this.matcher);
    if (list.length === 1) return cb(); // Line ending not found. Discard entire chunk.
    // Line ending found. Discard trailing fragment of previous line and reset overflow state.

    list.shift();
    this.overflow = false;
  } else {
    this[kLast] += this[kDecoder].write(chunk);
    list = this[kLast].split(this.matcher);
  }

  this[kLast] = list.pop();

  for (var i = 0; i < list.length; i++) {
    try {
      push(this, this.mapper(list[i]));
    } catch (error) {
      return cb(error);
    }
  }

  this.overflow = this[kLast].length > this.maxLength;
  if (this.overflow && !this.skipOverflow) return cb(new Error('maximum buffer reached'));
  cb();
}

function flush$1(cb) {
  // forward any gibberish left in there
  this[kLast] += this[kDecoder].end();

  if (this[kLast]) {
    try {
      push(this, this.mapper(this[kLast]));
    } catch (error) {
      return cb(error);
    }
  }

  cb();
}

function push(self, val) {
  if (val !== undefined) {
    self.push(val);
  }
}

function noop$3(incoming) {
  return incoming;
}

function split$1(matcher, mapper, options) {
  // Set defaults for any arguments not supplied.
  matcher = matcher || /\r?\n/;
  mapper = mapper || noop$3;
  options = options || {}; // Test arguments explicitly.

  switch (arguments.length) {
    case 1:
      // If mapper is only argument.
      if (typeof matcher === 'function') {
        mapper = matcher;
        matcher = /\r?\n/; // If options is only argument.
      } else if (typeof matcher === 'object' && !(matcher instanceof RegExp)) {
        options = matcher;
        matcher = /\r?\n/;
      }

      break;

    case 2:
      // If mapper and options are arguments.
      if (typeof matcher === 'function') {
        options = mapper;
        mapper = matcher;
        matcher = /\r?\n/; // If matcher and options are arguments.
      } else if (typeof mapper === 'object') {
        options = mapper;
        mapper = noop$3;
      }

  }

  options = Object.assign({}, options);
  options.transform = transform;
  options.flush = flush$1;
  options.readableObjectMode = true;
  const stream = new Transform$1(options);
  stream[kLast] = '';
  stream[kDecoder] = new StringDecoder('utf8');
  stream.matcher = matcher;
  stream.mapper = mapper;
  stream.maxLength = options.maxLength;
  stream.skipOverflow = options.skipOverflow;
  stream.overflow = false;
  return stream;
}

var split2 = split$1;

const metadata = Symbol.for('pino.metadata');
const split = split2;

var pinoAbstractTransport = function build(fn, opts = {}) {
  const parseLines = opts.parse === 'lines';
  const parseLine = typeof opts.parseLine === 'function' ? opts.parseLine : JSON.parse;
  const close = opts.close || defaultClose;
  const stream = split(function (line) {
    let value;

    try {
      value = parseLine(line);
    } catch (error) {
      this.emit('unknown', line, error);
      return;
    }

    if (value === null) {
      this.emit('unknown', line, 'Null value ignored');
      return;
    }

    if (typeof value !== 'object') {
      value = {
        data: value,
        time: Date.now()
      };
    }

    if (stream[metadata]) {
      stream.lastTime = value.time;
      stream.lastLevel = value.level;
      stream.lastObj = value;
    }

    if (parseLines) {
      return line;
    }

    return value;
  }, {
    autoDestroy: true
  });

  stream._destroy = function (err, cb) {
    const promise = close(err, cb);

    if (promise && typeof promise.then === 'function') {
      promise.then(cb, cb);
    }
  };

  if (opts.metadata !== false) {
    stream[metadata] = true;
    stream.lastTime = 0;
    stream.lastLevel = 0;
    stream.lastObj = null;
  }

  let res = fn(stream);

  if (res && typeof res.catch === 'function') {
    res.catch(err => {
      stream.destroy(err);
    }); // set it to null to not retain a reference to the promise

    res = null;
  }

  return stream;
};

function defaultClose(err, cb) {
  process.nextTick(cb, err);
}

const fs = require$$0__default$1["default"];
const EventEmitter$3 = require$$0__default$2["default"];
const inherits = require$$3__default["default"].inherits;
const path = require$$3__default$1["default"];
const sleep = atomicSleep.exports;
const BUSY_WRITE_TIMEOUT = 100; // 16 MB - magic number
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


    if (!sonic._writing && sonic._len > sonic.minLength && !sonic.destroyed) {
      actualWrite(sonic);
    }
  }

  const mode = sonic.append ? 'a' : 'w';

  if (sonic.sync) {
    try {
      if (sonic.mkdir) fs.mkdirSync(path.dirname(file), {
        recursive: true
      });
      const fd = fs.openSync(file, mode);
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err;
    }
  } else if (sonic.mkdir) {
    fs.mkdir(path.dirname(file), {
      recursive: true
    }, err => {
      if (err) return fileOpened(err);
      fs.open(file, mode, fileOpened);
    });
  } else {
    fs.open(file, mode, fileOpened);
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
    sync,
    append = true,
    mkdir,
    retryEAGAIN
  } = opts || {};
  fd = fd || dest;
  this._bufs = [];
  this._len = 0;
  this.fd = -1;
  this._writing = false;
  this._writingBuf = '';
  this._ending = false;
  this._reopening = false;
  this._asyncDrainScheduled = false;
  this._hwm = Math.max(minLength || 0, 16387);
  this.file = null;
  this.destroyed = false;
  this.minLength = minLength || 0;
  this.sync = sync || false;
  this.append = append || false;

  this.retryEAGAIN = retryEAGAIN || (() => true);

  this.mkdir = mkdir || false;

  if (typeof fd === 'number') {
    this.fd = fd;
    process.nextTick(() => this.emit('ready'));
  } else if (typeof fd === 'string') {
    openFile(fd, this);
  } else {
    throw new Error('SonicBoom supports only file descriptors and files');
  }

  if (this.minLength >= MAX_WRITE) {
    throw new Error(`minLength should be smaller than MAX_WRITE (${MAX_WRITE})`);
  }

  this.release = (err, n) => {
    if (err) {
      if (err.code === 'EAGAIN' && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
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
        this._writing = false;
        this.emit('error', err);
      }

      return;
    }

    this._len -= n;
    this._writingBuf = this._writingBuf.slice(n);

    if (this._writingBuf.length) {
      if (!this.sync) {
        fs.write(this.fd, this._writingBuf, 'utf8', this.release);
        return;
      }

      try {
        do {
          const n = fs.writeSync(this.fd, this._writingBuf, 'utf8');
          this._len -= n;
          this._writingBuf = this._writingBuf.slice(n);
        } while (this._writingBuf);
      } catch (err) {
        this.release(err);
        return;
      }
    }

    const len = this._len;

    if (this._reopening) {
      this._writing = false;
      this._reopening = false;
      this.reopen();
    } else if (len > this.minLength) {
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

  const len = this._len + data.length;
  const bufs = this._bufs;

  if (!this._writing && len > MAX_WRITE) {
    bufs.push(data);
  } else if (bufs.length === 0) {
    bufs[0] = '' + data;
  } else {
    bufs[bufs.length - 1] += data;
  }

  this._len = len;

  if (!this._writing && this._len >= this.minLength) {
    actualWrite(this);
  }

  return this._len < this._hwm;
};

SonicBoom$2.prototype.flush = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this._writing || this.minLength <= 0) {
    return;
  }

  if (this._bufs.length === 0) {
    this._bufs.push('');
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

  if (this._writing) {
    return;
  }

  if (this._len > 0 && this.fd >= 0) {
    actualWrite(this);
  } else {
    actualClose(this);
  }
};

SonicBoom$2.prototype.flushSync = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed');
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet');
  }

  if (!this._writing && this._writingBuf.length > 0) {
    this._bufs.unshift(this._writingBuf);

    this._writingBuf = '';
  }

  while (this._bufs.length) {
    const buf = this._bufs[0];

    try {
      this._len -= fs.writeSync(this.fd, buf, 'utf8');

      this._bufs.shift();
    } catch (err) {
      if (err.code !== 'EAGAIN' || !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
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
  const release = sonic.release;
  sonic._writing = true;
  sonic._writingBuf = sonic._writingBuf || sonic._bufs.shift();

  if (sonic.sync) {
    try {
      const written = fs.writeSync(sonic.fd, sonic._writingBuf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs.write(sonic.fd, sonic._writingBuf, 'utf8', release);
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
  sonic._bufs = [];
}
/**
 * These export configurations enable JS and TS developers
 * to consumer SonicBoom in whatever way best suits their needs.
 * Some examples of supported import syntax includes:
 * - `const SonicBoom = require('SonicBoom')`
 * - `const { SonicBoom } = require('SonicBoom')`
 * - `import * as SonicBoom from 'SonicBoom'`
 * - `import { SonicBoom } from 'SonicBoom'`
 * - `import SonicBoom from 'SonicBoom'`
 */


SonicBoom$2.SonicBoom = SonicBoom$2;
SonicBoom$2.default = SonicBoom$2;
var sonicBoom = SonicBoom$2;

const hasBuffer = typeof Buffer !== 'undefined';
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;

function parse$3(text, reviver, options) {
  // Normalize arguments
  if (options == null) {
    if (reviver !== null && typeof reviver === 'object') {
      options = reviver;
      reviver = undefined;
    } else {
      options = {};
    }
  }

  const protoAction = options.protoAction || 'error';
  const constructorAction = options.constructorAction || 'error';

  if (hasBuffer && Buffer.isBuffer(text)) {
    text = text.toString();
  } // BOM checker


  if (text && text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  } // Parse normally, allowing exceptions


  const obj = JSON.parse(text, reviver); // options: 'error' (default) / 'remove' / 'ignore'

  if (protoAction === 'ignore' && constructorAction === 'ignore') {
    return obj;
  } // Ignore null and non-objects


  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (protoAction !== 'ignore' && constructorAction !== 'ignore') {
    if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
      return obj;
    }
  } else if (protoAction !== 'ignore' && constructorAction === 'ignore') {
    if (suspectProtoRx.test(text) === false) {
      return obj;
    }
  } else {
    if (suspectConstructorRx.test(text) === false) {
      return obj;
    }
  } // Scan result for proto keys


  scan(obj, {
    protoAction,
    constructorAction
  });
  return obj;
}

function scan(obj, {
  protoAction = 'error',
  constructorAction = 'error'
} = {}) {
  let next = [obj];

  while (next.length) {
    const nodes = next;
    next = [];

    for (const node of nodes) {
      if (protoAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, '__proto__')) {
        // Avoid calling node.hasOwnProperty directly
        if (protoAction === 'error') {
          throw new SyntaxError('Object contains forbidden prototype property');
        }

        delete node.__proto__; // eslint-disable-line no-proto
      }

      if (constructorAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, 'constructor') && Object.prototype.hasOwnProperty.call(node.constructor, 'prototype')) {
        // Avoid calling node.hasOwnProperty directly
        if (constructorAction === 'error') {
          throw new SyntaxError('Object contains forbidden prototype property');
        }

        delete node.constructor;
      }

      for (const key in node) {
        const value = node[key];

        if (value && typeof value === 'object') {
          next.push(node[key]);
        }
      }
    }
  }
}

function safeParse(text, reviver) {
  try {
    return parse$3(text, reviver);
  } catch (ignoreError) {
    return null;
  }
}

var secureJsonParse = {
  parse: parse$3,
  scan,
  safeParse
};

var constants = {
  DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l o',
  ERROR_LIKE_KEYS: ['err', 'error'],
  MESSAGE_KEY: 'msg',
  LEVEL_KEY: 'level',
  LEVEL_LABEL: 'levelLabel',
  TIMESTAMP_KEY: 'time',
  LEVELS: {
    default: 'USERLVL',
    60: 'FATAL',
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE'
  },
  LEVEL_NAMES: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  // Object keys that probably came from a logger like Pino or Bunyan.
  LOGGER_KEYS: ['pid', 'hostname', 'name', 'level', 'time', 'timestamp', 'caller']
};

const {
  LEVELS: LEVELS$1,
  LEVEL_NAMES
} = constants;

const nocolor = input => input;

const plain = {
  default: nocolor,
  60: nocolor,
  50: nocolor,
  40: nocolor,
  30: nocolor,
  20: nocolor,
  10: nocolor,
  message: nocolor,
  greyMessage: nocolor
};
const {
  createColors
} = colorette;
const {
  white,
  bgRed,
  red,
  yellow,
  green,
  blue,
  gray,
  cyan
} = createColors({
  useColor: true
});
const colored = {
  default: white,
  60: bgRed,
  50: red,
  40: yellow,
  30: green,
  20: blue,
  10: gray,
  message: cyan,
  greyMessage: gray
};

function colorizeLevel(level, colorizer) {
  if (Number.isInteger(+level)) {
    return Object.prototype.hasOwnProperty.call(LEVELS$1, level) ? colorizer[level](LEVELS$1[level]) : colorizer.default(LEVELS$1.default);
  }

  const levelNum = LEVEL_NAMES[level.toLowerCase()] || 'default';
  return colorizer[levelNum](LEVELS$1[levelNum]);
}

function plainColorizer(level) {
  return colorizeLevel(level, plain);
}

plainColorizer.message = plain.message;
plainColorizer.greyMessage = plain.greyMessage;

function coloredColorizer(level) {
  return colorizeLevel(level, colored);
}

coloredColorizer.message = colored.message;
coloredColorizer.greyMessage = colored.greyMessage;
/**
 * Factory function get a function to colorized levels. The returned function
 * also includes a `.message(str)` method to colorize strings.
 *
 * @param {boolean} [useColors=false] When `true` a function that applies standard
 * terminal colors is returned.
 *
 * @returns {function} `function (level) {}` has a `.message(str)` method to
 * apply colorization to a string. The core function accepts either an integer
 * `level` or a `string` level. The integer level will map to a known level
 * string or to `USERLVL` if not known.  The string `level` will map to the same
 * colors as the integer `level` and will also default to `USERLVL` if the given
 * string is not a recognized level name.
 */

var colors$1 = function getColorizer(useColors = false) {
  return useColors ? coloredColorizer : plainColorizer;
};

var utils = {exports: {}};

var rfdc_1 = rfdc;

function copyBuffer(cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur);
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
}

function rfdc(opts) {
  opts = opts || {};
  if (opts.circles) return rfdcCircles(opts);
  return opts.proto ? cloneProto : clone;

  function cloneArray(a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];

      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        a2[k] = fn(cur);
      }
    }

    return a2;
  }

  function clone(o) {
    if (typeof o !== 'object' || o === null) return o;
    if (o instanceof Date) return new Date(o);
    if (Array.isArray(o)) return cloneArray(o, clone);
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
    var o2 = {};

    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue;
      var cur = o[k];

      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = clone(cur);
      }
    }

    return o2;
  }

  function cloneProto(o) {
    if (typeof o !== 'object' || o === null) return o;
    if (o instanceof Date) return new Date(o);
    if (Array.isArray(o)) return cloneArray(o, cloneProto);
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
    var o2 = {};

    for (var k in o) {
      var cur = o[k];

      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = cloneProto(cur);
      }
    }

    return o2;
  }
}

function rfdcCircles(opts) {
  var refs = [];
  var refsNew = [];
  return opts.proto ? cloneProto : clone;

  function cloneArray(a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];

      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        var index = refs.indexOf(cur);

        if (index !== -1) {
          a2[k] = refsNew[index];
        } else {
          a2[k] = fn(cur);
        }
      }
    }

    return a2;
  }

  function clone(o) {
    if (typeof o !== 'object' || o === null) return o;
    if (o instanceof Date) return new Date(o);
    if (Array.isArray(o)) return cloneArray(o, clone);
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);

    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue;
      var cur = o[k];

      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);

        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = clone(cur);
        }
      }
    }

    refs.pop();
    refsNew.pop();
    return o2;
  }

  function cloneProto(o) {
    if (typeof o !== 'object' || o === null) return o;
    if (o instanceof Date) return new Date(o);
    if (Array.isArray(o)) return cloneArray(o, cloneProto);
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);

    for (var k in o) {
      var cur = o[k];

      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur);
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);

        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = cloneProto(cur);
        }
      }
    }

    refs.pop();
    refsNew.pop();
    return o2;
  }
}

var dateformat$1 = {exports: {}};

(function (module, exports) {

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  (function (global) {
    var _arguments = arguments;

    var dateFormat = function () {
      var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
      return function (date, mask, utc, gmt) {
        if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }

        date = date || date === 0 ? date : new Date();

        if (!(date instanceof Date)) {
          date = new Date(date);
        }

        if (isNaN(date)) {
          throw TypeError("Invalid date");
        }

        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks["default"]);
        var maskSlice = mask.slice(0, 4);

        if (maskSlice === "UTC:" || maskSlice === "GMT:") {
          mask = mask.slice(4);
          utc = true;

          if (maskSlice === "GMT:") {
            gmt = true;
          }
        }

        var _ = function _() {
          return utc ? "getUTC" : "get";
        };

        var _d = function d() {
          return date[_() + "Date"]();
        };

        var D = function D() {
          return date[_() + "Day"]();
        };

        var _m = function m() {
          return date[_() + "Month"]();
        };

        var y = function y() {
          return date[_() + "FullYear"]();
        };

        var _H = function H() {
          return date[_() + "Hours"]();
        };

        var _M = function M() {
          return date[_() + "Minutes"]();
        };

        var _s = function s() {
          return date[_() + "Seconds"]();
        };

        var _L = function L() {
          return date[_() + "Milliseconds"]();
        };

        var _o = function o() {
          return utc ? 0 : date.getTimezoneOffset();
        };

        var _W = function W() {
          return getWeek(date);
        };

        var _N = function N() {
          return getDayOfWeek(date);
        };

        var flags = {
          d: function d() {
            return _d();
          },
          dd: function dd() {
            return pad(_d());
          },
          ddd: function ddd() {
            return dateFormat.i18n.dayNames[D()];
          },
          DDD: function DDD() {
            return getDayName({
              y: y(),
              m: _m(),
              d: _d(),
              _: _(),
              dayName: dateFormat.i18n.dayNames[D()],
              short: true
            });
          },
          dddd: function dddd() {
            return dateFormat.i18n.dayNames[D() + 7];
          },
          DDDD: function DDDD() {
            return getDayName({
              y: y(),
              m: _m(),
              d: _d(),
              _: _(),
              dayName: dateFormat.i18n.dayNames[D() + 7]
            });
          },
          m: function m() {
            return _m() + 1;
          },
          mm: function mm() {
            return pad(_m() + 1);
          },
          mmm: function mmm() {
            return dateFormat.i18n.monthNames[_m()];
          },
          mmmm: function mmmm() {
            return dateFormat.i18n.monthNames[_m() + 12];
          },
          yy: function yy() {
            return String(y()).slice(2);
          },
          yyyy: function yyyy() {
            return pad(y(), 4);
          },
          h: function h() {
            return _H() % 12 || 12;
          },
          hh: function hh() {
            return pad(_H() % 12 || 12);
          },
          H: function H() {
            return _H();
          },
          HH: function HH() {
            return pad(_H());
          },
          M: function M() {
            return _M();
          },
          MM: function MM() {
            return pad(_M());
          },
          s: function s() {
            return _s();
          },
          ss: function ss() {
            return pad(_s());
          },
          l: function l() {
            return pad(_L(), 3);
          },
          L: function L() {
            return pad(Math.floor(_L() / 10));
          },
          t: function t() {
            return _H() < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1];
          },
          tt: function tt() {
            return _H() < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3];
          },
          T: function T() {
            return _H() < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5];
          },
          TT: function TT() {
            return _H() < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7];
          },
          Z: function Z() {
            return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
          },
          o: function o() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
          },
          p: function p() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
          },
          S: function S() {
            return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
          },
          W: function W() {
            return _W();
          },
          WW: function WW() {
            return pad(_W());
          },
          N: function N() {
            return _N();
          }
        };
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match]();
          }

          return match.slice(1, match.length - 1);
        });
      };
    }();

    dateFormat.masks = {
      default: "ddd mmm dd yyyy HH:MM:ss",
      shortDate: "m/d/yy",
      paddedShortDate: "mm/dd/yyyy",
      mediumDate: "mmm d, yyyy",
      longDate: "mmmm d, yyyy",
      fullDate: "dddd, mmmm d, yyyy",
      shortTime: "h:MM TT",
      mediumTime: "h:MM:ss TT",
      longTime: "h:MM:ss TT Z",
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
      expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
    };
    dateFormat.i18n = {
      dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
    };

    var pad = function pad(val, len) {
      val = String(val);
      len = len || 2;

      while (val.length < len) {
        val = "0" + val;
      }

      return val;
    };

    var getDayName = function getDayName(_ref) {
      var y = _ref.y,
          m = _ref.m,
          d = _ref.d,
          _ = _ref._,
          dayName = _ref.dayName,
          _ref$short = _ref["short"],
          _short = _ref$short === void 0 ? false : _ref$short;

      var today = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday[_ + "Date"]() - 1);
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow[_ + "Date"]() + 1);

      var today_d = function today_d() {
        return today[_ + "Date"]();
      };

      var today_m = function today_m() {
        return today[_ + "Month"]();
      };

      var today_y = function today_y() {
        return today[_ + "FullYear"]();
      };

      var yesterday_d = function yesterday_d() {
        return yesterday[_ + "Date"]();
      };

      var yesterday_m = function yesterday_m() {
        return yesterday[_ + "Month"]();
      };

      var yesterday_y = function yesterday_y() {
        return yesterday[_ + "FullYear"]();
      };

      var tomorrow_d = function tomorrow_d() {
        return tomorrow[_ + "Date"]();
      };

      var tomorrow_m = function tomorrow_m() {
        return tomorrow[_ + "Month"]();
      };

      var tomorrow_y = function tomorrow_y() {
        return tomorrow[_ + "FullYear"]();
      };

      if (today_y() === y && today_m() === m && today_d() === d) {
        return _short ? "Tdy" : "Today";
      } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
        return _short ? "Ysd" : "Yesterday";
      } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
        return _short ? "Tmw" : "Tomorrow";
      }

      return dayName;
    };

    var getWeek = function getWeek(date) {
      var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
      var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
      firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
      var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
      targetThursday.setHours(targetThursday.getHours() - ds);
      var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
      return 1 + Math.floor(weekDiff);
    };

    var getDayOfWeek = function getDayOfWeek(date) {
      var dow = date.getDay();

      if (dow === 0) {
        dow = 7;
      }

      return dow;
    };

    var kindOf = function kindOf(val) {
      if (val === null) {
        return "null";
      }

      if (val === undefined) {
        return "undefined";
      }

      if (_typeof(val) !== "object") {
        return _typeof(val);
      }

      if (Array.isArray(val)) {
        return "array";
      }

      return {}.toString.call(val).slice(8, -1).toLowerCase();
    };

    if ((_typeof(exports)) === "object") {
      module.exports = dateFormat;
    } else {
      global.dateFormat = dateFormat;
    }
  })(void 0);
})(dateformat$1, dateformat$1.exports);

const clone = rfdc_1({
  circles: true
});
const dateformat = dateformat$1.exports;
const stringifySafe$1 = fastSafeStringify;
const defaultColorizer = colors$1();
const {
  DATE_FORMAT,
  ERROR_LIKE_KEYS: ERROR_LIKE_KEYS$1,
  MESSAGE_KEY: MESSAGE_KEY$1,
  LEVEL_KEY,
  LEVEL_LABEL,
  TIMESTAMP_KEY: TIMESTAMP_KEY$1,
  LOGGER_KEYS,
  LEVELS
} = constants;
utils.exports = {
  isObject: isObject$1,
  prettifyErrorLog: prettifyErrorLog$1,
  prettifyLevel: prettifyLevel$1,
  prettifyMessage: prettifyMessage$1,
  prettifyMetadata: prettifyMetadata$1,
  prettifyObject: prettifyObject$1,
  prettifyTime: prettifyTime$1,
  filterLog: filterLog$1
};
utils.exports.internals = {
  formatTime,
  joinLinesWithIndentation,
  prettifyError,
  deleteLogProperty,
  splitIgnoreKey,
  createDate,
  isValidDate
};
/**
 * Converts a given `epoch` to a desired display format.
 *
 * @param {number|string} epoch The time to convert. May be any value that is
 * valid for `new Date()`.
 * @param {boolean|string} [translateTime=false] When `false`, the given `epoch`
 * will simply be returned. When `true`, the given `epoch` will be converted
 * to a string at UTC using the `DATE_FORMAT` constant. If `translateTime` is
 * a string, the following rules are available:
 *
 * - `<format string>`: The string is a literal format string. This format
 * string will be used to interpret the `epoch` and return a display string
 * at UTC.
 * - `SYS:STANDARD`: The returned display string will follow the `DATE_FORMAT`
 * constant at the system's local timezone.
 * - `SYS:<format string>`: The returned display string will follow the given
 * `<format string>` at the system's local timezone.
 * - `UTC:<format string>`: The returned display string will follow the given
 * `<format string>` at UTC.
 *
 * @returns {number|string} The formatted time.
 */

function formatTime(epoch, translateTime = false) {
  if (translateTime === false) {
    return epoch;
  }

  const instant = createDate(epoch); // If the Date is invalid, do not attempt to format

  if (!isValidDate(instant)) {
    return epoch;
  }

  if (translateTime === true) {
    return dateformat(instant, 'UTC:' + DATE_FORMAT);
  }

  const upperFormat = translateTime.toUpperCase();

  if (upperFormat === 'SYS:STANDARD') {
    return dateformat(instant, DATE_FORMAT);
  }

  const prefix = upperFormat.substr(0, 4);

  if (prefix === 'SYS:' || prefix === 'UTC:') {
    if (prefix === 'UTC:') {
      return dateformat(instant, translateTime);
    }

    return dateformat(instant, translateTime.slice(4));
  }

  return dateformat(instant, `UTC:${translateTime}`);
}
/**
 * Constructs a JS Date from a number or string. Accepts any single number
 * or single string argument that is valid for the Date() constructor,
 * or an epoch as a string.
 *
 * @param {string|number} epoch The representation of the Date.
 *
 * @returns {Date} The constructed Date.
 */


function createDate(epoch) {
  // If epoch is already a valid argument, return the valid Date
  let date = new Date(epoch);

  if (isValidDate(date)) {
    return date;
  } // Convert to a number to permit epoch as a string


  date = new Date(+epoch);
  return date;
}
/**
 * Checks if the argument is a JS Date and not 'Invalid Date'.
 *
 * @param {Date} date The date to check.
 *
 * @returns {boolean} true if the argument is a JS Date and not 'Invalid Date'.
 */


function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function isObject$1(input) {
  return Object.prototype.toString.apply(input) === '[object Object]';
}
/**
 * Given a string with line separators, either `\r\n` or `\n`, add indentation
 * to all lines subsequent to the first line and rejoin the lines using an
 * end of line sequence.
 *
 * @param {object} input
 * @param {string} input.input The string to split and reformat.
 * @param {string} [input.ident] The indentation string. Default: `    ` (4 spaces).
 * @param {string} [input.eol] The end of line sequence to use when rejoining
 * the lines. Default: `'\n'`.
 *
 * @returns {string} A string with lines subsequent to the first indented
 * with the given indentation sequence.
 */


function joinLinesWithIndentation({
  input,
  ident = '    ',
  eol = '\n'
}) {
  const lines = input.split(/\r?\n/);

  for (let i = 1; i < lines.length; i += 1) {
    lines[i] = ident + lines[i];
  }

  return lines.join(eol);
}
/**
 * Given a log object that has a `type: 'Error'` key, prettify the object and
 * return the result. In other
 *
 * @param {object} input
 * @param {object} input.log The error log to prettify.
 * @param {string} [input.messageKey] The name of the key that contains a
 * general log message. This is not the error's message property but the logger
 * messsage property. Default: `MESSAGE_KEY` constant.
 * @param {string} [input.ident] The sequence to use for indentation. Default: `'    '`.
 * @param {string} [input.eol] The sequence to use for EOL. Default: `'\n'`.
 * @param {string[]} [input.errorLikeKeys] A set of keys that should be considered
 * to have error objects as values. Default: `ERROR_LIKE_KEYS` constant.
 * @param {string[]} [input.errorProperties] A set of specific error object
 * properties, that are not the value of `messageKey`, `type`, or `stack`, to
 * include in the prettified result. The first entry in the list may be `'*'`
 * to indicate that all sibiling properties should be prettified. Default: `[]`.
 *
 * @returns {string} A sring that represents the prettified error log.
 */


function prettifyErrorLog$1({
  log,
  messageKey = MESSAGE_KEY$1,
  ident = '    ',
  eol = '\n',
  errorLikeKeys = ERROR_LIKE_KEYS$1,
  errorProperties = []
}) {
  const stack = log.stack;
  const joinedLines = joinLinesWithIndentation({
    input: stack,
    ident,
    eol
  });
  let result = `${ident}${joinedLines}${eol}`;

  if (errorProperties.length > 0) {
    const excludeProperties = LOGGER_KEYS.concat(messageKey, 'type', 'stack');
    let propertiesToPrint;

    if (errorProperties[0] === '*') {
      // Print all sibling properties except for the standard exclusions.
      propertiesToPrint = Object.keys(log).filter(k => excludeProperties.includes(k) === false);
    } else {
      // Print only specified properties unless the property is a standard exclusion.
      propertiesToPrint = errorProperties.filter(k => excludeProperties.includes(k) === false);
    }

    for (let i = 0; i < propertiesToPrint.length; i += 1) {
      const key = propertiesToPrint[i];
      if (key in log === false) continue;

      if (isObject$1(log[key])) {
        // The nested object may have "logger" type keys but since they are not
        // at the root level of the object being processed, we want to print them.
        // Thus, we invoke with `excludeLoggerKeys: false`.
        const prettifiedObject = prettifyObject$1({
          input: log[key],
          errorLikeKeys,
          excludeLoggerKeys: false,
          eol,
          ident
        });
        result = `${result}${key}: {${eol}${prettifiedObject}}${eol}`;
        continue;
      }

      result = `${result}${key}: ${log[key]}${eol}`;
    }
  }

  return result;
}
/**
 * Checks if the passed in log has a `level` value and returns a prettified
 * string for that level if so.
 *
 * @param {object} input
 * @param {object} input.log The log object.
 * @param {function} [input.colorizer] A colorizer function that accepts a level
 * value and returns a colorized string. Default: a no-op colorizer.
 * @param {string} [levelKey='level'] The key to find the level under.
 *
 * @returns {undefined|string} If `log` does not have a `level` property then
 * `undefined` will be returned. Otherwise, a string from the specified
 * `colorizer` is returned.
 */


function prettifyLevel$1({
  log,
  colorizer = defaultColorizer,
  levelKey = LEVEL_KEY
}) {
  if (levelKey in log === false) return undefined;
  return colorizer(log[levelKey]);
}
/**
 * Prettifies a message string if the given `log` has a message property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the message to colorize.
 * @param {string} [input.messageKey='msg'] The property of the `log` that is the
 * message to be prettified.
 * @param {string|function} [input.messageFormat=undefined] A format string or function that defines how the
 *  logged message should be formatted, e.g. `'{level} - {pid}'`.
 * @param {function} [input.colorizer] A colorizer function that has a
 * `.message(str)` method attached to it. This function should return a colorized
 * string which will be the "prettified" message. Default: a no-op colorizer.
 *
 * @returns {undefined|string} If the message key is not found, or the message
 * key is not a string, then `undefined` will be returned. Otherwise, a string
 * that is the prettified message.
 */


function prettifyMessage$1({
  log,
  messageFormat,
  messageKey = MESSAGE_KEY$1,
  colorizer = defaultColorizer,
  levelLabel = LEVEL_LABEL
}) {
  if (messageFormat && typeof messageFormat === 'string') {
    const message = String(messageFormat).replace(/{([^{}]+)}/g, function (match, p1) {
      // return log level as string instead of int
      if (p1 === levelLabel && log[LEVEL_KEY]) {
        return LEVELS[log[LEVEL_KEY]];
      } // Parse nested key access, e.g. `{keyA.subKeyB}`.


      return p1.split('.').reduce(function (prev, curr) {
        if (prev && prev[curr]) {
          return prev[curr];
        }

        return '';
      }, log);
    });
    return colorizer.message(message);
  }

  if (messageFormat && typeof messageFormat === 'function') {
    const msg = messageFormat(log, messageKey, levelLabel);
    return colorizer.message(msg);
  }

  if (messageKey in log === false) return undefined;
  if (typeof log[messageKey] !== 'string') return undefined;
  return colorizer.message(log[messageKey]);
}
/**
 * Prettifies metadata that is usually present in a Pino log line. It looks for
 * fields `name`, `pid`, `hostname`, and `caller` and returns a formatted string using
 * the fields it finds.
 *
 * @param {object} input
 * @param {object} input.log The log that may or may not contain metadata to
 * be prettified.
 *
 * @returns {undefined|string} If no metadata is found then `undefined` is
 * returned. Otherwise, a string of prettified metadata is returned.
 */


function prettifyMetadata$1({
  log
}) {
  let line = '';

  if (log.name || log.pid || log.hostname) {
    line += '(';

    if (log.name) {
      line += log.name;
    }

    if (log.name && log.pid) {
      line += '/' + log.pid;
    } else if (log.pid) {
      line += log.pid;
    }

    if (log.hostname) {
      // If `pid` and `name` were in the ignore keys list then we don't need
      // the leading space.
      line += `${line === '(' ? 'on' : ' on'} ${log.hostname}`;
    }

    line += ')';
  }

  if (log.caller) {
    line += `${line === '' ? '' : ' '}<${log.caller}>`;
  }

  if (line === '') {
    return undefined;
  } else {
    return line;
  }
}
/**
 * Prettifies a standard object. Special care is taken when processing the object
 * to handle child objects that are attached to keys known to contain error
 * objects.
 *
 * @param {object} input
 * @param {object} input.input The object to prettify.
 * @param {string} [input.ident] The identation sequence to use. Default: `'    '`.
 * @param {string} [input.eol] The EOL sequence to use. Default: `'\n'`.
 * @param {string[]} [input.skipKeys] A set of object keys to exclude from the
 * prettified result. Default: `[]`.
 * @param {Object<string, function>} [input.customPrettifiers] Dictionary of
 * custom prettifiers. Default: `{}`.
 * @param {string[]} [input.errorLikeKeys] A set of object keys that contain
 * error objects. Default: `ERROR_LIKE_KEYS` constant.
 * @param {boolean} [input.excludeLoggerKeys] Indicates if known logger specific
 * keys should be excluded from prettification. Default: `true`.
 * @param {boolean} [input.singleLine] Should non-error keys all be formatted
 * on a single line? This does NOT apply to errors, which will still be
 * multi-line. Default: `false`
 *
 * @returns {string} The prettified string. This can be as little as `''` if
 * there was nothing to prettify.
 */


function prettifyObject$1({
  input,
  ident = '    ',
  eol = '\n',
  skipKeys = [],
  customPrettifiers = {},
  errorLikeKeys = ERROR_LIKE_KEYS$1,
  excludeLoggerKeys = true,
  singleLine = false,
  colorizer = defaultColorizer
}) {
  const keysToIgnore = [].concat(skipKeys);
  if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, LOGGER_KEYS);
  let result = ''; // Split object keys into two categories: error and non-error

  const {
    plain,
    errors
  } = Object.entries(input).reduce(({
    plain,
    errors
  }, [k, v]) => {
    if (keysToIgnore.includes(k) === false) {
      // Pre-apply custom prettifiers, because all 3 cases below will need this
      const pretty = typeof customPrettifiers[k] === 'function' ? customPrettifiers[k](v, k, input) : v;

      if (errorLikeKeys.includes(k)) {
        errors[k] = pretty;
      } else {
        plain[k] = pretty;
      }
    }

    return {
      plain,
      errors
    };
  }, {
    plain: {},
    errors: {}
  });

  if (singleLine) {
    // Stringify the entire object as a single JSON line
    if (Object.keys(plain).length > 0) {
      result += colorizer.greyMessage(stringifySafe$1(plain));
    }

    result += eol;
  } else {
    // Put each object entry on its own line
    Object.entries(plain).forEach(([keyName, keyValue]) => {
      // custom prettifiers are already applied above, so we can skip it now
      const lines = typeof customPrettifiers[keyName] === 'function' ? keyValue : stringifySafe$1(keyValue, null, 2);
      if (lines === undefined) return;
      const joinedLines = joinLinesWithIndentation({
        input: lines,
        ident,
        eol
      });
      result += `${ident}${keyName}: ${joinedLines}${eol}`;
    });
  } // Errors


  Object.entries(errors).forEach(([keyName, keyValue]) => {
    // custom prettifiers are already applied above, so we can skip it now
    const lines = typeof customPrettifiers[keyName] === 'function' ? keyValue : stringifySafe$1(keyValue, null, 2);
    if (lines === undefined) return;
    result += prettifyError({
      keyName,
      lines,
      eol,
      ident
    });
  });
  return result;
}
/**
 * Prettifies a timestamp if the given `log` has either `time`, `timestamp` or custom specified timestamp
 * property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the timestamp to be prettified.
 * @param {string} [input.timestampKey='time'] The log property that should be used to resolve timestamp value
 * @param {boolean|string} [input.translateFormat=undefined] When `true` the
 * timestamp will be prettified into a string at UTC using the default
 * `DATE_FORMAT`. If a string, then `translateFormat` will be used as the format
 * string to determine the output; see the `formatTime` function for details.
 *
 * @returns {undefined|string} If a timestamp property cannot be found then
 * `undefined` is returned. Otherwise, the prettified time is returned as a
 * string.
 */


function prettifyTime$1({
  log,
  timestampKey = TIMESTAMP_KEY$1,
  translateFormat = undefined
}) {
  let time = null;

  if (timestampKey in log) {
    time = log[timestampKey];
  } else if ('timestamp' in log) {
    time = log.timestamp;
  }

  if (time === null) return undefined;

  if (translateFormat) {
    return '[' + formatTime(time, translateFormat) + ']';
  }

  return `[${time}]`;
}
/**
 * Prettifies an error string into a multi-line format.
 * @param {object} input
 * @param {string} input.keyName The key assigned to this error in the log object
 * @param {string} input.lines The STRINGIFIED error. If the error field has a
 *  custom prettifier, that should be pre-applied as well
 * @param {string} input.ident The indentation sequence to use
 * @param {string} input.eol The EOL sequence to use
 */


function prettifyError({
  keyName,
  lines,
  eol,
  ident
}) {
  let result = '';
  const joinedLines = joinLinesWithIndentation({
    input: lines,
    ident,
    eol
  });
  const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol);

  for (let j = 0; j < splitLines.length; j += 1) {
    if (j !== 0) result += eol;
    const line = splitLines[j];

    if (/^\s*"stack"/.test(line)) {
      const matches = /^(\s*"stack":)\s*(".*"),?$/.exec(line);
      /* istanbul ignore else */

      if (matches && matches.length === 3) {
        const indentSize = /^\s*/.exec(line)[0].length + 4;
        const indentation = ' '.repeat(indentSize);
        const stackMessage = matches[2];
        result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\n/g, eol + indentation);
      }
    } else {
      result += line;
    }
  }

  return result;
}
/**
 * Splits the input key delimited by a dot character but not when it is preceded
 * by a backslash.
 *
 * @param {string} key A string identifying the property.
 *
 * @returns {string[]} Returns a list of string containing each delimited property.
 * e.g. `'prop2\.domain\.corp.prop2'` should return [ 'prop2.domain.com', 'prop2' ]
 */


function splitIgnoreKey(key) {
  const result = [];
  let backslash = false;
  let segment = '';

  for (let i = 0; i < key.length; i++) {
    const c = key.charAt(i);

    if (c === '\\') {
      backslash = true;
      continue;
    }

    if (backslash) {
      backslash = false;
      segment += c;
      continue;
    }
    /* Non-escaped dot, push to result */


    if (c === '.') {
      result.push(segment);
      segment = '';
      continue;
    }

    segment += c;
  }
  /* Push last entry to result */


  if (segment.length) {
    result.push(segment);
  }

  return result;
}
/**
 * Deletes a specified property from a log object if it exists.
 * This function mutates the passed in `log` object.
 *
 * @param {object} log The log object to be modified.
 * @param {string} property A string identifying the property to be deleted from
 * the log object. Accepts nested properties delimited by a `.`
 * Delimiter can be escaped to preserve property names that contain the delimiter.
 * e.g. `'prop1.prop2'` or `'prop2\.domain\.corp.prop2'`
 */


function deleteLogProperty(log, property) {
  const props = splitIgnoreKey(property);
  const propToDelete = props.pop();
  props.forEach(prop => {
    if (!Object.prototype.hasOwnProperty.call(log, prop)) {
      return;
    }

    log = log[prop];
  });
  delete log[propToDelete];
}
/**
 * Filter a log object by removing any ignored keys.
 *
 * @param {object} log The log object to be modified.
 * @param {string} ignoreKeys An array of strings identifying the properties to be removed.
 *
 * @returns {object} A new `log` object instance that does not include the ignored keys.
 */


function filterLog$1(log, ignoreKeys) {
  const logCopy = clone(log);
  ignoreKeys.forEach(ignoreKey => {
    deleteLogProperty(logCopy, ignoreKey);
  });
  return logCopy;
}

const {
  isColorSupported
} = colorette;
const pump = pump_1;
const {
  Transform
} = require$$0__default$4["default"];
const abstractTransport = pinoAbstractTransport;
const sonic = sonicBoom;
const sjs = secureJsonParse;
const colors = colors$1;
const {
  ERROR_LIKE_KEYS,
  MESSAGE_KEY,
  TIMESTAMP_KEY
} = constants;
const {
  isObject,
  prettifyErrorLog,
  prettifyLevel,
  prettifyMessage,
  prettifyMetadata,
  prettifyObject,
  prettifyTime,
  filterLog
} = utils.exports;

const jsonParser = input => {
  try {
    return {
      value: sjs.parse(input, {
        protoAction: 'remove'
      })
    };
  } catch (err) {
    return {
      err
    };
  }
};

const defaultOptions$1 = {
  colorize: isColorSupported,
  crlf: false,
  errorLikeObjectKeys: ERROR_LIKE_KEYS,
  errorProps: '',
  levelFirst: false,
  messageKey: MESSAGE_KEY,
  messageFormat: false,
  timestampKey: TIMESTAMP_KEY,
  translateTime: false,
  useMetadata: false,
  outputStream: process.stdout,
  customPrettifiers: {},
  hideObject: false,
  singleLine: false
};

function prettyFactory(options) {
  const opts = Object.assign({}, defaultOptions$1, options);
  const EOL = opts.crlf ? '\r\n' : '\n';
  const IDENT = '    ';
  const messageKey = opts.messageKey;
  const levelKey = opts.levelKey;
  const levelLabel = opts.levelLabel;
  const messageFormat = opts.messageFormat;
  const timestampKey = opts.timestampKey;
  const errorLikeObjectKeys = opts.errorLikeObjectKeys;
  const errorProps = opts.errorProps.split(',');
  const customPrettifiers = opts.customPrettifiers;
  const ignoreKeys = opts.ignore ? new Set(opts.ignore.split(',')) : undefined;
  const hideObject = opts.hideObject;
  const singleLine = opts.singleLine;
  const colorizer = colors(opts.colorize);
  return pretty;

  function pretty(inputData) {
    let log;

    if (!isObject(inputData)) {
      const parsed = jsonParser(inputData);

      if (parsed.err || !isObject(parsed.value)) {
        // pass through
        return inputData + EOL;
      }

      log = parsed.value;
    } else {
      log = inputData;
    }

    const prettifiedMessage = prettifyMessage({
      log,
      messageKey,
      colorizer,
      messageFormat,
      levelLabel
    });

    if (ignoreKeys) {
      log = filterLog(log, ignoreKeys);
    }

    const prettifiedLevel = prettifyLevel({
      log,
      colorizer,
      levelKey
    });
    const prettifiedMetadata = prettifyMetadata({
      log
    });
    const prettifiedTime = prettifyTime({
      log,
      translateFormat: opts.translateTime,
      timestampKey
    });
    let line = '';

    if (opts.levelFirst && prettifiedLevel) {
      line = `${prettifiedLevel}`;
    }

    if (prettifiedTime && line === '') {
      line = `${prettifiedTime}`;
    } else if (prettifiedTime) {
      line = `${line} ${prettifiedTime}`;
    }

    if (!opts.levelFirst && prettifiedLevel) {
      if (line.length > 0) {
        line = `${line} ${prettifiedLevel}`;
      } else {
        line = prettifiedLevel;
      }
    }

    if (prettifiedMetadata) {
      if (line.length > 0) {
        line = `${line} ${prettifiedMetadata}:`;
      } else {
        line = prettifiedMetadata;
      }
    }

    if (line.endsWith(':') === false && line !== '') {
      line += ':';
    }

    if (prettifiedMessage) {
      if (line.length > 0) {
        line = `${line} ${prettifiedMessage}`;
      } else {
        line = prettifiedMessage;
      }
    }

    if (line.length > 0 && !singleLine) {
      line += EOL;
    }

    if (log.type === 'Error' && log.stack) {
      const prettifiedErrorLog = prettifyErrorLog({
        log,
        errorLikeKeys: errorLikeObjectKeys,
        errorProperties: errorProps,
        ident: IDENT,
        eol: EOL
      });
      line += prettifiedErrorLog;
    } else if (!hideObject) {
      const skipKeys = [messageKey, levelKey, timestampKey].filter(key => typeof log[key] === 'string' || typeof log[key] === 'number');
      const prettifiedObject = prettifyObject({
        input: log,
        skipKeys,
        customPrettifiers,
        errorLikeKeys: errorLikeObjectKeys,
        eol: EOL,
        ident: IDENT,
        singleLine,
        colorizer
      }); // In single line mode, include a space only if prettified version isn't empty

      if (singleLine && !/^\s$/.test(prettifiedObject)) {
        line += ' ';
      }

      line += prettifiedObject;
    }

    return line;
  }
}

function build(opts = {}) {
  const pretty = prettyFactory(opts);
  return abstractTransport(function (source) {
    const stream = new Transform({
      objectMode: true,
      autoDestroy: true,

      transform(chunk, enc, cb) {
        const line = pretty(chunk);
        cb(null, line);
      }

    });
    const destination = sonic({
      dest: opts.destination || 1,
      sync: false
    });
    /* istanbul ignore else */

    if (destination.fd === 1) {
      // We cannot close the output
      destination.end = function () {
        this.emit('close');
      };
    }

    source.on('unknown', function (line) {
      destination.write(line + '\n');
    });
    pump(source, stream, destination);
    return stream;
  }, {
    parse: 'lines'
  });
}

pinoPretty.exports = build;
pinoPretty.exports.prettyFactory = prettyFactory;

pinoPretty.exports.default = build;

/* eslint no-prototype-builtins: 0 */


const format$7 = quickFormatUnescaped;
const {
  mapHttpRequest,
  mapHttpResponse
} = pinoStdSerializers;
const SonicBoom$1 = sonicBoom$1;
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
    const prettyFactory = pinoPretty.exports.prettyFactory || pinoPretty.exports;
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
const SonicBoom = sonicBoom$1;
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


const os = require$$0__default$5["default"];
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

const zlib = require$$0__default$6["default"];
const http = require$$1__default$1["default"];
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

/*
	Thanks to
	https://github.com/XuShaohua/kwplayer/blob/master/kuwo/DES.py
	https://github.com/Levi233/MusicPlayer/blob/master/app/src/main/java/com/chenhao/musicplayer/utils/crypt/KuwoDES.java
*/

const Long = n => {
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
};

const range = n => Array.from(new Array(n).keys());

const power = (base, index) => Array(index).fill(null).reduce(result => result.multiply(base), Long(1));

const LongArray = (...array) => array.map(n => n === -1 ? Long(-1) : Long(n)); // EXPANSION


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

  const crypto = require$$0__default$7["default"];
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
    module.exports.kuwoapi = kwDES;
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

const child_process = require$$0__default$8["default"];
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
require$$1__default$1["default"].createServer().listen(parseInt(process.argv[2]) || 9000).on('request', (req, res) => distribute(parse(req.url), router).then(data => res.write(data)).catch(() => res.writeHead(404)).then(() => res.end()));

module.exports = bridge;
