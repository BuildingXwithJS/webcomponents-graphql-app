import { gql, request } from 'https://jspm.dev/graphql-request';
import 'https://unpkg.com/@polymer/polymer/lib/elements/dom-repeat.js';
import {
  html,
  PolymerElement,
} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';
import './add-note.js';

const query = gql`
  query AllNotes {
    noteMany {
      _id
      name
      body
    }
  }
`;

export class HomeComponent extends PolymerElement {
  constructor() {
    super();

    this.notes = [];
  }

  handleNewNote(event) {
    const note = event.detail;
    this.notes = [note].concat(this.notes);
  }

  static get template() {
    return html`
      <div class="app-home">
        <h3>Home page</h3>

        <add-note on-note="handleNewNote"></add-note>

        <p>Here are your notes:</p>

        <template is="dom-repeat" items="{{notes}}">
          <div class="note-item">
            <a href="#/note/[[item._id]]">[[item.name]]</a>
          </div>
        </template>
      </div>
    `;
  }

  async ready() {
    super.ready();

    const { noteMany } = await request('http://localhost:3000/graphql', query);
    this.notes = noteMany;
  }
}

customElements.define('home-component', HomeComponent);
