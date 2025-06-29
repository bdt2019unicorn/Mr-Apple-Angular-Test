import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscriber } from "src/app/core/models/subscriber.model";
import { SubscriptionService } from "src/app/core/service/subscription.service";

@Component({
  selector: "app-subscriber-list",
  templateUrl: "./subscriber-list.component.html",
  imports: [CommonModule],
})
export default class SubscriberListComponent implements OnInit {
  subscribers: Subscriber[] = [];
  loading = true;
  error = "";

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.subscriptionService.getSubscribers().subscribe({
      next: (data) => {
        this.subscribers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load subscribers.";
        this.loading = false;
      },
    });
  }
}
