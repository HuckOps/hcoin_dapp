import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HomeHero() {
  const { t } = useTranslation('index');
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
              <button className="border px-8 py-2 rounded-full mx-4">{t('add_to_wallet')}</button>
              <button className="border px-8 py-2 rounded-full mx-4">{t('goto_github')}</button>
            </div>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
