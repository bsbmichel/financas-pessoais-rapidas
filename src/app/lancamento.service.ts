// Importa o decorator Injectable para dizer que essa classe é um serviço
import { Injectable } from '@angular/core';

// Decorador que registra esse serviço para ser usado na aplicação inteira
@Injectable({
  providedIn: 'root' // Isso faz o Angular "injetar" automaticamente onde for necessário
})
export class LancamentoService {
  // Nome da chave usada para salvar no LocalStorage
  private readonly chave = 'lancamentos';

  // Função para salvar os dados no navegador
  salvar(lancamentos: any[]): void {
    // Converte o array de lançamentos para texto e salva com a chave "lancamentos"
    localStorage.setItem(this.chave, JSON.stringify(lancamentos));
  }

  // Função para buscar os dados salvos
  carregar(): any[] {
    // Busca os dados no localStorage usando a chave definida
    const dados = localStorage.getItem(this.chave);

    // Se encontrar dados, converte de volta para array e retorna
    // Se não encontrar, retorna um array vazio
    return dados ? JSON.parse(dados) : [];
  }

  // Função para apagar os dados salvos no navegador
  limpar(): void {
    localStorage.removeItem(this.chave);
  }
}
