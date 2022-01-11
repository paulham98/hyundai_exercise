<template>
    <div class="Modal">
        <div class="modal">
          <div class="top">
                <p>{{modal_info_data.lineNm}}</p>
                <button type="button" class="close" data-dismiss="modal" @click="click_close()"></button>

          </div>
            <div class="left">
                <div class="tb_line">
                    <p v-if="modal_info_data.device_type === 'ROBOT'">{{modal_info_data.device_nm}}</p>
                    <p v-if="modal_info_data.device_type === 'MANUAL'">{{modal_info_data.device_id}}</p>
                    <ul>
                        <li>{{modal_info_data.brand}}</li>
                        <li>{{modal_info_data.column}}</li>
                    </ul>
                </div>
                <img :src="imageURL" alt="">
                <div class="table_area">
                    <div class="color_round">
                        <span :class="modal_info_data.device_type === 'ROBOT' ? 'purple' : 'yellow'">{{get_device_type()}}</span>
                        <span :class="get_arc_packet_color()">{{get_arc_packet_state()}}</span>
                        <span :class="modal_info_data.error !== true ? 'sky' : 'red'">{{ get_err_state() }}</span>
                    </div>
                    <table v-if="get_welding_type() === this.TYPE_ROBOT_MS_WELDING">
                        <colgroup>
                            <col width="40%">
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <thead >
                        <tr>
                            <th>
                                <ul>
                                    <li @click="click_master_btn()"  class="active">Mater</li>
                                    <li @click="click_slave_btn()">Slave</li>
                                </ul>
                            </th>
                            <th>실시간</th>
                            <th colspan="2">기준 Min / Max</th>
                        </tr>
                        </thead>
                        <tbody v-if="click_master">
                        <tr>
                            <td>전류(A)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_a_value[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(amin[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(amax[0], 1)}}</td>
                        </tr>
                        <tr>
                            <td>전압(V)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_v_value[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(vmin[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(vmax[0], 1)}}</td>
                        </tr>
                        <tr>
                            <td>송급모터 전류(A)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_f_value[0], 1)}}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        </tbody>
                      <tbody v-if="!click_master">
                      <tr>
                        <td>전류(A)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_a_value[1], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(amin[1], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(amax[1], 1)}}</td>
                      </tr>
                      <tr>
                        <td>전압(V)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_v_value[1], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(vmin[1], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(vmax[1], 1)}}</td>
                      </tr>
                      <tr>
                        <td>송급모터 전류(A)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_f_value[1], 1)}}</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      </tbody>
                    </table>

                    <table v-if="get_welding_type() !== this.TYPE_ROBOT_MS_WELDING">
                        <thead>
                        <tr>
                            <th>구분</th>
                            <th>실시간</th>
                            <th colspan="2">기준 Min / Max</th>
                        </tr>
                        </thead>
                        <tbody v-if="get_welding_type() === this.TYPE_MANUAL_WELDING">
                        <tr>
                            <td>전류(A)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_a_value[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(amin[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(amax[0], 1)}}</td>
                        </tr>
                        <tr>
                            <td>전압(V)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_v_value[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(vmin[0], 1)}}</td>
                            <td>{{$check_undefined_and_to_fixed(vmax[0], 1)}}</td>
                        </tr>
                        <tr>
                            <td>피딩속도(m/min)</td>
                            <td>{{$check_undefined_and_to_fixed(realtime_f_value[0], 1)}}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        </tbody>
                      <tbody v-if="get_welding_type() === this.TYPE_SINGLE_ROBOT_WELDING">
                      <tr>
                        <td>전류(A)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_a_value[0], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(amin[0], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(amax[0], 1)}}</td>
                      </tr>
                      <tr>
                        <td>전압(V)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_v_value[0], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(vmin[0], 1)}}</td>
                        <td>{{$check_undefined_and_to_fixed(vmax[0], 1)}}</td>
                      </tr>
                      <tr>
                        <td>송급모터 전류(A)</td>
                        <td>{{$check_undefined_and_to_fixed(realtime_f_value[0], 1)}}</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      </tbody>
                    </table>
                </div>
            </div>
            <div class="right" id="footer" >
              <!--
                <div class="gp_top">
                    <p v-if="get_arc_robot_division() && get_arc_master()">마스터</p>
                    <span class="red"><em></em>전류</span>
                    <span class="blue"><em></em>전압</span>
                    <span class="green"><em></em>소급모터 전류</span>
                    <p v-if="get_arc_robot_division() && get_arc_master()">슬레이브</p>
                    <span class="orange" v-if="get_arc_robot_division() && get_arc_master()"><em></em>전류</span>
                    <span class="purple" v-if="get_arc_robot_division() && get_arc_master()"><em></em>전압</span>
                    <span class="dgreen" v-if="get_arc_robot_division() && get_arc_master()"><em></em>송급모터 전류</span>
                </div>
                -->
              <e-chart class="echarts_style" :options="option"></e-chart>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from "jquery"
    import EChart from "vue-echarts"
    import 'echarts/lib/chart/line' // line 차트 사용
    import 'echarts/lib/component/tooltip' // 툴팁을 표시하기 위해서 import
    import 'echarts/lib/component/legend' // legend 표시하기 위해서
    import 'echarts/lib/component/markLine' // markLine 표기 하기 위해서
    export default {
        name: "Modal",
        components:{'e-chart': EChart},
        props:{
            modal_info_data: Object,
        },
        data(){
            return{
                init_data : false,
                imageURL : "",
                click_master: undefined,
                TYPE_MANUAL_WELDING : 1,
                TYPE_SINGLE_ROBOT_WELDING : 2, //
                TYPE_ROBOT_MS_WELDING : 3, //
                welding_type : 1, // 일단 기본으로 수동 용접으로 설정
                interval_sec : 5 , // 데이터 얻어오는 주기 (단위 :초)
                delayTime : 10,
                timePeriod : 60, // 전체 그래프가 그려지는 시간 (단위 : 초)
                option: {},
                realtime_a_value : ['',''],
                realtime_v_value : ['',''],
                realtime_f_value : ['',''],
                amin : ['',''],
                amax : ['',''],
                vmin : ['',''],
                vmax : ['',''],
                lastGraphData : [0,0,0,0,0,0]
            }
        },
        created(){
          // 라인 이미지 기본으로 띄우기
          this.hostname = this.$get_api_host();
          this.imageURL = `${this.hostname}/hiweld/api/code/factories/F100/lines/${this.modal_info_data.lineCd}/image`;

          $(function(){
                $(".modal .left .table_area table th ul li").click(function(){
                    $(".modal .left .table_area table th ul li").removeClass("active");
                    $(this).addClass("active");
                });
            });
            // console.log("asdfasdf222222", this.modal_info_data, this.modal_info_data.device_id[0])
            // console.log("echart created!!!");

            // 용접기 이름으로 팝업의 종류를 설정 한다.
            let deviceID = this.modal_info_data.device_id.toUpperCase();
            console.log("[MODAL] devicenam:" + deviceID);
            if (deviceID.startsWith('IGM') || deviceID.startsWith('CLO')) {
                // 텐덤 용접 (master / slave)
                this.welding_type = this.TYPE_ROBOT_MS_WELDING;
                this.option = this.create_robot_welding_option();
            } else if (deviceID.startsWith('HRMS') ) {
                // 싱글 로봇 용접
                this.welding_type = this.TYPE_SINGLE_ROBOT_WELDING;
                this.option = this.create_single_robot_welding_option();
            } else {
                // 수동 용접
                this.option = this.create_manual_welding_option();
            }

            // 최초 그래프 만들기 위한 호출
            // 1분 전 데이터 가지고 오기
            let tmpDate = new Date();
            tmpDate =  new Date(tmpDate.getTime() - this.timePeriod * 1000);

            // 임시로 테스트용 시간 추가
            // tmpDate.setMonth(7);
            // tmpDate.setDate(24);
            // tmpDate.setHours(8,3,12);

            console.log("graph date: "+this.get_date_string(tmpDate));
            this.run_graph_data(tmpDate);

            // 그래프 데이터 반복적으로 얻어오기 위한 호출
            this.graph_interval = setInterval(() => {
                this.run_graph_data();
            }, this.interval_sec * 1000);
        },
        methods:{
            get_welding_type() {
              let deviceID = this.modal_info_data.device_id.toUpperCase();
              if (deviceID.startsWith('IGM') || deviceID.startsWith('CLO')) {
                // 텐덤 용접 (master / slave)
                return this.TYPE_ROBOT_MS_WELDING;
              } else if (deviceID.startsWith('HRMS') ) {
                // 싱글 로봇 용접
                return this.TYPE_SINGLE_ROBOT_WELDING;
              } else {
                // 수동 용접
                return this.TYPE_MANUAL_WELDING;
              }
            },
            get_err_state(){
               let state = "";
               if(this.modal_info_data.error  !== true){
                   state = "정상";
                   return state
               }else{
                   state = "에러";
                   return state
               }
            },
            get_device_type(){
                let state = "";
                if(this.modal_info_data.device_type === "ROBOT"){
                    state = "로봇";
                    return state
                }else{
                    state = "수동";
                    return state
                }
            },
            get_arc_packet_state(){
                if(this.modal_info_data.packet_state > 0){
                  if (this.modal_info_data.arc_state == true) {
                    return "용접중"
                  } else {
                    return "대기중"
                  }
                } else {
                    return "비가동"
                }
            },
            get_arc_packet_color(){
                if(this.modal_info_data.packet_state > 0){
                  if (this.modal_info_data.arc_state == true) {
                    return "green"; //  용접
                  } else {
                    return "dgreen" // 대기
                  }
                } else {
                    return "gray"; // 비가동
                }
            },
            run_graph_data(toDate = null) {
              // API로 그래프 데이터를 얻어와서 화면에 뿌려준다.
              // 그래프는 최근 1분의 용접 정보를 표기 할 수 있다.
              // 처음에 차트가 로딩 될때는 최근의 2분 ~ 1분전의 데이터를 가지고 와서 로딩 한다.
              // 그리고 매 5초가 갱신 될 때 마다 그때 마다 서버에서 최근 5초의 그래프를 가져온다.
              // 5초마다 그래프를 append 시킨다
              // 먼저 API를 콜해서 값이 나오면 그 값을 기준으로 OPTION 값들을 정리 한다.
              // OPTION 생성하는 함수에서는 x, y 값들은 추가 되지 않는다.

              if (toDate !== null) {
                // toDate 값이 있을 경우에는 toDate 값을 기준으로 과거 1분을 from date로 한다.
                let tmpDate = toDate;
                this.chartToDate = tmpDate;
                this.chartFromDate = new Date(this.chartToDate.getTime() - this.timePeriod * 1000);
                this.graph_count = this.timePeriod;
              } else {
                // toDate 에 값이 없을 경우 this.chartToDate 값에서 + 5초 한 값을 this.chartToDate 값으로 설정 한다.
                let tmpDate = new Date(this.chartToDate.getTime() + this.interval_sec * 1000);
                this.chartToDate = tmpDate;
                this.chartFromDate = new Date (this.chartToDate.getTime() - this.interval_sec * 1000);
                this.graph_count = this.interval_sec;
              }
              let hostname = this.$get_api_host()

              let graph_url = `${hostname}/hiweld/api/arc/data/devices/${this.modal_info_data.parent_id}/childrens/from/${this.get_date_string(this.chartFromDate)}/to/${this.get_date_string(this.chartToDate)}`;
              // 그래프 API 호출 하기
              //let minmax_url = `${hostname}/hiweld/api/info/factories/F100/lines/${this.line_nm}/processes/${}/device/:device/seam/:seamNo/info`
              // 전류 tamin tamax 구하기
              console.log('[chart] req', graph_url);
              this.call_api(graph_url, (data)=> {
                console.log('[chart] res', graph_url, data)
                if (data === undefined) {
                  return ;
                }
                console.log('[chart] data count :' + data.length);

                let master_data = null;
                let slave_data = null;

                if (this.welding_type == this.TYPE_MANUAL_WELDING) {
                  console.log('[chart] manual device ');
                  console.log('[chart] arcData length = ' + data[0].arcData.length);

                  master_data = data[0];

                  // 데이터를 읽어서 붙인다. 더미 데이터로 인해서 2index를 가짐 나중에 바꿔야함
                  this.convert_manual_arc_data(master_data.arcData, this.graph_count, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2], this.lastGraphData[0],this.lastGraphData[1],this.lastGraphData[2]);
                  if (master_data.arcData.length > 0) {
                    // 실시간 데이터 업데이트
                    this.$set(this.realtime_a_value,0,master_data.arcData[0].fA);
                    this.$set(this.realtime_v_value,0,master_data.arcData[0].fV);
                    this.$set(this.realtime_f_value,0,master_data.arcData[0].fS);

                    // 마지막 값 저장하기
                    let data = master_data.arcData[master_data.arcData.length - 1];
                    this.lastGraphData[0] = data.fA;
                    this.lastGraphData[1] = data.fV;
                    this.lastGraphData[2] = data.fS;
                  } else {
                    this.$set(this.realtime_a_value,0,'-');
                    this.$set(this.realtime_v_value,0,'-');
                    this.$set(this.realtime_f_value,0,'-');
                  }

                } else if (this.welding_type == this.TYPE_SINGLE_ROBOT_WELDING) {

                  console.log('[chart] single robot device ');
                  console.log('[chart] arcData length = ' + data[0].arcData.length);
                  master_data = data[0];
                  // 데이터를 읽어서 붙인다.
                  this.convert_robot_arc_data(master_data.arcData, this.graph_count, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2], this.lastGraphData[0],this.lastGraphData[1],this.lastGraphData[2]);

                  if (master_data.arcData.length > 0) {
                    // 실시간 데이터 업데이트
                    this.$set(this.realtime_a_value,0,master_data.arcData[0].fA);
                    this.$set(this.realtime_v_value,0,master_data.arcData[0].fV);
                    this.$set(this.realtime_f_value,0,master_data.arcData[0].fF);

                    // 마지막 값 저장하기
                    let data = master_data.arcData[master_data.arcData.length - 1];
                    this.lastGraphData[0] = data.fA;
                    this.lastGraphData[1] = data.fV;
                    this.lastGraphData[2] = data.fS;
                  } else {
                    this.$set(this.realtime_a_value,0,'-');
                    this.$set(this.realtime_v_value,0,'-');
                    this.$set(this.realtime_f_value,0,'-');
                  }
                } else {
                  // 2개 이상의 로봇 용접기 master/slave 구조
                  // console.log(`[chart] data count ${data.length} ROBOT DEVICE `);
                  // console.log('[chart] arcData[0] length = ' + data[0].arcData.length);
                  // console.log('[chart] arcData[1] length = ' + data[1].arcData.length);
                  // console.log('[chart] Master Slave / arcData[0]:',data[0]);
                  if (data[0].deviceNo === 0) {
                    master_data = data[0];
                    slave_data = data[1];
                  } else {
                    master_data = data[1];
                    slave_data = data[0];
                  }

                  this.convert_robot_arc_data(master_data.arcData, this.graph_count, this.option.xAxis[0], this.option.series[0], this.option.series[1], this.option.series[2], this.lastGraphData[0],this.lastGraphData[1],this.lastGraphData[2]);
                  this.convert_robot_arc_data(slave_data.arcData, this.graph_count, null, this.option.series[3], this.option.series[4], this.option.series[5], this.lastGraphData[3],this.lastGraphData[4],this.lastGraphData[5]);

                  if (master_data.arcData.length > 0) {
                    // 실시간 데이터 업데이트
                    this.$set(this.realtime_a_value,0,master_data.arcData[0].fA);
                    this.$set(this.realtime_v_value,0,master_data.arcData[0].fV);
                    this.$set(this.realtime_f_value,0,master_data.arcData[0].fF);

                    // 마지막 값 저장하기
                    let data = master_data.arcData[master_data.arcData.length - 1];
                    this.lastGraphData[0] = data.fA;
                    this.lastGraphData[1] = data.fV;
                    this.lastGraphData[2] = data.fS;
                  } else {
                    this.$set(this.realtime_a_value,0,'-');
                    this.$set(this.realtime_v_value,0,'-');
                    this.$set(this.realtime_f_value,0,'-');
                  }

                  if (slave_data.arcData.length > 0) {
                    // 실시간 데이터 업데이트
                    this.$set(this.realtime_a_value,1,slave_data.arcData[0].fA);
                    this.$set(this.realtime_v_value,1,slave_data.arcData[0].fV);
                    this.$set(this.realtime_f_value,1,slave_data.arcData[0].fF);

                    // 마지막 값 저장하기
                    let data = slave_data.arcData[slave_data.arcData.length - 1];
                    this.lastGraphData[3] = data.fA;
                    this.lastGraphData[4] = data.fV;
                    this.lastGraphData[5] = data.fS;
                  } else  {
                    this.$set(this.realtime_a_value,1,'-');
                    this.$set(this.realtime_v_value,1,'-');
                    this.$set(this.realtime_f_value,1,'-');
                  }
                }
                // 왼쪽 데이터 초기화 안되어있으면 한번 불러서 초기화 시키기
                if (this.init_data == false) {
                  // console.log("[MODAL] initialize left data");
                  // this.init_data = true;

                  // arcData가 없을 경우 (파형을 그릴 수 없을 경우)
                  if (master_data.arcData.length == 0) {
                    this.imageURL = `${hostname}/hiweld/api/code/factories/F100/lines/${this.modal_info_data.lineCd}/image`;
                    this.$set(this.amin,0,'-');
                    this.$set(this.amax,0,'-');
                    this.$set(this.vmin,0,'-');
                    this.$set(this.vmax,0,'-');
                    this.$set(this.amin,1,'-');
                    this.$set(this.amax,1,'-');
                    this.$set(this.vmin,1,'-');
                    this.$set(this.vmax,1,'-');
                  }
                  else {
                    // 이미지 url 만들기
                    this.imageURL = `${hostname}/hiweld/api/info/factories/F100/lines/${this.modal_info_data.lineCd}/processes/${master_data.processCd}/device/${master_data.device}/seam/${master_data.arcData[0].seam}/file/image`;
                    console.log("[Modal] image URL : "+ this.imageURL);

                    // 왼쪽 데이터 업데이트를 위한 API #10 호출
                    console.log("[Modal] process_Cd :  "+ this.modal_info_data.processCd + " line_cd: " + this.modal_info_data.lineCd);
                    // console.log(this.modal_info_data);
                    let api10URL = `${hostname}/hiweld/api/info/factories/F100/lines/${this.modal_info_data.lineCd}/processes/${master_data.processCd}/device/${master_data.device}/seam/${master_data.arcData[0].seam}/info`;
                    // API #10 호출
                    this.call_api(api10URL, (response)=> {
                      console.log("[Modal] request URL: " + api10URL);
                      console.log("[Modal] response: " + response);
                      this.$set(this.amin,0,response.tamin);
                      this.$set(this.amax,0,response.tamax);
                      this.$set(this.vmin,0,response.tvmin);
                      this.$set(this.vmax,0,response.tvmax);

                      // markline 그리기 위한 코드
                      // console.log("draw mark line!!!!!!!!!!!!!!!");
                      if (this.click_master === undefined) {
                        this.click_master = true;
                        this.option.series[0].markLine.data[0].yAxis = this.amin[0];
                        this.option.series[0].markLine.data[1].yAxis = this.amax[0];
                        this.option.series[1].markLine.data[0].yAxis = this.vmin[0];
                        this.option.series[1].markLine.data[1].yAxis = this.vmax[0];
                      }

                    });

                    console.log('[Modal] Slave Data',slave_data);
                    if (slave_data !== null && slave_data.arcData.length > 0) {
                      // child 값이 있을 경우는 master / slave 구조로 화면에 표기 되므로 slave 기준값을 요청한다.
                      let api10URL = `${hostname}/hiweld/api/info/factories/F100/lines/${this.modal_info_data.lineCd}/processes/${slave_data.processCd}/device/${slave_data.device}/seam/${slave_data.arcData[0].seam}/info`;
                      // API #10 호출
                      this.call_api(api10URL, (response)=> {
                        console.log("[Modal] request URL (slave): " + api10URL);
                        console.log("[Modal] response (slave): ",response);
                        this.$set(this.amin,1,response.tamin);
                        this.$set(this.amax,1,response.tamax);
                        this.$set(this.vmin,1,response.tvmin);
                        this.$set(this.vmax,1,response.tvmax);
                      });
                    }
                  }
                }
              })
            },
            convert_robot_arc_data(arcData, count, xAxis, series_fA, series_fV, series_fF, last_fA, last_fV, last_fF) {
              // 로봇 arc 데이터
              // arcData 는 배열 형태로 데이터가 저장 되어있음
              // 그러나 arcData가 count 개수 만큼 없을 수가 있음 그래서 dictionary 형태로 저장해서 매칭 해서 보여주기로 함
              let arc = {}
              let date, dateString;
              for (let index = 0 ; index < arcData.length; index++) {
                date = new Date(arcData[index].localTime);
                dateString = date.toLocaleTimeString().replace(/^\D*/, '');
                arc[dateString] = arcData[index];
              }

              let tmpDate = this.chartFromDate;
              let lastData = [last_fA,last_fV,last_fF];
              for(let index = 0 ; index < count ; index++) {
                dateString = tmpDate.toLocaleTimeString().replace(/^\D*/, '');
                if (xAxis != null) {
                  xAxis.data.shift();
                  xAxis.data.push(dateString);
                  tmpDate = new Date(tmpDate.getTime() + 1000);
                }

                series_fA.data.shift();
                series_fV.data.shift();
                series_fF.data.shift();

                if (arc[dateString] !== undefined) {
                  series_fA.data.push(arc[dateString].fA);
                  series_fV.data.push(arc[dateString].fV);
                  series_fF.data.push(arc[dateString].fF);
                  lastData[0] = arc[dateString].fA;
                  lastData[1] = arc[dateString].fV;
                  lastData[2] = arc[dateString].fF;
                } else {
                  series_fA.data.push(lastData[0]);
                  series_fV.data.push(lastData[1]);
                  series_fF.data.push(lastData[2]);
                }
              }
            },
            convert_manual_arc_data(arcData, count, xAxis, series_fA, series_fV, series_fS, last_fA, last_fV, last_fS) {
              // arcData 는 배열 형태로 데이터가 저장 되어있음
              // 그러나 arcData가 count 개수 만큼 없을 수가 있음 그래서 dictionary 형태로 저장해서 매칭 해서 값을 표기 하기로 함
              let arc = {}
              let date, dateString;
              for (let index = 0 ; index < arcData.length; index++) {
                date = new Date(arcData[index].localTime);
                dateString = date.toLocaleTimeString().replace(/^\D*/, '');
                arc[dateString] = arcData[index];
              }

              let lastData = [last_fA,last_fV,last_fS];
              let tmpDate = this.chartFromDate;
              console.log("aaaaaaaaaaaaaaaaaaa ");
              for(let index = 0 ; index < count ; index++) {
                dateString = tmpDate.toLocaleTimeString().replace(/^\D*/, '');

                xAxis.data.shift();
                xAxis.data.push(dateString);
                tmpDate = new Date(tmpDate.getTime() + 1000);

                series_fA.data.shift();
                series_fV.data.shift();
                series_fS.data.shift();
                if (arc[dateString] !== undefined) {
                  series_fA.data.push(arc[dateString].fA);
                  series_fV.data.push(arc[dateString].fV);
                  series_fS.data.push(arc[dateString].fS);
                  lastData[0] = arc[dateString].fA;
                  lastData[1] = arc[dateString].fV;
                  lastData[2] = arc[dateString].fS;
                  console.log("value updated ");
                } else {
                  console.log("last data insert...",lastData);
                  series_fA.data.push(lastData[0]);
                  series_fV.data.push(lastData[1]);
                  series_fS.data.push(lastData[2]);
                }
              }
            },
            create_option_xAxis() {
              console.log('[chart] create_option_xAxis');
              // 옵션 데이터 초기화 할때는 현재 시간 기준으로 5초 전 값(this.interval_sec)을 가로 축으로 추가 한다.
              // 왜냐면 바로 이어서 API에서 얻어온 값을 추가 할 예정이므로
              let date = new Date();
              date = new Date(date.getTime() - this.interval_sec * 1000);
              let res = [];
              let len = this.timePeriod;
              while (len--) {
                  res.unshift(date.toLocaleTimeString().replace(/^\D*/, ''));
                  date = new Date(date.getTime() - 1000);
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
                  grid : {
                    left: 40,
                    bottom: 20,
                    right : 10,
                  },
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
                            data : this.create_option_xAxis()
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: 600,
                            boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: '{value}'
                            },
                        },
                    ],
                    series: [
                        {
                            name: '전류(A)',
                            type: 'line',
                            symbol : "emptyTriangle",
                            smooth: true, //부드러운 line 표현
                            yAxisIndex: 0, //yAxis 1번째 사용
                            lineStyle: {
                              color: '#ff0000' //line차트 색상
                            },
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                }
                              ]
                            }
                        },
                        {
                            name: '전압(V)',
                            type: 'line',
                            symbol : "emptyCircle",
                            yAxisIndex: 0,
                            lineStyle: {
                              color: '#0000ff' //line차트 색상
                            },
                            data: this.create_option_yAxis(),
                          markLine: {
                            symbol: ['none', 'none'],
                            label: { show: false },
                            data: [
                              {
                                name: 'min',
                                yAxis: 0,
                                lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                              },
                              {
                                name: 'max',
                                yAxis: 0,
                                lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                              }
                            ]
                          }
                        },
                        {
                            name: '피딩속도(m/min)',
                            type: 'line',
                            symbol : "emptyDiamond",
                            yAxisIndex: 0, //yAxis 2번째 사용
                            lineStyle: {
                              color: '#00ff00' //line차트 색상
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
                  grid : {
                    left: 40,
                    bottom: 20,
                    right : 10,
                  },
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
                        data: ['전류(A)', '전압(V)', '송급 모터 전류']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data : this.create_option_xAxis()
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: 600,
                            boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: '{value}'
                            },
                        }
                    ],
                    series: [
                        {
                            name: '전류(A)',
                            type: 'line',
                            symbol : "emptyTriangle",
                            lineStyle: {
                              color: '#ff0000' //line차트 색상
                            },                            smooth: true, //부드러운 line 표현
                            yAxisIndex: 0, //yAxis 1번째 사용
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                }
                              ]
                            }
                        },
                        {
                            name: '전압(V)',
                            type: 'line',
                            symbol : "emptyCircle",
                            yAxisIndex: 0,
                            lineStyle: {
                              color: '#0000ff' //line차트 색상
                            },
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                }
                              ]
                            }
                        },
                        {
                            name: '송급 모터 전류',
                            type: 'line',
                            symbol : "emptyDiamond",
                            yAxisIndex: 0, //yAxis 1번째 사용
                            lineStyle: {
                              color: '#00ff00' //line차트 색상
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
                  grid : {
                    left: 40,
                    bottom: 20,
                    right : 10,
                  },
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
                        data: ['Master 전류(A)', 'Master 전압(V)', 'Master 송급 모터 전류', 'Slave 전류(A)', 'Slave 전압(V)', 'Slave 송급 모터 전류']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data : this.create_option_xAxis()
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: 600,
                            boundaryGap: [0.2, 0.2],
                            axisLabel: {
                                formatter: '{value}'
                            },
                        },
                    ],
                    series: [
                        {
                            name: 'Master 전류(A)',
                            symbol : "triangle",
                            type: 'line',
                            lineStyle: {
                                color: '#ff0000' //line차트 색상
                            },
                            smooth: true, //부드러운 line 표현
                            yAxisIndex: 0, //yAxis 1번째 사용
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                }
                              ]
                            }
                        },
                        {
                            name: 'Master 전압(V)',
                            symbol : "circle",
                            type: 'line',
                            yAxisIndex: 0, //yAxis 2번째 사용
                            lineStyle: {
                              color: '#0000ff' //line차트 색상
                            },
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                }
                              ]
                            }
                        },
                        {
                            name: 'Master 송급 모터 전류',
                            symbol : "diamond",
                            type: 'line',
                            yAxisIndex: 0, //yAxis 2번째 사용
                            lineStyle: {
                              color: '#00ff00' //line차트 색상
                            },
                            data: this.create_option_yAxis()
                        },
                        {
                            name: 'Slave 전류(A)',
                            symbol : "emptyTriangle",
                            type: 'line',
                            lineStyle: {
                                color: '#ff8500' //line차트 색상
                            },
                            smooth: true, //부드러운 line 표현
                            yAxisIndex: 0, //yAxis 1번째 사용
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#007bff' }
                                }
                              ]
                            }
                        },
                        {
                            name: 'Slave 전압(V)',
                            symbol : "emptyCircle",
                            type: 'line',
                            yAxisIndex: 0, //yAxis 2번째 사용
                            lineStyle: {
                              color: '#9800ff' //line차트 색상
                            },
                            data: this.create_option_yAxis(),
                            markLine: {
                              symbol: ['none', 'none'],
                              label: { show: false },
                              data: [
                                {
                                  name: 'min',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                },
                                {
                                  name: 'max',
                                  yAxis: 0,
                                  lineStyle: { type: 'dashed', width: 2, color: '#ffb81d' }
                                }
                              ]
                            }
                        },
                        {
                            name: 'Slave 송급 모터 전류',
                            symbol : "emptyDiamond",
                            type: 'line',
                            yAxisIndex: 0, //yAxis 2번째 사용
                            lineStyle: {
                              color: '#00847e' //line차트 색상
                            },
                            data: this.create_option_yAxis()
                        }
                    ]
                };
                return opt;
            },
            get_date_string(date) {
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
            click_master_btn() {
              this.click_master = true;
              this.option.series[0].markLine.data[0].yAxis = this.amin[0];
              this.option.series[0].markLine.data[1].yAxis = this.amax[0];
              this.option.series[1].markLine.data[0].yAxis = this.vmin[0];
              this.option.series[1].markLine.data[1].yAxis = this.vmax[0];

              if(this.welding_type === this.TYPE_ROBOT_MS_WELDING) {
                this.option.series[3].markLine.data[0].yAxis = 0;
                this.option.series[3].markLine.data[1].yAxis = 0;
                this.option.series[4].markLine.data[0].yAxis = 0;
                this.option.series[4].markLine.data[1].yAxis = 0;
              }
            },
            click_slave_btn() {
              this.click_master = false;
              this.option.series[0].markLine.data[0].yAxis = 0;
              this.option.series[0].markLine.data[1].yAxis = 0;
              this.option.series[1].markLine.data[0].yAxis = 0;
              this.option.series[1].markLine.data[1].yAxis = 0;

              this.option.series[3].markLine.data[0].yAxis = this.amin[1];
              this.option.series[3].markLine.data[1].yAxis = this.amax[1];
              this.option.series[4].markLine.data[0].yAxis = this.vmin[1];
              this.option.series[4].markLine.data[1].yAxis = this.vmax[1];
            },
            click_close(){
              clearInterval(this.graph_interval);
              this.$emit('close')
              console.log('graph_interval', this.graph_interval)
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
        },

        mounted(){
            //this.setChart();
        },
      destroyed() {
        clearInterval(this.graph_interval);
        console.log('[Modal] interval cleared')
      }

    }

</script>

<style>

    .Modal{
        position: fixed;z-index: 100;
        left: 0;
        width: 100%;
        height: 130%;
        top:0%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .lay {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        position: relative;
        max-width: 900px;
        margin: 0px auto;
        padding: 20px;
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        min-height: 600px;
        z-index: 10;
        opacity: 1;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-close-button {
        float: right;
    }
    .modal-header {
        background: #002f63;border-radius: 10px;padding: 20px 40px;
        width: 103%;
        margin-top: -20px;
        color: #ffffff;
    }
    .chart{width: 100%; height: 500px; }
    .modal_wrap{position: fixed;z-index: 9;}
    .modal_wrap::before{content: "";width: 100%;height: 100%;}
    .modal{border-radius: 10px;margin: 30px auto;/*width:100%;*/width:1280px; height:613px;overflow: hidden;background: #fff;box-shadow: 3px 3px 25px rgba(0,0,0,0.5);}
    .modal .top{background: #002f63;color: #fff;position: relative;padding: 10px 20px;font-size: 20px;}
    .modal .top p{font-weight:bold;}
    .modal .top button{position: absolute;right: 15px;top: 50%;width: 23px;transform: translateY(-50%);height: 23px;}
    .modal .top button::before{content: "";width: 100%;height: 1px;transform: rotate(45deg);top: 50%;background: #fff;position: absolute;left: 0;}
    .modal .top button::after{content: "";width: 100%;height: 1px;transform: rotate(-45deg);top: 50%;background: #fff;position: absolute;left: 0;}
    .modal .left{width:50%; display:inline-block;float:left;padding: 20px;padding-right: 10px; }
    .modal .left img{width:100%;}
    .modal .left .tb_line{border-top:2px solid #002f63;border-bottom:2px solid #002f63;padding: 5px;padding-right: 0;color: #002f63; text-align: left;}
    .modal .left .tb_line p{display:inline-block;font-size: 18px;font-weight: bold;}
    .modal .left .tb_line ul{display:inline-block;float:right;paddin#70g: 5px 0;}
    .modal .left .tb_line ul li{display:inline-block;padding: 0 10px;line-height:1;float:left;}
    .modal .left .tb_line ul li:last-child{border-left: 1px solid #7a99bb;}
    .modal .left .table_area{margin-top: -25px;}
    .modal .left .table_area .color_round{width:230px;}
    .modal .left .table_area .color_round span{display: inline-block;color: #fff;font-size: 14px;text-align: center;border-radius: 500px;width: 65px;padding: 2px 0;margin-right: 2px; margin-bottom: 10px;}
    .modal .left .table_area .color_round span.purple{background: #a400e9;}
    .modal .left .table_area .color_round span.dgreen{color:gray;background: #FFFFFF; border: 2px solid lightgray;}
    .modal .left .table_area .color_round span.green{background: #2ed400;}
    .modal .left .table_area .color_round span.sky{background: #0090ff;}
    .modal .left .table_area .color_round span.yellow{background: #fabe00;}
    .modal .left .table_area .color_round span.red{background: #fe0000;}
    .modal .left .table_area .color_round span.gray{background: gray;}
    .modal .left .table_area table{text-align: center;}
    .modal .left .table_area table th{background: #002f63;color: #fff;padding: 5px;font-weight: 400;}
    .modal .left .table_area table th ul li{display:inline-block;float: left;width: 50%;cursor: pointer;padding: 2px 0;}
    .modal .left .table_area table th ul{background:#295585;border-radius:5px;width:100%;overflow: hidden;}
    .modal .left .table_area table th ul:after{content:"";display:block;clear:both;}
    .modal .left .table_area table th ul li.active{background:#fabe00;color: #000;}
    .modal .left .table_area table td{padding: 10px 0;position:relative;font-weight: 400;}
    .modal .left .table_area table tbody td:last-child:before{content:"";width:1px;height: 35%;position:absolute;background:#bdbdbd;left:0;top: 50%;transform: translateY(-50%);}
    .modal .left .table_area table tbody tr{border-bottom:1px solid #40638a;}
    .modal .right{width:50%;height: 100%;display:inline-block;padding:20px; padding-top:3%;position: relative;}
    .modal .right .gp_top>*{margin-right: 7px;display: inline-block;}
    .modal .right .gp_top>p:nth-of-type(n+2){margin-left:5px;}
    .modal .right .gp_top>*:last-child{margin-right: 0;}
    .modal .right .gp_top>span{font-size: 13px;}
    .modal .right .gp_top>span em{display: inline-block;border-radius: 500px;width: 7px;height: 7px;margin-right: 4px;vertical-align: middle;margin-top: -2px;}
    .modal .right .gp_top>span.red em{background: #fe0000;}
    .modal .right .gp_top>span.blue em{background: #0000ff;}
    .modal .right .gp_top>span.green em{background: #00ff00;}
    .modal .right .gp_top>span.orange em{background: #ff8500;}
    .modal .right .gp_top>span.purple em{background: #9800ff;}
    .modal .right .gp_top>span.dgreen em{background: #00847e;}
    .modal .right .gp_top>span.yellow em{background: #fabe00;}
    .echarts_style {height: 500px; width: 100%;}
</style>
