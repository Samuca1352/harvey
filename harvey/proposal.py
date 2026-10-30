"""Zero-token personalized 1-page mobile PDF proposal generator.

Renders a 9:16 mobile-screen HTML template via Playwright Chromium (already
installed in the runtime container and venv) customized with the store's name,
monogram, segment product examples, and niche color palette.
"""

import html
import logging
import re
import unicodedata

from harvey.integrations.whatsapp import PROPOSAL_PDF_SUBJECT  # noqa: F401

logger = logging.getLogger("harvey.proposal")

THEMES = (
    (
        re.compile(r"semij[oó]ia|j[oó]ia|bijut|biju|acess[oó]rio|prata|ouro|alian[cç]a", re.I),
        {
            "label": "Champagne & Ouro 18k",
            "hero_bg": "linear-gradient(135deg, #191513 0%, #2A221D 100%)",
            "accent": "#C89D60",
            "accent_dark": "#9E7236",
            "accent_soft": "#E8D3B3",
            "page_bg": "#FAF6F0",
            "items_example": "Escolhe brincos, colares e anéis vendo foto e preço",
        },
    ),
    (
        re.compile(r"infantil|kids|baby|beb[eê]|crian[cç]a|brinquedo|enxoval", re.I),
        {
            "label": "Azul & Coral Suave",
            "hero_bg": "linear-gradient(135deg, #182430 0%, #243748 100%)",
            "accent": "#D87A56",
            "accent_dark": "#B55B38",
            "accent_soft": "#F2CBB9",
            "page_bg": "#F7F9FB",
            "items_example": "Escolhe roupas, tamanhos e idades vendo foto e preço",
        },
    ),
    (
        re.compile(r"cal[cç]ado|sapato|sapataria|bota|sand[aá]lia|chinelo|bolsa|couro", re.I),
        {
            "label": "Couro & Âmbar",
            "hero_bg": "linear-gradient(135deg, #211813 0%, #33241B 100%)",
            "accent": "#C4844E",
            "accent_dark": "#996030",
            "accent_soft": "#E8C8AB",
            "page_bg": "#FAF6F2",
            "items_example": "Escolhe modelos, cores e numeração vendo foto e preço",
        },
    ),
    (
        re.compile(r"moda|boutique|vestido|roupa|feminina|masculina|jeans|fitness|lingerie|bazar", re.I),
        {
            "label": "Editorial Terracota & Areia",
            "hero_bg": "linear-gradient(135deg, #23181A 0%, #342326 100%)",
            "accent": "#C67D73",
            "accent_dark": "#9E584E",
            "accent_soft": "#EBC8C3",
            "page_bg": "#FBF7F6",
            "items_example": "Escolhe peças, cores e tamanhos vendo foto e preço",
        },
    ),
)

DEFAULT_THEME = {
    "label": "Elegante & Moderno",
    "hero_bg": "linear-gradient(135deg, #16221E 0%, #22352E 100%)",
    "accent": "#4A9B76",
    "accent_dark": "#2F7A58",
    "accent_soft": "#BFE3D2",
    "page_bg": "#F6FAF8",
    "items_example": "Escolhe os produtos na sacola vendo foto e preço",
}


def store_monogram(name: str) -> str:
    stop = {"de", "da", "do", "das", "dos", "e", "a", "o", "loja", "store", "modas", "moda"}
    words = [w for w in re.findall(r"[A-Za-zÀ-ÿ0-9]+", name or "") if w.lower() not in stop]
    if not words:
        words = re.findall(r"[A-Za-zÀ-ÿ0-9]+", name or "Loja")
    if len(words) >= 2:
        return (words[0][0] + words[1][0]).upper()
    return (words[0][:2] if words else "LJ").upper()


def store_slug(name: str) -> str:
    norm = unicodedata.normalize("NFKD", name or "Loja")
    clean = "".join(c for c in norm if not unicodedata.combining(c))
    slug = re.sub(r"[^A-Za-z0-9]+", "-", clean).strip("-")
    return slug[:36] or "Loja"


def pick_theme(store_name: str, industry: str = "") -> dict:
    haystack = f"{store_name} {industry}"
    for pattern, theme in THEMES:
        if pattern.search(haystack):
            return theme
    return DEFAULT_THEME


def proposal_filename(store_name: str) -> str:
    return f"Proposta-{store_slug(store_name)}.pdf"


def build_proposal_html(store_name: str, industry: str = "", persona_name: str = "Rafael") -> str:
    clean_name = (store_name or "Sua Loja").strip()
    short_name = clean_name.split(" - ")[0].split(" | ")[0].strip() or clean_name
    theme = pick_theme(clean_name, industry)
    mono = html.escape(store_monogram(short_name))
    esc_name = html.escape(clean_name)
    esc_short = html.escape(short_name)
    esc_persona = html.escape(persona_name or "Rafael")
    domain_hint = re.sub(r"[^a-z0-9]", "", store_slug(short_name).lower())[:18] or "sualoja"

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  @page {{ size: 440px 920px; margin: 0; }}
  html, body {{
    width: 440px; height: 920px;
    background: {theme['page_bg']}; color: #1A1614;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased; overflow: hidden;
  }}
  .page {{
    width: 440px; height: 920px; padding: 22px 22px 18px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: {theme['page_bg']};
  }}
  .hero {{
    background: {theme['hero_bg']};
    border-radius: 18px; padding: 18px 18px 16px; color: #FDFBF7;
    border: 1px solid {theme['accent']}66;
    box-shadow: 0 10px 24px rgba(25, 21, 19, 0.14);
  }}
  .top-row {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 11px; }}
  .tag {{
    font-size: 9.5px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase;
    color: {theme['accent_soft']}; background: rgba(255,255,255,0.08);
    border: 1px solid {theme['accent']}66; padding: 4px 9px; border-radius: 999px;
  }}
  .date {{ font-size: 10px; color: #C5B9B0; }}
  .brand-row {{ display: flex; align-items: center; gap: 12px; }}
  .monogram {{
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, {theme['accent']} 0%, {theme['accent_dark']} 100%);
    color: #FFFFFF; font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700; font-size: 21px; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }}
  .store-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px; font-weight: 700; line-height: 1.1; color: #FFFFFF;
  }}
  .store-sub {{ font-size: 11.2px; color: #D8CFC5; margin-top: 3px; }}
  .palette-bar {{
    margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: space-between;
    font-size: 10.3px; color: #CFC4B8;
  }}
  .swatches {{ display: flex; align-items: center; gap: 5px; }}
  .swatch {{ width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.4); }}
  .section-label {{
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1.1px; color: {theme['accent_dark']}; margin-bottom: 6px;
  }}
  .mockup-card {{
    background: #FFFFFF; border-radius: 15px; padding: 12px 14px;
    border: 1px solid #E7DDD0; box-shadow: 0 4px 12px rgba(26, 22, 20, 0.04);
  }}
  .steps {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px; }}
  .step {{ background: {theme['page_bg']}; border: 1px solid #EAE2D7; border-radius: 10px; padding: 8px; }}
  .step-num {{ font-size: 9.5px; font-weight: 800; color: {theme['accent_dark']}; text-transform: uppercase; }}
  .step-text {{ font-size: 10.4px; font-weight: 600; color: #26201D; margin-top: 2px; line-height: 1.28; }}
  .zero-fee {{
    display: flex; align-items: center; justify-content: space-between;
    background: #F4EFE6; border-radius: 9px; padding: 7px 10px;
    font-size: 10.6px; font-weight: 600; color: #3A2E25;
  }}
  .zero-badge {{
    background: #1E6B47; color: #FFFFFF; font-size: 9.5px;
    font-weight: 700; padding: 3px 7px; border-radius: 99px;
  }}
  .plans-grid {{ display: grid; grid-template-columns: 1fr 1.08fr; gap: 10px; margin-top: 10px; }}
  .plan {{
    background: #FFFFFF; border-radius: 15px; padding: 13px 13px 12px;
    border: 1px solid #E5DBD0; display: flex; flex-direction: column; justify-content: space-between;
  }}
  .plan.pro {{
    background: linear-gradient(180deg, #FFFFFF 0%, {theme['page_bg']} 100%);
    border: 2px solid {theme['accent']}; position: relative;
  }}
  .popular-pill {{
    position: absolute; top: -9px; right: 10px;
    background: linear-gradient(135deg, {theme['accent']} 0%, {theme['accent_dark']} 100%);
    color: #FFFFFF; font-size: 8.8px; font-weight: 800; letter-spacing: 0.6px;
    text-transform: uppercase; padding: 3px 8px; border-radius: 99px;
  }}
  .plan-name {{ font-size: 13px; font-weight: 800; color: #1A1614; }}
  .plan-desc {{ font-size: 10px; color: #6E6259; margin-top: 2px; }}
  .price-row {{ margin: 9px 0; display: flex; align-items: baseline; gap: 2px; }}
  .currency {{ font-size: 12px; font-weight: 700; color: #4A3F37; }}
  .amount {{ font-size: 25px; font-weight: 800; letter-spacing: -0.8px; color: #191513; }}
  .period {{ font-size: 10.5px; color: #776B61; font-weight: 500; }}
  .features {{ list-style: none; display: flex; flex-direction: column; gap: 5.5px; }}
  .features li {{ font-size: 10.2px; line-height: 1.3; color: #2E2723; display: flex; align-items: flex-start; gap: 5px; }}
  .check {{ color: {theme['accent_dark']}; font-weight: 800; flex-shrink: 0; }}
  .pro-highlight {{ background: {theme['accent']}26; border-radius: 6px; padding: 3px 5px; font-weight: 700; color: #1A1614; }}
  .cta-box {{
    background: {theme['hero_bg']}; border-radius: 16px; padding: 14px 15px;
    color: #FFFFFF; border: 1px solid {theme['accent']}77;
  }}
  .cta-head {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }}
  .cta-title {{ font-size: 12.6px; font-weight: 800; color: {theme['accent_soft']}; }}
  .free-pill {{
    background: rgba(46, 204, 113, 0.18); border: 1px solid rgba(46, 204, 113, 0.45);
    color: #7CE6A7; font-size: 9px; font-weight: 800; padding: 2.5px 7px; border-radius: 99px; text-transform: uppercase;
  }}
  .cta-text {{ font-size: 10.5px; line-height: 1.38; color: #E2DAD0; margin-bottom: 10px; }}
  .cta-buttons {{ display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }}
  .btn {{
    display: block; text-align: center; text-decoration: none;
    padding: 8px; border-radius: 9px; font-size: 10.2px; font-weight: 700;
  }}
  .btn-gold {{ background: linear-gradient(135deg, {theme['accent']} 0%, {theme['accent_dark']} 100%); color: #FFFFFF; }}
  .btn-outline {{ background: rgba(255,255,255,0.08); color: #FFFFFF; border: 1px solid {theme['accent_soft']}66; }}
  .footer {{ display: flex; align-items: center; justify-content: space-between; font-size: 9.8px; color: #7A6E65; padding: 0 2px; }}
  .footer strong {{ color: #3D352E; }}
</style>
</head>
<body>
  <div class="page">
    <div class="hero">
      <div class="top-row">
        <span class="tag">Proposta Comercial</span>
        <span class="date">Válida por 7 dias</span>
      </div>
      <div class="brand-row">
        <div class="monogram">{mono}</div>
        <div>
          <div class="store-title">{esc_name}</div>
          <div class="store-sub">Vitrine Online + Pedidos Prontos no WhatsApp</div>
        </div>
      </div>
      <div class="palette-bar">
        <span>Identidade sugerida: {html.escape(theme['label'])}</span>
        <div class="swatches">
          <span class="swatch" style="background:#191513"></span>
          <span class="swatch" style="background:{theme['accent']}"></span>
          <span class="swatch" style="background:{theme['accent_soft']}"></span>
          <span class="swatch" style="background:{theme['page_bg']}"></span>
        </div>
      </div>
    </div>

    <div>
      <div class="section-label">Como funciona para os clientes da {esc_short}</div>
      <div class="mockup-card">
        <div class="steps">
          <div class="step">
            <div class="step-num">1. Acesso</div>
            <div class="step-text">Cliente abre o link da {esc_short} na bio ou no Zap</div>
          </div>
          <div class="step">
            <div class="step-num">2. Sacola</div>
            <div class="step-text">{html.escape(theme['items_example'])}</div>
          </div>
          <div class="step">
            <div class="step-num">3. Fechamento</div>
            <div class="step-text">O pedido chega pronto no seu WhatsApp</div>
          </div>
        </div>
        <div class="zero-fee">
          <span>Você recebe 100% do valor direto do seu cliente</span>
          <span class="zero-badge">0% de comissão</span>
        </div>
      </div>
    </div>

    <div>
      <div class="section-label">Planos mensais (sem fidelidade ou taxa de adesão)</div>
      <div class="plans-grid">
        <div class="plan">
          <div>
            <div class="plan-name">Plano Básico</div>
            <div class="plan-desc">Vitrine completa no ar</div>
            <div class="price-row">
              <span class="currency">R$</span>
              <span class="amount">97</span>
              <span class="period">/mês</span>
            </div>
            <ul class="features">
              <li><span class="check">✓</span><span>Vitrine personalizada com logo e cores da {esc_short}</span></li>
              <li><span class="check">✓</span><span>Domínio próprio incluso (ex: {domain_hint}.com.br)</span></li>
              <li><span class="check">✓</span><span>Sacola de pedidos direto no seu WhatsApp</span></li>
              <li><span class="check">✓</span><span>Produtos, fotos e categorias ilimitados</span></li>
              <li><span class="check">✓</span><span>Suporte em português pelo WhatsApp</span></li>
            </ul>
          </div>
        </div>

        <div class="plan pro">
          <div class="popular-pill">Mais escolhido</div>
          <div>
            <div class="plan-name">Plano Pro</div>
            <div class="plan-desc">Vitrine + Design toda semana</div>
            <div class="price-row">
              <span class="currency">R$</span>
              <span class="amount">197</span>
              <span class="period">/mês</span>
            </div>
            <ul class="features">
              <li><span class="check">✓</span><span><strong>Tudo do Plano Básico incluso</strong></span></li>
              <li><span class="check">✓</span><span class="pro-highlight">2 artes exclusivas por semana feitas por designer</span></li>
              <li><span class="check">✓</span><span>Artes prontas para postar no Feed, Stories e Status</span></li>
              <li><span class="check">✓</span><span>Banners da vitrine atualizados para promoções e datas</span></li>
              <li><span class="check">✓</span><span>Acompanhamento próximo da nossa equipe</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-box">
      <div class="cta-head">
        <span class="cta-title">✦ Prévia Grátis de 15 Dias — Nós Montamos pra Você</span>
        <span class="free-pill">Sem Cartão</span>
      </div>
      <div class="cta-text">
        Não precisa cadastrar nada sozinho: basta responder no WhatsApp com o <strong>@ do Instagram da {esc_short}</strong> (ou 3 fotos de produtos) e nossa equipe deixa a prévia da sua vitrine pronta para testar por 15 dias sem compromisso.
      </div>
      <div class="cta-buttons">
        <a class="btn btn-gold" href="https://painel.prospectboost.com.br/cadastro">Criar Teste Grátis Agora</a>
        <a class="btn btn-outline" href="https://loja-demo.prospectboost.com.br/">Ver Loja Modelo ao Vivo</a>
      </div>
    </div>

    <div class="footer">
      <span><strong>{esc_persona}</strong> • Equipe Vitrine ProspectBoost</span>
      <span>loja-demo.prospectboost.com.br</span>
    </div>
  </div>
</body>
</html>"""


async def render_proposal_pdf(store_name: str, industry: str = "", persona_name: str = "Rafael") -> bytes:
    """Render the 1-page personalized mobile PDF proposal using Playwright."""
    from playwright.async_api import async_playwright

    markup = build_proposal_html(store_name, industry=industry, persona_name=persona_name)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        try:
            page = await browser.new_page(viewport={"width": 440, "height": 920})
            await page.set_content(markup, wait_until="networkidle")
            return await page.pdf(
                width="440px",
                height="920px",
                print_background=True,
                margin={"top": "0px", "right": "0px", "bottom": "0px", "left": "0px"},
            )
        finally:
            await browser.close()

