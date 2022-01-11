<template>
  <div class="status2">
    <div class="top_line">
      <h1>로봇 현황맵 관리</h1>
    </div>
    <div class="box1">
      <AdminRobotOverviewRobotDisplay :selected_arc_device_cd="selected_arc_device_cd" :line_data="line_data" :line_nm="line_nm"></AdminRobotOverviewRobotDisplay>
    </div>
    <div class="box2">
      <div class="select_wrap">
        <p>로봇 편집 라인 선택</p>
        <select name="" v-model="changeIndex" @change="change_line_list">
          <option :key="'line-'+i" v-for="(lineItem,i) in line_type_data" :value="lineItem.lineCd">{{lineItem.lineNm}}</option>
        </select>
        <button type="button" @click="save_robot_data()">저장</button>
      </div>
      <div class="bd">
        <div class="table_scr">
          <table>
          <colgroup>
            <col width="20%">
            <col width="50%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
          </colgroup>
          <thead>
            <tr>
              <th class="gray">로봇코드</th>
              <th class="gray">로봇호기</th>
              <th class="navy">모델</th>
              <th class="navy">메인</th>
              <th class="navy">서브</th>
            </tr>
          </thead>
          <tbody>
          <tr :key="'master-'+i" v-for="(masterItem, i) in line_data[0]" @click="handle_click_middle_table(masterItem)" :class="selected_arc_device_cd === masterItem.device?'selected':''">
            <td>{{masterItem.device}}</td>
            <td><p>{{masterItem.deviceName}}</p></td>
            <td v-if="masterItem.info !== undefined">
              <select v-model="masterItem.info.image_type" >
                <option value="H1" :selected="'H1' === masterItem.info.image_type"> 현대 1 </option>
                <option value="H2" :selected="'H2' === masterItem.info.image_type"> 현대 2 </option>
                <option value="C1" :selected="'C1' === masterItem.info.image_type"> CLOOS </option>
                <option value="I1" :selected="'I1' === masterItem.info.image_type"> IGM </option>
              </select>
            </td>
            <td v-if="masterItem.info !== undefined"><input v-model="masterItem.info.order_no" size="1" maxlength="2"></td>
            <td v-else></td>
            <td></td>
          </tr>
          <tr :key="'slave-'+i" v-for="(slaveItem, i) in line_data[1]" @click="handle_click_middle_table(slaveItem)" :class="selected_arc_device_cd === slaveItem.device?'selected':''">
            <td>{{slaveItem.device}}</td>
            <td><p>{{slaveItem.deviceName}}</p></td>
            <td v-if="slaveItem.info !== undefined">
              <select v-model="slaveItem.info.image_type" >
                <option value="H1" :selected="'H1' === slaveItem.info.image_type"> 현대 1 </option>
                <option value="H2" :selected="'H2' === slaveItem.info.image_type"> 현대 2 </option>
                <option value="C1" :selected="'C1' === slaveItem.info.image_type"> CLOOS </option>
                <option value="I1" :selected="'I1' === slaveItem.info.image_type"> IGM </option>
              </select>
            </td>
            <td></td>
            <td v-if="slaveItem.info !== undefined"><input v-model="slaveItem.info.order_no" size="1" maxlength="2"></td>
            <td v-else></td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <ul class="box3">
      <li><h1>모델 TYPE</h1></li>
      <li>
        <p>IGM(I1)</p>
        <img src="/images/i1.png">
      </li>
      <li>
        <p>CLOOS(C1)</p>
        <img src="/images/c1.png">
      </li>
      <li>
        <p>현대 1(H1)</p>
        <img src="/images/h1.png">
      </li>
      <li>
        <p>현대 2(H2)</p>
        <img src="/images/h2.png">
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from "axios";

    import AdminRobotOverviewRobotDisplay from "../../components/dashboard/AdminRobotOverviewRobotDisplay";
    import {EventBus} from "../../event-bus";
    export default {
      components: {AdminRobotOverviewRobotDisplay},
      data(){
        return{
          line_nm: "",
          changeIndex : "",
          line_data: [],
          line_type_data : [],
          robot_data : {},
          robotInfo : {},
          ROBOT_DATA_KEY :  "STORAGE_KEY_ROBOT_DATA",
          selected_arc_device_cd : '',
          click_save: '',
        }
      },
      methods: {
        get_image_type(brand) {
          if (brand === null) {
            return "H1";
          }
          let str = brand.toUpperCase();
          if (str.startsWith("CLOOS")) {
            return "C1";
          } else if (str.startsWith("IGM")) {
            return "I1";
          }
          return "H1";
        },
        get_device_state(line) {
          let device_state = "";
          if (line['pocketState'] > 0) {
            if (line['arcState'] === true) {
              device_state = "green" // 용접중
            } else {
              device_state = "white" //대기중
            }
          } else {
            device_state = "gray" // 꺼짐
          }
          return device_state
        },
        find_line_name(data, lineCd) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].lineCd === lineCd) {
              return data[i].lineNm;
            }
          }
          return "";
        },
        get_line_type_data(data) {
          // line code 랑 line name을 array로 반환 한다.
          // 상단의 라인 리스트에서 사용하는 데이터
          let ret = [];
          let dict = {};
          console.log("get_line_type_data::")
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            // device 코드 값이 없는 로봇이 있으므로 이건 skip한다.
            if (data[i].device === null) {
              continue;
            }

            if (dict[data[i].lineCd] === undefined) {
              dict[data[i].lineCd] = data[i].lineNm;
              ret.push({lineCd: data[i].lineCd, lineNm: data[i].lineNm});
            }
          }
          return ret;
        },
        change_line_list(e) {

          // 상단의 라인 리스트 변경시 호출
          console.log('[AdminRobotOverview] change_list()', e.target.value);
          this.changeIndex = e.target.value
          this.line_nm = this.find_line_name(this.line_type_data, this.changeIndex);
          this.line_data = this.robot_data[e.target.value];
          console.log("line name" + this.line_nm);
        },
        convert_device_data(data) {
          // 전체 용접기 중에 로봇 용접기만 추린다.
          // 데이터를 아래와 같이 구조화 한다.
          /*
          {
            lineCd : [[],[]]
            ...
          }
          */
          console.log("convert_device_data()")
          let ret = {}
          for (let i = 0; i < data.length; i++) {
            // device 코드 값이 없는 로봇이 있으므로 이건 skip한다.
            if (data[i].device === null) {
              continue;
            }

            if (ret[data[i].lineCd] === undefined) {
              ret[data[i].lineCd] = [[], []]
            }
            if (data[i].stageCd === 'STAGE_MAIN') {
              ret[data[i].lineCd][0].push(data[i]);
            } else {
              ret[data[i].lineCd][1].push(data[i]);
            }
          }
          console.log("convert_device_data return:", ret);
          return ret;
        },
        convert_robot_data_to_info(robot_info, line_data) {
          // sort 에 숫자만 잘 들어가있는지만 확인 한다.
          // validation 확인 sort를 int로 parsing 한다.파싱 하고 난 값이 이상하면 1로 넣어 버린다.
          let data, orderNo;
          for (data of line_data) {
            if (robot_info[data.device] !== undefined) {
              console.log("key:" + data.device + " ERROR!!!");
              continue;
            }
            robot_info[data.device] = {}
            orderNo = parseInt(data.info.order_no.toString());
            if (orderNo < 1) {
              orderNo = 1;
            } else if (Number.isNaN(orderNo)) {
              orderNo = 1;
            }
            robot_info[data.device].order_no = orderNo;
            robot_info[data.device].image_type = data.info.image_type;
          }
        },
        save_robot_data() {
          console.log("save robot data clicked.... ");
          let hostname = this.$get_api_host()
          this.click_save = 'save'
          // 로봇 데이터의 info 값 다 읽어서 구조화 해서 넣는다.
          let lineData;
          let robot_info = {}
          for (let lineCode in  this.robot_data) {
            lineData = this.robot_data[lineCode];
            this.convert_robot_data_to_info(robot_info, lineData[0]);
            this.convert_robot_data_to_info(robot_info, lineData[1]);
          }

          console.log("robot_info:", robot_info);
          // robot_info를 API 콜을 통해서 저장 한다.
          let api31URL = `${hostname}/hiweld/api/dashboard/storage/`;
          axios.put(api31URL, {
            key: this.ROBOT_DATA_KEY,
            factory: 'F100',
            value: robot_info
            }
          )
            .then(res => {
              console.log('res', res)
              console.log('저장 되었습니다.', res['data']['result']);

              // 화면을 reload 한다
              this.load_data(this.changeIndex);
            })
        },
        convert_robot_info_by_line(line_data, robot_info_data) {
          // 라인별로 읽어서 루프 돌면서 order_no 와 image_type 값을 생성해서 붙인다.
          let data, info;
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
            this.$set(data, "info", info);
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
            this.convert_robot_info_by_line(lineData[0], robot_info_data);
            lineData[0].sort((a, b) => {
              if (a.info.order_no < b.info.order_no)
                return -1
              else if (a.info.order_no < b.info.order_no)
                return 1
              else
                return 0
            })
            // slave
            this.convert_robot_info_by_line(lineData[1], robot_info_data);
            lineData[1].sort((a, b) => {
              if (a.info.order_no < b.info.order_no)
                return -1
              else if (a.info.order_no < b.info.order_no)
                return 1
              else
                return 0
            })
          }
        },
        handle_click_middle_table(item) {
          console.log(item.device);
          this.selected_arc_device_cd = item.device;
        },
        load_data(changeIndex) {
          let hostname = this.$get_api_host()

          //
          let api12URL = `${hostname}/hiweld/api/config/factories/F100/stage/devices`;
          if (this.click_save !== 'save') {
            this.$call_api(api12URL, data => {
              console.log("api12URL  response:", data)

              // data를 lineCode를 기준으로 알파벳 정렬 한다.
              data.sort((a, b) => {
                if (a.lineCd < b.lineCd)
                  return -1
                else if (a.lineCd > b.lineCd)
                  return 1
                else
                  return 0
              })

              this.robot_data = this.convert_device_data(data);
              this.line_type_data = this.get_line_type_data(data);
              if (changeIndex == ''){
                this.changeIndex = this.line_type_data[0].lineCd;
                this.line_nm = this.line_type_data[0].lineNm;
                console.log("line type data:", this.line_type_data);
                this.line_data = this.robot_data[this.line_type_data[0].lineCd];
              }

              // data storage로 부터 로봇 현황 데이터를 로드 한다.
              let api31URL = `${hostname}/hiweld/api/dashboard/storage/${this.ROBOT_DATA_KEY}?factory=F100`;
              console.log("api 31 URL req:" + api31URL);
              this.$call_api(api31URL, robot_info_string => {
                console.log("api31URL response:", robot_info_string.value);

                // 임시로 더미 데이터를 만들어 본다.
                // robot_info_string = "{}"
                // robot_info_string = "{ \"HRMS00006\" : { \"order_no\" : 2, \"image_type\" : \"H2\"  }, \"IGMR000\" : { \"order_no\" : 1 , \"image_type\" : \"C1\" } ,  \"IGMR001\" : { \"order_no\" : 3, \"image_type\" : \"C1\" } }";
                // robot_info를 데이터 읽어서 구조화 한다.

                if (robot_info_string === undefined || robot_info_string.value === undefined || Object.entries(robot_info_string.value).length === 0) {
                  robot_info_string = {};
                } else {
                  robot_info_string = robot_info_string.value;
                }
                this.robotInfo = robot_info_string;
                console.log("robot_info:", this.robotInfo);

                // robot_info 데이터를 robot_data에 찾아서 끼워 넣는다.
                this.convert_robot_info(this.robot_data, this.robotInfo);

              });
            })
          } else {
            this.$call_api(api12URL, data => {
              console.log("api12URL  response:", data)

              // data를 lineCode를 기준으로 알파벳 정렬 한다.
              data.sort((a, b) => {
                if (a.lineCd < b.lineCd)
                  return -1
                else if (a.lineCd > b.lineCd)
                  return 1
                else
                  return 0
              })

              this.robot_data = this.convert_device_data(data);
              this.line_type_data = this.get_line_type_data(data);
              //this.changeIndex = this.line_type_data[0].lineCd;
              //this.line_nm = this.line_type_data[0].lineNm;
              console.log("line type data:", this.line_type_data);
              //this.line_data = this.robot_data[this.line_type_data[0].lineCd];

              // data storage로 부터 로봇 현황 데이터를 로드 한다.
              let api31URL = `${hostname}/hiweld/api/dashboard/storage/${this.ROBOT_DATA_KEY}?factory=F100`;
              console.log("api 31 URL req:" + api31URL);
              this.$call_api(api31URL, robot_info_string => {
                console.log("api31URL response:", robot_info_string.value);

                // 임시로 더미 데이터를 만들어 본다.
                // robot_info_string = "{}"
                // robot_info_string = "{ \"HRMS00006\" : { \"order_no\" : 2, \"image_type\" : \"H2\"  }, \"IGMR000\" : { \"order_no\" : 1 , \"image_type\" : \"C1\" } ,  \"IGMR001\" : { \"order_no\" : 3, \"image_type\" : \"C1\" } }";
                // robot_info를 데이터 읽어서 구조화 한다.

                if (robot_info_string === undefined || robot_info_string.value === undefined || Object.entries(robot_info_string.value).length === 0) {
                  robot_info_string = {};
                } else {
                  robot_info_string = robot_info_string.value;
                }
                this.robotInfo = robot_info_string;
                console.log("robot_info:", this.robotInfo);

                // robot_info 데이터를 robot_data에 찾아서 끼워 넣는다.
                this.convert_robot_info(this.robot_data, this.robotInfo);

              })
            })
          }
        },
      },
      created() {
        EventBus.$on('AdminRobotOverviewRobotDisplay-click-item', item =>{
          console.log(item.device)
          this.selected_arc_device_cd = item.device

        })

        console.log('[AdminRobotOverview created] ')
        this.load_data(this.changeIndex);
      },
      updated() {
        console.log(this.line_nm, this.line_data)
      }
    }
</script>

<style scoped>

    .ms{ pointer-events: none}
    .top_line{position: relative;text-align: center;margin-bottom: 15px;}
    .top_line div{position: absolute;left: 0;top: 50%;transform: translateY(-50%);}
    .top_line div button{margin-right: 15px;}
    .top_line div img{display: block !important;}
    .top_line div img.active{display: none;}
    .top_line div button:hover img{display: none;}
    .top_line div button:hover img.active{display: block;}
    .top_line h1{color: #014085;font-size: 32px;font-weight: 700;}
    .status2 .box1{border: 1px solid #ddd;border-radius: 7px;padding: 15px;display: inline-block;width: calc(45% - 152px);vertical-align: top;}
    .status2 .box2 .table_scr{overflow-y: scroll;margin: 15px;width: calc(100% - 30px);height:calc(100% - 30px);}
    .status2 .box2{width: 55%;display: inline-block;vertical-align: top;padding: 0 20px;box-sizing: border-box;}
    .status2 .box2 .select_wrap{margin-bottom: 10px;}
    .status2 .box2 .select_wrap p{color: #444;font-weight: 600;display: inline-block;margin-right: 35px;}
    .status2 .box2 .select_wrap select{border: 1px solid #ddd;border-radius: 5px;width: 400px;}
    .status2 .box2 .select_wrap button{margin: 5px 0;background: #002f63;color:#fff;border-radius: 500px;padding: 1px 20px;font-size: 15px;float: right;}
    .status2 .box2 .bd{border: 1px solid #ddd;border-radius: 7px;height: 513px;}
    .status2 .box2 table{text-align: center;}
    .status2 .box2 table th{color: #fff;border-right: 1px solid #fff;padding: 7px 0;font-weight: 600;position: sticky;top: 0;}
    .status2 .box2 table th.gray{background: #5e5e5e;}
    .status2 .box2 table th.navy{background: #002f63;}
    .status2 .box2 table tbody tr:nth-of-type(2n){background: #ededed;}
    .status2 .box2 table tbody tr.selected{background-color: #ffc200}
    .status2 .box2 table td{border-right: 1px solid #fff;padding: 2px;}
    .status2 .box2 table td input{width:30px;}
    .status2 .box2 table select{font-weight: 300;color: #000;border: 0;width:100%;}
    .status2 .box3{vertical-align: top;border: 1px solid #ddd;border-radius: 7px;overflow: hidden;text-align: center;display: inline-block;width: 150px;}
    .status2 .box3 h1{background: #002f63;color:#fff;font-size: 18px;padding: 7px 0;font-weight: 600;}
    .status2 .box3 li:nth-of-type(n+2){width: 80%;margin: 0 auto;border-bottom: 1px solid #ddd;padding: 10.5px 0;}
    .status2 .box3 li p{color: #555;font-weight: 600;}
    .status2 .box3 li:last-child{border-bottom:0;}
    select {color: #555;font-weight:600;-webkit-appearance: none;-moz-appearance: none;appearance: none;border: 1px solid #D7D7D7;background:url(/images/select.png)no-repeat;background-position: calc(100% - 10px);background-position : -webkit-calc(100% - 10px); background-position :-moz-calc(100% - 10px);padding:5px 10px;padding-right: 20px;background-size: 15px 7px;}
    select::-ms-expand { display: none; }

</style>
