import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const EditorField = (props) => {
  const { label } = props;

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  return (
    <>
      <div className="mt-4">
        <p className="block first-letter:uppercase">{label}</p>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-wysiwyg"
          editorClassName="editor-wysiwyg"
          toolbarClassName="toolbar-wysiwyg"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
      </div>
    </>
  );
};

export default EditorField;
