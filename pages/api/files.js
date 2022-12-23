import { handleCloudinaryUpload, parseForm, } from "../../lib/files";

export const config = {
    api: { bodyParser: false, },
};

export default async (req, res) => {
    switch (req.method) {
        case "GET": {

        }

        case "POST": {
            try {
                const result = await handlePostRequest(req);

                return res.status(200).json({ message: "Success", result });
            } catch {
                return res.status(400).json({ message: "Error", error });
            }
        }
        case "DELETE": {

        }
        default: {
            return res.status(405).json({ message: "Method not allowed" });
        }
    }
}

const handlePostRequest = async (req) => {
    const data = await parseForm(req);


    const result = await handleCloudinaryUpload(data?.files?.file, {
        topText: data?.files?.["top-text"],
        bottomText: data?.fields?.["bottom-text"],
    });
    return result
}
