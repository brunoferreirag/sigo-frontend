import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertaService } from 'src/app/shared/service/alerta-service.service';
import {  StatusFaseIndustrialService } from '../status-fase-industrial.service';
import {  StatusFaseIndustrialDataSource } from './status-fase-industrial-datasource';

@Component({
  selector: 'app-status-fase-industrial-listagem',
  templateUrl: './status-fase-industrial-listagem.component.html',
  styleUrls: ['./status-fase-industrial.listagem.component.css']
})
export class StatusFaseIndustrialListagemComponent implements OnInit, OnDestroy {
  displayedColumns = ['fase', 'percentual-concluido', 'percentual-planejado','possui-parada-producao'];
  statusFaseIndustrialDataSource: StatusFaseIndustrialDataSource;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;
 
  constructor(private mediaObserver: MediaObserver, private statusFaseIndustialService: StatusFaseIndustrialService, public dialog: MatDialog) { 
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
      this.displayedColumns =['fase', 'percentual-concluido', 'percentual-planejado','possui-parada-producao'];
    }
    else{
      this.displayedColumns = ['fase', 'percentual-concluido', 'percentual-planejado'];
    }
}
 
  ngOnInit() {
    this.statusFaseIndustrialDataSource = new StatusFaseIndustrialDataSource(this.statusFaseIndustialService);
    this.statusFaseIndustrialDataSource.loadStatusFaseIndustrial();
  }
 
  ngAfterViewInit() {
    this.statusFaseIndustrialDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.statusFaseIndustialService)
      )
      .subscribe();
  }
 
  loadStatusFaseIndustrial() {
    this.statusFaseIndustrialDataSource.loadStatusFaseIndustrial();
  } 

}
