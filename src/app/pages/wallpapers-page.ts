import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WALLPAPERS } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-wallpapers-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">Downloads</p>
        <h1>Wallpapers, <span>for the desk by the radio</span></h1>
        <p class="lede">
          The mesh, a message hopping across it, and the shield. Free to use on your own screens, sized
          for dual monitors, ultrawides and a single display. The SVG versions scale to any size.
        </p>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <ul class="wallpapers">
          @for (w of wallpapers; track w.file) {
            <li [class.single]="'single' in w">
              <a class="wp-preview" [href]="'wallpapers/' + w.file + '.png'" target="_blank" rel="noopener">
                <img
                  [src]="'wallpapers/previews/' + w.file + '.jpg'"
                  [alt]="'Mesh Contingency wallpaper, ' + w.size"
                  [attr.loading]="$first ? 'eager' : 'lazy'"
                />
              </a>
              <div class="wp-body">
                <div>
                  <h3>{{ w.size }}</h3>
                  <small>{{ w.fits }}</small>
                  <p>{{ w.note }}</p>
                </div>
                <div class="wp-actions">
                  <a class="btn btn-sm" [href]="'wallpapers/' + w.file + '.png'" [attr.download]="w.file + '.png'">
                    <app-icon name="download" /> PNG
                  </a>
                  @if (w.svg) {
                    <a class="btn btn-sm btn-ghost" [href]="'wallpapers/' + w.file + '.svg'" [attr.download]="w.file + '.svg'">
                      <app-icon name="download" /> SVG
                    </a>
                  }
                </div>
              </div>
            </li>
          }
        </ul>
        <p class="fine">
          Set one from your desktop’s background settings. On two monitors, choose <em>span</em> so the
          picture stretches across both screens.
        </p>
      </div>
    </section>
  `,
})
export class WallpapersPage {
  protected readonly wallpapers = WALLPAPERS;
}
