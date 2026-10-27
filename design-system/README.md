# Design system do Harvey

Biblioteca e referências ProspectBoost resgatadas do Claude Design. A integração é
um workspace local (`@harvey/design-system`), com API pública, tipos, build e lint
na raiz do repositório. O dashboard operacional em `harvey/web/` mantém seu tema,
modo escuro, comportamento e dados. Os templates usam dados fictícios e não
executam ações do Harvey.

## Abrir as referências

Abra [references/index.html](references/index.html) diretamente no navegador.
Os 33 HTMLs originais, fontes e scripts estão locais: não é necessário instalar
Node, iniciar um servidor ou acessar a internet para visualizá-los. Mantenha a
pasta inteira, pois os HTMLs compartilham assets por caminhos relativos.

Também é possível executar `python3 -m http.server 8000` na raiz e acessar
`http://localhost:8000/design-system/references/`.

## Usar e manter

Com Node 20 ou superior, na raiz do repositório:

```sh
npm ci
npm run check:design-system
```

Em uma aplicação React 18 com compilação JSX:

```jsx
import { Button, Card } from '@harvey/design-system';
import '@harvey/design-system/styles.css';

export function Example() {
  return <Card title="Agentes"><Button iconLeft="plus">Novo agente</Button></Card>;
}
```

O entrypoint é fonte JSX, destinado a bundlers; não é um módulo executável
diretamente pelo Node. O CSS inclui reset global e tokens em `:root`: use em uma
página dedicada ou faça uma integração explícita de tema. Não carregue esse reset
indiscriminadamente sobre o dashboard existente. A biblioteca não integra o wheel
Python nem cria dependência de Node para executar `harvey`.

| Local | Conteúdo |
|---|---|
| `index.js`, `index.d.ts` | API pública dos 38 componentes |
| `components/` | Implementações, declarações e instruções de uso por componente |
| `tokens/`, `styles.css` | Valores canônicos de cores, tipografia, spacing e efeitos |
| [guidelines/FOUNDATIONS.md](guidelines/FOUNDATIONS.md) | Guia visual e editorial original, com caminhos atualizados |
| `templates/dashboard/` | Telas, shell, dados de demonstração e layout responsivo |
| `references/` | HTMLs de componentes, guidelines, telas, thumbnail e painéis originais |
| `references/runtime/` | Scripts reconstruídos e React local; artefatos versionados para uso offline |
| `assets/icons/`, `fonts/` | 88 SVGs e quatro arquivos WOFF2 originais |
| `lint/adherence.json` | Configuração de aderência original, consumida pelo ESLint da raiz |
| [TRIAGE.md](TRIAGE.md), [triage.json](triage.json) | Decisões, conflitos e inventário com SHA-256 por arquivo original |

Não havia `DESIGN.md` (Google Labs/Stitch ou outro) no dump. Os tokens CSS e o guia
preservado são as fontes disponíveis; nenhum documento foi inventado como fonte
original. A marca ProspectBoost e o namespace dos exemplos foram mantidos para
preservar a fidelidade do material, sem renomear o produto Harvey.

## Build, lint e validação

- `npm run build:design-system`: reconstrói o runtime dos componentes, transpila os
  templates e o JSX inline das referências, copia React e licenças e gera o índice.
  O JSX inline fica em scripts inertes `data-reference-jsx`; os scripts executáveis
  são gerados. Edite os fontes, não `references/runtime/`.
- `npm run lint`: usa `eslint.config.mjs`, adaptando a configuração recuperada.
  Mantém avisos de variantes, imports internos, cores e tamanhos literais e fontes.
  Allowlists geradas de props foram removidas porque ignoravam atributos herdados
  (`onClick`, `disabled`, `aria-*`) e confundiam interfaces TypeScript com componentes.
  O `react/forbid-elements` original tinha lista vazia, portanto não impunha regra.
  Tokens/implementações, templates históricos e tema legado têm exceção de valores
  literais; consumidores novos recebem as regras completas. O lint não analisa CSS.
- `npm run typecheck:design-system`: verifica as declarações públicas sem ocultar
  erros de bibliotecas. Conflitos de `onSelect` em Menu e Sidebar foram corrigidos
  com `Omit`, sem mudança de comportamento.
- `npm run test:design-system`: verifica caminhos locais, destinos da triagem e
  prova que as regras de aderência detectam violações em consumidores.
- `python scripts/test_design_system_browser.py`: com Playwright e Chromium
  instalados (`python -m playwright install --with-deps chromium`), abre o catálogo
  e todas as referências via `file://`, offline, e testa tabs e navegação mobile.

O CI executa essas verificações e exige que o runtime versionado esteja atualizado.
Os componentes são os protótipos recuperados, não uma certificação de acessibilidade:
por exemplo, os diálogos originais não implementam gerenciamento completo de foco.

## Proveniência

O guia registra substituições de Gellix por Figtree e ícones por Lucide. Os três
painéis de origem foram mantidos em `references/boards/`, somente como referência
visual. Eles não são imagens do produto Harvey. SVGs mantêm seus metadados originais;
React é distribuído com sua licença em `references/runtime/`.
