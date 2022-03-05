import Image from "next/image";
import React from "react";

import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
    // DESTRUCTURING
    const { image, title, address, description } = props;

    return (
        <section className={classes.detail}>
            <Image 
                src={image} 
                alt={title}
                width={640}
                height={450}
            />
            <h1>{title} </h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    )
}

export default MeetupDetail;