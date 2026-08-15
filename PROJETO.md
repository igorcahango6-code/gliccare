# GlicCare — Definição do Projeto

> Documento de premissas e requisitos funcionais. Define **o quê** o app faz, não **como** será construído (decisões técnicas de stack, banco de dados e hospedagem ficam para um documento à parte).

## 1. Visão geral

GlicCare é um aplicativo web para acompanhamento de glicemia, aberto ao público em geral (qualquer pessoa pode se cadastrar e usar). Cada conta é individual e privada.

O app deve funcionar de forma responsiva tanto em computadores quanto em celulares, independentemente do tamanho da tela.

## 2. Público-alvo

- Produto público: qualquer pessoa pode se cadastrar.
- Não é restrito a um tipo específico de diabetes — deve ser flexível o suficiente para atender:
  - Tipo 1
  - Tipo 2
  - Gestacional / pré-diabetes
- Cada usuário decide, conforme sua rotina, se mede a glicemia por método manual (glicosímetro/furar o dedo) ou por sensor (CGM/FreeStyle Libre). O app não impõe um método único.
- Não há, nesta primeira versão, compartilhamento de dados com terceiros (médico, familiar, cuidador) dentro do app. Fica anotado como possível funcionalidade futura.

## 3. Objetivo da primeira versão (MVP)

Oferecer um diário digital completo de acompanhamento, cobrindo não só a medição de glicemia, mas também os fatores que a influenciam: insulina, alimentação e atividade física.

## 4. Funcionalidades e regras

### 4.1 Registro de glicemia
- Unidade de medida: **mg/dL** (padrão brasileiro). Suporte a mmol/L não está previsto nesta versão.
- Usuário registra medições ao longo do dia, informando também o método usado (manual ou sensor), conforme sua preferência.

### 4.2 Alertas de faixa (hipo/hiperglicemia)
- O app alerta quando a glicemia sai da faixa considerada segura.
- **Não há faixa padrão sugerida.** O usuário precisa configurar seus próprios limites (mínimo e máximo) antes de receber alertas — a faixa ideal varia de pessoa para pessoa e deve ser orientada por um médico.

### 4.3 Registro de insulina
- Registro simples: usuário escolhe o tipo de insulina (ex: basal/lenta ou bolus/rápida) e informa a quantidade de unidades aplicadas.
- Não há calculadora automática de dose por contagem de carboidratos nesta versão.

### 4.4 Registro de refeições
- Registro simples via **descrição livre em texto** (ex: "arroz, feijão e frango").
- Não há contagem estruturada de carboidratos em gramas nesta versão.

### 4.5 Registro de atividade física
- Registro simples via **descrição livre em texto** (ex: "caminhada 30 min").
- Sem campos estruturados de tipo/duração/intensidade nesta versão.

### 4.6 Outros itens do diário
Também fazem parte do registro:
- Medicação oral (comprimidos) — relevante especialmente para diabetes tipo 2.
- Peso corporal.
- Pressão arterial.
- Sintomas/observações livres (campo de texto para anotações como "me senti tonto", "estressado", etc.).

### 4.7 Visualização de dados
- O app exibe gráficos e tendências de glicemia (e demais métricas) diretamente na tela.
- **Não há exportação** (PDF, planilha) nesta versão — fica para uma versão futura.

### 4.8 Lembretes e notificações
- O app envia notificações/lembretes (ex: "hora de medir a glicemia", "hora do remédio").
- Horários são configuráveis pelo próprio usuário.

### 4.9 Autenticação e contas
- Cadastro e login por e-mail e senha.
- Cada usuário só acessa os próprios dados.

### 4.10 Privacidade e segurança
- Nível básico nesta versão: dados privados por usuário, senha protegida com boas práticas de segurança (criptografia de senha, HTTPS).
- Não há, por enquanto, política formal de LGPD, termos de uso ou funcionalidade de exportar/apagar todos os dados — considerar para uma versão futura, já que dados de saúde são sensíveis.

### 4.11 Conectividade
- O app assume conexão com internet disponível no momento do uso. **Não é necessário suporte offline** nesta versão.

### 4.12 Idioma
- Apenas português (Brasil) nesta versão.

### 4.13 Monetização
- Totalmente gratuito nesta primeira versão. Nenhum plano pago está sendo desenhado ainda.

## 5. Requisito transversal: responsividade

O app deve ser utilizável em qualquer tamanho de tela — desktop, tablet e celular — com a mesma qualidade de experiência, adaptando o layout conforme necessário (design responsivo).

## 6. Fora do escopo desta versão (possíveis versões futuras)

- Unidade mmol/L e conversão automática de unidades.
- Calculadora de dose de insulina por contagem de carboidratos.
- Contagem estruturada de carboidratos (gramas).
- Registro estruturado de atividade física (tipo/duração/intensidade).
- Exportação de relatórios (PDF/planilha).
- Suporte offline com sincronização posterior.
- Compartilhamento de dados com médico/familiar/cuidador.
- Login social (Google, etc.).
- Política formal de LGPD, termos de uso, exportação/exclusão de dados pelo usuário.
- Suporte a múltiplos idiomas.
- Modelo de monetização (planos pagos).

## 7. Glossário (para apoio a quem tem pouco conhecimento sobre diabetes)

- **Glicemia**: nível de glicose (açúcar) no sangue, medido em mg/dL no Brasil.
- **Hipoglicemia**: glicemia abaixo do considerado seguro (geralmente < 70 mg/dL, mas varia por pessoa).
- **Hiperglicemia**: glicemia acima do considerado seguro (geralmente > 180 mg/dL, mas varia por pessoa).
- **Insulina basal**: insulina de ação lenta/prolongada, mantém um nível constante ao longo do dia.
- **Insulina bolus**: insulina de ação rápida, aplicada geralmente antes das refeições para controlar o pico de glicemia.
- **CGM (Monitoramento Contínuo de Glicose)**: sensor que mede a glicemia continuamente, sem necessidade de furar o dedo a cada medição (ex: FreeStyle Libre).
- **Contagem de carboidratos**: técnica de estimar em gramas os carboidratos de uma refeição, usada para calcular doses de insulina (não incluída nesta versão).

---
*Documento gerado a partir de entrevista de definição de requisitos em 15/08/2026.*
