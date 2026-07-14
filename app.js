
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();$('#loginView').classList.add('hidden');$('#appView').classList.remove('hidden');renderData();toast('已進入 AI 核心與數據中心')});
let resetTimer=null,resetSeconds=0;
function showAuthPanel(id){$$('.auth-panel').forEach(p=>p.classList.remove('active'));document.getElementById(id)?.classList.add('active')}
function editResetEmail(){showAuthPanel('forgotPanel');setTimeout(()=>document.getElementById('resetEmail')?.focus(),30)}
function togglePassword(id,btn){const input=document.getElementById(id);if(!input)return;const show=input.type==='password';input.type=show?'text':'password';if(btn)btn.textContent=show?'🙈':'👁'}
function sendResetCode(isResend=false){const emailInput=document.getElementById('resetEmail');const email=(emailInput?.value||document.getElementById('loginEmail')?.value||'demo@e2b.ai').trim();if(!email.includes('@')){toast('請先輸入有效 Email');return;}document.getElementById('verifyEmailText').textContent=email;showAuthPanel('verifyPanel');clearCodeInputs();startResetCountdown(60);toast(isResend?'驗證碼已重新寄送':'驗證信已寄送')}
function startResetCountdown(seconds){resetSeconds=seconds;const btn=document.getElementById('resendCodeBtn');const label=document.getElementById('codeCountdown');clearInterval(resetTimer);resetTimer=setInterval(()=>{resetSeconds-=1;if(btn){btn.disabled=resetSeconds>0;btn.style.opacity=resetSeconds>0?'.45':'1'}if(label)label.textContent=resetSeconds>0?`重新寄送倒數 ${resetSeconds}s`:'可重新寄送';if(resetSeconds<=0)clearInterval(resetTimer)},1000);if(btn){btn.disabled=true;btn.style.opacity='.45'}if(label)label.textContent=`重新寄送倒數 ${seconds}s`}
function clearCodeInputs(){$$('#codeInputs input').forEach(i=>i.value='');$('#codeInputs input')?.focus()}
function getResetCode(){return Array.from($$('#codeInputs input')).map(i=>i.value).join('')}
function verifyResetCode(){if(getResetCode()==='123456'){showAuthPanel('newPasswordPanel');toast('驗證成功，請設定新密碼')}else{toast('驗證碼錯誤，Demo 請輸入 123456')}}
function updatePasswordRules(){const p=document.getElementById('newPassword')?.value||'';document.getElementById('ruleLength')?.classList.toggle('ok',p.length>=8);document.getElementById('ruleCase')?.classList.toggle('ok',/[a-z]/.test(p)&&/[A-Z]/.test(p));document.getElementById('ruleNumber')?.classList.toggle('ok',/\d/.test(p))}
function updatePasswordDemo(){const p=document.getElementById('newPassword')?.value||'';const c=document.getElementById('confirmPassword')?.value||'';if(p.length<8||!/[a-z]/.test(p)||!/[A-Z]/.test(p)||!/\d/.test(p)){toast('新密碼需符合密碼規則');return;}if(p!==c){toast('兩次輸入的新密碼不一致');return;}showAuthPanel('resetDonePanel');toast('密碼已更新')}
function setupResetCodeInputs(){$$('#codeInputs input').forEach((input,idx,arr)=>{input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,1);if(input.value&&arr[idx+1])arr[idx+1].focus()});input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&arr[idx-1])arr[idx-1].focus()})});document.getElementById('newPassword')?.addEventListener('input',updatePasswordRules)}
setupResetCodeInputs();
['forgotPanel','verifyPanel','newPasswordPanel'].forEach(id=>document.getElementById(id)?.addEventListener('submit',e=>e.preventDefault()));
function closeAllSubnavs(){$$('#opsSub,#creativeSub,#assetSub').forEach(x=>x.classList.remove('show'))}
function activeNav(page){
  $$('.nav-item,.subnav-item').forEach(x=>x.classList.remove('active'));
  closeAllSubnavs();
  if(page==='data'){
    $('#navData').classList.add('active');
  } else if(['products','customers','ads','social'].includes(page)){
    $('#navOps').classList.add('active');
    $('#opsSub').classList.add('show');
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  } else if(String(page).startsWith('creative:')){
    const creativePage = page.split(':')[1];
    $('#navCreative').classList.add('active');
    $('#creativeSub').classList.add('show');
    document.querySelector(`[data-creative="${creativePage}"]`)?.classList.add('active');
  } else if(['contentLibrary','mediaLibrary'].includes(page)){
    $('#navAsset').classList.add('active');
    $('#assetSub').classList.add('show');
    document.querySelector(`[data-asset-page="${page}"]`)?.classList.add('active');
  } else if(page==='global'){
    $('#navGlobal')?.classList.add('active');
  }
}
$('#navData').onclick=e=>{e.preventDefault();$('#dataPage').classList.remove('hidden');$('#opsPage').classList.add('hidden');activeNav('data');renderData();toast('已切換到 AI 核心與數據中心')};
$('#navOps').onclick=e=>{e.preventDefault(); if($('#opsSub').classList.contains('show') && $('#navOps').classList.contains('active')){closeAllSubnavs();return;} renderOps('products')};
$('#navCreative').onclick=e=>{e.preventDefault(); if($('#creativeSub').classList.contains('show') && $('#navCreative').classList.contains('active')){closeAllSubnavs();return;} renderCreative('product')};
$$('[data-page]').forEach(a=>a.onclick=e=>{e.preventDefault();renderOps(a.dataset.page)});
$$('[data-creative]').forEach(a=>a.onclick=e=>{e.preventDefault();renderCreative(a.dataset.creative)});
$('#navAsset').onclick=e=>{e.preventDefault(); if($('#assetSub').classList.contains('show') && $('#navAsset').classList.contains('active')){$('#assetSub').classList.remove('show');return;} $('#assetSub').classList.add('show');renderAssetModule('contentLibrary')};
$$('[data-asset-page]').forEach(a=>a.onclick=e=>{e.preventDefault();renderAssetModule(a.dataset.assetPage)});
$('#navGlobal').onclick=e=>{e.preventDefault();closeAllSubnavs();renderGlobalInsight()};
$$('.disabled').forEach(a=>a.onclick=e=>{e.preventDefault();toast('這個模組下一階段串接')});
function renderData(){activeNav('data');$('#dataPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / AI 核心與數據中心</div><h1>AI 核心與數據中心</h1><p class="subtitle">集中管理 AI 知識庫、資料來源、平台串接與點數資源。</p></div></div><section class="metrics"><div class="card"><h3>檔案空間容量</h3><div class="big">12.4 GB</div><div class="muted">/ 50 GB，已使用 24.8%</div><div class="progress"><span style="width:24.8%"></span></div></div><div class="card"><h3>系統處理資料狀態</h3><div><span class="pill green">● 3 成功</span> <span class="pill amber">● 1 解析中</span> <span class="pill red">● 1 失敗</span></div><p class="muted">此區塊僅顯示處理狀態。</p></div><div class="card"><h3>資料同步狀態</h3><div class="big">5 分鐘前</div><div class="muted">下次自動同步：09:35</div><div class="progress"><span style="width:72%"></span></div></div><div class="card clickable" onclick="openUsage()"><h3>AI 點數使用量</h3><div class="big">125 / 300</div><div class="muted">本月已使用 41.7%</div><div class="progress"><span style="width:41.7%"></span></div></div></section><section class="workspace-card"><div class="workspace-tabs"><button class="tab active" data-tab="file">檔案上傳</button><button class="tab" data-tab="cloud">雲端與網址</button><button class="tab" data-tab="ads">廣告與平台串接</button></div><div id="dataWork"></div></section><div class="section-head"><div><h2>數據源管理</h2><p class="muted">共 6 筆（總計 6）</p></div><div class="filters"><select class="filter"><option>狀態：全部</option></select><select class="filter"><option>類型：全部</option></select></div></div><section class="table-card"><div class="table-tools"><input class="search" placeholder="搜尋資料名稱、標籤或來源..."><button class="btn">清除篩選</button></div><table><thead><tr><th>資料名稱 / 來源</th><th>類型</th><th>類別 / 標籤</th><th>解析狀態</th><th>更新時間</th><th>操作</th></tr></thead><tbody><tr><td><b>2026Q2_sales.csv</b></td><td>CSV</td><td><span class="tag">銷售</span></td><td><span class="pill green">● 成功</span></td><td>2026-06-08 14:32</td><td><button class="op">查看</button></td></tr><tr><td><b>新品上架清單.xlsx</b></td><td>Excel</td><td><span class="tag">新品</span></td><td><span class="pill amber">● 解析中</span></td><td>2026-06-10 09:02</td><td><button class="op">查看</button></td></tr><tr><td><b>Meta_春季促銷_廣告.json</b></td><td>MetaAds</td><td><span class="tag">廣告</span></td><td><span class="pill red">● 失敗</span></td><td>2026-06-10 08:15</td><td><button class="op">查看</button></td></tr></tbody></table></section>`;bindDataTabs();renderDataWork('file')}
function bindDataTabs(){$$('.workspace-tabs .tab').forEach(t=>t.onclick=()=>{$$('.workspace-tabs .tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderDataWork(t.dataset.tab)})}
function renderDataWork(tab){const w=$('#dataWork'); if(tab==='file')w.innerHTML=`<div class="workspace-panel active"><div class="inline-upload-card"><div class="upload-zone inline-drop" id="dataDropZone" onclick="document.getElementById('dataFileInput')?.click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="handleDataDrop(event)"><input type="file" id="dataFileInput" class="hidden" multiple accept=".xlsx,.xls,.csv,.pdf,.doc,.docx" onchange="handleDataFileUpload(event)"><div style="font-size:38px">☁️</div><h2>批次新增資料來源</h2><p class="muted">可重複瀏覽並加入多個檔案，選完後會顯示在右側清單。</p><button class="btn primary" type="button" onclick="event.stopPropagation();document.getElementById('dataFileInput')?.click()">瀏覽電腦檔案</button></div><div class="inline-upload-form"><p class="file-list-title">已瀏覽檔案清單</p><p class="file-list-help">請逐筆選擇資料類型。資料類型預設為空白，未選擇類型的檔案不能進行解析；解析前可移除已瀏覽檔案。</p><div class="file-source-list" id="dataUploadPreview"><div class="file-source-empty">尚未選擇任何檔案</div></div><button class="btn primary inline-submit" type="button" onclick="finishDataUpload()">開始上傳並解析</button></div></div></div>`; if(tab==='cloud')w.innerHTML=`<div class="workspace-panel active"><div class="cloud-grid"><div class="connect-card"><h3>☁️ Google Drive 串接</h3><div class="drive-box"><div class="round-icon">L</div><div><b>已連線</b><p class="muted">demo@e2b.ai</p></div><button class="link-danger" onclick="toast('已中斷連線')">中斷連結</button></div></div><div class="connect-card"><h3>🔗 相關網址</h3><div class="url-add"><input id="urlInput" placeholder="請輸入官網或部落格網址（https://...）"><button class="btn primary" onclick="addUrl()">＋ 新增網址</button></div><div id="urlTags"><span class="url-chip">🌐 https://my-shop.com <button>×</button></span><span class="url-chip">🌐 https://blog.my-shop.com/news <button>×</button></span></div><div class="crawl-box"><b>AI 擷取設定</b><label><input type="checkbox" checked> 商品頁</label><label><input type="checkbox" checked> 部落格</label><label><input type="checkbox" checked> FAQ</label></div></div></div></div>`; if(tab==='ads')w.innerHTML=`<div class="workspace-panel active"><div class="platform-grid">${['Meta Ads|已連線|2 小時前|Me','Google Ads|已連線|30 分鐘前|Go','TikTok Ads|未連線|—|Ti','LINE Ads|未連線|—|LI','蝦皮廣告|已連線|1 小時前|蝦皮','Momo 商城|未連線|—|Mo'].map(x=>{let [n,s,t,l]=x.split('|');let on=s==='已連線';return `<div class="platform-card"><span class="platform-badge pill ${on?'green':'blue'}">${on?'● 已連線':'○ 未連線'}</span><div class="platform-logo">${l}</div><h3>${n}</h3><p class="muted">最後同步：${t}</p><button class="btn ${on?'':'primary'}" onclick="toast('${on?'已開啟管理連線':'已開啟串接流程'}')">${on?'管理串接':'點擊連線'}</button></div>`}).join('')}</div></div>`}
function addUrl(){let v=$('#urlInput')?.value.trim(); if(!v)return toast('請先輸入網址'); $('#urlTags').insertAdjacentHTML('beforeend',`<span class="url-chip">🌐 ${v} <button onclick="this.parentElement.remove()">×</button></span>`);$('#urlInput').value='';toast('已新增網址來源')}function openUsage(){$('#usageModal').classList.add('show')}function closeUsage(){$('#usageModal').classList.remove('show')}
const products=[{id:'P001-SHOPEE',name:'極簡白底老爹鞋',cat:'鞋類',price:'NT$ 690',stock:38,sales:198,platform:'蝦皮',health:66,status:'即將缺貨',spec:'尺碼 22-27 / 全白配色',image:'🖼<br>蝦皮主圖',desc:'蝦皮賣場商品，與其他平台商品暫不整併。',aiTitle:'✦ AI 文案優化建議（蝦皮）',aiDesc:'建議在標題加入「免運、厚底 4cm、日常百搭」等高搜尋字，描述中可強調舒適度與通勤情境。',aiEstimate:'預估可提升轉換率 12-18%。'},
{id:'P001-MOMO',name:'極簡白底老爹鞋｜韓系厚底休閒鞋',cat:'鞋類',price:'NT$ 720',stock:82,sales:142,platform:'Momo',health:74,status:'健康',spec:'尺碼 22-27 / 白色',image:'🖼<br>Momo主圖',desc:'Momo 商城商品，與其他平台商品暫不整併。',aiTitle:'✦ AI 文案優化建議（Momo）',aiDesc:'建議強化商品特色條列、材質與尺寸說明，並補上通勤、旅遊、日常穿搭等使用情境。',aiEstimate:'預估可提升點擊率 8-14%。'},
{id:'P001-WEB',name:'極簡白底老爹鞋',cat:'鞋類',price:'NT$ 690',stock:56,sales:72,platform:'官網',health:70,status:'健康',spec:'尺碼 22-27 / 品牌官網款',image:'🖼<br>官網主圖',desc:'官網商品，與其他平台商品暫不整併。',aiTitle:'✦ AI 文案優化建議（官網）',aiDesc:'建議加入品牌故事、穿搭情境與會員優惠引導，讓官網內容比平台頁更有品牌感。',aiEstimate:'預估可提升會員轉換率 6-10%。'},
{id:'P002-SHOPEE',name:'微透氣涼感 T 恤',cat:'服飾',price:'NT$ 490',stock:521,sales:632,platform:'蝦皮',health:92,status:'健康',spec:'S-XL / 黑白灰',image:'🖼<br>蝦皮主圖',desc:'蝦皮賣場商品，單一平台資料獨立呈現。',aiTitle:'✦ AI 文案優化建議（蝦皮）',aiDesc:'可強化涼感、透氣、夏季通勤等關鍵字。',aiEstimate:'預估可提升轉換率 6-10%。'},
{id:'P003-MOMO',name:'復古丹寧寬褲',cat:'服飾',price:'NT$ 880',stock:12,sales:187,platform:'Momo',health:76,status:'健康',spec:'S-XL / 深藍',image:'🖼<br>Momo主圖',desc:'Momo 商城商品，單一平台資料獨立呈現。',aiTitle:'✦ AI 文案優化建議（Momo）',aiDesc:'建議補強版型、身高穿搭示範與材質描述。',aiEstimate:'預估可提升點擊率 5-9%。'},
{id:'P004-WEB',name:'羊毛混紡圍巾',cat:'配件',price:'NT$ 520',stock:234,sales:145,platform:'官網',health:58,status:'待優化',spec:'180cm / 米白、灰、咖啡',image:'🖼<br>官網主圖',desc:'官網商品，單一平台資料獨立呈現。',aiTitle:'✦ AI 文案優化建議（官網）',aiDesc:'建議加入禮物情境、材質觸感與冬季搭配內容。',aiEstimate:'預估可提升會員轉換率 4-8%。'}];
function renderOps(page){activeNav(page);$('#dataPage').classList.add('hidden');$('#opsPage').classList.remove('hidden'); if(page==='customers')return renderCustomers(); if(page==='products')return renderProducts(); if(page==='ads')return renderAds(); if(page==='social')return renderSocial(); const titles={social:'社群影音分析'};$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 營運分析模組 / ${titles[page]}</div><h1>${titles[page]}</h1><p class="subtitle">此頁面會在下一輪依照截圖補上互動內容。</p></div></div><section class="metrics"><div class="card"><h3>總覽</h3><div class="big">Coming</div><div class="muted">下一步製作</div></div></section>`;toast(`已切換到 ${titles[page]}`)}
function renderProducts(){toast('已切換到 商品管理中心');$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 營運分析模組 / 商品管理中心</div><h1>商品管理中心</h1><p class="subtitle">基於各平台通路的商品銷售、庫存與排名資料，整理 AI 商品營運建議。</p></div></div><section class="ad-alert"><h3>✦ AI 商品營運建議 <span class="tag">BETA</span></h3><ul><li><b>蝦皮｜極簡白底老爹鞋</b> 預計可售天數僅 3 天（日均 13.7 件），建議立即補貨並優化該平台文案。</li><li><b>復古丹寧寬褲</b> 預計可售天數高達 24 天（日均 0.5 件），雖然庫存量低但週轉緩慢，建議結合活動文案中心進行促銷。</li><li><b>平台資料獨立：</b> 目前尚未支援同商品跨平台整併，商品列表以平台通路為獨立資料列呈現。</li></ul></section><section class="table-card"><div class="product-filter-row"><button class="chip-btn active" onclick="filterProducts('all',this)">全部</button><button class="chip-btn" onclick="filterProducts('hot',this)">熱銷</button><button class="chip-btn" onclick="filterProducts('low',this)">低庫存</button><button class="chip-btn" onclick="filterProducts('opt',this)">待優化</button><input class="search" id="productSearch" placeholder="搜尋商品名稱 / SKU" oninput="renderProductRows()"><select class="filter"><option>銷售量 ↓</option><option>營收 ↓</option><option>庫存 ↑</option></select></div><div id="productRows"></div></section>`;window.productFilter='all';renderProductRows()}
function filterProducts(v,btn){window.productFilter=v;btn.parentElement.querySelectorAll('.chip-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderProductRows()}
function renderProductRows(){let q=($('#productSearch')?.value||'').toLowerCase();let list=products.filter(p=>(!q||p.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)||p.platform.toLowerCase().includes(q))&&(window.productFilter==='all'||(window.productFilter==='low'?p.stock<50:window.productFilter==='opt'?p.health<70:window.productFilter==='hot'?p.sales>300:true)));$('#productRows').innerHTML=`<table><thead><tr><th>平台通路</th><th>商品名稱</th><th>分類</th><th>價格</th><th>庫存</th><th>銷量</th><th>健康度</th></tr></thead><tbody>${list.map((p,i)=>`<tr class="product-row" onclick="openProductById('${p.id}')"><td><span class="tag">${p.platform}</span><br><span class="muted">${p.id}</span></td><td><b>${p.name}</b><br><span class="tag">${p.status}</span></td><td>${p.cat}</td><td>${p.price}</td><td>${p.stock}</td><td>${p.sales}</td><td><span class="health ${p.health>85?'good':p.health>69?'warn':'bad'}">${p.health}</span></td></tr>`).join('')}</tbody></table>`}
function openProductById(id){window.currentProductDetailId=id;const p=products.find(x=>x.id===id)||products[0];$('#productModalContent').innerHTML=`<div class="breadcrumb">單一平台商品資訊</div><h2>${p.name}</h2><p class="muted">目前尚未支援跨平台同商品整併，因此每個平台通路的商品資料會獨立顯示與分析。</p><p><span class="pill blue">${p.platform}</span> <span class="tag">${p.id}</span> <span class="pill ${p.status==='健康'?'green':p.status==='待優化'?'amber':'red'}">${p.status}</span></p><div class="product-grid"><div><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div><span class="muted">平台通路</span><p><b>${p.platform}</b></p></div><div><span class="muted">商品編號 / SKU</span><p><b>${p.id}</b></p></div><div><span class="muted">商品名稱</span><p><b>${p.name}</b></p></div><div><span class="muted">規格</span><p>${p.spec}</p></div><div><span class="muted">售價</span><p>${p.price}</p></div><div><span class="muted">銷量 / 庫存</span><p>${p.sales} 件 / ${p.stock} 件</p></div></div><div class="ai-locked" id="aiLocked"><div class="blur"><h3>${p.aiTitle}</h3><p>${p.aiDesc}</p><p>${p.aiEstimate}</p></div><div class="unlock-layer"><button class="btn primary" onclick="unlockAiSuggestion()">AI調整建議</button></div></div></div><div><span class="muted">主視覺</span><div class="image-box">${p.image}</div></div></div>`;$('#productModal').classList.add('show')}
function openProduct(name){const p=products.find(x=>x.name===name)||products[0];openProductById(p.id)}
function switchProductChannel(event,channel,btn){if(event){event.preventDefault();event.stopPropagation();}return false;}
function unlockAiSuggestion(){const box=$('#aiLocked');if(!box)return;const blur=box.querySelector('.blur');if(blur)blur.style.filter='none';const layer=box.querySelector('.unlock-layer');if(layer)layer.remove();if(!box.querySelector('.go-optimize-btn'))box.insertAdjacentHTML('beforeend',`<div style="display:flex;justify-content:flex-end;margin-top:14px"><button class="btn primary go-optimize-btn" onclick="goToProductContentOptimization(window.currentProductDetailId)">前往商品內容中心優化</button></div>`);toast('已顯示 AI調整建議')}
function goToProductContentOptimization(productId){
  if(typeof closeProductModal==='function') closeProductModal();
  renderCreative('product');
  setCreativeMode('opt');
  setTimeout(()=>{
    const sel=document.getElementById('existingProductSelect');
    if(sel && productId){ sel.value=productId; renderExistingProductSource(); }
    toast('已帶入商品資料至商品內容優化');
  },0);
}
function goToAdContentOptimization(adIndex){
  if(typeof closeProductModal==='function') closeProductModal();
  renderCreative('ad');
  setCreativeMode('opt');
  setTimeout(()=>{
    const sel=document.getElementById('existingAdSelect');
    if(sel && adIndex!==undefined){ sel.value=String(adIndex); drawExistingAdChoice(); }
    toast('已帶入廣告資料至廣告素材優化');
  },0);
}
function goToSocialContentOptimization(socialIndex){
  if(typeof closeProductModal==='function') closeProductModal();
  renderCreative('social');
  setCreativeMode('opt');
  setTimeout(()=>{
    socialWorkflowState.selectedExistingIndex=Number(socialIndex)||0;
    const sel=document.getElementById('existingSocialSelect')||document.getElementById('existingSelect');
    if(sel){ sel.value=String(socialWorkflowState.selectedExistingIndex); }
    if(typeof renderExistingSocialSummary==='function') renderExistingSocialSummary();
    toast('已帶入社群內容至社群內容優化');
  },0);
}

function closeProductModal(){$('#productModal').classList.remove('show')}

const adsData=[
{name:'春季促銷_V1',platform:'Meta Ads',status:'投放中',product:'極簡白底老爹鞋',period:'2026/05/20 - 2026/06/18',days:'30 天',cost:'NT$ 42,800',impr:'248,500',click:'12,340',ctr:'4.96%',cpc:'NT$ 3.47',cpa:'NT$ 285',roas:'4.2x',score:88,tag:'warn'},
{name:'皮鞋推薦關鍵字',platform:'Google Ads',status:'投放中',product:'都會皮鞋系列',period:'2026/05/25 - 2026/06/18',days:'25 天',cost:'NT$ 31,200',impr:'98,200',click:'5,812',ctr:'5.92%',cpc:'NT$ 5.37',cpa:'NT$ 820',roas:'1.6x',score:52,tag:'bad'},
{name:'新客折扣再行銷',platform:'Meta Ads',status:'排程中',product:'會員首購組合',period:'2026/06/20 - 2026/07/05',days:'16 天',cost:'NT$ 18,600',impr:'76,000',click:'4,370',ctr:'5.75%',cpc:'NT$ 4.26',cpa:'NT$ 320',roas:'3.1x',score:79,tag:'warn'},
{name:'品牌字搜尋',platform:'Google Ads',status:'已結束',product:'E2B 品牌活動',period:'2026/05/01 - 2026/05/31',days:'31 天',cost:'NT$ 8,400',impr:'21,880',click:'2,810',ctr:'12.84%',cpc:'NT$ 2.99',cpa:'NT$ 120',roas:'6.8x',score:95,tag:'good'},
{name:'夏季穿搭挑戰',platform:'TikTok Ads',status:'已暫停',product:'涼感 T 恤與丹寧寬褲',period:'2026/06/01 - 2026/06/12',days:'12 天',cost:'NT$ 14,200',impr:'132,400',click:'2,820',ctr:'2.13%',cpc:'NT$ 5.04',cpa:'NT$ 480',roas:'1.4x',score:58,tag:'bad'}
];
function adTableHtml(list){return `<table><thead><tr><th>渠道</th><th>廣告活動 / 商品</th><th>投放狀態</th><th>花費</th><th>CTR</th><th>CPA</th><th>ROAS</th><th>AI 評分</th></tr></thead><tbody>${list.map(a=>`<tr class="ad-row product-row" onclick="openAdDetail(${adsData.indexOf(a)})"><td><span class="tag">${a.platform}</span></td><td><b>${a.name}</b><br><span class="muted">${a.product}</span></td><td><span class="pill ${a.status==='投放中'?'green':a.status==='排程中'?'amber':a.status==='已結束'?'blue':'red'}">● ${a.status}</span></td><td>${a.cost}</td><td><b>${a.ctr}</b></td><td><b>${a.cpa}</b></td><td><b class="health ${a.tag==='good'?'good':a.tag==='warn'?'warn':'bad'}">${a.roas}</b></td><td><span class="health ${a.tag==='good'?'good':a.tag==='warn'?'warn':'bad'}">☆ ${a.score}</span></td></tr>`).join('')}</tbody></table>`}
function renderAds(){toast('已切換到 廣告效益分析');$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 營運分析模組 / 廣告效益分析</div><h1>廣告效益分析</h1><p class="subtitle">追蹤跨平台廣告成效，並用 AI 找出預算、受眾與素材的優化方向。</p></div></div><section class="ad-alert"><h3>✦ AI 廣告投放與預警建議 <span class="tag">BETA</span></h3><ul><li><b>ROAS 異常下降：</b> Meta Ads「春季促銷_V1」最近 7 天 ROAS 由 4.8 降至 3.2，建議檢查素材疲勞與受眾重疊。</li><li><b>高潛力廣告：</b> Google Ads「品牌字搜尋」ROAS 6.8x，建議增加 20% 預算。</li><li><b>待優化廣告：</b> TikTok「夏季穿搭挑戰」CTR 低於產業平均，建議更換首圖與前 3 秒影片內容。</li></ul></section><div class="ad-filter-row"><input id="adSearch" placeholder="搜尋活動名稱、商品或關鍵字..." oninput="renderAdRows()"><select id="adPlatform" onchange="renderAdRows()"><option>平台　全部</option><option>Meta Ads</option><option>Google Ads</option><option>TikTok Ads</option></select><select id="adStatus" onchange="renderAdRows()"><option>狀態　全部</option><option>投放中</option><option>排程中</option><option>已結束</option><option>已暫停</option></select><select id="adRoas" onchange="renderAdRows()"><option>ROAS　全部</option><option>高於 4x</option><option>低於 2x</option></select><button class="btn">日期範圍</button></div><section class="table-card"><div class="customer-table-head">廣告渠道成效對比 <span class="muted" style="float:right">共 5 筆</span></div><div id="adTableWrap">${adTableHtml(adsData)}</div></section>`}
function renderAdRows(){const q=(document.getElementById('adSearch')?.value||'').toLowerCase();const pf=document.getElementById('adPlatform')?.value||'平台　全部';const st=document.getElementById('adStatus')?.value||'狀態　全部';const ro=document.getElementById('adRoas')?.value||'ROAS　全部';const list=adsData.filter(a=>(!q||a.name.toLowerCase().includes(q)||a.product.toLowerCase().includes(q)||a.platform.toLowerCase().includes(q))&&(pf.includes('全部')||a.platform===pf)&&(st.includes('全部')||a.status===st)&&(ro.includes('全部')||(ro.includes('高於')?parseFloat(a.roas)>4:parseFloat(a.roas)<2)));const target=document.getElementById('adTableWrap');if(target) target.innerHTML=adTableHtml(list)}
function openAdDetail(i){window.currentAdDetailIndex=i;let a=adsData[i];$('#productModalContent').innerHTML=`<div><span class="tag">${a.platform}</span> <span class="pill ${a.status==='投放中'?'green':a.status==='排程中'?'amber':a.status==='已結束'?'blue':'red'}">● ${a.status}</span><h2>${a.name}</h2><p class="muted">商品：${a.product}</p></div><div class="ad-detail-grid"><div><h3>1. 基本資訊</h3><div class="ad-info-card"><div class="ad-info-grid"><p><span class="muted">平台</span><br><b>${a.platform}</b></p><p><span class="muted">商品</span><br><b>${a.product}</b></p><p><span class="muted">廣告目標</span><br><b>轉換 / 購買</b></p><p><span class="muted">建立時間</span><br><b>2026/05/20</b></p><p><span class="muted">投放期間</span><br><b>${a.period}</b></p><p><span class="muted">投放天數</span><br><b>${a.days}</b></p></div></div><h3 class="ad-mini-title">2. 成效指標</h3><div class="ad-metric-grid"><div class="ad-metric"><span>花費</span><b>${a.cost}</b></div><div class="ad-metric"><span>曝光</span><b>${a.impr}</b></div><div class="ad-metric"><span>點擊</span><b>${a.click}</b></div><div class="ad-metric"><span>CTR</span><b>${a.ctr}</b><p class="pill green">優於平均</p></div><div class="ad-metric"><span>CPA</span><b>${a.cpa}</b><p class="pill ${a.tag==='bad'?'red':'green'}">${a.tag==='bad'?'偏高':'健康'}</p></div><div class="ad-metric"><span>ROAS</span><b>${a.roas}</b><p class="pill ${a.tag==='bad'?'red':'green'}">${a.tag==='bad'?'需優化':'表現良好'}</p></div></div><h3 class="ad-mini-title">3. 受眾分析</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px"><div class="ad-info-card"><b>年齡分布</b><div class="bar-chart"><div class="bar-line"><span>18-24</span><div class="bar-track"><i style="width:12%"></i></div><b>12%</b></div><div class="bar-line"><span>25-34</span><div class="bar-track"><i style="width:46%"></i></div><b>46%</b></div><div class="bar-line"><span>35-44</span><div class="bar-track"><i style="width:28%"></i></div><b>28%</b></div><div class="bar-line"><span>45+</span><div class="bar-track"><i style="width:14%"></i></div><b>14%</b></div></div></div><div class="ad-info-card"><b>性別與裝置</b><div class="donut-demo"></div><p class="muted">女性 68%｜男性 32%<br>Mobile 81%｜Desktop 19%</p></div></div><h3 class="ad-mini-title">4. 地區 TOP 5</h3><div class="ad-info-card"><div class="bar-chart"><div class="bar-line"><span>台北市</span><div class="bar-track"><i style="width:30%"></i></div><b>30%</b></div><div class="bar-line"><span>新北市</span><div class="bar-track"><i style="width:22%"></i></div><b>22%</b></div><div class="bar-line"><span>台中市</span><div class="bar-track"><i style="width:18%"></i></div><b>18%</b></div><div class="bar-line"><span>桃園市</span><div class="bar-track"><i style="width:16%"></i></div><b>16%</b></div><div class="bar-line"><span>高雄市</span><div class="bar-track"><i style="width:14%"></i></div><b>14%</b></div></div></div><h3 class="ad-mini-title">5. 廣告內容</h3><div class="ad-info-card"><div class="ad-content-grid"><div><span class="muted">廣告標題</span><div class="ad-copy-box"><b>${a.name==='春季促銷_V1'?'全館老爹鞋 7 折｜限時 3 天':a.name==='皮鞋推薦關鍵字'?'通勤皮鞋推薦｜舒適不咬腳':a.name==='品牌字搜尋'?'E2B 官方旗艦｜新品優惠中':'夏季穿搭靈感｜今日限定'}</b></div></div><div><span class="muted">CTA</span><div class="ad-copy-box"><b>${a.tag==='bad'?'了解更多':'立即選購'}</b></div></div><div style="grid-column:1/-1"><span class="muted">主文案</span><div class="ad-copy-box">${a.platform==='TikTok Ads'?'夏季穿搭挑戰開跑！5 秒看懂涼感 T 恤與丹寧寬褲怎麼搭，今晚限定優惠。':'軟Q厚底，透氣細布，韓系百搭一雙搞定。立即把握早鳥優惠，限時優惠倒數中！'}</div></div><div style="grid-column:1/-1"><span class="muted">投放連結</span><div class="ad-copy-box" style="color:#4359f3">https://shop.example.com/p/${a.name.replaceAll(' ','-')}?utm=demo</div></div></div></div><h3 class="ad-mini-title">6. 廣告素材</h3><div class="ad-asset-preview">🖼<br>模擬廣告素材<br><span class="muted">${a.platform==='TikTok Ads'?'短影音封面 + 前 3 秒腳本':'模特街拍 + 商品白底圖'}</span></div><h3 class="ad-mini-title">7. 素材成效分析</h3><div class="ad-info-card"><div class="ad-material"><b>主圖 A</b><span>5.8%</span><span class="health good">92</span></div><div class="ad-material"><b>主圖 B</b><span>3.1%</span><span class="health bad">68</span></div><div class="ad-material"><b>短影音 A</b><span>7.2%</span><span class="health good">96</span></div></div><h3 class="ad-mini-title">8. 轉換漏斗</h3><div class="ad-info-card funnel"><div class="funnel-step"><b>曝光</b><div class="funnel-bar" style="width:100%"></div><span>${a.impr}</span></div><div class="funnel-step"><b>點擊</b><div class="funnel-bar" style="width:72%"></div><span>${a.click}</span></div><div class="funnel-step"><b>加入購物車</b><div class="funnel-bar" style="width:46%"></div><span>876</span></div><div class="funnel-step"><b>結帳</b><div class="funnel-bar" style="width:32%"></div><span>542</span></div><div class="funnel-step"><b>購買</b><div class="funnel-bar" style="width:22%"></div><span>332</span></div></div></div><aside class="ai-diagnosis"><div class="ai-diagnosis-head"><div class="logo" style="width:36px;height:36px">✦</div><b>AI 廣告診斷中心</b></div><div class="ai-blur-box locked" id="adAiLocked"><div class="ai-real"><div class="ai-score"><span class="muted">AI 總評分</span><br><b>${a.score}</b> /100<p class="health ${a.tag==='bad'?'bad':'good'}">${a.tag==='bad'?'需優化':'表現優秀'}</p></div><div style="padding:0 18px 18px"><h3>AI 發現</h3><ul style="line-height:2"><li>女性 25-34 歲轉換率最高。</li><li>台北市 ROAS 表現最佳。</li><li>情境素材 CTR 高於白底圖 28%。</li></ul><h3>成功因素</h3><div class="factor-list"><div class="factor">受眾設定精準</div><div class="factor">素材品質佳</div><div class="factor">商品與廣告一致性高</div></div><h3>AI 建議</h3><ul style="line-height:2"><li>增加女性 25-34 歲預算。</li><li>關閉低效受眾包。</li><li>增加短影音素材測試。</li><li>提升再行銷比例。</li><li>加入限時優惠 CTA。</li></ul><div class="impact-box"><b>預估提升</b><div class="impact-grid"><div class="impact-mini"><span>CTR</span><b>+15%</b></div><div class="impact-mini"><span>CPA</span><b>-12%</b></div><div class="impact-mini"><span>ROAS</span><b>+18%</b></div></div></div></div></div><div class="ai-cover"><button class="btn primary" onclick="unlockAdAi()">AI調整建議</button></div></div></aside></div>`;$('#productModal').classList.add('show')}
function unlockAdAi(){const box=$('#adAiLocked'); if(!box)return; box.classList.remove('locked'); const cover=box.querySelector('.ai-cover'); if(cover)cover.remove(); const real=box.querySelector('.ai-real > div')||box.querySelector('.ai-real'); if(real && !box.querySelector('.go-optimize-btn')) real.insertAdjacentHTML('beforeend',`<button class="btn primary go-optimize-btn" style="margin-top:16px" onclick="goToAdContentOptimization(window.currentAdDetailIndex)">前往廣告素材中心優化</button>`); toast('已顯示 AI 廣告優化建議')}


const socialData=[
{platform:'IG',title:'夏季新品｜透氣老爹鞋上市',date:'2026-06-08 20:00',status:'已發布',views:'4.8萬',fans:'4.0萬',clicks:'1,420',likes:'3,120',comments:'218',shares:'184',rate:'7.5%',score:86,tag:'good',copy:'炎夏不悶腳！全新透氣網布老爹鞋，軟Q厚底走整天。早鳥 7 折，今晚 10 點限時開搶！'},
{platform:'TikTok',title:'5 秒看完老爹鞋穿搭',date:'2026-06-09 19:00',status:'已發布',views:'12.8萬',fans:'11.0萬',clicks:'980',likes:'9,820',comments:'412',shares:'1,820',rate:'9.2%',score:92,tag:'good',copy:'5 秒變身夏季街頭感！老爹鞋三套穿搭，最後一套最顯腿長。'},
{platform:'FB',title:'週末優惠通知－全館 85 折',date:'2026-06-07 09:00',status:'已發布',views:'1.2萬',fans:'1.1萬',clicks:'380',likes:'142',comments:'28',shares:'36',rate:'1.7%',score:54,tag:'bad',copy:'週末優惠開跑，全館 85 折，立即前往選購喜歡的商品。'},
{platform:'Shorts',title:'咖啡禮盒開箱 30 秒',date:'2026-06-12 18:00',status:'排程中',views:'0',fans:'0',clicks:'0',likes:'0',comments:'0',shares:'0',rate:'0.0%',score:78,tag:'warn',copy:'30 秒快速開箱，看看辦公室下午茶禮盒裡面有什麼。'},
{platform:'Threads',title:'品牌故事｜為什麼我們做這雙鞋',date:'2026-06-05 12:00',status:'已發布',views:'8,200',fans:'7,400',clicks:'240',likes:'412',comments:'68',shares:'42',rate:'6.4%',score:81,tag:'good',copy:'一雙鞋不只要好看，也要陪你走過通勤、旅行、週末散步。'},
{platform:'LINE',title:'VIP 專屬｜搶先預購通知',date:'—',status:'草稿',views:'0',fans:'0',clicks:'0',likes:'0',comments:'0',shares:'0',rate:'0.0%',score:70,tag:'warn',copy:'VIP 會員專屬預購即將開放，限量尺寸優先保留。'}
];
function renderSocial(){toast('已切換到 社群影音分析');$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 營運分析模組 / 社群影音分析</div><h1>社群影音分析</h1><p class="subtitle">追蹤社群貼文與短影音內容成效，找出可複製的爆款結構。</p></div></div><section class="social-alert"><h3>✦ AI 社群影音洞察</h3><ul><li><b>TikTok 短影音互動率 9.2%</b>（全站第一），建議將 IG/Shorts 採用相同前 3 秒鉤子結構。</li><li><b>FB「週末 85 折」互動率僅 1.7%</b>，AI 評分 54，建議重寫標題 + 換主視覺重新投放。</li><li><b>本週 6 則內容中有 2 則完播率風險偏高</b>，建議補強前 3 秒鉤子。</li></ul></section><div class="social-filter-row"><input id="socialSearch" placeholder="搜尋貼文標題或內容..." oninput="renderSocialRows()"><button class="chip-btn active" onclick="filterSocial('all',this)">全部</button><button class="chip-btn" onclick="filterSocial('FB',this)">FB</button><button class="chip-btn" onclick="filterSocial('IG',this)">IG</button><button class="chip-btn" onclick="filterSocial('Threads',this)">Threads</button><button class="chip-btn" onclick="filterSocial('TikTok',this)">TikTok</button><button class="chip-btn" onclick="filterSocial('Shorts',this)">Shorts</button><button class="chip-btn" onclick="filterSocial('LINE',this)">LINE</button><button class="btn">進階篩選</button></div><section class="table-card"><div class="customer-table-head">社群影音內容成效 <span class="muted" style="float:right">共 6 則</span></div><div id="socialTableWrap"></div></section>`;window.socialFilter='all';renderSocialRows()}
function filterSocial(v,btn){window.socialFilter=v;btn.parentElement.querySelectorAll('.chip-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderSocialRows()}
function socialTableHtml(list){return `<table><thead><tr><th>平台</th><th>內容</th><th>狀態</th><th>觀看</th><th>觸及</th><th>點擊</th><th>♡</th><th>💬</th><th>↗</th><th>互動率</th><th>AI 評分</th></tr></thead><tbody>${list.map((s,i)=>`<tr class="social-row" onclick="openSocialDetail(${socialData.indexOf(s)})"><td><span class="tag">${s.platform}</span></td><td><b>${s.title}</b><br><span class="muted">${s.date}</span></td><td><span class="pill ${s.status==='已發布'?'green':s.status==='排程中'?'amber':'blue'}">${s.status}</span></td><td><b>${s.views}</b></td><td>${s.fans}</td><td>${s.clicks}</td><td>${s.likes}</td><td>${s.comments}</td><td>${s.shares}</td><td><span class="health ${s.tag==='bad'?'bad':s.tag==='warn'?'warn':'good'}">${s.rate}</span></td><td><span class="health ${s.tag==='bad'?'bad':s.tag==='warn'?'warn':'good'}">☆ ${s.score}</span></td></tr>`).join('')}</tbody></table>`}
function renderSocialRows(){let q=($('#socialSearch')?.value||'').toLowerCase();let list=socialData.filter(s=>(window.socialFilter==='all'||s.platform===window.socialFilter)&&(!q||(s.title+s.copy).toLowerCase().includes(q)));$('#socialTableWrap').innerHTML=socialTableHtml(list)}
function openSocialDetail(i){window.currentSocialDetailIndex=i;let s=socialData[i];$('#productModalContent').innerHTML=`<div><span class="tag">${s.platform}</span> <span class="muted">${s.date}</span><h2>${s.title}</h2></div><div class="social-detail-grid"><div><h3>原始內容</h3><div class="ad-copy-box">${s.copy}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:22px 0"><div><h3># Hashtag</h3><p><span class="tag">#夏季新品</span> <span class="tag">#老爹鞋</span> <span class="tag">#早鳥優惠</span> <span class="tag">#穿搭日記</span></p></div><div><h3>CTA</h3><b>${s.platform==='IG'?'點擊連結搶購':s.platform==='TikTok'?'留言領穿搭清單':'立即了解更多'}</b></div></div><h3>影音腳本</h3><div class="ad-copy-box">0-3s：腳步特寫，快速剪接 3 個情境 → 3-7s：模特街拍三套穿搭 → 7-12s：商品 360° + 優惠字卡 → 12-15s：CTA 連結畫面</div><h3>分鏡腳本</h3><div class="social-script-table"><table><thead><tr><th>時間</th><th>畫面</th><th>旁白</th></tr></thead><tbody><tr><td>0-3s</td><td>腳步特寫，快速剪接 3 個情境</td><td>夏天到了，悶熱黏膩讓你不想出門？</td></tr><tr><td>3-7s</td><td>模特街拍三套穿搭</td><td>全新透氣老爹鞋，三套穿搭整天舒適</td></tr><tr><td>7-12s</td><td>商品 360° + 優惠字卡</td><td>早鳥 7 折，今晚 10 點開搶</td></tr><tr><td>12-15s</td><td>CTA 連結畫面</td><td>點擊個人簡介連結立即購買</td></tr></tbody></table></div><h3>封面 / 主視覺</h3><div class="placeholder-visual">🖼<br>${s.platform} 主視覺預覽<br><span class="muted">模擬封面圖 / 短影音首幀</span></div></div><aside class="ai-check-card"><div class="ai-check-head"><div class="logo" style="width:36px;height:36px">✦</div><div><b>AI 助手健檢</b><p class="muted" style="margin:4px 0 0">內容表現與可複用建議</p></div></div><div class="ai-social-locked locked" id="socialAiLocked"><div class="ai-real"><div class="check-list"><p><span class="pill ${s.tag==='bad'?'red':'green'}">${s.tag==='bad'?'需優化':'已表現優秀'}</span></p><div class="check-item good">開頭吸引力：前 3 秒鉤子明確</div><div class="check-item good">互動性設計：互動率 ${s.rate}</div><div class="check-item ${s.tag==='bad'?'warn':'good'}">CTA 明確度：${s.tag==='bad'?'需補強更明確的行動誘因':'點擊連結搶購'}</div><div class="check-item good">Hashtag 適配度：4 個推薦標籤</div><div class="check-item good">平台適配：符合 ${s.platform} 內容生態</div><div class="check-item ${s.score<70?'warn':'good'}">前 3 秒完播風險：${s.score<70?'偏高，建議改用衝突式開場':'低'}</div><button class="btn primary" style="margin-top:16px" onclick="goToSocialContentOptimization(window.currentSocialDetailIndex)">前往社群內容中心優化</button></div></div><div class="ai-social-cover"><button class="btn primary" onclick="unlockSocialAi()">AI調整建議</button></div></div></aside></div>`;$('#productModal').classList.add('show')}
function unlockSocialAi(){const box=$('#socialAiLocked'); if(!box)return; box.classList.remove('locked'); const cover=box.querySelector('.ai-social-cover'); if(cover)cover.remove(); toast('已顯示 AI 社群優化建議')}

const segmentData={vip:{name:'高價值客戶',count:'312',trend:'+5% vs 上月',value:'客單價 +8% ~ +12%',retention:'回購率 +5%',remain:'客戶留存率 +3%',find:['客群數量月增 +5%，連續 3 個月正成長','平均購買頻率 12.5 次/年，較上期 +0.8 次','客單價 NT$ 7,680，較上期 +6.2%','主要來源：官網（54%）、Momo（28%）','商品偏好集中於精品配件與限量聯名款'],reason:['近期推出 VIP 預購活動帶動高頻回購','官網會員專屬折扣有效提升客單價','限量聯名款促使高消費力客戶提前下單'],action:['建議規劃 VIP 專屬線下體驗活動深化關係','推出年度回饋預購禮包，鎖定下半年回購','推薦高毛利配件與限定組合，提升客單價'],money:'預估可帶動 NT$ 280K ~ 420K / 月 額外營收'},returning:{name:'回購主力',count:'1,284',trend:'+8% vs 上月',value:'回購率 +6% ~ +9%',retention:'購買頻率 +7%',remain:'會員活躍 +4%',find:['近 90 天回購穩定，平均間隔 32 天','常購品類集中於消耗型與日常搭配商品','對滿額折扣與組合包反應佳'],reason:['補貨週期明確，適合固定節奏推播','組合促銷降低再次下單阻力','商品滿意度累積成為回購基礎'],action:['建立補貨提醒與週期型 EDM','提供常購商品加購優惠','用會員分級鼓勵提高年度回購次數'],money:'預估可增加 NT$ 180K ~ 310K / 月 穩定營收'},risk:{name:'流失風險客戶',count:'187',trend:'-3% vs 上月',value:'召回率 +4% ~ +7%',retention:'流失下降 6%',remain:'再購率 +5%',find:['超過 90 天未購買人數上升至 23 位','近一次購買集中在低單價活動品','客服互動後未再次回訪比例偏高'],reason:['促銷結束後缺少接續導購內容','部分商品到貨體驗未被追蹤','缺少個人化召回誘因'],action:['針對未購滿 90 天族群推送免運券','建立售後關懷與二次推薦流程','以過往偏好推薦低門檻新品'],money:'預估可追回 NT$ 80K ~ 160K / 月 流失營收'},newbie:{name:'新進客戶',count:'642',trend:'+12% vs 上月',value:'首購轉回購 +5% ~ +8%',retention:'留存率 +4%',remain:'互動率 +6%',find:['本月新客成長 +12%，主要來自社群短影音導流','首購後 14 天內互動率偏高','新客偏好入門價格與組合商品'],reason:['短影音帶來興趣型流量','缺少首購後教學與品牌故事銜接','入門商品能降低第一次下單門檻'],action:['首購後 7 天寄送使用情境內容','推送入門組合與第二件優惠','建立新客旅程，分 3 次培養信任感'],money:'預估可增加 NT$ 120K ~ 220K / 月 新客回購營收'}};
const customers=[['陳小柔','2026-06-09','蝦皮','NT$ 48,200','18 次','高價值客戶'],['林大同','2026-05-21','Momo','NT$ 12,540','6 次','回購主力'],['Wendy Liu','2026-03-12','官網','NT$ 32,800','9 次','流失風險'],['Jason Chen','2026-06-07','蝦皮','NT$ 4,280','2 次','新進客戶']];
function renderCustomers(){toast('已切換到 客戶與客群管理');$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 營運分析模組 / 客戶與客群管理</div><h1>客戶與客群管理</h1><p class="subtitle">基於跨平台數據的 AI 營運洞察與決策建議。</p></div></div><section class="customer-hero"><div class="customer-health"><h3>✣ 客戶健康中心</h3><div class="score-row"><b>78</b><span>/100</span><span class="delta">↗ 4 分 vs 上月</span></div><div class="progress-soft"><i style="width:78%"></i></div><div class="health-split"><div class="health-note">↗ 主要改善原因<br>● 回購率提升<br>● 客單價提升<br>● 高價值客戶增加</div><div class="health-note warn">⚠ 主要風險提醒<br>● 流失客戶增加<br>● VIP 活躍度下降<br>● 回購率下降</div></div></div><div class="customer-ai-box"><h3>✦ AI 客群經營洞察 <span class="tag">BETA</span></h3><ul><li>流失風險客戶本月新增 23 位，較上期上升，建議啟動「30 天回訪折扣」自動化行銷。</li><li>新進客戶較上期 +12%，主要來自短影音導流，建議搭配新客專屬商品組合提升客單。</li><li>高價值客戶平均購買頻率為 12.5 次/年，建議推出 VIP 會員專屬預購活動。</li></ul></div></section><h3>客群分群診斷</h3><section class="customer-layout"><div class="segment-cards">${Object.keys(segmentData).map(k=>{const s=segmentData[k];return `<div class="segment-card"><div class="top"><span class="segment-name ${k==='risk'?'health bad':''}">${s.name}</span><span class="delta">${s.trend.includes('-')?'↘':'↗'} ${s.trend.split(' ')[0].replace('+','')}</span></div><div class="value">${s.count}</div><div class="muted-line">人・佔會員 ${k==='vip'?'12.9%':k==='returning'?'52.9%':k==='risk'?'7.7%':'26.5%'}</div><div class="muted-line">近 30 天指標變化中</div><button class="ai-btn" onclick="openSegment('${k}')">✦ AI 分析建議</button></div>`}).join('')}</div><div class="customer-table-panel"><div class="customer-table-head">客戶綜合列表</div><div class="customer-filters"><input id="customerSearch" placeholder="搜尋客戶姓名 / Email / 電話 / 會員編號" oninput="renderCustomerRows()"><select><option>全部資料</option></select><select><option>全部平台</option></select><select><option>全部金額</option></select><select><option>全部時間</option></select><select><option>全部標籤</option></select></div><div id="customerRows"></div></div></section>`;renderCustomerRows()}
function renderCustomerRows(){let q=($('#customerSearch')?.value||'').toLowerCase();let list=customers.filter(r=>r.join('').toLowerCase().includes(q));$('#customerRows').innerHTML=`<table><thead><tr><th>客戶</th><th>最後採購</th><th>下單通路</th><th>累計消費</th><th>頻率</th><th>AI 標籤</th></tr></thead><tbody>${list.map((r,i)=>`<tr><td><span class="avatar">${r[0][0]}</span><b>${r[0]}</b></td><td>${r[1]}</td><td><span class="tag">${r[2]}</span></td><td>${r[3]}</td><td>${r[4]}</td><td><span class="pill ${r[5].includes('流失')?'red':r[5].includes('新')?'green':'blue'}">${r[5]}</span></td></tr>`).join('')}</tbody></table>`}
function openSegment(k){let s=segmentData[k];$('#segmentModalContent').innerHTML=`<span class="label">${s.name}</span> <span class="muted">${s.count} 人・${s.trend}</span><h2>AI 客群經營建議</h2><p class="lead">基於跨平台訂單、會員行為與廣告數據生成的洞察建議，僅供決策參考。</p><div class="ai-section"><h3>✦ AI 發現</h3><ul>${s.find.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="ai-section"><h3>✦ AI 原因分析</h3><ul>${s.reason.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="ai-section"><h3>✦ AI 建議</h3><ul>${s.action.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="impact-box"><b>↗ 預估影響</b><div class="impact-grid"><div class="impact-mini"><span>客單價</span><b>${s.value}</b></div><div class="impact-mini"><span>回購率</span><b>${s.retention}</b></div><div class="impact-mini"><span>客戶留存率</span><b>${s.remain}</b></div></div><p>${s.money}</p></div><div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn" onclick="closeSegmentModal()">關閉</button></div>`;$('#segmentModal').classList.add('show')}
function closeSegmentModal(){$('#segmentModal').classList.remove('show')}

const creativeConfigs={
 product:{title:'商品內容中心',sub:'建立新商品上架內容，或優化現有商品文案。',createBtn:'建立新文案',optBtn:'優化現有商品',newTitle:'建立全新商品文案',optTitle:'優化現有商品',platforms:['momo','蝦皮','Shopify','SHOPLINE','Cyberbiz','meepShop'],outputs:['商品標題','商品特色文案','商品介紹文案','商品規格表','SEO 文案','Meta Description','平台上架格式'],placeholder:'等待 AI 生成中',button:'開始生成商品文案'},
 ad:{title:'廣告素材中心',sub:'產生可貼到 Google / Meta 後台的付費投放素材。',createBtn:'建立新廣告素材',optBtn:'優化現有廣告素材',newTitle:'建立全新廣告素材',optTitle:'優化現有廣告素材',platforms:['Google Ads','Meta Ads'],outputs:['標題包','文案包','視覺素材方向'],placeholder:'內容工作區',button:'開始生成廣告素材'},
 social:{title:'社群內容中心',sub:'產生 IG / FB / TikTok / LINE 自然發布用內容包。',createBtn:'建立新社群內容',optBtn:'優化現有社群內容',newTitle:'建立全新社群內容',optTitle:'優化現有貼文 / 影音',platforms:['FB','IG','Threads','TikTok','Shorts','LINE'],outputs:['貼文文案','Hashtag','短影音腳本','分鏡腳本','CTA 建議','平台發布格式'],placeholder:'內容工作區',button:'開始生成社群內容'},
 asset:{title:'圖片創作',sub:'透過 AI 快速建立商品情境圖、活動 Banner、社群圖片、廣告素材與品牌視覺。',createBtn:'建立圖片',optBtn:'素材庫',newTitle:'建立圖片',optTitle:'已儲存圖片素材',platforms:['商品情境圖','活動 Banner','官網 Banner','社群貼文圖片','廣告素材','EDM','LINE Rich Menu','其他'],outputs:['商品情境圖','活動 Banner','官網 Banner','社群貼文圖片','廣告素材','EDM / 電子報','LINE Rich Menu'],placeholder:'圖片工作區',button:'開始生成圖片'}
};
function renderCreative(type='product'){activeNav('creative:'+type);$('#dataPage').classList.add('hidden');$('#opsPage').classList.remove('hidden');const c=creativeConfigs[type];window.creativeType=type;window.creativeMode='new';$('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 創意與文案中心 / ${c.title.replace('中心','')}</div><h1>${c.title}</h1><p class="subtitle">${c.sub}</p></div></div><section class="creative-layout"><div class="creative-panel creative-left"><div class="creative-mode"><button class="active" id="modeNew" onclick="setCreativeMode('new')">✒ ${c.createBtn}</button><button id="modeOpt" onclick="setCreativeMode('opt')">🪄 ${c.optBtn}</button></div><div id="creativeForm"></div></div><div class="creative-result" id="creativeResult"><div class="result-empty"><div class="logo">✦</div><h3>${type==='product'?'內容工作區':type==='asset'?'圖片工作區':c.placeholder}</h3><p>${type==='product'?'完成左側流程後，商品文案與圖片版本會在這裡呈現，可切換、編輯、複製與儲存。':type==='asset'?'完成左側設定後，AI 會一次產生多個圖片版本與尺寸，方便挑選、微調與儲存。':'在左側輸入資料並點擊生成，AI 文案將在此處呈現。'}</p>${type==='asset'?assetEmptyGrid():''}</div></div></section>`;renderCreativeForm();toast(`已切換到 ${c.title}`)}
function setCreativeMode(mode){window.creativeMode=mode;$('#modeNew')?.classList.toggle('active',mode==='new');$('#modeOpt')?.classList.toggle('active',mode==='opt');renderCreativeForm();resetCreativeResult()}
function resetCreativeResult(){const c=creativeConfigs[window.creativeType||'product'];const isProduct=(window.creativeType||'product')==='product';$('#creativeResult').innerHTML=`<div class="result-empty"><div class="logo">✦</div><h3>${isProduct?'內容工作區':(window.creativeMode==='opt'?'等待 AI 分析優化':'等待 AI 生成中')}</h3><p>${isProduct?(window.creativeMode==='opt'?'選擇現有商品並設定優化內容後，這裡會顯示目前版本與 AI調整版本。':'完成左側流程後，商品文案與圖片版本會在這裡呈現。'):(window.creativeMode==='opt'?'點擊左下方按鈕開始 AI調整。':'在左側輸入資料並點擊生成，AI 文案將在此處呈現。')}</p></div>`}

function toggleCustomImageSize(){const sel=document.getElementById('imageSizeSelect');const box=document.getElementById('customImageSizeFields');if(box&&sel)box.classList.toggle('hidden',!sel.value.includes('自訂'))}
function imageUseHint(p){const map={'商品情境圖':'商品放入生活場景','活動 Banner':'檔期活動主視覺','官網 Banner':'網站首頁與活動頁','社群貼文圖片':'IG/FB/Threads 圖片','廣告素材':'投放版位素材','EDM / 電子報':'電子報 Header','LINE Rich Menu':'LINE 選單圖片','其他':'自訂圖片需求'};return map[p]||'自訂圖片需求'}
function assetEmptyGrid(){return `<div class="image-workspace-placeholder"><div>Preview A<br><span>1:1 / 4:5 / 16:9</span></div><div>Preview B<br><span>多版本比較</span></div><div>Preview C<br><span>可微調</span></div><div>Preview D<br><span>可儲存至資產庫</span></div></div>`}
function renderImageCreationEmpty(){const r=document.getElementById('creativeResult');if(!r)return;r.innerHTML=`<div class="result-empty image-empty-state"><div class="logo">✦</div><h3>圖片工作區</h3><p>完成左側設定後，AI 會一次產生 4 個圖片方向，並可依尺寸切換、微調與儲存。</p>${assetEmptyGrid()}</div>`}
function selectImageUse(btn){document.querySelectorAll('.image-use-card').forEach(x=>x.classList.remove('active'));btn?.classList.add('active')}
function updateImageUseHint(){const sel=document.getElementById('imageUseSelect');const hint=document.getElementById('imageUseHint');if(sel&&hint)hint.textContent=imageUseHint(sel.value)}
function setImageSource(type,btn){document.querySelectorAll('.image-source-tabs .pick').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');renderImageSourceFields(type)}
function renderImageSourceFields(type='product'){const box=document.getElementById('imageSourceFields');if(!box)return;if(type==='product'){box.innerHTML=`<label>選擇商品</label><input class="search" id="imageProductSearch" placeholder="搜尋商品名稱、平台、SKU..." oninput="renderImageProductList()" style="width:100%;min-width:0;margin:8px 0"><div id="imageSourceList" class="social-pick-list"></div><div class="social-mini-note">AI 會引用商品名稱、規格、平台文案與商品主圖，延伸成情境圖、Banner 或廣告素材。</div>`;renderImageProductList();return;}if(type==='ad'){box.innerHTML=`<label>選擇廣告</label><input class="search" id="imageAdSearch" placeholder="搜尋廣告名稱、平台、商品..." oninput="renderImageAdList()" style="width:100%;min-width:0;margin:8px 0"><div id="imageSourceList" class="social-pick-list"></div><div class="social-mini-note">AI 會引用廣告主張、CTA 與素材方向，延伸成不同版位圖片。</div>`;renderImageAdList();return;}box.innerHTML=`<label>圖片主題</label><input id="imageNewTitle" placeholder="例如：父親節活動 Banner / 官網夏季主視覺"><label>圖片需求說明</label><textarea id="imageNewBrief" placeholder="請輸入活動名稱、品牌色、想出現的元素、不要出現的元素、文字留白位置等。"></textarea>`}
function renderImageProductList(){const q=(document.getElementById('imageProductSearch')?.value||'').toLowerCase();const list=(typeof products!=='undefined'?products:[]).filter(p=>!q||`${p.name} ${p.platform} ${p.id} ${p.spec}`.toLowerCase().includes(q));const wrap=document.getElementById('imageSourceList');if(!wrap)return;wrap.innerHTML=list.map((p,i)=>`<div class="social-pick-row ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.social-pick-row').forEach(x=>x.classList.remove('active'));this.classList.add('active')"><div class="social-thumb">${p.platform}</div><div><b>${p.name}</b><p class="muted" style="margin:4px 0 0">${p.id}｜${p.price||''}｜${p.spec||''}</p></div><span class="tag">${p.status||'上架中'}</span></div>`).join('')||`<div class="card" style="box-shadow:none"><p class="muted">找不到符合條件的商品。</p></div>`}
function renderImageAdList(){const q=(document.getElementById('imageAdSearch')?.value||'').toLowerCase();const list=(typeof adsData!=='undefined'?adsData:[]).filter(a=>!q||`${a.name} ${a.platform} ${a.product}`.toLowerCase().includes(q));const wrap=document.getElementById('imageSourceList');if(!wrap)return;wrap.innerHTML=list.map((a,i)=>`<div class="social-pick-row ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.social-pick-row').forEach(x=>x.classList.remove('active'));this.classList.add('active')"><div class="social-thumb">AD</div><div><b>${a.name}</b><p class="muted" style="margin:4px 0 0">${a.platform}｜${a.product}｜${a.status}</p></div><span class="tag">${a.platform}</span></div>`).join('')||`<div class="card" style="box-shadow:none"><p class="muted">找不到符合條件的廣告。</p></div>`}
function visualStyleChip(name,desc,example,active=false){return `<button type="button" class="visual-style-chip ${active?'active':''}" onclick="selectVisualStyle(this,'${name}')"><span>${active?'✓ ':''}${name}</span><i>ⓘ<small><b>${name}</b><em>${desc}</em><p>${example}</p></small></i></button>`}
function selectVisualStyle(btn,name){document.querySelectorAll('.visual-style-chip').forEach(x=>{x.classList.remove('active');const s=x.querySelector('span');if(s)s.textContent=s.textContent.replace('✓ ','')});btn?.classList.add('active');const span=btn?.querySelector('span');if(span && !span.textContent.startsWith('✓ '))span.textContent='✓ '+span.textContent;const input=document.getElementById('visualStyleValue');if(input)input.value=name}
function selectImageReference(btn){document.querySelectorAll('.image-ref-card').forEach(x=>x.classList.remove('active'));btn?.classList.add('active')}
function generateImageCreationWorkspace(){const r=document.getElementById('creativeResult');if(!r)return;const use=document.getElementById('imageUseSelect')?.value||'活動 Banner';const style=document.getElementById('visualStyleValue')?.value||'生活感';const sizes=document.getElementById('imageSizeSelect')?.value||'依圖片用途自動建議尺寸';r.innerHTML=`<div class="image-workspace"><div class="product-workspace-head"><div><h2>圖片工作區</h2><p class="muted">已依「${use}」與「${style}」產生 4 個方向，可儲存、微調或重新生成。</p></div><button class="btn primary" onclick="generateImageCreationWorkspace()">重新生成全部</button></div><div class="image-version-grid">${['A','B','C','D'].map((v,i)=>`<div class="image-version-card"><div class="image-version-preview">${v}<br><span>${use}<br>${sizes}</span></div><div class="asset-meta"><b>方案 ${v}</b><span>${style}｜${i%2?'版面留白':'主視覺強化'}</span></div><div class="image-card-actions">${imageBlockActions()}</div></div>`).join('')}</div></div>`}

function renderCreativeForm(){const type=window.creativeType||'product', mode=window.creativeMode||'new', c=creativeConfigs[type];let html='';if(type==='asset'){
  html=`<div class="creative-form image-creation-flow"><h3>建立圖片創作</h3>
  <div class="flow-block image-compact-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇圖片用途</h3><p class="mini-hint">先選擇這張圖要用在哪裡，AI 會依用途調整構圖、文字留白與版面比例。</p><select id="imageUseSelect" class="image-compact-select" onchange="updateImageUseHint()">${['商品情境圖','活動 Banner','官網 Banner','社群貼文圖片','廣告素材','EDM / 電子報','LINE Rich Menu','其他'].map((p,i)=>`<option value="${p}" ${i===1?'selected':''}>${p}｜${imageUseHint(p)}</option>`).join('')}</select></div>
  <div class="flow-block"><span class="flow-step">STEP 2</span><h3 style="margin:10px 0 4px">選擇內容來源</h3><p class="mini-hint">可以引用已上架商品、既有廣告，也可以完全建立一張新的活動或品牌圖片。</p><div class="image-source-tabs"><button class="pick active" onclick="setImageSource('product',this)">引用商品</button><button class="pick" onclick="setImageSource('ad',this)">引用廣告</button><button class="pick" onclick="setImageSource('new',this)">全新建立</button></div><div id="imageSourceFields" style="margin-top:12px"></div></div>
  <div class="flow-block image-compact-block"><span class="flow-step">STEP 3</span><label>圖片尺寸 <span title="依圖片用途自動建議最佳尺寸，需要指定版位時再手動選擇。" style="cursor:help;color:#4359f3">ⓘ</span></label><select id="imageSizeSelect" class="image-compact-select" onchange="toggleCustomImageSize()"><option selected>依圖片用途自動建議尺寸</option><option>1:1 商品主圖</option><option>4:5 社群貼文</option><option>9:16 Reels / Shorts</option><option>16:9 Banner</option><option>LINE Rich Menu</option><option>自訂尺寸</option></select></div>
  <div class="flow-block"><span class="flow-step">STEP 4</span><label>視覺風格</label><div class="visual-style-chips">${visualStyleChip('生活感','適合日常、穿搭、居家與品牌生活感圖片。','木桌、自然光、柔和色調，像日常分享照。',true)}${visualStyleChip('品牌質感','適合官網 Banner、品牌活動與高質感視覺。','乾淨留白、細緻光影、低飽和品牌色。')}${visualStyleChip('極簡風','適合需要突出商品與簡潔訊息的版面。','白底、少元素、清楚標題與商品焦點。')}${visualStyleChip('明亮商攝','適合商品主圖、活動主視覺與廣告素材。','棚拍光、清楚商品輪廓、明亮乾淨。')}${visualStyleChip('節慶活動','適合父親節、母親節、週年慶、618 等活動圖。','節慶元素、優惠字卡、熱鬧但不雜亂。')}${visualStyleChip('高級精品','適合美妝、精品、禮盒、生活選物。','深色背景、精緻材質、戲劇光影。')}</div><input id="visualStyleValue" type="hidden" value="生活感"></div>
  <button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 開始生成圖片</button></div>`;
  $('#creativeForm').innerHTML=html;
  renderImageSourceFields('product');
  renderImageCreationEmpty();
  return;
}
if(type==='product' && mode==='new'){
  html=`<div class="creative-form product-ai-flow"><h3>建立全新商品內容</h3>
  <div class="flow-block"><div class="flow-head"><div><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">輸入商品核心資料</h3><p class="mini-hint">先輸入 AI 需要理解商品的最小資料。平台先選，AI 才能同步判斷各平台分類與內容格式。</p></div></div>
    <label>商品名稱</label><input id="creativeName" placeholder="例如：極簡白底老爹鞋">
    <label>品牌</label><input id="productBrand" placeholder="例如：E2B Select / Nike / 自有品牌">
    <label>商品特色描述</label><textarea id="creativeDesc" placeholder="可以貼一整段商品說明，AI 會幫你整理成特色 Tag 與規格欄位。例：白色厚底老爹鞋，透氣鞋面，EVA 軟底，適合通勤與日常穿搭，尺寸 22-27cm。"></textarea>
    <label>內容輸出平台（可複選）</label><div class="platform-picks">${['momo','蝦皮','SHOPLINE','Shopify','Cyberbiz','meepShop'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this);resetProductParse()">${p}</button>`).join('')}</div>
  </div>
  <div class="flow-block"><div class="flow-head"><div><span class="flow-step">STEP 2</span><h3 style="margin:10px 0 4px">選擇商品資料建立方式</h3><p class="mini-hint">可以使用 AI 快速解析，也可以不消耗 AI 點數，先手動建立商品特色、規格與平台分類。</p></div></div>
    <div class="build-method-grid">
      <div class="build-method-card ai-method"><div><span class="method-badge">推薦</span><h4>✦ AI 智慧解析</h4><p>AI 依商品名稱、品牌、描述與輸出平台，自動建立商品類型、特色 Tag、規格欄位與平台分類建議。</p></div><div class="method-foot"><span>消耗 <b>1 AI 點數</b></span><button class="btn primary" type="button" onclick="aiAnalyzeProduct()">使用 AI 解析</button></div></div>
      <div class="build-method-card"><div><span class="method-badge free">0 點數</span><h4>✍ 手動建立</h4><p>不使用 AI 點數，由使用者自行新增商品特色、規格與各平台分類；後續生成商品內容時再使用 AI。</p></div><div class="method-foot"><span>不消耗 AI 點數</span><button class="btn" type="button" onclick="manualCreateProductData()">手動建立</button></div></div>
    </div>
    <div id="productParsedArea"><div class="empty-parse">尚未建立商品資料。請選擇「AI 智慧解析」或「手動建立」。</div></div>
  </div>
  <div class="flow-block"><span class="flow-step">STEP 3</span><label>文案風格</label><div class="style-grid"><div class="style-card active" onclick="selectProductStyle(this,'極簡質感')"><b>極簡質感</b><p>範本：重新定義每天都想穿的白鞋。乾淨、俐落，保留品牌呼吸感。</p></div><div class="style-card" onclick="selectProductStyle(this,'專業可信')"><b>專業可信</b><p>範本：採用透氣鞋面與 EVA 軟底，兼顧支撐、舒適與日常耐穿度。</p></div><div class="style-card" onclick="selectProductStyle(this,'熱血促購')"><b>熱血促購</b><p>範本：限時優惠開跑！厚底顯高、百搭不挑人，今天下單直接穿出門。</p></div></div><input id="productCopyStyle" class="hidden" value="極簡質感">
    <label>行銷重點</label><div class="goal-picks">${['新品上市','限時優惠','免運','官方直營','熱銷排行','滿額折','買一送一','季節限定'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div>
    <label>AI 引用素材（選填）</label><p class="mini-hint">可從素材庫選擇一個或多個素材，AI 會參考素材的視覺風格、配色與版面配置，不會直接複製素材內容。</p><div class="asset-select-box product-asset-ref"><div class="selected-assets" id="selectedAssets"><span>尚未選擇素材</span></div><button class="btn" type="button" onclick="openAssetLibrary()">＋ 選擇引用素材</button></div>
  </div>
  <div class="flow-block"><span class="flow-step">STEP 4</span><label>建立商品內容（可複選）</label><div class="content-group-title">文字</div><div class="content-picks">${['商品標題','商品賣點','商品短描述','商品完整介紹','商品規格整理','FAQ','SEO Title','Meta Description','平台關鍵字'].map((p,i)=>`<button class="pick ${i<4?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片</div><div class="content-picks image-content-picks"><button class="pick active" onclick="togglePick(this)">商品主圖（AI生成）</button><button class="pick" onclick="togglePick(this)">商品情境圖（V2）</button><button class="pick" onclick="togglePick(this)">商品 Banner（V2）</button></div>
    <button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立商品內容</button></div></div>`;
  $('#creativeForm').innerHTML=html;
  return;
}

if(type==='product' && mode==='opt'){
  const productOptions=(typeof products!=='undefined'?products:[]).map((p,i)=>`<option value="${p.id}">${p.platform}｜${p.name}</option>`).join('');
  html=`<div class="creative-form product-ai-flow"><h3>優化現有商品文案</h3>
  <input id="creativeName" type="hidden" value="極簡白底老爹鞋"><input id="productBrand" type="hidden" value="Urban Walk"><textarea id="creativeDesc" class="hidden">現有商品文案待優化</textarea>
  <div class="flow-block"><div class="flow-head"><div><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇現有商品文案</h3><p class="mini-hint">從營運分析模組中的商品清單帶入既有商品文案。平台會跟著商品一起帶入，不需要另外選。</p></div></div>
    <label>現有商品</label><select id="existingProductSelect" onchange="renderExistingProductSource()">${productOptions}</select>
    <div id="existingSource" class="source-card"></div>
  </div>
  <div class="flow-block"><div class="flow-head"><div><span class="flow-step">STEP 2</span><h3 style="margin:10px 0 4px">確認與補充商品內容</h3><p class="mini-hint">AI 會先帶入目前商品名稱、特色與規格。使用者可以微調後，再產生新的優化版本。</p></div></div>
    <label>商品特色 Tag</label><div class="feature-tags" id="existingFeatureTags"><span class="feature-tag">厚底顯高 4cm <button onclick="this.parentElement.remove()">×</button></span><span class="feature-tag">透氣不悶腳 <button onclick="this.parentElement.remove()">×</button></span><span class="feature-tag">日常百搭 <button onclick="this.parentElement.remove()">×</button></span><button class="feature-add" onclick="addExistingFeatureTag()">＋新增特色</button></div>
    <label>商品規格</label><div class="existing-spec-list" id="existingSpecList"></div><button class="btn" type="button" onclick="addExistingSpecRow()">＋ 新增規格</button>
  </div>
  <div class="flow-block"><span class="flow-step">STEP 3</span>
    <label>文案風格</label><div class="style-grid"><div class="style-card active" onclick="selectProductStyle(this,'依原平台最佳化')"><b>依原平台最佳化</b><p>範本：保留原有賣點，改成更符合該平台閱讀與上架格式的版本。</p></div><div class="style-card" onclick="selectProductStyle(this,'極簡質感')"><b>極簡質感</b><p>範本：減少促銷感，讓商品回到品牌感與生活情境。</p></div><div class="style-card" onclick="selectProductStyle(this,'熱血促購')"><b>熱血促購</b><p>範本：加強優惠、稀缺感與 CTA，適合活動檔期。</p></div></div><input id="productCopyStyle" class="hidden" value="依原平台最佳化">
    <label>想優化哪些內容（可複選）</label><div class="content-picks">${['商品標題','商品賣點','商品短描述','商品完整介紹','商品規格整理','FAQ','SEO Title','Meta Description','平台關鍵字'].map((p,i)=>`<button class="pick ${i<5?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div>
    <label>圖片</label><div class="content-picks image-content-picks"><button class="pick" onclick="togglePick(this)">商品主圖（AI生成）</button><button class="pick" onclick="togglePick(this)">商品情境圖（V2）</button><button class="pick" onclick="togglePick(this)">商品 Banner（V2）</button></div>
    <label>AI 引用素材（選填）</label><p class="mini-hint">可從素材庫選擇一個或多個素材，AI 會參考素材的視覺風格、配色與版面配置，不會直接複製素材內容。</p><div class="asset-select-box product-asset-ref"><div class="selected-assets" id="selectedAssets"><span>尚未選擇素材</span></div><button class="btn" type="button" onclick="openAssetLibrary()">＋ 選擇引用素材</button></div>
    <button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI調整商品文案</button></div></div>`;
  $('#creativeForm').innerHTML=html;
  renderExistingProductSource();
  return;
}
if(mode==='new'){html=`<div class="creative-form"><h3>${c.newTitle}</h3><label>${type==='product'?'商品名稱':type==='ad'?'廣告活動名稱':'內容主題'}</label><input id="creativeName" placeholder="例如：極簡白底老爹鞋"><label>${type==='product'?'商品特色與規格':type==='ad'?'廣告商品 / 活動說明':'貼文 / 影音內容方向'}</label><textarea id="creativeDesc" placeholder="請輸入重點、規格、活動資訊或想強調的特色..."></textarea><label>${type==='product'?'品牌風格':type==='ad'?'廣告目標':'內容語氣'}</label><select><option>${type==='product'?'極簡質感':type==='ad'?'轉換 / 購買':'活潑親切'}</option><option>專業可信</option><option>年輕潮流</option><option>溫柔療癒</option></select><label>${type==='product'?'行銷賣點':type==='ad'?'目標受眾': '目標受眾'}</label><input placeholder="例如：限時 7 折、滿千免運、女性 25-34 歲"><label>${type==='product'?'上架平台':'發布 / 投放平台'}</label><div class="platform-picks">${c.platforms.map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>產出內容（可複選）</label><div class="content-picks">${c.outputs.map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>引用素材（選填）</label><div class="asset-select-box"><div class="selected-assets" id="selectedAssets"><span>尚未選擇圖片素材</span></div><button class="btn" type="button" onclick="openAssetLibrary()">從素材庫選取</button></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ ${c.button}</button></div>`}else{html=`<div class="creative-form"><h3>${c.optTitle}</h3><label>${type==='product'?'選擇商品':type==='ad'?'選擇廣告':'選擇貼文 / 影音'}</label><select id="existingSelect" onchange="renderExistingSource()"><option>極簡白底老爹鞋</option><option>微透氣涼感 T 恤</option><option>春季促銷_V1</option><option>夏季新品｜透氣老爹鞋上市</option></select><div id="existingSource" class="source-card"></div><label>優化目標（可複選）</label><div class="goal-picks">${(type==='product'?['標題更吸引人','強化賣點','符合平台格式','SEO 優化','社群推廣文案','提升轉換率']:type==='ad'?['降低 CPA','提升 CTR','重寫主文案','強化 CTA','改寫前 3 秒腳本','新增 A/B 版本']:['開頭更吸引人','提升互動率','補強 CTA','改寫 Hashtag','轉成短影音腳本','跨平台改寫']).map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>引用素材（選填）</label><div class="asset-select-box"><div class="selected-assets" id="selectedAssets"><span>尚未選擇圖片素材</span></div><button class="btn" type="button" onclick="openAssetLibrary()">從素材庫選取</button></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 開始分析並優化文案</button></div>`}$('#creativeForm').innerHTML=html;if(mode==='opt')renderExistingSource()}


function getExistingSelectedProduct(){const id=document.getElementById('existingProductSelect')?.value;return (typeof products!=='undefined'?products:[]).find(p=>p.id===id)||((typeof products!=='undefined'&&products[0])?products[0]:null)}
function existingProductSpecs(p){const spec=(p?.spec||'尺碼 22-27 / 白 / 杏 / 黑 / 厚底 4cm').split('/').map(x=>x.trim()).filter(Boolean);const names=['尺碼','顏色','材質','鞋底高度','適用情境'];return spec.map((v,i)=>[names[i]||'規格',v])}
function renderExistingProductSource(){const p=getExistingSelectedProduct();if(!p)return;const name=document.getElementById('creativeName');const brand=document.getElementById('productBrand');const desc=document.getElementById('creativeDesc');if(name)name.value=p.name;if(brand)brand.value='Urban Walk';if(desc)desc.value=`${p.name}。${p.desc||''} 規格：${p.spec||''}。目前平台：${p.platform}。`;
 const source=document.getElementById('existingSource');if(source){source.innerHTML=`<div style="display:grid;gap:12px"><div><span class="tag">${p.platform}</span> <span class="tag">${p.id}</span></div><div><b>${p.name}</b><p class="muted" style="margin:6px 0 0">已帶入 ${p.platform} 的目前商品文案，後續優化會產生一份新版本，不會覆蓋原文。</p></div><div class="material-note"><b>目前文案摘要</b><br>${p.aiDesc||'目前商品文案偏短，可補齊平台上架格式、商品規格與使用情境。'}</div></div>`}
 const specList=document.getElementById('existingSpecList');if(specList){specList.innerHTML=existingProductSpecs(p).map(([k,v])=>`<div class="spec-row"><input value="${escapeHtml(k)}"><input value="${escapeHtml(v)}"><button onclick="this.parentElement.remove()">×</button></div>`).join('')}
 const tagWrap=document.getElementById('existingFeatureTags');if(tagWrap){const tags=(p.name.includes('T 恤')?['涼感透氣','夏季通勤','黑白灰百搭']:p.name.includes('丹寧')?['復古版型','寬褲顯瘦','日常穿搭']:p.name.includes('圍巾')?['羊毛混紡','送禮適合','冬季保暖']:['厚底顯高 4cm','透氣不悶腳','日常百搭']);tagWrap.innerHTML=tags.map(t=>`<span class="feature-tag">${t} <button onclick="this.parentElement.remove()">×</button></span>`).join('')+`<button class="feature-add" onclick="addExistingFeatureTag()">＋新增特色</button>`}
}
function addExistingFeatureTag(){const box=document.getElementById('existingFeatureTags');if(!box)return;const btn=box.querySelector('.feature-add');btn.insertAdjacentHTML('beforebegin',`<span class="feature-tag">新特色 <button onclick="this.parentElement.remove()">×</button></span>`);toast('已新增特色 Tag')}
function addExistingSpecRow(){const box=document.getElementById('existingSpecList');if(!box)return;box.insertAdjacentHTML('beforeend',`<div class="spec-row"><input value="新規格"><input value="請輸入內容"><button onclick="this.parentElement.remove()">×</button></div>`);toast('已新增規格')}
function analyzeExistingProductCopy(){const p=getExistingSelectedProduct();if(!p)return;const diag=document.getElementById('existingProductDiagnosis');if(!diag)return;diag.innerHTML=`<div class="parse-grid"><div class="parse-card"><h4>標題問題</h4><p class="mini-hint">目前標題可讀性尚可，但搜尋字與平台差異不足。建議補入「厚底、透氣、百搭、通勤」等高意圖字。</p></div><div class="parse-card"><h4>賣點缺口</h4><p class="mini-hint">文案有提到舒適，但缺少「為什麼舒適」的支撐，例如 EVA 軟底、鞋底高度、鞋面材質。</p></div><div class="parse-card"><h4>規格完整度</h4><p class="mini-hint">已具備基本規格，但建議拆成平台可讀的條列格式，降低客服詢問成本。</p></div><div class="parse-card"><h4>AI 建議策略</h4><p class="mini-hint">${p.platform} 版本建議優先強化搜尋標題、前三行短描述與規格表；若同步產生 SHOPLINE，可改寫成品牌情境敘事。</p></div></div>`;toast('AI 已完成現有商品文案健檢')}

function getDemoProductParsed(){return {type:'鞋類 / 厚底休閒鞋',features:['厚底顯高','透氣鞋面','EVA 軟底','日常百搭','通勤友善'],specs:[['尺寸','22-27cm'],['顏色','白 / 杏 / 黑'],['材質','透氣帆布、EVA 軟底'],['鞋底高度','約 4cm'],['適用情境','通勤、散步、週末穿搭']],categories:{'momo':'流行鞋包 > 女鞋 > 休閒鞋 / 厚底鞋','蝦皮':'女鞋 > 休閒鞋 > 老爹鞋','SHOPLINE':'Product Type：Shoes；Collection：Daily Sneakers','Shopify':'Product Type：Shoes；Tags：sneakers, platform shoes, daily wear','Cyberbiz':'鞋包配件 > 女鞋 > 休閒鞋','meepShop':'商品分類：鞋款 / 休閒鞋'}}}
function resetProductParse(){window.productParsedData=null;window.productDataMethod=null;const area=document.getElementById('productParsedArea');if(area)area.innerHTML='<div class="empty-parse">平台已更新，請重新選擇「AI 智慧解析」或「手動建立」。</div>'}
function aiAnalyzeProduct(silent=false){const name=(document.getElementById('creativeName')?.value||'極簡白底老爹鞋').trim();const desc=(document.getElementById('creativeDesc')?.value||'白色厚底老爹鞋，透氣鞋面，EVA 軟底，適合通勤與日常穿搭，尺寸 22-27cm。').trim();const platforms=selectedPicks('.platform-picks');const isShoe=/鞋|sneaker|老爹|厚底|靴/i.test(name+desc);const isBottle=/瓶|保溫|杯|水壺/i.test(name+desc);let data=getDemoProductParsed();if(isBottle){data={type:'生活用品 / 保溫瓶',features:['長效保溫保冷','極簡外型','不鏽鋼內膽','外出攜帶','日常辦公'],specs:[['容量','500ml'],['顏色','白 / 黑 / 奶茶色'],['材質','304 不鏽鋼'],['保溫時間','約 8-12 小時'],['適用情境','辦公、通勤、戶外']],categories:{'momo':'餐廚用品 > 保溫瓶 / 隨行杯','蝦皮':'居家生活 > 水壺 / 保溫瓶','SHOPLINE':'Product Type：Bottle；Collection：Daily Goods','Shopify':'Product Type：Drinkware；Tags：bottle, insulated, daily','Cyberbiz':'居家生活 > 餐廚用品','meepShop':'商品分類：生活用品 / 保溫瓶'}}}else if(!isShoe){data={type:'一般商品 / 生活選物',features:['日常實用','質感設計','送禮適合','簡約百搭','高 CP 值'],specs:[['品名',name],['品牌','依輸入品牌'],['材質','依商品描述補充'],['尺寸','待補充'],['適用情境','日常使用、送禮']],categories:{'momo':'生活用品 > 日用百貨','蝦皮':'居家生活 > 其他生活用品','SHOPLINE':'Product Type：Lifestyle Goods','Shopify':'Product Type：Lifestyle Goods；Tags：daily, gift','Cyberbiz':'生活用品 > 其他','meepShop':'商品分類：生活選物'}}}
window.productParsedData=data;window.productDataMethod='ai';renderProductParsedFields(data,platforms.length?platforms:['momo','蝦皮']);if(!silent)toast('AI 已解析商品特色、規格與平台分類，已消耗 1 AI 點數')}

function manualCreateProductData(silent=false){
  const name=(document.getElementById('creativeName')?.value||'').trim()||'商品名稱';
  const brand=(document.getElementById('productBrand')?.value||'').trim()||'品牌名稱';
  const platforms=selectedPicks('.platform-picks');
  const list=platforms.length?platforms:['momo','蝦皮'];
  const data={type:'待填寫商品類型',features:[],specs:[['商品名稱',name],['品牌',brand],['尺寸',''],['顏色',''],['材質','']],categories:{}};
  list.forEach(p=>data.categories[p]='');
  window.productParsedData=data;
  window.productDataMethod='manual';
  renderManualProductFields(data,list);
  if(!silent)toast('已切換為手動建立商品資料，不消耗 AI 點數');
}
function renderManualProductFields(data,platforms){
  const area=document.getElementById('productParsedArea');if(!area)return;
  area.innerHTML=`<div class="manual-status-card"><div><b>手動建立模式</b><p class="mini-hint" style="margin:4px 0 0">請自行補充商品類型、特色 Tag、規格與平台分類。這個步驟不消耗 AI 點數。</p></div><span class="pill blue">0 AI 點數</span></div><div class="parse-grid"><div class="parse-card"><h4>商品類型</h4><input id="manualProductType" value="${escapeHtml(data.type||'')}" placeholder="例如：鞋類 / 厚底休閒鞋"></div><div class="parse-card"><h4>商品特色 Tag</h4><div class="feature-tags" id="manualFeatureTags">${(data.features||[]).map(t=>`<span class="feature-tag">${escapeHtml(t)} <button onclick="this.parentElement.remove()">×</button></span>`).join('')}<button class="feature-add" onclick="addManualFeatureTag()">＋新增特色</button></div></div><div class="parse-card"><h4>商品規格欄位</h4><div class="existing-spec-list" id="manualSpecList">${(data.specs||[]).map(([k,v])=>`<div class="spec-row"><input value="${escapeHtml(k)}" placeholder="規格名稱"><input value="${escapeHtml(v)}" placeholder="規格內容"><button onclick="this.parentElement.remove()">×</button></div>`).join('')}</div><button class="btn" type="button" onclick="addManualSpecRow()">＋ 新增規格</button></div><div class="parse-card"><h4>平台分類</h4><div class="manual-category-list" id="manualCategoryList">${platforms.map(p=>`<div class="manual-category-row" data-platform="${escapeHtml(p)}"><b>${escapeHtml(p)}</b><input value="${escapeHtml((data.categories&&data.categories[p])||'')}" placeholder="請輸入 ${escapeHtml(p)} 分類，例如：女鞋 > 休閒鞋"></div>`).join('')}</div></div></div>`;
}
function addManualFeatureTag(){const box=document.getElementById('manualFeatureTags');if(!box)return;const btn=box.querySelector('.feature-add');btn.insertAdjacentHTML('beforebegin',`<span class="feature-tag">新特色 <button onclick="this.parentElement.remove()">×</button></span>`);toast('已新增特色 Tag')}
function addManualSpecRow(){const box=document.getElementById('manualSpecList');if(!box)return;box.insertAdjacentHTML('beforeend',`<div class="spec-row"><input value="新規格" placeholder="規格名稱"><input value="" placeholder="規格內容"><button onclick="this.parentElement.remove()">×</button></div>`);toast('已新增規格')}
function newProductParsedFromForm(){
  const manualType=document.getElementById('manualProductType');
  if(manualType){
    const features=Array.from(document.querySelectorAll('#manualFeatureTags .feature-tag')).map(x=>x.childNodes[0]?.textContent.trim()).filter(Boolean);
    const specs=Array.from(document.querySelectorAll('#manualSpecList .spec-row')).map(row=>{const inputs=row.querySelectorAll('input');return [inputs[0]?.value||'規格',inputs[1]?.value||'']}).filter(x=>x[0]||x[1]);
    const categories={};Array.from(document.querySelectorAll('#manualCategoryList .manual-category-row')).forEach(row=>{const p=row.dataset.platform||'';categories[p]=row.querySelector('input')?.value||''});
    return {type:manualType.value||'待填寫商品類型',features:features.length?features:['商品特色待補充'],specs:specs.length?specs:[['商品名稱',document.getElementById('creativeName')?.value||'商品名稱']],categories};
  }
  const tagCloud=document.querySelector('.tag-cloud');
  if(tagCloud){
    const features=Array.from(tagCloud.querySelectorAll('span')).map(x=>x.textContent.trim()).filter(x=>x&&!x.includes('＋新增'));
    const specs=Array.from(document.querySelectorAll('.spec-list .spec-row')).map(row=>[row.querySelector('b')?.textContent.trim()||'規格',row.querySelector('span')?.textContent.trim()||'']);
    const categories={};Array.from(document.querySelectorAll('.platform-category')).forEach(row=>{const b=row.querySelector('b');if(b)categories[b.textContent.trim()]=row.textContent.replace(b.textContent,'').trim()});
    return {type:document.querySelector('.parse-card b')?.textContent.trim()||window.productParsedData?.type||'商品類型',features:features.length?features:(window.productParsedData?.features||[]),specs:specs.length?specs:(window.productParsedData?.specs||[]),categories:Object.keys(categories).length?categories:(window.productParsedData?.categories||{})};
  }
  return null;
}
function renderProductParsedFields(data,platforms){const area=document.getElementById('productParsedArea');if(!area)return;area.innerHTML=`<div class="parse-grid"><div class="parse-card"><h4>商品類型判斷</h4><b>${data.type}</b><p class="mini-hint">此類型會用來決定基本規格欄位與平台分類建議。</p></div><div class="parse-card"><h4>商品特色 Tag</h4><div class="tag-cloud">${data.features.map(x=>`<span contenteditable="true">${x}</span>`).join('')}<span contenteditable="true">＋新增特色</span></div></div><div class="parse-card"><h4>商品規格欄位</h4><div class="spec-list">${data.specs.map(([k,v])=>`<div class="spec-row"><b contenteditable="true">${k}</b><span contenteditable="true">${v}</span></div>`).join('')}</div></div><div class="parse-card"><h4>平台分類建議</h4><div class="platform-category-list">${platforms.map(p=>`<div class="platform-category"><b>${p}</b><br>${(data.categories&&data.categories[p])||'依平台商品樹產生建議分類'}</div>`).join('')}</div></div></div>`}
function selectProductStyle(card,value){document.querySelectorAll('.style-card').forEach(x=>x.classList.remove('active'));card.classList.add('active');const input=document.getElementById('productCopyStyle');if(input)input.value=value;toast('已選擇文案風格：'+value)}
function safeJs(v){return String(v).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
function platformTone(platform){if(platform.includes('蝦皮'))return {title:'厚底老爹鞋 女鞋 白鞋 百搭 透氣 厚底鞋',note:'偏搜尋關鍵字與促購語氣'};if(platform.toLowerCase().includes('momo'))return {title:'【熱銷推薦】極簡白底老爹鞋｜厚底4cm｜透氣不悶腳｜百搭休閒鞋',note:'偏完整規格、信任感與平台檢索'};if(platform.includes('SHOPLINE')||platform.includes('Shopify'))return {title:'重新定義每天都想穿的白鞋',note:'偏品牌感、情境敘事與 SEO'};return {title:'極簡白底老爹鞋｜厚底透氣・日常百搭',note:'通用平台版'} }
function productPlatformResultHtml(platform,ctx,active){const tone=platformTone(platform);const category=(ctx.parsed.categories&&ctx.parsed.categories[platform])||'依平台商品樹產生建議分類';const includeImage=ctx.imageOutputs.some(x=>x.includes('商品主圖'));const blocks=[];if(includeImage){blocks.push(`<div class="product-result-block"><h3>🖼 商品主圖</h3><div class="main-image-preview">AI 商品主圖<br><span class="muted">${platform}｜1:1 電商主圖｜依 ${ctx.style} 風格生成</span></div><div class="block-toolbar"><button class="btn" onclick="toast('已重新生成')">重新生成</button><button class="btn" onclick="toast('已開啟圖片 Prompt 編輯')">AI調整</button></div></div>`)}
const title=`${tone.title}`;blocks.push(`<div class="product-result-block"><h3>商品標題</h3><div class="editable-copy" contenteditable="true">${escapeHtml(title)}</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="toast('已重新生成商品標題')">重新生成</button></div></div>`)
blocks.push(`<div class="product-result-block"><h3>商品短描述</h3><div class="editable-copy" contenteditable="true">以 ${ctx.brand} 的${ctx.style}語氣，為 ${ctx.name} 打造日常百搭的商品內容。${tone.note}，並結合「${ctx.marketing}」作為促購重點。</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="toast('已重新生成短描述')">重新生成</button></div></div>`)
blocks.push(`<div class="product-result-block"><h3>商品完整介紹</h3><div class="editable-copy" contenteditable="true">${ctx.name} 專為日常通勤、週末散步與輕鬆穿搭設計。透過 ${ctx.parsed.features.slice(0,3).join('、')} 等特色，讓商品在 ${platform} 上能同時兼顧搜尋曝光與轉換說服。\n\n推薦給重視舒適、外型簡約、希望一雙鞋能搭配多種生活情境的消費者。</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="toast('已重新生成完整介紹')">重新生成</button></div></div>`)
blocks.push(`<div class="product-result-block"><h3>商品規格整理</h3><div class="editable-copy" contenteditable="true">${ctx.parsed.specs.map(([k,v])=>`${k}：${v}`).join('\n')}</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="toast('已重新整理規格')">重新生成</button></div></div>`)
blocks.push(`<div class="product-result-block"><h3>平台分類與 SEO</h3><div class="editable-copy" contenteditable="true">平台分類：${category}\nSEO Title：${ctx.name}｜${ctx.parsed.features.slice(0,3).join('、')}\nMeta Description：${ctx.name} 結合 ${ctx.parsed.features.slice(0,3).join('、')}，適合日常通勤與週末穿搭，立即查看 ${ctx.brand} 精選商品。</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="toast('已重新生成 SEO')">重新生成</button></div></div>`)
return `<div class="product-platform-panel ${active?'active':''}" data-platform="${escapeHtml(platform)}" style="display:${active?'grid':'none'};gap:12px">${blocks.join('')}</div>`}
function switchProductContentTab(platform,btn){document.querySelectorAll('#productContentTabs button').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.querySelectorAll('.product-platform-panel').forEach(p=>{p.style.display=(p.dataset.platform===platform)?'grid':'none'});toast('已切換平台版本：'+platform)}
function switchProductCompareView(btn){document.querySelectorAll('#productContentTabs button').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.querySelectorAll('.product-platform-panel').forEach(p=>{p.style.display='grid'});toast('已顯示全部平台比較')}

function existingProductParsedFromForm(p){const specs=Array.from(document.querySelectorAll('#existingSpecList .spec-row')).map(row=>{const inputs=row.querySelectorAll('input');return [inputs[0]?.value||'規格',inputs[1]?.value||'']});const features=Array.from(document.querySelectorAll('#existingFeatureTags .feature-tag')).map(x=>x.childNodes[0]?.textContent.trim()).filter(Boolean);const base=getDemoProductParsed();return {type:p?.cat?`${p.cat} / 平台既有商品`:'鞋類 / 厚底休閒鞋',features:features.length?features:base.features,specs:specs.length?specs:base.specs,categories:{[p?.platform||'蝦皮']:`${p?.platform||'蝦皮'} 既有平台分類`}}}
function existingProductOptimizationWorkspaceHtml(p,ctx){const platform=ctx.platform||p?.platform||'蝦皮';const currentText=`商品標題｜${p?.name||ctx.name}\n\n目前文案｜${p?.aiDesc||'目前商品文案偏短，可補齊平台上架格式、商品規格與使用情境。'}\n\n規格｜${p?.spec||ctx.parsed.specs.map(x=>x.join('：')).join(' / ')}`;const optimized=productPlatformResultHtml(platform,ctx,true);return `<div class="product-output-split"><div class="product-workspace-head"><div><h2 style="margin:0 0 6px">內容工作區</h2><p class="muted" style="margin:0">${platform}｜${p?.name||ctx.name}。AI 會建立新的優化版本，不會覆蓋目前文案。</p></div><div class="workspace-actions"><button class="btn" onclick="generateCreative()">重新產生優化版本</button><button class="btn primary" onclick="saveProductWorkspace('${safeJs(p?.name||ctx.name)}')">儲存目前平台版本</button></div></div><div class="product-tabs" id="productVersionTabs"><button class="active" onclick="switchCopyVersionTab('current',this)">目前版本</button><button onclick="switchCopyVersionTab('optimized',this)">AI調整版本</button></div><div class="product-platform-panel active" data-version="current" style="display:grid;gap:12px"><div class="product-result-block"><h3>目前商品文案</h3><div class="editable-copy" contenteditable="true">${escapeHtml(currentText)}</div><div class="block-toolbar"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="switchCopyVersionTab('optimized',document.querySelector('#productVersionTabs button:nth-child(2)'))">查看 AI調整版本</button></div></div></div><div class="product-platform-panel" data-version="optimized" style="display:none;gap:12px">${optimized}</div></div>`}
function switchCopyVersionTab(version,btn){document.querySelectorAll('#productVersionTabs button').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.querySelectorAll('[data-version]').forEach(p=>{p.style.display=(p.dataset.version===version)?'grid':'none'});toast(version==='current'?'已切換到目前版本':'已切換到 AI調整版本')}
function renderExistingSource(){const type=window.creativeType||'product';const copy={product:`<b>【現有】極簡老爹鞋｜男女款 厚底增高 奶油帆布</b><br><br>採用透氣帆布與 EVA 軟底，舒適好穿。適合日常散步、男女皆適合，是春夏穿搭的百搭單品。<br><br><b>規格</b><br>材質：透氣帆布 + EVA 軟底<br>尺寸：US 5 ~ US 11<br>顏色：白 / 杏 / 黑<br><span class="tag">待優化</span>`,ad:`<b>春季促銷_V1</b><br><br>全館老爹鞋 7 折，限時 3 天。軟Q厚底，透氣細布，韓系百搭一雙搞定。<br><br><b>目前問題</b><br>ROAS 由 4.8 降至 3.2，素材疲勞風險升高。<span class="tag">需優化</span>`,social:`<b>夏季新品｜透氣老爹鞋上市</b><br><br>炎夏不悶腳！全新透氣網布老爹鞋，軟Q厚底走整天。早鳥 7 折，今晚 10 點限時開搶！<br><br><b>目前表現</b><br>互動率 7.5%，可複製為短影音與限動版本。<span class="tag">表現優秀</span>`};$('#existingSource').innerHTML=copy[type]||copy.product}
function togglePick(btn){btn.classList.toggle('active')}
function selectedPicks(sel){return Array.from(document.querySelectorAll(sel+' .pick.active')).map(x=>x.textContent.trim())}
function saveCreativeToAssetLibrary(kind,title,type='內容資產',text='AI 生成內容'){
 if(kind==='media'){
   mediaLibraryAssets.unshift({type:type,title:title,date:'剛剛',size:'AI 生成',format:'PNG',emoji:'🖼',cls:type.includes('banner')?'ad':type.includes('宣傳')?'social':'scene'});
   toast('已儲存至資產庫');
 }else{
   const cls=type==='商品文案'?'product':type==='廣告文案'?'ad':type==='社群影音'?'video':'social';
   contentLibraryAssets.unshift({type:type,platform:'AI 生成',title:title,date:'剛剛',status:'已完成',emoji:type==='社群影音'?'影':'文',text:text,cls:cls,hasImage:type==='商品文案'||type==='廣告文案'||type==='社群貼文',hasVideo:type==='社群影音'});
   toast('已儲存至內容資產庫');
 }
}

function saveProductWorkspace(name){
 const panels=Array.from(document.querySelectorAll('#creativeResult .product-platform-panel[data-platform]'));
 const activePanel=panels.find(el=>getComputedStyle(el).display!=='none')||panels.find(el=>el.classList.contains('active'))||panels[0];
 const platform=(activePanel?.dataset?.platform)||document.querySelector('#productContentTabs button.active')?.textContent?.trim()||document.querySelector('#existingSource .tag')?.textContent?.trim()||'目前平台';
 const title=`商品內容｜${platform}｜${name||'AI 商品內容'}`;
 const text=Array.from((activePanel||document).querySelectorAll('.editable-copy')).map((el,i)=>`【${platform} 區塊 ${i+1}】\n${el.innerText||el.textContent||''}`).join('\n\n');
 saveCreativeToAssetLibrary('content',title,'商品文案',(text||`${platform} 平台商品文案與 AI 商品主圖已儲存`));
 toast(`已將 ${platform} 版本儲存至內容資產庫`);
 const btn=document.activeElement;
 if(btn&&btn.tagName==='BUTTON'){
   const old=btn.textContent;
   btn.textContent='✓ 已儲存目前平台版本';
   setTimeout(()=>{btn.textContent=old},1600);
 }
}
function saveBtn(kind,title,type,text){return `<button class="btn primary" onclick="saveCreativeToAssetLibrary('${kind}','${title.replace(/'/g,"\\'")}','${type}','${(text||'AI 生成內容').replace(/`/g,'').replace(/'/g,"\\'")}')">儲存至資產庫</button>`}
function generateCreative(){const type=window.creativeType||'product', mode=window.creativeMode||'new';if(type==='asset'){generateImageCreationWorkspace();toast('已生成 4 個圖片方向');return;}const name=$('#creativeName')?.value.trim()|| (type==='product'?'極簡白底老爹鞋':type==='ad'?'春季促銷_V1':'夏季新品｜透氣老爹鞋上市');const platforms=selectedPicks('.platform-picks').join('、')||'蝦皮、Momo';const outs=selectedPicks('.content-picks').join('、')||selectedPicks('.goal-picks').join('、')||'文案優化';let cards='';
 if(type==='product'){
  const brand=(document.getElementById('productBrand')?.value||'E2B Select').trim();
  const desc=(document.getElementById('creativeDesc')?.value||'白色厚底老爹鞋，透氣鞋面，EVA 軟底，適合通勤與日常穿搭。').trim();
  const style=(document.getElementById('productCopyStyle')?.value||'極簡質感').trim();
  const textOutputs=selectedPicks('.content-picks').filter(x=>!x.includes('AI生成')&&!x.includes('V2'));
  const imageOutputs=selectedPicks('.image-content-picks');
  const marketing=selectedPicks('.goal-picks').join('、')||'新品上市、限時優惠';
  if(mode==='opt'){
    const p=getExistingSelectedProduct();
    const existingPlatform=p?.platform||'蝦皮';
    const parsed=existingProductParsedFromForm(p);
    cards=existingProductOptimizationWorkspaceHtml(p,{name:p?.name||name,brand,desc,style,marketing,textOutputs,imageOutputs,parsed,productType:parsed.type||'鞋類 / 厚底休閒鞋',platform:existingPlatform});
  }else{
    const selectedPlatforms=selectedPicks('.platform-picks');
    const platformsArr=selectedPlatforms.length?selectedPlatforms:['momo','蝦皮'];
    if(!window.productParsedData) manualCreateProductData(true);
    const parsed=newProductParsedFromForm()||window.productParsedData||getDemoProductParsed();
    window.productParsedData=parsed;
    const productType=parsed.type||'鞋類 / 厚底休閒鞋';
    const platformCards=platformsArr.map((platform,idx)=>productPlatformResultHtml(platform,{name,brand,desc,style,marketing,textOutputs,imageOutputs,parsed,productType},idx===0)).join('');
    cards=`<div class="product-output-split"><div class="product-workspace-head"><div><h2 style="margin:0 0 6px">內容工作區</h2><p class="muted" style="margin:0">同一個商品會依平台產生不同版本；儲存時只會儲存目前切換中的平台版本。</p></div><div class="workspace-actions"><button class="btn" onclick="generateCreative()">重新生成全部</button><button class="btn primary" onclick="saveProductWorkspace('${safeJs(name)}')">儲存目前平台版本</button></div></div><div class="product-tabs" id="productContentTabs">${platformsArr.map((p,i)=>`<button class="${i===0?'active':''}" onclick="switchProductContentTab('${safeJs(p)}',this)">${p}</button>`).join('')}</div><div id="productPlatformResults">${platformCards}</div></div>`
  }
 }else if(type==='ad'){
  const text=`廣告標題｜${mode==='opt'?'重新優化版：':''}${name}｜限時 3 天，厚底老爹鞋 7 折開跑

主文案｜走一整天也能保持輕盈。透氣鞋面搭配軟Q厚底，日常通勤、約會穿搭、週末出遊都能一雙完成。現在下單享限時優惠，售完不補。

CTA｜立即選購
A/B 方向｜A版：折扣稀缺感｜B版：舒適情境｜C版：韓系百搭`;
  cards=`<div class="result-card"><h3>廣告圖文組合</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>廣告主視覺<br><span class="muted">Meta / Google / TikTok</span></div><pre>${text}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button>${saveBtn('content','廣告素材｜'+name,'廣告文案',text)}</div></div>`
 }else if(type==='social'){
  const script=`貼文文案｜炎夏不悶腳，今天就讓腳步先透氣。全新透氣老爹鞋上市，厚底顯高但不笨重，通勤、散步、週末出遊都能一雙搞定。

短影音腳本｜0-3s：腳步特寫 + 字卡「夏天鞋子也要會呼吸」
3-7s：三套日常穿搭快速切換
7-12s：鞋底彈性、透氣布料近拍
12-15s：早鳥優惠 CTA

Hashtag｜#夏季新品 #老爹鞋 #透氣穿搭 #早鳥優惠 #日常穿搭`;
  cards=`<div class="result-card"><h3>社群影音內容＋影片腳本</h3><div class="creative-bundle"><div class="creative-preview video"><span class="muted" style="color:#fff">短影音預覽 / 腳本分鏡</span></div><pre>${script}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button>${saveBtn('content','社群影音｜'+name,'社群影音',script)}</div></div>`
 }else{
  cards=`<div class="result-card"><h3>AI 圖片素材草稿</h3><div class="image-result-grid"><div class="image-result-card"><div class="asset-preview scene">🖼<br>商品情境圖<br><span class="muted">街拍 / 明亮 / 夏季</span></div><div class="asset-meta"><b>商品情境圖 4:5</b>${saveBtn('media','商品情境圖｜'+Date.now(),'情境圖片','AI 生成圖片素材')}</div></div><div class="image-result-card"><div class="asset-preview ad">🖼<br>廣告主視覺<br><span class="muted">優惠字卡 / 高轉換</span></div><div class="asset-meta"><b>廣告主視覺 1:1</b>${saveBtn('media','廣告主視覺｜'+Date.now(),'活動banner','AI 生成圖片素材')}</div></div><div class="image-result-card"><div class="asset-preview social">🖼<br>社群封面圖<br><span class="muted">IG / Threads / LINE</span></div><div class="asset-meta"><b>社群封面圖 4:5</b>${saveBtn('media','社群封面圖｜'+Date.now(),'宣傳圖','AI 生成圖片素材')}</div></div><div class="image-result-card"><div class="asset-preview">🖼<br>商品白底圖<br><span class="muted">去背 / 乾淨電商風</span></div><div class="asset-meta"><b>白底主圖 1:1</b>${saveBtn('media','商品白底圖｜'+Date.now(),'情境圖片','AI 生成圖片素材')}</div></div></div></div><div class="result-card"><h3>圖片生成提示詞</h3><pre>清爽夏日街拍場景，一雙白色厚底老爹鞋，明亮自然光，極簡背景，年輕女性通勤穿搭，乾淨商業攝影風格。
延展尺寸：1:1 商品主圖、4:5 社群貼文、9:16 限動、16:9 廣告橫幅。</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button>${saveBtn('content','AI 圖片提示詞｜'+Date.now(),'圖片創作提示詞','圖片生成提示詞')}</div></div>`
 }
 if(type==='product'){
   $('#creativeResult').innerHTML=`<div class="result-stack">${cards}</div>`;
 }else{
   $('#creativeResult').innerHTML=`<div class="result-stack"><div class="section-head" style="margin:0"><div><h2>AI 生成結果</h2><p class="muted">已依據 ${mode==='opt'?'現有內容與優化目標':'輸入資料'} 產生，可複製、儲存至資產庫或重新生成。</p></div><button class="btn" onclick="generateCreative()">重新生成</button></div>${cards}</div>`;
 }
 toast('AI 內容已生成')}
function handleReferenceUpload(e){const files=[...e.target.files];const box=$('#assetRefPreview');if(!box)return;if(!files.length){box.innerHTML='<span>可上傳商品白底圖、既有主視覺或風格參考圖。</span>';return}box.innerHTML=files.map(f=>`<span class="asset-thumb-chip"><span class="fake-img">圖</span>${f.name}</span>`).join('');toast('已加入參考圖片')}

function openAiAdjustModal(title, content){
  const safeTitle = title || '內容';
  const safeContent = content || '';
  const existing = document.getElementById('aiAdjustModal');
  if(existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'aiAdjustModal';
  modal.className = 'ai-adjust-modal show';
  modal.innerHTML = `
    <div class="ai-adjust-dialog">
      <button class="ai-adjust-close" onclick="closeAiAdjustModal()">×</button>
      <div class="ai-adjust-head">
        <span class="logo mini">✦</span>
        <div>
          <h2>AI調整${safeTitle ? '｜' + safeTitle : ''}</h2>
          <p>選擇想調整的方向，AI 會保留原意並微調目前內容。</p>
        </div>
      </div>
      <label>目前內容</label>
      <div class="ai-current-content">${escapeHtml(String(safeContent)).replace(/\\n/g,'<br>')}</div>
      <label>快速調整</label>
      <div class="ai-adjust-options">
        ${['更有銷售力','更符合 SEO','更生活化','更專業','更精簡','更詳細'].map((x,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${x}</button>`).join('')}
      </div>
      <label>其他需求（選填）</label>
      <textarea placeholder="例如：加入限時優惠、增加品牌感、不要 emoji、適合 momo。"></textarea>
      <div class="ai-adjust-actions">
        <button class="btn" onclick="closeAiAdjustModal()">取消</button>
        <button class="btn primary" onclick="closeAiAdjustModal();toast('AI 已依需求AI調整')">開始調整</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}
function closeAiAdjustModal(){document.getElementById('aiAdjustModal')?.remove();}
function confirmRegenerateBlock(title){
  const ok = confirm(`重新生成${title ? '「'+title+'」' : '此內容'}？\n\n目前版本會保留，AI 將建立新的版本供比較。`);
  if(ok) toast('已重新生成一個新版本');
}
function aiBlockActions(title){
  return `<button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('${safeJs(title||'內容')}', this.closest('.result-card,.ad-content-block,.image-version-card')?.innerText || '')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('${safeJs(title||'內容')}')">重新生成</button>`;
}
function imageBlockActions(){
  return `<button class="btn">下載</button><button class="btn" onclick="openAiAdjustModal('圖片', this.closest('.image-version-card')?.innerText || '')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('圖片')">重新生成</button><button class="btn primary" onclick="toast('已儲存至資產庫')">儲存至資產庫</button>`;
}

function copyText(btn){toast('已複製內容')}



const contentLibraryAssets=[
 {type:'商品文案',platform:'Shopee / MOMO',title:'極簡保溫瓶商品內容',date:'2024/06/17 14:30',status:'已完成',emoji:'文',cls:'product',hasImage:true,text:`標題：極簡質感保溫瓶｜長效保溫保冷，陪伴你的每一天

商品描述：極簡外型，真空雙層技術，保溫保冷效果長達 12 小時。

搭配圖片：白底商品主圖＋生活情境圖`},
 {type:'廣告文案',platform:'Meta Ads',title:'夏日香氛新品廣告素材',date:'2024/06/15 09:15',status:'已完成',emoji:'文',cls:'ad',hasImage:true,text:`主標題：夏日香氛新品上市｜讓家變成會呼吸的花園
主要文案：把清爽花果香帶進日常，限時新品優惠。
CTA：立即選購

搭配素材：廣告主視覺 1:1＋限動版位 9:16`},
 {type:'社群貼文',platform:'Instagram',title:'夏日防曬推薦圖文貼文',date:'2024/06/14 11:30',status:'已完成',emoji:'文',cls:'social',hasImage:true,text:`太陽很大，但肌膚不一定要有負擔。清爽不黏膩的日常防曬。
#夏日保養 #防曬推薦

搭配圖片：IG 4:5 社群封面圖`},
 {type:'社群影音',platform:'TikTok',title:'洗面乳使用教學影音腳本',date:'2024/06/12 09:30',status:'已完成',emoji:'影',cls:'video',hasVideo:true,text:`影片腳本：
0-2s｜早晨洗臉情境引入
3-7s｜擠出洗面乳並搓出泡沫
8-15s｜按摩與潔淨示範
16-20s｜沖洗後清爽膚感特寫

影片素材：25 秒短影音 Demo`}
];
const mediaLibraryAssets=[
 {type:'情境圖片',title:'居家香氛情境圖',date:'2024/06/17',size:'1920 × 1280',format:'JPG',emoji:'🖼',cls:'scene'},
 {type:'活動banner',title:'夏季促銷活動 Banner',date:'2024/06/15',size:'1920 × 640',format:'PNG',emoji:'📣',cls:'ad'},
 {type:'DM圖',title:'保養品組合 DM 圖',date:'2024/06/13',size:'1080 × 1350',format:'JPG',emoji:'🧴',cls:'social'},
 {type:'宣傳圖',title:'LINE 好友限定宣傳圖',date:'2024/06/12',size:'1200 × 628',format:'PNG',emoji:'⚡',cls:'ad'}
];
let assetModuleState={contentLibrary:{type:'全部',q:''},mediaLibrary:{type:'全部',q:''}};
function renderAssetModule(page='contentLibrary'){
 activeNav(page);$('#dataPage').classList.add('hidden');$('#opsPage').classList.remove('hidden');
 if(page==='contentLibrary') return renderContentLibrary();
 return renderMediaLibrary();
}
function renderAssetHome(){
 $('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 資產庫模組</div><h1>資產庫</h1><p class="subtitle">整合內容資產庫與素材庫，集中保存 AI 產出的文案、腳本與圖片素材。</p></div></div><div class="asset-home-grid"><div class="asset-entry" onclick="renderAssetModule('contentLibrary')"><div class="asset-entry-head"><div class="asset-entry-icon">文</div><div><h2>內容資產庫</h2><p class="muted">商品文案、廣告文案、社群貼文與影音腳本</p></div></div><div class="asset-count">${contentLibraryAssets.length}</div><p class="muted">筆內容</p><div class="asset-list-mini"><div>商品文案 <b>${contentLibraryAssets.filter(x=>x.type==='商品文案').length}</b></div><div>廣告文案 <b>${contentLibraryAssets.filter(x=>x.type==='廣告文案').length}</b></div><div>社群貼文 <b>${contentLibraryAssets.filter(x=>x.type==='社群貼文').length}</b></div><div>社群影音 <b>${contentLibraryAssets.filter(x=>x.type==='社群影音').length}</b></div></div><button class="btn primary">進入內容資產庫 →</button></div><div class="asset-entry" onclick="renderAssetModule('mediaLibrary')"><div class="asset-entry-head"><div class="asset-entry-icon">圖</div><div><h2>素材庫</h2><p class="muted">情境圖片、活動 banner、DM 圖與宣傳圖</p></div></div><div class="asset-count">${mediaLibraryAssets.length}</div><p class="muted">個素材</p><div class="asset-list-mini"><div>情境圖片 <b>${mediaLibraryAssets.filter(x=>x.type==='情境圖片').length}</b></div><div>活動banner <b>${mediaLibraryAssets.filter(x=>x.type==='活動banner').length}</b></div><div>DM圖 <b>${mediaLibraryAssets.filter(x=>x.type==='DM圖').length}</b></div><div>宣傳圖 <b>${mediaLibraryAssets.filter(x=>x.type==='宣傳圖').length}</b></div></div><button class="btn primary">進入素材庫 →</button></div></div>`;
 toast('已切換到 資產庫');
}
function renderContentLibrary(){
 $('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 資產庫模組 / 內容資產庫</div><h1>內容資產庫</h1><p class="subtitle">保存商品圖文、廣告圖文、社群貼文與社群影音腳本資產。</p></div></div><div class="asset-toolbar"><input class="search" id="contentLibrarySearch" placeholder="搜尋內容名稱、平台或關鍵字..." oninput="drawContentLibrary()"><button class="btn" onclick="renderCreative('product')">＋ 建立新內容</button></div><div class="asset-tabs" id="contentLibraryTabs">${['全部','商品文案','廣告文案','社群貼文','社群影音'].map((t,i)=>`<button class="asset-tab ${i===0?'active':''}" onclick="setAssetTab('contentLibrary','${t}',this)">${t}</button>`).join('')}</div><div id="contentLibraryList"></div>`;
 drawContentLibrary();toast('已切換到 內容資產庫');
}
function renderMediaLibrary(){
 $('#opsPage').innerHTML=`<div class="topbar"><div><div class="breadcrumb">工作區 / 資產庫模組 / 素材庫</div><h1>素材庫</h1><p class="subtitle">保存 圖片創作中心產出的圖片，以及可被文案生成引用的圖片素材。</p></div></div><div class="asset-toolbar"><input class="search" id="mediaLibrarySearch" placeholder="搜尋素材名稱、類型..." oninput="drawMediaLibrary()"><button class="btn" onclick="renderCreative('asset')">＋ 生成 AI 圖片</button></div><div class="asset-tabs" id="mediaLibraryTabs">${['全部','情境圖片','活動banner','DM圖','宣傳圖'].map((t,i)=>`<button class="asset-tab ${i===0?'active':''}" onclick="setAssetTab('mediaLibrary','${t}',this)">${t}</button>`).join('')}</div><div id="mediaLibraryList"></div>`;
 drawMediaLibrary();toast('已切換到 素材庫');
}
function setAssetTab(page,type,btn){assetModuleState[page].type=type;btn.parentElement.querySelectorAll('.asset-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active'); page==='contentLibrary'?drawContentLibrary():drawMediaLibrary()}
function drawContentLibrary(){const q=($('#contentLibrarySearch')?.value||'').toLowerCase();assetModuleState.contentLibrary.q=q;let list=contentLibraryAssets.filter(x=>(assetModuleState.contentLibrary.type==='全部'||x.type===assetModuleState.contentLibrary.type)&&JSON.stringify(x).toLowerCase().includes(q));$('#contentLibraryList').innerHTML=`<div class="asset-content-grid">${list.map((x,i)=>`<div class="asset-content-card" onclick="openAssetDetail('content',${contentLibraryAssets.indexOf(x)})"><div class="asset-thumb-visual ${x.cls||''}">${x.hasVideo?'🎬<br>影片腳本＋影片':'🖼<br>'+x.type+'＋圖片'}<br><span class="muted">${x.platform}</span></div><div class="asset-content-body"><span class="tag">${x.type}</span><h3>${x.title}</h3><p>${x.date}｜${x.status}</p></div></div>`).join('')||'<div class="card"><p class="muted">沒有符合條件的內容資產</p></div>'}</div>`}
function drawMediaLibrary(){const q=($('#mediaLibrarySearch')?.value||'').toLowerCase();assetModuleState.mediaLibrary.q=q;let list=mediaLibraryAssets.filter(x=>(assetModuleState.mediaLibrary.type==='全部'||x.type===assetModuleState.mediaLibrary.type)&&JSON.stringify(x).toLowerCase().includes(q));$('#mediaLibraryList').innerHTML=`<div class="asset-grid">${list.map((x,i)=>`<div class="asset-lib-card" onclick="openAssetDetail('media',${mediaLibraryAssets.indexOf(x)})"><div class="asset-lib-thumb ${x.cls||''}">${x.emoji||'🖼'}<br>${x.type}<br><span class="muted">${x.size||'AI 生成'}</span></div><div class="asset-lib-body"><h3>${x.title}</h3><p class="muted">${x.format||'PNG'}｜${x.date}</p><span class="pill blue">可引用</span></div></div>`).join('')||'<div class="card"><p class="muted">沒有符合條件的素材</p></div>'}</div>`}
function openAssetDetail(kind,i){const x=kind==='media'?mediaLibraryAssets[i]:contentLibraryAssets[i];$('#segmentModalContent').innerHTML=kind==='media'?`<span class="label">${x.type}</span><h2>${x.title}</h2><div class="asset-preview ${x.cls||''}" style="height:300px;margin:16px 0">${x.emoji||'🖼'}<br>${x.title}<br><span class="muted">${x.format||'PNG'}｜${x.size||'AI 生成'}</span></div><div class="impact-box"><b>素材資訊</b><p>用途：可套用至商品文案、廣告文案、社群貼文與 圖片創作生成。</p></div><div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn" onclick="closeSegmentModal()">關閉</button></div>`:`<span class="label">${x.type}</span><h2>${x.title}</h2><p class="lead">${x.platform}｜${x.date}</p><div class="asset-detail-grid"><div class="asset-detail-preview ${x.cls||''}">${x.hasVideo?'影片預覽 / 分鏡素材':'圖片素材預覽'}<br><span class="muted">${x.type==='商品文案'?'商品主圖 / 情境圖':x.type==='廣告文案'?'廣告主視覺':x.type==='社群貼文'?'社群封面圖':'短影音 Demo'}</span></div><div><h3>${x.hasVideo?'影音腳本與內容':'文案內容'}</h3><div class="copybox" id="copyText">${x.text}</div></div></div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:18px"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="closeSegmentModal()">關閉</button></div>`;$('#segmentModal').classList.add('show')}
const assetLibrary=[
 {name:'極簡白底老爹鞋｜商品主圖',type:'商品白底圖',cls:'',size:'1:1',emoji:'👟'},
 {name:'夏日街拍情境圖',type:'商品情境圖',cls:'scene',size:'4:5',emoji:'🖼'},
 {name:'春季促銷廣告主視覺',type:'廣告主視覺',cls:'ad',size:'1:1',emoji:'📣'},
 {name:'IG 社群封面圖',type:'社群封面圖',cls:'social',size:'4:5',emoji:'🌿'},
 {name:'品牌形象生活照',type:'生活情境圖',cls:'scene',size:'16:9',emoji:'🏙'},
 {name:'限動優惠版位圖',type:'尺寸延展圖',cls:'ad',size:'9:16',emoji:'⚡'}
];
function openAssetLibrary(){
 const grid=$('#assetLibraryGrid');
 if(grid){grid.innerHTML=assetLibrary.map((a,i)=>`<div class="asset-card" onclick="selectAsset(${i})"><div class="asset-preview ${a.cls}">${a.emoji}<br>${a.type}<br><span class="muted">${a.size}</span></div><div class="asset-meta"><b>${a.name}</b><span>${a.type}・${a.size}</span></div></div>`).join('')}
 $('#assetLibraryModal').classList.add('show')
}
function closeAssetLibrary(){ $('#assetLibraryModal').classList.remove('show') }
function selectAsset(i){
 const a=assetLibrary[i];
 const box=$('#selectedAssets');
 if(box){
   const empty=box.querySelector('span');
   if(empty && empty.textContent.includes('尚未')) empty.remove();
   box.insertAdjacentHTML('beforeend',`<span class="asset-thumb-chip">${a.emoji} ${a.name}</span>`)
 }
 closeAssetLibrary();
 toast('已引用素材：'+a.name)
}


let globalReportTypes=['overall'];
const globalReportData={
 overall:{code:'CH.01',title:'品牌健康度與定位診斷',en:'Brand Health & Positioning Diagnosis',body:`品牌以「都會輕奢 × 機能日常」為核心，於 25-34 歲都會白領族群中具備鮮明辨識度。AI 綜合分析顯示，消費者對品牌的關鍵聯想集中於「質感」、「實穿」與「值得信賴」。`,points:['女鞋與鞋包類商品營收占比 18%，但回購率領先 12%','內容行銷互動率高於市場均值的 2.3 倍','跨平台庫存週轉天數低於產業 23%']},
 product:{code:'CH.02',title:'商品組合與結構分析',en:'Product Mix & Structure Analysis',body:`目前商品組合以「極簡風老爹鞋系列」作為主力，帶動整體銷售與流量。AI 建議將高轉換商品拆分為入門款、主推款與高毛利搭配款，提升組合銷售效率。`,points:['極簡風老爹鞋系列營收占比 32%，具備擴量潛力','日常配件與包款可作為加購品提高客單價','高單價限定聯名商品適合維持品牌聲量']},
 ad:{code:'CH.03',title:'廣告投放效益與預算建議',en:'Advertising Efficiency & Budget Allocation',body:`廣告成效呈現兩極化。品牌字搜尋與 Meta 春季促銷具備加碼條件，但低 ROAS 關鍵字與短影音素材需優先停損或重製。`,points:['品牌字搜尋 ROAS 6.8x，建議增加 20% 預算','皮鞋推薦關鍵字 CPA 偏高，應暫停或重寫文案','TikTok 前 3 秒留存不足，需更換開場鉤子']},
 social:{code:'CH.04',title:'社群文案與影音內容洞察',en:'Social Content & Creative Insight',body:`短影音互動率優於圖文內容，尤其 TikTok 與 Shorts 可作為新品測試場。社群文案應強化情境、痛點與明確 CTA。`,points:['TikTok 短影音互動率 9.2%，全站表現第一','IG 夏季新品貼文收藏表現佳，可延伸成廣告素材','FB 優惠通知互動偏低，建議重寫標題與主視覺']}
};
function toggleReportType(type,btn){
 if(type==='overall'){
   globalReportTypes=['overall'];
   document.querySelectorAll('.report-type').forEach(b=>b.classList.remove('active'));
   btn.classList.add('active');
 }else{
   const allBtn=document.querySelector('[data-report-type="overall"]');
   allBtn?.classList.remove('active');
   globalReportTypes=globalReportTypes.filter(x=>x!=='overall');
   if(globalReportTypes.includes(type)){globalReportTypes=globalReportTypes.filter(x=>x!==type);btn.classList.remove('active')}else{globalReportTypes.push(type);btn.classList.add('active')}
   if(!globalReportTypes.length){globalReportTypes=['overall'];allBtn?.classList.add('active')}
 }
 renderReportBody();
}
function selectedReportItems(){
 const keys=globalReportTypes.includes('overall')?['overall','product','ad','social']:globalReportTypes;
 return keys.map(k=>globalReportData[k]);
}
function renderReportBody(){
 const items=selectedReportItems();
 const body=$('#globalReportBody');
 if(!body)return;
 body.innerHTML=`<article class="report-page"><div class="report-title-row"><div><div class="report-kicker">• E2B · STRATEGIC REPORT</div><h2>${globalReportTypes.includes('overall')?'品牌全域成長與決策報告':'AI 決策報告｜'+items.map(x=>x.title.replace('分析','')).join('、')}</h2><p class="muted">Generated by E2B Engine · 2026 Q2 · Confidential</p></div><div class="report-no">Report No.<br><b>NB-2026-Q2-0421</b></div></div>
 ${items.map((it,idx)=>`<section class="report-section"><div class="report-section-head"><div><span class="report-code">${it.code}</span><b>${it.title}</b></div><span class="report-en">${it.en}</span></div>${idx===0&&globalReportTypes.includes('overall')?`<div class="report-two-col"><div class="ring"><div class="ring-inner"><span>綜合健康度</span><b>88</b><span>優於 92% 同業</span></div></div><div class="report-copy"><h3>AI 診斷摘要</h3><p>${it.body}</p><ul>${it.points.map(p=>`<li>${p}</li>`).join('')}</ul></div></div>`:`<div class="report-copy"><p>${it.body}</p><ul>${it.points.map(p=>`<li>${p}</li>`).join('')}</ul></div>`}</section>`).join('')}
 <section class="report-section"><div class="report-section-head"><div><span class="report-code">CH.99</span><b>AI 下一步決策建議</b></div><span class="report-en">Recommended Actions</span></div><div class="report-grid"><div class="report-mini"><h3>優先處理</h3><p>${globalReportTypes.includes('ad')||globalReportTypes.includes('overall')?'暫停低 ROAS 廣告組，將預算轉移至品牌字搜尋與高轉換素材。':'針對已選報告類型建立 7 日內改善任務。'}</p></div><div class="report-mini"><h3>成長機會</h3><p>${globalReportTypes.includes('social')||globalReportTypes.includes('overall')?'將高互動短影音腳本轉為廣告素材，建立內容到投放的循環。':'將高分內容儲存至資產庫並建立複用模板。'}</p></div></div></section></article>`;
}
function renderGlobalInsight(){
 activeNav('global');$('#dataPage').classList.add('hidden');$('#opsPage').classList.remove('hidden');
 $('#opsPage').innerHTML=`<div class="topbar"><div><span class="tag">✦ AI Strategic Report</span><h1>全域洞察與決策中心</h1><p class="subtitle">整合品牌、商品、市場與廣告數據，由 AI 引擎驅動的企業全域成長報告</p></div><div class="report-actions"><button class="btn" onclick="toast('已重新生成 AI 診斷')">⚡ 重新生成 AI 診斷</button><button class="btn primary" onclick="toast('PDF 報告已匯出')">⇩ 匯出 PDF 報告</button></div></div><section class="global-filter-card"><div class="global-filter-head"><div><h3 style="margin:0 0 6px">報告類型</h3><p class="muted" style="margin:0">可多選報告內容；選擇「整體評估」會產出完整全域報告。</p></div></div><div class="global-filter-options"><button class="chip-btn report-type active" data-report-type="overall" onclick="toggleReportType('overall',this)">整體評估</button><button class="chip-btn report-type" data-report-type="product" onclick="toggleReportType('product',this)">商品</button><button class="chip-btn report-type" data-report-type="ad" onclick="toggleReportType('ad',this)">廣告</button><button class="chip-btn report-type" data-report-type="social" onclick="toggleReportType('social',this)">社群文案</button></div></section><div id="globalReportBody"></div>`;
 globalReportTypes=['overall']; renderReportBody(); toast('已切換到 全域洞察與決策中心');
}



function setupAccountMenu(){
 const profile=document.getElementById('accountProfile');
 const menu=document.getElementById('accountMenu');
 if(!profile||!menu)return;
 profile.onclick=(e)=>{e.stopPropagation();menu.classList.toggle('show')};
 document.addEventListener('click',()=>menu.classList.remove('show'));
}
function logoutDemo(e){
 if(e)e.stopPropagation();
 document.getElementById('accountMenu')?.classList.remove('show');
 document.getElementById('appView')?.classList.add('hidden');
 document.getElementById('loginView')?.classList.remove('hidden');
 toast('已登出');
}
setupAccountMenu();
window.addEventListener('click',e=>{if(e.target.id==='segmentModal')closeSegmentModal();if(e.target.id==='usageModal')closeUsage();if(e.target.id==='productModal')closeProductModal();if(e.target.id==='assetLibraryModal')closeAssetLibrary()});

function setThemeMode(mode){
  const next = mode === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = next;
  localStorage.setItem('e2b-theme-mode', next);
  document.getElementById('lightThemeBtn')?.classList.toggle('active', next === 'light');
  document.getElementById('darkThemeBtn')?.classList.toggle('active', next === 'dark');
  if(typeof toast === 'function') toast(next === 'dark' ? '已切換為深色風格' : '已切換為淺色風格');
}
function initThemeMode(){
  const saved = localStorage.getItem('e2b-theme-mode') || 'light';
  document.body.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  document.getElementById('lightThemeBtn')?.classList.toggle('active', document.body.dataset.theme === 'light');
  document.getElementById('darkThemeBtn')?.classList.toggle('active', document.body.dataset.theme === 'dark');
}
initThemeMode();


/* E2B inline local file upload */
const DATA_UPLOAD_TYPES=['商品知識','品牌知識','營運資料','廣告資料','社群內容','其他文件'];
let dataUploadFiles=[];
function fileSizeLabel(bytes){
  if(!bytes && bytes!==0) return '';
  if(bytes < 1024) return bytes + ' B';
  if(bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/1024/1024).toFixed(1) + ' MB';
}
function dataTypeOptions(current){
  return '<option value="">請選擇資料類型</option>' + DATA_UPLOAD_TYPES.map(t=>`<option value="${t}" ${t===current?'selected':''}>${t}</option>`).join('');
}
function renderDataUploadPreview(){
  const preview=document.getElementById('dataUploadPreview');
  if(!preview) return;
  if(!dataUploadFiles.length){
    preview.innerHTML='<div class="file-source-empty">尚未選擇任何檔案</div>';
    return;
  }
  preview.innerHTML=dataUploadFiles.map((item,idx)=>`<div class="file-source-row ${item.type?'':'missing-type'}">
    <div class="file-source-name"><b>📄 ${item.file.name}</b><span>${fileSizeLabel(item.file.size)}・${item.type ? item.type : '尚未選擇資料類型'}</span></div>
    <select onchange="changeDataUploadFileType(${idx}, this.value)">${dataTypeOptions(item.type)}</select>
    <button class="remove-file-btn" type="button" title="移除此檔案" onclick="removeDataUploadFile(${idx})">×</button>
  </div>`).join('');
}
function addDataUploadFiles(files){
  const incoming=Array.from(files||[]);
  if(!incoming.length) return;
  incoming.forEach(file=>{
    const key=`${file.name}|${file.size}|${file.lastModified}`;
    const exists=dataUploadFiles.some(item=>`${item.file.name}|${item.file.size}|${item.file.lastModified}`===key);
    if(!exists) dataUploadFiles.push({file,type:''});
  });
  renderDataUploadPreview();
  if(typeof toast==='function') toast(`已加入 ${incoming.length} 個檔案，請逐筆選擇資料類型`);
}
function handleDataFileUpload(event){
  addDataUploadFiles(event.target.files);
  if(event.target) event.target.value='';
}
function handleDataDrop(event){
  event.preventDefault();
  const zone=document.getElementById('dataDropZone');
  zone?.classList.remove('dragging');
  addDataUploadFiles(event.dataTransfer?.files || []);
}
function changeDataUploadFileType(index, type){
  if(dataUploadFiles[index]) dataUploadFiles[index].type=type;
  renderDataUploadPreview();
}
function removeDataUploadFile(index){
  dataUploadFiles.splice(index,1);
  renderDataUploadPreview();
  if(typeof toast==='function') toast('已移除檔案');
}
function finishDataUpload(){
  if(!dataUploadFiles.length){
    alert('請先選擇要上傳的檔案。');
    return;
  }
  const missing=dataUploadFiles.filter(item=>!item.type);
  if(missing.length){
    alert(`有 ${missing.length} 個檔案尚未選擇資料類型，請先選擇後再進行解析。`);
    return;
  }
  const grouped=dataUploadFiles.reduce((acc,item)=>{acc[item.type]=(acc[item.type]||0)+1;return acc;},{});
  const summary=Object.entries(grouped).map(([type,count])=>`${type} ${count} 筆`).join('、');
  if(typeof toast==='function') toast(`已開始解析 ${dataUploadFiles.length} 個檔案：${summary}`);
}



/* E2B hotfix: local file upload right-side drawer */
function openUploadDrawer(){
  const drawer = document.getElementById('uploadDrawer');
  if(!drawer){
    if(typeof toast === 'function') toast('找不到上傳面板');
    return;
  }
  drawer.classList.add('show');
}
function closeUploadDrawer(){
  document.getElementById('uploadDrawer')?.classList.remove('show');
}
function handleLocalUpload(event){
  const files = Array.from(event.target.files || []);
  const preview = document.getElementById('localUploadPreview');
  if(!preview) return;
  if(!files.length){
    preview.innerHTML = '<span>支援 Excel、CSV、PDF、Word，可一次選擇多個檔案。</span>';
    return;
  }
  preview.innerHTML = files.map(file => `<span class="asset-thumb-chip">📄 ${file.name}</span>`).join('');
  if(typeof toast === 'function') toast(`已選擇 ${files.length} 個檔案`);
}


/* E2B hotfix: product modal channel tabs must switch content only, never trigger browser navigation/download. */
document.addEventListener('click', function(e){
  const btn = e.target && e.target.closest ? e.target.closest('#productChannelTabs button') : null;
  if(!btn) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  const channel = btn.dataset.channel || btn.textContent.trim();
  switchProductChannel(null, channel, btn);
}, true);


/* ===============================
   E2B Ad Content Center v3
   Dynamic ad type workflow + content workspace
================================= */
const E2B_ORIGINAL_RENDER_CREATIVE_FORM = renderCreativeForm;
const E2B_ORIGINAL_GENERATE_CREATIVE = generateCreative;
const E2B_ORIGINAL_RESET_CREATIVE_RESULT = resetCreativeResult;

let adWorkflowState = {
  platform: 'Google Ads',
  objective: '提高商品銷售',
  type: 'product',
  selectedProductId: null,
  selectedExistingAdIndex: 0,
  activeWorkspacePlatform: null,
  activeOptimizeView: 'optimized'
};
const adObjectiveOptions = {
  '讓更多人認識品牌': {
    googleGoal: '品牌認知 / YouTube 觸及與觀看',
    metaGoal: '品牌認知',
    google: '偏關鍵字、品牌名、核心利益，適合搜尋 / YouTube / 多媒體曝光',
    meta: '偏故事感、生活情境、第一眼記憶點，適合動態牆 / Reels / 限動'
  },
  '讓更多人點進網站': {
    googleGoal: '網站流量',
    metaGoal: '流量',
    google: '強調搜尋意圖、點擊理由、網站內容價值',
    meta: '強調開頭鉤子、好奇心、滑動停止感'
  },
  '讓更多人互動': {
    googleGoal: 'YouTube / Demand Gen 觀看與參與',
    metaGoal: '互動',
    google: 'Google 較少作為主要搜尋廣告目標，若是 YouTube / Demand Gen 會偏觀看、參與',
    meta: 'Meta 很適合互動，會生成問句、留言引導、投票感文案'
  },
  '收集潛在顧客': {
    googleGoal: '待開發客戶',
    metaGoal: '開發潛在顧客',
    google: '偏「諮詢、報價、預約、留下資料」，文案更直接',
    meta: '偏「免費領取、私訊、填表、活動名額」，信任感與誘因更重要'
  },
  '推廣 App 安裝 / 使用': {
    googleGoal: '應用程式宣傳',
    metaGoal: '應用程式推廣',
    google: '偏功能、安裝、評價、下載理由，會更像 App campaign 素材',
    meta: '偏使用情境、短影音展示、立即下載 / 開始體驗'
  },
  '提高商品銷售': {
    googleGoal: '銷售',
    metaGoal: '銷售',
    google: '偏商品關鍵字、價格 / 優惠、購買意圖、搜尋轉換',
    meta: '偏促購情境、優惠倒數、社群感推薦、行動呼籲'
  }
};

function adProductsFromOps(){
  return (typeof products !== 'undefined' ? products : []).filter(p => p.status !== '下架');
}
function adCurrentPlatforms(){
  return [adWorkflowState.platform || 'Google Ads'];
}
function selectedAdOutputs(){
  return ['標題包','文案包','視覺素材方向'];
}
function setAdPlatform(platform, btn){
  adWorkflowState.platform = platform;
  adWorkflowState.objective = adWorkflowState.objective || '提高商品銷售';
  adWorkflowState.activeWorkspacePlatform = platform;
  document.querySelectorAll('.ad-platform-card').forEach(x => x.classList.remove('active'));
  btn?.classList.add('active');
  renderAdGoalOptions();
  resetAdWorkspace();
}
function setAdObjective(objective, btn){
  adWorkflowState.objective = objective;
  document.querySelectorAll('.ad-goal-card').forEach(x => x.classList.remove('active'));
  btn?.classList.add('active');
  resetAdWorkspace();
}
function renderAdGoalOptions(){
  const box = document.getElementById('adGoalOptions');
  if(!box) return;
  const platform = adWorkflowState.platform || 'Google Ads';
  const key = platform.includes('Meta') ? 'meta' : 'google';
  const goalKey = platform.includes('Meta') ? 'metaGoal' : 'googleGoal';
  box.innerHTML = Object.entries(adObjectiveOptions).map(([label,tendency],i) => `<button type="button" class="ad-goal-card ${adWorkflowState.objective===label || (!adWorkflowState.objective && i===0)?'active':''}" onclick="setAdObjective('${safeJs(label)}',this)"><b>${label}</b><span>建議後台目標：${tendency[goalKey]}</span><small>${tendency[key]}</small></button>`).join('');
}
function setAdType(type, btn){
  adWorkflowState.type = type;
  document.querySelectorAll('.ad-type-card').forEach(x => x.classList.remove('active'));
  btn?.classList.add('active');
  renderAdSourceFields();
  resetAdWorkspace();
}
function renderAdSourceFields(){
  const wrap = document.getElementById('adSourceFields');
  if(!wrap) return;
  const t = adWorkflowState.type;
  if(t === 'product'){
    const list = adProductsFromOps();
    if(!adWorkflowState.selectedProductId && list[0]) adWorkflowState.selectedProductId = list[0].id;
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-1</div><h3>選擇要推廣的商品</h3><p class="muted">僅能選擇營運分析中已撈取回來、目前上架中的商品版本。商品來源平台與廣告投放平台是兩件事。</p><input class="search" id="adProductSearch" placeholder="搜尋商品名稱、SKU 或來源平台" oninput="drawAdProductChoices()" style="width:100%;min-width:0;margin:10px 0 12px"><div id="adProductChoices" class="ad-product-choice-list"></div></div>`;
    drawAdProductChoices();
    return;
  }
  if(t === 'event'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-1</div><h3>活動促銷資料</h3><label>活動名稱</label><input id="adEventName" placeholder="例如：618 年中慶，全館 85 折"><label>活動期間</label><input id="adEventPeriod" placeholder="例如：2026/06/01 - 2026/06/18"><label>優惠內容</label><textarea id="adEventOffer" placeholder="例如：全館 85 折、滿 3000 送 500、限時免運"></textarea><label>活動說明</label><textarea id="adEventDesc" placeholder="補充活動規則、主推族群、想強調的活動亮點..."></textarea></div>`;
    return;
  }
  wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-1</div><h3>品牌宣傳資料</h3><label>品牌名稱</label><input id="adBrandName" placeholder="例如：Urban Walk"><label>品牌理念</label><textarea id="adBrandBelief" placeholder="例如：讓日常通勤也能兼具舒適與質感"></textarea><label>品牌特色</label><textarea id="adBrandFeature" placeholder="例如：極簡設計、機能鞋底、都會生活風格"></textarea><label>想傳達的訊息</label><textarea id="adBrandMessage" placeholder="例如：建立都會輕量鞋履品牌形象，強調陪伴每天移動的生活態度"></textarea></div>`;
}
function drawAdProductChoices(){
  const box = document.getElementById('adProductChoices');
  if(!box) return;
  const q = (document.getElementById('adProductSearch')?.value || '').toLowerCase();
  const list = adProductsFromOps().filter(p => !q || (p.name + p.id + p.platform + p.cat).toLowerCase().includes(q));
  box.innerHTML = list.map(p => `<button type="button" class="ad-product-choice ${adWorkflowState.selectedProductId===p.id?'active':''}" onclick="selectAdProduct('${p.id}')"><div class="ad-product-thumb">${p.image || '🖼'}</div><div class="ad-product-main"><b>${p.name}</b><span>${p.id}・${p.cat}</span><p>${p.desc || '已上架商品內容，可引用標題、商品特色、商品介紹與主圖。'}</p></div><div class="ad-product-side"><span class="tag">${p.platform}</span><span class="pill green">上架中</span></div></button>`).join('') || `<div class="source-card">找不到符合條件的上架商品。</div>`;
}
function selectAdProduct(id){
  adWorkflowState.selectedProductId = id;
  drawAdProductChoices();
  const p = adProductsFromOps().find(x => x.id === id);
  if(p && typeof toast === 'function') toast(`已選擇商品：${p.name}（${p.platform}）`);
}
function drawExistingAdChoice(){
  const i = Number(document.getElementById('existingAdSelect')?.value || 0);
  adWorkflowState.selectedExistingAdIndex = i;
  const a = adsData[i] || adsData[0];
  const box = document.getElementById('existingAdPreview');
  if(!box || !a) return;
  box.innerHTML = `<div class="existing-ad-preview"><div><span class="tag">${a.platform}</span> <span class="pill ${a.status==='投放中'?'green':a.status==='排程中'?'amber':a.status==='已結束'?'blue':'red'}">${a.status}</span><h3>${a.name}</h3><p class="muted">商品 / 活動：${a.product}</p></div><div class="ad-current-copy"><b>目前廣告內容</b><p><b>標題：</b>${a.name==='春季促銷_V1'?'全館老爹鞋 7 折｜限時 3 天':a.name}</p><p><b>主文案：</b>${a.platform==='TikTok Ads'?'夏季穿搭挑戰開跑！5 秒看懂涼感 T 恤與丹寧寬褲怎麼搭，今晚限定優惠。':'軟Q厚底，透氣細布，韓系百搭一雙搞定。立即把握早鳥優惠，限時優惠倒數中！'}</p><p><b>CTA：</b>${a.tag==='bad'?'了解更多':'立即選購'}</p></div></div>`;
}
function resetAdWorkspace(){
  const result = document.getElementById('creativeResult');
  if(!result) return;
  result.innerHTML = `<div class="result-empty"><div class="logo">✦</div><h3>內容工作區</h3><p>完成左側設定後，AI 會依 ${adWorkflowState.platform || 'Google Ads'} 與「${adWorkflowState.objective || '提高商品銷售'}」產生標題包、文案包、視覺素材方向與平台目標建議。</p></div>`;
}

renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  const mode = window.creativeMode || 'new';
  if(type !== 'ad') return E2B_ORIGINAL_RENDER_CREATIVE_FORM();
  const form = document.getElementById('creativeForm');
  if(!form) return;
  if(mode === 'new'){
    form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇投放平台</h3><p class="muted">先選平台，後端會依 Google / Meta 使用不同 Prompt 生成符合後台邏輯的素材。</p><div class="ad-platform-grid"><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Google Ads'?'active':''}" onclick="setAdPlatform('Google Ads',this)"><b>Google Ads</b><span>適合搜尋、YouTube、Demand Gen、Performance Max 等付費投放素材。</span></button><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Meta Ads'?'active':''}" onclick="setAdPlatform('Meta Ads',this)"><b>Meta Ads</b><span>適合 Facebook / Instagram 動態、限動、Reels 等付費投放素材。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇這次廣告想達成的目的</h3><p class="muted">用使用者目的來選擇，E2B 會自動對應 Google / Meta 後台目標，並調整生成方向。</p><div class="ad-goal-grid" id="adGoalOptions"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>選擇素材來源</h3><p class="muted">決定這次 AI 要引用商品、活動或品牌資料。</p><div class="ad-type-grid"><button type="button" class="ad-type-card ${adWorkflowState.type==='product'?'active':''}" onclick="setAdType('product',this)"><b>🛍 商品推廣</b><span>引用已上架商品建立投放素材</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='event'?'active':''}" onclick="setAdType('event',this)"><b>🎉 活動促銷</b><span>建立檔期、優惠與促銷素材</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='brand'?'active':''}" onclick="setAdType('brand',this)"><b>🏷 品牌宣傳</b><span>建立品牌形象與記憶點素材</span></button></div></div><div id="adSourceFields"></div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>補充生成資訊</h3><label>目標受眾</label><input id="adAudience" placeholder="例如：女性 25-34 歲、通勤族、重視舒適穿搭"><label>主要賣點</label><textarea id="adSellingPoints" placeholder="例如：透氣、厚底、百搭、限時優惠、快速出貨"></textarea><label>優惠 / 活動資訊</label><input id="adOffer" placeholder="例如：限時 7 折、滿千免運、預約領優惠"><label>文案風格</label><div class="copy-style-grid compact"><button type="button" class="copy-style-card active" onclick="selectCopyStyle(this)"><b>AI推薦</b><span>依平台與目的自動調整</span><small>由 AI 判斷該偏搜尋意圖、促購、信任或品牌記憶點。</small></button><button type="button" class="copy-style-card" onclick="selectCopyStyle(this)"><b>更促購</b><span>加強優惠與 CTA</span><small>適合銷售、名單與活動檔期。</small></button><button type="button" class="copy-style-card" onclick="selectCopyStyle(this)"><b>更有品牌感</b><span>強化品牌印象</span><small>適合品牌認知、流量與形象素材。</small></button></div><label>其他限制（選填）</label><textarea id="adExtraNote" placeholder="例如：不要過度誇張、不要 emoji、避免提到價格、圖片要保留文字空間。"></textarea><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 開始生成廣告素材</button></div></div>`;
    renderAdGoalOptions();
    renderAdSourceFields();
    return;
  }
  form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇現有廣告</h3><p class="muted">資料來源為營運分析 > 廣告效益分析。AI 會依原平台重新整理成標題包、文案包與視覺素材方向。</p><select id="existingAdSelect" onchange="drawExistingAdChoice()">${adsData.map((a,i)=>`<option value="${i}">${a.platform}｜${a.name}｜${a.status}</option>`).join('')}</select><div id="existingAdPreview"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>優化重點</h3><div class="content-picks ad-output-picks"><button class="pick active" onclick="togglePick(this)">標題更適合後台欄位</button><button class="pick active" onclick="togglePick(this)">文案更有轉換力</button><button class="pick active" onclick="togglePick(this)">補強視覺素材方向</button><button class="pick" onclick="togglePick(this)">加入短影音鉤子</button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>文案風格</h3><div class="copy-style-grid compact"><button type="button" class="copy-style-card active" onclick="selectCopyStyle(this)"><b>AI推薦</b><span>依原平台與原文案改善</span><small>保留商品重點，強化轉換誘因。</small></button><button type="button" class="copy-style-card" onclick="selectCopyStyle(this)"><b>更促購</b><span>加強優惠與 CTA</span><small>限時折扣，現在下單最划算。</small></button><button type="button" class="copy-style-card" onclick="selectCopyStyle(this)"><b>更精簡</b><span>適合廣告版位快速閱讀</span><small>一句話說清楚賣點。</small></button></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 開始優化廣告素材</button></div></div>`;
  drawExistingAdChoice();
};

resetCreativeResult = function(){
  if((window.creativeType || 'product') === 'ad') return resetAdWorkspace();
  return E2B_ORIGINAL_RESET_CREATIVE_RESULT();
};

function adWorkspaceBlock(platform, mode='new'){
  const adType = adWorkflowState.type;
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const baseName = adType === 'product' ? (selectedProduct?.name || '極簡白底老爹鞋') : adType === 'event' ? (document.getElementById('adEventName')?.value || '618 年中慶') : (document.getElementById('adBrandName')?.value || 'Urban Walk');
  const objective = adWorkflowState.objective || '提高商品銷售';
  const objectiveMeta = adObjectiveOptions[objective] || adObjectiveOptions['提高商品銷售'];
  const isGoogle = platform.includes('Google');
  const titlePack = isGoogle
    ? [`${baseName} 官方推薦`,`限時優惠 ${baseName}`,`${baseName} 立即查看`,`人氣精選快速選購`,`官方活動優惠中`]
    : [`${baseName} 今日限定`,`這款最近討論度很高`,`通勤到週末都適合`,`現在入手剛剛好`,`給想提升日常質感的你`];
  const copyPack = isGoogle
    ? [`以「${objective}」為目標，聚焦搜尋意圖與清楚利益，讓使用者快速理解為什麼值得點擊。`,`強調商品特色、優惠與官方導流，適合放在 Google Ads 說明欄位。`,`用精簡語句補足信任感、購買理由與立即查看誘因。`]
    : [`第一眼用生活情境抓住注意力，再帶出 ${baseName} 的核心利益與行動誘因。`,`適合 Meta 動態、限動或 Reels 廣告：開頭有鉤子，中段說明好處，結尾自然 CTA。`,`短版文案：今天就把 ${baseName} 加進你的日常清單。`];
  const visualText = isGoogle
    ? `靜態圖片方向｜商品清楚置中，保留標題與優惠字卡空間，適合多媒體廣告與 Demand Gen。\n影片方向｜YouTube / Demand Gen 15 秒版本，0-3 秒直接呈現商品與利益點，結尾放「立即查看」。\n版位提醒｜Google 影片廣告多數情境會選用 YouTube 影片素材。`
    : `靜態圖片方向｜人物情境 + 商品近景，第一眼有社群滑動停止感，適合動態牆與限動。\n影片方向｜Reels / Stories 9:16 短影音，0-3 秒用痛點或優惠開場，中段展示情境，結尾加入 CTA。\n版位提醒｜Meta 廣告可使用圖片或影片素材，需同時考慮動態、限動與 Reels。`;
  const recommendation = `使用者目的｜${objective}\nGoogle Ads 建議目標｜${objectiveMeta.googleGoal}\nMeta Ads 建議目標｜${objectiveMeta.metaGoal}\n建議原因｜E2B 會依使用者目的自動翻譯成各平台後台目標；目前 ${platform} 版本會優先採用「${isGoogle?objectiveMeta.googleGoal:objectiveMeta.metaGoal}」的生成邏輯。`;
  return `<div class="ad-workspace-platform" data-platform="${platform}"><div class="workspace-toolbar"><div><h2>${platform} 版本</h2><p class="muted">目的：${objective}。目前僅儲存此平台版本，不會影響其他平台。</p></div><div class="workspace-actions"><button class="btn" onclick="generateCreative()">重新生成</button><button class="btn primary" onclick="saveCurrentAdPlatformVersion('${platform}')">儲存 ${platform} 版本</button></div></div><div class="result-card"><h3>平台目標建議</h3><pre>${recommendation}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div><div class="result-card"><h3>標題包</h3><pre>${titlePack.map((x,i)=>`${i+1}. ${x}`).join('\n')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('標題包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('標題包')">重新生成</button></div></div><div class="result-card"><h3>文案包</h3><pre>${copyPack.map((x,i)=>`${i+1}. ${x}`).join('\n\n')}\n\nCTA 建議｜${isGoogle?'立即查看':'立即選購'}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('文案包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('文案包')">重新生成</button></div></div><div class="result-card"><h3>視覺素材方向</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>${platform}<br><span class="muted">圖片 / 影片素材</span></div><pre>${visualText}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('視覺素材方向', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('視覺素材方向')">重新生成</button></div></div></div>`;
}
function renderAdWorkspace(platforms, mode='new'){
  adWorkflowState.activeWorkspacePlatform = adWorkflowState.activeWorkspacePlatform && platforms.includes(adWorkflowState.activeWorkspacePlatform) ? adWorkflowState.activeWorkspacePlatform : platforms[0];
  const active = adWorkflowState.activeWorkspacePlatform;
  const tabs = platforms.map(p => `<button class="tab ${p===active?'active':''}" onclick="switchAdWorkspaceTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p => `<div class="workspace-panel ${p===active?'active':''}" data-ad-panel="${p}">${adWorkspaceBlock(p, mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="ad-workspace"><div class="section-head" style="margin:0 0 12px"><div><h2>內容工作區</h2><p class="muted">依投放平台與使用者目的產出平台目標建議、標題包、文案包與視覺素材方向。</p></div></div><div class="workspace-tabs ad-workspace-tabs">${tabs}</div>${panels}</div>`;
}
function switchAdWorkspaceTab(platform, btn){
  adWorkflowState.activeWorkspacePlatform = platform;
  document.querySelectorAll('.ad-workspace-tabs .tab').forEach(x => x.classList.remove('active'));
  btn?.classList.add('active');
  document.querySelectorAll('[data-ad-panel]').forEach(p => p.classList.toggle('active', p.dataset.adPanel === platform));
}
function saveCurrentAdPlatformVersion(platform){
  const mode = window.creativeMode || 'new';
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const title = mode === 'opt' ? `廣告優化版本｜${platform}` : adWorkflowState.type === 'product' ? `商品廣告｜${selectedProduct?.name || '商品'}｜${platform}` : adWorkflowState.type === 'event' ? `活動廣告｜${document.getElementById('adEventName')?.value || '活動促銷'}｜${platform}` : `品牌廣告｜${document.getElementById('adBrandName')?.value || '品牌宣傳'}｜${platform}`;
  if(typeof saveCreativeToAssetLibrary === 'function') saveCreativeToAssetLibrary('content', title, '廣告素材', `${platform} 廣告版本，包含平台目標建議、標題包、文案包與視覺素材方向。`);
  if(typeof toast === 'function') toast(`已儲存 ${platform} 版本至內容資產庫`);
}

generateCreative = function(){
  const type = window.creativeType || 'product';
  if(type !== 'ad') return E2B_ORIGINAL_GENERATE_CREATIVE();
  const mode = window.creativeMode || 'new';
  let platforms = [];
  if(mode === 'opt'){
    const a = adsData[Number(document.getElementById('existingAdSelect')?.value || 0)] || adsData[0];
    platforms = [a.platform];
  }else{
    platforms = adCurrentPlatforms();
  }
  renderAdWorkspace(platforms, mode);
  if(typeof toast === 'function') toast(mode === 'opt' ? '已產生廣告素材優化版本' : '已建立廣告素材版本');
};


/* ===============================
   E2B Social Content Planning Center v2
   Build a full social content package: post + media plan.
================================= */
const E2B_GENERATE_BEFORE_SOCIAL = generateCreative;
if (creativeConfigs && creativeConfigs.social) {
  creativeConfigs.social = {
    title:'社群內容中心',
    sub:'產生 IG / FB / TikTok / LINE 自然發布用內容包，包含貼文、圖片/影音腳本、Hashtag、限動與互動文案。',
    createBtn:'建立新社群內容',
    optBtn:'優化現有社群內容',
    newTitle:'建立全新社群內容',
    optTitle:'優化現有社群內容',
    platforms:['IG','FB','Threads','TikTok','Shorts','LINE'],
    outputs:['Caption','Hashtag','留言引導','限動文案','社群圖片','Reel腳本','分鏡腳本','字幕','配音稿'],
    placeholder:'內容工作區',
    button:'開始生成社群內容'
  };
}
const socialWorkflowState={source:'product',selectedProductId:null,selectedAdIndex:0,selectedExistingIndex:0,activePlatform:null};
function socialProductsFromOps(){return (typeof products!=='undefined'?products:[]).filter(p=>!p.status||p.status!=='下架').slice(0,8)}
function socialAdsFromOps(){return (typeof adsData!=='undefined'?adsData:[]).slice(0,8)}
function setSocialSource(type,btn){socialWorkflowState.source=type;document.querySelectorAll('.social-source-choice,.social-radio-option').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.querySelectorAll('input[name="socialSourceRadio"]').forEach(x=>x.checked=x.value===type);renderSocialSourceFields()}
function socialSourceCards(){const src=socialWorkflowState.source||'product';return `<div class="social-radio-group" role="radiogroup" aria-label="AI 參考內容">
  <label class="social-radio-option ${src==='product'?'active':''}" onclick="setSocialSource('product',this)">
    <input type="radio" name="socialSourceRadio" value="product" ${src==='product'?'checked':''}>
    <span class="social-radio-dot"></span>
    <span class="social-radio-copy"><b>🛍 引用商品</b><small>引用營運分析中的已上架商品，產生商品分享貼文與影音腳本。</small></span>
  </label>
  <label class="social-radio-option ${src==='ad'?'active':''}" onclick="setSocialSource('ad',this)">
    <input type="radio" name="socialSourceRadio" value="ad" ${src==='ad'?'checked':''}>
    <span class="social-radio-dot"></span>
    <span class="social-radio-copy"><b>📣 引用廣告</b><small>引用既有廣告活動，延伸成社群貼文、Reels、限動與互動素材。</small></span>
  </label>
  <label class="social-radio-option ${src==='new'?'active':''}" onclick="setSocialSource('new',this)">
    <input type="radio" name="socialSourceRadio" value="new" ${src==='new'?'checked':''}>
    <span class="social-radio-dot"></span>
    <span class="social-radio-copy"><b>✨ 全新建立</b><small>不引用商品或廣告，直接建立品牌、活動、知識或日常社群內容。</small></span>
  </label>
</div>`}
function socialSourceQuery(){return (document.getElementById('socialSourceSearch')?.value||'').trim().toLowerCase()}
function renderSocialSourceList(src){const wrap=document.getElementById('socialSourceList'); const count=document.getElementById('socialSourceCount'); if(!wrap)return; const q=socialSourceQuery(); if(src==='product'){let list=socialProductsFromOps().filter(p=>!q||`${p.name} ${p.platform} ${p.id} ${p.status} ${p.spec}`.toLowerCase().includes(q)); if(!socialWorkflowState.selectedProductId && list[0])socialWorkflowState.selectedProductId=list[0].id; if(count)count.textContent=`${list.length} 筆商品`; wrap.innerHTML=list.length?list.map(p=>`<div class="social-pick-row ${socialWorkflowState.selectedProductId===p.id?'active':''}" onclick="selectSocialProduct('${safeJs(p.id)}')"><div class="social-thumb">${p.platform}</div><div><b>${p.name}</b><p class="muted" style="margin:4px 0 0">${p.id}｜${p.price||''}｜${p.spec||''}</p></div><span class="tag">${p.status||'上架中'}</span></div>`).join(''):`<div class="card" style="box-shadow:none"><p class="muted">找不到符合條件的商品。</p></div>`; return; } let list=socialAdsFromOps().filter(a=>!q||`${a.name} ${a.platform} ${a.product} ${a.status}`.toLowerCase().includes(q)); if(count)count.textContent=`${list.length} 筆廣告`; wrap.innerHTML=list.length?list.map((a,i)=>`<div class="social-pick-row ${Number(socialWorkflowState.selectedAdIndex)===i?'active':''}" onclick="selectSocialAd(${i})"><div class="social-thumb">AD</div><div><b>${a.name}</b><p class="muted" style="margin:4px 0 0">${a.platform}｜${a.product}｜${a.status}</p></div><span class="tag">${a.platform}</span></div>`).join(''):`<div class="card" style="box-shadow:none"><p class="muted">找不到符合條件的廣告。</p></div>`;}
function renderSocialSourceFields(){const box=document.getElementById('socialSourceFields'); if(!box)return; const src=socialWorkflowState.source||'product'; if(src==='product'){box.innerHTML=`<label>選擇已上架商品</label><div class="social-source-toolbar"><input class="search" id="socialSourceSearch" placeholder="搜尋商品名稱、平台、SKU 或狀態..." oninput="renderSocialSourceList('product')"><span class="social-source-count" id="socialSourceCount"></span></div><div class="social-pick-list" id="socialSourceList"></div><div class="social-mini-note">商品來源為「營運分析 > 商品管理中心」已撈回的上架商品，AI 會引用商品名稱、平台文案、商品特色與主圖。</div>`; renderSocialSourceList('product'); }
 else if(src==='ad'){box.innerHTML=`<label>選擇既有廣告</label><div class="social-source-toolbar"><input class="search" id="socialSourceSearch" placeholder="搜尋廣告名稱、平台、商品或投放狀態..." oninput="renderSocialSourceList('ad')"><span class="social-source-count" id="socialSourceCount"></span></div><div class="social-pick-list" id="socialSourceList"></div><div class="social-mini-note">引用廣告時，AI 會將廣告主張、CTA 與素材方向改寫成更適合社群互動與短影音的內容。</div>`; renderSocialSourceList('ad'); }
 else{box.innerHTML=`<label>內容主題</label><input id="socialNewTopic" placeholder="例如：夏天如何挑選不悶腳的鞋 / 品牌日常 / 618活動預告"><label>內容方向</label><textarea id="socialNewBrief" placeholder="請輸入想分享的重點、活動資訊、知識主題或品牌想傳達的內容。"></textarea><label>內容類型</label><div class="goal-picks social-kind-picks">${['商品靈感','活動公告','品牌故事','知識教學','粉絲互動','幕後日常'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div>`; }}
function selectSocialProduct(id){socialWorkflowState.selectedProductId=id;renderSocialSourceFields()}
function selectSocialAd(i){socialWorkflowState.selectedAdIndex=i;renderSocialSourceFields()}
function selectExistingSocialContent(i){socialWorkflowState.selectedExistingIndex=i;renderExistingSocialSummary()}
function renderExistingSocialSummary(){const box=document.getElementById('existingSocialSummary'); if(!box)return; const s=(typeof socialData!=='undefined'?socialData:[])[Number(socialWorkflowState.selectedExistingIndex)||0]||{}; box.innerHTML=`<div class="social-summary-card"><div class="social-summary-row"><b>平台</b><span>${s.platform||'IG'}</span></div><div class="social-summary-row"><b>內容標題</b><span>${s.title||'夏季新品貼文'}</span></div><div class="social-summary-row"><b>目前內容</b><span>${s.copy||'貼文內容會在這裡帶入，可修改後再請 AI調整。'}</span></div></div>`}
function socialPlatformsSelected(){const ps=selectedPicks('.platform-picks');return ps.length?ps:['IG','TikTok']}
function socialOutputSelected(){const outs=selectedPicks('.content-picks');return outs.length?outs:['Caption','Hashtag','Reel腳本','分鏡腳本']}
function selectSocialStyle(el,value){document.querySelectorAll('.social-style-option').forEach(x=>x.classList.remove('active'));el?.classList.add('active');document.querySelectorAll('input[name="socialTone"]').forEach(x=>x.checked=x.value===value);const hidden=document.getElementById('socialTone');if(hidden)hidden.value=value;}
function renderSocialCreativeForm(){const mode=window.creativeMode||'new'; const list=(typeof socialData!=='undefined'?socialData:[]); if(mode==='new'){return `<div class="creative-form social-flow"><h3>建立全新社群內容包</h3><div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇自然發布內容來源</h3><p class="mini-hint">這裡用來產生經營 IG / FB / TikTok / LINE 帳號的自然發布內容；可引用商品、引用廣告延伸，或全新建立。</p>${socialSourceCards()}<div id="socialSourceFields" style="margin-top:14px"></div></div><div class="flow-block"><span class="flow-step">STEP 2</span><label>自然發布平台（可複選）</label><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0||i===3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>內容型態</label><div class="format-picks social-format-picks">${['一般貼文','限動','Reels / Shorts','TikTok短影音','LINE圖文','Carousel'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>發布目的</label><div class="goal-picks">${['提高互動','推廣商品','建立品牌感','活動導流','知識教育','累積粉絲信任'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div><div class="flow-block"><span class="flow-step">STEP 3</span><label>內容風格</label><div class="social-style-options" id="socialStyleOptions">
  <label class="social-style-option active" onclick="selectSocialStyle(this,'生活感')">
    <input type="radio" name="socialTone" value="生活感" checked>
    <span>生活感</span>
    <span class="style-info" tabindex="0">ⓘ<span class="style-tooltip"><b>生活感</b><small>像朋友分享日常生活，適合服飾、日用品、居家與輕鬆品牌內容。</small><em>範例</em><p>今天穿著它去咖啡廳，舒服到走了一整天都沒負擔。白色真的超百搭，牛仔褲、洋裝都很好搭。</p><em>語氣</em><p>自然、親近、日常、輕鬆。</p></span></span>
  </label>
  <label class="social-style-option" onclick="selectSocialStyle(this,'品牌質感')">
    <input type="radio" name="socialTone" value="品牌質感">
    <span>品牌質感</span>
    <span class="style-info" tabindex="0">ⓘ<span class="style-tooltip"><b>品牌質感</b><small>適合想強化品牌形象、質感生活、精品感或設計感的社群內容。</small><em>範例</em><p>極簡設計，源自對細節的堅持。每一步，都展現舒適與品味。</p><em>語氣</em><p>沉穩、簡潔、精緻、有留白。</p></span></span>
  </label>
  <label class="social-style-option" onclick="selectSocialStyle(this,'活潑親切')">
    <input type="radio" name="socialTone" value="活潑親切">
    <span>活潑親切</span>
    <span class="style-info" tabindex="0">ⓘ<span class="style-tooltip"><b>活潑親切</b><small>像社群小編與粉絲聊天，適合互動、留言、活動預告與新品暖身。</small><em>範例</em><p>今天這雙真的可以直接列入週末出門清單！想走可愛路線還是韓系街頭感？留言告訴我們。</p><em>語氣</em><p>輕快、互動、親切、有溫度。</p></span></span>
  </label>
  <label class="social-style-option" onclick="selectSocialStyle(this,'專業知識')">
    <input type="radio" name="socialTone" value="專業知識">
    <span>專業知識</span>
    <span class="style-info" tabindex="0">ⓘ<span class="style-tooltip"><b>專業知識</b><small>適合教學、選購指南、QA、材質說明與知識型社群內容。</small><em>範例</em><p>EVA 中底具有良好的回彈性，長時間步行能降低足部疲勞，適合通勤與日常行走。</p><em>語氣</em><p>清楚、可信、教學感、資訊完整。</p></span></span>
  </label>
  <label class="social-style-option" onclick="selectSocialStyle(this,'促購導向')">
    <input type="radio" name="socialTone" value="促購導向">
    <span>促購導向</span>
    <span class="style-info" tabindex="0">ⓘ<span class="style-tooltip"><b>促購導向</b><small>適合活動檔期、限時優惠、導購貼文與需要明確 CTA 的內容。</small><em>範例</em><p>限時優惠開跑！今天下單立即免運，熱門尺寸補貨到位，售完就要等下一波。</p><em>語氣</em><p>直接、有行動感、強調優惠與稀缺性。</p></span></span>
  </label>
</div><input id="socialTone" type="hidden" value="生活感"></div><div class="flow-block"><span class="flow-step">STEP 4</span><label>建立哪些社群素材（可複選）</label><div class="content-group-title">文字</div><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','第一則留言'].map((p,i)=>`<button class="pick ${i<4?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片 / 版位</div><div class="content-picks">${['社群圖片','Carousel','封面文字'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">影音</div><div class="content-picks">${['Reel腳本','分鏡腳本','字幕','配音稿','AI影片（V2）'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立社群內容包</button></div></div>`}
 return `<div class="creative-form social-flow"><h3>優化現有社群內容</h3><div class="flow-block"><span class="flow-step">STEP 1</span><label>選擇現有社群內容</label><select id="existingSocialSelect" onchange="selectExistingSocialContent(this.value)">${list.map((s,i)=>`<option value="${i}">${s.platform}｜${s.title}</option>`).join('')}</select><div id="existingSocialSummary" style="margin-top:12px"></div></div><div class="flow-block"><span class="flow-step">STEP 2</span><label>目前內容可補充調整</label><textarea id="socialExistingCopy" placeholder="可貼上或補充目前貼文、Hashtag、腳本、字幕等內容。"></textarea></div><div class="flow-block"><span class="flow-step">STEP 3</span><label>優化哪些社群素材</label><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','Reel腳本','分鏡腳本','字幕','封面文字'].map((p,i)=>`<button class="pick ${i<5?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>內容風格</label><select id="socialTone"><option>生活感</option><option>更吸引互動</option><option>更品牌感</option><option>更短影音感</option><option>更促購</option></select><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI調整社群內容</button></div></div>`}
function socialSourceTitle(){const src=socialWorkflowState.source||'product'; if(src==='product'){const p=socialProductsFromOps().find(x=>x.id===socialWorkflowState.selectedProductId)||socialProductsFromOps()[0];return p?`${p.name}｜${p.platform}`:'極簡白底老爹鞋｜蝦皮'} if(src==='ad'){const a=socialAdsFromOps()[Number(socialWorkflowState.selectedAdIndex)||0]||{}; return a.name?`${a.name}｜${a.platform}`:'春季促銷_V1｜Meta Ads'} return document.getElementById('socialNewTopic')?.value||'全新社群內容'}
function socialPackageBlock(platform,mode){const outs=socialOutputSelected(); const title=socialSourceTitle(); const tone=document.getElementById('socialTone')?.value||'生活感'; const isVideo=['TikTok','Shorts','IG'].includes(platform); return `<div class="social-platform-panel active"><div class="result-card"><h3>${isVideo?'影片 / 圖片預覽':'社群圖片預覽'}</h3><div class="social-package-preview ${isVideo?'video':''}">${isVideo?'短影音預覽區':'社群圖片 / Carousel 預覽'}<br><span class="muted" style="${isVideo?'color:#fff':''}">${platform}｜${tone}｜${mode==='opt'?'AI調整版本':'AI生成版本'}</span></div><div class="social-block-actions"><button class="btn" onclick="toast('已重新生成媒體腳本')">重新生成</button><button class="btn" onclick="toast('AI 已優化媒體方向')">AI調整</button></div></div>${outs.includes('Caption')?`<div class="result-card"><h3>Caption</h3><pre class="editable-copy" contenteditable="true">${title}，把日常穿出自己的節奏。這次用更輕鬆的方式分享給你：好搭、好懂，也好行動。\n\n現在就收藏這則內容，下一次出門前直接照著搭。</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}${outs.includes('Hashtag')?`<div class="result-card"><h3>Hashtag</h3><pre class="editable-copy" contenteditable="true">#日常穿搭 #新品分享 #質感生活 #社群內容 #E2B</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}${outs.includes('留言引導')?`<div class="result-card"><h3>留言引導</h3><pre class="editable-copy" contenteditable="true">你會把這個內容留給哪個朋友？留言告訴我們你的選擇。</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}${outs.includes('限動文案')?`<div class="result-card"><h3>限動文案</h3><pre class="editable-copy" contenteditable="true">今天這則先收藏。\n點一下看完整內容 →</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}${outs.includes('Reel腳本')||outs.includes('分鏡腳本')?`<div class="result-card"><h3>短影音腳本 / 分鏡</h3><pre class="editable-copy" contenteditable="true">0-3s｜鉤子：你是不是也想讓日常看起來更有精神？\n3-7s｜展示：商品/主題快速切入，搭配生活場景。\n7-12s｜重點：三個亮點快速列出。\n12-15s｜CTA：收藏這則，下一次直接照做。</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}${outs.includes('字幕')?`<div class="result-card"><h3>字幕</h3><pre class="editable-copy" contenteditable="true">今天分享一個日常小靈感。\n好看不一定要複雜。\n把重點放對，整體就會很有感。</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock(this.closest('.result-card')?.querySelector('h3')?.textContent||'內容')">重新生成</button></div></div>`:''}</div>`}
function renderSocialWorkspace(platforms,mode){socialWorkflowState.activePlatform=socialWorkflowState.activePlatform&&platforms.includes(socialWorkflowState.activePlatform)?socialWorkflowState.activePlatform:platforms[0]; const active=socialWorkflowState.activePlatform; const tabs=platforms.map(p=>`<button class="${p===active?'active':''}" onclick="switchSocialTab('${p}',this)">${p}</button>`).join(''); const panels=platforms.map(p=>`<div class="social-platform-panel ${p===active?'active':''}" data-social-panel="${p}">${socialPackageBlock(p,mode)}</div>`).join(''); document.getElementById('creativeResult').innerHTML=`<div class="result-stack"><div class="social-workspace-head"><div><h2 style="margin:0 0 6px">內容工作區</h2><p class="muted" style="margin:0">依自然發布平台與內容型態產生完整內容包；切換 tab 後可分別儲存目前平台版本。</p></div><div class="social-workspace-actions"><button class="btn" onclick="generateCreative()">重新生成全部</button><button class="btn primary" onclick="saveCurrentSocialPlatformVersion()">儲存目前平台版本</button></div></div><div class="social-platform-tabs">${tabs}</div>${panels}</div>`}
function switchSocialTab(platform,btn){socialWorkflowState.activePlatform=platform;document.querySelectorAll('.social-platform-tabs button').forEach(x=>x.classList.remove('active'));btn?.classList.add('active');document.querySelectorAll('[data-social-panel]').forEach(p=>p.classList.toggle('active',p.dataset.socialPanel===platform))}
function saveCurrentSocialPlatformVersion(){const platform=socialWorkflowState.activePlatform||document.querySelector('.social-platform-tabs button.active')?.textContent?.trim()||'目前平台'; const title=`社群內容包｜${socialSourceTitle()}｜${platform}`; const panel=document.querySelector(`[data-social-panel="${platform}"]`)||document; const text=Array.from(panel.querySelectorAll('.editable-copy')).map(el=>el.innerText||el.textContent||'').join('\n\n'); if(typeof saveCreativeToAssetLibrary==='function')saveCreativeToAssetLibrary('content',title,'社群貼文',text||`${platform} 社群內容包`); if(typeof toast==='function')toast(`已儲存 ${platform} 版本至內容資產庫`)}
const E2B_RENDER_CREATIVE_FORM_BEFORE_SOCIAL=renderCreativeForm;
renderCreativeForm=function(){const type=window.creativeType||'product'; if(type!=='social')return E2B_RENDER_CREATIVE_FORM_BEFORE_SOCIAL(); document.getElementById('creativeForm').innerHTML=renderSocialCreativeForm(); if((window.creativeMode||'new')==='new')renderSocialSourceFields(); else renderExistingSocialSummary();};
generateCreative=function(){const type=window.creativeType||'product'; if(type!=='social')return E2B_GENERATE_BEFORE_SOCIAL(); const mode=window.creativeMode||'new'; const platforms=mode==='opt'?[(socialData[Number(socialWorkflowState.selectedExistingIndex)||0]||{}).platform||'IG']:socialPlatformsSelected(); renderSocialWorkspace(platforms,mode); if(typeof toast==='function')toast(mode==='opt'?'已產生社群內容優化版本':'已建立社群內容包')};


/* ===============================
   E2B Ad/Social backend clarity update
   Separate paid ad materials from organic publishing content.
================================= */
const E2B_RENDER_BEFORE_BACKEND_CLARITY = renderCreativeForm;
const E2B_GENERATE_BEFORE_BACKEND_CLARITY = generateCreative;

const adMaterialTypes = {
  '圖文廣告': {
    output: '標題包、主文案、CTA、圖片素材方向',
    visual: '圖片素材方向｜商品或情境圖需保留標題與 CTA 空間，適合 Meta 動態、Google 多媒體或 Demand Gen 圖片版位。'
  },
  '影片廣告': {
    output: '標題包、影片腳本、分鏡、字幕、CTA',
    visual: '影片素材方向｜產出 0-3 秒鉤子、15 秒腳本、分鏡與字幕方向，適合 Meta Reels / Stories 或 YouTube / Demand Gen。'
  },
  '圖文 + 影片': {
    output: '標題包、文案包、圖片方向、影片腳本與分鏡',
    visual: '圖片 + 影片素材方向｜同時產出靜態圖片構圖與短影音腳本，方便同一活動拆成多種投放版位。'
  },
  '僅文案': {
    output: '平台目標建議、標題包、文案包、CTA',
    visual: '素材提醒｜本次只產文案，不產圖片或影片方向；適合先貼到後台欄位或交給設計師延伸素材。'
  }
};

function adMaterialSelected(){
  return document.querySelector('.ad-material-picks .pick.active')?.textContent?.trim() || '圖文 + 影片';
}
function setAdTypeNoManual(type, btn){
  adWorkflowState.type = type;
  document.querySelectorAll('.ad-type-card').forEach(x => x.classList.remove('active'));
  btn?.classList.add('active');
  renderAdSourceFieldsNoManual();
  resetAdWorkspace();
}
function socialContentRows(){
  const list = (typeof socialData !== 'undefined' ? socialData : []).slice(0, 6);
  return list.length ? list.map((s,i)=>`<button type="button" class="ad-product-choice ${Number(adWorkflowState.selectedSocialIndex||0)===i?'active':''}" onclick="adWorkflowState.selectedSocialIndex=${i};renderAdSourceFieldsNoManual()"><div class="ad-product-thumb">${s.platform||'SOC'}</div><div class="ad-product-main"><b>${s.title}</b><span>${s.platform}｜自然內容</span><p>${s.copy || '可引用既有社群內容，延伸成加預算推廣或重新投放的廣告素材。'}</p></div><div class="ad-product-side"><span class="tag">可推廣</span></div></button>`).join('') : `<div class="source-card">目前沒有可引用的社群內容。</div>`;
}
function renderAdSourceFieldsNoManual(){
  const wrap = document.getElementById('adSourceFields');
  if(!wrap) return;
  const t = adWorkflowState.type || 'product';
  if(t === 'product'){
    const list = adProductsFromOps();
    if(!adWorkflowState.selectedProductId && list[0]) adWorkflowState.selectedProductId = list[0].id;
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 5</div><h3>引用商品資料</h3><p class="muted">從營運分析中的已上架商品帶入名稱、賣點、圖片與平台內容，不需要手動輸入。</p><div id="adProductChoices" class="ad-product-choice-list"></div></div>`;
    drawAdProductChoices();
    return;
  }
  if(t === 'social'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 5</div><h3>引用社群內容推廣</h3><p class="muted">適合「把 IG / FB 貼文加預算推廣」或將自然內容改寫成 Meta Ads 素材。</p><div class="ad-product-choice-list">${socialContentRows()}</div></div>`;
    return;
  }
  if(t === 'event'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 5</div><h3>選擇活動資料</h3><p class="muted">使用既有活動資料建立投放素材；若沒有活動資料，建議先到商品內容或社群內容建立活動內容。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>618 年中慶</b><span>限時優惠、滿額折扣、活動倒數素材。</span></button><button type="button" class="ad-type-card"><b>新品上市</b><span>新品曝光、早鳥優惠、導流到商品頁。</span></button><button type="button" class="ad-type-card"><b>會員回購活動</b><span>再行銷、回購優惠、喚醒沉睡客戶。</span></button></div></div>`;
    return;
  }
  wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 5</div><h3>選擇品牌資料</h3><p class="muted">使用既有品牌定位建立認知型素材，不需要手動補充品牌文字。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>品牌故事</b><span>適合品牌認知、第一眼記憶點與生活情境素材。</span></button><button type="button" class="ad-type-card"><b>核心賣點</b><span>適合搜尋與多媒體曝光，強調功能與差異。</span></button><button type="button" class="ad-type-card"><b>信任背書</b><span>適合名單與銷售，強調評價、保證與服務。</span></button></div></div>`;
}
function renderAdCreativeFormNoManual(){
  const form = document.getElementById('creativeForm');
  if(!form) return;
  const mode = window.creativeMode || 'new';
  if(mode === 'opt'){
    form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇現有廣告素材</h3><p class="muted">從廣告效益分析帶入既有素材，AI 會依原投放平台整理成可重新投放的版本。</p><select id="existingAdSelect" onchange="drawExistingAdChoice()">${adsData.map((a,i)=>`<option value="${i}">${a.platform}｜${a.name}｜${a.status}</option>`).join('')}</select><div id="existingAdPreview"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>優化方向</h3><div class="content-picks ad-output-picks"><button class="pick active" onclick="togglePick(this)">重寫標題欄位</button><button class="pick active" onclick="togglePick(this)">強化 CTA</button><button class="pick active" onclick="togglePick(this)">補強素材方向</button><button class="pick" onclick="togglePick(this)">改成影片腳本</button></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 產生廣告素材優化版</button></div></div>`;
    drawExistingAdChoice();
    return;
  }
  form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇投放平台</h3><p class="muted">廣告素材只處理付費投放，不處理自然發文排程。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>建立 Google / Meta 廣告活動</b><span>使用 Google Ads / Meta Ads Manager 投放。</span></button><button type="button" class="ad-type-card"><b>把社群內容加預算推廣</b><span>使用 Meta Ads Manager / Boost Post 延伸投放。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇投放平台</h3><p class="muted">平台會決定 AI 使用 Google 或 Meta 的生成邏輯。</p><div class="ad-platform-grid"><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Google Ads'?'active':''}" onclick="setAdPlatform('Google Ads',this)"><b>Google Ads</b><span>搜尋、YouTube、Demand Gen、Performance Max 等付費投放素材。</span></button><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Meta Ads'?'active':''}" onclick="setAdPlatform('Meta Ads',this)"><b>Meta Ads</b><span>Facebook / Instagram 動態、限動、Reels 等付費投放素材。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>選擇廣告目的</h3><p class="muted">使用者選目的即可，AI 會附上 Google / Meta 後台目標建議。</p><div class="ad-goal-grid" id="adGoalOptions"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>選擇素材型態</h3><p class="muted">這裡是投放素材格式，不是自然發布格式。</p><div class="format-picks ad-material-picks">${Object.keys(adMaterialTypes).map((p,i)=>`<button class="pick ${i===2?'active':''}" onclick="togglePick(this);resetAdWorkspace()">${p}</button>`).join('')}</div><div class="social-mini-note">目前輸出：<b id="adMaterialHint">${adMaterialTypes[adMaterialSelected()].output}</b></div></div><div class="ad-step-card"><div class="step-kicker">STEP 5</div><h3>選擇素材來源</h3><p class="muted">從既有資料引用，不提供手動輸入補充區。</p><div class="ad-type-grid"><button type="button" class="ad-type-card ${adWorkflowState.type==='product'?'active':''}" onclick="setAdTypeNoManual('product',this)"><b>引用商品</b><span>用已上架商品產生投放素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='social'?'active':''}" onclick="setAdTypeNoManual('social',this)"><b>引用社群內容</b><span>把自然內容延伸成廣告或加預算推廣。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='event'?'active':''}" onclick="setAdTypeNoManual('event',this)"><b>引用活動</b><span>用既有促銷或活動資料產生素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='brand'?'active':''}" onclick="setAdTypeNoManual('brand',this)"><b>引用品牌資料</b><span>用品牌定位建立認知型素材。</span></button></div></div><div id="adSourceFields"></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 生成廣告素材</button></div>`;
  renderAdGoalOptions();
  renderAdSourceFieldsNoManual();
}
function renderSocialCreativeFormBackendClarity(){
  const mode = window.creativeMode || 'new';
  const list = (typeof socialData !== 'undefined' ? socialData : []);
  if(mode !== 'new') return renderSocialCreativeForm();
  return `<div class="creative-form social-flow"><h3>建立全新社群內容包</h3><div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇自然發布內容來源</h3><p class="mini-hint">社群內容用來發布或排程到內容發布工具，不是建立廣告活動。</p>${socialSourceCards()}<div id="socialSourceFields" style="margin-top:14px"></div></div><div class="flow-block"><span class="flow-step">STEP 2</span><label>內容發布工具</label><div class="format-picks social-publish-picks">${['Meta Business Suite','IG App','TikTok Studio','LINE OA','第三方排程工具'].map((p,i)=>`<button class="pick ${i===0||i===2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>自然發布平台（可複選）</label><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0||i===3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>內容型態</label><div class="format-picks social-format-picks">${['一般貼文','限動','Reels / Shorts','TikTok短影音','LINE圖文','Carousel'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>發布目的</label><div class="goal-picks">${['提高互動','推廣商品','建立品牌感','活動導流','知識教育','累積粉絲信任'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div><div class="flow-block"><span class="flow-step">STEP 3</span><label>內容風格</label><div class="social-style-options" id="socialStyleOptions"><label class="social-style-option active" onclick="selectSocialStyle(this,'生活感')"><input type="radio" name="socialTone" value="生活感" checked><span>生活感</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'品牌質感')"><input type="radio" name="socialTone" value="品牌質感"><span>品牌質感</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'活潑親切')"><input type="radio" name="socialTone" value="活潑親切"><span>活潑親切</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'專業知識')"><input type="radio" name="socialTone" value="專業知識"><span>專業知識</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'促購導向')"><input type="radio" name="socialTone" value="促購導向"><span>促購導向</span></label></div><input id="socialTone" type="hidden" value="生活感"></div><div class="flow-block"><span class="flow-step">STEP 4</span><label>建立哪些社群素材（可複選）</label><div class="content-group-title">文字</div><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','第一則留言'].map((p,i)=>`<button class="pick ${i<4?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片 / 版位</div><div class="content-picks">${['社群圖片','Carousel','封面文字'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">影音</div><div class="content-picks">${['Reel腳本','分鏡腳本','字幕','配音稿','AI影片（V2）'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立社群內容包</button></div></div>`;
}
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'ad') return renderAdCreativeFormNoManual();
  if(type === 'social'){
    document.getElementById('creativeForm').innerHTML = renderSocialCreativeFormBackendClarity();
    if((window.creativeMode||'new')==='new') renderSocialSourceFields(); else renderExistingSocialSummary();
    return;
  }
  return E2B_RENDER_BEFORE_BACKEND_CLARITY();
};
function adWorkspaceBlockBackendClarity(platform, mode='new'){
  const material = adMaterialSelected();
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const social = (typeof socialData !== 'undefined' ? socialData : [])[Number(adWorkflowState.selectedSocialIndex)||0];
  const baseName = adWorkflowState.type === 'social' ? (social?.title || '社群內容推廣') : adWorkflowState.type === 'event' ? '活動促銷素材' : adWorkflowState.type === 'brand' ? '品牌宣傳素材' : (selectedProduct?.name || '商品素材');
  const objective = adWorkflowState.objective || '提高商品銷售';
  const objectiveMeta = adObjectiveOptions[objective] || adObjectiveOptions['提高商品銷售'];
  const isGoogle = platform.includes('Google');
  const titlePack = isGoogle ? [`${baseName} 官方推薦`,`${objective} 專屬方案`,`${baseName} 立即查看`] : [`${baseName} 今日推薦`,`這個內容值得被更多人看到`,`現在就把 ${baseName} 加進你的清單`];
  const copyPack = material === '影片廣告'
    ? [`0-3s｜用痛點或利益點開場，讓使用者停下來。`,`3-10s｜展示 ${baseName} 的核心亮點與使用情境。`,`10-15s｜加入 CTA，引導查看、購買或填表。`]
    : [`以「${objective}」為目標，聚焦平台適合的使用情境與行動誘因。`,`${platform} 版本會依後台欄位拆成標題、主文案與 CTA，方便直接複製。`,`素材型態：${material}，輸出重點為 ${adMaterialTypes[material].output}。`];
  const recommendation = `使用者行為｜${adWorkflowState.type==='social'?'把社群內容加預算推廣':'建立 Google / Meta 廣告活動'}\n投放平台｜${platform}\n素材型態｜${material}\n使用者目的｜${objective}\nGoogle Ads 建議目標｜${objectiveMeta.googleGoal}\nMeta Ads 建議目標｜${objectiveMeta.metaGoal}\n建議原因｜廣告素材屬於付費投放；目前 ${platform} 版本會優先採用「${isGoogle?objectiveMeta.googleGoal:objectiveMeta.metaGoal}」的生成邏輯。`;
  return `<div class="ad-workspace-platform" data-platform="${platform}"><div class="workspace-toolbar"><div><h2>${platform} 版本</h2><p class="muted">付費投放素材｜${material}｜${objective}</p></div><div class="workspace-actions"><button class="btn" onclick="generateCreative()">重新生成</button><button class="btn primary" onclick="saveCurrentAdPlatformVersion('${platform}')">儲存 ${platform} 版本</button></div></div><div class="result-card"><h3>平台目標建議</h3><pre>${recommendation}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div><div class="result-card"><h3>標題包</h3><pre>${titlePack.map((x,i)=>`${i+1}. ${x}`).join('\n')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('標題包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('標題包')">重新生成</button></div></div><div class="result-card"><h3>${material==='影片廣告'?'影片腳本 / 分鏡':'文案包'}</h3><pre>${copyPack.map((x,i)=>`${i+1}. ${x}`).join('\n\n')}\n\nCTA 建議｜${isGoogle?'立即查看':'立即行動'}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('文案包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('文案包')">重新生成</button></div></div><div class="result-card"><h3>素材方向</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>${material}<br><span class="muted">${platform}</span></div><pre>${adMaterialTypes[material].visual}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('素材方向', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('素材方向')">重新生成</button></div></div></div>`;
}
renderAdWorkspace = function(platforms, mode='new'){
  adWorkflowState.activeWorkspacePlatform = adWorkflowState.activeWorkspacePlatform && platforms.includes(adWorkflowState.activeWorkspacePlatform) ? adWorkflowState.activeWorkspacePlatform : platforms[0];
  const active = adWorkflowState.activeWorkspacePlatform;
  const tabs = platforms.map(p => `<button class="tab ${p===active?'active':''}" onclick="switchAdWorkspaceTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p => `<div class="workspace-panel ${p===active?'active':''}" data-ad-panel="${p}">${adWorkspaceBlockBackendClarity(p, mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="ad-workspace"><div class="section-head" style="margin:0 0 12px"><div><h2>廣告素材工作區</h2><p class="muted">產生可貼到 Google Ads / Meta Ads 後台投放的付費素材。</p></div></div><div class="workspace-tabs ad-workspace-tabs">${tabs}</div>${panels}</div>`;
};

/* 2026-07-14 Simplified ad material flow: remove placement behavior choice. */
renderAdSourceFieldsNoManual = function(){
  const wrap = document.getElementById('adSourceFields');
  if(!wrap) return;
  const t = adWorkflowState.type || 'product';
  if(t === 'product'){
    const list = adProductsFromOps();
    if(!adWorkflowState.selectedProductId && list[0]) adWorkflowState.selectedProductId = list[0].id;
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 4-1</div><h3>引用商品資料</h3><p class="muted">從營運分析中的已上架商品帶入名稱、賣點、圖片與平台內容，不需要手動輸入。</p><input class="search" id="adProductSearch" placeholder="搜尋商品名稱、SKU、分類或來源平台" oninput="drawAdProductChoices()" style="width:100%;min-width:0;margin:10px 0 12px"><div id="adProductChoices" class="ad-product-choice-list"></div></div>`;
    drawAdProductChoices();
    return;
  }
  if(t === 'social'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 4-1</div><h3>引用社群內容推廣</h3><p class="muted">適合將既有 IG / FB 貼文延伸成 Meta Ads 素材，或加預算推廣。</p><div class="ad-product-choice-list">${socialContentRows()}</div></div>`;
    return;
  }
  if(t === 'event'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 4-1</div><h3>選擇活動資料</h3><p class="muted">使用既有活動資料建立投放素材；若沒有活動資料，建議先到商品內容或社群內容建立活動內容。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>618 年中慶</b><span>限時優惠、滿額折扣、活動倒數素材。</span></button><button type="button" class="ad-type-card"><b>新品上市</b><span>新品曝光、早鳥優惠、導流到商品頁。</span></button><button type="button" class="ad-type-card"><b>會員回購活動</b><span>再行銷、回購優惠、喚醒沉睡客戶。</span></button></div></div>`;
    return;
  }
  wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 4-1</div><h3>選擇品牌資料</h3><p class="muted">使用既有品牌定位建立認知型素材，不需要手動補充品牌文字。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>品牌故事</b><span>適合品牌認知、第一眼記憶點與生活情境素材。</span></button><button type="button" class="ad-type-card"><b>核心賣點</b><span>適合搜尋與多媒體曝光，強調功能與差異。</span></button><button type="button" class="ad-type-card"><b>信任背書</b><span>適合名單與銷售，強調評價、保證與服務。</span></button></div></div>`;
};

function renderAdCreativeFormSimplified(){
  const form = document.getElementById('creativeForm');
  if(!form) return;
  const mode = window.creativeMode || 'new';
  if(mode === 'opt') return renderAdCreativeFormNoManual();
  form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇投放平台</h3><p class="muted">平台會決定 AI 使用 Google 或 Meta 的生成邏輯。</p><div class="ad-platform-grid"><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Google Ads'?'active':''}" onclick="setAdPlatform('Google Ads',this)"><b>Google Ads</b><span>搜尋、YouTube、Demand Gen、Performance Max 等付費投放素材。</span></button><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Meta Ads'?'active':''}" onclick="setAdPlatform('Meta Ads',this)"><b>Meta Ads</b><span>Facebook / Instagram 動態、限動、Reels 等付費投放素材。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇廣告目的</h3><p class="muted">使用者選目的即可，AI 會附上 Google / Meta 後台目標建議。</p><div class="ad-goal-grid" id="adGoalOptions"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>選擇素材型態</h3><p class="muted">這裡是投放素材格式，不是自然發布格式。</p><div class="format-picks ad-material-picks">${Object.keys(adMaterialTypes).map((p,i)=>`<button class="pick ${i===2?'active':''}" onclick="togglePick(this);resetAdWorkspace()">${p}</button>`).join('')}</div><div class="social-mini-note">目前輸出：<b id="adMaterialHint">${adMaterialTypes[adMaterialSelected()].output}</b></div></div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>選擇素材來源</h3><p class="muted">從既有資料引用，不提供手動輸入補充區。</p><div class="ad-type-grid"><button type="button" class="ad-type-card ${adWorkflowState.type==='product'?'active':''}" onclick="setAdTypeNoManual('product',this)"><b>引用商品</b><span>用已上架商品產生投放素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='social'?'active':''}" onclick="setAdTypeNoManual('social',this)"><b>引用社群內容</b><span>把自然內容延伸成廣告或加預算推廣。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='event'?'active':''}" onclick="setAdTypeNoManual('event',this)"><b>引用活動</b><span>用既有促銷或活動資料產生素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='brand'?'active':''}" onclick="setAdTypeNoManual('brand',this)"><b>引用品牌資料</b><span>用品牌定位建立認知型素材。</span></button></div></div><div id="adSourceFields"></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 生成廣告素材</button></div>`;
  renderAdGoalOptions();
  renderAdSourceFieldsNoManual();
}

const E2B_RENDER_BEFORE_AD_SIMPLIFIED = renderCreativeForm;
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'ad') return renderAdCreativeFormSimplified();
  return E2B_RENDER_BEFORE_AD_SIMPLIFIED();
};

/* 2026-07-14 Final ad output choices: AI recommends mix, user selects deliverables. */
function adOutputChoicesSelected(){
  const picks = selectedPicks('.ad-final-output-picks');
  return picks.length ? picks : ['圖文素材'];
}
function adOutputIncludes(name){
  const outputs = adOutputChoicesSelected();
  if(['標題','文案','圖片'].includes(name)) return outputs.some(x => x.includes('圖文'));
  if(name === '影片') return outputs.some(x => x.includes('影音') || x.includes('影片'));
  return outputs.some(x => x.includes(name));
}
function recommendedAdMaterialMix(platform, objective){
  const isGoogle = platform.includes('Google');
  if(isGoogle){
    return `建議：圖文 + 影片\n原因：Google Ads 可先用標題與文案對應搜尋 / Performance Max，再延伸圖片方向與 YouTube / Demand Gen 影片腳本，方便同一批素材拆成多版位。`;
  }
  return `建議：圖文 + 影片\n原因：Meta Ads 適合同時準備動態牆圖文、限動與 Reels 短影音。先產完整素材組合，後續可依預算與版位取用。`;
}
function renderAdCreativeFormFinalOutputs(){
  const form = document.getElementById('creativeForm');
  if(!form) return;
  const mode = window.creativeMode || 'new';
  if(mode === 'opt') return renderAdCreativeFormNoManual();
  form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇投放平台</h3><p class="muted">平台會決定 AI 使用 Google 或 Meta 的生成邏輯。</p><div class="ad-platform-grid"><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Google Ads'?'active':''}" onclick="setAdPlatform('Google Ads',this)"><b>Google Ads</b><span>搜尋、YouTube、Demand Gen、Performance Max 等付費投放素材。</span></button><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Meta Ads'?'active':''}" onclick="setAdPlatform('Meta Ads',this)"><b>Meta Ads</b><span>Facebook / Instagram 動態、限動、Reels 等付費投放素材。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇廣告目的</h3><p class="muted">使用者選目的即可，AI 會附上 Google / Meta 後台目標建議。</p><div class="ad-goal-grid" id="adGoalOptions"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>選擇素材來源</h3><p class="muted">從既有資料引用，不提供手動輸入補充區。</p><div class="ad-type-grid"><button type="button" class="ad-type-card ${adWorkflowState.type==='product'?'active':''}" onclick="setAdTypeNoManual('product',this)"><b>引用商品</b><span>用已上架商品產生投放素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='social'?'active':''}" onclick="setAdTypeNoManual('social',this)"><b>引用社群內容</b><span>把自然內容延伸成廣告或加預算推廣。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='event'?'active':''}" onclick="setAdTypeNoManual('event',this)"><b>引用活動</b><span>用既有促銷或活動資料產生素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='brand'?'active':''}" onclick="setAdTypeNoManual('brand',this)"><b>引用品牌資料</b><span>用品牌定位建立認知型素材。</span></button></div></div><div id="adSourceFields"></div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>選擇要產出的素材</h3><p class="muted">只要圖文就勾圖文；需要影音時再勾影音，AI 會一起產出影片腳本與分鏡。</p><div class="content-picks ad-final-output-picks"><button class="pick active" onclick="togglePick(this)">圖文素材</button><button class="pick" onclick="togglePick(this)">影音素材（影片腳本 / 分鏡）</button></div></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 生成廣告素材</button></div>`;
  renderAdGoalOptions();
  renderAdSourceFieldsNoManual();
}
function adWorkspaceBlockFinalOutputs(platform, mode='new'){
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const social = (typeof socialData !== 'undefined' ? socialData : [])[Number(adWorkflowState.selectedSocialIndex)||0];
  const baseName = adWorkflowState.type === 'social' ? (social?.title || '社群內容推廣') : adWorkflowState.type === 'event' ? '活動促銷素材' : adWorkflowState.type === 'brand' ? '品牌宣傳素材' : (selectedProduct?.name || '商品素材');
  const objective = adWorkflowState.objective || '提高商品銷售';
  const objectiveMeta = adObjectiveOptions[objective] || adObjectiveOptions['提高商品銷售'];
  const isGoogle = platform.includes('Google');
  const outputs = adOutputChoicesSelected();
  const titlePack = isGoogle ? [`${baseName} 官方推薦`,`${objective} 專屬方案`,`${baseName} 立即查看`] : [`${baseName} 今日推薦`,`這個內容值得被更多人看到`,`現在就把 ${baseName} 加進你的清單`];
  const copyPack = [`以「${objective}」為目標，聚焦平台適合的使用情境與行動誘因。`,`${platform} 版本會依後台欄位拆成標題、主文案與 CTA，方便直接複製。`,`此素材引用「${baseName}」，可延伸為圖片與短影音版位。`];
  const imageDirection = isGoogle
    ? `圖片方向｜商品清楚置中，保留標題與 CTA 空間。\n適用版位｜Performance Max、Demand Gen、多媒體廣告。\n構圖提醒｜文字不要過多，主視覺需在小尺寸仍可辨識。`
    : `圖片方向｜人物情境 + 商品近景，第一眼有社群滑動停止感。\n適用版位｜Facebook / Instagram 動態牆、限動靜態圖。\n構圖提醒｜保留上方或中段文字安全區，CTA 放在視線結尾。`;
  const videoScript = isGoogle
    ? `0-3s｜直接呈現商品/活動利益點，讓使用者知道為何要看。\n3-10s｜展示使用情境、賣點或優惠。\n10-15s｜收斂到 CTA：立即查看 / 了解更多。\n版位提醒｜可延伸 YouTube Shorts、YouTube in-stream、Demand Gen 影片。`
    : `0-3s｜用痛點、好奇或優惠開場，讓使用者停止滑動。\n3-8s｜快速展示商品/活動情境。\n8-13s｜補上核心利益與信任感。\n13-15s｜CTA：立即選購 / 私訊了解 / 點擊連結。`;
  const recommendation = `使用者目的｜${objective}\nGoogle Ads 建議目標｜${objectiveMeta.googleGoal}\nMeta Ads 建議目標｜${objectiveMeta.metaGoal}\n建議原因｜廣告素材屬於付費投放；目前 ${platform} 版本會優先採用「${isGoogle?objectiveMeta.googleGoal:objectiveMeta.metaGoal}」的生成邏輯。`;
  const blocks = [
    `<div class="result-card"><h3>AI 推薦素材組合</h3><pre>${recommendedAdMaterialMix(platform, objective)}\n\n本次使用者選擇產出｜${outputs.join('、')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div>`,
    `<div class="result-card"><h3>平台目標建議</h3><pre>${recommendation}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div>`
  ];
  if(adOutputIncludes('標題')) blocks.push(`<div class="result-card"><h3>標題包</h3><pre>${titlePack.map((x,i)=>`${i+1}. ${x}`).join('\n')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('標題包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('標題包')">重新生成</button></div></div>`);
  if(adOutputIncludes('文案')) blocks.push(`<div class="result-card"><h3>文案包</h3><pre>${copyPack.map((x,i)=>`${i+1}. ${x}`).join('\n\n')}\n\nCTA 建議｜${isGoogle?'立即查看':'立即行動'}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('文案包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('文案包')">重新生成</button></div></div>`);
  if(adOutputIncludes('圖片')) blocks.push(`<div class="result-card"><h3>圖片方向</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>${platform}<br><span class="muted">圖片素材</span></div><pre>${imageDirection}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('圖片方向', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('圖片方向')">重新生成</button></div></div>`);
  if(adOutputIncludes('影片')) blocks.push(`<div class="result-card"><h3>影音素材：影片腳本 / 分鏡</h3><div class="creative-bundle"><div class="creative-preview video"><span class="muted" style="color:#fff">短影音 / 廣告影片</span></div><pre>${videoScript}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('影音素材：影片腳本 / 分鏡', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('影片腳本 / 分鏡')">重新生成</button></div></div>`);
  return `<div class="ad-workspace-platform" data-platform="${platform}"><div class="workspace-toolbar"><div><h2>${platform} 版本</h2><p class="muted">付費投放素材｜${objective}</p></div><div class="workspace-actions"><button class="btn" onclick="generateCreative()">重新生成</button><button class="btn primary" onclick="saveCurrentAdPlatformVersion('${platform}')">儲存 ${platform} 版本</button></div></div>${blocks.join('')}</div>`;
}
renderAdWorkspace = function(platforms, mode='new'){
  adWorkflowState.activeWorkspacePlatform = adWorkflowState.activeWorkspacePlatform && platforms.includes(adWorkflowState.activeWorkspacePlatform) ? adWorkflowState.activeWorkspacePlatform : platforms[0];
  const active = adWorkflowState.activeWorkspacePlatform;
  const tabs = platforms.map(p => `<button class="tab ${p===active?'active':''}" onclick="switchAdWorkspaceTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p => `<div class="workspace-panel ${p===active?'active':''}" data-ad-panel="${p}">${adWorkspaceBlockFinalOutputs(p, mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="ad-workspace"><div class="section-head" style="margin:0 0 12px"><div><h2>廣告素材工作區</h2><p class="muted">先由 AI 建議素材組合，再依使用者選擇產出標題、文案、圖片方向與影片腳本。</p></div></div><div class="workspace-tabs ad-workspace-tabs">${tabs}</div>${panels}</div>`;
};
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'ad') return renderAdCreativeFormFinalOutputs();
  return E2B_RENDER_BEFORE_AD_SIMPLIFIED();
};




/* ==============================
   E2B Prototype v4
   Shared result actions
   ============================== */
(function(){
  if(window.E2B_V4_ACTIONS_READY) return;
  window.E2B_V4_ACTIONS_READY = true;

  function textOf(el){ return (el?.textContent || '').trim(); }

  window.e2bOpenAiAdjustModal = function(title, content){
    const old = document.getElementById('aiAdjustModal');
    if(old) old.remove();

    const modal = document.createElement('div');
    modal.id = 'aiAdjustModal';
    modal.className = 'ai-adjust-modal show';
    modal.innerHTML = `
      <div class="ai-adjust-dialog">
        <button class="ai-adjust-close" onclick="document.getElementById('aiAdjustModal')?.remove()">×</button>
        <div class="ai-adjust-head">
          <span class="logo mini">✦</span>
          <div>
            <h2>AI調整${title ? '｜' + escapeHtml(title) : ''}</h2>
            <p>選擇想調整的方向，AI 會保留原意並微調目前內容。</p>
          </div>
        </div>
        <label>目前內容</label>
        <div class="ai-current-content">${escapeHtml(content || '').replace(/\n/g,'<br>')}</div>
        <label>快速調整</label>
        <div class="ai-adjust-options">
          ${['更有銷售力','更符合 SEO','更生活化','更專業','更精簡','更詳細'].map((x,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${x}</button>`).join('')}
        </div>
        <label>其他需求（選填）</label>
        <textarea placeholder="例如：加入限時優惠、增加品牌感、不要 emoji、適合 momo。"></textarea>
        <div class="ai-adjust-actions">
          <button class="btn" onclick="document.getElementById('aiAdjustModal')?.remove()">取消</button>
          <button class="btn primary" onclick="document.getElementById('aiAdjustModal')?.remove();toast('AI 已依需求調整內容')">開始調整</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  };

  window.e2bConfirmRegenerate = function(title){
    const ok = confirm(`重新生成${title ? '「' + title + '」' : '此內容'}？\n\n目前版本會保留，AI 將建立新的版本供比較。`);
    if(ok) toast('已重新生成一個新版本');
  };

  function makeBtn(label, className, onClick){
    const b = document.createElement('button');
    b.className = className || 'btn';
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }

  function getCardTitle(card){
    return textOf(card.querySelector('h3,h2,b,.asset-meta b')) || '內容';
  }

  function getCardContent(card){
    const clone = card.cloneNode(true);
    clone.querySelectorAll('button,.result-actions,.image-card-actions,.workspace-actions').forEach(x=>x.remove());
    return textOf(clone);
  }

  function buildTextActions(card){
    const actions = document.createElement('div');
    actions.className = 'result-actions e2b-v4-actions';

    actions.appendChild(makeBtn('複製','btn',()=>copyText(actions.querySelector('button'))));
    actions.appendChild(makeBtn('AI調整','btn',()=>e2bOpenAiAdjustModal(getCardTitle(card), getCardContent(card))));
    actions.appendChild(makeBtn('重新生成','btn',()=>e2bConfirmRegenerate(getCardTitle(card))));
    return actions;
  }

  function buildImageActions(card){
    const actions = document.createElement('div');
    actions.className = 'image-card-actions e2b-v4-actions';

    actions.appendChild(makeBtn('下載','btn',()=>toast('已下載圖片')));
    actions.appendChild(makeBtn('AI調整','btn',()=>e2bOpenAiAdjustModal(getCardTitle(card) || '圖片', getCardContent(card))));
    actions.appendChild(makeBtn('重新生成','btn',()=>e2bConfirmRegenerate(getCardTitle(card) || '圖片')));
    actions.appendChild(makeBtn('儲存至資產庫','btn primary',()=>toast('已儲存至資產庫')));
    return actions;
  }

  function normalizeTextCard(card){
    if(!card || card.dataset.e2bActions === 'text') return;
    card.querySelectorAll('.result-actions,.e2b-v4-actions').forEach(x=>x.remove());
    card.appendChild(buildTextActions(card));
    card.dataset.e2bActions = 'text';
  }

  function normalizeImageCard(card){
    if(!card || card.dataset.e2bActions === 'image') return;
    card.querySelectorAll('.result-actions,.image-card-actions,.workspace-actions .btn,.e2b-v4-actions').forEach(x=>{
      if(x.classList && (x.classList.contains('result-actions') || x.classList.contains('image-card-actions') || x.classList.contains('e2b-v4-actions'))) x.remove();
    });
    card.appendChild(buildImageActions(card));
    card.dataset.e2bActions = 'image';
  }

  window.e2bNormalizeCreativeActions = function(){
    const root = document.getElementById('creativeResult');
    if(!root) return;

    // Text result cards across product/ad/social.
    root.querySelectorAll('.result-card').forEach(card=>normalizeTextCard(card));

    // Image cards in image creation workspace.
    root.querySelectorAll('.image-version-card').forEach(card=>normalizeImageCard(card));

    // Large visual/image blocks in product/ad workspaces.
    root.querySelectorAll('.ad-content-block.visual, .visual, [class*="visual-preview"]').forEach(el=>{
      const card = el.closest('.ad-content-block') || el.closest('.result-card') || el.parentElement;
      if(card && !card.classList.contains('result-card')) normalizeImageCard(card);
    });

    // Workspace toolbar image actions: normalize buttons if block appears to be image oriented.
    root.querySelectorAll('.workspace-actions').forEach(area=>{
      const parentText = textOf(area.closest('.ad-workspace-platform,.product-workspace,.workspace-panel,.ad-content-block') || area.parentElement);
      if(/圖片|主圖|視覺|Banner|素材/.test(parentText)){
        area.innerHTML = '';
        const container = area.closest('.ad-content-block,.workspace-toolbar') || area.parentElement;
        const fakeCard = container || area;
        area.appendChild(makeBtn('AI調整','btn',()=>e2bOpenAiAdjustModal('圖片', getCardContent(fakeCard))));
        area.appendChild(makeBtn('重新生成','btn',()=>e2bConfirmRegenerate('圖片')));
      }
    });

    // Last defense: any visible result card with only copy/regenerate gets normalized.
    root.querySelectorAll('.result-actions').forEach(actions=>{
      const card = actions.closest('.result-card');
      if(card && (!actions.textContent.includes('AI調整') || !actions.textContent.includes('重新生成'))) normalizeTextCard(card);
    });
  };

  // Wrap key render functions.
  ['generateCreative','renderCreative','setCreativeMode','switchAdWorkspaceTab','switchProductWorkspaceTab'].forEach(fn=>{
    if(typeof window[fn] === 'function' && !window[fn].__e2bV4Wrapped){
      const original = window[fn];
      const wrapped = function(){
        const result = original.apply(this, arguments);
        setTimeout(e2bNormalizeCreativeActions, 0);
        setTimeout(e2bNormalizeCreativeActions, 80);
        return result;
      };
      wrapped.__e2bV4Wrapped = true;
      window[fn] = wrapped;
    }
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(e2bNormalizeCreativeActions, 100);
    const target = document.getElementById('creativeResult');
    if(target){
      const mo = new MutationObserver(()=>setTimeout(e2bNormalizeCreativeActions, 0));
      mo.observe(target,{childList:true,subtree:true});
    }
  });
})();

/* 2026-07-14 Social purpose and style tips */
function renderSocialCreativeFormWithTips(){
  const mode = window.creativeMode || 'new';
  const list = (typeof socialData !== 'undefined' ? socialData : []);
  if(mode !== 'new'){
    return `<div class="creative-form social-flow"><h3>優化現有社群內容</h3>
      <div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇現有社群內容</h3><p class="mini-hint">先選擇要優化的社群內容，AI 會帶入原平台、原文案與目前內容狀態。</p><select id="existingSocialSelect" onchange="selectExistingSocialContent(this.value)">${list.map((s,i)=>`<option value="${i}">${s.platform}｜${s.title}</option>`).join('')}</select><div id="existingSocialSummary" style="margin-top:12px"></div></div>
      <div class="flow-block"><span class="flow-step">STEP 2</span><h3 style="margin:10px 0 4px">選擇優化重點</h3><p class="mini-hint">只選這次想改善的方向，AI 會保留原內容脈絡並產生新版本，不直接覆蓋原文。</p><div class="format-picks social-opt-focus-picks">${['強化開頭鉤子','提升互動留言','改寫成更自然','補強導流 CTA','優化 Hashtag','延伸短影音腳本','調整封面 / 圖片方向'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
      <div class="flow-block"><span class="flow-step">STEP 3</span><h3 style="margin:10px 0 4px">引用素材（選填）</h3><p class="mini-hint">可補充素材庫中的圖片、版面或既有視覺素材，讓 AI 參考風格後再優化。</p>${e2bAssetReferenceBlock()}<button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI調整社群內容</button></div>
    </div>`;
  }
  return `<div class="creative-form social-flow"><h3>建立全新社群內容包</h3>
    <div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇發布平台</h3><p class="mini-hint">先決定這次內容要發到哪裡，AI 會依平台調整格式、語氣、長度與素材建議。</p><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0||i===3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
    <div class="flow-block"><span class="flow-step">STEP 2</span><h3 style="margin:10px 0 4px">選擇內容來源</h3><p class="mini-hint">社群內容用於自然發布與帳號經營，可引用商品、廣告、既有內容或全新建立。</p>${socialSourceCards()}<div id="socialSourceFields" style="margin-top:14px"></div></div>
    <div class="flow-block"><span class="flow-step">STEP 3</span><label>選擇內容型態（可複選）</label><p class="mini-hint">可同時產生貼文、限動、短影音、Carousel 或 LINE 圖文。</p><div class="content-picks social-content-type-picks">${['一般貼文','限動','Reels / Shorts','TikTok 短影音','Carousel','LINE 圖文'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>發布目的</label><div class="goal-picks social-purpose-picks">${socialPurposeOptionsHtml()}</div></div>
    <div class="flow-block"><span class="flow-step">STEP 4</span><label>內容風格與引用素材</label><div class="social-style-options" id="socialStyleOptions">${socialStyleOptionsHtml()}</div><input id="socialTone" type="hidden" value="生活感">${e2bAssetReferenceBlock()}</div>
    <div class="flow-block"><span class="flow-step">STEP 5</span><label>選擇要產出的內容（可複選）</label><p class="mini-hint">此步驟會影響 AI token 消耗；只需要貼文或限動選「圖文內容」，需要短影音再選「影音腳本」。</p><div class="content-picks social-output-category-picks"><button class="pick active" onclick="togglePick(this)">圖文內容</button><button class="pick" onclick="togglePick(this)">影音腳本</button></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立社群內容包</button></div>
  </div>`;
}

socialOutputSelected = function(){
  const groups = selectedPicks('.social-output-category-picks');
  const selected = groups.length ? groups : ['圖文內容'];
  const outs = [];
  if(selected.includes('圖文內容')){
    outs.push('Caption','Hashtag','留言引導','限動文案','封面文字','社群圖片','Carousel圖片方向');
  }
  if(selected.includes('影音腳本')){
    outs.push('Reel腳本','分鏡腳本','字幕','配音稿');
  }
  return outs;
};

const E2B_RENDER_BEFORE_SOCIAL_TIPS = renderCreativeForm;
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'social'){
    document.getElementById('creativeForm').innerHTML = renderSocialCreativeFormWithTips();
    if((window.creativeMode||'new') === 'new') renderSocialSourceFields(); else renderExistingSocialSummary();
    return;
  }
  return E2B_RENDER_BEFORE_SOCIAL_TIPS();
};

/* 2026-07-14 Ad/Social asset reference flow */
function e2bAssetReferenceBlock(){
  return `<label>AI 引用素材（選填）</label><p class="mini-hint">可從素材庫選擇一個或多個素材，AI 會參考素材的視覺風格、配色與版面配置，不會直接複製素材內容。</p><div class="asset-select-box product-asset-ref"><div class="selected-assets" id="selectedAssets"><span>尚未選擇素材</span></div><button class="btn" type="button" onclick="openAssetLibrary()">＋ 選擇引用素材</button></div>`;
}

renderAdSourceFieldsNoManual = function(){
  const wrap = document.getElementById('adSourceFields');
  if(!wrap) return;
  const t = adWorkflowState.type || 'product';
  if(t === 'product'){
    const list = adProductsFromOps();
    if(!adWorkflowState.selectedProductId && list[0]) adWorkflowState.selectedProductId = list[0].id;
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-2</div><h3>選擇引用內容與素材</h3><p class="muted">先選要引用的商品資料，再視需要補充素材庫中的視覺素材。</p><input class="search" id="adProductSearch" placeholder="搜尋商品名稱、SKU、分類或來源平台" oninput="drawAdProductChoices()" style="width:100%;min-width:0;margin:10px 0 12px"><div id="adProductChoices" class="ad-product-choice-list"></div>${e2bAssetReferenceBlock()}</div>`;
    drawAdProductChoices();
    return;
  }
  if(t === 'social'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-2</div><h3>選擇引用內容與素材</h3><p class="muted">適合將既有 IG / FB 貼文延伸成 Meta Ads 素材，或加預算推廣。</p><div class="ad-product-choice-list">${socialContentRows()}</div>${e2bAssetReferenceBlock()}</div>`;
    return;
  }
  if(t === 'event'){
    wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-2</div><h3>選擇引用內容與素材</h3><p class="muted">使用既有活動資料建立投放素材；若需要視覺風格參考，可再引用素材庫素材。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>618 年中慶</b><span>限時優惠、滿額折扣、活動倒數素材。</span></button><button type="button" class="ad-type-card"><b>新品上市</b><span>新品曝光、早鳥優惠、導流到商品頁。</span></button><button type="button" class="ad-type-card"><b>會員回購活動</b><span>再行銷、回購優惠、喚醒沉睡客戶。</span></button></div>${e2bAssetReferenceBlock()}</div>`;
    return;
  }
  wrap.innerHTML = `<div class="ad-step-card"><div class="step-kicker">STEP 3-2</div><h3>選擇引用內容與素材</h3><p class="muted">使用既有品牌定位建立認知型素材；可再引用素材庫素材作為視覺方向。</p><div class="ad-type-grid"><button type="button" class="ad-type-card active"><b>品牌故事</b><span>適合品牌認知、第一眼記憶點與生活情境素材。</span></button><button type="button" class="ad-type-card"><b>核心賣點</b><span>適合搜尋與多媒體曝光，強調功能與差異。</span></button><button type="button" class="ad-type-card"><b>信任背書</b><span>適合名單與銷售，強調評價、保證與服務。</span></button></div>${e2bAssetReferenceBlock()}</div>`;
};

function renderAdCreativeFormAssetReference(){
  const form = document.getElementById('creativeForm');
  if(!form) return;
  const mode = window.creativeMode || 'new';
  if(mode === 'opt'){
    form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇現有廣告素材</h3><p class="muted">從廣告效益分析帶入既有素材，AI 會依原投放平台重新整理成可投放版本。</p><select id="existingAdSelect" onchange="drawExistingAdChoice()">${adsData.map((a,i)=>`<option value="${i}">${a.platform}｜${a.name}｜${a.status}</option>`).join('')}</select><div id="existingAdPreview"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇優化重點</h3><div class="content-picks ad-output-picks"><button class="pick active" onclick="togglePick(this)">重寫標題欄位</button><button class="pick active" onclick="togglePick(this)">強化 CTA</button><button class="pick active" onclick="togglePick(this)">補強素材方向</button><button class="pick" onclick="togglePick(this)">改成影片腳本</button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3</div><h3>引用素材</h3><p class="muted">可補充素材庫中的圖片、版面或既有視覺素材，讓 AI 參考風格後再優化。</p>${e2bAssetReferenceBlock()}</div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>選擇要產出的素材</h3><p class="muted">只要圖文就勾圖文；需要影音時再勾影音，AI 會一起產出影片腳本與分鏡。</p><div class="content-picks ad-final-output-picks"><button class="pick active" onclick="togglePick(this)">圖文素材</button><button class="pick" onclick="togglePick(this)">影音素材（影片腳本 / 分鏡）</button></div></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 產生廣告素材優化版</button></div>`;
    drawExistingAdChoice();
    return;
  }
  form.innerHTML = `<div class="creative-form ad-workflow-form"><div class="ad-step-card"><div class="step-kicker">STEP 1</div><h3>選擇投放平台</h3><p class="muted">平台會決定 AI 使用 Google 或 Meta 的生成邏輯。</p><div class="ad-platform-grid"><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Google Ads'?'active':''}" onclick="setAdPlatform('Google Ads',this)"><b>Google Ads</b><span>搜尋、YouTube、Demand Gen、Performance Max 等付費投放素材。</span></button><button type="button" class="ad-platform-card ${adWorkflowState.platform==='Meta Ads'?'active':''}" onclick="setAdPlatform('Meta Ads',this)"><b>Meta Ads</b><span>Facebook / Instagram 動態、限動、Reels 等付費投放素材。</span></button></div></div><div class="ad-step-card"><div class="step-kicker">STEP 2</div><h3>選擇廣告目的</h3><p class="muted">使用者選目的即可，AI 會附上 Google / Meta 後台目標建議。</p><div class="ad-goal-grid" id="adGoalOptions"></div></div><div class="ad-step-card"><div class="step-kicker">STEP 3-1</div><h3>選擇素材來源</h3><p class="muted">這一步決定要引用哪一類資料；下一步會依選擇顯示對應的引用內容。</p><div class="ad-type-grid"><button type="button" class="ad-type-card ${adWorkflowState.type==='product'?'active':''}" onclick="setAdTypeNoManual('product',this)"><b>引用商品</b><span>用已上架商品產生投放素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='social'?'active':''}" onclick="setAdTypeNoManual('social',this)"><b>引用社群內容</b><span>把自然內容延伸成廣告或加預算推廣。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='event'?'active':''}" onclick="setAdTypeNoManual('event',this)"><b>引用活動</b><span>用既有促銷或活動資料產生素材。</span></button><button type="button" class="ad-type-card ${adWorkflowState.type==='brand'?'active':''}" onclick="setAdTypeNoManual('brand',this)"><b>引用品牌資料</b><span>用品牌定位建立認知型素材。</span></button></div></div><div id="adSourceFields"></div><div class="ad-step-card"><div class="step-kicker">STEP 4</div><h3>選擇要產出的素材</h3><p class="muted">只要圖文就勾圖文；需要影音時再勾影音，AI 會一起產出影片腳本與分鏡。</p><div class="content-picks ad-final-output-picks"><button class="pick active" onclick="togglePick(this)">圖文素材</button><button class="pick" onclick="togglePick(this)">影音素材（影片腳本 / 分鏡）</button></div></div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ 生成廣告素材</button></div>`;
  renderAdGoalOptions();
  renderAdSourceFieldsNoManual();
}

function renderSocialCreativeFormAssetReference(){
  const mode = window.creativeMode || 'new';
  const list = (typeof socialData !== 'undefined' ? socialData : []);
  if(mode !== 'new'){
    return `<div class="creative-form social-flow"><h3>優化現有社群內容</h3><div class="flow-block"><span class="flow-step">STEP 1</span><label>選擇現有社群內容</label><select id="existingSocialSelect" onchange="selectExistingSocialContent(this.value)">${list.map((s,i)=>`<option value="${i}">${s.platform}｜${s.title}</option>`).join('')}</select><div id="existingSocialSummary" style="margin-top:12px"></div></div><div class="flow-block"><span class="flow-step">STEP 2</span><label>目前內容可補充調整</label><textarea id="socialExistingCopy" placeholder="可貼上或補充目前貼文、Hashtag、腳本、字幕等內容。"></textarea>${e2bAssetReferenceBlock()}</div><div class="flow-block"><span class="flow-step">STEP 3</span><label>優化哪些社群素材</label><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','Reel腳本','分鏡腳本','字幕','封面文字'].map((p,i)=>`<button class="pick ${i<5?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>內容風格</label><select id="socialTone"><option>生活感</option><option>更吸引互動</option><option>更品牌感</option><option>更短影音感</option><option>更促購</option></select><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI調整社群內容</button></div></div>`;
  }
  return `<div class="creative-form social-flow"><h3>建立全新社群內容包</h3><div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇自然發布內容來源</h3><p class="mini-hint">社群內容用來發布或排程到內容發布工具，不是建立廣告活動。</p>${socialSourceCards()}<div id="socialSourceFields" style="margin-top:14px"></div></div><div class="flow-block"><span class="flow-step">STEP 2</span><label>內容發布工具</label><div class="format-picks social-publish-picks">${['Meta Business Suite','IG App','TikTok Studio','LINE OA','第三方排程工具'].map((p,i)=>`<button class="pick ${i===0||i===2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>自然發布平台（可複選）</label><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0||i===3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>內容型態</label><div class="format-picks social-format-picks">${['一般貼文','限動','Reels / Shorts','TikTok短影音','LINE圖文','Carousel'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>發布目的</label><div class="goal-picks">${['提高互動','推廣商品','建立品牌感','活動導流','知識教育','累積粉絲信任'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div><div class="flow-block"><span class="flow-step">STEP 3</span><label>內容風格</label><div class="social-style-options" id="socialStyleOptions"><label class="social-style-option active" onclick="selectSocialStyle(this,'生活感')"><input type="radio" name="socialTone" value="生活感" checked><span>生活感</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'品牌質感')"><input type="radio" name="socialTone" value="品牌質感"><span>品牌質感</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'活潑親切')"><input type="radio" name="socialTone" value="活潑親切"><span>活潑親切</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'專業知識')"><input type="radio" name="socialTone" value="專業知識"><span>專業知識</span></label><label class="social-style-option" onclick="selectSocialStyle(this,'促購導向')"><input type="radio" name="socialTone" value="促購導向"><span>促購導向</span></label></div><input id="socialTone" type="hidden" value="生活感">${e2bAssetReferenceBlock()}</div><div class="flow-block"><span class="flow-step">STEP 4</span><label>建立哪些社群素材（可複選）</label><div class="content-group-title">文字</div><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','第一則留言'].map((p,i)=>`<button class="pick ${i<4?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片 / 版位</div><div class="content-picks">${['社群圖片','Carousel','封面文字'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">影音</div><div class="content-picks">${['Reel腳本','分鏡腳本','字幕','配音稿','AI影片（V2）'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立社群內容包</button></div></div>`;
}

const E2B_RENDER_BEFORE_ASSET_REFERENCE = renderCreativeForm;
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'ad') return renderAdCreativeFormAssetReference();
  if(type === 'social'){
    document.getElementById('creativeForm').innerHTML = renderSocialCreativeFormAssetReference();
    if((window.creativeMode||'new') === 'new') renderSocialSourceFields(); else renderExistingSocialSummary();
    return;
  }
  return E2B_RENDER_BEFORE_ASSET_REFERENCE();
};

/* 2026-07-14 Ad workspace header actions */
function saveActiveAdPlatformVersion(){
  const platform = adWorkflowState.activeWorkspacePlatform || document.querySelector('.ad-workspace-tabs .tab.active')?.textContent?.trim() || '目前平台';
  saveCurrentAdPlatformVersion(platform);
}

function adWorkspaceBlockWithHeaderActions(platform, mode='new'){
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const social = (typeof socialData !== 'undefined' ? socialData : [])[Number(adWorkflowState.selectedSocialIndex)||0];
  const baseName = adWorkflowState.type === 'social' ? (social?.title || '社群內容推廣') : adWorkflowState.type === 'event' ? '活動促銷素材' : adWorkflowState.type === 'brand' ? '品牌宣傳素材' : (selectedProduct?.name || '商品素材');
  const objective = adWorkflowState.objective || '提高商品銷售';
  const objectiveMeta = adObjectiveOptions[objective] || adObjectiveOptions['提高商品銷售'];
  const isGoogle = platform.includes('Google');
  const outputs = adOutputChoicesSelected();
  const titlePack = isGoogle ? [`${baseName} 官方推薦`,`${objective} 專屬方案`,`${baseName} 立即查看`] : [`${baseName} 今日推薦`,`這個內容值得被更多人看到`,`現在就把 ${baseName} 加進你的清單`];
  const copyPack = [`以「${objective}」為目標，聚焦平台適合的使用情境與行動誘因。`,`${platform} 版本會依後台欄位拆成標題、主文案與 CTA，方便直接複製。`,`此素材引用「${baseName}」，可延伸為圖片與短影音版位。`];
  const imageDirection = isGoogle
    ? `圖片方向｜商品清楚置中，保留標題與 CTA 空間。\n適用版位｜Performance Max、Demand Gen、多媒體廣告。\n構圖提醒｜文字不要過多，主視覺需在小尺寸仍可辨識。`
    : `圖片方向｜人物情境 + 商品近景，第一眼有社群滑動停止感。\n適用版位｜Facebook / Instagram 動態牆、限動靜態圖。\n構圖提醒｜保留上方或中段文字安全區，CTA 放在視線結尾。`;
  const videoScript = isGoogle
    ? `0-3s｜直接呈現商品/活動利益點，讓使用者知道為何要看。\n3-10s｜展示使用情境、賣點或優惠。\n10-15s｜收斂到 CTA：立即查看 / 了解更多。\n版位提醒｜可延伸 YouTube Shorts、YouTube in-stream、Demand Gen 影片。`
    : `0-3s｜用痛點、好奇或優惠開場，讓使用者停止滑動。\n3-8s｜快速展示商品/活動情境。\n8-13s｜補上核心利益與信任感。\n13-15s｜CTA：立即選購 / 私訊了解 / 點擊連結。`;
  const recommendation = `使用者目的｜${objective}\nGoogle Ads 建議目標｜${objectiveMeta.googleGoal}\nMeta Ads 建議目標｜${objectiveMeta.metaGoal}\n建議原因｜廣告素材屬於付費投放；目前 ${platform} 版本會優先採用「${isGoogle?objectiveMeta.googleGoal:objectiveMeta.metaGoal}」的生成邏輯。`;
  const blocks = [
    `<div class="result-card"><h3>AI 推薦素材組合</h3><pre>${recommendedAdMaterialMix(platform, objective)}\n\n本次使用者選擇產出｜${outputs.join('、')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div>`,
    `<div class="result-card"><h3>平台目標建議</h3><pre>${recommendation}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div>`
  ];
  if(adOutputIncludes('標題')) blocks.push(`<div class="result-card"><h3>標題包</h3><pre>${titlePack.map((x,i)=>`${i+1}. ${x}`).join('\n')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('標題包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('標題包')">重新生成</button></div></div>`);
  if(adOutputIncludes('文案')) blocks.push(`<div class="result-card"><h3>文案包</h3><pre>${copyPack.map((x,i)=>`${i+1}. ${x}`).join('\n\n')}\n\nCTA 建議｜${isGoogle?'立即查看':'立即行動'}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('文案包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('文案包')">重新生成</button></div></div>`);
  if(adOutputIncludes('圖片')) blocks.push(`<div class="result-card"><h3>圖片方向</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>${platform}<br><span class="muted">圖片素材</span></div><pre>${imageDirection}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('圖片方向', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('圖片方向')">重新生成</button></div></div>`);
  if(adOutputIncludes('影片')) blocks.push(`<div class="result-card"><h3>影音素材：影片腳本 / 分鏡</h3><div class="creative-bundle"><div class="creative-preview video"><span class="muted" style="color:#fff">短影音 / 廣告影片</span></div><pre>${videoScript}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('影音素材：影片腳本 / 分鏡', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('影片腳本 / 分鏡')">重新生成</button></div></div>`);
  return `<div class="ad-workspace-platform" data-platform="${platform}">${blocks.join('')}</div>`;
}

renderAdWorkspace = function(platforms, mode='new'){
  adWorkflowState.activeWorkspacePlatform = adWorkflowState.activeWorkspacePlatform && platforms.includes(adWorkflowState.activeWorkspacePlatform) ? adWorkflowState.activeWorkspacePlatform : platforms[0];
  const active = adWorkflowState.activeWorkspacePlatform;
  const tabs = platforms.map(p => `<button class="tab ${p===active?'active':''}" onclick="switchAdWorkspaceTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p => `<div class="workspace-panel ${p===active?'active':''}" data-ad-panel="${p}">${adWorkspaceBlockWithHeaderActions(p, mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="ad-workspace"><div class="social-workspace-head"><div><h2 style="margin:0 0 6px">廣告素材工作區</h2><p class="muted" style="margin:0">先由 AI 建議素材組合，再依使用者選擇產出標題、文案、圖片方向與影片腳本。</p></div><div class="social-workspace-actions"><button class="btn" onclick="generateCreative()">重新生成全部</button><button class="btn primary" onclick="saveActiveAdPlatformVersion()">儲存目前平台版本</button></div></div><div class="workspace-tabs ad-workspace-tabs">${tabs}</div>${panels}</div>`;
};

/* 2026-07-14 Simplify ad result helper cards */
function adWorkspaceBlockPlatformGoalOnly(platform, mode='new'){
  const selectedProduct = adProductsFromOps().find(p => p.id === adWorkflowState.selectedProductId) || adProductsFromOps()[0];
  const social = (typeof socialData !== 'undefined' ? socialData : [])[Number(adWorkflowState.selectedSocialIndex)||0];
  const baseName = adWorkflowState.type === 'social' ? (social?.title || '社群內容推廣') : adWorkflowState.type === 'event' ? '活動促銷素材' : adWorkflowState.type === 'brand' ? '品牌宣傳素材' : (selectedProduct?.name || '商品素材');
  const objective = adWorkflowState.objective || '提高商品銷售';
  const objectiveMeta = adObjectiveOptions[objective] || adObjectiveOptions['提高商品銷售'];
  const isGoogle = platform.includes('Google');
  const platformGoal = isGoogle ? objectiveMeta.googleGoal : objectiveMeta.metaGoal;
  const platformLabel = isGoogle ? 'Google Ads' : 'Meta Ads';
  const titlePack = isGoogle ? [`${baseName} 官方推薦`,`${objective} 專屬方案`,`${baseName} 立即查看`] : [`${baseName} 今日推薦`,`這個內容值得被更多人看到`,`現在就把 ${baseName} 加進你的清單`];
  const copyPack = [`以「${objective}」為目標，聚焦平台適合的使用情境與行動誘因。`,`${platform} 版本會依後台欄位拆成標題、主文案與 CTA，方便直接複製。`,`此素材引用「${baseName}」，可延伸為圖片與短影音版位。`];
  const imageDirection = isGoogle
    ? `圖片方向｜商品清楚置中，保留標題與 CTA 空間。\n適用版位｜Performance Max、Demand Gen、多媒體廣告。\n構圖提醒｜文字不要過多，主視覺需在小尺寸仍可辨識。`
    : `圖片方向｜人物情境 + 商品近景，第一眼有社群滑動停止感。\n適用版位｜Facebook / Instagram 動態牆、限動靜態圖。\n構圖提醒｜保留上方或中段文字安全區，CTA 放在視線結尾。`;
  const videoScript = isGoogle
    ? `0-3s｜直接呈現商品/活動利益點，讓使用者知道為何要看。\n3-10s｜展示使用情境、賣點或優惠。\n10-15s｜收斂到 CTA：立即查看 / 了解更多。\n版位提醒｜可延伸 YouTube Shorts、YouTube in-stream、Demand Gen 影片。`
    : `0-3s｜用痛點、好奇或優惠開場，讓使用者停止滑動。\n3-8s｜快速展示商品/活動情境。\n8-13s｜補上核心利益與信任感。\n13-15s｜CTA：立即選購 / 私訊了解 / 點擊連結。`;
  const recommendation = `使用者目的｜${objective}\n${platformLabel} 建議目標｜${platformGoal}\n建議原因｜目前選擇 ${platformLabel}，AI 會依「${platformGoal}」的後台目標方向生成素材。`;
  const blocks = [
    `<div class="result-card"><h3>平台目標建議</h3><pre>${recommendation}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button></div></div>`
  ];
  if(adOutputIncludes('標題')) blocks.push(`<div class="result-card"><h3>標題包</h3><pre>${titlePack.map((x,i)=>`${i+1}. ${x}`).join('\n')}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('標題包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('標題包')">重新生成</button></div></div>`);
  if(adOutputIncludes('文案')) blocks.push(`<div class="result-card"><h3>文案包</h3><pre>${copyPack.map((x,i)=>`${i+1}. ${x}`).join('\n\n')}\n\nCTA 建議｜${isGoogle?'立即查看':'立即行動'}</pre><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('文案包', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('文案包')">重新生成</button></div></div>`);
  if(adOutputIncludes('圖片')) blocks.push(`<div class="result-card"><h3>圖片方向</h3><div class="creative-bundle"><div class="creative-preview ad">📣<br>${platform}<br><span class="muted">圖片素材</span></div><pre>${imageDirection}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('圖片方向', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('圖片方向')">重新生成</button></div></div>`);
  if(adOutputIncludes('影片')) blocks.push(`<div class="result-card"><h3>影音素材：影片腳本 / 分鏡</h3><div class="creative-bundle"><div class="creative-preview video"><span class="muted" style="color:#fff">短影音 / 廣告影片</span></div><pre>${videoScript}</pre></div><div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('影音素材：影片腳本 / 分鏡', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('影片腳本 / 分鏡')">重新生成</button></div></div>`);
  return `<div class="ad-workspace-platform" data-platform="${platform}">${blocks.join('')}</div>`;
}

renderAdWorkspace = function(platforms, mode='new'){
  adWorkflowState.activeWorkspacePlatform = adWorkflowState.activeWorkspacePlatform && platforms.includes(adWorkflowState.activeWorkspacePlatform) ? adWorkflowState.activeWorkspacePlatform : platforms[0];
  const active = adWorkflowState.activeWorkspacePlatform;
  const tabs = platforms.map(p => `<button class="tab ${p===active?'active':''}" onclick="switchAdWorkspaceTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p => `<div class="workspace-panel ${p===active?'active':''}" data-ad-panel="${p}">${adWorkspaceBlockPlatformGoalOnly(p, mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="ad-workspace"><div class="social-workspace-head"><div><h2 style="margin:0 0 6px">廣告素材工作區</h2><p class="muted" style="margin:0">依目前選擇的平台與廣告目的產出後台目標建議、標題、文案與素材方向。</p></div><div class="social-workspace-actions"><button class="btn" onclick="generateCreative()">重新生成全部</button><button class="btn primary" onclick="saveActiveAdPlatformVersion()">儲存目前平台版本</button></div></div><div class="workspace-tabs ad-workspace-tabs">${tabs}</div>${panels}</div>`;
};

/* 2026-07-14 Social content flow restructure */
function socialContentTypesSelected(){
  const items = selectedPicks('.social-content-type-picks');
  return items.length ? items : ['一般貼文'];
}

socialSourceCards = function(){
  const src = socialWorkflowState.source || 'product';
  return `<div class="ad-type-grid social-source-cards-grid" role="radiogroup" aria-label="AI 參考內容">
    <button type="button" class="ad-type-card social-source-choice ${src==='product'?'active':''}" onclick="setSocialSource('product',this)"><b>引用商品</b><span>引用已上架商品，產生商品分享貼文與影音腳本。</span></button>
    <button type="button" class="ad-type-card social-source-choice ${src==='ad'?'active':''}" onclick="setSocialSource('ad',this)"><b>引用廣告</b><span>將既有廣告素材改寫成自然發布內容。</span></button>
    <button type="button" class="ad-type-card social-source-choice ${src==='social'?'active':''}" onclick="setSocialSource('social',this)"><b>引用既有社群內容</b><span>延伸既有貼文、限動或短影音成新版本。</span></button>
    <button type="button" class="ad-type-card social-source-choice ${src==='new'?'active':''}" onclick="setSocialSource('new',this)"><b>全新建立</b><span>直接建立品牌、活動、知識或日常內容。</span></button>
  </div>`;
};

renderSocialSourceFields = function(){
  const box = document.getElementById('socialSourceFields');
  if(!box) return;
  const src = socialWorkflowState.source || 'product';
  if(src === 'product'){
    box.innerHTML = `<label>選擇已上架商品</label><div class="social-source-toolbar"><input class="search" id="socialSourceSearch" placeholder="搜尋商品名稱、平台、SKU 或狀態..." oninput="renderSocialSourceList('product')"><span class="social-source-count" id="socialSourceCount"></span></div><div class="social-pick-list" id="socialSourceList"></div><div class="social-mini-note">AI 會引用商品名稱、平台文案、商品特色與主圖。</div>`;
    renderSocialSourceList('product');
    return;
  }
  if(src === 'ad'){
    box.innerHTML = `<label>選擇既有廣告</label><div class="social-source-toolbar"><input class="search" id="socialSourceSearch" placeholder="搜尋廣告名稱、平台、商品或投放狀態..." oninput="renderSocialSourceList('ad')"><span class="social-source-count" id="socialSourceCount"></span></div><div class="social-pick-list" id="socialSourceList"></div><div class="social-mini-note">AI 會將廣告主張、CTA 與素材方向改寫成自然發布內容。</div>`;
    renderSocialSourceList('ad');
    return;
  }
  if(src === 'social'){
    const list = (typeof socialData !== 'undefined' ? socialData : []);
    box.innerHTML = `<label>選擇既有社群內容</label><div class="social-pick-list">${list.map((s,i)=>`<div class="social-pick-row ${Number(socialWorkflowState.selectedExistingIndex||0)===i?'active':''}" onclick="selectExistingSocialContent(${i});this.parentElement.querySelectorAll('.social-pick-row').forEach(x=>x.classList.remove('active'));this.classList.add('active')"><div class="social-thumb">${s.platform}</div><div><b>${s.title}</b><p class="muted" style="margin:4px 0 0">${s.date}｜${s.copy}</p></div><span class="tag">${s.status}</span></div>`).join('')}</div><div class="social-mini-note">AI 會引用既有內容表現與文字，延伸成其他平台或內容型態。</div>`;
    return;
  }
  box.innerHTML = `<label>內容主題</label><input id="socialNewTopic" placeholder="例如：夏天如何挑選不悶腳的鞋 / 品牌日常 / 618活動預告"><label>內容方向</label><textarea id="socialNewBrief" placeholder="請輸入想分享的重點、活動資訊、知識主題或品牌想傳達的內容。"></textarea><label>內容類型</label><div class="goal-picks social-kind-picks">${['商品靈感','活動公告','品牌故事','知識教學','粉絲互動','幕後日常'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div>`;
};

function socialInfoTip(title, desc, example, tone){
  return `<span class="style-info" tabindex="0">!<span class="style-tooltip"><b>${title}</b><small>${desc}</small><em>範例</em><p>${example}</p><em>適合語氣</em><p>${tone}</p></span></span>`;
}

function socialStyleOptionsHtml(){
  const styles = [
    ['生活感','像朋友分享日常生活，適合服飾、日用品、居家與輕鬆品牌內容。','今天穿著它去咖啡廳，舒服到走了一整天都沒負擔。白色真的超百搭，牛仔褲、洋裝都很好搭。','自然、親近、日常、輕鬆。'],
    ['品牌質感','適合想強化品牌形象、質感生活、精品感或設計感的社群內容。','極簡設計，源自對細節的堅持。每一步，都展現舒適與品味。','沉穩、簡潔、精緻、有留白。'],
    ['活潑親切','像社群小編與粉絲聊天，適合互動、留言、活動預告與新品暖身。','今天這雙真的可以直接列入週末出門清單！想走可愛路線還是韓系街頭感？留言告訴我們。','輕快、互動、親切、有溫度。'],
    ['專業知識','適合教學、選購指南、QA、材質說明與知識型社群內容。','EVA 中底具有良好的回彈性，長時間步行能降低足部疲勞，適合通勤與日常行走。','清楚、可信、教學感、資訊完整。'],
    ['促購導向','適合活動檔期、限時優惠、導購貼文與需要明確行動引導的內容。','限時優惠開跑！今天下單立即免運，熱門尺寸補貨到位，售完就要等下一波。','直接、有行動感、強調優惠與稀缺性。']
  ];
  return styles.map((s,i)=>`<label class="social-style-option ${i===0?'active':''}" onclick="selectSocialStyle(this,'${s[0]}')"><input type="radio" name="socialTone" value="${s[0]}" ${i===0?'checked':''}><span>${s[0]}</span>${socialInfoTip(s[0],s[1],s[2],s[3])}</label>`).join('');
}

function socialPurposeOptionsHtml(){
  const purposes = [
    ['讓更多人看到','適合新品曝光、品牌聲量、活動預告，重點是讓內容容易被理解與分享。','新品上市前 3 天，用一則短影音快速讓粉絲知道這次主打什麼。','清楚、好懂、第一眼有記憶點。'],
    ['讓粉絲互動','適合想要留言、投票、收藏、分享的內容，重點是設計互動題目。','你會選白色還是杏色？留言告訴我們，抽一位送新品折扣券。','親切、提問式、有參與感。'],
    ['帶大家了解產品','適合商品特色、使用情境、差異化賣點，重點是把好處說清楚。','3 個理由告訴你，為什麼這雙鞋適合每天通勤。','清楚、具體、生活化。'],
    ['引導點擊或私訊','適合活動導流、預約、詢問、導購，重點是自然引導下一步。','想看更多尺寸與穿搭範例？點連結或私訊我們。','明確、自然、有行動感。'],
    ['建立品牌印象','適合品牌故事、理念、幕後、形象內容，重點是累積信任與辨識度。','每一次設計，都從日常真正會遇到的需求開始。','沉穩、有溫度、有品牌感。'],
    ['教育與知識分享','適合教學、選購指南、FAQ、保養方式，重點是提供可收藏的資訊。','鞋底怎麼挑才不容易累？先看這 3 個重點。','專業、清楚、可收藏。']
  ];
  return purposes.map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p[0]}${socialInfoTip(p[0],p[1],p[2],p[3])}</button>`).join('');
}

function renderSocialCreativeFormRestructured(){
  const mode = window.creativeMode || 'new';
  const list = (typeof socialData !== 'undefined' ? socialData : []);
  if(mode !== 'new'){
    return `<div class="creative-form social-flow"><h3>優化現有社群內容</h3>
      <div class="flow-block"><span class="flow-step">STEP 1</span><label>選擇現有社群內容</label><select id="existingSocialSelect" onchange="selectExistingSocialContent(this.value)">${list.map((s,i)=>`<option value="${i}">${s.platform}｜${s.title}</option>`).join('')}</select><div id="existingSocialSummary" style="margin-top:12px"></div></div>
      <div class="flow-block"><span class="flow-step">STEP 2</span><label>選擇發布平台</label><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
      <div class="flow-block"><span class="flow-step">STEP 3</span><label>選擇內容型態（可複選）</label><p class="mini-hint">AI 會依勾選項目分別產生對應結果。</p><div class="content-picks social-content-type-picks">${['一般貼文','限動','Reels / Shorts','TikTok 短影音','Carousel','LINE 圖文'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
      <div class="flow-block"><span class="flow-step">STEP 4</span><label>內容風格與引用素材</label><div class="social-style-options" id="socialStyleOptions">${['生活感','品牌質感','活潑親切','專業知識','促購導向'].map((p,i)=>`<label class="social-style-option ${i===0?'active':''}" onclick="selectSocialStyle(this,'${p}')"><input type="radio" name="socialTone" value="${p}" ${i===0?'checked':''}><span>${p}</span></label>`).join('')}</div><input id="socialTone" type="hidden" value="生活感">${e2bAssetReferenceBlock()}</div>
      <div class="flow-block"><span class="flow-step">STEP 5</span><label>選擇要產出的內容（可複選）</label><div class="content-group-title">圖文內容</div><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','封面文字'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">影音內容</div><div class="content-picks">${['Reel腳本','分鏡腳本','字幕','配音稿'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片素材</div><div class="content-picks">${['社群圖片','Carousel圖片方向'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI調整社群內容</button></div>
    </div>`;
  }
  return `<div class="creative-form social-flow"><h3>建立全新社群內容包</h3>
    <div class="flow-block"><span class="flow-step">STEP 1</span><h3 style="margin:10px 0 4px">選擇內容來源</h3><p class="mini-hint">社群內容用於自然發布與帳號經營，可引用商品、廣告、既有內容或全新建立。</p>${socialSourceCards()}<div id="socialSourceFields" style="margin-top:14px"></div></div>
    <div class="flow-block"><span class="flow-step">STEP 2</span><label>選擇發布平台</label><div class="platform-picks">${['IG','FB','Threads','TikTok','Shorts','LINE'].map((p,i)=>`<button class="pick ${i===0||i===3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
    <div class="flow-block"><span class="flow-step">STEP 3</span><label>選擇內容型態（可複選）</label><p class="mini-hint">可同時產生貼文、限動、短影音、Carousel 或 LINE 圖文。</p><div class="content-picks social-content-type-picks">${['一般貼文','限動','Reels / Shorts','TikTok 短影音','Carousel','LINE 圖文'].map((p,i)=>`<button class="pick ${i<3?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><label>發布目的</label><div class="goal-picks">${['提高互動','推廣商品','建立品牌感','活動導流','知識教育','累積粉絲信任'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div></div>
    <div class="flow-block"><span class="flow-step">STEP 4</span><label>內容風格與引用素材</label><div class="social-style-options" id="socialStyleOptions">${['生活感','品牌質感','活潑親切','專業知識','促購導向'].map((p,i)=>`<label class="social-style-option ${i===0?'active':''}" onclick="selectSocialStyle(this,'${p}')"><input type="radio" name="socialTone" value="${p}" ${i===0?'checked':''}><span>${p}</span></label>`).join('')}</div><input id="socialTone" type="hidden" value="生活感">${e2bAssetReferenceBlock()}</div>
    <div class="flow-block"><span class="flow-step">STEP 5</span><label>選擇要產出的內容（可複選）</label><div class="content-group-title">圖文內容</div><div class="content-picks">${['Caption','Hashtag','留言引導','限動文案','封面文字'].map((p,i)=>`<button class="pick ${i<4?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">影音內容</div><div class="content-picks">${['Reel腳本','分鏡腳本','字幕','配音稿'].map((p,i)=>`<button class="pick ${i<2?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><div class="content-group-title">圖片素材</div><div class="content-picks">${['社群圖片','Carousel圖片方向'].map((p,i)=>`<button class="pick ${i===0?'active':''}" onclick="togglePick(this)">${p}</button>`).join('')}</div><button class="btn primary" style="height:48px" onclick="generateCreative()">✦ AI 建立社群內容包</button></div>
  </div>`;
}

function socialResultActions(title){
  return `<div class="result-actions"><button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="openAiAdjustModal('${safeJs(title)}', this.closest('.result-card')?.innerText||'')">AI調整</button><button class="btn" onclick="confirmRegenerateBlock('${safeJs(title)}')">重新生成</button></div>`;
}

function socialPackageBlockByTypes(platform, mode){
  const outs = socialOutputSelected();
  const types = socialContentTypesSelected();
  const title = socialSourceTitle();
  const tone = document.getElementById('socialTone')?.value || '生活感';
  const blocks = [];
  if(types.includes('一般貼文')){
    if(outs.includes('Caption')) blocks.push(`<div class="result-card"><h3>一般貼文 Caption</h3><pre class="editable-copy" contenteditable="true">${title}，把日常穿出自己的節奏。\n\n這次想用更自然的方式分享給你：好搭、好懂，也好行動。收藏這則，下次出門前直接照著搭。</pre>${socialResultActions('一般貼文 Caption')}</div>`);
    if(outs.includes('Hashtag')) blocks.push(`<div class="result-card"><h3>一般貼文 Hashtag</h3><pre class="editable-copy" contenteditable="true">#日常穿搭 #新品分享 #質感生活 #社群內容 #${platform}</pre>${socialResultActions('一般貼文 Hashtag')}</div>`);
    if(outs.includes('留言引導')) blocks.push(`<div class="result-card"><h3>留言引導</h3><pre class="editable-copy" contenteditable="true">你會把這個內容推薦給哪個朋友？留言告訴我們你的選擇。</pre>${socialResultActions('留言引導')}</div>`);
  }
  if(types.includes('限動')){
    blocks.push(`<div class="result-card"><h3>限動內容</h3><pre class="editable-copy" contenteditable="true">第 1 張｜今天這則先收藏\n第 2 張｜3 個亮點快速看懂\n第 3 張｜點擊連結看完整內容\n互動貼紙｜你最在意哪一點？舒適 / 外型 / 優惠</pre>${socialResultActions('限動內容')}</div>`);
  }
  if(types.includes('Reels / Shorts') || types.includes('TikTok 短影音')){
    blocks.push(`<div class="result-card"><h3>短影音腳本 / 分鏡</h3><pre class="editable-copy" contenteditable="true">0-3s｜鉤子：你是不是也想讓日常看起來更有精神？\n3-7s｜展示：${title} 的主要情境與第一個亮點。\n7-12s｜重點：三個亮點快速列出，搭配字幕。\n12-15s｜收尾：收藏這則，下次直接照做。</pre>${socialResultActions('短影音腳本 / 分鏡')}</div>`);
    if(outs.includes('字幕')) blocks.push(`<div class="result-card"><h3>短影音字幕</h3><pre class="editable-copy" contenteditable="true">今天分享一個日常小靈感。\n好看不一定要複雜。\n把重點放對，整體就會很有感。</pre>${socialResultActions('短影音字幕')}</div>`);
    if(outs.includes('配音稿')) blocks.push(`<div class="result-card"><h3>配音稿</h3><pre class="editable-copy" contenteditable="true">如果你也想讓日常穿搭更輕鬆，這個方向可以先收藏。從情境、重點到搭配方式，一次整理給你。</pre>${socialResultActions('配音稿')}</div>`);
  }
  if(types.includes('Carousel')){
    blocks.push(`<div class="result-card"><h3>Carousel 圖文架構</h3><pre class="editable-copy" contenteditable="true">第 1 張｜主標：今天的日常靈感\n第 2 張｜痛點：為什麼需要它\n第 3 張｜亮點 1：最直接的好處\n第 4 張｜亮點 2：使用情境\n第 5 張｜收藏 / 留言引導</pre>${socialResultActions('Carousel 圖文架構')}</div>`);
  }
  if(types.includes('LINE 圖文')){
    blocks.push(`<div class="result-card"><h3>LINE 圖文訊息</h3><pre class="editable-copy" contenteditable="true">標題｜本週精選內容\n內文｜幫你整理好最適合現在看的內容，點開就能快速了解重點。\n按鈕｜查看詳情 / 立即收藏</pre>${socialResultActions('LINE 圖文訊息')}</div>`);
  }
  if(outs.includes('社群圖片') || outs.includes('Carousel圖片方向') || outs.includes('封面文字')){
    blocks.push(`<div class="result-card"><h3>圖片 / 封面方向</h3><div class="social-package-preview">${platform} 視覺方向<br><span class="muted">${tone}｜${types.join('、')}</span></div><pre class="editable-copy" contenteditable="true">圖片方向｜乾淨主視覺 + 明確文字留白。\n封面文字｜把重點放在 8-12 字內，第一眼可讀。\n版位提醒｜依 ${platform} 與內容型態裁切 4:5、1:1 或 9:16。</pre>${socialResultActions('圖片 / 封面方向')}</div>`);
  }
  return `<div class="social-platform-panel active">${blocks.join('') || `<div class="result-card"><h3>社群內容包</h3><pre class="editable-copy" contenteditable="true">${title}｜${platform}｜${tone}</pre>${socialResultActions('社群內容包')}</div>`}</div>`;
}

renderSocialWorkspace = function(platforms, mode){
  socialWorkflowState.activePlatform = socialWorkflowState.activePlatform && platforms.includes(socialWorkflowState.activePlatform) ? socialWorkflowState.activePlatform : platforms[0];
  const active = socialWorkflowState.activePlatform;
  const tabs = platforms.map(p=>`<button class="${p===active?'active':''}" onclick="switchSocialTab('${p}',this)">${p}</button>`).join('');
  const panels = platforms.map(p=>`<div class="social-platform-panel ${p===active?'active':''}" data-social-panel="${p}">${socialPackageBlockByTypes(p,mode)}</div>`).join('');
  document.getElementById('creativeResult').innerHTML = `<div class="result-stack"><div class="social-workspace-head"><div><h2 style="margin:0 0 6px">社群內容工作區</h2><p class="muted" style="margin:0">依選擇的平台與內容型態，分別產生自然發布用內容包。</p></div><div class="social-workspace-actions"><button class="btn" onclick="generateCreative()">重新生成全部</button><button class="btn primary" onclick="saveCurrentSocialPlatformVersion()">儲存目前平台版本</button></div></div><div class="social-platform-tabs">${tabs}</div>${panels}</div>`;
};

const E2B_RENDER_BEFORE_SOCIAL_RESTRUCTURED = renderCreativeForm;
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'social'){
    document.getElementById('creativeForm').innerHTML = renderSocialCreativeFormRestructured();
    if((window.creativeMode||'new') === 'new') renderSocialSourceFields(); else renderExistingSocialSummary();
    return;
  }
  return E2B_RENDER_BEFORE_SOCIAL_RESTRUCTURED();
};

const E2B_RENDER_BEFORE_SOCIAL_TIPS_FINAL = renderCreativeForm;
renderCreativeForm = function(){
  const type = window.creativeType || 'product';
  if(type === 'social'){
    document.getElementById('creativeForm').innerHTML = renderSocialCreativeFormWithTips();
    if((window.creativeMode||'new') === 'new') renderSocialSourceFields(); else renderExistingSocialSummary();
    return;
  }
  return E2B_RENDER_BEFORE_SOCIAL_TIPS_FINAL();
};



/* v4.0.1 product result block action fixer */
(function(){
  if(window.E2B_PRODUCT_ACTION_FIX_READY) return;
  window.E2B_PRODUCT_ACTION_FIX_READY = true;

  function productBlockTitle(block){
    return (block?.querySelector('h3')?.textContent || '內容').trim();
  }
  function productBlockText(block){
    const c=block.cloneNode(true);
    c.querySelectorAll('button,.block-toolbar,.result-actions,.e2b-v4-actions').forEach(x=>x.remove());
    return (c.textContent||'').trim();
  }
  function patchProductBlocks(){
    const root=document.getElementById('creativeResult');
    if(!root) return;
    root.querySelectorAll('.product-result-block').forEach(block=>{
      const title=productBlockTitle(block);
      const isImage=/圖片|主圖|視覺|Banner|素材/.test(title + ' ' + block.textContent);
      block.querySelectorAll('.block-toolbar,.e2b-v4-actions').forEach(x=>x.remove());
      const bar=document.createElement('div');
      bar.className='block-toolbar e2b-v4-actions';
      if(isImage){
        bar.innerHTML = `<button class="btn" onclick="e2bConfirmRegenerate('${safeJs(title)}')">重新生成</button><button class="btn" onclick="e2bOpenAiAdjustModal('${safeJs(title)}', this.closest('.product-result-block')?.innerText||'')">AI調整</button>`;
      }else{
        bar.innerHTML = `<button class="btn" onclick="copyText(this)">複製</button><button class="btn" onclick="e2bOpenAiAdjustModal('${safeJs(title)}', this.closest('.product-result-block')?.innerText||'')">AI調整</button><button class="btn" onclick="e2bConfirmRegenerate('${safeJs(title)}')">重新生成</button>`;
      }
      block.appendChild(bar);
    });
  }

  const oldNorm = window.e2bNormalizeCreativeActions;
  window.e2bNormalizeCreativeActions = function(){
    if(typeof oldNorm === 'function') oldNorm();
    patchProductBlocks();
  };

  ['generateCreative','switchProductContentTab','switchCopyVersionTab','setCreativeMode','renderCreative'].forEach(fn=>{
    if(typeof window[fn] === 'function' && !window[fn].__productActionFixWrapped){
      const original=window[fn];
      const wrapped=function(){
        const result=original.apply(this,arguments);
        setTimeout(patchProductBlocks,0);
        setTimeout(patchProductBlocks,80);
        return result;
      };
      wrapped.__productActionFixWrapped=true;
      window[fn]=wrapped;
    }
  });

  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(patchProductBlocks,100);
    const target=document.getElementById('creativeResult');
    if(target) new MutationObserver(()=>setTimeout(patchProductBlocks,0)).observe(target,{childList:true,subtree:true});
  });
})();





