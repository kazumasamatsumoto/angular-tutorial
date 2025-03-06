import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BasicTemplateComponent } from './components/basic-template/basic-template.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { EventBindingComponent } from './components/event-binding/event-binding.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { ControlFlowComponent } from './components/control-flow/control-flow.component';
import { PipesDemoComponent } from './components/pipes-demo/pipes-demo.component';
import { NgContentDemoComponent } from './components/ng-content-demo/ng-content-demo.component';
import { NgTemplateDemoComponent } from './components/ng-template-demo/ng-template-demo.component';
import { NgContainerDemoComponent } from './components/ng-container-demo/ng-container-demo.component';
import { TemplateVariablesComponent } from './components/template-variables/template-variables.component';
import { DeferDemoComponent } from './components/defer-demo/defer-demo.component';
import { ExpressionSyntaxComponent } from './components/expression-syntax/expression-syntax.component';
import { WhitespaceHandlingComponent } from './components/whitespace-handling/whitespace-handling.component';

// グラフィックレコードコンポーネント
import { GraphicRecordsComponent } from './components/graphic-records/graphic-records.component';
import { DataBindingRecordComponent } from './components/graphic-records/data-binding-record/data-binding-record.component';
import { EventBindingRecordComponent } from './components/graphic-records/event-binding-record/event-binding-record.component';
import { TwoWayBindingRecordComponent } from './components/graphic-records/two-way-binding-record/two-way-binding-record.component';
import { ControlFlowRecordComponent } from './components/graphic-records/control-flow-record/control-flow-record.component';
import { PipesRecordComponent } from './components/graphic-records/pipes-record/pipes-record.component';
import { NgContentRecordComponent } from './components/graphic-records/ng-content-record/ng-content-record.component';
import { NgTemplateRecordComponent } from './components/graphic-records/ng-template-record/ng-template-record.component';
import { NgContainerRecordComponent } from './components/graphic-records/ng-container-record/ng-container-record.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic-template', component: BasicTemplateComponent },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'event-binding', component: EventBindingComponent },
  { path: 'two-way-binding', component: TwoWayBindingComponent },
  { path: 'control-flow', component: ControlFlowComponent },
  { path: 'pipes', component: PipesDemoComponent },
  { path: 'ng-content', component: NgContentDemoComponent },
  { path: 'ng-template', component: NgTemplateDemoComponent },
  { path: 'ng-container', component: NgContainerDemoComponent },
  { path: 'template-variables', component: TemplateVariablesComponent },
  { path: 'defer', component: DeferDemoComponent },
  { path: 'expression-syntax', component: ExpressionSyntaxComponent },
  { path: 'whitespace', component: WhitespaceHandlingComponent },
  
  // グラフィックレコードのルート
  {
    path: 'graphic-records',
    component: GraphicRecordsComponent,
    children: [
      { path: '', redirectTo: 'data-binding', pathMatch: 'full' },
      { path: 'data-binding', component: DataBindingRecordComponent },
      { path: 'event-binding', component: EventBindingRecordComponent },
      { path: 'two-way-binding', component: TwoWayBindingRecordComponent },
      { path: 'control-flow', component: ControlFlowRecordComponent },
      { path: 'pipes', component: PipesRecordComponent },
      { path: 'ng-content', component: NgContentRecordComponent },
      { path: 'ng-template', component: NgTemplateRecordComponent },
      { path: 'ng-container', component: NgContainerRecordComponent }
    ]
  },
  
  { path: '**', redirectTo: '' },
];
