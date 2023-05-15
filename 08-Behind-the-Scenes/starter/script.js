'use strict';

//a tip og the iceberg:
//js is a high-level, object-oriented, multi-paradigm programming language

//high-level, prototype-based object-oriented, multi-paradigm, interpreted or just-in-time complied, dynamic
//single-threaded, garbage-collected, firt-class functions, non-blocking event loop concurrency model

//compilation vs. interpretation
//compilation: the whole source code is converted to machine code as a portable file first, and then this portable file will be executed.
//interpretation: the source code is converted and executed line by line.
//js is a purely interpreted language. and the problem of it is that this kind of language is much more slower than complied language.
//But modern js engine is now a mix between compilation and interpretation, which is called just-in-time(JIT) compilation.
//JIT compilation: Entire code is converted into machine code at once and then executed immediately. There is no prtable file in this compilation.

//lexical scopig: the scop chain only works upward, not sideway
//var is function-scoped. In strict mode, it's block-scoped
//let and const are block-scoped

//scope chain vs. call stack

//small summary:
//scoping is all about where do variables live and where can we accesss variables
//THere are 3 types of scope in js: global, function, block
//lexical scoping defines where we can access varialbes and it based on where funcitons and blocks are written in the code
//so it means scopes always have access to all the variables from their outer scopes. Ana that os scope chain.
//so when a varibale is not in the current scope, the engine looks up in the scope chain until it find the variable. And that is called variable lookup
//THe scope chain has noting to do with the order in which the functions were called. It dose not affect the scope chain at all.
