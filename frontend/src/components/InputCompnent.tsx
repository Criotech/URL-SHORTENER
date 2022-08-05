import React, { FC } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    loading: boolean;
    url: {
        fullUrl: string;
    },
    errMessage: string
}

const InputComponent: FC<IProps> = ({
    handleChange,
    handleSubmit,
    loading,
    url,
    errMessage
}) => {
    return (
        <main>
            <div>
                <h3>Simplify your URL</h3>
                <form>
                    <input name="fullUrl" type="text" onChange={handleChange} value={url.fullUrl} placeholder="Enter your original URL here" />
                    <button onClick={handleSubmit}>{loading ? <ClipLoader color={"#fff"} loading={true} size={20} /> : "Shorten Now"}</button>
                </form>
                <small style={{color: "red"}}>{errMessage}</small>
            </div>
        </main>
    )
}

export default InputComponent;