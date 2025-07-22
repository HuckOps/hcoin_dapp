import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CoinPrice {
  last?: number;
  percent?: number;
}

const MarqueeTicker = ({ 
  coins,
  coinsPrice 
}: { 
  coins: string[]; 
  coinsPrice: Record<string, CoinPrice>;
}) => {
  return (
    <div className="relative overflow-hidden bg-white py-4 border-b border-gray-200">
      <div className="flex animate-marquee space-x-8 whitespace-nowrap">
        {[...coins, ...coins].map((coin, index) => {
          const priceData = coinsPrice[coin] || {};
          return (
            <div key={`${coin}-${index}`} className="flex items-center space-x-2">
              <div className="flex flex-col text-xs">
                <span className="font-medium text-gray-800">
                  {coin} <span className="inline-block w-12">${priceData.last?.toFixed(2)}</span>
                  <span className="inline-block w-20">
                    {priceData.percent && (priceData.percent > 0 ? (
                      <span className="ml-1 inline-flex items-center text-green-600 bg-green-100/30 px-2 rounded-full">
                        <ArrowUp className="h-3 w-3" /> {priceData.percent}%
                      </span>
                    ) : (
                      <span className="ml-1 inline-flex items-center text-red-600 bg-red-100/30 px-2 rounded-full">
                        <ArrowDown className="h-3 w-3" /> {Math.abs(priceData.percent || 0)}%
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarqueeTicker;
