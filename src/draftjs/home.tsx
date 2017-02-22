import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

export class Home extends React.Component<null, { editorState: EditorState }> {
    state = { editorState: EditorState.createEmpty() };

    render() {
        return <div className="editor">
            <Editor editorState={this.state.editorState} onChange={e => this.setState({ editorState: e })} />
        </div>;
    }
}  