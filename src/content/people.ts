/**
 * People register. These are layout placeholders — names, roles and links are
 * not decided. Replace entries here; the list absorbs 1–6 rows without layout
 * changes.
 */
export interface PersonLink {
  label: string
  url: string
}

export interface Person {
  name: string
  /** Short role line, e.g. "开发者". Empty string hides it. */
  role: string
  links: PersonLink[]
}

export const people: Person[] = [
  {
    name: 'Nerakolo',
    role: '',
    links: [
      { label: 'Website', url: 'https://www.nerakolo.cc/' },
      { label: 'GitHub', url: 'https://github.com/Nerakolox' },
    ],
  },
  {
    name: 'Akihana',
    role: '',
    links: [
      { label: 'Website', url: 'https://akihana.top/' },
      { label: 'GitHub', url: 'https://github.com/AndKinoko' },
    ],
  },
]
