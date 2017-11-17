/* @flow */

/*
eventually, this will extend a Language class with required methods:
  - getNewWord(length)
  - getNewChar()
*/

type Tuple = [string, string];

type Datum = {
  char: string,
  answer: string
}

type CharsConfig = {
  type: 'chars',
  settings: CharsSettings
}

type CharsSettings = {
  includeForms: {
    initial: boolean,
    medial: boolean,
    final: boolean,
    isolated: boolean,
    trouble: boolean
  }
}

type WordsConfig = {
  type: 'words',
  settings: WordsSettings
}

type WordsSettings = {
  length: number,
  daChance: number,
  tmChance: number
}

type PatternsConfig = {
  type: 'patterns',
  settings: PatternsSettings
}

type PatternsSettings = {
  length: number,
}

type Config = CharsConfig | WordsConfig | PatternsConfig;
type Settings = CharsSettings | WordsSettings | PatternsSettings;

type Tuples = {
  chars: {
    trouble: Array<Tuple>,
    initial: Array<Tuple>,
    medial: Array<Tuple>,
    final: Array<Tuple>,
    isolated: Array<Tuple>
  },
  vowel: {
    fatha: Array<Tuple>,
    damma: Array<Tuple>,
    kasra: Array<Tuple>
  },
  plain: {
    voicelessStops: Array<Tuple>,
    voicedStops: Array<Tuple>,
    voicelessFricatives: Array<Tuple>,
    voicedFricatives: Array<Tuple>,
    liquids: Array<Tuple>,
    nasals: Array<Tuple>,
    semiVowels: Array<Tuple>,
    h: Array<Tuple>
  },
  shaddah: {
    obstruents: Array<Tuple>,
    liquids: Array<Tuple>,
    nasals: Array<Tuple>,
    semiVowels: Array<Tuple>
  },
  other: {
    hamzaAlifs: Array<Tuple>,
    tm: Array<Tuple>,
    longVowels: Array<Tuple>,
    offGlides: Array<Tuple>,
  }
}

type TuplesConfig = {
  chars?: {
    trouble?: boolean,
    initial?: boolean,
    medial?: boolean,
    final?: boolean,
    isolated?: boolean,
  } | boolean,
  vowel?: {
    fatha?: boolean,
    damma?: boolean,
    kasra?: boolean,
  } | boolean,
  plain?: {
    voicelessStops?: boolean,
    voicedStops?: boolean,
    voicelessFricatives?: boolean,
    voicedFricatives?: boolean,
    liquids?: boolean,
    nasals?: boolean,
    semiVowels?: boolean,
    h?: boolean,
  } | boolean,
  shaddah?: {
    obstruents?: boolean,
    liquids?: boolean,
    nasals?: boolean,
    semiVowels?: boolean,
  } | boolean,
  other?: {
    hamzaAlifs?: boolean,
    tm?: boolean,
    longVowels?: boolean,
    offGlides?: boolean,
  } | boolean
}

class Arabic {
  config: Config;
  tuples: Tuples;
  patterns: {};

  constructor(config: Config) {
    this.config = config;
    this.tuples = {
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
      vowel: {
        fatha: [
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
          ['عَ','ea'],
          ['غَ','ga'],
          ['فَ','fa'],
          ['قَ','qa'],
          ['كَ','ka'],
          ['لَ','la'],
          ['مَ','ma'],
          ['نَ','na'],
          ['هَ','ha'],
          ['أَ',"'a"],
          //['وَ','wa'],
          //['يَ','ya']
        ],
        damma: [
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
          ['عُ','eu'],
          ['غُ','gu'],
          ['فُ','fu'],
          ['قُ','qu'],
          ['كُ','ku'],
          ['لُ','lu'],
          ['مُ','mu'],
          ['نُ','nu'],
          ['هُ','hu'],
          ['أُ',"'u"],
        ],
        kasra: [
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
          ['عِ','ei'],
          ['غِ','gi'],
          ['فِ','fi'],
          ['قِ','qi'],
          ['كِ','ki'],
          ['لِ','li'],
          ['مِ','mi'],
          ['نِ','ni'],
          ['هِ','hi'],
          ['إ',"'i"]
        ],
      },
      plain: {
        voicelessStops: [
          ['ت','t'],
          ['ط','T'],
          ['ق','q'],
          ['ك','k'],
        ],
        voicedStops: [
          ['ب','b'],
          ['د','d'],
          ['ض','D'],
        ],
        voicelessFricatives: [
          ['ث','th'],
          ['ح','H'],
          ['خ','kh'],
          ['ص','S'],
          ['ف','f'],
        ],
        voicedFricatives: [
          ['ج','j'],
          ['ذ','dh'],
          ['ز','z'],
          ['ظ','Z'],
          ['ع','e'],
          ['غ','g'],
        ],
        liquids: [
          ['ر','r'],
          ['ل','l'],
        ],
        nasals: [
          ['م','m'],
          ['ن','n'],
        ],
        semiVowels: [
          ['و','w'],
          ['ي','y'],
        ],
        h: [
          ['ه','h'],
        ]
      },
      shaddah: {
        obstruents: [
          ['بّ','bb'],
          ['تّ','tt'],
          ['ثّ','tth'],
          ['جّ','jj'],
          ['حّ','HH'],
          ['خ','kkh'],
          ['دّ','dd'],
          ['ذّ','ddh'],
          ['زّ','zz'],
          ['سّ','ss'],
          ['شّ','ssh'],
          ['صّ','SS'],
          ['ضّ','DD'],
          ['طّ','TT'],
          ['ظّ','ZZ'],
          ['عّ','ee'],
          ['غّ','gg'],
          ['فّ','ff'],
          ['قّ','qq'],
          ['كّ','kk'],
        ],
        liquids: [
          ['رّ','rr'],
          ['لّ','ll'],
        ],
        nasals: [
          ['مّ','mm'],
          ['نّ','nn'],
        ],
        semiVowels: [
          ['وّ','ww'],
          ['يّ','yy'],
        ]
      },
      other: {
        hamzaAlifs: [
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
    this.patterns = {
      cvcc: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum;

        c1 = this.getDatum({
          vowel: true
        });

        //chance of shaddah
        if(Math.random() < 0.15){
          c2 = this.getDatum({
            shaddah: true
          })
        }
        else {
          c2 = this.getNewCluster();
        }

        word = {
          char: c1.char + c2.char,
          answer: c1.answer + c2.answer,
        }

        return word;
      },
      cucuc: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            damma: true,
          }
        });

        c2 = this.getDatum({
          vowel: {
            damma: true,
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word = {
          char: c1.char + c2.char + c3.char,
          answer: c1.answer + c2.answer + c3.answer,
        }

        return word;
      },
      cucca: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            damma: true
          }
        });

        c2 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        c3 = this.getDatum({
          vowel: {
            fatha: true
          }
        });


        //can't have two of the same, e.g. mutta because it then gets weird
        while(c2.answer == c3.answer.slice(0,1)){
          c3 = this.getDatum({
            vowel: {
              fatha: true
            }
          });
        }


        word.char += c1.char + c2.char + c3.char;
        word.answer += c1.answer + c2.answer + c3.answer;

        return word;
      },
      caciic: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            kasra: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += c1.char + c2.char + 'ي' + c3.char;
        word.answer += c1.answer + c2.answer + 'i' + c3.answer;

        return word;
      },
      caacic: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            kasra: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += c1.char + 'ا' + c2.char + c3.char;
        word.answer += c1.answer + 'a' + c2.answer + c3.answer;

        return word;
      },
      cacaayic: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += c1.char + c2.char + 'ايِ' + c3.char;
        word.answer += c1.answer + c2.answer + 'ayi' + c3.answer;

        return word;
      },
      cucuuc: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            damma: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            damma: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += c1.char + c2.char + 'و' + c3.char;
        word.answer += c1.answer + c2.answer + 'u' + c3.answer;

        return word;
      },
      accaac: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        //can't have two of the same, e.g. attaab because it then gets weird
        while(c1.answer == c2.answer.slice(0,1)){
          c2 = this.getDatum({
            vowel: {
              fatha: true
            }
          });
        }

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += 'أَ' + c1.char + c2.char + 'ا' + c3.char;
        word.answer += 'a' + c1.answer + c2.answer + 'a' + c3.answer;

        return word;
      },
      maccac: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        //can't have two of the same, e.g. mattab because it then gets weird
        while(c1.answer == c2.answer.slice(0,1)){
          c2 = this.getDatum({
            vowel: {
              fatha: true
            }
          });
        }

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += 'مَ' + c1.char + c2.char + c3.char;
        word.answer += 'ma' + c1.answer + c2.answer + c3.answer;

        return word;
      },
      macaacic: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            kasra: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });


        word.char += 'مَ' + c1.char + 'ا' + c2.char + c3.char;
        word.answer += 'ma' + c1.answer + 'a' + c2.answer + c3.answer;

        return word;
      },
      macaciic: (): Datum => {
        let word: Datum = {
          char: '',
          answer: ''
        };

        let c1: Datum, c2: Datum, c3: Datum;

        c1 = this.getDatum({
          vowel: {
            fatha: true
          }
        });

        c2 = this.getDatum({
          vowel: {
            kasra: true
          }
        });

        c3 = this.getDatum({
          plain: {
            voicelessStops: true,
            voicedStops: true,
            voicelessFricatives: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });

        word.char += 'مَ' + c1.char + c2.char + 'ي' + c3.char;
        word.answer += 'ma' + c1.answer + c2.answer + 'i' + c3.answer;

        return word;
      },
    }
  }

  //getters
  getTuples() {
    return this.tuples;
  }

  getGroup(name: string): Array<Tuple> {
    let resultTuples: Array<Tuple> = [];
    let tuples = this.getTuples();

    for(let groupName in tuples){
      for(let typeName in tuples[groupName]){
        resultTuples = resultTuples.concat(tuples[groupName][typeName]);
      }
    }

    return resultTuples;
  }

  //get things
  //0...max
  randomInt(max: number): number {
    return Math.floor(Math.random()*(max+1));
  }

  //get random Tuple from Array<Tuple>
  getRandomTuple(array: Array<Tuple>): Tuple {
    let random = this.randomInt(array.length-1);
    let el = array[random];
    return el;
  }

  //get random Datum from Array<Tuple>
  getRandomDatumFromArray(tupleArray: Array<Tuple>): Datum {
    let el = this.getRandomTuple(tupleArray);
    return {
      char: el[0],
      answer: el[1]
    }
  }

  //loop through array, find datum matching answer
  getDatumFromArray(tupleArray: Array<Tuple>, answer: string): Datum {
    let datum: Datum = {
      char: '',
      answer: ''
    }

    for(let i = 0; i < tupleArray.length; i++){
      let currentTuple: Tuple = tupleArray[i];
      if(currentTuple[1] == answer){
        datum.char = currentTuple[0];
        datum.answer = currentTuple[1];
      }
    }

    return datum;
  }

  //get random datum from a group
  getDatum(config: TuplesConfig): Datum {
    let pairBank = [];
    let pairs = this.getTuples();

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

    return this.getRandomDatumFromArray(pairBank);
  }


  //get new things

  //returns a cluster with no gemination
  getNewCluster(): Datum {
    let cluster: Datum = {
      char: '',
      answer: ''
    }

    let first: Datum = {
      char: '',
      answer: ''
    };

    let second: Datum = {
      char: '',
      answer: ''
    }

    //50/50 chance for high vs. low sonority
    if(Math.random() < 0.5){
      first = this.getDatum({
        plain: {
          voicelessStops: true,
          voicelessFricatives: true,
          h: true,
        }
      });

      second = this.getDatum({
        plain: {
          voicelessStops: true,
          voicelessFricatives: true,
        }
      });

      //WARNING: need to change this, shouldn't loop based on a random number
      //keep changing second until they're different
      while(first.char == second.char){
        second = this.getDatum({
          plain: {
            voicelessStops: true,
            voicelessFricatives: true,
            liquids: true,
            nasals: true
          }
        });
      }
    }
    //higher sonority
    else {
      first = this.getDatum({
        plain: {
          voicedStops: true,
          voicedFricatives: true,
          liquids: true,
          nasals: true,
          h: true,
        }
      });

      second = this.getDatum({
        plain: {
          voicedStops: true,
          liquids: true,
          nasals: true
        }
      });

      //WARNING: need to change this, shouldn't loop based on a random number
      //keep changing second until they're different
      while(first.char == second.char){
        second = this.getDatum({
          plain: {
            voicedStops: true,
            voicedFricatives: true,
            liquids: true,
            nasals: true
          }
        });
      }
    }





    cluster.char = first.char + second.char;
    cluster.answer = first.answer + second.answer;

    return cluster;

  }

  getRandomPattern(){
    let word: Datum = {
      char: '',
      answer: ''
    };

    let random = this.randomInt(Object.keys(this.patterns).length - 1);

    let i = 0;
    for(let key: string in this.patterns){
      if(i == random){
        word = this.patterns[key]();
        return word;
      }
      i++;
    }

    return word;
  }

  //TODO: remove impermissible sequences like uy and iw
  getNewSyllable(): Datum {

    let preCodaChance = 0.3; //w, y, r, l, n, m
    let codaChance = 0.3; //any consonant

    let syllable = {
      char: '',
      answer: ''
    }

    //start with a regular vowel
    let start = this.getDatum({
      vowel: {
        fatha: true,
        kasra: true,
        damma: true,
      }
    });

    syllable = {
      char: syllable.char + start.char,
      answer: syllable.answer + start.answer
    }

    //possibly a pre-coda
    if(Math.random() < preCodaChance){
      let preCoda = this.getDatum({
        plain: {
          liquids: true,
          nasals: true
        }
      })

      syllable = {
        char: syllable.char + preCoda.char,
        answer: syllable.answer + preCoda.answer
      }
    }

    //TODO: add in sonorant codas, just make sure the preCoda isn't the same
    //possibly a coda
    if(Math.random() < codaChance){
      let coda = this.getDatum({
        plain: {
          voicelessStops: true,
          voicedStops: true,
          voicelessFricatives: true,
          voicedFricatives: true
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
  getNewStartSyllable(daChance: number): Datum {
    //30% chance of definite article
    if(Math.random() < daChance){
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

  getNewEndSyllable(tmChance: number): Datum {
    //30% chance of a tm syllable
    if(Math.random() < tmChance){
      let fathaDatum = this.getDatum({
        vowel: {
          fatha: true
        }
      });

      let tm = this.getDatum({
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
  //TODO: set up common patterns, e.g. CVCC, MaCCaC, CuCuuC, etc.
  getNewWord(settings: WordsSettings): Datum {

    let word =  {
      char: '',
      answer: ''
    };

    let syllable;

    for(let i = 0; i < settings.length; i ++){
      //if we're at start
      if(i == 0){
        syllable = this.getNewStartSyllable(settings.daChance);

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
      else if(i == settings.length-1){
        syllable = this.getNewEndSyllable(settings.tmChance);

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

    return word;
  }

  //returns a single char
  getNewChar(settings: CharsSettings): Datum {
    let config = {
      chars: {
        initial: settings.includeForms.initial,
        medial: settings.includeForms.medial,
        final: settings.includeForms.final,
        isolated: settings.includeForms.isolated,
        trouble: settings.includeForms.trouble
      }
    }

    return this.getDatum(config);
  }

  getNew(): Datum {
    let result: Datum = {
      char: '',
      answer: ''
    }

    let config = this.config;

    if(config.type === "words") {
      result = this.getNewWord(config.settings);
    }
    else if(config.type === "patterns"){
      result = this.getRandomPattern();
    }
    else {
      result = this.getNewChar(config.settings);
    }

    //remove aposotrophe (hamza) at the beginning of a word b/c irrelevant
    if(result.answer.slice(0,1) == "'"){
      result.answer = result.answer.substr(1);
    }

    console.log('result:', result);
    return result;
  }
}

export default Arabic;
