import React from "react";
import type { estimationDataType } from "../../types/estimationPdf";
import Logo from "../../assets/bramha_logo.jpeg";

const formatCurrency = (amount: number) => amount.toFixed(2);

interface EstimationDocumentProps {
  data: estimationDataType;
  id: string;
}

const EstimationDocument: React.FC<EstimationDocumentProps> = ({
  data,
  id,
}) => {
  const subTotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const totalAfterDiscount = subTotal - data.discount;
  const cgstAmount = (totalAfterDiscount * data.cgstRate) / 100;
  const sgstAmount = (totalAfterDiscount * data.sgstRate) / 100;
  const grandTotal = totalAfterDiscount + cgstAmount + sgstAmount;

  return (
    <div id={id} className="quotation-document-container">
      {/* Page 1: Quotation Details */}
      <div className="pdf-page">
        <header className="quotation-header">
          <div className="logo-section">
            {/* Replace with your actual logo */}
            <img src={Logo} alt="Sri Bramha Industries Logo" className="logo" />
            <p className="tagline">Quality With Integrity</p>
          </div>
          <div className="company-details-section">
            <h1>
              SRI BRAMHA INDUSTRIES <sup style={{ fontSize: "0.6em" }}>TM</sup>
            </h1>
            <p className="sub-heading">
              COMMERCIAL KITCHEN & BAKERY EQUIPMENTS
            </p>
          </div>
          <div className="gstin-header">GSTIN: 33AVTPS8228G1Z0</div>
        </header>
        <div className="company-address-contact">
          <p>
            <strong>Register office & Showroom :</strong> Near Reliance Market,
            Opp to SIT Hostel, Tanjore, Trichy Main Rd, Ariyamangalam Area,
            Trichy - 620010
          </p>
          <p>
            <strong>Sales:</strong> 98656 99922, 98424 71388 /{" "}
            <strong>Service:</strong> 95781 71388
          </p>
          <p>www.sribramhaindustries.in | bramhaindustries@gmail.com</p>
        </div>

        <hr className="divider" />

        <section className="customer-ref-section">
          <div className="customer-info">
            <p>
              <strong>To:</strong>
            </p>
            <p>{data.customer.name}</p>
            <p>{data.customer.address}</p>
            <p>{data.customer.phone}</p>
            <p>GST: {data.customer.gst || "N/A"}</p>
          </div>
          <div className="ref-info">
            <p>
              <strong>REF:</strong> {data.refNo}
            </p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
          </div>
        </section>

        <h2 className="quotation-title">QUOTATION</h2>

        <table className="quotation-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.sNo}>
                <td>{item.sNo}</td>
                <td>
                  {item.productName}
                  {item.code && (
                    <div className="product-code">({item.code})</div>
                  )}
                  {item.specification && (
                    <div className="product-specification">
                      <strong>Specification:</strong> {item.specification}
                    </div>
                  )}
                </td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="totals-table">
          <tbody>
            <tr>
              <td>TOTAL</td>
              <td>{formatCurrency(subTotal)}</td>
            </tr>
            <tr>
              <td>DISCOUNT</td>
              <td>{formatCurrency(data.discount)}</td>
            </tr>
            <tr>
              <td>
                <strong>TOTAL AFTER DISCOUNT</strong>
              </td>
              <td>
                <strong>{formatCurrency(totalAfterDiscount)}</strong>
              </td>
            </tr>
            <tr>
              <td>ADD CGST @ {data.cgstRate}%</td>
              <td>{formatCurrency(cgstAmount)}</td>
            </tr>
            <tr>
              <td>ADD SGST @ {data.sgstRate}%</td>
              <td>{formatCurrency(sgstAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
      {/* End of Page 1 */}
      {/* Page 2: Grand Total, Bankers, Terms */}
      <div className="pdf-page">
        <div className="grand-total-banner">
          <span>GRAND TOTAL</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>

        <section className="bankers-details">
          <h3>DETAILS OF OUR BANKERS:</h3>
          <p>
            <strong>Name of the Unit:</strong> {data.bankDetails.unitName}
          </p>
          <p>
            <strong>Name of the Bank:</strong> {data.bankDetails.bankName}
          </p>
          <p>
            <strong>Name of the Branch:</strong> {data.bankDetails.branchName}
          </p>
          <p>
            <strong>Name of Account No:</strong> {data.bankDetails.accountNo}
          </p>
          <p>
            <strong>Type of Account:</strong> {data.bankDetails.accountType}
          </p>
          <p>
            <strong>MICR :</strong> {data.bankDetails.micr}
          </p>
          <p>
            <strong>IFSC :</strong> {data.bankDetails.ifsc}
          </p>
        </section>

        <section className="terms-conditions">
          <h3>TERMS AND CONDITIONS:</h3>
          <p>
            <strong>PAYMENT:</strong>
          </p>
          <p>75% advance payment, 25% at the time of delivery.</p>
          <p>
            <strong>DELIVERY:</strong>
          </p>
          <p>3 weeks from the date of your confirmed order.</p>
          <p>
            <strong>TRANSPORT:</strong>
          </p>
          <p>
            Packing and forwarding charges, freight charges as an extra as
            actual, if you are going to arrange transport by your own have to be
            intimated to us earlier.
          </p>
          <p>
            <strong>WORKS:</strong>
          </p>
          <p>
            Civil work, Electrical work, water plumbing line work, unloading of
            materials, scuff folding work , Laying of new gas pipe line works
            ,cylinder cost & deposit all are at your scope.
          </p>
          <p>
            <strong>MATERIAL VERIFICATION:</strong>
          </p>
          <p>
            After receipt of material/completion of work you have to verify the
            material and testing of equipments to be carry out with the help our
            technician.
          </p>
          <p>
            <strong>GUARANTEE:</strong>
          </p>
          <p>For 1 Year against any manufacturing defects.</p>
          <p>
            <strong>SERVICE:</strong>
          </p>
          <p>Service on calls by priority basis.</p>
        </section>

        <footer className="quotation-footer">
          <div className="signature-area">
            {/* Replace with actual signature image or dynamic content */}
            {data.signatureImageUrl ? (
              <img
                src={data.signatureImageUrl}
                alt="Signature"
                className="signature-image"
              />
            ) : (
              <div className="signature-placeholder"></div>
            )}
            <p>Authorised Signatory</p>
          </div>
          <div className="factory-address">
            <p>
              <strong>FACTORY :</strong> SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B
              Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukkudi
              North Village (PO), Sengipatti (VIA), Thanjavur - 613402
            </p>
          </div>
        </footer>
      </div>{" "}
      {/* End of Page 2 */}
    </div>
  );
};

export default EstimationDocument;
