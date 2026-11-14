export const roles = [
  {id:'leader',name:'Trưởng nhóm',en:'LEADER',tag:'Giữ nhịp cả team',skill:'Phân công công bằng, giữ tiến độ và đặt ranh giới.',sprite:'leader'},
  {id:'doer',name:'Người triển khai',en:'DOER',tag:'Biến ý tưởng thành bài',skill:'Chủ động thực hiện, báo tiến độ và xin hỗ trợ đúng lúc.',sprite:'doer'},
  {id:'qc',name:'Kiểm soát chất lượng',en:'QC',tag:'Chất lượng là ưu tiên',skill:'Tìm lỗi và góp ý xây dựng bằng mô hình SBI.',sprite:'qc'},
  {id:'mediator',name:'Người hòa giải',en:'MEDIATOR',tag:'Giữ team hòa thuận',skill:'Lắng nghe, hạ nhiệt và kết nối các thành viên.',sprite:'mediator'},
  {id:'follower',name:'Mắt xích tích cực',en:'ACTIVE FOLLOWER',tag:'Không gánh, không làm tạ',skill:'Hỏi rõ yêu cầu, chủ động phản hồi và đúng hẹn.',sprite:'follower'},
];

export const wardrobes = [
  {id:'student_blue',name:'Áo xanh ULIS'},
  {id:'student_pink',name:'Áo hồng'},
  {id:'student_green',name:'Áo xanh lá'},
  {id:'student_yellow',name:'Áo vàng'},
];

export const personas = [
 {id:'turtle',title:'TRƯỞNG NHÓM ÔM VIỆC',desc:'Bạn quan tâm đến cả nhóm, đôi khi nhận quá nhiều việc vì ngại từ chối.',tip:'Thử giao nhiệm vụ rõ ràng và hỏi đồng đội cần hỗ trợ gì.'},
 {id:'star',title:'TRƯỞNG NHÓM TÀI NĂNG',desc:'Bạn có xu hướng lập kế hoạch, chia việc và giữ nhịp cho đội.',tip:'Đừng quên lắng nghe các ý kiến khác.'},
 {id:'sloth',title:'THÀNH VIÊN TRÌ HOÃN',desc:'Bạn thích không khí thoải mái nhưng đôi khi bắt đầu hơi muộn.',tip:'Chia công việc thành những mốc nhỏ và báo tiến độ.'},
 {id:'eagle',title:'NGƯỜI KIỂM SOÁT CẦU TOÀN',desc:'Bạn để ý chi tiết và muốn kết quả tốt nhất.',tip:'Góp ý cụ thể vào sản phẩm, tránh nhận xét về con người.'},
 {id:'owl',title:'NHÀ HÒA GIẢI',desc:'Bạn thường nhìn được nhiều góc độ trong một câu chuyện.',tip:'Giữ sự công bằng và đừng ngại nói điều cần nói.'},
 {id:'bee',title:'THÀNH VIÊN GƯƠNG MẪU',desc:'Bạn ổn định, thường thực hiện đúng những gì đã hứa.',tip:'Chủ động chia sẻ ý tưởng để tạo thêm giá trị.'},
 {id:'ghost',title:'THÀNH VIÊN TÀNG HÌNH',desc:'Bạn có thể ngại phát biểu trước những người chưa quen.',tip:'Bắt đầu bằng một câu xác nhận việc và thời hạn.'},
];

export const quizQuestions = [
 {question:'Nhóm sắp đến hạn mà chưa ai chia việc, bạn thường…',answers:[['Tạo bảng giao việc ngay', 'star'],['Âm thầm làm hết cho chắc', 'turtle'],['Đợi mọi người lên tiếng', 'ghost'],['Rủ cả nhóm họp 10 phút', 'owl']]},
 {question:'Bạn nhận phần khó hơn dự kiến. Bạn sẽ…',answers:[['Hỏi lại và đề xuất chia nhỏ việc', 'bee'],['Nhận hết vì sợ mất lòng', 'turtle'],['Để sát deadline mới làm', 'sloth'],['Kiểm tra yêu cầu từng chi tiết', 'eagle']]},
 {question:'Bạn phát hiện slide của bạn thân có lỗi, bạn…',answers:[['Nêu lỗi cụ thể và gợi ý sửa', 'eagle'],['Nhắn riêng thật khéo', 'owl'],['Tự sửa hết mà không nói', 'turtle'],['Để người khác góp ý', 'ghost']]},
 {question:'Nhóm chat im lặng sau khi Leader nhắn, bạn…',answers:[['Xác nhận phần việc của mình', 'bee'],['Chủ động hỏi cả nhóm', 'star'],['Đọc rồi để đó', 'ghost'],['Gửi lời phá băng trước', 'sloth']]},
 {question:'Nếu cả nhóm tranh cãi gay gắt, bạn sẽ…',answers:[['Tóm tắt quan điểm mỗi bên', 'owl'],['Đề xuất một lịch làm việc mới', 'star'],['Rà soát ai làm sai ở đâu', 'eagle'],['Tránh chat vì sợ căng thẳng', 'ghost']]},
];

export const levels=[
 {id:1,name:'Nhóm Bạn Thân',sub:'Dễ',color:'#54d935',roles:['leader','doer','mediator'],description:'Giữ tình bạn nhưng không quên trách nhiệm.',stages:[
  ['Mải chém gió quên làm bài','Nhóm chat toàn chuyện vui, chưa ai mở outline.'],['Nể bạn không dám phân công','Leader ôm việc vì sợ bạn giận.'],['Tự ái khi bị góp ý','Bạn thân khó chịu khi được nhắc sửa slide.'],['Xin được “gánh” hộ','Thành viên nhờ làm nốt vì mải đi chơi.'],['Quá hiểu nhau thành hiểu lầm','Ai cũng tưởng người khác đã làm phần việc.']]},
 {id:2,name:'Người Lạ Ơi',sub:'Trung bình',color:'#38bcf9',roles:['leader','doer','follower'],description:'Phá băng nhóm mới, làm rõ vai trò và lịch làm.',stages:[
  ['Nhóm chat băng giá','Cả nhóm đã xem nhưng không ai phản hồi.'],['Thành viên tàng hình','Hỏi tiến độ chỉ nhận câu trả lời qua loa.'],['Ai làm trưởng nhóm đây?','Mọi người đùn đẩy vai trò Leader.'],['Bất đồng lịch họp','Một bạn muốn họp ngay, bạn khác muốn đợi.'],['Không tin tưởng nhau','Tự ý sửa hết bài người khác.'],['Lời nhắn quá gắt','Không khí chat ngày càng khó chịu.']]},
 {id:3,name:'Nước Đến Chân Mới Nhảy',sub:'Tăng áp lực',color:'#ffa62b',roles:['leader','doer','qc'],description:'Sửa lỗi, ưu tiên công việc và giữ bình tĩnh khi sát hạn.',stages:[
  ['Slide cẩu thả 22h30','Sai font và sai kiến thức sát giờ nộp.'],['Cãi bướng sát deadline','Doer không muốn chỉnh lỗi QC chỉ ra.'],['File bị lỗi','Không thể mở bài khi còn 15 phút.'],['Mất liên lạc lúc 23h','Người ghép bài bất ngờ “sập nguồn”.'],['Trùng lặp nội dung','Hai phần làm bị trùng 70%.']]},
 {id:4,name:'Trùm Free-rider',sub:'Căng thẳng',color:'#ed655e',roles:['leader','doer','qc','mediator','follower'],description:'Thu thập bằng chứng và xử lý tranh chấp minh bạch.',stages:[
 ['Dọa bóc phốt','Thành viên không làm bài đe dọa đăng phốt.'],['Đóng góp 1%, đòi 100%','Một đường link tài liệu được xem là công sức lớn.'],['Nộp bài đạo văn','Nguy cơ cả nhóm bị điểm 0.'],['Leader độc đoán','Xóa tên thành viên vì bất đồng quan điểm.'],['Đổ lỗi sau điểm kém','Nhóm công kích nhau công khai.'],['Lý do bất tận','Liên tục bùng deadline và viện lý do.']]},
 {id:5,name:'Boss Cuối',sub:'Đỉnh cao',color:'#8b8a98',roles:['leader','doer','qc','mediator','follower'],description:'Kết hợp toàn bộ kỹ năng phối hợp và giải quyết xung đột.',stages:[
  ['Xung đột ba chiều','Leader, QC, Doer tranh cãi liên tục.'],['Chia bè kết phái','Nhóm 5 người tách thành 2 nhóm chat.'],['Đổi đề tài giữa chừng','50% dự án có nguy cơ phải làm lại.'],['Tranh nhau việc dễ','Không ai muốn nhận phần khó.'],['Giảng viên đổi yêu cầu','Ba ngày trước hạn, đề bài thay đổi.']]}];

export const leaderTree={
 start:{messages:[['Minh','Ê tối mai đi trà sữa không?'],['Lan','Đi chứ, quán mới đang giảm giá.'],['Huy','Bài thuyết trình Chủ nhật nộp đúng không? Có ai làm outline chưa?']],prompt:'Là Leader, bạn sẽ nhắn gì?',options:[
  {text:'Thôi mai làm, giờ đi chơi đã.',to:'A',scores:{communication:0,initiative:-2,teamwork:0,conflict:0}},
  {text:'Cả nhóm có định làm bài không?',to:'B',scores:{communication:-2,initiative:1,teamwork:-2,conflict:-1}},
  {text:'Mình chia việc 15 phút trước nhé, xong hẵng đi.',to:'C',scores:{communication:2,initiative:2,teamwork:2,conflict:1}}
 ]},
 A:{messages:[['Minh','Đúng là leader của lòng tôi.'],['Huy','Nhưng mà mình còn chưa có outline ấy…']],prompt:'Huy đang lo lắng. Bạn làm gì?',options:[
  {text:'Đừng lo, mai bắt đầu cũng chưa muộn.',to:'E1',scores:{initiative:-2,teamwork:-1}},
  {text:'Khoan, đổi ý. Chia việc 10 phút trước đi.',to:'E2',scores:{communication:1,initiative:2,teamwork:1}}
 ]},
 B:{messages:[['Lan','Đang nói chuyện thôi mà, sao gắt vậy?'],['Minh','Chưa ai giao việc cho tôi cả.']],prompt:'Lan khó chịu. Bạn xử lý thế nào?',options:[
  {text:'Mình là trưởng nhóm, cứ làm theo đi.',to:'E3',scores:{communication:-2,teamwork:-2,conflict:-2}},
  {text:'Mình hơi nóng, xin lỗi. Mình chia việc nhé?',to:'E4',scores:{communication:2,teamwork:1,conflict:2}}
 ]},
 C:{messages:[['Minh','Ok, nhưng mình chưa biết bắt đầu từ đâu.'],['Lan','Mình làm slide được, nhưng cần nội dung trước.'],['Huy','Tối nay mình bận, mai trưa làm được không?']],prompt:'Mọi người đồng ý. Bước tiếp theo là gì?',options:[
  {text:'Hỏi từng người, chia nhiệm vụ và chốt mốc kiểm tra.',to:'E5',scores:{communication:2,initiative:2,teamwork:2,conflict:1}},
  {text:'Giao đại cho nhanh, phần khó mình tự làm.',to:'E6',scores:{initiative:0,teamwork:-1}}
 ]}
};

export const leaderEndings={
 E1:{name:'Trì hoãn dây chuyền',tone:'bad',message:'Cả nhóm tiếp tục vui vẻ, nhưng đến hôm sau vẫn chưa có outline. Mọi người phải chạy gấp trong 24 giờ cuối.',lesson:'Giữ hòa khí không đồng nghĩa với né trách nhiệm.',template:'Cả nhóm ơi, mình chốt nhanh đầu việc và thời hạn nhé. Mình gửi outline trước 21h để mọi người cùng xem.'},
 E2:{name:'Cứu tiến độ kịp lúc',tone:'good',message:'Bạn nhận ra nguy cơ và đề nghị chia việc ngay. Nhóm hơi bất ngờ nhưng đồng ý vì yêu cầu ngắn gọn.',lesson:'Sửa quyết định kịp thời cũng là một kỹ năng lãnh đạo.',template:'Mình xin đổi kế hoạch một chút: chia việc 10 phút nhé, rồi mình chốt lịch đi chơi sau.'},
 E3:{name:'Nhóm rạn nứt',tone:'bad',message:'Mọi người làm việc miễn cưỡng và ngại báo tiến độ. Không khí trở nên căng thẳng.',lesson:'Mệnh lệnh và trách móc không tự động tạo nên sự hợp tác.',template:'Mình thấy nhóm đang chậm tiến độ và điều đó khiến mình lo. Mình cùng thống nhất phần việc và mốc kiểm tra nhé.'},
 E4:{name:'Hàn gắn và tiến lên',tone:'good',message:'Bạn xin lỗi về cách nói rồi đề nghị giải pháp. Lan bớt khó chịu, Minh đồng ý nhận việc.',lesson:'Nhận trách nhiệm về cách giao tiếp giúp khôi phục niềm tin.',template:'Xin lỗi vì mình vừa nói hơi gắt. Mình đang lo deadline, không có ý trách ai. Cả nhóm chia việc cụ thể nhé?'},
 E5:{name:'Cả nhóm vào guồng',tone:'good',message:'Minh tìm nguồn, Huy lập nội dung, Lan làm slide, bạn ghép bài và kiểm tra theo mốc sớm hơn deadline.',lesson:'Phân công rõ, phù hợp năng lực và có mốc kiểm tra là chìa khóa.',template:'Mình đề xuất Minh tìm tài liệu, Huy soạn nội dung, Lan làm slide và mình kiểm tra tổng thể. Mọi người xác nhận giúp mình trước 20h nhé.'},
 E6:{name:'Leader ôm việc',tone:'mid',message:'Nhóm tưởng đã xong việc, nhưng bạn phải tự xử lý phần khó và sửa lỗi vào phút cuối.',lesson:'Một kế hoạch chỉ hiệu quả khi công việc được chia rõ và khả thi.',template:'Mình đang ôm hơi nhiều việc. Mỗi người giúp mình nhận rõ một đầu việc kèm mốc hoàn thành nhé.'}
};

export const quickScenarios={
  '1:doer':{title:'Là Minh, bạn làm gì?',messages:[['Lan','Tối mai đi trà sữa nhé.'],['Huy','Nhưng bài Chủ nhật ai làm outline?']],choices:[
   {text:'Hỏi rõ phần việc để bắt đầu ngay.',type:'good',answer:'Bạn chủ động nhận nhiệm vụ và hỏi rõ yêu cầu. Nhóm bắt đầu có tiến độ.',lesson:'Không đợi bị nhắc mới là một Doer đáng tin.',template:'Mình nhận phần tìm nguồn nhé. Mình sẽ gửi bản nháp trước 20h mai.'},
   {text:'Đọc rồi để đấy.',type:'bad',answer:'Không ai biết bạn nhận phần gì, nhóm vẫn chưa bắt đầu.',lesson:'Đã xem không phải là xác nhận nhiệm vụ.',template:'Mình đã đọc rồi. Mình có thể đảm nhận phần tài liệu, mọi người thấy ổn không?'}]},
  '1:mediator':{title:'Bạn giúp nhóm bạn thân ra sao?',messages:[['An','Chưa ai làm bài mà toàn rủ đi chơi.'],['Lan','Đừng làm quá lên chứ.']],choices:[
   {text:'Thừa nhận cả hai phía và đề nghị 10 phút chia việc.',type:'good',answer:'Cả nhóm cảm thấy được lắng nghe và đồng ý chia nhiệm vụ.',lesson:'Hòa giải không phải né vấn đề, mà là giúp các bên hợp tác.',template:'Mình hiểu An lo deadline và Lan muốn thoải mái. Mình chia việc nhanh 10 phút rồi đi chơi nhé?'},
   {text:'Bảo mọi người thôi không tranh luận nữa.',type:'mid',answer:'Nhóm im lặng nhưng công việc vẫn chưa được giải quyết.',lesson:'Dập tắt cuộc cãi không đồng nghĩa giải quyết vấn đề.',template:'Mình thống nhất lại điều nhóm đang cần làm nhé.'}]},
  '2:leader':{title:'Nhóm chat vừa thành lập, không ai nói gì',messages:[['An','Mình tạo nhóm rồi, mọi người chọn phần trong file nhé.'],['Hệ thống','Đã xem: 4 thành viên'],['Minh','Mình thấy rồi.']],choices:[
   {text:'Mời từng bạn giới thiệu thế mạnh và chốt lịch 10 phút.',type:'good',answer:'Từng người chủ động giới thiệu và chọn phần phù hợp.',lesson:'Phá băng hiệu quả bằng lời mời cụ thể, không phải lời thúc giục chung chung.',template:'Mọi người cho mình biết thế mạnh và khung giờ rảnh nhé. Mình chốt buổi trao đổi 10 phút tối nay.'},
   {text:'Chờ đến mai xem ai nhắn trước.',type:'bad',answer:'Nhóm tiếp tục im lặng, bỏ lỡ thời gian cần phân công.',lesson:'Sự im lặng ban đầu cần một người mở lời rõ ràng.',template:'Mọi người xác nhận giúp mình đã đọc file nhé?'}]},
  '2:doer':{title:'Bạn mới vào nhóm lạ, Leader gửi file',messages:[['An','Mọi người xem file và chọn việc nhé.'],['Hệ thống','4 người đã xem nhưng chưa phản hồi.']],choices:[
   {text:'Giới thiệu năng lực và đề nghị nhận việc cụ thể.',type:'good',answer:'Leader có đủ thông tin để phân công; người khác cũng bắt đầu trả lời.',lesson:'Một lời xác nhận chủ động có thể thay đổi cả không khí nhóm.',template:'Chào cả nhóm, mình mạnh phần tìm tài liệu và có thể nhận phần này. Mình sẽ gửi trước tối mai nhé.'},
   {text:'Cứ im lặng vì chưa ai quen mình.',type:'bad',answer:'Leader không biết bạn có tham gia hay không.',lesson:'Chủ động một câu ngắn tốt hơn im lặng kéo dài.',template:'Mình đã đọc file. Cho mình hỏi phần nào cần ưu tiên trước ạ?'}]},
  '2:follower':{title:'Là mắt xích tích cực trong nhóm mới',messages:[['An','Mọi người mở file nhé, nhớ làm đúng hạn.'],['Minh','Để xem đã…']],choices:[
   {text:'Xác nhận việc, hỏi đầu ra và mốc bàn giao.',type:'good',answer:'Yêu cầu được làm rõ. Nhóm có một mốc thời gian chung để theo dõi.',lesson:'Xác nhận đúng yêu cầu giúp giảm hiểu nhầm và làm lại.',template:'Mình xác nhận nhận phần slide. Mình cần bao nhiêu trang và gửi bản nháp lúc nào nhé?'},
   {text:'Trả lời “Ok” rồi tự đoán yêu cầu.',type:'mid',answer:'Bạn làm rất chăm nhưng bản nộp sai định dạng nhóm cần.',lesson:'Chủ động hỏi rõ khác với làm việc thụ động.',template:'Mình làm phần này nhé. Bạn gửi giúp tiêu chí và deadline cụ thể được không?'}]}
};

export const reversal = {
 title:'Đảo vai: trở thành Minh',
 messages:[['Minh (suy nghĩ)','Mình chưa biết tìm tài liệu gì. Mọi người nói chuyện vui quá, tự nhiên không dám hỏi...'],['An','Minh ơi, sao chưa thấy phần của cậu?']],
 choices:[
 {text:'Mình đang bí phần này, cậu hướng dẫn thêm được không?',type:'good',answer:'An biết rõ vấn đề, hai người chia lại công việc và cùng lên kế hoạch.',lesson:'Chủ động chia sẻ khó khăn là trách nhiệm, không phải yếu kém.'},
 {text:'Mình vẫn đang làm, cứ để đấy đi.',type:'bad',answer:'An không biết tiến độ thực sự; mâu thuẫn có thể tăng.',lesson:'Giấu khó khăn chỉ khiến đồng đội khó phối hợp hơn.'}
 ]
};

export const mapNPCs = [
  {sprite:'student_yellow', left:17, top:13, pose:'idle', scale:0.78},
  {sprite:'student_pink', left:23, top:13.6, pose:'walk1', scale:0.78},
  {sprite:'student_blue', left:82, top:35.2, pose:'idle', scale:0.78},
  {sprite:'student_green', left:75, top:52.4, pose:'walk1', scale:0.8},
  {sprite:'student_blue', left:81.5, top:56.8, pose:'idle', scale:0.78},
  {sprite:'student_yellow', left:85.8, top:60.6, pose:'walk2', scale:0.78},
  {sprite:'student_pink', left:67, top:67.7, pose:'idle', scale:0.8},
  {sprite:'student_blue', left:29.6, top:73, pose:'walk1', scale:0.8},
  {sprite:'student_green', left:37.8, top:73.7, pose:'idle', scale:0.78},
  {sprite:'student_yellow', left:62.5, top:82.1, pose:'walk2', scale:0.8},
  {sprite:'leader', left:14, top:88, pose:'talk', scale:1.5},
];
