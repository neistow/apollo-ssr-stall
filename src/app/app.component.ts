import { ApplicationRef, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, take } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `test`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  // Just injecting apollo is enough for hydration to stutter
  apollo = inject(Apollo);

  constructor() {
    const start = performance.now();
    inject(ApplicationRef).isStable.pipe(
      filter(x => x),
      take(1)
    ).subscribe(() => console.log(performance.now() - start));
  }
}
