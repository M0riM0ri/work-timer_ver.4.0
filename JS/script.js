/* スタートフラグ、時間変数初期化 */
let start = 0, second = 0, minute = 0, hour = 0;
let imgNumber = 0; let imgNumberZ = 0;

/* fitness画像 */
const imgList = new Array(
  './picture/fitness/fitness.PNG',  './picture/fitness/fitness1.PNG',
  './picture/fitness/fitness2.PNG', './picture/fitness/fitness3.PNG',
  './picture/fitness/fitness4.PNG', './picture/fitness/fitness5.PNG',
  './picture/fitness/fitness6.PNG'
);

/* 遷移画像 */
const imgList2 = new Array(
  './picture/chart/00.jpg',
  './picture/chart/00.jpg', './picture/chart/10.gif',
  './picture/chart/15.gif', './picture/chart/20.gif',
  './picture/chart/25.gif', './picture/chart/30.gif',
  './picture/chart/35.gif', './picture/chart/40.gif',
  './picture/chart/45.gif', './picture/chart/50.gif',
  './picture/chart/55.gif', './picture/chart/60.gif'
);

/* アイコン画像 */
const imgList3 = new Array(
  './picture/face/face_good.png',
  './picture/face/face_normal.png',
  './picture/face/face_bad.png',
  './picture/face/face_sobad.png'
);

/* 通知許可ボタンクリック時動作 */
document.getElementById("init-button").onclick = function(){
  Push.create("通知が許可されました");
  document.getElementById("init-button").style.display  ="none";
  document.getElementById("elapse-message").style.display ="block";
  document.getElementById("elapse-box").style.display ="inline-block";
  document.getElementById("start-button").style.display ="block";
  document.getElementById("zero" ).selected = true;
}

/* 開始ボタンクリック時動作 */
document.getElementById("start-button").onclick = function(){
  minute = document.getElementById("elapse-box").value;
  //document.getElementById("mintgt").textContent = 60 - minute;
  //この計算が負の値にならないことを，プルダウンの選択肢によって保障しているので注意
  document.getElementById("elapse-message").style.display ="none";
  start = 1;
  // 初期画像表示
  imgNumber = parseInt(minute / 5);
  if(hour == 0){
    document.getElementById("chart-pic").src = imgList2[imgNumber];
  }else{
    document.getElementById("chart-pic").src = imgList2[12];
  }
  document.getElementById("time-block").style.display   ="block";
  document.getElementById("chart-pic").style.display          ="block";
  document.getElementById("reset-button").style.display ="block";
}

/* 休憩ボタンクリック時動作 */
document.getElementById("reset-button").onclick = function(){
  start = 0, second = 0, minute = 0, hour = 0;
  document.getElementById("time-block").style.display     ="none";
  document.getElementById("chart-pic").style.display            ="none";
  document.getElementById("reset-button").style.display   ="none";
  document.getElementById("break").style.display          ="block";
  document.getElementById("break-pic").style.display      ="block";
  document.getElementById("restart-button").style.display ="block";
  document.getElementById( "zero" ).selected = true;
}

/* 再開ボタンクリック時動作 */
document.getElementById("restart-button").onclick = function(){
  document.getElementById("time").innerHTML
    = hour + "時間 " + minute + "分 " + second + "秒";
  document.getElementById("restart-button").style.display ="none";
  document.getElementById("break").style.display          ="none";
  document.getElementById("break-pic").style.display      ="none";
  document.getElementById("elapse-message").style.display ="block";
  document.getElementById("elapse-box").style.display ="inline-block";
  document.getElementById("start-button").style.display ="block";
  document.getElementById("zero" ).selected = true;
}

/* 初期時間セット */
function elapseSet(){
}

/* 時間計算 & 表示 */
function time(){
  if(start === 1){
    second++;
    if(second === 60){
      minute++;
      second = 0;

      // 遷移画像表示タイミング
      imgNumber = parseInt(minute / 5);
      if(hour == 0){
        document.getElementById("chart-pic").src = imgList2[imgNumber];
      }else{
        document.getElementById("chart-pic").src = imgList2[12];
      }

    }
    if(minute === 60){
      hour++;
      minute = 0;
    }

    //通知表示タイミング
    if(second == 0 && minute == 30 && hour == 0){
    // if(second == 30){
      Push.create("30分経過しました！", {
        body: "1〜2分の休憩を取りましょう",
        icon: imgList3[0],
        timeout: 6000,
        onClick: function () {
            this.close();
        }
      });
    }
    if(second == 0 && minute == 45 && hour == 0){
    // if(second == 45){
      Push.create("45分経過しました！", {
        body: "そろそろ集中力が切れてきてませんか？",
        icon: imgList3[1],
        timeout: 6000,
        onClick: function () {
            this.close();
        }
      });
    }
    if(second == 0 && minute == 0 && hour == 1){
    // if(second == 0 && minute == 1){
      Push.create("1時間経過しました！", {
        body: "10〜15分の休憩を取りましょう",
        icon: imgList3[2],
        timeout: 6000,
        onClick: function () {
            this.close();
        }
      });
    }else if(second == 0 && minute % 15 == 0 && hour >= 1){
      Push.create("1時間以上連続VDT作業をしています", {
        body: "少し休憩を取ったほうが効率的に働けます",
        icon: imgList3[3],
        timeout: 6000,
        onClick: function () {
            this.close();
        }
      });
    }

    //時間表示
    document.getElementById("time").innerHTML
    = hour + "時間 " + minute + "分 " + second + "秒";
  }
}

/* 1000msec毎にtime関数を実行 */
setInterval("time()", 1000);

/* 隠しコマンド */
(function() {
  //入力されたキーを保存する
  var inputKey = [];
  //上上下下左右左右BA
  var konamiCommand = [38,38,40,40,37,39,37,39,66,65];
  //画面上のキー入力イベントリスナ
  document.addEventListener('keyup', function(e) {
    //キー入力を配列に追加
    inputKey.push(e.keyCode);
    //キー入力が保存された配列と隠しコマンドを比較
    if (inputKey.toString().indexOf(konamiCommand) >= 0) {
      document.getElementById("access-counter").style.display="block";
      //キー入力を初期化
      inputKey = [];
   }
 });
}());
