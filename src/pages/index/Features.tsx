import { useTranslation } from 'react-i18next';
//@ts-ignore
import walletWallet from '../../assets/wallet.png';
export default function () {
  const { t } = useTranslation('index');
  return (
    <section className="relative py-6 overflow-hidden bg-[#F7F8FA] rounded-32">
      <div className="container mx-auto px-3 md:px-6 relative z-10">
        <div className="max-w-4xl px-6 pt-16 pb-8">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            {t('features_intro1')}
          </p>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-8 leading-relaxed">
            {t('features_intro2')}
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* 卡片 1 */}
          <div className="bg-[#E9F1FF] rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
            <img src={walletWallet} alt="wallet" className="w-[180px] h-auto mb-4 rounded-2xl" />
            <h3 className="text-gray-900 text-lg font-bold mb-2">{t('features_card1_title')}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{t('features_card1_desc')}</p>
          </div>

          {/* 卡片 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
            <img
              src="/images/feature-transfer.png"
              alt="transfer"
              className="w-[180px] h-auto mb-4"
            />
          </div>

          {/* 卡片 3 */}
          <div className="bg-[#F1F1F1] rounded-3xl p-6 shadow-md flex flex-col items-center text-center">
            <img
              src="/images/feature-privacy.png"
              alt="privacy"
              className="w-[180px] h-auto mb-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
