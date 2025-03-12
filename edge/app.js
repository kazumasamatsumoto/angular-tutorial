/**
 * ブラウザメモリ管理学習アプリ
 * 
 * このアプリケーションはブラウザのメモリ管理を学習するための
 * 単純化された実験を提供します。
 */

// グローバル変数
let objectStore = []; // オブジェクトを保持する配列
let leakStore = []; // メモリリーク実験用の配列
let gcObjects = []; // ガベージコレクション実験用の配列
let leakInterval = null; // メモリリーク実験用のインターバルID

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  // メモリ監視を開始
  memoryUtils.startMemoryMonitoring(500);
  
  // 各セクションの初期表示を更新
  updateAllMemoryDisplays();
  
  // イベントリスナーを設定
  setupEventListeners();
});

/**
 * すべてのメモリ表示を更新
 */
function updateAllMemoryDisplays() {
  memoryUtils.updateMemoryDisplay('memoryUsage');
  memoryUtils.updateMemoryDisplay('leakMemoryUsage');
  memoryUtils.updateMemoryDisplay('gcMemoryUsage');
  memoryUtils.updateMemoryChart();
}

/**
 * イベントリスナーを設定
 */
function setupEventListeners() {
  // 1. 基本的なメモリ割り当て
  document.getElementById('createObjects').addEventListener('click', createObjects);
  document.getElementById('clearObjects').addEventListener('click', clearObjects);
  
  // 2. メモリリーク実験
  document.getElementById('startLeak').addEventListener('click', startMemoryLeak);
  document.getElementById('stopLeak').addEventListener('click', stopMemoryLeak);
  
  // 3. ガベージコレクション
  document.getElementById('createGcObjects').addEventListener('click', createGcObjects);
  document.getElementById('releaseReferences').addEventListener('click', releaseReferences);
  document.getElementById('forceGc').addEventListener('click', suggestGarbageCollection);
}

/**
 * 1MB程度のサイズを持つオブジェクトを作成
 */
function createLargeObject(id) {
  // 約1MBのArrayBufferを作成
  const buffer = new ArrayBuffer(1024 * 1024); // 1MB
  
  // Float64Array（倍精度浮動小数点数の配列）でバッファを埋める
  const array = new Float64Array(buffer);
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.random(); // ランダムな値で埋める
  }
  
  return {
    id,
    createdAt: new Date(),
    data: array,
    metadata: {
      size: buffer.byteLength,
      type: 'ArrayBuffer',
      description: `テスト用の大きなオブジェクト #${id}`
    }
  };
}

/**
 * 1. 基本的なメモリ割り当て: オブジェクトを作成
 */
function createObjects() {
  // 10個の大きなオブジェクトを作成
  for (let i = 0; i < 10; i++) {
    const newObject = createLargeObject(objectStore.length + 1);
    objectStore.push(newObject);
  }
  
  // オブジェクト数を表示
  document.getElementById('objectCount').textContent = `作成オブジェクト数: ${objectStore.length}`;
  
  // メモリ使用量を更新
  updateAllMemoryDisplays();
  
  console.log(`${objectStore.length}個のオブジェクトが作成されました`);
}

/**
 * 1. 基本的なメモリ割り当て: オブジェクトをクリア
 */
function clearObjects() {
  // オブジェクトへの参照を解放
  objectStore = [];
  
  // オブジェクト数を表示
  document.getElementById('objectCount').textContent = `作成オブジェクト数: 0`;
  
  // メモリ使用量を更新
  updateAllMemoryDisplays();
  
  console.log('オブジェクトがクリアされました');
}

/**
 * 2. メモリリーク実験: リークを開始
 */
function startMemoryLeak() {
  // 既に実行中の場合は停止
  if (leakInterval) {
    stopMemoryLeak();
  }
  
  console.log('メモリリーク実験を開始します');
  
  // クロージャを使用したメモリリークの例
  // 1秒ごとにクロージャを作成し、それが大きなデータを参照し続ける
  leakInterval = setInterval(() => {
    // 大きなデータを作成
    const largeData = new Array(10000).fill(0).map((_, i) => ({
      id: i,
      value: `データ値 ${i}`,
      timestamp: new Date().getTime(),
      // 循環参照を作成（メモリリークの一因）
      parent: null
    }));
    
    // 循環参照を設定
    largeData.forEach(item => {
      item.parent = largeData;
    });
    
    // クロージャを作成して配列に保存
    // この関数は largeData への参照を保持し続ける
    const leakFunction = () => {
      // この関数は呼び出されなくても、largeDataへの参照を保持し続ける
      return largeData.length;
    };
    
    // 関数を配列に保存（これによりlargeDataへの参照が保持される）
    leakStore.push(leakFunction);
    
    // メモリ使用量を更新
    memoryUtils.updateMemoryDisplay('leakMemoryUsage');
    memoryUtils.updateMemoryChart();
    
    document.getElementById('leakMemoryUsage').textContent = 
      `メモリリーク使用量: ${memoryUtils.formatBytes(memoryUtils.getMemoryInfo().usedJSHeapSize)} (関数数: ${leakStore.length})`;
  }, 1000);
}

/**
 * 2. メモリリーク実験: リークを停止
 */
function stopMemoryLeak() {
  if (leakInterval) {
    clearInterval(leakInterval);
    leakInterval = null;
    console.log('メモリリーク実験を停止しました');
  }
}

/**
 * 3. ガベージコレクション: GCテスト用オブジェクトを作成
 */
function createGcObjects() {
  // 既存のオブジェクトをクリア
  gcObjects = [];
  
  // 新しいオブジェクトを作成
  for (let i = 0; i < 20; i++) {
    gcObjects.push(createLargeObject(i));
  }
  
  console.log(`${gcObjects.length}個のGCテスト用オブジェクトが作成されました`);
  memoryUtils.updateMemoryDisplay('gcMemoryUsage');
  memoryUtils.updateMemoryChart();
}

/**
 * 3. ガベージコレクション: 参照を解放
 */
function releaseReferences() {
  // オブジェクトへの参照を解放
  gcObjects = [];
  
  console.log('GCテスト用オブジェクトの参照が解放されました');
  console.log('これらのオブジェクトは次回のガベージコレクション実行時に回収される可能性があります');
  
  memoryUtils.updateMemoryDisplay('gcMemoryUsage');
  memoryUtils.updateMemoryChart();
}

/**
 * 3. ガベージコレクション: GCを実行するヒントを与える
 * 注: ブラウザは必ずしもこのヒントに従うわけではありません
 */
function suggestGarbageCollection() {
  console.log('ガベージコレクションのヒントを送信しています...');
  
  // 大量のオブジェクトを作成して破棄することでGCを促す
  for (let i = 0; i < 100; i++) {
    let temp = new Array(10000).fill(Math.random());
    temp = null; // 参照を即座に解放
  }
  
  // メモリ使用量を更新
  setTimeout(() => {
    memoryUtils.updateMemoryDisplay('gcMemoryUsage');
    memoryUtils.updateMemoryChart();
    console.log('ガベージコレクションが実行された可能性があります');
  }, 500);
}

// ページ離脱時にメモリ監視を停止
window.addEventListener('beforeunload', () => {
  memoryUtils.stopMemoryMonitoring();
  if (leakInterval) {
    clearInterval(leakInterval);
  }
});
