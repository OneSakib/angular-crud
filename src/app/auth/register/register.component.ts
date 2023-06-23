import { Component,Renderer2,AfterViewInit } from '@angular/core';
// Helper Servive
import { HelperService } from 'src/app/services/helper.service';
import { ConfigService } from 'src/app/services/config.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HelperService]
})
export class RegisterComponent implements AfterViewInit {
  isSubmitted: boolean = false
  constructor(public helperService: HelperService, private configService: ConfigService, private toaster: ToastrService, private renderer: Renderer2) { }
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    user_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
  })
  onSubmit() {
    if (!this.isSubmitted) {
      this.isSubmitted = true
      this.configService.register(this.registerForm.value).subscribe(res => {
        this.toaster.success("Successfully Register!");
        this.configService.setToken(res?.token)
        this.configService.setUser(res)
        this.helperService.routeTo('index')
      },
        err => {
          this.isSubmitted = false
          this.toaster.error(err?.error?.message);
        })
    }
  }
  ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
