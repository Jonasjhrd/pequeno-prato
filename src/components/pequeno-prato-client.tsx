"use client"

import type React from "react"

import { useState } from "react"
import {
  Heart,
  Award,
  Users,
  User,
  HomeIcon,
  UtensilsCrossed,
  X,
  Crown,
  Lock,
  Check,
  LogOut,
  Trophy,
  Calendar,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/actions/auth"

const ALL_RECIPES = [
  {
    id: 1,
    title: "Papinha de Abóbora",
    category: "Papinhas",
    ageRange: "6-12 meses",
    time: "20 minutos",
    image: "/images/papinha-abobora-canela.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["300g de abóbora", "1 colher de azeite de oliva", "200ml de água filtrada"],
    instructions: [
      "Lave bem a abóbora e descasque",
      "Corte em cubos pequenos de aproximadamente 2cm",
      "Cozinhe em água fervente por 15 minutos até ficar macia",
      "Escorra e amasse com um garfo até obter consistência cremosa",
      "Adicione o azeite e misture bem",
      "Sirva morno, testando sempre a temperatura",
    ],
    nutrition: "Rica em vitamina A (85% IDR), betacaroteno, fibras e potássio. Apenas 45 calorias por porção.",
    benefits: "Fortalece a imunidade, melhora a visão, auxilia no desenvolvimento cerebral e é facilmente digerível.",
    tips: "Escolha abóboras com casca firme e sem manchas. Pode congelar em potinhos por até 3 meses. A textura ideal é cremosa mas não líquida.",
    allergens: "Não contém alergênicos comuns. Segura para primeiras introduções.",
    variations:
      "Adicione batata-doce para adoçar naturalmente, ou um fio de leite materno/fórmula para cremosidade extra.",
  },
  {
    id: 2,
    title: "Purê de Batata-Doce",
    category: "Papinhas",
    ageRange: "6-12 meses",
    time: "25 minutos",
    image: "/images/pure-de-batata-doce-bebe.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["1 batata-doce média (200g)", "1 colher de chá de azeite", "100ml de água"],
    instructions: [
      "Lave e descasque a batata-doce",
      "Corte em cubos uniformes",
      "Cozinhe no vapor por 20 minutos",
      "Amasse ainda quente até ficar bem cremoso",
      "Adicione o azeite e misture",
      "Ajuste consistência com água se necessário",
    ],
    nutrition: "Excelente fonte de vitamina A, C, manganês e fibras. 90 calorias por porção.",
    benefits:
      "Fortalece o sistema imunológico, regula o intestino, fornece energia de longa duração e é naturalmente doce.",
    tips: "Prefira batatas com casca alaranjada (mais doces). Pode assar no forno por 40min a 180°C como alternativa.",
    allergens: "Livre de alergênicos. Ideal para bebês com refluxo.",
    variations: "Misture com banana amassada, adicione canela em pó (8+ meses) ou combine com frango desfiado.",
  },
  {
    id: 3,
    title: "Creme de Milho",
    category: "Papinhas",
    ageRange: "8+ meses",
    time: "30 minutos",
    image: "/images/creme-de-milho-bebe.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["2 espigas de milho verde", "200ml de água", "1 colher de azeite", "1 pitada de cebola (opcional)"],
    instructions: [
      "Retire os grãos de milho das espigas com uma faca",
      "Lave bem os grãos em água corrente",
      "Cozinhe em água fervente por 20 minutos até ficarem macios",
      "Bata no liquidificador até obter consistência cremosa",
      "Passe por uma peneira para remover cascas",
      "Adicione o azeite e misture bem antes de servir",
    ],
    nutrition: "Rico em vitamina B, fibras e carboidratos complexos. 75 calorias por porção.",
    benefits:
      "Fornece energia, auxilia no desenvolvimento cerebral, melhora o funcionamento intestinal e fortalece o sistema imunológico.",
    tips: "Prefira milho verde fresco. Pode congelar por até 2 meses. Se ficar muito espesso, adicione um pouco de água ou leite materno.",
    allergens: "Geralmente seguro, mas observe reações. Evite milho transgênico quando possível.",
    variations: "Adicione batata para encorpar, ou misture com frango desfiado para uma papinha completa.",
  },
  {
    id: 4,
    title: "Purê de Cenoura",
    category: "Papinhas",
    ageRange: "6-12 meses",
    time: "20 minutos",
    image: "/images/pure-cenoura-baby.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["2 cenouras médias (250g)", "1 colher de azeite extra virgem", "150ml de água filtrada"],
    instructions: [
      "Lave e descasque as cenouras",
      "Corte em rodelas finas de aproximadamente 0,5cm",
      "Cozinhe no vapor por 15-18 minutos até ficarem bem macias",
      "Transfira para um recipiente e amasse com garfo",
      "Adicione o azeite e misture até ficar homogêneo",
      "Ajuste a consistência com água se necessário",
    ],
    nutrition: "Excelente fonte de betacaroteno (vitamina A), vitamina K e potássio. 50 calorias por porção.",
    benefits:
      "Melhora a visão, fortalece o sistema imunológico, promove pele saudável e auxilia na formação de ossos e dentes.",
    tips: "Escolha cenouras orgânicas quando possível. Cozinhar no vapor preserva mais nutrientes. Pode congelar em forminhas de gelo.",
    allergens: "Raramente causa alergia. Segura para primeiras introduções alimentares.",
    variations: "Misture com maçã cozida para adoçar, ou combine com batata para textura mais cremosa.",
  },
  {
    id: 5,
    title: "Banana Amassada",
    category: "Café da Manhã",
    ageRange: "6-12 meses",
    time: "5 minutos",
    image: "/images/banana-amassada-bebe.jpg",
    difficulty: "Muito Fácil",
    isPremium: false,
    ingredients: ["1 banana nanica madura", "1 pitada de canela (opcional, 8+ meses)"],
    instructions: [
      "Escolha uma banana bem madura com casca amarela e pintas marrons",
      "Lave bem a casca antes de descascar",
      "Descasque e corte em rodelas",
      "Amasse com um garfo até obter consistência cremosa",
      "Se desejar, polvilhe uma pitada mínima de canela",
      "Sirva imediatamente para evitar oxidação",
    ],
    nutrition: "Rica em potássio, vitamina B6, vitamina C e fibras. 105 calorias por banana.",
    benefits:
      "Fornece energia rápida, regula o intestino, ajuda no desenvolvimento muscular e melhora o humor do bebê.",
    tips: "Use banana bem madura para melhor digestão. Não prepare com antecedência pois escurece. Ideal como primeira fruta.",
    allergens: "Raramente alergênica. Pode causar prisão de ventre se consumida em excesso.",
    variations: "Misture com aveia cozida, adicione gotas de leite materno, ou combine com mamão para fibras extras.",
  },
  {
    id: 6,
    title: "Papinha de Mandioquinha",
    category: "Papinhas",
    ageRange: "6-12 meses",
    time: "25 minutos",
    image: "/images/mandioquinha-baby-food-puree.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["300g de mandioquinha (batata-baroa)", "1 colher de azeite", "200ml de água"],
    instructions: [
      "Lave bem a mandioquinha em água corrente",
      "Descasque e corte em cubos de 2cm",
      "Cozinhe em água fervente por 20 minutos",
      "Escorra e reserve um pouco da água do cozimento",
      "Amasse com garfo até consistência cremosa",
      "Adicione azeite e ajuste textura com a água reservada",
    ],
    nutrition: "Rica em cálcio, fósforo, vitaminas do complexo B e fibras. 60 calorias por porção.",
    benefits: "Fortalece ossos e dentes, melhora digestão, fornece energia sustentada e é de fácil digestão.",
    tips: "Escolha mandioquinhas firmes e sem manchas. Pode congelar por até 3 meses. Ótima base para papinhas salgadas.",
    allergens: "Livre de alergênicos comuns. Excelente para bebês com sensibilidade digestiva.",
    variations: "Combine com carne moída, frango desfiado, ou adicione cenoura para cor e sabor.",
  },
  {
    id: 7,
    title: "Purê de Maçã",
    category: "Sobremesas Saudáveis",
    ageRange: "6-12 meses",
    time: "15 minutos",
    image: "/images/pure-maca-bebe.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["2 maçãs vermelhas ou fuji", "100ml de água", "1 pitada de canela (opcional)"],
    instructions: [
      "Lave bem as maçãs",
      "Descasque e retire o miolo com sementes",
      "Corte em cubos pequenos",
      "Cozinhe com água por 10-12 minutos até amolecer",
      "Amasse com garfo ou bata no liquidificador",
      "Deixe esfriar antes de servir",
    ],
    nutrition: "Rica em pectina, vitamina C, antioxidantes e fibras solúveis. 52 calorias por porção.",
    benefits: "Regula o intestino, fortalece imunidade, auxilia na digestão e é naturalmente doce sem açúcar.",
    tips: "Maçãs vermelhas são mais doces. Não adicione açúcar. Pode servir morno ou gelado. Congela bem por 2 meses.",
    allergens: "Raramente causa alergia. Segura para introdução alimentar.",
    variations: "Misture com pera cozida, adicione aveia, ou combine com iogurte natural (12+ meses).",
  },
  {
    id: 8,
    title: "Sopa de Lentilha",
    category: "Almoço",
    ageRange: "8+ meses",
    time: "40 minutos",
    image: "/images/sopa-de-lentilha-bebe.jpg",
    difficulty: "Média",
    isPremium: false,
    ingredients: [
      "1/2 xícara de lentilha",
      "1 cenoura pequena",
      "1 batata média",
      "1 tomate",
      "1 dente de alho",
      "1 colher de azeite",
      "500ml de água",
    ],
    instructions: [
      "Lave bem a lentilha e deixe de molho por 2 horas",
      "Pique todos os legumes em cubos pequenos",
      "Refogue o alho no azeite até dourar levemente",
      "Adicione os legumes e refogue por 2 minutos",
      "Adicione a lentilha escorrida e a água",
      "Cozinhe por 30 minutos até tudo ficar macio",
      "Amasse levemente com garfo, mantendo textura",
    ],
    nutrition: "Excelente fonte de proteína vegetal, ferro, ácido fólico e fibras. 120 calorias por porção.",
    benefits: "Previne anemia, fornece proteína completa, melhora digestão e promove saciedade.",
    tips: "Deixar de molho facilita digestão. Pode congelar em porções. Se der gases, cozinhe com erva-doce.",
    allergens: "Atenção ao alho em bebês muito sensíveis. Lentilha pode causar gases inicialmente.",
    variations: "Adicione espinafre picado, arroz integral, ou carne moída para refeição completa.",
  },
  {
    id: 9,
    title: "Mingau de Aveia",
    category: "Café da Manhã",
    ageRange: "6-12 meses",
    time: "15 minutos",
    image: "/images/mingau-aveia-banana.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: ["3 colheres de aveia em flocos finos", "200ml de leite materno ou fórmula", "1/2 banana madura"],
    instructions: [
      "Amasse bem a banana com um garfo",
      "Aqueça o leite em fogo baixo",
      "Adicione a aveia aos poucos, mexendo sempre",
      "Cozinhe por 5-7 minutos até engrossar",
      "Desligue o fogo e misture a banana amassada",
      "Deixe amornar e sirva",
    ],
    nutrition: "Rica em fibras, ferro, cálcio e carboidratos complexos. 140 calorias por porção.",
    benefits: "Fornece energia prolongada, regula intestino, melhora sono e ajuda no ganho de peso saudável.",
    tips: "Use aveia em flocos finos para bebês. Não adicione açúcar. Pode preparar na noite anterior e aquecer.",
    allergens: "Aveia pode conter traços de glúten. Observe reações alérgicas.",
    variations: "Adicione mamão, maçã raspada, ou gotas de essência de baunilha (12+ meses).",
  },
  {
    id: 10,
    title: "Purê de Brócolis",
    category: "Papinhas",
    ageRange: "8+ meses",
    time: "20 minutos",
    image: "/images/pure-brocolis-bebe.jpg",
    difficulty: "Fácil",
    isPremium: false,
    ingredients: [
      "1 xícara de brócolis (somente as flores)",
      "1 batata pequena",
      "1 colher de azeite",
      "150ml de água",
    ],
    instructions: [
      "Lave bem o brócolis em água corrente",
      "Separe apenas as flores, descarte o talo",
      "Descasque e corte a batata em cubos",
      "Cozinhe no vapor por 15 minutos até amolecer",
      "Amasse junto com a batata",
      "Adicione o azeite e misture bem",
    ],
    nutrition: "Rico em cálcio, ferro, vitaminas C e K, e fibras. 55 calorias por porção.",
    benefits: "Fortalece ossos, melhora imunidade, auxilia na digestão e tem ação anti-inflamatória.",
    tips: "Cozinhe no vapor para preservar nutrientes. Batata ajuda a disfarçar sabor forte. Sirva fresco.",
    allergens: "Pode causar gases. Introduza gradualmente. Seguro para alergias comuns.",
    variations: "Misture com batata-doce, adicione queijo ralado (12+ meses), ou combine com frango.",
  },
  {
    id: 11,
    title: "Panqueca de Banana",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "15 minutos",
    image: "/images/banana-pancakes.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: ["1 banana madura", "1 ovo", "2 colheres de aveia em flocos", "1 pitada de canela"],
    instructions: [
      "Amasse bem a banana em uma tigela",
      "Adicione o ovo e misture até incorporar",
      "Acrescente a aveia e a canela, mexa bem",
      "Deixe descansar por 5 minutos",
      "Aqueça uma frigideira antiaderente",
      "Despeje pequenas porções e cozinhe 2 min de cada lado",
    ],
    nutrition: "Rica em proteínas, potássio, fibras e carboidratos. 180 calorias por porção.",
    benefits: "Fornece energia, desenvolve coordenação motora (finger food), sacia e é naturalmente doce.",
    tips: "Use banana bem madura. Não precisa óleo na frigideira. Sirva com frutas frescas.",
    allergens: "Contém ovo. Observar alergia ao ovo e à aveia.",
    variations: "Adicione cacau em pó, frutas vermelhas amassadas, ou pasta de amendoim.",
  },
  {
    id: 12,
    title: "Bolinho de Abobrinha",
    category: "Lanches Rápidos",
    ageRange: "12-24 meses",
    time: "30 minutos",
    image: "/images/bolinho-abobrinha-bebe.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 abobrinha média ralada",
      "1 ovo",
      "3 colheres de farinha de trigo integral",
      "2 colheres de queijo ralado",
      "1 colher de azeite",
    ],
    instructions: [
      "Rale a abobrinha e esprema bem o excesso de água",
      "Misture com ovo, farinha e queijo",
      "Tempere levemente com sal",
      "Forme pequenos bolinhos com as mãos",
      "Asse em forno preaquecido a 180°C por 20 minutos",
      "Vire na metade do tempo para dourar ambos os lados",
    ],
    nutrition: "Fonte de proteínas, cálcio, fibras e vitaminas. 95 calorias por bolinho.",
    benefits: "Esconde vegetais, desenvolve mastigação, fornece cálcio para ossos e é prático para lanches.",
    tips: "Esprema bem a abobrinha para não ficar úmido. Pode congelar assado. Ótimo para lancheira.",
    allergens: "Contém glúten, ovo e lactose. Substitua farinha por fécula se necessário.",
    variations: "Use cenoura ralada, adicione frango desfiado, ou substitua queijo por ricota.",
  },
  {
    id: 13,
    title: "Frango Desfiado",
    category: "Almoço",
    ageRange: "8+ meses",
    time: "45 minutos",
    image: "/images/frango-desfiado-bebe.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 filé de frango",
      "1 cenoura",
      "1 batata",
      "1 tomate",
      "1 cebola pequena",
      "500ml de água",
      "1 fio de azeite",
    ],
    instructions: [
      "Corte o frango em pedaços médios",
      "Pique todos os legumes",
      "Coloque tudo em uma panela com água",
      "Cozinhe por 35-40 minutos até o frango ficar macio",
      "Retire o frango e desfie bem fininho",
      "Amasse os legumes e misture com o frango",
    ],
    nutrition: "Excelente fonte de proteína magra, ferro, zinco e vitaminas do complexo B. 110 calorias por porção.",
    benefits: "Desenvolve músculos, fortalece imunidade, fornece proteína de alta qualidade e éEasily digerível.",
    tips: "Desfie bem fino para evitar engasgos. Pode congelar em porções. Use peito para menos gordura.",
    allergens: "Raramente alergênico. Seguro para introdução de proteína animal.",
    variations: "Adicione batata-doce, arroz, ou legumes variados para papinha completa.",
  },
  {
    id: 14,
    title: "Biscoito de Aveia",
    category: "Lanches Rápidos",
    ageRange: "12-24 meses",
    time: "25 minutos",
    image: "/images/biscoito-de-aveia-e-banana-bebe.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 banana madura",
      "1 xícara de aveia em flocos",
      "2 colheres de uva passa",
      "1 colher de óleo de coco",
    ],
    instructions: [
      "Amasse bem a banana",
      "Misture com aveia e óleo de coco",
      "Adicione as uvas passas picadas",
      "Forme pequenos discos com as mãos",
      "Disponha em assadeira forrada",
      "Asse a 180°C por 15-18 minutos até dourar",
    ],
    nutrition: "Rico em fibras, carboidratos complexos e ferro. 80 calorias por biscoito.",
    benefits: "Energia sustentada, regula intestino, desenvolve mastigação e é sem açúcar adicionado.",
    tips: "Ficam crocantes ao esfriar. Guarde em pote hermético por 5 dias. Ótimo para viagens.",
    allergens: "Contém aveia (traços de glúten possíveis). Uva passa pode ser alergênica.",
    variations: "Adicione cacau, sementes de chia, ou pasta de amendoim.",
  },
  {
    id: 15,
    title: "Suco Natural",
    category: "Café da Tarde",
    ageRange: "12-24 meses",
    time: "5 minutos",
    image: "/images/suco-natural-frutas.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: ["1 laranja", "1 cenoura pequena", "100ml de água"],
    instructions: [
      "Esprema a laranja para extrair o suco",
      "Lave e descasque a cenoura",
      "Bata no liquidificador com água",
      "Coe para remover fibras grossas",
      "Misture com suco de laranja",
      "Sirva imediatamente sem açúcar",
    ],
    nutrition: "Rico em vitamina C, betacaroteno e antioxidantes. 65 calorias por copo.",
    benefits: "Fortalece imunidade, melhora absorção de ferro, hidrata e fornece energia rápida.",
    tips: "Sirva logo após preparo. Limite a 100ml/dia. Prefira frutas inteiras quando possível.",
    allergens: "Frutas cítricas podem causar assaduras. Observe reações.",
    variations: "Use maçã com beterraba, melancia com limão, ou manga com laranja.",
  },
  {
    id: 16,
    title: "Hambúrguer de Grão-de-Bico",
    category: "Jantar",
    ageRange: "2+ anos",
    time: "35 minutos",
    image: "/images/hamburguer-grao-de-bico.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 xícara de grão-de-bico cozido",
      "1 cenoura ralada",
      "2 colheres de farinha de aveia",
      "1 dente de alho",
      "Sal e temperos",
    ],
    instructions: [
      "Amasse bem o grão-de-bico cozido",
      "Misture com cenoura, farinha e temperos",
      "Modele em formato de hambúrguer",
      "Deixe descansar por 10 minutos",
      "Asse em forno a 200°C por 20 minutos",
      "Vire na metade para dourar dos dois lados",
    ],
    nutrition: "Rico em proteína vegetal, fibras, ferro e magnésio. 140 calorias por hambúrguer.",
    benefits: "Alternativa vegetariana nutritiva, previne anemia, fornece saciedade e desenvolve paladar.",
    tips: "Pode congelar cru ou assado. Sirva no pão integral com salada. Molda melhor se esfriar.",
    allergens: "Leguminosa pode causar gases. Introduzir gradualmente.",
    variations: "Adicione beterraba, use lentilha, ou misture com quinoa cozida.",
  },
  {
    id: 17,
    title: "Macarrão com Molho de Tomate",
    category: "Almoço",
    ageRange: "12-24 meses",
    time: "30 minutos",
    image: "/images/macarrao-molho-tomate.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "100g de macarrão tipo parafuso",
      "3 tomates maduros",
      "1 cenoura ralada",
      "1 dente de alho",
      "2 colheres de azeite",
      "Manjericão fresco",
    ],
    instructions: [
      "Cozinhe o macarrão conforme embalagem",
      "Refogue o alho no azeite",
      "Adicione tomates picados e cenoura",
      "Cozinhe por 15 minutos até engrossar",
      "Bata no liquidificador para molho liso",
      "Misture com o macarrão escorrido",
    ],
    nutrition: "Carboidratos, vitaminas A e C, licopeno e fibras. 180 calorias por porção.",
    benefits: "Fornece energia, esconde vegetais, desenvolve mastigação e é refeição completa.",
    tips: "Use macarrão curto para facilitar. Molho congela bem. Adicione queijo ralado para proteína.",
    allergens: "Contém glúten. Tomate pode causar acidez em alguns bebês.",
    variations: "Adicione carne moída, frango desfiado, ou legumes picados.",
  },
  {
    id: 18,
    title: "Omelete Simples",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "10 minutos",
    image: "/images/omelete-simples.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["2 ovos", "2 colheres de leite", "2 colheres de queijo ralado", "1 tomate picado", "Azeite"],
    instructions: [
      "Bata os ovos com o leite",
      "Adicione queijo e tomate picado",
      "Aqueça azeite em frigideira antiaderente",
      "Despeje a mistura",
      "Cozinhe em fogo baixo por 5 minutos",
      "Vire ou dobre ao meio",
    ],
    nutrition: "Excelente fonte de proteína, vitaminas B12, D e colina. 160 calorias por porção.",
    benefits: "Desenvolvimento cerebral, saciedade prolongada, fortalece músculos e é refeição rápida.",
    tips: "Cozinhe em fogo baixo para ficar macio. Pode adicionar espinafre picado. Sirva com pão.",
    allergens: "Contém ovo e lactose. Observar alergias.",
    variations: "Adicione brócolis, cenoura ralada, ou presunto picado.",
  },
  {
    id: 19,
    title: "Pão de Queijo Caseiro",
    category: "Lanches Rápidos",
    ageRange: "2+ anos",
    time: "40 minutos",
    image: "/images/pao-queijo-caseiro.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 xícara de polvilho azedo",
      "1/2 xícara de leite",
      "2 colheres de óleo",
      "1 ovo",
      "1/2 xícara de queijo ralado",
      "Sal",
    ],
    instructions: [
      "Ferva o leite com óleo e sal",
      "Despeje sobre o polvilho, misture bem",
      "Deixe esfriar e adicione ovo",
      "Misture o queijo ralado",
      "Modele bolinhas pequenas",
      "Asse a 180°C por 25-30 minutos",
    ],
    nutrition: "Carboidratos, cálcio e proteínas. 110 calorias por unidade.",
    benefits: "Sem glúten, fornece energia, desenvolve mastigação e é culturalmente brasileiro.",
    tips: "Pode congelar cru e assar direto. Ficam crocantes por fora e macios por dentro.",
    allergens: "Contém lactose e ovo. Sem glúten naturalmente.",
    variations: "Adicione ervas, use queijo parmesão, ou recheie com carne desfiada.",
  },
  {
    id: 20,
    title: "Risoto de Abóbora",
    category: "Jantar",
    ageRange: "12-24 meses",
    time: "45 minutos",
    image: "/images/risoto-abobora.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 xícara de arroz arbóreo",
      "2 xícaras de abóbora em cubos",
      "500ml de caldo de legumes",
      "1 cebola",
      "2 colheres de queijo ralado",
      "Azeite",
    ],
    instructions: [
      "Refogue a cebola no azeite",
      "Adicione o arroz e torre por 2 minutos",
      "Adicione a abóbora cozida amassada",
      "Vá adicionando o caldo aos poucos",
      "Mexa sempre até o arroz ficar cremoso (20 min)",
      "Finalize com queijo ralado",
    ],
    nutrition: "Carboidratos, vitamina A, cálcio e fibras. 200 calorias por porção.",
    benefits: "Refeição completa, cremoso e saboroso, rico em nutrientes, desenvolve paladar.",
    tips: "Paciência no preparo é essencial. Pode adicionar frango desfiado. Sirva imediatamente.",
    allergens: "Contém lactose. Pode substituir por creme de castanhas.",
    variations: "Use beterraba, cenoura, ou cogumelos para variar.",
  },
  {
    id: 21,
    title: "Muffin de Cenoura",
    category: "Sobremesas Saudáveis",
    ageRange: "2+ anos",
    time: "35 minutos",
    image: "/images/muffin-cenoura.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "1 xícara de cenoura ralada",
      "1 ovo",
      "1/2 xícara de óleo",
      "1 xícara de farinha integral",
      "1/2 xícara de açúcar mascavo",
      "1 colher de fermento",
    ],
    instructions: [
      "Bata ovo, óleo e açúcar",
      "Adicione cenoura ralada",
      "Misture farinha e fermento",
      "Incorpore delicadamente",
      "Distribua em forminhas de muffin",
      "Asse a 180°C por 20-25 minutos",
    ],
    nutrition: "Carboidratos, vitamina A, fibras e gorduras saudáveis. 130 calorias por muffin.",
    benefits: "Esconde vegetais, é porção individual, fornece energia e desenvolve autonomia.",
    tips: "Pode substituir açúcar por banana. Congela bem. Ótimo para festas infantis.",
    allergens: "Contém glúten e ovo. Usar farinha de aveia como alternativa.",
    variations: "Adicione uva passa, nozes picadas, ou gotas de chocolate 70%.",
  },
  {
    id: 22,
    title: "Espaguete de Abobrinha",
    category: "Jantar",
    ageRange: "12-24 meses",
    time: "20 minutos",
    image: "/images/espaguete-abobrinha.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "2 abobrinhas médias",
      "2 tomates",
      "1 dente de alho",
      "2 colheres de azeite",
      "Queijo ralado",
      "Manjericão",
    ],
    instructions: [
      'Use um cortador espiral para fazer o "macarrão"',
      "Refogue o alho no azeite",
      "Adicione tomates picados",
      "Cozinhe por 10 minutos",
      "Adicione a abobrinha e refogue por 3 minutos",
      "Finalize com queijo e manjericão",
    ],
    nutrition: "Baixo em calorias, rico em vitaminas C e A, fibras e minerais. 85 calorias por porção.",
    benefits: "Alternativa low-carb, aumenta consumo de vegetais, leve e nutritivo, sem glúten.",
    tips: "Não cozinhe demais a abobrinha. Use cortador espiral ou descascador. Sirva imediatamente.",
    allergens: "Contém lactose no queijo. Pode omitir.",
    variations: "Use molho branco, adicione frango, ou misture com camarão.",
  },
  {
    id: 23,
    title: "Smoothie de Frutas",
    category: "Café da Tarde",
    ageRange: "12-24 meses",
    time: "5 minutos",
    image: "/images/smoothie-frutas.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: [
      "1 banana congelada",
      "1/2 xícara de morango",
      "1/2 xícara de iogurte natural",
      "2 colheres de aveia",
      "100ml de leite",
    ],
    instructions: [
      "Congele a banana previamente em rodelas",
      "Coloque todos ingredientes no liquidificador",
      "Bata até ficar homogêneo e cremoso",
      "Ajuste consistência com mais leite se necessário",
      "Sirva imediatamente",
      "Pode decorar com frutas frescas",
    ],
    nutrition: "Proteínas, cálcio, vitaminas, fibras e antioxidantes. 150 calorias por copo.",
    benefits: "Hidratação, refeição rápida, esconde ingredientes saudáveis, refrescante.",
    tips: "Banana congelada dá cremosidade. Pode adicionar espinafre sem alterar sabor. Use canudo largo.",
    allergens: "Contém lactose. Substituir por leite vegetal se necessário.",
    variations: "Use açaí, adicione cacau, ou coloque manteiga de amendoim.",
  },
  {
    id: 24,
    title: "Croquete de Batata",
    category: "Lanches para Escola",
    ageRange: "2+ anos",
    time: "40 minutos",
    image: "/images/croquete-batata.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "3 batatas cozidas",
      "100g de carne moída cozida",
      "1 ovo",
      "1/2 xícara de farinha de rosca",
      "Sal e temperos",
    ],
    instructions: [
      "Amasse bem as batatas cozidas",
      "Misture com a carne moída temperada",
      "Modele croquetes em formato oval",
      "Passe no ovo batido",
      "Empane na farinha de rosca",
      "Asse a 200°C por 25 minutos",
    ],
    nutrition: "Carboidratos, proteínas, ferro e vitaminas do complexo B. 120 calorias por unidade.",
    benefits: "Lanche prático, combina carboidrato e proteína, fácil de transportar, saboroso.",
    tips: "Pode fritar em pouco óleo ou assar. Congela muito bem. Ideal para festas.",
    allergens: "Contém glúten e ovo. Usar farinha de mandioca como alternativa.",
    variations: "Recheie com queijo, use frango desfiado, ou adicione legumes picados.",
  },
  {
    id: 25,
    title: "Sopa de Legumes",
    category: "Jantar",
    ageRange: "8+ meses",
    time: "35 minutos",
    image: "/images/sopa-legumes.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "1 batata",
      "1 cenoura",
      "1 chuchu",
      "1/2 xícara de abóbora",
      "1 tomate",
      "1 dente de alho",
      "500ml de água",
      "Azeite",
    ],
    instructions: [
      "Pique todos os legumes em cubos",
      "Refogue o alho no azeite",
      "Adicione todos os legumes",
      "Cubra com água e cozinhe por 25 minutos",
      "Amasse alguns legumes para engrossar",
      "Sirva morno com azeite por cima",
    ],
    nutrition: "Vitaminas A, C, fibras e minerais diversos. 90 calorias por porção.",
    benefits: "Hidratação, fácil digestão, nutritiva, aquece e conforta.",
    tips: "Varie os legumes sazonais. Pode bater parte no liquidificador. Congela bem.",
    allergens: "Livre de alergênicos comuns. Ideal para bebês doentes.",
    variations: "Adicione macarrão, feijão, ou carne desfiada.",
  },
  {
    id: 26,
    title: "Pudim de Chia",
    category: "Sobremesas Saudáveis",
    ageRange: "12-24 meses",
    time: "10 minutos + 2h geladeira",
    image: "/images/pudim-chia.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: [
      "3 colheres de chia",
      "200ml de leite",
      "1/2 banana madura",
      "1 colher de cacau",
      "Frutas para decorar",
    ],
    instructions: [
      "Amasse bem a banana",
      "Misture com leite e cacau",
      "Adicione as sementes de chia",
      "Mexa bem e leve à geladeira",
      "Deixe por pelo menos 2 horas",
      "Sirva com frutas frescas picadas",
    ],
    nutrition: "Ômega-3, cálcio, proteínas, fibras e antioxidantes. 130 calorias por porção.",
    benefits: "Saúde cerebral, regula intestino, saciedade, sem cozimento.",
    tips: "Pode preparar na noite anterior. Adicione mel (após 1 ano). Varia consistência com leite.",
    allergens: "Contém lactose. Usar leite vegetal como alternativa.",
    variations: "Use leite de coco, adicione manga, ou polvilhe coco ralado.",
  },
  {
    id: 27,
    title: "Torta de Frango",
    category: "Lanches para Escola",
    ageRange: "2+ anos",
    time: "50 minutos",
    image: "/images/torta-frango.jpg",
    difficulty: "Difícil",
    isPremium: true,
    ingredients: [
      "2 xícaras de farinha",
      "1 ovo",
      "1/2 xícara de óleo",
      "1 colher de fermento",
      "Recheio: frango, tomate, milho, creme de leite",
    ],
    instructions: [
      "Bata no liquidificador ovo, óleo, leite e sal",
      "Misture farinha e fermento",
      "Divida a massa em duas partes",
      "Forre forma com metade da massa",
      "Adicione recheio de frango temperado",
      "Cubra com restante da massa e asse 35 min a 180°C",
    ],
    nutrition: "Carboidratos, proteínas, cálcio e vitaminas. 220 calorias por fatia.",
    benefits: "Refeição completa, prática para viagem, agrada crianças, rende bastante.",
    tips: "Pode congelar em fatias. Varia recheio conforme preferência. Sirva com salada.",
    allergens: "Contém glúten, ovo e lactose. Versões sem alergênicos possíveis.",
    variations: "Recheio de carne moída, atum, ou legumes.",
  },
  {
    id: 28,
    title: "Tapioca Recheada",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "15 minutos",
    image: "/images/tapioca-recheada.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["1/2 xícara de tapioca hidratada", "Recheio: queijo, banana ou frango"],
    instructions: [
      "Aqueça frigideira antiaderente",
      "Espalhe a tapioca formando círculo",
      "Espere firmar (1-2 minutos)",
      "Adicione recheio de sua escolha",
      "Dobre ao meio",
      "Sirva imediatamente",
    ],
    nutrition: "Carboidratos de rápida absorção, energia imediata. 120 calorias.",
    benefits: "Sem glúten, versátil, rápida, aceita recheios doces e salgados.",
    tips: "Use fogo médio-baixo. Não deixe queimar. Sirva quentinha.",
    allergens: "Sem glúten naturalmente. Atenção ao recheio escolhido.",
    variations: "Recheio de pasta de amendoim, queijo com tomate, ou ovo mexido.",
  },
  {
    id: 29,
    title: "Almôndegas de Carne",
    category: "Almoço",
    ageRange: "12-24 meses",
    time: "35 minutos",
    image: "/images/almondegas-carne.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "300g de carne moída",
      "1 ovo",
      "2 colheres de aveia",
      "1 cebola pequena",
      "Sal e temperos",
      "Molho de tomate",
    ],
    instructions: [
      "Misture carne, ovo, aveia e temperos",
      "Modele bolinhas pequenas",
      "Doure em frigideira com azeite",
      "Prepare molho de tomate caseiro",
      "Adicione as almôndegas ao molho",
      "Cozinhe por 15 minutos em fogo baixo",
    ],
    nutrition: "Proteínas, ferro, zinco e vitaminas do complexo B. 150 calorias por porção.",
    benefits: "Fonte de ferro, fácil mastigação, prática, combina com diversos acompanhamentos.",
    tips: "Pode assar em vez de fritar. Congela muito bem. Sirva com purê ou macarrão.",
    allergens: "Contém ovo. Aveia pode ter traços de glúten.",
    variations: "Use carne de frango, adicione queijo ralado, ou misture legumes picados.",
  },
  {
    id: 30,
    title: "Nhoque de Abóbora",
    category: "Jantar",
    ageRange: "2+ anos",
    time: "60 minutos",
    image: "/images/nhoque-abobora.jpg",
    difficulty: "Difícil",
    isPremium: true,
    ingredients: [
      "2 xícaras de abóbora cozida",
      "2 xícaras de farinha de trigo",
      "1 ovo",
      "1 pitada de sal",
      "Queijo ralado",
    ],
    instructions: [
      "Amasse bem a abóbora cozida",
      "Misture com ovo e sal",
      "Adicione farinha aos poucos até dar ponto",
      "Faça rolinhos e corte em pedaços",
      "Marque com garfo",
      "Cozinhe em água fervente até boiar",
      "Sirva com molho de sua preferência",
    ],
    nutrition: "Carboidratos, vitamina A, fibras e proteínas. 180 calorias por porção.",
    benefits: "Colorido e atrativo, nutritivo, desenvolve habilidades motoras, caseiro.",
    tips: "Não adicione muita farinha. Pode congelar cru. Envolva a criança no preparo.",
    allergens: "Contém glúten e ovo. Usar farinha sem glúten como alternativa.",
    variations: "Nhoque de batata, batata-doce, ou mandioquinha.",
  },
  {
    id: 31,
    title: "Bolo de Banana",
    category: "Sobremesas Saudáveis",
    ageRange: "2+ anos",
    time: "45 minutos",
    image: "/images/bolo-banana.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "3 bananas maduras",
      "2 ovos",
      "1/2 xícara de óleo",
      "1 xícara de açúcar mascavo",
      "2 xícaras de farinha integral",
      "1 colher de fermento",
      "Canela",
    ],
    instructions: [
      "Amasse bem as bananas",
      "Bata com ovos, óleo e açúcar",
      "Adicione farinha, fermento e canela",
      "Misture delicadamente",
      "Despeje em forma untada",
      "Asse a 180°C por 35-40 minutos",
    ],
    nutrition: "Carboidratos, fibras, potássio e energia. 180 calorias por fatia.",
    benefits: "Sem açúcar refinado, usa frutas maduras, integral, caseiro e econômico.",
    tips: "Bananas maduras deixam mais doce. Pode adicionar nozes. Dura 3 dias em pote.",
    allergens: "Contém glúten e ovo. Versões sem alergênicos possíveis.",
    variations: "Adicione cacau, gotas de chocolate, ou pasta de amendoim.",
  },
  {
    id: 32,
    title: "Arroz com Brócolis",
    category: "Almoço",
    ageRange: "12-24 meses",
    time: "30 minutos",
    image: "/images/arroz-brocolis.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "1 xícara de arroz",
      "1 xícara de brócolis picado",
      "1 dente de alho",
      "2 colheres de azeite",
      "Queijo ralado",
      "Sal",
    ],
    instructions: [
      "Cozinhe o arroz normalmente",
      "Cozinhe o brócolis no vapor",
      "Refogue alho no azeite",
      "Misture arroz e brócolis",
      "Adicione queijo ralado",
      "Mexa bem e sirva",
    ],
    nutrition: "Carboidratos, cálcio, ferro, vitaminas C e K. 160 calorias por porção.",
    benefits: "Refeição completa, esconde vegetais, fácil preparo, nutritivo.",
    tips: "Pode usar couve-flor. Adicione frango para proteína. Congela bem.",
    allergens: "Contém lactose no queijo. Pode omitir.",
    variations: "Use cenoura, adicione ervilha, ou misture com ovo mexido.",
  },
  {
    id: 33,
    title: "Crepioca",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "10 minutos",
    image: "/images/crepioca.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["1 ovo", "2 colheres de tapioca", "Recheio a escolher"],
    instructions: [
      "Bata o ovo em uma tigela",
      "Adicione a tapioca e misture",
      "Deixe hidratar por 2 minutos",
      "Despeje em frigideira quente",
      "Adicione recheio quando firmar",
      "Dobre e sirva",
    ],
    nutrition: "Proteínas, carboidratos e energia. 140 calorias.",
    benefits: "Rica em proteínas, sem glúten, rápida, versátil.",
    tips: "Use fogo médio. Recheios variados. Sirva imediatamente.",
    allergens: "Contém ovo. Atenção ao recheio escolhido.",
    variations: "Recheio de queijo, frango, ou banana com canela.",
  },
  {
    id: 34,
    title: "Batata Rostizada",
    category: "Lanches Rápidos",
    ageRange: "12-24 meses",
    time: "40 minutos",
    image: "/images/batata-rostizada.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["3 batatas médias", "3 colheres de azeite", "Sal e ervas", "Páprica doce"],
    instructions: [
      "Lave bem as batatas",
      "Corte em palitos grossos",
      "Tempere com azeite, sal e ervas",
      "Disponha em assadeira",
      "Asse a 200°C por 35 minutos",
      "Vire na metade do tempo",
    ],
    nutrition: "Carboidratos, potássio, vitamina C e fibras. 150 calorias por porção.",
    benefits: "Assada (mais saudável), crocante, fácil de segurar, energia.",
    tips: "Seque bem antes de temperar. Não amontoe na assadeira. Sirva quente.",
    allergens: "Livre de alergênicos comuns.",
    variations: "Use batata-doce, adicione parmesão, ou tempere com alecrim.",
  },
  {
    id: 35,
    title: "Quibe Assado",
    category: "Jantar",
    ageRange: "2+ anos",
    time: "55 minutos",
    image: "/images/quibe-assado-kids.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "2 xícaras de trigo para quibe",
      "500g de carne moída",
      "1 cebola",
      "Hortelã",
      "Sal e temperos",
      "Azeite",
    ],
    instructions: [
      "Deixe o trigo de molho por 30 minutos",
      "Tempere a carne e reserve metade",
      "Misture trigo com metade da carne",
      "Forre forma untada com essa mistura",
      "Adicione a carne temperada como recheio",
      "Cubra com restante da massa",
      "Corte em losangos e asse 40 min a 180°C",
    ],
    nutrition: "Proteínas, ferro, fibras e carboidratos. 200 calorias por porção.",
    benefits: "Refeição tradicional, rica em ferro, sacia bem, agrada a família.",
    tips: "Molhe bem o trigo. Pode fazer recheio vegetariano. Congela assado.",
    allergens: "Contém glúten. Versão sem glúten com quinoa.",
    variations: "Quibe de forno vegano, quibe de abóbora, ou mini quibes.",
  },
  {
    id: 36,
    title: "Vitamina de Abacate",
    category: "Café da Tarde",
    ageRange: "12-24 meses",
    time: "5 minutos",
    image: "/images/vitamina-abacate.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: ["1/2 abacate maduro", "200ml de leite", "1 banana", "1 colher de mel (após 1 ano)"],
    instructions: [
      "Corte o abacate ao meio",
      "Retire a polpa com colher",
      "Coloque no liquidificador com demais ingredientes",
      "Bata até ficar cremoso",
      "Ajuste doçura se necessário",
      "Sirva gelado",
    ],
    nutrition: "Gorduras saudáveis, vitaminas E e K, fibras e potássio. 180 calorias.",
    benefits: "Saúde cerebral, saciedade, cremoso, nutriente denso.",
    tips: "Abacate maduro é essencial. Sirva imediatamente. Sem açúcar se possível.",
    allergens: "Contém lactose. Usar leite vegetal como alternativa.",
    variations: "Adicione cacau, use leite de coco, ou misture com manga.",
  },
  {
    id: 37,
    title: "Torradas com Pasta",
    category: "Lanches Criativos",
    ageRange: "12-24 meses",
    time: "10 minutos",
    image: "/images/torradas-pasta-bebe.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["2 fatias de pão integral", "Pasta de abacate ou homus", "Tomate cereja", "Queijo cottage"],
    instructions: [
      "Toste levemente o pão",
      "Espalhe a pasta escolhida",
      "Decore com tomate em rodelas",
      "Adicione queijo cottage",
      "Corte em tiras ou quadrados",
      "Sirva fresco",
    ],
    nutrition: "Carboidratos, proteínas, fibras e gorduras saudáveis. 120 calorias.",
    benefits: "Finger food, apresentação atrativa, balanceado, prático.",
    tips: "Use formas divertidas para cortar. Envolva criança na montagem. Varie toppings.",
    allergens: "Contém glúten e lactose. Usar pão sem glúten se necessário.",
    variations: "Pasta de amendoim, ricota com ervas, ou cream cheese com pepino.",
  },
  {
    id: 38,
    title: "Salada de Frutas",
    category: "Sobremesas Saudáveis",
    ageRange: "12-24 meses",
    time: "10 minutos",
    image: "/images/salada-frutas-bebe.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: ["1 banana", "1 maçã", "5 morangos", "1/2 manga", "Suco de 1 laranja", "Hortelã"],
    instructions: [
      "Lave bem todas as frutas",
      "Descasque e corte em cubos pequenos",
      "Misture em uma tigela",
      "Regue com suco de laranja",
      "Decore com folhas de hortelã",
      "Sirva fresco ou gelado",
    ],
    nutrition: "Vitaminas C, A, fibras e antioxidantes. 80 calorias por porção.",
    benefits: "Hidratante, colorida, diversidade de nutrientes, refrescante.",
    tips: "Use frutas da estação. Sirva logo após preparo. Sem açúcar adicionado.",
    allergens: "Frutas cítricas podem causar irritação. Observar reações.",
    variations: "Adicione iogurte, granola, ou coco ralado.",
  },
  {
    id: 39,
    title: "Batata-doce no Forno",
    category: "Lanches Rápidos",
    ageRange: "8+ meses",
    time: "45 minutos",
    image: "/images/batata-doce-forno.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["2 batatas-doces médias", "1 colher de azeite", "Canela em pó (opcional)"],
    instructions: [
      "Lave bem as batatas",
      "Seque e faça furos com garfo",
      "Pincele com azeite",
      "Embrulhe em papel alumínio",
      "Asse a 200°C por 40-45 minutos",
      "Teste com garfo se estão macias",
    ],
    nutrition: "Carboidratos complexos, vitamina A, fibras e potássio. 100 calorias.",
    benefits: "Fácil digestão, energia prolongada, naturalmente doce, portátil.",
    tips: "Escolha batatas médias. Pode assar com casca. Sirva amassada ou em pedaços.",
    allergens: "Livre de alergênicos. Ideal para todos.",
    variations: "Recheie com frango, sirva com manteiga, ou polvilhe canela.",
  },
  {
    id: 40,
    title: "Iogurte com Frutas",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "5 minutos",
    image: "/images/iogurte-frutas-bebe.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: [
      "1 pote de iogurte natural",
      "1/2 banana",
      "3 morangos",
      "1 colher de granola",
      "Mel (opcional, após 1 ano)",
    ],
    instructions: [
      "Coloque o iogurte em uma tigela",
      "Pique as frutas em pedaços pequenos",
      "Distribua sobre o iogurte",
      "Adicione a granola",
      "Se desejar, regue com mel",
      "Sirva imediatamente",
    ],
    nutrition: "Proteínas, cálcio, probióticos e vitaminas. 150 calorias.",
    benefits: "Saúde intestinal, cálcio para ossos, rápido, versátil.",
    tips: "Use iogurte integral natural. Varie frutas sazonais. Prepare na frente da criança.",
    allergens: "Contém lactose. Usar iogurte vegetal como alternativa.",
    variations: "Adicione chia, aveia, ou pasta de amendoim.",
  },
  {
    id: 41,
    title: "Bolinho de Chuva Integral",
    category: "Lanches Criativos",
    ageRange: "2+ anos",
    time: "20 minutos",
    image: "/images/bolinho-chuva-integral.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "1 xícara de farinha integral",
      "1 ovo",
      "1/2 xícara de leite",
      "1 colher de açúcar",
      "1 colher de fermento",
      "Canela",
    ],
    instructions: [
      "Misture todos os ingredients",
      "Deixe descansar por 5 minutos",
      "Aqueça óleo em panela funda",
      "Frite colheradas da massa",
      "Retire quando dourarem",
      "Polvilhe canela e açúcar",
    ],
    nutrition: "Carboidratos, proteínas e fibras. 110 calorias por bolinho.",
    benefits: "Lanche tradicional, versão integral, agrada crianças, rende bem.",
    tips: "Pode assar em vez de fritar. Use açúcar mascavo. Sirva quentinho.",
    allergens: "Contém glúten, ovo e lactose.",
    variations: "Adicione banana na massa, use farinha de aveia, ou recheie com goiabada.",
  },
  {
    id: 42,
    title: "Pizza Caseira",
    category: "Jantar",
    ageRange: "2+ anos",
    time: "40 minutos",
    image: "/images/pizza-caseira-kids.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "2 xícaras de farinha",
      "1 ovo",
      "1/2 xícara de leite",
      "1 colher de fermento",
      "Molho de tomate",
      "Queijo",
      "Ingredientes a escolher",
    ],
    instructions: [
      "Misture farinha, ovo, leite e fermento",
      "Deixe descansar por 15 minutos",
      "Abra a massa em forma untada",
      "Espalhe molho de tomate",
      "Adicione queijo e ingredientes",
      "Asse a 200°C por 20 minutos",
    ],
    nutrition: "Carboidratos, proteínas, cálcio e vegetais. 200 calorias por fatia.",
    benefits: "Refeição divertida, envolve criança, balanceada, versátil.",
    tips: "Deixe criança escolher ingredientes. Massa rápida sem crescimento. Mini pizzas individuais.",
    allergens: "Contém glúten, ovo e lactose.",
    variations: "Pizza de legumes, frango com catupiry, ou margherita.",
  },
  {
    id: 43,
    title: "Mousse de Manga",
    category: "Sobremesas Saudáveis",
    ageRange: "12-24 meses",
    time: "15 minutos + geladeira",
    image: "/images/mousse-manga-bebe.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "2 mangas maduras",
      "1 caixinha de creme de leite",
      "1 xícara de iogurte natural",
      "Gelatina incolor (opcional)",
    ],
    instructions: [
      "Descasque e corte as mangas",
      "Bata no liquidificador com creme e iogurte",
      "Se usar gelatina, dissolva e adicione",
      "Bata até ficar homogêneo",
      "Distribua em potinhos",
      "Leve à geladeira por 3 horas",
    ],
    nutrition: "Vitaminas A e C, cálcio e proteínas. 120 calorias por porção.",
    benefits: "Cremoso, frutas, gelado, apresentação especial.",
    tips: "Mangas bem maduras são mais doces. Pode decorar com manga em cubos. Dura 3 dias.",
    allergens: "Contém lactose. Versão vegana com creme de coco.",
    variations: "Mousse de morango, abacate, ou maracujá.",
  },
  {
    id: 44,
    title: "Nuggets Caseiros",
    category: "Lanches para Escola",
    ageRange: "2+ anos",
    time: "35 minutos",
    image: "/images/nuggets-caseiros.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: ["500g de peito de frango", "1 ovo", "1 xícara de farinha de rosca", "Sal e temperos"],
    instructions: [
      "Corte o frango em cubos",
      "Tempere conforme preferência",
      "Passe no ovo batido",
      "Empane na farinha de rosca",
      "Disponha em assadeira",
      "Asse a 200°C por 25 minutos, virando na metade",
    ],
    nutrition: "Proteínas magras, baixa gordura. 140 calorias por porção.",
    benefits: "Versão saudável, sem fritura, caseiro, controle de ingredientes.",
    tips: "Pode fritar em pouco óleo. Congela cru ou assado. Molhos naturais acompanham.",
    allergens: "Contém glúten e ovo. Usar farinha de mandioca sem ovo.",
    variations: "Nuggets de peixe, vegetariano de grão-de-bico, ou de queijo.",
  },
  {
    id: 45,
    title: "Wrap de Frango",
    category: "Almoço",
    ageRange: "2+ anos",
    time: "20 minutos",
    image: "/images/wrap-frango-kids.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: [
      "1 tortilha integral",
      "100g de frango desfiado",
      "Alface",
      "Tomate",
      "Cenoura ralada",
      "Iogurte natural",
    ],
    instructions: [
      "Aqueça levemente a tortilha",
      "Espalhe iogurte como molho",
      "Distribua frango e vegetais",
      "Enrole firmemente",
      "Corte ao meio",
      "Sirva imediatamente",
    ],
    nutrition: "Proteínas, fibras, vitaminas e minerais. 180 calorias.",
    benefits: "Portátil, completo, vegetais escondidos, prático para escola.",
    tips: "Embrulhe em papel alumínio. Varie recheios. Prepare na noite anterior.",
    allergens: "Contém glúten e lactose. Usar tortilha sem glúten.",
    variations: "Wrap vegetariano, de atum, ou de carne moída.",
  },
  {
    id: 46,
    title: "Barrinhas de Cereal Caseiras",
    category: "Lanches para Escola",
    ageRange: "2+ anos",
    time: "30 minutos",
    image: "/images/barrinhas-cereal-caseiras.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "2 xícaras de aveia",
      "1/2 xícara de mel",
      "1/2 xícara de pasta de amendoim",
      "1/4 xícara de frutas secas",
      "Sementes",
    ],
    instructions: [
      "Aqueça mel e pasta de amendoim",
      "Misture com aveia, frutas e sementes",
      "Aperte bem em forma forrada",
      "Leve à geladeira por 2 horas",
      "Corte em barras",
      "Embrulhe individualmente",
    ],
    nutrition: "Carboidratos, proteínas, fibras e gorduras saudáveis. 130 calorias.",
    benefits: "Energia prolongada, portátil, sem conservantes, caseiro.",
    tips: "Pressione bem para não desmanchar. Dura 1 semana. Congela bem.",
    allergens: "Contém amendoim e aveia. Mel apenas após 1 ano.",
    variations: "Use pasta de girassol, adicione chocolate 70%, ou coco ralado.",
  },
  {
    id: 47,
    title: "Purê de Beterraba com Maçã",
    category: "Papinhas",
    ageRange: "8+ meses",
    time: "25 minutos",
    image: "/images/pure-beterraba-maca-bebe.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["1 beterraba média", "1 maçã", "1 colher de azeite", "100ml de água"],
    instructions: [
      "Cozinhe a beterraba até ficar macia",
      "Descasque e corte em cubos",
      "Descasque e pique a maçã",
      "Cozinhe juntas por 10 minutos",
      "Amasse ou bata até consistência desejada",
      "Adicione azeite",
    ],
    nutrition: "Rica em ferro, ácido fólico, vitamina C e fibras. 70 calorias.",
    benefits: "Previne anemia, cor atrativa, naturalmente doce, nutritiva.",
    tips: "Maçã equilibra sabor terroso. Pode manchar. Use luvas ao manusear.",
    allergens: "Livre de alergênicos. Pode causar fezes avermelhadas (normal).",
    variations: "Adicione laranja, combine com cenoura, ou misture com iogurte.",
  },
  {
    id: 48,
    title: "Ovos Mexidos com Tomate",
    category: "Café da Manhã",
    ageRange: "12-24 meses",
    time: "10 minutos",
    image: "/images/ovos-mexidos-tomate-bebe.jpg",
    difficulty: "Fácil",
    isPremium: true,
    ingredients: ["2 ovos", "1 tomate pequeno", "1 colher de azeite", "Sal", "Cebolinha"],
    instructions: [
      "Bata os ovos levemente",
      "Pique o tomate em cubos pequenos",
      "Aqueça azeite em frigideira",
      "Adicione tomate e refogue",
      "Despeje os ovos e mexa em fogo baixo",
      "Finalize com cebolinha picada",
    ],
    nutrition: "Proteínas completas, vitaminas A e D, licopeno. 150 calorias.",
    benefits: "Proteína de alta qualidade, rápido, econômico, versátil.",
    tips: "Cozinhe em fogo baixo para ficar cremoso. Não deixe secar demais.",
    allergens: "Contém ovo. Principal alergênico infantil.",
    variations: "Adicione queijo, espinafre, ou cogumelos picados.",
  },
  {
    id: 49,
    title: "Smoothie de Manga com Aveia",
    category: "Café da Tarde",
    ageRange: "12-24 meses",
    time: "5 minutos",
    image: "/images/smoothie-manga-aveia.jpg",
    difficulty: "Muito Fácil",
    isPremium: true,
    ingredients: ["1 manga madura", "2 colheres de aveia", "150ml de leite", "1/2 banana", "Gelo"],
    instructions: [
      "Descasque e corte a manga",
      "Coloque todos ingredientes no liquidificador",
      "Bata até ficar homogêneo",
      "Ajuste consistência com leite",
      "Adicione gelo se desejar",
      "Sirva imediatamente",
    ],
    nutrition: "Vitaminas, fibras, carboidratos e cálcio. 160 calorias.",
    benefits: "Refeição líquida completa, refrescante, energético, colorido.",
    tips: "Manga congelada deixa mais cremoso. Aveia adiciona saciedade. Use canudo grosso.",
    allergens: "Contém lactose e aveia. Substituir leite se necessário.",
    variations: "Adicione espinafre, chia, ou proteína em pó.",
  },
  {
    id: 50,
    title: "Granola Caseira sem Açúcar",
    category: "Café da Manhã",
    ageRange: "2+ anos",
    time: "40 minutos",
    image: "/images/granola-caseira.jpg",
    difficulty: "Média",
    isPremium: true,
    ingredients: [
      "2 xícaras de aveia",
      "1/2 xícara de castanhas picadas",
      "1/4 xícara de coco ralado",
      "1/4 xícara de mel",
      "2 colheres de óleo de coco",
      "Frutas secas",
    ],
    instructions: [
      "Misture aveia, castanhas e coco",
      "Aqueça mel e óleo até derreter",
      "Despeje sobre os secos e misture bem",
      "Espalhe em assadeira forrada",
      "Asse a 160°C por 30 min, mexendo 2x",
      "Deixe esfriar e adicione frutas secas",
    ],
    nutrition: "Fibras, gorduras saudáveis, proteínas e minerais. 140 calorias por porção.",
    benefits: "Sem açúcar refinado, crocante, caseiro, versátil.",
    tips: "Assa pouco a pouco para não queimar. Guarde em pote hermético. Dura 2 semanas.",
    allergens: "Contém castanhas e aveia. Mel apenas após 1 ano.",
    variations: "Use xarope de bordo, adicione sementes, ou chocolate 70%.",
  },
]

export default function PequenoPratoClient({ initialPlan, initialUser }: { initialPlan: string; initialUser: any }) {
  const [currentPage, setCurrentPage] = useState("home") // Changed default to home
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedAge, setSelectedAge] = useState("Todas")
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [userPlan, setUserPlan] = useState(initialPlan)
  const [userPoints, setUserPoints] = useState(0)
  const [completedRecipes, setCompletedRecipes] = useState<number[]>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
  }

  const toggleRecipeCompletion = (recipeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCompletedRecipes((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId)
      } else {
        setUserPoints((p) => p + 10) // Award points for completing recipe
        return [...prev, recipeId]
      }
    })
  }

  const toggleRecipeLike = (recipeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedRecipes((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId)
      } else {
        return [...prev, recipeId]
      }
    })
  }

  const getAccessibleRecipes = () => {
    if (userPlan === "premium" || userPlan === "essential") {
      return ALL_RECIPES
    } else {
      return ALL_RECIPES.slice(0, 10)
    }
  }

  const accessibleRecipes = getAccessibleRecipes()

  const filteredRecipes = ALL_RECIPES.filter((recipe) => {
    const categoryMatch = selectedCategory === "Todos" || recipe.category === selectedCategory
    const ageMatch = selectedAge === "Todas" || recipe.ageRange === selectedAge
    return categoryMatch && ageMatch
  })

  const visibleRecipes = filteredRecipes.filter((recipe) => accessibleRecipes.some((ar) => ar.id === recipe.id))
  const lockedRecipes = filteredRecipes.filter((recipe) => !accessibleRecipes.some((ar) => ar.id === recipe.id))

  const getBadge = () => {
    if (userPlan === "premium")
      return {
        icon: <Crown className="w-4 h-4" />,
        text: "Premium",
        color: "bg-amber-500",
        canAccessPremium: true,
        canAccessRecipe: (recipe: any) => true,
      }
    if (userPlan === "essential")
      return {
        icon: <Check className="w-4 h-4" />,
        text: "Essencial",
        color: "bg-blue-500",
        canAccessPremium: false,
        canAccessRecipe: (recipe: any) => !recipe.isPremium,
      }
    return {
      icon: <User className="w-4 h-4" />,
      text: "Gratuito",
      color: "bg-gray-400",
      canAccessPremium: false,
      canAccessRecipe: (recipe: any) => !recipe.isPremium,
    }
  }

  const badge = getBadge()

  // Helper function to rename toggleRecipeLike and toggleRecipeCompletion for consistency
  const toggleLike = (recipeId: number) => {
    setLikedRecipes((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId)
      } else {
        return [...prev, recipeId]
      }
    })
  }

  const markAsDone = (recipeId: number) => {
    setCompletedRecipes((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId)
      } else {
        setUserPoints((p) => p + 10) // Award points for completing recipe
        return [...prev, recipeId]
      }
    })
  }

  // Helper function for handling recipe clicks
  const handleRecipeClick = (recipe: any) => {
    if (badge.canAccessRecipe(recipe)) {
      setSelectedRecipe(recipe)
    } else {
      router.push("/planos") // Redirect to upgrade page if recipe is premium and user is not premium
    }
  }

  // Re-define filteredRecipes to use the new category and age filters
  const updatedFilteredRecipes = ALL_RECIPES.filter((recipe) => {
    const categoryMatch =
      selectedCategory === "Todos" ||
      (selectedCategory === "Papinhas" && recipe.category === "Papinhas") ||
      (selectedCategory === "Refeições" && (recipe.category === "Almoço" || recipe.category === "Jantar")) ||
      (selectedCategory === "Lanches" &&
        (recipe.category === "Lanches Rápidos" ||
          recipe.category === "Lanches Criativos" ||
          recipe.category === "Lanches para Escola")) ||
      (selectedCategory === "Sobremesas" && recipe.category === "Sobremesas Saudáveis")

    const ageMatch = selectedAge === "Todas" || recipe.ageRange === selectedAge
    return categoryMatch && ageMatch
  })

  const recipesToDisplay = updatedFilteredRecipes.filter((recipe) => badge.canAccessRecipe(recipe))
  const premiumRecipes = updatedFilteredRecipes.filter((recipe) => !badge.canAccessRecipe(recipe))

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff9e6] via-[#d4eef9] to-[#ffe4f2] pb-24">
      <header className="bg-gradient-to-r from-[#a8d8ea] via-[#b5ead7] to-[#ffc9e3] text-white px-6 py-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm opacity-90 font-medium">✨ Pontos: {userPoints}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Plano:</span>
                <span className="font-bold text-lg">{badge.text}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-white/25 hover:bg-white/35 rounded-full transition-all font-medium backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {currentPage === "home" && (
          <div className="space-y-10">
            <div className="bg-gradient-to-r from-[#e6d5f7] to-[#ffc9e3] rounded-[2rem] p-10 text-white shadow-xl">
              <h1 className="text-5xl font-bold mb-4">Olá, Chef! 👋</h1>
              <p className="text-lg opacity-95 leading-relaxed">
                Bem-vindo ao Pequeno Prato, onde a alimentação saudável encontra a diversão!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[1.5rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-5 mb-2">
                  <div className="bg-gradient-to-br from-[#d9f4eb] to-[#b5ead7] p-4 rounded-[1.2rem]">
                    <UtensilsCrossed className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gray-800">{completedRecipes.length}</p>
                    <p className="text-sm text-gray-600 font-medium">Receitas Feitas</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-5 mb-2">
                  <div className="bg-gradient-to-br from-[#fff4cc] to-[#ff9800] p-4 rounded-[1.2rem]">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gray-800">{userPoints}</p>
                    <p className="text-sm text-gray-600 font-medium">Pontos Ganhos</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-5 mb-2">
                  <div className="bg-gradient-to-br from-[#d4eef9] to-[#a8d8ea] p-4 rounded-[1.2rem]">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gray-800">{badge.text}</p>
                    <p className="text-sm text-gray-600 font-medium">Seu Plano</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Receitas em Destaque</h2>
                <button
                  onClick={() => setCurrentPage("recipes")}
                  className="text-[#a8d8ea] hover:text-[#7ac5de] font-semibold text-sm"
                >
                  Ver todas →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accessibleRecipes.slice(0, 3).map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe)}
                    className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
                  >
                    <div className="relative h-52">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                      {recipe.isPremium && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ffd700] to-[#ffb347] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <Crown className="w-4 h-4" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-800">{recipe.title}</h3>
                      <div className="flex gap-2 flex-wrap mb-4">
                        <span className="bg-[#d9f4eb] text-[#2d5f4c] px-4 py-1.5 rounded-full text-xs font-semibold">
                          {recipe.ageRange}
                        </span>
                        <span className="bg-[#d4eef9] text-[#4a90a8] px-4 py-1.5 rounded-full text-xs font-semibold">
                          {recipe.time}
                        </span>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(recipe.id)
                          }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            likedRecipes.includes(recipe.id)
                              ? "bg-[#ffc9e3] text-white"
                              : "bg-[#ffe4f2] text-[#e67eb5] hover:bg-[#ffc9e3] hover:text-white"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedRecipes.includes(recipe.id) ? "fill-current" : ""}`} />
                          Curtir
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsDone(recipe.id)
                          }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            completedRecipes.includes(recipe.id)
                              ? "bg-[#b5ead7] text-white"
                              : "bg-[#d9f4eb] text-[#2d5f4c] hover:bg-[#b5ead7] hover:text-white"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          {completedRecipes.includes(recipe.id) ? "Feito!" : "Marcar"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas Rápidas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Dicas de Hoje</h2>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Introdução Alimentar</h3>
                    <p className="text-sm text-gray-700">
                      Sempre introduza um alimento novo por vez e observe por 3 dias para detectar possíveis alergias.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Variedade é Essencial</h3>
                    <p className="text-sm text-gray-700">
                      Ofereça diferentes cores e texturas para desenvolver o paladar e garantir nutrientes variados.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-yellow-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Paciência no Processo</h3>
                    <p className="text-sm text-gray-700">
                      Pode levar até 15 tentativas para uma criança aceitar um novo alimento. Não desista!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action para Upgrade */}
            {userPlan === "free" && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Crown className="w-12 h-12" />
                  <div>
                    <h2 className="text-2xl font-bold">Desbloqueie Mais Receitas!</h2>
                    <p className="text-white/90">Acesso ilimitado a todas as 50 receitas e novos conteúdos</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/planos")}
                  className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Ver Planos Premium
                </button>
              </div>
            )}
          </div>
        )}

        {currentPage === "recipes" && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Todas as Receitas</h1>

            <div className="flex gap-3 flex-wrap">
              {["Todos", "Papinhas", "Refeições", "Lanches", "Sobremesas"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-[#d4eef9] border-2 border-[#e8e3dd]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recipesToDisplay.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
                >
                  <div className="relative h-52">
                    <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                    {recipe.isPremium && !badge.canAccessRecipe(recipe) && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-white text-center">
                          <Lock className="w-12 h-12 mx-auto mb-3" />
                          <p className="font-bold text-sm">Premium</p>
                        </div>
                      </div>
                    )}
                    {recipe.isPremium && badge.canAccessRecipe(recipe) && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ffd700] to-[#ffb347] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Crown className="w-4 h-4" />
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{recipe.title}</h3>
                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="bg-[#d9f4eb] text-[#2d5f4c] px-4 py-1.5 rounded-full text-xs font-semibold">
                        {recipe.ageRange}
                      </span>
                      <span className="bg-[#d4eef9] text-[#4a90a8] px-4 py-1.5 rounded-full text-xs font-semibold">
                        {recipe.time}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(recipe.id)
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          likedRecipes.includes(recipe.id)
                            ? "bg-[#ffc9e3] text-white"
                            : "bg-[#ffe4f2] text-[#e67eb5] hover:bg-[#ffc9e3] hover:text-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedRecipes.includes(recipe.id) ? "fill-current" : ""}`} />
                        Curtir
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsDone(recipe.id)
                        }}
                        disabled={!badge.canAccessRecipe(recipe)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          completedRecipes.includes(recipe.id)
                            ? "bg-[#b5ead7] text-white"
                            : badge.canAccessRecipe(recipe)
                              ? "bg-[#d9f4eb] text-[#2d5f4c] hover:bg-[#b5ead7] hover:text-white"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        {completedRecipes.includes(recipe.id) ? "Feito!" : "Marcar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Premium Recipes */}
              {premiumRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Lock className="w-12 h-12 mx-auto mb-3" />
                      <p className="font-bold text-sm">Premium</p>
                      <button
                        className="mt-3 bg-[#ffb347] px-4 py-2 rounded-lg text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push("/planos")
                        }}
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                  <div className="relative h-52">
                    <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{recipe.title}</h3>
                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="bg-[#d9f4eb] text-[#2d5f4c] px-4 py-1.5 rounded-full text-xs font-semibold">
                        {recipe.ageRange}
                      </span>
                      <span className="bg-[#d4eef9] text-[#4a90a8] px-4 py-1.5 rounded-full text-xs font-semibold">
                        {recipe.time}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(recipe.id)
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          likedRecipes.includes(recipe.id)
                            ? "bg-[#ffc9e3] text-white"
                            : "bg-[#ffe4f2] text-[#e67eb5] hover:bg-[#ffc9e3] hover:text-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedRecipes.includes(recipe.id) ? "fill-current" : ""}`} />
                        Curtir
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsDone(recipe.id)
                        }}
                        disabled={true}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all bg-gray-200 text-gray-400 cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        Marcar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "community" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidade</h1>
              <p className="text-gray-600">Conecte-se com outros pais e compartilhe experiências</p>
            </div>

            {/* Destaques da Comunidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Receitas Mais Curtidas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Panqueca de Banana</p>
                      <p className="text-sm text-gray-600">324 curtidas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Nuggets Caseiros</p>
                      <p className="text-sm text-gray-600">298 curtidas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Pizza Caseira</p>
                      <p className="text-sm text-gray-600">276 curtidas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Membros Ativos
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Maria Silva</p>
                      <p className="text-sm text-gray-600">42 receitas compartilhadas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Ana Costa</p>
                      <p className="text-sm text-gray-600">38 receitas compartilhadas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">João Santos</p>
                      <p className="text-sm text-gray-600">35 receitas compartilhadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dicas da Comunidade */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">📚 Dicas Compartilhadas</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900 mb-1">Dica de Maria Silva</p>
                  <p className="text-sm text-gray-700">
                    "Congelo as papinhas em forminhas de gelo. Super prático para porções individuais!"
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900 mb-1">Dica de Ana Costa</p>
                  <p className="text-sm text-gray-700">
                    "Uso cortadores de biscoito em formatos divertidos para fazer as refeições mais atrativas."
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900 mb-1">Dica de João Santos</p>
                  <p className="text-sm text-gray-700">
                    "Envolvo meu filho no preparo das receitas. Ele adora ajudar e come melhor depois!"
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Compartilhe Suas Receitas!</h2>
              <p className="mb-6 text-white/90">Faça parte da nossa comunidade e inspire outros pais</p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Em Breve
              </button>
            </div>
          </div>
        )}

        {currentPage === "profile" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Perfil</h1>
              <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{initialUser?.email || "Chef Pequeno Prato"}</h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`${badge.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}
                    >
                      {badge.icon}
                      {badge.text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Pontos Totais</p>
                  <p className="text-3xl font-bold">{userPoints}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Receitas Feitas</p>
                  <p className="text-3xl font-bold">{completedRecipes.length}</p>
                </div>
              </div>
            </div>

            {/* Conquistas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Suas Conquistas
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <UtensilsCrossed className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Chef Iniciante</p>
                  <p className="text-xs text-gray-600">Primeira receita</p>
                </div>

                <div className="text-center opacity-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Chef Dedicado</p>
                  <p className="text-xs text-gray-600">10 receitas</p>
                </div>

                <div className="text-center opacity-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Chef Expert</p>
                  <p className="text-xs text-gray-600">25 receitas</p>
                </div>

                <div className="text-center opacity-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Crown className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Chef Master</p>
                  <p className="text-xs text-gray-600">50 receitas</p>
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Atividade Recente
              </h3>

              {completedRecipes.length > 0 ? (
                <div className="space-y-3">
                  {completedRecipes.slice(0, 5).map((recipeId) => {
                    const recipe = ALL_RECIPES.find((r) => r.id === recipeId)
                    return recipe ? (
                      <div key={recipeId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={recipe.image || "/placeholder.svg"}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{recipe.title}</p>
                          <p className="text-sm text-gray-600">Concluída</p>
                        </div>
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ) : null
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma receita feita ainda</p>
                  <button
                    onClick={() => setCurrentPage("recipes")}
                    className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Começar agora →
                  </button>
                </div>
              )}
            </div>

            {/* Upgrade Section */}
            {userPlan === "free" && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <Crown className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Upgrade para Premium</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Tenha acesso ilimitado a todas as receitas, conteúdo exclusivo e muito mais!
                    </p>
                    <button
                      onClick={() => router.push("/planos")}
                      className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                    >
                      Ver Planos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-[#e8e3dd] px-6 py-4 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          {[
            { id: "home", icon: HomeIcon, label: "Home" },
            { id: "recipes", icon: UtensilsCrossed, label: "Receitas" },
            { id: "community", icon: Users, label: "Comunidade" },
            { id: "profile", icon: User, label: "Perfil" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-2 transition-all ${
                currentPage === item.id ? "text-[#a8d8ea] scale-110" : "text-gray-500 hover:text-[#a8d8ea]"
              }`}
            >
              <item.icon className="w-7 h-7" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72">
              <Image
                src={selectedRecipe.image || "/placeholder.svg"}
                alt={selectedRecipe.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 right-6 bg-white rounded-full p-3 hover:bg-gray-100 shadow-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{selectedRecipe.title}</h2>
                <div className="flex gap-3 flex-wrap text-sm">
                  <span className="bg-[#d9f4eb] text-[#2d5f4c] px-5 py-2 rounded-full font-bold">
                    {selectedRecipe.ageRange}
                  </span>
                  <span className="bg-[#d4eef9] text-[#4a90a8] px-5 py-2 rounded-full font-bold">
                    {selectedRecipe.time}
                  </span>
                  <span className="bg-[#ffe4f2] text-[#e67eb5] px-5 py-2 rounded-full font-bold">
                    {selectedRecipe.difficulty}
                  </span>
                </div>
              </div>

              {selectedRecipe.ingredients && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">🥕 Ingredientes</h3>
                  <ul className="space-y-2.5">
                    {selectedRecipe.ingredients.map((ing: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#b5ead7] mt-1 font-bold">✓</span>
                        <span className="text-gray-700 text-lg">{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecipe.instructions && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    👩‍🍳 Modo de Preparo
                  </h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((step: string, i: number) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#a8d8ea] to-[#b5ead7] text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 text-lg pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedRecipe.nutrition && (
                <div className="bg-[#d4eef9] p-5 rounded-[1.5rem]">
                  <h3 className="text-xl font-bold text-[#4a90a8] mb-3 flex items-center gap-2">
                    📊 Informações Nutricionais
                  </h3>
                  <p className="text-[#4a90a8] text-lg leading-relaxed">{selectedRecipe.nutrition}</p>
                </div>
              )}

              {selectedRecipe.benefits && (
                <div className="bg-[#d9f4eb] p-5 rounded-[1.5rem]">
                  <h3 className="text-xl font-bold text-[#2d5f4c] mb-3 flex items-center gap-2">
                    💚 Benefícios para o Bebê
                  </h3>
                  <p className="text-[#2d5f4c] text-lg leading-relaxed">{selectedRecipe.benefits}</p>
                </div>
              )}

              {selectedRecipe.tips && (
                <div className="bg-[#fff4cc] p-5 rounded-[1.5rem]">
                  <h3 className="text-xl font-bold text-[#d48d00] mb-3 flex items-center gap-2">💡 Dicas Práticas</h3>
                  <p className="text-[#d48d00] text-lg leading-relaxed">{selectedRecipe.tips}</p>
                </div>
              )}

              {selectedRecipe.allergens && (
                <div className="bg-[#ffc9e3] p-5 rounded-[1.5rem]">
                  <h3 className="text-xl font-bold text-[#e67eb5] mb-3 flex items-center gap-2">⚠️ Alergênicos</h3>
                  <p className="text-[#e67eb5] text-lg leading-relaxed">{selectedRecipe.allergens}</p>
                </div>
              )}

              {selectedRecipe.variations && (
                <div className="bg-[#e6d5f7] p-5 rounded-[1.5rem]">
                  <h3 className="text-xl font-bold text-[#805ac8] mb-3 flex items-center gap-2">🔄 Variações</h3>
                  <p className="text-[#805ac8] text-lg leading-relaxed">{selectedRecipe.variations}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => toggleLike(selectedRecipe.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold transition-all ${
                    likedRecipes.includes(selectedRecipe.id)
                      ? "bg-[#ffc9e3] text-white shadow-lg"
                      : "bg-[#ffe4f2] text-[#e67eb5] hover:bg-[#ffc9e3] hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedRecipes.includes(selectedRecipe.id) ? "fill-current" : ""}`} />
                  {likedRecipes.includes(selectedRecipe.id) ? "Curtido!" : "Curtir"}
                </button>
                <button
                  onClick={() => markAsDone(selectedRecipe.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold transition-all ${
                    completedRecipes.includes(selectedRecipe.id)
                      ? "bg-[#b5ead7] text-white shadow-lg"
                      : "bg-[#d9f4eb] text-[#2d5f4c] hover:bg-[#b5ead7] hover:text-white"
                  }`}
                >
                  <Check className="w-5 h-5" />
                  {completedRecipes.includes(selectedRecipe.id) ? "Feito! +10pts" : "Marcar como Feito"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
