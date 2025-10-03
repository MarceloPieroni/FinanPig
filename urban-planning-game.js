// Urban Pathways - NASA Space Apps Hackathon
// Jogo educativo sobre planejamento urbano sustentável

/**
 * Sistema de Estado Urbano
 * Gerencia os indicadores principais da cidade baseados em dados científicos reais
 */
class UrbanStateManager {
  constructor() {
    // Valores iniciais baseados em dados reais de cidades médias
    this.indicators = {
      temperatura: {
        valor: 25, // °C - temperatura média urbana
        min: 15,
        max: 45,
        unidade: '°C'
      },
      poluicao: {
        valor: 50, // Índice de qualidade do ar (0-100, onde 0 é excelente)
        min: 0,
        max: 100,
        unidade: 'AQI'
      },
      qualidadeVida: {
        valor: 70, // Índice de qualidade de vida (0-100)
        min: 0,
        max: 100,
        unidade: 'Índice'
      }
    };

    // Histórico de ações para análise
    this.historicoAcoes = [];
    this.contadorAcoes = 0;
  }

  /**
   * Aplica o impacto de uma ação urbana nos indicadores
   * @param {string} acao - Tipo de ação realizada
   * @param {Object} impacto - Valores de impacto da ação
   */
  aplicarAcao(acao, impacto) {
    // Aplica mudanças nos indicadores
    this.indicators.temperatura.valor = Math.max(
      this.indicators.temperatura.min,
      Math.min(this.indicators.temperatura.max, 
        this.indicators.temperatura.valor + impacto.temperatura)
    );

    this.indicators.poluicao.valor = Math.max(
      this.indicators.poluicao.min,
      Math.min(this.indicators.poluicao.max, 
        this.indicators.poluicao.valor + impacto.poluicao)
    );

    this.indicators.qualidadeVida.valor = Math.max(
      this.indicators.qualidadeVida.min,
      Math.min(this.indicators.qualidadeVida.max, 
        this.indicators.qualidadeVida.valor + impacto.qualidadeVida)
    );

    // Registra a ação no histórico
    this.historicoAcoes.push({
      acao,
      impacto,
      timestamp: new Date(),
      indicadores: { ...this.indicators }
    });

    this.contadorAcoes++;
  }

  /**
   * Retorna o status textual dos indicadores
   */
  getStatusIndicadores() {
    return {
      temperatura: this.getStatusTemperatura(),
      poluicao: this.getStatusPoluicao(),
      qualidadeVida: this.getStatusQualidadeVida()
    };
  }

  getStatusTemperatura() {
    const temp = this.indicators.temperatura.valor;
    if (temp <= 20) return 'Fria';
    if (temp <= 25) return 'Ameno';
    if (temp <= 30) return 'Quente';
    if (temp <= 35) return 'Muito Quente';
    return 'Extrema';
  }

  getStatusPoluicao() {
    const pol = this.indicators.poluicao.valor;
    if (pol <= 20) return 'Excelente';
    if (pol <= 40) return 'Boa';
    if (pol <= 60) return 'Moderada';
    if (pol <= 80) return 'Ruim';
    return 'Muito Ruim';
  }

  getStatusQualidadeVida() {
    const qv = this.indicators.qualidadeVida.valor;
    if (qv >= 80) return 'Excelente';
    if (qv >= 60) return 'Boa';
    if (qv >= 40) return 'Moderada';
    if (qv >= 20) return 'Ruim';
    return 'Muito Ruim';
  }
}

/**
 * Sistema de Ações Urbanas
 * Define os impactos científicos reais de cada ação de planejamento
 */
class UrbanActionsSystem {
  constructor() {
    // Dados baseados em estudos científicos reais da NASA e organizações ambientais
    this.acoes = {
      construirParque: {
        nome: 'Construir Parque',
        impacto: {
          temperatura: -2, // Parques reduzem temperatura urbana em 2-3°C
          poluicao: -10,   // Árvores filtram poluentes do ar
          qualidadeVida: 15 // Espaços verdes melhoram bem-estar
        },
        custo: 1000000, // Custo estimado em reais
        tempo: '6-12 meses',
        descricao: 'Parques urbanos são essenciais para reduzir o efeito ilha de calor urbana e melhorar a qualidade do ar.',
        dadosCientificos: 'Estudos da NASA mostram que áreas verdes podem reduzir a temperatura local em até 3°C e filtrar até 85% dos poluentes do ar.'
      },

      expandirCidade: {
        nome: 'Expandir Cidade',
        impacto: {
          temperatura: 3,  // Expansão urbana aumenta temperatura
          poluicao: 20,    // Mais veículos e indústrias
          qualidadeVida: -10 // Densidade urbana pode reduzir qualidade
        },
        custo: 50000000,
        tempo: '2-5 anos',
        descricao: 'Expansão urbana descontrolada pode aumentar significativamente a temperatura e poluição.',
        dadosCientificos: 'Dados da NASA indicam que áreas urbanas são 1-3°C mais quentes que áreas rurais devido ao efeito ilha de calor.'
      },

      criarCiclovia: {
        nome: 'Criar Ciclovia',
        impacto: {
          temperatura: -1, // Menos asfalto, mais sombra
          poluicao: -15,   // Reduz emissões de veículos
          qualidadeVida: 10 // Promove atividade física
        },
        custo: 500000,
        tempo: '3-6 meses',
        descricao: 'Ciclovias incentivam transporte sustentável e reduzem emissões de carbono.',
        dadosCientificos: 'Cada quilômetro de ciclovia pode reduzir até 1 tonelada de CO2 por ano, segundo estudos da OMS.'
      },

      plantarArvores: {
        nome: 'Plantar Árvores',
        impacto: {
          temperatura: -1, // Sombra e evapotranspiração
          poluicao: -8,    // Filtragem natural do ar
          qualidadeVida: 8 // Benefícios psicológicos
        },
        custo: 200000,
        tempo: '1-3 meses',
        descricao: 'Árvores são filtros naturais de ar e reguladores de temperatura urbana.',
        dadosCientificos: 'Uma árvore adulta pode absorver até 22kg de CO2 por ano e filtrar partículas poluentes do ar.'
      },

      energiaSolar: {
        nome: 'Energia Solar',
        impacto: {
          temperatura: -2, // Reduz uso de combustíveis fósseis
          poluicao: -25,   // Elimina emissões de energia
          qualidadeVida: 5 // Energia limpa e sustentável
        },
        custo: 2000000,
        tempo: '6-12 meses',
        descricao: 'Energia solar reduz drasticamente as emissões de gases de efeito estufa.',
        dadosCientificos: 'Painéis solares podem reduzir emissões de CO2 em até 80% comparado a fontes fósseis, segundo dados da NASA.'
      },

      transportePublico: {
        nome: 'Transporte Público',
        impacto: {
          temperatura: -1, // Menos veículos individuais
          poluicao: -20,   // Reduz tráfego e emissões
          qualidadeVida: 12 // Melhora mobilidade urbana
        },
        custo: 10000000,
        tempo: '1-3 anos',
        descricao: 'Sistemas de transporte público eficientes são fundamentais para cidades sustentáveis.',
        dadosCientificos: 'Transporte público pode reduzir emissões per capita em até 45% comparado ao transporte individual.'
      }
    };
  }

  /**
   * Retorna informações sobre uma ação específica
   */
  getAcao(acaoId) {
    return this.acoes[acaoId];
  }

  /**
   * Retorna todas as ações disponíveis
   */
  getTodasAcoes() {
    return this.acoes;
  }
}

/**
 * Gerenciador de Interface do Usuário
 * Controla a atualização visual dos indicadores e feedback
 */
class UIManager {
  constructor() {
    this.elements = {
      temperatureValue: document.getElementById('temperatureValue'),
      pollutionValue: document.getElementById('pollutionValue'),
      qualityValue: document.getElementById('qualityValue'),
      cityDescription: document.getElementById('cityDescription'),
      feedbackPanel: document.getElementById('feedbackPanel'),
      feedbackTitle: document.getElementById('feedbackTitle'),
      feedbackText: document.getElementById('feedbackText'),
      cityCanvas: document.getElementById('cityCanvas')
    };

    this.canvas = this.elements.cityCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.desenharCidade();
  }

  /**
   * Atualiza os indicadores na interface
   */
  atualizarIndicadores(urbanState) {
    const status = urbanState.getStatusIndicadores();
    
    // Atualiza valores com animação
    this.animarValor(this.elements.temperatureValue, 
      `${urbanState.indicators.temperatura.valor.toFixed(1)}°C`);
    
    this.animarValor(this.elements.pollutionValue, status.poluicao);
    this.animarValor(this.elements.qualityValue, status.qualidadeVida);

    // Atualiza descrição da cidade
    this.atualizarDescricaoCidade(urbanState);
    
    // Redesenha a cidade
    this.desenharCidade(urbanState);
  }

  /**
   * Anima a mudança de valores nos indicadores
   */
  animarValor(elemento, novoValor) {
    elemento.style.transform = 'scale(1.1)';
    elemento.style.color = '#e74c3c';
    
    setTimeout(() => {
      elemento.textContent = novoValor;
      elemento.style.transform = 'scale(1)';
      elemento.style.color = '';
    }, 300);
  }

  /**
   * Atualiza a descrição da cidade baseada nos indicadores
   */
  atualizarDescricaoCidade(urbanState) {
    const temp = urbanState.indicators.temperatura.valor;
    const pol = urbanState.indicators.poluicao.valor;
    const qv = urbanState.indicators.qualidadeVida.valor;

    let descricao = '';
    
    if (qv >= 80 && pol <= 30 && temp <= 25) {
      descricao = 'Uma cidade modelo de sustentabilidade! Excelente qualidade de vida, ar limpo e temperatura amena.';
    } else if (qv >= 60 && pol <= 50) {
      descricao = 'Uma cidade em desenvolvimento sustentável. Boa qualidade de vida com algumas áreas para melhorar.';
    } else if (pol >= 70 || temp >= 35) {
      descricao = 'Uma cidade enfrentando desafios ambientais. Ações de planejamento urbano são urgentes.';
    } else {
      descricao = 'Uma cidade moderna aguardando suas decisões de planejamento urbano para se tornar mais sustentável.';
    }

    this.elements.cityDescription.textContent = descricao;
  }

  /**
   * Desenha a representação visual da cidade no canvas
   */
  desenharCidade(urbanState = null) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Limpa o canvas
    ctx.clearRect(0, 0, width, height);

    // Fundo do céu
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB'); // Azul claro
    gradient.addColorStop(1, '#98FB98'); // Verde claro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Desenha elementos da cidade baseados nos indicadores
    if (urbanState) {
      this.desenharElementosUrbanos(ctx, width, height, urbanState);
    } else {
      // Cidade inicial
      this.desenharCidadeInicial(ctx, width, height);
    }
  }

  desenharCidadeInicial(ctx, width, height) {
    // Prédios básicos
    ctx.fillStyle = '#34495e';
    ctx.fillRect(width * 0.1, height * 0.6, width * 0.15, height * 0.3);
    ctx.fillRect(width * 0.3, height * 0.5, width * 0.2, height * 0.4);
    ctx.fillRect(width * 0.6, height * 0.55, width * 0.18, height * 0.35);
    ctx.fillRect(width * 0.85, height * 0.6, width * 0.12, height * 0.3);

    // Janelas
    ctx.fillStyle = '#f1c40f';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillRect(width * 0.1 + 20 + i * 15, height * 0.6 + 20 + j * 30, 8, 15);
      }
    }
  }

  desenharElementosUrbanos(ctx, width, height, urbanState) {
    const historico = urbanState.historicoAcoes;
    
    // Desenha elementos baseados nas ações realizadas
    historico.forEach((acao, index) => {
      switch (acao.acao) {
        case 'construirParque':
          this.desenharParque(ctx, width, height, index);
          break;
        case 'criarCiclovia':
          this.desenharCiclovia(ctx, width, height, index);
          break;
        case 'plantarArvores':
          this.desenharArvores(ctx, width, height, index);
          break;
        case 'energiaSolar':
          this.desenharPainelSolar(ctx, width, height, index);
          break;
        case 'transportePublico':
          this.desenharOnibus(ctx, width, height, index);
          break;
      }
    });

    // Sempre desenha prédios básicos
    this.desenharCidadeInicial(ctx, width, height);
  }

  desenharParque(ctx, width, height, index) {
    const x = width * (0.2 + (index * 0.15));
    const y = height * 0.7;
    
    // Área verde do parque
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(x, y, width * 0.12, height * 0.2);
    
    // Árvores no parque
    ctx.fillStyle = '#2d5016';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(x + 20 + i * 25, y + 30, 8, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  desenharCiclovia(ctx, width, height, index) {
    const y = height * 0.8;
    
    // Ciclovia
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(width * 0.1, y);
    ctx.lineTo(width * 0.9, y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Ciclista
    ctx.fillStyle = '#3498db';
    ctx.fillRect(width * 0.3 + (index * 50), y - 15, 20, 10);
  }

  desenharArvores(ctx, width, height, index) {
    const x = width * (0.1 + (index * 0.1));
    const y = height * 0.75;
    
    // Tronco
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x + 8, y, 4, 20);
    
    // Copa
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.arc(x + 10, y - 5, 12, 0, 2 * Math.PI);
    ctx.fill();
  }

  desenharPainelSolar(ctx, width, height, index) {
    const x = width * (0.7 + (index * 0.1));
    const y = height * 0.6;
    
    // Painel solar
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(x, y, 30, 20);
    
    // Células solares
    ctx.fillStyle = '#f1c40f';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillRect(x + 2 + i * 9, y + 2 + j * 8, 7, 6);
      }
    }
  }

  desenharOnibus(ctx, width, height, index) {
    const x = width * (0.2 + (index * 0.2));
    const y = height * 0.75;
    
    // Ônibus
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(x, y, 40, 15);
    
    // Janelas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(x + 5, y + 3, 8, 6);
    ctx.fillRect(x + 15, y + 3, 8, 6);
    ctx.fillRect(x + 25, y + 3, 8, 6);
  }

  /**
   * Mostra feedback educativo sobre a ação realizada
   */
  mostrarFeedback(acao, urbanState) {
    const infoAcao = urbanActionsSystem.getAcao(acao);
    
    this.elements.feedbackTitle.textContent = `Impacto: ${infoAcao.nome}`;
    
    const impacto = infoAcao.impacto;
    let feedbackText = `${infoAcao.descricao}\n\n`;
    feedbackText += `Impactos medidos:\n`;
    feedbackText += `• Temperatura: ${impacto.temperatura > 0 ? '+' : ''}${impacto.temperatura}°C\n`;
    feedbackText += `• Poluição: ${impacto.poluicao > 0 ? '+' : ''}${impacto.poluicao} pontos\n`;
    feedbackText += `• Qualidade de Vida: ${impacto.qualidadeVida > 0 ? '+' : ''}${impacto.qualidadeVida} pontos\n\n`;
    feedbackText += `Dados Científicos: ${infoAcao.dadosCientificos}`;

    this.elements.feedbackText.textContent = feedbackText;
    this.elements.feedbackPanel.style.display = 'block';
  }

  /**
   * Esconde o painel de feedback
   */
  esconderFeedback() {
    this.elements.feedbackPanel.style.display = 'none';
  }
}

/**
 * Gerenciador Principal do Jogo
 * Coordena todos os sistemas e interações
 */
class UrbanPlanningGame {
  constructor() {
    this.urbanState = new UrbanStateManager();
    this.urbanActionsSystem = new UrbanActionsSystem();
    this.uiManager = new UIManager();
    
    this.inicializarEventos();
    this.atualizarInterface();
  }

  inicializarEventos() {
    // Botão de iniciar
    document.getElementById('startButton').addEventListener('click', () => {
      this.iniciarJogo();
    });

    // Botão voltar ao menu
    document.getElementById('backToMenu').addEventListener('click', () => {
      this.voltarAoMenu();
    });

    // Botões de ação
    const acoes = [
      'buildPark', 'expandCity', 'buildBikeLane', 
      'plantTrees', 'buildSolar', 'publicTransport'
    ];

    acoes.forEach(acao => {
      document.getElementById(acao).addEventListener('click', () => {
        this.executarAcao(acao);
      });
    });

    // Botões do feedback
    document.getElementById('continueBtn').addEventListener('click', () => {
      this.uiManager.esconderFeedback();
    });

    document.getElementById('learnMoreBtn').addEventListener('click', () => {
      this.mostrarInformacoesCientificas();
    });

    // Redimensionamento do canvas
    window.addEventListener('resize', () => {
      this.uiManager.setupCanvas();
      this.uiManager.desenharCidade(this.urbanState);
    });
  }

  iniciarJogo() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';
    this.atualizarInterface();
  }

  voltarAoMenu() {
    document.getElementById('gameInterface').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    
    // Reset do jogo
    this.urbanState = new UrbanStateManager();
    this.atualizarInterface();
  }

  executarAcao(acaoId) {
    const mapeamentoAcoes = {
      'buildPark': 'construirParque',
      'expandCity': 'expandirCidade',
      'buildBikeLane': 'criarCiclovia',
      'plantTrees': 'plantarArvores',
      'buildSolar': 'energiaSolar',
      'publicTransport': 'transportePublico'
    };

    const acaoReal = mapeamentoAcoes[acaoId];
    const infoAcao = this.urbanActionsSystem.getAcao(acaoReal);
    
    // Aplica o impacto
    this.urbanState.aplicarAcao(acaoReal, infoAcao.impacto);
    
    // Atualiza interface
    this.atualizarInterface();
    
    // Mostra feedback
    this.uiManager.mostrarFeedback(acaoReal, this.urbanState);
  }

  atualizarInterface() {
    this.uiManager.atualizarIndicadores(this.urbanState);
  }

  mostrarInformacoesCientificas() {
    // Implementação do modal com informações científicas
    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    document.getElementById('infoModalTitle').textContent = 'Dados Científicos da NASA';
    document.getElementById('infoModalBody').innerHTML = `
      <h6>Fontes de Dados Utilizadas:</h6>
      <ul>
        <li><strong>NASA Earth Observatory:</strong> Dados sobre ilhas de calor urbanas e temperatura</li>
        <li><strong>NASA Air Quality:</strong> Monitoramento de poluição atmosférica</li>
        <li><strong>WHO Urban Health:</strong> Indicadores de qualidade de vida urbana</li>
        <li><strong>UN Sustainable Development Goals:</strong> Metas para cidades sustentáveis</li>
      </ul>
      
      <h6>Métricas Científicas:</h6>
      <p><strong>Temperatura:</strong> Baseada no efeito ilha de calor urbana, onde áreas urbanas podem ser 1-3°C mais quentes que áreas rurais.</p>
      <p><strong>Poluição:</strong> Índice AQI (Air Quality Index) que mede concentrações de poluentes como PM2.5, NO2, O3.</p>
      <p><strong>Qualidade de Vida:</strong> Combinação de fatores como acesso a espaços verdes, mobilidade, saúde pública e bem-estar.</p>
      
      <h6>Impactos Reais das Ações:</h6>
      <p>Cada ação no jogo é baseada em estudos científicos reais sobre planejamento urbano sustentável e seus efeitos mensuráveis no ambiente urbano.</p>
    `;
    modal.show();
  }
}

// Inicialização do jogo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
  window.urbanGame = new UrbanPlanningGame();
});

// Exporta classes para uso em outros módulos se necessário
export { UrbanStateManager, UrbanActionsSystem, UIManager, UrbanPlanningGame };
