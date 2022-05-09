import dotenv from 'dotenv';
dotenv.config();

import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const config = [
  {
    input: 'src/app.ts',
    output: {
      file: 'dist/app.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [typescript(), replace({
      'process.env.ROOM': JSON.stringify(process.env.ROOM),
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
      'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
    })]
  } 
];
export default config;
