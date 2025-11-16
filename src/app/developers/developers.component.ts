import { Component } from '@angular/core';
import { LucideAngularModule, Linkedin, Github, Globe, Mail, User } from 'lucide-angular';

export interface Developer {
  name: string;
  role: string;
  description: string;
  avatar?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  email?: string;
}

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent {
  readonly socialIcons = {
    Linkedin,
    Github
  };

  developers: Developer[] = [
    {
      name: 'Yegor Chevardin',
      role: 'Software Engineer & Designer',
      description: 'Passionate full-stack developer. Bringing web and design solutions to life for Tempest Reef.',
      linkedIn: 'https://www.linkedin.com/in/yegor-chevardin/',
      github: 'https://github.com/YegorChevardin',
    },
    {
      name: 'Illia Kryzhanovskyi',
      role: 'Software Engineer & Architect',
      description: 'Expert game developer. Architecting and building the core functionality and multiplayer systems for Tempest Reef.',
      linkedIn: 'https://www.linkedin.com/in/illia-kryzhanovskyi/',
      github: 'https://github.com/kryzha',
    }
  ];
}
