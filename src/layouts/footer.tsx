import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="bg-slate-700 border-t border-slate-800 pt-16 pb-8 mt-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Hcoin(HCN)
            </div>
            <p className="text-slate-400 mb-6 max-w-md">{t('description')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-400">
              {t('platform')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('token')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('nft')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('evidence_storage')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-400">
              {t('resources')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('docs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('api_docs')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-400">
              {t('community')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('community')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-500 text-sm mb-4 md:mb-0">
            © 2025 Hcoin Platform. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
