// Angular core modules
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BingSpellcheckerComponent } from "./bing-spellchecker.component";
import { HttpClientModule } from "@angular/common/http";
import { BingSpellcheckerService } from "./bing-spellchecker.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    BingSpellcheckerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    BingSpellcheckerComponent,
  ],
  providers: [
    BingSpellcheckerService,
  ]
})
export class BingSpellcheckerModule {}
