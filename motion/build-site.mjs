import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
await build({absWorkingDir:fileURLToPath(new URL('.', import.meta.url)),entryPoints:['src/Website.tsx'],bundle:true,minify:true,format:'esm',target:['es2020'],outfile:'../assets/motion-player.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
