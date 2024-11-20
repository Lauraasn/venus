Highcharts.chart('chart1', {
    chart: { type: 'column' },
    title: { text: null },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
    yAxis: { title: { text: 'Vendas (R$)' } },
    series: [{
      name: '2024',
      data: [300, 450, 400, 600, 700, 750, 800]
    }]
  });

  Highcharts.chart('chart2', {
    chart: { type: 'pie' },
    title: { text: null },
    series: [{
      name: 'Produtos',
      colorByPoint: true,
      data: [
        { name: 'Eletrônicos', y: 40 },
        { name: 'Roupas', y: 30 },
        { name: 'Alimentos', y: 20 },
        { name: 'Outros', y: 10 }
      ]
    }]
  });

  Highcharts.chart('chart3', {
    chart: { type: 'line' },
    title: { text: null },
    xAxis: { categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
    yAxis: { title: { text: 'Desempenho' } },
    series: [
      { name: 'Equipe A', data: [10, 20, 15, 30, 40, 35, 50] },
      { name: 'Equipe B', data: [15, 25, 20, 35, 45, 40, 55] }
    ]
  });