import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatCardModule,MatSelectModule,MatInputModule,MatPaginatorModule,MatProgressBarModule,MatListModule,MatIconModule,MatButtonModule
  ],
  exports:[
    MatCardModule,MatSelectModule,MatInputModule,MatPaginatorModule,MatProgressBarModule,MatListModule,MatIconModule,MatButtonModule
  ]
})
export class MaterialModuleModule { }
