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
      troubleForms: [
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
      initialForms: [
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
      medialForms: [
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
      finalForms: [
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
      isolatedForms: [
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
      //valid word-final only
      plainPairs: [
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
        //['و','w'],
        //['ي','y'],
      ],
      //valid anywhere
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
      //valid anywhere
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
      //valid anywhere
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
      //I'll put these in the beginning for now
      hamzaAlifPairs: [
        ['أَ',"a"],
        ['أُ',"u"],
        ['إ',"i"]
      ],
      //only after word-final sounds
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
    };
  }

  getPairs() {
    return this.pairs;
  }

  //0...max
  randomInt(max) {
    return Math.floor(Math.random()*(max+1));
  }

  //return a random pair from set
  getRandomPair(set) {
    let random = this.randomInt(set.length-1);
    return set[random];
  }

  getNewSyllable() {

    let randomInt = this.randomInt;
    let pairs = this.getPairs();

    let hamzaAlifPairs = pairs.hamzaAlifPairs;
    let fathaPairs = pairs.fathaPairs;
    let dammaPairs = pairs.dammaPairs;
    let kasraPairs = pairs.kasraPairs;
    let plainPairs = pairs.plainPairs;
    let tm = pairs.tm;
    let longVowels = pairs.longVowels;
    let offGlides = pairs.offGlides;

    let plainNuclei = ['a', 'i', 'u'];
    let diphthongNuclei = ['ay', 'aw'];
    let longNuclei = ['ii', 'aa', 'uu'];

    //one of the above nuclei, used for switch statement
    let nucleus;

    //pairs we'll be concatenating
    let onset;
    let offGlide = ['','']; //need default values since they might end up empty
    let coda = ['',''];
    let syllable = ['',''];

    switch(randomInt(2)) {
      //plainNuclei, so we just need an onset
      case 0:
        nucleus = plainNuclei[randomInt(2)];

        switch(nucleus) {
          case 'a':
            onset = fathaPairs[randomInt(fathaPairs.length-1)];
            break;
          case 'i':
            onset = kasraPairs[randomInt(kasraPairs.length-1)];
            break;
          case 'u':
            onset = dammaPairs[randomInt(dammaPairs.length-1)];
            break;
        }

        syllable[0] += onset[0];
        syllable[1] += onset[1];

        break;

      //diphthongNuclei
      case 1:
        nucleus = diphthongNuclei[randomInt(1)];

        onset = fathaPairs[randomInt(fathaPairs.length-1)];
        switch(nucleus) {
          case 'ay':
            //append a 'y'
            offGlide = offGlides[0];
            break;
          case 'aw':
            //append a 'w'
            offGlide = offGlides[1];
            break;
        }

        syllable[0] += onset[0] + offGlide[0];
        syllable[1] += onset[1] + offGlide[1];

        break;

      //longNuclei
      case 2:
        nucleus = longNuclei[randomInt(2)];

        switch(nucleus) {
          case 'aa':
            onset = fathaPairs[randomInt(fathaPairs.length-1)];
            offGlide = longVowels[0];
            break;
          case 'ii':
            onset = kasraPairs[randomInt(kasraPairs.length-1)];
            offGlide = longVowels[1];
            break;
          case 'uu':
            onset = dammaPairs[randomInt(dammaPairs.length-1)];
            offGlide = longVowels[2];
            break;
        }

        syllable[0] += onset[0] + offGlide[0];
        syllable[1] += onset[1] + offGlide[1];

    }

    return {
      char: syllable[0],
      answer: syllable[1],
    }
  }

  //daChance: chance of definite article as first syllable
  getNewStartSyllable() {
    //30% chance of definite article
    if(Math.random() < this.settings.daChance){
      return {
        char: this.pairs.longVowels[0][0] + this.pairs.plainPairs[21][0],
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
      let fathaPair = this.getRandomPair(this.getPairs().fathaPairs);
      let tm = this.getPairs().tm[0];

      return {
        char: fathaPair[0] + tm[0],
        answer: fathaPair[1] + tm[1]
      }
    }
    //otherwise normal syllable with chance of consonant at end
    else {
      let syllable = this.getNewSyllable();
      let finalConsonant = {
        char: '',
        answer: ''
      }

      if(syllable.answer.slice(-1) == 'w' ||
      syllable.answer.slice(-1) == 'y' || Math.random() < 0.3){
        let finalConsonantPair = this.getRandomPair(this.getPairs().plainPairs);
        finalConsonant.char = finalConsonantPair[0];
        finalConsonant.answer = finalConsonantPair[1];
      }

      return {
        char: syllable.char + finalConsonant.char,
        answer: syllable.answer + finalConsonant.answer
      }

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
    let pairBank = [];

    if(this.settings.includeForms.initial == true){
      pairBank = pairBank.concat(this.getPairs().initialForms);
    }
    if(this.settings.includeForms.medial == true){
      pairBank = pairBank.concat(this.getPairs().medialForms);
    }
    if(this.settings.includeForms.final == true){
      pairBank = pairBank.concat(this.getPairs().finalForms);
    }
    if(this.settings.includeForms.isolated == true){
      pairBank = pairBank.concat(this.getPairs().isolatedForms);
    }
    if(this.settings.includeForms.trouble == true){
      pairBank = pairBank.concat(this.getPairs().troubleForms);
    }

    let pair = this.getRandomPair(pairBank);

    return {
      char: pair[0],
      answer: pair[1]
    }
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
