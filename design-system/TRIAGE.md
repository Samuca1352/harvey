# Relatório de triagem e integração

Foram lidos os **256 arquivos** do dump antes da migração, incluindo arquivos
ocultos e bytes dos binários. A classificação individual, destino, justificativa
e SHA-256 original estão em [triage.json](triage.json).

## Resultado

- 251 arquivos canônicos preservados: fontes, tipos, instruções, tokens, assets,
  configuração de lint e referências. Nenhum arquivo canônico foi descartado.
- 1 derivado descartado: `_ds_bundle.js`, substituído por build dos fontes.
- 4 internos descartados: `_ds_manifest.json`, `.thumbnail`, `scratch/devns.js`,
  `SKILL.md`. O último só instruía a ferramenta a ler o guia; não continha regras
  visuais exclusivas.
- 33 HTMLs preservados em `references/`, incluindo `_preview.html` e
  `thumbnail.html`. O catálogo `references/index.html` é novo.
- Não existe `DESIGN.md` em nenhuma subpasta do dump; também não há export aninhado
  nem segundo arquivo JSX concorrente para o mesmo componente.

## Comparações e escolhas

| Conflito aparente | Evidência e decisão |
|---|---|
| `components/**` versus `_ds_bundle.js` | Os 44 hashes registrados no cabeçalho do bundle coincidem com SHA-256 dos fontes (12 primeiros caracteres). A lista de exports e as implementações compiladas correspondem aos fontes. Nenhuma variante exclusiva ou revisão mais recente no bundle; JSX, tipos e CSS são canônicos. |
| `scratch/devns.js` versus bundle | O scratch enumera e transpila os mesmos módulos por XHR síncrono, sem componentes próprios. Removido; runtime reconstruído. |
| `index.html`, `_preview.html`, `home.html`, `agent.html`, `tasks.html`, `artifacts.html` | São shells do mesmo App; diferem em metadados, fallback do loader e `PB_START`. Não são implementações alternativas de telas. Todos preservados como referências, compartilhando os mesmos fontes e runtime. |
| `mobile.html` e `ios-frame.jsx` | Mobile enquadra o mesmo App num iframe de 402px. A moldura contém primitivas iOS distintas, não variantes concorrentes dos componentes `pb-*`; preservada como template de referência. |
| SVGs, `icons.js` e guideline de iconografia | Representações destinadas respectivamente a assets, React inline e catálogo visual. Mantidas: os formatos têm consumidores diferentes. |
| `.thumbnail` versus `thumbnail.html` | WebP interno descartado; HTML visual preservado e funcional. |
| `uploads/*.jpg` | Três painéis únicos explicitamente citados pelo guia como fontes visuais. Conservadoramente promovidos a referências canônicas em `references/boards/`, sem uso no produto. |
| Configuração de aderência | Original preservado integralmente. ESLint da raiz aplica as regras úteis; remove allowlists inválidas de props e a regra vazia de elementos. Exceções de valores literais limitadas aos fundamentos, templates importados e dashboard legado. |
| Tipos de Menu e Sidebar | `onSelect` customizado conflitava com evento nativo herdado. Corrigido com `Omit<..., 'onSelect'>`, validado com TypeScript estrito. |
| Design ProspectBoost versus dashboard Harvey | Tokens, resets e marca diferem. Biblioteca integrada ao workspace, build, lint e CI; nenhuma substituição automática do dashboard, nenhuma ligação dos mocks às APIs reais. |

Não há metadado confiável de data de autoria para ordenar revisões; a comparação
por conteúdo e hashes evitou inferir “mais recente” pelo nome ou ordem de diretórios.
As variantes abaixo foram verificadas contra as declarações e o código, juntamente
com estados CSS de hover, foco, active e disabled. Cada fonte tem correspondência
no bundle; nenhuma versão concorrente oferece variantes adicionais.

| Fonte canônica | Exports | Variantes declaradas |
|---|---|---|
| `components/core/Avatar.jsx` | Avatar | number |
| `components/core/Badge.jsx` | Badge, Count | BadgeTone; 'sm' \| 'md' |
| `components/core/Button.jsx` | Button | 'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'danger'; 'sm' \| 'md' \| 'lg' |
| `components/core/Card.jsx` | Card, Inset | 'outline' \| 'tile' \| 'flat' |
| `components/core/Eyebrow.jsx` | Eyebrow | Props/estados preservados integralmente |
| `components/core/Icon.jsx` | Icon | number |
| `components/core/IconButton.jsx` | IconButton | 'ghost' \| 'outline' \| 'soft' \| 'primary'; 'sm' \| 'md' \| 'lg' |
| `components/core/IconChip.jsx` | IconChip | number |
| `components/core/Kbd.jsx` | Kbd | Props/estados preservados integralmente |
| `components/core/StatusDot.jsx` | StatusDot | 'queued' \| 'running' \| 'success' \| 'failed' \| 'doc' \| 'sheet' \| 'sequence' \| 'other'; number |
| `components/data/ActionRow.jsx` | ActionRow | Props/estados preservados integralmente |
| `components/data/ActivityCard.jsx` | ActivityCard | Props/estados preservados integralmente |
| `components/data/ArtifactCard.jsx` | ArtifactCard | 'doc' \| 'sheet' \| 'sequence' \| 'list' |
| `components/data/DataTable.jsx` | DataTable | Props/estados preservados integralmente |
| `components/data/KanbanColumn.jsx` | KanbanColumn | 'queued' \| 'running' \| 'success' \| 'failed' |
| `components/data/MetricCard.jsx` | MiniChart, MetricCard | 'green' \| 'red' \| 'orange' \| 'blue' \| 'neutral'; 'green' \| 'red' \| 'orange' \| 'blue' |
| `components/data/ProgressCard.jsx` | ProgressCard | Props/estados preservados integralmente |
| `components/data/SegmentBar.jsx` | SegmentBar | Props/estados preservados integralmente |
| `components/data/TaskCard.jsx` | TaskCard | import('../core/Badge').BadgeTone |
| `components/feedback/Dialog.jsx` | Dialog | Props/estados preservados integralmente |
| `components/feedback/Menu.jsx` | Menu, MenuTrigger | Props/estados preservados integralmente |
| `components/feedback/Toast.jsx` | Toast | 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral' |
| `components/feedback/Tooltip.jsx` | Tooltip | 'top' \| 'bottom' |
| `components/forms/Checkbox.jsx` | Checkbox | Props/estados preservados integralmente |
| `components/forms/Composer.jsx` | Composer | Props/estados preservados integralmente |
| `components/forms/Input.jsx` | Input | 'outline' \| 'filled'; 'sm' \| 'md' \| 'lg' |
| `components/forms/Radio.jsx` | Radio | Props/estados preservados integralmente |
| `components/forms/Select.jsx` | Select | 'sm' \| 'md' \| 'lg'; 'outline' \| 'filled' |
| `components/forms/Switch.jsx` | Switch | Props/estados preservados integralmente |
| `components/forms/Textarea.jsx` | Textarea | Props/estados preservados integralmente |
| `components/navigation/FilterTabs.jsx` | FilterTabs | string |
| `components/navigation/NavItem.jsx` | NavItem | Props/estados preservados integralmente |
| `components/navigation/Sidebar.jsx` | Sidebar | Props/estados preservados integralmente |
| `components/navigation/Tabs.jsx` | Tabs | 'sm' \| 'md' |

## Validação

Build reproduzível a partir dos fontes; lint; declarações TypeScript estritas;
verificação de caminhos locais e da atuação das regras em consumidores; abertura
offline de todos os HTMLs e teste de tabs e drawer mobile. Resultados finais da
execução estão registrados abaixo antes da remoção do dump.

As bibliotecas Linux ausentes no ambiente de validação foram extraídas em `/tmp`
para executar Chromium, sem alteração do sistema ou dependência disso no projeto.

Resultados em 24/10/2026:

- `npm run check:design-system`: build, lint sem avisos, tipos e checks aprovados;
  170 caminhos locais verificados, 256 destinos/classificações auditados.
- Chromium: 34 páginas (33 originais + catálogo) abertas via `file://`, offline,
  sem erros de JavaScript ou requisições quebradas; tabs e drawer mobile aprovados.
- Inspeção visual de Home em 1440×900 e 390×844 concluída.
- `pytest -q tests/test_dashboard_signals.py`: 21 testes aprovados.
- Conferência pré-exclusão: 214 arquivos preservados byte a byte, 37 adaptados
  (33 HTMLs, dois documentos e dois tipos); cinco arquivos internos/derivados
  excluídos. Todos os SHA-256 originais conferidos novamente.

As alterações locais que já existiam em Python, dashboard, configuração,
prompts e testes foram preservadas. A migração não criou commit nem publicou nada.

A regra preexistente `data/` do `.gitignore` também ocultava componentes de dados.
Foram adicionadas exceções explícitas para essas duas pastas do design system,
preservando a exclusão dos dados operacionais. O ignore do lint foi limitado à
pasta `data/` da raiz para não pular esses componentes.
`git diff --check` nos arquivos alterados pela migração passou; a verificação global
aponta uma linha em branco já existente em `harvey/state.py`, deixada intacta.
