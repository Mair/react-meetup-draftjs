# Draft-js Samples

Draft-JS is a framework developed by Facebook that allows you to create rich customiseable text editors.
You can find out more about the framework at the (official site).

The basic component used in Draft-js is an Edit control.
If we compare a text input to an Edit control, a text input has a value that is a text string. In an Edit control
we need more then simple text, we need an object that holds the text, cursor position etc. Instead of just text we use an EditorState object
There are a few key things that one must know to ue the Editor control successfully:

* The EditorState control is immutable. This means you never change it or any of its properties. 
Instead if you want to change something like the text, you use a method that gives you back an entirely new EditorState which is a copy of the old EditorState and 
your new changes. The new EditorState is then given to the edit control where you can see your changes.

* The EditorState controls has child objects that show the actual state of what is being represented in the editor including 
text, cursor / selection, styling etc.

![](/docs/EditorState_2.png)

## Definitons
- *EditorState* : The object responsible for the current state as represented in the Editor
- *ContentState* : The object responsible for the text in the Editor. Content is made up of blocks of Content.
- *SelectionState* : The object responsible for the cursor and the cursor's selection area
- *Entities* : Metadata that can be added to a portion of text



