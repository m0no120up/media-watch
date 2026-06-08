import { fetchMediaCounts } from '@/lib/rss';
import { MediaBarChartClient } from './MediaBarChartClient';

// Server Component: RSSを取得してClientに渡す
export async function MediaBarChart({ billName }: { billName: string }) {
  const data = await fetchMediaCounts(billName);
  return <MediaBarChartClient data={data} />;
}

// Suspense のフォールバック（読み込み中に表示するスケルトン）
export function MediaBarChartSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {['NHK', 'Google News'].map((name) => (
        <div key={name} className="rounded-lg border border-gray-200 p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{name}</span>
            <span className="h-4 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-3 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}
