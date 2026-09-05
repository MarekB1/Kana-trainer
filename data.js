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

console.log("data načítané")