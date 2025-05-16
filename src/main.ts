import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Importa e registra os dados de localização pt-BR
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

// Inicializa a aplicação com as configurações definidas em app.config.ts
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
