import { Mail } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-fit">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold">Terms and Conditions</h2>
          <p className="md:text-xl text-gray-500 mt-1">Home / Terms and Conditions</p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 text-gray-700 text-base leading-relaxed space-y-6">
          <p>
            These Terms and Conditions govern your use of our website and the purchase of products from our store. By accessing or using our services, you agree to be bound by these terms.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              1. General Terms
            </h3>
            <p className="mt-1">
              By using our website, you agree to comply with all applicable laws and regulations. We reserve the right to modify these terms at any time, and changes will be posted on this page.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              2. Product Information
            </h3>
            <p className="mt-1">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is error-free. If a product is listed at an incorrect price, we may refuse or cancel the order.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              3. Orders and Payments
            </h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>All orders are subject to acceptance and availability.</li>
              <li>Payments must be made through our secure payment gateways.</li>
              <li>Prices are subject to change without notice.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              4. Shipping and Delivery
            </h3>
            <p className="mt-1">
              We aim to deliver products within the estimated delivery times. However, delays may occur due to unforeseen circumstances. Shipping costs and delivery times will be provided at checkout.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              5. Returns and Refunds
            </h3>
            <p className="mt-1">
              If you are not satisfied with your purchase, you may return it within 30 days of receipt, subject to our return policy. Refunds will be processed to the original payment method.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              6. Limitation of Liability
            </h3>
            <p className="mt-1">
              To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our website or products.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              7. Contact Us
            </h3>
            <p className="mt-1">
              For any questions or concerns regarding these Terms and Conditions, please contact us at:
            </p>
            <p className="flex items-center gap-2">
              <Mail size={20} className="text-[#393185]" />
              <a
                href="mailto:hariomchemicals96@gmail.com"
                className="text-[#393185] hover:underline"
              >
                hariomchemicals96@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              8. Governing Law
            </h3>
            <p className="mt-1">
              These Terms and Conditions are governed by the laws of the jurisdiction in which our business is registered. Any disputes will be resolved in the courts of that jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;