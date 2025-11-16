import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Zap, Compass, Users, Anchor, Ship, Waves, Shield, Sword, Crown, Gem, Map, Flag, Target, Wind } from 'lucide-angular';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  id = input.required<string>();
  label = input.required<string>();
  icon = input.required<string>();
  iconColor = input<string>('#1482b4');
  idEvent = output<string>();

  readonly icons = {
    Zap,
    Compass,
    Users,
    Anchor,
    Ship,
    Waves,
    Shield,
    Sword,
    Crown,
    Gem,
    Map,
    Flag,
    Target,
    Wind
  };

  onSelect() {
    this.idEvent.emit(this.id());
  }

  getIcon() {
    return this.icons[this.icon() as keyof typeof this.icons] || this.icons.Anchor;
  }
}
