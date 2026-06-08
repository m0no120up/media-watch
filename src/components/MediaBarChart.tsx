import { fetchMediaCounts } from "@/lib/rss";

export async function MediaBarChart({ billName }: { billName: string }) {
  const data = await fetchMediaCounts(billName);
  const max = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
            <span className="text-sm text-gray-500">
              {item.error ? (
                <span className="text-red-400">取得失敗</span>
              ) : (
                `${item.count} 件`
              )}
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            {!item.error && item.count > 0 && (
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            )}
          </div>
        </div>
      ))}
      {total > 0 && (
        <p className="text-xs text-gray-400 text-right pt-1">
          合計 {total} 件（RSS より自動取得）
        </p>
      )}
    </div>
  );
}

// Suspense のフォールバックとして使うスケルトン
export function MediaBarChartSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {["NHK", "Google News"].map((name) => (
        <div key={name}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700">{name}</span>
            <span className="h-4 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-4 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}
