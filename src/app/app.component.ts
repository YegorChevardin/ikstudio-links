import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FeaturesComponent } from "./features/features.component";
import { CopyrightContainerComponent } from "./copyright-container/copyright-container.component";
import { DevelopersComponent } from "./developers/developers.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FeaturesComponent, CopyrightContainerComponent, DevelopersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ikstudio-links';
}
