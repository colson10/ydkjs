
function CoolModule() {
  var something = 'cool';
  var another =  [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log( another.join(' ! ') );
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

function hello() {

  for (let i = 0; i < 5; i++) {
    console.log('hello');
    function printer() {
      console.log(i);
    }
    printer();
  }

}

for (let i=1; i<=5; i++) {

  setTimeout( function timer(){
    console.log( i );
  }, i*1000 );

}

hello();

function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = 'Hello, I\'m ' + identify.call(this);
  console.log(greeting);
}

var me = {
  name: 'Kyle'
};

var you = {
  name: 'Reader'
};

identify.call(me);
identify.call(you);

speak.call(me);
speak.call(you);

function foo(num) {
  console.log('foo: ' + num);
  data.count++;
}

function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log(this.a);
}



function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2

function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42


var myObject = {};

Object.defineProperty( myObject, 'a', {
  value: 2,
  writable: false, // not writable!
  configurable: true,
  enumerable: true
} );

myObject.a = 3;

myObject.a;

var myObject = {
  a: 2
};

myObject.a = 3;
myObject.a;

Object.defineProperty( myObject, 'a', {
  value: 4,
  writable: true,
  configurable: false,
  enumerable: true,
} );

myObject.a;
myObject.a = 5;
myObject.a;

Object.defineProperty( myObject, 'a', {
  value: 6,
  writable: true,
  configurable: true,
  enumerable: true,
} ); // TypeError


var myObject = {
  a: 2
};

myObject.a; // 2

var myObject = {
  a: 2
};

myObject.b; // undefined


var anotherObject = {
  a: 2
};

var myObject = Object.create(anotherObject);

myObject.a; // 2

function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

var a = new Foo('a');
var b = new Foo('b');

a.myName(); // "a"
b.myName(); // "b"

var foo = {
  something: function() {
    console.log( 'Tell me something good...' );
  }
};

var bar = Object.create(foo);

bar.something(); // Tell me something good...

var Task = {
  setID: function(ID) {this.id = ID;},
  outputID: function() {console.log(this.id);}
};

var XYZ = Object.create(Task);

XYZ.prepareTask = function(ID,Label) {
  this.setID(ID);
  this.label = Label;
};

XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};

