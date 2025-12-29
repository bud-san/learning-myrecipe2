const domain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY
const recipesEndpoint = import.meta.env.VITE_MICROCMS_RECIPES_ENDPOINT
const ingredientsEndpoint = import.meta.env.VITE_MICROCMS_INGREDIENTS_ENDPOINT

if (!domain || !apiKey || !recipesEndpoint || !ingredientsEndpoint) {
  throw new Error('microCMSの環境変数が不足しています')
}

const BASE_URL = `https://${domain}.microcms.io/api/v1`

type MicroCMSListResponse<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export type Nutrition = {
  id: string
  title?: string
  description?: string
  rda?: string
}

export type Ingredient = {
  id: string
  title: string
  description?: string
  nutrition?: { fieldId: string; nutrition: Nutrition }[]
  season?: string
}

export type RecipeIngredient = {
  fieldId: 'ingredients'
  ingredients: Ingredient
  quantity?: string
  parts?: string
  group?: number
}

export type RecipeStep = {
  fieldId: 'steps'
  description: string
  timer?: number
}

export type Recipe = {
  id: string
  title: string
  description?: string
  cooking?: string[]
  steps: RecipeStep[]
  ingredients: RecipeIngredient[]
  servings?: string
  report?: string
  ai?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

type Query = Record<string, string | number | undefined>

const toQueryString = (query?: Query) => {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, String(value))
  })
  const result = params.toString()
  return result ? `?${result}` : ''
}

const fetchJSON = async <T>(path: string, query?: Query): Promise<T> => {
  const url = `${BASE_URL}${path}${toQueryString(query)}`
  const res = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
    },
  })
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`microCMS fetch error ${res.status}: ${detail}`)
  }
  return res.json() as Promise<T>
}

export const fetchRecipes = (query?: Query) =>
  fetchJSON<MicroCMSListResponse<Recipe>>(`/${recipesEndpoint}`, query)

export const fetchRecipeById = (id: string) =>
  fetchJSON<Recipe>(`/${recipesEndpoint}/${id}`, { depth: 2 })

export const fetchIngredients = (query?: Query) =>
  fetchJSON<MicroCMSListResponse<Ingredient>>(`/${ingredientsEndpoint}`, query)

export const fetchAllRecipes = async () => {
  const pageSize = 100
  let offset = 0
  const contents: Recipe[] = []

  // 最低限の回数で全件取得
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { contents: page, totalCount } = await fetchRecipes({
      offset,
      limit: pageSize,
      depth: 2,
    })
    contents.push(...page)
    offset += pageSize
    if (offset >= totalCount) break
  }

  return contents
}
