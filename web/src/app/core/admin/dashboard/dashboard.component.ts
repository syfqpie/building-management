import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import Chart from 'chart.js';
import { forkJoin, Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/services/units/units.service';

import * as chartConfig from '../../../configs/charts';

class Ownership {
	constructor(
		public labels: any[],
		public datas: any[]
	) {}
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	// Data
	ownership: Ownership

	// Stats
	public stats = [
		{ title: 'Total Tenants', value: 0, icon: 'fas fa-users', iconColor: '' },
		{ title: 'Total Complaints', value: 0, icon: 'fas fa-scroll', iconColor: '' },
		{ title: 'Free Parkings', value: 0, icon: 'fas fa-car-side', iconColor: '' },
		{ title: 'Pending Payment Amount', value: 0, icon: 'fas fa-file-invoice-dollar', iconColor: '' }
	]

	// Subscriber
	subscription: Subscription

	constructor(
		private unitService: UnitsService,
		private loadingBar: LoadingBarService,
		private router: Router
	) { 
		this.getData()
	}

	ngOnInit() {
		// chartConfig.parseOptions(Chart, chartConfig.chartOptions());
		// this.initChartUnits()
	}

	ngAfterViewInit() {
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	getData() {
		this.loadingBar.useRef('http').start()
		this.subscription = forkJoin([
			this.unitService.getOwnershipCount()
		]).subscribe(
			() => {
				this.loadingBar.useRef('http').complete()
			},
			() => {
				this.loadingBar.useRef('http').complete()
			},
			() => {
				this.ownership = this.unitService.statistics

				this.initChartUnits()
				this.initChartResponse()
				this.initChartComplaints()
			}
		)
	}

	calculateClass(i) {
		let extraClass = {}

		switch (i) {
			case 0:
				extraClass = {
					'pr-2': true
				}
				break;
			case 1:
				extraClass = {
					'px-2': true
				}
				break;
			case 2:
				extraClass = {
					'px-2': true
				}
				break;
			case 3:
				extraClass = {
					'pl-2': true
				}
				break;
			default:
				extraClass = {
					'px-2': true
				}
				break;
		}

		return extraClass;
	}

	navigatePage(path: string) {
		console.log('asdsd')
		return this.router.navigate([path])
	}

	initChartComplaints() {
		let config = {
			type: 'bar',
			data: {
				labels: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
				],
				datasets: [
					{
						label: new Date().getFullYear(),
						backgroundColor: '#ed64a6',
						borderColor: '#ed64a6',
						data: [30, 78, 56, 34, 100, 45, 13],
						fill: false,
						barThickness: 8,
					},
					{
						label: new Date().getFullYear() - 1,
						fill: false,
						backgroundColor: '#4c51bf',
						borderColor: '#4c51bf',
						data: [27, 68, 86, 74, 10, 4, 87],
						barThickness: 8,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: 'Orders Chart',
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				},
				legend: {
					labels: {
						fontColor: 'rgba(0,0,0,.4)',
					},
					align: 'end',
					position: 'bottom',
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
		};
		let ctx: any = document.getElementById('dashboard-chart-complaints');
		ctx = ctx.getContext('2d');
		new Chart(ctx, config);
	}

	initChartUnits() {
		var chartPie = document.getElementById('dashboard-chart-units');

		// Init chart
		var pieChart = new Chart(chartPie, {
			type: chartConfig.pie.type,
			data: {
				labels: this.ownership['labels'],
				datasets: [
					{
						data: this.ownership['datas'],
						backgroundColor: [
							chartConfig.colors.theme.default,
							chartConfig.colors.theme.secondary
						],
						label: 'Total units'
					}
				]
			},
			options: chartConfig.pie.options
		});
	}

	initChartResponse() {
		var config = {
			type: 'line',
			data: {
				labels: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				],
				datasets: [
					{
						label: new Date().getFullYear(),
						backgroundColor: '#4c51bf',
						borderColor: '#4c51bf',
						data: [6500, 7800, 6600, 4400, 5060, 6700, 7500, 7100, 8299, 7100, 6890, 6990],
						fill: false,
					},
					{
						label: new Date().getFullYear() - 1,
						fill: false,
						backgroundColor: '#fff',
						borderColor: '#fff',
						data: [4000, 6800, 8006, 7004, 5600, 6000, 8700, 7100, 7200, 8300, 8199, 7182],
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: 'Amount (RM)',
					fontColor: 'white',
				},
				legend: {
					labels: {
						fontColor: 'white',
					},
					align: 'end',
					position: 'bottom',
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				},
				scales: {
					xAxes: [
						{
							ticks: {
								fontColor: 'rgba(255,255,255,.7)',
							},
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Month',
								fontColor: 'white',
							},
							gridLines: {
								display: false,
								borderDash: [2],
								borderDashOffset: [2],
								color: 'rgba(33, 37, 41, 0.3)',
								zeroLineColor: 'rgba(0, 0, 0, 0)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							ticks: {
								fontColor: 'rgba(255,255,255,.7)',
							},
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Value',
								fontColor: 'white',
							},
							gridLines: {
								borderDash: [3],
								borderDashOffset: [3],
								drawBorder: false,
								color: 'rgba(255, 255, 255, 0.15)',
								zeroLineColor: 'rgba(33, 37, 41, 0)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
				},
			},
		};
		let ctx: any = document.getElementById('dashboard-chart-response') as HTMLCanvasElement;
		ctx = ctx.getContext('2d');
		new Chart(ctx, config);

	}
}
