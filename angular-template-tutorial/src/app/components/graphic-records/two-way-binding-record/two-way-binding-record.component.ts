import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-two-way-binding-record',
  imports: [HttpClientModule],
  templateUrl: './two-way-binding-record.component.html',
  styleUrl: './two-way-binding-record.component.css'
})
export class TwoWayBindingRecordComponent implements OnInit {
  graphicRecordHtml: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadGraphicRecord();
  }

  private loadGraphicRecord(): void {
    this.http.get('assets/graphic-records/two-way-binding-graphic-record.html', { responseType: 'text' })
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
