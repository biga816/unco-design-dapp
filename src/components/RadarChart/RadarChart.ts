import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Radar } from 'vue-chartjs'

@Component({
  extends: Radar
})
export default class RadarChart extends Vue<Radar> {
  @Prop()
  public chartData!: number[]

  /**
   * Creates an instance of RadarChart.
   * @memberof RadarChart
   */
  constructor() {
    super()
  }

  /**
   *
   *
   * @memberof RadarChart
   */
  public mounted() {
    this.renderRadarChart(this.chartData)
  }

  /**
   *
   *
   * @param {string} newChartData
   * @param {string} oldChartData
   * @memberof RadarChart
   */
  @Watch('chartData')
  public onValueChange(newChartData: number[], oldChartData: number[]): void {
    // this._chart.destroy();
    if (JSON.stringify(newChartData) !== JSON.stringify(oldChartData)) {
      this.renderRadarChart(newChartData)
    }
  }

  /**
   *
   *
   * @private
   * @param {*} chartData
   * @memberof RadarChart
   */
  private renderRadarChart(chartData: number[]): void {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['Sharpness', 'Volume', 'Smell'],
        datasets: [
          {
            backgroundColor: 'rgba(0,140,255,.8)',
            pointBorderColor: '#1ec8ff',
            data: chartData
          }
        ]
      },
      {
        legend: {
          display: false
        },
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: '#1ec8ff',
            fontStyle: 'bold'
          },
          gridLines: {
            color: '#6b4426'
          },
          ticks: {
            fontColor: '#1ec8ff',
            backdropColor: 'transparent',
            stepSize: 1,
            beginAtZero: true,
            min: 0,
            max: 4
          }
        }
      }
    )
  }
}
