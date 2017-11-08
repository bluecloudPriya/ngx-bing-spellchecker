import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BingSpellcheckerService } from "../lib/bing-spellchecker.service";
import { BingSpellcheckerComponent } from "../lib/bing-spellchecker.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import 'rxjs/add/operator/first';

class MockBingSpellcheckerService {
}

xdescribe('BingSpellcheckerComponent', () => {
  let component: BingSpellcheckerComponent;
  let fixture: ComponentFixture<BingSpellcheckerComponent>;
  let mockBingSpellcheckerService;

  beforeEach(async(() => {
    mockBingSpellcheckerService = new MockBingSpellcheckerService();

    TestBed.configureTestingModule({
      declarations: [ BingSpellcheckerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: BingSpellcheckerService,
          useValue: mockBingSpellcheckerService,
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingSpellcheckerComponent);
    component = fixture.componentInstance;
  });

  it('should update inputTextChanged subject', () => {
    //
  });

  it('should check spelling via service', () => {
    //
  });

  it('should render component when inputs provided', () => {
    //
  });
});
