import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <stencil-route-link url="/">
            <h1>WebComponent GraphQL Application</h1>
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/note/:id" component="app-note" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
