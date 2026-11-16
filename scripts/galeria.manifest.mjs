// Manifesto da galeria: o que entra no site, como é segmentado e como cada foto é tratada.
//
// f      arquivo de origem, relativo à pasta de fotos originais
// c / s  categoria e subcategoria (ids de CATEGORIAS abaixo)
// alt    texto alternativo (acessibilidade + SEO)
// d      true = foto de destaque (aparece na página principal)
// crop   recorte manual em px da imagem original { left, top, width, height } (tira interface de print)
// trim   true = remove faixas pretas (letterbox) das bordas automaticamente
//
// A ordem das entradas define a ordem de exibição dentro de cada subcategoria.
// Fora do manifesto: madrinha/…jpg (1).jpeg (duplicata exata de …jpg.jpeg).

export const CATEGORIAS = [
  { id: 'noivas', nome: 'Noivas', subs: [
    { id: 'campo', nome: 'Campo e pôr do sol' },
    { id: 'praia', nome: 'Praia' },
    { id: 'noite', nome: 'Noite' },
    { id: 'interno-e-detalhes', nome: 'Interno e detalhes' },
  ] },
  { id: 'noivos', nome: 'Noivos', subs: [] },
  { id: 'madrinhas', nome: 'Madrinhas', subs: [
    { id: 'na-festa', nome: 'Na festa' },
    { id: 'no-manequim', nome: 'No manequim' },
  ] },
  { id: 'formatura', nome: 'Formatura', subs: [
    { id: 'vestidos', nome: 'Vestidos' },
    { id: 'ternos', nome: 'Ternos e casacas' },
    { id: 'pecas-no-manequim', nome: 'Peças no manequim' },
  ] },
  { id: 'figurinos', nome: 'Figurinos', subs: [
    { id: 'traje-tipico', nome: 'Traje típico gaúcho' },
    { id: 'concursos', nome: 'Concursos' },
    { id: 'conceituais', nome: 'Conceituais' },
    { id: 'pecas-no-manequim', nome: 'Peças no manequim' },
  ] },
  { id: 'aderecos', nome: 'Adereços', subs: [
    { id: 'tocados-e-chapeus', nome: 'Tocados e chapéus' },
    { id: 'golas-e-lacos', nome: 'Golas e laços' },
    { id: 'mascaras-e-coroas', nome: 'Máscaras e coroas' },
  ] },
  { id: 'primeira-criacao', nome: 'Primeira criação', subs: [] },
];

export const FOTOS = [
  // ───────────── NOIVAS ─────────────
  { f: 'noivas/noiva-carol-detalhamento.jpeg', c: 'noivas', s: 'campo', d: true, alt: 'Casal abraçado ao pôr do sol em campo aberto, noiva com vestido de renda e buquê' },
  { f: 'noivas/noiva-externo-4.jpeg', c: 'noivas', s: 'campo', crop: { left: 0, top: 855, width: 1080, height: 1412 }, alt: 'Casal de costas observando as colinas ao entardecer, noiva com véu longo e vestido branco' },
  { f: 'noivas/noiva-interna-2.jpeg', c: 'noivas', s: 'campo', crop: { left: 0, top: 513, width: 1080, height: 1685 }, alt: 'Noiva olhando por cima do ombro, véu de renda e buquê, ao pôr do sol' },
  { f: 'noivas/noiva-patricia-detalhamento-1.jpeg', c: 'noivas', s: 'campo', alt: 'Casal sorrindo em contraluz, noiva com vestido de gola alta e buquê colorido' },
  { f: 'noivas/noiva-patricia-detalhamento.jpeg', c: 'noivas', s: 'campo', alt: 'Casal de mãos dadas diante de portas de madeira, noiva com vestido de cetim' },
  { f: 'noivas/noiva-patricia-principal.jpeg', c: 'noivas', s: 'campo', d: true, alt: 'Noiva girando em campo aberto, saia de cetim em movimento sob o céu azul' },

  { f: 'noivas/noiva-praia-2.jpeg', c: 'noivas', s: 'praia', alt: 'Noiva sorrindo com coroa de flores e vestido azul-claro com aplicações de renda' },
  { f: 'noivas/noiva-praia-7.jpeg', c: 'noivas', s: 'praia', alt: 'Noiva na areia com vestido azul-claro de duas peças e fenda lateral' },
  { f: 'noivas/noiva-praia.jpeg', c: 'noivas', s: 'praia', d: true, alt: 'Noiva em deque de madeira à beira-mar, saia azul-clara esvoaçante e buquê' },
  { f: 'noivas/noivas-detalhament.jpeg', c: 'noivas', s: 'praia', alt: 'Duas noivas se beijando na praia, vestidos brancos com top de renda' },
  { f: 'noivas/noivas-principal.jpeg', c: 'noivas', s: 'praia', alt: 'Duas noivas de costas caminhando em um píer, vestidos brancos esvoaçantes' },

  { f: 'noivas/noiva-joia-detalhamento-1.jpeg', c: 'noivas', s: 'noite', alt: 'Casal abraçado à noite entre bancos de madeira, noiva com corset e buquê rosado' },
  { f: 'noivas/noiva-joia-detalhamento.jpeg', c: 'noivas', s: 'noite', alt: 'Noiva de costas no corredor da cerimônia à noite, capa e cauda longas' },
  { f: 'noivas/noiva-joia-principal.jpeg', c: 'noivas', s: 'noite', d: true, alt: 'Noiva ruiva com vestido de corset e capa de tule em cerimônia noturna' },

  { f: 'noivas/noiva-carol-principal.jpeg', c: 'noivas', s: 'interno-e-detalhes', alt: 'Noiva com véu curto e vestido de renda com mangas, olhando por cima do ombro' },
  { f: 'noivas/noiva-interno-costas.jpeg', c: 'noivas', s: 'interno-e-detalhes', crop: { left: 20, top: 480, width: 1040, height: 1565 }, alt: 'Costas do vestido de noiva com amarração de corset, luz natural de janela' },
  { f: 'noivas/noiva-interno.jpeg', c: 'noivas', s: 'interno-e-detalhes', crop: { left: 0, top: 374, width: 1080, height: 1619 }, alt: 'Noiva sorrindo com vestido liso de fenda frontal, em ambiente interno' },

  // ───────────── NOIVOS ─────────────
  { f: 'Noivos/noivo-1-principal.jpeg', c: 'noivos', alt: 'Noivo de terno cinza e gravata sorrindo, de mãos dadas com a noiva na cerimônia' },
  { f: 'Noivos/noivo-1-detalhamento-2.jpeg', c: 'noivos', alt: 'Casal junto a um carro antigo, noivo com terno azul e colete' },
  { f: 'Noivos/noivo-1-detalhamento.jpeg', c: 'noivos', alt: 'Casal ao lado de uma caminhonete antiga branca em jardim, noivo de terno azul' },
  { f: 'Noivos/noivo-cinza-2.jpeg', c: 'noivos', d: true, alt: 'Casal ao entardecer diante de um carro antigo preto, véu longo da noiva ao vento' },
  { f: 'Noivos/noivo-cinza-4.jpeg', c: 'noivos', d: true, alt: 'Casal se beijando sob luzes pendentes, noivo de terno escuro e véu longo da noiva' },
  { f: 'Noivos/noivo-cinza-detalhamento.jpeg', c: 'noivos', alt: 'Saída dos noivos entre convidados com sparklers ao entardecer' },
  { f: 'Noivos/noivo-cinza-principal.jpeg', c: 'noivos', alt: 'Noivo de terno escuro ajudando a noiva a sair de um carro antigo' },
  { f: 'Noivos/noivo-ricardo-detalhamento.jpeg', c: 'noivos', trim: true, alt: 'Casal em pose no salão, noivo de terno azul com colete e noiva com buquê rosado' },
  { f: 'Noivos/noivo-ricardo-principal.jpeg', c: 'noivos', alt: 'Noivos dançando a primeira valsa, noivo de colete cinza' },

  // ───────────── MADRINHAS ─────────────
  { f: 'madrinha/DSC08002-01.jpeg', c: 'madrinhas', s: 'na-festa', d: true, alt: 'Madrinha com vestido verde-petróleo de corset e colar, diante de cerejeira florida' },
  { f: 'madrinha/DSC08004-01.jpeg', c: 'madrinhas', s: 'na-festa', d: true, alt: 'Madrinha de corpo inteiro em vestido verde-petróleo longo, em salão com iluminação quente' },
  { f: 'madrinha/IMG-20220922-WA0014.jpg.jpeg', c: 'madrinhas', s: 'na-festa', alt: 'Vestido vinho de manga longa com fenda, madrinha diante de parede verde' },
  { f: 'madrinha/IMG-20261031-WA0080(1).jpg.jpeg', c: 'madrinhas', s: 'na-festa', alt: 'Costas de vestido azul-claro em camadas com amarração, em evento' },
  { f: 'madrinha/Screenshot_2026-11-05-09-23-06-715_com.miui.mediaviewer.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', trim: true, alt: 'Vestido azul-claro com babados em camadas e alças finas no manequim' },
  { f: 'madrinha/Screenshot_2026-11-05-09-30-37-608_com.miui.mediaviewer.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', trim: true, alt: 'Costas do vestido azul-claro com amarração cruzada de cordões' },
  { f: 'madrinha/Screenshot_2026-11-05-09-41-06-175_com.miui.mediaviewer.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', trim: true, alt: 'Vestido verde-militar de um ombro só com fenda, no manequim' },
  { f: 'madrinha/Screenshot_2026-11-05-09-43-16-412_com.miui.mediaviewer-edit.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', alt: 'Detalhe do laço no ombro do vestido verde-militar' },
  { f: 'madrinha/Screenshot_2026-11-05-10-07-00-189_com.miui.mediaviewer.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', trim: true, alt: 'Vestido azul com corpete de renda bordada e saia de cetim com fenda' },
  { f: 'madrinha/Screenshot_2026-11-05-10-08-09-739_com.miui.mediaviewer.jpg.jpeg', c: 'madrinhas', s: 'no-manequim', trim: true, alt: 'Detalhe do corpete de renda e pedrarias em azul-claro' },

  // ───────────── FORMATURA ─────────────
  { f: 'formatura/1710629764527.jpg.jpeg', c: 'formatura', s: 'vestidos', alt: 'Formanda ruiva com vestido rosé de recortes brilhantes segurando o canudo' },
  { f: 'formatura/1718670645890-01.jpeg', c: 'formatura', s: 'vestidos', alt: 'Vestido rosé curto de franjas brilhantes diante de arranjos de flores' },
  { f: 'formatura/AirBrush_20240617183922-02.jpeg', c: 'formatura', s: 'vestidos', alt: 'Vestido rosé com fenda em pista de baile, foto em preto e branco' },
  { f: 'formatura/AirBrush_20240618184115.jpg.jpeg', c: 'formatura', s: 'vestidos', alt: 'Formanda sentada em trono com vestido rosé longo de fenda' },
  { f: 'formatura/Screenshot_20240228-164117_Instagram-01~2.jpeg', c: 'formatura', s: 'vestidos', alt: 'Costas abertas do vestido rosé com padrão dourado, formanda de cabelo ruivo' },
  { f: 'formatura/SAVE_20250826_083633.jpg.jpeg', c: 'formatura', s: 'vestidos', d: true, alt: 'Look de gala preto com saia volumosa e mangas translúcidas em palco de formatura' },
  { f: 'formatura/SAVE_20250826_083748.jpg.jpeg', c: 'formatura', s: 'vestidos', alt: 'Vestido preto de gala com transparências e sobressaia, em salão de festa' },
  { f: 'formatura/SAVE_20250826_083849.jpg.jpeg', c: 'formatura', s: 'vestidos', alt: 'Vestido preto de gala visto de costas em palco rosa de formatura' },

  { f: 'formatura/formanda-azul-1.jpeg', c: 'formatura', s: 'ternos', alt: 'Formanda de terno azul-marinho com bordado dourado e colete, diante de mesa de doces' },
  { f: 'formatura/formanda-azul.jpeg', c: 'formatura', s: 'ternos', alt: 'Formanda de terno azul-marinho erguendo o canudo, flores ao fundo' },
  { f: 'formatura/formanda.jpeg', c: 'formatura', s: 'ternos', crop: { left: 0, top: 454, width: 1080, height: 1449 }, alt: 'Formanda de casaca azul-marinho com detalhes dourados, painel de Medicina' },
  { f: 'formatura/formando-bordo.jpeg', c: 'formatura', s: 'ternos', d: true, alt: 'Formando de terno bordô de veludo e gravata preta segurando o canudo' },
  { f: 'formatura/formando-bordo-1.jpeg', c: 'formatura', s: 'ternos', alt: 'Formando de terno bordô sorrindo com o canudo de formatura' },
  { f: 'formatura/formando-bordo-4.jpeg', c: 'formatura', s: 'ternos', alt: 'Formando de terno bordô de veludo diante de jardim iluminado' },

  { f: 'formatura/IMG_20261105_102031.jpg.jpeg', c: 'formatura', s: 'pecas-no-manequim', alt: 'Vestido vermelho de cetim com corpete bordado no manequim' },
  { f: 'formatura/IMG_20261105_102049.jpg.jpeg', c: 'formatura', s: 'pecas-no-manequim', alt: 'Costas do vestido vermelho de cetim com amarração e bordado' },
  { f: 'formatura/formanda-manequim-detalhes.jpeg', c: 'formatura', s: 'pecas-no-manequim', alt: 'Casaca azul-marinho com bordado dourado nas lapelas, no manequim' },

  // ───────────── FIGURINOS ─────────────
  // Traje típico gaúcho
  { f: 'figurinos/20 de setembro com a lembrança da homenagem que fiz à cultura gaúcha, levando, como traje típico.jpg', c: 'figurinos', s: 'traje-tipico', alt: 'Traje típico gaúcho: blusa branca bufante, lenço vermelho e flor no cabelo' },
  { f: 'figurinos/20 de setembro com a lembrança da homenagem que fiz à cultura gaúcha, levando, como traje típico (1).jpg', c: 'figurinos', s: 'traje-tipico', alt: 'Traje típico gaúcho de perfil, com chapéu nas costas e lampião na cintura' },
  { f: 'figurinos/20 de setembro com a lembrança da homenagem que fiz à cultura gaúcha, levando, como traje típico (2).jpg', c: 'figurinos', s: 'traje-tipico', d: true, alt: 'Traje típico gaúcho de corpo inteiro com bandeira do Brasil, bombacha e laço de couro' },
  { f: 'figurinos/20 de setembro com a lembrança da homenagem que fiz à cultura gaúcha, levando, como traje típico (3).jpg', c: 'figurinos', s: 'traje-tipico', alt: 'Traje típico gaúcho com capa cobre, lampião e lança com bandeira' },

  // Concursos
  { f: 'figurinos/Miss Asia Pacific International United Kingdom 2025 - Anna Gomes  National Costume #missasiapaci.jpg', c: 'figurinos', s: 'concursos', d: true, alt: 'Traje nacional vermelho e xadrez com gola plissada no palco do Miss Asia Pacific International 2025' },
  { f: 'figurinos/Miss Asia Pacific International United Kingdom 2025 - Anna Gomes  National Costume #missasiapaci (1).jpg', c: 'figurinos', s: 'concursos', alt: 'Traje nacional vermelho com fitas metálicas em desfile do Miss Asia Pacific International 2025' },
  { f: 'miss.jpeg', c: 'figurinos', s: 'concursos', alt: 'Figurino vermelho com saia armada e fitas prateadas no manequim' },
  { f: 'miss-3.jpeg', c: 'figurinos', s: 'concursos', alt: 'Figurino vermelho com mangas bufantes e gola plissada no manequim' },
  { f: 'figurinos/1000284352.jpeg', c: 'figurinos', s: 'concursos', alt: 'Macacão roxo de paetês com ombreiras de cristais e tiara' },
  { f: 'figurinos/1778892891776.jpg.jpeg', c: 'figurinos', s: 'concursos', crop: { left: 0, top: 200, width: 1566, height: 2820 }, alt: 'Look roxo brilhante com ombreiras de cristais e adereço de cabeça, em palco de concurso' },
  { f: 'figurinos/look-roxo-4.jpeg', c: 'figurinos', s: 'concursos', trim: true, alt: 'Vestido lilás curto com borboletas e faixa, em passarela de concurso' },

  // Conceituais
  { f: 'figurinos/arara-principal.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Figurino de arara com asas e plumas coloridas feito à mão' },
  { f: 'figurinos/arara-detalhamento.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino de arara em movimento, asas abertas em tons de azul, vermelho e verde' },
  { f: 'figurinos/figurino-arara.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino de arara visto de corpo inteiro, com cabeça de plumas' },
  { f: 'figurinos/capa-1.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Capa gigante em organza verde-esmeralda com adereço de cabeça preto' },
  { f: 'figurinos/IMG-20260517-WA0049.jpg.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Look conceitual de fogo: body preto, asas bronzeadas e capa estampada em chamas' },
  { f: 'figurinos/IMG-20260517-WA0056.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Capa estampada em chamas aberta com asas bronze, fundo vermelho' },
  { f: 'figurinos/IMG-20260517-WA0059.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Look de fogo com asas bronzeadas, capa em movimento' },
  { f: 'figurinos/IMG_20261102_002633.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino vermelho com máscara de chamas e capa de asas abertas' },
  { f: 'figurinos/IMG_20261102_002839.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino vermelho de chamas, máscara escultural e capa de tecido estampado' },
  { f: 'figurinos/IMG_20220503_200741_288.jpg.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Retrato dramático em preto e branco com estola de estampa de serpente e unhas longas' },
  { f: 'figurinos/IMG_20220503_200741_370.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino em estampa de serpente diante de painel espelhado, preto e branco' },
  { f: 'figurinos/IMG_20221102_205933_289.jpg.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Figurino conceitual de dragão com chifres e cauda, em preto e branco' },
  { f: 'figurinos/IMG_20221102_205933_315.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Detalhe do figurino de dragão: asas, chifres e crânios em preto e branco' },
  { f: 'figurinos/1714280208720.jpg.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Figurino de fitas e máscaras vermelhas e pretas, mãos cobrindo o rosto' },
  { f: 'figurinos/figurinos-1.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Figurino de corpo inteiro com saia de fitas vermelhas e pretas e cabeça de máscaras' },
  { f: 'figurinos/figurinos-2.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Detalhe do figurino de máscaras vermelhas, flores e espinhos' },
  { f: 'figurinos/figurinos-3.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Close do adereço de máscaras vermelhas com flores e hastes pretas' },
  { f: 'figurinos/lacres-principal.jpeg', c: 'figurinos', s: 'conceituais', d: true, alt: 'Vestido de lacres de alumínio com coroa pontiaguda de metal prateado' },
  { f: 'figurinos/lacres-detalhamento.jpeg', c: 'figurinos', s: 'conceituais', alt: 'Vestido prateado de lacres com mangas translúcidas e coroa metálica' },

  // Peças no manequim
  { f: 'figurinos/Screenshot_2026-11-05-09-52-53-127_com.miui.mediaviewer.jpg.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Corselet acinzentado com laços nos ombros no manequim' },
  { f: 'figurinos/Screenshot_2026-11-05-09-53-46-019_com.miui.mediaviewer.jpg.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Saia longa acinzentada com cauda ampla no manequim' },
  { f: 'figurinos/look-destaque-1.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Vestido verde-esmeralda de pedrarias e pluma, com cauda e fenda, no manequim' },
  { f: 'figurinos/look-destaque-2.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Corpete verde translúcido com estrutura de barbatanas no manequim' },
  { f: 'figurinos/look-destaque.jpeg', c: 'figurinos', s: 'pecas-no-manequim', alt: 'Vestido verde de pedrarias e plumas com saia fluida e fenda' },
  { f: 'figurinos/look-roxo-1.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Top lilás de gola alta e um ombro só no manequim' },
  { f: 'figurinos/look-roxo-2.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Borboletas de tecido lilás sobre fundo branco, aplicações do vestido' },
  { f: 'figurinos/look-roxo-3.jpeg', c: 'figurinos', s: 'pecas-no-manequim', trim: true, alt: 'Vestido lilás curto de pedrarias com borboletas e faixa longa' },

  // ───────────── ADEREÇOS ─────────────
  { f: 'adereços/IMG-20260925-WA0015.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', alt: 'Tocado rosa-pink com penas e hastes curvas em cabeça de manequim' },
  { f: 'adereços/IMG_20261104_214734.jpg.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', alt: 'Peça de cabeça vermelha com disco no topo e renda bordada' },
  { f: 'adereços/IMG_20261104_220635.jpg.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', d: true, alt: 'Capuz de arlequim azul e rosa em veludo com pompons' },
  { f: 'adereços/IMG_20261104_225630.jpg.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', d: true, alt: 'Tocado de tule arco-íris em camadas, amarrado sob o queixo' },
  { f: 'adereços/IMG_20261104_230452.jpg.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', alt: 'Tocado de tule vermelho com flor de renda e tiara' },
  { f: 'adereços/IMG_20261104_231742.jpg.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', alt: 'Chapéu de gravatas estampadas com laço dourado' },
  { f: 'adereços/look-miss-2.jpeg', c: 'aderecos', s: 'tocados-e-chapeus', alt: 'Tocado vermelho com rosa de tecido e penas' },

  { f: 'adereços/IMG_20261104_230127.jpg.jpeg', c: 'aderecos', s: 'golas-e-lacos', alt: 'Gola de tule arco-íris volumosa, em cabeça de manequim' },
  { f: 'adereços/IMG_20261104_231128.jpg.jpeg', c: 'aderecos', s: 'golas-e-lacos', alt: 'Laço grande em veludo rosa-pink usado na cabeça' },
  { f: 'adereços/IMG_20261104_231450.jpg.jpeg', c: 'aderecos', s: 'golas-e-lacos', alt: 'Laço de veludo rosa-pink visto de trás' },
  { f: 'adereços/IMG_20261104_232525.jpg.jpeg', c: 'aderecos', s: 'golas-e-lacos', alt: 'Gola plissada em dourado com gravatas estampadas penduradas' },
  { f: 'adereços/look-miss.jpeg', c: 'aderecos', s: 'golas-e-lacos', alt: 'Gola plissada em tecido xadrez vermelho' },

  { f: 'adereços/IMG_20261104_214113.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', d: true, alt: 'Máscara de demônio vermelha com chifres e contas pretas penduradas' },
  { f: 'adereços/1649891648228.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', alt: 'Retrato conceitual com máscara de paetês multicoloridos e cabelos longos' },
  { f: 'adereços/IMG_20261104_215622.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', alt: 'Coroa de renda preta com hastes, em cabeça de manequim' },
  { f: 'adereços/IMG_20261104_215958.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', alt: 'Capuz de miçangas pretas com barba de contas' },
  { f: 'adereços/IMG_20261104_223450.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', alt: 'Adereço escultural preto em forma de candelabro' },
  { f: 'adereços/IMG_20261104_223932.jpg.jpeg', c: 'aderecos', s: 'mascaras-e-coroas', alt: 'Adereço de cordões e hastes pretas com rosto aplicado' },

  // ───────────── PRIMEIRA CRIAÇÃO ─────────────
  { f: 'primeira-criação/Editorial JONASxJONAS.jpeg', c: 'primeira-criacao', d: true, alt: 'Editorial JONASxJONAS: modelo com gola de arlequim e vestido preto e branco, em preto e branco' },
  { f: 'primeira-criação/Editorial JONASxJONAS 2.jpeg', c: 'primeira-criacao', alt: 'Editorial JONASxJONAS: estilista ajustando o vestido de listras pretas e brancas da modelo' },
  { f: 'primeira-criação/1686762387737.jpg.jpeg', c: 'primeira-criacao', alt: 'Vestido preto e branco geométrico em igreja com vitrais, foto em preto e branco' },
  { f: 'primeira-criação/1686762696399.jpg.jpeg', c: 'primeira-criacao', alt: 'Modelo desfilando vestido preto com gola branca, plateia ao fundo' },
];
