import { useEffect, useState } from "react";

export const useFileUploader = () => {
    const [imgUrl, setImgUrl] = useState<null | string>(null);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
       if(file){
        setFile(file);
       }
    }, [file]);

    const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target?.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedFile);
            fileReader.onload = () => {
                const result = fileReader?.result;
                if (typeof result === 'string') {
                    setImgUrl(result);
                } else {
                    console.error('Unexpected result type:', result);
                    setFile(null);
                    setImgUrl(null);
                }
            }
        } else {
            setFile(null);
            setImgUrl(null);
            console.log('File not found...');
        }
    };

    return { imgUrl, setImgUrl, fileUpload, file };
};
