

export default function Upload() {

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = newFormData(e.target);

            const response = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.status >= 200 && response.status < 300) {
                return router.push("/");
            }
            throw data;

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
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