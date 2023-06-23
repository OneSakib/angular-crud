import { Component,Renderer2,AfterViewInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  providers: [HelperService]
})
export class ErrorPageComponent {
  constructor(public helperService: HelperService, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
