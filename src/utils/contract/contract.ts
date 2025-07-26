import { ethers } from 'ethers';

// 匿名provider，仅提供合约查询等操作

const defaultProvider = process.env.SEPOLIA_RPC
  ? new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC)
  : ethers.getDefaultProvider();

const contractFunction = [
  'event Transfer(address from, address to, uint256 amount)',
  'function transfer(address to, uint256 amount)',
  'function totalSupply() external view returns (uint256)',
  'function claim() external',
];

const ReadonlyContractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS || '',
  contractFunction,
  defaultProvider,
);

const CONTRACT_ADDRESSES = {
  1: process.env.MAINNET_CONTRACT_ADDRESS || '',      // 以太坊主网
  5: process.env.GOERLI_CONTRACT_ADDRESS || '',       // Goerli测试网
  11155111: process.env.SEPOLIA_CONTRACT_ADDRESS || '', // Sepolia测试网
  // 可添加更多网络配置
};

export const getContractAddress = async (provider: ethers.JsonRpcProvider): Promise<string> => {
  console.log(process.env)
  try {
    const network = await provider.getNetwork();
    // @ts-ignore
    const address = CONTRACT_ADDRESSES[network.chainId] || process.env.CONTRACT_ADDRESS || '';

    // 新增：验证地址有效性
    if (!address) {
      console.error(`未配置网络 ${network.chainId} 的合约地址`);
      // 可选择返回默认地址或测试网地址作为备选
      return process.env.FALLBACK_CONTRACT_ADDRESS || '';
    }

    // 验证地址格式（非ENS名称）
    if (address.includes('.')) {
      throw new Error(`合约地址不能是ENS名称: ${address}`);
    }

    return address;
  } catch (error) {
    console.error('获取网络信息失败:', error);
    return process.env.CONTRACT_ADDRESS || '';
  }
};



// 工厂函数：接收 signer，返回可发送交易的合约实例
const ContractInstance = async (provider: ethers.JsonRpcProvider, signer: ethers.JsonRpcSigner) =>{
  if (!provider) {
    throw new Error('Provider is required');
  }
  if (!signer) {
    return new ethers.Contract(await getContractAddress(provider), contractFunction, provider);
  }
  console.log('signer', getContractAddress(signer.provider as ethers.JsonRpcProvider));
  return new ethers.Contract(await getContractAddress(signer.provider as ethers.JsonRpcProvider), contractFunction, signer);
}

export { ReadonlyContractInstance, ContractInstance };
