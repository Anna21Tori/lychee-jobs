import dynamic from 'next/dynamic'
 
const OfferForm= dynamic(() => import('@/app/_components/offers/offer-form'), {
  loading: () => <p>Loading...!</p>,
})

export default function EmployersPage() {
    return (
        <OfferForm isEdit={false}/>
    )
}