import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/interface/employee';
import { ConfigService } from 'src/app/services/config.service';
import * as $ from 'jquery'
// Helper Servive
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [HelperService]
})
export class IndexComponent implements OnInit {
  employees: Employee[] = new Array();
  emp_id: string = '';
  loading: boolean = true;
  constructor(public helperService: HelperService, private config: ConfigService, private renderer: Renderer2) { }
  faEdit = faEdit
  faTrash = faTrash
  ngOnInit(): void {
    this.loadEmployee()
  }
  loadEmployee() {
    this.config.getEmployees().subscribe(res => {
      this.employees = res;
      this.loading = false;
    },
      err => {
        console.log("ERROR: ", err)
      })
  }
  setEmp(emp_id: string) {
    this.emp_id = emp_id
  }
  deleteEmployee() {
    $('.btn-close').trigger('click')
    this.config.deleteEmployees(this.emp_id).subscribe(res => {
      this.loading = true;
      this.loadEmployee()
    },
      err => {
        console.log("ERR", err)
      })
  }
  ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
