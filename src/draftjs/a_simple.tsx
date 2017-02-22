import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

export class Simple extends React.Component<null, { editorState: EditorState }> {
    state = {editorState: EditorState.createEmpty() };

    editorStateChanged = newEditorState =>  this.setState({ editorState: newEditorState });
   
    render() {
        return <div className="editor">
            <Editor
                editorState={this.state.editorState}
                onChange={this.editorStateChanged}
            />
        </div>;
    }
}  