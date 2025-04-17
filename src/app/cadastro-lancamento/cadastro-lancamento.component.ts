// Importa o decorator @Component do Angular para transformar a classe em componente
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Define as configurações do componente Angular
@Component({
  selector: 'app-cadastro-lancamento', // Nome da tag HTML usada para esse componente
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa módulos comuns e de formulários
  templateUrl: './cadastro-lancamento.component.html', // Caminho do arquivo HTML (estrutura visual)
  styleUrls: ['./cadastro-lancamento.component.css'] // Caminho do CSS (estilo visual)
})

// Declaração da classe do componente
export class CadastroLancamentoComponent {

  // Variável que vai guardar o texto digitado no campo de descrição do lançamento
  descricao: string = '';

  // Variável que guarda o valor numérico do lançamento (entrada ou saída)
  valor: number | null = null;

  // Variável que guarda o tipo do lançamento: entrada ou saída
  tipo: string = 'entrada';

  // Variável que guarda a data do lançamento
  data: string = '';

  // Array onde serão armazenados todos os lançamentos cadastrados
  lancamentos: any[] = [];

  // Função chamada ao clicar no botão "Salvar" do formulário
  salvar() {
    // Cria um objeto com os dados preenchidos no formulário
    const novoLancamento = {
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
      data: this.data
    };

    // Adiciona o novo lançamento no array de lançamentos
    this.lancamentos.push(novoLancamento);

    // Limpa os campos do formulário para novo preenchimento
    this.descricao = '';
    this.valor = null;
    this.tipo = 'entrada';
    this.data = '';
  }
}
