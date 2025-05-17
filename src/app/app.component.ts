// Importa os recursos do Angular
import { Component } from '@angular/core';

// Importa os componentes standalone usados neste template
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';
import { GraficoPizzaComponent } from './grafico-pizza.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CadastroLancamentoComponent, GraficoPizzaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financas-pessoais-rapidas';
cadastroRef: any;
}
