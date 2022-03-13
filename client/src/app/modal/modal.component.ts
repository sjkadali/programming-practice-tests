import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modal_title: string ='';
  @Input() modal_content = {
    correct : 0,
    incorrect : 0,
    unanswered: 0,
    totalScore: 0
  } ;
  message =''
  hidden = true;
  constructor(public activeModal: NgbActiveModal) {   
   }

  ngOnInit(): void {
    console.log(this.modal_title);
    this.message= this.modal_content.correct === 10 ? "Awesome!!" :this. modal_content.correct >= 8 ?  
      "Great! Keep up the good work!" : "Continue practicing ...";
    this.hidden = this.modal_content.correct >=8 ? false : true;
    }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
