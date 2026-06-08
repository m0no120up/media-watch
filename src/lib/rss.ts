export type Article = {
  title: string;
  url: string;
  pubDate: string;
};

export type MediaResult = {
  name: string;
  articles: Article[];
  error: boolean;
};

// <tag>テキスト</tag> または <tag><![CDATA[テキスト]]></tag> の両方に対応
function extractField(item: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`,
    'i'
  );
  return item.match(re)?.[1]?.trim() ?? '';
}

function parseItems(xml: string, keyword?: string): Article[] {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const filtered = keyword ? items.filter((i) => i.includes(keyword)) : items;
  return filtered.map((item) => ({
    title: extractField(item, 'title'),
    // link がなければ guid で代替
    url: extractField(item, 'link') || extractField(item, 'guid'),
    pubDate: extractField(item, 'pubDate'),
  }));
}

async function fetchAndParse(url: string, keyword?: string): Promise<Article[]> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  return parseItems(xml, keyword);
}

export async function fetchMediaCounts(billName: string): Promise<MediaResult[]> {
  const sources = [
    {
      name: 'NHK',
      url: 'https://www.nhk.or.jp/rss/news/cat4.xml',
      keyword: '国民投票',
    },
    {
      name: 'Google News',
      url: `https://news.google.com/rss/search?q=${encodeURIComponent(billName)}&hl=ja&gl=JP&ceid=JP:ja`,
    },
  ];

  const results = await Promise.allSettled(
    sources.map((s) => fetchAndParse(s.url, s.keyword))
  );

  return sources.map((s, i) => {
    const result = results[i];
    return {
      name: s.name,
      articles: result.status === 'fulfilled' ? result.value : [],
      error: result.status === 'rejected',
    };
  });
}
