# Creating content

There will be times when we want to initiate an Edit control with text. To do this we must first create a new content state.
There are a few ways to do this:
* plain text
* HTML
* a JSON object

Once we have a content state we can create a new EditorState, which we can use with our Edit control.  

## Plain text
```typescript
createWithPlainText = () => {
    const contentState = Draft.ContentState.createFromText(this.state.plainText);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    this.setState({ editorState: newEditorState });
}
```

## HTML
There are a few tags that Draft-js recognizes out of the box - reference: [Custom block rendering](https://facebook.github.io/draft-js/docs/advanced-topics-custom-block-render-map.html#content)
These include the following tags: 
- &lt;h1&gt;
- &lt;h2&gt;
- &lt;h3&gt;
- &lt;h4&gt;
- &lt;h5&gt;
- &lt;h6&gt;
- &lt;blockquote&gt;
- &lt;pre&gt;
- &lt;figure&gt;
- &lt;li&gt;
- &lt;div&gt;

You can "train" Draft-js to recognize and render any other tag (see decorators), but for simple types you can use the following code:
```typescript
 createWithHTML = () => {
        const contentBlocks = Draft.convertFromHTML(this.state.html);
        const contentState = Draft.ContentState.createFromBlockArray(contentBlocks);
        const newEditorState = Draft.EditorState.createWithContent(contentState);
        this.setState({ editorState: newEditorState });
    }
```

## A JSON object
This is by far the most useful as you can convert a content state that was typed by a user into JSON using *convert to raw* (see [Content State](/contentstate)), 
store it in a data base, retrieve it later and set the content state back. Because the state is a simple JSON object you can 
 manipulate or mine the object in the back end.

 The following is an example of a json structure:


```JSON
{
    "entityMap": {},
    "blocks": [
        {
            "key": "5h45l",
            "text": "the quick brown fox jumps over the lazy dog ",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 4,
                    "length": 5,
                    "style": "ITALIC"
                },
            
                {
                    "offset": 10,
                    "length": 5,
                    "style": "UNDERLINE"
                },
               {
                    "offset": 16,
                    "length": 3,
                    "style": "BOLD"
                }
            ],
            "entityRanges": [],
            "data": {}
        }
    ]
}
```

The code to create a content state would be as follows:

```typescript
createWithRawContent = () => {
    const contentState = Draft.convertFromRaw(rawSampleJson);
    const newEditorState = Draft.EditorState.createWithContent(contentState);
    this.editorStateChanged(newEditorState);
}
```