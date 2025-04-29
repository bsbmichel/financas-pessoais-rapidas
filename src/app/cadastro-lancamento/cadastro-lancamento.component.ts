// Importações do Angular e dos módulos que habilitam *ngFor, ngModel e formulários
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importação do serviço que salva/carrega dados do localStorage
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-cadastro-lancamento', // Nome da tag usada no HTML para este componente
  standalone: true,
  // Módulos necessários para funcionar diretivas como *ngFor e ngModel
  imports: [CommonModule, FormsModule],
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
  salvar() {
    const novoLancamento = {
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
      data: this.data
    };

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
}
