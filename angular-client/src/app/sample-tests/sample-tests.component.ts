import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../../app/models/Test.model';
import { SampleTestsService } from '../shared/services/sample-tests.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-sample-tests',
  templateUrl: './sample-tests.component.html',
  styleUrls: ['./sample-tests.component.css']
})
export class SampleTestsComponent implements OnInit {
  questions: any[] =[]; 
  attemptedQuestions: any[] = [];
  qId =0;
  count =0;
  testStarted = false;
  currentQuestion: any;
  answer: any;
  seconds =0;
 
  timeElapsed: any;
  score = 0;
  correct = 0;
  incorrect = 0;
  answers:number[] =[];
  constructor(
    private sampleTestsService: SampleTestsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void { 
    this.seconds = 0;   
    this.testStarted = false;
  }

  startJsTest() {
    this.questions = this.sampleTestsService.getPracticeTest('JS');
    this.startTest();
  }

  startHtmlTest() {
    this.questions = this.sampleTestsService.getPracticeTest('HTML');
    this.startTest();
  }

  startCssTest() {
    this.questions = this.sampleTestsService.getPracticeTest('CSS');
    this.startTest();
  }

  startTest() {
    this.testStarted = true;
    this.sampleTestsService.correct = 0;
    this.sampleTestsService.incorrect=0;
    this.correct=0;
    this.incorrect=0;
    this.attemptedQuestions =[];
    if (this.questions) {    
      let rand = Math.random() * this.questions.length;
      this.qId = Math.floor(rand);
      this.currentQuestion = this.questions[this.qId];
      this.currentQuestion.answer = '';
      this.startTimer();        
      this.count++;          
    }
  }

  startTimer() {    
    if (this.seconds < 300 ) {
      this.sampleTestsService.timer =setInterval(() => {
        this.sampleTestsService.seconds++;
        this.seconds = this.sampleTestsService.seconds;
        this.timeElapsed =this.sampleTestsService.getTimeElapsed(this.seconds);
      }, 1000);    
    } else this.showResults(); 
  }

  clearTimer() {
    this.seconds = 0;
   clearInterval(this.sampleTestsService.timer);
  }

  chkOption(option: any) {
    this.attemptedQuestions.push(this.currentQuestion);
      if (option.correct) {
        this.correct++;
      } else {
        this.incorrect++;
      }
      if (this.count >= this.questions.length) {
        this.showResults();
      }   else {  
        this.count++;
        let rand = Math.random() * this.questions.length;       
        this.qId = Math.floor(rand);
        this.currentQuestion = this.questions[this.qId];
        while(this.attemptedQuestions.length >0 && this.attemptedQuestions.find(e => e.qId === this.currentQuestion.qId) ) {
          let rand = Math.random() * this.questions.length;         
          this.qId = Math.floor(rand);         
          this.currentQuestion = this.questions[this.qId]; 
        }        
      }
  }
  

cancel() {
  this.clearTimer();
  this.seconds = 0;  
  this.testStarted = false; 
  this.count =0;  
}

  showResults() {
    this.clearTimer();
    this.seconds = 0;  
    this.testStarted = false; 
    this.count =0;
    this.openModal();    
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modal_title = 'Test Result';
    modalRef.componentInstance.modal_content.correct = this.correct;
    modalRef.componentInstance.modal_content.incorrect = this.incorrect;
    let unattemptedQuestions =this.questions.length -(this.correct + this.incorrect);
    modalRef.componentInstance.modal_content.unanswered = unattemptedQuestions;
    modalRef.componentInstance.modal_content.totalScore = this.questions.length;
  }
}