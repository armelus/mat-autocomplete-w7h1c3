import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map, filter, tap } from 'rxjs/operators';

export class User {
  constructor(public name: string) {}
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css'],
})
export class AutocompleteDisplayExample {
  myControl = new FormControl();

  simpleOptions = ['One', 'Two', 'Three'];

  selectedOption: string;
  readonly userArray = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor'),
  ];
  private userOptions$: Observable<User[]> = Observable.from([this.userArray]);

  ngOnInit() {
    this.myControl.valueChanges.subscribe((value) => this.filterValue(value));
  }

  filterValue(name: string): void {
    this.userOptions$ = this.userOptions$.pipe(
      tap((input) => console.log('input: ', input)),
      map((users: User[]) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(name.trim().toLowerCase())
        )
      ),
      tap((result) => console.log('result: ', result))
    );
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }

  updateSelectedOption(event: any) {
    this.selectedOption = event.option.selected;
  }
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
