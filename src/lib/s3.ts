import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const upload = async (file: Blob | null) => {
    try {
        if (!file) {
            throw new Error("No file uploaded")
        }

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
            throw new Error("File is too large")
        }

        console.log(file.type)

        if (!file.type.startsWith("image/")) {
            throw new Error("Invalid file type. Only images are allowed.");
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const fileKey = `books/${randomUUID()}.${file.type.split("/")[1]}`;

        const params = {
            Bucket: process.env.BUCKET_NAME!,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type,
        };

        await s3.send(new PutObjectCommand(params));

        return `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    } catch (error) {
        throw new Error((error as Error).message || "An unexpected error occurred.");
    }
}