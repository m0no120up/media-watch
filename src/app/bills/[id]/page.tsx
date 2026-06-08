import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bills } from "@/lib/bills";
import { MediaBarChart, MediaBarChartSkeleton } from "@/components/MediaBarChart";

function ImportanceBadge({ value }: { value: number }) {
  const color =
    value >= 8 ? "bg-red-100 text-red-700" :
    value >= 6 ? "bg-orange-100 text-orange-700" :
    "bg-gray-100 text-gray-600";
  const label =
    value >= 8 ? "高" :
    value >= 6 ? "中" :
    "低";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
      重要度 {value}（{label}）
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default async function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bill = bills.find((b) => b.id === Number(id));

  if (!bill) {
    notFound();
  }

  const isActive = bill.status === "審議中";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-3"
          >
            ← 一覧に戻る
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-gray-900 leading-snug">{bill.name}</h1>
            {isActive && (
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                審議中
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* 基本情報カード */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            基本情報
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard label="成立日" value={bill.passedDate} />
            <StatCard label="報道件数（参考）" value={`${bill.mediaCount.toLocaleString()} 件`} />
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1.5">重要度</p>
              <ImportanceBadge value={bill.importance} />
            </div>
          </div>
        </section>

        {/* メディア別報道件数（審議中の法案のみ・RSSから自動取得） */}
        {isActive && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                メディア別報道件数
              </h2>
              <span className="text-xs text-gray-400">RSS自動取得・1時間キャッシュ</span>
            </div>
            {/*
              Suspense を使うと、RSS取得中はスケルトンを表示し、
              残りのページコンテンツはすぐに表示される（Streaming）
            */}
            <Suspense fallback={<MediaBarChartSkeleton />}>
              <MediaBarChart billName={bill.name} />
            </Suspense>
          </section>
        )}

        {/* 概要 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            概要
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{bill.summary}</p>
        </section>

        {/* 影響・規模（データがある場合のみ表示） */}
        {(bill.affectedPopulation || bill.budget) && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              影響・規模
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bill.affectedPopulation && (
                <StatCard label="影響人口" value={bill.affectedPopulation} />
              )}
              {bill.budget && (
                <StatCard label="予算規模" value={bill.budget} />
              )}
            </div>
          </section>
        )}

        <p className="text-xs text-gray-400 text-right">※ 仮データを含みます</p>
      </main>
    </div>
  );
}
