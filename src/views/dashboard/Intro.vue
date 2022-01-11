<template>
  <div id="dash_wrap">
    <!--전체 영역-->
    <div id="open_map_menu"></div>
    <!--공장 메뉴 열기버튼-->
    <div id="map_menu">
      <!--//공장메뉴 영역-->
      <div id="close_map_menu"></div>
      <!--메뉴 닫기버튼-->
      <div class="menu_title">울산 공장</div>
      <!--메뉴 타이틀-->
      <div class="menu_area">
        <!--메뉴 항목영역-->
      </div>
    </div>
    <!--공장 메뉴영역//-->
    <div class="depth_world_page"><!--//월드맵 영역-->
      <!--첫 페이지 로드시 world페이지 로드-->
      <vue-scroll>
      <div class="world_page">
        <div class="world_page_logo"></div>
        <!-- HiWelD 로고 -->
        <div class="world_page_map"></div>
        <!-- map영역 -->
        <div class="world_page_india"></div>
        <!-- india영역 Over&Click 비활성화 -->
        <div class="world_page_brazil"></div>
        <!-- brazil영역 Over&Click 비활성화 -->
        <div class="world_page_china"></div>
        <!-- china영역 Over&Click 비활성화 -->
        <div class="world_page_korea">
          <div class="korea_line"></div>
         <!-- <router-link :to="{name:'dashboard', params:{}}"></router-link> -->
            <div class="btn_korea_img" @click="click_korea"></div>
          <div class="korea_title"></div>
        </div>
        <!-- korea영역 OVer&Click 활성화 -->
      </div>
      </vue-scroll>
      <div class="footer_padding"></div>
      <!-- iframe여백 채움 -->

    </div>
    <!--월드맵 영역//-->
    <div class="depth_allmap_page"><!--//공장전체 맵페이지-->
      <!--Korea영역 클릭시 기존 world페이지 allmaphide처리 & 페이지 로드-->
    </div><!--공장전체 맵페이지//-->

    <div class="depth_factories_page"><!--//공장 상세페이지-->
      <!--공장전체맵 페이지에서 해당 공장영역 클릭시 페이지 로드-->
    </div><!--공장 상세페이지//-->

  </div>
  <!--index//-->
</template>

<script>
import {EventBus} from "../../event-bus";

export default {
  name: "Intro",
  //components:{Dashboard}
  methods:{
    click_korea(){
      EventBus.$emit('click_korea', false)
    }
  }
}
</script>

<style scoped>
/*@charset "utf-8";*/

/*@import url('font.css'); /* 폰트 설정 */

/* 초기화 */
html {}
body {margin:0;padding:0;}
html, h1, h2, h3, h4, h5, h6, form, fieldset, img {margin:0;padding:0;border:0}
h1, h2, h3, h4, h5, h6 {font-size:1em;}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display:block}

ul, dl,dt,dd {margin:0;padding:0;list-style:none}
input[type="submit"]{cursor:pointer}
button {cursor:pointer}
hr {display:none}
a {color:#000;text-decoration:none}

*, :after, :before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.txt_align_l { text-align:left; }
.txt_align_r { text-align:right; }
.txt_align_c { text-align:center; }

.margin_t75 { margin-top:75px; }
.margin_t22 { margin-top:22px; }
.margin_r10 { margin-right:10px; }
.margin_r60 { margin-right:60px; }

.margin_l20 { margin-left:20px; }

.footer_padding {height:0px; width:100%; background-color:#00041F;}

.cursor_p { cursor:pointer; }

/* 전체 페이지 */
#dash_wrap { width:100%; height:100%;  position:relative; margin:0; padding:0; z-index:1; }

/* 월드맵 */
#dash_wrap .depth_world_page {max-width: 1920px; max-height: 1280px; width:100%; height:100%; position:relative; z-index:2; }
#dash_wrap .depth_world_page .world_page {padding:15px; margin:0 auto; position:relative; z-index:2; ;width:1920px; height:1280px; background: transparent linear-gradient(180deg, #14143A 0%, #00041F 100%) 0% 0% no-repeat padding-box; opacity: 1; }
#dash_wrap .depth_world_page .world_page_logo { position:absolute; z-index:2; top: 49px; left: 758px; width: 405px; height: 96px; background: transparent url('../../../public/images/world_page/hi_weld_logo_x2.png') 0% 0% no-repeat padding-box; opacity: 1; }
#dash_wrap .depth_world_page .world_page_map { position:absolute; z-index:2; top: 197px; left: 520px; width: 880px; height: 480px; background: transparent url('../../../public/images/world_page/world_map@2x.png') 0% 0% no-repeat padding-box; opacity: 1; }
#dash_wrap .depth_world_page .world_page_india { position:absolute; z-index:3; top: 207px; left: 277px; width: 823px; height: 242px; background: transparent url('../../../public/images/world_page/india.png') 0% 0% no-repeat padding-box; opacity: 1;}
#dash_wrap .depth_world_page .world_page_brazil { position:absolute; z-index:3; top: 514px; left: 334px; width: 486px; height: 225px; background: transparent url('../../../public/images/world_page/brazil.png') 0% 0% no-repeat padding-box; opacity: 1;}
#dash_wrap .depth_world_page .world_page_china { position:absolute; z-index:3; top: 433px; left: 1228px; width: 649px; height: 347px; background: transparent url('../../../public/images/world_page/china.png') 0% 0% no-repeat padding-box; opacity: 1;}
#dash_wrap .depth_world_page .world_page_korea { position:absolute; z-index:3; }
#dash_wrap .depth_world_page .world_page_korea .korea_line {position:absolute; top: 318px; left: 1247px; width: 358px; height: 86px; background: transparent url('../../../public/images/world_page/korea_line.png') 0% 0% no-repeat padding-box; opacity: 1;}
#dash_wrap .depth_world_page .world_page_korea .btn_korea_img { cursor:pointer; position:absolute; top: 219px; left: 1462px; width: 198px; height: 198px; background: transparent url('../../../public/images/world_page/Korea_bt_default.png') 0% 0% no-repeat padding-box; opacity: 1;}
#dash_wrap .depth_world_page .world_page_korea .btn_korea_img:hover { cursor:pointer; background: transparent url('../../../public/images/world_page/Korea_bt_over.png') 0% 0% no-repeat padding-box;} /* Korea이미지 마우스오버시 처리 */
#dash_wrap .depth_world_page .world_page_korea .korea_title { position:absolute; top: 442px; left: 1500px; width: 303px; height: 57px; background: transparent url('../../../public/images/world_page/korea_logo.png') 0% 0% no-repeat padding-box; opacity: 1;}

/* 좌측 공장메뉴 */
#map_menu { display:none; position:absolute; top:0; left:-274px; z-index:5; width:274px; height:804px; background:#2B2F31 0% 0% no-repeat padding-box; opacity: 1; padding:100px 24px; }
#open_map_menu { cursor:pointer; position:absolute; z-index:3; top: 21px; left: 20px; width: 30px; height: 24px;/* background: transparent url('../img/allmap_page/open_map_menu_default.png') 0% 0% no-repeat padding-box;*/ opacity: 1; }
#open_map_menu:hover { /*background: transparent url('../img/allmap_page/open_map_menu_over.png') 0% 0% no-repeat padding-box;*/ }

#close_map_menu { cursor:pointer; position:absolute; z-index:5; top: 24px; left: 236px; width: 18px; height: 18px;/* background: transparent url('../img/allmap_page/close_map_menu_default.png') 0% 0% no-repeat padding-box;*/ opacity: 1; }
#close_map_menu:hover { /*background: transparent url('../img/allmap_page/close_map_menu_over.png') 0% 0% no-repeat padding-box;*/ }

#map_menu .menu_title { font-size:26px; font-family:'HYUNDAI-Medium'; margin:0 auto; text-align:center; color:#fff; letter-spacing:0; opacity:1; }
#map_menu .menu_area { position:relative; margin:37.5px 0 0 0; padding:0;}
#map_menu .memu_area ul { list-style:none; margin:0; padding:0; }
#map_menu .menu_area li { cursor:pointer; font-size:20px; font-family:'NotoSansKR-Bold'; color:#fff; letter-spacing:0; opacity:1; text-align:left; border-top:1px solid #4a4a4b; padding:14.5px 0 14.5px 30px; }
#map_menu .menu_area li:hover { color:#FABE00; }
#map_menu .menu_area li:last-child { border-bottom:1px solid #4a4a4b; }

/* 공장전체맵 좌측 */
#dash_wrap .depth_allmap_page { width:100%; height:100%; position:relative; z-index:2; }
#dash_wrap .depth_allmap_page .allmap_page { margin:0; padding:0; position:relative; z-index:2; width: 100%; height: 804px; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap { float:left; width:1433px; height:804px; margin:0; padding:0; }
#dash_wrap .depth_allmap_page .allmap_page .right_allmap_wrap { float:right; width:487px; height:804px; margin:0; padding:25px 30px;/* background: transparent url('../img/allmap_page/allmap_status.png') 0% 0% no-repeat padding-box;*/ opacity: 1; }

#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap div { position:relative; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_bg { width:1433px; height:641px; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_bg .allmap_bg_area { margin:0 auto; padding:0; text-align:center; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_title { font-size:32px; font-family:'NotoSansKR-Bold'; color:#014085; padding:29px 0 0 0; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_bg_location { margin:35px 0 0 0; height:512px;/* background: transparent url('../img/allmap_page/ulsan_totalmap_base.jpg') 0% 0% no-repeat padding-box; background-position: center;*/ opacity: 1; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_bg_location > img { overflow: visible; }

#btn_area_nm {position:absolute !important; top:0; left:0; }
#btn_area_nm .btn_area_nm { position:absolute; width:200px; height:30px; font-size:20px; font-family:'NotoSansKR-Bold'; color:#fff; }

#btn_area { cursor:pointer; position:absolute !important; top:0; left:0; pointer-events: none; }
#btn_area .btn_area {position:absolute; display:none;}
#btn_area .btn_area > img {overflow: visible; mix-blend-mode: hard-light;}
#btn_area .btn_area .btn_area_nm_over { position:absolute; top:23px; left:50px; font-size:20px; font-family:'NotoSansKR-Bold'; color:#000; }

#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_status_tab { width:1433px; height:163px; margin:0 auto; padding:23px 17px 23px 18px; }
#dash_wrap .depth_allmap_page .allmap_page .left_allmap_wrap .allmap_status_tab div { display:inline-block; height:116px; }

.arrow_tab { cursor:pointer; width:44px; height:116px; background: #707070 0% 0% no-repeat padding-box; border-radius: 5px; opacity: 0.5; }
.arrow_tab:hover { opacity: 1; }

.allmap_arcrate_tab { position:relative;}
.arcrate_cate { vertical-align:top; width:68px; height:116px; margin:0; padding:0; /*background: transparent url('../img/allmap_page/arcrate_cate.png') 0% 0% no-repeat padding-box;*/ opacity: 1; color:#fff; }
.arcrate_cate ul { list-style:none; margin:0; padding:0;}
.arcrate_cate li { padding:0; text-align:center; line-height:29px; font-size:18px; font-family:'NotoSansKR-Regular'; }

.arcrate_status { position:relative; width:1224px; }
.arcrate_status div { position:absolute !important; vertical-align:top; top:0; left:0; }
.arcrate_status div ul { cursor:pointer; display:inline-block; width:148px; height:116px; list-style:none; margin:0; padding:0; /*background: transparent url('../img/allmap_page/arcrate_status_box.png') 0% 0% no-repeat padding-box; */opacity: 1;}
.arcrate_status div ul li { margin:0; padding:0; text-align:center; line-height:29px; font-size:22px; font-family:'BarlowCondensed-Medium'; color:#000; }
.arcrate_status div ul li:first-child {font-size:16px; font-family:'NotoSansKR-Bold'; color:#fff; }

/* 공장전체맵 우측 */
.allmap_logo { margin:0 auto; padding-top:38px; width:270px; }
.allmap_logo img { width:270px; height:64px; opacity: 1; }

.now_date_area { position:relative; margin:36px auto 24px auto; text-align:center; }
.now_date_area span { display:inline-block; }
.now_date_area span:first-child {width:46px; margin-right:12px;}
.now_date_area span:nth-child(2) { width: 111px; margin-right:4px;}
.now_date_area span:nth-child(3) { width:75px; margin-right:2px;}
.now_date_area span:nth-child(4) { width: 93px;}
.now_date_area .now_date_title { font-size:26px; font-family:'BarlowCondensed-Medium'; }
.now_date_area .now_date_val { font-size:26px; font-family:'BarlowCondensed-Light'; }

.total_facto_status { width:427px; height:121px; font-size:0; }
.total_facto_status ul:first-child { width:427px; list-style:none; margin:0; padding:0; border-radius: 5px 5px 0px 0px; background: #002F63 0% 0% no-repeat padding-box; opacity: 1; color:#fff;  }
.total_facto_status ul:first-child li { width: 142px; height:56px; display:inline-block; font-size:20px; font-family:'NotoSansKR-Bold'; text-align:center; vertical-align:middle; line-height:56px; margin-right:-4px; }
.total_facto_status ul:last-child { width:427px; list-style:none; margin:0; padding:0; border: 2px solid #002F63; border-radius: 0px 0px 5px 5px; background: #FEFEFE 0% 0% no-repeat padding-box; opacity: 1; color:#000; }
.total_facto_status ul:last-child li { width: 142px; height:65px; display:inline-block; font-size:15px; font-family:'NotoSansKR-Regular'; text-align:center; vertical-align:middle; line-height:56px; margin-right:-4px; }
.total_facto_status ul:last-child li span { font-size:38px; font-family:'BarlowCondensed-SemiBold'; }

.facto_arcrate_status { margin-top:24px; width:427px; font-size:0; }
.facto_arcrate_status ul { display:inline-block; list-style:none; margin:0; padding:0; font-size:0; }
.facto_arcrate_status .facto_arcrate_per { margin-right:20px; width:153px; height:215px; border: 2px solid #002F63; border-radius: 5px; opacity: 1}
.facto_arcrate_status .facto_arcrate_time { width:254px; height:215px; border: 2px solid #002F63; border-radius: 5px; opacity: 1}

.arcrate_title {height:56px; background: #002F63 0% 0% no-repeat padding-box; opacity: 1; color:#fff; font-size:20px; font-family:'NotoSansKR-Bold'; text-align:center; line-height:56px;}
.arcrate_title span { margin:0 8px; }
.title_line { vertical-align:middle; }
.row_line { vertical-align:middle; padding:0 0 18px 3px; }

.arcrate_per_cate { width:60px; height:31px; color:#002f63; font-size:20px; font-family:'NotoSansKR-Bold'; vertical-align:top; margin-top:1px; }
.arcrate_per_val { color:#000; font-size:28px; font-family:'BarlowCondensed-Medium';}
.facto_arcrate_status .facto_arcrate_per_li { height:50px; line-height:50px; margin:0 6px; border-bottom:1px solid #B7B7B7; }
.facto_arcrate_status .facto_arcrate_per_li:last-child { border-bottom:0; }

.facto_arcrate_status .per_li span { display:inline-block; }
.facto_arcrate_status .per_li span:first-child { width: 60px; height:49px; padding:0 2px; text-align:center; }
.facto_arcrate_status .per_li span:last-child { width: 75px; height:50px; padding:0 10px 0 12px; }
.time_li span { display:inline-block; width:114px; text-align:center; }

.facto_category {} /* 추후 코딩 대비*/
.facto_category img { width:427px; height:124px; }

/* 공장 상세페이지 좌측 */
#dash_wrap .depth_factories_page { width:100%; height:100%; position:relative; z-index:2; }
#dash_wrap .depth_factories_page .factories_page { margin:0; padding:0; position:relative; z-index:2; width: 100%; height: 804px; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap { float:left; width:1433px; height:804px; margin:0; padding:0; }
#dash_wrap .depth_factories_page .factories_page .right_allmap_wrap { float:right; width:487px; height:804px; margin:0; padding:25px 30px;/* background: transparent url('../img/allmap_page/allmap_status.png') 0% 0% no-repeat padding-box;*/ opacity: 1; }

#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap div { position:relative; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_bg { width:1433px; height:624px; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_bg .allmap_bg_area { margin:0 auto; padding:0; text-align:center; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_title { font-size:32px; font-family:'NotoSansKR-Bold'; color:#014085; padding:29px 0 0 0; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_bg_location { margin:35px 0 0 0; height:501px;/* background: transparent url('../img/allmap_page/ulsan_totalmap_base.jpg') 0% 0% no-repeat padding-box; background-position: center;*/ opacity: 1; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_bg .allmap_bg_area .allmap_bg_location > img { overflow: visible; }

#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_status_tab { width:1433px; height:180px; margin:0 auto; padding:0px 17px 23px 18px; }
#dash_wrap .depth_factories_page .factories_page .left_allmap_wrap .allmap_status_tab div { display:inline-block; height:116px; }

#facto_area { position:absolute !important; z-index:3; top:0; left:0; }
#facto_area .facto_area_dot, .facto_area_err_dot { cursor:pointer; position:absolute !important; }

#facto_pro_area { position:absolute !important; z-index:2; top:0; left:0 }
#facto_pro_area .facto_pro_img { position:absolute !important; }

/* 공장 상세페이지 우측 */
.facto_area_status { margin-top:24px; width:427px; font-size:0; }
.facto_area_status ul { display:inline-block; list-style:none; margin:0; padding:0; font-size:0; }
.facto_area_status .facto_arcrate_per { margin-right:20px; width:153px; height:268px; border: 2px solid #002F63; border-radius: 5px; opacity: 1}
.facto_area_status .facto_arcrate_time { width:254px; height:268px; border: 2px solid #002F63; border-radius: 5px; opacity: 1}

.facto_area_status .facto_arcrate_per_li { height:50px; line-height:50px; margin:0 6px; border-bottom:1px solid #B7B7B7; }
.facto_area_status .facto_arcrate_per_li:last-child { border-bottom:0; }

.facto_area_status .per_li span { display:inline-block; }
.facto_area_status .per_li span:first-child { width: 60px; height:49px; padding:0 2px; text-align:center; }
.facto_area_status .per_li span:last-child { width: 75px; height:50px; padding:0 10px 0 12px; }

.arcrate_status2 { position:relative; width:1050px; }
.arcrate_status2 div { position:absolute !important; vertical-align:top; top:0; left:0; }
.arcrate_status2 div ul { cursor:pointer; display:inline-block; width:170px; height:159px; list-style:none; margin:0; opacity: 1; font-size:0; }
/*
.choice_facto_tab { background: transparent url('../img/factories_page/factories_default.png') 0% 0% no-repeat padding-box; opacity: 1; }
.choice_facto_err_tab { background: transparent url('../img/factories_page/factories_err_default.png') 0% 0% no-repeat padding-box; opacity: 1; }
*/
.arrow_tab2 { cursor:pointer; width:44px; height:116px; background: #707070 0% 0% no-repeat padding-box; border-radius: 5px; opacity: 0.5; vertical-align:middle; margin-bottom:24px; }
.arrow_tab2:hover { opacity: 1; }

.facto_status_icon1 {width:16px; height:16px;background: #FFC200 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon2 {width:16px; height:16px;background: #A400E9 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon3 {width:16px; height:16px;background: #2ED400 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon4 {width:16px; height:16px;background: #FFFFFF 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon5 {width:16px; height:16px;background: #939393 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon6 {width:16px; height:16px;background: #0090FF 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}
.facto_status_icon7 {width:16px; height:16px;background: #FF2B2B 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:10px;}

.facto_status_icon1_2x {width:28px; height:28px;background: #FFC200 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon2_2x {width:28px; height:28px;background: #A400E9 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon3_2x {width:28px; height:28px;background: #2ED400 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon4_2x {width:28px; height:28px;background: #FFFFFF 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon5_2x {width:28px; height:28px;background: #939393 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon6_2x {width:28px; height:28px;background: #0090FF 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}
.facto_status_icon7_2x {width:28px; height:28px;background: #FF2B2B 0% 0% no-repeat padding-box; opacity: 1; display:inline-block; float:right; margin-top:7px; border-radius:20px;}

.facto_tab_top1 { font-size:20px; font-family:'NotoSansKR-Bold'; color:#fff; padding:6px 13px 0 13px; }
.facto_tab_top2 { font-size:20px; font-family:'NotoSansKR-Regular'; color:#fff; padding:0px 13px; }
.facto_tab_bottom1 { font-size:18px; font-family:'NotoSansKR-Bold'; color:#000; padding:20px 0 0 0; margin-left:2px; width:82px; display: inline-block; text-align:center; }
.facto_tab_bottom2 { font-size:22px; font-family:'BarlowCondensed-Medium'; color:#000; padding:6px 0 0 0; margin-left:2px; width:82px; display:inline-block; text-align:center; }

.facto_minimap { position:absolute !important; top:14px; left:1210px; width:188px !important; height:142px !important; }
.facto_minimap p { font-size: 16px; font-family:'NotoSansKR-Bold'; text-align:center; margin:10px 0;}
.facto_minimap img {width:188px; height:98px; text-align:center;}

/* 레이어팝업 */
#back_mask { display:none; position:absolute; top:0; left:0; z-index:9; background-color:#000; opacity:0.8; width:1433px; height:804px; }

#facto_pop .facti_pop_area { position:relative; padding:35px 40px; }

.pop_title { position:relative; font-size:22px; font-family:'NotoSansKR-Medium'; color:#fff; }



.facto_info1, .facto_info2 { display:inline-block; font-size:0; overflow:hidden; }
.facto_info1 { width: 432px; height:451px; margin:50px 0 0 22px;}
.facto_info2 { width:672px; height:451px; margin-left:20px;}

.facto_pro_view { text-align:center; position:relative; }
.facto_pro_view img { width:432px; height:180px; }
.facto_icon_txt { font-size:22px; font-family:'NotoSansKR-Regular'; }

.facto_status_view { text-align:center; position:absolute; top:160px; left:38px; }
.facto_status_view ul {list-style:none; margin:0; padding:0; }
.facto_status_view li {display:inline-block; line-height:38px; vertical-align:top; }

.facto_pro_volt { position:absolute; top:386px; left:176px;}
.facto_pro_volt ul {list-style:none; margin:0; padding:0; line-height:50px; }
.facto_pro_volt li { display: inline-block; width:92px; font-size:30px; font-family:'NotoSansKR-Medium'; text-align:center; }
</style>