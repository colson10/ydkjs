this and Objects

### Chapter 1: this or That?
Review (TL;DR)
this binding is a constant source of confusion for the JavaScript developer who does not take the time to learn how the mechanism actually works. Guesses, trial-and-error, and blind copy-n-paste from Stack Overflow answers is not an effective or proper way to leverage this important this mechanism.

To learn this, you first have to learn what this is not, despite any assumptions or misconceptions that may lead you down those paths. this is neither a reference to the function itself, nor is it a reference to the function's lexical scope.

this is actually a binding that is made when a function is invoked, and what it references is determined entirely by the call-site where the function is called.


### Chapter 2: this All Makes Sense Now!
Review (TL;DR)
Determining the this binding for an executing function requires finding the direct call-site of that function. Once examined, four rules can be applied to the call-site, in this order of precedence:

1. Called with new? Use the newly constructed object.

2. Called with call or apply (or bind)? Use the specified object.

3. Called with a context object owning the call? Use that context object.

4. Default: undefined in strict mode, global object otherwise.

Be careful of accidental/unintentional invoking of the default binding rule. In cases where you want to "safely" ignore a this binding, a "DMZ" object like ø = Object.create(null) is a good placeholder value that protects the global object from unintended side-effects.

Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for this binding, which means they adopt the this binding (whatever it is) from its enclosing function call. They are essentially a syntactic replacement of self = this in pre-ES6 coding.

### Chapter 6: Objects

Review (TL;DR)
Objects in JS have both a literal form (such as var a = { .. }) and a constructed form (such as var a = new Array(..)). The literal form is almost always preferred, but the constructed form offers, in some cases, more creation options.

Many people mistakenly claim "everything in JavaScript is an object", but this is incorrect. Objects are one of the 6 (or 7, depending on your perspective) primitive types. Objects have sub-types, including function, and also can be behavior-specialized, like [object Array] as the internal label representing the array object sub-type.

Objects are collections of key/value pairs. The values can be accessed as properties, via .propName or ["propName"] syntax. Whenever a property is accessed, the engine actually invokes the internal default [[Get]] operation (and [[Put]] for setting values), which not only looks for the property directly on the object, but which will traverse the [[Prototype]] chain (see Chapter 5) if not found.

Properties have certain characteristics that can be controlled through property descriptors, such as writable and configurable. In addition, objects can have their mutability (and that of their properties) controlled to various levels of immutability using Object.preventExtensions(..), Object.seal(..), and Object.freeze(..).

Properties don't have to contain values -- they can be "accessor properties" as well, with getters/setters. They can also be either enumerable or not, which controls if they show up in for..in loop iterations, for instance.

You can also iterate over the values in data structures (arrays, objects, etc) using the ES6 for..of syntax, which looks for either a built-in or custom @@iterator object consisting of a next() method to advance through the data values one at a time.


### Chapter 4: Mixing (Up) "Class" Objects

Review (TL;DR)
Classes are a design pattern. Many languages provide syntax which enables natural class-oriented software design. JS also has a similar syntax, but it behaves very differently from what you're used to with classes in those other languages.

Classes mean copies.

When traditional classes are instantiated, a copy of behavior from class to instance occurs. When classes are inherited, a copy of behavior from parent to child also occurs.

Polymorphism (having different functions at multiple levels of an inheritance chain with the same name) may seem like it implies a referential relative link from child back to parent, but it's still just a result of copy behavior.

JavaScript does not automatically create copies (as classes imply) between objects.

The mixin pattern (both explicit and implicit) is often used to sort of emulate class copy behavior, but this usually leads to ugly and brittle syntax like explicit pseudo-polymorphism (OtherObj.methodName.call(this, ...)), which often results in harder to understand and maintain code.

Explicit mixins are also not exactly the same as class copy, since objects (and functions!) only have shared references duplicated, not the objects/functions duplicated themselves. Not paying attention to such nuance is the source of a variety of gotchas.

In general, faking classes in JS often sets more landmines for future coding than solving present real problems.

### Chapter 5: Prototypes

Review (TL;DR)
When attempting a property access on an object that doesn't have that property, the object's internal [[Prototype]] linkage defines where the [[Get]] operation (see Chapter 3) should look next. This cascading linkage from object to object essentially defines a "prototype chain" (somewhat similar to a nested scope chain) of objects to traverse for property resolution.

All normal objects have the built-in Object.prototype as the top of the prototype chain (like the global scope in scope look-up), where property resolution will stop if not found anywhere prior in the chain. toString(), valueOf(), and several other common utilities exist on this Object.prototype object, explaining how all objects in the language are able to access them.

The most common way to get two objects linked to each other is using the new keyword with a function call, which among its four steps (see Chapter 2), it creates a new object linked to another object.

The "another object" that the new object is linked to happens to be the object referenced by the arbitrarily named .prototype property of the function called with new. Functions called with new are often called "constructors", despite the fact that they are not actually instantiating a class as constructors do in traditional class-oriented languages.

While these JavaScript mechanisms can seem to resemble "class instantiation" and "class inheritance" from traditional class-oriented languages, the key distinction is that in JavaScript, no copies are made. Rather, objects end up linked to each other via an internal [[Prototype]] chain.

For a variety of reasons, not the least of which is terminology precedent, "inheritance" (and "prototypal inheritance") and all the other OO terms just do not make sense when considering how JavaScript actually works (not just applied to our forced mental models).

Instead, "delegation" is a more appropriate term, because these relationships are not copies but delegation links.


### Chapter 6: Behavior Delegation

Review (TL;DR)
Classes and inheritance are a design pattern you can choose, or not choose, in your software architecture. Most developers take for granted that classes are the only (proper) way to organize code, but here we've seen there's another less-commonly talked about pattern that's actually quite powerful: behavior delegation.

Behavior delegation suggests objects as peers of each other, which delegate amongst themselves, rather than parent and child class relationships. JavaScript's [[Prototype]] mechanism is, by its very designed nature, a behavior delegation mechanism. That means we can either choose to struggle to implement class mechanics on top of JS (see Chapters 4 and 5), or we can just embrace the natural state of [[Prototype]] as a delegation mechanism.

When you design code with objects only, not only does it simplify the syntax you use, but it can actually lead to simpler code architecture design.

OLOO (objects-linked-to-other-objects) is a code style which creates and relates objects directly without the abstraction of classes. OLOO quite naturally implements [[Prototype]]-based behavior delegation.