import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-control-flow-record',
  imports: [HttpClientModule],
  templateUrl: './control-flow-record.component.html',
  styleUrl: './control-flow-record.component.css'
})
export class ControlFlowRecordComponent implements OnInit {
  graphicRecordHtml: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadGraphicRecord();
  }

  private loadGraphicRecord(): void {
    this.http.get('assets/graphic-records/control-flow-graphic-record.html', { responseType: 'text' })
      .subscribe({
        next: (html) => {
          const bodyContent = this.extractBodyContent(html);
          this.graphicRecordHtml = this.sanitizer.bypassSecurityTrustHtml(bodyContent);
        },
        error: (err) => {
          console.error('グラフィックレコードの読み込みに失敗しました', err);
        }
      });
  }

  private extractBodyContent(html: string): string {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : html;
  }
}
