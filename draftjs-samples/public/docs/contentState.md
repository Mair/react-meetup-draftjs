# Content state

The ContentState object represents 
- text in an array of blocks.
- Entities (metadata that accompanies some text)

In this sample you can observe what happens when you type some text. The resulting JSON can be stored in a database to recreate the 
ContentState at a later stage
The content within a ContentState can be retrieved as follows:

``` jsx
get contentState() {
    const contentState = this.state.editorState.getCurrentContent();
    const rawJson = Draft.convertToRaw(contentState);
    const jsonStr = JSON.stringify(rawJson, null, 1);
    const plainText = contentState.getPlainText();
    return {
        jsonStr,
        plainText
    };
}
```

