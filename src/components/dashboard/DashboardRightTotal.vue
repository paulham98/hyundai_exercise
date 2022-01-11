<template>
<div class="right">
    <div class="date">
      <em>DATE</em>{{date}}
      <em>/&nbsp;</em>
      <em>TIME</em>{{time}}
    </div>
    <ul class="com_tab fclear" role="tablist">
      <li id="tab1" role="tab" aria-controls="tab-panel1" aria-selected="true" tabindex="0" class="active">로봇 용접</li>
      <li id="tab2" role="tab" aria-controls="tab-panel2" >외관검사</li>
    </ul>
    <div class="tabpanel_wrap">
      <div id="tab-panel1" class="tabpanel active" role="tabpanel" aria-labelledby="tab1">
        <table>
          <tbody>
          <tr>
            <td class="big">
              <em>Total</em>
              <span>{{robot_cnt_data['device_type_cnt']}}</span>
              <b>기</b>
            </td>
            <td class="big">
              <em>용접 중</em>
              <span>{{robot_cnt_data['arc_cnt']}}</span>
              <b>기</b>
            </td>
            <td class="big">
              <em>대기 중</em>
              <span>{{robot_cnt_data['wait_cnt'] }}</span>
              <b>기</b>
            </td>
          </tr>
          <tr>
            <th>
              <p>아크율</p>
            </th>
            <th>
              <p>용접 시간(h)</p>
            </th>
            <th>
              <p>작업 시간(h)</p>
            </th>
          </tr>
          <tr>
            <td>
              <p>
                <em>금월</em>
                <span>{{$check_undefined_and_to_fixed(data1['monthlyArcRate'], 1)}}%</span>
              </p>
            </td>
            <td><p>{{$n_to_0n(Math.floor(data1['monthlyArcTime']/3600))}}</p></td>
            <td><p>{{$n_to_0n(Math.floor(data1['monthlyWorkTime']/3600))}}</p></td>
          </tr>
          <tr>
            <td>
              <p>
                <em>금주</em>
                <span>{{$check_undefined_and_to_fixed(data1['weeklyArcRate'], 1)}}%</span>
              </p>
            </td>
            <td><p>{{Math.floor(data1['weeklyArcTime']/3600)}}</p></td>
            <td><p>{{Math.floor(data1['weeklyWorkTime']/3600)}}</p></td>
          </tr>
          <tr>
            <td>
              <p>
                <em>전일</em>
                <span>{{$check_undefined_and_to_fixed(data1['dailyArcRate'], 1)}}%</span>

              </p>
            </td>
            <td><p>{{$n_to_0n(Math.floor(data1['dailyArcTime']/3600))}} : {{$n_to_0n(data1['dailyWorkTime']%60)}}</p></td>
            <td><p>{{$n_to_0n(data1['dailyWorkHours'])}} : {{$n_to_0n(data1['dailyWorkTime']%60)}}</p></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="tab-panel2" class="tabpanel" role="tabpanel" aria-labelledby="tab2">
        <div class="table_not_scr">
          <table>
            <tbody>
            <tr>
              <th>
                <p>라인</p>
              </th>
              <th>
                <p>전일<em>(불량/검사수)</em></p>
              </th>
              <th>
                <p>월별<em>(불량/검사수)</em></p>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="table_scr">
          <table>
            <tbody>
            <OuterCheckItem :key="i" v-for="(v, i) in outerCheckSort" :v="v"></OuterCheckItem>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bot_table">
      <table>
        <thead>
        <tr>
          <th colspan="3">수동 용접</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="big">
            <em>Total</em>
            <span>{{manual_cnt}}</span>
            <b>기</b>
          </td>
          <td class="big">
            <em>용접 중</em>
            <span>{{manual_arc_cnt}}</span>
            <b>기</b>
          </td>
          <td class="big">
            <em>대기 중</em>
            <span>{{manual_wait_cnt}}</span>
            <b>기</b>
          </td>
        </tr>
        <tr>
          <th>
            <p>아크율</p>
          </th>
          <th>
            <p>용접 시간(h)</p>
          </th>
          <th>
            <p>작업 시간(h)</p>
          </th>
        </tr>
        <tr>
          <td>
            <p>
              <em>월별</em>
              <span>{{$check_undefined_and_to_fixed(data2['monthlyArcRate'], 1)}}%</span>
            </p>
          </td>
          <td><p>{{Math.floor(data2['monthlyArcTime']/3600)}}</p></td>
          <td><p>{{$n_to_0n(Math.floor(data2['monthlyWorkTime']/3600))}}</p></td>
        </tr>
        <tr>
          <td>
            <p>
              <em>금주</em>
              <span>{{$check_undefined_and_to_fixed(data2['weeklyArcRate'], 1)}}%</span>
            </p>
          </td>
          <td><p>{{Math.floor(data2['weeklyArcTime']/3600)}}</p></td>
          <td><p>{{$n_to_0n(Math.floor(data2['weeklyWorkTime']/3600))}}</p></td>
        </tr>
        <tr>
          <td>
            <p>
              <em>전일</em>
              <span>{{$check_undefined_and_to_fixed(data2['dailyArcRate'], 1)}}%</span>
            </p>
          </td>
          <td><p>{{$n_to_0n(Math.floor(data2['dailyArcTime']/3600))}} : {{$n_to_0n(data2['dailyArcTime']%60)}}</p></td>
          <td><p>{{$n_to_0n(data2['dailyWorkHours'])}} : {{$n_to_0n(data2['dailyWorkTime']%60)}}</p></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import Modal from "./Modal";
import $ from "jquery"
import OuterCheckItem from "./OuterCheckItem";
import _ from "lodash"


export default {
  name: "RightTotal",
  components: {OuterCheckItem},
  data() {
    return {
      date:this.$get_date(),
      time:this.$get_time()
    }
  },
  component:{ $, Modal },
  props: {
    data1: Object,
    data2: Object,
    robot_cnt_data: Object,
    manual_cnt: Number,
    manual_arc_cnt: Number,
    manual_wait_cnt: Number,
    outer_check_data: Array
  },
  methods:{
    update_time(){
      this.time = this.$get_time()
      this.date = this.$get_date()
    }
  },
  computed:{
      outerCheckSort : function(){
          return _.orderBy(this.outer_check_data, 'lineCd', 'asc')
      }
  },
  created() {

  },
  mounted() {
    console.log('[RightTotal]eee', this.outer_check_data)
    setInterval(this.update_time, 1000)

    //탭 나누기
    var tab_len = $(".com_tab>li").length;
    $(".com_tab>li").css("width","calc(100% / "+tab_len+")");

    // 맨위로 가기
    $(".btn-gototop").click(function () {
      $('body,html').animate({
        'scrollTop': 0
      }, 300, 'swing', function () {});
    });

    // 탭 설정및 웹접근성반영
    $(".com_tab>li").on("keydown", function (event) {
      event = event || window.event;
      var keycode = event.keyCode || event.which;
      switch (keycode) {
        case 13: // Enter
          // 선택된 탭 활성화
          $(this)
              .addClass("active")
              .attr("aria-selected", "true")
              // 기존 탭 비활성화
              .siblings()
              .removeClass("active")
              .attr("aria-selected", "false");
          // 연관된 탭 패널 활성화
          $("#" + $(this).attr("aria-controls"))
              .addClass("active")
              // 기존 탭 패널 비활성화
              .siblings(".tabpanel")
              .removeClass("active");
          break;
      }
    });

    $(".com_tab li").on("mousedown", function () {
      // 선택된 탭 활성화
      $(this)
          .addClass("active")
          .attr({
            "aria-selected": "true"
          })
          .focus()
          // 기존 탭 비활성화
          .siblings()
          .removeClass("active")
          .attr({
            "aria-selected": "false"
          });
      // 연관된 탭 패널 활성화
      $("#" + $(this).attr("aria-controls"))
          .addClass("active")
          // 기존 탭 패널 비활성화
          .siblings(".tabpanel")
          .removeClass("active");
    });

  }

}
</script>

<style scoped>

.right{width: 450px; padding-top:67px; display: inline-block;vertical-align: top;padding-left: 40px;}
.right .logo{display:block;margin:0 auto;}
.right .date{text-align:center;margin-top: 30px;margin-bottom: 20px; font-size: 20px;}
.right .date em{font-weight: 600;font-size: 24px;vertical-align: middle;margin-top: -6px;display: inline-block;margin-right: 10px; font-family: 'NotoSansKR-Medium';}
.right .date em:nth-of-type(2){margin: 0 13px;}
.right table{border: 2px solid #002f63;text-align: center;height: 204px;}
.right table tbody td.big{border-right:1px solid #002f63;vertical-align: middle;padding: 10px 0;}
.right table tbody tr{border-bottom:1px solid #b7b7b7;}
.right table tbody tr>*{padding: 4px 0;}
.right table th{background:#002f63;color:#fff;}
.right table thead th{font-weight:400;padding:5px 0;}
.right table tbody th p{border-color: #fff;font-weight: 400; color:white;}
.right table tbody p{border-right: 1px solid #707070;margin: 5px 0;line-height: 1; font-size: 16px; font-family: 'Noto Sans KR';}
.right table tbody tr>*:last-child p{border-right: 0;}
.right table em{color: #002f63;font-weight: 600;vertical-align: middle; font-size: 16px;}
.right table tbody td.big span{font-size: 32px;width: 55px;display: inline-block;text-align: right;box-sizing: border-box;vertical-align: middle;line-height: 1;font-weight: 600;}
.right table tbody p{font-weight: 600; color: black; font-size: 16px;}
.right table b{font-weight:400;vertical-align:bottom;}
.right table tbody tr span{vertical-align:middle;display:inline-block;width: calc(100% - 70px);text-align: right; color: black;}
.right .tabpanel_wrap{margin-bottom: 17px;}
.right>.bot_table{overflow: hidden;border-radius: 5px 5px 0 0;border: 2px solid #396277;}
.right>.bot_table table{border:0;}
.right>.bot_table table th{background:#396277;font-size: 18px;}
.right>.bot_table tbody tr:nth-of-type(1) td{border-color:#396277;}
.right>.bot_table em{color:#396277;font-weight: 600; font-size: 16px;}
.right .table_not_scr{}
#tab-panel2 .table_not_scr{border: 2px solid #002f63;}
#tab-panel2 .table_not_scr tr{border: 0px solid #002f63;}
#tab-panel2 .table_not_scr::-webkit-scrollbar{width: 0px;}
#tab-panel2 .table_scr{height:166px; border-left:2px solid #002f63; border-right:2px solid #002f63; border-bottom:2px solid #002f63; overflow-y: scroll;}
#tab-panel2 .table_scr::-webkit-scrollbar{width: 0px;}
#tab-panel2 table{height:auto;border:0;}
#tab-panel2 table th{position: sticky;top: 0;}
#tab-panel2 table th em{color:#fff;font-size: 12px;vertical-align: bottom;}
#tab-panel2 table tbody td em{display: block;text-align: left;padding: 0 15px;font-weight: 600;}
</style>
