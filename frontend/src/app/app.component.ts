import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  surgeons : any;
  dataSource : any;

  displayedColumns: string[] = ['name', 'speciality', 'interventionCount', 'favoriteAnesthetist', 'favoriteNurse', 'mostFrequentRoom', 'mostFrequentProcedure'];

    constructor(
      private renderer: Renderer2,
      private http: HttpClient,
      private dialog: MatDialog,
      private changeDetectorRef: ChangeDetectorRef
    ) {
     
  
      this.http.get('http://localhost:3000/api/interventions').subscribe(
        (data: any) => {
          this.surgeons = data;
          this.dataSource = new MatTableDataSource(this.surgeons);
        },
        (error) => {
          console.error(error.error);
        }
      );
  }
}
