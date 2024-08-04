import { marked } from 'marked';
import { mangle } from '../src/index.js';

marked.use(mangle());

marked('email@example.com');
