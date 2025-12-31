export const labs = [
  {
    id: 1,
    title: 'Criando um Hook Personalizado: useLocalStorage',
    description: 'Um exemplo prático de como abstrair a lógica de persistência de dados no React.',
    content: [
      {
        type: 'text',
        value: '<p>Hooks personalizados são uma das funcionalidades mais poderosas do React. Eles permitem reutilizar lógica de estado entre componentes.</p><p>Neste lab, vamos criar um hook simples para sincronizar o estado com o LocalStorage.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Inicializa o estado
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Atualiza o LocalStorage quando o estado muda
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}`
      },
      {
        type: 'text',
        value: '<p>Agora podemos usar este hook em qualquer componente:</p>'
      },
      {
        type: 'code',
        language: 'jsx',
        value: `const ComponentName = () => {
  const [name, setName] = useLocalStorage('name', 'André');

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};`
      }
    ]
  },
  {
    id: 2,
    title: 'Animações com CSS Keyframes e Styled Components',
    description: 'Combinando o poder do CSS puro com a flexibilidade do JS in CSS.',
    content: [
      {
        type: 'text',
        value: '<p>Styled Components facilita a criação de animações scoped sem conflitos de nomes.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `import styled, { keyframes } from 'styled-components';

const rotate = keyframes\`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
\`;

const RotatingBox = styled.div\`
  display: inline-block;
  animation: \${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
\`;`
      }
    ]
  },
  {
    id: 3,
    title: 'Music Player: MF + NextJS + Redux',
    description: 'Arquitetura Scalável: Micro-frontends com State Management via Redux Toolkit e Backend NestJS.',
    content: [
      {
        type: 'text',
        value: '<h3>Visão Geral</h3><p>Neste lab, evoluímos a arquitetura para utilizar <strong>Redux Toolkit</strong>. O Remote (Player) encapsula seu próprio estado global (Play/Pause, Volume, Playlist) e exporta o componente já "envelopado" no Provider.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. Gerenciamento de Estado (Redux Slice)</h3><p>Criamos um <code>slice</code> para gerenciar a lógica do player de forma previsível.</p>'
      },
      {
        type: 'code',
        language: 'typescript',
        value: `// remote-app/store/playerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  isPlaying: boolean;
  volume: number;
}

const initialState: PlayerState = { isPlaying: false, volume: 0.5 };

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state) => { state.isPlaying = !state.isPlaying; },
    setVolume: (state, action: PayloadAction<number>) => { state.volume = action.payload; }
  }
});

export const { togglePlay, setVolume } = playerSlice.actions;
export default playerSlice.reducer;`
      },
      {
        type: 'text',
        value: '<h3>2. O Componente Conectado</h3><p>O componente <code>MusicPlayer</code> consome o estado via Hooks e reage às mudanças (Ex: Efeito colateral para tocar/pausar o áudio HTML5).</p>'
      },
      {
        type: 'code',
        language: 'tsx',
        value: `// components/MusicPlayer.tsx
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import playerReducer, { togglePlay } from '../store/playerSlice';
import styled from 'styled-components';

// Configuração do Store Interno
const store = configureStore({ reducer: { player: playerReducer } });

// Componente Interno
const PlayerContent = ({ trackId }) => {
  const { isPlaying } = useSelector((state: any) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="player-ui">
      <audio 
        ref={audioRef} 
        src={\`https://api.meu-backend.com/tracks/\${trackId}/stream\`} 
        onEnded={() => dispatch(togglePlay())}
      />
      <button onClick={() => dispatch(togglePlay())}>
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
    </div>
  );
};

// Export Default com Provider (Isolamento)
export default function MusicPlayer(props) {
  return (
    <Provider store={store}>
      <PlayerContent {...props} />
    </Provider>
  );
}`
      },
      {
        type: 'text',
        value: '<h3>3. Configuração Module Federation</h3><p>Expomos o componente <code>MusicPlayer</code> que agora é autossuficiente com seu Redux interno.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// remote-app/next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config) {
    config.plugins.push(new NextFederationPlugin({
        name: 'playerRemote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './MusicPlayer': './components/MusicPlayer.tsx',
        },
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          '@reduxjs/toolkit': { singleton: true },
          'react-redux': { singleton: true }
        },
    }));
    return config;
  },
};`
      },
      {
        type: 'text',
        value: '<h3>4. Backend NestJS (Stream)</h3><p>Mantemos o backend robusto com NestJS servindo chunks de áudio.</p>'
      },
      {
        type: 'code',
        language: 'typescript',
        value: `// src/tracks/tracks.controller.ts
import { Controller, Get, Param, Res, Header, StreamableFile } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get(':id/stream')
  @Header('Content-Type', 'audio/mpeg')
  @Header('Accept-Ranges', 'bytes')
  getStream(@Param('id') id: string): StreamableFile {
    return this.tracksService.getAudioStream(id);
  }
}`
      },
      {
        type: 'text',
        value: '<h3>5. Deploy Vercel</h3><p>Configuração de rewrites para permitir que o Host consuma o Remote sem erros de CORS.</p>'
      },
      {
        type: 'code',
        language: 'json',
        value: `// vercel.json (Host App)
{
  "rewrites": [
    {
      "source": "/_next/static/chunks/remoteEntry.js",
      "destination": "https://meu-remote-app.vercel.app/_next/static/chunks/remoteEntry.js"
    },
    {
      "source": "/player/:path*",
      "destination": "https://meu-remote-app.vercel.app/:path*"
    }
  ]
}`
      }
    ]
  },
  {
    id: 4,
    title: 'Megamenu Responsivo: HTML5 + CSS Grid + Vanilla JS',
    description: 'Construção de uma navegação complexa com dropdowns de largura total e layout em grid, sem dependências.',
    content: [
      {
        type: 'text',
        value: '<h3>Conceito</h3><p>Megamenus são essenciais para e-commerces e portais de conteúdo. Diferente de dropdowns comuns, eles ocupam 100% da largura e permitem estruturar links em colunas, incluir imagens e destaques.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. Estrutura Semântica (HTML)</h3><p>Utilizamos uma lista não ordenada para a navegação. O segredo está em aninhar o container <code>.mega-box</code> dentro do item de lista (<code>li</code>) que servirá de gatilho.</p>'
      },
      {
        type: 'code',
        language: 'html',
        value: `<nav>
  <div class="wrapper">
    <div class="logo"><a href="#">Brand</a></div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li>
        <a href="#" class="desktop-item">Produtos ▾</a>
        <div class="mega-box">
          <div class="content">
            <div class="row">
              <header>Eletrônicos</header>
              <ul class="mega-links">
                <li><a href="#">Laptops</a></li>
                <li><a href="#">Smartphones</a></li>
              </ul>
            </div>
            <div class="row">
              <header>Moda</header>
              <ul class="mega-links">
                <li><a href="#">Masculino</a></li>
                <li><a href="#">Feminino</a></li>
              </ul>
            </div>
            <div class="row">
              <img src="promo.jpg" alt="Destaque">
            </div>
          </div>
        </div>
      </li>
      <li><a href="#">Contato</a></li>
    </ul>
    <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
  </div>
</nav>`
      },
      {
        type: 'text',
        value: '<h3>2. Estilização e Layout (CSS)</h3><p>O truque para o Megamenu é definir o <code>position: absolute</code> com <code>left: 0</code> e <code>width: 100%</code>. Usamos <strong>CSS Grid</strong> para organizar as colunas internas de forma limpa.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* Reset básico */
* { box-sizing: border-box; font-family: 'Poppins', sans-serif; }

nav {
  position: fixed;
  z-index: 99;
  width: 100%;
  background: #242526;
}

nav .wrapper {
  position: relative;
  max-width: 1300px;
  padding: 0 30px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Oculta o Megamenu inicialmente */
.mega-box {
  position: absolute;
  top: 85px; /* Altura da navbar */
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  background: #242526;
}

/* Exibe ao passar o mouse no LI pai */
.nav-links li:hover .mega-box {
  top: 70px;
  opacity: 1;
  visibility: visible;
}

/* Layout interno com Grid */
.mega-box .content {
  background: #242526;
  padding: 25px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 Colunas iguais */
  gap: 20px;
  width: 100%; 
}`
      },
      {
        type: 'text',
        value: '<h3>3. Interatividade Mobile (JS)</h3><p>Para dispositivos móveis, removemos o efeito de hover e utilizamos JavaScript para alternar classes, transformando o menu em um "Accordion".</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Lógica para controle do Menu Mobile e Submenus
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const dropdowns = document.querySelectorAll(".desktop-item");

// Toggle Menu Principal
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-active");
});

// Lógica de Accordion para Mobile
dropdowns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (window.innerWidth < 970) {
      e.preventDefault(); // Previne navegação
      const megaBox = btn.nextElementSibling; // Seleciona a .mega-box
      megaBox.classList.toggle("show-mega");
    }
  });
});`
      }
    ]
  },
  {
    id: 5,
    title: 'Push Notifications no Expo (Android & iOS)',
    description: 'Implementando notificações remotas e locais, com gerenciamento de permissões e listeners para background/foreground.',
    content: [
      {
        type: 'text',
        value: '<h3>Visão Geral</h3><p>O <code>expo-notifications</code> unifica a API de notificações para iOS e Android. O desafio principal é lidar com as permissões e os "Channels" (obrigatórios no Android 8+).</p><p>Para que a notificação apareça em <strong>Background</strong>, o sistema operacional gerencia a UI automaticamente. Para <strong>Foreground</strong>, precisamos definir um <em>Handler</em>.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. Configuração do Handler</h3><p>Primeiro, definimos como o app deve se comportar se receber uma notificação enquanto estiver <strong>aberto</strong> (Foreground). Sem isso, a notificação chega mas não aparece visualmente.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `import * as Notifications from 'expo-notifications';

// Configuração Global: define o comportamento em Foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Exibe o alerta visual
    shouldPlaySound: true, // Toca som
    shouldSetBadge: true,  // Atualiza contador no ícone
  }),
});`
      },
      {
        type: 'text',
        value: '<h3>2. Obtendo o Token e Permissões</h3><p>Esta função é o coração do sistema. Ela verifica se é um dispositivo físico (não funciona em emulador iOS), pede permissão ao usuário e configura o canal do Android.</p>'
      },
      {
        type: 'code',
        language: 'typescript',
        value: `import * as Device from 'expo-device';
import { Platform } from 'react-native';

async function registerForPushNotificationsAsync() {
  let token;

  // 1. Configuração específica para Android (Canais)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // 2. Verificação de Dispositivo Físico
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Se não tem permissão, pede agora
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Falha ao obter permissão para push notifications!');
      return;
    }

    // 3. Gera o Token do Expo
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Use um dispositivo físico para Push Notifications');
  }

  return token;
}`
      },
      {
        type: 'text',
        value: '<h3>3. Listeners e Agendamento Local</h3><p>No componente principal, gerenciamos os listeners. O exemplo abaixo também mostra como "enviar" (agendar) uma notificação local que dispara mesmo se você sair do app.</p>'
      },
      {
        type: 'code',
        language: 'tsx',
        value: `import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener: Disparado quando notificação chega (App Aberto)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Listener: Disparado quando usuário CLICA na notificação (Background/Closed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      // Aqui você navega para uma tela específica
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Função para testar notificação local (Simula o envio)
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Olá! 📬",
        body: 'Esta notificação funciona em background!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 }, // Dispara em 2 segundos
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Token: {expoPushToken}</Text>
      <Button
        title="Agendar Notificação Local"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}`
      },
      {
        type: 'text',
        value: '<h3>4. Testando o Background</h3><p>Para testar:</p><ol><li>Rode o app no device físico.</li><li>Copie o Token gerado na tela.</li><li>Clique no botão "Agendar" e pressione <strong>Home</strong> imediatamente para fechar o app.</li><li>Em 2 segundos, a notificação aparecerá na barra de status do sistema.</li></ol><p>Para testes remotos, utilize a ferramenta <a href="https://expo.dev/notifications" target="_blank">Expo Push Notification Tool</a>.</p>'
      }
    ]
  },
  {
    id: 7,
    title: '.NET 10 Preview 1: ISOWeek e DateOnly',
    description: 'Explorando as novas sobrecargas da System.Globalization para manipulação de semanas ISO 8601 diretamente com DateOnly.',
    content: [
      {
        type: 'text',
        value: '<h3>Contexto</h3><p>Com o lançamento do <strong>.NET 10 Preview 1</strong>, a Microsoft introduziu melhorias de qualidade de vida na biblioteca base. Uma das mais aguardadas é a atualização da classe <code>ISOWeek</code> para suportar nativamente o tipo <code>DateOnly</code>, eliminando a necessidade de conversões desnecessárias para <code>DateTime</code>.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. Preparando o Ambiente (global.json)</h3><p>Ao trabalhar com versões Preview, é crucial garantir que o comando <code>dotnet</code> utilize a versão correta do SDK. Crie um arquivo <code>global.json</code> na raiz do projeto para "pinar" a versão.</p>'
      },
      {
        type: 'code',
        language: 'json',
        value: `{
  "sdk": {
    "version": "10.0.100-preview.1",
    "allowPrerelease": true
  }
}`
      },
      {
        type: 'text',
        value: '<h3>2. O Problema (Antes do .NET 10)</h3><p>Anteriormente, para calcular o número da semana ISO de um <code>DateOnly</code>, você precisava converter o objeto: <code>ISOWeek.GetWeekOfYear(meuDateOnly.ToDateTime(...))</code>. Isso gerava alocações desnecessárias e código verboso.</p>'
      },
      {
        type: 'text',
        value: '<h3>3. As Novas Sobrecargas</h3><p>O .NET 10 introduziu três métodos principais que aceitam ou retornam <code>DateOnly</code>:</p><ul><li><code>GetWeekOfYear(DateOnly)</code></li><li><code>GetYear(DateOnly)</code></li><li><code>ToDateOnly(year, week, dayOfWeek)</code></li></ul>'
      },
      {
        type: 'code',
        language: 'csharp',
        value: `using System.Globalization;

// Data de Exemplo: 25 de Fevereiro de 2025
DateOnly dataAlvo = new DateOnly(2025, 02, 25);

Console.WriteLine($"Analisando a data: {dataAlvo}");

// 1. Obtendo a semana ISO diretamente do DateOnly (Novo no .NET 10)
int semana = ISOWeek.GetWeekOfYear(dataAlvo);
Console.WriteLine($"Semana ISO: {semana}"); 
// Saída esperada: 9

// 2. Obtendo o ano ISO (pode ser diferente do ano calendário em bordas de ano)
int anoIso = ISOWeek.GetYear(dataAlvo);
Console.WriteLine($"Ano ISO: {anoIso}");
// Saída esperada: 2025

// 3. Operação Inversa: Criando um DateOnly a partir da semana (Novo no .NET 10)
// Vamos pegar a próxima semana (Semana 10)
DateOnly dataDaProximaSemana = ISOWeek.ToDateOnly(anoIso, semana + 1, DayOfWeek.Monday);

Console.WriteLine($"Segunda-feira da próxima semana: {dataDaProximaSemana}");
// Saída esperada: 03/03/2025`
      },
      {
        type: 'text',
        value: '<h3>Conclusão</h3><p>Essas mudanças simplificam cenários comuns em relatórios financeiros e logísticos que dependem do padrão ISO 8601, mantendo a performance e a semântica correta do tipo <code>DateOnly</code>.</p>'
      }
    ]
  },
  {
    id: 8,
    title: 'CSS Evolution: De Media Queries a Style Queries (2025)',
    description: 'A linha do tempo da responsividade: Range Context, Container Queries e o futuro com Style Queries.',
    tech: 'CSS Level 5',
    content: [
      {
        type: 'text',
        value: '<h3>A Era Pós-Viewport</h3><p>Durante uma década, escrevemos CSS baseado apenas no tamanho da tela (<code>width</code>). Em 2025, o design responsivo é orientado a componentes, estados e capacidades do dispositivo, não apenas pixels.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. O Passado: Range Syntax (Mídia Clássica vs. Moderna)</h3><p>Escrever <code>min-width</code> e <code>max-width</code> sempre foi confuso. A sintaxe de "Intervalo" (Range Syntax) tornou o CSS legível matematicamente.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* O Jeito "Clássico" (Difícil de ler) */
@media (min-width: 320px) and (max-width: 768px) {
  .card { padding: 10px; }
}

/* O Jeito Moderno (Range Syntax) */
/* Suportado em todos os navegadores desde 2023 */
@media (320px <= width <= 768px) {
  .card { padding: 10px; }
}

/* Ou simplesmente "menor que" */
@media (width < 600px) { ... }`
      },
      {
        type: 'text',
        value: '<h3>2. O Presente: Container Queries (@container)</h3><p>O componente não deve saber o tamanho da TELA, mas sim o tamanho do PAI onde ele está inserido. Isso permite que o mesmo "Card" seja horizontal na sidebar e vertical no conteúdo principal, sem classes extras.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* 1. Defina o elemento pai como container */
.sidebar, .main-content {
  container-type: inline-size;
  container-name: card-wrapper;
}

/* 2. O filho reage ao PAI */
.card {
  display: flex;
  flex-direction: column;
}

/* Se o PAI for maior que 400px, mude o layout */
@container card-wrapper (width > 400px) {
  .card {
    flex-direction: row; /* Fica horizontal */
    gap: 20px;
  }
}`
      },
      {
        type: 'text',
        value: '<h3>3. O Futuro (2025): Style Queries</h3><p>Agora podemos estilizar elementos baseados em valores de variáveis CSS ou estilos computados do pai. É a lógica "if/else" do CSS.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* Pai define um "Tema" via variável */
.section-dark {
  --theme: dark;
  container-name: theming;
}

/* Filho reage ao valor da variável do pai */
@container theming style(--theme: dark) {
  .button {
    background-color: white;
    color: black;
    border: none;
  }
}

@container theming style(--theme: ocean) {
  .button {
    background: linear-gradient(to right, blue, cyan);
  }
}`
      },
      {
        type: 'text',
        value: '<h3>4. Bônus: Scripting Media Query</h3><p>Detecte se o JavaScript está quebrado ou desativado e forneça um fallback CSS puro.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `@media (scripting: none) {
  /* Se o JS não rodar, mostre todos os itens do accordion abertos */
  .accordion-content {
    display: block !important;
    height: auto;
  }
  
  .loading-spinner {
    display: none;
  }
}`
      },
      {
        type: 'text',
        value: '<h3>5. Media Queries Level 4: Interação (Touch vs Mouse)</h3><p>Pare de checar User-Agents. A spec Level 4 trouxe a capacidade de detectar a precisão do dispositivo de entrada.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* Dispositivos de toque (Dedo é impreciso) */
@media (pointer: coarse) {
  .btn {
    min-height: 48px; /* Área de toque segura */
    padding: 15px;
  }
  
  /* Hover não existe em touch (ou é emulado mal) */
  @media (hover: none) {
    .tooltip { display: none; }
  }
}

/* Mouse/Trackpad (Preciso) */
@media (pointer: fine) {
  .btn {
    min-height: 32px;
    padding: 8px;
  }
}`
      },
      {
        type: 'text',
        value: '<h3>6. Level 5: Preferências de Usuário</h3><p>O CSS moderno respeita as escolhas do sistema operacional do usuário, como economizar dados ou evitar vertigem.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* Usuário prefere menos movimento (Vertigem/Labirintite) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Usuário prefere alto contraste */
@media (prefers-contrast: more) {
  body {
    background: white;
    color: black;
  }
}`
      }
    ]
  },
  {
    id: 9,
    title: 'Arquitetura CSS: Metodologias e Padrões (BEM vs Modern)',
    description: 'Um comparativo prático entre as principais metodologias de organização de estilos: BEM, OOCSS e a abordagem moderna Utility-First.',
    tech: 'CSS Architecture',
    content: [
      {
        type: 'text',
        value: '<h3>O Caos do CSS Global</h3><p>Sem uma metodologia, o CSS cresce desordenado, causando conflitos de especificidade e código morto. Vamos explorar como resolver isso.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. BEM (Block Element Modifier)</h3><p>Criado pelo Yandex, é o padrão de ouro para componentes isolados. A ideia é que o nome da classe diga exatamente o que o elemento faz e onde ele pertence.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* BLOCO: O componente em si */
.card { 
  background: white; 
}

/* ELEMENTO: Parte interna do bloco (separado por __) */
.card__title { 
  font-weight: bold; 
}
.card__image { 
  width: 100%; 
}

/* MODIFICADOR: Variação de estilo (separado por --) */
.card--featured { 
  border: 2px solid gold; 
}

/* HTML:
<div class="card card--featured">
  <img class="card__image" />
  <h2 class="card__title">Título</h2>
</div>
*/`
      },
      {
        type: 'text',
        value: '<h3>2. OOCSS (Object Oriented CSS)</h3><p>Popularizado por Nicole Sullivan, foca na separação entre <strong>Estrutura</strong> (layout) e <strong>Pele</strong> (cores/temas). Promove alto reuso.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* ESTRUTURA (Tamanhos, Posicionamento) */
.btn {
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
}

/* PELE (Cores, Bordas) */
.btn-primary {
  background: blue;
  color: white;
}

.btn-danger {
  background: red;
  color: white;
}

/* HTML combina as classes:
<button class="btn btn-primary">Salvar</button>
<button class="btn btn-danger">Deletar</button>
*/`
      },
      {
        type: 'text',
        value: '<h3>3. Utility-First (Tailwind/Atomic)</h3><p>A abordagem dominante hoje. Em vez de criar componentes CSS, você compõe interfaces usando pequenas classes utilitárias de propósito único.</p>'
      },
      {
        type: 'code',
        language: 'html',
        value: `<!-- Nenhuma classe .css customizada escrita -->
<div class="flex items-center p-4 bg-white shadow-lg rounded-lg">
  <img class="w-16 h-16 rounded-full mr-4" src="avatar.jpg" />
  <div>
    <h2 class="text-xl font-bold text-gray-800">Nome do Usuário</h2>
    <p class="text-gray-500">Desenvolvedor Front-end</p>
  </div>
</div>`
      },
      {
        type: 'text',
        value: '<h3>4. CUBE CSS (Composition Utility Block Exception)</h3><p>Um meio-termo pragmático criado por Andy Bell. Usa BEM para componentes complexos, mas utilitários para espaçamento e layout macro.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* [C]omposition: Layout Macro via data-attributes */
[data-layout="sidebar"] {
  display: flex;
  gap: 1rem;
}

/* [U]tility: Classes atômicas para ajustes finos */
.text-center { text-align: center; }
.mt-4 { margin-top: 1rem; }

/* [B]lock: Componente BEM para especificidade contida */
.card { padding: 1rem; border: 1px solid #ccc; }

/* [E]xception: Mudança de estado via data-state */
.card[data-state="active"] { border-color: blue; }`
      }
    ]
  },
  {
    id: 10,
    title: 'ES2026 Preview: O Futuro do JavaScript',
    description: 'Explorando as propostas que estão mudando o JS: Pipeline Operator, Pattern Matching e estruturas imutáveis nativas.',
    tech: 'JavaScript (Stage 3+)',
    content: [
      {
        type: 'text',
        value: '<h3>1. Pipeline Operator (|>)</h3><p>O sonho da programação funcional. Em vez de aninhar funções infinitamente como <code>funcC(funcB(funcA(x)))</code>, você encadeia o fluxo de dados.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Antes (Aninhamento Clássico):
const resultado = Math.ceil(Math.pow(Math.max(10, 20), 2));

// Com Pipeline Operator (Proposta):
const resultado = 10
  |> (n => Math.max(n, 20))  // 20
  |> (n => Math.pow(n, 2))   // 400
  |> Math.ceil;              // 400

// Mais legível e segue o fluxo da leitura (esquerda -> direita)`
      },
      {
        type: 'text',
        value: '<h3>2. Pattern Matching</h3><p>Uma evolução poderosa do <code>switch</code>. Permite testar a estrutura dos dados, não apenas valores exatos.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `const resposta = await fetch(api);
const json = await resposta.json();

return match (json) {
  when { status: 200, data: { items: [first, ...rest] } } -> 
    \`Sucesso! Primeiro item: \${first.name}\`,
    
  when { status: 404 } -> 'Não encontrado',
  
  when { status: 500 } -> throw new Error('Erro no servidor'),
  
  when _ -> 'Erro desconhecido'
};`
      },
      {
        type: 'text',
        value: '<h3>3. Records & Tuples (Imutabilidade Nativa)</h3><p>Novos tipos primitivos para objetos e arrays imutáveis. Comparados por valor (<code >===</code> funciona de verdade!), não por referência.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Record (Objeto Imutável) - usa #{}
const usuario1 = #{ id: 1, nome: "André" };
const usuario2 = #{ id: 1, nome: "André" };

console.log(usuario1 === usuario2); // TRUE! (Comparação por valor)

// Tuple (Array Imutável) - usa #[]
const coordenadas = #[10, 20];

// Tentar modificar lança erro:
// coordenadas[0] = 50; // TypeError`
      },
      {
        type: 'text',
        value: '<h3>4. Temporal API (Date is Dead)</h3><p>Finalmente, uma API completa para lidar com datas, timezones e durações, substituindo o objeto <code>Date</code> quebrado.</p>'
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Data exata sem Timezone
const hoje = Temporal.PlainDate.from('2026-05-15');

// Adicionando tempo de forma segura
const prazo = hoje.add({ months: 1, days: 5 });

// Lidando com Fusos Diferentes
const agoraSP = Temporal.Now.zonedDateTimeISO('America/Sao_Paulo');
const agoraTokio = agoraSP.withTimeZone('Asia/Tokyo');

console.log(prazo.toString()); // 2026-06-20
console.log(agoraTokio.toString()); // Conversão automática correta`
      }
    ]
  },
  {
    id: 11,
    title: 'Resiliência Web: Progressive Enhancement vs Graceful Degradation',
    description: 'Aprenda a construir aplicações à prova de falhas. Entenda a diferença entre construir de baixo para cima (Progressive) e degradar elegantemente (Graceful).',
    tech: 'Architecture / Strategy',
    content: [
      {
        type: 'text',
        value: '<h3>A Batalha das Filosofias</h3><p>Duas abordagens para lidar com a diversidade de dispositivos e falhas na web. Entender quando usar cada uma define a robustez do seu software.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. Progressive Enhancement (Aperfeiçoamento Progressivo)</h3><p>A abordagem "Start Small". Começa-se com o básico funcional (HTML puro) e adiciona-se camadas de melhoria (CSS/JS) se o navegador suportar. Se o JS falhar, o site AINDA funciona.</p>'
      },
      {
        type: 'code',
        language: 'html',
        value: `<!-- Nível 0: HTML Semântico (Funciona em qualquer lugar) -->
<a href="/login" class="btn">Entrar</a>

<!-- Nível 1: CSS (Melhora a aparência) -->
<style>
  .btn { 
    background: blue; color: white; padding: 10px; 
    border-radius: 4px; text-decoration: none;
  }
</style>

<!-- Nível 2: JavaScript (Melhora a experiência - AJAX) -->
<script>
  // Se o JS carregar, intercepta o clique.
  // Se falhar (erro de rede/bloqueador), o link HTML acima funciona.
  document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    openModalLogin(); // UX aprimorada
  });
</script>`
      },
      {
        type: 'text',
        value: '<h3>2. Graceful Degradation (Degradação Graciosa)</h3><p>A abordagem "Modern First". Constrói-se pensando nos navegadores mais novos e fornece "fallbacks" para que versões antigas não quebrem totalmente, mesmo que fiquem feias.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* 1. O código moderno (Grid Layout) */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 2. O fallback para navegadores antigos (Degradação) */
/* Usa @supports para verificar suporte */
@supports not (display: grid) {
  .gallery {
    display: flex; /* Flexbox é mais antigo e suportado */
    flex-wrap: wrap;
  }
  .gallery-item {
    width: 33.33%; /* Simula 3 colunas */
  }
}`
      },
      {
        type: 'text',
        value: '<h3>3. Exemplo Prático: Carregamento de Imagens</h3><p>Combinando as técnicas: O navegador moderno usa WEBP e Lazy Loading. O antigo recebe JPG padrão.</p>'
      },
      {
        type: 'code',
        language: 'html',
        value: `<picture>
  <!-- Progressive: Tenta carregar a melhor versão (AVIF/WebP) -->
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  
  <!-- Fallback/Graceful: Se nada acima funcionar, carrega JPG -->
  <img 
    src="foto.jpg" 
    alt="Exemplo" 
    loading="lazy" <!-- Feature moderna -->
    width="500" 
    height="300"
  >
</picture>`
      }
    ]
  },
  {
    id: 13,
    title: 'Design Tokens em Escala: MF (React, Vue, Angular)',
    description: 'Como centralizar a identidade visual (Cores, Fontes) em uma arquitetura de Micro-frontends multi-framework sem duplicar código.',
    tech: 'Design Systems / CSS',
    content: [
      {
        type: 'text',
        value: '<h3>O Desafio Multi-Framework</h3><p>Em um ecossistema com React, Angular e Vue rodando juntos, compartilhar constantes JS ou pré-processadores (SASS/LESS) é complexo e quebradiço. A solução definitiva? <strong>CSS Custom Properties (Variáveis CSS)</strong>.</p>'
      },
      {
        type: 'text',
        value: '<h3>1. A Fonte da Verdade (Global Tokens)</h3><p>Definimos os tokens no nível mais alto da aplicação (Root Config ou Shell). Eles são carregados uma única vez e "descem" para todos os micro-frontends.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* tokens.css (Carregado no index.html do Shell) */
:root {
  /* Paleta Semântica (Não use Hex diretamente nos componentes!) */
  --color-primary: #0070f3;
  --color-success: #10b981;
  --color-bg-base: #ffffff;
  --color-text-main: #111827;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Espaçamento */
  --space-4: 1rem;
  --space-8: 2rem;
}`
      },
      {
        type: 'text',
        value: '<h3>2. Consumindo no React (Styled Components)</h3><p>No React, não precisamos importar arquivos JSON. Basta usar a variável CSS. O Styled Components injeta estilos, mas o valor vem do navegador.</p>'
      },
      {
        type: 'code',
        language: 'jsx',
        value: `// Button.jsx (Micro-frontend React)
import styled from 'styled-components';

const Button = styled.button\`
  background-color: var(--color-primary); /* Valor vem do Shell */
  color: white;
  padding: var(--space-4);
  font-family: var(--font-sans);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
\`;

export default Button;`
      },
      {
        type: 'text',
        value: '<h3>3. Consumindo no Angular</h3><p>No Angular, usamos as variáveis dentro dos arquivos de estilo do componente (`.scss` ou `.css`). O ViewEncapsulation não bloqueia variáveis CSS herdadas.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* card.component.scss (Micro-frontend Angular) */
.card {
  background: var(--color-bg-base);
  border: 1px solid var(--color-primary);
  color: var(--color-text-main);
  padding: var(--space-8);
  
  h2 {
    font-family: var(--font-sans);
    color: var(--color-success);
  }
}`
      },
      {
        type: 'text',
        value: '<h3>4. Consumindo no Vue.js</h3><p>Mesma lógica dentro da tag <code>&lt;style&gt;</code> do Single File Component.</p>'
      },
      {
        type: 'code',
        language: 'html',
        value: `<!-- Badge.vue (Micro-frontend Vue) -->
<template>
  <span class="badge">Novo</span>
</template>

<style scoped>
.badge {
  background-color: var(--color-success);
  color: white;
  font-family: var(--font-mono); /* Ex: Fira Code */
  padding: 4px 8px;
  border-radius: 12px;
}
</style>`
      },
      {
        type: 'text',
        value: '<h3>5. Theming Dinâmico (Dark Mode)</h3><p>A mágica acontece aqui. Para mudar o tema de TODOS os micro-frontends simultaneamente, basta alterar as variáveis no <code>:root</code> via JS ou classe CSS.</p>'
      },
      {
        type: 'code',
        language: 'css',
        value: `/* dark-theme.css */
[data-theme="dark"] {
  --color-primary: #3b82f6; /* Azul mais claro para fundo escuro */
  --color-bg-base: #1f2937;
  --color-text-main: #f9fafb;
}`
      }
    ]
  }
];
