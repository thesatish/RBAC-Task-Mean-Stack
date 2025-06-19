import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { TaskService } from '../../../app/task/task.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent {
  private subscription: Subscription | null = null;
  taskList: any[] = [];
  currentPage = 1;
  isLoading = false;
  hasMoreData = true;
  isThrottled: any;
  searchQuery: string = '';
  suggestions: any[] = [];
  searchSubject = new Subject<string>();

  constructor(
    private _sharedService: SharedService,
    private _taskService: TaskService,
  ) { }

  ngOnInit(): void {
    // this._sharedService.setModuleId('0');
    this.subscription?.unsubscribe();
    this.subscription = this._sharedService.onCountCall$.subscribe(() => {
      console.log("🔥 I am subscribed! Event received!");

      this.getTaskCounting();
    });

    this.searchSubject.pipe(debounceTime(1000)).subscribe((query) => {
      this.fetchSuggestions(query);
    });

    this.getTask();
  }


  getTaskCounting() {
    console.log("share hits");
    const filterParams: any = {};
  }

  getTask(loader = true) {
    if (this.isLoading || !this.hasMoreData) {
      return;
    }
    this.isLoading = true;

    const filterParams: any = {
      page: this.currentPage,
      limit: 10,
    };

    this._taskService.getTask(filterParams).subscribe(
      (res: any) => {
        if (res.data.data.result.length > 0) {
          this.taskList = [...this.taskList, ...res.data.data.result];
          this.currentPage++;
        } else {
          this.hasMoreData = false;
        }
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onScroll(event: any) {
    if (this.isThrottled) {
      return;
    }

    const pos = event.target.scrollTop + event.target.clientHeight;
    const max = event.target.scrollHeight;

    if (pos >= max - 50 && !this.isLoading) {
      this.getTask();
      this.isThrottled = true;
      setTimeout(() => {
        this.isThrottled = false;
      }, 500);
    }
  }

  onSearch(event: any) {
    const query = event.target.value.trim();
    if (query.length >= 2) {
      this.searchSubject.next(query);
    } else {
      this.suggestions = [];
    }
  }

  fetchSuggestions(query: string) {
    if (query) {
      this._taskService.getTaskSearch(query).subscribe(
        (res: any) => {
          this.suggestions = res.data.data.result;
        },
        (error) => {
          console.error('Error fetching suggestions:', error);
          this.suggestions = [];
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.title;
    this.suggestions = [];
    console.log('Selected:', suggestion);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
