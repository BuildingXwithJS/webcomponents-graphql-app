import { Component, h, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { gql, request } from 'graphql-request';

const query = gql`
  query GetNote ($id:MongoID!) {
    noteOne(filter:{_id:$id}) {
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
  tag: 'app-note',
  styleUrl: 'app-note.css',
  shadow: true,
})
export class AppNote {
  @Prop() match: MatchResults;

  @State() note: Note;

  async componentDidLoad() {
    const variables = {id: this.match.params.id};
    const {noteOne} = await request('http://localhost:3000/graphql', query, variables);
    this.note = noteOne as Note;
  }

  render() {
    return (
      <div class="app-note">
        {!this.note && <div>Loading..</div>}

        {this.note !== undefined && <div>
          <h1>{this.note.name}</h1>

          <div>{this.note.body}</div>
        </div>}
      </div>
    );
  }
}
