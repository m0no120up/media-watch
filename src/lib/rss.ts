export type MediaCount = {
  name: string;
  count: number;
  error: boolean;
};

// RSS XML から <item> を抽出し、keyword を含むものだけを数える
function countItems(xml: string, keyword?: string): number {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  if (!keyword) return items.length;
  return items.filter((item) => item.includes(keyword)).length;
}

async function fetchAndCount(url: string, keyword?: string): Promise<number> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  return countItems(xml, keyword);
}

// billName: 法案名（NHK は政治カテゴリ全体なのでキーワードで絞る）
export async function fetchMediaCounts(billName: string): Promise<MediaCount[]> {
  const sources = [
    {
      name: "NHK",
      url: "https://www.nhk.or.jp/rss/news/cat4.xml",
      keyword: "国民投票", // NHK は政治カテゴリ全体を返すので法案名で絞り込む
    },
    {
      name: "Google News",
      url: `https://news.google.com/rss/search?q=${encodeURIComponent(billName)}&hl=ja&gl=JP&ceid=JP:ja`,
      // 検索クエリで絞られているのでキーワードフィルタ不要
    },
  ];

  // 片方が失敗しても両方の結果を返す
  const results = await Promise.allSettled(
    sources.map((s) => fetchAndCount(s.url, s.keyword))
  );

  return sources.map((s, i) => {
    const result = results[i];
    return {
      name: s.name,
      count: result.status === "fulfilled" ? result.value : 0,
      error: result.status === "rejected",
    };
  });
}
