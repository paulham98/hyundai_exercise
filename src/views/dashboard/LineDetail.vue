<template>

  <div class="inner">
    <Modal v-if="modalView && modal_show_robot" @close="modalView=false" :modal_info_data="modal_info_data" ></Modal>
    <div class="left">
      <DashboardTopLine :line_nm="' / '+line_nm"></DashboardTopLine>
      <LineDetailMap @hoveredEvent="handle_change" :first_row="first_row" :first_col="first_col" :lines="lineData" :id="id"></LineDetailMap>
      <img :src="`${hostname}/hiweld/api/code/factories/F100/lines/${line_cd}/image`" alt="" class="left_img">
      <LineDetailArcLine v-if="slick_data.length > 0 && Object.keys(device_infos).length > 0" :arc_device_data="arc_device_data"
                         @showModal="showModal" @modal_info="modal_info" :device_infos="device_infos" :hovered_device_nm="hovered_device_nm"
                         :slick_data="slick_data"></LineDetailArcLine>
      <div class="type">
        <div>
          <h1>TYPE</h1>
          <p>
            <em class="yellow"></em>
            <span>수동</span>
          </p>
          <p>
            <em class="purple"></em>
            <span>로봇</span>
          </p>
        </div>
        <div>
          <h1>WORKING</h1>
          <p>
            <em class="green"></em>
            <span>용접</span>
          </p>
          <p>
            <em class="white"></em>
            <span>대기</span>
          </p>
          <p>
            <em class="gray"></em>
            <span>비가동</span>
          </p>
        </div>
        <div>
          <h1>STATUS</h1>
          <p>
            <em class="blue"></em>
            <span>정상</span>
          </p>
          <p>
            <em class="red"></em>
            <span>에러</span>
          </p>
        </div>
      </div>
    </div>
    <!-- v-if="Object.keys(data1).length > 0 && Object.keys(arc_real_time_robot_data).length > 0 && Object.keys(arc_real_time_manual_data).length > 0" -->
    <LineDetailRightTotal :data1="data1" :data2="data2" :robot_cnt_data="robot_cnt_data"
                :manual_cnt="manual_cnt" :manual_arc_cnt="manual_arc_cnt" :manual_wait_cnt="manual_wait_cnt"
                          :arc_real_time_robot_data="arc_real_time_robot_data"
                          :arc_real_time_manual_data="arc_real_time_manual_data"
    ></LineDetailRightTotal>

  </div>

</template>

<script>

import DashboardTopLine from "../../components/dashboard/DashboardTopLine";
import LineDetailMap from "../../components/dashboard/LineDetailMap";
import LineDetailRightTotal from "../../components/dashboard/LineDetailRightTotal";
import  Modal from "../../components/dashboard/Modal"
import LineDetailArcLine from "../../components/dashboard/LineDetailArcLine"
import {EventBus} from "../../event-bus";
// modal여는 로직 필요함

export default {
  components: {
      LineDetailMap, DashboardTopLine, LineDetailRightTotal, Modal, LineDetailArcLine},
  name: "LineDetail",
    props: {
      id: String,
    },
  data(){
    return {
      key_value:'STORAGE_KEY_MAIN_MAP_LINE',
      date:this.$get_date(),
      time:this.$get_time(),
      get_real_time: this.update_time(),
      modal_info_data:{},
      modal_device_nm: "",
      modalView: false,
      hovered_device_nm: "",
      slick_data:[],
      first_row:0,
      first_col:0,
      modal_selected_arc_device:{},
      line_cd: this.$route.query.line_cd,
      line_nm: this.$route.query.line_nm,
      arc_real_time_robot_data: {},
      arc_real_time_manual_data: {},
      arc_rate_data_robot:{},
      arc_rate_data_manual:[],
      used_line_cd:new Set(),
      outer_check_data:[],
      device_infos:{},
      data1: {},
      data2: {},
      robot_cnt_data:{},
      manual_cnt: 0,
      manual_arc_cnt: 0,
      manual_wait_cnt: 0,
      hostname:this.$get_api_host(),
      lineDataOrigin:{},
      lineData:this.init_line_data(),
      interval:undefined,

      //lineData2: this.get_device_status(this.arc_device_data, this. id)
    }
  },
  watch:{
    hovered_device_nm(){
      console.log("lineDetail", this.hovered_device_nm)
    }
  },
  methods: {
    click_dashboard(){
      EventBus.$emit('click_dashboard', false)
    },
    init_line_data() {
      const r = []
      for (let i = 0; i < 3; i += 1) {
        let row = []
        for (let j = 0; j < 10; j += 1) {
          // console.log(i, j)
          row.push([
            [{0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {
              0: "",
              1: 0,
              2: "",
              3: false
            }],
            [{0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {
              0: "",
              1: 0,
              2: "",
              3: false
            }],
            [{0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {
              0: "",
              1: 0,
              2: "",
              3: false
            }],
            [{0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {0: "", 1: 0, 2: "", 3: false}, {
              0: "",
              1: 0,
              2: "",
              3: false
            }]
          ])
        }
        r.push(row)
      }
      return r
    },
    modal_show_robot() {
      if (this.modal_info_data.device_type === "ROBOT") return true
      else return false
    },
    modal_show_manual() {
      if (this.modal_info_data.device_type === "ROBOT") {
        return false
      } else return true
    },
    update_time() {
      let time_demo = this.$get_time();
      let regex = /[^0-9]/g;
      this.time = time_demo.replace(regex, "");
      let date_demo = this.$get_date();
      this.date = date_demo.replace(regex, "");
      let realtime = this.date + this.time;
      console.log("get real time", this.time, this.date, realtime);
      return realtime
    },
    handle_change(hovered_nm) {
      // console.log('lineDetail', hovered_nm)
      this.hovered_device_nm = hovered_nm
    },
    showModal(modalView) {
      this.modalView = modalView
    },
    modal_info(info) {
      this.modal_info_data = info;
      console.log("[LineDetail] modal info data", info, this.modal_selected_arc_device, this.modal_info_data, this.arc_device_data)
    },
    get_arc_state(packet_state, arc_state) {
      if (packet_state > 0) {
        if (arc_state === true) {
          return 0
        } else {
          return 1
        }
      } else {
        return 2
      }
    },

    get_cnt_with_device_type(arr, device_type) {
      const used_line_cd = new Set()
      let device_type_cnt = 0;
      let arc_cnt = 0;
      let wait_cnt = 0;
      let off_cnt = 0;
      let manual_cnt = 0;
      for (let i = 0; i < arr.length; i++) {
        used_line_cd.add(arr[i]['lineCd'])
        if (arr[i]['deviceType'] === device_type) {
          device_type_cnt++
          if (arr[i]['packetState'] > 0) {
            if (arr[i]['arcState'] === true) {
              arc_cnt++
            } else {
              wait_cnt++
            }
          } else {
            off_cnt++
          }
        } else {
          manual_cnt++
        }
      }
      return {
        'device_type_cnt': device_type_cnt,
        'arc_cnt': arc_cnt,
        'wait_cnt': wait_cnt,
        'off_cnt': off_cnt,
        'manual_cnt': manual_cnt,
        'used_line_cd': used_line_cd
      }
    },
    change_position(startX, startY, row, col, position) {
      let x_position = (row - (startX.charCodeAt(0) - 64)) * 4;    /// (C - A) * 4 = 8
      let y_position = (startY - (col.charCodeAt(0) - 64)) * 4;     //  (10 - 9) * 4 = 4

      let tmp_position_x = Math.floor(position / 10);  //  33 // 10 = 3
      let tmp_position_y = position % 10;  //  33 % 10 = 3  (10으로 나눈 나머지)
      x_position = x_position + tmp_position_x - 3;  // 8 + 3 - 3  = 8
      y_position = y_position + tmp_position_y - 3;// 4 + 3 - 3  = 4
      return {'row': y_position, 'col': x_position}
    },
    get_device_location_status(data, first_row, first_col) {
      let positions = [];
      //let ch_location = [];
      console.log(first_row, first_col)
      for (const element of data) {
        if (element.column === null || element.position === null) {
          console.log("POSITION WARNING device:" + element.device + " column :", element.column, ' position :', element.position);
          continue;
        }

        if (this.line_cd === element.lineCd) {
          let row = first_row - Number(new RegExp('[0-9]{1,2}').exec(element['column'])[0])
          let col = new RegExp('[A-Z]{1}').exec(element['column'])[0].charCodeAt(0) - 65 + first_col
          // console.log(element)
          console.log("get col", col)
          const map = {3: 0, 4: 1, 1: 2, 2: 3}
          const position_row = map[Number(element['position'][0])]
          const position_column = map[Number(element['position'][1])]

          if (['11', '12', '21', '22'].indexOf(element['position']) >= 0) {
            row -= 1
            col -= 1
          } else if (['13', '14', '23', '24'].indexOf(element['position']) >= 0) {
            row -= 1
          } else if (['31', '32', '41', '42'].indexOf(element['position']) >= 0) {
            col -= 1
          }
          // 11 A~P를 넘어갈때 빼줘야함
          if (col > 9) col -= 12;
          let state = 0
          if (element['error']) {
            state = 'red'
          } else if (element['packetState'] > 0) {
            if (element['arcState']) {
              state = 'green' // 용접
            } else {
              state = 'white' // 대기
            }
          } else {
            state = 'gray' // 비가동
          }
          let is_error = element['error'];

          console.log('make line data', element.deviceType, element.lineCd, is_error)
          positions.push({
            'device': element['device'],
            'state': state,
            'origin': `${element['column']}${element['position']}`,
            'cell_row': row,
            'cell_col': col,
            'position_row': position_row,
            'position_col': position_column,
            'is_error': is_error
          })
        }
      }
      return positions
    },
    get_yellow_bg_location(line_bg_data, first_row, first_col) {
      // 7, 10인 경우
      console.log('get first row column', first_row, first_col)
      const r = []
      const theta_column = first_col >= 10 ? 4 : 0
      for (const line_bg of line_bg_data) {
        console.log(line_bg_data)
        const start_row = Number(new RegExp('[0-9]{1,2}').exec(line_bg['start_point'])[0])
        const start_col = new RegExp('[A-Z]{1}').exec(line_bg['start_point'])[0].charCodeAt(0) - 65
        const end_row = Number(new RegExp('[0-9]{1,2}').exec(line_bg['end_point'])[0])
        const end_col = new RegExp('[A-Z]{1}').exec(line_bg['end_point'])[0].charCodeAt(0) - 65
        // console.log('eekjekjkj', start_row, start_col, end_row, end_col, start_col + Math.abs(end_col - start_col))
        // console.log('column',start_col, end_col)
        for (let i = 0; i < start_row - end_row; i += 1) {
          for (let j = start_col - first_col; j < start_col - first_col + Math.abs(end_col - start_col); j += 1) {
            console.log(i, j)
            r.push([i + Math.abs(first_row - start_row), j + theta_column])
          }
        }
      }
      console.log(r)
      // line_bg_data를 참고하여 bg에 yellow가 들어갈 td를 찾는다.
      return r

    },
    call_api_and_update_data(hostname) {

      //arc_device = 기기 위치 정보 포함
      let arc_device_url = `${hostname}/hiweld/api/config/devices?all=false&factory=F100&line=${this.line_cd}`
      //let right_total_url2_1 = `${hostname}/hiweld/api/config/devices?factory=F100&deviceType=MANUAL`;
      let slick_data_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/${this.line_cd}/devices/arcrate/realtime`
      let right_total_robot_count_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/arcrate/deviceType/ROBOT?line=${this.line_cd}`;
      let right_total_manual_count_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/arcrate/deviceType/MANUAL?line=${this.line_cd}`;
      let real_time_robot_data_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/arcrate/realtime/deviceType/ROBOT?line=${this.line_cd}`;
      let real_time_manual_data_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/arcrate/realtime/deviceType/MANUAL?line=${this.line_cd}`;

      this.$call_api(right_total_robot_count_url, (data) => {
        console.log('[LineDetail] res', right_total_robot_count_url, data[0])
        this.data1 = data[0]
      })

      this.$call_api(right_total_manual_count_url, (data) => {
        console.log('[LineDetail] res', right_total_manual_count_url, data[0])
        this.data2 = data[0]
      })

      //용접기 데이터 #6
      this.$call_api(arc_device_url, (device_data) => {
        console.log('[LineDetail] api #6 res', arc_device_url, device_data)

        //오른쪽 Right Total데이터 로봇, 수동
        const cntd_data = this.get_cnt_with_device_type(device_data, "ROBOT");
        const cntd_data_manual = this.get_cnt_with_device_type(device_data, "MANUAL")
        this.manual_cnt = cntd_data_manual['device_type_cnt']
        this.manual_arc_cnt = cntd_data_manual['arc_cnt']
        this.manual_wait_cnt = cntd_data_manual['wait_cnt']

        //용접기 표시
        const locations_and_status = this.get_device_location_status(device_data, this.first_row, this.first_col);
        console.log("[LineDetail] created locations_and_status: ", locations_and_status);
        this.robot_cnt_data = cntd_data;

        // 용접기 데이터
        this.arc_device_data = device_data.filter(item => item.lineCd === this.line_cd);

        const device_infos = {};
        for (const device of device_data) {
          if (typeof device_infos[device.device] == "undefined")
            device_infos[device.device] = {
              'device_id': device.device,
              'device_nm': device.deviceName,
              'device_type': device.deviceType,
              'column': device.column,
              'position': device.position,
              'arc_state': device.arcState,
              'packet_state': device.packetState,
              'brand': device.maker,
              'error': device.error,
              'parent_id': device.deviceParent
            }
          // console.log(this.$options.name, device)
        }
        this.device_infos = device_infos;

        console.log("[LineDetail] created arcDeviceData: ", this.arc_device_data);
        for (const lo of locations_and_status) {
          console.log(this.line_data, lo)
          this.$set(this.lineData[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 1, lo['state']);
          this.$set(this.lineData[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 0, lo['device']);
          this.$set(this.lineData[lo['cell_row']][lo['cell_col']][lo['position_row']][lo['position_col']], 3, lo['is_error'])
        }
      })

      // realtime data
      this.$call_api(real_time_robot_data_url, (data) => {
        console.log('[LineDetail] res real_time data:', real_time_robot_data_url, data[0])
        this.arc_real_time_robot_data = data[0]
      })
      this.$call_api(real_time_manual_data_url, (data) => {
        console.log('[LineDetail] res real_time data:', real_time_manual_data_url, data[0])
        this.arc_real_time_manual_data = data[0]
      })

      this.$call_api(slick_data_url, data => {
        console.log('[LineDetail] res slic_data', slick_data_url, data)
        this.slick_data = data
            .filter(item => item.lineCd === this.line_cd)
            .sort((a, b) => {
              if (a.deviceCd < b.deviceCd)
                return -1
              else if (a.deviceCd > b.deviceCd)
                return 1
              else
                return 0
            })

      })
    }
  },
  created() {
    let api31URL = `${this.hostname}/hiweld/api/dashboard/storage/${this.key_value}?factory=F100`;
    this.$call_api(api31URL, data => {
      console.log("api31URL get response:",data);
      if (data === undefined) {
        console.log("data가 없습니다")
        data = {};
        data.value = {};
      }
      let data2 = {};
      for(let value in data.value) {
        if (data2[value] === undefined) {
          data2[value] = []
        }
        data.value[value].forEach(item_obj => {
          //console.log(item_obj)
          let start_point = `${item_obj['start_row']}${item_obj['start_col']}`
          let end_point = `${item_obj['end_row']}${item_obj['end_col']}`
          data2[value].push({'start_point': start_point, 'end_point': end_point})

        })
      }
      this.lineDataOrigin = data2;
      console.log('lineDataOrigin!!!!!!!!',this.lineDataOrigin)

      let deivce_nm = this.modal_info_data.device_nm
      const selected_line = this.lineDataOrigin[this.line_cd]
      console.log(selected_line)
      const row_col = this.$get_first_row_column(selected_line)
      console.log('show me the row_col!!!',row_col)
      EventBus.$on("click-arc-circle", device_id =>{
        const selected_device = this.arc_device_data
          .filter(device_info => device_info.device == device_id)

        if (selected_device.length == 0){
          console.log('[ERROR] !!!!!!!!!!!!!!!!!!!!!!!'+device_id + '가 없습니다. !!!!!!!!!!!!!!!!!!!!!!!!')
          return
        } else {
          this.modal_selected_arc_device = selected_device[0]
          // modal여는 로직 필요함
          this.modalView = true
          let device_info = this.device_infos[device_id]
          device_info.lineNm = this.$route.query.line_nm
          device_info.lineCd = this.$route.query.line_cd
          device_info.processCd = selected_device[0].processCd
          this.modal_info_data = device_info
        }

        console.log('EventBus', device_id, this.device_infos[device_id])
      })
      this.first_row = row_col[0]
      this.first_col = row_col[1]
      console.log('row_col', selected_line, row_col, this.first_row, this.first_col)

      // 노란 라인 표시
      for (const lo of this.get_yellow_bg_location(selected_line, this.first_row, this.first_col)) {
        for (const i in [0, 1, 2, 3]){
          for (const j in [0, 1, 2, 3]) {
            this.$set(this.lineData[lo[0]][lo[1]][i][j], 2, "yellow")
          }
        }
      }

      this.modal_device_nm = deivce_nm
      this.call_api_and_update_data(this.hostname)

    });

    this.call_api_and_update_data(this.hostname)


  },
  mounted() {
    this.interval = setInterval(()=>{
      this.call_api_and_update_data(this.$get_api_host())
    }, 1000 * 60)
  },
  updated() {
    // console.log('[LineDetail] updated', this.hovered_device_nm)

  },
  destroyed() {
    clearInterval(this.interval);
    console.log('[LineDetail] interval cleared')
  }
}
</script>

<style scoped>
.inner{/* width: 3881px; */}



.left_img{display: inline-block;border: 2px solid #e5e5e5;border-radius: 10px;width: 360px; height: 145px; object-fit: contain;}
.left .bot_slide2{display: inline-block;width: calc(100% - 382px);margin-left: 15px;vertical-align: top;margin-top: 5px;}
.type *{font-size: 16px;color: #fff;}
.type{background: #002f63;border-radius: 5px;padding: 13px 30px;margin-top: 13px;}
.type>div{display: inline-block;width: calc((100% / 3) - 2px);text-align:center}
.type>div:first-child{text-align:left;}
.type>div:last-child{text-align:right;}
.type>div h1{display:inline-block;margin-right: 15px;vertical-align: middle;}
.type>div p{display:inline-block;margin-right: 20px;}
.type>div p span{display: inline-block;vertical-align: middle;}
.type>div p em{display: inline-block;width: 15px;height: 15px;border-radius: 500px;vertical-align:middle;margin-right: 5px;}
.type>div p em.yellow{background: #ffc200;}
.type>div p em.green{background: #2ed400;}
.type>div p em.purple{background: #a400e9;}
.type>div p em.white{background: #fff;}
.type>div p em.blue{background: #0090ff;}
.type>div p em.gray{background: #939393;}
.type>div p em.red{background: #ff2b2b;}
.left button{display: inline-block}




</style>
