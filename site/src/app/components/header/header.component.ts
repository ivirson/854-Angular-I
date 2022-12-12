import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profiles } from 'src/app/constants/profiles.enum';
import { HeaderSectionData } from 'src/app/models/header-section-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() public headerData!: HeaderSectionData;
  @Output() public searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  public value = '';
  public userIsAuthenticated = false;
  public profilesEnum = Profiles;

  constructor() { }

  ngOnInit() {
  }

  public onSearchSubmitted(): void {
    this.searchEmitter.emit(this.value);
  }

  public loginLogout(): void {
    this.userIsAuthenticated = !this.userIsAuthenticated;
  }

}
