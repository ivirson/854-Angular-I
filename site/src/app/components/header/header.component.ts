import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  public value = '';

  constructor() { }

  ngOnInit() {
  }

  public onSearchSubmitted(): void {
    this.searchEmitter.emit(this.value);
  }

}
