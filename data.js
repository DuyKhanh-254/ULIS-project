export const charTypes = [
  {id: 'boy', name: 'Nam Sinh', en: 'BOY', desc: 'Nhiệt huyết, năng động, phong thái đĩnh đạc', sprite: 'leader'},
  {id: 'girl', name: 'Nữ Sinh', en: 'GIRL', desc: 'Chu đáo, tinh tế, hòa đồng và khéo léo', sprite: 'girl'},
  {id: 'cat', name: 'Bé Mèo Cute', en: 'CAT', desc: 'Đáng yêu, nhanh nhẹn, tò mò và sáng tạo', sprite: 'cat'},
  {id: 'rabbit', name: 'Bé Thỏ Bông', en: 'RABBIT', desc: 'Hiền lành, lắng nghe tốt và cẩn thận', sprite: 'rabbit'},
  {id: 'bear', name: 'Bé Gấu Nâu', en: 'BEAR', desc: 'Điềm tĩnh, ấm áp, vững chãi và đáng tin', sprite: 'bear'},
  {id: 'frog', name: 'Bé Ếch Xanh', en: 'FROG', desc: 'Vui vẻ, lạc quan, tràn đầy năng lượng tích cực', sprite: 'frog'}
];

export const allOutfits = [
  {id: 'vnu', name: 'VNU Cơ Bản', cost: 0, school: 'VNU', desc: 'Đồng phục cơ bản ĐHQGHN (Sở hữu mặc định)', free: true},
  {id: 'ulis', name: 'ULIS Xanh Navy', cost: 50, school: 'ULIS', desc: 'Áo polo xanh đậm phong cách Ngoại ngữ ULIS'},
  {id: 'uet', name: 'UET Công Nghệ', cost: 50, school: 'UET', desc: 'Áo trắng phối xanh năng động Công nghệ UET'},
  {id: 'ueb', name: 'UEB Đỏ Đô', cost: 50, school: 'UEB', desc: 'Áo polo đỏ đô lịch lãm Kinh tế UEB'},
  {id: 'sis', name: 'SIS Liên Ngành', cost: 50, school: 'SIS', desc: 'Xanh navy phối vàng Khoa học liên ngành SIS'},
  {id: 'christmas', name: 'Giáng Sinh Ấm', cost: 100, school: 'SEASON', desc: 'Trang phục mùa đông lễ hội Giáng sinh'},
  {id: 'halloween', name: 'Halloween Bí Ngô', cost: 100, school: 'SEASON', desc: 'Trang phục dạ tiệc hóa trang Halloween bí ngô'}
];

export const roles = [
  {id:'leader',name:'Trưởng nhóm',en:'LEADER',tag:'Giữ nhịp cả team',skill:'Phân công công bằng, giữ tiến độ và đặt ranh giới.',sprite:'leader'},
  {id:'doer',name:'Người triển khai',en:'DOER',tag:'Biến ý tưởng thành bài',skill:'Chủ động thực hiện, báo tiến độ và xin hỗ trợ đúng lúc.',sprite:'doer'},
  {id:'qc',name:'Kiểm soát chất lượng',en:'QC',tag:'Chất lượng là ưu tiên',skill:'Tìm lỗi và góp ý xây dựng bằng mô hình SBI.',sprite:'qc'},
  {id:'mediator',name:'Người hòa giải',en:'MEDIATOR',tag:'Giữ team hòa thuận',skill:'Lắng nghe, hạ nhiệt và kết nối các thành viên.',sprite:'mediator'},
  {id:'follower',name:'Mắt xích tích cực',en:'ACTIVE FOLLOWER',tag:'Không gánh, không làm tạ',skill:'Hỏi rõ yêu cầu, chủ động phản hồi và đúng hẹn.',sprite:'follower'},
];

export const personas = [
 {id:'turtle',title:'TRƯỞNG NHÓM ÔM VIỆC',handle:'0MVI3C247',desc:'Bạn quan tâm đến cả nhóm, đôi khi nhận quá nhiều việc vì ngại từ chối.',tip:'Thử giao nhiệm vụ rõ ràng và hỏi đồng đội cần hỗ trợ gì.'},
 {id:'star',title:'TRƯỞNG NHÓM TÀI NĂNG',handle:'ST4RLEADER01',desc:'Bạn có xu hướng lập kế hoạch, chia việc và giữ nhịp cho đội.',tip:'Đừng quên lắng nghe các ý kiến khác.'},
 {id:'sloth',title:'THÀNH VIÊN TRÌ HOÃN',handle:'CH1LLMODE99',desc:'Bạn thích không khí thoải mái nhưng đôi khi bắt đầu hơi muộn.',tip:'Chia công việc thành những mốc nhỏ và báo tiến độ.'},
 {id:'eagle',title:'NGƯỜI KIỂM SOÁT CẦU TOÀN',handle:'SH4RPEYE88',desc:'Bạn để ý chi tiết và muốn kết quả tốt nhất.',tip:'Góp ý cụ thể vào sản phẩm, tránh nhận xét về con người.'},
 {id:'owl',title:'NHÀ HÒA GIẢI',handle:'W1SEOWL07',desc:'Bạn thường nhìn được nhiều góc độ trong một câu chuyện.',tip:'Giữ sự công bằng và đừng ngại nói điều cần nói.'},
 {id:'bee',title:'THÀNH VIÊN GƯƠNG MẪU',handle:'BUSYB33100',desc:'Bạn ổn định, thường thực hiện đúng những gì đã hứa.',tip:'Chủ động chia sẻ ý tưởng để tạo thêm giá trị.'},
 {id:'ghost',title:'THÀNH VIÊN TÀNG HÌNH',handle:'1NVIS1BLE00',desc:'Bạn có thể ngại phát biểu trước những người chưa quen.',tip:'Bắt đầu bằng một câu xác nhận việc và thời hạn.'},
];

export const quizQuestions = [
 {question:'Nhóm sắp đến hạn mà chưa ai chia việc, bạn thường…',answers:[['Tạo bảng giao việc ngay', 'star'],['Âm thầm làm hết cho chắc', 'turtle'],['Đợi mọi người lên tiếng', 'ghost'],['Rủ cả nhóm họp 10 phút', 'owl']]},
 {question:'Bạn nhận phần khó hơn dự kiến. Bạn sẽ…',answers:[['Hỏi lại và đề xuất chia nhỏ việc', 'bee'],['Nhận hết vì sợ mất lòng', 'turtle'],['Để sát deadline mới làm', 'sloth'],['Kiểm tra yêu cầu từng chi tiết', 'eagle']]},
 {question:'Bạn phát hiện slide của bạn thân có lỗi, bạn…',answers:[['Nêu lỗi cụ thể và gợi ý sửa', 'eagle'],['Nhắn riêng thật khéo', 'owl'],['Tự sửa hết mà không nói', 'turtle'],['Để người khác góp ý', 'ghost']]},
 {question:'Nhóm chat im lặng sau khi Leader nhắn, bạn…',answers:[['Xác nhận phần việc của mình', 'bee'],['Chủ động hỏi cả nhóm', 'star'],['Đọc rồi để đó', 'ghost'],['Gửi lời phá băng trước', 'sloth']]},
 {question:'Nếu cả nhóm tranh cãi gay gắt, bạn sẽ…',answers:[['Tóm tắt quan điểm mỗi bên', 'owl'],['Đề xuất một lịch làm việc mới', 'star'],['Rà soát ai làm sai ở đâu', 'eagle'],['Tránh chat vì sợ căng thẳng', 'ghost']]},
];

export const levels = [
  {
    id: 1,
    name: 'Nhóm Bạn Thân',
    sub: 'Dễ',
    color: '#54d935',
    status: 'ready',
    statusText: 'Đã hoàn thiện',
    roles: ['doer', 'leader', 'qc', 'mediator'],
    description: 'Giữ tình bạn nhưng không quên trách nhiệm.',
    stages: [
      ['Mải nói chuyện quên làm bài', 'Nhóm chat toàn chuyện vui, chưa ai mở outline.'],
      ['Khi tình bạn ảnh hưởng đến việc phân công', 'Nể bạn không dám phân công phần việc khó.'],
      ['Tình bạn khiến ta ngại góp ý', 'Bạn thân khó chịu khi được nhắc sửa slide.'],
      ['Khi bạn được nhờ làm giúp', 'Bạn thân nhờ làm nốt bài vì bận đi xem concert.'],
      ['Khi cả nhóm đều nghĩ người khác sẽ làm', 'Ai cũng tưởng người khác đã làm phần tổng hợp.']
    ]
  },
  {
    id: 2,
    name: 'Người Lạ Ơi',
    sub: 'Trung bình',
    color: '#38bcf9',
    status: 'ready',
    statusText: 'Đã hoàn thiện',
    roles: ['leader', 'qc', 'follower', 'mediator', 'doer'],
    description: 'Phá băng nhóm mới, làm rõ vai trò và lịch làm.',
    stages: [
      ['Nhóm chat "băng giá"', 'Cả nhóm đã xem nhưng không ai phản hồi.'],
      ['Thành viên "Tàng hình"', 'Đến sát deadline một bạn tắt máy, một bạn nộp bài copy.'],
      ['Đùn đẩy không ai chịu làm Trưởng nhóm', 'Mọi người sợ trách nhiệm, đùn đẩy vai trò Leader.'],
      ['Bất đồng về cách làm việc (Tiến độ)', 'Một bạn muốn họp ngay, bạn khác muốn lùi vì ôn thi.'],
      ['Nghi ngờ năng lực và tự ý xóa bài', 'Tự ý xóa sạch bài người khác trên file Doc chung.'],
      ['Thành viên gây đóng băng không khí', 'Dùng lời lẽ cay nghiệt chỉ trích slide của đồng đội.']
    ]
  },
  {
    id: 3,
    name: 'Nước Đến Chân Mới Nhảy',
    sub: 'Tăng áp lực',
    color: '#ffa62b',
    status: 'coming_soon',
    statusText: 'Đang phát triển',
    roles: ['leader', 'doer', 'qc'],
    description: 'Sửa lỗi, ưu tiên công việc và giữ bình tĩnh khi sát hạn.',
    stages: [
      ['Slide cẩu thả 22h30', 'Sai font và sai kiến thức sát giờ nộp.'],
      ['Cãi bướng sát deadline', 'Doer không muốn chỉnh lỗi QC chỉ ra.'],
      ['File bị lỗi', 'Không thể mở bài khi còn 15 phút.'],
      ['Mất liên lạc lúc 23h', 'Người ghép bài bất ngờ “sập nguồn”.'],
      ['Trùng lặp nội dung', 'Hai phần làm bị trùng 70%.']
    ]
  },
  {
    id: 4,
    name: 'Trùm Free-rider',
    sub: 'Căng thẳng',
    color: '#ed655e',
    status: 'coming_soon',
    statusText: 'Chưa cập nhật',
    roles: ['leader', 'doer', 'qc', 'mediator', 'follower'],
    description: 'Thu thập bằng chứng và xử lý tranh chấp minh bạch.',
    stages: [
      ['Dọa bóc phốt', 'Thành viên không làm bài đe dọa đăng phốt.'],
      ['Đóng góp 1%, đòi 100%', 'Một đường link tài liệu được xem là công sức lớn.'],
      ['Nộp bài đạo văn', 'Nguy cơ cả nhóm bị điểm 0.'],
      ['Leader độc đoán', 'Xóa tên thành viên vì bất đồng quan điểm.'],
      ['Đổ lỗi sau điểm kém', 'Nhóm công kích nhau công khai.'],
      ['Lý do bất tận', 'Liên tục bùng deadline và viện lý do.']
    ]
  },
  {
    id: 5,
    name: 'Boss Cuối',
    sub: 'Đỉnh cao',
    color: '#8b8a98',
    status: 'coming_soon',
    statusText: 'Chưa cập nhật',
    roles: ['leader', 'doer', 'qc', 'mediator', 'follower'],
    description: 'Kết hợp toàn bộ kỹ năng phối hợp và giải quyết xung đột.',
    stages: [
      ['Xung đột ba chiều', 'Leader, QC, Doer tranh cãi liên tục.'],
      ['Chia bè kết phái', 'Nhóm 5 người tách thành 2 nhóm chat.'],
      ['Đổi đề tài giữa chừng', '50% dự án có nguy cơ phải làm lại.'],
      ['Tranh nhau việc dễ', 'Không ai muốn nhận phần khó.'],
      ['Giảng viên đổi yêu cầu', 'Ba ngày trước hạn, đề bài thay đổi.']
    ]
  }
];

export const stageRoleMap = {
  '1:0': 'doer',
  '1:1': 'leader',
  '1:2': 'qc',
  '1:3': 'doer',
  '1:4': 'mediator',
  '2:0': 'leader',
  '2:1': 'qc',
  '2:2': 'follower',
  '2:3': 'mediator',
  '2:4': 'doer',
  '2:5': 'leader'
};

// 'chat' = giao diện nhắn tin nhóm (chat-page hiện có). 'round' = giao diện bàn tròn
// (các nhân vật ngồi quanh bàn, nói trực tiếp, lời thoại nổi trên đầu người nói).
export const stageUIMode = {
  '1:0': 'chat', '1:1': 'round', '1:2': 'round', '1:3': 'chat', '1:4': 'round',
  '2:0': 'chat', '2:1': 'chat', '2:2': 'round', '2:3': 'round', '2:4': 'round', '2:5': 'chat'
};

export const stageScenarios = {
  "1:0": {
    "title": "Mải nói chuyện quên làm bài",
    "prompt": "Bạn nhận ra nếu cứ tiếp tục thế này, nhóm có thể không kịp hoàn thành bài. Tuy nhiên, nếu nhắc nhở quá gay gắt, bạn có thể khiến những người bạn thân cảm thấy mình đang làm quá vấn đề. Bạn sẽ phản hồi thế nào?",
    "role": "doer",
    "messages": [
      [
        "Leader",
        "Mọi người ơi, chỉ còn 2 ngày nữa là đến hạn nộp bài rồi. Nhóm mình đã có ai bắt đầu lên nội dung chưa?"
      ],
      [
        "Doer",
        "Tớ đang định bắt đầu đây, nhưng hôm nay có hơi nhiều việc. Chắc tối nay tớ sẽ cố gắng làm một chút."
      ],
      [
        "QC",
        "Tớ vẫn chưa nhận được nội dung nào để kiểm tra cả. Hay mọi người cố gắng gửi bản nháp trước tối mai nhé?"
      ],
      [
        "Mediator",
        "Tuần này ai cũng có khá nhiều việc nhỉ. Hay tối nay cả nhóm dành chút thời gian nghỉ ngơi, sau đó mình cùng trao đổi để tìm ý tưởng?"
      ],
      [
        "Doer",
        "Tớ đồng ý! Nhưng mà cũng phải bắt tay vào làm sớm thôi, chứ để sát hạn thì hơi căng đấy."
      ],
      [
        "Leader",
        "Đúng rồi, nhưng hiện tại mình vẫn chưa có outline cụ thể. Nếu không thống nhất sớm thì sẽ khó phân chia công việc."
      ]
    ],
    "choices": [
      {
        "text": "A. Chủ động làm trước để tạo động lực cho cả nhóm",
        "name": "Có tiến độ nhưng dễ tạo sự phụ thuộc",
        "type": "mid",
        "template": "Để tớ lên outline trước nhé. Mọi người xem rồi góp ý, sau đó mình chia việc luôn, chứ chờ nhau thế này chắc không kịp mất!",
        "development": "Bạn hoàn thành outline sơ bộ, một vài thành viên bắt đầu đóng góp. Tuy nhiên, mọi người dần có tâm lý chờ bạn chủ động xử lý công việc.",
        "result": "Có tiến độ nhưng dễ tạo sự phụ thuộc.",
        "positive": "Chủ động phá vỡ sự trì trệ, giúp nhóm có điểm bắt đầu.",
        "negative": "Dễ khiến các thành viên phụ thuộc vào bạn, vô tình làm thay một phần trách nhiệm của Leader.",
        "answer": "Diễn biến: Bạn hoàn thành outline sơ bộ, một vài thành viên bắt đầu đóng góp. Tuy nhiên, mọi người dần có tâm lý chờ bạn chủ động xử lý công việc.\n\nKết quả: Có tiến độ nhưng dễ tạo sự phụ thuộc.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Chủ động phá vỡ sự trì trệ, giúp nhóm có điểm bắt đầu.\n• Hạn chế: Dễ khiến các thành viên phụ thuộc vào bạn, vô tình làm thay một phần trách nhiệm của Leader.\n\n📌 Bài học rút ra: Chủ động là tốt nhưng cần đi kèm kêu gọi đồng đội cùng làm để tránh biến mình thành người gánh việc và khiến nhóm ỷ lại.",
        "npcReaction": "Leader: \"Cảm ơn cậu đã nhiệt tình, nhưng một mình cậu làm thì quá tải mất, để tớ phụ chia việc cho các bạn nhé!\"",
        "expressions": {
          "Leader": "worried",
          "Doer": "embarrassed",
          "QC": "confused",
          "Mediator": "happy"
        }
      },
      {
        "text": "B. Thẳng thắn nhắc nhở và yêu cầu mọi người nghiêm túc",
        "name": "Tiến độ nhanh hơn nhưng không khí nhóm căng thẳng",
        "type": "bad",
        "template": "Mọi người định để đến bao giờ nữa? Chỉ còn 2 ngày mà vẫn chưa có outline. Giờ mỗi người chốt phần việc ngay đi, đừng để sát deadline rồi lại cuống lên!",
        "development": "Các thành viên bắt đầu nhận nhiệm vụ, nhưng Doer cảm thấy bị thúc ép vì đang có nhiều deadline. Không khí nhóm cũng trở nên kém thoải mái hơn.",
        "result": "Công việc tiến triển nhanh hơn nhưng không khí nhóm căng thẳng.",
        "positive": "Thể hiện tinh thần trách nhiệm, giúp nhóm nhận thức được sự cấp bách của deadline.",
        "negative": "Cách nhắc nhở dễ gây áp lực vì chưa tìm hiểu khó khăn của từng thành viên.",
        "answer": "Diễn biến: Các thành viên bắt đầu nhận nhiệm vụ, nhưng Doer cảm thấy bị thúc ép vì đang có nhiều deadline. Không khí nhóm cũng trở nên kém thoải mái hơn.\n\nKết quả: Công việc tiến triển nhanh hơn nhưng không khí nhóm căng thẳng.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thể hiện tinh thần trách nhiệm, giúp nhóm nhận thức được sự cấp bách của deadline.\n• Hạn chế: Cách nhắc nhở dễ gây áp lực vì chưa tìm hiểu khó khăn của từng thành viên.\n\n📌 Bài học rút ra: Trách móc và thúc ép vội vàng có thể đẩy nhanh việc trước mắt nhưng làm rạn nứt hòa khí và tạo tâm lý đối phó trong nhóm bạn thân.",
        "npcReaction": "Doer: \"Cậu làm gì mà căng thẳng thế? Tớ đã bảo tối nay tớ tranh thủ làm rồi mà, bạn bè sao phải nặng lời!\"",
        "expressions": {
          "Leader": "angry",
          "Doer": "angry",
          "QC": "worried",
          "Mediator": "worried"
        }
      },
      {
        "text": "C. Khởi động một cuộc trao đổi ngắn để cả nhóm cùng thống nhất công việc",
        "name": "Tiến độ được cải thiện, nhóm duy trì được sự phối hợp",
        "type": "good",
        "template": "Tớ thấy nhóm mình đang hơi mất phương hướng rồi. Hay tối nay mình call 15 phút để thống nhất outline, chia việc và deadline nhé!",
        "development": "Cả nhóm thống nhất tham gia cuộc gọi, chia sẻ khả năng và khối lượng công việc. Leader phân công nhiệm vụ, các thành viên nhận phần việc phù hợp và chốt thời hạn hoàn thành.",
        "result": "Tiến độ được cải thiện, nhóm duy trì được sự phối hợp.",
        "positive": "Khuyến khích mọi người cùng giải quyết vấn đề, đảm bảo trách nhiệm rõ ràng và phân công phù hợp.",
        "negative": "Cần sự hợp tác của các thành viên và kiểm soát thời gian để tránh cuộc họp lan man.",
        "answer": "Diễn biến: Cả nhóm thống nhất tham gia cuộc gọi, chia sẻ khả năng và khối lượng công việc. Leader phân công nhiệm vụ, các thành viên nhận phần việc phù hợp và chốt thời hạn hoàn thành.\n\nKết quả: Tiến độ được cải thiện, nhóm duy trì được sự phối hợp.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Khuyến khích mọi người cùng giải quyết vấn đề, đảm bảo trách nhiệm rõ ràng và phân công phù hợp.\n• Hạn chế: Cần sự hợp tác của các thành viên và kiểm soát thời gian để tránh cuộc họp lan man.\n\n📌 Bài học rút ra: Một buổi trao đổi ngắn, có mục tiêu rõ ràng và thấu hiểu hoàn cảnh của nhau là cách tốt nhất để kéo nhóm bạn thân vào guồng làm việc.",
        "npcReaction": "Mediator: \"Chuẩn luôn! Tối nay tụi mình call nhanh 15 phút vừa tiện thống nhất outline vừa chốt việc luôn cho thoải mái nha!\"",
        "expressions": {
          "Leader": "happy",
          "Doer": "happy",
          "QC": "happy",
          "Mediator": "happy"
        }
      }
    ]
  },
  "1:1": {
    "title": "Khi tình bạn ảnh hưởng đến việc phân công",
    "prompt": "Bạn nhận ra mình đang khó đưa ra quyết định. Nếu phân công theo năng lực, người bạn thân có thể không hài lòng; nhưng nếu né tránh, công việc có thể không được phân chia hợp lý. Là Leader, bạn xử lý thế nào?",
    "role": "leader",
    "messages": [
      [
        "Leader",
        "Mọi người nghĩ ai sẽ phù hợp với phần phân tích nội dung nhỉ? Phần này khá quan trọng nên cần đầu tư nhiều thời gian."
      ],
      [
        "Doer",
        "Tớ nghĩ phần đó cần người có khả năng tổng hợp tốt. Nhưng tuần này tớ cũng đang có hai bài tập phải hoàn thành."
      ],
      [
        "QC",
        "Phần này mà làm chưa kỹ thì sẽ ảnh hưởng đến chất lượng chung của bài thuyết trình đấy."
      ],
      [
        "Mediator",
        "Hay mình xem xét năng lực và thời gian của từng người trước rồi phân công nhé?"
      ],
      [
        "Leader",
        "Tớ vẫn chưa biết nên phân công phần này thế nào cho hợp lý. Phần này khá khó, mà tuần này ai cũng có nhiều việc cần hoàn thành."
      ]
    ],
    "choices": [
      {
        "text": "A. Nhận phần khó về mình để tránh gây áp lực cho bạn",
        "name": "Công việc phân chia nhanh nhưng Leader dễ bị quá tải",
        "type": "bad",
        "template": "Thôi, phần phân tích cứ để tớ làm. Các cậu chia nhau những phần còn lại đi, tớ không muốn mọi người phải thêm áp lực đâu!",
        "development": "Bạn nhận phần phân tích và phải dành thêm nhiều thời gian để hoàn thành. Các thành viên khác vẫn làm phần việc của mình.",
        "result": "Công việc được phân chia nhanh nhưng Leader dễ bị quá tải.",
        "positive": "Thể hiện sự quan tâm và tinh thần trách nhiệm với nhóm.",
        "negative": "Để cảm xúc cá nhân ảnh hưởng đến việc phân công, khiến khối lượng công việc không đồng đều.",
        "answer": "Diễn biến: Bạn nhận phần phân tích và phải dành thêm nhiều thời gian để hoàn thành. Các thành viên khác vẫn làm phần việc của mình.\n\nKết quả: Công việc được phân chia nhanh nhưng Leader dễ bị quá tải.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thể hiện sự quan tâm và tinh thần trách nhiệm với nhóm.\n• Hạn chế: Để cảm xúc cá nhân ảnh hưởng đến việc phân công, khiến khối lượng công việc không đồng đều.\n\n📌 Bài học rút ra: Trưởng nhóm ôm đồm vì ngại bạn thân sẽ tự vắt kiệt sức mình, đồng thời tước đi cơ hội đóng góp xứng đáng của các thành viên khác.",
        "npcReaction": "Bạn thân: \"Ơ thế à... thôi để tớ làm phần nội dung vậy, cậu ôm phần khó một mình có kịp không đấy?\"",
        "expressions": {
          "Leader": "worried",
          "Doer": "happy",
          "QC": "worried",
          "Mediator": "confused",
          "Bạn_thân": "embarrassed"
        }
      },
      {
        "text": "B. Phân công theo năng lực và trao đổi trước",
        "name": "Công việc phân chia hợp lý, phối hợp tốt hơn",
        "type": "good",
        "template": "Tớ nghĩ cậu phù hợp nhất với phần phân tích này. Nhưng tớ biết tuần này cậu khá bận, hay mình trao đổi xem có thể chia nhỏ phần việc và nhờ thêm người hỗ trợ không nhé!",
        "development": "Người bạn thân đồng ý đảm nhận phần chính, Doer hỗ trợ tìm tài liệu, còn Leader theo dõi tiến độ và hỗ trợ khi cần.",
        "result": "Công việc được phân chia hợp lý, các thành viên phối hợp tốt hơn.",
        "positive": "Phân công dựa trên năng lực, đồng thời cân nhắc khối lượng công việc của từng người.",
        "negative": "Cần theo dõi và phối hợp thường xuyên để đảm bảo nhiệm vụ được hoàn thành đúng hạn.",
        "answer": "Diễn biến: Người bạn thân đồng ý đảm nhận phần chính, Doer hỗ trợ tìm tài liệu, còn Leader theo dõi tiến độ và hỗ trợ khi cần.\n\nKết quả: Công việc được phân chia hợp lý, các thành viên phối hợp tốt hơn.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Phân công dựa trên năng lực, đồng thời cân nhắc khối lượng công việc của từng người.\n• Hạn chế: Cần theo dõi và phối hợp thường xuyên để đảm bảo nhiệm vụ được hoàn thành đúng hạn.\n\n📌 Bài học rút ra: Phân công chuẩn xác theo năng lực kết hợp lắng nghe khó khăn và bố trí người hỗ trợ là nghệ thuật lãnh đạo dung hòa tình bạn và hiệu quả.",
        "npcReaction": "Bạn thân: \"Được thế thì tốt quá! Tớ đảm nhận phần chính, Doer phụ tớ tìm tài liệu nha, cảm ơn Leader nhiều!\"",
        "expressions": {
          "Leader": "happy",
          "Doer": "happy",
          "QC": "happy",
          "Mediator": "happy",
          "Bạn_thân": "happy"
        }
      },
      {
        "text": "C. Chia nhỏ phần khó cho tất cả thành viên",
        "name": "Khối lượng công việc san sẻ nhưng bài làm thiếu liên kết",
        "type": "mid",
        "template": "Hay mình chia phần phân tích thành nhiều phần nhỏ nhé. Mỗi người nhận một phần, sau đó tớ sẽ tổng hợp lại để tiết kiệm thời gian.",
        "development": "Các thành viên đều nhận một phần nhiệm vụ, nhưng cách triển khai và nội dung giữa các phần chưa thực sự thống nhất.",
        "result": "Khối lượng công việc được san sẻ nhưng bài làm dễ thiếu tính liên kết.",
        "positive": "Giảm áp lực cho từng thành viên, tạo cơ hội để mọi người cùng tham gia.",
        "negative": "Nếu thiếu người định hướng nội dung, các phần dễ bị trùng lặp hoặc rời rạc.",
        "answer": "Diễn biến: Các thành viên đều nhận một phần nhiệm vụ, nhưng cách triển khai và nội dung giữa các phần chưa thực sự thống nhất.\n\nKết quả: Khối lượng công việc được san sẻ nhưng bài làm dễ thiếu tính liên kết.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Giảm áp lực cho từng thành viên, tạo cơ hội để mọi người cùng tham gia.\n• Hạn chế: Nếu thiếu người định hướng nội dung, các phần dễ bị trùng lặp hoặc rời rạc.\n\n📌 Bài học rút ra: Chia nhỏ việc khó giúp giảm tải trước mắt, nhưng nếu thiếu người chủ trì định hướng khung sườn thì sản phẩm cuối rất dễ chắp vá và rời rạc.",
        "npcReaction": "QC: \"Chia nhỏ cũng được, nhưng phần phân tích mà mỗi người viết một kiểu thì lúc ghép slide sẽ bị rời rạc đấy nhé!\"",
        "expressions": {
          "Leader": "confused",
          "Doer": "confused",
          "QC": "worried",
          "Mediator": "happy",
          "Bạn_thân": "confused"
        }
      }
    ]
  },
  "1:2": {
    "title": "Tình bạn khiến ta ngại góp ý",
    "prompt": "Bạn nhận ra người bạn đang không hài lòng với những góp ý của mình. Nếu tiếp tục nhắc nhở, mối quan hệ có thể trở nên căng thẳng; nhưng nếu bỏ qua, chất lượng bài làm sẽ bị ảnh hưởng. Là QC, bạn xử lý thế nào?",
    "role": "qc",
    "messages": [
      [
        "QC",
        "Tớ vừa xem lại slide rồi. Có một số lỗi chính tả và phần số liệu này hình như chưa chính xác."
      ],
      [
        "Doer",
        "Ơ, phần đó tớ đã dành khá nhiều thời gian để làm rồi mà. Chắc không nghiêm trọng đến mức phải sửa hết đâu nhỉ?"
      ],
      [
        "Leader",
        "Mình sắp phải nộp bài rồi, nếu có lỗi thì nên xử lý sớm nhé."
      ],
      [
        "QC",
        "Tớ chỉ muốn bài làm hoàn thiện hơn thôi. Nếu để nguyên thì có thể ảnh hưởng đến điểm của cả nhóm."
      ],
      [
        "Doer",
        "Cậu cứ soi kỹ như vậy làm tớ thấy áp lực thật đấy. Bạn bè với nhau mà cũng phải khắt khe thế sao?"
      ]
    ],
    "choices": [
      {
        "text": "A. Bỏ qua lỗi để giữ hòa khí",
        "name": "Hòa khí nhất thời nhưng chất lượng bài làm chưa đảm bảo",
        "type": "bad",
        "template": "Thôi được rồi, nếu cậu thấy ổn thì mình cứ giữ nguyên nhé. Tớ không muốn vì chuyện này mà hai đứa lại mất vui.",
        "development": "Bạn dừng góp ý, Doer tiếp tục hoàn thiện slide theo ý mình. Một số lỗi vẫn còn nguyên khi nhóm nộp bài.",
        "result": "Không khí giữa hai người dễ chịu hơn nhưng chất lượng bài làm chưa được đảm bảo.",
        "positive": "Tránh tranh cãi và giữ được sự thoải mái trong mối quan hệ.",
        "negative": "Đặt tình cảm cá nhân lên trên trách nhiệm kiểm tra, khiến lỗi chưa được khắc phục.",
        "answer": "Diễn biến: Bạn dừng góp ý, Doer tiếp tục hoàn thiện slide theo ý mình. Một số lỗi vẫn còn nguyên khi nhóm nộp bài.\n\nKết quả: Không khí giữa hai người dễ chịu hơn nhưng chất lượng bài làm chưa được đảm bảo.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tránh tranh cãi và giữ được sự thoải mái trong mối quan hệ.\n• Hạn chế: Đặt tình cảm cá nhân lên trên trách nhiệm kiểm tra, khiến lỗi chưa được khắc phục.\n\n📌 Bài học rút ra: Dĩ hòa vi quý sai cách sẽ làm tổn hại đến chất lượng chung của cả nhóm và không giúp bạn mình tiến bộ.",
        "npcReaction": "Doer: \"Thế à, cảm ơn cậu nha! Tớ thấy slide này ổn rồi, mai nộp luôn cho nhẹ đầu!\"",
        "expressions": {
          "QC": "sad",
          "Doer": "happy",
          "Leader": "worried",
          "Mediator": "happy"
        }
      },
      {
        "text": "B. Yêu cầu sửa lỗi theo đúng tiêu chuẩn kiểm tra",
        "name": "Bài làm được chỉnh sửa kỹ nhưng sự phối hợp bị ảnh hưởng",
        "type": "mid",
        "template": "Tớ hiểu cậu đã mất công làm slide, nhưng phần nào chưa đạt thì vẫn phải sửa. Nếu ai cũng bỏ qua lỗi vì ngại góp ý thì bài chung sẽ bị ảnh hưởng đấy!",
        "development": "Doer miễn cưỡng chỉnh sửa toàn bộ slide. Tuy nhiên, bạn ấy ít trao đổi với QC hơn và không khí làm việc trở nên căng thẳng.",
        "result": "Bài làm được chỉnh sửa kỹ nhưng sự phối hợp giữa hai người bị ảnh hưởng.",
        "positive": "Đảm bảo các tiêu chuẩn chất lượng và trách nhiệm của QC.",
        "negative": "Quá tập trung vào tiêu chuẩn mà chưa chú ý đến cách tiếp nhận góp ý của người khác.",
        "answer": "Diễn biến: Doer miễn cưỡng chỉnh sửa toàn bộ slide. Tuy nhiên, bạn ấy ít trao đổi với QC hơn và không khí làm việc trở nên căng thẳng.\n\nKết quả: Bài làm được chỉnh sửa kỹ nhưng sự phối hợp giữa hai người bị ảnh hưởng.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Đảm bảo các tiêu chuẩn chất lượng và trách nhiệm của QC.\n• Hạn chế: Quá tập trung vào tiêu chuẩn mà chưa chú ý đến cách tiếp nhận góp ý của người khác.\n\n📌 Bài học rút ra: Góp ý chỉ nhìn vào lỗi mà thiếu sự đồng cảm sẽ biến phản hồi thành sự chỉ trích, gây rạn nứt quan hệ.",
        "npcReaction": "Doer: \"Cậu cứ bắt bẻ từng dấu chấm phẩy làm tớ bực mình thật đấy, mai nộp rồi còn sửa gì nữa!\"",
        "expressions": {
          "QC": "angry",
          "Doer": "angry",
          "Leader": "worried",
          "Mediator": "worried"
        }
      },
      {
        "text": "C. Trao đổi riêng và cùng thống nhất cách sửa",
        "name": "Chất lượng bài làm cải thiện, nhóm duy trì phối hợp tốt",
        "type": "good",
        "template": "Tớ biết cậu đã dành nhiều thời gian cho phần này rồi. Nhưng mình thử kiểm tra lại những lỗi quan trọng trước nhé, tớ có thể hỗ trợ cậu sửa nếu cần!",
        "development": "Doer cảm thấy được tôn trọng và đồng ý kiểm tra lại slide. Hai người cùng ưu tiên sửa lỗi số liệu, chính tả và định dạng.",
        "result": "Chất lượng bài làm được cải thiện, nhóm vẫn duy trì được sự phối hợp.",
        "positive": "Vừa đảm bảo trách nhiệm của QC, vừa ghi nhận công sức và tôn trọng cảm xúc của bạn.",
        "negative": "Cần thêm thời gian hỗ trợ và kiểm tra lại nội dung sau khi chỉnh sửa.",
        "answer": "Diễn biến: Doer cảm thấy được tôn trọng và đồng ý kiểm tra lại slide. Hai người cùng ưu tiên sửa lỗi số liệu, chính tả và định dạng.\n\nKết quả: Chất lượng bài làm được cải thiện, nhóm vẫn duy trì được sự phối hợp.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Vừa đảm bảo trách nhiệm của QC, vừa ghi nhận công sức và tôn trọng cảm xúc của bạn.\n• Hạn chế: Cần thêm thời gian hỗ trợ và kiểm tra lại nội dung sau khi chỉnh sửa.\n\n📌 Bài học rút ra: Khen ngợi nỗ lực trước, chỉ ra giải pháp sau và sẵn sàng đồng hành là cách QC xây dựng niềm tin tốt nhất.",
        "npcReaction": "Doer: \"Ừ nhỉ, phần số liệu này đúng là tớ lấy nhầm bảng thật! May có cậu soi giúp, hai đứa mình cùng sửa cho nhanh nhé!\"",
        "expressions": {
          "QC": "happy",
          "Doer": "happy",
          "Leader": "happy",
          "Mediator": "happy"
        }
      }
    ]
  },
  "1:3": {
    "title": "Khi bạn được nhờ làm giúp phần việc của 1 thành viên khác",
    "prompt": "Bạn hiểu mong muốn của bạn mình, nhưng cũng nhận ra việc nhờ người khác làm thay không phải cách giải quyết hợp lý. Là Doer, bạn xử lý thế nào?",
    "role": "doer",
    "messages": [
      [
        "Leader",
        "Mọi người nhớ hoàn thành phần việc trong hôm nay nhé. Ngày mai nhóm mình cần tổng hợp và kiểm tra lần cuối."
      ],
      [
        "Doer",
        "Phần của tớ gần xong rồi, tối nay tớ sẽ kiểm tra lại một lượt."
      ],
      [
        "QC",
        "Tớ sẽ chờ nội dung của mọi người để bắt đầu rà soát nhé."
      ],
      [
        "Bạn thân",
        "Cậu ơi, tối nay cậu làm giúp tớ phần của tớ được không? Tớ có lịch đi xem biểu diễn rồi, không muốn bỏ lỡ lần này."
      ],
      [
        "Bạn thân",
        "Cậu làm nhanh hơn tớ mà. Bạn bè giúp nhau một chút thôi, chắc không mất nhiều thời gian đâu!"
      ]
    ],
    "choices": [
      {
        "text": "A. Nhận làm giúp nhưng yêu cầu bạn bù lại công việc sau",
        "name": "Đảm bảo tiến độ nhưng dễ hình thành thói quen nhờ vả",
        "type": "mid",
        "template": "Được, lần này tớ làm giúp cậu. Nhưng cậu phải nhận lại một phần việc của tớ trong lần tới nhé, chứ tớ cũng không thể gánh mãi được.",
        "development": "Bạn thân đồng ý, phần việc được hoàn thành đúng hạn. Tuy nhiên, bạn phải dành thêm thời gian và việc trao đổi công việc giữa hai người trở nên mang tính trao đổi lợi ích.",
        "result": "Đảm bảo tiến độ nhưng dễ hình thành thói quen nhờ vả.",
        "positive": "Có sự thỏa thuận và chia sẻ trách nhiệm giữa hai người.",
        "negative": "Không giải quyết được vấn đề bạn thân chưa tự chịu trách nhiệm với nhiệm vụ của mình.",
        "answer": "Diễn biến: Bạn thân đồng ý, phần việc được hoàn thành đúng hạn. Tuy nhiên, bạn phải dành thêm thời gian và việc trao đổi công việc giữa hai người trở nên mang tính trao đổi lợi ích.\n\nKết quả: Đảm bảo tiến độ nhưng dễ hình thành thói quen nhờ vả.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Có sự thỏa thuận và chia sẻ trách nhiệm giữa hai người.\n• Hạn chế: Không giải quyết được vấn đề bạn thân chưa tự chịu trách nhiệm với nhiệm vụ của mình.\n\n📌 Bài học rút ra: Gánh hộ công việc dù có điều kiện vẫn vô tình dung túng cho sự thiếu kỷ luật của đồng đội.",
        "npcReaction": "Bạn thân: \"Được rồi, hứa luôn! Lần tới cậu cần gì cứ bảo tớ gánh lại, tối nay đi concert tớ mua quà cho nhé!\"",
        "expressions": {
          "Doer": "worried",
          "Bạn_thân": "happy",
          "Leader": "confused",
          "QC": "confused"
        }
      },
      {
        "text": "B. Báo với Leader để điều chỉnh phân công",
        "name": "Công việc được phân bổ lại nhưng mối quan hệ có phần xa cách",
        "type": "bad",
        "template": "Tớ nghĩ mình nên báo với Leader để tìm cách sắp xếp lại công việc. Tớ không thể nhận thêm toàn bộ phần này khi phần của mình vẫn chưa hoàn thành.",
        "development": "Leader biết tình hình và phân chia lại một phần công việc cho các thành viên khác. Bạn thân cảm thấy không thoải mái vì chuyện riêng bị đưa ra trước cả nhóm.",
        "result": "Công việc được phân bổ lại nhưng mối quan hệ có phần xa cách.",
        "positive": "Đảm bảo tính minh bạch và giúp Leader kiểm soát tiến độ chung.",
        "negative": "Có thể khiến bạn thân cảm thấy bị thiếu tin tưởng nếu chưa được trao đổi riêng trước đó.",
        "answer": "Diễn biến: Leader biết tình hình và phân chia lại một phần công việc cho các thành viên khác. Bạn thân cảm thấy không thoải mái vì chuyện riêng bị đưa ra trước cả nhóm.\n\nKết quả: Công việc được phân bổ lại nhưng mối quan hệ có phần xa cách.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Đảm bảo tính minh bạch và giúp Leader kiểm soát tiến độ chung.\n• Hạn chế: Có thể khiến bạn thân cảm thấy bị thiếu tin tưởng nếu chưa được trao đổi riêng trước đó.\n\n📌 Bài học rút ra: Đưa việc riêng lên nhóm chung mà chưa trao đổi trực tiếp dễ gây mất lòng và cảm giác bị phản bội.",
        "npcReaction": "Bạn thân: \"Sao cậu lại mách Leader thế? Tớ nhờ riêng cậu thôi mà, làm tớ ngại với cả nhóm ghê...\"",
        "expressions": {
          "Doer": "sad",
          "Bạn_thân": "angry",
          "Leader": "worried",
          "QC": "confused"
        }
      },
      {
        "text": "C. Từ chối làm hộ nhưng đề xuất hỗ trợ",
        "name": "Cả hai hoàn thành nhiệm vụ, trách nhiệm cá nhân được đảm bảo",
        "type": "good",
        "template": "Tớ không thể làm thay toàn bộ phần của cậu được vì tớ cũng còn việc phải hoàn thành. Nhưng cậu cứ làm trước đi, tớ có thể xem qua và góp ý giúp cậu nhé!",
        "development": "Bạn thân đồng ý tự hoàn thành phần việc. Sau đó, bạn dành một chút thời gian xem lại và góp ý để bạn ấy kịp chỉnh sửa.",
        "result": "Cả hai hoàn thành nhiệm vụ, trách nhiệm cá nhân vẫn được đảm bảo.",
        "positive": "Vừa giữ được giới hạn cá nhân, vừa thể hiện sự sẵn lòng hỗ trợ bạn bè.",
        "negative": "Bạn vẫn cần dành thêm thời gian để góp ý, vì vậy phải cân đối với công việc của mình.",
        "answer": "Diễn biến: Bạn thân đồng ý tự hoàn thành phần việc. Sau đó, bạn dành một chút thời gian xem lại và góp ý để bạn ấy kịp chỉnh sửa.\n\nKết quả: Cả hai hoàn thành nhiệm vụ, trách nhiệm cá nhân vẫn được đảm bảo.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Vừa giữ được giới hạn cá nhân, vừa thể hiện sự sẵn lòng hỗ trợ bạn bè.\n• Hạn chế: Bạn vẫn cần dành thêm thời gian để góp ý, vì vậy phải cân đối với công việc của mình.\n\n📌 Bài học rút ra: Biết nói lời từ chối khéo léo và thiết lập ranh giới giúp bạn bè trưởng thành trong trách nhiệm.",
        "npcReaction": "Bạn thân: \"Hiểu rồi, tớ sẽ tranh thủ làm trước khi đi rồi gửi cậu xem qua nhé. Cảm ơn cậu đã nhắc nhở!\"",
        "expressions": {
          "Doer": "happy",
          "Bạn_thân": "happy",
          "Leader": "happy",
          "QC": "happy"
        }
      }
    ]
  },
  "1:4": {
    "title": "Khi cả nhóm đều nghĩ người khác sẽ làm",
    "prompt": "Bạn nhận ra các thành viên đều có lý do riêng, nhưng nếu tiếp tục tranh luận và đổ lỗi, nhóm sẽ không còn đủ thời gian hoàn thành bài. Là Mediator, bạn xử lý thế nào?",
    "role": "mediator",
    "messages": [
      [
        "Leader",
        "Mọi người ơi, tớ vừa kiểm tra lại thì phần tổng hợp nội dung vẫn chưa xong. Có ai đang phụ trách phần này không?"
      ],
      [
        "Doer",
        "Ơ, tớ tưởng đã có người nhận rồi chứ? Tớ đã hoàn thành phần nội dung của mình mà."
      ],
      [
        "QC",
        "Tớ vẫn chưa nhận được bản hoàn chỉnh để kiểm tra. Nếu để đến sát giờ thì sẽ rất khó sửa lỗi."
      ],
      [
        "Leader",
        "Tớ cứ nghĩ mọi người đã thống nhất với nhau rồi. Giờ còn nhiều phần chưa xong thế này thì nguy hiểm thật."
      ],
      [
        "Doer",
        "Nhưng lúc đầu mình đâu có nói rõ ai phụ trách phần tổng hợp đâu?"
      ],
      [
        "Mediator",
        "Có lẽ nhóm mình đang thiếu sự thống nhất trong phân công. Giờ cần bình tĩnh xem lại những phần còn thiếu thôi."
      ]
    ],
    "choices": [
      {
        "text": "A. Chủ động kết nối và nhận một phần việc còn thiếu",
        "name": "Công việc được đẩy nhanh nhưng trách nhiệm chưa rõ ràng",
        "type": "mid",
        "template": "Hay để tớ nhận phần tổng hợp trước nhé. Những phần còn lại mọi người tự kiểm tra xem ai có thể hỗ trợ, chứ giờ mình không thể để trống thêm được.",
        "development": "Bạn bắt đầu tổng hợp nội dung, các thành viên khác cũng chủ động hỗ trợ. Tuy nhiên, một số người vẫn chưa thực sự thống nhất ai chịu trách nhiệm cuối cùng cho từng phần.",
        "result": "Công việc được đẩy nhanh nhưng trách nhiệm chưa được phân chia rõ ràng.",
        "positive": "Chủ động tháo gỡ khó khăn, tạo động lực để mọi người cùng tham gia.",
        "negative": "Việc nhận thêm nhiệm vụ có thể khiến bạn quá tải và chưa giải quyết triệt để tình trạng thiếu phân công.",
        "answer": "Diễn biến: Bạn bắt đầu tổng hợp nội dung, các thành viên khác cũng chủ động hỗ trợ. Tuy nhiên, một số người vẫn chưa thực sự thống nhất ai chịu trách nhiệm cuối cùng cho từng phần.\n\nKết quả: Công việc được đẩy nhanh nhưng trách nhiệm chưa được phân chia rõ ràng.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Chủ động tháo gỡ khó khăn, tạo động lực để mọi người cùng tham gia.\n• Hạn chế: Việc nhận thêm nhiệm vụ có thể khiến bạn quá tải và chưa giải quyết triệt để tình trạng thiếu phân công.\n\n📌 Bài học rút ra: Đứng ra gánh việc giải quyết được tình thế cấp bách nhưng không thay thế được sự phân công rõ ràng.",
        "npcReaction": "Doer: \"May quá có Mediator nhận! Cậu tổng hợp đi rồi cần bổ sung gì cứ nhắn tớ nhé!\"",
        "expressions": {
          "Mediator": "worried",
          "Leader": "confused",
          "Doer": "happy",
          "QC": "confused"
        }
      },
      {
        "text": "B. Để Leader quyết định và phân công lại",
        "name": "Công việc có người phụ trách nhưng sự đồng thuận chưa cao",
        "type": "bad",
        "template": "Tớ nghĩ Leader nên chốt lại nhiệm vụ một lần nữa. Mỗi người cứ nhận đúng phần được giao, nếu không thì nhóm mình sẽ tiếp tục mất thời gian tranh luận.",
        "development": "Leader nhanh chóng phân công lại công việc. Nhóm bắt đầu triển khai nhưng một số thành viên cảm thấy chưa được lắng nghe vì nhiệm vụ được giao khá gấp.",
        "result": "Công việc có người phụ trách rõ ràng nhưng sự đồng thuận chưa cao.",
        "positive": "Tận dụng vai trò điều phối của Leader, giúp nhóm nhanh chóng xác định trách nhiệm.",
        "negative": "Chưa tạo điều kiện để các thành viên chia sẻ khó khăn hoặc đề xuất phương án phù hợp hơn.",
        "answer": "Diễn biến: Leader nhanh chóng phân công lại công việc. Nhóm bắt đầu triển khai nhưng một số thành viên cảm thấy chưa được lắng nghe vì nhiệm vụ được giao khá gấp.\n\nKết quả: Công việc có người phụ trách rõ ràng nhưng sự đồng thuận chưa cao.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tận dụng vai trò điều phối của Leader, giúp nhóm nhanh chóng xác định trách nhiệm.\n• Hạn chế: Chưa tạo điều kiện để các thành viên chia sẻ khó khăn hoặc đề xuất phương án phù hợp hơn.\n\n📌 Bài học rút ra: Áp đặt phân công trong lúc hoang mang dễ làm giảm tinh thần tự nguyện và sự gắn kết.",
        "npcReaction": "Doer: \"Leader giao gấp thế này ai mà xoay kịp? Lúc đầu không phân rõ giờ lại ép nhau!\"",
        "expressions": {
          "Mediator": "sad",
          "Leader": "angry",
          "Doer": "angry",
          "QC": "worried"
        }
      },
      {
        "text": "C. Đề nghị mọi người tự chọn phần việc còn thiếu",
        "name": "Thành viên chủ động hơn, công việc được giải quyết thỏa đáng",
        "type": "good",
        "template": "Hay mọi người xem phần nào mình có thể hỗ trợ rồi chủ động nhận nhé. Tớ sẽ ghi lại để nhóm thống nhất người phụ trách và thời hạn hoàn thành.",
        "development": "Các thành viên lần lượt nhận nhiệm vụ dựa trên khả năng của mình. Tuy nhiên, có những phần khó chưa ai muốn đảm nhận, khiến Mediator phải tiếp tục điều phối.",
        "result": "Các thành viên có quyền chủ động hơn nhưng một số nhiệm vụ vẫn chưa được giải quyết ngay.",
        "positive": "Khuyến khích tinh thần tự giác, tạo cơ hội để mọi người cùng chịu trách nhiệm.",
        "negative": "Nếu không có sự điều phối phù hợp, những phần việc khó vẫn có thể bị bỏ ngỏ.",
        "answer": "Diễn biến: Các thành viên lần lượt nhận nhiệm vụ dựa trên khả năng của mình. Mediator ghi lại danh sách phân công, chốt người phụ trách và thời hạn hoàn thành.\n\nKết quả: Các thành viên có quyền chủ động hơn, trách nhiệm rõ ràng và bài hoàn thành đúng hạn.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Khuyến khích tinh thần tự giác, tạo cơ hội để mọi người cùng chịu trách nhiệm.\n• Hạn chế: Cần sự điều phối khéo léo để những phần khó không bị bỏ ngỏ.\n\n📌 Bài học rút ra: Trao quyền chủ động nhận việc kèm theo ghi chép công khai mốc bàn giao là cách hòa giải văn minh, chuyển thế đổ lỗi thành cùng nhau giải quyết.",
        "npcReaction": "Leader: \"Cách này hay! Tớ sẽ phụ trách phần kết bài, còn Doer nhận phần mở đầu nhé, cả nhóm cùng làm nào!\"",
        "expressions": {
          "Mediator": "happy",
          "Leader": "happy",
          "Doer": "happy",
          "QC": "happy"
        }
      }
    ]
  },
  "2:0": {
    "title": "Nhóm chat \"băng giá\"",
    "prompt": "Nhóm mới lập, file đã gửi nhưng cả nhóm chỉ seen và thả icon. Bạn muốn nhanh chóng phá vỡ bầu không khí ngượng ngùng để đẩy tiến độ mà không gắt gỏng. Là Leader, bạn làm gì?",
    "role": "leader",
    "messages": [
      [
        "Leader",
        "Chào mọi người, tớ tạo nhóm rồi nhé. Tớ gửi file chia việc kèm outline, mọi người check qua rồi cho ý kiến nha! (File_BTL_TDSTKN.docx)"
      ],
      [
        "QC",
        "❤️ (Thả tim)"
      ],
      [
        "Doer",
        "👍 (Đã thả ưng)"
      ],
      [
        "Hệ thống",
        "(Cả nhóm chìm vào im lặng hoàn toàn, không một ai nhắn thêm dòng nào)"
      ]
    ],
    "choices": [
      {
        "text": "A. Trách móc thái độ im lặng của các thành viên",
        "name": "Không khí nhóm đóng băng, phân công rơi vào bế tắc",
        "type": "bad",
        "template": "Sao mọi người seen không nói gì thế? Không ai có ý kiến gì à hay định để nước đến chân mới nhảy rồi mới nhốn nháo lên?",
        "development": "Nhóm chat càng trở nên lạnh lẽo và căng thẳng hơn. Các thành viên cảm thấy bị tấn công cá nhân, bắt đầu có tâm lý phòng thủ và phớt lờ tin nhắn của bạn luôn.",
        "result": "Không khí nhóm bị đóng băng, việc phân công công việc chính thức rơi vào bế tắc.",
        "positive": "Thể hiện sự sốt sắng và lo lắng cho tiến độ chung của bài tập.",
        "negative": "Dùng ngôn từ mang tính phán xét, đổ lỗi ngay từ đầu khiến đối phương cảm thấy bất an và thu mình lại thay vì hợp tác.",
        "answer": "Diễn biến: Nhóm chat càng trở nên lạnh lẽo và căng thẳng hơn. Các thành viên cảm thấy bị tấn công cá nhân, bắt đầu có tâm lý phòng thủ và phớt lờ tin nhắn của bạn luôn.\n\nKết quả: Không khí nhóm bị đóng băng, việc phân công công việc chính thức rơi vào bế tắc.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thể hiện sự sốt sắng và lo lắng cho tiến độ chung của bài tập.\n• Hạn chế: Dùng ngôn từ mang tính phán xét, đổ lỗi ngay từ đầu khiến đối phương cảm thấy bất an và thu mình lại thay vì hợp tác.\n\n📌 Bài học rút ra: Trách móc người lạ ngay từ lần gặp đầu sẽ kích hoạt cơ chế phòng vệ và đẩy cả nhóm vào sự im lặng thù địch.",
        "npcReaction": "QC: \"(seen)...\"",
        "expressions": {
          "Leader": "angry",
          "QC": "worried",
          "Doer": "sad",
          "Mediator": "worried"
        }
      },
      {
        "text": "B. Kìm nén và mặc định coi như mọi người đã đồng ý",
        "name": "Bài tập nhóm đổ bể phút chót vì thiếu phân công",
        "type": "bad",
        "template": "Thôi kệ đi, chắc mọi người xem rồi và ngầm đồng ý rồi đấy. Ai làm phần nào thì tự giác đi nhé.",
        "development": "Bạn không thúc đẩy tương tác mà phó mặc mọi thứ cho sự im lặng. Đến hạn nộp bài, không ai nộp vì mỗi người tưởng người khác làm phần khác, bài tập lệch tông hoàn toàn.",
        "result": "Bài tập nhóm đổ bể phút chót do không có sự thống nhất và phân công rõ ràng.",
        "positive": "Tránh được những tranh cãi nảy lửa hoặc xung đột lời nói trước mắt.",
        "negative": "Thiếu kỹ năng quản trị sự bất định, phó mặc tiến độ cho sự im lặng rủi ro của tập thể.",
        "answer": "Diễn biến: Bạn không thúc đẩy tương tác mà phó mặc mọi thứ cho sự im lặng. Đến hạn nộp bài, không ai nộp vì mỗi người tưởng người khác làm phần khác, bài tập lệch tông hoàn toàn.\n\nKết quả: Bài tập nhóm đổ bể phút chót do không có sự thống nhất và phân công rõ ràng.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tránh được những tranh cãi nảy lửa hoặc xung đột lời nói trước mắt.\n• Hạn chế: Thiếu kỹ năng quản trị sự bất định, phó mặc tiến độ cho sự im lặng rủi ro của tập thể.\n\n📌 Bài học rút ra: Im lặng không đồng nghĩa với đồng ý; phó mặc cho sự tự giác mơ hồ trong nhóm mới là công thức chắc chắn dẫn đến vỡ trận.",
        "npcReaction": "Hệ thống: (Cả nhóm tiếp tục im lặng, ai nấy tự làm một kiểu không ai khớp với ai).",
        "expressions": {
          "Leader": "worried",
          "QC": "confused",
          "Doer": "confused",
          "Mediator": "sad"
        }
      },
      {
        "text": "C. Chủ động phá băng bằng câu hỏi khảo sát nhẹ nhàng",
        "name": "Sự băng giá được phá vỡ, các thành viên nhận việc thoải mái",
        "type": "good",
        "template": "Hơi im ắng ta cơ mà tớ đói bụng quá, không biết mọi người thích làm phần nội dung hay phần làm slide thiết kế hơn để tớ điều chỉnh cho hợp gu nhé?",
        "development": "Không khí dần dịu lại, một vài thành viên bắt đầu thả lỏng, Doer nhận phần nội dung và QC nhận phần làm slide vì đúng sở trường. Nhóm bắt đầu có tiếng cười và tương tác.",
        "result": "Sự băng giá được phá vỡ, các thành viên bắt đầu nhận việc một cách thoải mái.",
        "positive": "Kỹ thuật phá băng khéo léo, chuyển từ việc \"ép buộc\" sang \"lựa chọn sở thích cá nhân\", kích thích sự cởi mở.",
        "negative": "Cần thêm thời gian để chờ đợi mọi người phản hồi thay vì có kết quả ngay lập tức.",
        "answer": "Diễn biến: Không khí dần dịu lại, một vài thành viên bắt đầu thả lỏng, Doer nhận phần nội dung và QC nhận phần làm slide vì đúng sở trường. Nhóm bắt đầu có tiếng cười và tương tác.\n\nKết quả: Sự băng giá được phá vỡ, các thành viên bắt đầu nhận việc một cách thoải mái.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Kỹ thuật phá băng khéo léo, chuyển từ việc \"ép buộc\" sang \"lựa chọn sở thích cá nhân\", kích thích sự cởi mở.\n• Hạn chế: Cần thêm thời gian để chờ đợi mọi người phản hồi thay vì có kết quả ngay lập tức.\n\n📌 Bài học rút ra: Phá băng nhóm người lạ bằng sự gần gũi, hóm hỉnh và trao quyền chọn theo sở trường giúp mọi người cởi bỏ sự rụt rè và chủ động nhận việc.",
        "npcReaction": "Doer: \"Haha tớ thích viết nội dung hơn nè, ai làm slide thì nhận giúp tớ nha!\"",
        "expressions": {
          "Leader": "happy",
          "QC": "happy",
          "Doer": "happy",
          "Mediator": "happy"
        }
      }
    ]
  },
  "2:1": {
    "title": "Thành viên \"Tàng hình\"",
    "prompt": "A tắt máy biến mất, B nộp bài sơ sài copy nguyên văn từ trên mạng sát giờ nộp. Bạn muốn đảm bảo bài không đạo văn nhưng e ngại cãi nhau nửa đêm làm vỡ trận. Là QC, bạn xử lý thế nào?",
    "role": "qc",
    "messages": [
      [
        "QC",
        "@A @B ơi, phần tổng hợp lý thuyết của hai cậu đến đâu rồi? Cho tớ xem qua nội dung để ghép chung vào bản final với nhé!"
      ],
      [
        "A",
        "Vẫn đang làm nhé bạn êi, yên tâm đi."
      ],
      [
        "B",
        "Tớ đang kẹt tý việc cá nhân, tối nay tớ gửi nha."
      ],
      [
        "Hệ thống",
        "(Đến sát giờ nộp bài, A im lặng tắt máy, B gửi một mẩu nội dung sơ sài copy nguyên văn trên mạng)."
      ]
    ],
    "choices": [
      {
        "text": "A. Bêu rếu công khai sự vô trách nhiệm lên nhóm chung",
        "name": "Nội bộ lục đục trầm trọng, bài tập nhóm vỡ trận",
        "type": "bad",
        "template": "Làm ăn kiểu gì thế này hả A, B? Hứa hẹn tối gửi xong giờ đứa mất tích đứa nộp bài copy vớ vẩn, coi nhóm ra cái gì không hả?",
        "development": "A nổi giận vì cảm thấy bị bêu rếu trước mặt tập thể, đôi bên lao vào cãi vã lớn tiếng và từ chối hợp tác.",
        "result": "Nội bộ lục đục trầm trọng, bài tập nhóm chính thức vỡ trận vì không ai chịu nhìn mặt ai.",
        "positive": "Dám nói thẳng nói thật, bảo vệ quyền lợi chung của nhóm trước sự tắc trách.",
        "negative": "Công khai chỉ trích kích hoạt bản năng tự vệ cực đoan của người khác thay vì giải quyết vấn đề công việc.",
        "answer": "Diễn biến: A nổi giận vì cảm thấy bị bêu rếu trước mặt tập thể, đôi bên lao vào cãi vã lớn tiếng và từ chối hợp tác.\n\nKết quả: Nội bộ lục đục trầm trọng, bài tập nhóm chính thức vỡ trận vì không ai chịu nhìn mặt ai.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Dám nói thẳng nói thật, bảo vệ quyền lợi chung của nhóm trước sự tắc trách.\n• Hạn chế: Công khai chỉ trích kích hoạt bản năng tự vệ cực đoan của người khác thay vì giải quyết vấn đề công việc.\n\n📌 Bài học rút ra: Công kích công khai trước tập thể dễ biến tranh chấp công việc thành tự ái cá nhân, phá nát hoàn toàn cơ hội cứu vãn bài tập.",
        "npcReaction": "A: \"Làm gì mà bêu tên người ta trên nhóm thế? Tớ bận thật chứ có rảnh đâu mà chửi!\"",
        "expressions": {
          "QC": "angry",
          "A": "angry",
          "B": "worried",
          "Leader": "worried"
        }
      },
      {
        "text": "B. Âm thầm ôm việc tự sửa và tự làm thay",
        "name": "Bài kịp nộp đúng hạn nhưng kiệt sức và bất công",
        "type": "mid",
        "template": "(Không nhắn gì trên nhóm) Thôi chết gần đến giờ nộp rồi, mình tự ngồi sửa bài hộ B với tự viết nốt phần của A cho kịp giờ vậy.",
        "development": "Bạn cắn răng gánh trọn đống việc thay cho hai thành viên tàng hình, thức xuyên đêm hoàn thành bài trong sự ấm ức và kiệt sức.",
        "result": "Bài kịp nộp đúng hạn nhưng bạn kiệt sức, đồng thời tạo tiền lệ cực xấu cho các lần sau.",
        "positive": "Đảm bảo được điểm số và sự an toàn cho hạn chót nộp bài của cả nhóm.",
        "negative": "Dung túng cho hành vi vô kỷ luật, thiếu ranh giới rõ ràng khiến thành viên tàng hình tiếp tục lười biếng.",
        "answer": "Diễn biến: Bạn cắn răng gánh trọn đống việc thay cho hai thành viên tàng hình, thức xuyên đêm hoàn thành bài trong sự ấm ức và kiệt sức.\n\nKết quả: Bài kịp nộp đúng hạn nhưng bạn kiệt sức, đồng thời tạo tiền lệ cực xấu cho các lần sau.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Đảm bảo được điểm số và sự an toàn cho hạn chót nộp bài của cả nhóm.\n• Hạn chế: Dung túng cho hành vi vô kỷ luật, thiếu ranh giới rõ ràng khiến thành viên tàng hình tiếp tục lười biếng.\n\n📌 Bài học rút ra: Âm thầm gánh nợ trong uất ức chỉ nuôi dưỡng thói quen ỷ lại và tước đi ranh giới tự tôn của người làm việc nghiêm túc.",
        "npcReaction": "Hệ thống: (Bạn thức trắng đêm đến 4h sáng viết lại toàn bộ phần lý thuyết, kiệt sức...).",
        "expressions": {
          "QC": "sad",
          "A": "idle",
          "B": "idle",
          "Leader": "confused"
        }
      },
      {
        "text": "C. Chủ động nhắn tin riêng (1-on-1) để nắm bắt và hỗ trợ",
        "name": "Vấn đề giải quyết êm đẹp, thành viên được kéo lại quỹ đạo",
        "type": "good",
        "template": "A ơi, tớ thấy phần của cậu chưa thấy up lên drive. Cậu đang gặp khó ở mục nào để tớ hoặc các bạn hỗ trợ cùng đẩy nhanh trước 21h nhé?",
        "development": "A sượng sùng nhận ra lỗi vì mải chơi và gửi bài bù ngay sau đó 30 phút; B thừa nhận bị ngợp kiến thức và nhờ trợ giúp. Bài hoàn thành đúng hạn.",
        "result": "Vấn đề được giải quyết êm đẹp, thành viên tàng hình được kéo trở lại quỹ đạo nhóm.",
        "positive": "Tôn trọng cá nhân qua kênh riêng tư, dùng sự hỗ trợ thay vì phán xét giúp gỡ bỏ tâm lý phòng thủ.",
        "negative": "Tốn thêm thời gian và tâm sức cá nhân của bạn để đi \"nhắc việc\" từng người.",
        "answer": "Diễn biến: A sượng sùng nhận ra lỗi vì mải chơi và gửi bài bù ngay sau đó 30 phút; B thừa nhận bị ngợp kiến thức và nhờ trợ giúp. Bài hoàn thành đúng hạn.\n\nKết quả: Vấn đề được giải quyết êm đẹp, thành viên tàng hình được kéo trở lại quỹ đạo nhóm.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tôn trọng cá nhân qua kênh riêng tư, dùng sự hỗ trợ thay vì phán xét giúp gỡ bỏ tâm lý phòng thủ.\n• Hạn chế: Tốn thêm thời gian và tâm sức cá nhân của bạn để đi \"nhắc việc\" từng người.\n\n📌 Bài học rút ra: Đối thoại 1-1 tinh tế, dùng câu hỏi tháo gỡ khó khăn thay vì kết tội giúp người phạm lỗi giữ được thể diện và tích cực sửa sai.",
        "npcReaction": "A: \"Ui ngại quá, tớ đang bị bí tài liệu phần 2, cậu gửi tớ xin link tham khảo với nhé, tớ viết xong nộp luôn!\"",
        "expressions": {
          "QC": "happy",
          "A": "embarrassed",
          "B": "happy",
          "Leader": "happy"
        }
      }
    ]
  },
  "2:2": {
    "title": "Đùn đẩy không ai chịu làm Trưởng nhóm",
    "prompt": "Nhóm vừa lập, ai cũng sợ trách nhiệm và từ chối làm Leader. Bạn muốn nhóm sớm có người điều phối nhưng không muốn tự biến mình thành người gánh toàn bộ. Là Active Follower, bạn làm gì?",
    "role": "follower",
    "messages": [
      [
        "Active Follower",
        "Chào mọi người, cô bắt buộc mỗi nhóm phải có 1 Leader để triển khai dự án đấy ạ. Ai nhận làm Leader không ạ?"
      ],
      [
        "A",
        "Tớ yếu khoản này lắm bạn ơii, với lại bận lắm không theo được đâu, giao cho người khác đi."
      ],
      [
        "B",
        "Tớ làm gì cũng được trừ làm leader nha ><, sợ không gánh nổi điểm nhóm á."
      ],
      [
        "Hệ thống",
        "(Toàn bộ nhóm chìm vào im lặng, không ai lên tiếng nữa)"
      ]
    ],
    "choices": [
      {
        "text": "A. Công kích sự ích kỷ cá nhân trên nhóm",
        "name": "Nhóm đứng trước bờ vực giải thể, không triển khai được dự án",
        "type": "bad",
        "template": "Ủa các bạn ơi, ai cũng sợ chịu trách nhiệm thì ai làm? Sao các bạn ích kỷ thế. Cứ đùn đẩy nhau thế này thì giải tán nhóm luôn đi!",
        "development": "Cả nhóm lập tức phản ứng ngược, nhảy vào bênh vực nhau và chửi qua chửi lại, nhóm chat biến thành bãi chiến trường.",
        "result": "Nhóm đứng trước bờ vực giải thể và không triển khai dự án được.",
        "positive": "Thẳng thắn vạch trần thói quen ỷ lại, đùn đẩy trách nhiệm của các thành viên.",
        "negative": "Dùng từ ngữ mang tính công kích cá nhân nặng nề, làm tình hình ngày càng trầm trọng và phá nát tinh thần đoàn kết.",
        "answer": "Diễn biến: Cả nhóm lập tức phản ứng ngược, nhảy vào bênh vực nhau và chửi qua chửi lại, nhóm chat biến thành bãi chiến trường.\n\nKết quả: Nhóm đứng trước bờ vực giải thể và không triển khai dự án được.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thẳng thắn vạch trần thói quen ỷ lại, đùn đẩy trách nhiệm của các thành viên.\n• Hạn chế: Dùng từ ngữ mang tính công kích cá nhân nặng nề, làm tình hình ngày càng trầm trọng và phá nát tinh thần đoàn kết.\n\n📌 Bài học rút ra: Chỉ trích sự e ngại của người khác bằng lời lẽ gay gắt không giải quyết được vấn đề mà chỉ làm tan rã niềm tin vừa chớm nở.",
        "npcReaction": "B: \"Gì mà ích kỷ? Người ta bận ôn thi thật thì bảo bận, bạn nói năng cho cẩn thận nhé!\"",
        "expressions": {
          "Follower": "angry",
          "A": "worried",
          "B": "angry",
          "Leader": "sad"
        }
      },
      {
        "text": "B. Bấm bụng tự nhận làm Leader bất đắc dĩ",
        "name": "Bạn ôm trọn áp lực, thành viên còn lại hoàn toàn ngoài lề",
        "type": "mid",
        "template": "Thôi được rồi, không ai nhận thì để tớ tự đứng tên nhận Leader vậy, mệt mỏi với mấy cậu quá.",
        "development": "Bạn trở thành Leader bất đắc dĩ trong sự ấm ức. Các thành viên khác thấy bạn gánh thì mặc nhiên phó mặc, không thèm hỗ trợ hay đóng góp ý kiến gì thêm.",
        "result": "Bạn ôm trọn áp lực một mình, các thành viên còn lại trở nên hoàn toàn ngoài lề.",
        "positive": "Giải quyết yêu cầu có Leader, nhóm vẫn có người dẫn dắt.",
        "negative": "Ôm đồm sai cách, tạo khoảng cách lớn giữa Leader và các thành viên, dễ dẫn đến kiệt sức sớm.",
        "answer": "Diễn biến: Bạn trở thành Leader bất đắc dĩ trong sự ấm ức. Các thành viên khác thấy bạn gánh thì mặc nhiên phó mặc, không thèm hỗ trợ hay đóng góp ý kiến gì thêm.\n\nKết quả: Bạn ôm trọn áp lực một mình, các thành viên còn lại trở nên hoàn toàn ngoài lề.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Giải quyết yêu cầu có Leader, nhóm vẫn có người dẫn dắt.\n• Hạn chế: Ôm đồm sai cách, tạo khoảng cách lớn giữa Leader và các thành viên, dễ dẫn đến kiệt sức sớm.\n\n📌 Bài học rút ra: Nhận lãnh đạo trong trạng thái ấm ức là tự cô lập mình, vô tình tạo ra sự thụ động và ỷ lại cho toàn bộ thành viên còn lại.",
        "npcReaction": "A: \"Ok thế cảm ơn bạn nhé! Bạn là Leader thì có gì phân công rõ ràng lên nhóm nha!\"",
        "expressions": {
          "Follower": "worried",
          "A": "happy",
          "B": "idle",
          "Leader": "idle"
        }
      },
      {
        "text": "C. Đề xuất cơ chế \"Leader luân phiên\" và chia nhỏ trách nhiệm",
        "name": "Giải quyết triệt để nỗi sợ trách nhiệm, phân quyền rõ ràng",
        "type": "good",
        "template": "Thôi thế này nhé, ai cũng sợ ôm đồm thì tụi mình chia nhỏ ra: A chịu trách nhiệm nộp bài, B làm outline, còn tớ đứng tên đại diện nhận đề tài vòng này, vòng sau mình đổi vai nhé!",
        "development": "Mọi người đồng ý ngay vì trách nhiệm được chia đều, không ai cảm thấy bị ép buộc gánh nặng một mình. Nhóm bắt đầu bàn bạc đề tài rất sôi nổi.",
        "result": "Giải quyết triệt để nỗi sợ trách nhiệm của tập thể, phân quyền rõ ràng và nhóm đi vào hoạt động trơn tru.",
        "positive": "Chia nhỏ rủi ro và trách nhiệm, tạo sự an tâm tâm lý cho các thành viên e dè.",
        "negative": "Đòi hỏi cơ chế phối hợp chặt chẽ hơn để không bị chồng chéo nhiệm vụ giữa các vòng.",
        "answer": "Diễn biến: Mọi người đồng ý ngay vì trách nhiệm được chia đều, không ai cảm thấy bị ép buộc gánh nặng một mình. Nhóm bắt đầu bàn bạc đề tài rất sôi nổi.\n\nKết quả: Giải quyết triệt để nỗi sợ trách nhiệm của tập thể, phân quyền rõ ràng và nhóm đi vào hoạt động trơn tru.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Chia nhỏ rủi ro và trách nhiệm, tạo sự an tâm tâm lý cho các thành viên e dè.\n• Hạn chế: Đòi hỏi cơ chế phối hợp chặt chẽ hơn để không bị chồng chéo nhiệm vụ giữa các vòng.\n\n📌 Bài học rút ra: Active Follower thông minh biết hóa giải nỗi sợ gánh vác bằng cách module hóa trách nhiệm, biến áp lực cá nhân thành cam kết tập thể.",
        "npcReaction": "A: \"Ý này chuẩn nè! Chia nhỏ ra thế này ai cũng có trách nhiệm mà không bị áp lực một mình!\"",
        "expressions": {
          "Follower": "happy",
          "A": "happy",
          "B": "happy",
          "Leader": "happy"
        }
      }
    ]
  },
  "2:3": {
    "title": "Bất đồng về cách làm việc (Tiến độ)",
    "prompt": "Một bạn muốn họp online gấp tối mai, một bạn kẹt lịch ôn thi giữa kỳ gay gắt. Icon phẫn nộ xuất hiện, nhóm chat đóng băng. Là Mediator, bạn can thiệp thế nào?",
    "role": "mediator",
    "messages": [
      [
        "A",
        "Tớ đề nghị mai 20h họp team qua Meet chốt ngay cái outline đi nhé, để chậm là cuống cuồng đấy mọi người."
      ],
      [
        "B",
        "Trời ơi sớm thế làm gì, tuần sau thi giữa kỳ bận chết đi được, từ từ thong thả chứ, ép nhau thế làm sao thở nổi."
      ],
      [
        "Hệ thống",
        "(A thả icon \"Phẫn nộ\" 😡 rồi im bặt. B cũng seen và không nói gì thêm. Không khí nhóm đóng băng)."
      ]
    ],
    "choices": [
      {
        "text": "A. Bênh vực cảm tính một phía để làm dịu tình hình",
        "name": "Xung đột không được giải quyết, chia rẽ nội bộ sâu sắc",
        "type": "bad",
        "template": "Ông A cứ từ từ làm gì mà căng thế, người ta còn bận thi giữa kỳ cơ mà, đừng có áp đặt thời gian lên người khác chứ.",
        "development": "A cảm thấy bị cô lập, bất công và tức tối rời khỏi nhóm chat. Nhóm bị chia thành hai phe phái đối địch rõ rệt.",
        "result": "Xung đột không được giải quyết mà còn khoét sâu thêm sự chia rẽ nội bộ.",
        "positive": "Thấu hiểu và bảo vệ quyền lợi trước mắt cho thành viên đang bận lịch thi cử.",
        "negative": "Giải quyết mang tính cảm tính một chiều, làm tổn thương và gây ức chế cho người đề cao tính kỷ luật tiến độ.",
        "answer": "Diễn biến: A cảm thấy bị cô lập, bất công và tức tối rời khỏi nhóm chat. Nhóm bị chia thành hai phe phái đối địch rõ rệt.\n\nKết quả: Xung đột không được giải quyết mà còn khoét sâu thêm sự chia rẽ nội bộ.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thấu hiểu và bảo vệ quyền lợi trước mắt cho thành viên đang bận lịch thi cử.\n• Hạn chế: Giải quyết mang tính cảm tính một chiều, làm tổn thương và gây ức chế cho người đề cao tính kỷ luật tiến độ.\n\n📌 Bài học rút ra: Người hòa giải tuyệt đối không đứng về một bên; thiên vị cảm tính sẽ biến mâu thuẫn công việc thành bất mãn cá nhân.",
        "npcReaction": "A: \"Ủa tớ lo cho tiến độ chung của nhóm mà cậu lại bảo tớ áp đặt? Thôi khỏi họp luôn!\"",
        "expressions": {
          "Mediator": "sad",
          "A": "angry",
          "B": "happy",
          "Leader": "worried"
        }
      },
      {
        "text": "B. Đưa ra lời khuyên chung chung, né tránh xung đột",
        "name": "Xung đột chìm xuống nhưng âm ỉ phá hoại khả năng phối hợp",
        "type": "mid",
        "template": "Thôi mỗi người nhường nhau một bước đi nhé, cãi nhau làm gì cho mệt mỏi ra, từ từ rồi tính tiếp.",
        "development": "Câu nói hòa giải hời hợt không chạm đến gốc rễ vấn đề. Hai bên tiếp tục giữ thái độ bất mãn ngầm, không ai chịu nhường ai và tiến độ nhóm giậm chân tại chỗ.",
        "result": "Xung đột chìm xuống bề mặt nhưng âm ỉ phá hoại khả năng phối hợp của nhóm.",
        "positive": "Tránh được một trận cãi vã nảy lửa ngay lập tức trong nhóm chat chung.",
        "negative": "Né tránh giải quyết vấn đề cốt lõi, khiến điểm nghẽn vẫn y nguyên không có lối thoát.",
        "answer": "Diễn biến: Câu nói hòa giải hời hợt không chạm đến gốc rễ vấn đề. Hai bên tiếp tục giữ thái độ bất mãn ngầm, không ai chịu nhường ai và tiến độ nhóm giậm chân tại chỗ.\n\nKết quả: Xung đột chìm xuống bề mặt nhưng âm ỉ phá hoại khả năng phối hợp của nhóm.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tránh được một trận cãi vã nảy lửa ngay lập tức trong nhóm chat chung.\n• Hạn chế: Né tránh giải quyết vấn đề cốt lõi, khiến điểm nghẽn vẫn y nguyên không có lối thoát.\n\n📌 Bài học rút ra: Khuyên nhủ chung chung không phải hòa giải; né tránh vấn đề chỉ làm xung đột âm ỉ kéo dài.",
        "npcReaction": "B: \"(seen)... Cả hai bên đều không hài lòng và không ai chịu nhường ai.\"",
        "expressions": {
          "Mediator": "confused",
          "A": "angry",
          "B": "angry",
          "Leader": "worried"
        }
      },
      {
        "text": "C. Đóng vai trò điều phối tìm điểm giao thoa lợi ích (Win-Win)",
        "name": "Xung đột tháo gỡ hoàn hảo, tiến độ đảm bảo không quá sức",
        "type": "good",
        "template": "Hiểu ý hai cậu nè! A lo xa sợ sát deadline cuống, còn B thì đang vướng lịch ôn thi giữa kỳ đúng không? Hay thế này, tụi mình chốt nhanh 15 phút đầu tuần này để duyệt khung sườn ý chính, còn phần viết chi tiết thì lùi lại sau lịch thi của B nhé. Cả nhà thấy sao?",
        "development": "Cả A và B đều cảm thấy nhu cầu cá nhân được lắng nghe. Thỏa hiệp được thiết lập vui vẻ: chốt nhanh khung sườn gọn nhẹ và giãn thời gian viết chi tiết.",
        "result": "Xung đột được tháo gỡ hoàn hảo, tiến độ được đảm bảo mà không ép buộc ai quá sức.",
        "positive": "Áp dụng kỹ thuật công nhận cảm xúc và tìm điểm giao thoa lợi ích cực kỳ khéo léo.",
        "negative": "Mediator cần có sự quan sát tinh tế và khả năng tổng hợp vấn đề nhanh chóng.",
        "answer": "Diễn biến: Cả A và B đều cảm thấy nhu cầu cá nhân được lắng nghe. Thỏa hiệp được thiết lập vui vẻ: chốt nhanh khung sườn gọn nhẹ và giãn thời gian viết chi tiết.\n\nKết quả: Xung đột được tháo gỡ hoàn hảo, tiến độ được đảm bảo mà không ép buộc ai quá sức.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Áp dụng kỹ thuật công nhận cảm xúc và tìm điểm giao thoa lợi ích cực kỳ khéo léo.\n• Hạn chế: Mediator cần có sự quan sát tinh tế và khả năng tổng hợp vấn đề nhanh chóng.\n\n📌 Bài học rút ra: Lắng nghe mối lo của cả hai phía và đề xuất giải pháp win-win là chìa khóa vàng tháo gỡ mọi bất đồng.",
        "npcReaction": "A: \"Được thế thì tốt quá, 15 phút chốt sườn bài thôi là tớ yên tâm rồi! B cứ tập trung thi nhé!\"",
        "expressions": {
          "Mediator": "happy",
          "A": "happy",
          "B": "happy",
          "Leader": "happy"
        }
      }
    ]
  },
  "2:4": {
    "title": "Nghi ngờ năng lực và tự ý xóa bài",
    "prompt": "Công sức cả buổi chiều viết phân tích thị trường bị A tự ý xóa trắng không báo trước kèm lời chê bai lủng củng. Bạn muốn bảo vệ công sức mà không gây cãi vã vỡ trận. Là Doer, bạn phản ứng ra sao?",
    "role": "doer",
    "messages": [
      [
        "Doer",
        "Tớ vừa hoàn thành xong phần phân tích thị trường rồi nhé, mọi người vào đọc thử xem ổn chưa nha. (Link_Google_Doc)"
      ],
      [
        "A",
        "Ơ cái phần này bạn viết lủng củng quá, tớ đọc thấy kỳ quá nên tớ vừa xóa sạch để viết lại đoạn mới rồi đấy nhé. Lần sau bạn viết cẩn thận hơn đi."
      ],
      [
        "Hệ thống",
        "(Bạn sững sờ vì công sức cả buổi chiều bị xóa trắng không một lời tôn trọng)."
      ]
    ],
    "choices": [
      {
        "text": "A. Nổi giận ăn miếng trả miếng, phá hoại ngược lại",
        "name": "Chiến tranh bùng nổ công khai, cả nhóm rơi vào hỗn loạn",
        "type": "bad",
        "template": "Thích thì tự làm một mình đi xem giỏi đến đâu mà dám xóa bài người khác! Tao vào xóa luôn phần của mày cho vừa lòng nhé!",
        "development": "Bạn tức giận lao vào Google Doc xóa bài của A, đồng thời đôi bên chửi bới lẫn nhau thậm tệ trên nhóm chat chung khiến các thành viên phải chú ý.",
        "result": "Chiến tranh bùng nổ công khai, cả nhóm rơi vào trạng thái hỗn loạn.",
        "positive": "Phản xạ tự nhiên để bảo vệ lòng tự trọng và công sức cá nhân ngay lúc đó.",
        "negative": "Phản ứng bốc đồng, ăn miếng trả miếng làm gia tăng sự phá hoại lẫn nhau thay vì giải quyết chuyên nghiệp.",
        "answer": "Diễn biến: Bạn tức giận lao vào Google Doc xóa bài của A, đồng thời đôi bên chửi bới lẫn nhau thậm tệ trên nhóm chat chung khiến các thành viên phải chú ý.\n\nKết quả: Chiến tranh bùng nổ công khai, cả nhóm rơi vào trạng thái hỗn loạn.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Phản xạ tự nhiên để bảo vệ lòng tự trọng và công sức cá nhân ngay lúc đó.\n• Hạn chế: Phản ứng bốc đồng, ăn miếng trả miếng làm gia tăng sự phá hoại lẫn nhau thay vì giải quyết chuyên nghiệp.\n\n📌 Bài học rút ra: Ăn miếng trả miếng bằng sự phá hoại chỉ biến bạn từ người bị hại thành người có lỗi và chôn vùi toàn bộ thành quả của cả nhóm.",
        "npcReaction": "A: \"Cậu dám vào xóa phần của tớ á? Cậu có tin tớ báo giảng viên là cậu phá hoại bài nhóm không?\"",
        "expressions": {
          "Doer": "angry",
          "A": "angry",
          "QC": "worried",
          "Leader": "worried"
        }
      },
      {
        "text": "B. Ngậm đắng nuốt cay chịu đựng, tự ti thu mình",
        "name": "Bạn trở thành bóng mờ trong nhóm, tâm lý tổn thương",
        "type": "bad",
        "template": "Thôi chắc văn mình kém thật nên bạn ấy mới xóa... Thôi kệ cho bạn ấy tự làm hết vậy, mình không dám ý kiến gì nữa.",
        "development": "Bạn thu mình lại, nuôi mối hờn ghen và sự tự ti ngầm, mất hoàn toàn động lực cống hiến cho các phần việc tiếp theo của đồ án.",
        "result": "Bạn trở thành bóng mờ trong nhóm, tâm lý tổn thương nặng nề suốt kỳ học.",
        "positive": "Tránh được một cuộc tranh chấp trực diện gây mất đoàn kết trước mắt.",
        "negative": "Đánh mất ranh giới tôn trọng cá nhân, nuôi dưỡng sự tự ti và độc hại ngầm trong nhóm.",
        "answer": "Diễn biến: Bạn thu mình lại, nuôi mối hờn ghen và sự tự ti ngầm, mất hoàn toàn động lực cống hiến cho các phần việc tiếp theo của đồ án.\n\nKết quả: Bạn trở thành bóng mờ trong nhóm, tâm lý tổn thương nặng nề suốt kỳ học.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tránh được một cuộc tranh chấp trực diện gây mất đoàn kết trước mắt.\n• Hạn chế: Đánh mất ranh giới tôn trọng cá nhân, nuôi dưỡng sự tự ti và độc hại ngầm trong nhóm.\n\n📌 Bài học rút ra: Cam chịu sự bất công không phải là nhẫn nhịn, mà là tự đánh mất tiếng nói và lòng tự trọng làm việc.",
        "npcReaction": "Hệ thống: (Bạn âm thầm chịu ấm ức, suốt những buổi họp sau không dám lên tiếng nữa...).",
        "expressions": {
          "Doer": "sad",
          "A": "idle",
          "QC": "confused",
          "Leader": "idle"
        }
      },
      {
        "text": "C. Đặt ranh giới lịch sự nhưng kiên quyết dựa trên nguyên tắc chuyên nghiệp",
        "name": "Thiết lập lại sự tôn trọng, biến mâu thuẫn thành phối hợp",
        "type": "good",
        "template": "A ơi, nếu phần nào chưa chuẩn ý cậu thì cậu có thể note lại để tụi mình cùng thảo luận sửa chung, chứ cậu xóa trắng phần tớ làm mà không báo trước như vậy là phủ nhận hoàn toàn công sức của tớ đấy. Mình cùng mở lịch sử chỉnh sửa xem lại đóng góp nhé!",
        "development": "A sượng sùng nhận ra hành vi thiếu lịch sự của mình, nhắn tin xin lỗi riêng và khôi phục lại bản thảo cũ để cả hai cùng ngồi biên tập lại chỉn chu hơn.",
        "result": "Thiết lập lại được sự tôn trọng lẫn nhau, biến mâu thuẫn thành cơ chế phối hợp tốt hơn.",
        "positive": "Đặt ranh giới chuyên nghiệp rõ ràng, bảo vệ công sức cá nhân nhưng vẫn giữ văn hóa trao đổi mang tính xây dựng.",
        "negative": "Đòi hỏi sự bình tĩnh và lý trí cao từ người bị hại trong tình huống bức xúc.",
        "answer": "Diễn biến: A sượng sùng nhận ra hành vi thiếu lịch sự của mình, nhắn tin xin lỗi riêng và khôi phục lại bản thảo cũ để cả hai cùng ngồi biên tập lại chỉn chu hơn.\n\nKết quả: Thiết lập lại được sự tôn trọng lẫn nhau, biến mâu thuẫn thành cơ chế phối hợp tốt hơn.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Đặt ranh giới chuyên nghiệp rõ ràng, bảo vệ công sức cá nhân nhưng vẫn giữ văn hóa trao đổi mang tính xây dựng.\n• Hạn chế: Đòi hỏi sự bình tĩnh và lý trí cao từ người bị hại trong tình huống bức xúc.\n\n📌 Bài học rút ra: Bảo vệ công sức bằng sự bình tĩnh, dựa trên quy trình chuyên nghiệp và dữ liệu minh bạch là cách ứng xử đẳng cấp nhất.",
        "npcReaction": "A: \"À tớ xin lỗi nhé... tớ nóng vội quá. Để tớ bấm khôi phục lại lịch sử bản cũ rồi hai đứa mình cùng chỉnh nha!\"",
        "expressions": {
          "Doer": "happy",
          "A": "embarrassed",
          "QC": "happy",
          "Leader": "happy"
        }
      }
    ]
  },
  "2:5": {
    "title": "Thành viên gây đóng băng không khí bằng bạo lực ngôn từ",
    "prompt": "A dùng lời lẽ cay nghiệt chỉ trích slide đồng đội là \"mắt có vấn đề\", cả nhóm chìm vào sợ hãi và im lặng chết chóc. Bạn muốn bảo vệ an toàn tâm lý cho nhóm mà không kích động A bỏ ngang. Là Leader, bạn can thiệp thế nào?",
    "role": "leader",
    "messages": [
      [
        "A",
        "Slide kiểu gì mà chữ rít rít với nhau thế này? Đứa nào làm cái slide này mắt có vấn đề à? Sửa lại ngay đi cho tao, chán chẳng buồn nói!"
      ],
      [
        "Hệ thống",
        "(Cả nhóm chìm vào im lặng chết chóc, không ai dám bấm vào nhận xét hay thả icon vì sợ bị chửi tiếp vào mặt)."
      ]
    ],
    "choices": [
      {
        "text": "A. Hùa theo để thể hiện quyền lực ép đàn em",
        "name": "Nhóm bị chia rẽ sâu sắc, chất lượng bài làm lao dốc",
        "type": "bad",
        "template": "Đúng rồi đấy, làm ăn cẩu thả vừa thôi chứ, sửa nhanh lên không tao gạch tên khỏi danh sách bây giờ đấy nhé!",
        "development": "Môi trường nhóm trở nên độc hại tột cùng, các thành viên còn lại bị ức chế tâm lý nặng nề, âm thầm bất mãn và quyết định đình công ngầm.",
        "result": "Nhóm bị chia rẽ sâu sắc, chất lượng bài làm lao dốc do không ai còn tâm trạng làm việc.",
        "positive": "Tỏ ra nghiêm khắc để siết chặt kỷ luật và tiến độ chung của bài tập.",
        "negative": "Dung túng và cổ súy cho hành vi bạo lực ngôn từ, phá hủy hoàn toàn sự an toàn tâm lý của tập thể.",
        "answer": "Diễn biến: Môi trường nhóm trở nên độc hại tột cùng, các thành viên còn lại bị ức chế tâm lý nặng nề, âm thầm bất mãn và quyết định đình công ngầm.\n\nKết quả: Nhóm bị chia rẽ sâu sắc, chất lượng bài làm lao dốc do không ai còn tâm trạng làm việc.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Tỏ ra nghiêm khắc để siết chặt kỷ luật và tiến độ chung của bài tập.\n• Hạn chế: Dung túng và cổ súy cho hành vi bạo lực ngôn từ, phá hủy hoàn toàn sự an toàn tâm lý của tập thể.\n\n📌 Bài học rút ra: Lãnh đạo bằng sự đe dọa và độc hại sẽ giết chết động lực cống hiến và sự trung thành của đồng đội.",
        "npcReaction": "Hệ thống: (Cả nhóm bị đe dọa, không khí cực kỳ ngột ngạt, mọi người bắt đầu đình công ngầm...).",
        "expressions": {
          "Leader": "angry",
          "A": "angry",
          "QC": "sad",
          "Doer": "sad"
        }
      },
      {
        "text": "B. Sợ hãi né tránh, âm thầm tự đi sửa hộ để yên thân",
        "name": "A trở thành \"bố thiên hạ\", bạn kiệt sức vì ôm việc hộ",
        "type": "bad",
        "template": "Thôi mọi người đừng cãi nhau nữa... Để tớ tự vào sửa lại slide hộ bạn ấy cho xong chuyện, đỡ nghe mắng.",
        "development": "Bạn chọn cách nhún nhường né tránh xung đột độc hại. A thấy vậy càng được đà lấn tới, tiếp tục có những lời lẽ trịch thượng ở các lần họp sau.",
        "result": "A trở thành \"bố thiên hạ\" trong nhóm, bạn thì kiệt sức vì phải ôm việc hộ người khác.",
        "positive": "Xoa dịu tạm thời cơn thịnh nộ trước mắt của thành viên tính nóng.",
        "negative": "Né tránh xung đột độc hại, làm suy yếu vai trò lãnh đạo và dung túng cái tôi quá trớn.",
        "answer": "Diễn biến: Bạn chọn cách nhún nhường né tránh xung đột độc hại. A thấy vậy càng được đà lấn tới, tiếp tục có những lời lẽ trịch thượng ở các lần họp sau.\n\nKết quả: A trở thành \"bố thiên hạ\" trong nhóm, bạn thì kiệt sức vì phải ôm việc hộ người khác.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Xoa dịu tạm thời cơn thịnh nộ trước mắt của thành viên tính nóng.\n• Hạn chế: Né tránh xung đột độc hại, làm suy yếu vai trò lãnh đạo và dung túng cái tôi quá trớn.\n\n📌 Bài học rút ra: Im lặng trước hành vi bạo lực ngôn từ là gián tiếp tiếp tay cho môi trường làm việc độc hại phát triển.",
        "npcReaction": "A: \"Đấy, sửa lại thế có phải nhanh không, lần sau làm ăn cho cẩn thận vào!\"",
        "expressions": {
          "Leader": "sad",
          "A": "angry",
          "QC": "worried",
          "Doer": "sad"
        }
      },
      {
        "text": "C. Thiết lập ranh giới bảo vệ an toàn tâm lý nhóm",
        "name": "Lấy lại an toàn tâm lý, biến áp lực thành góp ý xây dựng",
        "type": "good",
        "template": "A ơi, bình tĩnh nào cậu ơi! Mọi người đều đang cố gắng hết sức đấy. Phần slide đúng là chưa thoáng mắt thật, nhưng thay vì cáu gắt thì cậu góp ý cụ thể giúp phần nào để bạn làm slide dễ sửa nhé. Tụi mình giữ tinh thần vui vẻ hoàn thiện bài nha!",
        "development": "Không khí ngột ngạt được giải tỏa ngay lập tức. A hạ cái tôi xuống và gửi lời xin lỗi vì nóng tính, các thành viên khác lấy lại tinh thần cùng nhau trau chuốt lại slide.",
        "result": "Lấy lại được sự an toàn tâm lý cho nhóm, biến áp lực độc hại thành sự góp ý xây dựng mang tính chuyên nghiệp.",
        "positive": "Thiết lập ranh giới giao tiếp văn minh, bảo vệ an toàn tâm lý cho nhóm nhưng vẫn giữ được mục tiêu công việc.",
        "negative": "Leader phải đủ bản lĩnh và sự khéo léo để vừa dập tắt nóng giận vừa không làm tình hình căng thêm.",
        "answer": "Diễn biến: Không khí ngột ngạt được giải tỏa ngay lập tức. A hạ cái tôi xuống và gửi lời xin lỗi vì nóng tính, các thành viên khác lấy lại tinh thần cùng nhau trau chuốt lại slide.\n\nKết quả: Lấy lại được sự an toàn tâm lý cho nhóm, biến áp lực độc hại thành sự góp ý xây dựng mang tính chuyên nghiệp.",
        "lesson": "💡 Phân tích nguyên nhân:\n• Tích cực: Thiết lập ranh giới giao tiếp văn minh, bảo vệ an toàn tâm lý cho nhóm nhưng vẫn giữ được mục tiêu công việc.\n• Hạn chế: Leader phải đủ bản lĩnh và sự khéo léo để vừa dập tắt nóng giận vừa không làm tình hình căng thêm.\n\n📌 Bài học rút ra: Lãnh đạo xuất sắc là người kiên quyết ngăn chặn văn hóa giao tiếp độc hại, bảo vệ sự an toàn tâm lý của tập thể và chuyển hướng cơn giận thành giải pháp cụ thể.",
        "npcReaction": "A: \"Ờ... tớ xin lỗi cả nhóm nhé, tại tối qua thức khuya nên cáu gắt quá. Mình sửa lại cỡ chữ với giãn dòng là đẹp ngay thôi!\"",
        "expressions": {
          "Leader": "happy",
          "A": "embarrassed",
          "QC": "happy",
          "Doer": "happy"
        }
      }
    ]
  }
};

export const quickScenarios = {
  ...stageScenarios,
  // Ánh xạ tương thích ngược theo cặp Level:Role
  '1:doer': stageScenarios['1:0'],
  '1:leader': stageScenarios['1:1'],
  '1:qc': stageScenarios['1:2'],
  '1:mediator': stageScenarios['1:4'],
  '2:leader': stageScenarios['2:0'],
  '2:qc': stageScenarios['2:1'],
  '2:follower': stageScenarios['2:2'],
  '2:mediator': stageScenarios['2:3'],
  '2:doer': stageScenarios['2:4']
};

// Mỗi Ải:Màn có một kịch bản đảo vai riêng, đứng từ góc nhìn của nhân vật
// vừa tạo ra xung đột với vai chính ở màn đó (đúng tinh thần ROLE REVERSAL
// trong đề xuất dự án: "đảo vai thành chính nhân vật vừa xảy ra xung đột").
export const reversals = {
 '1:0': {
   title:'Đảo vai: Trở thành Doer trong nhóm bạn thân',
   messages:[
     ['Doer (suy nghĩ)','Tuần này mình dồn 3 bài tập lớn, deadline sát nút. Nhóm bạn thân cứ rủ đi chơi, mình muốn mở lời xin chia việc sớm mà ngại bị bảo là làm quá...'],
     ['Leader','Mọi người ơi, có ai làm outline chưa?']
   ],
   choices:[
     {text:'Chủ động chia sẻ tình trạng bận rộn và đề xuất họp 15 phút chia việc rõ ràng.',type:'good',
      answer:'Leader hiểu rõ hoàn cảnh, nhóm chốt nhanh đầu việc giúp bạn vừa giữ được hòa khí vừa hoàn thành bài đúng hạn.',
      lesson:'Chủ động chia sẻ khó khăn và đề xuất giải pháp là biểu hiện của tinh thần trách nhiệm, không phải yếu kém.'},
     {text:'Âm thầm chịu đựng, bấm bụng đi chơi cùng nhóm rồi tính sau.',type:'bad',
      answer:'Công việc bị dồn ứ đến sát deadline, bạn phải thức trắng đêm làm trong bức bối và mệt mỏi.',
      lesson:'Cả nể và giấu giếm áp lực chỉ làm tăng nguy cơ vỡ trận cho cả bạn lẫn cả nhóm.'}
   ]
 },
 '1:1': {
   title:'Đảo vai: Trở thành người bạn thân đang quá tải',
   messages:[
     ['Bạn thân (suy nghĩ)','Tớ cũng muốn nhận phần khó để giúp nhóm, nhưng tuần này ngập đầu 2 bài tập khác, nói ra sợ bị nghĩ là trốn việc...'],
     ['Leader','Cậu thấy phần phân tích nội dung sao, có ổn không?']
   ],
   choices:[
     {text:'Thành thật nói rõ khối lượng việc đang có và đề xuất chia nhỏ phần khó.',type:'good',
      answer:'Leader hiểu hoàn cảnh và cùng tìm cách chia việc hợp lý, không ai phải ôm quá tải.',
      lesson:'Nói thật về giới hạn của mình giúp người phân công đưa ra quyết định công bằng hơn.'},
     {text:'Gật đầu nhận đại cho qua chuyện dù biết mình không kịp làm.',type:'bad',
      answer:'Bạn thức trắng đêm vẫn không xong, bài nộp muộn khiến cả nhóm bị ảnh hưởng.',
      lesson:'Nhận việc chỉ để làm hài lòng người khác mà giấu khó khăn thật sẽ gây hậu quả cho cả nhóm.'}
   ]
 },
 '1:2': {
   title:'Đảo vai: Trở thành Doer vừa bị góp ý',
   messages:[
     ['Doer (suy nghĩ)','Mình đã cố hết sức làm slide tối qua rồi, giờ bị soi từng lỗi nhỏ thế này thấy hơi tủi thân...'],
     ['QC','Cậu xem lại phần số liệu với lỗi chính tả giúp tớ nhé?']
   ],
   choices:[
     {text:'Cảm ơn QC đã chỉ ra, xin thêm chi tiết cụ thể để sửa cho đúng.',type:'good',
      answer:'QC vui vẻ chỉ rõ từng lỗi, cả hai cùng sửa nhanh và bài tốt hơn hẳn.',
      lesson:'Đón nhận góp ý thay vì tự ái giúp bài làm tốt lên và giữ được quan hệ.'},
     {text:'Tự ái, nhắn lại rằng QC đang làm quá chuyện nhỏ.',type:'bad',
      answer:'QC cảm thấy thiện chí của mình bị xúc phạm, hai người ngại trao đổi thẳng thắn ở những phần sau.',
      lesson:'Phản ứng tự ái trước góp ý hợp lý chỉ đẩy người tốt bụng ra xa mình.'}
   ]
 },
 '1:3': {
   title:'Đảo vai: Trở thành người bạn thân xin gánh việc',
   messages:[
     ['Bạn thân (suy nghĩ)','Vé concert mua từ 2 tháng trước, nhưng nhờ bạn làm hộ thế này thì không công bằng với cậu ấy...'],
     ['Doer','Cậu có việc gấp à? Để tớ xem giúp được gì không.']
   ],
   choices:[
     {text:'Xin lỗi vì báo gấp, chỉ nhờ xem hộ phần đã làm chứ không nhờ làm thay toàn bộ.',type:'good',
      answer:'Doer thấy công sức của mình được tôn trọng nên vui vẻ hỗ trợ, cả hai đều thoải mái.',
      lesson:'Nhờ vả có giới hạn rõ ràng và biết điều giúp giữ được thiện chí của người giúp mình.'},
     {text:'Nằng nặc nhờ làm hộ toàn bộ vì "bạn bè mà".',type:'bad',
      answer:'Doer miễn cưỡng nhận lời nhưng trong lòng thấy bị lợi dụng tình bạn.',
      lesson:'Lạm dụng tình bạn để đẩy việc cho người khác sẽ làm mối quan hệ rạn nứt dần.'}
   ]
 },
 '1:4': {
   title:'Đảo vai: Trở thành Doer nghĩ người khác đã làm',
   messages:[
     ['Doer (suy nghĩ)','Lúc chia việc mình không nghe rõ ai nhận phần tổng hợp, cứ nghĩ là đã có người lo...'],
     ['Mediator','Phần tổng hợp vẫn chưa ai làm, giờ tính sao đây?']
   ],
   choices:[
     {text:'Nhận lỗi vì chưa xác nhận rõ, chủ động đề xuất cùng chia phần tổng hợp ngay.',type:'good',
      answer:'Cả nhóm nhẹ nhõm vì có người nhận trách nhiệm, công việc được giải quyết nhanh.',
      lesson:'Dám nhận phần hiểu lầm của mình giúp nhóm vượt qua bế tắc nhanh hơn đổ lỗi vòng vo.'},
     {text:'Đổ lỗi ngược lại vì "lúc đầu không ai nói rõ".',type:'bad',
      answer:'Không khí nhóm căng thẳng hơn, việc tổng hợp vẫn bị trì hoãn thêm.',
      lesson:'Đổ lỗi khi mọi người đều có phần trách nhiệm chỉ khiến nhóm mất thêm thời gian giải quyết.'}
   ]
 },
 '2:0': {
   title:'Đảo vai: Trở thành thành viên mới trong nhóm ghép',
   messages:[
     ['Minh (suy nghĩ)','Mới vào nhóm lạ, mình không biết nhận phần nào, nhưng rất ngại hỏi...'],
     ['Leader','Có ai muốn nhận phần mở đầu không?']
   ],
   choices:[
     {text:'Giới thiệu thế mạnh, hỏi rõ đầu việc và deadline.',type:'good',
      answer:'Cả nhóm bắt đầu mở lời và chủ động phân công.',
      lesson:'Phá băng bắt đầu từ một lời xác nhận cụ thể.'},
     {text:'Tiếp tục im lặng để tránh bị chú ý.',type:'bad',
      answer:'Leader không biết bạn có thể làm gì, việc bị chậm.',
      lesson:'Im lặng có thể bị hiểu nhầm là thiếu hợp tác.'}
   ]
 },
 '2:1': {
   title:'Đảo vai: Trở thành A vừa "mất tích"',
   messages:[
     ['A (suy nghĩ)','Mình bị ngợp kiến thức phần này từ đầu, sợ hỏi thì bị nghĩ là dốt nên cứ im lặng trốn tránh...'],
     ['QC','A ơi, phần của cậu đến đâu rồi, cậu ổn không?']
   ],
   choices:[
     {text:'Thành thật nói đang bị bí phần nào và nhờ hỗ trợ cụ thể.',type:'good',
      answer:'QC hỗ trợ ngay, A hoàn thành phần việc đúng hạn và nhóm tin tưởng A hơn.',
      lesson:'Thừa nhận khó khăn sớm luôn tốt hơn im lặng rồi biến mất vào phút chót.'},
     {text:'Tiếp tục im lặng vì ngại thừa nhận mình chưa làm được.',type:'bad',
      answer:'Đến hạn A vẫn không nộp gì, cả nhóm mất niềm tin vào A.',
      lesson:'Sự im lặng kéo dài khi gặp khó khăn sẽ phá vỡ hoàn toàn niềm tin của đồng đội.'}
   ]
 },
 '2:2': {
   title:'Đảo vai: Trở thành thành viên đang né vai Leader',
   messages:[
     ['A (suy nghĩ)','Mình sợ nhận Leader vì chưa từng làm, lỡ sai thì cả nhóm mất điểm vì mình...'],
     ['Active Follower','Có ai nhận Leader để nhóm bắt đầu không ạ?']
   ],
   choices:[
     {text:'Thẳng thắn nói rõ nỗi lo và đề xuất cùng chia nhỏ vai trò thay vì từ chối suông.',type:'good',
      answer:'Nhóm hiểu và cùng tìm giải pháp chia việc, không ai bị dồn ép một mình.',
      lesson:'Nói rõ lý do ngần ngại thay vì chỉ từ chối giúp nhóm tìm được giải pháp phù hợp hơn.'},
     {text:'Chỉ nói "thôi khỏi" rồi im lặng, đẩy hết cho người khác.',type:'bad',
      answer:'Nhóm chìm trong im lặng lâu hơn, một người khác phải ôm trách nhiệm trong ấm ức.',
      lesson:'Từ chối suông mà không giải thích đẩy gánh nặng tâm lý sang người khác.'}
   ]
 },
 '2:3': {
   title:'Đảo vai: Trở thành B đang ôn thi giữa kỳ',
   messages:[
     ['B (suy nghĩ)','Mình không phải lười, chỉ là lịch thi dồn dập quá, nói "từ từ" nghe có vẻ vô trách nhiệm nhưng mình thật sự đuối...'],
     ['Mediator','B ơi, cậu thấy lịch họp thế nào thì hợp lý?']
   ],
   choices:[
     {text:'Giải thích cụ thể lịch thi và đề xuất một khung giờ rõ ràng thay vì nói "từ từ" chung chung.',type:'good',
      answer:'A hiểu rõ hoàn cảnh và đồng ý điều chỉnh lịch họp phù hợp cho cả hai.',
      lesson:'Đưa ra khung thời gian cụ thể thay vì từ chối mơ hồ giúp người khác dễ thông cảm hơn.'},
     {text:'Vẫn chỉ nói "từ từ" mà không giải thích gì thêm.',type:'bad',
      answer:'A cảm thấy bị phớt lờ và càng thêm bực bội, xung đột tiếp tục căng thẳng.',
      lesson:'Từ chối mà không giải thích rõ ràng dễ bị hiểu lầm là thiếu trách nhiệm.'}
   ]
 },
 '2:4': {
   title:'Đảo vai: Trở thành A vừa xóa bài của Doer',
   messages:[
     ['A (suy nghĩ)','Mình chỉ muốn bài tốt hơn thôi, nhưng giờ nhìn lại thì xóa sạch không báo trước đúng là quá đáng...'],
     ['Doer','Cậu xóa hết phần tớ viết mà không nói gì với tớ cả.']
   ],
   choices:[
     {text:'Xin lỗi vì hành động vội vàng, đề xuất khôi phục bản cũ để cùng sửa.',type:'good',
      answer:'Doer nguôi giận, cả hai cùng ngồi biên tập lại và quan hệ được hàn gắn.',
      lesson:'Nhận lỗi thật lòng và sửa sai cụ thể là cách duy nhất khôi phục niềm tin đã mất.'},
     {text:'Khăng khăng cho rằng mình làm đúng vì "bài cũ không ổn".',type:'bad',
      answer:'Doer càng thêm tức giận, hai người gần như không muốn làm việc chung nữa.',
      lesson:'Bảo thủ không nhận sai trước một hành động gây tổn thương rõ ràng sẽ phá vỡ hoàn toàn sự hợp tác.'}
   ]
 },
 '2:5': {
   title:'Đảo vai: Trở thành A vừa buông lời cay nghiệt',
   messages:[
     ['A (suy nghĩ)','Mình chỉ đang áp lực deadline nên lỡ lời nặng, nhìn cả nhóm im bặt thế này mới thấy mình đi hơi quá...'],
     ['Leader','A bình tĩnh lại, góp ý cụ thể hơn cho bạn làm slide nhé.']
   ],
   choices:[
     {text:'Hạ giọng, xin lỗi vì nóng tính và góp ý lại cụ thể, nhẹ nhàng hơn.',type:'good',
      answer:'Không khí nhóm dịu lại, mọi người cùng sửa slide trong tinh thần thoải mái hơn.',
      lesson:'Nhận ra và sửa lỗi giao tiếp ngay khi vừa phạm phải giúp cứu vãn không khí cả nhóm.'},
     {text:'Im lặng bỏ qua, coi như mình không có gì sai.',type:'bad',
      answer:'Cả nhóm vẫn dè chừng A, không khí ngột ngạt kéo dài sang buổi họp sau.',
      lesson:'Phớt lờ hậu quả lời nói của mình khiến sự tổn thương trong nhóm không được chữa lành.'}
   ]
 }
};

