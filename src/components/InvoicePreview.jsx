import React, { useState } from 'react';
import { CheckCircle, Printer } from 'lucide-react';

const InvoicePreview = ({ data }) => {
    const [isPaid, setIsPaid] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    if (!data) return null;

    const subtotal = data.items.reduce((acc, item) => acc + ((Number(item.quantity) || 0) * (Number(item.price) || 0)), 0);
    const discountAmount = (subtotal * (Number(data.discountRate) || 0)) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * (Number(data.taxRate) || 0)) / 100;
    const total = afterDiscount + taxAmount;

    const handlePay = () => {
        setIsPaid(true);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice-preview">
            {/* Success Popup */}
            {showPopup && (
                <div className="paid-popup">
                    <CheckCircle size={28} style={{ color: '#10b981' }} />
                    <span>Successfully Paid!</span>
                </div>
            )}

            <div className="preview-content card-preview-special" id="printable-invoice">
                {/* Decorative Watermark */}
                <div className="watermark">NCE</div>

                <div className="preview-header">
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#0ea5e9', fontWeight: '800' }}>NCE Billing System</h1>
                        <p style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '1px' }}>PREMIUM INVOICING SOLUTIONS</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.4rem', fontWeight: '800' }}>INVOICE</h2>
                        <div style={{ display: 'inline-block', marginTop: '5px', background: '#0ea5e9', color: 'white', padding: '2px 10px', borderRadius: '4px', fontWeight: '700', fontSize: '0.9rem' }}>
                            {data.invoiceNumber}
                        </div>
                    </div>
                </div>

                <div className="preview-meta">
                    <div>
                        <p style={{ fontWeight: '700', marginBottom: '8px', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>BILLED TO</p>
                        <p style={{ fontWeight: '800', margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>{data.clientName || 'Valued Client'}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.95rem', color: '#64748b' }}>{data.clientPhone || 'No contact provided'}</p>
                        {data.clientAddress && (
                            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                📍 {data.clientAddress}
                            </p>
                        )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '700', marginBottom: '8px', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>STATUS</p>
                        {isPaid ? (
                            <p style={{ margin: 0, color: '#10b981', fontWeight: '700' }}>● PAID</p>
                        ) : (
                            <p style={{ margin: 0, color: '#ef4444', fontWeight: '700' }}>● UNPAID</p>
                        )}
                    </div>
                </div>

                <table className="preview-table">
                    <thead>
                        <tr>
                            <th>Service Description</th>
                            <th>Qty</th>
                            <th style={{ textAlign: 'right' }}>Unit Price</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: '600', color: '#1e293b' }}>{item.description || 'Consultancy/Service'}</td>
                                <td style={{ color: '#64748b' }}>{Number(item.quantity) || 0}</td>
                                <td style={{ textAlign: 'right', color: '#64748b' }}>{(Number(item.price) || 0).toFixed(2)}</td>
                                <td style={{ textAlign: 'right', fontWeight: '700', color: '#1e293b' }}>{((Number(item.quantity) || 0) * (Number(item.price) || 0)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="preview-footer-flex">
                    <div className="totals">
                        <div className="total-row">
                            <span>Sub-Total:</span>
                            <span style={{ fontWeight: '600' }}>{subtotal.toFixed(2)}</span>
                        </div>
                        {(data.discountRate || 0) > 0 && (
                            <div className="total-row">
                                <span>Discount ({data.discountRate}%):</span>
                                <span style={{ fontWeight: '600', color: '#10b981' }}>- {discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="total-row">
                            <span>GST/VAT ({data.taxRate}%):</span>
                            <span style={{ fontWeight: '600' }}>{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="total-row total-final-box">
                            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>GRAND TOTAL:</span>
                            <span style={{ fontSize: '1.4rem' }}>{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="invoice-note">
                    <p><strong>Note:</strong> Thank you for your business. Please make payment within 15 days of receiving this invoice.</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {!isPaid ? (
                    <button
                        className="btn btn-pay"
                        style={{ flex: 1 }}
                        onClick={handlePay}
                    >
                        💳 Pay Now
                    </button>
                ) : (
                    <button
                        className="btn btn-print"
                        style={{ flex: 1 }}
                        onClick={handlePrint}
                    >
                        <Printer size={18} /> Print Paid Invoice
                    </button>
                )}
            </div>
        </div>
    );
};

export default InvoicePreview;
