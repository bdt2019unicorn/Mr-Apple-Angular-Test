// subscriber-subscription.component.spec.ts
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NewsletterSubscriptionComponent } from "src/app/shared/components/newsletter-subscription/newsletter-subscription.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SubscriptionService } from "src/app/core/service/subscription.service";
import { of, throwError } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe("NewsletterSubscriptionComponent", () => {
  let component: NewsletterSubscriptionComponent;
  let fixture: ComponentFixture<NewsletterSubscriptionComponent>;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsletterSubscriptionComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SubscriptionService],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsletterSubscriptionComponent);
    component = fixture.componentInstance;
    subscriptionService = TestBed.inject(SubscriptionService);
    fixture.detectChanges();
  });

  it("should disable the subscribe button if the email is invalid", () => {
    const input = component.form.controls["email"];
    input.setValue("invalid-email");
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button")).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it("should call storeEmail and show success message on valid submit", () => {
    spyOn(subscriptionService, "storeEmail").and.returnValue(of(true));
    spyOn(subscriptionService, "sendConfirmationEmail").and.returnValue(
      of(true),
    );

    component.form.controls["email"].setValue("test@example.com");
    fixture.detectChanges();
    component.subscribe();

    expect(subscriptionService.storeEmail).toHaveBeenCalledWith(
      "test@example.com",
    );
    expect(component.successMessage).toContain("Subscription successful");
  });

  it("should show error message when storeEmail fails", () => {
    spyOn(subscriptionService, "storeEmail").and.returnValue(
      throwError(() => new Error("API Error")),
    );

    component.form.controls["email"].setValue("fail@example.com");
    fixture.detectChanges();
    component.subscribe();

    expect(component.errorMessage).toContain("Oops");
  });
});
