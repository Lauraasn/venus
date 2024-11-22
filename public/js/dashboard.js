Highcharts.chart('chart1', {
    chart: { type: 'column' },
    title: { text: null },
    xAxis: { categories: ['0-12', '13-18', '19-35', '36-50', '51-65', '66+ anos'] },
    yAxis: { title: { text: 'Qtd. de pacientes' } },
    series: [{
      name: 'Pacientes',
      data: [1, 3, 2, 4, 5, 3]
    }]
  });

  Highcharts.chart('chart2', {
    chart: { type: 'pie' },
    title: { text: null },
    series: [{
      name: 'Produtos',
      colorByPoint: true,
      data: [
        { name: 'Feminino', y: 40 },
        { name: 'Masculino', y: 30 }
      ]
    }]
  });

  Highcharts.chart('chart3', {
    chart: { type: 'line' },
    title: { text: null },
    xAxis: { categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
    yAxis: { title: { text: 'Atendimentos' } },
    series: [
      { name: 'Equipe A', data: [2, 3, 1, 3, 4, 7, 4] }
    ]
  });