import { Effect } from 'umi';

export interface MarketModelState {
  coinsPrice: Record<string, { price: number; percent: number }>;
}

interface MarketModelType {
  namespace: 'market';
  state: MarketModelState;
  effects: {
    initWebSocket: Effect;
  };
  reducers: {
    updatePrice: any;
  };
}

const MarketModel: MarketModelType = {
  namespace: 'market',
  state: {
    coinsPrice: {},
  },
  effects: {
    *initWebSocket(_, { call, put }) {
      const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.arg?.instId && data.data?.[0]) {
            put({
              type: 'updatePrice',
              payload: {
                [data.arg.instId]: {
                  price: parseFloat(data.data[0].last),
                  percent: Number(
                    (((data.data[0].last - data.data[0].sodUtc0) / data.data[0].sodUtc0) * 100).toFixed(2)
                  )
                }
              }
            });
          }
        } catch (error) {
          console.error('WebSocket解析错误:', error);
        }
      };
    }
  },
  reducers: {
    updatePrice(state, { payload }) {
      return {
        ...state,
        coinsPrice: {
          ...state.coinsPrice,
          ...payload
        }
      };
    },
  }
};

export default MarketModel;