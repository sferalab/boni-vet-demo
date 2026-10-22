const SVC=[
['terapiya','Терапия','🩺','pop'],['lab','Лабораторная диагностика','🩸','pop diag'],['vaccine','Вакцинация','💉','pop'],['khirurgiya','Хирургия','✂️','pop'],
['uzi','УЗИ, в том числе экзотам и птицам','📡','diag exo'],['oarit','Стационар (ОАРИТ)','🏥','pop'],['chip','Чипирование','🔖','pop'],
['travma','Травматология и ортопедия','🦴','spec'],['endoskopiya','Эндоскопия','🔍','diag'],['kardio','Кардиология','❤️','spec'],
['derma','Дерматология','🧴','spec'],['endokrin','Эндокринология','⚖️','spec'],['gastro','Гастроэнтерология','🍽️','spec'],
['exot','Экзотолог, ратолог, герпетолог','🦎','exo'],['stoma','Стоматология','🦷','spec'],['nevro','Неврология','🧠','spec'],
['nefro','Нефрология','💧','spec'],['oftalm','Офтальмология','👁️','spec'],['ornito','Орнитология','🦜','exo'],['pulmo','Пульмонология','🫁','spec']];
const DOCS=[
['bokovenko','Боковенко Дарья Дмитриевна','Кардиолог, специалист визуальной диагностики','10 лет','Главный врач'],
['kramar','Крамарь Николай Николаевич','Хирург, травматолог-ортопед, эндоскопист','10 лет','Главный врач'],
['fadeeva','Фадеева Ирина Геннадьевна','Терапевт, эндокринолог','10 лет','Зав. терапевтическим отделением'],
['mayer','Майер Татьяна Юрьевна','Хирург, ортопед, эндоскопия, неврология','17 лет'],
['zhulyanov','Жульянов Александр Николаевич','Невролог, анестезиолог, реаниматолог','6 лет'],
['biryukova','Бирюкова Евгения Борисовна','Офтальмолог, микрохирургия глаза','15 лет'],
['melnik','Мельник Екатерина Сергеевна','Терапия, гастроэнтерология, токсикология','14 лет'],
['orlova','Орлова Евгения Олеговна','Кардиолог, пульмонолог','11 лет'],
['nikolaeva','Николаева (Горячева) Анастасия Валерьевна','Визуальная диагностика','13 лет'],
['karusheva','Карушева Ирина Васильевна','Терапия, стоматология, хирургия','9 лет'],
['faustova','Фаустова Валерия Эдуардовна','Терапия, нефрология, УЗИ, грызуны и кролики','9 лет'],
['alieva','Алиева (Пазикова) Ленора Анатольевна','Терапевт, орнитолог, экзотолог','8 лет'],
['zdorova','Здорова Марина Денисовна','Терапевт, экзотолог','7 лет'],
['sedelnikova','Седельникова Анна Александровна','Экзотолог, герпетолог','3 года'],
['shilkina','Шилкина Марина Валерьевна','Хирургия, нейрохирургия, ортопедия, неврология',''],
['kurilo','Курило Владислав Сергеевич','Терапия, хирургия, эндоскопия','10 лет'],
['buchinskaya','Бучинская Дарья Сергеевна','Офтальмология, микрохирургия глаза','4 года'],
['koptelova','Коптелова Ирина Валерьевна','Кардиология','4 года'],
['volina','Волина Ольга Федоровна','Терапия, визуальная диагностика','6 лет'],
['monastyrsky','Монастырский Дмитрий Владимирович','Терапия, рентгенология, пульмонология','6 лет'],
['shibaeva','Шибаева Екатерина Ильинична','Визуальная диагностика','6 лет'],
['ragimova','Рагимова Валерия Дмитриевна','Терапия, стоматология','4 года'],
['scherbakova','Щербакова Александра Вячеславовна','Анестезиология, визуальная диагностика','6 лет'],
['afanasyeva','Афанасьева Арина Витальевна','Визуальная диагностика, терапия','3 года'],
['mikhaylovskaya','Михайловская Анастасия Сергеевна','Терапия, хирургия','3 года']];
const $=s=>document.querySelector(s);
// services
const grid=$('#svcGrid');
function drawSvc(f){grid.innerHTML=SVC.filter(s=>f==='all'||s[3].split(' ').includes(f)).map(s=>`<div class="svc" data-s="${s[0]}"><img loading="lazy" src="img/svc/${s[0]}.webp" alt="${s[1]}"><div><i>${s[2]}</i><b>${s[1]}</b><u class="arr">›</u></div></div>`).join('')}
drawSvc('all');
$('#svcFilter').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('#svcFilter button').forEach(x=>x.classList.toggle('on',x===b));drawSvc(b.dataset.f)});
let SVCD=null;fetch('svc.json').then(r=>r.json()).then(j=>SVCD=j).catch(()=>{});
const esc=x=>x.replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
function blk(items){let h='',ul=[];const fl=()=>{if(ul.length){h+='<ul>'+ul.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';ul=[]}};items.forEach(([t,x])=>{if(t==='li')ul.push(x);else{fl();h+='<p>'+esc(x)+'</p>'}});fl();return h}
const GEN={exot:1,ornito:1,uzi:1};
grid.addEventListener('click',e=>{const c=e.target.closest('.svc');if(!c)return;const s=SVC.find(x=>x[0]===c.dataset.s);
 const site=(SVCD&&SVCD[s[0]])||[];
 const first=(site[0]&&site[0][1].find(x=>x[0]==='p'))||null;let teaser=first?first[1]:'Запишитесь на прием, и врач подробно расскажет о диагностике и лечении.';if(teaser.length>230)teaser=teaser.slice(0,teaser.lastIndexOf(' ',220))+'…';
 const sec=(t,body)=>`<section class="fs"><h4>${t}</h4>${body}</section>`;
 const full=site.map(b=>sec(esc(b[0]),blk(b[1]))).join('')+
 sec('Как проходит визит','<ul><li>Врач расспросит Вас о самочувствии, питании и прививках питомца</li><li>Проведет осмотр и при необходимости назначит диагностику</li><li>Объяснит диагноз и план лечения, ответит на вопросы на любом этапе</li><li>Все данные визита сохранятся в электронной карте питомца</li></ul>')+
 sec('Как подготовиться (общие рекомендации)','<ul><li>Возьмите ветпаспорт, результаты прошлых анализов и выписки</li><li>Запишите, какие симптомы и с какого времени Вы заметили</li><li>Кошек и мелких животных везите в переноске, собак на поводке</li><li>Если возможны анализы или наркоз, уточните при записи, нужно ли не кормить питомца</li></ul><p class="gen">Точную подготовку для Вашего случая подскажет администратор или врач.</p>')+
 sec('Каких животных принимаем',`<p>${GEN[s[0]]?'Кроме кошек и собак, этим направлением занимаются врачи, которые принимают экзотических животных и птиц.':'Кошки и собаки. Экзотических животных и птиц принимают профильные специалисты: экзотолог, герпетолог, орнитолог.'}</p>`)+
 '<p class="gen">Описание по материалам сайта клиники boni-vet.ru.</p>';
 const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="sheet svc-sheet"><button class="x" aria-label="Закрыть">×</button><img src="img/svc/${s[0]}.webp" alt=""><h3>${s[2]} ${s[1]}</h3><p class="teaser">${esc(teaser)}</p><button class="more-btn" data-more>Читать подробнее ▾</button><div class="full" hidden>${full}<button class="more-btn" data-less>Свернуть ▴</button></div><div class="acts sticky"><button class="btn primary" data-go>Записаться</button><a class="btn ghost" href="tel:+74953749911">Позвонить</a></div></div>`;
 m.addEventListener('click',ev=>{const sh=m.querySelector('.sheet');if(ev.target.closest('[data-more]')){m.querySelector('.full').hidden=false;m.querySelector('[data-more]').hidden=true;m.querySelector('.teaser').classList.add('open');return}if(ev.target.closest('[data-less]')){m.querySelector('.full').hidden=true;m.querySelector('[data-more]').hidden=false;sh.scrollTop=0;return}});
 m.addEventListener('click',ev=>{if(ev.target===m||ev.target.closest('.x'))return m.remove();if(ev.target.closest('[data-go]')){$('#bSvc').value=s[1];m.remove();$('#booking').scrollIntoView()}});document.body.appendChild(m)});
// doctors
const docs=$('#docs');
docs.innerHTML=DOCS.map(d=>`<div class="doc"><img loading="lazy" src="img/doc/${d[0]}.webp" alt="${d[1]}"><div>${d[4]?`<div class="pos">${d[4]}</div>`:''}<b>${d[1]}</b><span>${d[2]}</span>${d[3]?`<em class="xp">Стаж ${d[3]}</em>`:''}<em class="more" style="display:block;font-style:normal;font-size:12px;font-weight:800;color:var(--t);margin-top:6px">Подробнее →</em></div></div>`).join('');
$('#allDocs').onclick=e=>{const g=docs.classList.toggle('grid');e.target.textContent=g?'Свернуть':'Показать всех врачей'};
// symptom helper
const PETS=[['cat','🐱','Кошка'],['dog','🐶','Собака'],['exo','🐰','Грызун или кролик'],['bird','🦜','Птица или рептилия']];
// [text, red, service]
const SYM={
'Питание':[['Отказ от еды больше суток',0,'Терапия'],['Сниженный аппетит',0,'Терапия'],['Сильная жажда',0,'Эндокринология'],['Похудение',0,'Эндокринология']],
'ЖКТ':[['Рвота',0,'Гастроэнтерология'],['Многократная рвота',1,'Гастроэнтерология'],['Понос',0,'Гастроэнтерология'],['Кровь в рвоте или кале',1,'Гастроэнтерология'],['Вздутый твердый живот',1,'Хирургия'],['Съел чужеродный предмет',1,'Эндоскопия'],['Возможное отравление',1,'Отделение ОАРИТ (стационар)']],
'Дыхание':[['Кашель',0,'Пульмонология'],['Чихание, выделения из носа',0,'Терапия'],['Тяжелое дыхание, дышит открытым ртом',1,'Отделение ОАРИТ (стационар)'],['Бледные или синие десны',1,'Отделение ОАРИТ (стационар)']],
'Кожа и шерсть':[['Зуд, расчесы',0,'Дерматология'],['Выпадение шерсти',0,'Дерматология'],['Покраснение, сыпь',0,'Дерматология'],['Шишка или уплотнение',0,'Хирургия']],
'Туалет':[['Частые позывы, мало мочи',0,'Нефрология'],['Кровь в моче',0,'Нефрология'],['Совсем не может помочиться',1,'Нефрология'],['Запор',0,'Гастроэнтерология']],
'Поведение':[['Вялость, много спит',0,'Терапия'],['Прячется, беспокоится',0,'Терапия'],['Судороги',1,'Неврология'],['Обморок, не встает',1,'Отделение ОАРИТ (стационар)'],['Шаткая походка',0,'Неврология']],
'Травмы':[['Хромота',0,'Травматология и ортопедия'],['Падение с высоты',1,'Травматология и ортопедия'],['Укус, рана',0,'Хирургия'],['Сильное кровотечение',1,'Хирургия'],['Попал под машину',1,'Травматология и ортопедия']],
'Глаза и уши':[['Слезятся или гноятся глаза',0,'Офтальмология'],['Щурится, трет глаз',0,'Офтальмология'],['Травма глаза',1,'Офтальмология'],['Чешет уши, запах из ушей',0,'Дерматология'],['Трясет головой',0,'Терапия']],
'Зубы':[['Запах изо рта',0,'Стоматология'],['Жует на одну сторону',0,'Стоматология']]};
const PSYM={cat:['Кошка',[['Ходит в лоток часто и безрезультатно',1,'Нефрология'],['Рвота шерстью чаще обычного',0,'Гастроэнтерология']]],
dog:['Собака',[['Безрезультатные позывы к рвоте',1,'Хирургия'],['Ест траву, урчит живот',0,'Гастроэнтерология']]],
exo:['Грызун или кролик',[['Не ест и не какает больше 12 часов',1,'Экзотолог, ратолог, герпетолог'],['Слюнотечение, мокрый подбородок',0,'Экзотолог, ратолог, герпетолог'],['Отросшие резцы',0,'Экзотолог, ратолог, герпетолог']]],
bird:['Птица или рептилия',[['Сидит нахохлившись на дне',1,'Орнитология'],['Выщипывает перья',0,'Орнитология'],['Не линяет, остатки кожи',0,'Экзотолог, ратолог, герпетолог']]]};
const DUR=['Сегодня','2–3 дня','Дольше'];
let H;const app=$('#app');
function hReset(){H={pet:null,sel:new Map(),dur:'',com:''};hRender()}
function petName(){return PETS.find(p=>p[0]===H.pet)[2]}
function cats(){const c={...SYM};const p=PSYM[H.pet];return {[p[0]+': особое']:p[1],...c}}
function suggest(){const isEx=H.pet==='exo'||H.pet==='bird';const cnt={};let red=false;H.sel.forEach(v=>{if(v[1])red=true;cnt[v[2]]=(cnt[v[2]]||0)+(v[1]?3:1)});
 let svc=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];svc=svc?svc[0]:'Терапия';
 if(isEx&&!['Экзотолог, ратолог, герпетолог','Орнитология'].includes(svc))svc=H.pet==='bird'?'Орнитология':'Экзотолог, ратолог, герпетолог';
 return {red,svc}}
function summary(){const {svc}=suggest();const L=['Питомец: '+petName()];
 const g={};H.sel.forEach((v,k)=>{(g[v[3]]=g[v[3]]||[]).push(v[0]+(v[1]?' (!)':''))});
 Object.entries(g).forEach(([c,a])=>L.push(c+': '+a.join(', ')));
 if(H.dur)L.push('Длительность: '+H.dur);if(H.com)L.push('Комментарий: '+H.com);L.push('Предварительно: '+svc);return L.join('\n')}
function hRender(){
 if(!H.pet){app.innerHTML=`<div class="step-n">Шаг 1 из 2</div><div class="q">Кто Ваш питомец?</div><div class="opts g2">${PETS.map(p=>`<button class="opt" data-pet="${p[0]}"><span class="em">${p[1]}</span>${p[2]}</button>`).join('')}</div>`;return}
 const C=cats();
 app.innerHTML=`<div class="hp-top"><button class="back" data-back>← ${petName()}</button><span class="step-n">Шаг 2 из 2</span></div><div class="q">Что Вы заметили? <small>Можно выбрать несколько</small></div>
 <div class="legend"><i class="rf"></i> отмечены признаки, при которых нужен срочный прием</div>
 ${Object.entries(C).map(([c,a])=>`<div class="sg"><div class="sg-t">${c}</div><div class="chipset">${a.map(x=>`<button type="button" class="sc ${x[1]?'red':''} ${H.sel.has(x[0])?'on':''}" data-sym="${esc(x[0])}" data-c="${esc(c)}">${x[0]}</button>`).join('')}</div></div>`).join('')}
 <div class="sg"><div class="sg-t">Как давно? <small>необязательно</small></div><div class="chipset">${DUR.map(d=>`<button type="button" class="sc ${H.dur===d?'on':''}" data-dur="${d}">${d}</button>`).join('')}</div></div>
 <div class="sg"><div class="sg-t">Комментарий <small>необязательно</small></div><textarea id="hCom" rows="2" placeholder="Например: съел часть игрушки вчера вечером">${esc(H.com)}</textarea></div>
 <div id="hOut"></div>`;
 document.getElementById('hCom').addEventListener('input',e=>{H.com=e.target.value.trim();hOut()});hOut()}
function hOut(){const o=document.getElementById('hOut');if(!o)return;
 if(!H.sel.size){o.innerHTML='<div class="sum-empty">Выберите хотя бы один признак, и здесь появится сводка для врача.</div>';return}
 const {red,svc}=suggest();
 o.innerHTML=`<div class="sumcard"><div class="sum-h">📝 Сводка для врача</div><pre>${esc(summary())}</pre><div class="sum-act"><button type="button" data-copy>Скопировать</button><button type="button" data-share>Поделиться</button></div></div>
 ${red?`<div class="res urg"><h3>🚨 Срочный прием</h3><p>Среди отмеченных есть признаки, при которых важно показать питомца врачу как можно скорее. Мы работаем круглосуточно.</p><a class="btn danger" href="tel:+74953749911">Позвонить: +7 495 374-99-11</a><a class="btn ghost" target="_blank" rel="noopener" href="${ROUTE}">Маршрут до клиники</a><button class="btn ghost" data-book>Записаться со сводкой</button></div>`
 :`<div class="res ok"><h3>💚 Обычный прием</h3><p>Опасных признаков среди отмеченных нет. Рекомендуемое направление: <b>${svc}</b>. Если состояние ухудшится, звоните сразу.</p><button class="btn primary" data-book>Записаться со сводкой</button></div>`}`}
app.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
 if(t.dataset.pet){H.pet=t.dataset.pet;hRender();app.scrollIntoView({block:'start'})}
 else if('back' in t.dataset){H.pet=null;H.sel.clear();hRender()}
 else if(t.dataset.sym){const k=t.dataset.sym;if(H.sel.has(k))H.sel.delete(k);else{const a=cats()[t.dataset.c].find(x=>x[0]===k);H.sel.set(k,[a[0],a[1],a[2],t.dataset.c])}t.classList.toggle('on');hOut()}
 else if(t.dataset.dur){H.dur=H.dur===t.dataset.dur?'':t.dataset.dur;app.querySelectorAll('[data-dur]').forEach(b=>b.classList.toggle('on',b.dataset.dur===H.dur));hOut()}
 else if('copy' in t.dataset){const txt=summary();(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{t.textContent='Скопировано ✓'},()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();t.textContent='Скопировано ✓'});setTimeout(()=>t.textContent='Скопировать',2000)}
 else if('share' in t.dataset){const txt=summary();if(navigator.share)navigator.share({title:'Сводка для врача',text:txt}).catch(()=>{});else{t.dataset.copy='';t.click()}}
 else if('book' in t.dataset){const map={cat:0,dog:1,exo:2,bird:3};setPet(map[H.pet]);$('#bSvc').value=suggest().svc;$('#bCom').value=summary();$('#booking').scrollIntoView()}
});
// booking
hReset();
const sel=$('#bSvc');sel.innerHTML='<option>Первичный прием терапевта</option>'+SVC.map(s=>`<option>${s[1]}</option>`).join('');
const seg=document.querySelector('.seg');function setPet(i){[...seg.children].forEach((b,j)=>b.classList.toggle('on',j===i))}
seg.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setPet([...seg.children].indexOf(b))});
const DN=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],MN=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
let day=0,slot=null;const daysEl=$('#days'),slotsEl=$('#slots');
function drawDays(){const now=new Date();daysEl.innerHTML=[...Array(10)].map((_,i)=>{const d=new Date(now);d.setDate(d.getDate()+i);return `<button type="button" data-d="${i}" class="${i===day?'on':''}"><small>${i===0?'Сегодня':i===1?'Завтра':DN[d.getDay()]}</small><b>${d.getDate()}</b></button>`}).join('')}
function drawSlots(){const now=new Date();const T=['09:00','10:00','11:00','12:30','14:00','15:30','17:00','18:00','19:30','21:00','22:30','00:30'];
 slotsEl.innerHTML=T.map((t,i)=>{const h=+t.slice(0,2)||24;const busy=(day===0&&h<=now.getHours())||((i*7+day*3)%5===0);return `<button type="button" ${busy?'disabled':''} class="${slot===t&&!busy?'on':''}">${t}</button>`}).join('')}
daysEl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;day=+b.dataset.d;slot=null;drawDays();drawSlots()});
slotsEl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;slot=b.textContent;drawSlots()});
drawDays();drawSlots();
const ph=$('#bPhone');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'');if(d[0]==='8')d='7'+d.slice(1);if(d&&d[0]!=='7')d='7'+d;d=d.slice(0,11);let r='+7';if(d.length>1)r+=' ('+d.slice(1,4);if(d.length>=4)r+=') '+d.slice(4,7);if(d.length>=7)r+='-'+d.slice(7,9);if(d.length>=9)r+='-'+d.slice(9,11);ph.value=d?r:''});
$('#bookForm').addEventListener('submit',e=>{e.preventDefault();const err=$('#bErr');const name=$('#bName').value.trim();const digits=ph.value.replace(/\D/g,'');
 if(!slot){err.textContent='Выберите время приема';return}if(!name){err.textContent='Укажите Ваше имя';return}if(digits.length<11){err.textContent='Укажите телефон полностью';return}err.textContent='';
 const d=new Date();d.setDate(d.getDate()+day);const pet=seg.querySelector('.on').textContent;
 $('#bookForm').hidden=true;const done=$('#bDone');done.hidden=false;
 done.innerHTML=`<div class="big">🎉</div><h3>Вы записаны!</h3><p>${name}, администратор позвонит Вам для подтверждения и заранее напомнит о визите.</p><div class="sum"><div>🐾 <b>${pet}</b></div><div>🩺 ${sel.value}</div><div>📅 ${d.getDate()} ${MN[d.getMonth()]}, ${slot}</div><div>📍 Судостроительная ул., 10 к. 2</div>${$('#bCom').value.trim()?`<div class="cm">💬 ${esc($('#bCom').value.trim()).replace(/\n/g,'<br>')}</div>`:''}</div><button class="btn ghost" id="again">Записаться еще раз</button><p class="tiny">Демо: заявка никуда не отправляется.</p>`;
 done.scrollIntoView({block:'center'});$('#again').onclick=()=>{done.hidden=true;$('#bookForm').hidden=false;slot=null;drawSlots()}});
document.querySelectorAll('a[data-book]').forEach(a=>a.addEventListener('click',()=>{}));
// info sheets
const ROUTE='https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%A1%D1%83%D0%B4%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%2010%D0%BA2';
const A={book:(s,t)=>`<button class="btn primary" data-bk="${s}">${t||'Записаться'}</button>`,call:t=>`<a class="btn danger" href="tel:+74953749911">${t||'Позвонить: +7 495 374-99-11'}</a>`,route:`<a class="btn ghost" target="_blank" rel="noopener" href="${ROUTE}">Построить маршрут</a>`};
const INFO={
blood:{i:'🩸',t:'Анализы крови за 1 час',p:'В клинике есть собственные анализаторы для общеклинического и биохимического анализа крови. Результат готов за 1 час, круглосуточно, поэтому врач может сразу назначить лечение.',
 s:[['Что это дает Вам',['Не нужно ждать результатов до следующего дня','Быстрое решение в экстренной ситуации','Можно сдать анализ в любое время суток']],
 ['Как подготовить питомца (общие рекомендации)',['Кошки и собаки: не кормить 8–12 часов до анализа, вода без ограничений','Не давать лакомства утром перед визитом','Если питомец получает лекарства, не отменяйте их сами, сообщите врачу','Кролики, грызуны и птицы голодать не должны, уточните у врача','Возьмите с собой результаты прошлых анализов, если они есть']],
 ['Сложные исследования',['Отправляются в лаборатории-партнеры: Шанс-Био, CITO, Неовет, ВЕТЛАБ, ВетЮнион']]],
 g:'Подготовка указана как общая ветеринарная рекомендация. Точные условия для Вашего питомца уточните у врача.',a:A.book('Лабораторная диагностика','Записаться на анализы')+A.call()},
'247':{i:'🌙',t:'Круглосуточно, без выходных',p:'Клиника работает каждый день, 24 часа в сутки. Приехать можно в любое время, в том числе ночью и в праздники.',
 s:[['Когда ехать сразу, не дожидаясь утра',['Затрудненное дыхание, бледные или синие десны','Судороги, обморок, питомец не встает','Травма, сильное кровотечение','Подозрение на отравление или проглоченный предмет','Кот не может помочиться']],['Перед выездом',['Позвоните, чтобы врач был готов к Вашему приезду','Возьмите упаковку от лекарства или яда, если питомец что-то съел']]],
 a:A.call('Позвонить сейчас')+A.route},
pharm:{i:'💊',t:'Ветеринарная аптека',p:'В клинике есть своя ветеринарная аптека. В ней можно приобрести все необходимое для питомца по доступным ценам, сразу или под заказ.',
 s:[['Что это дает Вам',['Препараты по назначению врача можно купить сразу после приема','Не нужно искать лекарство по другим аптекам','Нужного нет в наличии? Его можно заказать']]],g:'Наличие конкретного препарата уточняйте по телефону.',a:A.call('Уточнить наличие')},
labs:{i:'🔬',t:'Лаборатории-партнеры',p:'Клиника сотрудничает с ведущими лабораториями Москвы, где проводят исследования любой сложности в максимально короткие сроки.',
 s:[['Партнеры',['«Шанс-Био»','«Ветеринарный центр патоморфологии CITO»','«Неовет»','«ВЕТЛАБ» (лаборатория Митрохиной)','«ВетЮнион»']],['Как это работает',['Материал берут в клинике, Вам не нужно никуда ехать','Общий и биохимический анализ крови делают в самой клинике за 1 час']]],
 g:'Сроки готовности сложных исследований зависят от вида анализа, уточните у врача.',a:A.book('Лабораторная диагностика','Записаться на анализы')},
disc:{i:'🏷️',t:'Скидка 5% пенсионерам',p:'В клинике действует пенсионная скидка 5% при предъявлении пенсионного удостоверения.',s:[['Как получить',['Возьмите с собой пенсионное удостоверение','Покажите его администратору при оплате']]],g:'Условия применения скидки к отдельным услугам и товарам уточняйте у администратора.',a:A.book('Первичный прием терапевта')+A.call()},
comfort:{i:'☕',t:'Комфорт для Вас и питомца',p:'Пока Вы ждете, можно выпить чашечку чая или кофе, а питомца напоить.',s:[['Чтобы визит прошел спокойнее (общие советы)',['Кошек и мелких животных везите в закрытой переноске','Собак держите на коротком поводке','Возьмите любимую пеленку или игрушку, знакомый запах успокаивает']]],a:A.book()+A.route},
card:{i:'📋',t:'Электронная карта питомца',p:'Все данные о посещениях Вашего питомца заносятся в его электронную карту.',s:[['Что это дает Вам',['Любой врач клиники видит историю болезни и прошлые назначения','Не нужно хранить бумажки и пересказывать анамнез','Удобно, если питомец наблюдается у нескольких специалистов']]],a:A.book()},
remind:{i:'🔔',t:'Напомним о визите',p:'Записаться на прием можно по телефону, это экономит Ваше время. Вам всегда предварительно напомнят про дату и время записи.',s:[['Как записаться',['Онлайн на этой странице','По телефону +7 495 374-99-11 или +7 925 414-80-42']]],a:A.book()+A.call()},
promo:{i:'🎁',t:'Место для акции (пример)',p:'Это пример слота для будущих акций клиники. Сейчас на сайте клиники нет действующих акций, кроме пенсионной скидки 5%.',s:[['Что можно разместить здесь',['Сезонную акцию, например на вакцинацию или чипирование','Специальное предложение для новых клиентов','Условия и сроки акции, кнопку записи']]],g:'Содержимое блока заполняется клиникой.',a:A.call('Уточнить у администратора')},
route:{i:'📍',t:'Как добраться',p:'Москва, Судостроительная улица, д. 10, к. 2. Рядом метро Коломенская и Кленовый бульвар.',s:[['Перед выездом',['Если ситуация срочная, позвоните по дороге, чтобы Вас ждали']]],a:A.route+A.call()},
award:{i:'🏆',t:'«Хорошее место» от Яндекс Карт',p:'Клиника получила награду Яндекс Карт «Хорошее место». Ее вручают за доверие и высокие оценки посетителей.',a:`<a class="btn ghost" target="_blank" rel="noopener" href="https://yandex.ru/maps/?text=%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%20%D0%91%D0%BE%D0%BD%D0%B8%D1%84%D0%B0%D1%86%D0%B8%D0%B9%20%D0%A1%D1%83%D0%B4%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F">Читать отзывы на Яндекс Картах</a>`+A.book()}};
function openInfo(k){const d=INFO[k];if(!d)return;const m=document.createElement('div');m.className='modal';
 m.innerHTML=`<div class="sheet" role="dialog" aria-label="${d.t}"><button class="x" aria-label="Закрыть">×</button><div class="ico">${d.i}</div><h3>${d.t}</h3><p>${d.p}</p>${(d.s||[]).map(s=>`<h4>${s[0]}</h4><ul>${s[1].map(x=>`<li>${x}</li>`).join('')}</ul>`).join('')}${d.g?`<p class="gen">${d.g}</p>`:''}<div class="acts">${d.a}</div></div>`;
 m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.x'))return m.remove();const b=e.target.closest('[data-bk]');if(b){const v=b.dataset.bk;if(v)$('#bSvc').value=v;m.remove();$('#booking').scrollIntoView()}});
 document.body.appendChild(m)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-info]');if(t)openInfo(t.dataset.info)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal').forEach(m=>m.remove());if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.info)openInfo(e.target.dataset.info)});
docs.querySelectorAll('.doc').forEach((el,i)=>{el.tabIndex=0;el.setAttribute('role','button');el.addEventListener('click',()=>{const d=DOCS[i];INFO['doc'+i]={i:`<img src="img/doc/${d[0]}.webp" alt="" style="width:96px;height:96px;border-radius:50%;object-fit:cover;aspect-ratio:1;margin:0">`,t:d[1],p:(d[4]?d[4]+'. ':'')+d[2]+(d[3]?'. Стаж работы: '+d[3]+'.':''),s:[['Как записаться к врачу',['Выберите время онлайн и укажите в разговоре с администратором, к кому хотите попасть','Или позвоните, администратор подберет удобное время']]],a:A.book('')+A.call()};openInfo('doc'+i)})});
