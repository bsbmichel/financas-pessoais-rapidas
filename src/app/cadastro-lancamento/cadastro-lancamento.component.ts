// Importações do Angular e dos módulos que habilitam *ngFor, ngModel e formulários
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa módulos do Angular Material para input, form, botão, select e card
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

// Importação do serviço que salva/carrega dados do localStorage
import { LancamentoService } from '../lancamento.service';
import { GraficoResumoComponent } from '../grafico-resumo/grafico-resumo.component';

@Component({
  selector: 'app-cadastro-lancamento', // Nome da tag usada no HTML para este componente
  standalone: true,
  // Importa os módulos necessários para o funcionamento do componente
  imports: [  
    CommonModule, // Funcionalidades básicas do Angular
    FormsModule,  // Habilita o ngModel (two-way binding)
    MatInputModule, // Input estilizado do Material
    MatFormFieldModule, // Formulário estilizado
    MatButtonModule, // Botões estilizados
    MatSelectModule, // Dropdown estilizado
    MatCardModule, // Card (caixa de conteúdo)
    GraficoResumoComponent // Mantém o gráfico funcionando
  ],
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit {
  // Variáveis que representam os campos do formulário
  descricao: string = '';
  valor: number | null = null;
  tipo: string = 'entrada';
  data: string = '';

  // Lista de lançamentos exibidos na tela
  lancamentos: any[] = [];

  // Variáveis para resumo financeiro
  totalEntradas: number = 0;
  totalSaidas: number = 0;
  saldoFinal: number = 0;

  // Injeção do serviço de localStorage
  constructor(private lancamentoService: LancamentoService) {}

  // Executado automaticamente ao abrir o componente
  ngOnInit(): void {
    // Carrega os dados do localStorage e exibe na tela
    this.lancamentos = this.lancamentoService.carregar();

    // Calcula o resumo com base nos dados carregados
    this.calcularResumo();
  }

  // Função chamada ao clicar no botão "Salvar"
  salvar(form: any) {
    const novoLancamento = {
      descricao: this.descricao,
      valor: this.valor?.toString()
                      .replace('R$', '')
                      .replace(/\./g, '')
                      .replace(',', '.'),
      tipo: this.tipo,
      data: this.data
    };

    // Valida se os campos foram realmente preenchidos
    if (!novoLancamento.descricao || !novoLancamento.valor || !novoLancamento.data) {
      console.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    // Adiciona o novo lançamento à lista
    this.lancamentos.push(novoLancamento);

    // Salva a nova lista no localStorage
    this.lancamentoService.salvar(this.lancamentos);

    // Atualiza os totais de entrada, saída e saldo
    this.calcularResumo();

    // Limpa os campos do formulário para novo cadastro
    this.descricao = '';
    this.valor = null;
    this.tipo = 'entrada';
    this.data = '';

    // Reseta o formulário visualmente
    form.resetForm({ tipo: 'entrada' });
  }

  // Função para limpar todos os lançamentos e o localStorage
  limparTudo() {
    // Remove os dados do localStorage
    this.lancamentoService.limpar();

    // Zera a lista de lançamentos na tela
    this.lancamentos = [];

    // Reseta os totais
    this.calcularResumo();
  }

  // Função que calcula entradas, saídas e saldo final
  calcularResumo() {
    // Filtra todos os lançamentos do tipo "entrada"
    const entradas = this.lancamentos.filter(l => l.tipo === 'entrada');

    // Filtra todos os lançamentos do tipo "saida"
    const saidas = this.lancamentos.filter(l => l.tipo === 'saida');

    // Soma os valores de entrada
    this.totalEntradas = entradas.reduce((soma, l) => soma + parseFloat(l.valor), 0);

    // Soma os valores de saída
    this.totalSaidas = saidas.reduce((soma, l) => soma + parseFloat(l.valor), 0);

    // Calcula o saldo final
    this.saldoFinal = this.totalEntradas - this.totalSaidas;
  }
  
  // Retorna os lançamentos filtrados conforme o tipo selecionado
  getLancamentosFiltrados() {
  // Se o filtro estiver como "todos", retorna todos os lançamentos
    if (this.filtro === 'todos') {
      return this.lancamentos;
    }
  // Caso contrário, retorna apenas os que forem do tipo selecionado
  return this.lancamentos.filter(l => l.tipo === this.filtro);
}
  // Controla o tipo de filtro ativo na tela (todos, entrada ou saída)
  filtro: 'todos' | 'entrada' | 'saida' = 'todos';
}
