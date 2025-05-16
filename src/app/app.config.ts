// Importa o tipo ApplicationConfig para configurar o app sem usar app.module.ts
import { ApplicationConfig, LOCALE_ID } from '@angular/core';

// Importa o provedor de roteamento para ativar rotas na aplicação
import { provideRouter } from '@angular/router';

// Importa a configuração de roteamento definida em app.routes.ts
import { routes } from './app.routes';

// Otimiza a detecção de mudanças no Angular (melhora desempenho)
import { provideZoneChangeDetection } from '@angular/core';

// Importa o componente standalone principal do app (ex: Cadastro de Lançamento)
import { CadastroLancamentoComponent } from './cadastro-lancamento/cadastro-lancamento.component';

// Importa o módulo de máscara para formatação de campos de entrada (ex: moeda, data, CPF, CNPJ)
import { provideNgxMask } from 'ngx-mask';

// Exporta a configuração principal da aplicação Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Habilita o roteamento com as rotas declaradas no app.routes.ts
    provideRouter(routes),

    // Define o locale padrão da aplicação como pt-BR (usado por pipes de moeda, data etc.)
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // Melhora o desempenho da renderização em eventos de UI
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ativa a máscara de moeda
    provideNgxMask(), 

    // Registra manualmente o componente standalone, já que não temos app.module.ts
    CadastroLancamentoComponent
  ]
};
