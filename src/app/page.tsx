import Link from "next/link";
import { bills } from "@/lib/bills";

function ImportanceBadge({ value }: { value: number }) {
  const color =
    value >= 8 ? "bg-red-100 text-red-700" :
    value >= 6 ? "bg-orange-100 text-orange-700" :
    "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${color}`}>
      {value}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">法案報道可視化</h1>
          <p className="mt-1 text-sm text-gray-500">国会で成立した法案と報道状況の一覧</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">法案名</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">成立日</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-600">重要度</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">報道件数</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link
                      href={`/bills/${bill.id}`}
                      className="text-blue-700 hover:underline"
                    >
                      {bill.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{bill.passedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <ImportanceBadge value={bill.importance} />
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700 font-medium">
                    {bill.mediaCount.toLocaleString()} 件
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-400 text-right">※ 仮データです</p>
      </main>
    </div>
  );
}
