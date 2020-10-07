// ANGULAR IMPORTs
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** MATERIAL & THIRDs MODULES */
import { SharedMaterialModule } from './shared-material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/** DECLARABLES */
import { SHARED_COMPONENTS } from './components';


/**
 * ALL MODULES/COMPONENTS TO
 * IMPORT: TO BE ABLE TO USE MODULES IN DECLARATIONS
 * EXPORT: TO EXPOSE ALL THE MODULES
 */
const sharedModules = [
  CommonModule,
  RouterModule,

  SharedMaterialModule,
  SweetAlert2Module
];


/** ALL SHARED COMPONENTS, DIRECTIVES, PIPES TO DECLARE & EXPORT */
const sharedDeclarables = [
  SHARED_COMPONENTS,
];


/** FEATURE SHARED MODULE */
@NgModule({
  imports: sharedModules,
  declarations: sharedDeclarables,
  exports: [
    sharedModules,
    sharedDeclarables
  ]
})
export class SharedModule { }
