import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CadastroLancamentoComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financas-pessoais-rapidas';
}
