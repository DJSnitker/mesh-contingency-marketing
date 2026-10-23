import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ChatDemo } from './chat-demo';
import { FEATURES } from './content';
import { Icon } from './icon';
import { Tabs } from './tabs';

// What people with a radio can do: pick a feature, and the chat plays it.
@Component({
  selector: 'app-feature-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, Icon, Tabs],
  styles: `
    :host {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 40px;
      align-items: start;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .panel {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 40px;

      @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }

    .copy {
      padding-top: 8px;

      h3 {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0;
        font-family: var(--display);
        font-size: 1.8rem;
        line-height: 1.05;
        text-transform: uppercase;

        app-icon {
          color: var(--orange);
          font-size: 1rem;
        }
      }

      p {
        margin: 14px 0 0;
        color: var(--muted);
        font-size: 1.05rem;
      }
    }
  `,
  template: `
    <app-tabs prefix="feature" label="Features" [vertical]="true" [tabs]="tabs" [(selected)]="selected" />
    <div class="panel" id="feature-panel" role="tabpanel" [attr.aria-labelledby]="'feature-tab-' + selected()">
      <div class="copy">
        <h3><app-icon [name]="feature().icon" /> {{ feature().title }}</h3>
        <p>{{ feature().body }}</p>
      </div>
      @for (f of [feature()]; track f.title) {
        <app-chat-demo [exchanges]="f.demo" />
      }
    </div>
  `,
})
export class FeaturePicker {
  protected readonly tabs = FEATURES.map((f) => ({ id: f.icon, label: f.title, icon: f.icon }));
  protected readonly selected = signal(FEATURES[0].icon);
  protected readonly feature = computed(() => FEATURES.find((f) => f.icon === this.selected())!);
}
