import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../../app/models/Test.model';
import { PracticeTestsService } from '../shared/services/practice-tests.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-Practice-tests',
  templateUrl: './Practice-tests.component.html',
  styleUrls: ['./Practice-tests.component.css']
})
export class PracticeTestsComponent implements OnInit, DoCheck {
  questions: any[] =[]; 
  attemptedQuestions: any[] = [];
  qId =0;
  count =0;
  testStarted = false;
  currentQuestion:any;
  answer: any;
  seconds =0;
 
  timeElapsed: any;
  score = 0;
  correct = 0;
  incorrect = 0;
  answers:number[] =[];
  constructor(
    private practiceTestsService: PracticeTestsService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void { 
    this.seconds = 0;   
    this.testStarted = false;
  }

  ngDoCheck(): void {
    if(this.authService.tokenExpired()) {
      this.router.navigate(['login']);
    }
  }

  startJsTest() {
   this.practiceTestsService.getPracticeTest('JS').subscribe(data => {
     let dataArr = Array.from(Object.values(data));
      for(let i=0; i< dataArr[0].length; i++){
        this.questions[i] = {qid: i , item: dataArr[0][i]};
      }
    this.startTest();
   }, (err) => console.log(err));  
  }

  startHtmlTest() {
    this.practiceTestsService.getPracticeTest('HTML').subscribe(data => {
      let dataArr = Array.from(Object.values(data));
      for(let i=0; i< dataArr[0].length; i++){
        this.questions[i] = {qid: i , item: dataArr[0][i]};
      }
      this.startTest();
     }, (err) => console.log(err));    
  }

  startCssTest() {
    this.practiceTestsService.getPracticeTest('CSS').subscribe(data => {
      let dataArr = Array.from(Object.values(data));
      for(let i=0; i< dataArr[0].length; i++){
        this.questions[i] = {qid: i , item: dataArr[0][i]};
      }
      this.startTest();
     }, (err) => console.log(err));    
  }

  startTest() {    
    this.practiceTestsService.correct = 0;
    this.practiceTestsService.incorrect=0;
    this.correct=0;
    this.incorrect=0;
    this.attemptedQuestions =[];
    this.qId =0;
   
    if (this.questions.length!==0) {         
      this.currentQuestion = this.questions[this.qId];     
      this.testStarted = this.questions.length!==0 ? true : false;     
      this.startTimer();       
      this.count++;          
    }
  }

  startTimer() {    
    if (this.seconds < 300 ) {
      this.practiceTestsService.timer =setInterval(() => {
        this.practiceTestsService.seconds++;
        this.seconds = this.practiceTestsService.seconds;
        this.timeElapsed =this.practiceTestsService.getTimeElapsed(this.seconds);
      }, 1000);    
    } else this.showResults(); 
  }

  clearTimer() {
    this.seconds = 0;
   clearInterval(this.practiceTestsService.timer);
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
        this.qId = this.qId+1;
        this.currentQuestion = this.questions[this.qId];
        /* while(this.attemptedQuestions.length >0 && this.attemptedQuestions.find(e => e.qId === this.currentQuestion.qId) ) {
          let rand = Math.random() * this.questions.length;
          console.log('rand: ', rand);
          this.qId = Math.floor(rand);
          console.log(this.qId);
          console.log(this.questions[this.qId]);  
          this.currentQuestion = this.questions[this.qId]; 
        } 
        console.log("attemptedQuestions, currentQuestion.qId: ", this.attemptedQuestions, this.currentQuestion.qId) ; */ 
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