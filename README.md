# 后台管理系统接口

## admin_serve


```` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./vue.js"></script>
  <script src="./echarts/echarts.js"></script>
  <style>
    #echart {
      width: 1200px;
      height: 800px;
      background-color: aqua;
    }
  </style>
</head>

<body>
  <div id="app">

  </div>

  <template id="template">
    <div>
      <div id="echart"></div>
      <div>{{name}}</div>
      <select v-model="selected">
        <!-- 内联对象字面量 -->
        <option v-for='item in options' :key="item.value" :value="item.value">{{item.label}}</option>
      </select>
    </div>
  </template>
  <script>
    function throttling(fn, delayTime) {

      // 记录上一次的时间
      let lastTime = 0

      // 真正触发的事件
      return function _throttling(params) {

        // 获取当前事件触发时间
        const nowTime = new Date().getTime()

        const waitTime = delayTime - (nowTime - lastTime)
        if (waitTime <= 0) {
          fn.call(this, params)
          lastTime = nowTime
        }
      }
    }
    new Vue({
      template: '#template',
      data() {
        return {
          selected: '',
          options: [{
              id: '001',
              value: 1,
              label: '男'
            },
            {
              id: '002',
              value: 2,
              label: '女'
            }
          ],
          myChart: null,
          name: 'ljl',
          option: {
            title: {
              subtext: '数据来自 GitHub ID: lisachristina1234',
              left: 'center'
            },
            backgroundColor: "#FFFFFF",
            tooltip: {
              trigger: "item",
              // formatter: throttling((params) => {
              //   console.log(params);
              // }, 1000)
            },
            layoutIterations: 0,
            series: [{
              type: 'sankey',
              left: 50.0,
              top: 20.0,
              right: 150.0,
              bottom: 25.0,
              nodeWidth: 50,
              nodeGap: 50,
              data: [],
              links: [],
              lineStyle: {
                color: "source",
                curveness: 0.5
              },
              itemStyle: {
                color: "#1f77b4",
                borderColor: "#1f77b4"
              },
              label: {
                color: "rgba(0,0,0,0.7)",
                fontFamily: "Arial",
                fontSize: 10
              }
            }]
          },
        }
      },
      mounted() {
        this.initEchart()
      },
      methods: {
        async initEchart() {
          this.myChart = echarts.init(document.getElementById('echart'));
          // 模拟请求数据
          let result = await this.getInfo()

          // 设置series data值 过滤多余数据
          let filterData = result.reduce((tempArr, item) => {
            if (tempArr.findIndex(tempItem => tempItem.name === item.name) === -1) {
              tempArr.push(item)
            }
            return tempArr
          }, [])

          //填充series data值
          filterData.forEach(item => {
            switch (item.level) {
              case 0:
                this.option.series[0].data.push({
                  "name": item.name,
                  "depth": 0,
                  "itemStyle": {
                    "normal": {
                      "color": "#f18bbf",
                      "borderColor": "#f18bbf"
                    }
                  }
                })
                break;
              case 1:
                this.option.series[0].data.push({
                  "name": item.name,
                  "depth": item.level * 3,
                  "itemStyle": {
                    "normal": {
                      "color": "blue",
                      "borderColor": "blue"
                    }
                  }
                })
                break;
              case 2:
                this.option.series[0].data.push({
                  "name": item.name,
                  "depth": item.level * 3,
                  "itemStyle": {
                    "normal": {
                      "color": "yellow",
                      "borderColor": "yellow"
                    }
                  }
                })
                break;
              default:
                break;
            }
          })

          result.forEach(item => {
            // 有target的进link
            if (item.target !== undefined && item.target !== null && item.target !== '') {
              this.option.series[0].links.push({
                "source": item.name,
                "target": item.target,
                "value": item.uv
              })
            }
          })
          this.myChart.setOption(this.option);
          this.echartClick()
        },
        echartClick() {
          this.myChart.on('click', function (params) {
            console.log(params);
          });
          this.myChart.on('mouseover', {
            dataType: 'node'
          }, function (params) {
            this.dispatchAction({
              type: 'downplay',
            })
          })
        },
        getInfo() {

          // 后端返回的数据 必有name,如果有去向 必有target,没有target代表是最后一层
          let result = [{
              name: '公共',
              uv: 100,
              pv: 200,
              target: '首页',
              level: 0
            },
            {
              name: '公共',
              uv: 80,
              pv: 200,
              target: '详情页',
              level: 0
            }, {
              name: '公共',
              uv: 90,
              pv: 200,
              target: '购物页',
              level: 0
            }, {
              name: '公共',
              uv: 70,
              pv: 200,
              target: '结算页',
              level: 0
            },
            {
              name: '首页',
              uv: 10,
              pv: 20,
              target: '页面id1',
              level: 1
            },
            {
              name: '详情页',
              uv: 10,
              pv: 20,
              target: '页面id1',
              level: 1
            },
            {
              name: '购物页',
              uv: 10,
              pv: 20,
              target: '页面id1',
              level: 1
            },
            {
              name: '购物页',
              uv: 10,
              pv: 20,
              target: '结算页',
              level: 1
            },
            {
              name: '首页',
              uv: 12,
              pv: 22,
              target: '页面id2',
              level: 1
            },
            {
              name: '页面id1',
              uv: 8,
              pv: 10,
              level: 2
            },
            {
              name: '页面id2',
              uv: 4,
              pv: 6,
              level: 2
            },
          ]

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(result)
            }, 2000);
          })
        }
      },
    }).$mount('#app')
  </script>
</body>

</html>
