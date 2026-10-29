(() => {
  // Source: E2B｜系統功能與訂閱方案對照表.pdf (2026-10-01 18:08; all 3 supplied pages visually verified).
  const plans = [
  {
    "name": "Lite",
    "tag": "輕量版",
    "price": 4500,
    "quotas": [
      "帳號數：1",
      "品牌數：1",
      "限制空間容量 (GB)：待設定"
    ],
    "features": [
      "品牌知識庫上傳",
      "AI 點數用量與使用紀錄",
      "檔案儲存容量總覽",
      "定時週報（全域成長報告）",
      "AI 智能客服（RAG 問答＋意圖情緒分析）",
      "網站 Widget／LINE 客服渠道",
      "登入、登出與忘記密碼",
      "淺色／深色模式"
    ],
    "groups": [
      {
        "module": "AI 核心與數據中心",
        "features": [
          "品牌知識庫上傳",
          "AI 點數用量與使用紀錄",
          "檔案儲存容量總覽"
        ]
      },
      {
        "module": "全域洞察與決策中心",
        "features": [
          "定時週報（全域成長報告）"
        ]
      },
      {
        "module": "客服與導購中心（nexus）",
        "features": [
          "AI 智能客服（RAG 問答＋意圖情緒分析）",
          "網站 Widget／LINE 客服渠道"
        ]
      },
      {
        "module": "帳號與共用功能",
        "features": [
          "登入、登出與忘記密碼",
          "淺色／深色模式"
        ]
      }
    ]
  },
  {
    "name": "Starter",
    "tag": "入門版",
    "price": 8500,
    "quotas": [
      "帳號數：3",
      "品牌數：1",
      "限制空間容量 (GB)：待設定"
    ],
    "features": [
      "全域指標總覽儀表板（尚未規劃）",
      "品牌知識庫上傳",
      "AI 點數用量與使用紀錄",
      "檔案儲存容量總覽",
      "商品基本列表",
      "商品內容生成",
      "內容資產庫",
      "素材庫",
      "PDF 報告下載",
      "定時週報（全域成長報告）",
      "AI 智能客服（RAG 問答＋意圖情緒分析）",
      "網站 Widget／LINE 客服渠道",
      "登入、登出與忘記密碼",
      "淺色／深色模式"
    ],
    "groups": [
      {
        "module": "Dashboard",
        "features": [
          "全域指標總覽儀表板（尚未規劃）"
        ]
      },
      {
        "module": "AI 核心與數據中心",
        "features": [
          "品牌知識庫上傳",
          "AI 點數用量與使用紀錄",
          "檔案儲存容量總覽"
        ]
      },
      {
        "module": "營運分析模組",
        "features": [
          "商品基本列表"
        ]
      },
      {
        "module": "創意與文案中心",
        "features": [
          "商品內容生成"
        ]
      },
      {
        "module": "資產庫模組",
        "features": [
          "內容資產庫",
          "素材庫"
        ]
      },
      {
        "module": "全域洞察與決策中心",
        "features": [
          "PDF 報告下載",
          "定時週報（全域成長報告）"
        ]
      },
      {
        "module": "客服與導購中心（nexus）",
        "features": [
          "AI 智能客服（RAG 問答＋意圖情緒分析）",
          "網站 Widget／LINE 客服渠道"
        ]
      },
      {
        "module": "帳號與共用功能",
        "features": [
          "登入、登出與忘記密碼",
          "淺色／深色模式"
        ]
      }
    ]
  },
  {
    "name": "Growth",
    "tag": "拓展版",
    "price": 14200,
    "quotas": [
      "帳號數：5",
      "品牌數：1",
      "限制空間容量 (GB)：待設定"
    ],
    "features": [
      "全域指標總覽儀表板（尚未規劃）",
      "品牌知識庫上傳",
      "Google Drive 雲端匯入",
      "廣告平台串接（Meta Ads／Google Ads）",
      "AI 點數用量與使用紀錄",
      "檔案儲存容量總覽",
      "商品基本列表",
      "客群基本列表",
      "社群影音基本列表",
      "廣告列表",
      "競品來源與追蹤清單",
      "商品內容生成",
      "圖片創作",
      "內容資產庫",
      "素材庫",
      "PDF 報告下載",
      "定時週報（全域成長報告）",
      "AI 智能客服（RAG 問答＋意圖情緒分析）",
      "網站 Widget／LINE 客服渠道",
      "登入、登出與忘記密碼",
      "淺色／深色模式"
    ],
    "groups": [
      {
        "module": "Dashboard",
        "features": [
          "全域指標總覽儀表板（尚未規劃）"
        ]
      },
      {
        "module": "AI 核心與數據中心",
        "features": [
          "品牌知識庫上傳",
          "Google Drive 雲端匯入",
          "廣告平台串接（Meta Ads／Google Ads）",
          "AI 點數用量與使用紀錄",
          "檔案儲存容量總覽"
        ]
      },
      {
        "module": "營運分析模組",
        "features": [
          "商品基本列表",
          "客群基本列表",
          "社群影音基本列表"
        ]
      },
      {
        "module": "廣告效益分析",
        "features": [
          "廣告列表"
        ]
      },
      {
        "module": "市場／競品情報",
        "features": [
          "競品來源與追蹤清單"
        ]
      },
      {
        "module": "創意與文案中心",
        "features": [
          "商品內容生成",
          "圖片創作"
        ]
      },
      {
        "module": "資產庫模組",
        "features": [
          "內容資產庫",
          "素材庫"
        ]
      },
      {
        "module": "全域洞察與決策中心",
        "features": [
          "PDF 報告下載",
          "定時週報（全域成長報告）"
        ]
      },
      {
        "module": "客服與導購中心（nexus）",
        "features": [
          "AI 智能客服（RAG 問答＋意圖情緒分析）",
          "網站 Widget／LINE 客服渠道"
        ]
      },
      {
        "module": "帳號與共用功能",
        "features": [
          "登入、登出與忘記密碼",
          "淺色／深色模式"
        ]
      }
    ]
  },
  {
    "name": "Pro",
    "tag": "專業版",
    "price": 19000,
    "quotas": [
      "帳號數：10",
      "品牌數：1",
      "限制空間容量 (GB)：待設定"
    ],
    "features": [
      "全域指標總覽儀表板（尚未規劃）",
      "異常即時預警（尚未規劃）",
      "品牌知識庫上傳",
      "Google Drive 雲端匯入",
      "廣告平台串接（Meta Ads／Google Ads）",
      "AI 點數用量與使用紀錄",
      "檔案儲存容量總覽",
      "商品基本列表",
      "商品分析（AI 診斷評分）",
      "客群基本列表",
      "社群影音基本列表",
      "廣告列表",
      "廣告效益分析（AI 診斷評分）",
      "競品來源與追蹤清單",
      "競品品牌定位、商品賣點、價格帶與促銷分析",
      "商品內容生成",
      "廣告內容生成",
      "社群內容生成（約 10 秒影音）",
      "圖片創作",
      "內容資產庫",
      "素材庫",
      "歷史報告列表（固定保留最新一筆資料）",
      "PDF 報告下載",
      "定時週報（全域成長報告）",
      "品牌健檢報告（AI 診斷）",
      "AI 智能客服（RAG 問答＋意圖情緒分析）",
      "網站 Widget／LINE 客服渠道",
      "登入、登出與忘記密碼",
      "淺色／深色模式"
    ],
    "groups": [
      {
        "module": "Dashboard",
        "features": [
          "全域指標總覽儀表板（尚未規劃）",
          "異常即時預警（尚未規劃）"
        ]
      },
      {
        "module": "AI 核心與數據中心",
        "features": [
          "品牌知識庫上傳",
          "Google Drive 雲端匯入",
          "廣告平台串接（Meta Ads／Google Ads）",
          "AI 點數用量與使用紀錄",
          "檔案儲存容量總覽"
        ]
      },
      {
        "module": "營運分析模組",
        "features": [
          "商品基本列表",
          "商品分析（AI 診斷評分）",
          "客群基本列表",
          "社群影音基本列表"
        ]
      },
      {
        "module": "廣告效益分析",
        "features": [
          "廣告列表",
          "廣告效益分析（AI 診斷評分）"
        ]
      },
      {
        "module": "市場／競品情報",
        "features": [
          "競品來源與追蹤清單",
          "競品品牌定位、商品賣點、價格帶與促銷分析"
        ]
      },
      {
        "module": "創意與文案中心",
        "features": [
          "商品內容生成",
          "廣告內容生成",
          "社群內容生成（約 10 秒影音）",
          "圖片創作"
        ]
      },
      {
        "module": "資產庫模組",
        "features": [
          "內容資產庫",
          "素材庫"
        ]
      },
      {
        "module": "全域洞察與決策中心",
        "features": [
          "歷史報告列表（固定保留最新一筆資料）",
          "PDF 報告下載",
          "定時週報（全域成長報告）",
          "品牌健檢報告（AI 診斷）"
        ]
      },
      {
        "module": "客服與導購中心（nexus）",
        "features": [
          "AI 智能客服（RAG 問答＋意圖情緒分析）",
          "網站 Widget／LINE 客服渠道"
        ]
      },
      {
        "module": "帳號與共用功能",
        "features": [
          "登入、登出與忘記密碼",
          "淺色／深色模式"
        ]
      }
    ]
  },
  {
    "name": "Enterprise",
    "tag": "企業版",
    "price": 23800,
    "quotas": [
      "帳號數：20",
      "品牌數：1",
      "限制空間容量 (GB)：待設定"
    ],
    "features": [
      "全域指標總覽儀表板（尚未規劃）",
      "異常即時預警（尚未規劃）",
      "星鏈圖譜（廣告受眾關聯／競品策略與降價關聯；待討論）",
      "品牌知識庫上傳",
      "Google Drive 雲端匯入",
      "企業網址匯入（商品頁／部落格／FAQ；待討論）",
      "廣告平台串接（Meta Ads／Google Ads）",
      "AI 點數用量與使用紀錄",
      "檔案儲存容量總覽",
      "商品基本列表",
      "商品分析（AI 診斷評分）",
      "客群基本列表",
      "客群分析（AI 診斷評分）",
      "社群影音基本列表",
      "社群影音分析（AI 診斷評分）",
      "廣告列表",
      "廣告效益分析（AI 診斷評分）",
      "競品來源與追蹤清單",
      "競品品牌定位、商品賣點、價格帶與促銷分析",
      "競品 SEO／關鍵字與社群內容分析",
      "商品內容生成",
      "廣告內容生成",
      "社群內容生成（約 10 秒影音）",
      "圖片創作",
      "內容資產庫",
      "素材庫",
      "歷史報告列表（固定保留最新一筆資料）",
      "PDF 報告下載",
      "定時週報（全域成長報告）",
      "品牌健檢報告（AI 診斷）",
      "AI 智能客服（RAG 問答＋意圖情緒分析）",
      "網站 Widget／LINE 客服渠道",
      "登入、登出與忘記密碼",
      "淺色／深色模式"
    ],
    "groups": [
      {
        "module": "Dashboard",
        "features": [
          "全域指標總覽儀表板（尚未規劃）",
          "異常即時預警（尚未規劃）",
          "星鏈圖譜（廣告受眾關聯／競品策略與降價關聯；待討論）"
        ]
      },
      {
        "module": "AI 核心與數據中心",
        "features": [
          "品牌知識庫上傳",
          "Google Drive 雲端匯入",
          "企業網址匯入（商品頁／部落格／FAQ；待討論）",
          "廣告平台串接（Meta Ads／Google Ads）",
          "AI 點數用量與使用紀錄",
          "檔案儲存容量總覽"
        ]
      },
      {
        "module": "營運分析模組",
        "features": [
          "商品基本列表",
          "商品分析（AI 診斷評分）",
          "客群基本列表",
          "客群分析（AI 診斷評分）",
          "社群影音基本列表",
          "社群影音分析（AI 診斷評分）"
        ]
      },
      {
        "module": "廣告效益分析",
        "features": [
          "廣告列表",
          "廣告效益分析（AI 診斷評分）"
        ]
      },
      {
        "module": "市場／競品情報",
        "features": [
          "競品來源與追蹤清單",
          "競品品牌定位、商品賣點、價格帶與促銷分析",
          "競品 SEO／關鍵字與社群內容分析"
        ]
      },
      {
        "module": "創意與文案中心",
        "features": [
          "商品內容生成",
          "廣告內容生成",
          "社群內容生成（約 10 秒影音）",
          "圖片創作"
        ]
      },
      {
        "module": "資產庫模組",
        "features": [
          "內容資產庫",
          "素材庫"
        ]
      },
      {
        "module": "全域洞察與決策中心",
        "features": [
          "歷史報告列表（固定保留最新一筆資料）",
          "PDF 報告下載",
          "定時週報（全域成長報告）",
          "品牌健檢報告（AI 診斷）"
        ]
      },
      {
        "module": "客服與導購中心（nexus）",
        "features": [
          "AI 智能客服（RAG 問答＋意圖情緒分析）",
          "網站 Widget／LINE 客服渠道"
        ]
      },
      {
        "module": "帳號與共用功能",
        "features": [
          "登入、登出與忘記密碼",
          "淺色／深色模式"
        ]
      }
    ]
  }
];
  window.e2bPlans=plans;
  const key='e2b.subscription.demo.v1';
  let state={plan:1,start:'2026-09-01',end:'2027-08-31'};
  try { const saved=JSON.parse(localStorage.getItem(key)); if(saved && Number.isInteger(saved.plan) && plans[saved.plan]) state.plan=saved.plan; } catch {}
  let history=[];
  try { const saved=JSON.parse(localStorage.getItem(key)); if(Array.isArray(saved?.history)) history=saved.history.filter(e=>e&&['subscribe','upgrade'].includes(e.type)&&Number.isInteger(e.plan)&&plans[e.plan]&&(e.from===null||(Number.isInteger(e.from)&&plans[e.from]))&&typeof e.at==='string'&&Number.isFinite(Date.parse(e.at))); } catch {}
  const legacyHistory=state.plan!==1&&history.length===0;
  if(!history.length&&!legacyHistory)history=[{type:'subscribe',plan:1,from:null,at:'2026-09-01T00:00:00+08:00'}];
  let historyIncomplete=legacyHistory;
  try{historyIncomplete=historyIncomplete||JSON.parse(localStorage.getItem(key))?.historyIncomplete===true;}catch{}
  window.e2bActivateSubscription=index=>{
    if(!plans[index])return;
    const now=new Date(), end=new Date(now);
    end.setMonth(end.getMonth()+1);
    const date=d=>d.toLocaleDateString('en-CA',{timeZone:'Asia/Taipei'});
    state={plan:index,start:date(now),end:date(end)};
    history=[{type:'subscribe',plan:index,from:null,at:now.toISOString()}];historyIncomplete=false;
    renderSummary();
  };
  const money=n=>'NT$ '+n.toLocaleString('en-US');
  const profile=document.getElementById('accountProfile');
  const footer=document.createElement('div');footer.className='subscription-footer';
  profile.before(footer);
  const summary=document.createElement('section');summary.className='subscription-summary';summary.setAttribute('aria-label','我的訂閱');
  footer.append(summary,profile);
  const modal=document.createElement('dialog');modal.className='subscription-dialog';modal.setAttribute('aria-labelledby','subscriptionTitle');
  document.body.append(modal);
  const menu=document.getElementById('accountMenu');
  const view=document.createElement('button');view.type='button';view.className='subscription-view';view.innerHTML='<span>訂閱管理</span><span aria-hidden="true">›</span>';
  const logout=menu.querySelector('button');
  const subscriptionGroup=document.createElement('section');subscriptionGroup.className='account-menu-group';subscriptionGroup.setAttribute('aria-label','訂閱與方案');
  subscriptionGroup.append(view);
  const companyGroup=document.createElement('section');companyGroup.className='account-menu-group';companyGroup.setAttribute('aria-label','公司管理');
  companyGroup.innerHTML='<button type="button" class="account-manage"><span>帳號管理</span><span aria-hidden="true">›</span></button>';
  const logoutGroup=document.createElement('section');logoutGroup.className='account-menu-group account-session';logoutGroup.append(logout);
  menu.replaceChildren(subscriptionGroup,companyGroup,logoutGroup);
  companyGroup.querySelector('button').onclick=()=>{
    menu.classList.remove('show');
    shell('<div class="subscription-confirm"><span class="subscription-eyebrow">COMPANY SETTINGS</span><h2 id="subscriptionTitle">帳號管理</h2><p>管理公司成員與存取權限。</p><div class="account-member"><strong>E2B Demo Account</strong><span>demo@e2b.ai</span><b>公司擁有者</b></div><p class="subscription-note">目前為帳號管理入口示意。邀請成員、角色設定與停用帳號功能尚未開放。</p></div>');
    modal.showModal();
  };
  profile.tabIndex=0;profile.setAttribute('aria-expanded','false');profile.setAttribute('aria-controls','accountMenu');
  const syncExpanded=()=>profile.setAttribute('aria-expanded',String(menu.classList.contains('show')));
  new MutationObserver(syncExpanded).observe(menu,{attributes:true,attributeFilter:['class']});
  profile.addEventListener('keydown',e=>{if(e.target===profile&&(e.key==='Enter'||e.key===' ')){e.preventDefault();profile.click();}if(e.key==='Escape'){menu.classList.remove('show');profile.focus();}});
  menu.addEventListener('click',e=>e.stopPropagation());
  view.onclick=()=>{menu.classList.remove('show');renderOverview();modal.showModal();modal.scrollTop=0;};
  function renderSummary(){
    summary.innerHTML=`<div class="subscription-summary-head"><strong>${plans[state.plan].name}</strong></div><p class="subscription-expiry">使用期限至 ${state.end.replaceAll('-','/')}</p>`;
  }
  function shell(content){
    modal.classList.remove('is-history');
    modal.setAttribute('aria-labelledby','subscriptionTitle');
    modal.innerHTML=`<button type="button" class="subscription-close" aria-label="關閉方案視窗">×</button>${content}`;
    modal.querySelector('.subscription-close').onclick=()=>modal.close();
  }
  function managementTabs(active){
    const content=document.createElement('div');content.id='subscriptionPanel';content.setAttribute('role','tabpanel');content.setAttribute('aria-labelledby','subscriptionTab-'+active);
    Array.from(modal.children).filter(el=>!el.classList.contains('subscription-close')).forEach(el=>content.append(el));
    const head=document.createElement('div');head.className='subscription-management-head';
    head.innerHTML='<h2 id="subscriptionManagementTitle">訂閱管理</h2><div class="subscription-tabs" role="tablist" aria-label="訂閱管理">'+[['overview','訂閱總覽'],['plans','訂閱方案'],['addons','加購點數／次數']].map(([id,label])=>`<button type="button" role="tab" id="subscriptionTab-${id}" aria-controls="subscriptionPanel" aria-selected="${active===id}" tabindex="${active===id?0:-1}" data-subscription-tab="${id}">${label}</button>`).join('')+'</div>';
    modal.append(head,content);modal.setAttribute('aria-labelledby','subscriptionManagementTitle');
    head.querySelectorAll('[role=tab]').forEach(button=>{
      const select=id=>{id==='plans'?renderPlans():id==='addons'?renderAddons():renderOverview();modal.querySelector('#subscriptionTab-'+id).focus();modal.scrollTop=0;};
      button.onclick=()=>select(button.dataset.subscriptionTab);
      button.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const ids=['overview','plans','addons'];select(e.key==='Home'?ids[0]:e.key==='End'?ids[2]:ids[(ids.indexOf(active)+(e.key==='ArrowRight'?1:2))%3]);}};
    });
  }
  function renderOverview(){
    renderHistory();
    const root=modal.querySelector('.subscription-history');
    root.querySelector('header').remove();root.querySelector('.subscription-history-summary').remove();
    const p=plans[state.plan];
    const quotas=p.quotas;
    const overview=document.createElement('section');overview.className='subscription-overview';
    overview.innerHTML=`<div class="subscription-overview-title"><div><span class="subscription-eyebrow">目前企業方案</span><h3>${p.name}</h3><p>${p.tag}</p></div><button type="button" class="btn primary" id="subscriptionUpgrade">${state.plan===plans.length-1?'查看訂閱方案':'升級方案'} <span aria-hidden="true">↗</span></button></div><dl class="subscription-overview-dates"><div><dt>訂閱開始時間</dt><dd>${state.start.replaceAll('-','/')}</dd></div><div><dt>訂閱結束時間</dt><dd>${state.end.replaceAll('-','/')}</dd></div><div><dt>方案月費（未稅）</dt><dd>${money(p.price)}<small>含稅 ${money(p.price*1.05)} / 月</small></dd></div></dl><div class="subscription-overview-features"><section><h4>方案包含功能</h4><p class="subscription-source-note">依 2026/10/01 方案 PDF 勾選列示；待討論／尚未規劃項目仍保留註記</p><ul>${p.groups.map(g=>`<li class="subscription-feature-group"><h5>${g.module}</h5><ul>${g.features.map(f=>`<li>${f}</li>`).join('')}</ul></li>`).join('')}</ul></section><section><h4>帳號與資源額度</h4><ul>${quotas.map(f=>`<li>${f}</li>`).join('')}</ul></section></div>`;
    overview.querySelector('.subscription-overview-dates').insertAdjacentHTML('afterend',window.e2bUsageOverviewMarkup());
    overview.querySelectorAll('[data-overview-addon]').forEach(button=>button.onclick=()=>window.e2bOpenAddons(button.dataset.overviewAddon));
    root.prepend(overview);
    modal.querySelector('#subscriptionUpgrade').onclick=()=>{renderPlans();modal.querySelector('#subscriptionTab-plans').focus();modal.scrollTop=0;};
    managementTabs('overview');
  }
  function renderHistory(){
    const date=at=>new Date(at).toLocaleString('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false});
    shell(`<div class="subscription-history"><header><span class="subscription-eyebrow">COMPANY SUBSCRIPTION</span><h2 id="subscriptionTitle">企業方案訂閱歷程</h2><p>查看企業的方案訂閱與異動紀錄。</p></header><div class="subscription-history-summary"><div><span>目前方案</span><strong>${plans[state.plan].name}</strong></div><div><span>使用期限</span><strong>${state.end.replaceAll('-','/')}</strong></div></div><div class="subscription-history-heading"><h3>訂閱紀錄</h3><span>最新紀錄在前 · 台北時間</span></div>${historyIncomplete?'<p class="subscription-note">先前版本未保存完整歷程；此處僅顯示已記錄的異動。</p>':''}<ol class="subscription-history-list">${[...history].reverse().map(e=>`<li><div class="subscription-history-event"><b>${e.type==='subscribe'?'首次訂閱':'方案升級'}</b><time>${date(e.at)}</time></div><h4>${e.from===null?'':plans[e.from].name+' <span aria-hidden="true">→</span> '}${plans[e.plan].name}</h4><p>使用期限至 ${state.end.replaceAll('-','/')}</p><span class="subscription-history-badge">示範紀錄 · 未扣款</span></li>`).join('')}</ol>${!history.length?'<p class="subscription-history-empty">尚無可顯示的訂閱異動紀錄。</p>':''}<footer class="subscription-note">目前顯示此瀏覽器的企業示範資料；正式企業訂閱歷程需串接後端。<br>升級確認後會新增紀錄，取消操作不會記錄。</footer></div>`);
  }
  function renderPlans(){
    shell(`<header class="subscription-heading"><span class="subscription-eyebrow">E2B SUBSCRIPTION</span><h2 id="subscriptionTitle">找到適合你的方案</h2><p>從日常營運到企業決策，隨時升級你的 AI 工作空間。</p><div class="subscription-current">目前方案 <b>${plans[state.plan].name}</b><span>訂閱期間 ${state.start.replaceAll('-','/')} — ${state.end.replaceAll('-','/')}</span></div></header><div class="subscription-grid">${plans.map((p,i)=>`<article class="subscription-plan ${i===state.plan?'is-current':''}"><div class="subscription-plan-label">${i===state.plan?'目前方案':i===2?'適合成長團隊':'E2B '+p.name}</div><h3>${p.name}</h3><p class="subscription-tag">${p.tag}</p><div class="subscription-price">${money(p.price)}<small>/ 月，未稅</small></div><p class="subscription-tax">含稅 ${money(p.price*1.05)} / 月</p><button type="button" data-upgrade="${i}" ${i<=state.plan?'disabled':''}>${i===state.plan?'目前方案':i<state.plan?'已包含此方案':'升級至 '+p.name}</button><ul>${p.quotas.map(f=>`<li>${f}</li>`).join('')}${p.groups.map(g=>`<li class="subscription-feature-group"><h5>${g.module}</h5><ul>${g.features.map(f=>`<li>${f}</li>`).join('')}</ul></li>`).join('')}</ul></article>`).join('')}</div><footer class="subscription-note">方案價格、功能與額度依 2026/10/01「E2B｜系統功能與訂閱方案對照表.pdf」；僅列該方案已勾選功能。待討論／尚未規劃項目不表示已可使用。<br>此頁為互動示範，升級操作不會產生扣款。</footer>`);
    modal.querySelectorAll('[data-upgrade]:not(:disabled)').forEach(b=>b.onclick=()=>renderConfirm(Number(b.dataset.upgrade)));
    managementTabs('plans');
  }

  function renderAddons(kind='token'){
    shell(window.e2bAddonMarkup(kind));
    managementTabs('addons');
    window.e2bBindAddons(modal);
  }
  window.e2bOpenAddons=(kind='token')=>{
    closeUsage();menu.classList.remove('show');renderAddons(kind);
    if(!modal.open)modal.showModal();modal.scrollTop=0;
    modal.querySelector('[data-addon="'+kind+'"]').focus();
  };
  function renderConfirm(index){
    if(index<=state.plan || !plans[index])return;
    const p=plans[index];
    shell(`<div class="subscription-confirm"><span class="subscription-eyebrow">UPGRADE YOUR WORKSPACE</span><h2 id="subscriptionTitle">升級至 ${p.name}</h2><p>為你的團隊開啟更多功能。</p><div class="subscription-change"><span>${plans[state.plan].name}</span><span aria-hidden="true">→</span><strong>${p.name}</strong></div><dl><div><dt>新方案月費（未稅）</dt><dd>${money(p.price)}</dd></div><div><dt>新方案月費（含稅）</dt><dd>${money(p.price*1.05)}</dd></div><div><dt>訂閱使用期限</dt><dd>${state.end.replaceAll('-','/')}</dd></div></dl><p class="subscription-note">這是升級流程示範，不會扣款。確認後將更新此瀏覽器的示範方案；正式升級的補差額與生效時間，以結帳頁為準。</p><div class="subscription-confirm-actions"><button type="button" id="subscriptionBack">返回方案</button><button type="button" id="subscriptionConfirm">確認升級（示範）</button></div></div>`);
    modal.querySelector('#subscriptionBack').onclick=()=>{renderPlans();modal.querySelector(`[data-upgrade="${index}"]`).focus();};
    modal.querySelector('#subscriptionConfirm').onclick=()=>{
      history.push({type:'upgrade',from:state.plan,plan:index,at:new Date().toISOString()});
      state.plan=index;let saved=true;try{localStorage.setItem(key,JSON.stringify({plan:index,history,historyIncomplete}));}catch{saved=false;}
      renderSummary();renderOverview();modal.querySelector('.subscription-close').focus();modal.scrollTop=0;
      toast(saved?`已示範升級至 ${p.name}`:`已示範升級至 ${p.name}，此瀏覽器無法保存`);
    };
    modal.querySelector('#subscriptionBack').focus();
  }
  modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
  modal.addEventListener('close',()=>profile.focus());
  renderSummary();
})();
