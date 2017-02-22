# Draft-js basic construct
The basic component used in Draft-js is an Edit control.
If we compare a text input to an Edit control, a text input has a value that is a string of text that will be displayed. In an Edit control
we need more then simple text, we need an object that holds the text, cursor position etc. So instead of just text we use an EditorState object.
We keep this object in state so that the render method is called when it changes.
We can create a new EditorState as follows:
```jsx
 state = {editorState: EditorState.createEmpty() };
```
The Edit control is a controlled component, meaning that we need to control its value when a change happens.
We do that using the OnChange event handler and assigning the Editorstate to the new Editorstate that is passed to it as a property in the 
event handler:
```jsx
editorStateChanged = newEditorState =>  this.setState({ editorState: newEditorState })
```  
The Edit control as follows:
```jsx
<Editor
    editorState={this.state.editorState}
    onChange={this.editorStateChanged}
/>
```

Full listing as follows:
```jsx

import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

export class Simple extends React.Component<null, { editorState: EditorState }> {
    // create a new EditorState and keep it in state
    state = {editorState: EditorState.createEmpty() };

     // implement the onChange handeler up update the EditorState
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

```

[source](https://github.com/Mair/react-meetup-draftjs/blob/master/src/draftjs/simple.tsx)