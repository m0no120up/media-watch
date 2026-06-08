export type Bill = {
  id: number;
  name: string;
  passedDate: string;
  importance: number;
  mediaCount: number;
  summary: string;
  affectedPopulation?: string;
  budget?: string;
  status?: string;
};

export const bills: Bill[] = [
  {
    id: 0,
    name: "国民投票法改正案",
    passedDate: "審議中",
    importance: 10,
    mediaCount: 12,
    summary:
      "自民・維新・国民民主・参政の4党が2026年6月5日に衆院へ共同提出。6月11日に衆院憲法審査会で審議入りの見通し。憲法改正の手続きを定める法律の改正で、今国会での成立が予想される。",
    status: "審議中",
  },
  {
    id: 1,
    name: "健康保険法等の一部を改正する法律案",
    passedDate: "審議中",
    importance: 9,
    mediaCount: 14,
    summary:
      "市販薬と同等の処方薬を保険適用外とする「一部保険外療養」を創設。ロキソニン・保湿剤など市販でも手に入る薬の保険給付を見直す。高額療養費制度の改定も含む。全国保険医団体連合会など医師団体が「国民皆保険の根幹が揺らぐ」として廃案を求めている。2026年4月9日に衆院で審議入り。",
    status: "審議中",
  },
  {
    id: 2,
    name: "子ども・子育て支援法改正案",
    passedDate: "2024-06-05",
    importance: 9,
    mediaCount: 342,
    summary:
      "少子化対策の強化を目的とし、児童手当の拡充や保育所の整備促進、育児休業給付の引き上げなどを盛り込んだ改正案。0〜2歳児の保育無償化範囲を拡大し、第3子以降の手当額を倍増する措置も含まれる。",
    affectedPopulation: "約3,800万人（18歳未満の子どもとその保護者）",
    budget: "約3.6兆円（年間）",
  },
  {
    id: 3,
    name: "経済安全保障推進法改正案",
    passedDate: "2024-05-17",
    importance: 8,
    mediaCount: 215,
    summary:
      "半導体・蓄電池などの重要物資のサプライチェーン強化と、基幹インフラの安全確保を目的とした改正。外国資本による重要技術への投資規制が強化され、政府による情報収集・管理体制も整備される。",
    affectedPopulation: "約120万社（対象業種の企業・事業者）",
    budget: "約4,500億円（5年間の支援予算）",
  },
  {
    id: 4,
    name: "デジタル社会形成基本法改正案",
    passedDate: "2024-04-24",
    importance: 7,
    mediaCount: 98,
    summary:
      "行政手続きのデジタル化をさらに推進するため、マイナンバーカードの利活用範囲を拡大。自治体システムの統一・標準化を義務付け、2025年度末までの完全移行を目標として定める。",
    affectedPopulation: "全国民（約1億2,500万人）",
    budget: "約1.2兆円（システム整備費用・5年間）",
  },
  {
    id: 5,
    name: "地域脱炭素推進法案",
    passedDate: "2024-04-12",
    importance: 6,
    mediaCount: 76,
    summary:
      "2050年カーボンニュートラル実現に向け、地方自治体が主導する再生可能エネルギーの導入促進と省エネ設備への補助制度を拡充。地域新電力事業者への支援策も盛り込まれている。",
    affectedPopulation: "約1,700万世帯（地方圏の住宅・事業所）",
    budget: "約8,000億円（補助金・5年間）",
  },
  {
    id: 6,
    name: "道路交通法改正案",
    passedDate: "2024-03-28",
    importance: 5,
    mediaCount: 134,
    summary:
      "自動運転レベル4の公道走行を全国で解禁するとともに、電動キックボードの交通規則を整備。飲酒運転の罰則強化と高齢ドライバーの免許更新要件の厳格化も含まれる。",
    affectedPopulation: "約8,200万人（運転免許保有者）",
    budget: "約300億円（インフラ整備・安全対策）",
  },
  {
    id: 7,
    name: "農業基本法改正案",
    passedDate: "2024-03-15",
    importance: 7,
    mediaCount: 61,
    summary:
      "食料安全保障の強化を柱に、国内農業の生産基盤維持を国の責務として明文化。スマート農業の普及支援、農地の集積・集約化促進、有機農業の拡大目標を法律に位置付ける。",
    affectedPopulation: "約200万人（農業従事者）と消費者全体",
    budget: "約2,300億円（農業支援・年間）",
  },
  {
    id: 8,
    name: "量子技術イノベーション推進法案",
    passedDate: "2024-02-29",
    importance: 4,
    mediaCount: 23,
    summary:
      "量子コンピュータ・量子通信・量子センサーの研究開発と社会実装を加速するための推進体制を整備。産学官連携ハブの設置と、国内スタートアップへの重点支援策が新設される。",
    affectedPopulation: "約5万人（研究者・技術者・関連企業）",
    budget: "約1,000億円（研究開発費・5年間）",
  },
  {
    id: 9,
    name: "空家等対策特別措置法改正案",
    passedDate: "2024-02-14",
    importance: 5,
    mediaCount: 89,
    summary:
      "全国で増加する空き家問題に対応するため、自治体による強制撤去の要件を緩和。管理不全の空き家を「特定空家」に認定するプロセスを簡略化し、活用促進のための税制優遇措置も拡充する。",
    affectedPopulation: "約900万戸（全国の空き家数）の周辺住民",
    budget: "約500億円（撤去補助・活用支援）",
  },
];
