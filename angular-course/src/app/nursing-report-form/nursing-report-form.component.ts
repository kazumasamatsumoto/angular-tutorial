import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

interface NursingReport {
  patientName: string;
  birthDate: string;
  caregiverFacility: string;
  requireCareLevel: number;
  visitDatesPrevMonth: number[];
  visitDatesCurrentMonth: number[];
  specialNotes: string;
  nursingContent: string;
  familyCooperation: string;
  materialName: string;
  usagePurpose: string;
  usageAmount: string;
  materialChange: boolean;
  changeDetails: string;
  otherNotes: string;
  creatorName: string;
}

@Component({
  selector: 'app-nursing-report-form',
  templateUrl: './nursing-report-form.component.html',
  styleUrls: ['./nursing-report-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class NursingReportFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  reportForm!: FormGroup;
  today = new Date();
  currentMonth = new Date();
  prevMonth = new Date();
  currentMonthName: string = '';
  prevMonthName: string = '';

  ngOnInit(): void {
    // 現在の月を設定
    this.currentMonth = new Date();

    // 前月を設定
    this.prevMonth = new Date();
    this.prevMonth.setMonth(this.prevMonth.getMonth() - 1);

    // 月名を設定
    this.currentMonthName = this.getMonthName(this.currentMonth);
    this.prevMonthName = this.getMonthName(this.prevMonth);

    this.reportForm = this.createForm();
  }

  getMonthName(date: Date): string {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
  }

  createForm(): FormGroup {
    return this.fb.group({
      patientName: ['山田 太郎', Validators.required],
      birthYear: ['1955', Validators.required],
      birthMonth: ['3', Validators.required],
      birthDay: ['15', Validators.required],
      caregiverFacility: ['東京訪問看護ステーション'],
      requireCareLevel: [5], // 要介護3
      visitDatesPrevMonth: this.createVisitDatesArray(),
      visitDatesCurrentMonth: this.createVisitDatesArray(),
      specialNotes: ['特記事項なし'],
      nursingContent: ['バイタルサイン測定、健康状態確認、服薬指導、運動機能訓練を実施'],
      familyCooperation: ['長男が主に介護を担当しており、毎日の生活支援を行っている'],
      materialName: ['消毒液、ガーゼ、テープ'],
      usagePurpose: ['創傷処置に使用'],
      usageAmount: ['各1個'],
      materialChange: [false],
      changeDetails: [''],
      otherNotes: [''],
      creatorName: ['看護 花子']
    });
  }

  createVisitDatesArray(): FormArray {
    // すべての日を非表示（0）に設定
    const defaultVisits = Array(31).fill(0);

    return this.fb.array(defaultVisits.map(value => this.fb.control(value)));
  }

  toggleVisitDate(index: number, month: string): void {
    const monthKey = month === 'Current' ? 'visitDatesCurrentMonth' : 'visitDatesPrevMonth';
    const visitDates = this.reportForm.get(monthKey) as FormArray;
    const currentValue = visitDates.at(index).value;

    // 0: 非表示、1: ○、2: ◎、3: △、4: ×、5: 非表示（0に戻る）
    const nextValue = (currentValue + 1) % 5;

    visitDates.at(index).setValue(nextValue);
  }

  // 月の日数を取得
  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  toggleCareLevel(level: number): void {
    this.reportForm.get('requireCareLevel')?.setValue(level);
  }

  generatePDF(): void {
    const reportElement = document.getElementById('nursing-report');
    if (!reportElement) {
      console.error('Report element not found');
      return;
    }

    console.log('Starting PDF generation');

    // HTML2Canvasオプション
    const options = {
      scale: 2, // 高解像度
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      // サイズ指定を明示的に行う
      width: reportElement.offsetWidth,
      height: reportElement.offsetHeight
    };

    html2canvas(reportElement, options).then(canvas => {
      console.log('Canvas generated successfully');
      const imgData = canvas.toDataURL('image/png');

      try {
        // A4サイズのPDF作成
        const pdf = new jspdf({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // 画像をPDFに追加（A4サイズに合わせて配置）
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('訪問看護報告書.pdf');
        console.log('PDF generated and saved successfully');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }).catch(error => {
      console.error('Error generating canvas:', error);
    });
  }

  onSubmit(): void {
    console.log('Form submitted, validation status:', this.reportForm.valid);
    if (this.reportForm.valid) {
      this.generatePDF();
    } else {
      const controls = this.reportForm.controls;
      const invalidControls = Object.keys(controls).filter(key => controls[key].invalid);
      console.log('Invalid controls:', invalidControls);
      console.log('Form validation failed:', this.reportForm.errors);
    }
  }

  resetForm(): void {
    this.reportForm.reset();
    this.reportForm = this.createForm();
  }

  getVisitDatesArray(month: string): number[] {
    if (!this.reportForm) return Array(31).fill(0);
    const monthKey = month === 'Current' ? 'visitDatesCurrentMonth' : 'visitDatesPrevMonth';
    const visitDatesFormArray = this.reportForm.get(monthKey) as FormArray;
    return visitDatesFormArray ? visitDatesFormArray.controls.map(control => control.value as number) : [];
  }

  // 訪問マークの種類を取得
  getVisitMark(value: number): string {
    switch (value) {
      case 1: return '○';
      case 2: return '◎';
      case 3: return '△';
      case 4: return '×';
      default: return '';
    }
  }
}
