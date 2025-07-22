import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, Share2 } from 'lucide-react';

export default function Welcome() {
  const { t } = useTranslation('dashboard');
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 py-4">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-md rounded-2xl border border-gray-200 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('welcome')}</h1>
              <p className="text-gray-600 max-w-2xl">{t('description')}</p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 px-6 py-3 rounded-lg transition-all">
                <Share2 className="w-5 h-5 text-white" />
                <span className="text-white">{t('share')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
