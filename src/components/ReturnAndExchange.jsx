import { Phone, Mail } from "lucide-react";

const ReturnAndExchange = () => {
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-fit">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold">Return & Exchange Policy</h2>
          <p className="md:text-xl text-gray-500 mt-1">Home / Return & Exchange</p>
        </div>

        {/* Content Section */}
        <div className=" p-4 md:p-8 text-gray-700 text-base leading-relaxed space-y-6">
          <p>
            We value your satisfaction and aim to provide a smooth return or exchange process for
            our cleaning products. Please review the conditions below. These policies are provided
            for transparency and must be reviewed before making a purchase.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">1. Return Eligibility</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Returns are accepted within 7 days of delivery only if the product is damaged due to
                our error.
              </li>
              <li>
                Returns are not accepted if the product delivered matches the order but is no longer
                needed or was ordered by mistake.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">2. Exchange Policy</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                We offer replacements or exchanges within 7 days of delivery only if the product is
                damaged due to our error.
              </li>
              <li>Replacements will be provided for the same item only.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              3. How to Request a Return or Exchange
            </h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Contact us via email or phone within 7 days of receiving the order to report the
                issue.
              </li>
              <li>Provide your order number and clear photographs of the damaged item.</li>
              <li>
                Our support team will review your request and respond with the next steps within 2
                business days.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">4. Refunds</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                If you choose not to receive a replacement, a full or partial refund may be issued
                based on the condition of the returned product and the reason for return.
              </li>
              <li>
                Refunds will be processed within 7 business days after the returned item is received
                and approved.
              </li>
              <li>Refunds will be credited to your original payment method.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">5. Shipping Costs</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <p>
                Return shipping costs must be covered by the customer unless the product was damaged
                due to our error.
              </p>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-2">
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-[#393185]" />
                <a
                  href="mailto:hariomchemicals96@gmail.com"
                  className="text-[#393185] hover:underline"
                >
                  hariomchemicals96@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-[#393185]" />
                <a href="tel:+91-9824071630" className="text-[#393185] hover:underline">
                  +91 9824071630
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-[#393185]" />
                <a href="tel:+91-9428693301" className="text-[#393185] hover:underline">
                  +91 9428693301
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndExchange;
