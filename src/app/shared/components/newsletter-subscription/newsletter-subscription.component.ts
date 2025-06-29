import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SubscriptionService } from "src/app/core/service/subscription.service";

@Component({
  selector: "app-newsletter-subscription",
  templateUrl: "./newsletter-subscription.component.html",
})
export class NewsletterSubscriptionComponent {
  isSubmitting = false;
  successMessage = "";
  errorMessage = "";

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
  ) {}

  subscribe() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.successMessage = "";
    this.errorMessage = "";

    const email = this.form.value.email!;

    this.subscriptionService.storeEmail(email).subscribe({
      next: () => {
        this.subscriptionService.sendConfirmationEmail(email).subscribe();
        this.successMessage =
          "Subscription successful! Please check your inbox.";
        this.form.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = "Oops! Something went wrong.";
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }
}
