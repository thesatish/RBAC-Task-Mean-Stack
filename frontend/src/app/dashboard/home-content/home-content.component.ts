import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent {
  private subscription: Subscription | null = null;

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.subscription?.unsubscribe();
    this.subscription = this._sharedService.onCountCall$.subscribe(() => {
      this.getTaskCounting();
    });
  }

  getTaskCounting() {
    const filterParams: any = {};
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
