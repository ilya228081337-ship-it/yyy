import { ThumbsUp, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CaseCardProps {
  caseNumber: number;
  title: string;
  description: string;
  perpetratorNick: string;
  damageAmount: number;
  currency: string;
  createdAt: string;
  imageUrl?: string;
  onReaction: (type: 'thumbs_up' | 'warning' | 'cross') => void;
}

export function CaseCard({
  caseNumber,
  title,
  description,
  perpetratorNick,
  damageAmount,
  currency,
  createdAt,
  imageUrl,
  onReaction,
}: CaseCardProps) {
  const { t } = useLanguage();

  const isNew = () => {
    const daysDiff = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff < 3;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[#FCA311] font-bold">#{caseNumber}</span>
            {isNew() && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {t.cases.new}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">Scammer:</span>
            <span className="ml-2 font-medium text-gray-800">{perpetratorNick}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">{t.cases.damage}:</span>
            <span className="ml-2 font-bold text-red-600">
              ${damageAmount.toLocaleString()} {currency}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => onReaction('thumbs_up')}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              title={t.reactions.thumbsUp}
            >
              <ThumbsUp size={18} />
            </button>
            <button
              onClick={() => onReaction('warning')}
              className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600 transition-colors"
              title={t.reactions.warning}
            >
              <AlertTriangle size={18} />
            </button>
            <button
              onClick={() => onReaction('cross')}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              title={t.reactions.cross}
            >
              <X size={18} />
            </button>
          </div>
          <a
            href={`/case/${caseNumber}`}
            className="text-[#FCA311] hover:text-[#e89300] font-medium text-sm"
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
}
