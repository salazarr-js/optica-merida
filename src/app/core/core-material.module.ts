import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule }  from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';


/** CORE MATERIAL MODULES */
@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatMenuModule,
    MatRippleModule
  ]
})
export class CoreMaterialModule { }