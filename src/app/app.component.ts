import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FeaturesComponent } from "./features/features.component";
import { FeedbackFormComponent } from "./feedback-form/feedback-form.component";
import { CopyrightContainerComponent } from "./copyright-container/copyright-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FeaturesComponent, FeedbackFormComponent, CopyrightContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ikstudio-links';
}
