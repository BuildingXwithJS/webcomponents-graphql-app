import { Component, h, Listen, State } from '@stencil/core';
import { gql, request } from 'graphql-request';

const query = gql`
  query AllNotes{
    noteMany {
      _id
      name
      body
    }
  }
`

type Note = {
  _id: string,
  name: string,
  body: string
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() notes: Array<Note> = [];

  async componentDidLoad() {
    const {noteMany} = await request('http://localhost:3000/graphql', query);
    this.notes = noteMany;
  }

  @Listen('noteAdded')
  noteAddedHandler(event: CustomEvent<Object>) {
    const note = event.detail;
    this.notes = [note as Note].concat(this.notes);
  }

  render() {
    return (
      <div class="app-home">
        <add-note />

        <p>Here are your notes:</p>

        {this.notes.map(noteData => <note-item name={noteData.name} id={noteData._id} />)}
      </div>
    );
  }
}
