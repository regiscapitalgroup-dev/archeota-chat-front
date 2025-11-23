import clsx from "clsx"

type Props = {
    name: string;
    color: string;
    className?: string;
    onClick?: Function;
}

export const ClassifierAtom = ({ name, color, className }: Props) => {
    return (
        <div className={clsx('badge fw-bolder text-uppercase text-truncate text-nowrap classifier', color, className)}>
            {name}
        </div>
    )
}