/**
 * ブラウザメモリ管理ユーティリティ
 * 
 * このファイルはブラウザのメモリ使用状況を監視・表示するための
 * ユーティリティ関数を提供します。
 */

class MemoryUtils {
  constructor() {
    this.memoryInfo = {
      jsHeapSizeLimit: 0,
      totalJSHeapSize: 0,
      usedJSHeapSize: 0
    };
    
    this.memoryHistory = [];
    this.maxHistoryLength = 50;
    this.updateInterval = null;
  }

  /**
   * 現在のメモリ使用状況を取得
   * performance.memory APIを使用（Chromeベースのブラウザのみ対応）
   */
  getMemoryInfo() {
    // performance.memory はChrome/Edgeのみで利用可能
    if (window.performance && window.performance.memory) {
      this.memoryInfo = {
        jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: window.performance.memory.totalJSHeapSize,
        usedJSHeapSize: window.performance.memory.usedJSHeapSize
      };
    } else {
      console.warn('performance.memory APIはこのブラウザでは利用できません。Edgeブラウザを使用してください。');
    }
    
    return this.memoryInfo;
  }

  /**
   * メモリ使用量を人間が読みやすい形式に変換
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  /**
   * メモリ使用状況を表示要素に更新
   */
  updateMemoryDisplay(elementId) {
    const memInfo = this.getMemoryInfo();
    const element = document.getElementById(elementId);
    
    if (element) {
      element.textContent = `メモリ使用量: ${this.formatBytes(memInfo.usedJSHeapSize)} / ${this.formatBytes(memInfo.jsHeapSizeLimit)}`;
    }
    
    return memInfo;
  }

  /**
   * メモリ使用状況の履歴を記録
   */
  recordMemoryUsage() {
    const memInfo = this.getMemoryInfo();
    const timestamp = new Date().getTime();
    
    this.memoryHistory.push({
      timestamp,
      usedJSHeapSize: memInfo.usedJSHeapSize,
      totalJSHeapSize: memInfo.totalJSHeapSize
    });
    
    // 履歴の長さを制限
    if (this.memoryHistory.length > this.maxHistoryLength) {
      this.memoryHistory.shift();
    }
    
    return this.memoryHistory;
  }

  /**
   * メモリ使用状況のグラフ表示を更新
   */
  updateMemoryChart() {
    const memInfo = this.getMemoryInfo();
    const memoryBar = document.getElementById('memoryBar');
    const memoryDetails = document.getElementById('memoryDetails');
    
    if (memoryBar && memInfo.jsHeapSizeLimit > 0) {
      // メモリ使用率をパーセンテージで表示
      const usagePercent = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;
      memoryBar.style.width = `${Math.min(usagePercent, 100)}%`;
      
      // 使用率に応じて色を変更
      if (usagePercent > 80) {
        memoryBar.style.backgroundColor = '#e74c3c'; // 赤 (危険)
      } else if (usagePercent > 60) {
        memoryBar.style.backgroundColor = '#f39c12'; // オレンジ (警告)
      } else {
        memoryBar.style.backgroundColor = '#3498db'; // 青 (正常)
      }
    }
    
    if (memoryDetails) {
      memoryDetails.textContent = `
使用中のJSヒープサイズ: ${this.formatBytes(memInfo.usedJSHeapSize)}
合計JSヒープサイズ: ${this.formatBytes(memInfo.totalJSHeapSize)}
JSヒープサイズ上限: ${this.formatBytes(memInfo.jsHeapSizeLimit)}
使用率: ${((memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100).toFixed(2)}%
      `;
    }
  }

  /**
   * 定期的なメモリ監視を開始
   */
  startMemoryMonitoring(intervalMs = 1000) {
    // 既存の監視を停止
    this.stopMemoryMonitoring();
    
    // 新しい監視を開始
    this.updateInterval = setInterval(() => {
      this.recordMemoryUsage();
      this.updateMemoryChart();
    }, intervalMs);
  }

  /**
   * メモリ監視を停止
   */
  stopMemoryMonitoring() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

// グローバルインスタンスを作成
const memoryUtils = new MemoryUtils();
