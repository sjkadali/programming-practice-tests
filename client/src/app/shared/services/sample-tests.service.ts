import { Injectable } from '@angular/core';
import { Test } from '../../models/Test.model';

@Injectable({
  providedIn: 'root'
})
export class SampleTestsService {
  seconds =0;
  timer:any;

  jsPracticeTest = [
    {
      qId: 1,
      question: 'what are the different data types defined in JS',
      options: [{text: 'int, float, string, object, null', correct: false}, {text:'Boolean, null, undefined, Number, BigInt, String, Symbol, Object', correct: true},
       {text: 'Boolean, decimal, Number, String, null, Object', correct: false}, {text: 'Boolean, decimal, integer, String, undefined, Object', correct: false}]
     },
    {
      qId: 2,
      question: 'which of these types of variable declarations have block level scope?',
      options: [{text: 'var, let, const', correct: false}, {text: 'var, const', correct: false}, {text: 'let, const', correct: true},     
        {text: 'var, let', correct: false}]      
    },
    {
      qId: 3,
      question: `let str = "oats, coffee, tea";
                 What will be the output of 'document.getElementById("demo").innerHTML = str.slice(0,5)';?`,
      options: [{text:'oats, c', correct: false},{text:'oats, co', correct: false}, {text:'oats', correct: false},{text:'oats,', correct: true}]      
    },
    {
      qId: 4,
      question: 'Which one declares a function-scoped or globally-scoped variable?',
      options: [{text: 'var', correct: true}, {text: 'let', correct: false},{text: 'const', correct: false},{text: 'var, const', correct: false}]
     },
    {
      qId: 5,
      question: 'Which data type has instances that are unique and immutable?',
      options: [{text: 'null', correct: false}, {text: 'Number', correct: false}, {text: 'Symbol', correct: true},{text: 'None of these', correct: false}]
    },
    {
      qId: 6,
      question: `let str = "oats, coffee, tea";
      What will be the output of 'document.getElementById("demo").innerHTML = str.substring(6, 13)';?`,
      options: [{text: 'coffee', correct: true}, {text: 'index out of range', correct: false}, {text: 'method not defined', correct: false},{text: 'offee,', correct: false}]
    },
    {
      qId: 7,
      question: `let str = "orange, apple, grapes";
      What will be the output of 'document.getElementById("demo").innerHTML = str.substr(1, 4)';?`,
      options: [{text: 'oran', correct: false}, {text: 'appl', correct: false}, {text: 'rang', correct: true},
        {text: 'orange,', correct: false}]
    },
    {
      qId: 8,
      question: `What will be the output of "console.log(Array.from('fruits')); " ?`,
      options: [{text: 'Array ["fruits"]', correct: false}, {text: 'Array ["f", "r", "u", "i", "t", "s"]', correct: true}, 
        {text: 'method not defined', correct: false},{text: 'Error: items is undefined', correct: false}]
    },
    {
      qId: 9,
      question: `const array1 = [1, 2, [3, 4, [5, 6]]];
           What will be the output of  array1.flat();" ?`,
      options: [{text: 'Array [1, 2, 3, 4, [5, 6]]', correct: true}, {text: 'Array [1, 2, 3, 4, 5, 6]', correct: false}, 
        {text: 'Uncaught TypeError: array1.flast is not a function', correct: false},{text: 'Uncaught SyntaxError,', correct: false}]
    },
    {
      qId: 10,
      question: `What will be the output of 'Array.of(3, 4, 5); '?`,
      options: [{text: '[3], [4], [5]', correct: false}, {text: 'method not defined', correct: false},
         {text: '[3, 4, 5]', correct: true},{text: 'Error: items is undefined', correct: false}]
    }
  ];

  htmlPracticeTest =  [
    {
      qId: 1,
      question: 'which tags are used to define HTML headings?',
      options: [{text: '<h1> to <h6> tags ', correct: true}, {text: '<h1> to <h7> tags ', correct: false},
       {text:  '<h1> to <h8> tags ', correct: false}, {text: '<h1> to <h9> tags ', correct: false}]
    },
    {
      qId: 2,
      question: 'which are the global attributes in HTML?',
      options: [{text: 'accept, class, contenteditable, data-*, dir, style, id, draggable, hidden, lang, spellcheck, tabindex, title, translate ', correct: false},
        {text: 'action, class, contenteditable, data-*, dir, style, id, draggable, hidden, lang, spellcheck, tabindex, title, translate ', correct: false},
      {text: 'accesskey, class, contenteditable, data-*, dir, style, id, draggable, hidden, lang, spellcheck, tabindex, title, translate ', correct: true},
      {text: 'charset, class, contenteditable, data-*, dir, style, id, draggable, hidden, lang, spellcheck, tabindex, title, translate', correct: false} ]     
    },
    {
      qId: 3,
      question: `The "checked" attribute is used on which element?`,
      options: [{text:'<select>', correct: false},{text:'<input>', correct: true}, {text:'<option>', correct: false},{text:'<checkbox>', correct: false}]
    },
    {
      qId: 4,
      question: 'Which tag defines the root of an HTML document?',
      options: [{text: '<head>', correct: false}, {text: '<!DOCTYPE>', correct: false},{text: '<header>', correct: false},{text: '<html>', correct: true}]
    },
    {
      qId: 5,
      question: 'Which tag defines a container for multiple image resources?',
      options: [{text: '<img>', correct: false}, {text: '<images>', correct: false}, {text: '<picture>', correct: true},{text: 'None of these', correct: false}]
    },
    {
      qId: 6,
      question: `Which tag specifies text that is no longer correct, accurate or relevant?`,
      options: [{text: '<del>', correct: false}, {text: '<s>', correct: true}, {text: '<wrong>', correct: false},{text: 'None of these', correct: false}]
    },
    {
      qId: 7,
      question: `Which tag defines the title of a creative work?`,
      options: [{text: '<cite>', correct: true}, {text: '<title>', correct: false}, {text: '<caption>', correct: false},{text: 'None of these', correct: false}]
    },
    {
      qId: 8,
      question: `The "alt" attribute is used with which elements?`,
      options: [{text: '<table>,<input>, <canvas>', correct: false}, {text: '<area>, <img>, <input>', correct: true}, {text: '<table>, <img>', correct: false},{text: 'None of these', correct: false}]
    },
    {
      qId: 9,
      question: `The "colspan" attribute is used with which elements??`,
      options: [{text: '<table>,<td>,<th>', correct: false}, {text: '<table>,<td>', correct: false}, {text: '<td>,<th>', correct: true},{text: 'None of these', correct: false}]
    },
    {
      qId: 10,
      question: `The "controls" attribute is used with which elements??`,
      options: [{text: '<audio>,<video>', correct: true}, {text: '<img>,<audio>', correct: false}, {text: '<img>, <audio>,<video>', correct: false},{text: '<img>, <video>', correct: false}]
    }
  ];

  cssPracticeTest =  [
    {
      qId: 1,
      question: 'Simple selectors are used for',
      options: [{text: 'selecting elements based on a certain state', correct: false},
      {text:'selecting and styling a part of an element', correct: false},
      {text: 'selecting elements based on name, id, class', correct: true}, 
      {text: 'select elements based on a specific relationship between them', correct: false}]
    },
    {
      qId: 2,
      question: 'Pseudo-class selectors are used to',
      options: [{text: 'select elements based on name, id, class', correct: false},
      {text: 'select elements based on a specific relationship between them', correct: false}, 
      {text: 'None of the options given', correct: false},
      {text: 'select elements based on a certain state', correct: true}]
    },
    {
      qId: 3,
      question: 'Pseudo-elements selectors are used to',
      options: [{text: 'select and style a part of an element', correct: true},
      {text: 'select elements based on a specific relationship between them', correct: false}, 
      {text: 'None of the options given', correct: false},
      {text: 'select elements based on a certain state', correct: false}]
    },
    {
      qId: 4,
      question: 'Combinator selectors are used to',
      options: [{text: 'select and style a part of an element', correct: false},
      {text: 'select elements based on a specific relationship between them', correct: true}, 
      {text: 'None of the options given', correct: false},
      {text: 'select elements based on a certain state', correct: false}]
    },
    {
      qId: 5,
      question: 'Attribute selectors are used for',
      options: [{text: 'select and style a part of an element', correct: false},
      {text: 'select elements based on a specific relationship between them', correct: false}, 
      {text: 'select elements based on an attribute or attribute value', correct: true},
      {text: 'select elements based on a certain state', correct: false}]
    },
    {
      qId: 6,
      question:` #para1 {
                    text-align: left;
                    color: red;
                  } 
                  In the above example, which of the following selectors is used?`,
      options: [{text: 'Attribute selector', correct: false}, {text: 'Combinator selector', correct: false},
       {text: 'Pseudo-class selector', correct: false},{text: 'Simple selector', correct: true}]    
    },
    {
      qId: 7,
      question:` input:focus {
                    background-color: gray;
                  }
                  In the above example, which of the following selectors is used?`,
      options: [{text: 'Attribute selector', correct: false}, {text: 'Combinator selector', correct: false},
       {text: 'Pseudo-class selector', correct: true},{text: 'Simple selector', correct: false}]    
    },
    {
      qId: 8,
      question: ` div p {
                    background-color: yellow;
                  }
                  In the above example, which of the following selectors is used?`,
      options: [{text: 'Attribute selector', correct: false}, {text: 'Combinator selector', correct: true},
       {text: 'Pseudo-class selector', correct: false},{text: 'Simple selector', correct: false}]    
    },
    {
      qId: 9,
      question: `h2 > p {
                  color: blue;
                  }
                    In the above example, which of the following selectors is used?`,
      options: [{text: 'Attribute selector', correct: false}, {text: 'child selector', correct: true},
      {text: 'Pseudo-class selector', correct: false},{text: 'Simple selector', correct: false}]    
    },
    {
      qId: 10,
      question: `h2 ~ p {
        color: red;
        }
          In the above example, which of the following selectors is used?`,
options: [{text: 'Attribute selector', correct: false}, {text: 'General Sibling Selector', correct: true},
{text: 'Pseudo-class selector', correct: false},{text: 'Simple selector', correct: false}]    
    },
  ];

  score: number =0;
  correct: number = 0;
  incorrect: number =0;
  
  constructor() { }

  getPracticeTest(testType: string) {
    if (testType === 'JS') {
      return this.jsPracticeTest;
    } else if (testType === 'HTML') {
      return this.htmlPracticeTest;
    } else 
      return this.cssPracticeTest;
  }

  getTimeElapsed(seconds:any) {
    this.seconds = seconds;
    return Math.floor(this.seconds/3600) + ':' + Math.floor(this.seconds/60) + ':' +
      Math.floor(this.seconds % 60);
  }

  evaluateTest(attemptedQuestions: Test[], questions: Test[]) {
    let i='', question;
    attemptedQuestions.forEach((q) => {
      if (q.answer) {
        i= q._id;
        question = questions.find(x => x._id === i);
        q.answer === question?.answer ? this.correct++ : 
        this.incorrect++;    
      } else {
        this.incorrect++;
      }     
    });   
    return;
  }
}
