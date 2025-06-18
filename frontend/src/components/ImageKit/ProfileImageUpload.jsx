import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import { BiCamera } from "react-icons/bi";

const ProfileImageUpload = ({changeProfile,logo}) => {
    const [progress, setProgress] = useState(0);
    const [profile,setProfile] = useState(logo || "")
    const fileInputRef = useRef(null);

    const abortController = new AbortController();
    const authenticator = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }
        const file = fileInput.files[0];
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
             setProfile(uploadResponse?.url)
             changeProfile(uploadResponse?.url)
        } catch (error) {
                console.error("Server error:", error.message);
        }
    };

    return (
        <>
            <label htmlFor="profileImg" onClick={handleUpload}>
                <div className='relative w-20 h-20'>
                    <img src={profile || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} className='w-full border rounded-full h-full ' alt="" />
                    <BiCamera className='absolute right-0 -bottom-2 bg-white' size={30}/>
                </div>
            </label>  
            <input type="file" id="profileImg" ref={fileInputRef} onChange={handleUpload} className="hidden"/>
            {/* Button to trigger the upload process */}
            {/* <button type="button" onClick={handleUpload}>
                Upload file
            </button> */}
            <br />
            {/* Display the current upload progress */}
            Upload progress: <progress value={progress} max={100}></progress>
        </>
    );
};

export default ProfileImageUpload;