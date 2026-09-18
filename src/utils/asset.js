export const asset = (caminho) =>
  `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`
