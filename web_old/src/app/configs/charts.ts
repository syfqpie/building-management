import Chart from 'chart.js';

// Cosmetics
export const colors = {
    gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#9e9fa1',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c'
    },
    theme: {
        default: '#4c51bf',
        primary: '#2c7a7b',
        secondary: '#6b46c1',
        info: '#2b6cb0',
        success: '#2f855a',
        danger: '#c53030',
        warning: '#c05621'
    },
    black: '#1a202c',
    white: '#FFFFFF',
    transparent: 'transparent'
};

var mode = 'light'; //(themeMode) ? themeMode : 'light';
var fonts = {
    base: 'Open Sans'
};

// Options
export function chartOptions() {
    // Options
    var options = {
        defaults: {
            global: {
                responsive: true,
                maintainAspectRatio: false,
                defaultColor: mode == 'dark' ? colors.gray[700] : colors.gray[600],
                defaultFontColor: mode == 'dark' ? colors.gray[700] : colors.gray[600],
                layout: {
                    padding: 0
                },
                legend: {
                    display: false,
                    align: 'end',
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 16
                    }
                },
                elements: {
                    point: {
                        radius: 0,
                        backgroundColor: colors.theme['primary']
                    },
                    line: {
                        tension: 0.4,
                        borderWidth: 4,
                        borderColor: colors.theme['primary'],
                        backgroundColor: colors.transparent,
                        borderCapStyle: 'rounded'
                    },
                    rectangle: {
                        backgroundColor: colors.theme['warning']
                    },
                    arc: {
                        backgroundColor: colors.theme['primary'],
                        borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
                        borderWidth: 4
                    }
                },
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                },
                hover: {
					mode: 'nearest',
					intersect: true,
				},
                scales: {
					xAxes: [
						{
							display: false,
							scaleLabel: {
								display: true,
								labelString: 'Month',
							},
							gridLines: {
								borderDash: [2],
								borderDashOffset: [2],
								color: 'rgba(33, 37, 41, 0.3)',
								zeroLineColor: 'rgba(33, 37, 41, 0.3)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Value',
							},
							gridLines: {
								borderDash: [2],
								drawBorder: false,
								borderDashOffset: [2],
								color: 'rgba(33, 37, 41, 0.2)',
								zeroLineColor: 'rgba(33, 37, 41, 0.15)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
				},
            },
            doughnut: {
                cutoutPercentage: 83,
                legendCallback: function (chart) {
                    var data = chart.data;
                    var content = '';

                    data.labels.forEach(function (label, index) {
                        var bgColor = data.datasets[0].backgroundColor[index];

                        content += '<span class="chart-legend-item">';
                        content +=
                            '<i class="chart-legend-indicator" style="background-color: ' +
                            bgColor +
                            '"></i>';
                        content += label;
                        content += '</span>';
                    });

                    return content;
                }
            }
        }
    };

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
        // gridLines: {
        //     borderDash: [2],
        //     borderDashOffset: [2],
        //     color: mode == 'dark' ? colors.gray[900] : colors.gray[300],
        //     drawBorder: false,
        //     drawTicks: false,
        //     lineWidth: 0,
        //     zeroLineWidth: 0,
        //     zeroLineColor: mode == 'dark' ? colors.gray[900] : colors.gray[300],
        //     zeroLineBorderDash: [2],
        //     zeroLineBorderDashOffset: [2]
        // },
        ticks: {
            beginAtZero: true,
            padding: 10,
            callback: function (value) {
                if (!(value % 10)) {
                    return value;
                }
            }
        }
    });

    // xAxes
    Chart.scaleService.updateScaleDefaults('category', {
        // gridLines: {
        //     drawBorder: false,
        //     drawOnChartArea: false,
        //     drawTicks: false
        // },
        ticks: {
            padding: 20
        },
        maxBarThickness: 10
    });

    return options;
}

export const parseOptions = (parent, options) => {
    for (var item in options) {
        if (typeof options[item] !== 'object') {
            parent[item] = options[item];
        } else {
            parseOptions(parent[item], options[item]);
        }
    }
};

// Configs
export const pie = {
    type: 'pie',
    options: {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        maintainAspectRatio: false,
        defaultColor: mode == 'dark' ? colors.gray[700] : colors.gray[600],
        defaultFontColor: mode == 'dark' ? colors.gray[700] : colors.gray[600],
        layout: {
            padding: 0
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 16
            }
        },
        elements: {
            point: {
                radius: 0,
                backgroundColor: colors.theme['primary']
            },
            line: {
                tension: 0.4,
                borderWidth: 4,
                borderColor: colors.theme['primary'],
                backgroundColor: colors.transparent,
                borderCapStyle: 'rounded'
            },
            rectangle: {
                backgroundColor: colors.theme['warning']
            },
            arc: {
                backgroundColor: colors.theme['primary'],
                borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
                borderWidth: 4
            }
        },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false
        }
    }
}

export const barStack = {
    type: 'bar',
    options: {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [
                {
                    stacked: true
                }
            ],
            yAxes: [
                {
                    stacked: true
                }
            ]
        }
    }
}

export const dotLine = {
    type: 'line',
    options: {
        scales: {
            xAxes: [
                {
                    display: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month',
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: 'rgba(33, 37, 41, 0.3)',
                        zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value',
                    },
                    gridLines: {
                        borderDash: [2],
                        drawBorder: false,
                        borderDashOffset: [2],
                        color: 'rgba(33, 37, 41, 0.2)',
                        zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        }
    }
}

export const doughnut = {
    type: 'doughnut',
    options: {
        responsive: true,
        legend: {
            position: 'top'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
}

export const line = {
    type: 'line',
    options: {
        sscales: {
            xAxes: [
                {
                    display: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month',
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: 'rgba(33, 37, 41, 0.3)',
                        zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value',
                    },
                    gridLines: {
                        borderDash: [2],
                        drawBorder: false,
                        borderDashOffset: [2],
                        color: 'rgba(33, 37, 41, 0.2)',
                        zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        }
    }
}