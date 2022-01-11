<template>
  <div class="Sebu">
    <e-chart ref="dynamicCharts" class="echarts_style" :options="option"></e-chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line' // line 차트 사용
import 'echarts/lib/component/tooltip' // 툴팁을 표시하기 위해서 import

export default {
  name: "Sebu",
  components: {
    eChart: ECharts
  },
  comments: {
  },

  data() {
    return {
      TYPE_MANUAL_WELDING : 1,
      TYPE_SINGLE_ROBOT_WELDING : 2, //
      TYPE_ROBOT_MS_WELDING : 3, //
      welding_type : 1, // 일단 기본으로 수동 용접으로 설정
      interval_sec : 5 , // 데이터 얻어오는 주기 (단위 :초)
      deviceId : 'IGMR000' , // 파라미터로 넘어온 deviceID값 ex) this.$route.query.deviceID
      delayTime : 10,
      timePeriod : 300, // 전체 그래프가 그려지는 시간 (단위 : 초)
      option: {}
    };
  },

  created() {
    console.log("echart created!!!");

    // 용접기 이름으로 팝업의 종류를 설정 한다.
    let deviceName = "IGMR000".toLowerCase(); // for test 정식으로는 파라미터로 제대로 값을 넘겨줘야함


    if (deviceName.startsWith('igm') || deviceName.startsWith('clo')) {
      // 텐덤 용접 (master / slave)
      this.welding_type = this.TYPE_ROBOT_MS_WELDING;
      this.option = this.create_robot_welding_option();
    } else if (deviceName.startsWith('hrms') ) {
      // 싱글 로봇 용접
      this.welding_type = this.TYPE_SINGLE_ROBOT_WELDING;
      this.option = this.create_single_robot_welding_option();
    } else {
      // 수동 용접
      this.option = this.create_manual_welding_option();
    }

    // 최초 그래프 만들기 위한 호출
    this.run_graph_data();

    // 그래프 데이터 반복적으로 얻어오기 위한 호출
    this.graph_interval = setInterval(() => {
      this.run_graph_data();
    }, this.interval_sec * 1000);
  },

  methods : {
    run_graph_data() {
      // API로 그래프 데이터를 얻어와서 화면에 뿌려준다.
      // 그래프는 최근 5분의 용접 정보를 표기 할 수 있다.
      // 처음에 차트가 로딩 될때는 최근의 5초 정보만 가지고 와서 로딩 한다.
      // 그리고 매 5초가 갱신 될 때 마다 그때 마다 서버에서 최근 5초의 그래프를 가져온다.
      // 5초마다 그래프를 append 시킨다
      // 먼저 API를 콜해서 값이 나오면 그 값을 기준으로 OPTION 값들을 정리 한다.
      // OPTION 생성하는 함수에서는 x, y 값들은 추가 되지 않는다.

      // 지금 ~ -5초 까지의 데이터를 가지고 온다.
      this.chartToDate = new Date();
      this.chartFromDate = new Date (this.chartToDate - this.interval_sec * 1000);

      let hostname = this.$get_api_host()

      let graph_url = `${hostname}/hiweld/api/arc/data/devices/${this.deviceId}/childrens/from/${this.get_date_string(this.chartFromDate)}/to/${this.get_date_string(this.chartToDate)}`;

      // 그래프 API 호출 하기
      console.log('[chart] req', graph_url);
      this.call_api(graph_url, (data)=> {
        console.log('[chart] res', graph_url, data)
        console.log('[chart] data count :' + data.length);

        if (this.welding_type == this.TYPE_MANUAL_WELDING) {
          console.log('[chart] manual device ');
          // console.log('[chart] arcData length = ' + data[0].arcData.length);
          // 데이터를 읽어서 붙인다.
          let arcData = [{},{},{},{},{}];
          this.convert_manual_arc_data(arcData, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2]);

        } else if (this.welding_type == this.TYPE_SINGLE_ROBOT_WELDING) {
          console.log('[chart] single robot device ');
          console.log('[chart] arcData length = ' + data[0].arcData.length);
          // 데이터를 읽어서 붙인다.
          this.convert_robot_arc_data(data[2].wave, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2]);

        } else {
          // 2개 이상의 로봇 용접기 master/slave 구조
          console.log(`[chart] data count ${data.length} ROBOT DEVICE `);
          console.log('[chart] arcData[0] length = ' + data[0].arcData.length);
          console.log('[chart] arcData[1] length = ' + data[1].arcData.length);
          this.convert_robot_arc_data(data[0].arcData, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2]);
          // 아직 차트 데이터에 master/slave 추가 하지 않아서 아래 코드 주석 처리 -> 나중에 실데이터 오면 주석 해제 해야 함
          this.convert_robot_arc_data(data[1].arcData, this.option.xAxis[0], this.option.series[3], this.option.series[4], this.option.series[5]);
        }

      })
    },

    convert_robot_arc_data(arcData, xAxis, series_fA, series_fV, series_fF) {
      // 로봇 arc 데이터
      // arcData 는 배열 형태로 데이터가 저장 되어있음
      let date;
      let tmpDate = this.chartFromDate;

      for(let index = 0 ; index < this.interval_sec ; index++) {
        console.log('[chart] date : ' + date);
        // arcData[index].fA = 10;
        // arcData[index].fV = 200;
        // arcData[index].fF = 300;
        // console.log('[chart] fA (전류) : ' + arcData[index].fA);
        // console.log('[chart] fV (전압) : ' + arcData[index].fV);
        // console.log('[chart] fF (승급모터 전류) : ' + arcData[index].fF);

        //  원래 대로면 값을 제대로 파싱 해야함 근데 현재 더미 데이터 밖에 없기 때문에 임의로 값을 표현해주기로 함
        // arcData[index].fA = 10;
        // arcData[index].fV = 200;
        // arcData[index].fF = 300;
        date = tmpDate;
        tmpDate = new Date(tmpDate + 1000);

        series_fA.data.shift();
        series_fV.data.shift();
        series_fF.data.shift();
        xAxis.data.shift();

        series_fA.data.push(10);
        series_fV.data.push(200);
        series_fF.data.push(300);
        xAxis.data.push(date.toLocaleTimeString().replace(/^\D*/, ''));

      }
    },
    convert_manual_arc_data(arcData, xAxis, series_fA, series_fV, series_fS) {
      // arcData 는 배열 형태로 데이터가 저장 되어있음
      let date;
      let tmpDate = this.chartFromDate;

      for(let index = 0 ; index < this.interval_sec ; index++) {

        //  원래 대로면 값을 제대로 파싱 해야함 근데 현재 더미 데이터 밖에 없기 때문에 임의로 값을 표현해주기로 함
        // arcData[index].fA = 10;
        // arcData[index].fV = 200;
        // arcData[index].fS = 300;
        // arcData[index].localTime = tmpDate;
        date = tmpDate;
        tmpDate = new Date(tmpDate + 1000);


        series_fA.data.shift();
        series_fV.data.shift();
        series_fS.data.shift();
        xAxis.data.shift();

        series_fA.data.push(10);
        series_fV.data.push(200);
        series_fS.data.push(300);
        xAxis.data.push(date.toLocaleTimeString().replace(/^\D*/, ''));

      }
    },
    create_option_xAxis() {
      console.log('[chart] create_option_xAxis');
      // 옵션 데이터 초기화 할때는 현재 시간 기준으로 5초 전 값(this.interval_sec)을 가로 축으로 추가 한다.
      // 왜냐면 바로 이어서 API에서 얻어온 값을 추가 할 예정이므로
      let date = new Date();
      date = new Date(date - this.interval_sec * 1000);
      let res = [];
      let len = this.timePeriod;
      while (len--) {
        res.unshift(date.toLocaleTimeString().replace(/^\D*/, ''));
        date = new Date(date - 1000);
      }
      return res;
    },
    create_option_yAxis() {
      let res = [];
      let len = this.timePeriod;
      while (len--) {
        res.unshift('');
      }
      return res;
    },
    create_manual_welding_option() {
      console.log('[chart] create_manual_welding_option');
      let opt = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['전류(A)', '전압(V)', '피딩속도(m/min)']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            min: 0,
            data : this.create_option_xAxis()
          },
        ],
        yAxis: [
          {
            // name : 전류(A)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}'
            },
          },
          {
            // name : 전압(V)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            // name : 피딩 속도
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '전류(A)',
            type: 'line',
            lineStyle: {
              color: '#2A265C' //line차트 색상 변경
            },
            smooth: true, //부드러운 line 표현
            yAxisIndex: 0, //yAxis 1번째 사용
            data: this.create_option_yAxis(),
            markLine: {
              lineStyle: {
                color:'#0090ff'
              },
              silent: false,
              data: [{ yAxis: 1000 }, { yAxis: 50 }]
            }
          },
          {
            name: '전압(V)',
            type: 'line',
            yAxisIndex: 1, //yAxis 2번째 사용
            itemStyle: {
              color: '#ff0000' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
          {
            name: '피딩속도(m/min)',
            type: 'line',
            yAxisIndex: 1, //yAxis 2번째 사용
            itemStyle: {
              color: 'blue' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
        ]
      };
      return opt;
    },
    create_single_robot_welding_option() {
      console.log('[chart] create_single_robot_welding_option');
      let opt = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['전류(A)', '전압(V)', '승급 모터 전류']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            min: 0,
            data : this.create_option_xAxis()
          },
        ],
        yAxis: [
          {
            // name : 전류(A)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}'
            },
          },
          {
            // name : 전압(V)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            // name : 피딩 속도
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '전류(A)',
            type: 'line',
            lineStyle: {
              color: '#2A265C' //line차트 색상 변경
            },
            smooth: true, //부드러운 line 표현
            yAxisIndex: 0, //yAxis 1번째 사용
            data: this.create_option_yAxis(),
            markLine: {
              lineStyle: {
                color:'#0090ff'
              },
              silent: false,
              data: [{ yAxis: 1000 }, { yAxis: 50 }]
            }
          },
          {
            name: '전압(V)',
            type: 'line',
            yAxisIndex: 1, //yAxis 2번째 사용
            itemStyle: {
              color: '#ff0000' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
          {
            name: '승급 모터 전류',
            type: 'line',
            yAxisIndex: 0, //yAxis 1번째 사용
            itemStyle: {
              color: 'blue' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
        ]
      };
      return opt;
    },
    create_robot_welding_option() {
      console.log('[chart] create_robot_welding_option');
      let opt = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['Master 전류(A)', 'Master 전압(V)', 'Master 승급 모터 전류', 'Slave 전류(A)', 'Slave 전압(V)', 'Slave 승급 모터 전류']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            min: 0,
            data : this.create_option_xAxis()
          },
        ],
        yAxis: [
          {
            // name : Master 전류(A)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}'
            },
          },
          {
            // name : Master 전압(V)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            // name : Master 승급 모터 전류
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            // name : Slave 전류(A)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}'
            },
          },
          {
            // name : Slave 전압(V)
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            // name : Slave 승급 모터 전류
            type: 'value',
            scale: true,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: 'Master 전류(A)',
            symbol : "triangle",
            type: 'line',
            lineStyle: {
              color: '#2A265C' //line차트 색상
            },
            smooth: true, //부드러운 line 표현
            yAxisIndex: 0, //yAxis 1번째 사용
            data: this.create_option_yAxis(),
            markLine: {
              lineStyle: {
                color:'#0090ff'
              },
              silent: false,
              data: [{ yAxis: 1000 }, { yAxis: 50 }]
            }
          },
          {
            name: 'Master 전압(V)',
            symbol : "circle",
            type: 'line',
            yAxisIndex: 1, //yAxis 2번째 사용
            itemStyle: {
              color: '#ff0000' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
          {
            name: 'Master 승급 모터 전류',
            symbol : "diamond",
            type: 'line',
            yAxisIndex: 0, //yAxis 2번째 사용
            itemStyle: {
              color: 'blue' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
          {
            name: 'Slave 전류(A)',
            symbol : "emptyTriangle",
            type: 'line',
            lineStyle: {
              color: '#2A265C' //line차트 색상
            },
            smooth: true, //부드러운 line 표현
            yAxisIndex: 0, //yAxis 1번째 사용
            data: this.create_option_yAxis(),
            markLine: {
              lineStyle: {
                color:'#0090ff'
              },
              silent: false,
              data: [{ yAxis: 1000 }, { yAxis: 50 }]
            }
          },
          {
            name: 'Slave 전압(V)',
            symbol : "emptyCircle",
            type: 'line',
            yAxisIndex: 1, //yAxis 2번째 사용
            itemStyle: {
              color: '#ff0000' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          },
          {
            name: 'Slave 승급 모터 전류',
            symbol : "emptyDiamond",
            type: 'line',
            yAxisIndex: 0, //yAxis 2번째 사용
            itemStyle: {
              color: 'blue' //bar 색상 변경
            },
            data: this.create_option_yAxis()
          }
        ]
      };
      return opt;
    },
    get_date_string(date)
    {
      let year = date.getFullYear().toString();

      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month.toString() : month.toString();

      let day = date.getDate();
      day = day < 10 ? '0' + day.toString() : day.toString();

      let hour = date.getHours();
      hour = hour < 10 ? '0' + hour.toString() : hour.toString();

      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

      let seconds = date.getSeconds();
      seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

      return year + month + day + hour + minutes + seconds;
    },

    call_api(url, callback){
      fetch(url)
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          callback(data.data)
        })
    }
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>

