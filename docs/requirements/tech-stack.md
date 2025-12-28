# 採用技術

tech:
  frontend: Astro
  language: TypeScript
  styling: TailwindCSS4
  deployment: Github Pages
  cms: MicroCMS
  fetching: "SSG"
  notes:
    - "TypeScriptはstrictモード"
    - "セミコロンは付けない"


# その他使用ライブラリ

- bun（voltoでpackageにnodejsのバージョンを記載）
- zustand（必要であれば）
- React
- biome（linter、prettier）
- prettier（Astro用）
- editorconfig


# コーディングルール

rules:
  indent: 2
  naming:
    components: "PascalCase"
    files: "kebab-case"
  eslint: true
  prettier: true
  description: "その他ルールは.editorconfigに準拠"
