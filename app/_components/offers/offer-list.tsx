'use client'
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Delete, Business, Edit} from '@mui/icons-material';
import { useEffect, useState } from "react";
import { IOffer, experiences } from "./interfaces";
import { useRouter } from 'next/navigation';
import InfiniteScroll from "react-infinite-scroll-component";

const LOADED_ITEMS = 1;
const OfferList = () => {
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [offset, setOffset] = useState(1);
    const router = useRouter();
      
    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch("/api/employers/view_offers", {
                method: "POST",
                body: JSON.stringify({from: 0, to: LOADED_ITEMS}),
                headers: {
                    "Content-Type": "application/json",
                  },
            })

            result.json().then(res => setOffers(res.data as IOffer[]))
        }

        fetchData();

    }, []);
    
    const loadMoreItems = async () => {
        const from = offset === 0 ? 0 : LOADED_ITEMS*offset;
        const to = LOADED_ITEMS*(offset+1);

        const result = await fetch("/api/employers/view_offers", {
            method: "POST",
            body: JSON.stringify({from: from, to: to}),
            headers: {
                "Content-Type": "application/json",
              },
        })

        result.json().then(res => {
            const data = res.data as IOffer[];
            setOffers([... offers, ... data as IOffer[]])
        })

        setOffset(offset + 1);
        console.log
    }
    
    const formatSubText = (offer: IOffer) => {
      let sub = offer.location;
      if(offer.experience !== "" && Object.keys(experiences).includes(offer.experience))
        sub += ` | ${experiences[offer.experience]}`;
      return sub;
    }

    const redirectTo = (slug: string) => {
      router.push(slug);
    }

    const items = offers.map((item, id) => {
        return (
          <>
             {id % 2 ? <Divider variant="fullWidth" component="li" /> : "" }
             <ListItem
                  key={id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() =>  redirectTo(`/offers/${item.id}`)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                        <Business />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.position}
                    secondary={formatSubText(item)}
                  />
            </ListItem>
          </>
        )
    })
    return (
        <List dense={true} >
              <InfiniteScroll
                    dataLength={offers.length}
                    next={loadMoreItems}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>No more offerts</b>
                        </p>
                      }
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {items}
                </InfiniteScroll>
        </List>
    )
}
export default OfferList;