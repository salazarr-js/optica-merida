// ANGULAR IMPORTs
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** MATERIAL & THIRDs MODULES */
import { SharedMaterialModule } from './shared-material.module';
/** DECLARABLES */
// import { SHARED_MODULES } from './modules';
import { SHARED_COMPONENTS } from './components';
// import { SHARED_DIRECTIVES } from './directives';


/**
 * ALL MODULES/COMPONENTS TO
 * IMPORT: TO BE ABLE TO USE MODULES IN DECLARATIONS
 * EXPORT: TO EXPOSE ALL THE MODULES
 */
const sharedModules = [
  CommonModule,
  RouterModule,
  // HttpClientModule,
  // FormsModule,
  // ReactiveFormsModule,

  SharedMaterialModule,

  // SHARED_MODULES
];


/** ALL SHARED COMPONENTS, DIRECTIVES, PIPES TO DECLARE & EXPORT */
const sharedDeclarables = [
  SHARED_COMPONENTS,
  // SHARED_DIRECTIVES,
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
