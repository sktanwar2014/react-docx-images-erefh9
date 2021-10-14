import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';

import doc from './Docx/index.js';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  generate(): void {
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  }

  render() {
    return (
      <button onClick={this.generate}>Generate doc with base64 image!</button>
    );
  }
}

render(<App />, document.getElementById('root'));
