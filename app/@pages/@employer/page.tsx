import dynamic from 'next/dynamic'
 
const OfferList = dynamic(() => import('@/app/_components/offers/offer-list'), {
  loading: () => <p>Loading...!</p>,
})

export default function EmployersPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <OfferList />
                </div>
            </div>
        </div>
    )
}