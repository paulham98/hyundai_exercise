<template>
  <div class="inner" >
    <Modal v-if="modalView" @close="modalView=false" :modal_info_data="modal_info_data"></Modal>
    <div class="top_line">
        <h1>로봇 가동 현황</h1>
    </div>
    <div class="body_table" style="overflow-x: scroll; white-space: nowrap">
    <vue-scroll>
      <WholeRobotStatusMap :arc_name_data="arc_name_data"></WholeRobotStatusMap>
    </vue-scroll>
    </div>
      <div class="type">

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
</template>

<script>
  import WholeRobotStatusMap from "../../components/dashboard/WholeRobotSatusMap"
  import  Modal from "../../components/dashboard/Modal"
  import {EventBus} from "../../event-bus";

  export default {
    name: "WholeRobotStatus",
    components: {WholeRobotStatusMap, Modal},
    data() {
      return{
        arc_name_data: {},
        line_types: new Set(),
        modalView: false,
        modal_info_data: {},
        seam_no:[],
        interval:undefined,
        ROBOT_DATA_KEY :  "STORAGE_KEY_ROBOT_DATA"
      }
    },
    methods:{
      get_image_type(brand) {
        if (brand === null) {
          return "H1";
        }
        let str = brand.toUpperCase();
        if(str.startsWith("CLOOS")) {
          return "C1";
        } else if (str.startsWith("IGM")) {
          return "I1";
        }
        return "H1";
      },
      get_line_types(data){
        let r = {};
        for(let i = 0; i < data.length; i++){
          // device 값이 없는 게 있으므로 예외 처리 한다.
          if (data[i].device === null) {
            continue;
          }

          const lineNm = data[i]['lineNm'];
          if (r[lineNm] === undefined){
            r[lineNm] = {'lineNm' : lineNm, 'lineCd' : data[i]['lineCd'], 'main':[], 'sub':[]}
          }
          if (data[i]['stageCd'] === 'STAGE_MAIN'){
            r[lineNm]['main'].push(data[i])
          } else {
            r[lineNm]['sub'].push(data[i])
          }
          if (r[lineNm]['main'] !== undefined &&
            r[lineNm]['sub'] !== undefined) {
            // console.log(r[lineNm]);
          }
        }
        console.log(r)
        return r
      },
      convert_robot_info_by_line(line_data, robot_info_data) {
        // 라인별로 읽어서 루프 돌면서 order_no 와 image_type 값을 생성해서 붙인다.
        let data , info;
        for (data of line_data) {
          info = {};
          // console.log("data: ", data);
          if (robot_info_data[data.device] !== undefined) {
            // robot_info_data 에 값이 있음
            // console.log("robot_info_data order_no : " + robot_info_data[data.device].order_no + ' image_type : ' + robot_info_data[data.device].image_type);
            info['order_no'] = robot_info_data[data.device].order_no;
            info['image_type'] = robot_info_data[data.device].image_type;
          } else {
            // 데이터가 없으므로 새로이 데이터를 만들어 줘야 함
            info['order_no'] = 1;
            info['image_type'] = this.get_image_type(data.maker);
          }
          // console.log("info: ",info);
          this.$set(data,"info", info);
        }
      },
      convert_robot_info(robot_data, robot_info_data) {
        // robot_data는 lineCd 별로 dict 형태로 데이터가 저장 되어있음
        // 로봇 정보 데이터 들을 순회 하면서 robot_info_data 가 있는지 확인 하고 있으면 키 값을 'info' 로 해서
        // dict 를 붙여 넣는 작업을 한다.
        // 나중에 string 으로 만들때도 이것을 역행 하는 방식으로 작업 한다.
        let lineData;
        for (let lineCode in robot_data) {
          // robot_info = robot_info_data
          lineData = robot_data[lineCode];
          // master
          this.convert_robot_info_by_line(lineData['main'], robot_info_data);
          lineData['main'].sort((a, b) =>{
            if ( a.info.order_no < b.info.order_no)
              return -1
            else if ( a.info.order_no < b.info.order_no)
              return 1
            else
              return 0
          })
          // slave
          this.convert_robot_info_by_line(lineData['sub'], robot_info_data);
          lineData['sub'].sort((a, b) =>{
            if ( a.info.order_no < b.info.order_no)
              return -1
            else if ( a.info.order_no < b.info.order_no)
              return 1
            else
              return 0
          })
        }
      },
      call_api_and_update_data(hostname) {
        console.log(`[CALL_API_AND_UPDATE_DATA] ${hostname}`)
        let arc_device_name_list = `${hostname}/hiweld/api/config/factories/F100/stage/devices`

        this.$call_api(arc_device_name_list, (data)=>{
          data.sort((a, b) =>{
            if ( a.lineCd < b.lineCd)
              return -1
            else if ( a.lineCd > b.lineCd)
              return 1
            else
              return 0
          })
          this.arc_name_data = this.get_line_types(data)
          console.log('[WholeRobotStatus] res', data, this.arc_name_data)
          console.log(this.arc_name_data)

          // data storage로 부터 로봇 현황 데이터를 로드 한다.
          let api31URL = `${hostname}/hiweld/api/dashboard/storage/${this.ROBOT_DATA_KEY}?factory=F100`;
          console.log("api 31 URL req:"+api31URL);
          this.$call_api(api31URL, robot_info_string => {
            console.log("api31URL response:",robot_info_string.value);

            if (robot_info_string === undefined || robot_info_string.value === undefined || Object.entries(robot_info_string.value).length === 0 ) {
              robot_info_string = {};
            } else {
              robot_info_string = robot_info_string.value;
            }
            this.robotInfo = robot_info_string;
            console.log("robot_info:",this.robotInfo);

            // robot_info 데이터를 robot_data에 찾아서 끼워 넣는다.
            this.convert_robot_info(this.arc_name_data, this.robotInfo);

          });

        })
      }
    },
    created(){
      EventBus.$on('whole-robot-item', item =>{
        console.log('whole-robot-item', item);
        this.modal_info_data = {'device_id':item.device, 'device_nm':item.deviceName, 'device_type':item.deviceType, 'column':item.column, 'position':item.position, 'arc_state':item.arcState, 'packet_state':item.packetState, 'brand' : item.maker, 'error' : item.error , 'parent_id' : item.deviceParent };
        this.modal_info_data.lineNm = item.lineNm;
        this.modal_info_data.lineCd = item.lineCd;
        this.modal_info_data.processCd = item.processCd;
        // 만약에 children 값이 있을 경우는 master / slave 이므로
        // children[0]은 device_id로 보낸다.
        if (item.children.length == 2) {
          this.modal_info_data.device_id = item.children[0];
        }
        this.modalView = true;
      })
      this.call_api_and_update_data(this.$get_api_host())
    },
    mounted() {

      this.interval = setInterval(()=>{
        this.call_api_and_update_data(this.$get_api_host())
      }, 1000 * 60)
    },
    destroyed() {
      clearInterval(this.interval);
      console.log('[WholeRobotStatus] interval cleared')
    }
  }
</script>

<style scoped>
.inner{padding: 15px; background-color: #ededed; /* width: 3880px; */}
.top_line{position: relative;text-align: center;margin-bottom: 15px;}
.top_line div{position: absolute;left: 0;top: 50%;transform: translateY(-50%);}
.top_line div button{margin-right: 15px;}
.top_line div img{display: block;}
.top_line div img.active{display: none;}
.top_line div button:hover img{display: none;}
.top_line div button:hover img.active{display: block;}
.top_line h1{color: #014085;font-size: 32px;font-weight: 700;}
/*.body_table::-webkit-scrollbar{display:none}*/


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

.status>div{margin-right: 5px; }/* 210808수정 vertical-align: top;*/
.status .slick-track{margin-left: 0;}/* 210808 추가 */
.status .slick-track .slick-slide{padding-right: 5px;}/* 210808 추가 */
.status>div:last-child{margin-right:0;}
.status>div .ms_wrap thead th{background: #002f63;color: #fff;}
.status>div .ms_wrap thead tr:first-child th{border-radius: 5px 5px 0 0;border-bottom: 1px solid #ededed;}
.status>div .ms_wrap thead tr:last-child th:last-child{background: #003f84;border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody{background: #fff;}
.status>div .ms_wrap tbody td:last-child{border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody td{border-bottom: 1px solid #ededed;padding: 10px;position: relative;height: 107px;box-sizing: border-box;vertical-align: top;}
.status>div .ms_wrap tbody td img{position:absolute;}
.status>div .ms_wrap tbody td p{border-radius:500px;text-align:center;padding-left:50px;margin-bottom: 7px;padding-right: 10px;overflow: hidden;white-space: nowrap;/* text-overflow: ellipsis; */-o-text-overflow: ellipsis;-ms-text-overflow: ellipsis;}
.status>div .ms_wrap tbody td p:last-child{margin-bottom:0}
.status>div .ms_wrap tbody td p.green{background: #2ed400;color:#fff;}
.status>div .ms_wrap tbody td p.blue{background: #0090ff;color:#fff;}
.status>div .ms_wrap tbody td p.red{background: #ff2b2b;color:#fff;}
.status>div .ms_wrap tbody td p.gray{background: #939393;color:#fff;}
.status>div .ms_wrap tbody td p.white{border:1px solid #a7a7a7;color:#a7a7a7}
.bot_wrap{overflow-x: scroll
<vue-scroll>;}/* 210808 추가 */
.status>div .bot th{background: #002f63;border-right: 1px solid #ededed;text-align: center;color: #fff;padding: 5px;}
.status>div .bot tr th:last-child{border-right: 0;}
.status>div .bot td{background: #fff;border-right: 1px solid #ededed;text-align: center;padding: 5px;}
.status>div .bot tr td:last-child{border-right: 0;}
.bot_wrap{overflow-x: scroll;}/* 210808 추가 */
</style>
