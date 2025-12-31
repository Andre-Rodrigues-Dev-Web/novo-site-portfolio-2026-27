export const posts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
        category: 'Tecnologia',
        title: 'O Futuro do Desenvolvimento Web com IA',
        excerpt: 'Como a inteligência artificial está transformando a maneira como escrevemos código e criamos interfaces.',
        content: `
            <p>A inteligência artificial (IA) deixou de ser uma promessa futurista para se tornar uma ferramenta indispensável no dia a dia de desenvolvedores web.</p>
            <h3>Automatização de Código</h3>
            <p>Ferramentas como GitHub Copilot e ChatGPT estão permitindo que engenheiros escrevam boilerplate, testes e até funções complexas em segundos.</p>
            <h3>Otimização de Interfaces</h3>
            <p>Além do código, a IA está ajudando a criar interfaces mais intuitivas e personalizadas para os usuários final.</p>
            <p>Conclusão: A IA não vai substituir os desenvolvedores, mas os desenvolvedores que usam IA vão substituir os que não usam.</p>
        `,
        date: '31 de Dezembro, 2025'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
        category: 'Desenvolvimento',
        title: 'Deno 2.6: Chegou o dx, TSGO e Segurança Granular',
        excerpt: 'Descubra as novidades do Deno 2.6, incluindo o novo executor de pacotes dx, verificação de tipos 2x mais rápida e auditoria de vulnerabilidades nativa.',
        content: [
            {
                type: 'text',
                value: '<p>A versão 2.6 do Deno acaba de ser lançada, trazendo melhorias significativas em performance, segurança e experiência do desenvolvedor. Para atualizar, basta rodar <code>deno upgrade</code>.</p><h3>Conheça o <code>dx</code>: O Executor de Pacotes</h3><p>O Deno 2.6 introduz o <strong>dx</strong>, uma ferramenta equivalente ao <code>npx</code>, mas com o modelo de segurança robusto do Deno. Ele permite executar binários de pacotes npm e JSR com facilidade.</p>'
            },
            {
                type: 'code',
                language: 'bash',
                value: '$ dx cowsay "Olá, Deno!"'
            },
            {
                type: 'text',
                value: '<p>Diferente do npx, o dx avisa antes de baixar pacotes e bloqueia scripts de ciclo de vida por padrão, a menos que você os aprove explicitamente.</p><h3>TSGO: Verificação de Tipos Ultra-rápida</h3><p>Esta versão integra o <strong>TSGO</strong>, um novo verificador de tipos experimental escrito em Go. Ele oferece uma melhoria de velocidade de até 2x em relação à implementação anterior. Você pode ativá-lo com a flag <code>--unstable-tsgo</code>.</p><h3>Segurança e Auditoria</h3><p>A segurança continua sendo prioridade com duas grandes adições:</p><ul><li><strong>Permissões Granulares:</strong> Novas flags como <code>--ignore-read</code> e <code>--ignore-env</code> permitem negar acesso a arquivos ou variáveis específicas sem quebrar a aplicação (retornando <em>NotFound</em> ou <em>undefined</em> em vez de erros de permissão).</li><li><strong>Deno Audit:</strong> O novo comando <code>deno audit</code> verifica vulnerabilidades em suas dependências consultando o banco de dados CVE do GitHub e, opcionalmente, o socket.dev.</li></ul><h3>Compatibilidade com Node.js</h3><p>O Deno 2.6 melhora ainda mais a compatibilidade com o ecossistema Node. Agora, os tipos <code>@types/node</code> são incluídos por padrão, garantindo autocompletar e segurança de tipos sem configuração extra. Além disso, foi adicionada a flag <code>--require</code> para pré-carregar módulos CommonJS.</p><p>Com melhorias no V8 (versão 14.2) e otimizações de memória, o Deno 2.6 se consolida como uma ferramenta poderosa para desenvolvimento web moderno.</p>'
            }
        ],
        date: '31 de Dezembro, 2025'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1200&auto=format&fit=crop',
        category: 'Arquitetura de Software',
        title: 'Guia Definitivo: Upload e Streaming de Arquivos Gigantes na AWS com PHP, Node e .NET',
        excerpt: 'Pare de queimar CPU e pagar taxas de saída excessivas. Um deep dive em Presigned URLs, Multipart Uploads, S3 Intelligent-Tiering e CloudFront.',
        content: [
            {
                type: 'text',
                value: '<p>Quando sua aplicação precisa lidar com vídeos 4K, arquivos de áudio longos ou pacotes de imagens de alta resolução, a arquitetura tradicional de upload (Cliente &rarr; Servidor &rarr; Disco/S3) é uma bomba relógio financeira e de performance.</p><p>Neste guia, vamos detalhar a implementação da arquitetura <strong>Direct-to-S3</strong> usando PHP, Node.js e .NET, além de estratégias avançadas de armazenamento.</p><h3>1. O Padrão "Presigned URL" e Multipart Upload</h3><p>Para arquivos pequenos (até 100MB), uma URL assinada simples funciona. Porém, para vídeos de gigabytes, você deve implementar o <strong>Multipart Upload</strong> via Presigned URLs. Isso divide o arquivo em partes (chunks), permitindo retomada em caso de falha de rede e upload paralelo.</p><h4>Como implementar no Backend (Gerando a URL):</h4><p><strong>Node.js (AWS SDK v3):</strong></p>'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const command = new PutObjectCommand({
  Bucket: "meu-app-media",
  Key: "videos/user_123/video.mp4",
  ContentType: "video/mp4"
});

// A URL expira em 15 minutos, tempo suficiente para iniciar o upload
const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
return { uploadUrl: url };`
            },
            {
                type: 'text',
                value: '<p><strong>PHP (Laravel / AWS SDK for PHP):</strong></p>'
            },
            {
                type: 'code',
                language: 'php',
                value: `use Aws\\S3\\S3Client;

$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'us-east-1'
]);

$cmd = $s3->getCommand('PutObject', [
    'Bucket' => 'meu-app-media',
    'Key'    => 'videos/user_123/video.mp4',
    'ContentType' => 'video/mp4'
]);

$request = $s3->createPresignedRequest($cmd, '+20 minutes');
return (string)$request->getUri();`
            },
            {
                type: 'text',
                value: '<p><strong>.NET (C# / AWSSDK.S3):</strong></p>'
            },
            {
                type: 'code',
                language: 'csharp',
                value: `var request = new GetPreSignedUrlRequest
{
    BucketName = "meu-app-media",
    Key = "videos/user_123/video.mp4",
    Verb = HttpVerb.PUT,
    Expires = DateTime.UtcNow.AddMinutes(15),
    ContentType = "video/mp4"
};

string url = s3Client.GetPreSignedURL(request);
return Ok(new { url });`
            },
            {
                type: 'text',
                value: '<h3>2. Otimização de Custos de Armazenamento (S3 Lifecycle)</h3><p>Armazenar Terabytes de dados é caro. A maioria dos vídeos é acessada frequentemente apenas na primeira semana.</p><p>Configure uma <strong>Lifecycle Rule</strong> no seu bucket:</p><ul><li><strong>Dia 0-30:</strong> <em>S3 Standard</em> (Acesso rápido e frequente).</li><li><strong>Dia 31+:</strong> Mover automaticamente para <em>S3 Intelligent-Tiering</em> ou <em>S3 One Zone-IA</em> (Economia de até 20-40%).</li><li><strong>Dia 365+:</strong> Mover para <em>S3 Glacier Deep Archive</em> (para logs ou backups legais, custo ínfimo).</li></ul><h3>3. Processamento de Mídia (MediaConvert vs Lambda)</h3><p>Nunca processe vídeo na sua API. Use arquitetura orientada a eventos:</p><ol><li>O upload termina no S3.</li><li>O S3 envia um evento para o <strong>EventBridge</strong>.</li><li><strong>Imagens:</strong> EventBridge aciona uma Lambda (Node.js com "Sharp") para gerar thumbnails e converter para WebP/AVIF.</li><li><strong>Vídeos:</strong> EventBridge aciona um job no <strong>AWS Elemental MediaConvert</strong>. Ele transcodifica o vídeo para HLS (streaming adaptativo) automaticamente, criando playlists .m3u8 para diferentes bitrates.</li></ol><h3>4. Entrega e Segurança (CloudFront & OAC)</h3><p>Para evitar cobranças de "Data Transfer Out" do S3 para a internet pública, use o CloudFront. O tráfego do S3 para o CloudFront é gratuito.</p><p><strong>Segurança (Private Content):</strong> Se o conteúdo for pago (ex: curso online), não deixe o bucket público. Use o <strong>Origin Access Control (OAC)</strong> para que apenas o CloudFront possa ler o bucket. Para o usuário final, gere <strong>CloudFront Signed Cookies</strong> ou <strong>Signed URLs</strong> no seu backend (.NET/PHP/Node) para permitir o acesso temporário ao vídeo.</p><h3>Resumo da Economia</h3><p>Adotando essa arquitetura, você remove a carga de I/O das suas instâncias EC2, reduz o tamanho necessário dos seus servidores de aplicação e paga taxas de armazenamento e transferência muito menores utilizando CDN e classes de armazenamento inteligentes.</p>'
            }
        ],
        date: '31 de Dezembro, 2025'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        category: 'Frontend & Design',
        title: 'CSS Level 5 (2025): O Fim do JavaScript para Layout e Interação',
        excerpt: 'De funções nativas e inputs auto-ajustáveis a animações de entrada no DOM. O guia completo das 12 features que revolucionaram o CSS no final de 2025.',
        content: [
            {
                type: 'text',
                value: '<p>O ano de 2025 será lembrado como o momento em que o CSS deixou de ser apenas uma linguagem de estilo para se tornar uma linguagem de arquitetura de interface. Abaixo, as 12 features que definiram o "Level 5".</p><h3>1. Funções e Mixins Nativos (@function)</h3><p>O CSS absorveu o poder do Sass. Agora encapsulamos lógica matemática e utilitários diretamente no navegador.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `@function --fluid-type(--min, --max) {
  result: clamp(var(--min), 5vw + 1rem, var(--max));
}
h1 { font-size: --fluid-type(2rem, 5rem); }`
            },
            {
                type: 'text',
                value: '<h3>2. Layout Masonry (Grid Level 3)</h3><p>O layout "estilo Pinterest" nativo. Sem colunas de flexbox, sem JS para calcular alturas. Apenas Grid puro.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `.grid {
  display: grid;
  grid-template-rows: masonry; /* O Santo Graal do Layout */
}`
            },
            {
                type: 'text',
                value: '<h3>3. Donut Scoping (@scope)</h3><p>Encapsulamento de estilos sem complexidade de build tools. Defina onde o estilo começa e onde ele termina.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `@scope (.card) to (.card-footer) {
  img { border-radius: 8px; } /* Afeta img do card, mas não do footer */
}`
            },
            {
                type: 'text',
                value: '<h3>4. Animar "display: none" (@starting-style)</h3><p>Um dos maiores problemas do CSS foi resolvido. Com <code>@starting-style</code> e <code>transition-behavior: allow-discrete</code>, podemos animar elementos entrando e saindo do DOM (popovers, dialogs, menus).</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `.modal {
  transition: opacity 0.5s, display 0.5s allow-discrete;
  opacity: 0;
  display: none;
}
.modal[open] {
  display: block;
  opacity: 1;
  @starting-style { opacity: 0; } /* Estado inicial ao ser montado */
}`
            },
            {
                type: 'text',
                value: '<h3>5. Inputs Auto-expansíveis (field-sizing)</h3><p>Adeus scripts para redimensionar <code>&lt;textarea&gt;</code> conforme o usuário digita. O CSS agora controla o dimensionamento baseado no conteúdo do input.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `textarea {
  field-sizing: content; /* Cresce automaticamente */
  min-height: 3lh; /* Mínimo de 3 linhas */
}`
            },
            {
                type: 'text',
                value: '<h3>6. Cores Dinâmicas (Relative Color Syntax)</h3><p>Desconstrua e manipule canais de cores existentes sem saber seus valores originais.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `.btn-hover {
  background: hsl(from var(--brand-color) h s calc(l + 10%));
}`
            },
            {
                type: 'text',
                value: '<h3>7. Modo Escuro Automático (light-dark())</h3><p>Uma função que reage à preferência do sistema ou da propriedade <code>color-scheme</code>, eliminando dezenas de media queries.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `:root {
  color-scheme: light dark;
}
body {
  /* Primeiro valor para light, segundo para dark */
  color: light-dark(#333, #fff); 
  background-color: light-dark(#fff, #121212);
}`
            },
            {
                type: 'text',
                value: '<h3>8. Anchor Positioning</h3><p>Conecte elementos flutuantes (tooltips) a âncoras no DOM sem bibliotecas como Popper.js.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `.tooltip {
  position-anchor: --btn-info;
  top: anchor(bottom);
}`
            },
            {
                type: 'text',
                value: '<h3>9. Tipografia Balanceada (text-wrap)</h3><p>Evite "viúvas" (palavras sozinhas na última linha) em títulos e parágrafos de forma inteligente.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `h1 { text-wrap: balance; } /* Harmoniza títulos */
p { text-wrap: pretty; } /* Evita viúvas em textos longos */`
            },
            {
                type: 'text',
                value: '<h3>10. Limpeza de Margens (margin-trim)</h3><p>Chega de usar <code>:last-child { margin-bottom: 0 }</code>. O container agora pode aparar as margens dos filhos.</p>'
            },
            {
                type: 'code',
                language: 'css',
                value: `.container {
  display: flex;
  gap: 1rem;
  margin-trim: block-end; /* Remove a margem do último filho */
}`
            },
            {
                type: 'text',
                value: '<h3>11. Estilização de Selects (appearance: base-select)</h3><p>Personalização total do elemento <code>&lt;select&gt;</code> mantendo a semântica e acessibilidade nativa.</p><h3>12. View Transitions MPA</h3><p>Transições fluidas entre recarregamentos de páginas reais (Multi-Page Apps), não apenas em SPAs.</p><p><strong>Resumo:</strong> O CSS Level 5 eliminou a necessidade de JavaScript para: cálculos de layout, animações de entrada/saída, popovers, temas simples e hacks de formulário. O frontend nunca foi tão leve.</p>'
            }
        ],
        date: '31 de Dezembro, 2025'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1509228627129-666938569312?q=80&w=1200&auto=format&fit=crop',
        category: 'Deep Learning & Matemática Aplicada',
        title: 'Anatomia de uma IA: Do Markdown ao Gradiente Descendente (Guia Definitivo)',
        excerpt: 'Um guia híbrido para leigos e experts. Entenda como transformar arquivos de texto em vetores e a matemática exata por trás do "aprendizado" de máquina.',
        content: [
            {
                type: 'text',
                value: '<p>Criar uma IA usando APIs prontas (OpenAI, Anthropic) é fácil. Mas você sabe o que acontece quando você aperta "Enter"?</p><p>Neste artigo, vamos ignorar as caixas pretas e construir a lógica de uma Rede Neural do zero. Vamos passar pela <strong>Engenharia de Dados</strong> (limpando Markdown), <strong>Álgebra Linear</strong> (Vetores) e <strong>Cálculo</strong> (Backpropagation).</p>'
            },
            {
                type: 'text',
                value: '<h2>Parte 1: A Matéria-Prima (O Dado)</h2><p><strong>Para o Leigo:</strong> Imagine que você quer ensinar uma criança a ler. Se você der um livro rasgado e sujo de lama, ela não vai aprender. Com a IA é igual. Arquivos Markdown (.md) são ótimos para humanos, mas cheios de "lixo" para máquinas (tags, links, negritos).</p><p><strong>Para o Expert:</strong> Precisamos de um pipeline de ETL (Extract, Transform, Load). O objetivo é normalizar o texto para reduzir a dimensionalidade do nosso espaço vetorial.</p>'
            },
            {
                type: 'code',
                language: 'python',
                value: `import re
import glob
import numpy as np
import torch

def preprocess_markdown(text):
    # 1. Normalização (Lowercasing)
    # Reduz o vocabulário: "Casa" e "casa" viram a mesma coisa.
    text = text.lower()
    
    # 2. Limpeza de Ruído (Regex)
    # Remove headers, links, imagens e blocos de código
    patterns = [
        (r'#+\\s', ''),              # Headers
        (r'\\!\\[.*?\\]\\(.*?\\)', ''),  # Imagens
        (r'\\[(.*?)\\]\\(.*?\\)', r'\\1'), # Links (mantém texto âncora)
        (r'\`{3}[\\s\\S]*?\`{3}', ''), # Code blocks
        (r'[^\\w\\s]', '')            # Pontuação
    ]
    for pattern, repl in patterns:
        text = re.sub(pattern, repl, text)
        
    return text.split() # Tokenização simples

# Carregando dados
raw_data = []
vocab = set()

for file_path in glob.glob('./conhecimento/*.md'):
    with open(file_path, 'r', encoding='utf-8') as f:
        tokens = preprocess_markdown(f.read())
        raw_data.append(tokens)
        vocab.update(tokens)

# Criando o índice (Token -> ID Numérico)
word_to_ix = {word: i for i, word in enumerate(vocab)}
vocab_size = len(vocab)

print(f"Tamanho do Vocabulário: {vocab_size} palavras únicas")`
            },
            {
                type: 'text',
                value: '<h2>Parte 2: O Cérebro Matemático (A Rede Neural)</h2><p>Computadores não entendem palavras, entendem números. Transformamos cada palavra em um vetor (uma lista de números).</p><h3>A Arquitetura (Perceptron Multicamadas)</h3><p>Nossa rede terá 3 partes:</p><ul><li><strong>Input Layer:</strong> Recebe os vetores do texto (Bag of Words).</li><li><strong>Hidden Layer (Camada Oculta):</strong> Onde a mágica acontece. Ela multiplica os inputs por "pesos" (matrizes de números aleatórios) para tentar encontrar padrões.</li><li><strong>Output Layer:</strong> A decisão final (ex: Classificação 0 ou 1).</li></ul><p><strong>Matemática do Neurônio ($z$):</strong></p><p>$$z = w \\cdot x + b$$</p><p>Onde <em>w</em> é o peso (importância), <em>x</em> é a entrada e <em>b</em> é o viés (bias). Depois, aplicamos uma função de ativação (como ReLU ou Sigmoid) para decidir se o neurônio "dispara" ou não.</p>'
            },
            {
                type: 'code',
                language: 'python',
                value: `import torch.nn as nn

class SimpleNeuralNet(nn.Module):
    def __init__(self, vocab_size, hidden_dim):
        super(SimpleNeuralNet, self).__init__()
        
        # Camada Linear 1: Matriz (Vocab Size x Hidden Dim)
        # Transforma o vetor gigante de palavras em um vetor menor de significados
        self.linear1 = nn.Linear(vocab_size, hidden_dim)
        
        # Função de Ativação ReLU (Rectified Linear Unit)
        # Zera valores negativos. Fórmula: f(x) = max(0, x)
        # Isso insere "não-linearidade", permitindo aprender padrões complexos.
        self.relu = nn.ReLU()
        
        # Camada de Saída
        self.linear2 = nn.Linear(hidden_dim, 1)
        self.sigmoid = nn.Sigmoid() # Espreme o resultado entre 0 e 1

    def forward(self, x):
        # O "Passo à Frente" (Adivinhação)
        out = self.linear1(x)
        out = self.relu(out)
        out = self.linear2(out)
        return self.sigmoid(out)`
            },
            {
                type: 'text',
                value: '<h2>Parte 3: O Treinamento (Backpropagation)</h2><p>Esta é a parte mais complexa e genial. Como a rede aprende? Errando.</p><h3>1. Forward Pass (O Chute)</h3><p>A rede recebe um texto e "chuta" uma resposta aleatória (pois seus pesos iniciaram aleatórios).</p><h3>2. Loss Function (O Medidor de Erro)</h3><p>Calculamos a distância entre o chute ($y_{pred}$) e a resposta real ($y$). Usaremos a <em>Binary Cross Entropy</em>:</p><p>$$Loss = -(y \\log(y_{pred}) + (1-y) \\log(1-y_{pred}))$$</p><h3>3. Backward Pass (O Aprendizado via Gradiente)</h3><p>Aqui usamos o <strong>Cálculo Diferencial (Regra da Cadeia)</strong>. Queremos saber: <em>"Qual peso (w) contribuiu mais para esse erro?"</em></p><p>Calculamos a derivada do Erro em relação a cada peso ($\\frac{\\partial Loss}{\\partial w}$). Isso nos dá o <strong>Gradiente</strong>. Se o gradiente é positivo, diminuímos o peso. Se é negativo, aumentamos.</p><p><strong>Analogia do Montanhista:</strong> Imagine que você está numa montanha à noite (no escuro) e quer chegar ao vale (erro zero). Você sente a inclinação do chão com o pé (gradiente) e dá um passo na direção da descida. Isso é o <em>Gradient Descent</em>.</p>'
            },
            {
                type: 'code',
                language: 'python',
                value: `import torch.optim as optim

# Hiperparâmetros
INPUT_SIZE = vocab_size
HIDDEN_SIZE = 128
LEARNING_RATE = 0.01
EPOCHS = 100

model = SimpleNeuralNet(INPUT_SIZE, HIDDEN_SIZE)
criterion = nn.BCELoss() # A fórmula de erro mencionada acima
optimizer = optim.SGD(model.parameters(), lr=LEARNING_RATE) # Stochastic Gradient Descent

# Simulando um input vetorizado (Bag of Words)
# Exemplo: texto tem a palavra 1 e 3, mas não a 2.
sample_input = torch.zeros(INPUT_SIZE) 
sample_input[0] = 1 
sample_input[2] = 1
target = torch.tensor([1.0]) # A resposta correta é 1 (Positivo)

# O CICLO DE VIDA DO TREINO
print("Iniciando treinamento...")

for epoch in range(EPOCHS):
    # 1. Zera o gradiente acumulado da rodada anterior
    optimizer.zero_grad()
    
    # 2. Forward Pass: A rede faz sua previsão
    prediction = model(sample_input)
    
    # 3. Calcula o erro (Loss)
    loss = criterion(prediction, target)
    
    # 4. Backward Pass: A mágica do Cálculo
    # O PyTorch percorre o grafo computacional de trás para frente
    # calculando as derivadas parciais.
    loss.backward()
    
    # 5. Step: Atualiza os pesos
    # novo_peso = peso_antigo - (learning_rate * gradiente)
    optimizer.step()
    
    if epoch % 10 == 0:
        print(f"Época {epoch} | Erro: {loss.item():.6f} | Previsão: {prediction.item():.4f}")

print("Treino finalizado. A rede ajustou seus pesos matemáticos.")`
            },
            {
                type: 'text',
                value: '<h2>Conclusão</h2><p>O que acabamos de fazer é a base de qualquer LLM moderno (como o GPT). Claro, eles usam arquiteturas <em>Transformers</em> e mecanismos de <em>Attention</em> muito mais complexos, mas o princípio fundamental é o mesmo: <strong>Multiplicação de Matrizes, Cálculo de Erro e Descida do Gradiente.</strong></p><p>Agora, seu microserviço em Node.js pode apenas chamar esse modelo treinado via API, delegando o trabalho pesado matemático para o Python.</p>'
            }
        ],
        date: '02 de Janeiro, 2026'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97663?q=80&w=1200&auto=format&fit=crop',
        category: 'Backend & Linguagens',
        title: 'PHP 8.5: O Pipe Operator Chegou, Clone With e a Nova Era das URIs',
        excerpt: 'Mais rápido, limpo e construído para desenvolvedores. O guia completo das features que transformaram a DX do PHP em 2025.',
        content: [
            {
                type: 'text',
                value: '<p>O lançamento do PHP 8.5 trouxe as funcionalidades mais solicitadas da década. O foco desta versão é claro: <strong>Developer Experience (DX)</strong> e conformidade com padrões web modernos.</p>'
            },
            {
                type: 'text',
                value: '<h3>1. O Pipe Operator (|>)</h3><p>Finalmente, o encadeamento de funções legível chegou ao PHP. O operador <code>|></code> permite passar valores da esquerda para a direita, eliminando a necessidade de variáveis intermediárias ou o "inferno de parênteses" (nested calls).</p> '
            },
            {
                type: 'code',
                language: 'php',
                value: `// ANTES (PHP 8.4): Leitura de "dentro para fora" difícil de entender
$slug = strtolower(
    str_replace('.', '',
        str_replace(' ', '-',
            trim($title)
        )
    )
);

// DEPOIS (PHP 8.5): Leitura fluida e lógica
$slug = $title
    |> trim(...)
    |> (fn($str) => str_replace(' ', '-', $str))
    |> (fn($str) => str_replace('.', '', $str))
    |> strtolower(...);`
            },
            {
                type: 'text',
                value: '<h3>2. Clone With ("Wither" Pattern Simplificado)</h3><p>Trabalhar com classes imutáveis (<code>readonly</code>) era verboso. Para alterar uma única propriedade, você precisava clonar o objeto manualmente e reinjetar todas as variáveis via construtor. O PHP 8.5 resolve isso com a nova sintaxe <code>clone()</code>.</p>'
            },
            {
                type: 'code',
                language: 'php',
                value: `readonly class Color {
    public function __construct(
        public int $red,
        public int $green,
        public int $blue,
        public int $alpha = 255,
    ) {}

    // O jeito novo: Simples e direto
    public function withAlpha(int $alpha): self {
        return clone($this, [
            'alpha' => $alpha,
        ]);
    }
}`
            },
            {
                type: 'text',
                value: '<h3>3. Nova Extensão URI (RFC 3986)</h3><p>A velha função <code>parse_url()</code> sempre foi problemática e incompleta. O PHP 8.5 introduz uma extensão de URI nativa, robusta e compatível com os padrões <strong>WHATWG</strong>, alimentada pelas bibliotecas <em>uriparser</em> e <em>Lexbor</em>.</p> '
            },
            {
                type: 'code',
                language: 'php',
                value: `// PHP 8.5 - Orientado a Objetos e Seguro
use Uri\Rfc3986\Uri;

$uri = new Uri('https://php.net/releases/8.5/en.php');

var_dump($uri->getHost()); // string(7) "php.net"
var_dump($uri->getPath()); // string(20) "/releases/8.5/en.php"`
            },
            {
                type: 'text',
                value: '<h3>4. Segurança com #[\NoDiscard]</h3><p>Erros silenciosos onde o retorno de uma função é ignorado acidentalmente são comuns. O novo atributo <code>#[\NoDiscard]</code> emite um alerta se o valor retornado não for utilizado.</p>'
            },
            {
                type: 'code',
                language: 'php',
                value: `#[\NoDiscard]
function connect(): Connection {
    return new Connection();
}

connect(); 
// Warning: The return value of function connect() should be used`
            },
            {
                type: 'text',
                value: '<h3>5. Performance e Helpers</h3><ul><li><strong>cURL Persistente:</strong> O <code>curl_share_init_persistent</code> permite manter conexões DNS e SSL vivas entre requisições diferentes, ideal para arquitetura de microserviços.</li><li><strong>Closures em Constantes:</strong> Agora você pode usar funções anônimas dentro de Atributos e valores default de parâmetros.</li><li><strong>Array First/Last:</strong> Funções nativas para pegar o primeiro ou último item, retornando <code>null</code> se vazio.</li></ul>'
            },
            {
                type: 'code',
                language: 'php',
                value: `// Adeus gambiarras como $events[array_key_last($events)]
$lastEvent = array_last($events);

// Closures em atributos (limpo e poderoso)
#[AccessControl(static function (Request $req, Post $post) {
    return $req->user === $post->getAuthor();
})]
public function update() { ... }`
            }
        ],
        date: '31 de Dezembro, 2025'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
        category: 'Frontend & Arquitetura',
        title: 'Web Components vs. Tradicional: A Guerra do Encapsulamento',
        excerpt: 'Por que grandes empresas estão migrando de "Div Soup" para Custom Elements. Uma comparação técnica sobre escopo de CSS, reutilização e arquitetura.',
        content: [
            {
                type: 'text',
                value: '<p>Durante anos, o desenvolvimento web "tradicional" seguiu uma regra implícita: HTML para estrutura, CSS para estilo global e JavaScript para comportamento, tudo misturado em uma "sopa" onde uma classe CSS errada poderia quebrar o layout de uma página inteira.</p><p>Os <strong>Web Components</strong> nasceram para resolver o problema da <em>modularidade real</em>. Mas será que vale a pena a verbosidade extra?</p>'
            },
            {
                type: 'text',
                value: '<h3>1. A Abordagem Tradicional: O Problema do Escopo Global</h3><p>No método clássico, você cria componentes baseados em convenções de nomes (como BEM) para evitar conflitos. Não existe barreira física; se você definir <code>h2 { color: red }</code>, todos os títulos do site ficarão vermelhos.</p>'
            },
            {
                type: 'code',
                language: 'html',
                value: `<div class="user-card">
    <div class="user-card__header">
        <h2 class="title">Carlos Silva</h2>
    </div>
    <button class="btn-primary" onclick="alert('Olá')">Perfil</button>
</div>

<style>
    /* Se outro dev criar um .title em outro lugar, conflita */
    .title { font-size: 1.5rem; color: #333; }
    .btn-primary { background: blue; }
</style>`
            },
            {
                type: 'text',
                value: '<p><strong>O Problema:</strong> Fragilidade. Mudar o CSS de um botão pode quebrar o layout do rodapé acidentalmente (Side Effects). O JavaScript precisa "buscar" os elementos no DOM global, o que é lento e propenso a erros.</p>'
            },
            {
                type: 'text',
                value: '<h3>2. A Abordagem Web Components: Shadow DOM</h3><p>Com Web Components, usamos APIs nativas do navegador (Custom Elements v1) para criar nossas próprias tags HTML. O segredo aqui é o <strong>Shadow DOM</strong>: uma sub-árvore do DOM totalmente isolada do resto da página.</p> '
            },
            {
                type: 'code',
                language: 'javascript',
                value: `class UserCard extends HTMLElement {
    constructor() {
        super();
        // Cria o "Shadow DOM" (o muro de isolamento)
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        
        // CSS aqui dentro NÃO vaza para fora, nem o de fora entra aqui.
        this.shadowRoot.innerHTML = \`
            <style>
                h2 { color: #333; margin: 0; } /* Seguro usar tags diretas */
                button { background: blue; color: white; }
            </style>
            <div class="card">
                <h2>\${name}</h2>
                <button id="btn">Perfil</button>
            </div>
        \`;
        
        this.shadowRoot.querySelector('#btn').onclick = () => alert('Olá');
    }
}

// Registro da tag
customElements.define('user-card', UserCard);`
            },
            {
                type: 'text',
                value: '<p>Agora, para usar esse componente, basta escrever HTML semântico:</p>'
            },
            {
                type: 'code',
                language: 'html',
                value: `<user-card name="Carlos Silva"></user-card>`
            },
            {
                type: 'text',
                value: '<h3>3. Comparativo Direto</h3><ul><li><strong>Estilização:</strong> Tradicional depende de complexidade de seletores CSS. Web Components oferecem isolamento nativo (styles dentro do Shadow DOM não afetam o site).</li><li><strong>Reutilização:</strong> Tradicional requer copiar HTML+CSS+JS. Web Components requer apenas importar um arquivo JS e usar a tag.</li><li><strong>Frameworks:</strong> Tradicional briga com frameworks (React/Vue). Web Components são agnósticos — funcionam dentro de React, Vue, Angular ou sem nada.</li></ul><h3>Conclusão</h3><p>A abordagem tradicional é mais rápida para protótipos e sites simples. Porém, para Design Systems e aplicações de grande escala em 2025, os Web Components oferecem a segurança arquitetural que o desenvolvimento web precisava desesperadamente.</p>'
            }
        ],
        date: '03 de Janeiro, 2026'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1200&auto=format&fit=crop',
        category: 'Legacy & Modernização',
        title: 'Web Components + jQuery: Modernizando o Legado ou Criando um Monstro?',
        excerpt: 'É possível encapsular a biblioteca mais famosa do mundo dentro de Custom Elements? Uma estratégia prática para migrar sistemas antigos sem reescrever tudo.',
        content: [
            {
                type: 'text',
                value: '<p>Parece heresia misturar a tecnologia nativa moderna (Web Components) com a biblioteca de 2006 (jQuery). Mas, no mundo real corporativo, reescrever milhões de linhas de código não é opção.</p><p>Neste artigo, vamos ver como encapsular lógica jQuery dentro de um Web Component, permitindo que você modernize sua arquitetura gradualmente.</p>'
            },
            {
                type: 'text',
                value: '<h3>O Desafio: O Muro do Shadow DOM</h3><p>O jQuery foi feito para varrer o DOM global (o <code>document</code>). Quando criamos um Web Component com <strong>Shadow DOM</strong>, criamos um muro invisível. O seletor <code>$("#meu-botao")</code> retorna vazio porque o jQuery não consegue "olhar" para dentro do componente.</p> '
            },
            {
                type: 'text',
                value: '<h3>A Solução: Escopo Local</h3><p>Para fazer funcionar, precisamos mudar o contexto de busca do jQuery. Em vez de buscar no documento inteiro, buscaremos apenas dentro da raiz do componente (<code>this.shadowRoot</code>).</p>'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `class JqueryWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // 1. Renderiza o HTML e CSS isolados
        this.shadowRoot.innerHTML = \`
            <style>
                .box { border: 2px solid #007bff; padding: 20px; border-radius: 8px; }
                button { background: #007bff; color: white; border: none; padding: 10px; cursor: pointer; }
                .result { margin-top: 10px; font-weight: bold; display: none; }
            </style>
            <div class="box">
                <h3>Widget JQuery Encapsulado</h3>
                <button class="btn-toggle">Mostrar Mensagem</button>
                <div class="result">Olá do mundo jurássico!</div>
            </div>
        \`;

        // 2. A Mágica: Inicializa o jQuery NO ESCOPO do Shadow DOM
        // Passamos 'this.shadowRoot' como o segundo parâmetro do seletor, ou usamos find()
        this.$root = $(this.shadowRoot);
        
        this.initJqueryLogic();
    }

    initJqueryLogic() {
        // NÃO use $('.btn-toggle'), pois isso busca no global.
        // USE this.$root.find(...)
        
        const $btn = this.$root.find('.btn-toggle');
        const $result = this.$root.find('.result');

        $btn.on('click', () => {
            $result.slideToggle(); // Usando animações clássicas do jQuery
            
            // Lógica condicional do botão
            const text = $result.is(':visible') ? 'Esconder' : 'Mostrar Mensagem';
            $btn.text(text);
        });
    }

    // Importante: Limpar event listeners ao remover o componente da tela
    disconnectedCallback() {
        this.$root.find('.btn-toggle').off();
    }
}

customElements.define('jquery-widget', JqueryWidget);`
            },
            {
                type: 'text',
                value: '<h3>Por que fazer isso?</h3><p>Não é sobre performance (carregar o jQuery inteiro para um componente é pesado). É sobre <strong>sobrevivência</strong>.</p><ul><li><strong>Plugins Legados:</strong> Você tem um Datepicker ou Slider complexo em jQuery que a empresa usa há 10 anos? Encapsule-o em uma tag <code>&lt;legacy-datepicker&gt;</code> e use-o na sua aplicação React/Vue nova.</li><li><strong>Equipe:</strong> Permite que desenvolvedores seniores acostumados com jQuery continuem produtivos enquanto aprendem a nova sintaxe de classes ES6.</li></ul><h3>Conclusão</h3><p>Embora não seja o futuro ideal, encapsular jQuery em Web Components é uma ponte sólida para tirar sistemas legados do monólito e levá-los para uma arquitetura de micro-frontends.</p>'
            }
        ],
        date: '04 de Janeiro, 2026'
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
        category: 'Engenharia de Software',
        title: 'As 5 Arquiteturas de Software Essenciais: Do Monólito ao Hexagonal',
        excerpt: 'Não existe bala de prata. Entenda os prós e contras das 5 arquiteturas mais usadas no mercado e veja exemplos de código para cada uma.',
        content: [
            {
                type: 'text',
                value: '<p>A escolha da arquitetura define como seu sistema vai escalar, como será testado e quão doloroso será dar manutenção daqui a dois anos. Abaixo, exploramos os 5 padrões fundamentais.</p>'
            },
            {
                type: 'text',
                value: '<h3>1. Arquitetura Monolítica (The Classic)</h3><p>Tudo em um único lugar. A interface, a lógica de negócio e o acesso ao banco de dados vivem no mesmo processo e repositório. Simples de fazer deploy, difícil de escalar times grandes.</p> '
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// MONOLITO: Tudo no mesmo arquivo/processo
const express = require('express');
const app = express();
const db = require('./database'); // Conexão direta

app.post('/order', async (req, res) => {
    // 1. Validação (Controller)
    if (!req.body.product) return res.status(400).send('Erro');

    // 2. Lógica de Negócio (Service)
    const price = req.body.qty * 10;

    // 3. Persistência (Model)
    await db.query('INSERT INTO orders ...', [price]);

    // 4. Resposta (View)
    res.json({ status: 'created', price });
});`
            },
            {
                type: 'text',
                value: '<h3>2. Arquitetura em Camadas (Layered/N-Tier)</h3><p>A evolução natural. Separamos o código em camadas lógicas: <strong>Apresentação</strong>, <strong>Negócio</strong> e <strong>Dados</strong>. O fluxo é sempre de cima para baixo. Organizado, mas pode gerar dependência forte entre camadas.</p>'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// CAMADA 1: CONTROLLER (Recebe a requisição)
class OrderController {
    constructor(service) { this.service = service; }
    
    async create(req, res) {
        const result = await this.service.processOrder(req.body);
        return res.json(result);
    }
}

// CAMADA 2: SERVICE (Regras de Negócio Puras)
class OrderService {
    constructor(repository) { this.repo = repository; }

    async processOrder(data) {
        if (data.qty < 1) throw new Error("Invalid Qty");
        const total = data.qty * 100;
        return await this.repo.save({ ...data, total });
    }
}

// CAMADA 3: REPOSITORY (Acesso ao Banco)
class OrderRepository {
    async save(order) {
        return db.insert('orders', order);
    }
}`
            },
            {
                type: 'text',
                value: '<h3>3. Microservices</h3><p>O sistema é quebrado em serviços pequenos e independentes que se comunicam via rede (HTTP/gRPC). Cada um pode ter seu próprio banco de dados e tecnologia. Ótimo para escalabilidade, terrível para complexidade operacional.</p> '
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// SERVIÇO A (Order Service)
app.post('/order', async (req, res) => {
    // Salva o pedido localmente
    const order = await saveOrder(req.body);
    
    // Comunica com OUTRO serviço via Rede
    // Se o serviço de pagamento cair, este aqui pode falhar ou ter fallback
    await fetch('http://payment-service/charge', {
        method: 'POST',
        body: JSON.stringify({ amount: order.total })
    });

    res.json(order);
});`
            },
            {
                type: 'text',
                value: '<h3>4. Event-Driven Architecture (EDA)</h3><p>Desacoplamento total. Os serviços não "chamam" uns aos outros; eles emitem eventos ("Algo aconteceu") e quem estiver interessado reage. O sistema é assíncrono e resiliente.</p>'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// PRODUTOR (Serviço de Pedidos)
async function createOrder(order) {
    await db.save(order);
    // "Fire and Forget": Não espera resposta, apenas avisa.
    await rabbitMQ.publish('ORDER_CREATED', order);
}

// CONSUMIDOR A (Serviço de Email)
rabbitMQ.subscribe('ORDER_CREATED', (msg) => {
    emailService.sendConfirm(msg.userEmail);
});

// CONSUMIDOR B (Serviço de Estoque)
rabbitMQ.subscribe('ORDER_CREATED', (msg) => {
    inventoryService.decrement(msg.productId);
});`
            },
            {
                type: 'text',
                value: '<h3>5. Arquitetura Hexagonal (Ports & Adapters)</h3><p>O objetivo é isolar o <strong>Core (Domínio)</strong> do mundo externo (Banco, UI, APIs). O Core define <em>Interfaces</em> (Portas) e o mundo externo cria <em>Implementações</em> (Adaptadores). Isso permite trocar o banco de dados ou a API sem tocar em uma linha da regra de negócio.</p> '
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// 1. O CORE (Domínio Puro - Não sabe que banco ou web existe)
class OrderCore {
    constructor(notificationPort) { 
        this.notifier = notificationPort; // Recebe uma interface
    }

    process(order) {
        order.status = 'processed';
        // O Core chama a porta, sem saber quem vai atender
        this.notifier.send("Pedido processado"); 
    }
}

// 2. A PORTA (Interface/Contrato)
class NotificationPort {
    send(msg) { throw new Error("Not implemented"); }
}

// 3. ADAPTADOR A (Para rodar no Console/Testes)
class ConsoleAdapter extends NotificationPort {
    send(msg) { console.log("LOG:", msg); }
}

// 4. ADAPTADOR B (Para rodar na Real com Slack)
class SlackAdapter extends NotificationPort {
    send(msg) { slackClient.post(msg); }
}

// USO: Injeção de Dependência
const core = new OrderCore(new SlackAdapter()); // Plugando o adaptador
core.process({ id: 1 });`
            }
        ],
        date: '05 de Janeiro, 2026'
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
        category: 'Full Stack & Angular 19',
        title: 'Crie seu Próprio CMS Headless: PHP, Markdown e o Novo Angular 19',
        excerpt: 'Esqueça bancos de dados complexos. Aprenda a criar um blog ultra-rápido lendo arquivos Markdown com PHP e renderizando com a nova sintaxe do Angular 19.',
        content: [
            {
                type: 'text',
                value: '<p>Em 2026, a complexidade desnecessária é o inimigo. Para blogs e portfólios, bancos de dados SQL muitas vezes são um exagero ("overkill").</p><p>Neste tutorial, vamos construir uma arquitetura <strong>Flat-File</strong>. Seus posts serão arquivos <code>.md</code> simples. O PHP servirá como uma API de leitura ultra-rápida e o Angular 19 fará a mágica no frontend usando Signals.</p> '
            },
            {
                type: 'text',
                value: '<h3>1. O Backend: PHP como Parser de Markdown</h3><p>Não precisamos de MySQL. Vamos criar um script PHP que lê uma pasta de arquivos, extrai o cabeçalho (Frontmatter) e o conteúdo.</p><p>Crie uma pasta <code>api/</code> e um arquivo <code>posts.php</code>:</p>'
            },
            {
                type: 'code',
                language: 'php',
                value: `<?php
// api/posts.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Simples parser de Frontmatter (metadados entre ---)
function parsePost($filepath) {
    $content = file_get_contents($filepath);
    $parts = preg_split('/---/', $content, 3, PREG_SPLIT_NO_EMPTY);
    
    // Se não tiver frontmatter, retorna só o corpo
    if (count($parts) < 2) return ['body' => $content];

    // Transforma "title: Olá" em array associativo
    $metaLines = explode("\n", trim($parts[0]));
    $metadata = [];
    foreach ($metaLines as $line) {
        if (strpos($line, ':') !== false) {
            [$key, $value] = explode(':', $line, 2);
            $metadata[trim($key)] = trim($value);
        }
    }

    return [
        'meta' => $metadata,
        'body' => trim($parts[1]) // O Markdown puro
    ];
}

$files = glob('../content/*.md');
$posts = array_map(fn($file) => parsePost($file), $files);

echo json_encode($posts);`
            },
            {
                type: 'text',
                value: '<h3>2. O Frontend: Angular 19 (Moderno)</h3><p>No Angular 19, abandonamos os módulos complexos e o `HttpClientModule` antigo. Usaremos <strong>Standalone Components</strong>, <strong>Signals</strong> e a nova sintaxe de template (Control Flow).</p><p>Primeiro, configure o `app.config.ts` para permitir HTTP e a renderização de Markdown (usando a lib <code>ngx-markdown</code>):</p>'
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), // Fetch API nativa
    provideMarkdown()
  ]
};`
            },
            {
                type: 'text',
                value: '<h3>3. O Service com Signals e Resource</h3><p>O Angular 19 introduziu a API experimental <code>resource</code> (ou podemos usar signals manuais) para lidar com dados assíncronos de forma declarativa.</p>'
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// blog.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  
  // Transforma o Observable diretamente em um Signal Readonly
  // Não precisa de .subscribe() manual!
  posts = toSignal(
    this.http.get<any[]>('http://localhost:8000/api/posts.php'), 
    { initialValue: [] }
  );
}`
            },
            {
                type: 'text',
                value: '<h3>4. O Componente (Nova Sintaxe @for)</h3><p>Vamos exibir os posts. Note o uso de <code>markdown</code> (diretiva) e o bloco <code>@for</code> que substituiu o antigo <code>*ngFor</code>. É mais limpo e performático.</p>'
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// post-list.component.ts
import { Component, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MarkdownComponent],
  template: \`
    <div class="container">
      <h1>Blog Angular 19 + PHP</h1>
      
      @for (post of blogService.posts(); track post.meta.title) {
        <article class="card">
          <h2>{{ post.meta.title }}</h2>
          <span class="date">{{ post.meta.date }}</span>
          
          <markdown [data]="post.body"></markdown>
        </article>
      } @empty {
        <p>Nenhum post encontrado.</p>
      }
    </div>
  \`
})
export class PostListComponent {
  blogService = inject(BlogService);
}`
            },
            {
                type: 'text',
                value: '<h3>Conclusão</h3><p>Com menos de 50 linhas de código no backend e usando o poder do <code>toSignal</code> e <code>provideHttpClient</code> do Angular 19, criamos um sistema de blog completo. O PHP entrega o JSON cru instantaneamente, e o Angular cuida da experiência rica do usuário.</p>'
            }
        ],
        date: '06 de Janeiro, 2026'
    },
    {
        id: 11,
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop',
        category: 'Full Stack & Arquitetura',
        title: 'A Revolução TanStack: Por que abandonamos o Next.js pelo TanStack Start em 2026',
        excerpt: 'Não é apenas sobre React Query. Descubra como o TanStack Router e o Start criaram a primeira experiência de desenvolvimento verdadeiramente Type-Safe.',
        content: [
            {
                type: 'text',
                value: '<p>Durante anos, aceitamos que "Full Stack React" era sinônimo de Next.js. Mas a complexidade do App Router e a opacidade das Server Actions abriram espaço para uma filosofia diferente.</p><p>O ecossistema TanStack (liderado por Tanner Linsley) deixou de ser uma coleção de bibliotecas utilitárias para se tornar a stack definitiva para aplicações de longa duração.</p>'
            },
            {
                type: 'text',
                value: '<h3>1. A Fundação: TanStack Query (v6)</h3><p>O antigo "React Query" continua sendo o padrão da indústria para gerenciamento de estado assíncrono. Em 2026, a integração com <strong>Suspense</strong> e a deduplicação de requisições entre servidor e cliente é transparente.</p>'
            },
            {
                type: 'text',
                value: '<h3>2. O Diferencial: TanStack Router</h3><p>O maior trunfo da stack. Ao contrário do roteamento baseado em arquivos "mágico" do Next.js, o TanStack Router gera tipos estáticos para suas rotas. <strong>Você nunca mais quebrará um link ou errará o nome de um parâmetro de URL.</strong></p> '
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  // Validação de Params e SearchParams em tempo de compilação!
  validateSearch: (search) => ({ 
    page: Number(search?.page ?? 1),
    sort: search?.sort ?? 'newest'
  }),
  
  // O Loader roda no servidor (SSR) ou no cliente, você escolhe
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
  
  component: PostComponent
})

function PostComponent() {
  const post = Route.useLoaderData()
  // O TypeScript sabe EXATAMENTE o que tem dentro de 'post'
  return <h1>{post.title}</h1>
}`
            },
            {
                type: 'text',
                value: '<h3>3. O Framework: TanStack Start</h3><p>O TanStack Start une o Router e o Query em um framework full-stack. A mágica aqui são as <strong>Server Functions</strong>. Elas parecem chamadas de API normais, mas são RPCs (Remote Procedure Calls) com inferência de tipos total.</p>'
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// src/server/posts.ts
import { createServerFn } from '@tanstack/start'
import { db } from './db'

// Esta função roda EXCLUSIVAMENTE no servidor
export const getRecentPosts = createServerFn('GET', async (input: { limit: number }) => {
    const posts = await db.post.findMany({ take: input.limit });
    return posts; // O retorno infere o tipo automaticamente para o frontend
});


// src/components/Feed.tsx (Frontend)
import { useQuery } from '@tanstack/react-query'
import { getRecentPosts } from '../server/posts'

export function Feed() {
    const { data } = useQuery({
        queryKey: ['posts'],
        // Chamada direta à função do servidor, sem configurar fetch('/api/...')
        queryFn: () => getRecentPosts({ limit: 10 }) 
    });

    if (!data) return <Skeleton />
    
    return data.map(post => <div key={post.id}>{post.title}</div>)
}`
            },
            {
                type: 'text',
                value: '<h3>4. Por que mudar?</h3><ul><li><strong>Type Safety Real:</strong> Do banco de dados (Prisma/Drizzle) até a prop do componente, nada é <code>any</code>.</li><li><strong>Cache Granular:</strong> O TanStack Query gerencia o cache melhor que o cache de rota do Next.js.</li><li><strong>Search Params:</strong> Validar <code>?page=2&filter=active</code> com tipos estáticos muda o jogo para dashboards complexos.</li></ul><p>O TanStack provou que frameworks não precisam ser caixas pretas mágicas. Eles podem ser bibliotecas bem compostas que você entende e controla.</p>'
            }
        ],
        date: '07 de Janeiro, 2026'
    },
    {
        id: 12,
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1200&auto=format&fit=crop',
        category: 'Frontend & Svelte',
        title: 'Svelte (Dez 2025): Streaming de Uploads, AST Printing e Nova CLI',
        excerpt: 'O SvelteKit agora suporta streaming de arquivos em formulários, permitindo acesso aos dados antes do fim do upload. Confira as novidades de fim de ano.',
        content: [
            {
                type: 'text',
                value: '<p>Dezembro chegou trazendo presentes para a comunidade Svelte. Além do lançamento do novo portal da <strong>Svelte Society</strong> (agora um feed dinâmico de recursos), as atualizações do Svelte 5.45 e SvelteKit 2.49 focam em performance de I/O e ferramentas de compilação.</p>'
            },
            {
                type: 'text',
                value: '<h3>1. Streaming de Uploads no SvelteKit</h3><p>Esta é a grande estrela da versão 2.49.0. Anteriormente, ao enviar um formulário com arquivos grandes, o servidor esperava o upload terminar completamente antes de executar a <em>Action</em>. Agora, é possível processar o <code>FormData</code> via streaming.</p><p>Isso permite, por exemplo, validar campos de texto ou iniciar o processamento de um vídeo enquanto o arquivo ainda está sendo enviado pelo usuário.</p>'
            },
            {
                type: 'code',
                language: 'typescript',
                value: `// src/routes/upload/+page.server.ts
export const actions = {
    default: async ({ request }) => {
        // O request agora pode ser consumido como stream
        // permitindo acesso antecipado aos campos do formulário
        const formData = await request.formData();
        const file = formData.get('video'); // File | null

        if (file && file.size > 0) {
             // Comece a enviar para o S3/R2 antes mesmo
             // do upload do cliente terminar completamente
             await uploadToStorage(file.stream());
        }
    }
};`
            },
            {
                type: 'text',
                value: '<h3>2. Tooling: A API <code>print</code> e AST</h3><p>Para quem cria ferramentas para o ecossistema (como linters ou plugins de VS Code), o Svelte 5.45 introduziu a função <code>print</code>. Ela faz o inverso do parse: converte um nó da Árvore de Sintaxe Abstrata (AST) moderna do Svelte de volta para código fonte válido.</p><p>Além disso, a nova API <code>hydratable</code> (5.44) oferece controle de baixo nível para coordenar a hidratação entre servidor e cliente, essencial para arquiteturas de micro-frontends ou "Islands".</p>'
            },
            {
                type: 'text',
                value: '<h3>3. Svelte CLI 2.0 (sv)</h3><p>A linha de comando oficial recebeu melhorias significativas de usabilidade:</p><ul><li><strong>Instalação Rápida:</strong> Agora você pode iniciar um projeto já com integrações usando a flag <code>--add</code>. Exemplo: <code>npx sv create my-app --add tailwindcss</code>.</li><li><strong>Supressão de Alertas:</strong> Para scripts de automação, a flag <code>--no-dir-check</code> permite criar projetos em pastas não vazias sem travar no prompt de confirmação.</li></ul><h3>Breaking Changes (Atenção)</h3><p>Se você usa o método <code>invalid</code> em formulários, note que na versão 2.48.8+ ele deve ser importado explicitamente de <code>@sveltejs/kit</code>, e a opção experimental <code>submitter</code> foi removida da validação de formulários.</p>'
            }
        ],
        date: '08 de Janeiro, 2026'
    }
];

