import * as React from 'react';
import * as Draft from 'draft-js';

let regexString: string;

const regexStratergy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
    const text = block.getText();
    let result: RegExpExecArray;
    if (!regexString) { return; }
    var regex: RegExp;
    try {
        regex = new RegExp(regexString, 'g');
    } catch (e) {
        // invalid regex so return;
        return;
    }
    let escapeHatch = 0;
    while ((result = regex.exec(text) as RegExpExecArray) != null) {
        let start = result.index;
        let end = start + result[0].length;
        // hack to vercome situations where regex.exec doesn't move the curser
        if (escapeHatch++ > 100) {return; }
        callback(start, end);
    }
};

const regexComponent = (props) => <span className="text-found">{props.children}</span>;

const compositeDecorator = new Draft.CompositeDecorator([
    {
        strategy: regexStratergy,
        component: regexComponent
    }
]);

export class RegexDecorator extends React.Component<null, { editorState: Draft.EditorState, regex: string }> {

    state = {
        editorState: Draft.EditorState.createWithContent(
            Draft.ContentState.createFromText('The cat sat on the mat'), compositeDecorator),
        regex: ''
    };

    editorStateChanged = (newEditorState: Draft.EditorState) => this.setState({ editorState: newEditorState });

    regexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        regexString = e.target.value;
        // refresh the editor state hack based on https://github.com/facebook/draft-js/issues/458
        this.setState({
            regex: e.target.value,
            editorState: Draft.EditorState.createWithContent(
                this.state.editorState.getCurrentContent(),
                compositeDecorator
            )
        });
    }

    render() {
        return <div>
            <div className="editor">
                <Draft.Editor
                    editorState={this.state.editorState}
                    onChange={this.editorStateChanged}
                />
            </div>
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="regex" className="control-label col-sm-1">data</label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="regex"
                            placeholder="regex"
                            value={this.state.regex}
                            onChange={this.regexChange}
                        />
                    </div>
                </div>
            </div>
        </div>;
    }
}  