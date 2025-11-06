import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CaseCard } from '../components/CaseCard';
import { CaseFilters } from '../components/CaseFilters';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface ScamCase {
  id: string;
  case_number: number;
  title: string;
  description: string;
  perpetrator_nick: string;
  damage_amount: number;
  currency: string;
  created_at: string;
  evidence_urls: string[];
}

export function HomePage() {
  const [cases, setCases] = useState<ScamCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [page, setPage] = useState(0);
  const { t } = useLanguage();
  const { user } = useAuth();

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    loadCases();
  }, [page]);

  const loadCases = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('scam_cases')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      if (searchTerm) {
        query = query.ilike('perpetrator_nick', `%${searchTerm}%`);
      }

      if (caseNumber) {
        const numericCase = parseInt(caseNumber.replace('#', ''));
        if (!isNaN(numericCase)) {
          query = query.eq('case_number', numericCase);
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      if (page === 0) {
        setCases(data || []);
      } else {
        setCases((prev) => [...prev, ...(data || [])]);
      }
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    setPage(0);
    loadCases();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCaseNumber('');
    setPage(0);
    loadCases();
  };

  const handleReaction = async (caseId: string, type: 'thumbs_up' | 'warning' | 'cross') => {
    if (!user) {
      alert('Please login to react');
      return;
    }

    try {
      const { error } = await supabase
        .from('reactions')
        .upsert({
          case_id: caseId,
          user_id: user.id,
          reaction_type: type,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Scam Reports</h1>

        <CaseFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          caseNumber={caseNumber}
          setCaseNumber={setCaseNumber}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {loading && page === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCA311]"></div>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t.cases.noResults}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseNumber={caseItem.case_number}
                  title={caseItem.title}
                  description={caseItem.description}
                  perpetratorNick={caseItem.perpetrator_nick}
                  damageAmount={caseItem.damage_amount}
                  currency={caseItem.currency}
                  createdAt={caseItem.created_at}
                  imageUrl={caseItem.evidence_urls?.[0]}
                  onReaction={(type) => handleReaction(caseItem.id, type)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setPage(page + 1)}
                className="bg-[#FCA311] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e89300] transition-colors"
              >
                {t.cases.loadMore}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
