// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require Chart.min
//= require jquery
//= require jquery_ujs
//= require jquery3
//= require popper
//= require spectrum
//= require bootstrap-sprockets
//= require bootstrap-tagsinput.min
//= require_tree .


// ハンバーガーメニューの処理
  $(document).on('turbolinks:load', function () {
    $('.menu-trigger').on('click',function(){
      $(this).toggleClass('active');
      $('#sp-menu').fadeToggle();
      return false;
    });
  });

// Admin/Tags #edit-----------------------------------------------
// グラフの色をカラーピッカーで選択するための処理
$(document).on('turbolinks:load', function() {
  if(document.URL.match("/admins/tags") && document.URL.match("/edit")) {
    $("#picker").spectrum({
        // 初期値
        color: gon.color,
        // trueの場合、クリックしなくてもピッカーが表示されるようにする
        flat: false,
        // コードの入力欄を表示する
        showInput: true,
        // 不透明度の選択バーを表示する
        showAlpha: true,
        // trueの場合、ピッカーを無効にする
        disabled: false,
        // パレットを表示する
        showPalette: true,
        // true の場合、パレットのみの表示にする
        showPaletteOnly: false,
        // true の場合、パレット以外の部分はボタンで表示切替する
        togglePaletteOnly: false,
        // togglePaletteOnlyがtrueの場合のボタン名(開く)
        togglePaletteMoreText: "詳細",
        // togglePaletteOnlyがtrueの場合のボタン名(閉じる)
        togglePaletteLessText: "閉じる",
        // ユーザーが前に選択した色をパレットに表示する
        showSelectionPalette: true,
        // 選択した色を記憶する数の上限
        maxSelectionSize: 10,
        // true の場合、パレットを選んだ時点でピッカーを閉じる
        hideAfterPaletteSelect: false,
        // ピッカーの外側をクリックしてピッカーを閉じた際にchangeイベントを発生させる
        clickoutFiresChange: true,
        // 初期の色と選択した色を見比べるエリアを表示する
        showInitial: true,
        // 「指定なし」を許可する
        allowEmpty: true,
        // 選択ボタンのテキスト
        chooseText: "OK",
        // キャンセルボタンのテキスト
        cancelText: "キャンセル",
        // ボタンを表示する
        showButtons: true,
        // ピッカーの部品を囲うタグ(要素)のクラス名
        containerClassName: "full-spectrum",
        // ピッカーを表示させるボタンのクラス名
        replacerClassName: "",
        // カラーコードの形式を指定したものに変更する (可能な限り。hex, hex3等)
        preferredFormat: "hex",
        // localStorageに選択色を記憶する際のキー
        localStorageKey: "spectrum.demo",
        // パレット
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        // 選択色のパレットの初期値
        selectionPalette: []
      });
    };
});

// Timelines/index・Users/show-----------------------------------
//kaminariでページネーションを行った時に、遷移前の状態が学習記録なら学習記録を、ノートならノートを開く処理
  // 画面の読み込み後に発火
  $(window).on('turbolinks:load', function () {
    if(document.URL.match("/timelines") || document.URL.match("/users")) {
      // location.searchで画面のsearch?以下を取得
      var getLocation = location.search;
      // 取得したパラメータを格納しておくobjectを定義
      var getParams = new Object();
      // searchが存在するときに発火
      if(getLocation){
        getLocation = getLocation.substring(1);
        // 取得したパラメータを&で区切る
        var parameters = getLocation.split('&');
        // 取得したパラメータをeach文で１件ずつ確認
        parameters.forEach(function(param){
          var element = param.split('=');
          var paramName = decodeURIComponent(element[0]);
          var paramGenre = decodeURIComponent(element[1]);
          getParams[paramName] = paramGenre;
        });
        // searchに画面から取得してきたsearch_idを格納
        if( getParams["tab_code"].length){
          genre = getParams["tab_code"];
          $("#myTab .nav-item").find(".active").attr('aria-selected','false');
          $("#study_log-tab").removeClass("active");
          $("#note-tab").removeClass("active");
          $("#profile-tab").removeClass("active");
          $("#study_log").removeClass("active show");
          $("#note").removeClass("active show");
          $("#profile").removeClass("active show");

          $("#search_select").val("tag");
          $("#form").val(getParams["tag_name"]);
          // study_logだったらsearch_id = 1
          if( genre == 1 ){
            // 以下クラスの処理
            // tab
            study_log_tab = $("#study_log-tab");
            study_log_tab.addClass("active");
            study_log_tab.attr("aria-selected","true");

            // content
            $("#study_log").addClass("active show");
          }else if( genre == 2 ){
            // tab
            note_tab = $("#note-tab");
            note_tab.addClass("active");
            note_tab.attr("aria-selected","true");
            // content          
            $("#note").addClass("active show");
          };
        };
      };
    };
  });

// Users/edit------------------------------------------
// イメージ画像を設定した時にその場でプレビューを表示する処理
$(document).on('turbolinks:load', function () {
  // 画像を呼び出すためのコールバック関数
  function readURL(input) {
    // データが存在していることを確認
    if (input.files && input.files[0]) {
      // 非同期で読み込むためにFileReader()を呼び出す
      var reader = new FileReader();
      // onload はファイルの読み込みが完了したタイミングで発火する
      reader.onload = function (e) {
        // avatar_img_prevのimg srcの部分を画像のパラメータとして設定
        $('#preview').attr('src', e.target.result);
      }
      // ファイルを読み込む
      reader.readAsDataURL(input.files[0]);
    }
  }

  // post_imgが変更されたタイミングに発火
  $("#user_img").change(function () {
    readURL(this);
  });
});


// study_log/new-------------------------------------
// bootstrap-tagsinputのplaceholderが消えない不具合に対する処理
$(document).ready(function(){
  if ($('#add_study_log_tags').tagsinput('items').length > 0){
    $('.tags-placeholder').attr('placeholder','');
  }

  $('#add_study_log_tags').on('change',function(){
  // 現在のデータの総数を取得
  var length = $(this).tagsinput('items').length;
  // tags-placeholderの１つ手前に作成されるinput要素を取得
  var input = $('.tags-placeholder');
    if(length > 0){
      input.attr('placeholder', '');
    } else{
      input.attr('placeholder', $(this).attr('placeholder'));
    };
  });
});


// Note/new・edit -------------------------------------------
// ノートのプレビューボタンを押した時にプレビューが表示される処理
$(document).on('turbolinks:load', function () {
  // previewが押された時の処理
  $('#preview').on('click',function(){
    // textにtextareaの値を代入
    var text = $('#md-textarea').val()
    // テキストが空白だった場合何もしない
    if (text ==""){
      return ;
    }
    // 押したタイミングでボタンを押せなくする
    $('#preview').prop('disabled',true);
    $('#markdown').prop('disabled',false);
    // データをコントローラに受け渡す処理
    $.ajax({
      url: '/notes/preview',
      type: 'GET',
      dataType: 'json',
      data: {body: text}
    })
    // 成功した時の処理
    .done(function(data){
      $('#md-textarea').parent().css('display','none');
      $('#preview-area').append(data.body);
    });
  });
});

// プレビューを停止し、記述を開始する時の処理
$(document).on('turbolinks:load', function () {
  $('#markdown').on('click',function(){
    $('#md-textarea').parent().css('display','');
    $('#preview-area').empty();
    $('#preview').prop('disabled',false);
    $('#markdown').prop('disabled',true);
  });
});



// note/new-------------------------------------
// bootstrap-tagsinputのplaceholderが消えない不具合に対する処理
// study_log/new-------------------------------------
// bootstrap-tagsinputのplaceholderが消えない不具合に対する処理
$(document).ready(function(){
  if ($('#add_note_tags').tagsinput('items').length > 0){
    $('.tags-placeholder').attr('placeholder','');
  }

  $('#add_note_tags').on('change',function(){
  // 現在のデータの総数を取得
  var length = $(this).tagsinput('items').length;
  // tags-placeholderの１つ手前に作成されるinput要素を取得
  var input = $('.tags-placeholder');
    if(length > 0){
      input.attr('placeholder', '');
    } else{
      input.attr('placeholder', $(this).attr('placeholder'));
    };
  });
});

// search-------------------------------------
// 検索方法がノートのタイトルだった場合にタブを自動的に変更する処理
$(document).on('turbolinks:load', function () {
  $("#search_select").change(function(){
    search = $(this).val()
    if(search === "note"){
      // 表示用の設定を初期化
      $("#myTab .nav-item").find(".active").attr('aria-selected','false');
      $("#study_log-tab").removeClass("active");
      $("#note-tab").removeClass("active");
      $("#user-tab").removeClass("active");
      $("#study_log").removeClass("active show");
      $("#note").removeClass("active show");
      $("#user").removeClass("active show");
      // tab要素
      note_tab = $("#note-tab");
      note_tab.addClass("active");
      note_tab.attr("aria-selected","true");
      // content
      $("#note").addClass("active show");
    };
  });
});

// //タグ検索時にノートだったらノートのタグを、学習記録だったら学習記録のタグを開く処理
//   // 画面の読み込み後に発火
$(window).on('turbolinks:load', function () {
  if(document.URL.match("/searchs")) {
    // location.searchで画面のsearch?以下を取得
    var getLocation = location.search;
    // 取得したパラメータを格納しておくobjectを定義
    var getParams = new Object();
    // searchが存在するときに発火
    if(getLocation){
      getLocation = getLocation.substring(1);
      // 取得したパラメータを&で区切る
      var parameters = getLocation.split('&');
      // 取得したパラメータをeach文で１件ずつ確認
      parameters.forEach(function(param){
        var element = param.split('=');
        var paramName = decodeURIComponent(element[0]);
        var paramGenre = decodeURIComponent(element[1]);
        getParams[paramName] = paramGenre;
      });
      // searchに画面から取得してきたgenre_idを格納
      if( getParams["genre_id"].length){
        genre = getParams["genre_id"];
        $("#myTab .nav-item").find(".active").attr('aria-selected','false');
        $("#study_log-tab").removeClass("active");
        $("#note-tab").removeClass("active");
        $("#user-tab").removeClass("active");
        $("#study_log").removeClass("active show");
        $("#note").removeClass("active show");
        $("#user").removeClass("active show");
        // search_idが存在していれば、selectタグの値をtagに変更
        if( typeof getParams["search_id"] !== 'undefined'){
          $("#search_select").val("tag");
        }
        // 検索する文字列が存在していればtagを選択
        $("#form").val(getParams["tag_name"]);
        // study_logだったらsearch_id = 1
        if( genre == 1 ){
          // 以下クラスの処理
          // tab
          study_log_tab = $("#study_log-tab");
          study_log_tab.addClass("active");
          study_log_tab.attr("aria-selected","true");
          // content
          $("#study_log").addClass("active show");
        }else if( genre == 2 ){
          // tab
          note_tab = $("#note-tab");
          note_tab.addClass("active");
          note_tab.attr("aria-selected","true");
          // content          
          $("#note").addClass("active show");
        };
      };
    };
  };
});