import React from "react";
import { PrismicImage } from "@prismicio/react";

const SectionHeader = ({ icon, sectionTitle }) => {
    const hideListViewTitleIcon = true

    return (
        <div className="list-view-section-title" >
            { !hideListViewTitleIcon && icon && <PrismicImage className="lv-header-svg-image" field={icon} /> }
            <h2 className="categorie-title top-padding-25px">{sectionTitle}</h2>
        </div>
    )
}
export default SectionHeader;