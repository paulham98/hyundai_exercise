<template>
  <div class="line_wrap" >
    <table class="ms_wrap" >
      <thead >
      <tr>
        <th colspan="2">{{line['lineNm']}}</th>
      </tr>
      <tr>
        <th>MAIN</th>
        <th>SUB</th>
      </tr>
      </thead>
    </table>
    <div class="scr_wrap" style="overflow-y: scroll;">
      <table class="ms_wrap_1" >
         <WholeRobotStatusBody :line="line"></WholeRobotStatusBody>
      </table>
    </div>
    <div v-if="arc_production_data.length > 0" class="bot_wrap" style="background-color: #ffffff;">
      <vue-scroll>
        <table class="bot" style="width:105px; display: inline-block" :key="i" v-for="(item, i) in arc_production_data" >
        <tbody >
         <tr>
             <th>
                 <div>
                     <p>{{item['modelCd']}}</p>
                 </div>
             </th>
         </tr>
        <tr>
            <td>
                <div >
                    <p>{{item['productNo']}}</p>
                </div>
            </td>
        </tr>
        </tbody>
      </table>
      </vue-scroll>
    </div>
    <!--
      <div v-if="arc_production_data.length < 3" class="bot_wrap" style="background-color: #ffffff;">
      <table>
        <tbody >
        <tr>
          <th :key="i" v-for="(item, i) in arc_production_data">
            <div>
              <p>{{item['modelCd']}}</p>
            </div>
          </th>
        </tr>
        <tr>
          <td :key="i" v-for="(item, i) in arc_production_data">
           <div><p>{{item['productNo']}}</p></div>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
      -->
    <div v-if="arc_production_data.length == 0" class="bot_wrap" style="background-color: #ffffff; ">
      <table class="bot" >
        <tbody>
        <tr>
          <td><div style="height: 30px;"><p></p></div></td>
        </tr>
        <tr>
          <td><div style="height: 30px;"><p></p></div></td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
    import WholeRobotStatusBody from "../../components/dashboard/WholeRobotSatusBody"
    //import ScrollShadow from 'vue-scroll-shadow';
    export default {
      name: "ArcListTable",
      components: { WholeRobotStatusBody },
      props:{
          line: Object,
      },
      data(){
        return{
          hostname:"",
          arc_production_data: [],
          arc_production: [
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},
            {'modelCd':'R220LC-9S-AFO1' ,'productNo':'KPBM0V0006'},


          ]
        }
      },
      methods:{
        get_device_state(line){
          let device_state = "";
          if(line['pocketState'] > 0){
            if( line['arcState'] === true){
              device_state = "green" // 용접중
            } else{
              device_state = "white" //대기중
            }
          }else{
            device_state = "gray" // 꺼짐
          }
          return device_state
        },
        call_api(url, callback){
          fetch(url)
            .then(res=>{
              return res.json()
            })
            .then(data=>{
              // console.log('[call_api]', data)
              callback(data.data)
            })
        },
      },
      created(){
        console.log("ArcListTable", this.line);
        let hostname = this.$get_api_host();
        this.hostname = hostname;
        let date= this.$get_no_date();
        let time= this.$get_no_time();
        console.log(date, time)
        let device_production_url = `${hostname}/hiweld/api/config/factories/F100/lines/${this.line['lineCd']}/products?beginDtm=${date+time}`

        console.log("!!!!! URL:"+device_production_url);
        this.call_api(device_production_url, data =>{
          console.log("this is data",data)
          this.arc_production_data = data
          console.log("this is production_data", this.arc_production_data)
        })
      },
      mounted(){
      },
    }
</script>

<style scoped>
.line_wrap{max-width: 368px; padding-right: 2px;display: inline-block}

.status>div{ margin-right: 2px; }/* 210808수정 */
.status .slick-track{margin-left: 0;}/* 210808 추가 */
.status .slick-track .slick-slide{padding-right: 5px;}/* 210808 추가 */
.status>div:last-child{margin-right:0;}
.status>div table.ms_wrap{max-width: 380px}
.status>div .ms_wrap thead th{background: #002f63;color: #fff;}
.status>div .ms_wrap thead tr:first-child th{ border-radius: 5px 5px 0 0;border-left: 1px solid #ededed; border-bottom: 1px solid #ededed;}
.status>div .ms_wrap thead tr:last-child th:last-child{ background: #003f84;border-left: 4px solid #ededed;}


.status>div .ms_wrap_1 tbody{background: #fff;  }
.status>div .scr_wrap::-webkit-scrollbar{width: 0px;}

.status>div table.ms_wrap_1{max-width: 380px; }
.status>div .ms_wrap_1 tbody::-webkit-scrollbar{width: 0px;}
.status>div .ms_wrap_1 tbody td:last-child{border-left: 1px solid #ededed; width: 50%}
.status>div .ms_wrap_1 tbody td{width: 50%; border-bottom: 1px solid #ededed;padding: 10px;position: relative;height: 107px;box-sizing: border-box;vertical-align: top;}
.status>div .ms_wrap_1 tbody td img{position:absolute;}
.status>div .ms_wrap_1 tbody td p:last-child{margin-bottom:0}

.status>div .ms_wrap thead th{background: #002f63;color: #fff;}
.status>div .ms_wrap thead tr:first-child th{border-radius: 5px 5px 0 0;border-bottom: 1px solid #ededed;}
.status>div .ms_wrap thead tr:last-child th:last-child{background: #003f84;border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody{background: #fff;}
.status>div .ms_wrap tbody td:last-child{border-left: 1px solid #ededed;}
.status>div .ms_wrap tbody td{border-bottom: 1px solid #ededed;padding: 10px;position: relative;height: 107px;box-sizing: border-box;vertical-align: top;}
.status>div .ms_wrap tbody td img{position:absolute;}
.status>div .ms_wrap tbody td p{border-radius:500px;text-align:left ;padding-left:50px;margin-bottom: 7px;padding-right: 10px;overflow: hidden;white-space: nowrap;/* text-overflow: ellipsis; */-o-text-overflow: ellipsis;-ms-text-overflow: ellipsis;}
.status>div .ms_wrap tbody td p:last-child{margin-bottom:0}
.status>div .ms_wrap tbody td p.green{background: #2ed400;color:#fff;}
.status>div .ms_wrap tbody td p.blue{background: #0090ff;color:#fff;}
.status>div .ms_wrap tbody td p.red{background: #ff2b2b;color:#fff;}
.status>div .ms_wrap tbody td p.gray{background: #939393;color:#fff;}
.status>div .ms_wrap tbody td p.white{border:1px solid #a7a7a7;color:#a7a7a7}

.bot_wrap{max-width: 380px; overflow-x: scroll; font-size: 14px; color:gray;}
.bot_wrap::-webkit-scrollbar{display: inline !important; ; width: 10px; height: 10px}
.bot_wrap .bot table{min-height:80px;overflow-x: scroll;}


.status>div .bot tr th{overflow-x: scroll;background: #002f63;border-right: 1px solid #a7a7a7;text-align: center;color: #fff;padding: 5px;border-bottom: 1px solid #ededed}
.status>div .bot tr th::-webkit-scrollbar{width: 0px; height: 0px;}
.status>div .bot th div,.status>div .bot td div{overflow: scroll;}
.status>div .bot th div::-webkit-scrollbar{display:none}
.status>div .bot td div::-webkit-scrollbar{display:none}
.status>div .bot th p,.status>div .bot td p{text-overflow: clip;word-break: nowrap;display: inline-block;overflow-x: scroll;white-space: nowrap;}
.status>div .bot th p::-webkit-scrollbar{display:none}
.status>div .bot td p::-webkit-scrollbar{display: none}
.status>div .bot tr th:last-child{border-right: 0;}
.status>div .bot td{ background: #fff;border-right: 1px solid #a7a7a7;text-align: center;padding: 5px;}
.status>div .bot tr td:last-child{border-right: 0;}
.bot_wrap{overflow-x: scroll;}/* 210808 추가 */

</style>
