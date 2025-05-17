// Importa recursos do Angular
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
// Importa o ECharts
import * as echarts from 'echarts';

@Component({
  selector: 'app-grafico-pizza',
  standalone: true,
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css']
})
export class GraficoPizzaComponent implements OnChanges {
  // Permite que o componente receba os valores reais do resumo financeiro
  @Input() entradas: number = 0;
  @Input() saidas: number = 0;

  // Pega a div onde o gráfico será desenhado
  @ViewChild('graficoContainer', { static: true }) chartContainer!: ElementRef;

  // Detecta mudanças nos inputs (entradas e saídas)
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartContainer) {
      const myChart = echarts.init(this.chartContainer.nativeElement);
      const option = {
        title: {
        text: 'Gráfico Financeiro',
        left: 'center'
        },
      // Configurações do gráfico
        tooltip: {
        trigger: 'item'
      },
        legend: {
        bottom: 10,
        left: 'center',
        data: ['Saídas', 'Entradas']
      },  
        series: [
      {
      name: 'Lançamentos',
      type: 'pie',
      radius: '60%', // pizza circular tradicional
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        shadowBlur: 15,
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: R$ {c} ({d}%)'
      },
      labelLine: {
        show: true
      },
      data: [
        { value: this.entradas, name: 'Entradas' },
        { value: this.saidas, name: 'Saídas', itemStyle: { color: '#F44336' } }
      ]
    }
  ]
};
      // Aplica o tema ao gráfico
      myChart.setOption(option);
      // Redesenha o gráfico quando a janela é redimensionada
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }
}
