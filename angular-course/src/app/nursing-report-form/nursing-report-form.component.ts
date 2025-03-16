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
  visitDates: boolean[];
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

  ngOnInit(): void {
    this.reportForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      patientName: ['山田 太郎', Validators.required],
      birthYear: ['1955', Validators.required],
      birthMonth: ['3', Validators.required],
      birthDay: ['15', Validators.required],
      caregiverFacility: ['東京訪問看護ステーション'],
      requireCareLevel: [5], // 要介護3
      visitDates: this.createVisitDatesArray(),
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
    // 1日、5日、10日、15日、20日、25日に訪問
    const defaultVisits = Array(31).fill(false);
    [1, 5, 10, 15, 20, 25].forEach(day => {
      defaultVisits[day - 1] = true;
    });

    return this.fb.array(defaultVisits.map(value => this.fb.control(value)));
  }

  toggleVisitDate(index: number): void {
    const visitDates = this.reportForm.get('visitDates') as FormArray;
    visitDates.at(index).setValue(!visitDates.at(index).value);
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

  getVisitDatesArray(): boolean[] {
    if (!this.reportForm) return Array(31).fill(false);
    const visitDatesFormArray = this.reportForm.get('visitDates') as FormArray;
    return visitDatesFormArray ? visitDatesFormArray.controls.map(control => control.value as boolean) : [];
  }
}