# Plano de Desenvolvimento de MVP: Centralizador Financeiro Inteligente (v1.0)

## 1. Mudanças Críticas na Estratégia

### Pivô de Categorização

A categorização nativa da Pluggy foi **reprovada nos testes**.

*   **Solução:** Implementar um "**Enrichment Pipeline**". O dado chega da Pluggy -> Firebase Function envia para LLM (OpenAI/Gemini) -> LLM devolve categoria normalizada -> Salva no Firestore.

### Dashboard Expandido

O MVP agora exige **cálculos de performance** (Rentabilidade, Comparação com CDI/Ibovespa) e **distinção clara de tipos de renda**.

## 2. Core Feature Set (Escopo Atualizado)

### Novas Inclusões (IN)

1.  **Recategorização com IA:**
    *   **Prompt de sistema para a IA:** "Dada a transação 'X' com MCC 'Y', classifique em uma das seguintes categorias: [Lista de Categorias]."
    *   Interface para o usuário corrigir caso a IA erre (aprendizado).

2.  **Cálculo de Rentabilidade vs. Benchmarks:**
    *   Ingestão de dados de mercado (CDI, IBOV, IFIX) para criar as linhas de comparação.
    *   Cálculo de rentabilidade da carteira (Sugiro usar método simples de cotação inicial vs final para o MVP, evitando cálculos complexos de TWRR/MWRR por enquanto).

3.  **Dashboard Financeiro Completo:**
    *   **Gráficos:**
        *   Evolução Patrimonial (Linha).
        *   Renda Ativa vs. Passiva (Barras empilhadas ou comparativas).
        *   Composição de Gastos (Donut).
        *   Performance Investimentos Ano (Barras: Minha Carteira vs CDI vs IBOV).
    *   **Listas e Filtros:**
        *   Filtro por Período (Mês, Ano, YTD).
        *   Lista de Últimas Transações com ícone de categoria.

## 3. Technology Stack (Ajustada)

| Componente | Tecnologias Sugeridas | Observações |
| :--- | :--- | :--- |
| **Frontend** | Next.js, Tailwind, Radix UI, Recharts (ou Tremor) | Recharts/Tremor para os gráficos complexos. |
| **Backend** | Firebase (Firestore/Auth) | Firebase Functions (Node.js) para lógica de backend. |
| **AI/LLM** | OpenAI API (gpt-4o-mini) ou Google Gemini Flash | Modelos baratos e rápidos, ideais para classificação de transações em tempo real. |
| **Dados de Mercado (Benchmarks)** | Brapi.dev, API do Banco Central (BCB) | Brapi.dev para B3/Ações. BCB para histórico do CDI (gratuita). |

## 4. Development Phases (Roadmap Revisado)

> O prazo deve aumentar em cerca de **2-3 semanas** devido à complexidade extra.

| Fase | Duração Estimada | Atividades Principais |
| :--- | :--- | :--- |
| **Fase 1: Setup & Ingestão** | Semanas 1-3 | Setup Next.js/Firebase. Integração Pluggy (Webhooks). **[NOVO]** Pipeline de LLM: Criar a Cloud Function que intercepta a transação e consulta a IA. |
| **Fase 2: Processamento de Dados** | Semanas 4-6 | **[NOVO]** Jobs agendados (Pub/Sub) para buscar CDI/IBOV diariamente. **[NOVO]** Lógica de cálculo: Separar Renda Ativa (Salário/Freelance) de Renda Passiva (Dividendos), exigindo regras claras de identificação na entrada. |
| **Fase 3: Construção do Dashboard** | Semanas 7-10 | Implementação dos gráficos (Recharts). Visualização de comparação de benchmarks. |
| **Fase 4: Polimento e Teste** | Semana 11 | Testes finais e polimento da interface. |

## 5. Key Risks & Mitigation (Novos Riscos)

### Risco (Custo)

*   **Risco:** O uso da API da OpenAI/Gemini tem custo por token.
*   **Mitigação:** Usar modelos "**mini**" ou "**flash**". O custo será irrisório para 3 usuários, mas deve ser monitorado.

### Risco (Matemático)

*   **Risco:** Calcular rentabilidade de carteira com aportes e retiradas constantes é difícil (Cálculo de Cota). Se fizer errado, o gráfico mostra picos falsos.
*   **Mitigação:** Para o MVP, faremos o cálculo simples: `(Valor Atual - Valor Investido) / Valor Investido`. Aceitamos a imprecisão matemática em prol da visualização rápida.
