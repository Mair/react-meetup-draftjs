import * as React from 'react';
import * as Draft from 'draft-js';

const regexStratergy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
    const text = block.getText();
    let result: RegExpExecArray;
    let regex = /(^|\s)#\w+/g;
    while ((result = regex.exec(text) as RegExpExecArray) != null) {
        let start = result.index;
        let end = start + result[0].length;
        callback(start, end);
    }
};

const regexComponent = (props) => <span style={{ backgroundColor: 'lightgreen' }}>{props.children}</span>;

const compositeDecorator = new Draft.CompositeDecorator([
    {
        strategy: regexStratergy,
        component: regexComponent
    }
]);

export class HashtagDecorator extends React.Component<null, { editorState: Draft.EditorState }> {

    state = { editorState: Draft.EditorState.createEmpty(compositeDecorator) };

    editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>
        </div>;
    }
}  