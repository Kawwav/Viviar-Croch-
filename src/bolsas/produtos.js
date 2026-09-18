const ativo = (caminho) => `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`

export const produtos = [
  {
    slug: 'girassol-marfim',
    nome: 'Bolsa Girassol Marfim',
    preco: 'R$ 180,00',
    disponibilidade: 'estoque',
    imagens: [ativo('/bolsas/bolsa1.webp'), ativo('/bolsas/lado1.webp')],
    descricao:
      'Bolsa de crochê feita à mão em tom marfim, com detalhe floral e alça em couro sintético. Leve, resistente e perfeita para o dia a dia.',
    caracteristicas: [
      { icone: 'bolsa', texto: 'Bolsa de crochê' },
      { icone: 'fio', texto: 'Fio 100% algodão' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Pronta entrega' },
    ],
    materiais:
      'Feita em fio 100% algodão, com forro interno em tecido e fecho em zíper. Alça regulável e acabamento em crochê artesanal.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'tiracolo-petroleo',
    nome: 'Bolsa Tiracolo Petróleo',
    preco: 'R$ 210,00',
    precoAntigo: 'R$ 260,00',
    disponibilidade: 'encomenda',
    imagens: [ativo('/bolsas/bolsa2.webp'), ativo('/bolsas/lado2.webp')],
    descricao:
      'Bolsa tiracolo em crochê na cor petróleo, com alça regulável em dois tamanhos — pode ser usada cruzada ou solta no ombro.',
    caracteristicas: [
      { icone: 'bolsa', texto: 'Bolsa tiracolo' },
      { icone: 'fio', texto: 'Fio 100% algodão' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Sob encomenda' },
    ],
    materiais:
      'Feita em fio 100% algodão, com forro interno em tecido e fecho em zíper. Alça de tiracolo ajustável em altura.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'estruturada-cafe',
    nome: 'Bolsa Estruturada Café',
    preco: 'R$ 195,00',
    disponibilidade: 'encomenda',
    imagens: [ativo('/bolsas/bolsa3.webp'), ativo('/bolsas/lado3.webp')],
    descricao:
      'Bolsa estruturada em crochê tom café, com base rígida que mantém o formato e compartimento interno espaçoso.',
    caracteristicas: [
      { icone: 'bolsa', texto: 'Bolsa estruturada' },
      { icone: 'fio', texto: 'Fio 100% algodão' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Sob encomenda' },
    ],
    materiais:
      'Feita em fio 100% algodão com base estruturada, forro interno em tecido e fecho em zíper.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'transversal-marfim',
    nome: 'Bolsa Transversal Marfim',
    preco: 'R$ 165,00',
    disponibilidade: 'estoque',
    imagens: [ativo('/bolsas/bolsa4.webp'), ativo('/bolsas/lado4.webp')],
    descricao:
      'Bolsa transversal em crochê marfim, compacta e prática, com alça fixa ajustada ao corpo.',
    caracteristicas: [
      { icone: 'bolsa', texto: 'Bolsa transversal' },
      { icone: 'fio', texto: 'Fio 100% algodão' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Pronta entrega' },
    ],
    materiais:
      'Feita em fio 100% algodão, com forro interno em tecido e fecho em zíper. Alça transversal fixa.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
]