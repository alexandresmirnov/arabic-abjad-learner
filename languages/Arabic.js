/*
eventually, this will extend a Language class with required methods:
  - getNewWord(length)
  - getNewChar()
*/

class Arabic {
  constructor(config) {
    this.settings = config.settings;
    this.type = config.type;
    this.pairs = {
      chars: {
        trouble: [
          ['ـبـ','b'],
          ['ـتـ','t'],
          ['ـيـ','i'],
          ['ـنـ','n'],
          ['ـلـ','l'],
          ['ـا','a'],
          ['ـجـ','j'],
          ['ـحـ','H'],
          ['ـخـ','kh'],
          ['ـفـ','f'],
          ['ـقـ','q'],
          ['إ','i'],
          ['أ','a'],
          ['أُ','u']
        ],
        initial: [
          ['بـ','b'],
          ['تـ','t'],
          ['يـ','i'],
          ['نـ','n'],
          ['لـ','l'],
          ['ا','a'],
          ['جـ','j'],
          ['حـ','H'],
          ['خـ','kh'],
          ['فـ','f'],
          ['قـ','q'],
          ['إ','i'],
          ['أ','a'],
          ['أُ','u']
        ],
        medial: [
          ['ـبـ','b'],
          ['ـتـ','t'],
          ['ـثـ','th'],
          ['ـجـ','j'],
          ['ـحـ','H'],
          ['ـخـ','kh'],
          ['ـدـ','d'],
          ['ـذـ','dh'],
          ['ـرـ','r'],
          ['ـزـ','z'],
          ['ـسـ','s'],
          ['ـشـ','sh'],
          ['ـصـ','S'],
          ['ـضـ','D'],
          ['ـطـ','T'],
          ['ـظـ','Z'],
          ['ـعـ','g'],
          ['ـغـ','gh'],
          ['ـفـ','f'],
          ['ـقـ','q'],
          ['ـكـ','k'],
          ['ـلـ','l'],
          ['ـمـ','m'],
          ['ـنـ','n'],
          ['ـهـ','h'],
          ['ـوـ','w'],
          ['ـيـ','y'],
          ['ـإـ','i'],
          ['ـأـ','a'],
          ['ـأُـ','u']
        ],
        final: [
          ['ـب','b'],
          ['ـت','t'],
          ['ـث','th'],
          ['ـج','j'],
          ['ـح','H'],
          ['ـخ','kh'],
          ['ـد','d'],
          ['ـذ','dh'],
          ['ـر','r'],
          ['ـز','z'],
          ['ـس','s'],
          ['ـش','sh'],
          ['ـص','S'],
          ['ـض','D'],
          ['ـط','T'],
          ['ـظ','Z'],
          ['ـع','g'],
          ['ـغ','gh'],
          ['ـف','f'],
          ['ـق','q'],
          ['ـك','k'],
          ['ـل','l'],
          ['ـم','m'],
          ['ـن','n'],
          ['ـه','h'],
          ['ـو','w'],
          ['ـي','y'],
          ['ـإ','i'],
          ['ـأ','a'],
          ['ـأُ','u']
        ],
        isolated: [
          ['ب','b'],
          ['ت','t'],
          ['ث','th'],
          ['ج','j'],
          ['ح','H'],
          ['خ','kh'],
          ['د','d'],
          ['ذ','dh'],
          ['ر','r'],
          ['ز','z'],
          ['س','s'],
          ['ش','sh'],
          ['ص','S'],
          ['ض','D'],
          ['ط','T'],
          ['ظ','Z'],
          ['ع','g'],
          ['غ','gh'],
          ['ف','f'],
          ['ق','q'],
          ['ك','k'],
          ['ل','l'],
          ['م','m'],
          ['ن','n'],
          ['ه','h'],
          ['و','w'],
          ['ي','y'],
          ['إ','i'],
          ['أ','a'],
          ['أُ','u']
        ],
      },
      vowelPairs: {
        fathaPairs: [
          ['بَ','ba'],
          ['تَ','ta'],
          ['ثَ','tha'],
          ['جَ','ja'],
          ['حَ','Ha'],
          ['خَ','kha'],
          ['دَ','da'],
          ['ذَ','dha'],
          ['رَ','ra'],
          ['زَ','za'],
          ['سَ','sa'],
          ['شَ','sha'],
          ['صَ','Sa'],
          ['ضَ','Da'],
          ['طَ','Ta'],
          ['ظَ','Za'],
          ['عَ','ga'],
          ['غَ','gha'],
          ['فَ','fa'],
          ['قَ','qa'],
          ['كَ','ka'],
          ['لَ','la'],
          ['مَ','ma'],
          ['نَ','na'],
          ['هَ','ha'],
          //['وَ','wa'],
          //['يَ','ya']
        ],
        dammaPairs: [
          ['بُ','bu'],
          ['تُ','tu'],
          ['ثُ','thu'],
          ['جُ','ju'],
          ['حُ','Hu'],
          ['خُ','khu'],
          ['دُ','du'],
          ['ذُ','dhu'],
          ['رُ','ru'],
          ['زُ','zu'],
          ['سُ','su'],
          ['شُ','shu'],
          ['صُ','Su'],
          ['ضُ','Du'],
          ['طُ','Tu'],
          ['ظُ','Zu'],
          ['عُ','gu'],
          ['غُ','ghu'],
          ['فُ','fu'],
          ['قُ','qu'],
          ['كُ','ku'],
          ['لُ','lu'],
          ['مُ','mu'],
          ['نُ','nu'],
          ['هُ','hu'],
          //['يُ','yu'],
        ],
        kasraPairs: [
          ['بِ','bi'],
          ['تِ','ti'],
          ['ثِ','thi'],
          ['جِ','ji'],
          ['حِ','Hi'],
          ['خِ','khi'],
          ['دِ','di'],
          ['ذِ','dhi'],
          ['رِ','ri'],
          ['زِ','zi'],
          ['سِ','si'],
          ['شِ','shi'],
          ['صِ','Si'],
          ['ضِ','Di'],
          ['طِ','Ti'],
          ['ظِ','Zi'],
          ['عِ','gi'],
          ['غِ','ghi'],
          ['فِ','fi'],
          ['قِ','qi'],
          ['كِ','ki'],
          ['لِ','li'],
          ['مِ','mi'],
          ['نِ','ni'],
          ['هِ','hi'],
          //['وِ','wi']
        ],
      },
      plainPairs: {
        obstruents: [
          ['ب','b'],
          ['ت','t'],
          ['ث','th'],
          ['ج','j'],
          ['ح','H'],
          ['خ','kh'],
          ['د','d'],
          ['ذ','dh'],
          ['ز','z'],
          ['س','s'],
          ['ش','sh'],
          ['ص','S'],
          ['ض','D'],
          ['ط','T'],
          ['ظ','Z'],
          ['ع','g'],
          ['غ','gh'],
          ['ف','f'],
          ['ق','q'],
          ['ك','k'],
          ['ه','h'],
        ],
        sonorants: [
          ['ر','r'],
          ['ل','l'],
          ['م','m'],
          ['ن','n'],
          ['و','w'],
          ['ي','y'],
        ],
      },
      other: {
        hamzaAlifPairs: [
          ['أَ',"a"],
          ['أُ',"u"],
          ['إ',"i"]
        ],
        tm: [
          ['ة', 'h']
        ],
        longVowels: [
          ['ا',"a"],
          ['ي',"i"],
          ['و',"u"]
        ],
        offGlides: [
          ['ي',"y"],
          ['و',"w"]
        ]
      }
    };
  }

  getPairs() {
    return this.pairs;
  }

  //0...max
  randomInt(max) {
    return Math.floor(Math.random()*(max+1));
  }

  //get random element from array
  getRandomEl(array) {
    let random = this.randomInt(array.length-1);
    let el = array[random];
    return el;
  }

  getRandomDatum(dataArray){
    let el = this.getRandomEl(dataArray);
    return {
      char: el[0],
      answer: el[1]
    }
  }

  getNewDatum(config) {

    console.log('getNewDatum called with config:',config);

    let pairBank = [];
    let pairs = this.pairs;

    for(let group in pairs){ //group == chars, vowelPairs, plainPairs, other
      if(config[group] != null){
        if(config[group] == true){ //include everything
          for(let type in pairs[group]){
            pairBank = pairBank.concat(pairs[group][type]);
          }
        }
        else { //group is object, go inside
          for(let type in pairs[group]){ //type == fathaPairs, obstruents, etc.
            if(config[group][type] != null){
              if(config[group][type] == true){ //include everything
                pairBank = pairBank.concat(pairs[group][type]);
              }
            }
          }
        }
      }
    }

    return this.getRandomDatum(pairBank);

  }

  getNewSyllable() {

    let preCodaChance = 0.3; //w, y, r, l, n, m
    let codaChance = 0.3; //any consonant

    let syllable = {
      char: '',
      answer: ''
    }

    //start with a regular vowel
    let start = this.getNewDatum({
      vowelPairs: {
        fathaPairs: true,
        kasraPairs: true,
        dammaPairs: true,
      }
    });

    syllable = {
      char: syllable.char + start.char,
      answer: syllable.answer + start.answer
    }

    //possibly a pre-coda
    if(Math.random() < preCodaChance){
      let preCoda = this.getNewDatum({
        plainPairs: {
          sonorants: true
        }
      })

      syllable = {
        char: syllable.char + preCoda.char,
        answer: syllable.answer + preCoda.answer
      }
    }

    //possibly a coda
    if(Math.random() < codaChance){
      let coda = this.getNewDatum({
        plainPairs: {
          obstruents: true
        }
      })

      syllable = {
        char: syllable.char + coda.char,
        answer: syllable.answer + coda.answer
      }
    }

    return syllable;
  }

  //daChance: chance of definite article as first syllable
  getNewStartSyllable() {
    //30% chance of definite article
    if(Math.random() < this.settings.daChance){
      return {
        char: 'ال',
        answer: 'al'
      }
    }
    //otherwise normal syllable
    else {
      return this.getNewSyllable();
    }
  }

  getNewEndSyllable() {
    //30% chance of a tm syllable
    if(Math.random() < this.settings.tmChance){
      let fathaDatum = this.getNewDatum({
        vowelPairs: {
          fathaPairs: true
        }
      });

      let tm = this.getNewDatum({
        other: {
          tm: true
        }
      })

      return {
        char: fathaDatum.char + tm.char,
        answer: fathaDatum.answer + tm.answer
      }
    }
    //otherwise normal syllable
    else {
      let syllable = this.getNewSyllable();

      return syllable;

    }
  }


  //length is amount of syllables
  getNewWord() {

    let length = this.settings.length;

    let word =  {
      char: '',
      answer: ''
    };

    let syllable;

    for(let i = 0; i < length; i ++){
      //if we're at start
      if(i == 0){
        syllable = this.getNewStartSyllable();

        word.char += syllable.char;
        word.answer += syllable.answer;
      }
      //second syllable
      else if(i == 1){
        syllable = this.getNewSyllable();

        //if definite article, handle sun letters
        if(word.answer == 'al'){
          //add char to arabic word as usual
          word.char += syllable.char;

          let sunLetters = ['n', 'l', 'r', 's', 'S', 'z', 'Z', 't', 'T', 't', 'd', 'D', 'j'];

          //if first letter is sun letter
          if(sunLetters.includes(syllable.answer.slice(0,1))) {
              //replace 'l' of word with first english letter of this char
              word.answer = word.answer.slice(0,-1) + syllable.answer.slice(0,1) + syllable.answer;
          }
          else{
            word.answer += syllable.answer;
          }

        }
        //no article = proceed normally
        else {
          word.char += syllable.char;
          word.answer += syllable.answer;
        }
      }
      //if we're at end
      else if(i == length-1){
        syllable = this.getNewEndSyllable();

        word.char += syllable.char;
        word.answer += syllable.answer;

      }
      //in the middle, just grab a normal syllable
      else {
        syllable = this.getNewSyllable();

        word.char += syllable.char;
        word.answer += syllable.answer;
      }

    }

    console.log('returning word:', word);
    return word;
  }

  //returns a single char
  getNewChar() {
    let config = {
      chars: {
        initial: this.settings.includeForms.initial,
        medial: this.settings.includeForms.medial,
        medial: this.settings.includeForms.medial,
        final: this.settings.includeForms.final,
        isolated: this.settings.includeForms.isolated,
      }
    }

    return this.getNewDatum(config);
  }

  getNew() {
    if(this.type == 'words'){
      return this.getNewWord();
    }
    else {
      return this.getNewChar();
    }
  }
}

let pairs = Arabic.pairs;

export default Arabic;
