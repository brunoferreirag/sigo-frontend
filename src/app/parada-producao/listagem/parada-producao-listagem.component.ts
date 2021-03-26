import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/component/modal.component';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';
import { ParadaProducaoService } from '../parada-producao.service';
import { ParadaProducaoDataSource } from './parada-producao-datasource';

@Component({
  selector: 'app-parada-producao-listagem',
  templateUrl: './parada-producao-listagem.component.html',
  styleUrls: ['./parada-producao-listagem.component.css']
})
export class ParadaProducaoListagemComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'linha-nome', 'turno-nome','data-hora-inicio','data-hora-fim','acao-editar','acao-excluir'];
  paradaProducaoDataSource: ParadaProducaoDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;
 
  constructor(private mediaObserver: MediaObserver, private paradaProducaoService: ParadaProducaoService, public dialog: MatDialog, private alertaService: AlertaService,private router: Router) { 
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

  setupTable() {
   
    if (this.currentScreenWidth === 'xl' || this.currentScreenWidth === 'lg' || this.currentScreenWidth === 'md' || this.currentScreenWidth === 'sm') { 
      this.displayedColumns =['id', 'linha-nome', 'turno-nome','data-hora-inicio','data-hora-fim','acao-editar','acao-excluir'];;
    }
    else{
      this.displayedColumns = ['linha-nome','data-hora-inicio','data-hora-fim','acao-editar','acao-excluir'];;
    }
}
 
  ngOnInit() {
    this.paradaProducaoDataSource = new ParadaProducaoDataSource(this.paradaProducaoService);
    this.paradaProducaoDataSource.loadParadasProducao();
  }
 
  ngAfterViewInit() {
    this.paradaProducaoDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.loadParadaProducao())
      )
      .subscribe();
  }
 
  loadParadaProducao() {
    this.paradaProducaoDataSource.loadParadasProducao(this.paginator.pageIndex, this.paginator.pageSize);
  }

  irParaTelaInclusao(){
    this.router.navigate(['/parada-producao']);
  }

  excluirParadaProducao(id:string):void{
    const dialogRef = this.dialog.open(ModalComponent,{
      width: '380px',
      data: {mensagem:'Deseja excluir a parada de produção com id:' + id,titulo:'Parada de Produção'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paradaProducaoService.excluirParadaProducao(id).subscribe(()=>{
          this.alertaService.success('Parada de Produção excluída com sucesso');
          this.loadParadaProducao();
        })
      }
    });
  }
 

}
