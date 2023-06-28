import type { marked } from "marked"

/**
 * Mangle email address
 *
 * @returns A {@link marked.MarkedExtension | MarkedExtension} to be passed to {@link marked.use | `marked.use()`}
 */
export function mangle(): marked.MarkedExtension;
