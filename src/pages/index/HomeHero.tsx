import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GithubOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useEthersProvider, useEthersSigner } from '@ant-design/web3-ethers';
import { message, Tooltip } from 'antd';
import { getContractAddress } from '@/utils/contract/contract';
import { ethers } from 'ethers';

export default function HomeHero() {
  const { t } = useTranslation('index');
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const addToWallet = async () => {
    if (!window.ethereum) {
      message.error('未检测到支持的 Web3 钱包');
      return;
    }

    const tokenAddress = await getContractAddress(provider as ethers.JsonRpcProvider); // ✅ 你的代币地址
    const tokenSymbol = 'HCN'; // ✅ 代币符号
    const tokenDecimals = 0; // ✅ 代币小数位数
    const tokenImage = 'https://www.huckops.xyz/img/favicon.png'; // ✅ 可选图标 URL
    console.log('tasdarwq');
    try {
      console.log(tokenAddress);
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        message.success(`已成功导入 ${tokenSymbol} 到钱包`);
      } else {
        message.info('用户取消了导入操作');
      }
    } catch (error) {
      console.error(error);
      message.error('导入代币失败');
    }
  };

  return (
    <section className="relative py-48 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </span>
            <br />
            <div className="text-3xl md:text-4xl font-light text-gray-600 mt-4">
              {t('sub_title')}
            </div>
            <div className="text-ml md:text-xl font-light text-gray-600 mt-4">
              {t('description')}
            </div>
            <div className="text-base py-8">
              {!signer ? (
                <Tooltip title={t('add_to_wallet_tooltip')}>
                  <button
                    className="border px-8 py-2 rounded-full mx-4"
                    disabled={!signer}
                    onClick={addToWallet}
                  >
                    {t('add_to_wallet')}
                  </button>
                </Tooltip>
              ) : (
                <button
                  className="border px-8 py-2 rounded-full mx-4"
                  disabled={!signer}
                  onClick={addToWallet}
                >
                  {t('add_to_wallet')}
                </button>
              )}
              <button
                className="border px-8 py-2 rounded-full mx-4"
                onClick={() => {
                  // 外部链接必须使用 window.open
                  window.open('https://github.com/HuckOps', '_blank');
                }}
              >
                <GithubOutlined />
                {t('goto_github')}
              </button>
            </div>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
