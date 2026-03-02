import React from 'react';
import { Download, FileText } from 'lucide-react';

const InvoicePreview = ({ data }) => {
    if (!data) return null;

    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = (subtotal * data.taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div className="invoice-preview">
            <div className="preview-content">
                <div className="preview-header">
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#0ea5e9' }}>Everest Billing System</h1>
                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Precision Invoicing System</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem' }}>INVOICE</h2>
                        <p style={{ color: '#0ea5e9', fontWeight: '700', margin: 0 }}>{data.invoiceNumber}</p>
                    </div>
                </div>

                <div className="preview-meta">
                    <div>
                        <p style={{ fontWeight: '600', marginBottom: '5px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>BILL TO</p>
                        <p style={{ fontWeight: '700', margin: 0, fontSize: '1.1rem' }}>{data.clientName || '---'}</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{data.clientPhone || 'No Phone provided'}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '600', marginBottom: '5px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>ISSUE DATE</p>
                        <p style={{ margin: 0 }}>{data.date}</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: '500' }}>{item.description || 'Service/Item'}</td>
                                <td>{item.quantity}</td>
                                <td>{data.currency}{item.price.toFixed(2)}</td>
                                <td style={{ textAlign: 'right' }}>{data.currency}{(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="totals">
                    <div className="total-row">
                        <span>Subtotal:</span>
                        <span>{data.currency}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Tax ({data.taxRate}%):</span>
                        <span>{data.currency}{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="total-row total-final">
                        <span>TOTAL:</span>
                        <span>{data.currency}{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => window.print()}>
                    <Download size={18} /> Download PDF
                </button>
                <button className="btn" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#4b5563' }}>
                    <FileText size={18} /> Save as Draft
                </button>
            </div>
        </div>
    );
};

export default InvoicePreview;
