export const POST_2_DX = `$ dx cowsay "Olá, Deno!"`;

export const POST_3_NODE_SIGNED_URL = `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const command = new PutObjectCommand({
  Bucket: "meu-app-media",
  Key: "videos/user_123/video.mp4",
  ContentType: "video/mp4"
});

// A URL expira em 15 minutos, tempo suficiente para iniciar o upload
const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });
return { uploadUrl: url };`;

export const POST_3_PHP_SIGNED_URL = `use Aws\\S3\\S3Client;

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
return (string)$request->getUri();`;

export const POST_3_CSHARP_SIGNED_URL = `var request = new GetPreSignedUrlRequest
{
    BucketName = "meu-app-media",
    Key = "videos/user_123/video.mp4",
    Verb = HttpVerb.PUT,
    Expires = DateTime.UtcNow.AddMinutes(15),
    ContentType = "video/mp4"
};

string url = s3Client.GetPreSignedURL(request);
return Ok(new { url });`;

export const POST_4_CSS_FUNCTION = `@function --fluid-type(--min, --max) {
  result: clamp(var(--min), 5vw + 1rem, var(--max));
}
h1 { font-size: --fluid-type(2rem, 5rem); }`;

export const POST_4_CSS_MASONRY = `.grid {
  display: grid;
  grid-template-rows: masonry; /* O Santo Graal do Layout */
}`;

export const POST_4_CSS_SCOPE = `@scope (.card) to (.card-footer) {
  img { border-radius: 8px; } /* Afeta img do card, mas não do footer */
}`;

export const POST_4_CSS_STARTING_STYLE = `.modal {
  transition: opacity 0.5s, display 0.5s allow-discrete;
  opacity: 0;
  display: none;
}
.modal[open] {
  display: block;
  opacity: 1;
  @starting-style { opacity: 0; } /* Estado inicial ao ser montado */
}`;

export const POST_4_CSS_FIELD_SIZING = `textarea {
  field-sizing: content; /* Cresce automaticamente */
  min-height: 3lh; /* Mínimo de 3 linhas */
}`;

export const POST_4_CSS_RELATIVE_COLOR = `.btn-hover {
  background: hsl(from var(--brand-color) h s calc(l + 10%));
}`;

export const POST_4_CSS_LIGHT_DARK = `:root {
  color-scheme: light dark;
}
body {
  /* Primeiro valor para light, segundo para dark */
  color: light-dark(#333, #fff); 
  background-color: light-dark(#fff, #121212);
}`;

export const POST_4_CSS_ANCHOR = `.tooltip {
  position-anchor: --btn-info;
  top: anchor(bottom);
}`;

export const POST_4_CSS_TEXT_WRAP = `h1 { text-wrap: balance; } /* Harmoniza títulos */
p { text-wrap: pretty; } /* Evita viúvas em textos longos */`;

export const POST_4_CSS_MARGIN_TRIM = `.container {
  display: flex;
  gap: 1rem;
  margin-trim: block-end; /* Remove a margem do último filho */
}`;

export const POST_5_PYTHON_PREPROCESS = `import re
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

print(f"Tamanho do Vocabulário: {vocab_size} palavras únicas")`;

export const POST_5_PYTHON_NEURAL_NET = `import torch.nn as nn

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
        return self.sigmoid(out)`;

export const POST_5_PYTHON_TRAINING = `import torch.optim as optim

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

print("Treino finalizado. A rede ajustou seus pesos matemáticos.")`;

export const POST_6_PHP_PIPE = `// ANTES (PHP 8.4): Leitura de "dentro para fora" difícil de entender
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
    |> strtolower(...);`;

export const POST_6_PHP_CLONE = `readonly class Color {
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
}`;

export const POST_6_PHP_URI = `// PHP 8.5 - Orientado a Objetos e Seguro
use Uri\\Rfc3986\\Uri;

$uri = new Uri('https://php.net/releases/8.5/en.php');

var_dump($uri->getHost()); // string(7) "php.net"
var_dump($uri->getPath()); // string(20) "/releases/8.5/en.php"`;

export const POST_6_PHP_NODISCARD = `#[\\NoDiscard]
function connect(): Connection {
    return new Connection();
}

connect(); 
// Warning: The return value of function connect() should be used`;

export const POST_6_PHP_HELPERS = `// Adeus gambiarras como $events[array_key_last($events)]
$lastEvent = array_last($events);

// Closures em atributos (limpo e poderoso)
#[AccessControl(static function (Request $req, Post $post) {
    return $req->user === $post->getAuthor();
})]
public function update() { ... }`;

export const POST_7_HTML_TRADITIONAL = `<div class="user-card">
    <div class="user-card__header">
        <h2 class="title">Carlos Silva</h2>
    </div>
    <button class="btn-primary" onclick="alert('Olá')">Perfil</button>
</div>

<style>
    /* Se outro dev criar um .title em outro lugar, conflita */
    .title { font-size: 1.5rem; color: #333; }
    .btn-primary { background: blue; }
</style>`;

export const POST_7_JS_WEB_COMPONENT = `class UserCard extends HTMLElement {
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
customElements.define('user-card', UserCard);`;

export const POST_7_HTML_USAGE = `<user-card name="Carlos Silva"></user-card>`;

export const POST_8_JS_JQUERY_WIDGET = `class JqueryWidget extends HTMLElement {
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

customElements.define('jquery-widget', JqueryWidget);`;

export const POST_9_JS_MONOLITH = `// MONOLITO: Tudo no mesmo arquivo/processo
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
});`;

export const POST_9_JS_LAYERED = `// CAMADA 1: CONTROLLER (Recebe a requisição)
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
}`;

export const POST_9_JS_MICROSERVICES = `// SERVIÇO A (Order Service)
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
});`;

export const POST_9_JS_EDA = `// PRODUTOR (Serviço de Pedidos)
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
});`;

export const POST_9_JS_HEXAGONAL = `// 1. O CORE (Domínio Puro - Não sabe que banco ou web existe)
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
core.process({ id: 1 });`;

export const POST_10_PHP_API = `<?php
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
    $metaLines = explode("\\n", trim($parts[0]));
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

echo json_encode($posts);`;

export const POST_10_TS_CONFIG = `// app.config.ts
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
};`;

export const POST_10_TS_SERVICE = `// blog.service.ts
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
}`;

export const POST_10_TS_COMPONENT = `// post-list.component.ts
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
}`;

export const POST_11_TS_ROUTE = `// src/routes/posts/$postId.tsx
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
}`;

export const POST_11_TS_SERVER_FN = `// src/server/posts.ts
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
}`;

export const POST_12_TS_ACTION = `// src/routes/upload/+page.server.ts
export const actions = {
    default: async ({ request }) => {
        // O request agora pode ser consumido como stream
        // permitindo acesso antecipado aos campos do formulário
        const formData = await request.formData();
        const file = formData.get('video'); // File | null

        if (file && file.size > 0) {
             // Comece a enviar para o S3/R2 antes mesmo
             // do upload do cliente terminar completamente
             // await uploadToStorage(file.stream());
             // Nota: implementação real depende do adapter
        }
    }
};`;
