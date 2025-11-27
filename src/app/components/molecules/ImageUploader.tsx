import { ChangeEvent, useState } from "react";
import ImagePreviewAtom from "../atoms/ImagePreviewAtom";

type Props = {
    title?: string;
    preview?: string;
    onSetImage: (image: File) => void;
    onRemoveImage: () => void;
}

const ImageUploader = ({ title, preview: imagePreview, onSetImage, onRemoveImage }: Props) => {
    const [preview, setPreview] = useState<string | null>(imagePreview ?? null);

  const _handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const _file = e.currentTarget.files?.[0];
        if(!_file) return;
        setPreview(URL.createObjectURL(_file));
        onSetImage(_file);
  };

    const _handleRemoveImage = () => {
        setPreview(null);
        onRemoveImage();
    }

    return (
        <>
            { !!title && (<span>{title}</span>) }
            <ImagePreviewAtom image={preview}/>
            <div className="d-inline-flex flex-row gap-3 mt-3">
                <label className="btn btn-sm btn-light font-weight-bold">
                    <i className="fa fa-pen me-2"></i>
                    { !!preview ? 'Change image': 'Upload image' }
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        hidden
                        onChange={_handleImageUpload}
                    />
                </label>
                { !!preview && (
                    <button
                        type="button"
                        className="btn btn-sm btn-light-danger font-weight-bold"
                        onClick={_handleRemoveImage}
                    >
                        <i className="fa fa-times"></i> Remove
                    </button>
                )}
            </div>
        </>
    )
}

export default ImageUploader;