import { Component, Renderer2, AfterViewInit } from '@angular/core';
// Helper Servive
import { HelperService } from 'src/app/services/helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HelperService]
})
export class LoginComponent implements AfterViewInit {
  isSubmitted: boolean = false
  constructor(public helperService: HelperService, private configService: ConfigService, private toaster: ToastrService, private renderer: Renderer2) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
  })
  onSubmit() {
    if (!this.isSubmitted) {
      this.isSubmitted = true
      this.configService.login(this.loginForm.value).subscribe(res => {
        this.toaster.success("Successfully Login!");
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
