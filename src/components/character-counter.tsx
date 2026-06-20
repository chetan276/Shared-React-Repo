import { useState, type ChangeEvent } from "react";

function CharacterCounter() {

    const [text, setText] = useState("");
    
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setText(event.target.value);
    }

    // We did not create using useState because we can calculate the word count directly from the text state without needing to store it separately.
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    return (<>
        <h2>Character Counter</h2>
        <textarea placeholder="Type something..." rows={5} cols={50} value={text} onChange={handleChange} />

        <p>Characters: {text.length}</p>
        <p>Words: {wordCount}</p>
    </>
    );
}

export default CharacterCounter;