function back_allmap() { //상단 '울산공장' 클릭시 전체맵으로 이동

	$("#btn_back_allmap").on('click', function() { 
		$(".depth_factories_page").hide('slow');
		$(".depth_allmap_page").show('slow');
		hide_open_menu_slide();
	});

}

function facto_overout() { // 해당 공장개체 & 하단 탭별 마우스 오버/아웃 처리
	$(".facto_area_dot, .facto_area_err_dot, .choice_facto_tab, .choice_facto_err_tab").each(function(index,item) { 
		$(this).mouseover(function() { 
			var btn_area_id = $(this).data('btn_area_id');
			var type = $(this).data('facto_type');
			
			if(type == 'error') { 
				$("#"+btn_area_id+" img").attr('src', './img/factories_page/facto_err_icon_over.png'); //도면위 점역 색상 전환
				$("#"+btn_area_id+"_tab").css('background', 'transparent url("./img/factories_page/factories_err_over.png") 0% 0% no-repeat padding-box'); //하단 탭영역 색상 전환
			} else {
				$("#"+btn_area_id+" img").attr('src', './img/factories_page/facto_icon_over.png'); //도면위 점역 색상 전환
				$("#"+btn_area_id+"_tab").css('background', 'transparent url("./img/factories_page/factories_over.png") 0% 0% no-repeat padding-box'); //하단 탭영역 색상 전환
			}
		}).mouseout(function() { 
			var btn_area_id = $(this).data('btn_area_id');
			var type = $(this).data('facto_type'); 

			if(type == 'error') { 
				$("#"+btn_area_id+" img").attr('src', './img/factories_page/facto_err_icon.png'); //도면위 점역 색상 전환
				$("#"+btn_area_id+"_tab").css('background', 'transparent url("./img/factories_page/factories_err_default.png") 0% 0% no-repeat padding-box'); //하단 탭영역 색상 전환
			} else {
				$("#"+btn_area_id+" img").attr('src', './img/factories_page/facto_icon.png'); //도면위 점역 색상 전환
				$("#"+btn_area_id+"_tab").css('background', 'transparent url("./img/factories_page/factories_default.png") 0% 0% no-repeat padding-box'); //하단 탭영역 색상 전환
			}
		});
	});
}

function factories_arc_status2() { // 해당 라인 전체 Total 용접 수 / 상태 호출, 화면 구성 처리

	var total_arc_cnt = 0; //Total 용접기 수
	var arc_cnt = 0; //용접중인 수
	var wait_cnt = 0; //용접대기 수
	var off_cnt = 0; //용접전원 off 수
	var arc_status_arr = new Array();

	$.ajax({
		url:'http://localhost:49018/api/config/devices',
		type:'GET',
		data:{'factory':'F100', 'line':'F1L100'},
		dataType:'json',
		success: function(data) { 
			arc_status_arr = data['data'];
			total_arc_cnt = arc_status_arr.length;
			
			$.each(arc_status_arr, function(index, item) { 
				if(item['packetState'] > 0) { // 전원이 켜져있는 경우
					if(item['arcState'] == true) { // 용접중인 경우
						arc_cnt++;
					} else { // 용접안하는 경우
						wait_cnt++;
					}
				} else { // 전원이 꺼져있는 경우
					off_cnt++;
				}
			});

			$("#total_arc_cnt2").text(number_comma(total_arc_cnt));
			$("#arc_cnt2").text(number_comma(arc_cnt));
			$("#wait_cnt2").text(number_comma(wait_cnt));	// 각 영여에 데이터 표시

		}, 
		error: function(err) { 
			alert("공장 전체 Total 용접수/상태 정보 호출에 실패하였습니다.");
		}
	});
}

function factories_lines_arc2() { // 해당 공장라인 전체 현황(아크율, 시간) 호출

	var data_arr = new Array();
	var lines_arc_arr = new Array();

	factories_arc_status2(); // 해당 라인 용접수 호출

	//우측 라인정보의 월, 주, 일 현황(아크율, 작업/용접시간) 호출
	$.ajax({
		url:'http://localhost:49018/api/statistic/arc/factories/:factory/lines/arcrate',
		type:'GET',
		data:{}, //factoryCd, lineCd 넘기면 해당 라인에 대한 정보만 호출가능
		dataType:'json',
		success: function(data) { 
			data_arr = data['data'];
			$.each(data_arr,function (index, item) { 
				if(item['lineCd'] == "F1L100") { 
					lines_arc_arr = item;
				}
			});
			
			$("#month_arcrate_per2").text(lines_arc_arr['monthlyArcRate'].toFixed(1)+"%");
			$("#week_arcrate_per2").text(lines_arc_arr['weeklyArcRate'].toFixed(1)+"%");
			$("#day_arcrate_per2").text(lines_arc_arr['dailyArcRate'].toFixed(1)+"%");

			$("#month_arcrate_time2").text(number_comma(arc_hour(lines_arc_arr['monthlyArcTime'])));
			$("#week_arcrate_time2").text(number_comma(arc_hour(lines_arc_arr['weeklyArcTime'])));
			$("#day_arcrate_time2").text(number_comma(arc_hour(lines_arc_arr['dailyArcTime'])));

			$("#month_work_time2").text(number_comma(lines_arc_arr['monthlyWorkHours']));
			$("#week_work_time2").text(number_comma(lines_arc_arr['weeklyWorkHours']));
			$("#day_work_time2").text(number_comma(lines_arc_arr['dailyWorkHours']));	// 각 영여에 데이터 표시
			
		}, 
		error: function(err) { 
			alert("해당 라인의 전체 아크율/작업시간 호출에 실패하였습니다.");
		}
	});

	//우측 라인정보의 실시간 현황(아크율, 작업/용접시간) 호출
	$.ajax({
		url:'http://localhost:49018/api/statistic/arc/factories/:factory/lines/arcrate/realtime',
		type:'GET',
		data:{}, //factoryCd, lineCd 넘기면 해당 라인에 대한 정보만 호출가능
		dataType:'json',
		success: function(data) { 
			data_arr = data['data'];
			$.each(data_arr,function (index, item) { 
				if(item['lineCd'] == "F1L100") { 
					lines_arc_arr = item;
				}
			});
			
			$("#real_arcrate_per2").text(lines_arc_arr['arcRate'].toFixed(1)+"%");

			$("#real_arcrate_time2").text(number_comma(arc_hour(lines_arc_arr['arcTime'])));

			$("#real_work_time2").text(number_comma(lines_arc_arr['workHours']));	// 각 영여에 데이터 표시
			
		}, 
		error: function(err) { 
			alert("해당 라인의 실시간 아크율/작업시간 호출에 실패하였습니다.");
		}
	});
}

function facto_open_pop() { // 해당 용접기의 상세현황 팝업 호출
	$(".facto_area_dot, .facto_area_err_dot, .choice_facto_tab, .choice_facto_err_tab").each(function(index,item) { 
		$(this).on('click', function () { 
			open_pop();
		});
	});
}

function facto_realtime_chart() {
	var myChart = echarts.init(document.getElementById('facto_real_chart'));

		//chart의 설정을 정합니다.
		var option = {
			title: {
				text: '수익 비율 확인',
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
				data:['전류(A)', '전압(V)', '피딩속도(m/min)']
			},
			dataZoom: {
				show: false,
				start: 0,
				end: 100
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: true,
					data: (function (){
						var now = new Date();
						var res = [];
						var len = 20;
						while (len--) {
							res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
							now = new Date(now - 2000);
						}
						return res;
					})()
				},
			],
			yAxis: [
				{
					type: 'value',
					scale: true,
					name: '전류(A)',
					max: 30,
					min: 0,
					boundaryGap: [0.2, 0.2],
					axisLabel: {
						formatter: '{value}'
					},
				},
				{
					type: 'value',
					scale: true,
					name: '전압(V)',
					max: 1200,
					min: 0,
					boundaryGap: [0.2, 0.2]
				},
				{
					type: 'value',
					scale: true,
					name: '피딩속도(m/min)',
					max: 1200,
					min: 0,
					boundaryGap: [0.2, 0.2]
				}
			],
			series: [
				{
					name: '전류(A)',
					type: 'line',
					lineStyle:{
						color:'#2A265C' //line차트 색상 변경
					},
					smooth: true, //부드러운 line 표현
					yAxisIndex: 0, //yAxis 1번째 사용
					data: (function (){
						var res = [];
						var len = 0;
						while (len < 20) {
							res.push((Math.random()*10 + 5).toFixed(1) - 0); //랜덤 데이터 생성
							len++;
						}
						return res;
					})()
				},
				{
					name: '전압(V)',
					type: 'line',
					yAxisIndex: 1, //yAxis 2번째 사용
					itemStyle:{
						color:'#ff0000' //bar 색상 변경
					},
					data: (function (){
						var res = [];
						var len = 20;
						while (len--) {
							res.push(Math.round(Math.random() * 1000)); //랜덤 데이터 생성
						}
						return res;
					})()
				},
				{
					name: '피딩속도(m/min)',
					type: 'line',
					yAxisIndex: 1, //yAxis 2번째 사용
					itemStyle:{
						color:'blue' //bar 색상 변경
					},
					data: (function (){
						var res = [];
						var len = 20;
						while (len--) {
							res.push(Math.round(Math.random() * 1000)); //랜덤 데이터 생성
						}
						return res;
					})()
				},
			]
		};

		// 위에서 설정한 속성을 차트에 반영합니다.
		myChart.setOption(option);

		//데이터를 생성하고 삭제합니다.
		setInterval(function (){
			//x축에 실시간 데이터 생성
			var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

			var data0 = option.series[0].data; //순수익 데이터
			var data1 = option.series[1].data; //총 수익 데이터
			var data2 = option.series[2].data;

			//데이터의 가장 왼쪽 값을 제거
			data0.shift();
			//데이터의 가장 오른쪽 값을 추가
			data0.push(Math.round(Math.random() * 1000));
			data1.shift();
			data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
			data2.shift();
			data2.push(Math.round(Math.random() * 1000));
			//x축에 시간 데이터 추가
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);

			//차트에 반영
			myChart.setOption(option);
		}, 2100);
}

function factories_script() { // 초기 스크립트 실행
	back_allmap();
	facto_overout();
	facto_open_pop();
	//facto_realtime_chart();
	factories_lines_arc2();
}