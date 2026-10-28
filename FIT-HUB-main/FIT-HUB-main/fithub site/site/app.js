/* ===== FITHUB — loja estática (HTML + CSS + JS) ===== */
"use strict";

/* ---------- dados ---------- */
const IMG = "imagens/";
const products = [
  { id: 1, name: "Kit Treino em Casa Pro", category: "Casa", price: 219.9, description: "Colchonete, halteres, elásticos e corda", image: IMG + "kit-forca.jpg", badge: "Mais vendido" },
  { id: 2, name: "Kit Dia a Dia Postural", category: "Mobilidade", price: 149.9, description: "Faixas, rolo e bola de liberação", image: IMG + "kit-mobilidade.jpg", badge: "Custo-benefício" },
  { id: 3, name: "Kit Outdoor Explorer", category: "Outdoor", price: 289.9, description: "Fita de suspensão, cones e acessórios", image: IMG + "kit-outdoor.jpg", badge: "Alta durabilidade" },
  { id: 4, name: "Kit Start Elásticos Leves", category: "Casa", price: 89.9, description: "Carga de 2 kg a 7 kg e guia de postura", image: IMG + "kit-elasticos.jpg", badge: "Só no kit iniciante" },
  { id: 5, name: "Kit Pilates & Solo Básico", category: "Mobilidade", price: 119, description: "Tapete NBR e anel tonificador", image: IMG + "kit-pilates.jpg", badge: "Fácil adaptação" },
  { id: 6, name: "Kit Dia a Dia Econômico", category: "Mobilidade", price: 69.9, description: "Três faixas elásticas e grip de mão", image: IMG + "kit-economico.jpg", badge: "Zero impacto" },
  { id: 7, name: "Kit Mobilidade Essencial", category: "Mobilidade", price: 54.9, description: "Cinta flexível e bola de massagem", image: IMG + "kit-mobilidade-essencial.jpg", badge: "Alongamento suave" },
  { id: 8, name: "Whey Protein Concentrado 900g", category: "Suplementos", price: 129.9, description: "24 g de proteína por dose, sabor baunilha", image: IMG + "whey-fithub.jpg", badge: "Mais vendido" },
  { id: 9, name: "Creatina Monohidratada 300g", category: "Suplementos", price: 89.9, description: "100% pura, 3 g por dose", image: IMG + "creatina-fithub.jpg", badge: "Força e explosão" },
  { id: 10, name: "Pré-Treino Energy 300g", category: "Suplementos", price: 99.9, description: "Cafeína, beta-alanina e citrulina", image: IMG + "pre-treino-fithub.jpg", badge: "Mais energia" },
  { id: 11, name: "Kit Suplementos Iniciante", category: "Suplementos", price: 239.9, description: "Whey, creatina e coqueteleira", image: IMG + "kit-suplementos-fithub.jpg", badge: "Combo econômico" },
  { id: 12, name: "Tênis de Corrida AirRun", category: "Roupas", price: 349.9, description: "Amortecimento leve para corrida e caminhada", image: IMG + "roupa-tenis-preto.jpg", badge: "Corrida", colors: [
    { name: "Preto e verde", swatch: "#1a1a1a", image: IMG + "roupa-tenis-preto.jpg" },
    { name: "Branco e azul", swatch: "#2f5fd0", image: IMG + "roupa-tenis-branco.jpg" },
  ] },
  { id: 13, name: "Kit Corrida Dry-Fit", category: "Roupas", price: 159.9, description: "Camiseta respirável e shorts com bolso", image: IMG + "roupa-corrida-laranja.jpg", badge: "Secagem rápida", colors: [
    { name: "Laranja e marinho", swatch: "#d9531e", image: IMG + "roupa-corrida-laranja.jpg" },
    { name: "Cinza e preto", swatch: "#8a8a8a", image: IMG + "roupa-corrida-cinza.jpg" },
  ] },
  { id: 14, name: "Legging Musculação Compressão", category: "Roupas", price: 119.9, description: "Tecido opaco que não marca no agachamento", image: IMG + "roupa-legging-vinho.jpg", badge: "Musculação", colors: [
    { name: "Vinho", swatch: "#7a1f35", image: IMG + "roupa-legging-vinho.jpg" },
    { name: "Preto", swatch: "#151515", image: IMG + "roupa-legging-preta.jpg" },
  ] },
  { id: 15, name: "Regata Treino Pesado", category: "Roupas", price: 69.9, description: "Cava ampla para liberdade de movimento", image: IMG + "roupa-regata-preta.jpg", badge: "Academia", colors: [
    { name: "Preta", swatch: "#151515", image: IMG + "roupa-regata-preta.jpg" },
    { name: "Verde militar", swatch: "#556b2f", image: IMG + "roupa-regata-verde.jpg" },
  ] },
];

const CATEGORIES = ["Todos", "Casa", "Mobilidade", "Outdoor", "Suplementos", "Roupas"];
const catLabel = (c) => (c === "Casa" ? "Treino em Casa" : c === "Roupas" ? "Roupas & Tênis" : c);
const money = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* ---------- armazenamento local ---------- */
const CART_KEY = "fithub-cart";
const PROFILE_KEY = "fithub-profile";
const ORDERS_KEY = "fithub-orders";
const loadJSON = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const loadCart = () => loadJSON(CART_KEY, {});
const saveCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
const loadProfile = () => loadJSON(PROFILE_KEY, {});
const loadOrders = () => loadJSON(ORDERS_KEY, []);

/* ---------- ícones (SVG inline) ---------- */
const icon = (paths, size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const I = {
  menu: icon('<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>', 21),
  search: icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', 17),
  user: icon('<path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>', 19),
  bag: icon('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>', 19),
  x: icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 20),
  minus: icon('<path d="M5 12h14"/>', 14),
  plus: icon('<path d="M5 12h14"/><path d="M12 5v14"/>', 14),
  trash: icon('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>', 17),
  check: icon('<path d="M20 6 9 17l-5-5"/>', 16),
  chevron: icon('<path d="m9 18 6-6-6-6"/>', 18),
  back: icon('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', 18),
  lock: icon('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', 16),
  shield: icon('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>', 18),
  truck: icon('<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>', 18),
  card: icon('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>', 20),
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  logout: icon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>', 18),
  package: icon('<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', 34),
};
const stars = () => `<span class="text-rating">${I.star}${I.star}${I.star}${I.star}${I.star}</span>`;

/* ---------- estado ---------- */
const state = {
  screen: "store", // store | product | account | checkout | success
  productId: null,
  category: "Todos",
  query: "",
  routine: 0,
  cart: loadCart(),
  cartOpen: false,
  menuOpen: false,
  checkoutStep: 1,
  payment: "credit",
  installments: 1,
  accountTab: "dados",
  accountMode: "login",
  accountSaved: false,
  productQty: 1,
  productColor: 0,
  productAdded: false,
  cardColors: {}, // cor escolhida por cartão
};

const cartItems = () => products.filter((p) => state.cart[p.id]).map((p) => ({ ...p, quantity: state.cart[p.id] }));
const cartCount = () => cartItems().reduce((s, i) => s + i.quantity, 0);
const subtotal = () => cartItems().reduce((s, i) => s + i.price * i.quantity, 0);

function addToCart(id, qty = 1) {
  state.cart[id] = (state.cart[id] || 0) + qty;
  saveCart(state.cart);
}
function updateCart(id, delta) {
  const next = Math.max(0, (state.cart[id] || 0) + delta);
  if (next) state.cart[id] = next; else delete state.cart[id];
  saveCart(state.cart);
}
function saveOrder(payment, installments = 1) {
  const items = cartItems();
  const sub = subtotal();
  const shipping = sub >= 199 ? 0 : 19.9;
  const order = {
    id: "FH-" + String(Date.now()).slice(-6),
    date: new Date().toLocaleDateString("pt-BR"),
    payment,
    installments,
    total: sub + shipping,
    items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, image: i.image })),
  };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...loadOrders()]));
}

/* ---------- componentes ---------- */
const logoImg = (cls = "logo") => `<img src="${IMG}fithub-logo.png" alt="FITHUB" class="${cls}" />`;

function topBar() {
  return `<div class="top-bar">Frete grátis acima de R$ 199 <span class="sep">|</span> Troca grátis em até 30 dias</div>`;
}

function header() {
  return `
  <header class="site-header">
    <div class="header-inner">
      <button class="icon-button" aria-label="Abrir menu" data-action="open-menu">${I.menu}</button>
      <a href="#inicio" data-action="go-store">${logoImg()}</a>
      <nav class="main-nav">
        ${CATEGORIES.map((c) => `<button class="${state.category === c ? "nav-active" : "nav-link"}" data-action="filter" data-cat="${c}">${catLabel(c)}</button>`).join("")}
      </nav>
      <label class="search-box">${I.search}<input id="search-input" value="${escapeAttr(state.query)}" placeholder="Buscar kits, objetivos, cargas..." /></label>
      <button class="header-action" data-action="go-account">${I.user}<span class="label">Minha conta</span></button>
      <button class="header-action" data-action="open-cart">${I.bag}<span class="label">Carrinho</span>${cartCount() > 0 ? `<b class="cart-count">${cartCount()}</b>` : ""}</button>
    </div>
  </header>`;
}

function footer() {
  const col = (title, items) => `<div><h3>${title}</h3><ul>${items.map((i) => `<li>${i[0] === "#" ? i : footLink(i)}</li>`).join("")}</ul></div>`;
  const footLink = (name) => { const c = { "Treino em Casa": "Casa", "Dia a Dia & Mobilidade": "Mobilidade", "Outdoor": "Outdoor", "Kits para Iniciantes": "Todos" }[name]; return c ? `<a href="#kits" class="foot-link" data-action="filter" data-cat="${c}">${name}</a>` : `<a href="#" class="foot-link" data-action="info" data-info="${name}">${name}</a>`; };
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>${logoImg()}<p class="mt-2">Kits fitness completos para quem não tem tempo a perder.</p></div>
      ${col("Categorias", ["Treino em Casa", "Dia a Dia & Mobilidade", "Outdoor", "Kits para Iniciantes"])}
      ${col("Atendimento", ["Fale com um Especialista", "Trocas & Devoluções", "Prazos de Envio", "Garantia dos Materiais"])}
      <div><h3>Compra 100% segura</h3><div class="footer-secure">
        <p>${I.card} Até 12x no cartão</p>
        <p>${I.shield} Ambiente protegido</p>
        <p>${I.lock} Dados criptografados</p>
      </div></div>
    </div>
  </footer>`;
}

function productCard(p) {
  const ci = state.cardColors[p.id] || 0;
  const color = p.colors && p.colors[ci];
  const img = color ? color.image : p.image;
  return `
  <article class="product-card">
    <a class="card-img-wrap" href="#produto-${p.id}" data-action="go-product" data-id="${p.id}">
      <img class="card-img" src="${img}" alt="${escapeAttr(p.name)}" loading="lazy" />
      <span class="product-badge">${p.badge}</span>
    </a>
    <div class="card-body">
      <p class="tiny muted">${p.category}</p>
      <h3 class="product-name"><a href="#produto-${p.id}" data-action="go-product" data-id="${p.id}">${p.name}</a></h3>
      <p class="card-desc mt-2" style="min-height:2.5rem">${p.description}</p>
      ${p.colors ? `
        <div class="mt-3">
          <p class="tiny bold">Cor: <span class="muted" style="font-weight:400">${color.name}</span></p>
          <div class="color-swatches">
            ${p.colors.map((c, i) => `<button class="swatch ${i === ci ? "active" : ""}" style="background:${c.swatch}" aria-label="Cor ${c.name}" data-action="card-color" data-id="${p.id}" data-color="${i}"></button>`).join("")}
          </div>
        </div>` : ""}
      <div class="card-foot">
        <div><b>${money(p.price)}</b><small>4x sem juros</small></div>
        <button class="button-small" data-action="add-cart" data-id="${p.id}">Adicionar</button>
      </div>
    </div>
  </article>`;
}

function storeScreen() {
  const routines = [
    { tag: "Recomendado para você", title: "Sem tempo para academia", text: "Treinos eficientes de 25 minutos para sala ou quarto.", product: products[0] },
    { tag: "Praticidade", title: "Trabalho híbrido / Escritório", text: "Alívio de postura, mobilidade rápida e pausa ativa.", product: products[1] },
    { tag: "Treino livre", title: "Parques e finais de semana", text: "Agilidade, suspensão e treino funcional ao ar livre.", product: products[2] },
  ];
  const q = state.query.toLowerCase();
  const filtered = products.filter((p) =>
    (state.category === "Todos" || p.category === state.category) &&
    `${p.name} ${p.description}`.toLowerCase().includes(q));
  const reviews = [
    ["Cargas precisas e travas resistentes de aço", "Comprei o Kit Treino em Casa Pro. Uso há 4 meses e a carga combinada é consistente.", "Rodrigo S., São Paulo", "100% Látex Natural da Malásia"],
    ["Fita de suspensão industrial com costura dupla", "Treino ao ar livre aos finais de semana. A ancoragem em árvore é segura.", "Marcelo F., Curitiba", "Polipropileno 40 mm densidade 900D"],
    ["Espuma de alta densidade sem deformação", "O rolo de liberação mantém o formato mesmo com uso diário.", "Dra. Carla M., Fisioterapeuta", "EVA 45D texturizado"],
  ];

  return `
  ${topBar()}
  ${header()}
  <main id="inicio">
    <section class="hero-band">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">Kits prontos para o seu objetivo</span>
          <h1 class="hero-title">Chega de perder tempo montando treino.</h1>
          <p class="hero-text">Equipamentos selecionados por profissionais, com orientação clara para você começar e evoluir.</p>
          <div class="hero-cta">
            <a class="button-primary" href="#rotina">Descubra seu kit ideal ${I.chevron}</a>
            <a class="button-outline" href="#kits">Ver todos os kits</a>
          </div>
          <div class="hero-trust"><span>✓ Entrega rápida</span><span>✓ Ficha técnica completa</span><span>✓ Garantia de 1 ano</span></div>
        </div>
        <div class="hero-cards">
          ${products.slice(0, 3).map((p) => `
            <article class="category-card">
              <img src="${p.image}" alt="${escapeAttr(p.name)}" />
              <div class="card-body">
                <p class="card-cat">${catLabel(p.category)}</p>
                <p class="card-desc">${p.description.split(",")[0]}</p>
                <p class="card-price">${money(p.price)}</p>
                <span class="card-badge-text">${p.badge}</span>
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>

    <section id="rotina" class="section-shell" style="scroll-margin-top:6rem">
      <div class="section-heading">
        <div><span class="kicker">Escolha expressa</span><h2>Qual é a sua rotina hoje?</h2></div>
        <span class="small muted" style="display:none" id="rotina-hint">Clique em um perfil para receber uma recomendação</span>
      </div>
      <div class="routine-grid">
        ${routines.map((r, i) => `
          <button class="routine-card ${state.routine === i ? "routine-active" : ""}" data-action="routine" data-index="${i}">
            <div class="flex items-center justify-between"><span class="pill">${r.tag}</span><span class="tiny muted">#Rotina0${i + 1}</span></div>
            <h3 class="routine-title">${r.title}</h3>
            <p class="routine-text">${r.text}</p>
            <div class="routine-product">
              <img src="${r.product.image}" alt="" />
              <div class="info"><b>${r.product.name}</b><span>${money(r.product.price)}</span></div>
              <span class="mini-button" data-action="add-cart" data-id="${r.product.id}">Adicionar</span>
            </div>
          </button>`).join("")}
      </div>
    </section>

    <section id="kits" class="section-shell" style="border-top:1px solid var(--border);scroll-margin-top:6rem">
      <div class="section-heading">
        <div><span class="kicker">Especial iniciante • orçamento inteligente</span><h2>Kits amigáveis para começar sem medo</h2></div>
        <div class="filter-row">
          ${CATEGORIES.map((c) => `<button class="${state.category === c ? "filter-active" : "filter-button"}" data-action="filter" data-cat="${c}">${c}</button>`).join("")}
        </div>
      </div>
      ${filtered.length
        ? `<div class="products-grid">${filtered.map(productCard).join("")}</div>`
        : `<div class="empty-state">${I.search}<b>Nenhum kit encontrado</b><span>Tente outro nome ou categoria.</span></div>`}
    </section>

    <section class="proof-band">
      <div class="section-shell" style="padding-top:3.5rem;padding-bottom:3.5rem">
        <div class="section-heading">
          <div><span class="kicker">Specs técnicas & performance</span><h2>Prova social com ficha técnica resumida</h2></div>
          <span class="small muted">Avaliações verificadas de atletas e fisioterapeutas</span>
        </div>
        <div class="reviews-grid">
          ${reviews.map((r) => `
            <article class="review-card">
              <div class="flex justify-between">${stars()}<span class="verified">${I.check} Compra verificada</span></div>
              <h3 class="review-title">“${r[0]}”</h3>
              <p class="review-text">${r[1]}</p>
              <div class="spec-row"><span>Material / garantia</span><b>${r[3]}</b></div>
              <p class="review-author">${r[2]}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>

    <section class="section-shell" style="padding-top:0">
      <div class="section-heading">
        <div><h2>Comparativo rápido dos kits oficiais</h2><p class="small muted">Compare preço, objetivo e itens incluídos.</p></div>
      </div>
      <div class="table-wrap">
        <table class="comparison">
          <thead><tr><th>Kit & especificação</th><th>Indicado para</th><th>Itens inclusos</th><th>Preço</th><th>Ação</th></tr></thead>
          <tbody>
            ${products.slice(0, 4).map((p) => `
              <tr>
                <td><div class="kit-cell"><img src="${p.image}" alt="" /><b>${p.name}</b></div></td>
                <td>${p.category}</td><td>${p.description}</td>
                <td class="black">${money(p.price)}</td>
                <td><button class="button-small" data-action="add-cart" data-id="${p.id}">Comprar</button></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
  </main>
  ${footer()}
  ${state.menuOpen ? menuDrawer() : ""}
  ${state.cartOpen ? cartDrawer() : ""}`;
}

function menuDrawer() {
  return `
  <button class="drawer-overlay" aria-label="Fechar menu" data-action="close-menu"></button>
  <aside class="cart-drawer">
    <div class="drawer-head">${logoImg()}<button class="icon-button" data-action="close-menu">${I.x}</button></div>
    <div class="drawer-body">
      <p class="drawer-section-title" style="margin-top:0">Categorias</p>
      <div>
        ${CATEGORIES.map((c) => `<button class="drawer-link ${state.category === c ? "active" : ""}" data-action="filter-menu" data-cat="${c}">${catLabel(c)}</button>`).join("")}
      </div>
      <p class="drawer-section-title">Sua conta</p>
      <div>
        <button class="drawer-link" data-action="go-account">Minha conta e pedidos</button>
        <button class="drawer-link" data-action="open-cart">Carrinho (${cartCount()})</button>
      </div>
    </div>
  </aside>`;
}

function cartDrawer() {
  const items = cartItems();
  return `
  <button class="drawer-overlay" aria-label="Fechar carrinho" data-action="close-cart"></button>
  <aside class="cart-drawer">
    <div class="drawer-head">
      <div><h2 style="font-size:1.25rem;font-weight:900">Seu carrinho</h2><p class="small muted">${cartCount()} ${cartCount() === 1 ? "item" : "itens"}</p></div>
      <button class="icon-button" data-action="close-cart">${I.x}</button>
    </div>
    <div class="drawer-body">
      ${items.length ? `<div class="cart-list">
        ${items.map((item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="" />
            <div class="info">
              <b>${item.name}</b>
              <p class="price">${money(item.price)}</p>
              <div class="qty-row">
                <button class="qty-button" data-action="cart-dec" data-id="${item.id}">${I.minus}</button>
                <span class="bold small" style="width:1.25rem;text-align:center">${item.quantity}</span>
                <button class="qty-button" data-action="cart-inc" data-id="${item.id}">${I.plus}</button>
                <button class="trash" data-action="cart-remove" data-id="${item.id}" aria-label="Remover">${I.trash}</button>
              </div>
            </div>
          </div>`).join("")}
      </div>` : `<div class="empty-state" style="height:100%">${I.bag}<b>Seu carrinho está vazio</b><span>Adicione um kit para continuar.</span></div>`}
    </div>
    ${items.length ? `
    <div class="drawer-foot">
      <div class="flex justify-between" style="font-size:1.1rem;margin-bottom:1rem"><span>Subtotal</span><b>${money(subtotal())}</b></div>
      <p class="tiny muted" style="margin-bottom:1rem">Frete calculado na próxima etapa.</p>
      <button class="button-primary w-full" data-action="go-checkout">Ir para o pagamento ${I.chevron}</button>
    </div>` : ""}
  </aside>`;
}

function productScreen() {
  const p = products.find((x) => x.id === state.productId);
  if (!p) return `<div class="flow-screen flex items-center" style="justify-content:center"><div class="success-panel"><h1>Produto não encontrado</h1><p>O produto que você procura não existe ou foi removido.</p><button class="button-primary" data-action="go-store">Voltar para a loja</button></div></div>`;
  const color = p.colors && p.colors[state.productColor];
  const img = color ? color.image : p.image;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return `
  ${topBar()}
  <header class="site-header">
    <div class="header-inner">
      <a href="#" data-action="go-store">${logoImg()}</a>
      <button class="header-action" style="margin-left:auto" data-action="go-store-open-cart">${I.bag}<span class="label">Ver carrinho</span>${cartCount() > 0 ? `<b class="cart-count">${cartCount()}</b>` : ""}</button>
    </div>
  </header>
  <main style="max-width:1280px;margin:auto;padding:2.5rem 1.25rem">
    <button class="back-link" data-action="go-store" style="margin-bottom:2rem">${I.back} Voltar à loja</button>
    <div class="product-page-grid">
      <div class="product-photo">
        <img src="${img}" alt="${escapeAttr(p.name)}" />
        <span class="product-badge">${p.badge}</span>
      </div>
      <div>
        <p class="small muted bold">${catLabel(p.category)}</p>
        <h1 class="mt-2" style="font-size:clamp(1.8rem,4vw,2.4rem);font-weight:900;line-height:1.15">${p.name}</h1>
        <div class="flex items-center gap-2 mt-3 small">${stars()}<span class="muted">Avaliações verificadas</span></div>
        <p class="mt-4 muted" style="font-size:1.1rem">${p.description}</p>
        ${p.colors ? `
        <div class="mt-5">
          <p class="small bold">Cor: <span class="muted" style="font-weight:400">${color.name}</span></p>
          <div class="color-swatches">
            ${p.colors.map((c, i) => `<button class="swatch ${i === state.productColor ? "active" : ""}" style="background:${c.swatch}" aria-label="Cor ${c.name}" data-action="product-color" data-color="${i}"></button>`).join("")}
          </div>
        </div>` : ""}
        <div class="price-box">
          <b>${money(p.price)}</b>
          <small>em até 4x de ${money(p.price / 4)} sem juros</small>
          <div class="buy-row">
            <div class="qty-selector">
              <button class="qty-button" aria-label="Diminuir quantidade" data-action="qty-dec">${I.minus}</button>
              <span class="bold small" style="width:1.5rem;text-align:center">${state.productQty}</span>
              <button class="qty-button" aria-label="Aumentar quantidade" data-action="qty-inc">${I.plus}</button>
            </div>
            <button class="button-primary" style="flex:1" data-action="product-add" data-id="${p.id}">
              ${state.productAdded ? `${I.check} Adicionado ao carrinho` : `Adicionar ao carrinho ${I.chevron}`}
            </button>
          </div>
          ${state.productAdded ? `<button class="button-outline w-full mt-3" data-action="go-store-open-cart">Ir para o carrinho na loja</button>` : ""}
        </div>
        <div class="benefits">
          <p>${I.truck} Entrega rápida para todo o Brasil</p>
          <p>${I.shield} Garantia de 1 ano e troca grátis em 30 dias</p>
          <p>${I.lock} Compra 100% segura, dados criptografados</p>
        </div>
      </div>
    </div>
    ${related.length ? `
    <section class="mt-6">
      <div class="section-heading"><div><span class="kicker">Combine com</span><h2>Produtos relacionados</h2></div></div>
      <div class="products-grid">
        ${related.map((r) => `
          <a class="product-card related-card" href="#produto-${r.id}" data-action="go-product" data-id="${r.id}">
            <div class="card-img-wrap"><img class="card-img" src="${r.image}" alt="${escapeAttr(r.name)}" loading="lazy" /><span class="product-badge">${r.badge}</span></div>
            <div class="card-body"><h3 class="product-name">${r.name}</h3><b>${money(r.price)}</b></div>
          </a>`).join("")}
      </div>
    </section>` : ""}
  </main>
  <footer class="site-footer"><div style="max-width:1280px;margin:auto;padding:2.5rem 1.25rem;font-size:.85rem;opacity:.65"><img src="${IMG}fithub-logo.png" alt="FITHUB" style="height:3.5rem;width:auto;filter:brightness(0) invert(1)" /><p class="mt-2">Kits fitness completos para quem não tem tempo a perder.</p></div></footer>
  ${state.cartOpen ? cartDrawer() : ""}`;
}

function accountScreen() {
  const profile = loadProfile();
  const orders = loadOrders();
  const loggedIn = Boolean(profile.email);

  if (!loggedIn) {
    const login = state.accountMode === "login";
    return `
    <div class="flow-screen">
      <button class="back-link" data-action="go-store">${I.back} Voltar à loja</button>
      <div class="auth-panel">
        ${logoImg()}
        <h1>${login ? "Entre na sua conta" : "Crie sua conta"}</h1>
        <form class="form-stack" data-form="auth">
          ${!login ? `<label>Nome completo<input name="nome" required placeholder="Seu nome" value="${escapeAttr(profile.nome || "")}" /></label>` : ""}
          <label>E-mail<input name="email" required type="email" placeholder="voce@email.com" value="${escapeAttr(profile.email || "")}" /></label>
          <label>Senha<input required type="password" placeholder="Mínimo de 6 caracteres" minlength="6" /></label>
          <button class="button-primary" type="submit">${login ? "Entrar" : "Criar cadastro"}</button>
          <button type="button" class="text-link" data-action="toggle-auth-mode">${login ? "Ainda não tenho cadastro" : "Já tenho uma conta"}</button>
        </form>
      </div>
    </div>`;
  }

  return `
  <div class="flow-screen checkout-page">
    <header class="checkout-header">
      <button class="back-link" data-action="go-store">${I.back} Voltar à loja</button>
      ${logoImg()}
      <button class="header-action" data-action="logout">${I.logout} Sair</button>
    </header>
    <div class="account-wrap" style="padding:2rem 0 4rem">
      <h1 style="font-size:1.5rem;font-weight:900">Olá, ${escapeHtml(profile.nome || "atleta")}!</h1>
      <p class="small muted mt-1">${escapeHtml(profile.email)}</p>
      <div class="tabs">
        <button class="${state.accountTab === "dados" ? "filter-active" : "filter-button"}" data-action="account-tab" data-tab="dados">Meus dados</button>
        <button class="${state.accountTab === "pedidos" ? "filter-active" : "filter-button"}" data-action="account-tab" data-tab="pedidos">Compras anteriores (${orders.length})</button>
      </div>
      ${state.accountTab === "dados" ? `
      <form class="form-grid mt-5" data-form="profile">
        <label>Nome completo<input name="nome" value="${escapeAttr(profile.nome || "")}" placeholder="Nome e sobrenome" /></label>
        <label>CPF<input name="cpf" value="${escapeAttr(profile.cpf || "")}" placeholder="000.000.000-00" /></label>
        <label>Telefone<input name="telefone" value="${escapeAttr(profile.telefone || "")}" placeholder="(00) 00000-0000" /></label>
        <label>CEP<input name="cep" value="${escapeAttr(profile.cep || "")}" placeholder="00000-000" /></label>
        <label>Endereço<input name="endereco" value="${escapeAttr(profile.endereco || "")}" placeholder="Rua e número" /></label>
        <label>Cidade / Estado<input name="cidade" value="${escapeAttr(profile.cidade || "")}" placeholder="São Paulo / SP" /></label>
        <div class="col-span-full flex items-center gap-3">
          <button class="button-primary" type="submit">Salvar dados</button>
          ${state.accountSaved ? `<span class="flex items-center gap-1 small bold text-primary">${I.check} Dados salvos!</span>` : ""}
        </div>
      </form>` : `
      <div class="mt-5" style="display:grid;gap:1rem">
        ${orders.length === 0 ? `<div class="empty-state" style="padding:2.5rem 0">${I.package}<b>Nenhuma compra ainda</b><span>Seus pedidos finalizados aparecem aqui.</span></div>` : ""}
        ${orders.map((o) => `
          <article class="order-card">
            <div class="order-head">
              <div><b>Pedido ${o.id}</b><span class="small muted" style="margin-left:.8rem">${o.date}</span></div>
              <div style="text-align:right"><b class="text-primary">${money(o.total)}</b><span class="tiny muted" style="display:block">${payLabel(o)}</span></div>
            </div>
            <div class="order-items">
              ${o.items.map((i) => `
                <div class="order-item">
                  <img src="${i.image}" alt="" />
                  <span class="oi-name">${i.name} <span class="muted">x${i.quantity}</span></span>
                  <b>${money(i.price * i.quantity)}</b>
                </div>`).join("")}
            </div>
            <p class="order-shipping">${I.truck} Entrega estimada: 3 a 6 dias úteis</p>
          </article>`).join("")}
      </div>`}
    </div>
  </div>`;
}

function checkoutScreen() {
  const items = cartItems();
  const sub = subtotal();
  const shipping = sub >= 199 ? 0 : 19.9;
  const total = sub + shipping;
  const pf = loadProfile();
  const step = state.checkoutStep;
  const stepLabels = ["Identificação", "Entrega", "Pagamento"];

  return `
  <div class="flow-screen checkout-page">
    <header class="checkout-header">
      <button class="back-link" data-action="go-store">${I.back} Voltar</button>
      ${logoImg()}
      <span class="secure-label">${I.lock} Compra segura</span>
    </header>
    <div class="steps">
      ${stepLabels.map((l, i) => `<div class="${step >= i + 1 ? "step-active" : "step"}"><span>${step > i + 1 ? I.check : i + 1}</span><b>${l}</b></div>`).join("")}
    </div>
    <div class="checkout-grid">
      <section class="checkout-form">
        <h1>${step === 1 ? "Seus dados" : step === 2 ? "Endereço de entrega" : "Como você quer pagar?"}</h1>
        ${step === 1 ? `
        <form class="form-grid" data-form="checkout-1">
          <label>Nome completo<input name="nome" value="${escapeAttr(pf.nome || "")}" required placeholder="Nome e sobrenome" /></label>
          <label>CPF<input name="cpf" value="${escapeAttr(pf.cpf || "")}" required placeholder="000.000.000-00" /></label>
          <label>E-mail<input name="email" value="${escapeAttr(pf.email || "")}" required type="email" placeholder="voce@email.com" /></label>
          <label>Telefone<input name="telefone" value="${escapeAttr(pf.telefone || "")}" required placeholder="(00) 00000-0000" /></label>
        </form>` : ""}
        ${step === 2 ? `
        <form class="form-grid" data-form="checkout-2">
          <label>CEP<input name="cep" value="${escapeAttr(pf.cep || "")}" required placeholder="00000-000" /></label>
          <label>Endereço<input name="endereco" value="${escapeAttr(pf.endereco || "")}" required placeholder="Rua e número" /></label>
          <label>Complemento<input name="complemento" value="${escapeAttr(pf.complemento || "")}" placeholder="Apartamento, bloco..." /></label>
          <label>Cidade / Estado<input name="cidade" value="${escapeAttr(pf.cidade || "")}" required placeholder="São Paulo / SP" /></label>
        </form>` : ""}
        ${step === 3 ? `
        <div class="payment-list">
          ${[["credit", "Cartão de crédito", "Parcele em até 12x sem juros"], ["debit", "Cartão de débito", "Pagamento à vista"], ["pix", "Pix", "Aprovação imediata"], ["boleto", "Boleto bancário", "Vencimento em 2 dias"]].map(([id, title, text]) => `
            <button class="${state.payment === id ? "payment-active" : "payment-option"}" data-action="payment" data-pay="${id}">
              <span class="radio-dot ${state.payment === id ? "" : "radio-off"}"></span>${I.card}
              <span class="pay-text"><b>${title}</b><small>${text}</small></span>
            </button>`).join("")}
        </div>
        ${state.payment === "credit" || state.payment === "debit" ? `
        <div class="form-grid mt-4" data-form="card-data">
          <label class="col-span-full">Número do cartão<input id="card-number" inputmode="numeric" maxlength="19" required placeholder="0000 0000 0000 0000" /></label>
          <label class="col-span-full">Nome impresso no cartão<input id="card-name" required placeholder="Como está no cartão" /></label>
          <label>Validade<input id="card-exp" maxlength="5" required placeholder="MM/AA" /></label>
          <label>CVV<input id="card-cvv" inputmode="numeric" maxlength="4" required placeholder="000" /></label>
          ${state.payment === "credit" ? `
          <label class="col-span-full">Parcelamento
            <select id="installments">
              ${Array.from({ length: 12 }, (_, i) => i + 1).map((n) => `<option value="${n}" ${state.installments === n ? "selected" : ""}>${n}x de ${money(total / n)} sem juros${n === 1 ? " (à vista)" : ""}</option>`).join("")}
            </select>
          </label>` : `<p class="small muted col-span-full">Débito: ${money(total)} à vista.</p>`}
        </div>` : ""}
        ${state.payment === "boleto" ? `<div class="pix-box"><b>Boleto bancário</b><span class="small">Valor: <b>${money(total)}</b> — vence em 2 dias.</span><small class="muted">Boleto demonstrativo — nenhuma cobrança real.</small></div>` : ""}
        ${state.payment === "pix" ? `
        <div class="pix-box">
          <b>Escaneie o QR Code com o app do seu banco</b>
          <canvas id="pix-qr" width="180" height="180"></canvas>
          <span class="small">Valor: <b>${money(total)}</b></span>
          <code style="font-size:.7rem;word-break:break-all;background:var(--muted);padding:.5rem;border-radius:.5rem">00020126580014BR.GOV.BCB.PIX0136fithub-demo@exemplo.com5204000053039865406${total.toFixed(2)}5909FITHUB6009SAO PAULO</code>
          <button class="button-small" data-action="copy-pix" data-code="pix-demo">Copiar código Pix</button>
          <small class="muted">QR Code demonstrativo — nenhuma cobrança real.</small>
        </div>` : ""}` : ""}
        <div class="flex justify-between mt-5">
          <button class="button-outline" data-action="checkout-back">Voltar</button>
          ${step < 3
            ? `<button class="button-primary" data-action="checkout-next">Continuar ${I.chevron}</button>`
            : `<button class="button-primary" data-action="checkout-finish">Finalizar pedido ${I.lock}</button>`}
        </div>
      </section>
      <aside class="order-summary">
        <h2>Resumo do pedido</h2>
        ${items.map((i) => `
          <div class="summary-item">
            <img src="${i.image}" alt="" />
            <span class="s-text"><b>${i.name}</b><small>Qtd. ${i.quantity}</small></span>
            <strong>${money(i.price * i.quantity)}</strong>
          </div>`).join("")}
        <div class="summary-line"><span>Subtotal</span><b>${money(sub)}</b></div>
        <div class="summary-line"><span>Entrega</span><b>${shipping ? money(shipping) : "Grátis"}</b></div>
        <div class="summary-total"><span>Total</span><b>${money(total)}</b></div>
      </aside>
    </div>
  </div>`;
}

function successScreen() {
  return `
  <div class="flow-screen flex items-center" style="justify-content:center">
    <div class="success-panel">
      <span class="success-icon">${icon('<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', 44)}</span>
      <span class="eyebrow">Pedido demonstrativo confirmado</span>
      <h1>Seu treino está a caminho!</h1>
      <p>Esta é uma simulação acadêmica. Nenhuma cobrança foi realizada; os dados ficam apenas no seu navegador.</p>
      <div class="delivery-note">${I.truck}<span class="d-text"><b>Entrega estimada</b><small>De 3 a 6 dias úteis</small></span></div>
      <button class="button-primary" data-action="go-store">Voltar para a loja</button>
    </div>
  </div>`;
}

/* ---------- helpers ---------- */
function payLabel(o) {
  if (o.payment === "pix") return "Pix";
  if (o.payment === "boleto") return "Boleto";
  if (o.payment === "debit") return "Cartão de débito";
  return "Cartão de crédito" + (o.installments > 1 ? ` em ${o.installments}x` : " à vista");
}
function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

function drawPixQR() {
  const canvas = document.getElementById("pix-qr");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const n = 25, cell = canvas.width / n;
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111";
  // padrão determinístico (decorativo)
  let seed = 42;
  const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (rand() > 0.52) ctx.fillRect(x * cell, y * cell, cell, cell);
  const finder = (fx, fy) => {
    ctx.fillStyle = "#111"; ctx.fillRect(fx * cell, fy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = "#fff"; ctx.fillRect((fx + 1) * cell, (fy + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = "#111"; ctx.fillRect((fx + 2) * cell, (fy + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
}

/* ---------- render ---------- */
const app = document.getElementById("app");
let render = function () {
  let html;
  if (state.screen === "product") html = productScreen();
  else if (state.screen === "account") html = accountScreen();
  else if (state.screen === "checkout") html = checkoutScreen();
  else if (state.screen === "success") html = successScreen();
  else html = storeScreen();
  const prevScreen = app.dataset.screen;
  const prevY = window.scrollY;
  app.innerHTML = html;
  app.dataset.screen = state.screen;
  drawPixQR();
  const search = document.getElementById("search-input");
  if (search) {
    search.addEventListener("input", (e) => {
      state.query = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const again = document.getElementById("search-input");
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  // só volta ao topo ao trocar de tela; trocar cor, quantidade etc. mantém a posição
  window.scrollTo(0, prevScreen === state.screen ? prevY : 0);
};

function goStore(scrollToKits = false) {
  state.screen = "store";
  state.menuOpen = false;
  render();
  if (!scrollToKits) window.scrollTo(0, 0);
  if (scrollToKits) document.getElementById("kits")?.scrollIntoView({ behavior: "smooth" });
}

/* ---------- histórico (botão voltar do navegador) ---------- */
let lastScreen = "store";
const _render = render;
render = function () {
  _render();
  if (state.screen !== lastScreen) { history.pushState({ screen: state.screen, productId: state.productId }, ""); lastScreen = state.screen; }
};
window.addEventListener("popstate", (e) => {
  const st = e.state || { screen: "store" };
  state.screen = st.screen; state.productId = st.productId || null; state.cartOpen = false; state.menuOpen = false;
  lastScreen = st.screen; _render();
});

/* ---------- eventos ---------- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  const id = Number(el.dataset.id);

  switch (action) {
    case "open-menu": state.menuOpen = true; render(); break;
    case "close-menu": state.menuOpen = false; render(); break;
    case "open-cart": state.menuOpen = false; state.cartOpen = true; render(); break;
    case "close-cart": state.cartOpen = false; render(); break;
    case "go-store": e.preventDefault(); state.cartOpen = false; goStore(); break;
    case "go-store-open-cart": e.preventDefault(); state.screen = "store"; state.cartOpen = true; render(); break;
    case "go-account": state.menuOpen = false; state.screen = "account"; state.accountSaved = false; render(); break;
    case "go-checkout": state.cartOpen = false; state.screen = "checkout"; state.checkoutStep = 1; render(); break;
    case "go-product":
      e.preventDefault();
      state.screen = "product"; state.productId = id;
      state.productQty = 1; state.productColor = 0; state.productAdded = false;
      render(); break;
    case "filter": state.category = el.dataset.cat; goStore(true); break;
    case "filter-menu": state.category = el.dataset.cat; goStore(true); break;
    case "routine": state.routine = Number(el.dataset.index); render(); break;
    case "add-cart":
      e.stopPropagation(); e.preventDefault();
      addToCart(id); state.cartOpen = true; render(); break;
    case "cart-inc": updateCart(id, 1); render(); break;
    case "cart-dec": updateCart(id, -1); render(); break;
    case "cart-remove": updateCart(id, -999); render(); break;
    case "card-color": state.cardColors[id] = Number(el.dataset.color); render(); break;
    case "product-color": state.productColor = Number(el.dataset.color); render(); break;
    case "qty-inc": state.productQty++; render(); break;
    case "qty-dec": state.productQty = Math.max(1, state.productQty - 1); render(); break;
    case "product-add":
      addToCart(id, state.productQty); state.productAdded = true; render(); break;
    case "toggle-auth-mode": state.accountMode = state.accountMode === "login" ? "signup" : "login"; render(); break;
    case "logout": {
      const p = loadProfile(); delete p.email;
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
      state.accountMode = "login"; render(); break;
    }
    case "account-tab": state.accountTab = el.dataset.tab; state.accountSaved = false; render(); break;
    case "payment": state.payment = el.dataset.pay; render(); break;
    case "checkout-back":
      if (state.checkoutStep === 1) goStore();
      else { state.checkoutStep--; render(); }
      break;
    case "checkout-next": {
      const form = document.querySelector(`form[data-form="checkout-${state.checkoutStep}"]`);
      if (form && !form.reportValidity()) break;
      if (form) {
        const data = Object.fromEntries(new FormData(form));
        localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...loadProfile(), ...data }));
      }
      state.checkoutStep++; render(); break;
    }
    case "info": e.preventDefault(); alert(el.dataset.info + ": página demonstrativa — projeto acadêmico, sem atendimento real."); break;
    case "copy-pix":
      navigator.clipboard?.writeText(el.previousElementSibling.textContent.trim()); el.textContent = "Código copiado!"; break;
    case "checkout-finish": {
      if (state.payment === "credit" || state.payment === "debit") {
        const num = document.getElementById("card-number").value.replace(/\D/g, "");
        const exp = document.getElementById("card-exp").value;
        const cvv = document.getElementById("card-cvv").value.replace(/\D/g, "");
        const name = document.getElementById("card-name").value.trim();
        if (num.length < 13 || !name || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) || cvv.length < 3) {
          alert("Confira os dados do cartão: número, nome, validade (MM/AA) e CVV.");
          break;
        }
      }
      saveOrder(state.payment, state.payment === "credit" ? state.installments : 1);
      state.cart = {}; saveCart(state.cart);
      state.checkoutStep = 1; state.screen = "success";
      render(); break;
    }
  }
});

/* máscaras e parcelas */
document.addEventListener("input", (e) => {
  if (e.target.id === "card-number") e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  if (e.target.id === "card-exp") e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
});
document.addEventListener("change", (e) => {
  if (e.target.id === "installments") state.installments = Number(e.target.value);
});

document.addEventListener("submit", (e) => {
  const form = e.target;
  const kind = form.dataset.form;
  if (!kind) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (kind === "auth") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...loadProfile(), email: String(data.email), ...(data.nome ? { nome: String(data.nome) } : {}) }));
    render();
  } else if (kind === "profile") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...loadProfile(), ...data }));
    state.accountSaved = true;
    render();
  }
});

render();
