import { Component, Renderer2, AfterViewInit } from '@angular/core';
// Helper Servive
import { HelperService } from 'src/app/services/helper.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [HelperService]
})
export class AddComponent implements AfterViewInit {
  isSubmitted: boolean = false;
  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    age: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
  constructor(private config: ConfigService, private toaster: ToastrService, private helper: HelperService, private renderer: Renderer2) { }
  onSubmit() {
    if (!this.isSubmitted) {
      this.config.addEmployees(this.employeeForm.value).subscribe(res => {
        this.toaster.success("Successfully add Employee")
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
