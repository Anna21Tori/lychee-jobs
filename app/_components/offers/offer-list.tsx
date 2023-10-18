'use client'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { IOffer } from "./interfaces";
import InfiniteScroll from "react-infinite-scroll-component";

const LOADED_ITEMS = 1;
const OfferList = () => {
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [offset, setOffset] = useState(1);
    const [hasMore, setHasMore] = useState(true)
      
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
            // if(data.length === 0){
            //     setHasMore(false);
            //     return;
            // }
            setOffers([... offers, ... data as IOffer[]])
        })

        setOffset(offset + 1);
        console.log
    }

    const items = offers.map(item => {
        return (
            <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.position}
                    secondary={`${item.location} | ${item.experience}`}
                  />
            </ListItem>
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
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {items}
                </InfiniteScroll>
        </List>
    )
}
export default OfferList;