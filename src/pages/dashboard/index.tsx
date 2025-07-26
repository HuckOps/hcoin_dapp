import { useEffect, useState } from 'react';
import MarqueeTicker from '../../components/MarqueeTicker';
import { useEthersProvider, useEthersSigner } from '@ant-design/web3-ethers';
import { useTranslation } from 'react-i18next';
import Welcome from './welcome';
import Coin from './coin';
import { Helmet } from 'umi';
// 将全局声明移动到文件最顶部
declare global {
  interface Window {
    WebSocket: typeof WebSocket;
  }
}

// 在coins常量定义之后
const coins = [
  'BTC-USDT',
  'ETH-USDT',
  'BNB-USDT',
  'SOL-USDT',
  'XRP-USDT',
  'ADA-USDT',
  'DOGE-USDT',
  'DOT-USDT',
  'LTC-USDT',
  'LINK-USDT',
];

export default function HomePage() {
  const provider = useEthersProvider(); // ethers provider
  const signer = useEthersSigner();

  const { t } = useTranslation('dashboard');

  const [coinsPrice, setCoinsPrice] = useState<Record<string, any>>({});

  useEffect(() => {
    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        if (data.arg?.instId && data.data?.[0]) {
          setCoinsPrice(prev => ({
            ...prev,
            [data.arg.instId]: {
              last: parseFloat(data.data[0].last),
              percent: Number(
                (((data.data[0].last - data.data[0].sodUtc0) / data.data[0].sodUtc0) * 100).toFixed(
                  2,
                ),
              ),
            },
          }));
        }
      } catch (error) {}
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: coins.map(coin => ({
            channel: 'tickers',
            instId: coin,
          })),
        }),
      );
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('Signer:', signer);
  }, [signer]);

  return (
    <div>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>
      <MarqueeTicker coins={coins} coinsPrice={coinsPrice} />
      <Welcome />
      <Coin coinsPrice={coinsPrice} />

      {/* <Transfers /> */}
    </div>
  );
}
