import { Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-[#14213D] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#FCA311] rounded-lg flex items-center justify-center font-bold text-xl">
                B
              </div>
              <span className="font-bold text-xl hidden sm:block">BUMAGA</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/submit" className="hover:text-[#FCA311] transition-colors">
              {t.header.submitScamList}
            </a>
            <a href="/arbitration" className="hover:text-[#FCA311] transition-colors">
              {t.header.arbitration}
            </a>
            <a href="/guarantor" className="hover:text-[#FCA311] transition-colors">
              {t.header.guarantor}
            </a>
            <a href="/resources" className="hover:text-[#FCA311] transition-colors">
              {t.header.resources}
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#1a2a4d] rounded-lg p-1">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded transition-colors ${
                  language === 'ru' ? 'bg-[#FCA311] text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                🇷🇺 RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded transition-colors ${
                  language === 'en' ? 'bg-[#FCA311] text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 hover:text-[#FCA311] transition-colors"
                >
                  <User size={24} />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800">
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {t.header.profile}
                    </a>
                    <button
                      onClick={signOut}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>{t.header.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-[#FCA311] px-4 py-2 rounded-lg font-medium hover:bg-[#e89300] transition-colors"
              >
                {t.header.login}
              </a>
            )}

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a
              href="/submit"
              className="block py-2 hover:text-[#FCA311] transition-colors"
            >
              {t.header.submitScamList}
            </a>
            <a
              href="/arbitration"
              className="block py-2 hover:text-[#FCA311] transition-colors"
            >
              {t.header.arbitration}
            </a>
            <a
              href="/guarantor"
              className="block py-2 hover:text-[#FCA311] transition-colors"
            >
              {t.header.guarantor}
            </a>
            <a
              href="/resources"
              className="block py-2 hover:text-[#FCA311] transition-colors"
            >
              {t.header.resources}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
