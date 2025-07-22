import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HomeHero from './HomeHero';
import Features from './Features';
import { Helmet } from 'umi';

export default function () {
  const { t } = useTranslation('index');
  return (
    <div>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <HomeHero />
      <Features />
    </div>
  );
}
