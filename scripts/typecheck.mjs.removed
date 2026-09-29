import ts from 'typescript';
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

function list(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...list(p));
    else if (['.ts', '.tsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

const files = list('src');

const options = {
  noEmit: true,
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.ReactJSX,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  strict: true
};

const host = ts.createCompilerHost(options);
const program = ts.createProgram(files, options, host);
const diagnostics = ts.getPreEmitDiagnostics(program);

if (diagnostics.length) {
  const formatHost = {
    getCanonicalFileName: (f) => f,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => '\n',
  };
  const message = ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost);
  console.error(message);
  process.exit(1);
} else {
  console.log('Typecheck OK');
}
