import { defineConfig } from 'umi';
// 确保正确加载环境变量
import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // 明确指定.env文件路径

console.log(process.env);
export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/dashboard', component: 'dashboard' },
    { path: '/docs', component: 'docs' },
  ],

  npmClient: 'yarn',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  define: {
    'process.env': {
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
      SEPOLIA_RPC: process.env.SEPOLIA_RPC,
    },
  },
  extraBabelPresets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '80',
        },
        useBuiltIns: 'entry',
        corejs: {
          version: 3, // 修正为数字类型
          proposals: true,
        },
        modules: false,
        shippedProposals: true, // 添加提案语法支持
      },
    ],
  ],
  extraBabelPlugins: [
    '@babel/plugin-proposal-numeric-separator', // 添加数字分隔符支持
    '@babel/plugin-syntax-bigint',
  ],
  jsMinifierOptions: {
    target: ['chrome80', 'es2020'],
  },
  esbuildMinifyIIFE: true,
});
