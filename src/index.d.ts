import type { marked } from 'marked';
import type { MarkedExtension } from 'marked';

/**
 * Mangle email address
 *
 * @returns A {@link MarkedExtension | MarkedExtension} to be passed to {@link marked.use | `marked.use()`}
 */
export function mangle(): MarkedExtension;
