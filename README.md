# Angular 5 Bing Spellchecker

[ ![Codeship Status for thegraidenetwork/ngx-bing-spellchecker](https://app.codeship.com/projects/8c3e2310-a6c5-0135-9962-3a5d1d8055ee/status?branch=master)](https://app.codeship.com/projects/255625)

This library allows your Angular 5+ app to create textarea fields that use [Bing's Spellcheck API](https://azure.microsoft.com/en-us/services/cognitive-services/spell-check/) to verify spelling and grammar correctness. It is used by The Graide Network in their frontend Angular application.

-- ANIMATION COMING SOON --

## Prerequisites

In order to use this package you must sign up for an API key with [Microsoft's Bing Spellcheck API](https://azure.microsoft.com/en-us/services/cognitive-services/spell-check/). This package does not attach your API key to the request (that would be insecure), so you'll also have to set up a proxy endpoint for your application. This proxy endpoint should pass the request through with the API key appended as [outlined in the Bing Spellcheck API Documentation](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-spell-check-api-v7-reference).

## Installation

Install the package with NPM:

```bash
npm install ngx-bing-spellchecker
```

Then import the module anywhere you plan to use the spellchecker:

```typescript
import { NgModule } from '@angular/core';
import { BingSpellcheckerModule } from 'ngx-bing-spellchecker';

@NgModule({
  imports: [
    BingSpellcheckerModule,
  ]
})
export class AppModule { }
```

## Use

Include the component anywhere in your application where you would normally use a `<textarea>`. The following parameters may be set on the component:

- `inputText` - The initial value in the textarea.
- `spellcheckUrl` - The proxy endpoint's url.
- `placeholder` - Placeholder in the textarea (optional).
- `rows` - Number of rows, defaults to 4.

Your parent component can also subscribe to the `updated` emitter to get the new value of the text.

### Example

This example sets a placeholder message, an initial value equal to the component's `textValue` variable, 3 rows, and a proxy endpoint at `/proxy/endpoint`. It also listens for emitted changes and sets the `textValue` variable equal to the updated string. This accomplishes two-way data binding on the component.

```html
<bing-spellchecker
  [placeholder]="'A placeholder message'"
  [inputText]="textValue"
  [rows]="3"
  [spellcheckUrl]="'/proxy/endpoint'"
  (updated)="textValue = $event"
></bing-spellchecker>
```

## Contributing

Contributions are welcome, although breaking changes will be relegated to future versions. Follow the steps below for local development and testing before you propose any changes.

### Local Development

- Clone this repository locally.
- Include the local version of this library form your main application: `"ngx-bing-spellchecker": "file:../bing-spellchecker/dist"`
- Make any updates and then build: `npm run -s build`.
- Update in the application: `npm update`.
- Serve your application. Be sure to use the `--preserve-symlinks` option while locally developing.

### Testing

Tests are stored in the `/tests` directory and can be run using Karma (`karma start`) or NPM: `npm test`.

*Note: Tests currently only cover the bing-spellchecker service, and tests are still needed for the component.*

### Releases

Currently done manually with this command:

```bash
npm version <X.Y.Z> && npm publish dist/
git push --tags
```

## License

Copyright 2017, [The Graide Network](https://www.thegraidenetwork.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
