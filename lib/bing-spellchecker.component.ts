import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BingSpellcheckerService, SpellcheckToken } from './bing-spellchecker.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'bing-spellchecker',
  templateUrl: './bing-spellchecker.component.html'
})
export class BingSpellcheckerComponent implements OnInit {
  @Input() inputText: string;
  @Input() placeholder: string;
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
