import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ParadaProducao } from 'src/app/models/parada-producao';
import { ParadaProducaoService } from '../parada-producao.service';
import { ParadaProducaoListResponse } from 'src/app/models/parada-producao-list-response';
 
export class ParadaProducaoDataSource implements DataSource<ParadaProducao>{
 
    private paradaProducaoSubject = new BehaviorSubject<ParadaProducao[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
 
    constructor(private paradaProducaoService: ParadaProducaoService) { }
 
    connect(collectionViewer: CollectionViewer): Observable<ParadaProducao[]> {
        return this.paradaProducaoSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.paradaProducaoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
 
    loadParadasProducao(page = 0, size = 10) {
        this.loadingSubject.next(true);
        this.paradaProducaoService.getAllParadasProducao( page, size )
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: ParadaProducaoListResponse) => {
                this.paradaProducaoSubject.next(result.content);
                this.countSubject.next(result.total_elements);
            }
            );
    }
 
}