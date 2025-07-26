import { ContractInstance, getContractAddress } from '@/utils/contract/contract';
import { useEthersProvider, useEthersSigner } from '@ant-design/web3-ethers';
import { Button, Form, Input, message, Popover } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';
import { ethers, JsonRpcProvider } from 'ethers';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useBlockNumber } from 'wagmi';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
type Props = {
  coinsPrice: Record<string, any>;
};

export default function Coin(props: Props) {
  const { t } = useTranslation('dashboard');
  const [totalMinted, setTotalMinted] = useState<number>(0);

  const provider = useEthersProvider(); // ethers provider
  const signer = useEthersSigner();
  const blockNumber = useBlockNumber();

  // const transferRef = useRef<FormInstance>(null);
  const [transferForm] = useForm();

  const claimAddressRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log('blockNumber', blockNumber);
    console.log(provider, signer);

    if (provider) {
      // 监听网络变更事件
      const handleNetworkChange = (newNetwork: JsonRpcProvider) => {
        UpdateTotalMinted();
        console.log('网络已切换:', newNetwork);
        // 这里添加网络切换后的处理逻辑
      };

      provider.on('network', handleNetworkChange);

      // 组件卸载时移除监听器
      return () => {
        provider.off('network', handleNetworkChange);
      };
    }
  }, [provider, signer]);

  useEffect(() => {
    UpdateTotalMinted();
  }, []);

  const UpdateTotalMinted = async () => {
    ContractInstance(provider as ethers.JsonRpcProvider, signer as ethers.JsonRpcSigner)
      .then(instance => instance.totalSupply())
      .then(totalSupply => {
        console.log('Total Supply:', totalSupply.toString());
        setTotalMinted(Number(totalSupply.toString()));
      })
      .catch(err => {
        message.error(err.message);
        setTotalMinted(0);
      });
  };

  const claim = async () => {
    const claimAddress = claimAddressRef.current?.value;
    // if (!claimAddress) {
    //   message.error(t('alert_input_error'));
    //   return;
    // }
    if (!signer) {
      message.error(t('alert_connect_wallet'));
      return;
    }
    (await ContractInstance(provider as ethers.JsonRpcProvider, signer as ethers.JsonRpcSigner))
      .claim()
      .then(tx => {
        message.success(t('alert_claim_success'));
        console.log(tx);
      })
      .catch(err => {
        console.log(typeof err);
        message.error(err.message);
      });
  };
  const transfer = async () => {
    const from = signer?.address;
    console.log(signer);
    if (!from) {
      message.error(t('alert_connect_wallet'));
      return;
    }

    // console.log(signer);
    const result = await transferForm.validateFields();
    (await ContractInstance(provider as ethers.JsonRpcProvider, signer as ethers.JsonRpcSigner))
      .transfer(result.to, result.amount)
      .then(tx => {
        console.log('tx', tx);
        console.log(tx);
      })
      .then(() => {
        message.success(t('alert_transfer_success'));
        transferForm.resetFields();
      })
      .catch(err => {
        message.error(err.message);
      });
  };

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
    <>
      <section className="mb-8 pt-4 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <motion.div
            className="bg-white/50 backdrop-blur-md rounded-xl border border-gray-200 p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">ETH-USDT {t('spot')}</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-2xl font-bold">${props.coinsPrice?.['ETH-USDT']?.last}</p>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${props.coinsPrice?.['ETH-USDT']?.percent >= 0 ? 'bg-green-600 text-green-100/30' : 'text-red-600 bg-red-100/30'}`}
                  >
                    {props.coinsPrice?.['ETH-USDT']?.percent >= 0 ? '+' : ''}
                    {props.coinsPrice?.['ETH-USDT']?.percent}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/50 backdrop-blur-md rounded-xl border border-gray-200 p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">ETH {t('block_height')}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {blockNumber.data
                      ? new Intl.NumberFormat('en-US').format(blockNumber.data)
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/50 backdrop-blur-md rounded-xl border border-gray-200 p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  {t('total_minted')}
                  <Popover content={t('total_minted_description')}>
                    <InfoCircleOutlined className="ml-1 text-gray-500 h-3 w-3" />
                  </Popover>
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat('en-US').format(totalMinted)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="mb-8 pt-4 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
          <motion.div
            className="bg-white/50 backdrop-blur-md rounded-xl border border-gray-200 p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t('faucet')}</h3>
              <div className="text-sm text-gray-600 max-w-2xl">{t('faucet_description')}</div>
              <div>
                <Tooltip title={t('claim_address_description')}>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0x..."
                    ref={claimAddressRef}
                    disabled={true}
                  />
                </Tooltip>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-md mt-2 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-500 disabled:hover:from-gray-400"
                  disabled={!signer}
                  onClick={claim}
                >
                  {t('claim')}
                </button>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-md mt-2 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-500 disabled:hover:from-gray-400"
                  onClick={addToWallet}
                  disabled={!signer}
                >
                  {t('add_to_wallet')}
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/50 backdrop-blur-md rounded-xl border border-gray-200 p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t('transfer')}</h3>
              <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} form={transferForm}>
                <Form.Item label="To:" name={'to'}>
                  <Input placeholder="0x..." />
                </Form.Item>
                <Form.Item
                  name={'amount'}
                  label="Amount:"
                  rules={[
                    { required: true, message: t('alert_transfer_amount_required') },
                    { min: 0, message: t('alter_transfer_amount_min') },
                  ]}
                >
                  <Input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </Form.Item>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-md mt-2 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-500 disabled:hover:from-gray-400"
                  onClick={transfer}
                  htmlType="submit"
                >
                  {t('transfer')}
                </Button>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
