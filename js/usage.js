/* Engineering presentation: independent demo ledgers; no payment or backend. */
(()=>{
  const resources={
    token:{label:'Token 點數',unit:'點',total:300,rows:[['2026-10-13 09:35','AI 文案','商品描述產生－春季新品上架文',5],['2026-10-13 09:10','AI 圖片','商品情境圖－戶外野餐主題',20],['2026-10-12 18:22','AI 分析','客群分群洞察報告',8]]},
    video:{label:'影片生成次數',unit:'次',total:10,rows:[['2026-10-13 10:20','影片生成','新品介紹影片',1],['2026-10-12 15:40','影片生成','社群促銷短片',1],['2026-10-11 11:05','影片生成','商品情境影片',1]]}
  };
  let active='token',range='最近 30 天',from='',to='';
  const modal=document.getElementById('usageModal');
  const used=r=>r.rows.reduce((sum,row)=>sum+row[3],0);
  window.e2bUsageOverviewMarkup=()=>`<section class="usage-overview"><h4>AI 用量總覽</h4><div class="addon-grid">${Object.entries(resources).map(([key,r])=>`<article class="addon-card"><h3>${r.label}</h3><p>目前剩餘</p><div class="usage-remaining"><strong>${r.total-used(r)}</strong> ${r.unit}</div><p class="muted">已使用 ${used(r)} ${r.unit} ／ 總額度 ${r.total} ${r.unit}</p><button type="button" class="btn primary" data-overview-addon="${key}">加購${r.label} ↗</button></article>`).join('')}</div><p class="subscription-note">展示額度 · Token 點數與影片生成次數分開計算。</p></section>`;
  function filtered(r){return r.rows.filter(row=>{
    const day=row[0].slice(0,10);
    if(range==='自訂')return (!from||day>=from)&&(!to||day<=to);
    const now=new Date(2026,9,13),date=new Date(day+'T00:00:00');
    if(range==='今天')return day==='2026-10-13';
    if(range==='本月')return day.startsWith('2026-10');
    if(range==='上個月')return day.startsWith('2026-09');
    return (now-date)/86400000<(range==='最近 7 天'?7:30);
  });}
  function render(){
    const r=resources[active],spent=used(r),percent=(spent/r.total*100).toFixed(1),rows=filtered(r);
    modal.innerHTML=`<div class="usage-dialog" role="dialog" aria-modal="true" aria-labelledby="usageTitle"><button class="usage-close" aria-label="關閉使用紀錄" onclick="closeUsage()">×</button><h2 id="usageTitle">✦ AI 用量與使用紀錄</h2><div class="usage-resource-tabs" role="tablist" aria-label="用量類型">${Object.entries(resources).map(([key,value])=>`<button type="button" role="tab" id="usageTab-${key}" aria-controls="usagePanel" aria-selected="${active===key}" data-resource="${key}">${value.label}</button>`).join('')}</div><section id="usagePanel" role="tabpanel" aria-labelledby="usageTab-${active}"><div class="usage-resource-heading"><h3>${r.label}</h3><button class="btn primary" id="usageAddon">加購${r.label} ↗</button></div><div class="usage-summary"><div><span>本月總額度</span><b>${r.total}</b><small> ${r.unit}</small></div><div><span>已使用</span><b style="color:var(--primary)">${spent}</b><small> ${r.unit}</small></div><div><span>剩餘</span><b style="color:var(--green)">${r.total-spent}</b><small> ${r.unit}</small></div><div><span>使用率</span><b>${percent}%</b></div><div class="usage-bar"><i style="width:${percent}%"></i></div></div><div class="range-row">${['今天','最近 7 天','最近 30 天','本月','上個月','自訂'].map(label=>`<button data-range="${label}" class="${range===label?'active':''}">${label}</button>`).join('')}<button id="usageExport" style="margin-left:auto">⇩ 匯出 CSV</button></div>${range==='自訂'?`<div class="usage-dates"><label>開始日期 <input type="date" id="usageFrom" value="${from}"></label><label>結束日期 <input type="date" id="usageTo" value="${to}"></label></div>`:''}<div class="table-card"><table><thead><tr><th>日期時間</th><th>功能類型</th><th>使用內容</th><th>消耗${active==='token'?'點數':'次數'}</th></tr></thead><tbody>${rows.map(row=>`<tr><td>${row[0]}</td><td><span class="tag">${row[1]}</span></td><td>${row[2]}</td><td>${row[3]} ${r.unit}</td></tr>`).join('')||'<tr><td colspan="4">此期間沒有使用紀錄</td></tr>'}</tbody></table></div></section><p class="subscription-note">展示資料 · 以 2026/10/13 為篩選基準；兩類用量各自計算，尚未串接後端。</p></div>`;
    modal.querySelectorAll('[data-resource]').forEach(button=>{
      button.onclick=()=>{active=button.dataset.resource;render();modal.querySelector('#usageTab-'+active).focus();};
      button.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();active=e.key==='Home'?'token':e.key==='End'?'video':active==='token'?'video':'token';render();modal.querySelector('#usageTab-'+active).focus();}};
    });
    modal.querySelector('#usageAddon').onclick=()=>window.e2bOpenAddons(active);
    modal.querySelectorAll('[data-range]').forEach(button=>button.onclick=()=>{range=button.dataset.range;render();});
    for(const [id,key] of [['usageFrom','from'],['usageTo','to']]){const input=modal.querySelector('#'+id);if(input)input.onchange=()=>{if(key==='from')from=input.value;else to=input.value;render();};}
    modal.querySelector('#usageExport').onclick=()=>{
      const csv='\uFEFF'+[['日期時間','功能類型','使用內容',active==='token'?'消耗點數':'消耗次數'],...rows].map(row=>row.map(cell=>'"'+String(cell).replaceAll('"','""')+'"').join(',')).join('\r\n');
      const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=r.label+'使用紀錄.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
  }
  window.e2bAddonMarkup=kind=>`<header class="subscription-heading"><h2 id="subscriptionTitle">加購點數／次數</h2><p>依需求補充用量，或至「訂閱方案」升級方案。</p></header><div class="addon-grid">${Object.entries(resources).map(([key,r])=>`<section class="addon-card ${key===kind?'is-selected':''}" data-addon="${key}" tabindex="-1"><h3>${r.label}</h3><p>目前剩餘 <strong>${r.total-used(r)} ${r.unit}</strong></p><label>加購數量（${r.unit}）<input type="number" min="${key==='token'?50:1}" max="100000" step="${key==='token'?50:1}" value="${key==='token'?100:5}" aria-label="加購${r.label}數量"></label><p>價格與有效期限：待確認</p><button class="btn primary" data-buy="${key}">預覽加購${r.label}</button><div class="addon-result" aria-live="polite"></div></section>`).join('')}</div><p class="subscription-note">數量與額度為展示資料。此流程只預覽購買內容，不會扣款或變更額度。</p>`;
  window.e2bBindAddons=root=>root.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>{
    const card=button.closest('.addon-card'),input=card.querySelector('input');
    if(!input.reportValidity())return;
    const r=resources[button.dataset.buy];
    card.querySelector('.addon-result').textContent=`加購內容：${Number(input.value)} ${r.unit}${r.label}。正式購買需確認價格與有效期限，再進入付款。`;
  });
  render();
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('show'))closeUsage();});
})();
