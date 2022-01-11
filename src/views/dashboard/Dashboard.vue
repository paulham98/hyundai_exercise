<style>
@import '/css/reset.css';
@import '/css/slick.css';
@import '/css/common.css';
@import '/css/layout.css';
</style>
<template>
<!--    <RobotStatusBtn></RobotStatusBtn>-->
  <div>
  <intro v-if="show_intro[0].bool === true" ></intro>
  <div v-if="show_intro[0].bool === false" class="inner">
    <div class="left">
      <DashboardTopLine></DashboardTopLine>
      <router-link class="machine" tag="button" :to="{name:'whole_robot_status'}"><img src="/images/machine.png" alt="">전체로봇<br>가동현황</router-link>
      <LineMap @hoveredEvent="change" :lines="data">
      </LineMap>
      <Top @modeChangeEvent="change" v-model="mode"></Top>
      <ArcRateRobot v-if="mode=='ROBOT' && arc_rate_data_robot !== undefined" :arc_rate_data="arc_rate_data_robot" :used_line_cd="used_line_cd"
                    v-model="hovered_obj_nm"></ArcRateRobot>
      <ArcRateManual v-if="mode=='MANUAL' && arc_rate_data_manual !== undefined" :arc_rate_data="arc_rate_data_manual"
                    v-model="hovered_obj_nm"></ArcRateManual>
    </div>
    <!-- v-if="Object.keys(data1).length > 0" -->
    <RightTotal  :data1="data1" :data2="data2" :robot_cnt_data="robot_cnt_data" :outer_check_data="outer_check_data"
                :manual_cnt="manual_cnt" :manual_arc_cnt="manual_arc_cnt" :manual_wait_cnt="manual_wait_cnt">
    </RightTotal>
  </div>
  </div>
</template>

<script>
    import LineMap from "../../components/dashboard/DashboardLineMap";
    import $ from 'jquery';
    import ArcRateRobot from "../../components/dashboard/ArcRateRobot";
    import ArcRateManual from "../../components/dashboard/ArcRateManual";
    import Top from "../../components/dashboard/Top";
    import RightTotal from "../../components/dashboard/DashboardRightTotal";
    import DashboardTopLine from "../../components/dashboard/DashboardTopLine";
    import Intro from '../../views/dashboard/Intro'
    import {EventBus} from "../../event-bus";

    export default {
      components:{
        DashboardTopLine,
        RightTotal,
        Top,
        ArcRateManual,
        ArcRateRobot,
        LineMap,
        Intro

      },
      watch:{
        rendering_data: function (rendering_data) {
            console.log('watch~!!!!!!!!!!!!',rendering_data)
        }
      },
      comments:[$],
      data() {
        return {
          show_intro: [{bool: true}],
          last_index: 5,
          mode:"ROBOT",
          hovered_obj_nm:"boom",
          arc_rate_data_robot:{},
          arc_rate_data_manual:[],
          used_line_cd:new Set(),
          outer_check_data:[],

          data1: {},
          data2: {},
          robot_cnt_data:{},

          manual_cnt: 0,
          manual_arc_cnt: 0,
          manual_wait_cnt: 0,
          data: [
            [
              {'line_cd':'F1L100', 'type':'selected', 'row_no': 1, 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'G', 'name':'BOOM', 'is_zig':false, 'row_cnt':1},
            ],
            [
              {'line_cd':'F1L100', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'D', 'end_row': 9, 'end_col': 'J', 'name':'BOOM', 'is_zig':true, 'row_cnt':1},
            ],
            [
              {'line_cd':'F1L300', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'K', 'name':'대형하부센터', 'is_zig':false, 'row_cnt':1},
            ],
            [
              {'line_cd':'F1L500', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'K', 'name':'대형상부센터', 'is_zig':false, 'row_cnt':1},
              {'line_cd':'F1L600', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'K', 'end_row': 9, 'end_col': 'P', 'name':'대형상부ASSY', 'is_zig':false, 'row_cnt':1},
            ],
            [
              {'line_cd':'F1L200', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'D', 'name':'ARM', 'is_zig':false, 'row_cnt':1},
              {'line_cd':'F1L400', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'k', 'end_row': 9, 'end_col': 'P', 'name':'대형하부ASSY', 'is_zig':false, 'row_cnt':2},
            ],
            [
              {'line_cd':'F1L700', 'type':'blank', 'row_no': 2, 'start_row': 10, 'start_col': 'k', 'end_row': 9, 'end_col': 'P', 'name':'대형하부ASSY', 'is_zig':true, 'row_cnt':1},
            ],
            [
              {'line_cd':'F1L200', 'type':'selected', 'row_no': 2, 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'K', 'name':'ARM', 'is_zig':false, 'row_cnt':1},
            ],
            // [
            //   {'line_cd':'F1L100', 'type':'blank'}
            // ],
          ],
          interval:undefined,

          rendering_data: [],
          key_value:'STORAGE_KEY_MAIN_MAP_LINE',
          hostname:this.$get_api_host(),
          storage_data : {},
        }
      },

          methods:{
        show_hide_intro(){
          if(this.show_intro === true){
            this.show_intro = false
          }else{
            this.show_intro = true
          }
        },
        change(hoverd_obj_nm){
          // console.log('[Dashboard change]', hovered_obj_nm)
          this.hovered_obj_nm = hoverd_obj_nm
        },
        n_lines_concat_to_one(arc_rate_data){
          const r = {};
          for(let i = 0; i < arc_rate_data.length; i++){
            const lineNm = arc_rate_data[i]['lineNm'];
            const lineCd = arc_rate_data[i]['lineCd'];
            if (r[lineNm] === undefined){
              r[lineNm] = {'lineNm' : lineNm, 'lineCd':lineCd, 'main':{}, 'sub':{}}
            }
            if (arc_rate_data[i]['tag'] === 'STAGE_MAIN'){
              r[lineNm]['main'] = arc_rate_data[i]
            } else {
              r[lineNm]['sub'] = arc_rate_data[i]
            }
            if (r[lineNm]['main'] !== undefined &&
                r[lineNm]['sub'] !== undefined) {
              // console.log(r[lineNm]);
            }
          }
          return r
        },
        get_cnt_with_device_type(arr, device_type){
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
              }else {
                off_cnt++
              }
            } else {
              manual_cnt++
            }
          }
          return {'device_type_cnt':device_type_cnt, 'arc_cnt':arc_cnt, 'wait_cnt':wait_cnt, 'off_cnt':off_cnt, 'manual_cnt':manual_cnt,
                  'used_line_cd':used_line_cd}
        },
        call_api_and_update_data(hostname){
          console.log('[Dashboard] CALL_API_AND_UPDATE_DATA')
          let url_arc_rate_static_robot =`${hostname}/hiweld/api/statistic/arc/factories/F100/lines/stages/arcrate/deviceType/ROBOT`
          let url_arc_rate_static_manual = `${hostname}/hiweld/api/statistic/arc/factories/F100/lines/arcrate/deviceType/MANUAL`
          let right_total_robot_hour_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/arcrate/deviceType/ROBOT`;
          let right_total_robot_cnt_url = `${hostname}/hiweld/api/config/devices?factory=F100&deviceType=ROBOT`;
          let right_total_manual_hour_url = `${hostname}/hiweld/api/statistic/arc/factories/F100/arcrate/deviceType/MANUAL`;
          let right_total_manual_cnt_url = `${hostname}/hiweld/api/config/devices?factory=F100&deviceType=MANUAL`;
          let entire_lines_url = `${this.hostname}/hiweld/api/code/factories/F100/lines`

          this.$call_api(entire_lines_url, data =>{
            if (data === undefined) {
              return;
            }
            this.entire_lines  = data;
            this.line_name_data = [];
            this.line_name_dict = {};
            for (let i = 0 ; i < data.length ; i++) {
              this.line_name_data[i] = {line_cd : data[i].code, name : data[i].name};
              this.line_name_dict[data[i].code] = data[i].name;
            }

            let api31URL = `${this.hostname}/hiweld/api/dashboard/storage/${this.key_value}?factory=F100`;
            this.$call_api(api31URL, data =>{
              if(data === undefined){
                data = {};
                data.value = {};
              }



              this.storage_data = data.value
              this.rendering_data = this.make_rendering_data(this.storage_data, this.line_name_dict)
              console.log('rendering data!!!!!!!!!!!!', this.rendering_data)
            })

          })
          // 와관 검사 날짜를 전일로 수정
          let now =  new Date();
          const d = new Date(now.setDate(now.getDate() - 1));
          let date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('');
          let outer_check_url = `${hostname}/hiweld/api/inspection/statistic/factories/F100/lines/daily/`+date;

          // 아래 로봇 용접 아크율 현황
          console.log('[Dashboard] req', url_arc_rate_static_robot)
          this.$call_api(url_arc_rate_static_robot, (data)=>{
            console.log('[Dashboard] res', url_arc_rate_static_robot, data)
            this.arc_rate_data_robot = this.n_lines_concat_to_one(data)
          })

          // 아래 메뉴얼 용접 아크율 현황
          console.log('[Dashboard] req', url_arc_rate_static_manual)
          this.$call_api(url_arc_rate_static_manual, (data)=>{
            console.log('[Dashboard] res', url_arc_rate_static_manual, data)
            this.arc_rate_data_manual = data
          })

          // 오른쪽 Total
          console.log('[Dashboard] req', right_total_robot_hour_url)
          this.$call_api(right_total_robot_hour_url, (data)=>{
            console.log('[Dashboard] res', right_total_robot_hour_url, data)
            this.data1 = data
          })

          console.log('[Dashboard] req', right_total_manual_hour_url)
          this.$call_api(right_total_manual_hour_url, (data)=>{
            console.log('[Dashboard] res', right_total_manual_hour_url, data)
            this.data2 = data
          })

          console.log('[Dashboard] req', right_total_robot_cnt_url)
          this.$call_api(right_total_robot_cnt_url, (data)=>{
            console.log('[Dashboard] res', right_total_robot_cnt_url, data)
            // this.history.push({'text':data[0]['text'], 'index':data[0]['index']})
            const cntd_data = this.get_cnt_with_device_type(data, "ROBOT")
            this.used_line_cd = cntd_data['used_line_cd']
            this.robot_cnt_data = cntd_data
            console.log('3[Dashboard created]', cntd_data);
          })

          console.log('[Dashboard] req', right_total_manual_cnt_url)
          this.$call_api(right_total_manual_cnt_url, (data)=>{
            console.log('[Dashboard] res', right_total_manual_cnt_url, data)
            const cntd_data = this.get_cnt_with_device_type(data, "MANUAL")
            // this.history.push({'text':data[0]['text'], 'index':data[0]['index']})
            this.manual_cnt = cntd_data['device_type_cnt']
            this.manual_arc_cnt = cntd_data['arc_cnt']
            this.manual_wait_cnt = cntd_data['wait_cnt']
          })

          console.log('[Dashboard] req', outer_check_url)
          this.$call_api(outer_check_url, (data) => {
            console.log('[Dashboard] outer_check_url res', outer_check_url, data)
            this.outer_check_data = data
          })

        },
        make_rendering_data(storage_data, line_name_dict) {
          // storage data에 저장 되어있는 데이터를 렌더링 형식에 맞게 변환 한다.
          // storage data는 key는 line code , value에는 array로 dictionary 를 넣는다.
          // ['F1L100'] = [{start_row:10, start_col:'A', end_row:9, end_col:'G'},{start_row:9, start_col:'D', end_row:8, end_col: 'J'}];
          // ['F1L300'] = [{start_row:8,  start_col:'A', end_row:7, end_col:'K'}];
          // ['F1L500'] = [{start_row:7, start_col:'A', end_row:6, end_col:'K'}];
          // ['F1L600'] = [{start_row:7, start_col:'K', end_row:6, end_col:'P'}];
          // ['F1L200'] = [{start_row:6, start_col:'A', end_row:5, end_col:'D'}, {start_row:4, start_col:'A', end_row:3, end_col:'K'}];
          // ['F1L400'] = [{start_row:6, start_col:'K', end_row:4, end_col:'P'}];
          //  {'line_cd':'F1L100', 'type':'selected', 'start_row': 10, 'start_col': 'A', 'end_row': 9, 'end_col': 'G', 'name':'BOOM', 'is_zig':false, },
          console.log("storage_data",storage_data);
          let ret = [[],[],[],[],[],[],[]];
          let index = 0;
          let storage_data_items ;
          let data;
          for (let i = 10 ; i > 3 ; i--) {
            for (let key in storage_data) {

              storage_data_items = storage_data[key];
              for(let j = 0 ; j < storage_data_items.length ; j++ ) {
                if (storage_data_items[j].start_row === i) {
                  data = this.make_render_object(storage_data_items[j], index, i, key, line_name_dict, storage_data);
                  ret[index].push(data);
                } else if (storage_data_items[j].start_row > i && i > storage_data_items[j].end_row) {
                  data = this.make_render_object(storage_data_items[j], index, i, key, line_name_dict, storage_data);
                  ret[index].push(data);
                }
              }
            }

            // start_col 값을 기준으로 정렬 한다.
            ret[index].sort((a, b) => {
              if ( a.start_col.charCodeAt(0) < b.start_col.charCodeAt(0))
                return -1
              else if ( a.start_col.charCodeAt(0) > b.start_col.charCodeAt(0))
                return 1
              else
                return 0
            })
            index++;
          }
          console.log("!!!!!!!!!!!!!!!!!!return data:", ret);
          return ret;
        },
        make_render_object(row, index, i, key, line_name_dict, storage_data) {
          console.log(`index: ${index}, key:${key}`);
          console.log("row:",row);
          // row가 있을 경우 즉 start_row 값이 있을 경우 해당 값을 계산 하여 저장한다.
          let data = {line_cd: key, type:'selected', is_zig:false, start_row:i, end_row :(i-1), start_col:row.start_col, end_col:row.end_col, name:line_name_dict[key]};

          // type == h2 인지 여부 확인
          if (i > 4) {
            if(row.start_row === i) {
              data.row_count = row.start_row - row.end_row;
            }
          }

          // is_zig, type == blank 인지 여부 확인
          if (i < 10) {
            //  첫 줄 빼고는 모두다 is_zig 와 selected 여부를 고민 해야 함
            // is_zig는 두가지 상황이 있음
            // 1. row 의 start와 end의 차이가 2이상 이면서 현재의 위치가 두번째 이후일 경우
            // 2. 현재의 위치가 맨 처음이지만 내 위의 row랑 겹칠 경우
            if(row.start_row === i) {
              // 현재의 위치가 맨 처음일 경우, 내 위에 라인이 있는지 찾는다. 있으면 겹치는지 여부 확인 한다.
              for(let k = 0 ; k < storage_data[key].length; k++) {
                if (storage_data[key][k].end_row === i) {
                  // 나랑 같은 line code 중에 end_row가 내 현재 row랑 같은 값이 있을 경우 col 값을 비교해서 겹치는지를 판단 한다.
                  let upper_row = storage_data[key][k];
                  if(row.start_col.charCodeAt(0) >= upper_row.start_col.charCodeAt(0) && upper_row.end_col.charCodeAt(0) > row.start_col.charCodeAt(0)) {
                    // 이러면 겹치는 상황임
                    data.is_zig = true;
                  } else if (upper_row.start_col.charCodeAt(0) >= row.start_col.charCodeAt(0) && row.end_col.charCodeAt(0) > upper_row.start_col.charCodeAt(0)) {
                    // 이러면 겹치는 상황임
                    data.is_zig = true;
                  }
                }
              }
            } else {
              // 현재의 위치가 맨 처음이 아닐 경우
              data.is_zig = true;
              data.type = 'blank';
            }
          }
          return data;
        },
      },
      created(){
        let entire_lines_url = `${this.hostname}/hiweld/api/code/factories/F100/lines`
        this.$call_api(entire_lines_url, data =>{
          if (data === undefined) {
            return;
          }
          this.entire_lines  = data;
          this.line_name_data = [];
          this.line_name_dict = {};
          for (let i = 0 ; i < data.length ; i++) {
            this.line_name_data[i] = {line_cd : data[i].code, name : data[i].name};
            this.line_name_dict[data[i].code] = data[i].name;
          }

          let api31URL = `${this.hostname}/hiweld/api/dashboard/storage/${this.key_value}?factory=F100`;
          this.$call_api(api31URL, data =>{
            if(data === undefined){
              data = {};
              data.value = {};
            }

            //data 초기화 dummy data
            // data = {};
            // data.value = {};
            // data.value['F1L100'] = [{start_row:10, start_col:'A', end_row:9, end_col:'G'},{start_row:9, start_col:'D', end_row:8, end_col: 'J'}];
            // data.value['F1L300'] = [{start_row:8,  start_col:'A', end_row:7, end_col:'K'}];
            // data.value['F1L500'] = [{start_row:7, start_col:'A', end_row:6, end_col:'K'}];
            // data.value['F1L600'] = [{start_row:7, start_col:'K', end_row:6, end_col:'P'}];
            // data.value['F1L200'] = [{start_row:6, start_col:'A', end_row:5, end_col:'D'}, {start_row:4, start_col:'A', end_row:3, end_col:'K'}];
            // data.value['F1L400'] = [{start_row:6, start_col:'K', end_row:4, end_col:'P'}];
            //

            this.storage_data = data.value
            this.rendering_data = this.make_rendering_data(this.storage_data, this.line_name_dict)
            console.log('rendering data!!!!!!!!!!!!', this.rendering_data)
          })

        })


        EventBus.$on('click_korea', dt =>{
          this.show_intro[0].bool = dt
        });
        EventBus.$on('click_dashboard', dt =>{
          //console.log(this.show_intro.bool)
          //this.show_intro = dt
          this.$nextTick( function () {
            this.$set(this.show_intro[0], 'bool', dt)
          })
          console.log('show intro',this.show_intro[0].bool)

        });
        console.log('[Dashboard created] ')
        let hostname = this.$get_api_host()
        this.call_api_and_update_data(hostname)

      },
      beforeMount(){
        console.log('[Dashboard beforeMount]')
      },
      mounted() {
        console.log('[Dashboard mounted]', this.arc_rate_data)
        this.interval = setInterval(()=>{
          this.call_api_and_update_data(this.$get_api_host())
        }, 1000 * 60)

      },
      updated() {
        console.log('[Dashboard updated]', this.hovered_obj_nm)
      },
      destroyed() {
        clearInterval(this.interval);
        console.log('[Dashboard] interval cleared')
      }
    }
</script>

<style>
.inner{/* width: 3880px; */}
.left{display: inline-block;width: calc(100% - 455px);}
.left .machine{background: #5e5e5e;color: #fff;border-radius: 5px;padding: 15px 13px;}
.left .machine:hover{background:#fabe00;}
.left .machine img{display: block !important;margin: 0 auto;}
.left .graph_wrap{display:inline-block;width: calc(100% - 134px);vertical-align: top;margin-bottom: 50px;}

</style>
