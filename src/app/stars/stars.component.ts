import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

	@Input()
	private rating: number = 0;//为什么这里要赋值0
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  private stars: Array<boolean> = [];

  @Input()
  private readonly: boolean = true;


  constructor() { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.stars = [];
  	for (let i = 1; i <= 5; i++) {
  		this.stars.push(i > this.rating);
  	}
  }

  clickNewRating(num){
    if (!this.readonly) {
      this.rating = num + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
