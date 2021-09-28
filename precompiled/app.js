#!/usr/bin/node

'use strict';

var require$$0$2 = require('path');
var require$$1$2 = require('net');
var require$$0$9 = require('zlib');
var require$$1$1 = require('http');
var require$$2 = require('https');
var require$$0$3 = require('events');
var require$$0$8 = require('os');
var require$$0$4 = require('vm');
var require$$0$5 = require('fs');
var require$$3 = require('util');
var require$$0$6 = require('tty');
var require$$0$7 = require('stream');
var require$$1 = require('string_decoder');
var require$$6 = require('url');
var require$$0$a = require('crypto');
var require$$2$1 = require('querystring');
var require$$0$b = require('child_process');
var require$$9 = require('dns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$1__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$1$2);
var require$$0__default$7 = /*#__PURE__*/_interopDefaultLegacy(require$$0$9);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var require$$0__default$6 = /*#__PURE__*/_interopDefaultLegacy(require$$0$8);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);
var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$7);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$0__default$8 = /*#__PURE__*/_interopDefaultLegacy(require$$0$a);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);
var require$$0__default$9 = /*#__PURE__*/_interopDefaultLegacy(require$$0$b);
var require$$9__default = /*#__PURE__*/_interopDefaultLegacy(require$$9);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check$b = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$i = // eslint-disable-next-line es/no-global-this -- safe
check$b(typeof globalThis == 'object' && globalThis) || check$b(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check$b(typeof self == 'object' && self) || check$b(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$9 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$8 = fails$9; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$8(function () {
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

var toString$3 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$3.call(it).slice(8, -1);
};

var fails$7 = fails$9;
var classof$5 = classofRaw$1;
var split$2 = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$7(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$5(it) == 'String' ? split$2.call(it, '') : Object(it);
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

var isObject$9 = function (it) {
  return typeof it === 'object' ? it !== null : isCallable$e(it);
};

var global$h = global$i;
var isCallable$d = isCallable$f;

var aFunction = function (argument) {
  return isCallable$d(argument) ? argument : undefined;
};

var getBuiltIn$i = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$h[namespace]) : global$h[namespace] && global$h[namespace][method];
};

var getBuiltIn$h = getBuiltIn$i;
var engineUserAgent = getBuiltIn$h('navigator', 'userAgent') || '';

var global$g = global$i;
var userAgent$5 = engineUserAgent;
var process$4 = global$g.process;
var Deno = global$g.Deno;
var versions = process$4 && process$4.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match$2, version$6;

if (v8) {
  match$2 = v8.split('.');
  version$6 = match$2[0] < 4 ? 1 : match$2[0] + match$2[1];
} else if (userAgent$5) {
  match$2 = userAgent$5.match(/Edge\/(\d+)/);

  if (!match$2 || match$2[1] >= 74) {
    match$2 = userAgent$5.match(/Chrome\/(\d+)/);
    if (match$2) version$6 = match$2[1];
  }
}

var engineV8Version = version$6 && +version$6;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version;
var fails$6 = fails$9; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$6(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var isCallable$c = isCallable$f;
var getBuiltIn$g = getBuiltIn$i;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$g('Symbol');
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

var aCallable$p = function (argument) {
  if (isCallable$b(argument)) return argument;
  throw TypeError(tryToString$1(argument) + ' is not a function');
};

var aCallable$o = aCallable$p; // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$o(func);
};

var isCallable$a = isCallable$f;
var isObject$8 = isObject$9; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = fn.call(input))) return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$8(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = fn.call(input))) return val;
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

var toObject$2 = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var toObject$1 = toObject$2;
var hasOwnProperty = {}.hasOwnProperty;

var has$9 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$1(it), key);
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

var isObject$7 = isObject$9;
var isSymbol$1 = isSymbol$2;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$9 = wellKnownSymbol$a;
var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$7(result) || isSymbol$1(result)) return result;
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
var isObject$6 = isObject$9;
var document$2 = global$c.document; // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$6(document$2) && isObject$6(document$2.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$2.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$5 = fails$9;
var createElement$1 = documentCreateElement; // Thank's IE8 for his funny defineProperty

var ie8DomDefine = !DESCRIPTORS$5 && !fails$5(function () {
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

var isObject$5 = isObject$9; // `Assert: Type(argument) is Object`

var anObject$A = function (argument) {
  if (isObject$5(argument)) return argument;
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
var isObject$4 = isObject$9;
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

    if (!isObject$4(it) || (state = get$1(it)).type !== TYPE) {
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

var getBuiltIn$f = getBuiltIn$i;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$y = anObject$A; // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$f('Reflect', 'ownKeys') || function ownKeys(it) {
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

var fails$4 = fails$9;
var isCallable$6 = isCallable$f;
var replacement = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data[normalize$1(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$6(detection) ? fails$4(detection) : !!detection;
};

var normalize$1 = isForced$3.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$3.data = {};
var NATIVE = isForced$3.NATIVE = 'N';
var POLYFILL = isForced$3.POLYFILL = 'P';
var isForced_1 = isForced$3;

var global$8 = global$i;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var redefine$2 = redefine$3.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$2 = isForced_1;
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

    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

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

var getBuiltIn$e = getBuiltIn$i;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$7 = wellKnownSymbol$a;
var DESCRIPTORS = descriptors;
var SPECIES$2 = wellKnownSymbol$7('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$e(CONSTRUCTOR_NAME);
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

var aCallable$n = aCallable$p; // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aCallable$n(fn);
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


var classof$4 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
};

var classof$3 = classof$4;
var getMethod$1 = getMethod$3;
var Iterators = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$a;
var ITERATOR$1 = wellKnownSymbol$3('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod$1(it, ITERATOR$1) || getMethod$1(it, '@@iterator') || Iterators[classof$3(it)];
};

var aCallable$m = aCallable$p;
var anObject$w = anObject$A;
var getIteratorMethod$1 = getIteratorMethod$2;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$m(iteratorMethod)) return anObject$w(iteratorMethod.call(argument));
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
var toLength$1 = toLength$3;
var bind$e = functionBindContext;
var getIterator$1 = getIterator$2;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$r = function (iterable, unboundFunction, options) {
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

var fails$3 = fails$9;
var isCallable$3 = isCallable$f;
var classof$2 = classof$4;
var getBuiltIn$d = getBuiltIn$i;
var inspectSource$1 = inspectSource$4;
var empty = [];
var construct = getBuiltIn$d('Reflect', 'construct');
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

  switch (classof$2(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  }

  return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource$1(argument));
}; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor


var isConstructor$1 = !construct || fails$3(function () {
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

var getBuiltIn$c = getBuiltIn$i;
var html$1 = getBuiltIn$c('document', 'documentElement');

var userAgent$4 = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

var classof$1 = classofRaw$1;
var global$6 = global$i;
var engineIsNode = classof$1(global$6.process) == 'process';

var global$5 = global$i;
var isCallable$2 = isCallable$f;
var fails$2 = fails$9;
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
    port$1 = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$d(port$1.postMessage, port$1, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$5.addEventListener && isCallable$2(global$5.postMessage) && !global$5.importScripts && location && location.protocol !== 'file:' && !fails$2(post)) {
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
var flush$2, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush$2 = function () {
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
    new MutationObserver(flush$2).observe(node, {
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
      then.call(promise, flush$2);
    }; // Node.js without promises

  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$2.nextTick(flush$2);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$3, flush$2);
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

var aCallable$l = aCallable$p;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$l(resolve);
  this.reject = aCallable$l(reject);
}; // `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability


newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$s = anObject$A;
var isObject$3 = isObject$9;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$s(C);
  if (isObject$3(x) && x.constructor === C) return x;
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

var $$v = _export;
var global$1 = global$i;
var getBuiltIn$b = getBuiltIn$i;
var NativePromise = nativePromiseConstructor;
var redefine = redefine$3.exports;
var redefineAll = redefineAll$1;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$1;
var setSpecies = setSpecies$1;
var aCallable$k = aCallable$p;
var isCallable$1 = isCallable$f;
var isObject$2 = isObject$9;
var anInstance = anInstance$1;
var inspectSource = inspectSource$4;
var iterate$q = iterate$r;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var speciesConstructor$9 = speciesConstructor$a;
var task = task$1.set;
var microtask = microtask$1;
var promiseResolve = promiseResolve$1;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform$1 = perform$2;
var InternalStateModule = internalState;
var isForced$1 = isForced_1;
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
var FORCED$1 = isForced$1(PROMISE, function () {
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
  return isObject$2(it) && isCallable$1(then = it.then) ? then : false;
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


if (FORCED$1) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aCallable$k(executor);
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

  newPromiseCapabilityModule$1.f = newPromiseCapability = function (C) {
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

$$v({
  global: true,
  wrap: true,
  forced: FORCED$1
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn$b(PROMISE); // statics

$$v({
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
$$v({
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
$$v({
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
      var $promiseResolve = aCallable$k(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$q(iterable, function (promise) {
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
      var $promiseResolve = aCallable$k(C.resolve);
      iterate$q(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var app = {};

var name$1 = "@unblockneteasemusic/server";
var version$5 = "v0.27.0-beta.3";
var description$1 = "Revive unavailable songs for Netease Cloud Music";
var main$1 = "src/provider/match.js";
var bin$1 = {
	unblockneteasemusic: "./precompiled/app.js"
};
var scripts$1 = {
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
var repository$1 = {
	type: "git",
	url: "https://github.com/1715173329/UnblockNeteaseMusic.git"
};
var author$1 = "nondanee, 1715173329, pan93412";
var license$1 = "MIT";
var dependencies$1 = {
	long: "^4.0.0",
	"node-windows": "^1.0.0-beta.6"
};
var devDependencies$1 = {
	"@babel/core": "^7.15.5",
	"@babel/preset-env": "^7.15.6",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-commonjs": "^20.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.5",
	"@rollup/plugin-replace": "^3.0.0",
	"@types/node": "^16.10.1",
	"@types/pino": "^6.3.11",
	"core-js": "3",
	jest: "^27.2.3",
	pino: "^6.13.3",
	"pino-pretty": "^7.0.1",
	pkg: "^5.3.2",
	prettier: "^2.4.1",
	rollup: "^2.57.0"
};
var require$$0$1 = {
	name: name$1,
	version: version$5,
	description: description$1,
	main: main$1,
	bin: bin$1,
	scripts: scripts$1,
	pkg: pkg,
	repository: repository$1,
	author: author$1,
	license: license$1,
	dependencies: dependencies$1,
	"private": true,
	devDependencies: devDependencies$1
};

var classof = classof$4;

var toString$2 = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
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

var fails$1 = fails$9;

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

var $$u = _export;
var aCallable$j = aCallable$p;
var toObject = toObject$2;
var toLength = toLength$3;
var toString$1 = toString$2;
var fails = fails$9;
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
    return toString$1(x) > toString$1(y) ? 1 : -1;
  };
}; // `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort


$$u({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable$j(comparefn);
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

    cli._program.name = cli._program.name || require$$0__default["default"].parse(argv[1]).base;
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
        if (action === 'help') help();else if (action === 'version') version$4();
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

const version$4 = () => {
  console.log(cli._program.version);
  process.exit();
};

const error = message => {
  usage();
  console.log(cli._program.name + ':', 'error:', message);
  process.exit(1);
};

var cli_1 = cli;

var insure$6 = {exports: {}};

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

const EventEmitter$4 = require$$0__default$1["default"];
const ON_CANCEL$1 = 'cancel';

class CancelRequest extends EventEmitter$4 {
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
} = require$$0__default$2["default"];
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
var parse_1 = parse$7;

function parse$7({
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
const parse$6 = parse_1;
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
  } = parse$6({
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

const fs$3 = require$$0__default$3["default"];
const EventEmitter$3 = require$$0__default$1["default"];
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
      const fd = fs$3.openSync(file, 'a');
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err;
    }
  } else {
    fs$3.open(file, 'a', fileOpened);
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
            fs$3.write(this.fd, this._writingBuf, 'utf8', this.release);
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
            n = fs$3.writeSync(this.fd, this._writingBuf, 'utf8');
            this._writingBuf = this._writingBuf.slice(n);
          } while (this._writingBuf.length !== 0);
        } catch (err) {
          this.release(err);
          return;
        }
      } else {
        fs$3.write(this.fd, this._writingBuf, 'utf8', this.release);
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

inherits$1(SonicBoom$3, EventEmitter$3);

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
      fs$3.close(fd, err => {
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
      fs$3.writeSync(this.fd, this._buf, 'utf8');
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
      const written = fs$3.writeSync(sonic.fd, buf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs$3.write(sonic.fd, buf, 'utf8', release);
  }
}

function actualClose$1(sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose$1.bind(null, sonic));
    return;
  } // TODO write a test to check if we are not leaking fds


  fs$3.close(sonic.fd, err => {
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
var tty = require$$0__default$4["default"];

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
const isDisabled = ("NO_COLOR" in env);
const isForced = ("FORCE_COLOR" in env);
const isWindows = process.platform === "win32";
const isCompatibleTerminal = tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && env.TERM !== "dumb";
const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
const isColorSupported$1 = !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI);

const raw = (open, close, searchRegex, replaceValue) => s => s || !(s === "" || s === undefined) ? open + (~(s + "").indexOf(close, 4) // skip opening \x1b[
? s.replace(searchRegex, replaceValue) : s) + close : "";

const init = (open, close) => raw(`\x1b[${open}m`, `\x1b[${close}m`, new RegExp(`\\x1b\\[${close}m`, "g"), `\x1b[${open}m`);

const colors$2 = {
  reset: init(0, 0),
  bold: raw("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m"),
  dim: raw("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m"),
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
} = {}) => useColor ? colors$2 : Object.keys(colors$2).reduce((colorMap, key) => ({ ...colorMap,
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
var fs$2 = require$$0__default$3["default"]; // we only need fs to get the ReadStream and WriteStream prototypes

var noop$4 = function () {};

var ancient = /^v?\.0/.test(process.version);

var isFn = function (fn) {
  return typeof fn === 'function';
};

var isFS = function (stream) {
  if (!ancient) return false; // newer node version do not need to care about fs is a special way

  if (!fs$2) return false; // browser

  return (stream instanceof (fs$2.ReadStream || noop$4) || stream instanceof (fs$2.WriteStream || noop$4)) && isFn(stream.close);
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
} = require$$0__default$5["default"];
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

const fs$1 = require$$0__default$3["default"];
const EventEmitter$2 = require$$0__default$1["default"];
const inherits = require$$3__default["default"].inherits;
const path$1 = require$$0__default["default"];
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
      if (sonic.mkdir) fs$1.mkdirSync(path$1.dirname(file), {
        recursive: true
      });
      const fd = fs$1.openSync(file, mode);
      fileOpened(null, fd);
    } catch (err) {
      fileOpened(err);
      throw err;
    }
  } else if (sonic.mkdir) {
    fs$1.mkdir(path$1.dirname(file), {
      recursive: true
    }, err => {
      if (err) return fileOpened(err);
      fs$1.open(file, mode, fileOpened);
    });
  } else {
    fs$1.open(file, mode, fileOpened);
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
            fs$1.write(this.fd, this._writingBuf, 'utf8', this.release);
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
        fs$1.write(this.fd, this._writingBuf, 'utf8', this.release);
        return;
      }

      try {
        do {
          const n = fs$1.writeSync(this.fd, this._writingBuf, 'utf8');
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

inherits(SonicBoom$2, EventEmitter$2);

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
      fs$1.close(fd, err => {
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
      this._len -= fs$1.writeSync(this.fd, buf, 'utf8');

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
      const written = fs$1.writeSync(sonic.fd, sonic._writingBuf, 'utf8');
      release(null, written);
    } catch (err) {
      release(err);
    }
  } else {
    fs$1.write(sonic.fd, sonic._writingBuf, 'utf8', release);
  }
}

function actualClose(sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose.bind(null, sonic));
    return;
  } // TODO write a test to check if we are not leaking fds


  fs$1.close(sonic.fd, err => {
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

function parse$5(text, reviver, options) {
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
    return parse$5(text, reviver);
  } catch (ignoreError) {
    return null;
  }
}

var secureJsonParse = {
  parse: parse$5,
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
} = require$$0__default$5["default"];
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
  EventEmitter: EventEmitter$1
} = require$$0__default$1["default"];
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
Object.setPrototypeOf(prototype, EventEmitter$1.prototype); // exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing

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


const os = require$$0__default$6["default"];
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
const logger$8 = pino({
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

function logScope$8(scope) {
  return logger$8.child({
    scope
  });
}

var logger_1 = {
  logger: logger$8,
  logScope: logScope$8
};

const zlib = require$$0__default$7["default"];
const http = require$$1__default$1["default"];
const https = require$$2__default["default"];
const ON_CANCEL = cancel;
const RequestCancelled$1 = RequestCancelled_1;
const {
  logScope: logScope$7
} = logger_1;
const parse$4 = require$$6__default["default"].parse;
const format$6 = require$$6__default["default"].format;
const logger$7 = logScope$7('request');
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


const request$d = (method, receivedUrl, receivedHeaders, body, proxy, cancelRequest) => {
  const url = parse$4(receivedUrl);
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

    logger$7.debug(`Start requesting ${receivedUrl}`);
    const clientRequest = create(url, proxy)(options);

    const destroyClientRequest = function () {
      // We destroy the request and throw RequestCancelled
      // when the request has been cancelled.
      clientRequest.destroy(new RequestCancelled$1(format$6(url)));
    };

    cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.on(ON_CANCEL, destroyClientRequest);
    if ((_cancelRequest$cancel = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel !== void 0 ? _cancelRequest$cancel : false) destroyClientRequest();
    clientRequest.setTimeout(timeoutThreshold, () => {
      logger$7.warn({
        url: format$6(url)
      }, `The request timed out, or the requester didn't handle the response.`);
      destroyClientRequest();
    }).on('response', response => resolve(response)).on('connect', (_, socket) => {
      logger$7.debug('received CONNECT, continuing with https.request()...');
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

    if ((_cancelRequest$cancel2 = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && _cancelRequest$cancel2 !== void 0 ? _cancelRequest$cancel2 : false) return Promise.reject(new RequestCancelled$1(format$6(url)));

    if ([201, 301, 302, 303, 307, 308].includes(response.statusCode)) {
      const redirectTo = url.resolve(response.headers.location || url.href);
      logger$7.debug(`Redirect to ${redirectTo}`);
      delete headers.host;
      return request$d(method, redirectTo, headers, body, proxy);
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

var aCallable$i = aCallable$p;
var anObject$r = anObject$A; // https://github.com/tc39/collection-methods

var collectionDeleteAll$2 = function () {
  var collection = anObject$r(this);
  var remover = aCallable$i(collection['delete']);
  var allDeleted = true;
  var wasDeleted;

  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }

  return !!allDeleted;
};

var $$t = _export;
var IS_PURE$s = isPure;
var collectionDeleteAll$1 = collectionDeleteAll$2; // `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods

$$t({
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

var $$s = _export;
var IS_PURE$r = isPure;
var anObject$q = anObject$A;
var bind$b = functionBindContext;
var getMapIterator$9 = getMapIterator$a;
var iterate$p = iterate$r; // `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods

$$s({
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
    return !iterate$p(iterator, function (key, value, stop) {
      if (!boundFunction(value, key, map)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$r = _export;
var IS_PURE$q = isPure;
var getBuiltIn$a = getBuiltIn$i;
var aCallable$h = aCallable$p;
var anObject$p = anObject$A;
var bind$a = functionBindContext;
var speciesConstructor$8 = speciesConstructor$a;
var getMapIterator$8 = getMapIterator$a;
var iterate$o = iterate$r; // `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods

$$r({
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
    var newMap = new (speciesConstructor$8(map, getBuiltIn$a('Map')))();
    var setter = aCallable$h(newMap.set);
    iterate$o(iterator, function (key, value) {
      if (boundFunction(value, key, map)) setter.call(newMap, key, value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$q = _export;
var IS_PURE$p = isPure;
var anObject$o = anObject$A;
var bind$9 = functionBindContext;
var getMapIterator$7 = getMapIterator$a;
var iterate$n = iterate$r; // `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods

$$q({
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
    return iterate$n(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop(value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$p = _export;
var IS_PURE$o = isPure;
var anObject$n = anObject$A;
var bind$8 = functionBindContext;
var getMapIterator$6 = getMapIterator$a;
var iterate$m = iterate$r; // `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods

$$p({
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
    return iterate$m(iterator, function (key, value, stop) {
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

var $$o = _export;
var IS_PURE$n = isPure;
var anObject$m = anObject$A;
var getMapIterator$5 = getMapIterator$a;
var sameValueZero = sameValueZero$1;
var iterate$l = iterate$r; // `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods

$$o({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$n
}, {
  includes: function includes(searchElement) {
    return iterate$l(getMapIterator$5(anObject$m(this)), function (key, value, stop) {
      if (sameValueZero(value, searchElement)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$n = _export;
var IS_PURE$m = isPure;
var anObject$l = anObject$A;
var getMapIterator$4 = getMapIterator$a;
var iterate$k = iterate$r; // `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods

$$n({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE$m
}, {
  keyOf: function keyOf(searchElement) {
    return iterate$k(getMapIterator$4(anObject$l(this)), function (key, value, stop) {
      if (value === searchElement) return stop(key);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).result;
  }
});

var $$m = _export;
var IS_PURE$l = isPure;
var getBuiltIn$9 = getBuiltIn$i;
var aCallable$g = aCallable$p;
var anObject$k = anObject$A;
var bind$7 = functionBindContext;
var speciesConstructor$7 = speciesConstructor$a;
var getMapIterator$3 = getMapIterator$a;
var iterate$j = iterate$r; // `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods

$$m({
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
    var newMap = new (speciesConstructor$7(map, getBuiltIn$9('Map')))();
    var setter = aCallable$g(newMap.set);
    iterate$j(iterator, function (key, value) {
      setter.call(newMap, boundFunction(value, key, map), value);
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$l = _export;
var IS_PURE$k = isPure;
var getBuiltIn$8 = getBuiltIn$i;
var aCallable$f = aCallable$p;
var anObject$j = anObject$A;
var bind$6 = functionBindContext;
var speciesConstructor$6 = speciesConstructor$a;
var getMapIterator$2 = getMapIterator$a;
var iterate$i = iterate$r; // `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods

$$l({
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
    var newMap = new (speciesConstructor$6(map, getBuiltIn$8('Map')))();
    var setter = aCallable$f(newMap.set);
    iterate$i(iterator, function (key, value) {
      setter.call(newMap, key, boundFunction(value, key, map));
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    return newMap;
  }
});

var $$k = _export;
var IS_PURE$j = isPure;
var aCallable$e = aCallable$p;
var anObject$i = anObject$A;
var iterate$h = iterate$r; // `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods

$$k({
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
    var setter = aCallable$e(map.set);
    var argumentsLength = arguments.length;
    var i = 0;

    while (i < argumentsLength) {
      iterate$h(arguments[i++], setter, {
        that: map,
        AS_ENTRIES: true
      });
    }

    return map;
  }
});

var $$j = _export;
var IS_PURE$i = isPure;
var anObject$h = anObject$A;
var aCallable$d = aCallable$p;
var getMapIterator$1 = getMapIterator$a;
var iterate$g = iterate$r; // `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$$j({
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
    aCallable$d(callbackfn);
    iterate$g(iterator, function (key, value) {
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

var $$i = _export;
var IS_PURE$h = isPure;
var anObject$g = anObject$A;
var bind$5 = functionBindContext;
var getMapIterator = getMapIterator$a;
var iterate$f = iterate$r; // `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods

$$i({
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
    return iterate$f(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop();
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true,
      INTERRUPTED: true
    }).stopped;
  }
});

var $$h = _export;
var IS_PURE$g = isPure;
var anObject$f = anObject$A;
var aCallable$c = aCallable$p; // `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods

$$h({
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
    aCallable$c(callback);
    var isPresentInMap = map.has(key);

    if (!isPresentInMap && length < 3) {
      throw TypeError('Updating absent value');
    }

    var value = isPresentInMap ? map.get(key) : aCallable$c(length > 2 ? arguments[2] : undefined)(key, map);
    map.set(key, callback(value, key, map));
    return map;
  }
});

var aCallable$b = aCallable$p;
var anObject$e = anObject$A; // https://github.com/tc39/collection-methods

var collectionAddAll$1 = function () {
  var set = anObject$e(this);
  var adder = aCallable$b(set.add);

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

var $$f = _export;
var IS_PURE$e = isPure;
var collectionDeleteAll = collectionDeleteAll$2; // `Set.prototype.deleteAll` method
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
var getBuiltIn$7 = getBuiltIn$i;
var aCallable$a = aCallable$p;
var anObject$d = anObject$A;
var speciesConstructor$5 = speciesConstructor$a;
var iterate$e = iterate$r; // `Set.prototype.difference` method
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
    var remover = aCallable$a(newSet['delete']);
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
var anObject$c = anObject$A;
var bind$4 = functionBindContext;
var getSetIterator$6 = getSetIterator$7;
var iterate$d = iterate$r; // `Set.prototype.every` method
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
var getBuiltIn$6 = getBuiltIn$i;
var aCallable$9 = aCallable$p;
var anObject$b = anObject$A;
var bind$3 = functionBindContext;
var speciesConstructor$4 = speciesConstructor$a;
var getSetIterator$5 = getSetIterator$7;
var iterate$c = iterate$r; // `Set.prototype.filter` method
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
    var adder = aCallable$9(newSet.add);
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
var anObject$a = anObject$A;
var bind$2 = functionBindContext;
var getSetIterator$4 = getSetIterator$7;
var iterate$b = iterate$r; // `Set.prototype.find` method
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
var getBuiltIn$5 = getBuiltIn$i;
var aCallable$8 = aCallable$p;
var anObject$9 = anObject$A;
var speciesConstructor$3 = speciesConstructor$a;
var iterate$a = iterate$r; // `Set.prototype.intersection` method
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
    var hasCheck = aCallable$8(set.has);
    var adder = aCallable$8(newSet.add);
    iterate$a(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});

var $$9 = _export;
var IS_PURE$8 = isPure;
var aCallable$7 = aCallable$p;
var anObject$8 = anObject$A;
var iterate$9 = iterate$r; // `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom

$$9({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$8
}, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject$8(this);
    var hasCheck = aCallable$7(set.has);
    return !iterate$9(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === true) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$8 = _export;
var IS_PURE$7 = isPure;
var getBuiltIn$4 = getBuiltIn$i;
var aCallable$6 = aCallable$p;
var isCallable = isCallable$f;
var anObject$7 = anObject$A;
var getIterator = getIterator$2;
var iterate$8 = iterate$r; // `Set.prototype.isSubsetOf` method
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

    if (!isCallable(hasCheck)) {
      otherSet = new (getBuiltIn$4('Set'))(iterable);
      hasCheck = aCallable$6(otherSet.has);
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
var aCallable$5 = aCallable$p;
var anObject$6 = anObject$A;
var iterate$7 = iterate$r; // `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf

$$7({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE$6
}, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject$6(this);
    var hasCheck = aCallable$5(set.has);
    return !iterate$7(iterable, function (value, stop) {
      if (hasCheck.call(set, value) === false) return stop();
    }, {
      INTERRUPTED: true
    }).stopped;
  }
});

var $$6 = _export;
var IS_PURE$5 = isPure;
var anObject$5 = anObject$A;
var getSetIterator$3 = getSetIterator$7;
var iterate$6 = iterate$r; // `Set.prototype.join` method
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
var getBuiltIn$3 = getBuiltIn$i;
var aCallable$4 = aCallable$p;
var anObject$4 = anObject$A;
var bind$1 = functionBindContext;
var speciesConstructor$2 = speciesConstructor$a;
var getSetIterator$2 = getSetIterator$7;
var iterate$5 = iterate$r; // `Set.prototype.map` method
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
    var adder = aCallable$4(newSet.add);
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
var aCallable$3 = aCallable$p;
var anObject$3 = anObject$A;
var getSetIterator$1 = getSetIterator$7;
var iterate$4 = iterate$r; // `Set.prototype.reduce` method
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
    aCallable$3(callbackfn);
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
var anObject$2 = anObject$A;
var bind = functionBindContext;
var getSetIterator = getSetIterator$7;
var iterate$3 = iterate$r; // `Set.prototype.some` method
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
var getBuiltIn$2 = getBuiltIn$i;
var aCallable$2 = aCallable$p;
var anObject$1 = anObject$A;
var speciesConstructor$1 = speciesConstructor$a;
var iterate$2 = iterate$r; // `Set.prototype.symmetricDifference` method
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
    var remover = aCallable$2(newSet['delete']);
    var adder = aCallable$2(newSet.add);
    iterate$2(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});

var $$1 = _export;
var IS_PURE = isPure;
var getBuiltIn$1 = getBuiltIn$i;
var aCallable$1 = aCallable$p;
var anObject = anObject$A;
var speciesConstructor = speciesConstructor$a;
var iterate$1 = iterate$r; // `Set.prototype.union` method
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
    iterate$1(iterable, aCallable$1(newSet.add), {
      that: newSet
    });
    return newSet;
  }
});

const {
  EventEmitter
} = require$$0__default$1["default"];
const {
  logScope: logScope$6
} = logger_1;
const logger$6 = logScope$6('cache');
const CacheStorageEvents = {
  CLEANUP: 'cs@cleanup'
};
/**
 * @typedef {{data: any, expireAt: Date}} CacheData
 */

/**
 * A cache storage for storing any type of data.
 */

class CacheStorage extends EventEmitter {
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
    logger$6.debug(this.getLoggerContext(), 'Cleaning up the expired caches...');
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
      logger$6.debug(this.getLoggerContext({
        logKey
      }), `${logKey} hit!`);
      return cachedData.data;
    } // Cache the response of action() and
    // register into our cache map.


    logger$6.debug(this.getLoggerContext({
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

function getManagedCacheStorage$c(id) {
  const cs = new CacheStorage(id);
  csgInstance$1.cacheStorages.add(cs);
  return cs;
}

var cache = {
  CacheStorage,
  CacheStorageEvents,
  CacheStorageGroup: CacheStorageGroup$2,
  getManagedCacheStorage: getManagedCacheStorage$c
};

const insure$5 = insure$6.exports;
const select$6 = select$7.exports;
const request$c = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$b
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
  return request$c('GET', url, headers$2).then(response => response.json()).then(jsonBody => {
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

const cs$b = getManagedCacheStorage$b('provider/qq');

const check$a = info => cs$b.cache(info, () => search$8(info)).then(track$9);

var qq = {
  check: check$a,
  track: track$9
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

  const crypto = require$$0__default$8["default"];
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
})(crypto$4);

const insure$4 = insure$6.exports;
const select$5 = select$7.exports;
const crypto$3 = crypto$4.exports;
const request$b = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$a
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

const track$8 = song => Promise.all(['sqhash', 'hqhash', 'hash'].slice(select$5.ENABLE_FLAC ? 0 : 1).map(format => single$1(song, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$4().kugou.track(song));

const cs$a = getManagedCacheStorage$a('provider/kugou');

const check$9 = info => cs$a.cache(info, () => search$7(info)).then(track$8);

var kugou = {
  check: check$9,
  search: search$7
};

const insure$3 = insure$6.exports;
const select$4 = select$7.exports;
const crypto$2 = crypto$4.exports;
const request$a = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$9
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

const track$7 = id => {
  const url = crypto$2.kuwoapi ? 'http://mobi.kuwo.cn/mobi.s?f=kuwo&q=' + crypto$2.kuwoapi.encryptQuery('corp=kuwo&p2p=1&type=convert_url2&sig=0&format=' + ['flac', 'mp3'].slice(select$4.ENABLE_FLAC ? 0 : 1).join('|') + '&rid=' + id) : 'http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_' + id; // flac refuse
  // : 'http://www.kuwo.cn/url?format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id // flac refuse

  return request$a('GET', url, {
    'user-agent': 'okhttp/3.10.0'
  }).then(response => response.body()).then(body => {
    const url = (body.match(/http[^\s$"]+/) || [])[0];
    return url || Promise.reject();
  }).catch(() => insure$3().kuwo.track(id));
};

const cs$9 = getManagedCacheStorage$9('provider/kuwo');

const check$8 = info => cs$9.cache(info, () => search$6(info)).then(track$7);

var kuwo = {
  check: check$8,
  track: track$7
};

const insure$2 = insure$6.exports;
const select$3 = select$7.exports;
const request$9 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$8
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

const track$6 = id => Promise.all( // [3, 2, 1].slice(select.ENABLE_FLAC ? 0 : 1)
['ZQ', 'SQ', 'HQ', 'PQ'].slice(select$3.ENABLE_FLAC ? 0 : 2).map(format => single(id, format).catch(() => null))).then(result => result.find(url => url) || Promise.reject()).catch(() => insure$2().migu.track(id));

const cs$8 = getManagedCacheStorage$8('provider/migu');

const check$7 = info => cs$8.cache(info, () => search$5(info)).then(track$6);

var migu = {
  check: check$7,
  track: track$6
};

const insure$1 = insure$6.exports;
const select$2 = select$7.exports;
const crypto$1 = crypto$4.exports;
const request$8 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$7
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

const search$4 = info => {
  const keyword = fit(info);
  const url = 'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 'country=hk&lang=zh_TW&' + 'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30';
  return request$8('GET', url, headers).then(response => response.body()).then(body => {
    const jsonBody = JSON.parse(body.replace(/'/g, '"'));
    const list = jsonBody.itemlist.map(format$1);
    const matched = select$2(list, info);
    return matched ? matched.id : Promise.reject();
  });
};

const track$5 = id => {
  const url = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 'channel_id=-1&_=' + new Date().getTime();
  return request$8('GET', url, headers).then(response => response.jsonp()).then(jsonBody => {
    const songUrl = (jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl).replace(/M\d00([\w]+).mp3/, 'M800$1.mp3');
    if (songUrl) return songUrl;else return Promise.reject();
  }).catch(() => insure$1().joox.track(id));
};

const cs$7 = getManagedCacheStorage$7('provider/joox');

const check$6 = info => cs$7.cache(info, () => search$4(info)).then(track$5);

var joox = {
  check: check$6,
  track: track$5
};

const request$7 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$6
} = cache;

const parse$3 = query => (query || '').split('&').reduce((result, item) => {
  const splitItem = item.split('=').map(decodeURIComponent);
  return Object.assign({}, result, {
    [splitItem[0]]: splitItem[1]
  });
}, {});

const cs$6 = getManagedCacheStorage$6('provider/youtube'); // const proxy = require('url').parse('http://127.0.0.1:1080')

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

const search$3 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$7('GET', url, {}, null, proxy$2).then(response => response.body()).then(body => {
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
    request$7('GET', url, {}, null, proxy$2).then(response => response.body()) // .then((body) => JSON.parse(body).streamingData)
    .then(body => JSON.parse(body.match(/ytInitialPlayerResponse\s*=\s*{[^]+};\s*var\s*meta/)[0].replace(/;var meta/, '').replace(/ytInitialPlayerResponse = /, '')).streamingData).then(streamingData => {
      const stream = streamingData.formats.concat(streamingData.adaptiveFormats).find(format => format.itag === 140); // .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
      // .sort((a, b) => b.bitrate - a.bitrate)[0]

      const target = parse$3(stream.signatureCipher);
      return stream.url || (target.sp.includes('sig') ? cs$6.cache('YOUTUBE_SIGNATURE', () => signature(), Date.now() + 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url);
    })
  );
};

const check$5 = info => cs$6.cache(info, () => {
  if (key$2) return apiSearch$1(info);
  return search$3(info);
}).then(track$4);

var youtube = {
  check: check$5,
  track: track$4
};

const request$6 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$5
} = cache; // const proxy = require('url').parse('http://127.0.0.1:1080')

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

const search$2 = info => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
  return request$6('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
    const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
    if (matched) return matched.videoRenderer.videoId;else return Promise.reject();
  });
};

const track$3 = id => {
  const url = `https://www.yt-download.org/api/button/mp3/${id}`;
  const regex = /<a[^>]*href=["']([^"']*)["']/;
  return request$6('GET', url, {}, null, proxy$1).then(response => response.body()).then(body => {
    var matched = body.match(regex);
    return matched ? matched[1] : Promise.reject();
  });
};

const cs$5 = getManagedCacheStorage$5('provider/yt-download');

const check$4 = info => cs$5.cache(info, () => {
  if (key$1) return apiSearch(info);
  return search$2(info);
}).then(track$3);

var ytDownload = {
  check: check$4,
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

const child_process = require$$0__default$9["default"];
const {
  logScope: logScope$5
} = logger_1;
const ProcessExitNotSuccessfully = ProcessExitNotSuccessfully_1;
const logger$5 = logScope$5('spawn');
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
      logger$5.info(`running ${cmd} ${args.join(' ')}`);
    });
    spawn.on('error', error => reject(error));
    spawn.on('close', code => {
      if (code !== 0) reject(new ProcessExitNotSuccessfully(cmd, code));else {
        logger$5.debug(`process ${cmd} exited successfully`);
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
      logger$5.warn(`[${cmd}][stderr] ${stderrPart}`);
      stderrOffset += stderrPart.copy(stderr, stderrOffset);
    });
  });
}

var spawn = {
  spawnStdout: spawnStdout$1
};

const {
  getManagedCacheStorage: getManagedCacheStorage$4
} = cache;
const {
  logScope: logScope$4
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

const logger$4 = logScope$4('provider/youtube-dl');
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

const cs$4 = getManagedCacheStorage$4('youtube-dl');

const check$3 = info => cs$4.cache(info, () => search$1(info)).then(track$2).catch(e => {
  if (e) logger$4.error(e);
  throw e;
});

var youtubeDl = {
  check: check$3,
  track: track$2
};

const {
  cacheStorage,
  CacheStorageGroup: CacheStorageGroup$1,
  getManagedCacheStorage: getManagedCacheStorage$3
} = cache;
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

const cs$3 = getManagedCacheStorage$3('provider/bilibili');

const check$2 = info => cs$3.cache(info, () => search(info)).then(track$1);

var bilibili = {
  check: check$2,
  track: track$1
};

const select = select$7.exports;
const request$4 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$2
} = cache;

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

const cs$2 = getManagedCacheStorage$2('provider/pyncmd');

const check$1 = info => cs$2.cache(info, () => track(info));

var pyncmd = {
  check: check$1
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

var $ = _export;
var aCallable = aCallable$p;
var getBuiltIn = getBuiltIn$i;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$2;
var iterate = iterate$r;
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
      var promiseResolve = aCallable(C.resolve);
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

const request$3 = request_1;
const {
  getManagedCacheStorage: getManagedCacheStorage$1
} = cache;

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

const cs$1 = getManagedCacheStorage$1('provider/find');

var find_1 = (id, data) => {
  if (data) {
    return find$1(id, data);
  } else {
    return cs$1.cache(id, () => find$1(id));
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

class SongNotAvailable$1 extends Error {
  /**
   * @param {string} source
   * @param {string?} song
   */
  constructor(source, song = '?') {
    super(`This song "${song}" is not available in ${source}`);
    this.name = 'SongNotAvailable';
  }

}

var SongNotAvailable_1 = SongNotAvailable$1;

class RequestFailed$1 extends Error {
  /**
   * @param {string} url
   * @param {number} code
   */
  constructor(url, code) {
    super(`Failed to get the response. Status code: ${code}`);
    this.url = url;
    this.code = code;
    this.name = 'RequestFailed';
  }

}

var RequestFailed_1 = RequestFailed$1;

class IncompleteAudioData$1 extends Error {
  /**
   * @param {string} details
   */
  constructor(details) {
    super(`The audio data is incomplete: ${details}`);
    this.name = 'IncompleteAudioData';
  }

}

var IncompleteAudioData_1 = IncompleteAudioData$1;

const find = find_1;
const request$2 = request_1;
const {
  PROVIDERS: providers,
  DEFAULT_SOURCE: defaultSrc
} = consts;
const {
  isHostWrapper
} = utilities;
const SongNotAvailable = SongNotAvailable_1;
const RequestFailed = RequestFailed_1;
const IncompleteAudioData = IncompleteAudioData_1;
const {
  logScope: logScope$3
} = logger_1;
const RequestCancelled = RequestCancelled_1;
const logger$3 = logScope$3('provider/match');
/**
 * Is this http request success?
 *
 * @param {number} code The HTTP status code.
 */

const isHttpResponseOk = code => code >= 200 && code <= 299;
/** @type {Map<string, string>} */


const headerReferer = new Map([['bilivideo.com', 'https://www.bilibili.com/'], ['yt-download.org', 'https://www.yt-download.org/']]);
/**
 * @typedef {{ size: number, br: number | null, url: string | null, md5: string | null }} AudioData
 */

/**
 * Get the audio URL from the specified source.
 *
 * @param {string} source The source to fetch the audio URL.
 * @param {Record<string, unknown>} info The music metadata from Netease Music.
 * @return {Promise<AudioData>}
 */

async function getAudioFromSource(source, info) {
  logger$3.debug({
    source,
    info
  }, 'Getting the audio...'); // Check if this song is available in the specified source.

  const audioData = await providers[source].check(info);
  if (!audioData) throw new SongNotAvailable(source); // Get the url from the song data.

  const song = await check(audioData);
  logger$3.debug(song, 'The matched song is:');
  if (!song || typeof song.url !== 'string') throw new IncompleteAudioData('song is undefined, or song.url is not a string.');
  logger$3.debug({
    source,
    info
  }, 'The audio matched!');
  return song;
}

async function match$1(id, source, data) {
  const candidate = (source || commonjsGlobal.source || defaultSrc).filter(name => name in providers);
  const audioInfo = await find(id, data);
  const audioData = await Promise.any(candidate.map(async source => getAudioFromSource(source, audioInfo).catch(e => {
    if (e) {
      if (e instanceof RequestCancelled) logger$3.debug(e);else logger$3.error(e);
    }

    throw e; // We just log it instead of resolving it.
  })));
  const {
    id: audioId,
    name
  } = audioInfo;
  const {
    url
  } = audioData;
  logger$3.debug({
    audioInfo,
    audioData
  }, 'The data to replace:');
  logger$3.info({
    audioId,
    songName: name,
    url
  }, `Replaced: [${audioId}] ${name}`);
  return audioData;
}
/**
 * Check and get the audio info of URL.
 * @param url The URL to be fetched.
 * @return {Promise<AudioData>} The parsed audio data.
 */


async function check(url) {
  const isHost = isHostWrapper(url);
  const song = {
    size: 0,
    br: null,
    url: null,
    md5: null
  };
  const header = {
    range: 'bytes=0-8191',
    'accept-encoding': 'identity'
  }; // Set the "Referer" header.

  headerReferer.forEach((refererValue, urlPattern) => {
    if (isHost(urlPattern)) header.referer = refererValue;
  });
  const response = await request$2('GET', url, header);
  const {
    /** @type {Record<string, string>} */
    headers
  } = response; // Check if this request success.

  if (!isHttpResponseOk(response.statusCode)) throw new RequestFailed(url, response.statusCode); // Set the URL of this song.

  song.url = response.url.href; // Get the bitrate of this song.

  const data = await response.body(true);

  try {
    const bitrate = decode(data);
    song.br = bitrate && !isNaN(bitrate) ? bitrate * 1000 : null;
  } catch (e) {
    logger$3.debug(e, 'Failed to decode and extract the bitrate');
  } // Check if "headers" existed. There are some edge cases
  // that the response has no headers, for example, the song
  // from YouTube.


  if (headers) {
    // Set the MD5 info of this song.
    if (isHost('126.net')) song.md5 = song.url.split('/').slice(-1)[0].replace(/\..*/g, '');
    if (isHost('kuwo.cn') && song.br <= 320000) song.md5 = headers['etag'].replace(/"/g, '');
    if (isHost('qq.com')) song.md5 = headers['server-md5']; // Set the size info of this song.

    song.size = parseInt((headers['content-range'] || '').split('/').pop() || headers['content-length']) || 0; // Check if the Content-Length equals 8192.

    if (!isHost('yt-download.org') && headers['content-length'] !== '8192') {
      // I'm not sure how to describe this.
      // Seems like not important.
      return Promise.reject();
    }
  }

  return song;
}

function decode(buffer) {
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
}

var match_1 = match$1;

const parse$2 = require$$6__default["default"].parse;
const crypto = crypto$4.exports;
const request$1 = request_1;
const match = match_1;
const querystring = require$$2__default$1["default"];
const {
  isHost: isHost$1
} = utilities;
const {
  getManagedCacheStorage
} = cache;
const {
  logScope: logScope$2
} = logger_1;
const logger$2 = logScope$2('hook');
const cs = getManagedCacheStorage('hook');
cs.aliveDuration = 7 * 24 * 60 * 60 * 1000;
const ENABLE_LOCAL_VIP = (process.env.ENABLE_LOCAL_VIP || '').toLowerCase() === 'true';
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
    }).catch(error => error && logger$2.error(error, `A error occurred in hook.request.before when hooking ${req.url}.`));
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

        if (ENABLE_LOCAL_VIP) {
          if (netease.path === '/batch' || netease.path === '/api/batch') {
            var info = netease.jsonBody['/api/music-vip-membership/client/vip/info'];

            if (info) {
              const expireTime = info.data.now + 31622400000;
              info.data.redVipLevel = 7;
              info.data.redVipAnnualCount = 1;
              info.data.musicPackage.expireTime = expireTime;
              info.data.musicPackage.vipCode = 230;
              info.data.associator.expireTime = expireTime;
              netease.jsonBody['/api/music-vip-membership/client/vip/info'] = info;
            }
          }
        }
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
    }).catch(error => error && logger$2.error(error, `A error occurred in hook.request.after when hooking ${req.url}.`));
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
  }).catch(e => e && logger$2.error(e));
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
  }).catch(e => e && logger$2.error(e));
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

          if (os in limit && newer(limit[os], version)) {
            return cs.cache(task, () => computeHash(task)).then(value => item.md5 = value);
          }
        } catch (e) {}
      }).catch(e => e && logger$2.error(e));
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

  return Promise.all(tasks).catch(e => e && logger$2.error(e));
};

const unblockSoundEffects = obj => {
  logger$2.debug('unblockSoundEffects() has been triggered.');
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

const fs = require$$0__default$3["default"];
const net = require$$1__default$2["default"];
const path = require$$0__default["default"];
const parse$1 = require$$6__default["default"].parse;
const {
  logScope: logScope$1
} = logger_1;
const logger$1 = logScope$1('server');
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
    if (socket) if (socket) logger$1.debug({
      decision,
      url: req.url
    }, `TUNNEL`);else logger$1.debug({
      decision,
      host: parse$1(req.url).host,
      encrypted: req.socket.encrypted
    }, `MITM${req.socket.encrypted ? ' (ssl)' : ''}`);
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
    }).then(data => ctx.socket.sni = sni(data)).catch(e => e && logger$1.error(e)),
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
  http: require$$1__default$1["default"].createServer().on('request', proxy.core.mitm).on('connect', proxy.core.tunnel),
  https: require$$2__default["default"].createServer(options).on('request', proxy.core.mitm).on('connect', proxy.core.tunnel)
};
server$1.whitelist = [];
server$1.blacklist = ['://127\\.\\d+\\.\\d+\\.\\d+', '://localhost'];
server$1.authentication = null;
var server_1 = server$1;

const packageJson = require$$0$1;
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

if (config.forceHost && require$$1__default$2["default"].isIP(config.forceHost) === 0) {
  console.log('Please check the server host.');
  process.exit(1);
}

if (config.matchOrder) {
  const provider = Object.keys(consts.PROVIDERS);
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

const {
  logScope
} = logger_1;
const parse = require$$6__default["default"].parse;
const hook = hook_1;
const server = server_1;
const {
  CacheStorageGroup
} = cache;
const logger = logScope('app');

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

const dns = host => new Promise((resolve, reject) => require$$9__default["default"].lookup(host, {
  all: true
}, (error, records) => error ? reject(error) : resolve(records.map(record => record.address))));

const httpdns = host => request_1('POST', 'http://music.httpdns.c.163.com/d', {}, host).then(response => response.json()).then(jsonBody => jsonBody.dns.reduce((result, domain) => result.concat(domain.ips), []));

const httpdns2 = host => request_1('GET', 'http://httpdns.n.netease.com/httpdns/v2/d?domain=' + host).then(response => response.json()).then(jsonBody => Object.keys(jsonBody.data).map(key => jsonBody.data[key]).reduce((result, value) => result.concat(value.ip || []), [])); // Allow enabling HTTPDNS queries with `ENABLE_HTTPDNS=true`
// It seems broken - BETTER TO NOT ENABLE IT!


const dnsSource = process.env.ENABLE_HTTPDNS === 'true' ? [httpdns, httpdns2] : []; // Start the "Clean Cache" background task.

const csgInstance = CacheStorageGroup.getInstance();
setInterval(() => {
  csgInstance.cleanup();
}, 15 * 60 * 1000);
Promise.all(dnsSource.map(query => query(target.join(','))).concat(target.map(dns))).then(result => {
  const {
    host
  } = hook.target;
  result.forEach(array => array.forEach(host.add, host));
  server.whitelist = server.whitelist.concat(Array.from(host).map(escape));

  const log = type => logger.info(`${['HTTP', 'HTTPS'][type]} Server running @ http://${address || '0.0.0.0'}:${port[type]}`);

  if (port[0]) server.http.listen(port[0], address).once('listening', () => log(0));
  if (port[1]) server.https.listen(port[1], address).once('listening', () => log(1));
}).catch(error => {
  console.log(error);
  process.exit(1);
});

module.exports = app;
