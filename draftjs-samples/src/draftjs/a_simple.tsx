import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

export default class Simple extends React.Component<null, { editorState: EditorState }> {
    state = {
        editorState: EditorState.createEmpty()
    };

    editorStateChanged = (newEditorState: EditorState) => {
        this.setState({ editorState: newEditorState });
    }

    render() {
        return <Editor
            editorState={this.state.editorState}
            onChange={this.editorStateChanged}
        />;
    }
}  