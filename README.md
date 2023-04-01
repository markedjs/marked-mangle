<!-- The character `|` around a string denotes a place in this markdown file that needs to be changed for each extension. -->
<!-- You may also delete any comments you don't need anymore. -->

# TODO:

- [ ] Replace information in `/README.md`
- [ ] Write extension in `/src/index.js`
- [ ] Write tests in `/spec/index.test.js`
- [ ] Uncomment release in `/.github/workflows/main.yml`

<!-- Delete this line and above -->

# marked-mangle

Autolinked email address is escaped with HTML character references.

# Usage

```js
import {marked} from "marked";
import {markedMangle} from "marked-mangle";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-mangle/lib/index.umd.js"></script>

marked.use(markedMangle());

marked.parse("email@example.com");
// <p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;">&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;</a></p>
```
