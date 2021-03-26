import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuardService } from './shared/service/auth-guard.service';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatListModule,
  MatCheckboxModule,
  MatProgressBarModule
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AlertaComponent } from './alerta/alerta.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { UsuarioListagemComponent } from './usuario/listagem/usuario-listagem.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoadHttpInterceptor } from './helpers/load.interceptor';
import { ModalComponent } from './shared/component/modal.component';
import { UsuarioFormularioComponent } from './usuario/formulario/usuario-formulario.component';
import { ParadaProducaoListagemComponent } from './parada-producao/listagem/parada-producao-listagem.component';
import { ParadaProducaoFormularioComponent } from './parada-producao/formulario/parada-producao-formulario.component';
import { NormaIndustrialListagemComponent } from './norma-industrial/listagem/norma-industrial-listagem.component';
import { NormaIndustrialFormularioComponent } from './norma-industrial/formulario/norma-industrial-formulario.component';
import { NotFoundComponent } from './shared/notfound/notfound.component';
import { StatusFaseIndustrialListagemComponent } from './status-fase-industrial/listagem/status-fase-industrial-listagem.component';
import { registerLocaleData } from '@angular/common';
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoginComponent,
    HomeComponent,
    AlertaComponent,
    UsuarioListagemComponent,
    UsuarioFormularioComponent,
    ParadaProducaoListagemComponent,
    ParadaProducaoFormularioComponent,
    NormaIndustrialListagemComponent,
    NormaIndustrialFormularioComponent,
    StatusFaseIndustrialListagemComponent,
    NotFoundComponent
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    { provide: LOCALE_ID, useValue: 'pt-BR' },    
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
