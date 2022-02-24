var data;

let words = [],
  filteredWords = [],
  sortedWords = [],
  wordStat = [];

function preload() {
  data = loadJSON("datasets/rs.json");
}

function setup() {
  
 createCanvas(1850, 800);
  fillTheArrayWords();
  removeNullFromWords();
  sortingTheWords();
  countTheWords(); //+STAT
}

function draw() {
  background(255);
  drawBoxesWithLabel();
}

function fillTheArrayWords() {
  for (let c = 0; c < 429; c++) {
    words.push(data[c].Word1);
    words.push(data[c].Word2);
    words.push(data[c].Word3);
    words.push(data[c].Word4);
    words.push(data[c].Word5);
    words.push(data[c].Word6);
    words.push(data[c].Word7);
    words.push(data[c].Word8);
    words.push(data[c].Word9);
    words.push(data[c].Word10);
  }
}

function removeNullFromWords() {
  let v = words.length;
  let newWords = [];
  for (let i = 0; i < v; i++) {
    if (words[i] != "***") {
      append(newWords, words[i]);
    }
  }
  words = newWords;
}

function sortingTheWords() {
  sortedWords = sort(words);
}

// Create datapair of words and how many time used this
function countTheWords() {
  var current = null;
  var cnt = 0;
  for (var i = 0; i < words.length; i++) {
    if (words[i] != current) {
      if (cnt > 0) {
           wordStat.push([current, cnt]); //STAT
      }
      current = words[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
        wordStat.push([current, cnt]); //STAT
  }
}

function drawBoxesWithLabel() {
  let o = 5;
  fill(200, 0, 10, o);
  let x = 0;
  let y = 0;
  let n = 0;
  let w = width / 25;
  let h = height / 27;
  
  for (let i = 0; i < 28; i++) {
   
    for (let k = 0; k < 26; k++) {
     let x = w*k;
      let y = h*i;
      let p = wordStat[n];
       
      if(p==null){continue};
      let o = 10 * p[1];
      fill(200, 0, 10, o);
      noStroke();
      rect(x, y, w, h);
      fill(20, 20, 20);
                  
      if (mouseX > x && mouseX < x+w && mouseY > y && mouseY <y+h)
        { textSize(22)&&textStyle(BOLD);} else textSize(10);
      
      text(wordStat[n], x + 5, y + 20);
      if (n < wordStat.length){n++}
       else break;
      x = x + width / 25;
    }
    y = y + height / 27;
  }
}
