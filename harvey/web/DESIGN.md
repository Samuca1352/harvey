# Integração visual

O dashboard mantém HTML/CSS/JavaScript e os endpoints existentes, sem React ou
build obrigatório. A referência é `design-system/guidelines/FOUNDATIONS.md` e o
kit em `design-system/references/ui_kits/dashboard/`.

`design-tokens.css` contém os tokens canônicos concatenados, na ordem colors,
typography, spacing, effects. Não inclui o reset global da biblioteca. Para
atualizar, concatene novamente esses quatro arquivos, preservando o comentário
de origem. As fontes Figtree são cópias dos arquivos em `design-system/fonts/`.
Os ícones de navegação são SVGs Lucide do catálogo, sem metadados de proveniência
embutidos; os originais permanecem no design system.

`app.css` mapeia os tokens para as variáveis usadas pelos renderizadores atuais.
O tema escuro estende as superfícies e cores semânticas, inclusive quando o modo
é automático. A camada de adaptação ao final define sidebar, cartões aninhados,
campos e tabelas. Em até 860px, a navegação vira drawer com Escape, retorno de
foco e contenção de Tab. Tabelas extensas mantêm rolagem no próprio painel para
preservar todas as colunas e ações.

A biblioteca e as fontes são locais e empacotadas pelos padrões já existentes
em `pyproject.toml`; o dashboard instalado não depende de `design-system/`.

## Validação da refatoração

Chromium via Playwright contra a API local: 14 telas em 1440, 768, 390 e 360px,
nos temas claro e escuro (112 combinações), sem erros JavaScript ou overflow da
página. Revisão de screenshots de Today, Signals, Companies, Outbox, Aberturas e
Settings. Também verificados tema automático/persistido, drawer por teclado,
Escape, drilldown de empresas e links da fila. As tabelas podem rolar internamente.
Nenhum envio, aprovação, descoberta paga ou alteração de credenciais foi acionado.

`pytest tests/test_dashboard_signals.py -q`: 21 testes passaram.
`npm run check:design-system`: build, lint, tipos e integridade passaram.
