import React from 'react';
import { useRouter } from 'next/router';

// import Link from 'next/link';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import Image from 'next/image';

function MeetupItem(props: Omit<IMeetup, "description">) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push('/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image src={props.image} alt={props.title} width={640} height={465} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
