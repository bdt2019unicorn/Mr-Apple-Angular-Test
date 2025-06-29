import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Subscriber } from "src/app/core/models/subscriber.model";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  // Send to backend
  storeEmail(email: string): Observable<boolean> {
    var result: boolean = true;
    return of(result);
    // return this.http.post<boolean>("/api/subscribe", { email });
  }

  // Simulate calling SendGrid to send confirmation email
  sendConfirmationEmail(email: string): Observable<boolean> {
    console.log(`Sending confirmation email to ${email}...`);
    return of(true);
  }

  getSubscribers(): Observable<Subscriber[]> {
    // return this.http.get<Subscriber[]>('/api/subscribers');

    const mockSubscribers: Subscriber[] = [
      { email: "alice@example.com", subscribedAt: "2025-06-01T10:00:00Z" },
      { email: "bob@example.com", subscribedAt: "2025-06-05T14:30:00Z" },
      { email: "carol@example.com", subscribedAt: "2025-06-10T08:15:00Z" },
    ];

    return of(mockSubscribers);
  }
}
