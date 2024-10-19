import { Routes } from '@angular/router';
import { SimComponent } from './sim/sim.component';

export const routes: Routes = [
    { path: 'sim', component: SimComponent },
    { path: '', redirectTo: '/sim', pathMatch: 'full' }
];
