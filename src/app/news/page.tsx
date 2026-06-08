import Link from 'next/link'
import Header from '@/components/Header'
import { bills } from '@/lib/bills'
import { fetchGoogleNewsCount } from '@/lib/rss'

function ImportanceBadge({ value }: { value: number }) {
  const color =
    value >= 8 ? 'bg-red-100 text-red-700' :
    value >= 6 ? 'bg-orange-100 text-orange-700' :
    'bg-gray-100 text-gray-600'
  const label = value >= 8 ? '高' : value >= 6 ? '中' : '低'
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${color}`}>
      重要度 {value}（{label}）
    </span>
  )
}

export default async function NewsPage() {
  // 全法案の Google News 件数を並列取得（Promise.allSettled で片方失敗しても続行）
  const results = await Promise.allSettled(
    bills.map((bill) => fetchGoogleNewsCount(bill.name))
  )

  // 法案データと件数を結合
  const items = bills.map((bill, i) => ({
    bill,
    count: results[i].status === 'fulfilled' ? results[i].value : 0,
  }))

  // 件数の多い順にソート（同数は重要度順）
  const ranked = [...items].sort(
    (a, b) => b.count - a.count || b.bill.importance - a.bill.importance
  )

  // ⚠️ 判定用の平均件数
  const average = ranked.reduce((sum, r) => sum + r.count, 0) / ranked.length
  const maxCount = Math.max(ranked[0]?.count ?? 1, 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">今日の報道ランキング</h2>
          <p className="mt-1 text-sm text-gray-500">
            Google News RSS より自動取得・1時間キャッシュ　平均 {Math.round(average)} 件
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {ranked.map(({ bill, count }, index) => {
            // 重要度8以上かつ報道が平均以下 → ⚠️
            const isUnderreported = bill.importance >= 8 && count <= average
            const barWidth = `${(count / maxCount) * 100}%`

            return (
              <div
                key={bill.id}
                className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                {/* 順位 */}
                <span className="w-7 pt-0.5 text-sm font-bold text-gray-400 shrink-0 text-right">
                  {index + 1}
                </span>

                {/* 法案名・バー */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {isUnderreported && (
                      <span title="重要度が高いのに報道が少ない法案">⚠️</span>
                    )}
                    <Link
                      href={`/bills/${bill.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-700 hover:underline leading-snug"
                    >
                      {bill.name}
                    </Link>
                  </div>
                  {/* バーグラフ */}
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    {count > 0 && (
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: barWidth }}
                      />
                    )}
                  </div>
                </div>

                {/* 重要度バッジ */}
                <div className="shrink-0 pt-0.5">
                  <ImportanceBadge value={bill.importance} />
                </div>

                {/* 件数 */}
                <span className="shrink-0 pt-0.5 text-sm font-semibold text-gray-700 w-16 text-right">
                  {count} 件
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-4 text-xs text-gray-400 text-right">
          ⚠️ = 重要度8以上かつ報道件数が平均以下　※ Google News RSS（最大100件）より取得
        </p>
      </main>
    </div>
  )
}
