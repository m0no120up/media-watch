import NavTabs from './NavTabs'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 pt-5">
        <h1 className="text-2xl font-bold text-gray-900">法案報道可視化</h1>
        <p className="mt-1 text-sm text-gray-500">国会で成立した法案と報道状況の一覧</p>
        <NavTabs />
      </div>
    </header>
  )
}
