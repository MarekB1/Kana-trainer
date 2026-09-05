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
    
    // Nové responzívne triedy - pridali sme flex-1, text-center md:text-left a whitespace-nowrap
    const inactiveClass = "px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-transparent flex-1 text-center md:text-left whitespace-nowrap text-sm md:text-base";
    const activeClass = "px-4 py-3 rounded-xl font-bold bg-blue-50 text-blue-700 shadow-sm transition-all border border-blue-200 flex-1 text-center md:text-left whitespace-nowrap text-sm md:text-base";

    btnHiragana.className = inactiveClass;
    btnKatakana.className = inactiveClass;
    btnVocab.className = inactiveClass;
    
    if (alpha === 'hiragana') {
        btnHiragana.className = activeClass;
        document.getElementById('main-title').innerText = "Hiragana Trainer";
        document.getElementById('chart-hiragana-content').classList.remove('hidden');
        document.getElementById('chart-katakana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.add('hidden');
        mode1Btn.innerText = "Znak → Romaji";
        mode2Btn.innerText = "Romaji → Znak";
    } else if (alpha === 'katakana') {
        btnKatakana.className = activeClass;
        document.getElementById('main-title').innerText = "Katakana Trainer";
        document.getElementById('chart-katakana-content').classList.remove('hidden');
        document.getElementById('chart-hiragana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.add('hidden');
        mode1Btn.innerText = "Znak → Romaji";
        mode2Btn.innerText = "Romaji → Znak";
    } else if (alpha === 'vocab') {
        btnVocab.className = activeClass;
        document.getElementById('main-title').innerText = "Slovíčka L1-3";
        document.getElementById('chart-katakana-content').classList.add('hidden');
        document.getElementById('chart-hiragana-content').classList.add('hidden');
        document.getElementById('chart-vocab-content').classList.remove('hidden');         
        mode1Btn.innerText = "Jap → Slov";
        mode2Btn.innerText = "Slov → Romaji";
    }

    initMenu();
    showMenu();
}

function initMenu() {
    const container = document.getElementById('checkbox-container');
    container.innerHTML = '';
    
    const lessonSelectors = document.getElementById('lesson-selectors');
    if (currentAlphabet === 'vocab') {
        lessonSelectors.classList.remove('hidden');
    } else {
        lessonSelectors.classList.add('hidden');
    }
    
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

function selectAllGroups() {
    const checkboxes = document.querySelectorAll('.group-checkbox');
    
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });
}

function selectLesson(prefix) {
    const checkboxes = document.querySelectorAll('.group-checkbox');
    const lessonCheckboxes = Array.from(checkboxes).filter(cb => cb.value.startsWith(prefix));
    
    if (lessonCheckboxes.length === 0) return;
    const allChecked = lessonCheckboxes.every(cb => cb.checked);

    lessonCheckboxes.forEach(cb => {
        cb.checked = !allChecked;
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
    const activeModeClass = "px-2 md:px-4 py-2 md:py-3 rounded-xl font-bold transition-colors bg-blue-600 text-white text-center md:text-left shadow-sm flex-1 text-sm md:text-base whitespace-nowrap";
    const inactiveModeClass = "px-2 md:px-4 py-2 md:py-3 rounded-xl font-bold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 text-center md:text-left flex-1 text-sm md:text-base whitespace-nowrap";

    document.getElementById('mode-h-r').className = mode === 'h-r' ? activeModeClass : inactiveModeClass;
    document.getElementById('mode-r-h').className = mode === 'r-h' ? activeModeClass : inactiveModeClass;
    
    if (!document.getElementById('quiz-section').classList.contains('hidden') && !isChartOpen) {
        showMenu();
    }
}

function toggleChart() {
    isChartOpen = !isChartOpen;
    const chartSec = document.getElementById('chart-section');
    const menuSec = document.getElementById('menu-section');
    const quizSec = document.getElementById('quiz-section');
    const summarySec = document.getElementById('summary-section');
    const btnChart = document.getElementById('btn-chart');

    if (isChartOpen) {
        btnChart.innerText = '✕ Zavrieť Cheat Sheet'; 
        btnChart.className = 'w-full text-sm font-bold bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors shadow-sm';
        
        menuSec.classList.add('hidden'); 
        quizSec.classList.add('hidden'); 
        summarySec.classList.add('hidden');
        chartSec.classList.remove('hidden');
        
        if (currentAlphabet === 'hiragana') {
            document.getElementById('chart-hiragana-content').classList.remove('hidden');
        } else if (currentAlphabet === 'katakana') {
            document.getElementById('chart-katakana-content').classList.remove('hidden');
        } else if (currentAlphabet === 'vocab') {
            document.getElementById('chart-vocab-content').classList.remove('hidden');
        }

    } else {
        btnChart.innerText = '📖 Otvoriť Cheat Sheet'; 
        btnChart.className = 'w-full text-sm font-bold bg-purple-100 text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-200 transition-colors shadow-sm';
        chartSec.classList.add('hidden');
        
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
    
    display.className = "font-bold text-blue-600 mb-6 md:mb-8 flex items-center justify-center text-center px-4 leading-tight";
    
    if (currentAlphabet === 'vocab') {
        display.classList.add('text-4xl', 'md:text-5xl');
    } else {
        if (currentMode === 'h-r') {
            display.classList.add('text-7xl', 'md:text-[6rem]');
        } else {
            display.classList.add('text-5xl', 'md:text-6xl');
        }
    }

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

console.log("main načítaný")