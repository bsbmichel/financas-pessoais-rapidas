import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa os módulos de gráfico (Angular wrapper + Chart.js)
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-resumo',
  standalone: true,
  imports: [CommonModule, NgChartsModule], // Habilita o gráfico e funcionalidades do Angular
  templateUrl: './grafico-resumo.component.html',
  styleUrls: ['./grafico-resumo.component.css']
})
export class GraficoResumoComponent {
  // Recebe os valores do componente pai (cadastro-lancamento)
  @Input() entradas: number = 0;
  @Input() saidas: number = 0;

  // Define o tipo de gráfico (pizza)
  public tipoGrafico: ChartType = 'pie';

  // Define os rótulos das fatias
  public labels: string[] = ['Entradas', 'Saídas'];

  // Dados do gráfico (alimentados pelo método abaixo)
  public dados: ChartConfiguration<'pie'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        data: [0, 0], // Placeholder, será atualizado no ngOnChanges()
        backgroundColor: ['#4caf50', '#f44336'] // Verde e vermelho
      }
    ]
  };

  // Sempre que as entradas/saídas mudarem, atualiza o gráfico
  ngOnChanges() {
    this.dados.datasets[0].data = [this.entradas, this.saidas];
  }
}
