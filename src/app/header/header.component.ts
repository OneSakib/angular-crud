import { Component } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { ConfigService } from '../services/config.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HelperService]
})
export class HeaderComponent {
  constructor(public helperService: HelperService, public config: ConfigService, private toaster: ToastrService) { }
  logout() {
    this.config.logOut()
    this.toaster.success("Logout Successfully")
    this.helperService.routeTo('login')
  }
}
