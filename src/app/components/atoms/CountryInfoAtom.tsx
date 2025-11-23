import { CSSProperties } from "react";
import { getCountryData } from "../../helpers/countryData";
import clsx from "clsx";

type Props = {
    country: string;
    flagCustomStyles?: CSSProperties;
    classNameContainer?: string;
}

export const CountryInfoAtom = ({ country, flagCustomStyles, classNameContainer }: Props) => {
    const _country = getCountryData(country);
    const _flagStyle: CSSProperties = { 
        width: "20px", 
        height: "15px", 
        objectFit: "cover",
        ...flagCustomStyles
    }
    return (
        <label className={clsx("text-nowrap", classNameContainer??'')}>
        {!!_country && (
            <>
                <img className="me-1" src={_country.flag} alt={_country.country} style={_flagStyle}/>
                { _country.country }
            </>
        )}
        </label>
    )
}