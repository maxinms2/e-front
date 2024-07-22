import { Component, OnInit } from '@angular/core';
import { CounterVisitsService } from 'src/app/services/counter-visits.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
  countVisits:string='';

  constructor(private counterVisitsService:CounterVisitsService){}
  ngOnInit(): void {
    this.counterVisitsService.getCounter().subscribe(
      c=>this.countVisits=c
    )
  }

}
