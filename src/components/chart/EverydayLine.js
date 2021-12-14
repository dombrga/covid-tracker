import { Line, mixins } from 'vue-chartjs'
// import Chart from 'chart.js'
import zoom from 'chartjs-plugin-zoom'


export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  // props: ['chartData'],
  data: () => ({

    defaultF: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {display: true, text: 'Historical Chart (30 days)'},
      legend: {
        onClick: function(e, legendItem) {
          const index = legendItem.datasetIndex;
          const ci = this.chart;
          const meta = ci.getDatasetMeta(index);

          // See controller.isDatasetVisible comment
          meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

          // We hid a dataset ... rerender the chart
          ci.res
          ci.update();
          // added reset zoom
          ci.resetZoom()
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            rangeMin: {
              x: null,
              y: null
            },
            rangeMax: {
              x: null,
              y: null
            },
            speed: 20,
            threshold: 10,
          },
      
          zoom: {
            enabled: true,
            drag: false,
            mode: 'xy',
            rangeMin: {
              x: null,
              y: null
            },
            rangeMax: {
              x: null,
              y: null
            },
            speed: 0.1,
            threshold: 2,
            sensitivity: 3,
          }
        }
      }
    }
  }),
  mounted () {
    // Overwriting base render method with actual data.
    this.addPlugin(zoom)
    this.renderChart(this.chartData, this.options)
    console.log('Line', this.$data._chart)
    
  },
}