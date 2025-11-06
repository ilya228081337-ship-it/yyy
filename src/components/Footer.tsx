export function Footer() {
  return (
    <footer className="bg-[#14213D] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#FCA311] rounded-lg flex items-center justify-center font-bold text-xl">
                B
              </div>
              <span className="font-bold text-xl">BUMAGA</span>
            </div>
            <p className="text-gray-300 text-sm">
              Platform for publishing scam reports and protecting the community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="/arbitration" className="hover:text-[#FCA311] transition-colors">
                  Arbitration
                </a>
              </li>
              <li>
                <a href="/guarantor" className="hover:text-[#FCA311] transition-colors">
                  Guarantor Service
                </a>
              </li>
              <li>
                <a href="/rules" className="hover:text-[#FCA311] transition-colors">
                  Rules
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="/contact" className="hover:text-[#FCA311] transition-colors">
                  Contact Administration
                </a>
              </li>
              <li>
                <a href="https://t.me/bumaga" className="hover:text-[#FCA311] transition-colors">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 BUMAGA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
