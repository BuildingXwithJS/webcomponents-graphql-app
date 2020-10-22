import { gql, request } from 'https://jspm.dev/graphql-request';
import 'https://unpkg.com/@polymer/polymer/lib/elements/dom-if.js';
import {
  html,
  PolymerElement,
} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';

const query = gql`
  query GetNote($id: MongoID!) {
    noteOne(filter: { _id: $id }) {
      _id
      name
      body
    }
  }
`;

export class NoteComponent extends PolymerElement {
  constructor() {
    super();

    this.noteId = undefined;
    this.note = undefined;
  }

  static get properties() {
    return {
      noteId: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  isNoteDefined(note) {
    return note !== undefined;
  }
  isNoNote(note) {
    return note === undefined;
  }

  static get template() {
    return html`
      <div>
        <h3>Note page</h3>

        <template is="dom-if" if="{{isNoNote(note)}}">
          <div>Loading...</div>
        </template>

        <template is="dom-if" if="{{isNoteDefined(note)}}">
          <div>
            <h1>{{note.name}}</h1>
            <div>{{note.body}}</div>
          </div>
        </template>
      </div>
    `;
  }

  async attributeChangedCallback() {
    super.attributeChangedCallback();

    const variables = { id: this.noteId };
    const { noteOne } = await request(
      'http://localhost:3000/graphql',
      query,
      variables
    );
    this.note = noteOne;
  }
}

customElements.define('note-component', NoteComponent);
