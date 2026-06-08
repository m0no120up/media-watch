'use client'

import { useState } from 'react';
import type { MediaResult } from '@/lib/rss';

function formatDate(pubDate: string): string {
  if (!pubDate) return '';
  try {
    const d = new Date(pubDate);
    if (isNaN(d.getTime())) return pubDate;
    return d.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return pubDate;
  }
}

export function MediaBarChartClient({ data }: { data: MediaResult[] }) {
  // どのメディアが開いているか（null = すべて閉じている）
  const [openMedia, setOpenMedia] = useState<string | null>(null);

  const counts = data.map((d) => d.articles.length);
  const max = Math.max(...counts, 1);
  const total = counts.reduce((sum, c) => sum + c, 0);

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const count = item.articles.length;
        const isOpen = openMedia === item.name;

        return (
          <div key={item.name} className="rounded-lg border border-gray-200 overflow-hidden">
            {/* クリック可能なバー行 */}
            <button
              className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenMedia(isOpen ? null : item.name)}
              aria-expanded={isOpen}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {item.error ? (
                      <span className="text-red-400">取得失敗</span>
                    ) : (
                      `${count} 件`
                    )}
                  </span>
                  {/* ▼ が回転して ▲ になる */}
                  <span
                    className={`inline-block text-gray-400 text-xs transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                {!item.error && count > 0 && (
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                )}
              </div>
            </button>

            {/* アコーディオン：記事一覧 */}
            {isOpen && (
              <div className="border-t border-gray-100 max-h-80 overflow-y-auto divide-y divide-gray-50">
                {item.articles.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-400">記事が見つかりません</p>
                ) : (
                  item.articles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-0.5 px-4 py-3 hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-sm text-gray-800 group-hover:text-blue-700 leading-snug">
                        {article.title || '（タイトルなし）'}
                      </span>
                      {article.pubDate && (
                        <span className="text-xs text-gray-400">
                          {formatDate(article.pubDate)}
                        </span>
                      )}
                    </a>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}

      {total > 0 && (
        <p className="text-xs text-gray-400 text-right pt-1">
          合計 {total} 件（RSS より自動取得・1時間キャッシュ）
        </p>
      )}
    </div>
  );
}
