import { Component, model, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
})
export class Settings {
  name = model('John Doe');
  email = model('john@example.com');
  darkMode = model(false);

  constructor() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') this.darkMode.set(true);
    if (saved === 'false') this.darkMode.set(false);

    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
      }

      localStorage.setItem('darkMode', String(isDark));
    });
  }
}
