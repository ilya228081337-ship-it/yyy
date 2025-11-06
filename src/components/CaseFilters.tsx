import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CaseFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  caseNumber: string;
  setCaseNumber: (num: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export function CaseFilters({
  searchTerm,
  setSearchTerm,
  caseNumber,
  setCaseNumber,
  onApply,
  onReset,
}: CaseFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={20} className="text-[#FCA311]" />
        <h2 className="text-xl font-semibold text-gray-800">{t.filters.search}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.filters.search}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.filters.search}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCA311] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.filters.caseNumber}
          </label>
          <input
            type="text"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="#256"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCA311] focus:border-transparent font-mono"
          />
        </div>

        <div className="flex items-end space-x-2">
          <button
            onClick={onApply}
            className="flex-1 bg-[#FCA311] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e89300] transition-colors"
          >
            {t.filters.apply}
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            {t.filters.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
