const screens = [
 {group:'01 손편지 · 튜토리얼', id:'T-01', title:'손글씨에 담긴 마음', type:'tutorial', img:'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85', text:'오래된 손편지를 한 권의 소중한 기록으로 남겨보세요.'},
 {group:'01 손편지 · 튜토리얼', id:'T-02', title:'소중한 편지를 보내주세요', type:'tutorial', img:'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=900&q=85', text:'촬영하거나 업로드하여 간편하게 등록할 수 있어요.'},
 {group:'01 손편지 · 튜토리얼', id:'T-03', title:'원래 필체를 그대로', type:'tutorial', img:'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85', text:'희미해진 글씨를 복원하고 편지 내용을 정리해요.'},
 {group:'01 손편지 · 튜토리얼', id:'T-04', title:'한 권의 서간집으로', type:'tutorial', img:'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85', text:'여러 편지를 모아 실물 책과 디지털 책자로 완성해요.', cta:'편지 등록하기'},
 {group:'02 손편지 · 등록·복원', id:'L-01', title:'편지 등록 방식', type:'register'},
 {group:'02 손편지 · 등록·복원', id:'L-02', title:'편지 업로드', type:'upload'},
 {group:'02 손편지 · 등록·복원', id:'L-03', title:'AI 분석 중', type:'analysis'},
 {group:'02 손편지 · 등록·복원', id:'L-04', title:'복원 결과 비교', type:'compare'},
 {group:'02 손편지 · 등록·복원', id:'L-05', title:'편지 내용 확인', type:'transcript'},
 {group:'03 서간집 · 제작·완성', id:'L-06', title:'수록 방식 선택', type:'ways'},
 {group:'03 서간집 · 제작·완성', id:'L-07', title:'편지 목록 정리', type:'letters'},
 {group:'03 서간집 · 제작·완성', id:'L-08', title:'서간집 디자인', type:'design'},
 {group:'03 서간집 · 제작·완성', id:'L-09', title:'페이지 편집', type:'editor'},
 {group:'03 서간집 · 제작·완성', id:'L-10', title:'완성 미리보기', type:'final'},
 {group:'04 NFC · 콘텐츠 등록', id:'K-01', title:'NFC 키링 상품', type:'product'},
 {group:'04 NFC · 콘텐츠 등록', id:'K-02', title:'추억 콘텐츠 선택', type:'contentType'},
 {group:'04 NFC · 콘텐츠 등록', id:'K-03', title:'콘텐츠 등록', type:'record'},
 {group:'04 NFC · 콘텐츠 등록', id:'K-04', title:'콘텐츠 확인', type:'contentConfirm'},
 {group:'04 NFC · 콘텐츠 등록', id:'K-05', title:'추억 페이지 편집', type:'memoryEdit'},
 {group:'05 NFC · 상품·재생', id:'K-06', title:'키링 디자인', type:'keyringDesign'},
 {group:'05 NFC · 상품·재생', id:'K-07', title:'NFC 연결 미리보기', type:'nfcPreview'},
 {group:'05 NFC · 상품·재생', id:'K-08', title:'주문 확인', type:'order'},
 {group:'05 NFC · 상품·재생', id:'K-09', title:'태그 후 재생', type:'replay'}
];

let current = 0;
const nav = document.getElementById('screenNav');
const phone = document.getElementById('phoneScreen');

const draft = {
  letters: [
    {title:'아버지에게', date:'1968. 03. 12', author:'최동인', type:'손편지'},
    {title:'서울에서', date:'1971. 05. 04', author:'김선영', type:'디지털'}
  ],
  template:'빈티지',
  title:'우리 가족의 편지',
  inclusion:'원본 + 정리본',
  editedPages:true
};

function buildNav(){
 let last=''; nav.innerHTML='';
 screens.forEach((s,i)=>{ if(s.group!==last){last=s.group; const g=document.createElement('div');g.className='nav-group';g.innerHTML=`<button class="nav-title">${s.group}</button>`;nav.appendChild(g);} 
  const b=document.createElement('button');b.className='nav-item'+(i===current?' active':'');b.innerHTML=`<b>${s.id}</b><span>${s.title}</span>`;b.onclick=()=>show(i);nav.lastElementChild.appendChild(b);
 });
}
function status(){return `<div class="status"><span>9:41</span><div class="status-icons"><span>● ● ●</span><i></i></div></div>`}
function header(title,back=true){return `<div class="app-header">${back?'<button class="icon-btn back" data-back="1">‹</button>':'<div style="width:36px"></div>'}<h1>${title}</h1><button class="icon-btn">•••</button></div>`}
function bottom(active='home'){return `<div class="bottom-nav"><button class="nav-cell ${active==='home'?'active':''}"><span>⌂</span><span>홈</span></button><button class="nav-cell ${active==='letters'?'active':''}"><span>▤</span><span>서간집</span></button><button class="nav-cell ${active==='nfc'?'active':''}"><span>◉</span><span>키링</span></button><button class="nav-cell ${active==='mine'?'active':''}"><span>○</span><span>내 정보</span></button></div>`}
function nextButton(text='다음',offset=0){return `<button class="primary next-action" data-next="${offset||1}">${text}</button>`}

function render(s){
 const n=s.id.startsWith('K')?'nfc':'letters';
 if(s.type==='tutorial'){
  phone.innerHTML=`<div class="app"><div class="tutorial">${status()}<img src="${s.img}" alt=""><div class="tutorial-copy"><div class="dots"><i></i><i></i><i></i><i></i></div><h2>${s.title}</h2><p>${s.text}</p>${s.cta?`<button class="primary next-action" data-next="10">${s.cta}</button>`:`<button class="primary next-action">다음</button>`}</div></div></div>`;return;
 }
 if(s.type==='replay'){
  phone.innerHTML=`<div class="tag-replay">${status()}<div class="tag-replay-hero"></div><div class="tag-replay-copy"><div class="eyebrow">FOR YOU</div><h2>엄마가 남겨준 한마디</h2><p>언제나 네 편이라는 걸 잊지 마</p><div class="big-player"><button class="big-play" id="playBtn">▶</button><div class="big-track"><div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="time-label"><span id="playTime">00:00</span><span>00:42</span></div></div></div></div></div>`;return;
 }
 if(s.type==='register'){
  phone.innerHTML=`<div class="app">${status()}${header('첫 편지 등록')}<div class="content scroll pad"><div class="eyebrow">서간집 시작하기</div><h2 style="font-family:'Noto Serif KR',serif;font-size:22px">어떤 편지로<br>첫 장을 만들까요?</h2><div class="option-grid"><button class="option-card active" id="firstHand"><span class="glyph">▣</span><strong>손편지 등록</strong><small>촬영 후 자동 복원</small></button><button class="option-card" id="firstDigital"><span class="glyph">▧</span><strong>디지털 편지 등록</strong><small>텍스트 또는 파일 업로드</small></button></div><div class="card" style="padding:14px;margin-top:12px"><strong style="font-size:12px">첫 편지 등록 후 서간집 초안이 생성됩니다</strong><p class="sub">표지는 나중에 자유롭게 설정할 수 있어요.</p></div><div style="height:28px"></div>${nextButton('서간집 초안 만들기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='upload'){
  phone.innerHTML=`<div class="app">${status()}${header('편지 업로드')}<div class="content scroll pad"><div class="eyebrow">4/12 페이지</div><h2 style="font-family:'Noto Serif KR',serif;font-size:20px;margin:8px 0 12px">편지 사진을 등록하세요</h2><div class="upload-zone"><div><div class="plus">＋</div><strong style="font-size:12px">사진 추가하기</strong><br><small class="sub">앞면과 뒷면을 구분해 주세요</small></div></div><div style="height:12px"></div><div class="photo-strip"><img class="photo-chip" src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=70"><img class="photo-chip" src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=300&q=70"><div class="photo-chip add">＋</div></div><div style="height:12px"></div>${nextButton('AI 분석 시작')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='analysis'){
  phone.innerHTML=`<div class="app">${status()}${header('AI 복원 분석')}<div class="content scroll"><div class="analysis-visual"><div class="paper-preview"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80"></div><div class="scan-line"></div></div><div class="progress-wrap"><div class="progress"><i></i></div><div class="progress-label"><span>필체 복원 · 텍스트 인식</span><b>72%</b></div></div><div class="pad"><p class="sub">편지의 지워진 글씨와 어두운 부분을 정밀하게 복원하고 있습니다.</p><button class="secondary" style="width:100%" id="analysisDone">분석 결과 보기</button></div></div>${bottom(n)}</div>`;return;
 }
 if(s.type==='compare'){
  phone.innerHTML=`<div class="app">${status()}${header('복원 결과')}<div class="content scroll pad"><div class="eyebrow">복원 미리보기</div><h2 style="font-family:'Noto Serif KR',serif;font-size:20px">기억을 선명하게</h2><div class="compare"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=82"><img class="after" src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=82"><div class="compare-line"></div><div class="compare-knob">↔</div><div class="compare-tags"><span>복원 전</span><span>복원 후</span></div></div><p class="sub">글씨의 흐림과 종이의 얼룩을 복원했습니다.</p>${nextButton('이 결과로 진행하기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='transcript'){
  phone.innerHTML=`<div class="app">${status()}${header('편지 내용 확인')}<div class="content scroll pad"><div class="letter-thumb"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80"></div><div style="height:10px"></div><div class="eyebrow">AI 인식 결과</div><div class="transcript">엄마가 보낸 편지야. 봄이 오면 집에서 꽃을 많이<br>피워볼까 해. 그때 너도 꼭 <span class="uncertain">돌아와</span> 주면 좋겠다.</div><button class="secondary" style="width:100%;margin-top:10px">확신할 수 없는 글자 1개 수정</button><div style="height:10px"></div>${nextButton('내용 확인 완료')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='ways'){
  phone.innerHTML=`<div class="app">${status()}${header('수록 방식')}<div class="content scroll pad"><div class="eyebrow">서간집 구성</div><h2 style="font-family:'Noto Serif KR',serif;font-size:21px">어떤 형태로 남길까요?</h2><div class="selection-list"><button class="selection-card active"><img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=70"><div><strong>원본 그대로</strong><small>복원 전 편지 이미지만 수록</small></div></button><button class="selection-card"><img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=300&q=70"><div><strong>원본 + 정리본</strong><small>이미지 옆에 인식 내용을 함께 수록</small></div></button><button class="selection-card"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=70"><div><strong>정리본만</strong><small>읽기 좋은 텍스트로 깔끔하게 구성</small></div></button></div><div style="height:12px"></div>${nextButton()}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='letters'){
  phone.innerHTML=`<div class="app">${status()}${header('서간집 편집')}<div class="content scroll pad"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="eyebrow">내 서간집 · 초안</div><h2 style="font-family:'Noto Serif KR',serif;font-size:20px;margin:6px 0">${draft.letters.length}통의 편지</h2></div><span class="pill">자동 저장됨</span></div><div class="letter-list"><div class="letter-row"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=200&q=70"><div><strong>아버지에게</strong><small>1968.03.12 · 손편지</small></div><span class="pill">복원됨</span><span class="drag">⠿</span></div><div class="letter-row"><img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=200&q=70"><div><strong>서울에서</strong><small>1971.05.04 · 디지털 편지</small></div><span class="pill">추가됨</span><span class="drag">⠿</span></div></div><div style="height:10px"></div><button class="secondary" id="addLetterBtn" style="width:100%">＋ 편지 추가하기</button><div id="addLetterMenu" class="option-grid" style="display:none;margin-top:10px"><button class="option-card"><span class="glyph">▣</span><strong>손편지</strong><small>촬영 또는 업로드</small></button><button class="option-card"><span class="glyph">▧</span><strong>디지털 편지</strong><small>텍스트 또는 파일</small></button></div><p class="sub" style="margin-top:10px">추가해도 표지와 편집한 페이지는 유지됩니다.</p><div style="height:6px"></div>${nextButton('목록 저장')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='design'){
  phone.innerHTML=`<div class="app">${status()}${header('서간집 디자인')}<div class="content scroll pad"><div class="eyebrow">표지 템플릿</div><h2 style="font-family:'Noto Serif KR',serif;font-size:20px">책의 분위기를 선택하세요</h2><div class="template-row"><button class="template active"><div class="template-book"></div><span>빈티지</span></button><button class="template"><div class="template-book"></div><span>모던</span></button><button class="template"><div class="template-book"></div><span>따뜻한</span></button></div><label class="eyebrow" style="display:block;margin-top:14px">책 제목</label><input value="우리 가족의 편지" style="width:100%;height:44px;margin-top:7px;border:1px solid var(--line);border-radius:10px;background:white;padding:0 12px;color:var(--brown-dark)"><div style="height:12px"></div>${nextButton('다음')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='editor'){
  phone.innerHTML=`<div class="app">${status()}${header('페이지 편집')}<div class="content scroll pad"><div class="editor"><div class="bookspread"><div class="page"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=70"><p>1968년 봄의 편지</p></div><div class="page"><img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=300&q=70"><p>엄마가 보낸 편지야.</p></div></div><div class="toolbox"><button class="tool">＋</button><button class="tool">T</button><button class="tool">↕</button><button class="tool">▣</button></div></div><p class="sub">사진과 글의 위치를 자유롭게 배치할 수 있습니다.</p>${nextButton('완성 미리보기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='final'){
  phone.innerHTML=`<div class="app">${status()}${header('완성 미리보기')}<div class="content scroll pad"><div class="final-cover"><div class="book3d"><small>1968—1974</small><strong>우리 가족의<br>편지</strong><small>RE ARCHIVE</small></div></div><div class="price-bar"><div><small class="sub">하드커버 · 64쪽</small><br><strong>₩89,000</strong></div><span class="pill">8통 수록</span></div><div style="height:12px"></div>${nextButton('주문하기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='product'){
  phone.innerHTML=`<div class="app">${status()}${header('RE NFC 키링',false)}<div class="content scroll"><div class="hero-keyring"><div class="keyring"><div class="tag">RE</div></div></div><div class="pad"><div class="eyebrow">SOUND · MEMORY</div><h2 style="font-family:'Noto Serif KR',serif;font-size:21px">목소리와 순간을<br>언제나 함께</h2><div class="feature-list"><div class="feature"><i>◉</i><div><strong>휴대폰에 태그</strong><small>앱 설치 없이 재생 페이지 열기</small></div></div><div class="feature"><i>♪</i><div><strong>음성·동영상 연결</strong><small>소중한 콘텐츠를 간직하세요</small></div></div></div><div style="height:10px"></div>${nextButton('키링 제작하기')}</div></div>${bottom(n)}</div>`;return;
 }
 if(s.type==='contentType'){
  phone.innerHTML=`<div class="app">${status()}${header('추억 콘텐츠')}<div class="content scroll pad"><div class="eyebrow">어떤 추억을 남길까요?</div><h2 style="font-family:'Noto Serif KR',serif;font-size:21px">키링에 담을 순간을 선택하세요</h2><div class="option-grid"><button class="option-card active" id="voiceChoice"><span class="glyph">〰</span><strong>목소리 남기기</strong><small>소중한 사람의 음성을 간직해요</small></button><button class="option-card" id="videoChoice"><span class="glyph">▻</span><strong>동영상 남기기</strong><small>함께한 순간을 다시 봐요</small></button></div><div style="height:16px"></div><div class="card" style="padding:14px"><strong style="font-size:12px">선택한 유형</strong><p class="sub" id="choiceText">목소리 녹음 또는 음성 파일 등록</p></div><div style="height:18px"></div>${nextButton()}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='record'){
  phone.innerHTML=`<div class="app">${status()}${header('목소리 남기기')}<div class="content scroll pad"><div class="record-zone"><div><button class="record-btn" id="recordBtn">●</button><div class="recording" id="recordLabel">탭하여 녹음 시작</div></div></div><div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><button class="secondary" style="width:100%">음성 파일 업로드</button><div style="height:10px"></div>${nextButton('등록하기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='contentConfirm'){
  phone.innerHTML=`<div class="app">${status()}${header('콘텐츠 확인')}<div class="content scroll pad"><div class="eyebrow">등록된 목소리</div><h2 style="font-family:'Noto Serif KR',serif;font-size:20px">엄마의 한마디</h2><div class="audio-player"><div class="playrow"><button class="play" id="playBtn">▶</button><div class="track"><strong style="font-size:11px">언제나 네 편이라는 걸 잊지 마</strong><div class="trackline"><i id="trackProgress"></i></div><div class="tracktime"><span id="playTime">00:00</span><span>00:42</span></div></div></div></div><label class="eyebrow" style="display:block;margin-top:14px">제목</label><input value="엄마가 남겨준 한마디" style="width:100%;height:44px;margin-top:7px;border:1px solid var(--line);border-radius:10px;padding:0 12px"><label class="eyebrow" style="display:block;margin-top:12px">설명</label><textarea style="width:100%;height:76px;border:1px solid var(--line);border-radius:10px;padding:10px">내가 가장 좋아하는 목소리로 늘 곁에 있어.</textarea><div style="height:10px"></div>${nextButton('추억 페이지 만들기')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='memoryEdit'){
  phone.innerHTML=`<div class="app">${status()}${header('추억 페이지')}<div class="content scroll pad"><div class="page-preview"><div class="minihero"></div><div class="page-preview-copy"><div class="eyebrow">MEMORY 01</div><h3>엄마가 남겨준 한마디</h3><p>언제나 네 편이라는 걸 잊지 마</p><button class="play" id="playBtn">▶</button></div></div><div style="height:10px"></div>${nextButton('키링 디자인 선택')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='keyringDesign'){
  phone.innerHTML=`<div class="app">${status()}${header('키링 디자인')}<div class="content scroll pad"><div class="eyebrow">형태</div><div class="shape-grid"><button class="shape-card active"><div><div class="shape-icon"></div>라운드</div></button><button class="shape-card"><div><div class="shape-icon"></div>스크웨어</div></button><button class="shape-card"><div><div class="shape-icon"></div>하트</div></button></div><label class="eyebrow" style="display:block;margin-top:12px">색상</label><div class="tag-options" style="margin-top:7px"><button class="color-dot" style="background:#9d7d58"></button><button class="color-dot" style="background:#cbb58f"></button><button class="color-dot" style="background:#6e765f"></button><button class="color-dot" style="background:#b28a7d"></button></div><div style="height:12px"></div><div class="nfc-preview" style="height:250px"><div class="keyring" style="position:absolute;left:15px;width:130px;height:130px"><div class="tag" style="width:72px;height:72px;left:19px;top:19px">RE</div></div></div><div style="display:flex;gap:8px"><button class="secondary" style="flex:1">수량 1개</button>${nextButton('다음')}</div></div>${bottom(n)}</div>`;return;
 }
 if(s.type==='nfcPreview'){
  phone.innerHTML=`<div class="app">${status()}${header('NFC 연결 미리보기')}<div class="content scroll pad"><div class="nfc-preview"><div class="keyring" style="position:absolute;left:0;width:150px;height:150px"><div class="tag">RE</div></div><div class="phone-mini"><div class="phone-mini-inner"><div class="miniimg"></div><p>엄마가 남겨준 한마디<br>▶ 재생</p></div></div></div><div class="card" style="padding:12px"><strong style="font-size:11px">태그하면 추억 페이지가 열립니다</strong><p class="sub">실제 키링은 제작 및 배송 후 사용할 수 있어요.</p></div><div style="height:10px"></div>${nextButton('연결 확인')}</div>${bottom(n)}</div>`;return;
 }
 if(s.type==='order'){
  phone.innerHTML=`<div class="app">${status()}${header('주문 확인')}<div class="content scroll pad"><div class="order-card"><div class="row"><span>상품</span><b>RE 라운드 키링 · 브라운</b></div><div class="row"><span>수량</span><b>1개</b></div><div class="row"><span>연결 콘텐츠</span><b>목소리 · 42초</b></div><div class="row"><span>배송비</span><b>무료</b></div><div class="row"><span>결제 예정액</span><b style="font-size:16px">₩39,000</b></div></div><div style="height:12px"></div><div class="card" style="padding:12px"><strong style="font-size:11px">배송지</strong><p class="sub">서울특별시 · 박은혜<br>010-1234-5678</p></div><div style="height:12px"></div>${nextButton('결제하기')}</div>${bottom(n)}</div>`;return;
 }
}

function show(i){current=i;buildNav();render(screens[i]);bindCommon();}
function bindCommon(){
 document.querySelectorAll('.next-action').forEach(b=>{b.onclick=()=>show(Math.min(screens.length-1,current+(Number(b.dataset.next||1))));});
 document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(Math.max(0,current-1)));
 document.querySelectorAll('.option-card').forEach(c=>c.onclick=()=>{const box=c.parentElement;box.querySelectorAll('.option-card').forEach(x=>x.classList.remove('active'));c.classList.add('active')});
 document.querySelectorAll('.selection-card').forEach(c=>c.onclick=()=>{const box=c.parentElement;box.querySelectorAll('.selection-card').forEach(x=>x.classList.remove('active'));c.classList.add('active')});
 document.querySelectorAll('.template,.shape-card').forEach(c=>c.onclick=()=>{c.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));c.classList.add('active')});
 const add=document.getElementById('addLetterBtn'),menu=document.getElementById('addLetterMenu');
 if(add&&menu){add.onclick=()=>{menu.style.display=menu.style.display==='grid'?'none':'grid';add.textContent=menu.style.display==='grid'?'편지 유형 선택':'＋ 편지 추가하기';};}
 const hand=document.getElementById('firstHand'),digital=document.getElementById('firstDigital');
 if(hand&&digital){hand.onclick=()=>{hand.classList.add('active');digital.classList.remove('active')};digital.onclick=()=>{digital.classList.add('active');hand.classList.remove('active')};}
 const voice=document.getElementById('voiceChoice'),video=document.getElementById('videoChoice'),choice=document.getElementById('choiceText');
 if(voice&&video){voice.onclick=()=>{voice.classList.add('active');video.classList.remove('active');choice.textContent='목소리 녹음 또는 음성 파일 등록'};video.onclick=()=>{video.classList.add('active');voice.classList.remove('active');choice.textContent='동영상 파일 또는 촬영 영상 등록'}}
 const rb=document.getElementById('recordBtn'),rl=document.getElementById('recordLabel');if(rb&&rl){let recording=false;rb.onclick=()=>{recording=!recording;rl.textContent=recording?'녹음 중 · 00:18':'녹음 완료 · 00:42';rb.style.background=recording?'#a3634e':'#75543a'}}
 const pb=document.getElementById('playBtn'),pt=document.getElementById('playTime'),prog=document.getElementById('trackProgress');if(pb){let playing=false,timer,sec=0;pb.onclick=()=>{playing=!playing;pb.textContent=playing?'Ⅱ':'▶';if(playing){timer=setInterval(()=>{sec++;if(pt)pt.textContent=`00:${String(sec).padStart(2,'0')}`;if(prog)prog.style.width=Math.min(100,sec/42*100)+'%'},1000)}else clearInterval(timer)}}
 const ad=document.getElementById('analysisDone');if(ad)ad.onclick=()=>show(current+1);
}
buildNav();show(0);
