import { marked } from 'marked';
import { markedMangle } from '../src/index.js';

function mockRandom() {
  let rand = 0;
  jest.spyOn(global.Math, 'random').mockImplementation(() => {
    rand = ((rand + 1.5719987646819482) ** 2) % 1;
    return rand;
  });
}

describe('markedMangle', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
    mockRandom();
  });

  test('leave regular link', () => {
    const markdown = `
[other link](https://example.com)
`;
    marked.use(markedMangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="https://example.com">other link</a></p>
"
`);
  });

  test('mangles email markdown link', () => {
    const markdown = `
[email@example.com](mailto:email@example.com)
`;
    marked.use(markedMangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;">&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;</a></p>
"
`);
  });

  test('mangles href leaves text', () => {
    const markdown = `
[**my** email](mailto:email@example.com)
`;
    marked.use(markedMangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;"><strong>my</strong> email</a></p>
"
`);
  });

  test('mangles autolink with brackets', () => {
    const markdown = `
<email@example.com>
`;
    marked.use(markedMangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;">&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;</a></p>
"
`);
  });

  test('mangles autolink', () => {
    const markdown = `
email@example.com
`;
    marked.use(markedMangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;">&#101;&#109;&#97;&#x69;&#x6c;&#x40;&#101;&#120;&#x61;&#x6d;&#x70;&#x6c;&#x65;&#46;&#x63;&#x6f;&#109;</a></p>
"
`);
  });
});
