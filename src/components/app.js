import 'https://unpkg.com/@polymer/polymer/lib/elements/dom-if.js';
import {
  html,
  PolymerElement,
} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';
import Navigo from 'https://unpkg.com/navigo?module';
import './home.js';
import './note.js';

const router = new Navigo(null, true, '#');

class AppRoot extends PolymerElement {
  constructor() {
    super();

    this.noteId = '';
    this.route = 'Home';
  }

  isHome(route) {
    return route === 'Home';
  }
  isNote(route) {
    return route === 'Note';
  }

  static get template() {
    return html`
      <div>
        <header>
          <a href="#/">
            <h2>WebComponent GraphQL Application</h2>
          </a>
        </header>

        <div>
          <template is="dom-if" if="{{isHome(route)}}">
            <home-component />
          </template>

          <template is="dom-if" if="{{isNote(route)}}">
            <note-component note-id="{{noteId}}" />
          </template>
        </div>
      </div>
    `;
  }

  ready() {
    super.ready();

    router
      .on({
        'note/:id': ({ id }) => {
          this.route = 'Note';
          this.noteId = id;
        },
        '*': () => {
          console.log('home');
          this.route = 'Home';
        },
      })
      .resolve();
  }
}

customElements.define('app-root', AppRoot);
