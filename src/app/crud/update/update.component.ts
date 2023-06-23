import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interface/employee';
import { ConfigService } from 'src/app/services/config.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// Helper Servive
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [HelperService]
})
export class UpdateComponent implements OnInit, AfterViewInit {
  emp_id: string = '';
  emp_data: Employee[] = [];
  isSubmitted: boolean = false;
  constructor(private route: ActivatedRoute, private config: ConfigService, private renderer: Renderer2, private toaster: ToastrService, private helper: HelperService) { }
  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    age: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emp_id = params['id']
    })
    // Load API DATE
    this.config.getEmployee(this.emp_id).subscribe(res => {
      this.employeeForm.setValue({
        firstName: res.firstName,
        lastName: res.lastName,
        age: res.age.toString(),
        address: res.address
      })
    },
      err => {

      })
  }
  onSubmit() {
    if (!this.isSubmitted) {
      this.config.updateEmployees(this.emp_id, this.employeeForm.value).subscribe(res => {
        this.toaster.success("Successfully Updated Employee")
        this.helper.routeTo('index')
      },
        err => {
          console.log("ERROR EMPLOYEE", err)
        }
      )
    }
  }
  ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
