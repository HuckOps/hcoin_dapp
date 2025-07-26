import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'lucide-react';
import { ConnectButton, Connector } from '@ant-design/web3';
import { EthersWeb3ConfigProvider, MetaMask, OkxWallet } from '@ant-design/web3-ethers';
import { Outlet } from 'umi';
import '../i18n';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';
import {
  Hardhat,
  Localhost,
  Mainnet,
  Polygon,
  Sepolia,
  WagmiWeb3ConfigProvider,
  WalletConnect,
  X1Testnet,
} from '@ant-design/web3-wagmi';
import { http } from 'wagmi';
import { history } from 'umi';
import Footer from './footer';
import { subscribe } from 'diagnostics_channel';
const Web3Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const particlesRef = useRef(null);
  const { t } = useTranslation('layout');

  const [connecting, setConnecting] = useState(false);

  // Add connection handler
  const handleConnect = async () => {
    if (connecting) return;

    try {
      setConnecting(true);
      // Wallet connection logic will be handled by the provider
    } finally {
      setConnecting(false);
    }
  };

  return (
    <WagmiWeb3ConfigProvider
      eip6963
      transports={{
        [Mainnet.id]: http(),
        [Sepolia.id]: http(),
      }}
      wallets={[MetaMask(), WalletConnect()]}
      chains={[Mainnet, Sepolia]}
      // 添加网络变更全局回调
      // @ts-ignore
      initialState={{
        status: 'disconnected',
        chainId: Mainnet.id,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 font-sans overflow-x-hidden">
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                HCoin
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('index')}
                className={` hover:text-purple-400 transition-colors`}
                onClickCapture={() => history.push('/')}
              >
                {t('index')}
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={` hover:text-purple-400 transition-colors`}
                onClickCapture={() => history.push('/dashboard')}
              >
                {t('dashboard')}
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`hover:text-purple-400 transition-colors`}
              >
                {t('nft_market')}
              </button>
              <button
                onClick={() => setActiveTab('staking')}
                className={` hover:text-purple-400 transition-colors`}
              >
                {t('evidence_storage')}
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={` hover:text-purple-400 transition-colors`}
              >
                {t('community')}
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={` hover:text-purple-400 transition-colors`}
              >
                {t('docs')}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      { key: 'zh-CN', label: '简体中文' },
                      { key: 'zh-TW', label: '繁體中文' },
                      { key: 'en', label: 'English' },
                      { key: 'ja', label: '日本語' },
                      { key: 'ko', label: '한국어' },
                      { key: 'fr', label: 'Français' },
                      { key: 'es', label: 'Español' },
                      { key: 'de', label: 'Deutsch' },
                      { key: 'ru', label: 'Русский' },
                    ]}
                    onClick={({ key }) => i18n.changeLanguage(key)}
                  />
                }
                trigger={['click']}
              >
                <button className="text-gray-600 hover:text-blue-400 transition-colors">
                  {t('language')}
                </button>
              </Dropdown>

              <div className="relative">
                <Connector>
                  <ConnectButton loading={connecting} onClick={handleConnect} />
                </Connector>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-16">
          {/* 适配导航栏高度 */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </WagmiWeb3ConfigProvider>
  );
};

export default Web3Dashboard;
