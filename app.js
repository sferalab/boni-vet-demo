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
 const acc=site.map((b,i)=>`<details ${i===0?'open':''}><summary>${esc(b[0])}</summary><div class="acc">${blk(b[1])}</div></details>`).join('')+
 `<details><summary>Как проходит визит</summary><div class="acc"><ul><li>Врач расспросит Вас о самочувствии, питании и прививках питомца</li><li>Проведет осмотр и при необходимости назначит диагностику: анализы, УЗИ и другое</li><li>Объяснит диагноз и план лечения, ответит на вопросы на любом этапе</li><li>Все данные визита сохранятся в электронной карте питомца</li></ul></div></details>`+
 `<details><summary>Как подготовиться (общие рекомендации)</summary><div class="acc"><ul><li>Возьмите ветпаспорт и результаты прошлых анализов, выписки</li><li>Запишите, какие симптомы и с какого времени Вы заметили, что питомец ел и пил</li><li>Кошек и мелких животных везите в переноске, собак на поводке</li><li>Если возможны анализы или процедура под наркозом, уточните при записи, нужно ли не кормить питомца</li></ul><p class="gen">Это общие советы. Точную подготовку для Вашего случая подскажет администратор или врач.</p></div></details>`+
 `<details><summary>Каких животных принимаем</summary><div class="acc"><p>${GEN[s[0]]?'Кроме кошек и собак, этим направлением занимаются врачи, которые принимают экзотических животных и птиц.':'Кошки и собаки. Экзотических животных и птиц принимают профильные специалисты: экзотолог, герпетолог, орнитолог.'}</p></div></details>`;
 const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="sheet"><button class="x" aria-label="Закрыть">×</button><img src="img/svc/${s[0]}.webp" alt=""><h3>${s[2]} ${s[1]}</h3><div class="accs">${acc}</div><div class="acts"><button class="btn primary" data-go>Записаться</button><a class="btn ghost" href="tel:+74953749911">Позвонить</a></div><p class="gen">Описание по материалам сайта клиники boni-vet.ru.</p></div>`;
 m.addEventListener('click',ev=>{if(ev.target===m||ev.target.closest('.x'))return m.remove();if(ev.target.closest('[data-go]')){$('#bSvc').value=s[1];m.remove();$('#booking').scrollIntoView()}});document.body.appendChild(m)});
// doctors
const docs=$('#docs');
docs.innerHTML=DOCS.map(d=>`<div class="doc"><img loading="lazy" src="img/doc/${d[0]}.webp" alt="${d[1]}"><div>${d[4]?`<div class="pos">${d[4]}</div>`:''}<b>${d[1]}</b><span>${d[2]}</span>${d[3]?`<em class="xp">Стаж ${d[3]}</em>`:''}<em class="more" style="display:block;font-style:normal;font-size:12px;font-weight:800;color:var(--t);margin-top:6px">Подробнее →</em></div></div>`).join('');
$('#allDocs').onclick=e=>{const g=docs.classList.toggle('grid');e.target.textContent=g?'Свернуть':'Показать всех врачей'};
// symptom helper
const PETS=[['cat','🐱','Кошка'],['dog','🐶','Собака'],['exo','🐰','Грызун или кролик'],['bird','🦜','Птица или рептилия']];
const Q={
 common:[
  ['Тяжело дышит, дышит открытым ртом, или десны и язык бледные или синие?',2],
  ['Были судороги, обморок, питомец не может встать?',2],
  ['Травма: падение, укус, ДТП, сильное кровотечение?',2],
  ['Мог съесть яд, лекарство, кость или посторонний предмет?',2],
 ],
 cat:[['Часто ходит в лоток, но мочи нет или очень мало?',2]],
 dog:[['Живот вздут и твердый, есть позывы к рвоте без результата?',2]],
 exo:[['Не ест и не какает больше 12 часов?',2]],
 bird:[['Сидит нахохлившись на дне клетки, не реагирует?',2]],
 tail:[
  ['Рвота или понос больше суток, или с кровью?',2],
  ['Отказывается от еды больше суток, сильно вялый?',1],
  ['Есть другие симптомы: зуд, кашель, хромота, проблемы с глазами или ушами?',0]
 ]};
let st;const app=$('#app');
function reset(){st={pet:null,qs:[],i:0,score:0,flags:[]};render()}
function render(){
 if(!st.pet){app.innerHTML=`<div class="prog"><i style="width:8%"></i></div><div class="step-n">Шаг 1</div><div class="q">Кто Ваш питомец?</div><div class="opts g2">${PETS.map(p=>`<button class="opt" data-pet="${p[0]}"><span class="em">${p[1]}</span>${p[2]}</button>`).join('')}</div>`;return}
 if(st.i<st.qs.length){const q=st.qs[st.i];app.innerHTML=`<div class="prog"><i style="width:${10+90*st.i/st.qs.length}%"></i></div><div class="step-n">Вопрос ${st.i+1} из ${st.qs.length}</div><div class="q">${q[0]}</div><div class="yn"><button class="opt" data-a="1">Да</button><button class="opt" data-a="0">Нет</button></div><button class="back" data-back>← Назад</button>`;return}
 const urgent=st.score>=2;
 if(urgent){app.innerHTML=`<div class="prog"><i style="width:100%;background:var(--r)"></i></div><div class="res urg"><div class="big">🚨</div><h3>Срочно в клинику</h3><p>Такие симптомы требуют осмотра врача как можно скорее. Мы работаем круглосуточно.</p><ul>${st.flags.map(f=>`<li>${f}</li>`).join('')}</ul><a class="btn danger" href="tel:+74953749911">Позвонить: +7 495 374-99-11</a><a class="btn ghost" target="_blank" rel="noopener" href="https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%A1%D1%83%D0%B4%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%2010%D0%BA2">Маршрут до клиники</a><button class="back" data-reset>Пройти заново</button></div>`}
 else{app.innerHTML=`<div class="prog"><i style="width:100%"></i></div><div class="res ok"><div class="big">💚</div><h3>Запишитесь на прием</h3><p>Опасных признаков нет. Покажите питомца врачу в удобное время${st.score?', лучше в ближайшие сутки':''}. Если состояние ухудшится, звоните сразу.</p><button class="btn primary" data-book>Выбрать время</button><button class="back" data-reset>Пройти заново</button></div>`}
}
app.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;
 if(t.dataset.pet){st.pet=t.dataset.pet;st.qs=[...Q.common,...Q[st.pet],...Q.tail];render()}
 else if(t.dataset.a!==undefined){const q=st.qs[st.i];st.hist=(st.hist||[]);st.hist.push([st.score,st.flags.slice()]);if(t.dataset.a==='1'){st.score=Math.max(st.score,q[1]);if(q[1]===2)st.flags.push(q[0].replace('?',''))}st.i++;render()}
 else if('back' in t.dataset){if(st.i===0){st.pet=null}else{st.i--;const h=st.hist.pop();st.score=h[0];st.flags=h[1]}render()}
 else if('reset' in t.dataset)reset();
 else if('book' in t.dataset){const map={cat:0,dog:1,exo:2,bird:3};setPet(map[st.pet]);$('#booking').scrollIntoView()}
});
reset();
// booking
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
 done.innerHTML=`<div class="big">🎉</div><h3>Вы записаны!</h3><p>${name}, администратор позвонит Вам для подтверждения и заранее напомнит о визите.</p><div class="sum"><div>🐾 <b>${pet}</b></div><div>🩺 ${sel.value}</div><div>📅 ${d.getDate()} ${MN[d.getMonth()]}, ${slot}</div><div>📍 Судостроительная ул., 10 к. 2</div></div><button class="btn ghost" id="again">Записаться еще раз</button><p class="tiny">Демо: заявка никуда не отправляется.</p>`;
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
