import { EditorView } from "codemirror";
import { formatFile } from "../../prettier";

export async function formatEditorContent(view: EditorView, path: string) {
  const content = view.state.doc.toString();
  try {
    const formattedCode = await formatFile(content, path);
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: formattedCode },
    });
  } catch {}
}
