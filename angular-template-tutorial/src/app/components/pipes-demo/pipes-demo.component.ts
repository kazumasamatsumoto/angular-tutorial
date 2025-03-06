import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KebabCasePipe } from '../../pipes/kebab-case.pipe';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, KebabCasePipe],
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.css']
})
export class PipesDemoComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
  scheduledOn = new Date();
  
  // カスタムパイプのデモ用
  textForKebabCase = 'Convert This Text To Kebab Case';
}
