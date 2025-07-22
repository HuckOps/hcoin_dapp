import { ReadonlyContractInstance } from '@/utils/contract/contract';
import { EventLog, Log } from 'ethers';
import { useEffect, useState } from 'react';
import CopyOutlined from '@ant-design/icons/lib/icons/CopyOutlined';
import { useTranslation } from 'react-i18next';

export default function Transfers() {
  const { t } = useTranslation('dashboard');
  const [transfers, setTransfers] = useState<
    {
      from?: string;
      to?: string;
      amount?: string;
      blockNumber: number;
      transactionHash: string;
    }[]
  >([]);
  useEffect(() => {
    ReadonlyContractInstance.queryFilter(ReadonlyContractInstance.filters.Transfer()).then(
      transfers => {
        setTransfers(
          // 由于类型不兼容问题，将参数类型修改为 Log | EventLog
          transfers.map((transfer: Log | EventLog) => {
            return {
              from: 'args' in transfer ? transfer.args?.[0] : undefined,
              to: 'args' in transfer ? transfer.args?.[1] : undefined,
              amount:
                'args' in transfer && transfer.args ? transfer.args[2]?.toString() : undefined,
              blockNumber: transfer.blockNumber,
              transactionHash: transfer.transactionHash,
            };
          }),
        );
      },
    );
  }, []);
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t('transaction_hash')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('block')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('from')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('to')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('amount')}
              </th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 w-48 max-w-[12rem] truncate"
                  title={transfer.transactionHash}
                >
                  <CopyOutlined
                    onClick={() => {
                      navigator.clipboard.writeText(transfer.transactionHash);
                    }}
                  />{' '}
                  {transfer.transactionHash}
                </th>
                <th scope="row" className="px-6 py-4 w-48 max-w-[12rem] truncate">
                  {transfer.blockNumber}
                </th>
                <th scope="row" className="px-6 py-4 w-48 max-w-[12rem] truncate">
                  <CopyOutlined
                    onClick={() => {
                      if (transfer.from) {
                        navigator.clipboard.writeText(transfer.from);
                      }
                    }}
                  />{' '}
                  {transfer?.from}
                </th>
                <th scope="row" className="px-6 py-4 w-48 max-w-[12rem] truncate">
                  <CopyOutlined
                    onClick={() => {
                      if (transfer.to) {
                        navigator.clipboard.writeText(transfer.to);
                      }
                    }}
                  />{' '}
                  {transfer?.to}
                </th>
                <th scope="row" className="px-6 py-4 w-48 max-w-[12rem] truncate">
                  {transfer?.amount}
                </th>
              </tr>
            ))}
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
