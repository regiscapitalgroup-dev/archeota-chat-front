
type Props = {
    image: string | null;
}

const ImagePreviewAtom = ({ image }: Props) => {
    return (
        <div 
            className="image-input-outline image-input-wrapper rounded border"
            style={{
                    width: "15rem",
                    minWidth: "15rem",
                    height: "15rem",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075)",
                    backgroundImage: image
                    ? `url(${image})`
                    : 'url("/media/avatars/user_default.jpg")',
                }}
        >
        </div>
    )
}

export default ImagePreviewAtom;