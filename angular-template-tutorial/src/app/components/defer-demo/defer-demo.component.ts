import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-defer-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer-demo.component.html',
  styleUrl: './defer-demo.component.css'
})
export class DeferDemoComponent {
  heavyComponentLoaded = false;
  interactionTriggerActivated = false;
  viewportTriggerActivated = false;
  hoverTriggerActivated = false;
  isLoggedIn = false;
  isFeatureEnabled = false;
  
  // 重いコンポーネントをシミュレートするためのデータ
  heavyData = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a description for item ${i}`
  }));
  
  onHeavyComponentLoaded() {
    this.heavyComponentLoaded = true;
    console.log('Heavy component loaded!');
  }
  
  resetTriggers() {
    this.interactionTriggerActivated = false;
    this.viewportTriggerActivated = false;
    this.hoverTriggerActivated = false;
    this.heavyComponentLoaded = false;
  }
}
