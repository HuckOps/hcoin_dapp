import { ethers } from 'ethers';

// 匿名provider，仅提供合约查询等操作

const defaultProvider = process.env.SEPOLIA_RPC
  ? new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC)
  : ethers.getDefaultProvider();

const contractFunction = [
  'event Transfer(address from, address to, uint256 amount)',
  'function transfer(address to, uint256 amount)',
  'function totalSupply() external view returns (uint256)',
  'function faucet() external returns (bool)',
];

const ReadonlyContractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS || '',
  contractFunction,
  defaultProvider,
);

// 工厂函数：接收 signer，返回可发送交易的合约实例
const SignerContractInstance = (signer: ethers.Signer) =>
  new ethers.Contract(process.env.CONTRACT_ADDRESS || '', contractFunction, signer);

export { ReadonlyContractInstance, SignerContractInstance };
