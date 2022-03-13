import { Component, OnInit } from '@angular/core';
import { PracticeTestsService } from '../shared/services/practice-tests.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  score= 0;
  correct= 0;
  incorrect= 0;

  constructor(private practiceTestsService: PracticeTestsService) { }

  ngOnInit(): void {
    this.score = this.practiceTestsService.score;
    this.correct = this.practiceTestsService.correct;
    this.incorrect = this.practiceTestsService.incorrect;
  }



}
