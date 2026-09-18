import { asset } from '../utils/asset.js'

export const produtos = [
  {
    slug: 'girassol-marfim',
    nome: 'Cachecol Girassol Marfim',
    preco: 'R$ 90,00',
    disponibilidade: 'estoque',
    imagens: [asset('cachecol/cachecol1.webp'), asset('cachecol/cachecol1-lado.webp')],
    descricao:
      'Cachecol de crochê feito à mão em tom marfim, com padrão inspirado em girassóis. Leve e aconchegante, ideal para compor looks nos dias mais frios.',
    caracteristicas: [
      { icone: 'cachecol', texto: 'Cachecol de crochê' },
      { icone: 'fio', texto: 'Fio 100% lã' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Pronta entrega' },
    ],
    materiais:
      'Feito em fio 100% lã, com acabamento em crochê artesanal e franjas nas extremidades.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'xadrez-petroleo',
    nome: 'Cachecol Xadrez Petróleo',
    preco: 'R$ 95,00',
    precoAntigo: 'R$ 120,00',
    disponibilidade: 'encomenda',
    imagens: [asset('cachecol/cachecol2.webp'), asset('cachecol/cachecol2-lado.webp')],
    descricao:
      'Cachecol em crochê na cor petróleo, com padrão xadrez trabalhado ponto a ponto. Um clássico atemporal para os dias de inverno.',
    caracteristicas: [
      { icone: 'cachecol', texto: 'Cachecol de crochê' },
      { icone: 'fio', texto: 'Fio 100% lã' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Sob encomenda' },
    ],
    materiais:
      'Feito em fio 100% lã, com padrão xadrez em duas cores e franjas nas extremidades.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'trancado-cafe',
    nome: 'Cachecol Trançado Café',
    preco: 'R$ 85,00',
    disponibilidade: 'estoque',
    imagens: [asset('cachecol/cachecol3.webp'), asset('cachecol/cachecol3-lado.webp')],
    descricao:
      'Cachecol em crochê tom café, com textura trançada que traz volume e aconchego. Combina com qualquer casaco de inverno.',
    caracteristicas: [
      { icone: 'cachecol', texto: 'Cachecol de crochê' },
      { icone: 'fio', texto: 'Fio 100% lã' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Pronta entrega' },
    ],
    materiais:
      'Feito em fio 100% lã, com ponto trançado que garante mais volume e franjas nas extremidades.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
  {
    slug: 'listrado-trigo',
    nome: 'Cachecol Listrado Trigo',
    preco: 'R$ 80,00',
    disponibilidade: 'encomenda',
    imagens: [asset('cachecol/cachecol4.webp'), asset('cachecol/cachecol4-lado.webp')],
    descricao:
      'Cachecol em crochê na cor trigo, com listras discretas e acabamento delicado. Leve o suficiente para usar por cima de qualquer look.',
    caracteristicas: [
      { icone: 'cachecol', texto: 'Cachecol de crochê' },
      { icone: 'fio', texto: 'Fio 100% lã' },
      { icone: 'mao', texto: 'Feito à mão' },
      { icone: 'calendario', texto: 'Sob encomenda' },
    ],
    materiais:
      'Feito em fio 100% lã, com listras em tons neutros e franjas nas extremidades.',
    comoLavar:
      'Lave à mão com água fria e sabão neutro, sem torcer. Enxágue bem e deixe secar na horizontal, à sombra, longe de fontes de calor.',
  },
]