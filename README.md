# marked-mangle

Mangle mailto links with HTML character references.

# Usage

```js
import { marked } from "marked";
import { mangle } from "marked-mangle";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-mangle/lib/index.umd.js"></script>

marked.use(mangle());

marked.parse("email@example.com");
// <p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;">&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;</a></p>
```
