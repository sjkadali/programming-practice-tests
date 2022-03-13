import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/Test.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeTestsService {
  seconds =0;
  timer:any;
  tests: Test[]=[];  

  practiceTest = [
    {
      qId: 1,
      question: '3x + 3 = 7x – 1. Find x ',
      answer: 1
    },
    {
      qId: 2,
      question: '5x + 2(x + 4) = 14x - 13 . Find x ',
      answer: 3
    },
    {
      qId: 3,
      question: '5z = 3(z + 2) + 12 Solve for Z',
      answer: 9
    },
    {
      qId: 4,
      question: 'The price of a book went up from $20 to $25. By how many percent did the price increase?',
      answer: 25
    },
    {
      qId: 5,
      question: ' A number is increased by 2 and then multiplied by 3. The result is 24. What is this number?',
      answer: 6
    },
    {
      qId: 6,
      question: ' (3x – 2) / 4 – (3x + 5) / 7 = – 7, x = ?',
      answer: 3    
    }
  ]

  score: number =0;;
  correct: number = 0;
  incorrect: number =0;
  
  constructor( 
    private httpClient: HttpClient, 
    private authService: AuthService
  ) {}

  getPracticeTest(test: string) {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': this.authService.getToken() || ''   
    });
    const data = this.httpClient.get<any[]>(`http://localhost:3000/secure/tests/${test}`, {headers: httpHeaders});
    return data;
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
