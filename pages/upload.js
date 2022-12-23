export default function Upload() {
    return (
        <div>
            <form>
                <label htmlFor="file-input" />
                <input type="file"
                    name="file"
                    id="file-input"
                    required
                    accept={acceptedFileExtensions.join(",")}
                    multiple={false} />

                <label htmlFor="top-text" />
                <input
                    type="text"
                    name="top-text"
                    id="top-text"
                    placeholder="Enter text to appear above" />

                <label htmlFor="bottom-text" />
                <input
                    type="text"
                    name="bottom-text"
                    id="bottom-text"
                    placeholder="Enter text to appear below" />

                <button type="submit">
                    Generate
                </button>
            </form>
        </div>
    )
}