import { marked } from 'marked';
import { mangle } from '../src/index.js';

function LCG(seed = 1) {
  function rand() {
    seed = Math.imul(48271, seed) | 0 % 2147483647;
    return (seed & 2147483647) / 2147483648;
  }
  rand(); // burn first number
  return rand;
}

describe('mangle', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
    jest.spyOn(global.Math, 'random').mockImplementation(LCG());
  });

  test('leave regular link', () => {
    const markdown = `
[other link](https://example.com)
`;
    marked.use(mangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="https://example.com">other link</a></p>
"
`);
  });

  test('mangles email markdown link', () => {
    const markdown = `
[email@example.com](mailto:email@example.com)
`;
    marked.use(mangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;">&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;</a></p>
"
`);
  });

  test('mangles href leaves text', () => {
    const markdown = `
[**my** email](mailto:email@example.com)
`;
    marked.use(mangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;"><strong>my</strong> email</a></p>
"
`);
  });

  test('mangles autolink with brackets', () => {
    const markdown = `
<email@example.com>
`;
    marked.use(mangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;">&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;</a></p>
"
`);
  });

  test('mangles autolink', () => {
    const markdown = `
email@example.com
`;
    marked.use(mangle());
    expect(marked.parse(markdown)).toMatchInlineSnapshot(`
"<p><a href="mailto:&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;">&#101;&#x6d;&#x61;&#x69;&#108;&#x40;&#101;&#120;&#97;&#x6d;&#112;&#108;&#x65;&#46;&#x63;&#x6f;&#x6d;</a></p>
"
`);
  });
});
