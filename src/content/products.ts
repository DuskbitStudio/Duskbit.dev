/**
 * Product register. These are layout placeholders — names, platforms and
 * status are not decided. Replace entries here; the table absorbs 2–5 rows
 * without layout changes.
 */
export interface Product {
  name: string
  desc: string
  platform: string
  status: string
  /** Optional link shown next to the name. */
  url?: string
}

export const products: Product[] = [
  {
    name: 'MeMeMio',
    desc: '表情包管理与检索工具，支持 MCP 接入。',
    platform: 'Web · 网页端',
    status: '开发中',
    url: 'https://github.com/DuskbitStudio/MeMeMio',
  },
]
