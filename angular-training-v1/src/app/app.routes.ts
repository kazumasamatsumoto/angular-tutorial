import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CompanyComponent } from './components/about/company/company.component';
import { HistoryComponent } from './components/about/history/history.component';
import { ServicesComponent } from './components/services/services.component';
import { WebComponent } from './components/services/web/web.component';
import { MobileComponent } from './components/services/mobile/mobile.component';
import { ProductsComponent } from './components/products/products.component';
import { SoftwareComponent } from './components/products/software/software.component';
import { HardwareComponent } from './components/products/hardware/hardware.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormComponent } from './components/contact/form/form.component';
import { OfficeComponent } from './components/contact/office/office.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewsComponent } from './components/blog/news/news.component';
import { TechComponent } from './components/blog/tech/tech.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TeamComponent } from './components/team/team.component';
import { CareersComponent } from './components/careers/careers.component';
import { FaqComponent } from './components/faq/faq.component';
import { PhotosComponent } from './components/gallery/photos/photos.component';
import { VideosComponent } from './components/gallery/videos/videos.component';
import { MembersComponent } from './components/team/members/members.component';
import { HistoryComponent as TeamHistoryComponent } from './components/team/history/history.component';
import { PositionsComponent } from './components/careers/positions/positions.component';
import { CultureComponent } from './components/careers/culture/culture.component';
import { BenefitsComponent } from './components/careers/benefits/benefits.component';
import { GeneralComponent } from './components/faq/general/general.component';
import { TechnicalComponent } from './components/faq/technical/technical.component';
import { FaqContactComponent } from './components/faq/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about',
        children: [
            { path: '', component: AboutComponent },
            { path: 'company', component: CompanyComponent },
            { path: 'history', component: HistoryComponent }
        ]
    },
    {
        path: 'services',
        children: [
            { path: '', component: ServicesComponent },
            { path: 'web', component: WebComponent },
            { path: 'mobile', component: MobileComponent }
        ]
    },
    {
        path: 'products',
        children: [
            { path: '', component: ProductsComponent },
            { path: 'software', component: SoftwareComponent },
            { path: 'hardware', component: HardwareComponent }
        ]
    },
    {
        path: 'contact',
        component: ContactComponent,
        children: [
            { path: '', component: ContactComponent },
            { path: 'form', component: FormComponent },
            { path: 'office', component: OfficeComponent }
        ]
    },
    {
        path: 'blog',
        component: BlogComponent,
        children: [
            { path: '', component: BlogComponent },
            { path: 'news', component: NewsComponent },
            { path: 'tech', component: TechComponent }
        ]
    },
    {
        path: 'gallery',
        component: GalleryComponent,
        children: [
            { path: '', component: GalleryComponent },
            { path: 'photos', component: PhotosComponent },
            { path: 'videos', component: VideosComponent }
        ]
    },
    {
        path: 'team',
        component: TeamComponent,
        children: [
            { path: '', component: TeamComponent },
            { path: 'members', component: MembersComponent },
            { path: 'history', component: TeamHistoryComponent }
        ]
    },
    {
        path: 'careers',
        component: CareersComponent,
        children: [
            { path: '', component: CareersComponent },
            { path: 'positions', component: PositionsComponent },
            { path: 'culture', component: CultureComponent },
            { path: 'benefits', component: BenefitsComponent }
        ]
    },
    {
        path: 'faq',
        component: FaqComponent,
        children: [
            { path: '', component: FaqComponent },
            { path: 'general', component: GeneralComponent },
            { path: 'technical', component: TechnicalComponent },
            { path: 'contact', component: FaqContactComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
