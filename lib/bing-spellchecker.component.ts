import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BingSpellcheckerService, SpellcheckToken } from './bing-spellchecker.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'bing-spellchecker',
  // templateUrl: './bing-spellchecker.component.html',
  template: `
    <textarea
      class="form-control"
      [placeholder]="placeholder"
      (ngModelChange)="update($event)"
      [ngModel]="inputText"
      [rows]="rows"
    ></textarea>
    <div *ngIf="status==='checking' && inputText" class="alert alert-info">
      Typing...
    </div>
    <div *ngIf="status==='failed' && inputText" class="alert alert-danger">
      Looks like you may have a spelling or grammar error:
      <ul>
        <li *ngFor="let error of errors">
          "{{ error.token }}"
          <span *ngIf="error.suggestions[0]">should be "{{ error.suggestions[0].suggestion }}"</span>
          <span *ngIf="error.suggestions[1]">or "{{ error.suggestions[1].suggestion }}"</span>
        </li>
      </ul>
    </div>
    <div *ngIf="status==='passed' && inputText" class="alert alert-success">
      ✓ Spelling and grammar check passed. Carry on!
    </div>
  `,
})
export class BingSpellcheckerComponent implements OnInit {
  @Input() inputText = '';
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() spellcheckUrl = '/';
  @Output() updated: EventEmitter<string> = new EventEmitter();
  public errors: Array<SpellcheckToken>;
  public status: string;
  private inputTextChanged: Subject<string> = new Subject();

  constructor(
    private spellchecker: BingSpellcheckerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inputTextChanged
      .debounceTime(750)
      .distinctUntilChanged()
      .subscribe(model => {
        this.inputText = model;
        this.checkSpelling(this.inputText);
      });

    // Resets the status when the route changes
    this.activatedRoute.url.subscribe(() => this.status = null);
  }

  public update(sentence: string) {
    this.status = 'checking';
    this.updated.emit(sentence);
    this.inputTextChanged.next(sentence);
  }

  private checkSpelling(sentence: string) {
    if (sentence && sentence.length > 5) {
      this.spellchecker.check(sentence, this.spellcheckUrl).subscribe(result => {
        if (result.flaggedTokens && result.flaggedTokens.length) {
          this.errors = result.flaggedTokens;
          this.status = 'failed';
        } else {
          this.status = 'passed';
        }
      });
    }
  }

}
