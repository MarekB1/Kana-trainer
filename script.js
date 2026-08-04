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
    
    if (alpha === 'hiragana') {
        btnHiragana.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-white text-blue-600 shadow-sm transition-all";
        btnKatakana.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-700 transition-all";
        document.getElementById('main-title').innerText = "Hiragana Trainer";
        document.getElementById('chart-hiragana-content').classList.remove('hidden');
        document.getElementById('chart-katakana-content').classList.add('hidden');
    } else {
        btnKatakana.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-white text-blue-600 shadow-sm transition-all";
        btnHiragana.className = "flex-1 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-700 transition-all";
        document.getElementById('main-title').innerText = "Katakana Trainer";
        document.getElementById('chart-katakana-content').classList.remove('hidden');
        document.getElementById('chart-hiragana-content').classList.add('hidden');
    }

    initMenu();
    showMenu();
}

function initMenu() {
    const container = document.getElementById('checkbox-container');
    container.innerHTML = '';
    
    const groupsToUse = currentAlphabet === 'hiragana' ? hiraganaGroups : katakanaGroups;

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

// --- LOGIC: MODES & CHART ---
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
    const langSwitch = document.getElementById('lang-switch');

    if (isChartOpen) {
        card.classList.remove('max-w-md');
        card.classList.add('max-w-3xl');
        btnChart.innerText = '✕ Close Chart';
        btnChart.className = 'text-sm font-bold bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors';
        console.log(langSwitch)
        langSwitch.style.display = 'none'
        
        menuSec.classList.add('hidden');
        quizSec.classList.add('hidden');
        summarySec.classList.add('hidden');
        modeSelector.classList.add('hidden');
        chartSec.classList.remove('hidden');
    } else {
        card.classList.add('max-w-md');
        card.classList.remove('max-w-3xl');
        btnChart.innerText = '📖 Cheat Sheet';
        btnChart.className = 'text-sm font-bold bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors';
        langSwitch.style.display = 'flex'
        
        chartSec.classList.add('hidden');
        modeSelector.classList.remove('hidden');
        
        if (activeData.length === 0) {
            menuSec.classList.remove('hidden');
        } else if (remainingQuestions.length > 0 || currentQuestion !== null) {
            quizSec.classList.remove('hidden');
            if (currentMode === 'h-r' && !isWaiting) {
                setTimeout(() => inputEl.focus(), 50);
            }
        } else {
            summarySec.classList.remove('hidden');
        }
    }
}

function showMenu() {
    activeData = [];
    currentQuestion = null;
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('summary-section').classList.add('hidden');
    document.getElementById('menu-section').classList.remove('hidden');
}

function showSummary() {
    currentQuestion = null;
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('menu-section').classList.add('hidden');
    const summarySec = document.getElementById('summary-section');
    summarySec.classList.remove('hidden');

    document.getElementById('final-score').innerText = roundScore;
    document.getElementById('final-total').innerText = roundTotal;

    const mistakesContainer = document.getElementById('mistakes-container');
    const perfectScore = document.getElementById('perfect-score');
    const mistakesList = document.getElementById('mistakes-list');
    mistakesList.innerHTML = '';

    if (mistakes.length === 0) {
        mistakesContainer.classList.add('hidden');
        perfectScore.classList.remove('hidden');
    } else {
        perfectScore.classList.add('hidden');
        mistakesContainer.classList.remove('hidden');
        
        mistakes.forEach(m => {
            const li = document.createElement('li');
            li.innerHTML = `Character <b>${m.h}</b> (${m.r}) – your answer: <span class="text-red-500 font-semibold">${m.userAnswer}</span>`;
            mistakesList.appendChild(li);
        });
    }
}

// --- LOGIC: QUIZ ---
function startRound() {
    activeData = [];
    selectedGroups = [];
    const checkboxes = document.querySelectorAll('.group-checkbox:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one row to practice.');
        return;
    }

    const groupsToUse = currentAlphabet === 'hiragana' ? hiraganaGroups : katakanaGroups;

    checkboxes.forEach(cb => {
        const group = groupsToUse.find(g => g.id === cb.value);
        if (group) {
            selectedGroups.push(group);
            activeData = activeData.concat(group.chars);
        }
    });

    roundScore = 0;
    roundTotal = activeData.length;
    mistakes = [];
    remainingQuestions = [...activeData];
    shuffleArray(remainingQuestions);

    document.getElementById('score').innerText = '0';
    document.getElementById('total').innerText = roundTotal;
    document.getElementById('feedback').innerText = '';

    document.getElementById('menu-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    
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
    
    if (remainingQuestions.length === 0) {
        showSummary();
        return;
    }
    
    currentQuestion = remainingQuestions.pop();
    
    const display = document.getElementById('question-display');
    display.innerText = currentQuestion.h;
    display.style.fontSize = currentMode === 'h-r' ? '5rem' : '4rem';

    updateUI();
    document.getElementById('feedback').innerText = '';
}

function updateUI() {
    const inputContainer = document.getElementById('input-container');
    const optionsContainer = document.getElementById('options-container');

    if (currentMode === 'h-r') {
        optionsContainer.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        inputEl.value = '';
        inputEl.disabled = false;
        setTimeout(() => inputEl.focus(), 50); 
    } else {
        inputContainer.classList.add('hidden');
        optionsContainer.classList.remove('hidden');
        optionsContainer.innerHTML = '';

        let options = []; 

        if (selectedGroups.length <= 2) {
            options = [...activeData];
        } else {
            const currentGroup = selectedGroups.find(g => g.chars.some(c => c.h === currentQuestion.h));
            options = [...currentGroup.chars];

            let availableForRandom = activeData.filter(c => !options.some(opt => opt.h === c.h));
            shuffleArray(availableForRandom);

            while (options.length < 10 && availableForRandom.length > 0) {
                options.push(availableForRandom.pop());
            }
        }

        options.sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "w-14 h-14 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all font-bold text-2xl flex items-center justify-center";
            btn.innerText = opt.h;
            btn.onclick = () => { if(!isWaiting) checkButtonInput(opt); };
            optionsContainer.appendChild(btn);
        });
    }
}

function checkTextInput() {
    const userAnswer = inputEl.value.trim().toLowerCase();
    if (userAnswer === '') return; 
    
    inputEl.disabled = true; 
    processAnswer(userAnswer === currentQuestion.r, currentQuestion.r, userAnswer);
}

function checkButtonInput(selectedOption) {
    processAnswer(selectedOption.h === currentQuestion.h, currentQuestion.h, selectedOption.h);
}

function processAnswer(isCorrect, correctAnswer, userAnswer) {
    isWaiting = true;
    const feedback = document.getElementById('feedback');
    
    if (isCorrect) {
        roundScore++;
        feedback.innerText = 'Correct! ✨';
        feedback.className = 'mt-4 h-6 font-bold text-green-500';
    } else {
        mistakes.push({
            h: currentQuestion.h,
            r: currentQuestion.r,
            userAnswer: userAnswer
        });

        feedback.innerText = `Incorrect. Correct answer: ${correctAnswer}`;
        feedback.className = 'mt-4 h-6 font-bold text-red-500';
    }

    document.getElementById('score').innerText = roundScore;
    setTimeout(nextQuestion, 1200);
}

// --- CHEAT SHEET GENERATOR (Slovak content preserved) ---
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
}

generateCheatSheets();
initMenu();