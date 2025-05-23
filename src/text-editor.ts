interface EditorState {
  save(editor: TextEditor): void;
  edit(editor: TextEditor): void;
}

class CleanUnsavedState implements EditorState {
  save(editor: TextEditor): void {
    const name = prompt("Enter filename:");
    if (name) {
      localStorage.setItem(name, editor.content);
      editor.filename = name;
      editor.setState(new CleanSavedState());
      console.log("Saved as", name);
    }
  }
  edit(editor: TextEditor): void {
    editor.setState(new DirtyUnsavedState());
  }
}

class CleanSavedState implements EditorState {
  save(editor: TextEditor): void {
    if (editor.filename) {
      localStorage.setItem(editor.filename, editor.content);
      console.log("Saved", editor.filename);
      editor.setState(new CleanSavedState());
    }
  }
  edit(editor: TextEditor): void {
    editor.setState(new DirtySavedState());
  }
}

class DirtyUnsavedState implements EditorState {
  save(editor: TextEditor): void {
    const name = prompt("Enter filename:");
    if (name) {
      localStorage.setItem(name, editor.content);
      editor.filename = name;
      editor.setState(new CleanSavedState());
      console.log("Saved as", name);
    }
  }
  edit(editor: TextEditor): void {
  }
}

class DirtySavedState implements EditorState {
  save(editor: TextEditor): void {
    if (editor.filename) {
      localStorage.setItem(editor.filename, editor.content);
      console.log("Saved", editor.filename);
      editor.setState(new CleanSavedState());
    }
  }
  edit(editor: TextEditor): void {
  }
}

class TextEditor {
  state: EditorState;
  filename: string | null = null;
  content: string = "";

  constructor() {
    this.state = new CleanUnsavedState();
  }

  setState(state: EditorState): void {
    this.state = state;
  }

  save(): void {
    this.state.save(this);
  }

  edit(): void {
    this.state.edit(this);
  }
}
