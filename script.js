// --- DATA ---
const hiraganaGroups = [
    { id: 'row-a', label: 'a, i, u, e, o (あ-お)', chars: [{h:'あ',r:'a'}, {h:'い',r:'i'}, {h:'う',r:'u'}, {h:'え',r:'e'}, {h:'お',r:'o'}] },
    { id: 'row-k', label: 'ka, ki, ku, ke, ko (か-こ)', chars: [{h:'か',r:'ka'}, {h:'き',r:'ki'}, {h:'く',r:'ku'}, {h:'け',r:'ke'}, {h:'こ',r:'ko'}] },
    { id: 'row-s', label: 'sa, shi, su, se, so (さ-そ)', chars: [{h:'さ',r:'sa'}, {h:'し',r:'shi'}, {h:'す',r:'su'}, {h:'せ',r:'se'}, {h:'そ',r:'so'}] },
    { id: 'row-t', label: 'ta, chi, tsu, te, to (た-と)', chars: [{h:'た',r:'ta'}, {h:'ち',r:'chi'}, {h:'つ',r:'tsu'}, {h:'て',r:'te'}, {h:'と',r:'to'}] },
    { id: 'row-n', label: 'na, ni, nu, ne, no (な-の)', chars: [{h:'な',r:'na'}, {h:'に',r:'ni'}, {h:'ぬ',r:'nu'}, {h:'ね',r:'ne'}, {h:'の',r:'no'}] },
    { id: 'row-h', label: 'ha, hi, fu, he, ho (は-ほ)', chars: [{h:'は',r:'ha'}, {h:'ひ',r:'hi'}, {h:'ふ',r:'fu'}, {h:'へ',r:'he'}, {h:'ほ',r:'ho'}] },
    { id: 'row-m', label: 'ma, mi, mu, me, mo (ま-も)', chars: [{h:'ま',r:'ma'}, {h:'み',r:'mi'}, {h:'む',r:'mu'}, {h:'め',r:'me'}, {h:'も',r:'mo'}] },
    { id: 'row-y', label: 'ya, yu, yo (や-よ)', chars: [{h:'や',r:'ya'}, {h:'ゆ',r:'yu'}, {h:'よ',r:'yo'}] },
    { id: 'row-r', label: 'ra, ri, ru, re, ro (ら-ろ)', chars: [{h:'ら',r:'ra'}, {h:'り',r:'ri'}, {h:'る',r:'ru'}, {h:'れ',r:'re'}, {h:'ろ',r:'ro'}] },
    { id: 'row-w', label: 'wa, wo, n (わ-ん)', chars: [{h:'わ',r:'wa'}, {h:'を',r:'wo'}, {h:'ん',r:'n'}] }
];

const katakanaGroups = [
    { id: 'k-row-a', label: 'a, i, u, e, o (ア-オ)', chars: [{h:'ア',r:'a'}, {h:'イ',r:'i'}, {h:'ウ',r:'u'}, {h:'エ',r:'e'}, {h:'オ',r:'o'}] },
    { id: 'k-row-k', label: 'ka, ki, ku, ke, ko (カ-コ)', chars: [{h:'カ',r:'ka'}, {h:'キ',r:'ki'}, {h:'ク',r:'ku'}, {h:'ケ',r:'ke'}, {h:'コ',r:'ko'}] },
    { id: 'k-row-s', label: 'sa, shi, su, se, so (サ-ソ)', chars: [{h:'サ',r:'sa'}, {h:'シ',r:'shi'}, {h:'ス',r:'su'}, {h:'セ',r:'se'}, {h:'ソ',r:'so'}] },
    { id: 'k-row-t', label: 'ta, chi, tsu, te, to (タ-ト)', chars: [{h:'タ',r:'ta'}, {h:'チ',r:'chi'}, {h:'ツ',r:'tsu'}, {h:'テ',r:'te'}, {h:'ト',r:'to'}] },
    { id: 'k-row-n', label: 'na, ni, nu, ne, no (ナ-ノ)', chars: [{h:'ナ',r:'na'}, {h:'ニ',r:'ni'}, {h:'ヌ',r:'nu'}, {h:'ネ',r:'ne'}, {h:'ノ',r:'no'}] },
    { id: 'k-row-h', label: 'ha, hi, fu, he, ho (ハ-ホ)', chars: [{h:'ハ',r:'ha'}, {h:'ヒ',r:'hi'}, {h:'フ',r:'fu'}, {h:'ヘ',r:'he'}, {h:'ホ',r:'ho'}] },
    { id: 'k-row-m', label: 'ma, mi, mu, me, mo (マ-モ)', chars: [{h:'マ',r:'ma'}, {h:'ミ',r:'mi'}, {h:'ム',r:'mu'}, {h:'メ',r:'me'}, {h:'モ',r:'mo'}] },
    { id: 'k-row-y', label: 'ya, yu, yo (ヤ-ヨ)', chars: [{h:'ヤ',r:'ya'}, {h:'ユ',r:'yu'}, {h:'ヨ',r:'yo'}] },
    { id: 'k-row-r', label: 'ra, ri, ru, re, ro (ラ-ロ)', chars: [{h:'ラ',r:'ra'}, {h:'リ',r:'ri'}, {h:'ル',r:'ru'}, {h:'レ',r:'re'}, {h:'ロ',r:'ro'}] },
    { id: 'k-row-w', label: 'wa, wo, n (ワ-ン)', chars: [{h:'ワ',r:'wa'}, {h:'ヲ',r:'wo'}, {h:'ン',r:'n'}] }
];

const vocabGroups = [
    { id: 'v-l1-1', label: 'L1 - Zámená a ľudia', chars: [
        {h:'わたし', r:'watashi', s:'ja'}, {h:'わたしたち', r:'watashitachi', s:'my'},
        {h:'あなた', r:'anata', s:'ty'}, {h:'あのひと', r:'anohito', s:'ten človek'},
        {h:'あのかた', r:'anokata', s:'ten človek (zdvorilo)'},
        {h:'みなさん', r:'minasan', s:'všetci / dámy a páni'},
        {h:'さん', r:'san', s:'pán / pani (prípona)'},
        {h:'ちゃん', r:'chan', s:'prípona (pre deti)'},
        {h:'じん', r:'jin', s:'občan / národnosť (prípona)'}
    ]},
    { id: 'v-l1-2', label: 'L1 - Povolania', chars: [
        {h:'せんせい', r:'sensei', s:'učiteľ (nie o sebe)'}, {h:'きょうし', r:'kyoushi', s:'učiteľ (o sebe)'},
        {h:'がくせい', r:'gakusei', s:'študent'}, {h:'かいしゃいん', r:'kaishain', s:'zamestnanec firmy'},
        {h:'しゃいん', r:'shain', s:'zamestnanec (konkrétnej firmy)'},
        {h:'ぎんこういん', r:'ginkouin', s:'bankový úradník'}, {h:'いしゃ', r:'isha', s:'lekár'},
        {h:'けんきゅうしゃ', r:'kenkyuusha', s:'výskumník'}, {h:'エンジニア', r:'enjinia', s:'inžinier'}
    ]},
    { id: 'v-l1-3', label: 'L1 - Miesta, vek a ostatné', chars: [
        {h:'だいがく', r:'daigaku', s:'univerzita'}, {h:'びょういん', r:'byouin', s:'nemocnica'},
        {h:'でんき', r:'denki', s:'elektrina / svetlo'}, {h:'だれ', r:'dare', s:'kto'},
        {h:'どなた', r:'donata', s:'kto (zdvorilo)'}, {h:'さい', r:'sai', s:'rokov (vek)'},
        {h:'なんさい', r:'nansai', s:'koľko rokov'}, {h:'おいくつ', r:'oikutsu', s:'koľko rokov (zdvorilo)'},
        {h:'はい', r:'hai', s:'áno'}, {h:'いいえ', r:'iie', s:'nie'}
    ]},
    { id: 'v-l1-4', label: 'L1 - Frázy (Zoznamovanie)', chars: [
        {h:'はじめまして', r:'hajimemashite', s:'teší ma (prvé stretnutie)'},
        {h:'からきました', r:'kara kimashita', s:'pochádzam z...'},
        {h:'よろしくおねがいします', r:'yoroshiku onegaishimasu', s:'teší ma (na konci)'},
        {h:'しつれいですが', r:'shitsurei desu ga', s:'prepáčte, ale...'},
        {h:'おなまえは', r:'onamae wa', s:'ako sa voláte?'}
    ]},
    { id: 'v-l1-5', label: 'L1 - Krajiny', chars: [
        {h:'アメリカ', r:'amerika', s:'USA'}, {h:'イギリス', r:'igirisu', s:'Veľká Británia'},
        {h:'インド', r:'indo', s:'India'}, {h:'インドネシア', r:'indoneshia', s:'Indonézia'},
        {h:'かんこく', r:'kankoku', s:'Južná Kórea'}, {h:'タイ', r:'tai', s:'Thajsko'},
        {h:'ちゅうごく', r:'chuugoku', s:'Čína'}, {h:'ドイツ', r:'doitsu', s:'Nemecko'},
        {h:'にほん', r:'nihon', s:'Japonsko'}, {h:'ブラジル', r:'burajiru', s:'Brazília'}
    ]},
    { id: 'v-l2-1', label: 'L2 - Ukazovacie zámená', chars: [
        {h:'これ', r:'kore', s:'toto (tu)'}, {h:'それ', r:'sore', s:'tamto (pri tebe)'},
        {h:'あれ', r:'are', s:'tamto (ďaleko)'}, {h:'この', r:'kono', s:'tento (tu)'},
        {h:'その', r:'sono', s:'tamten (pri tebe)'}, {h:'あの', r:'ano', s:'tamten (ďaleko)'}
    ]},
    { id: 'v-l2-2', label: 'L2 - Knihy a papier', chars: [
        {h:'ほん', r:'hon', s:'kniha'}, {h:'じしょ', r:'jisho', s:'slovník'},
        {h:'ざっし', r:'zasshi', s:'časopis'}, {h:'しんぶん', r:'shinbun', s:'noviny'},
        {h:'ノート', r:'nooto', s:'zošit'}, {h:'てちょう', r:'techou', s:'vreckový diár'},
        {h:'めいし', r:'meishi', s:'vizitka'}, {h:'カード', r:'kaado', s:'karta'}
    ]},
    { id: 'v-l2-3', label: 'L2 - Predmety a technika', chars: [
        {h:'えんぴつ', r:'enpitsu', s:'ceruzka'}, {h:'ボールペン', r:'boorupen', s:'pero'},
        {h:'シャープペンシル', r:'shaapupenshiru', s:'mikroceruzka'}, {h:'かぎ', r:'kagi', s:'kľúč'},
        {h:'とけい', r:'tokei', s:'hodinky / hodiny'}, {h:'かさ', r:'kasa', s:'dáždnik'},
        {h:'かばん', r:'kaban', s:'taška / kufrík'}, {h:'シーディー', r:'shiidii', s:'CD'},
        {h:'テレビ', r:'terebi', s:'televízor'}, {h:'ラジオ', r:'rajio', s:'rádio'},
        {h:'カメラ', r:'kamera', s:'fotoaparát'}, {h:'コンピューター', r:'konpyuutaa', s:'počítač'},
        {h:'くるま', r:'kuruma', s:'auto'}, {h:'つくえ', r:'tsukue', s:'stôl'},
        {h:'いす', r:'isu', s:'stolička'}
    ]},
    { id: 'v-l2-4', label: 'L2 - Ostatné', chars: [
        {h:'チョコレート', r:'chokoreeto', s:'čokoláda'}, {h:'コーヒー', r:'koohii', s:'káva'},
        {h:'おみやげ', r:'omiyage', s:'suvenír / darček'}, {h:'えいご', r:'eigo', s:'angličtina'},
        {h:'にほんご', r:'nihongo', s:'japončina'}, {h:'ご', r:'go', s:'jazyk (prípona)'},
        {h:'なん', r:'nan', s:'čo'}, {h:'そう', r:'sou', s:'tak / áno'}
    ]},
    { id: 'v-l2-5', label: 'L2 - Frázy a reakcie', chars: [
        {h:'あのう', r:'anou', s:'ehm (váhanie)'}, {h:'えっ', r:'e', s:'čože?! (prekvapenie)'},
        {h:'どうぞ', r:'douzo', s:'nech sa páči (pri podávaní)'},
        {h:'どうもありがとうございます', r:'doumo arigatou gozaimasu', s:'veľmi pekne ďakujem'},
        {h:'そうですか', r:'sou desu ka', s:'aha / chápem'}, {h:'ちがいます', r:'chigaimasu', s:'nie je to tak / omyl'},
        {h:'あ', r:'a', s:'ah!'},
        {h:'これからおせわになります', r:'korekara osewa ni narimasu', s:'teším sa na spoluprácu'},
        {h:'こちらこそよろしく', r:'kochirakoso yoroshiku', s:'nápodobne (teší ma)'}
    ]},
    { id: 'v-l2-3', label: 'L2 - Predmety a nábytok', chars: [
        {h:'えんぴつ', r:'enpitsu', s:'ceruzka'}, {h:'ボールペン', r:'boorupen', s:'pero'},
        {h:'かぎ', r:'kagi', s:'kľúč'}, {h:'とけい', r:'tokei', s:'hodinky / hodiny'},
        {h:'かさ', r:'kasa', s:'dáždnik'}, {h:'かばん', r:'kaban', s:'taška / kufrík'},
        {h:'つくえ', r:'tsukue', s:'stôl'}, {h:'いす', r:'isu', s:'stolička'}
    ]},
    { id: 'v-l2-4', label: 'L2 - Ostatné', chars: [
        {h:'チョコレート', r:'chokoreeto', s:'čokoláda'}, {h:'コーヒー', r:'koohii', s:'káva'},
        {h:'えいご', r:'eigo', s:'angličtina'}, {h:'にほんご', r:'nihongo', s:'japončina'},
        {h:'なん', r:'nan', s:'čo'}
    ]},
    // --- SLOVÍČKA PRE LEKCIU 3 ---
    { id: 'v-l3-1', label: 'L3 - Miesta a smery', chars: [
        {h:'ここ', r:'koko', s:'tu (toto miesto)'}, {h:'そこ', r:'soko', s:'tam (pri tebe)'},
        {h:'あそこ', r:'asoko', s:'tam (ďaleko)'}, {h:'どこ', r:'doko', s:'kde'},
        {h:'こちら', r:'kochira', s:'tadiaľto / tu (zdvorilé)'}, {h:'そちら', r:'sochira', s:'tamtadiaľ / tam (zdvorilé)'},
        {h:'あちら', r:'achira', s:'tamtadiaľ (ďaleko, zdvorilé)'}, {h:'どちら', r:'dochira', s:'kade / kde (zdvorilé)'}
    ]},
    { id: 'v-l3-2', label: 'L3 - Miestnosti v budove', chars: [
        {h:'きょうしつ', r:'kyoushitsu', s:'trieda'}, {h:'しょくどう', r:'shokudou', s:'jedáleň'},
        {h:'じむしょ', r:'jimusho', s:'kancelária'}, {h:'かいぎしつ', r:'kaigishitsu', s:'zasadačka'},
        {h:'うけつけ', r:'uketsuke', s:'recepcia'}, {h:'ロビー', r:'robii', s:'loby, hala'},
        {h:'へや', r:'heya', s:'izba'}, {h:'トイレ', r:'toire', s:'záchod'}
    ]},
    { id: 'v-l3-3', label: 'L3 - Vybavenie a iné', chars: [
        {h:'かいだん', r:'kaidan', s:'schody'}, {h:'エレベーター', r:'erebeetaa', s:'výťah'},
        {h:'エスカレーター', r:'esukareetaa', s:'eskalátor'}, {h:'じどうはんばいき', r:'jidouhanbaiki', s:'predajný automat'},
        {h:'でんわ', r:'denwa', s:'telefón'}, {h:'おくに', r:'okuni', s:'krajina (vaša)'},
        {h:'かいしゃ', r:'kaisha', s:'firma'}, {h:'うち', r:'uchi', s:'dom, domov'}
    ]},
    { id: 'v-l3-4', label: 'L3 - Obchod a tovar', chars: [
        {h:'くつ', r:'kutsu', s:'topánky'}, {h:'ネクタイ', r:'nekutai', s:'kravata'},
        {h:'ワイン', r:'wain', s:'víno'}, {h:'うりば', r:'uriba', s:'oddelenie (v obchode)'},
        {h:'ちか', r:'chika', s:'suterén, podzemie'}, {h:'かい / がい', r:'kai / gai', s:'-té poschodie'},
        {h:'なんがい', r:'nangai', s:'aké poschodie'}, {h:'えん', r:'en', s:'jen (mena)'},
        {h:'いくら', r:'ikura', s:'koľko (cena)'}
    ]},
    { id: 'v-l3-5', label: 'L3 - Čísla a frázy', chars: [
        {h:'ひゃく', r:'hyaku', s:'sto'}, {h:'せん', r:'sen', s:'tisíc'},
        {h:'まん', r:'man', s:'desaťtisíc'}, {h:'すみません', r:'sumimasen', s:'prepáčte'},
        {h:'どうも', r:'doumo', s:'vďaka'}, {h:'いらっしゃいませ', r:'irasshaimase', s:'vitajte (v obchode)'},
        {h:'みせてください', r:'misete kudasai', s:'ukážte mi prosím'}, {h:'じゃ', r:'ja', s:'no, tak teda'},
        {h:'ください', r:'kudasai', s:'dajte mi prosím'}
    ]},
    { id: 'v-l3-6', label: 'L3 - Štáty a miesta', chars: [
        {h:'イタリア', r:'itaria', s:'Taliansko'}, {h:'スイス', r:'suisu', s:'Švajčiarsko'},
        {h:'フランス', r:'furansu', s:'Francúzsko'}, {h:'ジャカルタ', r:'jakaruta', s:'Jakarta'},
        {h:'バンコク', r:'bankoku', s:'Bangkok'}, {h:'ベルリン', r:'berurin', s:'Berlín'},
        {h:'しんおおさか', r:'shin-oosaka', s:'Šin-Ósaka (stanica)'}
    ]}
];

// --- APP STATE ---
let currentAlphabet = 'hiragana';
let currentMode = 'h-r';
let activeData = [];
let selectedGroups = [];
let remainingQuestions = [];
let currentQuestion = null;
let isWaiting = false;
let isChartOpen = false;

let roundScore = 0;
let roundTotal = 0;
let mistakes = [];

// --- INITIALIZATION ---
const inputEl = document.getElementById('romaji-input');
inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !isWaiting) {
        checkTextInput();
    }
});

function setAlphabet(alpha) {
    currentAlphabet = alpha;
    
    const btnHiragana = document.getElementById('alpha-hiragana');
    const btnKatakana = document.getElementById('alpha-katakana');
    const btnVocab = document.getElementById('alpha-vocab');
    
    const mode1Btn = document.getElementById('mode-h-r');
    const mode2Btn = document.getElementById('mode-r-h');
    
    const inactiveClass = "flex-1 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-700 transition-all";
    const activeClass = "flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-white text-blue-600 shadow-sm transition-all";

    btnHiragana.className = inactiveClass;
    btnKatakana.className = inactiveClass;
    btnVocab.className = inactiveClass;
    
    if (alpha === 'hiragana') {
        btnHiragana.className = activeClass;
        document.getElementById('main-title').innerText = "Hiragana Trainer";
        document.getElementById('chart-hiragana-content').classList.remove('hidden');
        document.getElementById('chart-katakana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.add('hidden');
        document.getElementById('btn-chart').classList.remove('hidden');
        mode1Btn.innerText = "Znak → Romaji";
        mode2Btn.innerText = "Romaji → Znak";
    } else if (alpha === 'katakana') {
        btnKatakana.className = activeClass;
        document.getElementById('main-title').innerText = "Katakana Trainer";
        document.getElementById('chart-katakana-content').classList.remove('hidden');
        document.getElementById('chart-hiragana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.add('hidden');
        document.getElementById('btn-chart').classList.remove('hidden');
        mode1Btn.innerText = "Znak → Romaji";
        mode2Btn.innerText = "Romaji → Znak";
    } else if (alpha === 'vocab') {
        btnVocab.className = activeClass;
        document.getElementById('main-title').innerText = "Slovíčka L1-3";
        document.getElementById('chart-katakana-content').classList.add('hidden');
        document.getElementById('chart-hiragana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.remove('hidden');         
        document.getElementById('btn-chart').classList.remove('hidden');      
        mode1Btn.innerText = "Jap → Slov";
        mode2Btn.innerText = "Slov → Romaji";
    }

    initMenu();
    showMenu();
}

function initMenu() {
    const container = document.getElementById('checkbox-container');
    container.innerHTML = '';
    
    let groupsToUse;
    if (currentAlphabet === 'hiragana') groupsToUse = hiraganaGroups;
    else if (currentAlphabet === 'katakana') groupsToUse = katakanaGroups;
    else groupsToUse = vocabGroups;

    groupsToUse.forEach((group, index) => {
        const label = document.createElement('label');
        label.className = "cursor-pointer flex items-center block";
        const isChecked = index === 0 ? 'checked' : '';
        label.innerHTML = `
            <input type="checkbox" class="hidden group-checkbox" value="${group.id}" ${isChecked}>
            <div class="w-full p-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 transition-colors hover:bg-gray-50 flex justify-between items-center">
                <span>${group.label}</span>
            </div>
        `;
        container.appendChild(label);
    });
}

// --- DYNAMIC LOGIC ---
function getKeys() {
    if (currentAlphabet === 'vocab') {
        if (currentMode === 'h-r') return { q: 'h', a: 's', input: 'button' }; 
        else return { q: 's', a: 'r', input: 'text' }; 
    } else {
        if (currentMode === 'h-r') return { q: 'h', a: 'r', input: 'text' }; 
        else return { q: 'r', a: 'h', input: 'button' }; 
    }
}

function setMode(mode) {
    currentMode = mode;
    document.getElementById('mode-h-r').className = mode === 'h-r' ? 'px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white' : 'px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700';
    document.getElementById('mode-r-h').className = mode === 'r-h' ? 'px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white' : 'px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700';
    
    if (!document.getElementById('quiz-section').classList.contains('hidden') && !isChartOpen) {
        showMenu();
    }
}

function toggleChart() {
    isChartOpen = !isChartOpen;
    const card = document.getElementById('main-card');
    const chartSec = document.getElementById('chart-section');
    const menuSec = document.getElementById('menu-section');
    const quizSec = document.getElementById('quiz-section');
    const summarySec = document.getElementById('summary-section');
    const modeSelector = document.getElementById('mode-selector');
    const btnChart = document.getElementById('btn-chart');

    if (isChartOpen) {
        card.classList.remove('max-w-md'); card.classList.add('max-w-3xl');
        btnChart.innerText = '✕ Zavrieť'; btnChart.className = 'text-sm font-bold bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors';
        menuSec.classList.add('hidden'); quizSec.classList.add('hidden'); summarySec.classList.add('hidden');
        modeSelector.classList.add('hidden'); chartSec.classList.remove('hidden');
        
        if (currentAlphabet === 'hiragana') {
            document.getElementById('chart-hiragana-content').classList.remove('hidden');
        } else if (currentAlphabet === 'katakana') {
            document.getElementById('chart-katakana-content').classList.remove('hidden');
        } else if (currentAlphabet === 'vocab') {
            document.getElementById('chart-vocab-content').classList.remove('hidden');
        }

    } else {
        card.classList.add('max-w-md'); card.classList.remove('max-w-3xl');
        btnChart.innerText = '📖 Cheat Sheet'; btnChart.className = 'text-sm font-bold bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors';
        chartSec.classList.add('hidden'); modeSelector.classList.remove('hidden');
        
        if (activeData.length === 0) menuSec.classList.remove('hidden');
        else if (remainingQuestions.length > 0 || currentQuestion !== null) {
            quizSec.classList.remove('hidden');
            if (getKeys().input === 'text' && !isWaiting) setTimeout(() => inputEl.focus(), 50);
        } else summarySec.classList.remove('hidden');
    }
}

function showMenu() {
    activeData = []; currentQuestion = null;
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('summary-section').classList.add('hidden');
    document.getElementById('menu-section').classList.remove('hidden');
}

function showSummary() {
    currentQuestion = null;
    document.getElementById('quiz-section').classList.add('hidden'); document.getElementById('menu-section').classList.add('hidden');
    document.getElementById('summary-section').classList.remove('hidden');
    document.getElementById('final-score').innerText = roundScore; document.getElementById('final-total').innerText = roundTotal;
    
    const mistakesContainer = document.getElementById('mistakes-container');
    const perfectScore = document.getElementById('perfect-score');
    const mistakesList = document.getElementById('mistakes-list');
    mistakesList.innerHTML = '';

    if (mistakes.length === 0) {
        mistakesContainer.classList.add('hidden'); perfectScore.classList.remove('hidden');
    } else {
        perfectScore.classList.add('hidden'); mistakesContainer.classList.remove('hidden');
        mistakes.forEach(m => {
            const li = document.createElement('li');
            li.innerHTML = `Zadanie <b>${m.q}</b> (správne: ${m.expected}) – tvoja odpoveď: <span class="text-red-500 font-semibold">${m.userAnswer}</span>`;
            mistakesList.appendChild(li);
        });
    }
}

function startRound() {
    activeData = []; selectedGroups = [];
    const checkboxes = document.querySelectorAll('.group-checkbox:checked');
    if (checkboxes.length === 0) { alert('Prosím, vyber si aspoň jeden okruh na cvičenie.'); return; }

    let groupsToUse = currentAlphabet === 'hiragana' ? hiraganaGroups : (currentAlphabet === 'katakana' ? katakanaGroups : vocabGroups);

    checkboxes.forEach(cb => {
        const group = groupsToUse.find(g => g.id === cb.value);
        if (group) { selectedGroups.push(group); activeData = activeData.concat(group.chars); }
    });

    roundScore = 0; roundTotal = activeData.length; mistakes = [];
    remainingQuestions = [...activeData]; shuffleArray(remainingQuestions);

    document.getElementById('score').innerText = '0'; document.getElementById('total').innerText = roundTotal; document.getElementById('feedback').innerText = '';
    document.getElementById('menu-section').classList.add('hidden'); document.getElementById('quiz-section').classList.remove('hidden');
    nextQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function nextQuestion() {
    isWaiting = false;
    if (remainingQuestions.length === 0) { showSummary(); return; }
    
    currentQuestion = remainingQuestions.pop();
    const keys = getKeys();
    const display = document.getElementById('question-display');
    
    display.innerText = currentQuestion[keys.q];
    
    if (currentAlphabet === 'vocab') display.style.fontSize = '3rem';
    else display.style.fontSize = currentMode === 'h-r' ? '5rem' : '4rem';

    updateUI();
    document.getElementById('feedback').innerText = '';
}

function updateUI() {
    const keys = getKeys();
    const inputContainer = document.getElementById('input-container');
    const optionsContainer = document.getElementById('options-container');

    if (keys.input === 'text') {
        optionsContainer.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        inputEl.value = '';
        inputEl.disabled = false;
        inputEl.placeholder = (keys.a === 'r') ? "Napíš romaji a stlač Enter" : "Napíš odpoveď a stlač Enter";
        setTimeout(() => inputEl.focus(), 50); 
    } else {
        inputContainer.classList.add('hidden');
        optionsContainer.classList.remove('hidden');
        optionsContainer.innerHTML = '';

        let options = [currentQuestion]; 
        
        let availableForRandom = activeData.filter(c => c[keys.a] !== currentQuestion[keys.a]);
        
        shuffleArray(availableForRandom);
        
        while (options.length < 5 && availableForRandom.length > 0) {
            options.push(availableForRandom.pop());
        }

        shuffleArray(options);

        options.forEach(opt => {
            const btn = document.createElement('button');
            if (currentAlphabet === 'vocab' || keys.a === 's') {
                btn.className = "px-4 py-2 m-1 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all font-bold text-lg flex items-center justify-center";
            } else {
                btn.className = "w-14 h-14 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all font-bold text-2xl flex items-center justify-center";
            }
            btn.innerText = opt[keys.a];
            btn.onclick = () => { if(!isWaiting) checkButtonInput(opt, keys); };
            optionsContainer.appendChild(btn);
        });
    }
}

function checkTextInput() {
    const userAnswer = inputEl.value.trim().toLowerCase();
    if (userAnswer === '') return; 
    inputEl.disabled = true; 
    const keys = getKeys();
    const correctAns = currentQuestion[keys.a].toLowerCase();
    processAnswer(userAnswer === correctAns, currentQuestion[keys.a], userAnswer, keys);
}

function checkButtonInput(selectedOption, keys) {
    processAnswer(selectedOption[keys.a] === currentQuestion[keys.a], currentQuestion[keys.a], selectedOption[keys.a], keys);
}

function processAnswer(isCorrect, correctAnswer, userAnswer, keys) {
    isWaiting = true;
    const feedback = document.getElementById('feedback');
    
    if (isCorrect) {
        roundScore++;
        feedback.innerText = 'Správne! ✨';
        feedback.className = 'mt-4 h-6 font-bold text-green-500';
    } else {
        mistakes.push({
            q: currentQuestion[keys.q],
            expected: correctAnswer,
            userAnswer: userAnswer
        });
        feedback.innerText = `Chyba. Správna odpoveď: ${correctAnswer}`;
        feedback.className = 'mt-4 h-6 font-bold text-red-500';
    }

    document.getElementById('score').innerText = roundScore;
    setTimeout(nextQuestion, 1200);
}

// --- CHEAT SHEET GENERATOR ---
function generateCheatSheets() {
    const hContent = document.getElementById('chart-hiragana-content');
    const kContent = document.getElementById('chart-katakana-content');

    hContent.innerHTML = `
        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Základná Hiragana (Gojūon)</h2>
        <div class="grid grid-cols-5 gap-2 mb-8 text-center text-lg">
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">あ</span>a</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">い</span>i</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">う</span>u</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">え</span>e</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">お</span>o</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">か</span>ka</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">き</span>ki</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">く</span>ku</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">け</span>ke</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">こ</span>ko</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">さ</span>sa</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">し</span>shi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">す</span>su</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">せ</span>se</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">そ</span>so</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">た</span>ta</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">ち</span>chi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">つ</span>tsu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">て</span>te</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">と</span>to</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">な</span>na</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">に</span>ni</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぬ</span>nu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ね</span>ne</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">の</span>no</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">は</span>ha</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ひ</span>hi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">ふ</span>fu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">へ</span>he</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ほ</span>ho</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ま</span>ma</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">み</span>mi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">む</span>mu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">め</span>me</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">も</span>mo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">や</span>ya</div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ゆ</span>yu</div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">よ</span>yo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ら</span>ra</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">り</span>ri</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">る</span>ru</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">れ</span>re</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ろ</span>ro</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">わ</span>wa</div>
            <div></div>
            <div></div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">を</span>wo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ん</span>n</div>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Znelé a poloznelé spoluhlásky</h2>
        <div class="mb-6 text-sm text-gray-600 space-y-3">
            <div><p><b>Dakuon (゛):</b> Neznelé sa menia na znelé: <b>k→g, s→z, t→d, h→b</b>.</p><p class="mt-1 text-gray-700"><i>Príklady:</i> か<b>ぎ</b> (ka<b>gi</b> - kľúč), か<b>ぞ</b>く (ka<b>zo</b>ku - rodina).</p></div>
            <div><p><b>Handakuon (゜):</b> Znaky z radu 'h' na zvuky 'p'.</p><p class="mt-1 text-gray-700"><i>Príklady:</i> えん<b>ぴ</b>つ (en<b>pi</b>tsu - ceruzka).</p></div>
        </div>
        <div class="grid grid-cols-5 gap-2 mb-8 text-center text-lg">
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">が</span>ga</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぎ</span>gi</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぐ</span>gu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">げ</span>ge</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ご</span>go</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ざ</span>za</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">じ</span>ji</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ず</span>zu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぜ</span>ze</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぞ</span>zo</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">だ</span>da</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぢ</span>ji</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">づ</span>zu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">で</span>de</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ど</span>do</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ば</span>ba</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">び</span>bi</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぶ</span>bu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">べ</span>be</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぼ</span>bo</div>
            <div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぱ</span>pa</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぴ</span>pi</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぷ</span>pu</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぺ</span>pe</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぽ</span>po</div>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Zložené zvuky a Sokuon (Hiragana)</h2>
        <div class="mb-6 text-sm text-gray-600 space-y-2">
            <p>Spojenie znaku 'i' s malým ya/yu/yo (ゃ, ゅ, ょ). <i>Príklady:</i> じ<b>しょ</b> (ji<b>sho</b> - slovník), じてん<b>しゃ</b> (jiten<b>sha</b> - bicykel).</p>
            <p>Sokuon (っ) zdvojuje spoluhlásku. <i>Príklad:</i> が<b>っ</b>こう (ga<b>kk</b>ou - škola).</p>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-8 text-center text-lg">
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">きゃ</span>kya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">きゅ</span>kyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">きょ</span>kyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">しゃ</span>sha</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">しゅ</span>shu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">しょ</span>sho</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ちゃ</span>cha</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ちゅ</span>chu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ちょ</span>cho</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">にゃ</span>nya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">にゅ</span>nyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">にょ</span>nyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ひゃ</span>hya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ひゅ</span>hyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ひょ</span>hyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">みゃ</span>mya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">みゅ</span>myu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">みょ</span>myo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">りゃ</span>rya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">りゅ</span>ryu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">りょ</span>ryo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぎゃ</span>gya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぎゅ</span>gyu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぎょ</span>gyo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">じゃ</span>ja</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">じゅ</span>ju</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">じょ</span>jo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">びゃ</span>bya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">びゅ</span>byu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">びょ</span>byo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぴゃ</span>pya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぴゅ</span>pyu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ぴょ</span>pyo</div>
        </div>
    `;

    kContent.innerHTML = `
        <h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Základná Katakana (Gojūon)</h2>
        <div class="grid grid-cols-5 gap-2 mb-8 text-center text-lg">
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ア</span>a</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">イ</span>i</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ウ</span>u</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">エ</span>e</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">オ</span>o</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">カ</span>ka</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">キ</span>ki</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ク</span>ku</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ケ</span>ke</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">コ</span>ko</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">サ</span>sa</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">シ</span>shi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ス</span>su</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">セ</span>se</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ソ</span>so</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">タ</span>ta</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">チ</span>chi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">ツ</span>tsu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">テ</span>te</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ト</span>to</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ナ</span>na</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ニ</span>ni</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヌ</span>nu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ネ</span>ne</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ノ</span>no</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ハ</span>ha</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヒ</span>hi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char text-blue-600">フ</span>fu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヘ</span>he</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ホ</span>ho</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">マ</span>ma</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ミ</span>mi</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ム</span>mu</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">メ</span>me</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">モ</span>mo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヤ</span>ya</div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ユ</span>yu</div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヨ</span>yo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ラ</span>ra</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">リ</span>ri</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ル</span>ru</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">レ</span>re</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ロ</span>ro</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ワ</span>wa</div>
            <div></div>
            <div></div>
            <div></div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヲ</span>wo</div>
            <div class="bg-gray-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ン</span>n</div>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Znelé a poloznelé spoluhlásky</h2>
        <div class="mb-6 text-sm text-gray-600 space-y-3">
            <div><p><b>Dakuon (゛):</b> Neznelé sa menia na znelé.</p><p class="mt-1 text-gray-700"><i>Príklady:</i> <b>ギ</b>ター (<b>gi</b>ta- - gitara), テレ<b>ビ</b> (tere<b>bi</b> - televízor).</p></div>
            <div><p><b>Handakuon (゜):</b> Znaky z radu 'h' na zvuky 'p'.</p><p class="mt-1 text-gray-700"><i>Príklady:</i> <b>パ</b>ソコン (<b>pa</b>sokon - počítač).</p></div>
        </div>
        <div class="grid grid-cols-5 gap-2 mb-8 text-center text-lg">
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ガ</span>ga</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ギ</span>gi</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">グ</span>gu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ゲ</span>ge</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ゴ</span>go</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ザ</span>za</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ジ</span>ji</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ズ</span>zu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ゼ</span>ze</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ゾ</span>zo</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ダ</span>da</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヂ</span>ji</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヅ</span>zu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">デ</span>de</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ド</span>do</div>
            <div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">バ</span>ba</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ビ</span>bi</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ブ</span>bu</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ベ</span>be</div><div class="bg-blue-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ボ</span>bo</div>
            <div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">パ</span>pa</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ピ</span>pi</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">プ</span>pu</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ペ</span>pe</div><div class="bg-red-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ポ</span>po</div>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Zložené zvuky a Chōonpu (Katakana)</h2>
        <div class="mb-6 text-sm text-gray-600 space-y-2">
            <p>Spojenie znaku 'i' s malým ya/yu/yo (ャ, ュ, ョ). <i>Príklady:</i> <b>シャ</b>ツ (<b>sha</b>tsu - košeľa), <b>キャ</b>ンプ (<b>kya</b>npu - kempovať).</p>
            <p><b>Chōonpu (ー):</b> V katakane sa dlhé samohlásky takmer vždy označujú čiarou. <i>Príklad:</i> コ<b>ー</b>ヒ<b>ー</b> (ko<b>o</b>hi<b>i</b> - káva), ケ<b>ー</b>キ (ke<b>e</b>ki - torta).</p>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-8 text-center text-lg">
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">キャ</span>kya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">キュ</span>kyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">キョ</span>kyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">シャ</span>sha</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">シュ</span>shu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ショ</span>sho</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">チャ</span>cha</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">チュ</span>chu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">チョ</span>cho</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ニャ</span>nya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ニュ</span>nyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ニョ</span>nyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヒャ</span>hya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヒュ</span>hyu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ヒョ</span>hyo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ミャ</span>mya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ミュ</span>myu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">ミョ</span>myo</div>
            <div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">リャ</span>rya</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">リュ</span>ryu</div><div class="bg-purple-50 p-2 rounded"><span class="block text-2xl font-bold chart-char">リョ</span>ryo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ギャ</span>gya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ギュ</span>gyu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ギョ</span>gyo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ジャ</span>ja</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ジュ</span>ju</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ジョ</span>jo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ビャ</span>bya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ビュ</span>byu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ビョ</span>byo</div>
            <div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ピャ</span>pya</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ピュ</span>pyu</div><div class="bg-purple-100 p-2 rounded"><span class="block text-2xl font-bold chart-char">ピョ</span>pyo</div>
        </div>
    `;

    const vContent = document.getElementById('chart-vocab-content');
    if (vContent) {
        let vHtml = '';
        
        const l1Groups = vocabGroups.filter(g => g.id.startsWith('v-l1'));
        vHtml += '<h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 mt-4">Lekcia 1 (Zámená, ľudia, miesta)</h2>';
        vHtml += '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-center text-sm">';
        l1Groups.forEach(group => {
            group.chars.forEach(item => {
                vHtml += `
                <div class="bg-gray-50 p-2 rounded shadow-sm border border-gray-100 flex flex-col justify-center transition-all hover:border-blue-300">
                    <span class="block text-xl font-bold chart-char text-blue-600 mb-1">${item.h}</span>
                    <span class="block font-bold text-gray-700">${item.r}</span>
                    <span class="block text-xs text-gray-500 mt-1">${item.s}</span>
                </div>`;
            });
        });
        vHtml += '</div>';

        const l2Groups = vocabGroups.filter(g => g.id.startsWith('v-l2'));
        vHtml += '<h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Lekcia 2 (Ukazovacie zámená a predmety)</h2>';
        vHtml += '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-center text-sm">';
        l2Groups.forEach(group => {
            group.chars.forEach(item => {
                vHtml += `
                <div class="bg-gray-50 p-2 rounded shadow-sm border border-gray-100 flex flex-col justify-center transition-all hover:border-blue-300">
                    <span class="block text-xl font-bold chart-char text-blue-600 mb-1">${item.h}</span>
                    <span class="block font-bold text-gray-700">${item.r}</span>
                    <span class="block text-xs text-gray-500 mt-1">${item.s}</span>
                </div>`;
            });
        });
        vHtml += '</div>';

        const l3Groups = vocabGroups.filter(g => g.id.startsWith('v-l3'));
        vHtml += '<h2 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 mt-6">Lekcia 3 (Miesta, smery a nákupy)</h2>';
        vHtml += '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-center text-sm">';
        l3Groups.forEach(group => {
            group.chars.forEach(item => {
                vHtml += `
                <div class="bg-gray-50 p-2 rounded shadow-sm border border-gray-100 flex flex-col justify-center transition-all hover:border-blue-300">
                    <span class="block text-xl font-bold chart-char text-blue-600 mb-1">${item.h}</span>
                    <span class="block font-bold text-gray-700">${item.r}</span>
                    <span class="block text-xs text-gray-500 mt-1">${item.s}</span>
                </div>`;
            });
        });
        vHtml += '</div>';
        
        vContent.innerHTML = vHtml;
    }
}

generateCheatSheets();
initMenu();