type Props = {
    fields: {
        type: string;
        autoComplete: string;
        name?: string;
    }[];
};

const AnticompleteAtom = ({ fields }: Props) => {
    return (
        <>
        { fields.map((f, i) => (
            <input key={i} type={f.type} name={f.name} autoComplete={f.autoComplete} style={{display: 'none'}} />
        ))}
        </>
    )
};

export default AnticompleteAtom;