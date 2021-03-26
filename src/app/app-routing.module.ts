import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParadaProducaoFormularioComponent } from './parada-producao/formulario/parada-producao-formulario.component';
import { ParadaProducaoListagemComponent } from './parada-producao/listagem/parada-producao-listagem.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NormaIndustrialFormularioComponent } from './norma-industrial/formulario/norma-industrial-formulario.component';
import { NormaIndustrialListagemComponent } from './norma-industrial/listagem/norma-industrial-listagem.component';
import { NotFoundComponent } from './shared/notfound/notfound.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { UsuarioFormularioComponent } from './usuario/formulario/usuario-formulario.component';
import { UsuarioListagemComponent } from './usuario/listagem/usuario-listagem.component';
import { StatusFaseIndustrialListagemComponent } from './status-fase-industrial/listagem/status-fase-industrial-listagem.component';
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
    path: 'paradas-producao', component: ParadaProducaoListagemComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI_PP'
    }
  },

  {
    path: 'parada-producao/:id', component: ParadaProducaoFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI_PP'
    }
  },
  {
    path: 'parada-producao', component: ParadaProducaoFormularioComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI_PP'
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
  {
    path: 'status-producao', component: StatusFaseIndustrialListagemComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'ROLE_SIGO_GPI_SP'
    }
  },

  {
    path: '**', component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
