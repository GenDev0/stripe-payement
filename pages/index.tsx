import Card from "@/components/Card";
import Stripe from "stripe";

type Props = {
  prices: Array<any>;
};

export default function Home({ prices = [] }: Props) {
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto p-4 sm:p-8 lg:max-w-7xl'>
        <h2 className='text-2xl font-bold text-gray-900'>
          Stripe Payments Test
        </h2>
        <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-y-6 '>
          {prices.map((price) => (
            <Card key={price?.id} price={price} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });

  return {
    props: {
      prices,
    },
  };
}
