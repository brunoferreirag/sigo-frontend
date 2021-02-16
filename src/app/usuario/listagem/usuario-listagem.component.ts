import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/component/modal.component';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';
import { UsuarioService } from '../usuario.service';
import { UsuarioDataSource } from './usuario-datasource';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'primeiro-nome', 'ultimo-nome','acao-editar','acao-excluir'];
  usuarioDataSource: UsuarioDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;
 
  constructor(private mediaObserver: MediaObserver,private usuarioService: UsuarioService, public dialog: MatDialog, private alertaService: AlertaService,private router: Router) { 
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== this.currentScreenWidth) {
          this.currentScreenWidth = change.mqAlias;
          this.setupTable();
      }
  }); 
  }
  ngOnDestroy(): void {
    if(this.flexMediaWatcher){
      this.flexMediaWatcher.unsubscribe(); 
    }
  }
 
  ngOnInit() {
    this.usuarioDataSource = new UsuarioDataSource(this.usuarioService);
    this.usuarioDataSource.loadUsuarios();
  }
  setupTable() {
   
    if (this.currentScreenWidth === 'xl' || this.currentScreenWidth === 'lg' || this.currentScreenWidth === 'md' || this.currentScreenWidth === 'sm') { 
      this.displayedColumns = ['username', 'primeiro-nome', 'ultimo-nome','acao-editar','acao-excluir'];
    }
    else{
      this.displayedColumns = ['username', 'acao-editar','acao-excluir'];
    }
}
  ngAfterViewInit() {
    this.usuarioDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.loadUsuarios())
      )
      .subscribe();
  }
 
  loadUsuarios() {
    this.usuarioDataSource.loadUsuarios(this.paginator.pageIndex, this.paginator.pageSize);
  }

  irParaTelaInclusao(){
    this.router.navigate(['/usuario']);
  }

  excluirUsuario(userName:string):void{
    const dialogRef = this.dialog.open(ModalComponent,{
      width: '380px',
      data: {mensagem:'Deseja excluir o usuário ' + userName + ' ?',titulo:'Usuários'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usuarioService.excluirUsuarios(userName).subscribe(()=>{
          this.alertaService.success('Usuário excluído com sucesso');
          this.loadUsuarios();
        })
      }
    });
  }
 

}
