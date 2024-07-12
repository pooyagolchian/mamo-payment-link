import useCreatePaymentLink from "../hooks/useCreatePaymentLink";
import Loading from "./Loading";

const CreatePaymentLink = () => {
    const { link, createLink, loading } = useCreatePaymentLink();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <button
                onClick={createLink}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Payment Link'}
            </button>

            {loading && <Loading />}

            {
                link && !loading &&(
                    <pre className="bg-gray-100 p-4 rounded mt-4">
                        {JSON.stringify(link, null, 2)}
                    </pre>
                )
            }
            <div id='mamo-checkout' data-src={link}></div>
            <script src='https://assets.mamopay.com/public/checkout-inline.min.js'></script>
        </div>
    );
};

export default CreatePaymentLink;
