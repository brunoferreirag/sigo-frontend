import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmazemFormularioComponent } from './armazem/formulario/armazem-formulario.component';
import { ArmazemListagemComponent } from './armazem/listagem/armazem-listagem.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NormaIndustrialFormularioComponent } from './norma-industrial/formulario/norma-industrial-formulario.component';
import { NormaIndustrialListagemComponent } from './norma-industrial/listagem/norma-industrial-listagem.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { UsuarioFormularioComponent } from './usuario/formulario/usuario-formulario.component';
import { UsuarioListagemComponent } from './usuario/listagem/usuario-listagem.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuarios', component: UsuarioListagemComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_ADMIN_SIGO'
    }
  },
  {
    path: 'usuario/:id', component: UsuarioFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_ADMIN_SIGO'
    }
  },
  {
    path: 'usuario', component: UsuarioFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_ADMIN_SIGO'
    }
  },
  {
    path: 'armazens', component: ArmazemListagemComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI'
    }
  },

  {
    path: 'armazem/:id', component: ArmazemFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI'
    }
  },
  {
    path: 'armazem', component: ArmazemFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI'
    }
  },
  {
    path: 'normas-industriais', component: NormaIndustrialListagemComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GN'
    }
  },

  {
    path: 'norma-industrial/:id', component: NormaIndustrialFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GN'
    }
  },

  {
    path: 'norma-industrial', component: NormaIndustrialFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GN'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
