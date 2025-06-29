import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  // Send to backend
  storeEmail(email: string): Observable<any> {
    // Replace with actual backend API
    return this.http.post("/api/subscribe", { email });
  }

  // Simulate calling SendGrid to send confirmation email
  sendConfirmationEmail(email: string): Observable<any> {
    // In theory, you'd call your backend or directly to SendGrid API
    console.log(`Sending confirmation email to ${email}...`);
    return of({ success: true });
  }
}
